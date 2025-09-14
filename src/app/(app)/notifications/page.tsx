
import { getNotifications, getUserProfile } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, ChevronLeft } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function NotificationsPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await getUserProfile(supabase);
    const notifications = await getNotifications();

    if (!user) {
        notFound();
    }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Bell className="w-10 h-10 text-primary" />
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Notifications</h1>
            <p className="text-muted-foreground text-lg">Updates and announcements from the YouthSkillSet team.</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card key={notification.id} className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold font-headline line-clamp-2">{notification.title}</CardTitle>
                    <CardDescription className="text-sm pt-1">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{notification.message}</p>
                </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center py-16">
             <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <CardHeader>
              <CardTitle className="font-headline text-2xl">No new notifications</CardTitle>
              <CardDescription>
                Check back later for updates and announcements.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
