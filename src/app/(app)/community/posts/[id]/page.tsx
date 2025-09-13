
import { notFound } from 'next/navigation';
import { getPostById, getCommentsByPostId, getUserProfile } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { CreateCommentForm } from '../../_components/create-comment-form';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

function getInitials(name?: string | null) {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name[0].toUpperCase();
}


export default async function PostPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const post = await getPostById(params.id);
  
  if (!post) {
    notFound();
  }

  const comments = await getCommentsByPostId(params.id);
  const currentUser = await getUserProfile(supabase);

  return (
    <div className="max-w-4xl mx-auto">
        <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary mb-4">
          <Link href="/community">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Community
          </Link>
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold font-headline">{post.title}</CardTitle>
          <CardDescription className="text-sm flex items-center gap-2 pt-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src={undefined} />
                <AvatarFallback className="text-xs">{getInitials(post.profile?.full_name)}</AvatarFallback>
            </Avatar>
            <span>Posted by {post.profile?.full_name || post.profile?.email.split('@')[0]} on {format(new Date(post.created_at), 'PPP')}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>{post.content}</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Comments ({comments.length})</h2>

        <div className="space-y-6 mb-8">
          {comments.map(comment => (
            <Card key={comment.id} className="p-4 bg-muted/40">
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={comment.profile?.avatar_url || undefined} />
                    <AvatarFallback>{getInitials(comment.profile?.full_name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{comment.profile?.full_name || comment.profile?.email.split('@')[0]}</span>
                    <span className="text-muted-foreground">&bull;</span>
                    <span className="text-muted-foreground">{format(new Date(comment.created_at), 'PPp')}</span>
                  </div>
                  <p className="mt-1 text-foreground">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))}
          {comments.length === 0 && (
             <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to reply!</p>
          )}
        </div>
        
        {currentUser && <CreateCommentForm postId={params.id} user={currentUser} />}
        
      </div>
    </div>
  );
}
