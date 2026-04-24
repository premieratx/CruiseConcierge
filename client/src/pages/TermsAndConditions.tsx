import PublicNavigation from '@/components/PublicNavigationLuxury';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { CONTACT_INFO } from '@shared/contact';

export default function TermsAndConditions() {
  const effectiveDate = 'January 1, 2025';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/terms-of-service"
        defaultTitle="Terms and Conditions | Premier Party Cruises Austin"
        defaultDescription="Terms and Conditions for Premier Party Cruises. Review our policies for bookings, cancellations, and use of our Lake Travis boat rental services."
        defaultKeywords={['terms and conditions', 'premier party cruises', 'boat rental terms', 'cancellation policy']}
      />
      <PublicNavigation />

      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl heading-unbounded font-bold mb-3 text-white">Terms and Conditions</h1>
          <p className="text-gray-400 text-sm">Effective Date: {effectiveDate}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">

          <div>
            <p>
              These Terms and Conditions ("Terms") govern your use of the Premier Party Cruises website and your
              booking of our party boat rental services on Lake Travis, Austin, Texas. By booking with us or using
              our website, you agree to be bound by these Terms. Please read them carefully before making a
              reservation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Services</h2>
            <p>
              Premier Party Cruises provides party boat rental experiences on Lake Travis, including the ATX Disco
              Cruise (a shared, all-inclusive boat cruise) and private charter rentals. All services are subject
              to availability, weather conditions, and compliance with Licensed, Experienced and applicable Texas
              regulations. We reserve the right to modify our services, pricing, or availability at any time
              without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Bookings and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All bookings are subject to availability and are not confirmed until payment is received and a confirmation is issued.</li>
              <li>Prices are quoted per person for the ATX Disco Cruise and per hour (with a minimum booking period) for private charters.</li>
              <li>Stated prices include applicable taxes and gratuity unless otherwise noted.</li>
              <li>Payment is processed securely through our third-party payment processor. By providing payment information, you authorize us to charge the amount due for your booking.</li>
              <li>We reserve the right to refuse or cancel any booking at our discretion.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Cancellations and Refunds</h2>
            <p className="mb-3">
              Cancellation and refund policies vary depending on the type of booking and how far in advance the
              cancellation is made. Please contact us directly at {CONTACT_INFO.phoneFormatted} for our current
              cancellation policy applicable to your reservation. In general:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations made well in advance may be eligible for a full or partial refund.</li>
              <li>Cancellations made close to the event date may be subject to a cancellation fee. We operate a fair refund policy — all weather-caused cancellations get FREE reschedules.</li>
              <li>Cancellations due to weather or safety conditions at our discretion will be rescheduled or refunded.</li>
            </ul>
            <p className="mt-3">
              We are not responsible for cancellations due to factors outside our control, including but not limited
              to severe weather, acts of God, or government-mandated restrictions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Guest Conduct and Safety</h2>
            <p className="mb-3">All guests are expected to conduct themselves safely and respectfully. By boarding our vessels, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Follow all instructions from the captain and crew at all times.</li>
              <li>Comply with all Licensed, Experienced regulations and applicable Texas boating laws.</li>
              <li>Not bring glass beer bottles on board. Wine, champagne, and spirits in bottles are permitted if kept in a cooler and handled responsibly. No glass beer bottles.</li>
              <li>Not bring or consume illegal substances on board.</li>
              <li>Not engage in behavior that endangers the safety or comfort of other guests or crew.</li>
              <li>Not dive or jump from the boat while it is in motion.</li>
            </ul>
            <p className="mt-3">
              The captain reserves the right to return to the marina and terminate a cruise without refund if any
              guest's behavior poses a safety risk. Guests may be removed from the vessel at the captain's
              discretion for violation of these rules.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Age Requirements and Alcohol</h2>
            <p>
              All guests consuming alcohol must be 21 years of age or older with valid government-issued photo
              identification. Premier Party Cruises is BYOB — we do not sell or serve alcohol. Guests bring their
              own beverages and are responsible for their own consumption. We reserve the right to refuse boarding
              to any guest who appears intoxicated prior to departure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Limitation of Liability</h2>
            <p>
              Premier Party Cruises is not liable for any loss, theft, damage to personal property, injury, or
              death that occurs during a cruise, except where caused by our gross negligence or willful misconduct.
              All guests participate in our services at their own risk. By booking with us, you acknowledge and
              accept this limitation of liability.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Photography and Media</h2>
            <p>
              Professional photography is included as part of the ATX Disco Cruise experience. Photos are provided
              to guests digitally after the event. By participating in our cruises, you grant Premier Party Cruises
              permission to use photographs or video taken during your cruise for marketing and promotional purposes,
              including on our website and social media channels, unless you notify us otherwise in writing prior
              to your cruise date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Intellectual Property</h2>
            <p>
              All content on our website — including text, images, logos, and videos — is the property of Premier
              Party Cruises or its licensors and is protected by applicable copyright and trademark laws. You may
              not reproduce, distribute, or use any content from our website without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Website Use</h2>
            <p>
              You agree to use our website only for lawful purposes and in a manner that does not infringe the
              rights of others. You may not use automated tools to scrape, harvest, or collect data from our
              website. We reserve the right to terminate access to our website for any user who violates these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Texas, without
              regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our
              services will be resolved in the courts of Travis County, Texas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">11. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Changes will be effective when posted to this
              page, with an updated effective date. Your continued use of our website or services after any changes
              constitutes your acceptance of the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">12. Contact Us</h2>
            <p className="mb-3">If you have questions about these Terms, please reach out to us:</p>
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
