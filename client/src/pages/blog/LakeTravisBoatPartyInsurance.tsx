import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Shield, Users, FileCheck, Phone, Clock, CheckCircle2, 
  AlertTriangle, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Scale, ClipboardCheck, Anchor,
  Ship, Heart, FileText, BadgeCheck, Lock, Umbrella
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-15_1760080740020.jpg';
import sectionImage1 from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-17_1760080740020.jpg';

const insuranceCoverage = [
  {
    icon: Shield,
    title: 'Comprehensive Liability Coverage',
    description: 'Our Lake Travis boat party insurance includes full liability protection for all guests during your charter',
    details: 'Up to $2 million in coverage'
  },
  {
    icon: Anchor,
    title: 'Vessel Insurance',
    description: 'All party boats are fully insured with boat party liability coverage for any on-water incidents',
    details: 'Hull and equipment covered'
  },
  {
    icon: Users,
    title: 'Passenger Protection',
    description: 'Every guest on your Lake Travis boat party is covered under our charter boat insurance policy',
    details: 'Medical payments included'
  },
  {
    icon: BadgeCheck,
    title: 'Captain & Crew Coverage',
    description: 'Our licensed captains carry professional liability as part of boat rental insurance Austin requirements',
    details: 'USCG licensed operators'
  }
];

const liabilityExplained = [
  {
    title: 'What We Cover',
    items: [
      'Accidents occurring on the vessel during your Lake Travis boat party',
      'Injuries related to water activities (swimming, floating)',
      'Property damage to the boat during normal use',
      'Emergency medical evacuation if needed',
      'Weather-related cancellations and rescheduling'
    ]
  },
  {
    title: 'Guest Responsibilities',
    items: [
      'Following safety instructions from captain and crew',
      'Supervising minor children at all times',
      'Not bringing glass containers aboard',
      'Maintaining reasonable behavior standards',
      'Signing required liability waivers before boarding'
    ]
  }
];

