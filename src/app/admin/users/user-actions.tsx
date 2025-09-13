
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { grantPremiumAccess, revokePremiumAccess } from './actions';
import type { UserProfileWithSubscription } from '@/lib/types';
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

interface UserActionsProps {
  user: UserProfileWithSubscription;
}

export function UserActions({ user }: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isPremium = user.role === 'premium';

  const handleAction = async () => {
    setIsLoading(true);
    const action = isPremium ? revokePremiumAccess : grantPremiumAccess;
    const result = await action(user.id);
    
    if (result.success) {
      toast({
        title: "Success",
        description: `User ${user.email} has been updated.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: "Error",
        description: result.error || 'An unexpected error occurred.',
      });
    }
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
            variant={isPremium ? 'destructive' : 'outline'} 
            size="sm"
            disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPremium ? 'Revoke Premium' : 'Grant Premium'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will {isPremium ? 'revoke' : 'grant'} premium access for the user <span className="font-semibold">{user.email}</span>.
            {isPremium ? ' They will lose access to premium features.' : ' They will gain access to all premium features.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction} disabled={isLoading}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
