import { notFound } from 'next/navigation';
import { getLessonById, getSubtopicsByLessonId, getProgressForSubtopic } from '@/lib/mock-data';
import type { Subtopic } from '@/lib/types';
import { SubtopicRow } from '@/components/subtopic-row';
import { CountdownTimer } from '@/components/countdown-timer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LessonDetailPage({ params }: { params: { lessonId: string } }) {
  const lesson = getLessonById(params.lessonId);
  if (!lesson) {
    notFound();
  }

  const subtopics = getSubtopicsByLessonId(params.lessonId);

  // Calculate next unlock time (e.g., next Monday at 9 AM)
  const getNextUnlockTime = () => {
    const now = new Date();
    const result = new Date(now);
    result.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
    if(result.getTime() < now.getTime()) result.setDate(result.getDate() + 7);
    result.setHours(9, 0, 0, 0);
    return result;
  };
  
  const nextUnlockDate = getNextUnlockTime();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">{lesson.title}</h1>
        <p className="text-muted-foreground mt-1">{lesson.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Next Lesson Unlocks In</CardTitle>
        </CardHeader>
        <CardContent>
          <CountdownTimer targetDate={nextUnlockDate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Subtopics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {subtopics.map((subtopic: Subtopic) => {
            const progress = getProgressForSubtopic(subtopic.id);
            return (
              <SubtopicRow key={subtopic.id} subtopic={subtopic} status={progress?.status ?? 'locked'} />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
