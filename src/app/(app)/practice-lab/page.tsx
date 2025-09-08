

'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FlaskConical, ArrowRight, FileText, Banknote, ClipboardList, Lightbulb, ShieldAlert, Crown, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useUserSubscription } from '@/hooks/use-user-subscription';
import { Skeleton } from '@/components/ui/skeleton';

interface Lab {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
    href: string;
    is_interactive: boolean;
}

const availableLabs: Lab[] = [
    {
        id: 'itr-filing-101',
        title: 'ITR Filing Simulation',
        description: 'Learn how to file your Income Tax Return step-by-step in this interactive lab. No real financial data needed!',
        icon: FileText,
        tags: ['Finance', 'Taxes', 'Interactive'],
        href: '/practice-lab/itr-filing-101',
        is_interactive: true,
    },
    {
        id: 'budgeting-challenge',
        title: 'The 50-30-20 Budgeting Challenge',
        description: 'Take on a scenario-based challenge to create and manage a budget for a month. Make smart choices to reach your financial goals.',
        icon: Banknote,
        tags: ['Finance', 'Budgeting', 'Interactive'],
        href: '/practice-lab/budgeting-challenge',
        is_interactive: true,
    },
    {
        id: 'resume-builder-lab',
        title: 'Resume Builder Lab',
        description: 'Create your first professional resume using our guided builder. Learn what to include to impress recruiters.',
        icon: ClipboardList,
        tags: ['Careers', 'Branding', 'Interactive'],
        href: '/practice-lab/resume-builder-lab',
        is_interactive: true,
    },
    {
        id: 'business-idea-canvas',
        title: 'Business Idea Canvas',
        description: 'Have a startup idea? Map it out using the Business Model Canvas to identify key strengths and weaknesses in your plan.',
        icon: Lightbulb,
        tags: ['Entrepreneurship', 'Planning', 'Interactive'],
        href: '/practice-lab/business-idea-canvas',
        is_interactive: true,
    },
     {
        id: 'phishing-challenge',
        title: 'Phishing Challenge',
        description: "Can you spot a fake email? Test your skills in this simulation by identifying phishing attempts and learning the tell-tale signs.",
        icon: ShieldAlert,
        tags: ['Cybersecurity', 'Safety', 'Interactive'],
        href: '/practice-lab/phishing-challenge',
        is_interactive: true,
    },
];

const PremiumAccessGate = () => (
    <Card className="text-center max-w-lg mx-auto rounded-2xl shadow-lg mt-10">
        <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Crown className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Unlock the Practice Labs</CardTitle>
            <CardDescription>
                Go beyond theory and apply your knowledge in hands-on simulations. The Practice Labs are a premium feature.
            </CardDescription>
        </CardHeader>
        <CardContent>
             <p className="text-sm text-muted-foreground">Upgrade your plan to access all interactive labs and build a portfolio of real-world skills.</p>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full">
                <Link href="/subscribe?plan=premium">Upgrade to Premium</Link>
            </Button>
        </CardFooter>
    </Card>
);


export default function PracticeLabPage() {
    const { userSubscription, isLoading } = useUserSubscription();
    const hasPremium = userSubscription?.is_active ?? false;
    
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Skeleton className="h-12 w-1/3" />
                    <Skeleton className="h-6 w-2/3 mt-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
                </div>
            </div>
        )
    }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4">
            <FlaskConical className="w-10 h-10 text-primary" />
            <div>
                 <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Practice Labs</h1>
                 <p className="text-muted-foreground mt-2 text-lg">Apply your knowledge in hands-on, real-world simulations.</p>
            </div>
        </div>
      </div>
      
      {!hasPremium && <PremiumAccessGate />}

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", !hasPremium && "opacity-40 blur-sm pointer-events-none")}>
        {availableLabs.map((lab) => (
          <Card key={lab.id} className={cn("flex flex-col rounded-2xl shadow-sm transition-all duration-300", !lab.is_interactive ? "bg-muted/40" : "hover:shadow-lg hover:-translate-y-1")}>
            <CardHeader className="flex-row items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <lab.icon className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <CardTitle className="font-headline text-xl">{lab.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {lab.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs font-medium">{tag}</Badge>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{lab.description}</p>
            </CardContent>
            <CardFooter>
               <Button asChild className="w-full" disabled={!lab.is_interactive || !hasPremium}>
                    <Link href={lab.href}>
                        {!hasPremium ? <><Lock className="w-4 h-4 mr-2" /> Premium</> : lab.is_interactive ? "Start Lab" : "Coming Soon"}
                        {lab.is_interactive && hasPremium && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
