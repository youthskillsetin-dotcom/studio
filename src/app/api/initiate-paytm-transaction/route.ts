
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytm-pg-node-sdk/lib/PaytmChecksum';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const { amount, plan } = await req.json();

    const orderId = `YSS_${user.id}_${Date.now()}`;

    // These details should be stored securely in your .env file
    const mid = process.env.NEXT_PUBLIC_PAYTM_MID!;
    const merchantKey = process.env.PAYTM_MERCHANT_KEY!;
    const websiteName = process.env.PAYTM_WEBSITE || 'WEBSTAGING';
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/handle-payment-webhook`;

    const paytmParams: any = {};

    paytmParams.body = {
      "requestType": "Payment",
      "mid": mid,
      "websiteName": websiteName,
      "orderId": orderId,
      "callbackUrl": `${callbackUrl}?plan=${plan}`, // Pass plan in callback
      "txnAmount": {
        "value": amount,
        "currency": "INR",
      },
      "userInfo": {
        "custId": user.id,
        "email": user.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), merchantKey);

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
            amount: amount,
        });
    } else {
        console.error("Paytm initiation failed:", responseData);
        return NextResponse.json({ error: 'Failed to initiate Paytm transaction', details: responseData.body.resultInfo.resultMsg }, { status: 500 });
    }

  } catch (e: any) {
    console.error("Error in initiate-paytm-transaction:", e);
    return NextResponse.json({ error: `API Error: ${e.message}` }, { status: 500 });
  }
}
