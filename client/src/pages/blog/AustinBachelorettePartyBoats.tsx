import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Anchor, Clock, CheckCircle2, 
  Wine, Sparkles, Heart, ArrowRight, Star,
  Sun, Waves, Music, PartyPopper, Camera,
  MapPin, Calendar, DollarSign, Shield, Award,
  Phone, Package, Truck, Gift, Mountain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/clever-girl-3-bachelorette-boat.jpg';
import sectionImage1 from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage2 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage3 from '@assets/@capitalcityshots-3_1760080740017.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const boatFleet = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    startingPrice: '$200/hr',
    description: 'Perfect Austin bachelorette party boat for intimate bride tribe celebrations',
    features: [
      'Single-deck pontoon with arch canopy',
      'Premium Bluetooth sound system',
      'Giant lily pad float included',
      'Professional captain',
      'BYOB friendly (cans & plastic)',
      'Coolers with ice provided'
    ],
    bestFor: 'Small bridal parties, close friend celebrations',
    icon: Users
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    startingPrice: '$1,200',
    description: 'Popular Austin bachelorette party boat for mid-size bride tribes on Lake Travis',
    features: [
      'Single-deck pontoon with arch canopy',
      'Premium Bluetooth sound system',
      'Multiple float options',
      'Professional captain',
      'BYOB friendly (cans & plastic)',
      'Extended deck space for dancing'
    ],
    bestFor: 'Medium bachelorette parties, combined friend groups',
    icon: PartyPopper
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    startingPrice: '$1,400',
    description: 'Spacious Lake Travis bachelorette party boat for larger celebrations',
    features: [
      'Single-deck pontoon with arch canopy',
      'Premium Bluetooth sound system',
      'Full float collection',
      'Professional captain',
      'BYOB friendly (cans & plastic)',
      'Plenty of room for activities'
    ],
    bestFor: 'Larger bachelorette parties, multi-group celebrations',
    icon: Ship,
    popular: true
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    startingPrice: '$2,200',
    description: 'Flagship Austin bachelorette party boat with 14 disco balls for ultimate celebrations',
    features: [
      'Single-deck pontoon with arch canopy',
      '14 disco balls for party vibes',
      'Premium Bluetooth sound system',
      'Professional captain',
      'Additional crew fee for 51-75 guests',
      'Maximum dance floor space'
    ],
    bestFor: 'Large bachelorette parties, combined bachelor-bachelorette events',
    icon: Sparkles
  }
];

const whyLakeTravis = [
  { icon: Sun, title: 'Perfect Weather', description: 'Austin bachelorette party boats enjoy 300+ days of sunshine annually on Lake Travis' },
  { icon: Waves, title: 'Stunning Scenery', description: 'Lake Travis provides breathtaking Hill Country backdrop for bachelorette party boats' },
  { icon: Camera, title: 'Instagram Gold', description: 'Every moment on Austin bachelorette party boats is photo-worthy' },
  { icon: PartyPopper, title: 'Party Atmosphere', description: 'Lake Travis adventures create unforgettable bachelorette celebrations' },
  { icon: Shield, title: 'Safety First', description: '14+ years perfect safety record on all bachelorette party boats' },
  { icon: Star, title: '5-Star Reviews', description: 'Hundreds of bride tribes rave about our Lake Travis bachelorette adventures' }
];

const whatIncluded = [
  { icon: Anchor, title: 'Professional Captain', description: 'Licensed captain handles your Austin bachelorette party boat so you can party' },
  { icon: Music, title: 'Premium Sound System', description: 'Bluetooth speakers for your bachelorette party playlist on Lake Travis' },
  { icon: Waves, title: 'Floats & Swimming', description: 'Giant lily pad floats and swimming stops included in all Austin bachelorette boats' },
  { icon: Package, title: 'Coolers & Ice', description: 'We provide coolers and ice for your BYOB Lake Travis bachelorette adventure' },
  { icon: Shield, title: 'Safety Equipment', description: 'All required safety gear for worry-free bachelorette party boat celebrations' },
  { icon: Camera, title: 'Photo Ops Galore', description: 'Lake Travis backdrop perfect for bachelorette party boat photos' }
];

const adventureIdeas = [
  { title: 'Sunrise Cruise', description: 'Start your Austin bachelorette party boat adventure with a peaceful morning on Lake Travis', time: '7am-10am' },
  { title: 'Midday Party Cruise', description: 'Prime swimming and sunbathing on your Lake Travis bachelorette party boat', time: '11am-3pm' },
  { title: 'Sunset Celebration', description: 'Most popular Austin bachelorette party boat time with golden hour photos', time: '4pm-7pm' },
  { title: 'ATX Disco Cruise', description: 'Join the legendary Lake Travis disco party with DJ, photographer, and multi-group energy', time: 'Saturdays' }
];

