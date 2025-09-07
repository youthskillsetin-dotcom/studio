
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { UserProfile } from '@/lib/types';
import { useUser } from '@supabase/auth-helpers-react';


export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error("Error fetching user profile", error);
        }
        
        const role = data?.role ?? 'user';
        const fullName = data?.full_name ?? user?.user_metadata?.full_name ?? user.email?.split('@')[0];

        setUserProfile({
            id: user.id,
            email: user.email || 'user@example.com',
            role: role,
            fullName: fullName,
        });

      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    };

    fetchUserProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'SIGNED_OUT') {
           fetchUserProfile();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);


  return { userProfile, isLoading };
}
