import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Phone, CheckCircle2, Wine, ArrowRight, MapPin, 
  Shield, Truck, Building2, Clock, FileCheck, Users,
  PartyPopper, Anchor, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/atx-disco-cruise-party.webp';
import sectionImage1 from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage2 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import galleryImage from '@assets/@capitalcityshots-3_1760080740017.jpg';

const keyBenefits = [
  { 
    icon: Truck, 
    title: 'Direct Delivery', 
    description: 'Alcohol delivered right to your venue or boat. No stress, no hassle.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Shield, 
    title: 'TABC Compliant', 
    description: 'We handle all Texas alcohol laws. You just enjoy the party.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Building2, 
    title: 'Venue Coordination', 
    description: 'We work with your venue to ensure smooth delivery.',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Anchor, 
    title: 'Lake Travis Ready', 
    description: 'Marina drop-offs for your boat party are our specialty.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  }
];

const tabcRules = [
  {
    title: 'Age Verification Required',
    description: 'All recipients must be 21+. A valid ID is checked at delivery.',
    icon: FileCheck
  },
  {
    title: 'Licensed Delivery Only',
    description: 'Party On Delivery holds a TABC license. This keeps you legal.',
    icon: Shield
  },
  {
    title: 'No Open Containers',
    description: 'Alcohol must be sealed during delivery. Open it after we leave.',
    icon: AlertCircle
  },
  {
    title: 'Delivery Hours',
    description: 'Texas allows delivery from 10am to midnight. Plan accordingly.',
    icon: Clock
  }
];

const venueTypes = [
  {
    name: 'Lake Travis Marinas',
    services: [
      'Dock-side delivery before your cruise',
      'Coordination with marina staff',
      'Ice and coolers available',
      'Same-day service for last-minute needs'
    ]
  },
  {
    name: 'Hotels & Airbnbs',
    services: [
      'Lobby or room delivery',
      'Pre-arrival stocking available',
      'Champagne for welcome parties',
      'Full bar setup options'
    ]
  },
  {
    name: 'Private Event Venues',
    services: [
      'Work with venue alcohol policies',
      'Bulk orders for large groups',
      'Custom cocktail kit assembly',
      'On-time guaranteed delivery'
    ]
  }
];

const faqs = [
  {
    question: 'What is TABC and why does it matter?',
    answer: 'TABC stands for Texas Alcoholic Beverage Commission. They regulate all alcohol sales in Texas. Using a TABC-licensed delivery service like Party On Delivery keeps your event legal and hassle-free.'
  },
  {
    question: 'Can you deliver alcohol to Lake Travis boats?',
    answer: 'Yes! We deliver to most Lake Travis marinas. Just let us know your dock location and arrival time. We can meet you before your Premier Party Cruises boat departs.'
  },
  {
    question: 'What if my venue has alcohol restrictions?',
    answer: 'Many venues allow BYOB with proof of purchase. We provide receipts and can coordinate with venue managers. Some venues require licensed caterers, which we can also arrange.'
  },
  {
    question: 'How far in advance should I order?',
    answer: 'We recommend 24-48 hours for standard orders. Same-day delivery is available but subject to availability. Large events or custom orders need 3-5 days notice.'
  },
  {
    question: 'Do you offer non-alcoholic options too?',
    answer: 'Absolutely! We carry mixers, sodas, water, and non-alcoholic beer and wine. Perfect for guests who prefer not to drink or for designated drivers.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, Venmo, and Zelle. Payment is due at the time of delivery. Tips for our drivers are appreciated but not required.'
  }
];

export default function AustinPartyVenueAlcoholDelivery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/austin-party-venue-alcohol-delivery-navigating-policies-and-logistics"
        defaultTitle="Austin Party Venue Alcohol Delivery | TABC Policies & Logistics Guide"
        defaultDescription="Navigate Austin's alcohol delivery rules with ease. Learn TABC compliance, venue coordination, and Lake Travis delivery options. Party On Delivery makes it simple."
        defaultKeywords={['Austin alcohol delivery', 'TABC compliance', 'party venue alcohol', 'Lake Travis alcohol delivery', 'Austin party planning']}
      />

      <BlogV2Layout
        title="Austin Party Venue Alcohol Delivery | TABC Policies & Logistics Guide"
        description="Navigate Austin's alcohol delivery rules with ease. Learn TABC compliance, venue coordination, and Lake Travis delivery options. Party On Delivery makes it simple."
        slug="austin-party-venue-alcohol-delivery-navigating-policies-and-logistics"
        category="Event Planning Guides"
        categoryHref="/private-cruises"
        pillarTitle="Austin Event Planning"
        pillarHref="/private-cruises"
        relatedArticles={[
          { title: 'Integrated Austin Event Services: Alcohol Delivery + Boat Rentals', href: '/blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations' },
          { title: 'Birthday Party Alcohol Delivery Austin: Milestone Celebrations Made Easy', href: '/blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy' },
          { title: 'Conference After-Party Alcohol Coordination: SXSW, ACL & Austin Events', href: '/blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration' }
        ]}
      >
      <div className="min-h-screen bg-white dark:bg-gray-950">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              AUSTIN PARTY PLANNING GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Austin Party Venue Alcohol Delivery
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Navigating Policies and Logistics
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Everything you need to know about alcohol delivery for your Austin event. Simple rules. Easy logistics. Great parties.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <Wine className="mr-2 h-5 w-5" />
                  Order Delivery Now
                </Button>
              </a>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  Plan Your Party
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse our full range of{' '}
            <Link href="/party-boat-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin party boat rentals</Link>{' '}
            for celebrations of every kind on Lake Travis.
          </p>
        </div>
      </div>


        {/* Key Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Use a Delivery Service?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Skip the liquor store lines. Let us handle the heavy lifting. With Party On Delivery, you get professional alcohol delivery directly to your Austin venue, hotel, or Lake Travis marina. Our TABC-licensed service ensures everything stays legal and stress-free, so you can focus on celebrating instead of running errands.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyBenefits.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
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

        {/* TABC Regulations Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">TABC COMPLIANCE MADE EASY</Badge>
                  <h2 className="text-3xl font-bold mb-6">Understanding Texas Alcohol Rules</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Texas has specific rules for alcohol delivery. The good news? Party On Delivery handles all of this for you.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Here's what you need to know:
                  </p>
                  
                  <div className="grid gap-4">
                    {tabcRules.map((rule, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <rule.icon className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">{rule.title}</h4>
                            <p className="text-sm text-gray-600">{rule.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Party celebration on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">TABC Licensed</p>
                        <p className="text-xs text-gray-500">Fully compliant delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Venue Coordination Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Delivery to Any Venue Type</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From lake marinas to downtown hotels, we've got you covered
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {venueTypes.map((venue, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        {venue.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {venue.services.map((service, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{service}</span>
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

        {/* Lake Travis Integration Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage2}
                      alt="Lake Travis party boat experience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">LAKE TRAVIS SERVICES</Badge>
                  <h2 className="text-3xl font-bold mb-6">Party On Delivery + Premier Party Cruises</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Planning a Lake Travis boat party? We work directly with Premier Party Cruises to make your experience seamless.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Delivery to your marina before departure',
                      'Ice and coolers available on request',
                      'BYOB-friendly boat rentals',
                      'Cocktail kits designed for lake days',
                      'Same-day service for last-minute orders',
                      'Coordination with boat crew'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/chat">
                      <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                        <Ship className="mr-2 h-5 w-5" />
                        Book a Boat Party
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Austin Party Moments</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Real celebrations on Lake Travis with Party On Delivery
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={galleryImage}
                  alt="Lake Travis party celebration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={heroImage}
                  alt="ATX Disco Cruise party"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Quick answers about Austin alcohol delivery
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <PartyPopper className="h-16 w-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Austin Party?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let Party On Delivery handle the drinks while Premier Party Cruises handles the boat. Focus on having fun!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                    <Wine className="mr-2 h-5 w-5" />
                    Order Alcohol Delivery
                  </Button>
                </a>
                <Link href="/chat">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    Book a Party Cruise
                  </Button>
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-10 w-10 mx-auto mb-3 text-white" />
                    <h3 className="font-bold text-lg mb-2">Premier Party Cruises</h3>
                    <a href="tel:5124885892" className="text-white/90 hover:text-white flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      (512) 488-5892
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Wine className="h-10 w-10 mx-auto mb-3 text-white" />
                    <h3 className="font-bold text-lg mb-2">Party On Delivery</h3>
                    <a href="tel:7373719700" className="text-white/90 hover:text-white flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      (737) 371-9700
                    </a>
                  </CardContent>
                </Card>
              </div>
            </m.div>
          </div>
        </section>

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}
