
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="p-6 md:p-10 rounded-2xl">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl font-headline">Privacy Policy</CardTitle>
            <p className="text-muted-foreground pt-2">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none px-0">
            <h2>1. Introduction</h2>
            <p>
              Welcome to YouthSkillSet. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy sets out how we collect, use, and protect any information that you give us when you use this website.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We may collect the following information:
            </p>
            <ul>
              <li>
                <strong>Account Information:</strong> When you register for an account, we collect information such as your name, email address, and password.
              </li>
              <li>
                <strong>Usage Data:</strong> We collect information automatically about your interaction with our services, such as your progress through lessons, quiz results, and feature usage.
              </li>
              <li>
                <strong>Communication Data:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            <p>
                We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>

            <h2>5. Your Data Protection Rights</h2>
            <p>
              You have certain data protection rights. These include the right to access, correct, update, or request deletion of your personal information. If you wish to exercise any of these rights, please contact us.
            </p>
            
            <h2>6. Changes to This Policy</h2>
             <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our support page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
