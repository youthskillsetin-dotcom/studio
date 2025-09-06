'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Lock, Zap } from 'lucide-react';
import type { Lesson } from '@/lib/types';
import { mockUserProgress, getSubtopicsByLessonId } from '@/lib/mock-data';

interface LessonCardProps {
  lesson: Lesson;
  hasPremium: boolean;
}

export function LessonCard({ lesson, hasPremium }: LessonCardProps) {
  const isLocked = !lesson.is_free && !hasPremium;
  
  const subtopics = getSubtopicsByLessonId(lesson.id);
  const completedCount = subtopics.filter(st => {
    const progress = mockUserProgress.find(p => p.subtopic_id === st.id);
    return progress?.status === 'completed';
  }).length;

  const progress = subtopics.length > 0 ? (completedCount / subtopics.length) * 100 : 0;

  return (
    <Card className={`flex flex-col ${isLocked ? 'bg-muted/50' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl">{lesson.title}</CardTitle>
          {isLocked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Zap className="w-5 h-5 text-accent" />
          )}
        </div>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} aria-label={`${lesson.title} progress`} />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" disabled={isLocked}>
          <Link href={isLocked ? '#' : `/lessons/${lesson.id}`}>
            {isLocked ? 'Premium Required' : 'Start Lesson'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
