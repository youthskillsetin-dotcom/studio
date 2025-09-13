
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getUserProfile, getUserSubscription } from '@/lib/data';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function SettingsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userProfile = await getUserProfile(supabase);
  const userSubscription = await getUserSubscription(supabase);
  const isPremium = userSubscription?.is_active ?? false;

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Settings</h1>
      <div className="grid gap-6 max-w-4xl mx-auto">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">Full Name</p>
              <p className="text-sm text-muted-foreground">{userProfile?.fullName}</p>
            </div>
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{userProfile?.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">Contact No.</p>
              <p className="text-sm text-muted-foreground">{userProfile?.contact_no || 'Not provided'}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">Joined</p>
              <p className="text-sm text-muted-foreground">
                {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Crown className="w-5 h-5 text-accent"/>Subscription</CardTitle>
            <CardDescription>Manage your subscription plan and billing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-muted/50 border">
              <div>
                <p className="text-sm font-medium mb-2">Current Plan</p>
                <Badge variant={isPremium ? "default" : "secondary"} className={cn(isPremium ? 'bg-gradient-to-r from-amber-500 to-yellow-300 text-black shadow-lg' : '')}>
                    {userSubscription?.plan_name ?? 'Free'}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mt-4 sm:mt-0 sm:text-right">
                {isPremium && userSubscription?.expires_at ? (
                    <>
                        <p className="flex items-center gap-2 justify-end text-green-600 dark:text-green-400 font-semibold"> <CheckCircle className="w-4 h-4" /> Active</p>
                        <p>Renews on {format(new Date(userSubscription.expires_at), 'PPP')}</p>
                    </>
                ) : (
                    <p className="flex items-center gap-2 justify-end font-semibold"><XCircle className="w-4 h-4 text-destructive" /> Inactive</p>
                )}
               </div>
            </div>
             <div className="flex justify-end pt-4">
                 <Button asChild className={cn(!isPremium && "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all")}>
                    <Link href="/subscribe">
                    {isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
                    </Link>
                </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    