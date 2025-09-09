

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getUserProfile } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Video } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import sampleContent from '../../../../sample-content.json';
import { VideoLinkEditor } from './video-link-editor';

export default async function AdminContentPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentUserProfile = await getUserProfile(supabase);

  // Protect the route: only admins can access
  if (currentUserProfile?.role !== 'admin') {
    notFound();
  }

  const lessons = sampleContent.lessons;

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex items-center gap-4 mb-6">
        <FileText className="w-8 h-8" />
        <div>
            <h1 className="text-3xl font-bold font-headline">Content Management</h1>
            <p className="text-muted-foreground">Edit and manage lesson video links.</p>
        </div>
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>All Lessons & Subtopics</CardTitle>
          <CardDescription>
            Expand a lesson to view its subtopics and edit video URLs.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Accordion type="single" collapsible className="w-full">
            {lessons.map((lesson, lessonIndex) => (
                <AccordionItem key={lesson.title} value={`item-${lessonIndex}`}>
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        {lesson.title}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-4">
                        {lesson.subtopics.length > 0 ? lesson.subtopics.map((subtopic) => (
                            <Card key={subtopic.title} className="p-4 bg-muted/50">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h4 className="font-semibold">{subtopic.title}</h4>
                                        <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                            <Video className="w-4 h-4"/>
                                            Current URL: {subtopic.video_url ? <code className="text-xs">{subtopic.video_url}</code> : <span className="text-muted-foreground/70">Not set</span>}
                                        </p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <VideoLinkEditor 
                                            subtopicId={`${lessonIndex + 1}-${subtopic.order_index}`} 
                                            initialUrl={subtopic.video_url || ''} 
                                        />
                                    </div>
                                </div>
                            </Card>
                        )) : <p className="text-sm text-muted-foreground">No subtopics in this module.</p>}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
           </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
