import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Sun, Users, Heart, Phone, Clock, CheckCircle2, 
  Camera, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Ship, Sparkles, Moon,
  Wine, Music, Gift, Sunset, PartyPopper, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-33_1760080807868.jpg';
import sectionImage1 from '@assets/@capitalcityshots-34_1760080807868.jpg';
import sectionImage2 from '@assets/@capitalcityshots-35_1760080807868.jpg';

const cruiseStats = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const sunsetCruiseTypes = [
  {
    icon: Heart,
    title: 'Romantic Sunset Cruise Austin',
    description: 'Perfect for couples celebrating anniversaries, proposals, or date nights on a Lake Travis sunset boat ride',
    capacity: '2-14 guests on Day Tripper',
    features: ['Intimate setting', 'Golden hour timing', 'Optional champagne coordination'],
    best: 'Proposals, anniversaries, date nights'
  },
  {
    icon: Crown,
    title: 'Celebration Sunset Cruises',
    description: 'Birthday parties, promotions, and milestone celebrations with evening cruise Lake Travis views',
    capacity: '15-30 guests on Meeseeks/The Irony',
    features: ['Group celebration space', 'Premium sound system', 'Stunning photo backdrop'],
    best: 'Birthdays, milestones, graduations'
  },
  {
    icon: PartyPopper,
    title: 'Bachelor/Bachelorette Sunset Parties',
    description: 'The most popular Lake Travis sunset boat ride option - celebrate before the big day!',
    capacity: '25-75 guests on our fleet',
    features: ['Party atmosphere', 'Disco balls on Clever Girl', 'Transitions to evening cruise'],
    best: 'Bach parties, wedding groups'
  },
  {
    icon: Building2,
    title: 'Corporate Sunset Events',
    description: 'Impress clients and reward teams with a sunset cruise Austin networking experience',
    capacity: '25-75 guests',
    features: ['Professional atmosphere', 'Catering coordination', 'Team bonding setting'],
    best: 'Client entertainment, team building'
  }
];

const whySunset = [
  {
    icon: Camera,
    title: 'Incredible Photo Opportunities',
    description: 'Lake Travis sunset boat ride provides stunning golden hour lighting for unforgettable photos'
  },
  {
    icon: Sun,
    title: 'Perfect Temperature',
    description: 'Evening cruise Lake Travis timing means cooler temperatures as the sun sets'
  },
  {
    icon: Waves,
    title: 'Calmer Waters',
    description: 'Lake Travis sunset cruises often enjoy calmer conditions as daytime boat traffic decreases'
  },
  {
    icon: Sparkles,
    title: 'Magical Atmosphere',
    description: 'The romantic boat cruise Austin vibe as the sky transforms creates unforgettable moments'
  },
  {
    icon: Moon,
    title: 'Day-to-Night Experience',
    description: 'Sunset cruise Austin parties can transition into evening celebrations under the stars'
  },
  {
    icon: Wine,
    title: 'Perfect for BYOB',
    description: 'Evening cruise Lake Travis timing is ideal for cocktail hour and toasting'
  }
];

const sunsetTiming = [
  { season: 'Spring (Mar-May)', sunset: '7:30-8:15 PM', departure: '5:30-6:15 PM', notes: 'Perfect weather for Lake Travis sunset boat ride' },
  { season: 'Summer (Jun-Aug)', sunset: '8:00-8:30 PM', departure: '6:00-6:30 PM', notes: 'Longest evening cruise Lake Travis options' },
  { season: 'Fall (Sep-Nov)', sunset: '6:30-7:30 PM', departure: '4:30-5:30 PM', notes: 'Beautiful fall colors for sunset cruises Austin' },
  { season: 'Winter (Dec-Feb)', sunset: '5:30-6:30 PM', departure: '3:30-4:30 PM', notes: 'Cozy romantic boat cruise Austin vibes' }
];

const romanticOptions = [
  { name: 'Proposal Package', description: 'We help plan the perfect Lake Travis sunset boat ride proposal moment' },
  { name: 'Anniversary Celebration', description: 'Romantic boat cruise Austin to celebrate years of love' },
  { name: 'Honeymoon Cruise', description: 'Start your marriage with an evening cruise Lake Travis experience' },
  { name: 'Valentine\'s Sunset', description: 'Special sunset cruises Austin for the most romantic day' }
];

