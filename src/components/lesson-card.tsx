
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

  const CardInnerContent = () => (
    <Card
      className={cn(
        "flex flex-col h-full rounded-2xl shadow-sm transition-all duration-300",
        isLocked
          ? "bg-muted/50 cursor-not-allowed"
          : "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-headline">
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
         <Link href="/subscribe?plan=premium" className="block h-full group relative">
          <div className="absolute inset-0 bg-black/50 z-10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center text-white">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Upgrade to Premium</p>
              <p className="text-xs">to unlock this module</p>
            </div>
          </div>
          <CardInnerContent />
        </Link>
       );
  }


  return (
    <Link href={`/lessons/${lesson.id}`} className="block h-full">
      <CardInnerContent />
    </Link>
  );
}
