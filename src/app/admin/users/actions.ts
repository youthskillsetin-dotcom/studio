
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/admin';

async function verifyAdmin() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required.');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') throw new Error('Permission denied. You must be an admin.');
    
    return user;
}

export async function grantPremiumAccess(userId: string): Promise<{success: boolean, error?: string}> {
  try {
    await verifyAdmin();
    if (!supabaseAdmin) throw new Error('Admin client not initialized.');

    // Update role in profiles table
    const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({ role: 'premium' })
        .eq('id', userId);

    if (profileError) throw profileError;

    // Create or update subscription record
    const expires_at = new Date();
    expires_at.setFullYear(expires_at.getFullYear() + 100); // Set expiration far in the future

    const { error: subsError } = await supabaseAdmin
        .from('subscriptions')
        .upsert({
            user_id: userId,
            is_active: true,
            plan_name: 'Premium',
            expires_at: expires_at.toISOString(),
        }, { onConflict: 'user_id' });

    if (subsError) throw subsError;

    revalidatePath('/admin/users');
    return { success: true };

  } catch (error: any) {
    console.error('Grant Premium Access Error:', error);
    return { success: false, error: error.message };
  }
}


export async function revokePremiumAccess(userId: string): Promise<{success: boolean, error?: string}> {
    try {
        await verifyAdmin();
        if (!supabaseAdmin) throw new Error('Admin client not initialized.');

        // Update role in profiles table
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({ role: 'user' })
            .eq('id', userId);

        if (profileError) throw profileError;

        // Deactivate subscription
        const { error: subsError } = await supabaseAdmin
            .from('subscriptions')
            .update({ is_active: false })
            .eq('user_id', userId);
        
        // This won't throw an error if no subscription exists, which is fine.
        if (subsError) throw subsError;

        revalidatePath('/admin/users');
        return { success: true };

    } catch (error: any {
        console.error('Revoke Premium Access Error:', error);
        return { success: false, error: error.message };
    }
}
