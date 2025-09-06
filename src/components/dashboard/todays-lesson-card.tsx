
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

export function TodaysLessonCard() {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="font-headline">Continue Learning</CardTitle>
        <CardDescription>Your next challenge is waiting for you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <p className="text-sm text-muted-foreground">Today's Lesson</p>
            <h3 className="text-xl font-semibold">Introduction to React Hooks</h3>
        </div>
        <Button className="w-full md:w-auto" asChild>
          <Link href="/lessons/1">
            <PlayCircle className="w-5 h-5 mr-2" />
            Start Lesson
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