const planningTips = [
  { title: 'Book Early', description: 'Austin bachelorette party boats on Lake Travis book 2-4 weeks in advance, peak season even earlier' },
  { title: 'Coordinate Transportation', description: 'Arrange rides to/from the Lake Travis marina for your bachelorette boat adventure' },
  { title: 'Pack Smart', description: 'Sunscreen, swimsuits, and drinks in cans/plastic for your Austin bachelorette boat' },
  { title: 'Plan the Playlist', description: 'Create a collaborative playlist for your Lake Travis bachelorette party boat cruise' }
];

const companyStats = [
  { stat: '14+', label: 'Years of Bachelorette Adventures' },
  { stat: '125,000+', label: 'Happy Guests on Lake Travis' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What are the best Austin bachelorette party boats on Lake Travis?',
    answer: 'Premier Party Cruises offers four Austin bachelorette party boats on Lake Travis: Day Tripper (14 guests), Meeseeks (25 guests), The Irony (30 guests), and Clever Girl (50-75 guests). All are single-deck pontoons with arch canopy, perfect for Lake Travis bachelorette adventures. The Clever Girl features 14 disco balls for ultimate party vibes.'
  },
  {
    question: 'How much do Austin bachelorette party boats cost on Lake Travis?',
    answer: 'Austin bachelorette party boats on Lake Travis start at $200/hr for the Day Tripper (14 guests, Monday-Thursday) and range up to $2,200+ for the Clever Girl (50-75 guests). Pricing varies based on day of week, time slot, and season. Weekend Lake Travis bachelorette adventures are typically 15-20% higher than weekday rates.'
  },
  {
    question: 'Can we bring alcohol on Austin bachelorette party boats?',
    answer: 'Yes! All Austin bachelorette party boats on Lake Travis are BYOB-friendly. Bring your own beverages in cans and plastic only (no glass for safety). We provide coolers and ice for your Lake Travis bachelorette adventure. Party On Delivery can coordinate beverage delivery to the dock.'
  },
  {
    question: 'What is included in Lake Travis bachelorette party boat rentals?',
    answer: 'Austin bachelorette party boats include: professional captain, premium Bluetooth sound system, giant lily pad floats, coolers with ice, swimming stops, and all safety equipment. Your Lake Travis bachelorette adventure is BYOB - just bring your crew, drinks, and party spirit!'
  },
  {
    question: 'When is the best time for Austin bachelorette party boats?',
    answer: 'Sunset cruises (4pm-7pm) are the most popular for Austin bachelorette party boats, offering golden hour photos on Lake Travis. For swimming and sunbathing, midday cruises work great. The legendary ATX Disco Cruise runs on Saturdays for the ultimate Lake Travis bachelorette adventure.'
  },
  {
    question: 'How far in advance should I book a Lake Travis bachelorette party boat?',
    answer: 'Book Austin bachelorette party boats 2-4 weeks in advance. Peak season (April-October), holiday weekends, and Saturday ATX Disco Cruises often require 4-6 weeks notice. For Lake Travis bachelorette adventures during busy times, booking 2-3 months ahead ensures availability.'
  },
  {
    question: 'What happens if weather cancels our Austin bachelorette boat?',
    answer: 'Safety is our priority for all Lake Travis bachelorette party boats. If weather conditions are unsafe, we offer full rescheduling or refunds for your Austin bachelorette boat adventure. Our team monitors conditions and communicates early about any concerns.'
  },
  {
    question: 'Can we decorate Austin bachelorette party boats?',
    answer: 'Yes! You can bring decorations for your Lake Travis bachelorette party boat adventure. Just avoid anything that could damage the boat or create litter. Many bride tribes bring banners, balloons, and themed accessories for their Austin bachelorette boat celebrations.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/blogs/epic-bachelorette-party-austin-ultimate-guide', label: 'Austin Bachelorette Guide', icon: MapPin },
  { href: '/blogs/instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination', label: 'Instagram Cocktails', icon: Camera },
  { href: '/blogs/lake-travis-bachelorette-alcohol-laws', label: 'Lake Travis Alcohol Laws', icon: Wine }
];

