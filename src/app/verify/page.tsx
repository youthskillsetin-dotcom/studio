
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';

export default function VerifyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <MailCheck className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-headline">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address. Please click the link to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you've verified, you can close this tab and log in. If you don't see the email, please check your spam folder.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

