import { notFound } from 'next/navigation';
import { getSubtopicById, getLessonById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PracticeForm } from '@/components/practice-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function SubtopicPage({ params }: { params: { id: string } }) {
  const subtopic = getSubtopicById(params.id);
  if (!subtopic) {
    notFound();
  }
  const lesson = getLessonById(subtopic.lesson_id);

  return (
    <div className="space-y-6">
       <Link href={`/lessons/${subtopic.lesson_id}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to {lesson?.title}
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose dark:prose-invert max-w-none bg-white p-6 rounded-lg shadow-sm">
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