const safetyRecord = [
  { stat: '14+', label: 'Years Operating' },
  { stat: '125,000+', label: 'Safe Passengers' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const insuranceTypes = [
  {
    icon: Umbrella,
    title: 'General Liability',
    description: 'Protects against claims of bodily injury or property damage during your Lake Travis boat party insurance coverage period'
  },
  {
    icon: Ship,
    title: 'Hull Insurance',
    description: 'Covers physical damage to the vessel - part of our comprehensive boat party liability coverage'
  },
  {
    icon: Users,
    title: 'Protection & Indemnity',
    description: 'P&I coverage for passenger injuries, a key component of charter boat insurance for events'
  },
  {
    icon: FileText,
    title: 'Pollution Liability',
    description: 'Environmental protection coverage included in our boat rental insurance Austin policies'
  }
];

const waiverProcess = [
  { step: '1', title: 'Digital Waiver Sent', description: 'All guests receive liability waivers via email before the Lake Travis boat party' },
  { step: '2', title: 'Review & Sign', description: 'Guests review terms and sign electronically - takes just 2 minutes' },
  { step: '3', title: 'Confirmation', description: 'Signed waivers are stored securely as part of our boat party liability coverage process' },
  { step: '4', title: 'Day-Of Check', description: 'Captain confirms all guests have completed waivers before departure' }
];

const faqs = [
  {
    question: 'What insurance coverage does Premier Party Cruises carry for Lake Travis boat parties?',
    answer: 'Premier Party Cruises maintains comprehensive Lake Travis boat party insurance including general liability (up to $2 million), hull insurance, protection and indemnity (P&I), and pollution liability. Our boat party liability coverage exceeds Texas state requirements and provides full protection for all guests during your charter.'
  },
  {
    question: 'Am I liable for damages during my boat party rental?',
    answer: 'Normal wear and use is covered by our charter boat insurance. However, guests are responsible for intentional damage, damage from prohibited items (like glass), or damage resulting from behavior that violates our policies. Our liability waiver outlines specific responsibilities for your Lake Travis boat party.'
  },
  {
    question: 'Do guests need to sign liability waivers?',
    answer: 'Yes, all guests must sign our digital liability waiver before boarding. This is standard practice for boat rental insurance Austin operations and protects both guests and our company. Waivers are sent via email and take just 2 minutes to complete.'
  },
  {
    question: 'What happens if someone gets injured on the boat?',
    answer: 'Our Lake Travis boat party insurance includes medical payments coverage for guest injuries. Our captains are trained in first aid, and we carry emergency equipment on all vessels. In case of serious injury, we coordinate immediately with emergency services. Our boat party liability coverage ensures guests receive proper care.'
  },
  {
    question: 'Are children covered under your insurance policy?',
    answer: 'Yes, children are covered under our charter boat insurance when accompanied by parents or guardians. Parents must sign waivers for minor children and are responsible for supervision during the Lake Travis boat party. Life jackets in children\'s sizes are available on all boats.'
  },
  {
    question: 'Does your insurance cover alcohol-related incidents?',
    answer: 'Our boat rental insurance Austin policy covers accidents that occur during BYOB events. However, guests are responsible for their own alcohol consumption and behavior. We reserve the right to end a charter early if alcohol consumption creates safety concerns. Responsible drinking is expected on all Lake Travis boat parties.'
  },
  {
    question: 'What if weather cancels my boat party?',
    answer: 'Weather cancellations are fully covered - no liability to guests. If we cancel due to unsafe conditions, you receive a full refund or rescheduling at no additional cost. Our Lake Travis boat party insurance includes weather-related protections for your peace of mind.'
  },
  {
    question: 'Can I add my own event insurance for corporate events?',
    answer: 'Yes! For large corporate events, we recommend coordinating your company\'s event insurance with our charter boat insurance. We can provide certificates of insurance for your records and work with your risk management team to ensure comprehensive boat party liability coverage.'
  }
];

const internalLinks = [
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises', label: 'Safety Guidelines', icon: Shield },
  { href: '/faq', label: 'General FAQ', icon: FileText },
  { href: '/contact', label: 'Contact Us', icon: Phone },
  { href: '/quote', label: 'Get a Quote', icon: ClipboardCheck }
];

export default function LakeTravisBoatPartyInsurance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events"
        defaultTitle="Lake Travis Boat Party Insurance - Understanding Coverage & Liability | Premier Party Cruises"
        defaultDescription="Learn about Lake Travis boat party insurance coverage and liability for events. Comprehensive boat party liability coverage, charter boat insurance explained, and boat rental insurance Austin requirements. 14+ years, 100% safety record."
        defaultKeywords={['Lake Travis boat party insurance', 'boat party liability coverage', 'charter boat insurance', 'boat rental insurance Austin', 'party boat liability', 'Lake Travis boat charter insurance', 'event boat insurance Texas']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-insurance-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party insurance - professional captain ensuring safe party cruise experience"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-green-400 text-black font-bold" data-testid="badge-hero">
              Fully Insured & Protected
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Insurance<br />
              <span className="text-green-400">Understanding Coverage & Liability</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Complete guide to boat party liability coverage for your Lake Travis event. Learn what's covered, guest responsibilities, and why our charter boat insurance gives you peace of mind for your celebration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Get Your Protected Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
                data-testid="button-contact"
              >
                <Link href="/contact">Ask About Coverage</Link>
              </Button>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Explore our full guide to{' '}
            <Link href="/party-boat-lake-travis" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Lake Travis party boat rentals</Link>{' '}
            for everything from pricing and logistics to safety and entertainment.
          </p>
        </div>
      </div>


        {/* Safety Record Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {safetyRecord.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Coverage Overview */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="coverage-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">COMPREHENSIVE PROTECTION</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="coverage-title">
                Our Lake Travis Boat Party Insurance Coverage
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every charter includes comprehensive boat party liability coverage that exceeds Texas requirements
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceCoverage.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-green-500" data-testid={`coverage-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="h-7 w-7 text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{item.description}</p>
                      <Badge variant="outline" className="text-green-600 border-green-600">{item.details}</Badge>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage1}
              alt="Lake Travis boat party insurance coverage - guests enjoying safe party cruise with professional captain"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-coverage"
            />
          </div>
        </section>

        {/* Types of Insurance */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900" data-testid="insurance-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">INSURANCE TYPES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="types-title">
                Types of Charter Boat Insurance We Carry
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Understanding the different types of boat rental insurance Austin operators must maintain
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {insuranceTypes.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`type-card-${index}`}>
                    <CardContent className="pt-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Liability Explained */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="liability-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">LIABILITY DETAILS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="liability-title">
                Understanding Boat Party Liability Coverage
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Clear breakdown of what our Lake Travis boat party insurance covers and guest responsibilities
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-8">
              {liabilityExplained.map((section, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full" data-testid={`liability-card-${index}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {index === 0 ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <AlertTriangle className="h-6 w-6 text-amber-500" />}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${index === 0 ? 'text-green-500' : 'text-amber-500'}`} />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Waiver Process */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="waiver-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">SIMPLE PROCESS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="waiver-title">
                Our Easy Liability Waiver Process
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Quick and simple digital waivers for all guests - part of our comprehensive Lake Travis boat party insurance process
              </p>
            </m.div>

            <div className="grid md:grid-cols-4 gap-6">
              {waiverProcess.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                  data-testid={`waiver-step-${index}`}
                >
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 2 */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage2}
              alt="Charter boat insurance Austin - safe party boat experience on Lake Travis with liability coverage"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-waiver"
            />
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">INSURANCE FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">
                Frequently Asked Questions About Boat Party Insurance
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Lake Travis boat party insurance and liability coverage
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Learn more about our Lake Travis boat party services
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-green-500" data-testid={`link-card-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <link.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-blue-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Shield className="h-16 w-16 mx-auto mb-6 text-green-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Book With Confidence
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Our comprehensive Lake Travis boat party insurance means you can focus on celebrating. 14+ years of experience, 125,000+ happy guests, and a 100% safety record.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg px-8"
                  data-testid="button-cta-quote"
                >
                  <Link href="/book-now">Get Your Quote Today</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-700 font-semibold"
                  data-testid="button-cta-call"
                >
                  <a href="tel:5125551234">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
