
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserProfile } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked } from 'lucide-react';
import { CourseMaker } from './_components/course-maker';


export default async function AdminCourseMakerPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentUserProfile = await getUserProfile(supabase);

  // Protect the route: only admins can access
  if (currentUserProfile?.role !== 'admin') {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex items-center gap-4 mb-6">
        <BookMarked className="w-8 h-8" />
        <div>
            <h1 className="text-3xl font-bold font-headline">AI Course Maker</h1>
            <p className="text-muted-foreground">Generate a complete multi-day course on any topic.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate New Course</CardTitle>
          <CardDescription>
            Enter a topic, and the AI will generate a full course structure with multiple subtopic lessons, practice questions, and summaries.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <CourseMaker />
        </CardContent>
      </Card>
    </div>
  );
}
