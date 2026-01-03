import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Package, Phone, Clock, CheckCircle2, 
  Gift, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Utensils, Wine, Sparkles,
  DollarSign, ClipboardCheck, PartyPopper, Anchor,
  Music, Sun, Camera, Heart, Zap, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-9_1760080740019.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const boatPackages = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    price: 'Starting at $900',
    duration: '3-4 hours',
    description: 'Perfect intimate Lake Travis boat party package for small groups, birthdays, and close friend celebrations',
    features: [
      'Single-deck pontoon with arch canopy',
      'Premium Bluetooth sound system',
      'Giant lily pad float included',
      'Professional captain',
      'BYOB friendly (cans & plastic)',
      'Coolers with ice provided'
    ],
    best: 'Intimate gatherings, small bachelor/bachelorette groups',
    icon: Users,
    color: 'border-blue-500',
    headerBg: 'bg-blue-500'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    price: 'Starting at $1,200',
    duration: '3-4 hours',
    description: 'Mid-size Lake Travis party boat packages for department outings and medium celebrations',
    features: [
      'Single-deck pontoon with arch canopy',
      'Premium Bluetooth sound system',
      'Multiple float options',
      'Professional captain',
      'BYOB friendly (cans & plastic)',
      'Extended deck space for mingling'
    ],
    best: 'Bachelor/bachelorette parties, team outings',
    icon: PartyPopper,
    color: 'border-green-500',
    headerBg: 'bg-green-500'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    price: 'Starting at $1,400',
    duration: '3-4 hours',
    description: 'Popular party boat Lake Travis option for larger friend groups and corporate events',
    features: [
      'Single-deck pontoon with arch canopy',
      'Premium Bluetooth sound system',
      'Full float collection',
      'Professional captain',
      'BYOB friendly (cans & plastic)',
      'Spacious layout for groups'
    ],
    best: 'Larger celebrations, corporate team building',
    icon: Ship,
    color: 'border-amber-500',
    headerBg: 'bg-amber-500',
    popular: true
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    price: 'Starting at $2,200',
    duration: '3-5 hours',
    description: 'Our flagship Lake Travis boat party package for large celebrations with 14 disco balls',
    features: [
      'Single-deck pontoon with arch canopy',
      '14 disco balls for ultimate party vibes',
      'Premium Bluetooth sound system',
      'Professional captain (add\'l crew fee for 51-75)',
      'BYOB friendly (cans & plastic)',
      'Maximum dance floor space'
    ],
    best: 'Large bachelor/bachelorette parties, company events, milestone celebrations',
    icon: Sparkles,
    color: 'border-purple-500',
    headerBg: 'bg-purple-500'
  }
];

const pricingFactors = [
  { icon: Calendar, title: 'Day of Week', description: 'Weekend Lake Travis boat party packages typically cost 15-20% more than weekday options' },
  { icon: Clock, title: 'Time Slot', description: 'Sunset cruises are most popular for party boat Austin experiences' },
  { icon: Users, title: 'Group Size', description: 'Larger boats accommodate more guests for your Lake Travis party boat packages' },
  { icon: Sun, title: 'Season', description: 'Peak season (April-October) sees highest demand for party boat Lake Travis rentals' }
];

const whatIncluded = [
  { icon: Anchor, title: 'Professional Captain', description: 'Licensed captain handles navigation so you enjoy your Lake Travis boat party package' },
  { icon: Music, title: 'Premium Sound System', description: 'Bluetooth speakers for your party playlist on every party boat Austin cruise' },
  { icon: Waves, title: 'Swimming & Floats', description: 'Giant lily pad floats and swimming stops included in Lake Travis party boat packages' },
  { icon: Package, title: 'Coolers & Ice', description: 'We provide coolers and ice for your BYOB Lake Travis boat party package' },
  { icon: Shield, title: 'Safety Equipment', description: 'All required safety gear and 14+ years of perfect safety record' },
  { icon: Camera, title: 'Photo Opportunities', description: 'Stunning Lake Travis backdrops for unforgettable party photos' }
];

const addOnOptions = [
  { name: 'Party On Delivery', description: 'Beverages delivered to dock, iced and ready for your Lake Travis boat party package', price: 'Varies by selection' },
  { name: 'Catering Coordination', description: 'We connect you with local caterers for your party boat Austin celebration', price: 'Free coordination' },
  { name: 'Extended Cruise Time', description: 'Add extra hours to your Lake Travis party boat packages', price: '$200-400/hour' },
  { name: 'Photography Package', description: 'Professional photos of your party boat Lake Travis experience', price: 'Starting at $300' }
];

