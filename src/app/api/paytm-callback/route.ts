
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
function verifySignature(body: string, key: string, checksum: string): boolean {
    try {
        if (!body || !key || !checksum) {
            return false;
        }

        const iv = '@@@@&&&&####$$$$';
        const salt = Buffer.from(checksum, 'base64').toString('utf8').substring(0, 4);
        const ciphertext = Buffer.from(checksum, 'base64').toString('utf8').substring(4);
        
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        const receivedBodyHash = decrypted.split('|')[0];
        
        return receivedBodyHash === body;

    } catch (e) {
        console.error("Signature verification error", e);
        return false;
    }
}


export async function POST(req: Request) {
    let bodyText = '';
    try {
        const body = await req.json();
        bodyText = JSON.stringify(body);
        
        const checksum = req.headers.get('x-checksum');
        const merchantKey = process.env.PAYTM_MERCHANT_KEY;

        if (!checksum || !merchantKey) {
            return NextResponse.json({ error: 'Checksum or merchant key missing' }, { status: 400 });
        }

        // ** SECURITY-CRITICAL STEP **
        // For a production app, ensure this validation is robust and secure.
        // It's also wise to verify the transaction status with Paytm's server-to-server API.
        const isVerified = verifySignature(bodyText, merchantKey, checksum);
        
        if (!isVerified) {
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
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
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

            await supabaseAdmin.from('subscriptions').upsert({
                user_id: userId,
                is_active: true,
                plan_name: planName,
                expires_at: expires_at.toISOString(),
            }, { onConflict: 'user_id' });
            
            await supabaseAdmin.from('profiles').update({ role: 'premium' }).eq('id', userId);
            
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
