import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Accessibility, Users, Heart, Phone, Clock, CheckCircle2, 
  Shield, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Ship, HelpCircle, HandHeart,
  Eye, Ear, Move, UserCheck, MessageCircle, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-30_1760080807867.jpg';
import sectionImage1 from '@assets/@capitalcityshots-31_1760080807867.jpg';
import sectionImage2 from '@assets/@capitalcityshots-32_1760080807868.jpg';
import PublicNavigationLuxury from '@/components/PublicNavigationLuxury';
import Footer from '@/components/Footer';

const trustStats = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const accessibilityFeatures = [
  {
    icon: Move,
    title: 'Mobility Considerations',
    description: 'Our accessible Lake Travis boat party vessels are single-deck pontoons with flat surfaces for easier movement. ADA boat rental Austin accommodations are discussed during booking.',
    details: 'Flat deck design on all boats'
  },
  {
    icon: Eye,
    title: 'Visual Accommodations',
    description: 'We provide verbal safety briefings and can offer inclusive party boat Lake Travis experiences with detailed descriptions of activities',
    details: 'Verbal cues and assistance available'
  },
  {
    icon: Ear,
    title: 'Hearing Accommodations',
    description: 'Written safety instructions available for wheelchair accessible boat party guests with hearing considerations',
    details: 'Written materials provided'
  },
  {
    icon: UserCheck,
    title: 'Personal Assistance',
    description: 'Our crew is trained to assist all guests. Bring caregivers or aides free of charge for inclusive event planning Lake Travis',
    details: 'Caregiver rides free'
  }
];

const boatAccessibility = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    features: ['Single-deck pontoon', 'Flat deck surface', 'Arch canopy for shade', 'Wide entrance'],
    notes: 'Compact accessible Lake Travis boat party option for intimate groups'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    features: ['Single-deck pontoon', 'Open floor plan', 'Arch canopy for shade', 'Multiple seating areas'],
    notes: 'Great for ADA boat rental Austin mid-size groups'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    features: ['Single-deck pontoon', 'Spacious layout', 'Arch canopy for shade', 'Easy boarding'],
    notes: 'Popular wheelchair accessible boat party choice'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    features: ['Single-deck pontoon', 'Maximum floor space', 'Arch canopy for shade', '14 disco balls'],
    notes: 'Flagship inclusive party boat Lake Travis with most space (add\'l crew fee for 51-75 guests)'
  }
];

const planningConsiderations = [
  {
    icon: MessageCircle,
    title: 'Communicate Your Needs',
    description: 'Share accessibility requirements during booking for inclusive event planning Lake Travis - the more we know, the better we accommodate'
  },
  {
    icon: Clock,
    title: 'Allow Extra Time',
    description: 'We schedule extra boarding time for accessible Lake Travis boat party groups needing additional assistance'
  },
  {
    icon: Users,
    title: 'Caregiver Policy',
    description: 'Personal care attendants and caregivers ride free for ADA boat rental Austin events'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Our captains are briefed on any special needs for wheelchair accessible boat party safety'
  }
];

const specialNeedsSupport = [
  { need: 'Mobility Devices', support: 'Discuss specific needs during booking - flat deck surfaces on all single-deck pontoons' },
  { need: 'Service Animals', support: 'Service animals welcome on all accessible Lake Travis boat party cruises' },
  { need: 'Dietary Restrictions', support: 'Coordinate with our catering partners for inclusive event planning Lake Travis' },
  { need: 'Sensory Sensitivities', support: 'Adjustable music volume and quieter areas available on inclusive party boat Lake Travis' },
  { need: 'Medication Needs', support: 'Cooler space available for medication requiring refrigeration' },
  { need: 'Fatigue Considerations', support: 'Ample seating throughout for ADA boat rental Austin comfort' }
];

const inclusiveEventTips = [
  { tip: 'Share guest needs with our team at least 48 hours before your accessible Lake Travis boat party' },
  { tip: 'Designate a point person for accessibility coordination for wheelchair accessible boat party events' },
  { tip: 'Consider cruise timing - morning cruises are often cooler for inclusive party boat Lake Travis' },
  { tip: 'Inform guests about boat layout so they can prepare for ADA boat rental Austin experience' },
  { tip: 'Bring any personal mobility aids or comfort items needed' },
  { tip: 'Consider having a backup indoor venue plan in case of weather for inclusive event planning Lake Travis' }
];

