
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockLessons, mockUserProgress, getSubtopicsByLessonId } from '@/lib/mock-data';
import { Play, Bot, Briefcase, Award, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const lessonInProgress = mockLessons[0];
  const subtopics = getSubtopicsByLessonId(lessonInProgress.id);
  const completedSubtopicsCount = mockUserProgress.filter(p => p.lesson_id === lessonInProgress.id && p.status === 'completed').length;
  const progressPercentage = subtopics.length > 0 ? (completedSubtopicsCount / subtopics.length) * 100 : 0;
  const nextSubtopic = subtopics.find(st => mockUserProgress.find(p => p.subtopic_id === st.id)?.status === 'unlocked');

  const totalLessons = mockLessons.length;
  const completedLessons = mockUserProgress.filter(p => p.status === 'completed').length > 0 ? 1 : 0; // Simplified for mock data

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Let's continue making progress on your learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Continue Learning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className='flex items-center gap-4'>
                 <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-primary"/>
                </div>
                <div>
                  <p className='font-semibold'>{lessonInProgress.title}</p>
                  <p className='text-sm text-muted-foreground'>Next up: {nextSubtopic?.title || 'No new subtopics'}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
                  <span className="text-sm text-muted-foreground">{completedSubtopicsCount}/{subtopics.length} Subtopics</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
               <Button asChild size="lg" className="w-full md:w-auto">
                <Link href={nextSubtopic ? `/subtopic/${nextSubtopic.id}` : `/lessons/${lessonInProgress.id}`}>
                  <Play className="mr-2 h-4 w-4" />
                  {progressPercentage > 0 ? 'Continue' : 'Start Lesson'}
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex flex-col items-start p-6 hover:bg-muted/50 transition-colors">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Bot className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg mb-2">AI Mentor</CardTitle>
              <CardDescription className="flex-grow">
                Have a question? Get instant help and guidance from your personalized AI mentor.
              </CardDescription>
              <Button asChild variant="link" className="p-0 mt-4">
                  <Link href="/ai-mentor">Ask MentorAI</Link>
              </Button>
            </Card>
             <Card className="flex flex-col items-start p-6 hover:bg-muted/50 transition-colors">
               <div className="p-3 rounded-full bg-accent/20 mb-4">
                  <Briefcase className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle className="font-headline text-lg mb-2">Career Guide</CardTitle>
              <CardDescription className="flex-grow">
                Explore career paths, see required skills, and plan your professional future.
              </CardDescription>
               <Button asChild variant="link" className="p-0 mt-4">
                  <Link href="/career-guide">View Roadmap</Link>
              </Button>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessons} / {totalLessons}</div>
              <p className="text-xs text-muted-foreground">Keep up the great work!</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Lesson Unlocks In</CardTitle>
               <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2d 14h</div>
               <p className="text-xs text-muted-foreground">New content is on the way.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
