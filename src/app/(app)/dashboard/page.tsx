'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockLessons, mockUserProgress } from '@/lib/mock-data';
import { Play, FlaskConical, Bot, Briefcase } from 'lucide-react';

export default function DashboardPage() {
  const completedLessons = mockUserProgress.filter(p => p.status === 'completed').length;
  const completedSubtopics = mockUserProgress.filter(p => p.status === 'completed').length;
  const totalSubtopics = mockUserProgress.length;

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-gray-900 text-4xl font-bold leading-tight tracking-tight font-headline">Welcome back!</h1>
        <p className="text-muted-foreground mt-2 text-lg">Let's continue making progress on your learning journey.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card className="flex flex-col gap-2 rounded-xl p-6 shadow-md border-l-4 border-primary">
          <p className="text-muted-foreground text-base font-medium leading-normal">Lessons Completed</p>
          <p className="text-primary text-4xl font-bold leading-tight">{completedLessons}</p>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl p-6 shadow-md border-l-4 border-primary">
          <p className="text-muted-foreground text-base font-medium leading-normal">Subtopics Completed</p>
          <div className="flex items-baseline gap-2">
            <p className="text-primary text-4xl font-bold leading-tight">{completedSubtopics}</p>
            <span className="text-gray-400 font-medium">/ {totalSubtopics}</span>
          </div>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl p-6 shadow-md border-l-4 border-accent">
          <p className="text-muted-foreground text-base font-medium leading-normal">Next Unlock In</p>
          <p className="text-accent text-4xl font-bold leading-tight">2d 14h</p>
        </Card>
      </div>
      <div className="mb-6">
        <h3 className="text-foreground text-2xl font-bold leading-tight tracking-tight font-headline">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button asChild className="h-16 text-base font-bold tracking-wide shadow-lg hover:-translate-y-1 transition-transform">
          <Link href={`/lessons/${mockLessons[0].id}`}>
            <Play />
            <span className="truncate">Continue Learning</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-16 text-base font-bold tracking-wide shadow-md hover:-translate-y-1 transition-transform hover:border-primary group">
          <Link href="/subtopic/subtopic-1-2">
            <FlaskConical className="text-primary transition-colors" />
            <span className="truncate">Practice Lab</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-16 text-base font-bold tracking-wide shadow-md hover:-translate-y-1 transition-transform hover:border-primary group">
          <Link href="/ai-mentor">
            <Bot className="text-primary transition-colors" />
            <span className="truncate">Ask AI Mentor</span>
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-16 text-base font-bold tracking-wide shadow-lg hover:-translate-y-1 transition-transform bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/career-guide">
            <Briefcase/>
            <span className="truncate">Career Roadmap</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
