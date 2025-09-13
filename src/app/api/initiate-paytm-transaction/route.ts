
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import crypto from 'crypto';

const plans = {
  premium: { price: 299 },
  yearly: { price: 1999 },
};

/**
 * Function to generate Paytm checksum using Node.js crypto.
 * @param {Object} params
 * @param {string} key
 * @returns {Promise<string>}
 */
async function generateSignature(params: any, key: string): Promise<string> {
    const bodyString = JSON.stringify(params);
    const salt = crypto.randomBytes(4).toString('hex');
    const checksum = crypto.createHash('sha256').update(bodyString + '|' + salt).digest('hex') + salt;
    return Promise.resolve(checksum);
}


export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }
   if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Admin client not initialized' }, { status: 500 });
  }

  const mid = process.env.NEXT_PUBLIC_PAYTM_MID;
  const merchantKey = process.env.PAYTM_MERCHANT_KEY;
  const websiteName = process.env.PAYTM_WEBSITE || 'WEBSTAGING';
  const paytmUrl = process.env.PAYTM_ENVIRONMENT === 'PROD'
    ? 'https://securegw.paytm.in'
    : 'https://securegw-stage.paytm.in';

  if (!mid || !merchantKey) {
    return NextResponse.json({ error: 'Payment Gateway is not configured. Please contact support.' }, { status: 500 });
  }

  try {
    const { plan } = await req.json();
    
    if (!plan || !plans[plan as keyof typeof plans]) {
        return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
    }

    const basePrice = plans[plan as keyof typeof plans].price;
    const finalAmount = basePrice.toFixed(2);


    const orderId = `YSS_${user.id.substring(0, 8)}_${Date.now()}`;
    
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/paytm-callback`;

    // Securely log the transaction details on the server before sending to Paytm
    const { error: transactionError } = await supabaseAdmin
        .from('transactions')
        .insert({
            order_id: orderId,
            user_id: user.id,
            plan_id: plan,
            amount: parseFloat(finalAmount),
            status: 'PENDING',
        });

    if (transactionError) {
        console.error("Error logging transaction:", transactionError);
        return NextResponse.json({ error: 'Failed to create transaction record.'}, { status: 500 });
    }


    const paytmParams: any = {};

    paytmParams.body = {
      "requestType": "Payment",
      "mid": mid,
      "websiteName": websiteName,
      "orderId": orderId,
      "callbackUrl": callbackUrl,
      "txnAmount": {
        "value": finalAmount,
        "currency": "INR",
      },
      "userInfo": {
        "custId": user.id,
        "email": user.email,
      },
    };

    const checksum = await generateSignature(paytmParams.body, merchantKey);

    paytmParams.head = {
      "signature": checksum
    };

    const response = await fetch(
      `${paytmUrl}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paytmParams)
      }
    );

    const responseData = await response.json();
    
    if (responseData.body && responseData.body.resultInfo && responseData.body.resultInfo.resultStatus === 'S') {
        return NextResponse.json({
            txnToken: responseData.body.txnToken,
            orderId: orderId,
            amount: finalAmount,
            mid: mid
        });
    } else {
        console.error("Paytm initiation failed:", responseData);
         await supabaseAdmin.from('transactions').update({ status: 'FAILED', updated_at: new Date().toISOString() }).eq('order_id', orderId);
        return NextResponse.json({ error: 'Failed to initiate Paytm transaction', details: responseData.body.resultInfo.resultMsg }, { status: 500 });
    }

  } catch (e: any) {
    console.error("Error in initiate-paytm-transaction:", e);
    return NextResponse.json({ error: `API Error: ${e.message}` }, { status: 500 });
  }
}

    