

'use client';

import { Suspense, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const plans = {
  premium: {
    key: 'premium',
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
    key: 'yearly',
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

function SubscribePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const planKey = searchParams.get('plan') === 'yearly' ? 'yearly' : 'premium';
  const selectedPlan = plans[planKey];
  
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/handle-payment-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: selectedPlan.key }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'An unknown error occurred');
      }
      toast({
        title: "Payment Successful!",
        description: `Your ${selectedPlan.name} subscription is now active.`,
      });
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 2000);

    } catch (error: any) {
       toast({
          variant: 'destructive',
          title: "Payment Failed",
          description: error.message,
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6 text-center">Checkout</h1>
      <Card className="rounded-2xl">
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
          <Button className="w-full" onClick={handleCheckout} disabled={isLoading || isSuccess}>
            {isLoading ? (
                <><Loader2 className="mr-2 animate-spin" /> Processing...</>
            ) : isSuccess ? (
                <><CheckCircle className="mr-2" /> Success!</>
            ) : (
                <><CreditCard className="mr-2" /> Proceed to Checkout</>
            )}
          </Button>
          <Button variant="link" asChild disabled={isLoading}>
            <Link href="/#pricing">Change Plan</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function SubscribePage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <SubscribePageContent />
        </Suspense>
    )
}