export default function AustinBachelorettePartyBoats() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Austin Bachelorette Party Boats: Lake Travis Adventures for Unforgettable Celebrations | Premier Party Cruises</title>
        <meta name="description" content="Plan unforgettable Austin bachelorette party boats on Lake Travis. Compare boats for 14-75 guests, pricing from $200/hr, and adventure options. Lake Travis bachelorette adventures with 14+ years experience and 5-star reviews." />
        <meta name="keywords" content="Austin bachelorette party boats, Lake Travis bachelorette, bachelorette party boats Austin, Lake Travis adventures, Austin bachelorette boat, bachelorette boat Lake Travis, Austin party boats, Lake Travis boat party, bachelorette celebration Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations" />
        <meta property="og:title" content="Austin Bachelorette Party Boats: Lake Travis Adventures for Unforgettable Celebrations" />
        <meta property="og:description" content="Plan unforgettable Austin bachelorette party boats on Lake Travis. Compare boats, pricing, and adventure options for your bride tribe celebration." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/clever-girl-3-bachelorette-boat.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="austin-bachelorette-party-boats-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage 
            src={heroImage}
            alt="Austin bachelorette party boats on Lake Travis with bride tribe celebrating"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-pink-400 text-black font-bold" data-testid="badge-hero">
              Lake Travis Bachelorette Adventures
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Austin Bachelorette Party Boats<br />
              <span className="text-pink-300">Lake Travis Adventures for Unforgettable Celebrations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Discover the ultimate Austin bachelorette party boats on Lake Travis. From intimate gatherings to 
              epic celebrations, find the perfect Lake Travis adventure for your bride tribe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/quote">Plan Your Adventure</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-pink-900 font-semibold"
                data-testid="button-view-fleet"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 bg-pink-50 dark:bg-gray-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {companyStats.map((item, index) => (
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
                  <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="intro-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why Austin Bachelorette Party Boats on Lake Travis?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                When it comes to <strong>Austin bachelorette party boats</strong>, nothing compares to a 
                <strong> Lake Travis adventure</strong>. The stunning Hill Country backdrop, crystal-clear waters, 
                and perfect party atmosphere make <strong>Lake Travis bachelorette</strong> celebrations legendary.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Premier Party Cruises has been hosting <strong>Austin bachelorette party boats</strong> for over 
                14 years, with 125,000+ happy guests and a perfect safety record. Our <strong>Lake Travis adventures</strong> 
                are designed specifically for unforgettable <strong>bachelorette celebrations</strong>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Lake Travis */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="why-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-200 text-pink-800">Why Lake Travis</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Lake Travis for Austin Bachelorette Party Boats
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Lake Travis provides the perfect setting for <strong>Austin bachelorette party boats</strong> and 
                unforgettable <strong>Lake Travis adventures</strong>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyLakeTravis.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-pink-200 dark:border-pink-800">
                    <CardContent className="p-6">
                      <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Fleet */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-200 text-blue-800">Our Fleet</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Austin Bachelorette Party Boats for Every Group Size
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose from four <strong>Austin bachelorette party boats</strong> for your <strong>Lake Travis adventure</strong>. 
                All boats are single-deck pontoons with arch canopy.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {boatFleet.map((boat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full hover:shadow-xl transition-shadow ${boat.popular ? 'border-2 border-pink-500' : ''}`}>
                    {boat.popular && (
                      <div className="bg-pink-500 text-white text-center py-2 font-bold text-sm">
                        MOST POPULAR FOR BACHELORETTES
                      </div>
                    )}
                    <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <boat.icon className="h-8 w-8 text-pink-600" />
                          <div>
                            <CardTitle className="text-xl">{boat.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{boat.capacity}</Badge>
                              <span className="text-pink-600 font-semibold">From {boat.startingPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{boat.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Included Features:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {boat.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
                        <p className="text-sm text-pink-700 dark:text-pink-400">
                          <strong>Best for:</strong> {boat.bestFor}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800" data-testid="included-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-blue-200 text-blue-800">What's Included</Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Everything for Your Lake Travis Adventure
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Every <strong>Austin bachelorette party boat</strong> includes everything you need for an 
                  unforgettable <strong>Lake Travis adventure</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatIncluded.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage1}
                  alt="Austin bachelorette party boats features on Lake Travis adventure"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Adventure Options */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="adventures-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-200 text-purple-800">Adventure Options</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Lake Travis Bachelorette Adventure Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose your perfect <strong>Austin bachelorette party boat</strong> timing for the ultimate 
                <strong> Lake Travis adventure</strong>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adventureIdeas.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow text-center">
                    <CardContent className="p-6">
                      <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-7 w-7 text-purple-600" />
                      </div>
                      <Badge className="mb-3" variant="outline">{idea.time}</Badge>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{idea.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{idea.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Tips */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage2}
                  alt="Planning tips for Austin bachelorette party boats on Lake Travis"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-pink-200 text-pink-800">Planning Tips</Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Tips for Your Austin Bachelorette Boat Adventure
                </h2>
                <div className="space-y-4">
                  {planningTips.map((tip, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                    </div>
                  ))}
                </div>
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
              <Badge className="mb-4 bg-gray-200 text-gray-800">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Austin bachelorette party boats and Lake Travis adventures.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg px-6"
                  data-testid={`accordion-item-${index}`}
                >
                  <AccordionTrigger 
                    className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline"
                    data-testid={`accordion-trigger-${index}`}
                  >
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

        {/* Internal Links Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                More Bachelorette Party Resources
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Continue planning your Austin bachelorette party boat adventure on Lake Travis.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {internalLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-3 h-auto py-4 text-left hover:bg-pink-50 dark:hover:bg-pink-900/20 border-gray-200 dark:border-gray-700"
                      data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <link.icon className="h-5 w-5 text-pink-600" />
                      <span>{link.label}</span>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
