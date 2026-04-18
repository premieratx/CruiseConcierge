import PublicNavigation from '@/components/PublicNavigationLuxury';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { CONTACT_INFO } from '@shared/contact';

export default function PrivacyPolicy() {
  const effectiveDate = 'January 1, 2025';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/privacy-policy"
        defaultTitle="Privacy Policy | Premier Party Cruises Austin"
        defaultDescription="Privacy Policy for Premier Party Cruises. Learn how we collect, use, and protect your personal information."
        defaultKeywords={['privacy policy', 'premier party cruises', 'data privacy']}
      />
      <PublicNavigation />

      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl heading-unbounded font-bold mb-3 text-white">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Effective Date: {effectiveDate}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">

          <div>
            <p>
              Premier Party Cruises ("we," "us," or "our") operates {CONTACT_INFO.website || 'premierpartycruises.com'} and
              provides party boat rental services on Lake Travis in Austin, Texas. This Privacy Policy explains how we
              collect, use, disclose, and protect your personal information when you interact with our website, contact us,
              or book our services. By using our website or services, you agree to the practices described in this policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact information</strong> — your name, email address, phone number, and any details you provide when submitting a quote request, contact form, or booking inquiry.</li>
              <li><strong>Booking details</strong> — event date, group size, type of event, and other details needed to fulfill your reservation.</li>
              <li><strong>Communications</strong> — messages, emails, or SMS exchanges between you and our team.</li>
              <li><strong>Usage data</strong> — pages visited, referring URLs, browser type, and general location data collected automatically when you browse our website.</li>
              <li><strong>Payment information</strong> — processed securely through our third-party payment processor; we do not store your full payment card details.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries and provide quotes for our services.</li>
              <li>Process and manage bookings and reservations.</li>
              <li>Send booking confirmations, reminders, and important updates about your reservation.</li>
              <li>Send promotional messages, offers, or newsletters if you have opted in.</li>
              <li>Improve our website, services, and customer experience.</li>
              <li>Comply with legal obligations and resolve disputes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. SMS / Text Message Communications</h2>
            <p className="mb-3">
              If you provide your phone number and opt in to receive text messages from us, we may send you SMS
              communications related to your inquiry or booking — such as confirmations, reminders, or follow-ups.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Opt-in:</strong> By providing your phone number and consenting, you agree to receive SMS messages from Premier Party Cruises.</li>
              <li><strong>Message frequency:</strong> Message frequency varies. You may receive messages related to your booking or inquiry.</li>
              <li><strong>Opt-out:</strong> You can opt out at any time by replying <strong>STOP</strong> to any text message we send you. After opting out, you will no longer receive SMS messages from us.</li>
              <li><strong>Help:</strong> Reply <strong>HELP</strong> for assistance, or contact us directly at {CONTACT_INFO.phoneFormatted}.</li>
              <li><strong>Message and data rates may apply</strong> depending on your mobile carrier plan.</li>
              <li>We do not sell or share your phone number with third parties for their marketing purposes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. How We Share Your Information</h2>
            <p className="mb-3">We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service providers</strong> — third-party vendors who help us operate our business (payment processors, email/SMS platforms, CRM software) under confidentiality agreements.</li>
              <li><strong>Legal requirements</strong> — if required by law, court order, or governmental authority.</li>
              <li><strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of our business assets.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies to analyze site traffic and improve your
              experience. You can control cookie preferences through your browser settings. We may use third-party
              analytics services such as Google Analytics to understand how visitors use our site. These services
              may collect data in accordance with their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your personal
              information from unauthorized access, disclosure, or misuse. No method of transmission over the
              internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Your Rights and Choices</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information, subject to certain exceptions.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the information below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Children's Privacy</h2>
            <p>
              Our website and services are not directed to children under the age of 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal information, please
              contact us and we will take appropriate steps to remove that information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the effective date
              at the top of this page. We encourage you to review this policy periodically to stay informed about
              how we protect your information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Contact Us</h2>
            <p className="mb-3">If you have questions about this Privacy Policy or your personal information, please contact us:</p>
            <address className="not-italic space-y-1">
              <p className="font-semibold text-gray-900 dark:text-white">Premier Party Cruises</p>
              <p>Anderson Mill Marina — 13993 FM 2769, Leander, TX 78641</p>
              <p>Phone: <a href={CONTACT_INFO.phoneHref} className="text-blue-600 hover:underline">{CONTACT_INFO.phoneFormatted}</a></p>
              <p>Email: <a href={CONTACT_INFO.emailHref} className="text-blue-600 hover:underline">{CONTACT_INFO.email}</a></p>
            </address>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