const fleetForSunset = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    sunsetBest: 'Intimate romantic boat cruise Austin for couples and small groups',
    features: ['Single-deck pontoon', 'Arch canopy', 'Perfect for proposals']
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    sunsetBest: 'Mid-size Lake Travis sunset boat ride celebrations',
    features: ['Single-deck pontoon', 'Arch canopy', 'Great for birthday parties']
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    sunsetBest: 'Popular sunset cruises Austin for larger celebrations',
    features: ['Single-deck pontoon', 'Arch canopy', 'Versatile event space']
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    sunsetBest: 'Flagship evening cruise Lake Travis with 14 disco balls (add\'l crew fee for 51-75)',
    features: ['Single-deck pontoon', 'Arch canopy', 'Ultimate party atmosphere']
  }
];

const faqs = [
  {
    question: 'When is the best time for Lake Travis sunset cruises?',
    answer: 'Lake Travis sunset boat ride timing varies by season. Summer offers the longest evening cruise Lake Travis options with sunsets around 8:00-8:30 PM. We recommend departing 2 hours before sunset for the full sunset cruises Austin experience - swimming, cruising, then watching the sunset.'
  },
  {
    question: 'Are sunset cruises good for proposals?',
    answer: 'Absolutely! Lake Travis sunset boat ride proposals are incredibly popular. The romantic boat cruise Austin setting with golden hour lighting creates the perfect moment. Our captains are experienced with helping plan proposals - just let us know and we\'ll help make it special.'
  },
  {
    question: 'What makes evening cruises special compared to daytime?',
    answer: 'Evening cruise Lake Travis experiences offer cooler temperatures, calmer waters, stunning sunset views, and a magical transition from day to night. The sunset cruises Austin atmosphere is perfect for romantic occasions, celebrations, and creating memorable photos.'
  },
  {
    question: 'Can we continue partying after sunset?',
    answer: 'Yes! Your Lake Travis sunset boat ride can continue into the evening. All our boats have navigation lights for safe night cruising. The sunset cruise Austin experience often becomes even more festive as stars appear - especially with the Clever Girl\'s disco balls!'
  },
  {
    question: 'What should we bring for a sunset cruise?',
    answer: 'For your romantic boat cruise Austin or celebration cruise: a light jacket (temperatures drop after sunset), your BYOB beverages in cans/plastic, camera for golden hour photos, and any decorations for special occasions. We provide coolers and ice for your evening cruise Lake Travis.'
  },
  {
    question: 'How far in advance should we book sunset cruises?',
    answer: 'Lake Travis sunset boat ride times are our most popular slots. We recommend booking 2-3 weeks ahead, especially for weekends during peak season. Sunset cruises Austin during holiday weekends may require 4-6 weeks advance booking.'
  },
  {
    question: 'Do you offer special packages for romantic occasions?',
    answer: 'Yes! We help coordinate romantic boat cruise Austin experiences including proposals, anniversaries, and honeymoon cruises. We can suggest timing, help with setup like rose petals, and coordinate with catering partners for champagne and appetizers for your Lake Travis sunset boat ride.'
  },
  {
    question: 'What if weather threatens our sunset cruise?',
    answer: 'Safety is our priority for all evening cruise Lake Travis departures. If conditions are unsafe, we offer full rescheduling or refunds. We monitor weather closely and communicate early if there are concerns about your sunset cruises Austin booking.'
  }
];

const internalLinks = [
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get a Quote', icon: Star }
];

