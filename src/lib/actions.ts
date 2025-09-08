
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function validateCoupon(code: string): Promise<{ success: boolean; message: string; discount?: number; }> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!code) {
      return { success: false, message: 'Please enter a coupon code.' };
  }

  // New Strategy: Fetch all active coupons and check in code for reliability.
  const { data: activeCoupons, error } = await supabase
    .from('coupons')
    .select('code, discount_percent, is_active, expires_at')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching coupons:', error);
    return { success: false, message: 'Could not validate coupon at this time.' };
  }

  if (!activeCoupons) {
    return { success: false, message: 'Invalid coupon code.' };
  }

  // Perform a case-insensitive search on the fetched coupons
  const coupon = activeCoupons.find(c => c.code.toLowerCase() === code.toLowerCase());

  if (!coupon) {
    return { success: false, message: 'Invalid coupon code.' };
  }

  // Re-check is_active and expiry date as a fallback.
  if (!coupon.is_active) {
    return { success: false, message: 'This coupon is no longer active.' };
  }

  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { success: false, message: 'This coupon has expired.' };
  }

  const discountValue = coupon.discount_percent / 100;
  return { success: true, discount: discountValue, message: `Success! ${coupon.discount_percent}% discount applied.` };
}
