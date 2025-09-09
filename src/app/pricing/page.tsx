
'use client';

import { Suspense } from 'react';
import { redirect } from 'next/navigation';

// This component now redirects to the main subscribe page
// to create a unified pricing and checkout experience.
function PricingRedirect() {
  redirect('/subscribe');
  return null;
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingRedirect />
    </Suspense>
  )
}
