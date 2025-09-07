
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
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';

const formSchema = z.object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export default function UpdatePasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [hasCode, setHasCode] = useState(false);

  useEffect(() => {
    // In a real app, Supabase redirects from the email with a `code` parameter.
    // We check for it here, but since emails aren't sent, we'll allow the form
    // to be used for demo purposes.
    if (searchParams.has('code')) {
      setHasCode(true);
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.updateUser({ password: values.password });

    if (error) {
        setError(error.message);
    } else {
        setSuccess("Your password has been updated successfully! You can now log in with your new password.");
        form.reset();
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
                <CardTitle className="text-2xl font-headline">Update Password</CardTitle>
                <CardDescription>
                Enter your new password below.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4">
                    {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Update Failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                    )}
                    {success && (
                    <Alert variant="default" className="border-green-500/50 text-green-700 [&>svg]:text-green-700 dark:border-green-500/60 dark:text-green-400 dark:[&>svg]:text-green-400">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                    )}
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isLoading || !!success}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Password
                    </Button>
                    {success && (
                         <Button className="w-full" variant="secondary" asChild>
                            <Link href="/login">
                                Proceed to Login
                            </Link>
                        </Button>
                    )}
                </CardFooter>
                </form>
            </Form>
        </Card>
    </motion.div>
  );
}
