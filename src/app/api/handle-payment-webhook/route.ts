
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
        const body = await req.json();
        const plan = body.plan === 'yearly' ? 'yearly' : 'premium';

        const expires_at = new Date();
        if (plan === 'yearly') {
            expires_at.setFullYear(expires_at.getFullYear() + 1);
        } else {
            expires_at.setMonth(expires_at.getMonth() + 1);
        }

        const planName = plan === 'yearly' ? 'Yearly' : 'Premium';

        const subscriptionData = {
            user_id: user.id,
            is_active: true,
            plan_name: planName,
            expires_at: expires_at.toISOString(),
        };

        const { error: upsertError } = await supabase
            .from('subscriptions')
            .upsert(subscriptionData, { onConflict: 'user_id' });
        
        if (upsertError) {
             console.error('Error upserting subscription:', upsertError);
             throw upsertError;
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
