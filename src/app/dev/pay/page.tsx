import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

export default function DevPayPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
       <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Developer: Payment Simulation</CardTitle>
          <CardDescription>Simulate a payment to unlock premium content for the current user.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Clicking the button below will simulate a successful payment webhook call, granting the user a premium subscription.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" /> Simulate Successful Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
