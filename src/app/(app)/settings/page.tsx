
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function SettingsPage() {

  // Placeholder for subscription status
  const isPremium = false;

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Settings</h1>
      <div className="grid gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>This application is in public mode. No account is needed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm text-muted-foreground">Public Access</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription plan and billing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">Current Plan</p>
                <Badge variant={isPremium ? "default" : "secondary"}>
                    {isPremium ? 'Premium' : 'Free'}
                </Badge>
              </div>
              <Button asChild variant="outline" className="mt-4 sm:mt-0">
                <Link href="/#pricing">
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
