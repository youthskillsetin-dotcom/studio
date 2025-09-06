
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import type { Lesson } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSubtopicsByLessonId, getUserProgress } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';

interface LessonCardProps {
  lesson: Lesson;
  hasPremium: boolean;
}

export function LessonCard({ lesson, hasPremium }: LessonCardProps) {
  const isLocked = !lesson.is_free && !hasPremium;
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function calculateProgress() {
      setLoading(true);
      const subtopics = await getSubtopicsByLessonId(supabase, lesson.id);
      // Since users are not logged in, we can't get real progress.
      // We'll simulate some progress for demonstration purposes.
      const completedSubtopics = 0; //
      
      const newProgress = subtopics.length > 0 ? (completedSubtopics / subtopics.length) * 100 : 0;
      setProgress(newProgress);
      setIsCompleted(newProgress === 100);
      setIsStarted(newProgress > 0 && newProgress < 100);
      setLoading(false);
    }
    calculateProgress();
  }, [lesson.id, supabase]);

  let buttonText = 'Start Lesson';
  let buttonAction: 'default' | 'review' | 'premium' = 'default';
  if(isLocked) {
      buttonText = 'Unlock with Premium';
      buttonAction = 'premium';
  } else if (isCompleted) {
      buttonText = 'Review Lesson';
      buttonAction = 'review';
  } else if (isStarted) {
      buttonText = 'Continue';
  }

  return (
     <Card className="flex flex-col rounded-2xl bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <div className="w-full aspect-[16/9] relative overflow-hidden">
          <Image 
            src={`https://picsum.photos/seed/${lesson.id}/400/225`}
            alt={lesson.title}
            fill
            style={{objectFit: 'cover'}}
            className={`transition-transform duration-300 group-hover:scale-105 ${isLocked ? 'filter grayscale' : ''}`}
            data-ai-hint="learning education"
          />
           {isLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Lock className="text-white h-12 w-12" />
            </div>
           )}
        </div>
      </div>
      <CardHeader className="p-5 flex-1">
        <CardTitle className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{lesson.title}</CardTitle>
        <CardDescription className="text-sm font-normal leading-normal">
          {lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        {!isLocked && !loading && (
          <div className="space-y-2">
              { isCompleted ? (
                 <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Completed</span>
                 </div>
              ) : (
                <>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {isStarted ? `${Math.round(progress)}% Complete` : 'Not Started'}
                  </p>
                </>
              )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 bg-muted/40">
        <Button 
            asChild
            className="w-full" 
            variant={buttonAction === 'review' ? 'secondary' : 'default'}
        >
          {isLocked ? (
              <Link href="/#pricing">{buttonText}</Link>
          ) : (
             <Link href={`/lessons/${lesson.id}`}>{buttonText}</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
