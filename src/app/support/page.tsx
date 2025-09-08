'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/footer';
import { Logo } from '@/components/icons';

export default function SupportPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Inquiry Sent!",
            description: "Thanks for reaching out. We'll get back to you as soon as possible.",
        });
        (event.target as HTMLFormElement).reset();
        router.push('/');
    };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline">YouthSkillSet</span>
            </Link>
             <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                <Link href="/signup">Get Started</Link>
                </Button>
            </div>
        </header>
        <main className="flex-grow flex items-center justify-center py-12">
            <div className="max-w-3xl mx-auto w-full px-4">
                <h1 className="text-3xl font-bold font-headline mb-6 text-center">Contact & Support</h1>
                <Card className="rounded-2xl">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                        <CardTitle>Submit an Inquiry</CardTitle>
                        <CardDescription>
                            Have a question or need help? Fill out the form below and our team will get back to you.
                        </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name" required />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="What is your inquiry about?" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Please describe your issue or question." required rows={6}/>
                        </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">
                                <Send className="mr-2 h-4 w-4" />
                                Submit Inquiry
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main>
      <Footer />
    </div>
  );
}
