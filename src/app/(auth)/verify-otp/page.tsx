
'use client';

import { Suspense, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MailCheck, Loader2, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function VerifyOtpPageContent() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const supabase = createClient();

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !otp) {
            setError("Email and OTP are required.");
            return;
        }

        setIsSubmitting(true);
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'signup',
        });

        if (error) {
            setError(error.message);
        } else {
            toast({
                title: "Verification Successful!",
                description: "Your account has been activated. You can now log in.",
            });
            router.push('/login');
        }
        setIsSubmitting(false);
    };

    const handleResend = async () => {
        if (!email) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No email address found to resend OTP.",
            });
            return;
        }

        setIsResending(true);
        // Note: The resend API for OTP is different from magic link. 
        // We call signUp again which resends the OTP if the user exists but is not confirmed.
        // A more direct `resend` for OTP might be available in future Supabase versions.
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        });

        if (error) {
             toast({
                variant: "destructive",
                title: "Failed to Resend",
                description: error.message,
            });
        } else {
             toast({
                title: "OTP Sent!",
                description: "A new verification code has been sent to your email.",
            });
        }
        setIsResending(false);
    };

    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
    >
        <Card>
            <form onSubmit={handleVerifyOtp}>
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <KeyRound className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Enter Verification Code</CardTitle>
                    <CardDescription>
                        We've sent a 6-digit code to your email address. Please enter it below to activate your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Verification Failed</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Input 
                        placeholder="123456" 
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="text-center text-lg tracking-[0.5em]"
                    />
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isSubmitting || otp.length < 6}>
                         {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Verify Account
                    </Button>
                    {email && (
                        <Button variant="link" type="button" onClick={handleResend} disabled={isResending}>
                            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Didn't receive a code? Resend
                        </Button>
                    )}
                </CardFooter>
            </form>
        </Card>
    </motion.div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpPageContent />
        </Suspense>
    )
}
