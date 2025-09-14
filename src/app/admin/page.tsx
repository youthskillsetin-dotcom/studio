
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllUsers, getUserProfile, getPosts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Crown, BarChart, FileText, Bell, MessageSquare, ArrowRight, BookMarked, FilePlus2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentUserProfile = await getUserProfile(supabase);

  // This check is redundant due to the layout, but good for safety
  if (currentUserProfile?.role !== 'admin') {
    notFound();
  }

  const allUsers = await getAllUsers();
  const totalUsers = allUsers.length;
  const premiumUsers = allUsers.filter(u => u.subscription?.is_active).length;
  const posts = await getPosts();
  const totalPosts = posts.length;

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              All registered users on the platform.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Premium Subscribers
            </CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{premiumUsers}</div>
            <p className="text-xs text-muted-foreground">
              Users with an active premium plan.
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Community Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              Total posts created in the community forum.
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/admin/users">
                        <CardHeader className="flex-row items-center gap-4">
                            <Users className="w-6 h-6 text-primary" />
                            <CardTitle className="text-base">User Management</CardTitle>
                        </CardHeader>
                    </Link>
                </Card>
                <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/admin/content/generator">
                        <CardHeader className="flex-row items-center gap-4">
                            <FilePlus2 className="w-6 h-6 text-primary" />
                            <CardTitle className="text-base">Subtopic Generator</CardTitle>
                        </CardHeader>
                    </Link>
                </Card>
                <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/admin/course-maker">
                        <CardHeader className="flex-row items-center gap-4">
                            <BookMarked className="w-6 h-6 text-primary" />
                            <CardTitle className="text-base">Course Maker</CardTitle>
                        </CardHeader>
                    </Link>
                </Card>
                 <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/admin/content">
                        <CardHeader className="flex-row items-center gap-4">
                            <FileText className="w-6 h-6 text-primary" />
                            <CardTitle className="text-base">Content Management</CardTitle>
                        </CardHeader>
                    </Link>
                </Card>
                 <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="/admin/notifications">
                         <CardHeader className="flex-row items-center gap-4">
                            <Bell className="w-6 h-6 text-primary" />
                            <CardTitle className="text-base">Send Notifications</CardTitle>
                        </CardHeader>
                    </Link>
                </Card>
            </div>
       </div>
    </div>
  );
}
