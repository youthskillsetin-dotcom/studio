
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion, ChevronRight } from 'lucide-react';

const practiceItems = [
  { title: 'HTML Basics', description: 'What is a `<div>` tag?' },
  { title: 'CSS Selectors', description: 'Style an element with an ID.' },
  { title: 'JS Variables', description: 'Declare a `const` variable.' },
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
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <FileQuestion className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
