
'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { verifyOtp } from './actions';
import { createClient } from '@/lib/supabase/client';
import { Logo } from '@/components/icons';


const formSchema = z.object({
  token: z.string().min(6, 'Your one-time code must be 6 characters.'),
});

export default function VerifyForm() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const next = searchParams.get('next');
  const [isPending, startTransition] = useTransition();
  const [isResending, setIsResending] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { token: '' },
  });
  
  useEffect(() => {
    if (!email) {
      // This should ideally not happen if the user follows the flow.
      // Redirecting to login provides a safe fallback.
      router.push('/login');
    }
  }, [email, router]);
  
  if (!email) {
    // Return null or a loading spinner while the redirect happens
    return null;
  }

  const handleResend = async () => {
    setIsResending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Code Sent', description: 'A new verification code has been sent to your email.' });
    }
    setIsResending(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await verifyOtp(email!, values.token, 'email');

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: result.error,
        });
      } else {
        toast({
          title: 'Success!',
          description: 'Your email has been verified. Welcome!',
        });
        router.push(next || '/dashboard');
        router.refresh();
      }
    });
  }

  return (
     <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
                <Logo className="h-10 w-10 text-primary mx-auto" />
            </Link>
          <CardTitle className="text-2xl font-headline">Check your email</CardTitle>
          <CardDescription>We've sent a 6-digit code to {email}. The code expires shortly, so please enter it soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Code</FormLabel>
                    <FormControl>
                        <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify
              </Button>
            </form>
          </Form>
           <div className="mt-4 text-center text-sm">
            Didn't receive a code?{' '}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Resend Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
