
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getLessons } from '@/lib/data';
import type { Lesson } from '@/lib/types';
import { LessonCard } from '@/components/lesson-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenCheck } from 'lucide-react';

export default async function LessonsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const lessons = await getLessons(supabase);
  const hasPremium = false; // Placeholder for user subscription status

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
           {lessons && lessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lessons.map((lesson: Lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} />
                ))}
              </div>
           ) : (
             <div className="text-center text-muted-foreground py-20">
                <BookOpenCheck className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No Lessons Found</h3>
                <p className="mt-1 text-sm">It looks like there are no lessons available yet. Check back soon!</p>
            </div>
           )}
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
