
import { getPosts } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus, Users, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { CreatePostDialog } from './_components/create-post-dialog';

export default async function CommunityPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
         <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Users className="w-10 h-10 text-primary" />
            <div>
                 <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Community Forum</h1>
                 <p className="text-muted-foreground text-lg">Ask questions, share ideas, and learn together.</p>
            </div>
        </div>
        <CreatePostDialog />
      </div>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="hover:bg-muted/50 transition-colors">
              <Link href={`/community/posts/${post.id}`}>
                <CardHeader>
                    <CardTitle className="text-lg font-bold font-headline line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="text-sm flex items-center gap-4 pt-1">
                        <span>By {post.profile?.email.split('@')[0] || 'A User'}</span>
                        <span>&bull;</span>
                        <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                    </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))
        ) : (
          <Card className="text-center py-16">
             <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <CardHeader>
              <CardTitle className="font-headline text-2xl">It's quiet in here...</CardTitle>
              <CardDescription>
                No posts have been made yet. Be the first to start a conversation!
              </CardDescription>
            </CardHeader>
            <CreatePostDialog />
          </Card>
        )}
      </div>
    </div>
  );
}
