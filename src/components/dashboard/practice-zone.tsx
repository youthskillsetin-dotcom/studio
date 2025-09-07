
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const practiceItems = [
  { title: 'The Money Mindset Revolution', description: "What is 'delayed gratification'?", href: '/subtopic/1-1#practice-zone' },
  { title: 'The 50-30-20 Rule', description: 'How do you apply the 50-30-20 rule?', href: '/subtopic/1-2#practice-zone' },
  { title: 'Emergency Funds', description: 'What counts as a real emergency?', href: '/subtopic/1-3#practice-zone' },
];

export function PracticeZone() {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="font-headline">Practice Zone</CardTitle>
        <CardDescription>Sharpen your skills with these exercises.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {practiceItems.map((item, index) => (
            <li key={index} className="flex items-center">
                <Link href={item.href} className='flex items-center flex-grow group'>
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <FileQuestion className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" asChild>
                    <Link href={item.href}>
                        <ChevronRight className="w-5 h-5" />
                    </Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
