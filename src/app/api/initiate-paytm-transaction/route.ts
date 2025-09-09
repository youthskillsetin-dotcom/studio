
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/actions';
import { supabaseAdmin } from '@/lib/supabase/admin';
import crypto from 'crypto';

const plans = {
  premium: { price: 299 },
  yearly: { price: 1999 },
};

/**
 * Function to generate checksum
 * @param {Object} params
 * @param {string} key
 * @returns {Promise<string>}
 */
function generateSignature(params: any, key: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const body = JSON.stringify(params);
            const salt = crypto.randomBytes(4).toString('hex');
            const final_string = body + '|' + salt;

            const iv = '@@@@&&&&####$$$$'; 

            const cipher = crypto.createCipheriv('AES-128-CBC', key, iv);
            cipher.setAutoPadding(true);
            let encrypted = cipher.update(final_string, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            const checksum = Buffer.from(salt + encrypted).toString('base64');
            resolve(checksum);
        } catch (e) {
            reject(e);
        }
    });
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

  // These details should be stored securely in your .env file
  const mid = process.env.NEXT_PUBLIC_PAYTM_MID;
  const merchantKey = process.env.PAYTM_MERCHANT_KEY;
  const websiteName = process.env.PAYTM_WEBSITE || 'WEBSTAGING';

  if (!mid || !merchantKey) {
    return NextResponse.json({ error: 'Payment Gateway is not configured. Please contact support.' }, { status: 500 });
  }

  try {
    const { plan, couponCode } = await req.json();
    
    if (!plan || !plans[plan as keyof typeof plans]) {
        return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
    }

    let discount = 0;
    if (couponCode) {
        const couponResult = await validateCoupon(couponCode);
        if (couponResult.success && couponResult.discount) {
            discount = couponResult.discount;
        }
    }

    const basePrice = plans[plan as keyof typeof plans].price;
    const finalAmount = (basePrice * (1 - discount)).toFixed(2);


    const orderId = `YSS_${user.id}_${Date.now()}`;
    
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/handle-payment-webhook`;

    // Securely log the transaction details on the server before sending to Paytm
    const { error: transactionError } = await supabaseAdmin
        .from('transactions')
        .insert({
            order_id: orderId,
            user_id: user.id,
            plan_id: plan,
            amount: parseFloat(finalAmount),
            status: 'PENDING',
            coupon_used: couponCode,
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
      `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
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
        });
    } else {
        console.error("Paytm initiation failed:", responseData);
        // Mark transaction as failed if initiation fails
         await supabaseAdmin.from('transactions').update({ status: 'FAILED' }).eq('order_id', orderId);
        return NextResponse.json({ error: 'Failed to initiate Paytm transaction', details: responseData.body.resultInfo.resultMsg }, { status: 500 });
    }

  } catch (e: any) {
    console.error("Error in initiate-paytm-transaction:", e);
    return NextResponse.json({ error: `API Error: ${e.message}` }, { status: 500 });
  }
}
