
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytm-pg-node-sdk/lib/PaytmChecksum';
import { supabaseAdmin } from '@/lib/supabase/admin';

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
        const rawBody = JSON.stringify(body);
        
        // ** SECURITY-CRITICAL STEP **
        // In production, you MUST verify the request is from Paytm.
        const checksum = req.headers.get('x-paytm-checksum');
        // The check here is disabled for the dev environment where we manually call this
        // from the client for immediate UX feedback. In production, this MUST be enabled.
        const isVerified = process.env.NODE_ENV === 'development' || PaytmChecksum.verifySignature(
           rawBody, 
           process.env.PAYTM_MERCHANT_KEY!, 
           checksum || ""
        );
        if (!isVerified) {
           return NextResponse.json({ error: 'Webhook checksum mismatch' }, { status: 403 });
        }

        const orderId = body.ORDERID;
        if (!orderId) {
             return NextResponse.json({ error: 'Order ID not found in webhook body' }, { status: 400 });
        }

        // Fetch the transaction details from your DB to get the plan
        if (!supabaseAdmin) throw new Error("Supabase admin client not initialized");
        
        const { data: transaction, error: transactionError } = await supabaseAdmin
            .from('transactions')
            .select('plan_id, user_id')
            .eq('order_id', orderId)
            .single();

        if (transactionError || !transaction) {
            console.error(`Transaction not found for orderId: ${orderId}`, transactionError);
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        if (transaction.user_id !== user.id) {
            return NextResponse.json({ error: 'User mismatch' }, { status: 403 });
        }

        const plan = transaction.plan_id;
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

        // Update the transaction as completed
        await supabaseAdmin.from('transactions').update({ status: 'SUCCESS' }).eq('order_id', orderId);

        return NextResponse.json({ message: 'Subscription activated successfully' });
    } catch (e: any) {
        return NextResponse.json({ error: `Webhook handler failed: ${e.message}` }, { status: 500 });
    }
}

    