
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
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData, error } = await supabase
            .from('profiles')
            .select('role, full_name, avatar_url, contact_no')
            .eq('id', user.id)
            .single();

        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
             // PGRST116 means no rows found, which is not an error in this case.
             // 42P01 means table does not exist, which can happen in early dev.
             console.warn("Error fetching user profile:", error.message);
        }
        
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
        // This covers sign in, sign out, and token refreshes which might have new metadata.
        fetchUserProfile();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);


  return { userProfile, isLoading };
}

    