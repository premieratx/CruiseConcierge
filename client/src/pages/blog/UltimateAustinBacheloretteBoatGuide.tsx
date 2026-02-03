import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Heart, Users, Star, Phone, Clock, CheckCircle2, 
  Camera, Music, Waves, MapPin, Calendar, PartyPopper,
  ArrowRight, Ship, Sparkles, Sun, Umbrella, Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/clever girl-10 austin bachelorette party_1763966476658.jpg';
import sectionImage1 from '@assets/clever-girl-3-bachelorette-boat.jpg';
import sectionImage2 from '@assets/dancing-party-scene.jpg';
import sectionImage3 from '@assets/atx-disco-cruise-party.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const partyStats = [
  { stat: '15+', label: 'Years Experience' },
  { stat: '5,000+', label: 'Bachelorettes Celebrated' },
  { stat: '4 Hours', label: 'Party Cruises' },
  { stat: '5-Star', label: 'Google Rating' }
];

const whyLakeTravis = [
  {
    icon: PartyPopper,
    title: 'Unmatched Party Vibes',
    description: 'Lake Travis is famous for its party cove atmosphere. Your own floating nightclub with Texas Hill Country scenery all around.'
  },
  {
    icon: Users,
    title: 'Keep Everyone Together',
    description: 'Unlike bars where people get split up, a boat keeps your entire squad together in one place. Private and personalized for your group.'
  },
  {
    icon: Waves,
    title: 'Something For Everyone',
    description: 'Jump in the water, float on lily pads, sunbathe on deck, dance, or relax with drinks. No one feels left out!'
  },
  {
    icon: Camera,
    title: 'Stunning Photos',
    description: 'Clear blue waters, dramatic cliffs, Texas sunsets. Instagram heaven with professional photographer included on ATX Disco Cruise.'
  }
];

const discoVsPrivate = {
  disco: {
    title: 'ATX Disco Cruise',
    subtitle: 'The Famous Multi-Group Experience',
    price: '$85-$105/person',
    features: [
      '4-hour Lake Travis cruise',
      'Professional DJ spinning hits',
      'Photographer included (free digital photos)',
      '25-foot unicorn float & lily pad mats',
      'BYOB with coolers & ice provided',
      'Cups, koozies, mimosa mixers',
      'On-board disco dance floor',
      '14 disco balls for atmosphere',
      'Meet other celebrating groups',
      'Best for groups of 5-15'
    ]
  },
  private: {
    title: 'Private Charter',
    subtitle: 'Exclusive Experience for Your Squad',
    price: 'Starting at $1,050',
    features: [
      'Entire boat for just your group',
      'Choose your own music via Bluetooth',
      'Flexible scheduling (any available time)',
      'Customize decorations and activities',
      'Captain and crew dedicated to you',
      'Available any day of the week',
      'DJ and photographer add-ons available',
      'Boats for 14-75 guests',
      'Perfect for large groups (30+)',
      'Complete privacy and personalization'
    ]
  }
};

const pricingTiers = [
  { 
    slot: 'Friday 12-4pm', 
    price: '$95', 
    perPerson: true,
    popular: false,
    description: 'Perfect for long weekends'
  },
  { 
    slot: 'Saturday 11am-3pm', 
    price: '$105', 
    perPerson: true,
    popular: true,
    description: 'Most popular time slot!'
  },
  { 
    slot: 'Saturday 3:30-7:30pm', 
    price: '$85', 
    perPerson: true,
    popular: false,
    description: 'Catch the sunset'
  }
];

const planningSteps = [
  {
    step: '1',
    title: 'Reserve Early',
    description: 'Book 2-3 months in advance for peak season (March-August). Secure online checkout makes booking quick and easy.'
  },
  {
    step: '2',
    title: 'Choose Your Experience',
    description: 'ATX Disco Cruise for the famous multi-group party, or Private Charter for exclusive celebrations. We can help recommend the best option for your group.'
  },
  {
    step: '3',
    title: 'Send Invites & Info',
    description: 'Share the itinerary with your squad. Let everyone know to bring swimsuits, sunscreen, and drinks (cans and plastic only).'
  },
  {
    step: '4',
    title: 'Plan the Drinks',
    description: 'We provide coolers with ice. Use Party On Delivery to have alcohol delivered right to the marina or your Airbnb—no errand running needed!'
  },
  {
    step: '5',
    title: 'Arrange Transportation',
    description: 'Safety first! We offer 25% off party bus/van transport. Get picked up from downtown Austin and arrive together as a group.'
  },
  {
    step: '6',
    title: 'Show Up & Party',
    description: 'DJ, photographer, floats, party supplies—everything is ready. You just show up and celebrate the bride-to-be!'
  }
];

