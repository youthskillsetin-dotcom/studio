
import Link from 'next/link';
import { cookies } from 'next/headers';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { getPosts, getUserProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, PlusCircle, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

function PremiumUpsell() {
    return (
        <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px] bg-muted/20">
            <ShieldCheck className="w-16 h-16 text-primary mb-4" />
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Premium Access Required</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground max-w-md mb-4">
                    The Community Hub is a premium feature. Upgrade your plan to ask questions, share projects, and connect with other learners.
                </p>
                <Button asChild>
                    <Link href="/#pricing">
                        View Upgrade Options
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default async function CommunityPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const userProfile = await getUserProfile(supabase);
  const canAccessCommunity = userProfile?.role === 'premium' || userProfile?.role === 'admin';

  if (!canAccessCommunity) {
      return <PremiumUpsell />;
  }

  // The getPosts function will return an empty array if tables don't exist.
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
                 <Link href={`/community/post/${post.id}`} className="block">
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
              </Link>
              <CardFooter>
                 <Button variant="link" className="p-0 h-auto text-xs" asChild>
                    <Link href={`/community/post/${post.id}`}>
                        <MessageSquare className="mr-2" />
                        View Discussion
                    </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
           <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
             <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
             <CardHeader>
               <CardTitle className="font-headline text-2xl">Community Hub is Under Construction</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground max-w-md mb-4">
                 This feature is not yet available as the backing database tables have not been set up. Please come back later!
               </p>
             </CardContent>
           </Card>
        )}
      </div>
    </div>
  );
}
