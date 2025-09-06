
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import type { OtpType } from '@supabase/supabase-js';

export async function verifyOtp(email: string, token: string, type: OtpType) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return { error: 'Could not verify OTP. Please try again.' };
  }
  
  return { session: data.session };
}
