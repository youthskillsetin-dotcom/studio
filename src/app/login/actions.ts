
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(values: z.infer<typeof loginSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signup(values: z.infer<typeof signupSchema>) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
            // If you want to send a verification email, configure it here
            // emailRedirectTo: `${location.origin}/auth/callback`,
        },
    });

    if (error) {
        return { error: error.message };
    }
    
    // Supabase automatically signs in the user after signup, so no need to call login()
    return { success: true };
}
