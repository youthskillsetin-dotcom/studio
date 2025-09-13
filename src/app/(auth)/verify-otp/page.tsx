
'use client';

import { Suspense, useState, useEffect } from 'react';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


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
    const [emailForResend, setEmailForResend] = useState<string | null>(null);

    useEffect(() => {
        if (email) {
            setEmailForResend(decodeURIComponent(email));
        }
    }, [email]);


    const handleVerifyOtp = async (value: string) => {
        setOtp(value);
        setError(null);

        if (!emailForResend || value.length < 6) {
            return;
        }

        setIsSubmitting(true);
        const { error } = await supabase.auth.verifyOtp({
            email: emailForResend,
            token: value,
            type: 'signup',
        });

        if (error) {
            setError(error.message);
        } else {
            toast({
                title: "Verification Successful!",
                description: "Your account has been activated. Redirecting to login...",
            });
            router.push('/login');
        }
        setIsSubmitting(false);
        setOtp(''); // Clear OTP input after attempt
    };

    const handleResend = async () => {
        if (!emailForResend) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No email address found to resend OTP.",
            });
            return;
        }

        setIsResending(true);
        setError(null);
        // Supabase `resend` is for magic links/password resets. 
        // For OTP, `signUp` is used to re-trigger the email if the user is not confirmed.
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: emailForResend,
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
                description: `A new verification code has been sent to ${emailForResend}.`,
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
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <KeyRound className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Enter Verification Code</CardTitle>
                    <CardDescription>
                        We've sent a 6-digit code to <span className="font-semibold text-foreground">{emailForResend}</span>. Please enter it below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                     {error && (
                        <Alert variant="destructive" className="w-full">
                            <AlertTitle>Verification Failed</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <InputOTP maxLength={6} value={otp} onChange={(value) => handleVerifyOtp(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                     {isSubmitting && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                        Didn't receive a code?
                    </p>
                    {emailForResend && (
                        <Button variant="link" type="button" onClick={handleResend} disabled={isResending} className="p-0 h-auto">
                            {isResending ? (
                                <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Resending...
                                </>
                            ): "Click to Resend"}
                        </Button>
                    )}
                </CardFooter>
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
