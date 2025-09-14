
'use server';

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import crypto from 'crypto';

/**
 * Paytm Checksum verification utility.
 * @param {object} params - The object containing all response parameters.
 * @param {string} key - The merchant key.
 * @param {string} checksumhash - The checksum hash received from Paytm.
 * @returns {boolean} - True if the signature is valid, false otherwise.
 */
function verifySignature(params: any, key: string, checksumhash: string): boolean {
    const bodyString = JSON.stringify(params);

    try {
        const salt = checksumhash.slice(-4);
        const sha256 = checksumhash.slice(0, -4);
        const hash = crypto.createHash('sha256').update(bodyString + '|' + salt).digest('hex');
        
        return sha256 === hash;
    } catch (e) {
        console.error("Signature verification error:", e);
        return false;
    }
}


export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
        
        const checksum = req.headers.get('x-checksum');
        
        const isProduction = process.env.NODE_ENV === 'production';
        const merchantKey = isProduction ? process.env.PAYTM_PROD_KEY : process.env.PAYTM_MERCHANT_KEY;

        if (!checksum || !merchantKey) {
            console.error("Callback Error: Checksum or merchant key missing.");
            return NextResponse.json({ error: 'Checksum or merchant key missing' }, { status: 400 });
        }

        // ** SECURITY-CRITICAL STEP **
        const isVerified = verifySignature(body, merchantKey, checksum);
        
        if (!isVerified) {
            console.error("Callback Error: Checksum Mismatch.");
            return NextResponse.json({ error: 'Checksum Mismatch' }, { status: 400 });
        }

        const { ORDERID, STATUS, TXNAMOUNT } = body;
        
        if (!supabaseAdmin) throw new Error("Supabase admin client not initialized");
        
        const { data: transaction, error: transactionError } = await supabaseAdmin
            .from('transactions')
            .select('user_id, plan_id, status')
            .eq('order_id', ORDERID)
            .single();

        if (transactionError || !transaction) {
            console.error(`Transaction not found for orderId: ${ORDERID}`, transactionError);
            return NextResponse.redirect(new URL('/subscribe?payment=failed&error=not_found', req.url));
        }
        
        if (transaction.status === 'SUCCESS') {
            return NextResponse.redirect(new URL('/dashboard?payment=already_processed', req.url));
        }

        if (STATUS === 'TXN_SUCCESS') {
            const userId = transaction.user_id;
            const plan = transaction.plan_id;
            
            const expires_at = new Date();
            if (plan === 'yearly') {
                expires_at.setFullYear(expires_at.getFullYear() + 1);
            } else {
                expires_at.setMonth(expires_at.getMonth() + 1);
            }
            
            const planName = plan === 'yearly' ? 'Yearly' : 'Premium';

            const { error: subsError } = await supabaseAdmin.from('subscriptions').upsert({
                user_id: userId,
                is_active: true,
                plan_name: planName,
                expires_at: expires_at.toISOString(),
            }, { onConflict: 'user_id' });
            if (subsError) throw subsError;

            
            const { error: profileError } = await supabaseAdmin.from('profiles').update({ role: 'premium' }).eq('id', userId);
            if (profileError) throw profileError;

            
            await supabaseAdmin.from('transactions').update({ status: 'SUCCESS', updated_at: new Date().toISOString() }).eq('order_id', ORDERID);

            return NextResponse.redirect(new URL('/dashboard?payment=success', req.url));

        } else {
            await supabaseAdmin.from('transactions').update({ status: 'FAILED', updated_at: new Date().toISOString() }).eq('order_id', ORDERID);
            return NextResponse.redirect(new URL('/subscribe?payment=failed', req.url));
        }

    } catch (e: any) {
        console.error("Paytm callback error:", e);
        return NextResponse.json({ error: `Webhook handler failed: ${e.message}` }, { status: 500 });
    }
}