export default function LakeTravisSunsetCruises() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion"
        defaultTitle="Lake Travis Sunset Cruises - Romantic & Celebration Options for Every Occasion | Premier Party Cruises"
        defaultDescription="Experience magical Lake Travis sunset cruises for romantic occasions and celebrations. Sunset cruise Austin options, romantic boat cruise Austin experiences, and evening cruise Lake Travis departures. Lake Travis sunset boat ride for proposals, anniversaries, and parties."
        defaultKeywords={['Lake Travis sunset cruises', 'sunset cruise Austin', 'romantic boat cruise Austin', 'Lake Travis sunset boat ride', 'evening cruise Lake Travis', 'sunset party boat Austin', 'romantic Lake Travis cruise']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-sunset-cruises-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-orange-600 via-rose-600 to-purple-800 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis sunset cruises - romantic boat cruise Austin with stunning golden hour colors over the lake"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-orange-400 text-black font-bold" data-testid="badge-hero">
              <Sun className="h-4 w-4 mr-1 inline" />
              Golden Hour Magic
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Sunset Cruises<br />
              <span className="text-orange-300">Romantic & Celebration Options</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Experience the magic of a sunset cruise Austin with breathtaking views. Perfect for romantic boat cruise Austin experiences, proposals, anniversaries, and celebrations. Our Lake Travis sunset boat ride departures offer unforgettable evening cruise Lake Travis memories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Book Your Sunset Cruise</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-900 font-semibold"
                data-testid="button-view-fleet"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
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


        {/* Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {cruiseStats.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sunset Cruise Types */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="cruise-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700">CRUISE OPTIONS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="types-title">
                Lake Travis Sunset Cruises for Every Occasion
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Find the perfect sunset cruise Austin experience for your celebration
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {sunsetCruiseTypes.map((type, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-orange-500" data-testid={`type-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <type.icon className="h-7 w-7 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-2">{type.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{type.description}</p>
                          <p className="text-sm text-orange-600 font-medium mb-3">{type.capacity}</p>
                          <ul className="space-y-1 mb-3">
                            {type.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">Best for: {type.best}</Badge>
                        </div>
                      </div>
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
              alt="Romantic boat cruise Austin - couple enjoying Lake Travis sunset boat ride with golden hour lighting"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-sunset"
            />
          </div>
        </section>

        {/* Why Sunset */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900" data-testid="why-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-rose-100 text-rose-700">WHY SUNSET</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="why-title">
                Why Choose a Lake Travis Sunset Boat Ride
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                What makes evening cruise Lake Travis departures so special
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whySunset.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`why-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-6 w-6 text-rose-600" />
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

        {/* Sunset Timing */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="timing-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">TIMING GUIDE</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="timing-title">
                Sunset Cruises Austin Timing by Season
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Plan your Lake Travis sunset cruises with optimal departure times
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sunsetTiming.map((time, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`timing-card-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{time.season}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Sunset: {time.sunset}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Depart: {time.departure}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{time.notes}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Romantic Options */}
        <section className="py-16 bg-rose-50 dark:bg-rose-900/20" data-testid="romantic-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-rose-100 text-rose-700">ROMANTIC OPTIONS</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="romantic-title">
                  Romantic Boat Cruise Austin Experiences
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Create unforgettable romantic moments on Lake Travis sunset cruises:
                </p>
                <div className="space-y-4">
                  {romanticOptions.map((option, index) => (
                    <div key={index} className="border-l-4 border-rose-500 pl-4" data-testid={`romantic-option-${index}`}>
                      <h4 className="font-bold">{option.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                  ))}
                </div>
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Evening cruise Lake Travis - romantic sunset cruises Austin with couple watching golden sunset"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-romantic"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Fleet for Sunset */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">OUR FLEET</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="fleet-title">
                Boats for Your Lake Travis Sunset Boat Ride
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All single-deck pontoons with arch canopy for sunset cruises Austin
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fleetForSunset.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-blue-500" data-testid={`fleet-card-${index}`}>
                    <CardHeader>
                      <Ship className="h-8 w-8 text-blue-600 mb-2" />
                      <CardTitle>{boat.name}</CardTitle>
                      <p className="text-sm text-gray-500">{boat.capacity}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{boat.sunsetBest}</p>
                      <ul className="space-y-1">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                            <CheckCircle2 className="h-3 w-3 text-blue-500" />
                            {feature}
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
              <Badge className="mb-4 bg-orange-100 text-orange-700">SUNSET FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">
                Questions About Sunset Cruises
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Lake Travis sunset cruises and evening departures
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
                Discover more Lake Travis sunset boat ride options
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-orange-500" data-testid={`link-card-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <link.icon className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-orange-600 to-rose-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Sun className="h-16 w-16 mx-auto mb-6 text-orange-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Catch the Perfect Sunset
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Book your Lake Travis sunset cruises today. Whether it's a romantic boat cruise Austin for two or a celebration with friends, our sunset cruise Austin experiences create memories that last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-orange-700 hover:bg-gray-100 font-bold text-lg px-8"
                  data-testid="button-cta-quote"
                >
                  <Link href="/book-now">Book Your Sunset Cruise</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-orange-700 font-semibold"
                  data-testid="button-cta-call"
                >
                  <a href="tel:5124885892">
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
