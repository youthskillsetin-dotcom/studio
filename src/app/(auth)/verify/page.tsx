
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
import { MailCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';

function VerifyPageContent() {
    const { toast } = useToast();
    const [isSending, setIsSending] = useState(false);
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const supabase = createClient();

    const handleResend = async () => {
        if (!email) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No email address found to resend verification.",
            });
            return;
        }

        setIsSending(true);
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
                title: "Email Sent!",
                description: "A new verification link has been sent to your email.",
            });
        }
        setIsSending(false);
    };

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
                    <MailCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-headline">Check Your Email</CardTitle>
                <CardDescription>
                    We've sent a verification link to your email address. Please click the link to activate your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    If you don't see the email, please check your spam folder.
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                {email && (
                    <Button variant="link" onClick={handleResend} disabled={isSending}>
                         {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Didn't receive an email? Resend
                    </Button>
                )}
                 <Button className="w-full" asChild>
                    <Link href="/login">Back to Login</Link>
                </Button>
            </CardFooter>
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
