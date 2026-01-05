import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, PartyPopper,
  Heart, GlassWater, Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage3 from '@assets/@capitalcityshots-4_1760080740017.jpg';
import sectionImage4 from '@assets/@capitalcityshots-5_1760080740018.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const corporateBenefits = [
  { 
    icon: Users, 
    title: 'Flexible Group Sizes', 
    description: 'Corporate events Austin accommodates from intimate 10-person gatherings to large 100+ guest celebrations',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Trophy, 
    title: 'Team Building Excellence', 
    description: 'Our team event Lake Travis experiences strengthen connections and boost morale',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Handshake, 
    title: 'Client Entertainment', 
    description: 'Impress clients at the best company party venue Lake Travis has to offer',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Ship, 
    title: 'Private Fleet Access', 
    description: 'Corporate boat rental Austin with 4 vessels ensures the perfect fit for any group',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const fleetOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    idealFor: 'Executive retreats & small team outings',
    features: ['Private sundeck', 'Premium sound system', 'Swimming platform', 'BYOB welcome'],
    bestFor: 'Corporate events Austin with intimate groups'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    idealFor: 'Department events & team celebrations',
    features: ['Spacious deck area', 'Bluetooth speakers', 'Shade canopy', 'Lake swimming access'],
    bestFor: 'Mid-size team event Lake Travis experiences'
  },
  {
    name: 'Clever Girl',
    capacity: '50 guests',
    idealFor: 'Large team retreats & company parties',
    features: ['Single deck with arch canopy', 'Dance floor space', 'Full sound system', 'Giant lily pad floats'],
    bestFor: 'Company party venue Lake Travis gatherings'
  },
  {
    name: 'The Irony',
    capacity: '75 guests',
    idealFor: 'Company-wide events & major celebrations',
    features: ['Largest in fleet', 'Premium amenities', 'Event coordination', 'Maximum capacity'],
    bestFor: 'Large corporate boat rental Austin events'
  }
];

const eventTypes = [
  {
    title: 'Team Building Retreats',
    description: 'Transform your team event Lake Travis into lasting memories',
    icon: Target,
    features: [
      'Full-day private charters',
      'Water activities included',
      'Flexible scheduling',
      'Catering coordination'
    ],
    link: '/team-building'
  },
  {
    title: 'Client Entertainment',
    description: 'The ultimate company party venue Lake Travis for impressing clients',
    icon: Handshake,
    features: [
      'VIP treatment',
      'Professional crew',
      'Custom experiences',
      'Premium service'
    ],
    link: '/client-entertainment'
  },
  {
    title: 'Company Celebrations',
    description: 'Celebrate milestones at premier corporate events Austin location',
    icon: PartyPopper,
    features: [
      'Anniversary parties',
      'Product launches',
      'Holiday gatherings',
      'Achievement celebrations'
    ],
    link: '/corporate-events'
  },
  {
    title: 'Private Cruises',
    description: 'Exclusive corporate boat rental Austin experiences',
    icon: Ship,
    features: [
      'Complete privacy',
      'Customizable itinerary',
      'All group sizes',
      'Sunset options'
    ],
    link: '/private-cruises'
  }
];

const whyChooseStats = [
  { stat: '10-100+', label: 'Guest Capacity Range' },
  { stat: '4', label: 'Boats in Our Fleet' },
  { stat: '3-4 Hrs', label: 'Cruise Duration' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What size corporate events Austin can you accommodate?',
    answer: 'Our corporate events Austin services accommodate groups from 10 to over 100 guests. We have four boats ranging from our 14-person Day Tripper for executive retreats to our flagship Clever Girl (50-75 guests) for company-wide celebrations. For larger events over 75 guests, we can arrange multiple boats for a coordinated fleet experience.'
  },
  {
    question: 'What makes Lake Travis the best company party venue?',
    answer: 'Lake Travis offers the perfect company party venue Lake Travis experience with stunning Hill Country scenery, calm waters, and escape from typical office environments. The natural beauty creates an ideal backdrop for team building, client entertainment, and corporate celebrations that employees and clients will remember.'
  },
  {
    question: 'How do I book a corporate boat rental Austin?',
    answer: 'Booking a corporate boat rental Austin is simple. Use our online quote builder to select your preferred date, group size, and boat. Our team will follow up to confirm details and answer any questions. We recommend booking 2-4 weeks in advance for corporate events, especially during peak season.'
  },
  {
    question: 'What team event Lake Travis activities are available?',
    answer: 'Our team event Lake Travis experiences include swimming in the lake, relaxing on giant lily pad floats, enjoying the onboard sound system, and simply bonding away from the office. The private boat setting naturally encourages conversation and connection. Many companies use the cruise time for casual team discussions or recognition ceremonies.'
  },
  {
    question: 'Can we bring our own food and drinks for corporate events?',
    answer: 'Yes! All our corporate events Austin cruises are BYOB (Bring Your Own Beverage) and you can bring your own catering. We can also connect you with local catering partners who specialize in corporate events. This gives you complete control over your menu and budget.'
  },
  {
    question: 'What happens if weather affects our corporate boat rental Austin booking?',
    answer: 'Safety is our top priority. If weather conditions make it unsafe to cruise, we offer full rescheduling or refunds for your corporate boat rental Austin reservation. Our team monitors weather closely and communicates proactively about any concerns.'
  },
  {
    question: 'Do you offer corporate packages or group discounts?',
    answer: 'Yes, we offer corporate packages designed specifically for business groups. Contact us for custom quotes based on your company party venue Lake Travis requirements, group size, and preferred date. We work with companies of all sizes from startups to Fortune 500 enterprises.'
  },
  {
    question: 'How far in advance should we book our team event Lake Travis?',
    answer: 'For team event Lake Travis bookings, we recommend 2-4 weeks advance notice. Popular dates and weekends fill quickly, especially during spring and fall corporate event season. The earlier you book, the more date and boat options we can offer.'
  }
];

