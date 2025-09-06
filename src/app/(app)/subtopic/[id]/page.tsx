
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PracticeForm } from '@/components/practice-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import sampleContent from '../../../../../sample-content.json';
import type { Subtopic, Lesson } from '@/lib/types';


// Since we are not using a DB, we'll create a simple function to get data from the JSON
function getSubtopicById(id: string): (Subtopic & { lesson: Lesson }) | null {
  // ID format is assumed to be "lessonIndex-subtopicIndex"
  const ids = id.split('-').map(n => parseInt(n, 10));
  if (ids.length !== 2 || isNaN(ids[0]) || isNaN(ids[1])) return null;

  const lessonIndex = ids[0] - 1;
  const subtopicIndex = ids[1] - 1;

  const lessonData = sampleContent.lessons[lessonIndex];
  if (!lessonData) return null;
  
  const subtopicData = lessonData.subtopics[subtopicIndex];
  if (!subtopicData) return null;
  
  // The JSON doesn't have IDs, so we'll add them dynamically.
  return { 
    ...subtopicData, 
    id,
    lesson_id: String(lessonIndex + 1),
    lesson: {
        ...lessonData,
        id: String(lessonIndex + 1)
    }
  } as (Subtopic & { lesson: Lesson });
}


export default async function SubtopicPage({ params }: { params: { id: string } }) {

  const data = getSubtopicById(params.id);
  if (!data) {
    notFound();
  }
  const { lesson, ...subtopic } = data;

  return (
    <div className="space-y-6">
       <Link href={`/lessons/${subtopic.lesson_id}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to {lesson?.title}
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose dark:prose-invert max-w-none bg-card p-6 rounded-lg shadow-sm">
           <h1 className="font-headline text-3xl mb-4">{subtopic.title}</h1>
           <div dangerouslySetInnerHTML={{ __html: subtopic.content }} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Practice Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <PracticeForm subtopic={subtopic} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
