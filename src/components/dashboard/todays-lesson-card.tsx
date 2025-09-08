
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

export function TodaysLessonCard() {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <CardTitle className="font-headline">Continue Learning</CardTitle>
        <CardDescription>Your next challenge is waiting for you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <p className="text-sm text-muted-foreground">Next Lesson</p>
            <h3 className="text-xl font-semibold">Day 2: Mastering the 50-30-20 Rule</h3>
        </div>
        <Button className="w-full md:w-auto" asChild>
          <Link href="/subtopic/1-2">
            <PlayCircle className="w-5 h-5 mr-2" />
            Start Lesson
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
