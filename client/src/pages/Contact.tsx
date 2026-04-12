import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { SectionReveal } from '@/components/SectionReveal';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@shared/contact';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950" data-page-ready="contact">
      <SEOHead
        pageRoute="/contact"
        defaultTitle="Contact | Premier Party Cruises Austin"
        defaultDescription="Book Lake Travis party boats. Call (512) 488-5892. Bachelor parties, corporate events, private charters. Instant quotes available."
        defaultKeywords={[
          'contact premier party cruises',
          'austin boat rental contact',
          'lake travis cruise booking',
          'party boat austin phone',
          '512-488-5892'
        ]}
        schemaType="organization"
      />
      <PublicNavigation />
      <Breadcrumb />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl heading-unbounded font-bold mb-4 text-white">
            Premier Party Cruises
          </h1>
          <p className="text-gray-300 text-lg mb-6">Austin's original Lake Travis party cruise company — in business since 2009.</p>
          <a
            href={CONTACT_INFO.phoneHref}
            className="inline-flex items-center gap-3 bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-xl px-8 py-4 rounded-lg transition-colors"
          >
            <Phone className="h-6 w-6" />
            {CONTACT_INFO.phoneFormatted}
          </a>
        </div>
      </section>

      {/* Contact Info Strip */}
      <SectionReveal>
        <section className="py-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold mb-1">
                  <Phone className="h-4 w-4 text-blue-600" /> Phone
                </div>
                <a href={CONTACT_INFO.phoneHref} className="text-blue-600 hover:underline font-medium">
                  {CONTACT_INFO.phoneFormatted}
                </a>
                <span className="text-sm text-gray-500">9 AM – 8 PM daily</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold mb-1">
                  <Mail className="h-4 w-4 text-blue-600" /> Email
                </div>
                <a href={CONTACT_INFO.emailHref} className="text-blue-600 hover:underline font-medium text-sm break-all">
                  {CONTACT_INFO.email}
                </a>
                <span className="text-sm text-gray-500">24-hour response</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold mb-1">
                  <MapPin className="h-4 w-4 text-blue-600" /> Marina
                </div>
                <a
                  href="https://maps.google.com/?q=13993+FM+2769+Leander+TX+78641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium text-sm"
                >
                  Anderson Mill Marina
                </a>
                <span className="text-sm text-gray-500">13993 FM 2769, Leander, TX 78641</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold mb-1">
                  <Clock className="h-4 w-4 text-blue-600" /> Schedule
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Seven days a week</span>
                <span className="text-sm text-gray-500">ATX Disco: Fri & Sat · Private: any day</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500 font-medium">Follow us:</span>
              <a
                href="https://www.facebook.com/premierpartycruises"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
              <a
                href="https://www.instagram.com/premierpartycruises"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Quote Builder Widget */}
      <QuoteBuilderSection />

      {/* Video Testimonials */}
      <SectionReveal id="testimonials">
        <VideoTestimonials />
      </SectionReveal>

      {/* SEO structured data */}
      <div className="sr-only" itemScope itemType="https://schema.org/LocalBusiness">
        <h2 itemProp="name">Premier Party Cruises</h2>
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">13993 FM 2769</span>,{' '}
          <span itemProp="addressLocality">Leander</span>,{' '}
          <span itemProp="addressRegion">TX</span>{' '}
          <span itemProp="postalCode">78641</span>
        </div>
        <p itemProp="telephone">{CONTACT_INFO.phone}</p>
        <p itemProp="email">{CONTACT_INFO.email}</p>
      </div>

      <Footer />
    </div>
  );
}
