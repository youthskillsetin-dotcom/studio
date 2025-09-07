'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Star } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionCardProps {
  isPremium: boolean;
}

export function SubscriptionCard({ isPremium }: SubscriptionCardProps) {
  return (
    <Card className="rounded-2xl bg-gradient-to-br from-primary to-purple-800 text-primary-foreground shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Crown className="w-6 h-6 text-accent" />
          {isPremium ? 'Premium Member' : 'Upgrade Plan'}
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          {isPremium
            ? 'You have access to all premium features.'
            : 'Unlock your full potential with a Premium subscription.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPremium ? (
          <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90" asChild>
            <Link href="/settings">Manage Subscription</Link>
          </Button>
        ) : (
          <div className="space-y-4">
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> Access to all lessons</li>
                <li className="flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> Unlimited AI Mentor</li>
                <li className="flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> Exclusive content</li>
            </ul>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/#pricing">Upgrade to Premium</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
