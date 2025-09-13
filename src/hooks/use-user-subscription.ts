
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
            console.warn("Error fetching user subscription:", error.message);
        }
        
        setUserSubscription(data);
      } else {
        setUserSubscription(null);
      }
       setIsLoading(false);
    };

    fetchUserSubscription();
    
    // Listen to auth events to refetch subscription when user signs in/out or is updated
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetchUserSubscription();
      }
    );

    // Also listen for database changes on the subscriptions table
    const subscriptionChannel = supabase
        .channel('subscriptions-changes')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'subscriptions' },
            (payload) => {
                // Refetch the subscription data when any change occurs
                fetchUserSubscription();
            }
        )
        .subscribe();


    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(subscriptionChannel);
    };
  }, [supabase]);

  return { userSubscription, isLoading };
}

    