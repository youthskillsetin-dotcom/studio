
'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function DevPayPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSimulatePayment = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/handle-payment-webhook', {
                method: 'POST',
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'An unknown error occurred');
            }
            toast({
                title: "Payment Successful!",
                description: "Premium subscription has been activated for the current user.",
            });
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: "Payment Simulation Failed",
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
       <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Developer: Payment Simulation</CardTitle>
          <CardDescription>Simulate a payment to unlock premium content for the current user.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Clicking the button below will simulate a successful payment webhook call, granting the current user a premium subscription.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSimulatePayment} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
            Simulate Successful Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
