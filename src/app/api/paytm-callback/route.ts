
'use server';

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import crypto from 'crypto';

/**
 * Function to verify Paytm checksum using Node.js crypto.
 * This is a critical security step.
 * @param {any} body - The request body from Paytm.
 * @param {string} key - The merchant key.
 * @param {string} checksum - The checksum sent by Paytm.
 * @returns {boolean} - True if the signature is valid, false otherwise.
 */
function verifySignature(body: any, key: string, checksum: string): boolean {
    try {
        if (typeof body !== 'object' || body === null || !key || !checksum) {
            return false;
        }

        const bodyString = JSON.stringify(body);
        
        let received_checksum = decodeURIComponent(checksum);
        const salt = received_checksum.slice(-4);
        const sha256 = received_checksum.slice(0, -4);
        const hash = crypto.createHash('sha256').update(bodyString + '|' + salt).digest('hex');

        return hash === sha256;

    } catch (e) {
        console.error("Signature verification error", e);
        return false;
    }
}


export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
        
        const checksum = req.headers.get('x-checksum');
        const merchantKey = process.env.PAYTM_MERCHANT_KEY;

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
            // Even if transaction not found, redirect user to avoid showing an error page.
            return NextResponse.redirect(new URL('/subscribe?payment=failed&error=not_found', req.url));
        }
        
        // Idempotency check: If already processed, just redirect.
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

    