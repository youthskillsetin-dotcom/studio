
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default async function PostPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const post = await getPostById(supabase, params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button variant="link" className="p-0 h-auto" asChild>
          <Link href="/community">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Community
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl font-headline">{post.title}</CardTitle>
          <div className="text-sm text-muted-foreground flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{post.author_email ? post.author_email[0].toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{post.author_email}</span>
                <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>{post.content}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold font-headline mb-4">Discussion</h2>
        
        {/* New Comment Form */}
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg">Leave a Comment</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea placeholder="Share your thoughts..."/>
            </CardContent>
            <CardFooter>
                <Button>Submit Comment</Button>
            </CardFooter>
        </Card>

        {/* Existing Comments */}
        <div className="space-y-6">
            {/* Comments will be mapped here */}
            <div className="text-center py-8 text-muted-foreground">
                <p>No comments yet. Be the first to reply!</p>
            </div>
        </div>
      </div>
    </div>
  );
}
