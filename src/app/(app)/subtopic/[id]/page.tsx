
import { notFound, redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PracticeForm } from '@/components/practice-form';
import Link from 'next/link';
import { ChevronLeft, Lightbulb, Bot, ArrowRight, Video } from 'lucide-react';
import type { Subtopic, Lesson, PracticeQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserSubscription, getSubtopicByIdWithRelations, getSubtopicTitleById } from '@/lib/data';
import { Suspense } from 'react';
import { AISummaryCard, AISummaryCardSkeleton } from '@/components/ai-summary-card';

export default async function SubtopicPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = await getSubtopicByIdWithRelations(params.id);
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

  const nextSubtopicTitle = nextSubtopicId ? await getSubtopicTitleById(nextSubtopicId) : null;

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
             <Suspense fallback={<AISummaryCardSkeleton />}>
                <AISummaryCard 
                    title={subtopic.title}
                    content={subtopic.content}
                    existingSummary={subtopic.ai_summary}
                />
             </Suspense>

             <Card className="bg-accent/10 border-accent/20">
                <CardHeader className="flex-row items-center gap-2 space-y-0">
                    <Lightbulb className="w-6 h-6 text-accent-foreground" />
                    <CardTitle className="font-headline">Hint</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                       Stuck on a question? Try re-reading the "Key Concepts" section in the lesson content above. The answer is often hidden there!
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
