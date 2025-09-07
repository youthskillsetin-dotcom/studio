
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FlaskConical, ArrowRight, FileText, Banknote, ClipboardList, Lightbulb, ShieldAlert } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
        tags: ['Finance', 'Budgeting', 'Coming Soon'],
        href: '#',
        is_interactive: false,
    },
    {
        id: 'resume-builder-lab',
        title: 'Resume Builder Lab',
        description: 'Create your first professional resume using our guided builder. Learn what to include to impress recruiters.',
        icon: ClipboardList,
        tags: ['Careers', 'Branding', 'Coming Soon'],
        href: '#',
        is_interactive: false,
    },
    {
        id: 'business-idea-canvas',
        title: 'Business Idea Canvas',
        description: 'Have a startup idea? Map it out using the Business Model Canvas to identify key strengths and weaknesses in your plan.',
        icon: Lightbulb,
        tags: ['Entrepreneurship', 'Planning', 'Coming Soon'],
        href: '#',
        is_interactive: false,
    },
     {
        id: 'phishing-challenge',
        title: 'Phishing Challenge',
        description: "Can you spot a fake email? Test your skills in this simulation by identifying phishing attempts and learning the tell-tale signs.",
        icon: ShieldAlert,
        tags: ['Cybersecurity', 'Safety', 'Coming Soon'],
        href: '#',
        is_interactive: false,
    },
];


export default function PracticeLabPage() {
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
          <Card key={lab.id} className="flex flex-col rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader className="flex-row items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <lab.icon className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <CardTitle className="font-headline text-xl">{lab.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                        {lab.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{tag}</span>
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
                        Start Lab <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