const faqs = [
  {
    question: 'Are your boats wheelchair accessible for Lake Travis parties?',
    answer: 'Our boats are single-deck pontoons with flat surfaces, which can accommodate some mobility needs for accessible Lake Travis boat party events. However, boarding from docks may present challenges. We recommend discussing specific wheelchair accessible boat party requirements during booking so we can assess what accommodations are possible and ensure a safe, enjoyable experience.'
  },
  {
    question: 'What ADA accommodations do you provide on Austin boat rentals?',
    answer: 'For ADA boat rental Austin events, we provide flat deck surfaces, ample seating, adjustable shade, and trained crew assistance. We offer verbal and written safety briefings, accommodate service animals, and allow caregivers to ride free. Contact us during booking to discuss specific inclusive party boat Lake Travis needs.'
  },
  {
    question: 'Can service animals come on the boat party cruises?',
    answer: 'Yes! Service animals are welcome on all accessible Lake Travis boat party cruises. We ask that you inform us during booking so we can note this for the captain. The flat deck design of our single-deck pontoons works well for service animals during inclusive event planning Lake Travis.'
  },
  {
    question: 'Do you charge extra for caregivers or personal care attendants?',
    answer: 'No! Caregivers and personal care attendants ride free on all wheelchair accessible boat party charters. We believe inclusive party boat Lake Travis experiences should be accessible to everyone. Just let us know when booking so we can count them for safety purposes.'
  },
  {
    question: 'How do you accommodate guests with sensory sensitivities?',
    answer: 'For ADA boat rental Austin guests with sensory needs, we offer adjustable music volume, quieter areas of the boat, and can provide advance information about the experience. Our crew is briefed on any specific needs for inclusive event planning Lake Travis. The open-air environment of our accessible Lake Travis boat party cruises often works well for sensory-sensitive guests.'
  },
  {
    question: 'Can you accommodate food allergies and dietary restrictions?',
    answer: 'Absolutely! Our catering partners can accommodate various dietary needs including vegetarian, vegan, gluten-free, kosher, and allergy-aware menus. Discuss requirements during your inclusive party boat Lake Travis planning, and we\'ll coordinate with caterers to ensure everyone can enjoy the food safely.'
  },
  {
    question: 'What should I tell you when booking an accessible party?',
    answer: 'For accessible Lake Travis boat party bookings, please share: mobility equipment being used, number of guests needing assistance, service animal presence, sensory considerations, dietary restrictions, and any other needs. The more information you provide, the better we can plan for your wheelchair accessible boat party experience.'
  },
  {
    question: 'Is there shade and seating available throughout the cruise?',
    answer: 'Yes! All our boats feature arch canopy coverage for shade and ample seating throughout. Our single-deck pontoon design for ADA boat rental Austin means no stairs to navigate. Guests can move easily between shaded and sunny areas during their inclusive event planning Lake Travis celebration.'
  }
];

const internalLinks = [
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises', label: 'Safety Guidelines', icon: Shield },
  { href: '/faq', label: 'General FAQ', icon: HelpCircle },
  { href: '/contact', label: 'Contact Us', icon: Phone },
  { href: '/quote', label: 'Get a Quote', icon: Star }
];