const eventTypes = [
  { icon: Heart, title: 'Bachelor & Bachelorette Parties', description: 'The most popular use for our Lake Travis boat party packages - celebrate before the big day!' },
  { icon: Building2, title: 'Corporate Events', description: 'Team building and client entertainment with party boat Austin experiences' },
  { icon: Gift, title: 'Birthday Celebrations', description: 'Milestone birthdays deserve a Lake Travis party boat packages celebration' },
  { icon: Star, title: 'Special Occasions', description: 'Anniversaries, graduations, and reunions on party boat Lake Travis' }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What are the pricing options for Lake Travis boat party packages?',
    answer: 'Lake Travis boat party packages start at $900 for our Day Tripper (14 guests) and range up to $2,200+ for our flagship Clever Girl (50-75 guests). Pricing varies based on day of week, time slot, and season. Weekend Lake Travis party boat packages are typically 15-20% higher than weekday rates. Contact us for a custom quote for your specific party boat Austin needs.'
  },
  {
    question: 'What is included in a Lake Travis party boat package?',
    answer: 'All Lake Travis party boat packages include: private boat charter, professional captain, premium Bluetooth sound system, giant lily pad floats, coolers with ice, and swimming stops. Our party boat Lake Travis rentals are BYOB friendly (cans and plastic only). Every party boat Austin experience includes our 14+ years of expertise and perfect safety record.'
  },
  {
    question: 'How do I choose the right party boat Austin size for my group?',
    answer: 'Choose your Lake Travis boat party package based on group size: Day Tripper (up to 14), Meeseeks (up to 25), The Irony (up to 30), or Clever Girl (50-75 guests with additional crew fee for groups over 50). For bachelor and bachelorette parties, we typically recommend slightly larger capacity for comfort on your party boat Lake Travis celebration.'
  },
  {
    question: 'Can we bring our own food and alcohol on Lake Travis party boat packages?',
    answer: 'Yes! All Lake Travis party boat packages are BYOB - bring your own beverages in cans and plastic only (no glass). You can bring your own food or we can connect you with catering partners. Many guests use Party On Delivery for convenient beverage delivery to the dock for their party boat Austin experience.'
  },
  {
    question: 'What time slots are available for party boat Lake Travis rentals?',
    answer: 'We offer multiple time slots for Lake Travis party boat packages: morning cruises (great for corporate events), afternoon parties (perfect for swimming), and sunset cruises (our most popular for bachelor/bachelorette parties). Party boat Austin availability varies by season, with peak times booking 2-4 weeks in advance.'
  },
  {
    question: 'How far in advance should I book a Lake Travis boat party package?',
    answer: 'For Lake Travis party boat packages, we recommend booking 2-4 weeks in advance. Popular dates for party boat Lake Travis rentals (weekends during April-October, holiday weekends) may require 4-6 weeks notice. Bachelor and bachelorette parties often book 2-3 months ahead for the best party boat Austin availability.'
  },
  {
    question: 'What happens if weather cancels my party boat Austin reservation?',
    answer: 'Safety is our priority. If weather conditions make your Lake Travis party boat packages cruise unsafe, we offer full rescheduling or refunds. Our team monitors conditions closely and communicates early if there are concerns about your party boat Lake Travis booking.'
  },
  {
    question: 'Do you offer discounts on Lake Travis party boat packages?',
    answer: 'Yes! We offer weekday discounts on Lake Travis party boat packages, and companies booking multiple events receive preferred pricing. Military and first responder discounts are also available. Contact us about group rates for your party boat Austin celebration.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Party Cruises', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/pricing-breakdown', label: 'Detailed Pricing', icon: DollarSign }
];

