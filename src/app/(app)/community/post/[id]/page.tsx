
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import AddCommentForm from './add-comment-form';

export default async function PostPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const post = await getPostById(params.id);

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

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl font-headline">{post.title}</CardTitle>
          <div className="text-sm text-muted-foreground flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{post.author_email ? post.author_email[0].toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{post.author_email || 'Anonymous'}</span>
                <span className="text-xs">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
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
        
        <AddCommentForm postId={post.id} />

        <div className="space-y-6 mt-6">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map(comment => (
              <Card key={comment.id} className="p-4 rounded-2xl">
                <div className="flex items-start gap-4">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>{comment.author_email ? comment.author_email[0].toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{comment.author_email || 'Anonymous'}</p>
                            <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </p>
                        </div>
                        <p className="text-muted-foreground mt-1">{comment.content}</p>
                    </div>
                </div>
              </Card>
            ))
          ) : (
             <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-2xl">
                <MessageCircle className="w-12 h-12 mx-auto mb-2"/>
                <p>No comments yet. Be the first to reply!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
