
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
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
import { useState } from 'react';
import { Loader2, ArrowLeft, MailCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    // In a production app with working email, this would be the redirect URL.
    // const redirectTo = `${window.location.origin}/update-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      // redirectTo,
    });

    if (error) {
      setError(error.message);
    } else {
      setIsSuccess(true);
    }

    setIsLoading(false);
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
                <CardTitle className="text-2xl font-headline">Forgot Password</CardTitle>
                <CardDescription>
                 Enter your email and we'll send you instructions to reset your password.
                </CardDescription>
            </CardHeader>
            {isSuccess ? (
                <CardContent>
                     <Alert variant="default" className="border-green-500/50 text-green-700 [&>svg]:text-green-700 dark:border-green-500/60 dark:text-green-400 dark:[&>svg]:text-green-400">
                        <MailCheck className="h-4 w-4" />
                        <AlertTitle>Check your email</AlertTitle>
                        <AlertDescription>
                        A password reset link has been sent to your email address. Please check your inbox (and spam folder). Note: In this demo, email sending is disabled.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                        )}
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="m@example.com"
                                {...field}
                                required
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Reset Instructions
                        </Button>
                    </CardFooter>
                    </form>
                </Form>
            )}
             <CardFooter>
                <Button variant="link" asChild className="w-full text-muted-foreground">
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
  );
}
