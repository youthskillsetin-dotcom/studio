
'use client';

import { useState } from 'react';
import { LessonCard } from '@/components/lesson-card';
import { mockLessons } from '@/lib/mock-data';
import type { Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LessonsPage() {
  // In a real app, you would fetch user subscription status and progress
  const hasPremium = false;
  const [filter, setFilter] = useState('all');

  const filteredLessons = mockLessons.filter(lesson => {
    // In a real app, you'd have more complex logic based on user progress
    if (filter === 'in-progress') return true;
    if (filter === 'completed') return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
       <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Learn</h1>
        <p className="text-muted-foreground mt-2 text-lg">Expand your knowledge with our curated lessons.</p>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList className="border-b border-gray-200 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <h2 className="text-2xl font-bold tracking-tight mb-6">Available Lessons</h2>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockLessons.map((lesson: Lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} />
            ))}
          </div>
        </TabsContent>
         <TabsContent value="in-progress">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockLessons.slice(0,1).map((lesson: Lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} />
            ))}
          </div>
        </TabsContent>
         <TabsContent value="completed">
           <div className="text-center text-muted-foreground py-10">
              <p>You haven't completed any lessons yet.</p>
              <p>Keep learning to see your completed courses here!</p>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
