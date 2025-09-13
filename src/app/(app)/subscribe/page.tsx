
'use client';

import { Suspense, useState, useEffect } from 'react';
import Head from 'next/head';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Script from 'next/script';

const plans = {
  premium: {
    key: 'premium',
    name: 'Premium',
    price: 299,
    period: '/month',
    features: [
      'Access to all lessons & labs',
      'Unlimited AI Mentor chat',
      'In-depth AI feedback',
      'AI Career Guide',
    ],
  },
  yearly: {
    key: 'yearly',
    name: 'Yearly',
    price: 1999,
    period: '/year',
    features: [
        'All Premium features',
        'Save over 40% annually',
        'Priority support'
    ],
  },
};

type PlanKey = 'premium' | 'yearly';

declare global {
    interface Window {
        Paytm: any;
    }
}

function SubscribePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  const initialPlan = searchParams.get('plan') === 'yearly' ? 'yearly' : 'premium';
  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey>(initialPlan);
  
  const selectedPlan = plans[selectedPlanKey];
  
  const handleCheckout = async () => {
    if (!isScriptLoaded) {
      toast({
        variant: 'destructive',
        title: 'Payment Gateway Not Ready',
        description: 'Please wait a moment for the payment gateway to load and try again.',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/initiate-paytm-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            plan: selectedPlan.key,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate transaction.');
      }

      const { txnToken, orderId, amount, mid } = data;

      const config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": orderId,
          "token": txnToken,
          "tokenType": "TXN_TOKEN",
          "amount": amount
        },
        "merchant": {
            "mid": mid,
        },
        "handler": {
           "transactionStatus": function(paymentStatus: any){
              console.log("payment status => ", paymentStatus);
              if (paymentStatus.STATUS === 'TXN_SUCCESS') {
                 toast({
                    title: "Payment Successful!",
                    description: `Your ${selectedPlan.name} subscription is now active. Redirecting...`,
                  });
                 router.push('/dashboard');
                 router.refresh();
              } else {
                 toast({
                    variant: 'destructive',
                    title: "Payment Failed",
                    description: paymentStatus.RESPMSG || 'An error occurred during payment. Please try again.',
                });
                setIsLoading(false);
              }
           },
           "notifyMerchant": function(eventName: string, data: any){
              console.log("notifyMerchant handler function called");
              console.log("eventName => ", eventName);
              console.log("data => ", data);
            }
        }
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error: any) {
          console.log("error => ", error);
          toast({ variant: 'destructive', title: 'Could not load payment gateway.', description: 'Please check your connection and try again.' });
          setIsLoading(false);
        });
      } else {
         toast({ variant: 'destructive', title: 'Payment gateway script not loaded.' });
         setIsLoading(false);
      }

    } catch (error: any) {
       toast({
          variant: 'destructive',
          title: "Error",
          description: error.message,
      });
      setIsLoading(false);
    }
  }

  return (
    <>
      <Script
          id="paytm-checkout-js"
          src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
          onLoad={() => {
            console.log('Paytm script loaded.');
            setIsScriptLoaded(true);
          }}
          onError={(e) => {
            console.error('Failed to load Paytm script:', e);
            toast({
              variant: 'destructive',
              title: 'Payment Gateway Error',
              description: 'Could not load the payment gateway. Please refresh the page.',
            });
          }}
          crossOrigin="anonymous"
        />
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6 text-center">Checkout</h1>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Choose Your Plan</CardTitle>
          <CardDescription>Select the plan that works best for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
                 <Button
                    onClick={() => { setSelectedPlanKey('premium'); }}
                    className={cn(selectedPlanKey === 'premium' ? 'bg-background text-foreground shadow' : 'bg-transparent text-muted-foreground', 'h-auto py-2')}
                    variant="ghost"
                  >
                    Monthly
                  </Button>
                  <Button
                    onClick={() => { setSelectedPlanKey('yearly'); }}
                     className={cn(selectedPlanKey === 'yearly' ? 'bg-background text-foreground shadow' : 'bg-transparent text-muted-foreground', 'h-auto py-2')}
                    variant="ghost"
                  >
                    Yearly (Save 40%)
                  </Button>
            </div>


          <div className="p-6 rounded-lg border bg-muted/40">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-primary">{selectedPlan.name}</h3>
                    <Badge variant="destructive" className="mt-1">Limited Time</Badge>
                </div>
                <div>
                    <p className="text-3xl font-bold">₹{selectedPlan.price}<span className="text-base font-normal text-muted-foreground">{selectedPlan.period}</span></p>
                </div>
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
          <Button className="w-full" onClick={handleCheckout} disabled={isLoading || !isScriptLoaded}>
            {isLoading ? (
                <><Loader2 className="mr-2 animate-spin" /> Processing...</>
            ) : (
                <><CreditCard className="mr-2" /> Proceed to Checkout</>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8">
            <h3 className="text-lg font-semibold text-center mb-4">Join other successful learners</h3>
            <div className="space-y-4">
                <Card className="p-4 rounded-xl bg-muted/40 border-0">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Anika S.</p>
                            <p className="text-sm text-muted-foreground">"The AI Career guide was a game-changer for me! I finally have a clear roadmap for my future."</p>
                        </div>
                    </div>
                </Card>
                 <Card className="p-4 rounded-xl bg-muted/40 border-0">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>RP</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Rohan P.</p>
                            <p className="text-sm text-muted-foreground">"Best investment I've made in myself. The lessons on finance are so practical and easy to understand."</p>
                        </div>
                    </div>
                </Card>
            </div>
      </div>
    </div>
    </>
  );
}


export default function SubscribePage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <SubscribePageContent />
        </Suspense>
    )
}

    