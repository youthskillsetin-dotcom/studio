
import { notFound } from 'next/navigation';
import type { Subtopic, Lesson } from '@/lib/types';
import { SubtopicRow } from '@/components/subtopic-row';
import { CountdownTimer } from '@/components/countdown-timer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserSubscription, getLessonByIdWithSubtopics, getUserProfile } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { lessonId: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lesson = await getLessonByIdWithSubtopics(params.lessonId)

  if (!lesson) {
    return {
      title: 'Lesson Not Found',
      description: 'The requested lesson could not be found.',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${lesson.title} | YouthSkillSet`,
    description: lesson.description,
    openGraph: {
        title: lesson.title,
        description: lesson.description,
        images: [...previousImages],
    },
  }
}

export default async function LessonDetailPage({ params }: { params: { lessonId: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const lesson = await getLessonByIdWithSubtopics(params.lessonId);
  if (!lesson) {
    notFound();
  }

  const subtopics = lesson.subtopics;
  const userSubscription = await getUserSubscription(supabase);
  const userProfile = await getUserProfile(supabase);
  const hasPremium = userSubscription?.is_active ?? false;
  const isAdmin = userProfile?.role === 'admin';

  const getNextUnlockTime = () => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };
  
  const nextUnlockDate = getNextUnlockTime();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: lesson.title,
    description: lesson.description,
    provider: {
      '@type': 'Organization',
      name: 'YouthSkillSet',
      url: 'https://youthskillset.in'
    },
  };

  return (
    <div className="space-y-6">
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
          <Link href="/lessons">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Lessons
          </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold font-headline">{lesson.title}</h1>
        <p className="text-muted-foreground mt-1">{lesson.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Next Daily Lesson Unlocks In</CardTitle>
        </CardHeader>
        <CardContent>
          <CountdownTimer targetDate={nextUnlockDate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Subtopics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {subtopics && subtopics.length > 0 ? (
            subtopics.map((subtopic: Subtopic) => {
              const isLocked = !lesson.is_free && !hasPremium && !isAdmin;
              // Here we can assume a completed status based on another data source in a real app
              const status = isLocked ? 'locked' : 'unlocked';
              return (
                <SubtopicRow key={subtopic.id} subtopic={subtopic} status={status} />
              );
            })
          ) : (
            <div className="text-center text-muted-foreground py-8">
                <p>No subtopics found for this lesson.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
