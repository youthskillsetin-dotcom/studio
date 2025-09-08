
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RefundPolicyPage() {
  return (
    <div className="bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="p-6 md:p-10 rounded-2xl">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl font-headline">Refund Policy – YouthSkillset</CardTitle>
            <p className="text-muted-foreground pt-2">At YouthSkillset, we value your trust and want you to have the best learning experience with us.</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none px-0">
            
            <h2>1. Digital Products &amp; Subscriptions</h2>
            <p>
              All our courses, lessons, and premium subscriptions are digital services. Once purchased, access is granted immediately; therefore, refunds are generally not provided.
            </p>

            <h2>2. Exceptions – When You Can Request a Refund</h2>
            <p>You may be eligible for a full or partial refund if:</p>
            <ul>
                <li>You were charged by mistake (duplicate payment).</li>
                <li>You were unable to access the content due to a verified technical issue on our platform.</li>
                <li>You purchased a subscription but cancel within 24 hours of purchase and have not accessed premium content.</li>
            </ul>

            <h2>3. How to Request a Refund</h2>
             <ul>
                <li>Send an email to <a href="mailto:work@youthskillset.in">work@youthskillset.in</a> with your order ID, registered email, and reason for refund.</li>
                <li>Our support team will review your case within 5–7 business days.</li>
            </ul>

            <h2>4. Refund Method</h2>
            <p>
              Approved refunds will be credited back to your original payment method (UPI, PhonePe, debit/credit card, etc.). Processing time may vary depending on your bank/payment provider.
            </p>

            <h2>5. No Refunds Provided If</h2>
             <ul>
                <li>You completed or consumed a significant portion of the premium content.</li>
                <li>Refund request was made after the allowed window.</li>
                <li>Account misuse or violation of our Terms of Service is detected.</li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>
              For any refund queries, reach us at:
              <br />
              <strong>Email:</strong> <a href="mailto:work@youthskillset.in">work@youthskillset.in</a>
              <br />
              <strong>Website:</strong> <a href="https://www.youthskillset.in" target="_blank" rel="noopener noreferrer">www.youthskillset.in</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
