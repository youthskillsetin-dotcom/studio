
'use client';

import { Suspense } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

function VerifyPageContent() {
    const router = useRouter();

    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
    >
        <Card className="text-center">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Verification Not Required</CardTitle>
                <CardDescription>
                    Your account is activated automatically. There's no need to enter an OTP.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    You can now log in directly with the email and password you used to sign up.
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button className="w-full" asChild>
                    <Link href="/login">Proceed to Login</Link>
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
