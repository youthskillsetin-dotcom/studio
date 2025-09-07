
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
        router.push('/dashboard');
    };

  return (
    <div className="max-w-3xl mx-auto">
       <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary mb-4">
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
      </Button>
      <h1 className="text-3xl font-bold font-headline mb-6">Contact & Support</h1>
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
                    <Send className="mr-2" />
                    Submit Inquiry
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
