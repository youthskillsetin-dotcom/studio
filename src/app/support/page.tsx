
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Logo } from '@/components/icons';

export default function SupportPage() {
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
            <div className="max-w-2xl mx-auto w-full px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-headline">Contact & Support</h1>
                    <p className="text-muted-foreground mt-2">We're here to help. Reach out to us through any of the channels below.</p>
                </div>
                <Card className="rounded-2xl p-2">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">Email Support</h3>
                                    <p className="text-sm text-muted-foreground">work@youthskillset.in</p>
                                </div>
                            </div>
                            <Button asChild variant="outline" className="mt-4 sm:mt-0 w-full sm:w-auto">
                                <a href="mailto:work@youthskillset.in">Send Email</a>
                            </Button>
                        </div>

                         <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">Phone Support</h3>
                                    <p className="text-sm text-muted-foreground">+91 99884 74904</p>
                                </div>
                            </div>
                             <Button asChild variant="outline" className="mt-4 sm:mt-0 w-full sm:w-auto">
                                <a href="tel:+919988474904">Call Us</a>
                            </Button>
                        </div>
                        
                         <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">WhatsApp Chat</h3>
                                    <p className="text-sm text-muted-foreground">+91 82980 93316</p>
                                </div>
                            </div>
                            <Button asChild variant="outline" className="mt-4 sm:mt-0 w-full sm:w-auto">
                                <a href="https://wa.me/918298093316" target="_blank" rel="noopener noreferrer">Start Chat</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
      <Footer />
    </div>
  );
}
