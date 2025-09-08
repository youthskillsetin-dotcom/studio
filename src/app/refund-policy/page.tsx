
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RefundPolicyPage() {
  return (
    <div className="bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="p-6 md:p-10 rounded-2xl">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl font-headline">Refund Policy</CardTitle>
            <p className="text-muted-foreground pt-2">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none px-0">
            <p>
              We are committed to providing our users with a high-quality learning experience. We understand that sometimes, things may not work out as expected. This policy outlines the terms and conditions for refunds for our subscription services.
            </p>

            <h2>1. Monthly Subscriptions</h2>
            <p>
              Subscriptions billed on a monthly basis are non-refundable. You may cancel your monthly subscription at any time, and your access to premium features will continue until the end of your current billing period. No partial or pro-rata refunds will be issued for monthly subscriptions.
            </p>

            <h2>2. Yearly Subscriptions</h2>
            <p>
              For yearly subscriptions, we offer a <strong>7-day money-back guarantee</strong> from the date of your initial purchase. If you are not satisfied with our premium service within the first 7 days, you may request a full refund by contacting our support team at <a href="mailto:work@youthskillset.in">work@youthskillset.in</a>.
            </p>
             <p>
              Refund requests made after this 7-day window will not be eligible for a refund. Like monthly subscriptions, you can cancel your yearly plan at any time to prevent it from renewing at the end of the term.
            </p>

            <h2>3. How to Request a Refund</h2>
            <p>
              To request a refund for a yearly subscription within the 7-day guarantee period, please email our support team with your account details and the reason for your request. Refunds will be processed to the original payment method within 5-10 business days.
            </p>

            <h2>4. General Conditions</h2>
            <p>
              We reserve the right to refuse a refund if we detect abuse of our refund policy. This policy may be updated from time to time, and we will notify users of any significant changes.
            </p>

             <h2>5. Contact Us</h2>
            <p>
              For any questions regarding this refund policy, please contact us at:
              <br />
              Email: <a href="mailto:work@youthskillset.in">work@youthskillset.in</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
