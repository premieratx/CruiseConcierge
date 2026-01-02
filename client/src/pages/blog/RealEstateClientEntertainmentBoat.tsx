import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Home, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Key, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-4_1760080740017.jpg';
import sectionImage1 from '@assets/@capitalcityshots-5_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-7_1760080740018.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const realEstateBenefits = [
  { 
    icon: Handshake, 
    title: 'Client Appreciation', 
    description: 'Show high-value clients your gratitude with a real estate client event Austin professionals will remember',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Trophy, 
    title: 'Team Celebrations', 
    description: 'Celebrate your brokerage wins with real estate team building Lake Travis style',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Users, 
    title: 'Networking Events', 
    description: 'Build relationships with other agents during client entertainment Austin networking cruises',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Key, 
    title: 'Closing Celebrations', 
    description: 'Celebrate big closings on a realtor party boat Lake Travis experience',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const eventTypes = [
  {
    title: 'Million Dollar Club Events',
    description: 'Celebrate top producers with unforgettable client entertainment Austin experiences',
    features: [
      'VIP treatment for top agents',
      'Private boat charter exclusivity',
      'Photo opportunities for social media',
      'Premium catering coordination'
    ]
  },
  {
    title: 'Client Thank-You Events',
    description: 'Show appreciation with a real estate client event Austin buyers and sellers will love',
    features: [
      'Memorable closing gift experience',
      'Annual appreciation cruises',
      'Referral thank-you events',
      'Holiday client gatherings'
    ]
  },
  {
    title: 'Brokerage Team Outings',
    description: 'Bond your team with real estate team building Lake Travis adventures',
    features: [
      'New agent welcome events',
      'Quarterly team celebrations',
      'Training retreat venues',
      'Office party alternatives'
    ]
  },
  {
    title: 'Open House After-Parties',
    description: 'Impress potential buyers with a unique realtor party boat Lake Travis experience',
    features: [
      'Luxury listing showcases',
      'Investor networking cruises',
      'Broker open celebrations',
      'VIP property previews'
    ]
  }
];

const whyLakeTravis = [
  { stat: '100%', label: 'Private Charter' },
  { stat: '14-75', label: 'Guest Capacity' },
  { stat: '5-Star', label: 'Google Rating' },
  { stat: '3+ Hours', label: 'Cruise Duration' }
];

const faqs = [
  {
    question: 'How does a boat party help real estate professionals close more deals?',
    answer: 'A real estate client event Austin on the water creates lasting memories and strengthens client relationships. When clients associate you with unique experiences like a realtor party boat Lake Travis cruise, they are more likely to refer you and return for future transactions. Client entertainment Austin style sets you apart from competitors.'
  },
  {
    question: 'What size groups work best for real estate team building Lake Travis events?',
    answer: 'We accommodate real estate groups of all sizes. Our Day Tripper holds 14 guests for intimate agent gatherings, while our flagship Clever Girl accommodates up to 75 for large brokerage events. Real estate team building Lake Travis works perfectly for office teams of 20-50 agents.'
  },
  {
    question: 'Can we brand the boat for our brokerage or real estate client event Austin?',
    answer: 'Absolutely! Many realtors bring custom signage, branded cups, and promotional materials for their client entertainment Austin events. We can help coordinate banners and decorations to showcase your brokerage during your realtor party boat Lake Travis experience.'
  },
  {
    question: 'What makes Lake Travis ideal for client entertainment Austin real estate events?',
    answer: 'Lake Travis offers stunning Hill Country views that impress high-value clients. A real estate client event Austin on the water provides a unique, memorable setting that generic restaurant dinners cannot match. The exclusivity of a private charter elevates your client entertainment Austin experience.'
  },
  {
    question: 'How far in advance should we book a realtor party boat Lake Travis?',
    answer: 'For real estate team building Lake Travis events or client appreciation cruises, we recommend booking 2-4 weeks ahead. Popular dates fill quickly, especially during spring and fall. The sooner you reach out for your client entertainment Austin event, the more options available.'
  },
  {
    question: 'Can we host investor presentations during a real estate client event Austin cruise?',
    answer: 'Yes! Our boats provide excellent venues for investor presentations and networking. The intimate setting of a realtor party boat Lake Travis allows for focused conversations. Many real estate professionals use client entertainment Austin cruises for pitch meetings with potential investors.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Intimate closings' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Team meetings' },
  { name: 'The Irony', capacity: '30 guests', best: 'Office parties' },
  { name: 'Clever Girl', capacity: '75 guests', best: 'Brokerage events' }
];

export default function RealEstateClientEntertainmentBoat() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Real Estate Client Entertainment Boat Austin | Realtor Party Boat Lake Travis</title>
        <meta name="description" content="Host unforgettable real estate client event Austin experiences. Realtor party boat Lake Travis perfect for client entertainment Austin and real estate team building Lake Travis. Private charters for 14-75 guests." />
        <meta name="keywords" content="real estate client event Austin, realtor party boat Lake Travis, client entertainment Austin, real estate team building Lake Travis, Austin realtor boat party, Lake Travis brokerage event" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/real-estate-client-entertainment-boat-austin" />
        <meta property="og:title" content="Real Estate Client Entertainment Boat Austin | Realtor Party Boat Lake Travis" />
        <meta property="og:description" content="Host unforgettable real estate client events on Lake Travis. Perfect for client entertainment Austin and realtor team building." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="real-estate-blog-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-real-estate">
              REAL ESTATE CLIENT ENTERTAINMENT
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Seal the Deal on a Boat
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Real Estate Client Event Austin & Realtor Party Boat Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Impress high-value clients and celebrate your team with client entertainment Austin professionals trust. 
              Experience real estate team building Lake Travis style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Home className="mr-2 h-5 w-5" />
                  Plan Your Realtor Event
                </Button>
              </Link>
              <Link href="/client-entertainment">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View Client Entertainment Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Intro Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="intro-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Why Real Estate Professionals Love Boat Events</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                In the competitive Austin real estate market, standing out matters. A <strong>real estate client event Austin</strong> on 
                Lake Travis creates the kind of memorable experience that turns one-time buyers into lifelong clients and referral sources. 
                Whether you're celebrating a million-dollar closing, hosting a <strong>realtor party boat Lake Travis</strong> appreciation event, 
                or planning <strong>real estate team building Lake Travis</strong> for your brokerage, Premier Party Cruises delivers.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Client entertainment Austin</strong> professionals choose our private charters because we understand the importance 
                of impressing discerning clients. From intimate 14-person closings to 75-person brokerage celebrations, we have the 
                perfect boat for your <strong>real estate client event Austin</strong>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Perfect for Every Real Estate Celebration</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From client appreciation to real estate team building Lake Travis adventures
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {realEstateBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`benefit-card-${index}`}>
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
        <section className="py-12 bg-blue-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyLakeTravis.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="event-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">REAL ESTATE EVENT TYPES</Badge>
                  <h2 className="text-3xl font-bold mb-6">Events We Host for Real Estate Professionals</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you need an intimate <strong>real estate client event Austin</strong> for VIP buyers or 
                    a large <strong>realtor party boat Lake Travis</strong> for your entire brokerage, we deliver unforgettable 
                    <strong> client entertainment Austin</strong> experiences that strengthen relationships and generate referrals.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {eventTypes.map((event, index) => (
                      <Card key={index} className="bg-white/80 dark:bg-gray-800" data-testid={`event-type-card-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                          <ul className="space-y-1">
                            {event.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-blue-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Real estate team building Lake Travis boat party with Austin realtors networking on deck"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Key className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">VIP Experience</p>
                        <p className="text-xs text-gray-500">For your best clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impressing High-Value Clients Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="impress-clients-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
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
                      alt="Client entertainment Austin luxury boat cruise with realtor party boat Lake Travis sunset views"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">IMPRESS YOUR CLIENTS</Badge>
                  <h2 className="text-3xl font-bold mb-6">How to Impress High-Value Real Estate Clients</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    In luxury real estate, the experience you create matters as much as the properties you show. 
                    A <strong>real estate client event Austin</strong> on Lake Travis positions you as a premier agent 
                    who goes above and beyond. <strong>Client entertainment Austin</strong> on the water creates talking points 
                    that lead to referrals.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Exclusive private charter experience',
                      'Stunning Hill Country backdrop for photos',
                      'Premium amenities and professional crew',
                      'Flexible scheduling for busy professionals',
                      'BYOB with catering coordination available',
                      'Create memories that generate referrals'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-private-cruises">
                      <Ship className="mr-2 h-5 w-5" />
                      Explore Private Cruises
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="boat-options-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">BOAT OPTIONS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Boats for Every Realtor Event Size</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Whether you're hosting an intimate <strong>real estate client event Austin</strong> closing celebration 
                    or a full <strong>realtor party boat Lake Travis</strong> brokerage bash, we have the perfect vessel. 
                    Our fleet supports <strong>real estate team building Lake Travis</strong> for groups of 14 to 75.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {packageOptions.map((boat, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800" data-testid={`boat-option-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-gray-900 dark:text-white">{boat.name}</h4>
                          <p className="text-blue-600 text-sm">{boat.capacity}</p>
                          <p className="text-gray-500 text-xs mt-1">{boat.best}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/team-building">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-team-building">
                      <Users className="mr-2 h-5 w-5" />
                      View Team Building Options
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Realtor party boat Lake Travis with real estate client event Austin guests enjoying scenic cruise"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">Great ROI</p>
                        <p className="text-xs text-gray-500">Referrals guaranteed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Creating Memorable Experiences Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="memorable-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Creating Memorable Client Experiences</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Turn every real estate client event Austin into a referral machine with client entertainment Austin that stands out
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Closing Celebrations',
                  tips: [
                    'Invite buyers for sunset cruise',
                    'Bring champagne to celebrate',
                    'Take photos with closing gifts',
                    'Create shareable memories'
                  ]
                },
                {
                  title: 'Client Appreciation',
                  tips: [
                    'Annual thank-you cruises',
                    'Referral recognition events',
                    'Holiday client gatherings',
                    'VIP client exclusives'
                  ]
                },
                {
                  title: 'Brokerage Events',
                  tips: [
                    'Quarterly team celebrations',
                    'New agent orientations',
                    'Training retreat venues',
                    'Award ceremonies afloat'
                  ]
                },
                {
                  title: 'Networking Cruises',
                  tips: [
                    'Multi-brokerage mixers',
                    'Vendor appreciation events',
                    'Lender relationship building',
                    'Industry networking nights'
                  ]
                },
                {
                  title: 'Marketing Opportunities',
                  tips: [
                    'Social media content creation',
                    'Client testimonial videos',
                    'Brand photography sessions',
                    'Unique listing presentations'
                  ]
                },
                {
                  title: 'Investor Relations',
                  tips: [
                    'Investment property pitches',
                    'Portfolio review meetings',
                    'Development showcases',
                    'Private investor cruises'
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`tips-card-${index}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Real Estate Event FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about real estate client event Austin and realtor party boat Lake Travis experiences
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
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

        {/* Internal Links Section */}
        <section className="py-12 bg-white dark:bg-gray-900" data-testid="internal-links-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-bold text-center mb-6">Explore More Corporate & Client Event Options</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/team-building">
                <Button variant="outline" className="font-semibold" data-testid="link-team-building">
                  Team Building Cruises
                </Button>
              </Link>
              <Link href="/client-entertainment">
                <Button variant="outline" className="font-semibold" data-testid="link-client-entertainment">
                  Client Entertainment
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button variant="outline" className="font-semibold" data-testid="link-private-cruises">
                  Private Cruises
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button variant="outline" className="font-semibold" data-testid="link-corporate-events">
                  Corporate Events
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Real Estate Client Event Austin?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your realtor party boat Lake Travis experience. We'll help you create 
                client entertainment Austin that generates referrals and strengthens relationships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Home className="mr-2 h-5 w-5" />
                    Get Your Realtor Event Quote
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-call">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
