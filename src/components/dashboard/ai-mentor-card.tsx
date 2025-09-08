
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export function AIMentorCard() {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Mentor
        </CardTitle>
        <CardDescription>Need help? Your personal AI tutor is ready to assist you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          <Link href="/ai-mentor">Ask AI Mentor</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
