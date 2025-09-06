import { LessonCard } from '@/components/lesson-card';
import { mockLessons } from '@/lib/mock-data';
import type { Lesson } from '@/lib/types';

export default function LessonsPage() {
  // In a real app, you would also fetch user subscription status
  const hasPremium = false;

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Your Learning Path</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLessons.map((lesson: Lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} hasPremium={hasPremium} />
        ))}
      </div>
    </div>
  );
}
