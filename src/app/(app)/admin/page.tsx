
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllUsers, getUserProfile } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Crown, BarChart } from 'lucide-react';
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
  const premiumUsers = allUsers.filter(u => u.role === 'premium').length;

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
            <CardTitle className="text-sm font-medium">
              Engagement
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Coming Soon</div>
             <p className="text-xs text-muted-foreground">
              Analytics on user activity.
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2">
                 <Card className="p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">User Management</h3>
                        <p className="text-sm text-muted-foreground">View and manage all users.</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/users">Go to Users <ArrowRight className="w-4 h-4 ml-2"/></Link>
                    </Button>
                </Card>
                 <Card className="p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Content Management</h3>
                        <p className="text-sm text-muted-foreground">Edit lesson video URLs.</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/content">Go to Content <ArrowRight className="w-4 h-4 ml-2"/></Link>
                    </Button>
                </Card>
            </div>
       </div>
    </div>
  );
}
