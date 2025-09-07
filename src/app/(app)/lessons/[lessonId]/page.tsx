
import { notFound } from 'next/navigation';
import type { Subtopic, Lesson } from '@/lib/types';
import { SubtopicRow } from '@/components/subtopic-row';
import { CountdownTimer } from '@/components/countdown-timer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import sampleContent from '../../../../../sample-content.json';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserSubscription } from '@/lib/data';

// Since we are not using a DB, we'll create a simple function to get data from the JSON
function getLessonById(id: string): (Lesson & { subtopics: Subtopic[] }) | null {
  const lessonIndex = parseInt(id, 10) - 1;
  const lessonData = sampleContent.lessons[lessonIndex];
  
  if (!lessonData) {
    return null;
  }
  
  // The JSON doesn't have IDs, so we'll add them dynamically.
  return {
    ...lessonData,
    id: String(lessonIndex + 1),
    subtopics: lessonData.subtopics.map((sub, subIndex) => ({
      ...sub,
      id: `${lessonIndex + 1}-${subIndex + 1}`,
      lesson_id: String(lessonIndex + 1),
    }))
  };
}

export default async function LessonDetailPage({ params }: { params: { lessonId: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const lesson = getLessonById(params.lessonId);
  if (!lesson) {
    notFound();
  }

  const subtopics = lesson.subtopics;
  const userSubscription = await getUserSubscription(supabase);
  const hasPremium = userSubscription?.is_active ?? false;

  const getNextUnlockTime = () => {
    const now = new Date();
    const result = new Date(now);
    // Logic to set to next Monday 9 AM
    const day = now.getDay();
    const add = (1 - day + 7) % 7;
    result.setDate(now.getDate() + add);
    if (result.getTime() < now.getTime()) {
      result.setDate(result.getDate() + 7);
    }
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
          <CardTitle className="font-headline">Next Weekly Lesson Unlocks In</CardTitle>
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
          {subtopics && subtopics.length > 0 ? (
            subtopics.map((subtopic: Subtopic) => {
              const isLocked = !lesson.is_free && !hasPremium;
              // Here we can assume a completed status based on another data source in a real app
              const status = isLocked ? 'locked' : 'unlocked';
              return (
                <SubtopicRow key={subtopic.id} subtopic={subtopic} status={status} />
              );
            })
          ) : (
            <div className="text-center text-muted-foreground py-8">
                <p>No subtopics found for this lesson.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
