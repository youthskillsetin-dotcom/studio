
'use client';

import { useState, useEffect } from 'react';
import { LessonCard } from '@/components/lesson-card';
import { getLessons } from '@/lib/data';
import type { Lesson } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from '@/lib/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

export default function LessonsPage() {
  const hasPremium = false; // Placeholder for user subscription status
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const lessonsData = await getLessons(supabase);
      setLessons(lessonsData);
      setLoading(false);
    }
    fetchData();
  }, [supabase]);
  
  const LessonSkeleton = () => (
    <div className="flex flex-col space-y-3">
        <Skeleton className="h-[225px] w-full rounded-xl" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
       <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Learn</h1>
        <p className="text-muted-foreground mt-2 text-lg">Expand your knowledge with our curated lessons.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({length: 3}).map((_, i) => <LessonSkeleton key={i} />)
            ) : (
              lessons.map((lesson: Lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} />
              ))
            )}
          </div>
        </TabsContent>
         <TabsContent value="in-progress" className="mt-6">
            <div className="text-center text-muted-foreground py-10">
                <p>You have no lessons in progress.</p>
                <p>Start a lesson to track your progress here.</p>
            </div>
        </TabsContent>
         <TabsContent value="completed" className="mt-6">
           <div className="text-center text-muted-foreground py-10">
              <p>You haven't completed any lessons yet.</p>
              <p>Keep learning to see your completed courses here!</p>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
