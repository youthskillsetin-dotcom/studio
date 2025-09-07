
import { notFound, redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PracticeForm } from '@/components/practice-form';
import Link from 'next/link';
import { ChevronLeft, Lightbulb, Bot, ArrowRight, Video } from 'lucide-react';
import sampleContent from '../../../../../sample-content.json';
import type { Subtopic, Lesson, PracticeQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { generateSubtopicSummary } from '@/ai/flows/generate-subtopic-summary';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserSubscription } from '@/lib/data';


// Since we are not using a DB, we'll create a simple function to get data from the JSON
function getSubtopicById(id: string): (Subtopic & { lesson: Lesson; nextSubtopicId?: string }) | null {
  // ID format is assumed to be "lessonIndex-subtopicIndex"
  const ids = id.split('-').map(n => parseInt(n, 10));
  if (ids.length !== 2 || isNaN(ids[0]) || isNaN(ids[1])) return null;

  const lessonIndex = ids[0] - 1;
  const subtopicIndex = ids[1] - 1;

  const lessonData = sampleContent.lessons[lessonIndex];
  if (!lessonData) return null;
  
  const subtopicData = lessonData.subtopics[subtopicIndex];
  if (!subtopicData) return null;
  
  let nextSubtopicId: string | undefined = undefined;
  if (subtopicIndex + 1 < lessonData.subtopics.length) {
    nextSubtopicId = `${lessonIndex + 1}-${subtopicIndex + 2}`;
  }

  return { 
    ...subtopicData, 
    id,
    lesson_id: String(lessonIndex + 1),
    lesson: {
        ...lessonData,
        id: String(lessonIndex + 1)
    },
    nextSubtopicId,
  } as (Subtopic & { lesson: Lesson; nextSubtopicId?: string });
}

function getSubtopicTitleById(id: string): string | null {
    const ids = id.split('-').map(n => parseInt(n, 10));
    if (ids.length !== 2 || isNaN(ids[0]) || isNaN(ids[1])) return null;

    const lesson = sampleContent.lessons[ids[0] - 1];
    if (!lesson) return null;
    
    const subtopic = lesson.subtopics[ids[1] - 1];
    return subtopic?.title ?? null;
}


export default async function SubtopicPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = getSubtopicById(params.id);
  if (!data) {
    notFound();
  }
  const { lesson, nextSubtopicId, ...subtopic } = data;

  // Enforce subscription check
  const userSubscription = await getUserSubscription(supabase);
  const hasPremium = userSubscription?.is_active ?? false;
  if (!lesson.is_free && !hasPremium) {
    redirect(`/lessons/${lesson.id}`);
  }

  const summaryResult = await generateSubtopicSummary({
    title: subtopic.title,
    content: subtopic.content
  });

  const nextSubtopicTitle = nextSubtopicId ? getSubtopicTitleById(nextSubtopicId) : null;

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
                
                {subtopic.video_url && (
                    <div className="mt-6 aspect-video rounded-lg overflow-hidden border">
                        <iframe 
                            className="w-full h-full"
                            src={subtopic.video_url.replace("watch?v=", "embed/")} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                <div className="prose dark:prose-invert max-w-none mt-8 text-muted-foreground">
                    <div dangerouslySetInnerHTML={{ __html: subtopic.content }} />
                </div>
            </div>

            {/* Practice Section */}
             <div id="practice-zone">
                 <h2 className="text-2xl font-bold tracking-tight text-foreground font-headline mb-6">Practice Zone</h2>
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
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: summaryResult.summary.replace(/\n/g, '<br />') }} />
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

             {nextSubtopicId && nextSubtopicTitle && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Next Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Link href={`/subtopic/${nextSubtopicId}`} className="group block rounded-lg -m-4 p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-primary">{nextSubtopicTitle}</p>
                                    <p className="text-sm text-muted-foreground">{lesson.title}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </Link>
                    </CardContent>
                </Card>
             )}
        </div>
      </div>
    </div>
  );
}
