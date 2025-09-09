
'use client';

import { Suspense, useState } from 'react';
import Head from 'next/head';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2, Star, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

// This is a simplified interface for the Paytm configuration
declare global {
    interface Window {
        Paytm: any;
    }
}

function SubscribePageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey>('premium');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const selectedPlan = plans[selectedPlanKey];
  const finalPrice = selectedPlan.price * (1 - appliedDiscount);

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    setCouponMessage(null);
    setAppliedDiscount(0);

    const validCoupons: { [code: string]: { discount: number; message: string } } = {
      'SKILL10': { discount: 0.10, message: 'Success! 10% discount applied.' },
      'SKILL25': { discount: 0.25, message: 'Success! 25% discount applied.' },
    };

    setTimeout(() => {
      const upperCaseCode = couponCode.toUpperCase();
      const appliedCoupon = validCoupons[upperCaseCode];

      if (appliedCoupon) {
        setAppliedDiscount(appliedCoupon.discount);
        setCouponMessage(appliedCoupon.message);
      } else if (couponCode) {
        setCouponMessage('Invalid coupon code.');
      } else {
        setCouponMessage('Please enter a coupon code.');
      }
      setIsApplyingCoupon(false);
    }, 500);
  };
  
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // 1. Call your new backend API to get a transaction token
      const response = await fetch('/api/initiate-paytm-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalPrice.toFixed(2), plan: selectedPlan.key }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate transaction.');
      }

      const { txnToken, orderId, amount } = data;

      // 2. Configure Paytm checkout
      const config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": orderId,
          "token": txnToken,
          "tokenType": "TXN_TOKEN",
          "amount": amount
        },
        "handler": {
          "notifyMerchant": function(eventName: string, data: any) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
           "transactionStatus": function(paymentStatus: any){
              console.log("payment status => ", paymentStatus);
              // After payment, you can redirect or show a success message.
              // The backend webhook will handle the actual subscription update.
              if (paymentStatus.STATUS === 'TXN_SUCCESS') {
                 toast({
                    title: "Payment Successful!",
                    description: `Your ${selectedPlan.name} subscription is now active.`,
                  });
                 router.push('/dashboard');
                 router.refresh();
              } else {
                 toast({
                    variant: 'destructive',
                    title: "Payment Failed",
                    description: paymentStatus.RESPMSG || 'An error occurred during payment.',
                });
              }
              setIsLoading(false);
           }
        }
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          // 3. Open the Paytm payment popup
          window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error: any) {
          console.log("error => ", error);
          setIsLoading(false);
        });
      } else {
         toast({ variant: 'destructive', title: 'Could not load payment gateway.' });
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
    <Head>
        <script
          type="application/javascript"
          src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
          crossOrigin="anonymous"
        ></script>
      </Head>
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
                    onClick={() => setSelectedPlanKey('premium')}
                    className={cn(selectedPlanKey === 'premium' ? 'bg-background text-foreground shadow' : 'bg-transparent text-muted-foreground', 'h-auto py-2')}
                    variant="ghost"
                  >
                    Monthly
                  </Button>
                  <Button
                    onClick={() => setSelectedPlanKey('yearly')}
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
                    {appliedDiscount > 0 && (
                         <p className="text-lg text-muted-foreground line-through text-right">₹{selectedPlan.price}</p>
                    )}
                    <p className="text-3xl font-bold">₹{finalPrice.toFixed(0)}<span className="text-base font-normal text-muted-foreground">{selectedPlan.period}</span></p>
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
             <div className="w-full space-y-2">
                <Label htmlFor="coupon" className="flex items-center gap-2 font-semibold">
                    <Ticket className="w-4 h-4" />
                    Coupon Code
                </Label>
                <div className="flex items-center gap-2">
                    <Input id="coupon" placeholder="Enter code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                    <Button variant="outline" onClick={handleApplyCoupon} disabled={isApplyingCoupon}>
                        {isApplyingCoupon && <Loader2 className="w-4 h-4 animate-spin" />}
                        {!isApplyingCoupon && 'Apply'}
                    </Button>
                </div>
                {couponMessage && (
                    <p className={cn(
                        "text-xs font-medium",
                        appliedDiscount > 0 ? "text-green-600" : "text-destructive"
                    )}>
                        {couponMessage}
                    </p>
                )}
            </div>

          <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
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