const faqs = [
  {
    question: 'What is the ATX Disco Cruise?',
    answer: 'The ATX Disco Cruise is Austin\'s famous shared party cruise exclusively for bachelorette and bachelor groups. Every Friday and Saturday, multiple small groups come together on one big party barge with DJ, photographer, floats, and all party supplies included. It\'s an incredible multi-group celebration where everyone is in party mode!'
  },
  {
    question: 'How much does a bachelorette boat party cost?',
    answer: 'ATX Disco Cruise tickets range from $85-$105 per person depending on time slot: Friday 12-4pm ($95), Saturday 11am-3pm ($105), and Saturday 3:30-7:30pm ($85). This includes DJ, photographer, floats, coolers with ice, and all amenities. Private charters start at $1,050 for a 4-hour cruise on Day Tripper (14 guests).'
  },
  {
    question: 'Should we do ATX Disco Cruise or Private Charter?',
    answer: 'ATX Disco Cruise is perfect for groups of 5-15 who want the big party energy and are social. Private Charter is better for large groups (30+), those who want complete privacy, or if you have specific scheduling needs. Many groups even do both—private cruise one day, Disco Cruise the next!'
  },
  {
    question: 'What\'s included on the ATX Disco Cruise?',
    answer: 'Everything except your beverages! Included: 4-hour Lake Travis cruise, professional DJ, photographer with free digital photos, 25-foot unicorn float, lily pad mats, BYOB with private coolers and ice, cups, koozies, mimosa mixers, disco dance floor, and 14 disco balls. Weather backup plans are also included.'
  },
  {
    question: 'Is alcohol included or do we bring our own?',
    answer: 'Lake Travis is BYOB (Bring Your Own Beverage). We provide coolers with ice and cups. You bring your own alcohol—cans and plastic only, no glass. We partner with Party On Delivery to deliver alcohol right to the marina or your Airbnb for ultimate convenience.'
  },
  {
    question: 'How far in advance should we book?',
    answer: 'We recommend booking 2-3 months in advance for peak season (March through August). Saturday time slots sell out fastest. Early booking ensures you get your preferred date and time.'
  },
  {
    question: 'Where does the boat depart from?',
    answer: 'Boats depart from marinas on Lake Travis, about 30 minutes from downtown Austin. We recommend arranging transportation—we offer 25% off party bus/van service so everyone can arrive and leave together safely.'
  },
  {
    question: 'What should we bring on the boat?',
    answer: 'Bring swimsuits, sunscreen, towels, sunglasses, and your beverages (cans/plastic only, no glass). Optional: matching bachelorette outfits, bride sash, decorations for private charters. We provide everything else including floats, ice, cups, and party supplies.'
  }
];

const internalLinks = [
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Star },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend', label: 'Weekend Must-Haves', icon: Gift },
  { href: '/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience', label: 'Top Party Spots', icon: MapPin },
  { href: '/contact', label: 'Contact Us', icon: Phone }
];

export default function UltimateAustinBacheloretteBoatGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Ultimate Austin Bachelorette Party Boat Guide - Lake Travis Edition | Premier Party Cruises</title>
        <meta name="description" content="Planning an Austin bachelorette party? Make it unforgettable with a Lake Travis party boat! Discover ATX Disco Cruise vs Private Charter, pricing, and everything included for the ultimate celebration." />
        <meta name="keywords" content="Austin bachelorette party boat, Lake Travis bachelorette cruise, ATX Disco Cruise bachelorette, Austin party boat, Lake Travis party cruise, bachelorette party ideas Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/ultimate-austin-bachelorette-party-boat-guide-lake-travis" />
        <meta property="og:title" content="Ultimate Austin Bachelorette Party Boat Guide - Lake Travis Edition" />
        <meta property="og:description" content="The complete guide to planning an unforgettable Austin bachelorette party on Lake Travis. ATX Disco Cruise vs Private Charter, pricing, what's included, and stress-free planning tips." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="ultimate-bachelorette-guide-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Austin bachelorette party group celebrating on Lake Travis party boat with beautiful water views"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-pink-400 text-black font-bold" data-testid="badge-hero">
              <Heart className="h-4 w-4 mr-1 inline" />
              #1 Austin Bachelorette Experience
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              The Ultimate Austin Bachelorette<br />
              <span className="text-pink-300">Party Boat Guide: Lake Travis Edition</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Dancing on deck under the sun, sipping drinks, swimming in clear waters—all while celebrating the 
              bride-to-be. This is why Lake Travis is the ultimate Austin bachelorette destination.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Bachelorette</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-pink-600 font-semibold"
                data-testid="button-disco"
              >
                <Link href="/atx-disco-cruise">Explore ATX Disco Cruise</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 bg-pink-50 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partyStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Lake Travis Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="why-lake-travis-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">WHY LAKE TRAVIS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="why-title">
                Why Choose a Lake Travis Party Boat for Your Bachelorette
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                There are dozens of bachelorette party ideas in Austin, but none are as unique and exciting as a party boat
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyLakeTravis.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-pink-500" data-testid={`why-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="h-7 w-7 text-pink-600" />
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

        {/* Image Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage1}
              alt="Bachelorette party group having fun on Lake Travis party boat with floats and decorations"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-bachelorette"
            />
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
              Bachelorette groups consistently rate Lake Travis boat day as the highlight of their weekend
            </p>
          </div>
        </section>

        {/* ATX Disco vs Private Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900" data-testid="comparison-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-indigo-100 text-indigo-700">CHOOSE YOUR EXPERIENCE</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="comparison-title">
                ATX Disco Cruise vs. Private Charter
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Both are fantastic—which is right for your group?
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* ATX Disco Cruise Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="h-full border-2 border-pink-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-pink-500 text-white px-4 py-1 text-sm font-bold">
                    MOST POPULAR
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-center">
                      <Sparkles className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                      {discoVsPrivate.disco.title}
                    </CardTitle>
                    <p className="text-center text-gray-600">{discoVsPrivate.disco.subtitle}</p>
                    <p className="text-center text-3xl font-bold text-pink-600 mt-2">{discoVsPrivate.disco.price}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {discoVsPrivate.disco.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-6 bg-pink-500 hover:bg-pink-600">
                      <Link href="/atx-disco-cruise">Learn About Disco Cruise</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Private Charter Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="h-full border-2 border-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-center">
                      <Ship className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      {discoVsPrivate.private.title}
                    </CardTitle>
                    <p className="text-center text-gray-600">{discoVsPrivate.private.subtitle}</p>
                    <p className="text-center text-3xl font-bold text-purple-600 mt-2">{discoVsPrivate.private.price}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {discoVsPrivate.private.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-6 bg-purple-500 hover:bg-purple-600">
                      <Link href="/private-cruises">Explore Private Charters</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Chart Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="pricing-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">PRICING</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="pricing-title">
                ATX Disco Cruise Pricing
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All-inclusive per-person pricing includes DJ, photographer, floats, and all amenities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full text-center ${tier.popular ? 'border-2 border-pink-500 relative' : ''}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </div>
                    )}
                    <CardContent className="pt-8">
                      <Clock className="h-10 w-10 text-pink-600 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{tier.slot}</h3>
                      <p className="text-4xl font-bold text-pink-600 mb-2">
                        {tier.price}
                        <span className="text-sm font-normal text-gray-500">/person</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tier.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600">
                <Link href="/book-now">Get Your Custom Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Dancing Image */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage2}
              alt="Bachelorette party dancing on Lake Travis party boat with DJ and disco lights"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-dancing"
            />
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
              Dancing on deck with the Texas Hill Country as your backdrop
            </p>
          </div>
        </section>

        {/* Planning Steps */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="planning-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">PLANNING GUIDE</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="planning-title">
                How to Plan Your Bachelorette Boat Party (Stress-Free!)
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choosing Premier Party Cruises practically eliminates the planning stress
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`step-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                        {item.step}
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

        {/* BYOB & Party On Delivery */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="byob-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-amber-100 text-amber-700">BYOB MADE EASY</Badge>
                <h2 className="text-3xl font-bold mb-6">
                  Plan the Drinks Without the Hassle
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  We provide large coolers with ice—you don't need to buy or lug ice. Bring your own alcohol 
                  (21+ of course): canned seltzers, beer, wine, plus water and Gatorade for hydration.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  To make things even easier, use <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-semibold">Party On Delivery</a>—they 
                  deliver alcohol right to the marina or your Airbnb. No errand running needed!
                </p>
                <ul className="space-y-3">
                  {[
                    'Coolers with ice provided',
                    'Cups and koozies included',
                    'Mimosa mixers ready to go',
                    'Cans and plastic only (no glass)',
                    'Alcohol delivery to marina available'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage3}
                  alt="ATX Disco Cruise party atmosphere with DJ and celebrating guests on Lake Travis"
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Bachelorette Boat Party Questions Answered
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="related-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Bachelorette Resources</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to plan the perfect Austin bachelorette weekend
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer hover:border-pink-500">
                    <CardContent className="pt-4 pb-4 text-center">
                      <link.icon className="h-6 w-6 mx-auto mb-2 text-pink-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Make Her Day Unforgettable
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              A Lake Travis bachelorette party combines the thrill of a nightclub, the relaxation of a pool 
              party, and the bonding of a private getaway—all in one epic experience. The bride deserves nothing less!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-pink-600 hover:bg-pink-50 font-bold text-lg px-8"
              >
                <Link href="/book-now">Start Planning Now</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-pink-600 font-semibold"
              >
                <a href="tel:512-488-5892">Call 512-488-5892</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
