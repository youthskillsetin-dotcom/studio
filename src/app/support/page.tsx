
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Logo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const contactInfo = [
    {
        icon: Mail,
        title: 'Email Support',
        value: 'work@youthskillset.in',
        href: 'mailto:work@youthskillset.in',
        cta: 'Send Email'
    },
    {
        icon: Phone,
        title: 'Phone Support',
        value: '+91 99884 74904',
        href: 'tel:+919988474904',
        cta: 'Call Us'
    },
    {
        icon: MessageSquare,
        title: 'WhatsApp Chat',
        value: '+91 82980 93316',
        href: 'https://wa.me/918298093316',
        cta: 'Start Chat'
    }
];

export default function SupportPage() {
    const { toast } = useToast();
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    const handleCopy = (value: string, title: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedItem(title);
            toast({
              title: "Copied to Clipboard!",
              description: `${title}: ${value}`,
            });
            setTimeout(() => setCopiedItem(null), 2000);
        });
    }

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
                    <CardContent className="p-6 space-y-4">
                        {contactInfo.map((item) => (
                             <div key={item.title} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <item.icon className="w-6 h-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-muted-foreground">{item.value}</p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => handleCopy(item.value, item.title)}
                                            >
                                                {copiedItem === item.title ? (
                                                    <Check className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                                <span className="sr-only">Copy {item.title}</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Button asChild variant="outline" className="w-full sm:w-auto shrink-0">
                                    <a href={item.href} target="_blank" rel="noopener noreferrer">{item.cta}</a>
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </main>
      <Footer />
    </div>
  );
}
