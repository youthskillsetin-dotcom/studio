
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PracticeForm } from '@/components/practice-form';
import Link from 'next/link';
import { ChevronLeft, Lightbulb, Bot, ArrowRight } from 'lucide-react';
import sampleContent from '../../../../../sample-content.json';
import type { Subtopic, Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';


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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm">
                <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">{subtopic.title}</h1>
                <div className="prose dark:prose-invert max-w-none mt-8 text-muted-foreground">
                    <div dangerouslySetInnerHTML={{ __html: subtopic.content }} />
                </div>
            </div>

            {/* Practice Section */}
            <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm">
                 <h2 className="text-2xl font-bold tracking-tight text-foreground font-headline mb-6">Practice Zone</h2>
                 <p className="font-semibold text-foreground mb-4">{subtopic.practice_question}</p>
                 <PracticeForm subtopic={subtopic} />
            </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8 sticky top-24 self-start">
             <Card>
                <CardHeader className="flex-row items-center gap-2 space-y-0">
                    <Bot className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline">AI Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        This lesson introduces variables as named containers for storing data and covers Python's fundamental data types.
                    </p>
                </CardContent>
             </Card>

             <Card className="bg-accent/10 border-accent/20">
                <CardHeader className="flex-row items-center gap-2 space-y-0">
                    <Lightbulb className="w-6 h-6 text-accent-foreground" />
                    <CardTitle className="font-headline">Hints</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                       Remember that variable names are case-sensitive. Use the `type()` function to check a variable's data type.
                    </p>
                </CardContent>
             </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Next Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Link href="#" className="group block rounded-lg -m-4 p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-primary">Operators</p>
                                <p className="text-sm text-muted-foreground">Introduction to Python</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </Link>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
