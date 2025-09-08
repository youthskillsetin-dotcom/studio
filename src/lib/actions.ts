
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function validateCoupon(code: string): Promise<{ success: boolean; message: string; discount?: number; }> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!code) {
      return { success: false, message: 'Please enter a coupon code.' };
  }

  // This query now converts the 'code' column in the database to uppercase
  // and compares it against the user's input, also converted to uppercase.
  // This makes the check fully case-insensitive.
  const { data: coupon, error } = await supabase
    .from('coupons')
    .select('discount_percent, is_active, expires_at')
    .ilike('code', code) // Use ilike for case-insensitive matching
    .single();

  if (error || !coupon) {
    return { success: false, message: 'Invalid coupon code.' };
  }

  if (!coupon.is_active) {
    return { success: false, message: 'This coupon is no longer active.' };
  }

  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { success: false, message: 'This coupon has expired.' };
  }

  const discountValue = coupon.discount_percent / 100;
  return { success: true, discount: discountValue, message: `Success! ${coupon.discount_percent}% discount applied.` };
}
