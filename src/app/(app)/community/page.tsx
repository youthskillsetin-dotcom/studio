
import Link from 'next/link';
import { cookies } from 'next/headers';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { getPosts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default async function CommunityPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const posts = await getPosts(supabase);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Community Hub</h1>
            <p className="text-muted-foreground">Ask questions, share projects, and connect with other learners.</p>
        </div>
        <Button asChild>
          <Link href="/community/create"> 
            <PlusCircle className="mr-2" />
            Create Post
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <Card key={post.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-headline">{post.title}</CardTitle>
                <div className="text-xs text-muted-foreground flex items-center gap-4 pt-1">
                   <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                           <AvatarFallback>{post.author_email ? post.author_email[0].toUpperCase() : 'U'}</AvatarFallback>
                        </Avatar>
                        <span>{post.author_email}</span>
                   </div>
                   <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{post.content}</p>
              </CardContent>
              <CardFooter>
                 <Button variant="link" className="p-0 h-auto text-xs">
                    <MessageSquare className="mr-2" />
                    View Discussion (Coming Soon)
                 </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
           <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
             <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
             <CardHeader>
               <CardTitle className="font-headline text-2xl">No Discussions Yet</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground max-w-md mb-4">
                 It's quiet in here. Be the first to start a conversation!
               </p>
               <Button asChild>
                <Link href="/community/create"> 
                  <PlusCircle className="mr-2" />
                  Create First Post
                </Link>
              </Button>
             </CardContent>
           </Card>
        )}
      </div>
    </div>
  );
}
