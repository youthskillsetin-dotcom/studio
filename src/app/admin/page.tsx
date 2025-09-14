
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllUsers, getUserProfile, getPosts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Crown, BarChart, FileText, Bell, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
                 <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">User Management</h3>
                            <p className="text-sm text-muted-foreground">View and manage all users.</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/admin/users">Go <ArrowRight className="w-4 h-4 ml-2"/></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">Content Management</h3>
                            <p className="text-sm text-muted-foreground">Edit lesson video URLs.</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/admin/content">Go <ArrowRight className="w-4 h-4 ml-2"/></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">Send Notifications</h3>
                            <p className="text-sm text-muted-foreground">Broadcast messages to users.</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/admin/notifications">Go <ArrowRight className="w-4 h-4 ml-2"/></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
       </div>
    </div>
  );
}