export default function AccessibleLakeTravisBoatParties() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        slug="accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests"
        defaultTitle="Accessible Lake Travis Boat Parties - Inclusive Event Planning for All Guests | Premier Party Cruises"
        defaultDescription="Plan an accessible Lake Travis boat party with inclusive event planning for all guests. ADA boat rental Austin accommodations, wheelchair accessible boat party options, and inclusive party boat Lake Travis experiences. Everyone deserves to celebrate on the water."
        defaultKeywords={['accessible Lake Travis boat party', 'inclusive event planning Lake Travis', 'ADA boat rental Austin', 'wheelchair accessible boat party', 'inclusive party boat Lake Travis', 'accessible boat charter Austin', 'disability-friendly boat party']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="accessible-lake-travis-boat-parties-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Accessible Lake Travis boat party - inclusive celebration with guests of all abilities enjoying party cruise"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-teal-400 text-black font-bold" data-testid="badge-hero">
              <Accessibility className="h-4 w-4 mr-1 inline" />
              Inclusive Celebrations
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Accessible Lake Travis Boat Parties<br />
              <span className="text-teal-300">Inclusive Event Planning for All Guests</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Everyone deserves to celebrate on the water. Discover our inclusive party boat Lake Travis options with ADA boat rental Austin accommodations and wheelchair accessible boat party experiences designed for all guests.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Inclusive Event</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                data-testid="button-contact"
              >
                <Link href="/contact">Discuss Your Needs</Link>
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


        {/* Trust Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustStats.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="features-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <Badge className="mb-4 bg-teal-100 text-teal-700">ACCOMMODATIONS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="features-title">
                Accessible Lake Travis Boat Party Features
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our commitment to inclusive event planning Lake Travis for all guests
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accessibilityFeatures.map((feature, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-teal-500" data-testid={`feature-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                        <feature.icon className="h-7 w-7 text-teal-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{feature.description}</p>
                      <Badge variant="outline" className="text-teal-600 border-teal-600">{feature.details}</Badge>
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
              alt="Inclusive party boat Lake Travis - accessible single-deck pontoon with flat surfaces and shade canopy"
              data-testid="img-accessible"
            />
          </div>
        </section>

        {/* Boat Accessibility Details */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-800 dark:to-gray-900" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">OUR FLEET</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="boats-title">
                ADA Boat Rental Austin Fleet Options
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All our boats are single-deck pontoons with arch canopy - designed for accessible Lake Travis boat party experiences
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatAccessibility.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`boat-card-${index}`}>
                    <CardHeader>
                      <Ship className="h-8 w-8 text-blue-600 mb-2" />
                      <CardTitle>{boat.name}</CardTitle>
                      <p className="text-sm text-gray-500">{boat.capacity}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-teal-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-500 italic">{boat.notes}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Considerations */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="planning-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">PLANNING TIPS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="planning-title">
                Inclusive Event Planning Lake Travis Tips
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                How to prepare for your wheelchair accessible boat party
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {planningConsiderations.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`planning-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Needs Support */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="support-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">SPECIAL NEEDS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="support-title">
                How We Support Diverse Needs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our ADA boat rental Austin accommodations for various requirements
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialNeedsSupport.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`support-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <HandHeart className="h-6 w-6 text-pink-600 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold mb-1">{item.need}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.support}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inclusive Event Checklist */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="checklist-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-green-100 text-green-700">CHECKLIST</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="checklist-title">
                  Inclusive Party Boat Lake Travis Checklist
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Tips to ensure your accessible Lake Travis boat party is a success for everyone:
                </p>
                <ul className="space-y-3">
                  {inclusiveEventTips.map((item, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`checklist-item-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item.tip}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Wheelchair accessible boat party - guests of all abilities celebrating on ADA boat rental Austin"
                  data-testid="img-checklist"
                />
              </m.div>
            </div>
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
            >
              <Badge className="mb-4 bg-teal-100 text-teal-700">ACCESSIBILITY FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">
                Questions About Accessible Boat Parties
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about inclusive event planning Lake Travis
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
            >
              <h2 className="text-3xl font-bold mb-4">Explore More</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Learn more about our inclusive party boat Lake Travis options
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-teal-500" data-testid={`link-card-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <link.icon className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Accessibility className="h-16 w-16 mx-auto mb-6 text-teal-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Everyone Deserves to Celebrate
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Plan your accessible Lake Travis boat party with us. Our inclusive event planning Lake Travis team is ready to help create an unforgettable celebration for all your guests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  data-testid="button-cta-quote"
                >
                  <Link href="/book-now">Start Planning Today</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  data-testid="button-cta-call"
                >
                  <a href="tel:5124885892">
                    <Phone className="mr-2 h-5 w-5" />
                    Discuss Your Needs
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
