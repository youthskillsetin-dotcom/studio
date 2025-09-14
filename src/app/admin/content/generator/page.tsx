
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserProfile } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus2 } from 'lucide-react';
import { ContentGenerator } from './_components/content-generator';


export default async function AdminContentGeneratorPage() {
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
        <FilePlus2 className="w-8 h-8" />
        <div>
            <h1 className="text-3xl font-bold font-headline">AI Content Generator</h1>
            <p className="text-muted-foreground">Create a new subtopic lesson with the help of AI.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate New Subtopic</CardTitle>
          <CardDescription>
            Enter a topic, and the AI will generate a draft for the title, content, practice questions, and summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <ContentGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
