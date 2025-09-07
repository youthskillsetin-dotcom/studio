
'use client';

import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    token: z.string().min(6, { message: "Your OTP should be 6 characters."}),
});

function VerifyPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');
    const next = searchParams.get('next') ?? '/dashboard';
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);
        if (!email) {
            setError("Email not found in URL. Please try signing up again.");
            setIsLoading(false);
            return;
        }

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: values.token,
            type: 'email'
        });
        
        if (error) {
            setError(error.message);
        } else {
            router.push(next);
            router.refresh();
        }

        setIsLoading(false);
    }

    async function handleResendOtp() {
      setIsResending(true);
      setError(null);
      if (!email) {
        setError("Email not found in URL. Cannot resend OTP.");
        setIsResending(false);
        return;
      }
      
      // In a real app with email services configured, this sends a new OTP.
      // In this local environment, it won't send an email but we simulate the flow.
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        setError(error.message);
      } else {
        toast({
          title: "OTP Resent",
          description: "A new OTP has been sent to your email address.",
        });
      }

      setTimeout(() => setIsResending(false), 30000); // 30-second cooldown
    }

    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
    >
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Verify your email</CardTitle>
                <CardDescription>
                    We've sent an OTP to {email}. Please enter it below to complete your signup.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Verification Failed</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Password (OTP)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123456" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Verify & Sign In
                        </Button>
                        <Button className="w-full" variant="secondary" type="button" onClick={handleResendOtp} disabled={isResending}>
                           {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                           {isResending ? 'Sending...' : 'Resend OTP'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    </motion.div>
    );
}


export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyPageContent />
        </Suspense>
    )
}
