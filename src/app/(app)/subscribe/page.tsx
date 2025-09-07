
import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';

const plans = {
  premium: {
    name: 'Premium',
    price: '₹199',
    period: '/month',
    features: [
      'Access to all lessons',
      'Unlimited AI Mentor chat',
      'In-depth AI feedback',
      'Career guidance',
    ],
  },
  yearly: {
    name: 'Yearly',
    price: '₹1499',
    period: '/year',
    features: [
        'All Premium features',
        '12 months of access',
        'Priority support'
    ],
  },
};

function SubscribePageContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const planKey = searchParams.plan === 'yearly' ? 'yearly' : 'premium';
  const selectedPlan = plans[planKey];
  
  // In a real app, this would initiate a checkout session with a payment provider like Stripe
  const handleCheckout = async () => {
    console.log(`Initiating checkout for ${selectedPlan.name}`);
    // e.g. await createStripeCheckoutSession(planKey);
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6 text-center">Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Confirm Your Plan</CardTitle>
          <CardDescription>You are about to subscribe to the {selectedPlan.name} plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 rounded-lg border bg-muted/40">
            <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold text-primary">{selectedPlan.name}</h3>
                <p className="text-3xl font-bold">{selectedPlan.price}<span className="text-base font-normal text-muted-foreground">{selectedPlan.period}</span></p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Features include:</h4>
             <ul className="space-y-2">
                {selectedPlan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button className="w-full" onClick={handleCheckout}>
            <CreditCard className="mr-2" /> Proceed to Checkout
          </Button>
          <Button variant="link" asChild>
            <Link href="/#pricing">Change Plan</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function SubscribePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <SubscribePageContent searchParams={searchParams} />
        </Suspense>
    )
}
