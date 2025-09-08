
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="p-6 md:p-10 rounded-2xl">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl font-headline">Terms of Service</CardTitle>
            <p className="text-muted-foreground pt-2">Last Updated: 1st August 2024</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none px-0">
            <h2>1. Agreement to Terms</h2>
            <p>
              By using our services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the services.
            </p>

            <h2>2. Your Account</h2>
            <p>
              You may need to create an account to use some of our services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.
            </p>
            
            <h2>3. Content on the Services</h2>
            <p>
              You are responsible for your use of the services and for any content you provide, including compliance with applicable laws, rules, and regulations. You should only provide content that you are comfortable sharing with others.
            </p>

            <h2>4. Using the Services</h2>
            <p>
              You may use the services only if you can form a binding contract with YouthSkillSet and are not a person barred from receiving services under the laws of the applicable jurisdiction. You may use the services only in compliance with these Terms and all applicable local, state, national, and international laws, rules and regulations.
            </p>

            <h2>5. Termination</h2>
            <p>
              We may suspend or terminate your account or cease providing you with all or part of the services at any time for any or no reason, including, but not limited to, if we reasonably believe: (i) you have violated these Terms, or (ii) you create risk or possible legal exposure for us.
            </p>
            
            <h2>6. Disclaimers and Limitations of Liability</h2>
             <p>
              The services are provided on an "AS-IS" and "AS-AVAILABLE" basis. To the maximum extent permitted by applicable law, we disclaim all warranties and conditions, whether express or implied, of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            
            <h2>7. Changes to These Terms</h2>
            <p>
                We reserve the right to modify these terms at any time. If we make changes to these terms, we will post the revised terms on the site and update the “Last Updated” date at the top of these terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
