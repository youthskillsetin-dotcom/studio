
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// This is a mock webhook handler. In a real app, you would have a webhook
// from your payment provider (e.g., Stripe) that would call this endpoint.
// It should also be secured with a secret to ensure it's a legitimate call.
export async function POST(req: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const expires_at = new Date();
        expires_at.setMonth(expires_at.getMonth() + 1);

        const { error: insertError } = await supabase
            .from('subscriptions')
            .insert({
                user_id: user.id,
                is_active: true,
                plan_name: 'Premium',
                expires_at: expires_at.toISOString(),
            });

        if (insertError) {
             console.error('Error creating subscription:', insertError);
            // Attempt to update if it already exists (e.g., re-subscribing)
            if (insertError.code === '23505') { // unique constraint violation
                 const { error: updateError } = await supabase
                    .from('subscriptions')
                    .update({
                        is_active: true,
                        plan_name: 'Premium',
                        expires_at: expires_at.toISOString(),
                     })
                    .eq('user_id', user.id);
                 
                 if (updateError) {
                    console.error('Error updating subscription:', updateError);
                    throw updateError;
                 }
            } else {
                 throw insertError;
            }
        }
        
         // Also update the user's role in the profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ role: 'premium' })
            .eq('id', user.id);

        if (profileError) {
            console.error('Error updating user role:', profileError);
            throw profileError;
        }


        return NextResponse.json({ message: 'Subscription activated successfully' });
    } catch (e: any) {
        return NextResponse.json({ error: `Webhook handler failed: ${e.message}` }, { status: 500 });
    }
}
