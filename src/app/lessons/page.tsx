
import type { Lesson } from '@/lib/types';
import { LessonCard } from '@/components/lesson-card';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserSubscription, getLessons, getUserProfile, getUserCourses } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { PremiumFeatureGuard } from '@/components/premium-feature-guard';


export default async function LessonsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const publicLessons: Lesson[] = await getLessons();
  const userCourses: Lesson[] = await getUserCourses(supabase);
  const lessons = [...publicLessons, ...userCourses].sort((a, b) => a.order_index - b.order_index);
  
  const userSubscription = await getUserSubscription(supabase);
  const userProfile = await getUserProfile(supabase);
  const hasPremium = userSubscription?.is_active ?? false;

  return (
    <div className="max-w-7xl mx-auto">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Learn</h1>
            <p className="text-muted-foreground mt-2 text-lg">Expand your knowledge with our curated lessons or create your own.</p>
        </div>
        <PremiumFeatureGuard href="/create-course" featureName="Create Course">
            <Button className="mt-4 sm:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
            </Button>
        </PremiumFeatureGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson: Lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} userProfile={userProfile} />
        ))}
      </div>
    </div>
  );
}

