
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import crypto from 'crypto';


/**
 * Function to verify Paytm checksum using Node.js crypto
 * @param {any} body - The request body from Paytm.
 * @param {string} key - The merchant key.
 * @param {string} checksum - The checksum sent by Paytm.
 * @returns {boolean} - True if the signature is valid, false otherwise.
 */
function verifySignature(body: any, key: string, checksum: string): boolean {
    try {
        // The body from Paytm webhook is not a JSON string, but form-data.
        // The signature is generated on the form-data string.
        // However, for this simplified example, we'll assume the client-side passes a JSON body.
        // A production implementation must handle the actual url-encoded form data from Paytm's server-to-server webhook.
        const bodyString = JSON.stringify(body);
        const salt = Buffer.from(checksum, 'base64').toString('utf8').substring(0, 4);
        const final_string = bodyString + '|' + salt;
        const iv = '@@@@&&&&####$$$$';

        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        let encrypted = cipher.update(final_string, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // This comparison is for the checksum generation logic used in this app.
        // Paytm's official logic might differ slightly.
        return Buffer.from(salt + encrypted).toString('base64') === checksum;

    } catch (e) {
        console.error("Signature verification error", e);
        return false;
    }
}


// This webhook handler is called by Paytm after a transaction.
// It needs to be secured to ensure requests are genuinely from Paytm.
export async function POST(req: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // This can happen if the webhook is called but the user's browser session is gone.
        // We can still process the webhook if we can securely identify the user from the webhook body.
        console.warn('Webhook called without an active user session. Proceeding with user data from transaction.');
    }

    try {
        const body = await req.json();
        
        // ** SECURITY-CRITICAL STEP **
        // A real production system must rely on a secure, server-to-server webhook
        // and robustly verify the checksum from Paytm. The verifySignature function here
        // is a template; you must ensure it matches Paytm's exact requirements for production.
        
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

        const userId = transaction.user_id;

        const { data: transactionUser, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
        if(userError || !transactionUser.user) {
             return NextResponse.json({ error: 'User for transaction not found' }, { status: 404 });
        }
        
        const targetUser = transactionUser.user;

        const plan = transaction.plan_id;
        const expires_at = new Date();
        if (plan === 'yearly') {
            expires_at.setFullYear(expires_at.getFullYear() + 1);
        } else {
            expires_at.setMonth(expires_at.getMonth() + 1);
        }

        const planName = plan === 'yearly' ? 'Yearly' : 'Premium';

        const subscriptionData = {
            user_id: targetUser.id,
            email: targetUser.email,
            is_active: true,
            plan_name: planName,
            expires_at: expires_at.toISOString(),
        };

        const { error: upsertError } = await supabaseAdmin
            .from('subscriptions')
            .upsert(subscriptionData, { onConflict: 'user_id' });
        
        if (upsertError) {
             console.error('Error upserting subscription:', upsertError);
             throw upsertError;
        }
        
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({ role: 'premium' })
            .eq('id', targetUser.id);

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
