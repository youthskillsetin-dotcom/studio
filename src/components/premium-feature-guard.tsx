
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useUserSubscription } from '@/hooks/use-user-subscription';
import { Crown, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


interface PremiumFeatureGuardProps {
  children: React.ReactNode;
  featureName: string;
  href: string;
  className?: string;
}

export function PremiumFeatureGuard({ children, featureName, href, className }: PremiumFeatureGuardProps) {
  const { userSubscription } = useUserSubscription();
  const router = useRouter();
  
  // This state ensures the component renders the same way on server and client initially
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const hasPremium = userSubscription?.is_active ?? false;
  
  const handleNavigate = (e: React.MouseEvent) => {
    if (hasPremium) {
      router.push(href);
    }
  };

  // On the server, and during the initial client render before `isMounted` is true,
  // we render a version that matches the `hasPremium = false` state but without the interactive dialog.
  if (!isMounted) {
    return (
      <button className={cn("flex items-center w-full", className)} disabled>
        {children}
      </button>
    )
  }

  if (hasPremium) {
    return (
        <Link href={href} className={className}>
             {children}
        </Link>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={cn("flex items-center w-full", className)}>
            {children}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Crown className="h-8 w-8 text-primary" />
            </div>
          <AlertDialogTitle className="text-center font-headline text-2xl">Unlock the {featureName}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This feature is exclusively available to our Premium members. Upgrade your plan to get instant access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          <AlertDialogAction asChild>
            <Link href="/subscribe?plan=premium">Upgrade to Premium</Link>
          </AlertDialogAction>
          <AlertDialogCancel>Maybe Later</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
