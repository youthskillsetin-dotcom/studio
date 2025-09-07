
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lesson } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  hasPremium: boolean;
}

export function LessonCard({ lesson, hasPremium }: LessonCardProps) {
  const isLocked = !lesson.is_free && !hasPremium;

  const cardContent = (
    <Card
      className={cn(
        "flex flex-col h-full rounded-2xl shadow-sm transition-all",
        isLocked
          ? "bg-muted/50"
          : "hover:shadow-md hover:border-primary/50 cursor-pointer"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            {lesson.title}
          </CardTitle>
          <Badge variant={lesson.is_free ? "default" : "secondary"} className={cn(lesson.is_free ? 'bg-primary/10 text-primary border-primary/20' : 'bg-accent/10 text-accent-foreground border-accent/20', 'shrink-0')}>
            {lesson.is_free ? 'Free' : 'Premium'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-2 text-sm">
          {lesson.description}
        </CardDescription>
      </CardContent>
    </Card>
  );

  if (isLocked) {
    return (
      <div className="relative h-full cursor-not-allowed group">
        <div className="absolute inset-0 bg-black/30 z-10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Lock className="w-8 h-8 text-white" />
        </div>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/lessons/${lesson.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
