
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

  useEffect(() => {
    async function calculateProgress() {
      setLoading(true);
      const subtopics = await getSubtopicsByLessonId(lesson.id);
      const userProgress = await getUserProgress();
      
      const completedSubtopics = subtopics.filter(st => {
        const progressRecord = userProgress.find(p => p.subtopic_id === st.id);
        return progressRecord?.status === 'completed';
      }).length;

      const newProgress = subtopics.length > 0 ? (completedSubtopics / subtopics.length) * 100 : 0;
      setProgress(newProgress);
      setIsCompleted(newProgress === 100);
      setIsStarted(newProgress > 0 && newProgress < 100);
      setLoading(false);
    }
    calculateProgress();
  }, [lesson.id]);

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
     <Card className="flex flex-col rounded-xl bg-card shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <div className="w-full aspect-video relative overflow-hidden">
          <Image 
            src="https://picsum.photos/400/225"
            alt={lesson.title}
            fill
            style={{objectFit: 'cover'}}
            className={`transition-transform duration-300 group-hover:scale-105 ${isLocked ? 'filter grayscale' : ''}`}
            data-ai-hint="learning education"
          />
           {isLocked && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Lock className="text-primary-foreground h-12 w-12" />
            </div>
           )}
        </div>
        <div className={`absolute top-3 right-3 bg-card/80 backdrop-blur-sm text-xs font-bold uppercase px-2 py-1 rounded-full ${isLocked ? 'text-primary' : 'text-foreground'}`}>
            {isLocked ? 'Premium' : 'Free'}
        </div>
      </div>
      <CardContent className="p-5 flex flex-col flex-1">
        <CardTitle className="text-lg font-bold leading-tight mb-2">{lesson.title}</CardTitle>
        <CardDescription className="text-sm font-normal leading-normal mb-4 flex-1">
          {lesson.description}
        </CardDescription>

        {!isLocked && !loading && (
          <div className="mb-4">
              { isCompleted ? (
                 <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <p className="text-xs text-green-500 font-semibold mt-1">Completed!</p>
                 </div>
              ) : (
                <>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs text-right text-muted-foreground mt-1">
                  {isStarted ? `${Math.round(progress)}% Complete` : 'Not Started'}
                </p>
                </>
              )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5">
        <Button 
            asChild={!isLocked}
            className="w-full" 
            variant={buttonAction === 'review' ? 'secondary' : 'default'}
            disabled={isLocked && buttonAction !== 'premium'}
        >
          {isLocked ? (
              <Link href="/">{buttonText}</Link>
          ) : (
             <Link href={`/lessons/${lesson.id}`}>{buttonText}</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
