
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FlaskConical, ArrowRight, FileText, Banknote, ClipboardList, Lightbulb, ShieldAlert, Crown, Lock, Mail } from 'lucide-react';
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
        title: 'AI Resume Builder & Reviewer',
        description: 'Create a professional resume using our guided builder and get instant feedback from our AI career coach.',
        icon: ClipboardList,
        tags: ['Careers', 'AI', 'Interactive'],
        href: '/practice-lab/resume-builder-lab',
        is_interactive: true,
    },
     {
        id: 'cover-letter-lab',
        title: 'AI Cover Letter Generator',
        description: 'Generate a personalized cover letter for any job description based on the details from your resume.',
        icon: Mail,
        tags: ['Careers', 'AI', 'New'],
        href: '/practice-lab/cover-letter-lab',
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

export default function PracticeLabPage() {
    const { userSubscription } = useUserSubscription();
    const hasPremium = userSubscription?.is_active ?? false;
    
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <Badge key={tag} variant={tag === 'New' ? 'default' : 'secondary'} className={cn("text-xs font-medium", tag === 'New' ? 'bg-primary/80' : '')}>{tag}</Badge>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{lab.description}</p>
            </CardContent>
            <CardFooter>
               <Button asChild className="w-full" disabled={!lab.is_interactive}>
                    <Link href={lab.href}>
                        {lab.is_interactive ? "Start Lab" : "Coming Soon"}
                        {lab.is_interactive && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
