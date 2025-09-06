
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lesson } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  hasPremium: boolean;
}

export function LessonCard({ lesson, hasPremium }: LessonCardProps) {
  const isLocked = !lesson.is_free && !hasPremium;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => 
    isLocked ? (
      <div className="relative h-full">{children}</div>
    ) : (
      <Link href={`/lessons/${lesson.id}`} className="block h-full">
        {children}
      </Link>
    );

  return (
    <CardWrapper>
      <Card
        className={cn(
          "flex flex-col h-full rounded-2xl shadow-sm transition-all",
          isLocked
            ? "bg-muted/50 cursor-not-allowed"
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
    </CardWrapper>
  );
}
