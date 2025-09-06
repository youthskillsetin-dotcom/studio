
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { mockLessons, mockUserProgress, getSubtopicsByLessonId } from '@/lib/mock-data';
import { Play, Bot, Briefcase, FlaskConical } from 'lucide-react';

export default function DashboardPage() {
  const lessonInProgress = mockLessons[0];
  const allSubtopics = mockLessons.flatMap(l => getSubtopicsByLessonId(l.id));
  const completedSubtopicsCount = mockUserProgress.filter(p => p.status === 'completed').length;

  const totalLessons = mockLessons.length;
  const completedLessons = mockUserProgress.filter(p => p.status === 'completed').length > 0 ? 1 : 0; // Simplified for mock data


  return (
    <div className="flex flex-col max-w-5xl mx-auto">
        <div className="mb-8">
            <h1 className="text-gray-900 text-4xl font-bold leading-tight tracking-tight">Welcome back!</h1>
            <p className="text-gray-500 mt-2 text-lg">Let's continue making progress on your learning journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white shadow-md border-l-4 border-primary">
                <p className="text-gray-600 text-base font-medium leading-normal">Lessons Completed</p>
                <p className="text-primary text-4xl font-bold leading-tight">{completedLessons}</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white shadow-md border-l-4 border-primary">
                <p className="text-gray-600 text-base font-medium leading-normal">Subtopics Completed</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-primary text-4xl font-bold leading-tight">{completedSubtopicsCount}</p>
                    <span className="text-gray-400 font-medium">/ {allSubtopics.length}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white shadow-md border-l-4 border-accent">
                <p className="text-gray-600 text-base font-medium leading-normal">Next Unlock In</p>
                <p className="text-accent text-4xl font-bold leading-tight">2d 14h</p>
            </div>
        </div>
        <div className="mb-6">
            <h3 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="flex items-center justify-center gap-2 rounded-lg h-16 px-4 bg-primary text-white text-base font-bold tracking-wide shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/lessons">
                    <Play/>
                    <span className="truncate">Continue Learning</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="flex items-center justify-center gap-2 rounded-lg h-16 px-4 bg-white text-gray-800 border border-gray-200 text-base font-bold tracking-wide shadow-md hover:bg-gray-50 hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                 <Link href="/lessons">
                    <FlaskConical className="text-primary" />
                    <span className="truncate">Practice Lab</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="flex items-center justify-center gap-2 rounded-lg h-16 px-4 bg-white text-gray-800 border border-gray-200 text-base font-bold tracking-wide shadow-md hover:bg-gray-50 hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                 <Link href="/ai-mentor">
                    <Bot className="text-primary" />
                    <span className="truncate">Ask AI Mentor</span>
                </Link>
            </Button>
             <Button asChild className="flex items-center justify-center gap-2 rounded-lg h-16 px-4 bg-accent text-white text-base font-bold tracking-wide shadow-lg hover:bg-accent/90 transition-all duration-300 transform hover:-translate-y-1">
                 <Link href="/career-guide">
                    <Briefcase/>
                    <span className="truncate">Career Roadmap</span>
                </Link>
            </Button>
        </div>
    </div>
  );
}