export default function AustinBestCorporateEvents() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Austin's Best Corporate Events – From 10 to 100 Guests | Lake Travis Boat Rentals</title>
        <meta name="description" content="Plan unforgettable corporate events Austin on Lake Travis. Our company party venue Lake Travis accommodates 10-100+ guests with corporate boat rental Austin options for team building, client entertainment, and celebrations." />
        <meta name="keywords" content="corporate events Austin, company party venue Lake Travis, corporate boat rental Austin, team event Lake Travis, Austin corporate party, Lake Travis business events" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-best-corporate-events" />
        <meta property="og:title" content="Austin's Best Corporate Events – From 10 to 100 Guests | Lake Travis" />
        <meta property="og:description" content="Plan unforgettable corporate events Austin on Lake Travis. Company party venue Lake Travis for 10-100+ guests." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-best-corporate-events" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-austin-best-corporate-events">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-corporate">
              CORPORATE EVENTS AUSTIN
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="heading-main">
              Austin's Best Corporate Events – From 10 to 100 Guests
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              The Premier Company Party Venue Lake Travis for Team Building, Client Entertainment & Celebrations
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Discover why Austin's top companies choose our corporate boat rental Austin fleet for unforgettable team event Lake Travis experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Corporate Event
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View Corporate Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-why-choose">Why Companies Choose Our Corporate Events Austin Services</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From small executive retreats to large company celebrations, we deliver exceptional team event Lake Travis experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {corporateBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`card-benefit-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-blue-900 text-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyChooseStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400" data-testid={`stat-value-${index}`}>{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Austin's Premier Corporate Event Venue Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-premier-venue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">AUSTIN'S PREMIER VENUE</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-premier-venue">Austin's Premier Corporate Event Venue</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    When it comes to corporate events Austin, nothing compares to hosting your team on the beautiful waters of Lake Travis. Our company party venue Lake Travis offers a unique escape from traditional conference rooms and hotel ballrooms.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Our corporate boat rental Austin fleet provides the perfect setting for team building, client appreciation, company milestones, and executive retreats. With stunning Hill Country views and the relaxing ambiance of the lake, your team event Lake Travis will be one everyone remembers.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Private charters for corporate events Austin</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Best company party venue Lake Travis location</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Full-service corporate boat rental Austin</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Memorable team event Lake Travis experiences</span>
                    </li>
                  </ul>
                  <Link href="/corporate-events">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-explore-corporate">
                      Explore Corporate Events
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Corporate events Austin team building on Lake Travis boat party"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Corporate Events Austin</p>
                        <p className="text-xs text-gray-500">10 to 100+ guests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Scaling Section - Fleet Flexibility */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-fleet">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">SCALABLE SOLUTIONS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-scaling">Scaling from 10 to 100+ Guests</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our corporate boat rental Austin fleet offers the flexibility your company needs. Whether planning an intimate executive retreat or a company-wide celebration, we have the perfect vessel for your team event Lake Travis.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fleetOptions.map((boat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-blue-300" data-testid={`card-boat-${index}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{boat.name}</CardTitle>
                        <Badge className="bg-blue-100 text-blue-700">{boat.capacity}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{boat.idealFor}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {boat.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-blue-600 font-medium">{boat.bestFor}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need to accommodate more than 75 guests for your corporate events Austin? We can coordinate multiple boats for a synchronized fleet experience at your company party venue Lake Travis.
              </p>
              <Link href="/private-cruises">
                <Button variant="outline" size="lg" data-testid="button-view-fleet">
                  <Ship className="mr-2 h-5 w-5" />
                  View Full Fleet Details
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="section-event-types">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-yellow-400 text-black">EVENT TYPES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-event-types">Corporate Event Types We Host</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                From team building to client appreciation, our corporate boat rental Austin services cover all your business entertainment needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors" data-testid={`card-event-type-${index}`}>
                    <CardContent className="pt-6">
                      <event.icon className="h-10 w-10 text-yellow-400 mb-4" />
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-white/70 text-sm mb-4">{event.description}</p>
                      <ul className="space-y-2 mb-6">
                        {event.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-white/80">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={event.link}>
                        <Button variant="secondary" size="sm" className="w-full" data-testid={`button-learn-more-${index}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="section-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-gallery">Experience Corporate Events Austin on the Water</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                See why companies choose our company party venue Lake Travis for their most important business gatherings
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              >
                <img 
                  src={sectionImage2}
                  alt="Company party venue Lake Travis corporate boat rental team celebration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              >
                <img 
                  src={sectionImage3}
                  alt="Team event Lake Travis corporate boat rental Austin business gathering"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              >
                <img 
                  src={sectionImage4}
                  alt="Corporate events Austin Lake Travis company party venue boat experience"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FREQUENTLY ASKED QUESTIONS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-faq">Corporate Events Austin FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about planning your team event Lake Travis or corporate boat rental Austin
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold py-4" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-cta">
                Ready to Plan Your Corporate Events Austin Experience?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Whether you need a corporate boat rental Austin for 10 executives or a company party venue Lake Travis for 100+ employees, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Your Corporate Quote
                  </Button>
                </Link>
                <Link href="/team-building">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-team-building">
                    Explore Team Building
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-white/70">
                <Phone className="inline h-4 w-4 mr-2" />
                Call us directly: <a href="tel:+15127884707" className="underline hover:text-white" data-testid="link-phone">(512) 788-4707</a>
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
