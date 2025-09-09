
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytm-pg-node-sdk/lib/PaytmChecksum';

// This webhook handler is called by Paytm after a transaction.
// It needs to be secured to ensure requests are genuinely from Paytm.
export async function POST(req: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'User not authenticated for webhook' }, { status: 401 });
    }

    try {
        const body = await req.json();
        
        // ** SECURITY-CRITICAL STEP **
        // In production, you MUST verify the request is from Paytm.
        // You would get the checksum from the request headers/body and verify it
        // using your Merchant Key.
        //
        const checksum = req.headers.get('x-paytm-checksum');
        const isVerified = PaytmChecksum.verifySignature(
           JSON.stringify(body), 
           process.env.PAYTM_MERCHANT_KEY!, 
           checksum || ""
        );
        if (!isVerified) {
           return NextResponse.json({ error: 'Webhook checksum mismatch' }, { status: 403 });
        }

        // The 'plan' would ideally be retrieved from the order details in the webhook body.
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
            email: user.email,
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
