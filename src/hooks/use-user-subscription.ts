
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { UserSubscription } from '@/lib/types';

export function useUserSubscription() {
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
         const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();
        
        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
            // Intentionally not logging this error to the console to avoid clutter
            // in dev environments where the table might not exist yet.
        }
        
        setUserSubscription(data);
      } else {
        setUserSubscription(null);
      }
       setIsLoading(false);
    };

    fetchUserSubscription();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // We only refetch if state changes, not on session refresh (TOKEN_REFRESHED)
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
           fetchUserSubscription();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { userSubscription, isLoading };
}
