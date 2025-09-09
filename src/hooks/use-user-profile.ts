
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { UserProfile } from '@/lib/types';


export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Don't set loading to true here to prevent re-triggering skeletons on auth changes
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Fetch the role and full_name directly from the profiles table.
        // This is the most reliable source of truth, especially after manual changes.
        const { data: profileData, error } = await supabase
            .from('profiles')
            .select('role, full_name, avatar_url, contact_no')
            .eq('id', user.id)
            .single();

        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
             // Intentionally not logging this error to the console to avoid clutter.
        }
        
        // Prioritize data from the 'profiles' table first, then fall back to metadata.
        const role = profileData?.role ?? user.user_metadata?.role ?? 'user';
        const fullName = profileData?.full_name ?? user.user_metadata?.full_name ?? user.email?.split('@')[0];
        
        setUserProfile({
            id: user.id,
            email: user.email || 'user@example.com',
            role: role,
            fullName: fullName,
            created_at: user.created_at,
            avatar_url: profileData?.avatar_url,
            contact_no: profileData?.contact_no
        });

      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    };

    fetchUserProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Refetch the profile on any auth event to ensure data is fresh.
        fetchUserProfile();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  return { userProfile, isLoading };
}
