
'use client';

import { Suspense, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2, Star, Ticket } from 'lucide-react';
import Link from 'next/link';
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

function SubscribePageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    // Simulate network delay for a better user experience
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

          <Button className="w-full" onClick={handleCheckout} disabled={isLoading || isSuccess}>
            {isLoading ? (
                <><Loader2 className="mr-2 animate-spin" /> Processing...</>
            ) : isSuccess ? (
                <><CheckCircle className="mr-2" /> Success!</>
            ) : (
                <><CreditCard className="mr-2" /> Proceed to Checkout</>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Social Proof Section */}
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
  );
}


export default function SubscribePage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <SubscribePageContent />
        </Suspense>
    )
}
