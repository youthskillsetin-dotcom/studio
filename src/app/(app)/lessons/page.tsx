
import type { Lesson } from '@/lib/types';
import { LessonCard } from '@/components/lesson-card';
import sampleContent from '../../../../sample-content.json';

export default async function LessonsPage() {
  const lessons: Lesson[] = sampleContent.lessons.map((lesson, index) => ({
    ...lesson,
    id: String(index + 1),
  })) as Lesson[];
  
  const hasPremium = false; // Placeholder for user subscription status

  return (
    <div className="max-w-7xl mx-auto">
       <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Learn</h1>
        <p className="text-muted-foreground mt-2 text-lg">Expand your knowledge with our curated lessons.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson: Lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} />
        ))}
      </div>
    </div>
  );
}
