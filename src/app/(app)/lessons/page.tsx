
import type { Lesson } from '@/lib/types';
import { LessonCard } from '@/components/lesson-card';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserSubscription, getLessons, getUserProfile } from '@/lib/data';


export default async function LessonsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const lessons: Lesson[] = await getLessons();
  
  const userSubscription = await getUserSubscription(supabase);
  const userProfile = await getUserProfile(supabase);
  const hasPremium = userSubscription?.is_active ?? false;

  return (
    <div className="max-w-7xl mx-auto">
       <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Learn</h1>
        <p className="text-muted-foreground mt-2 text-lg">Expand your knowledge with our curated lessons.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson: Lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} userProfile={userProfile} />
        ))}
      </div>
    </div>
  );
}
