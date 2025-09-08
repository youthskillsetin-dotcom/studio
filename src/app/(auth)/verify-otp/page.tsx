
'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
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
import { MessageCircleCode, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function VerifyOtpPageContent() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone');
    const password = searchParams.get('password');
    const [otp, setOtp] = useState('');
    const supabase = createClient();

    const handleVerifyOtp = async () => {
        if (!phone || !otp) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Phone number or OTP is missing.",
            });
            return;
        }

        setIsLoading(true);
        const { data, error } = await supabase.auth.verifyOtp({
            phone: `+91${phone}`,
            token: otp,
            type: 'sms',
        });

        if (error) {
            toast({
                variant: "destructive",
                title: "Verification Failed",
                description: error.message,
            });
        } else if (data.user) {
            toast({
                title: "Account Verified!",
                description: "You have been successfully logged in.",
            });
            // Log the user in after verification
            if (password) {
                 await supabase.auth.signInWithPassword({
                    phone: `+91${phone}`,
                    password: decodeURIComponent(password)
                });
            }
            router.push('/dashboard');
            router.refresh();
        }
        setIsLoading(false);
    };

    const handleResendOtp = async () => {
        if (!phone || !password) {
            toast({ variant: "destructive", title: "Error", description: "Could not resend OTP."});
            return;
        }
        setIsLoading(true);
        // This is a workaround since resend needs a signed-in user. We sign up again.
        await supabase.auth.signUp({
            phone: `+91${phone}`,
            password: decodeURIComponent(password),
        });
        toast({ title: "OTP Resent", description: "A new OTP has been sent to your phone."});
        setIsLoading(false);
    }

    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
    >
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <MessageCircleCode className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-headline">Enter Verification Code</CardTitle>
                <CardDescription>
                    We've sent a 6-digit code to your phone number ending in ...{phone?.slice(-4)}.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 text-left">
                    <Label htmlFor="otp">OTP Code</Label>
                    <Input 
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                    />
                </div>
                 <Button className="w-full" onClick={handleVerifyOtp} disabled={isLoading || otp.length !== 6}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Account
                </Button>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button variant="link" onClick={handleResendOtp} disabled={isLoading}>
                    Didn't receive a code? Resend
                </Button>
                 <Button className="w-full" asChild variant="outline">
                    <Link href="/login">Back to Login</Link>
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <VerifyOtpPageContent />
        </Suspense>
    )
}