export default function LakeTravisBoatPartyPackages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Boat Party Packages - Complete Guide to Options & Pricing | Premier Party Cruises</title>
        <meta name="description" content="Explore Lake Travis boat party packages from $900-$2,200+. Compare party boat Austin options for 14-75 guests. Complete guide to Lake Travis party boat packages with pricing, inclusions, and booking tips. Party boat Lake Travis experts since 2010." />
        <meta name="keywords" content="Lake Travis boat party packages, party boat Austin, Lake Travis party boat packages, party boat Lake Travis, boat party Austin, Lake Travis boat rental party, Austin party boat rental, Lake Travis boat party pricing" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing" />
        <meta property="og:title" content="Lake Travis Boat Party Packages - Complete Guide to Options & Pricing" />
        <meta property="og:description" content="Compare Lake Travis boat party packages from 14 to 75 guests. Party boat Austin pricing, inclusions, and booking guide from Lake Travis experts." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-packages-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-cyan-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party packages - party boats on the water at sunset"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Complete Guide to Lake Travis Boat Party Packages
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Packages<br />
              <span className="text-amber-400">Options, Pricing & Everything You Need</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Your complete guide to party boat Austin rentals. Compare Lake Travis party boat packages from 14 to 75 guests. Find the perfect party boat Lake Travis experience for bachelor parties, bachelorettes, corporate events, and celebrations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/quote">Get Your Custom Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Why Premier Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Packages Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="packages-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Lake Travis Boat Party Packages Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose from four party boat Austin options. Each Lake Travis party boat package includes professional captain, sound system, floats, and everything you need for an unforgettable celebration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {boatPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full border-2 ${pkg.color} overflow-hidden relative`} data-testid={`package-card-${index}`}>
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-amber-500 text-black font-bold">Most Popular</Badge>
                      </div>
                    )}
                    <div className={`${pkg.headerBg} text-white p-6`}>
                      <div className="flex items-center gap-3 mb-2">
                        <pkg.icon className="h-8 w-8" />
                        <h3 className="text-2xl font-bold">{pkg.name}</h3>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{pkg.price}</span>
                        <span className="text-white/80">| {pkg.capacity}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{pkg.description}</p>
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-500">Duration: {pkg.duration}</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Best for: </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{pkg.best}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-compare-packages"
              >
                <Link href="/pricing-breakdown">
                  View Detailed Pricing Breakdown <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900" data-testid="included-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What's Included in Every Party Boat Austin Package
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every Lake Travis boat party package comes loaded with amenities. No hidden fees, no surprises - just pure party boat Lake Travis fun.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatIncluded.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`included-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
                          <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Break with CTA */}
        <section className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${sectionImage1})` }} data-testid="cta-image-section">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Lake Travis Boat Party Package?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join over 125,000 happy guests who have celebrated with Premier Party Cruises. Get a custom quote for your party boat Austin adventure today.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              data-testid="button-book-now"
            >
              <Link href="/quote">Get Your Free Quote</Link>
            </Button>
          </div>
        </section>

        {/* Pricing Factors */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="pricing-factors-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Affects Lake Travis Party Boat Package Pricing?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Understanding pricing factors helps you get the best value on your party boat Lake Travis rental.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingFactors.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`pricing-factor-${index}`}>
                    <CardContent className="p-6">
                      <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900" data-testid="event-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Popular Events for Lake Travis Boat Party Packages
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Our party boat Austin fleet hosts every type of celebration. Whether you're planning a bachelor party, bachelorette bash, corporate event, or birthday celebration, we have the perfect Lake Travis party boat packages for your needs.
                </p>
                <div className="space-y-4">
                  {eventTypes.map((item, index) => (
                    <div key={index} className="flex items-start gap-4" data-testid={`event-type-${index}`}>
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
                        <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img 
                  src={sectionImage2} 
                  alt="Lake Travis boat party packages - groups celebrating on party boat Austin" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Add-On Options */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="addons-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Enhance Your Party Boat Lake Travis Experience
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Add these popular upgrades to your Lake Travis boat party packages for an even more memorable celebration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {addOnOptions.map((addon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`addon-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{addon.name}</h3>
                        <Badge variant="outline" className="text-blue-600 border-blue-600">{addon.price}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{addon.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection 
          title="Get Your Lake Travis Boat Party Package Quote"
          subtitle="Answer a few questions and we'll send you a custom quote for your party boat Austin experience"
          source="blog-lake-travis-boat-party-packages"
        />

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions About Lake Travis Boat Party Packages
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about party boat Austin rentals and Lake Travis party boat packages.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border rounded-lg px-6 bg-slate-50 dark:bg-slate-900"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-slate-100 dark:bg-slate-900" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Explore More Party Boat Austin Options
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" data-testid={`internal-link-${index}`}>
                    <CardContent className="p-4 text-center">
                      <link.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-cyan-800 text-white" data-testid="final-cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Book Your Lake Travis Boat Party Package Today
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of happy guests who have celebrated with the best party boat Austin experience on Lake Travis. Get your free quote now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                data-testid="button-final-quote"
              >
                <Link href="/quote">Get Your Free Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900"
                data-testid="button-contact"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" /> Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
