
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLessons, mockUserProgress, getSubtopicsByLessonId, getSubtopicById } from '@/lib/mock-data';
import { Play, Bot, Briefcase, ChevronRight, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const lessonInProgress = mockLessons[0];
  const allSubtopics = mockLessons.flatMap(l => getSubtopicsByLessonId(l.id));
  const completedSubtopicsCount = mockUserProgress.filter(p => p.status === 'completed').length;
  
  const progress = (completedSubtopicsCount / allSubtopics.length) * 100;
  
  // Find the next subtopic that is 'unlocked'
  const nextSubtopicProgress = mockUserProgress.find(p => p.status === 'unlocked');
  const nextSubtopic = nextSubtopicProgress ? getSubtopicById(nextSubtopicProgress.subtopic_id) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome Back!</h1>
        <p className="text-muted-foreground mt-1">
          Let's continue making progress on your learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gradient-to-br from-primary to-purple-700 text-primary-foreground shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Continue Learning</CardTitle>
                    {lessonInProgress && <CardDescription className="text-primary-foreground/80">Your next step in: {lessonInProgress.title}</CardDescription>}
                </CardHeader>
                <CardContent>
                    {nextSubtopic ? (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">{nextSubtopic.title}</h3>
                            <div className="flex items-center gap-4">
                               <Progress value={progress} className="w-full h-2 bg-primary-foreground/30 [&>div]:bg-accent" />
                               <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                            </div>
                            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href={`/subtopic/${nextSubtopic.id}`}>
                                    Start Practice <Play className="ml-2"/>
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <p>You've completed all available lessons for now. Great job!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
             <div className="grid md:grid-cols-2 gap-6">
                 <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium font-body">AI Mentor</CardTitle>
                        <Bot className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground mb-4">
                            Stuck? Ask your AI-powered mentor for guidance.
                        </p>
                        <Button asChild variant="link" className="p-0 h-auto">
                           <Link href="/ai-mentor">Ask Mentor <ChevronRight className="ml-1 w-4 h-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium font-body">Career Guide</CardTitle>
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground mb-4">
                            Explore career paths and get personalized advice.
                        </p>
                         <Button asChild variant="link" className="p-0 h-auto">
                           <Link href="/career-guide">View Guide <ChevronRight className="ml-1 w-4 h-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
             </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-md flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold">Lessons</p>
                                <p className="text-xs text-muted-foreground">Completed</p>
                            </div>
                        </div>
                        <p className="text-lg font-bold">1 / {mockLessons.length}</p>
                    </div>
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-md flex items-center justify-center">
                                <Play className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold">Subtopics</p>
                                <p className="text-xs text-muted-foreground">Completed</p>
                            </div>
                        </div>
                        <p className="text-lg font-bold">{completedSubtopicsCount} / {allSubtopics.length}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-base">All Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/lessons">
                            View All Lessons
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
