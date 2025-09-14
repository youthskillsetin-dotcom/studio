
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserProfile, getNotifications } from '@/lib/data';
import { Bell } from 'lucide-react';
import { CreateNotificationForm } from './_components/create-notification-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

export default async function AdminNotificationsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentUserProfile = await getUserProfile(supabase);

  // Protect the route: only admins can access
  if (currentUserProfile?.role !== 'admin') {
    notFound();
  }

  const recentNotifications = await getNotifications();

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
            <Bell className="w-8 h-8" />
            <div>
                <h1 className="text-3xl font-bold font-headline">Send Notification</h1>
                <p className="text-muted-foreground">Broadcast a message to all users.</p>
            </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            <div>
                <CreateNotificationForm />
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Notifications</CardTitle>
                        <CardDescription>The last 5 notifications sent.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentNotifications.length > 0 ? (
                                recentNotifications.slice(0, 5).map(notif => (
                                    <div key={notif.id} className="p-3 rounded-lg bg-muted/50 border">
                                        <p className="font-semibold">{notif.title}</p>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{notif.message}</p>
                                        <p className="text-xs text-muted-foreground/80 mt-2">{formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No notifications have been sent yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}
