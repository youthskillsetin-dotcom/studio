
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="p-6 md:p-10 rounded-2xl">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl font-headline">YouthSkillset Privacy Policy</CardTitle>
            <p className="text-muted-foreground pt-2">Effective Date: [Insert Date]</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none px-0">
            <p>
              At YouthSkillset ("we," "our," or "us"), your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including all modules and services.
            </p>

            <h2>1. Information We Collect</h2>
            <ul>
              <li>
                <strong>Personal Information:</strong> When you register or interact with our platform, we may collect personal details such as your name, age, email address, and educational information.
              </li>
              <li>
                <strong>Usage Data:</strong> We collect data on how you use our services, including modules accessed, learning progress, and interaction logs.
              </li>
              <li>
                <strong>Device and Technical Information:</strong> This includes IP addresses, browser type, operating system, and device identifiers.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> To improve user experience and analyze platform usage, we use cookies and similar technologies.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
                <li>To provide and maintain our educational services and personalized content.</li>
                <li>To communicate with you, including sending updates, announcements, and support messages.</li>
                <li>To analyze platform usage and improve our courses and features.</li>
                <li>To ensure security and prevent unauthorized access or activities.</li>
                <li>To comply with legal obligations and enforce our terms of service.</li>
            </ul>

            <h2>3. Data Sharing and Disclosure</h2>
             <ul>
                <li>We do not sell or rent your personal information to third parties.</li>
                <li>We may share information with trusted service providers who assist in platform operations, subject to confidentiality agreements.</li>
                <li>We may disclose information if required by law or to protect our rights and safety.</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>5. Children's Privacy</h2>
            <p>Our platform is designed for teens aged 13 to 20. We comply with applicable laws regarding the collection of information from minors and do not knowingly collect data from children under the legal age without parental consent.</p>

            <h2>6. Your Rights and Choices</h2>
            <ul>
                <li>You may access, correct, or delete your personal information by contacting us.</li>
                <li>You can opt-out of receiving promotional communications.</li>
                <li>You have the right to withdraw consent where applicable.</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>We retain your information as long as necessary to provide services and comply with legal obligations.</p>
            
            <h2>8. Changes to This Privacy Policy</h2>
             <p>
              We may update this policy periodically. We will notify you of significant changes through our platform or via email.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              For any questions or concerns about this Privacy Policy, please contact us at:
              <br />
              Email: [Insert Email]
              <br />
              Address: [Insert physical address if applicable]
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
