import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Package, Phone, Clock, CheckCircle2, 
  Thermometer, Droplets, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Wine, Sparkles, Sun, Beer,
  Anchor, Music, Camera, Heart, Shield, PartyPopper,
  Umbrella, Snowflake, AlertCircle, Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BlogImageBreak, BlogPhotoStrip, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';

import heroImage from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage1 from '@assets/@capitalcityshots-11_1760080740019.jpg';
import sectionImage2 from '@assets/@capitalcityshots-12_1760080740019.jpg';

const summerTips = [
  {
    icon: Snowflake,
    title: 'Pre-Chill Everything',
    description: 'For Austin pool party alcohol coordination, pre-chill all beverages 24 hours in advance. Warm drinks in Austin heat can ruin your summer event planning efforts.'
  },
  {
    icon: Thermometer,
    title: 'Ice Calculation',
    description: 'Austin summer event planning requires 2-3 lbs of ice per person. For pool party alcohol coordination in 100°F heat, double your ice estimate.'
  },
  {
    icon: Umbrella,
    title: 'Shaded Drink Stations',
    description: 'Pool party alcohol coordination means setting up coolers in shade. Direct Austin sun can make beverages undrinkable within 30 minutes.'
  },
  {
    icon: Droplets,
    title: 'Hydration Balance',
    description: 'Professional summer event planning includes 1:1 water-to-alcohol ratio. Austin heat means guests need more hydration than typical pool parties.'
  }
];

const alcoholCalculations = [
  { guests: '14 guests (Day Tripper)', beer: '48-72 cans', wine: '4-6 bottles', liquor: '2 bottles', mixers: '4L each', ice: '40+ lbs' },
  { guests: '25 guests (Meeseeks)', beer: '75-100 cans', wine: '8-10 bottles', liquor: '3-4 bottles', mixers: '6L each', ice: '75+ lbs' },
  { guests: '30 guests (The Irony)', beer: '90-120 cans', wine: '10-12 bottles', liquor: '4-5 bottles', mixers: '8L each', ice: '90+ lbs' },
  { guests: '50-75 guests (Clever Girl)', beer: '150-225 cans', wine: '15-25 bottles', liquor: '6-10 bottles', mixers: '12-18L each', ice: '150+ lbs' }
];

const boatFleet = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    description: 'Single-deck pontoon with arch canopy - perfect for intimate pool party alcohol coordination needs',
    best: 'Smaller bachelor/bachelorette groups, birthday celebrations'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    description: 'Single-deck pontoon with arch canopy - ideal mid-size summer event planning option',
    best: 'Medium groups, team outings, friend celebrations'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    description: 'Single-deck pontoon with arch canopy - popular choice for larger summer event planning',
    best: 'Larger parties, corporate events'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    description: 'Single-deck pontoon with arch canopy, additional crew fee for 51-75 guests',
    best: 'Large celebrations, company parties, milestone events'
  }
];

const coordinationChecklist = [
  { icon: Calendar, title: 'Book 2-4 Weeks Ahead', description: 'Pool party alcohol coordination in Austin summer requires advance planning for boat availability' },
  { icon: Truck, title: 'Party On Delivery', description: 'Use Party On Delivery for dock-delivered beverages - essential for summer event planning efficiency' },
  { icon: Package, title: 'BYOB Rules', description: 'All boats are BYOB (cans and plastic only). Pool party alcohol coordination must follow these guidelines' },
  { icon: Snowflake, title: 'Cooler Strategy', description: 'We provide coolers and ice - your summer event planning should focus on beverage selection' }
];

const faqs = [
  {
    question: 'How much alcohol should I bring for a Lake Travis pool party in Austin heat?',
    answer: 'For pool party alcohol coordination in Austin summer heat, plan for 3-4 drinks per person for a 3-4 hour cruise. The heat increases consumption, so summer event planning should account for 20% more beverages than normal. For a 25-person party on the Meeseeks, bring 75-100 beers, 8-10 wine bottles, and 3-4 liquor bottles with plenty of mixers.'
  },
  {
    question: 'What types of alcohol work best for Austin summer pool parties?',
    answer: 'Pool party alcohol coordination experts recommend light beers, hard seltzers, and pre-mixed cocktails for Austin heat. Heavy wines and dark liquors are less appealing in 100°F weather. Summer event planning should prioritize refreshing options like rosé, light lagers, vodka sodas, and ranch water.'
  },
  {
    question: 'How do I keep drinks cold on a Lake Travis boat party?',
    answer: 'We provide coolers and ice for your pool party alcohol coordination needs. For Austin summer event planning, pre-chill all beverages 24 hours before, bring extra ice (we provide a base amount), and use Party On Delivery for already-chilled beverages delivered to the dock. Keep coolers in shade under the arch canopy.'
  },
  {
    question: 'Can I have alcohol delivered to the boat dock for my party?',
    answer: 'Yes! Party On Delivery is the ultimate pool party alcohol coordination service. They deliver your selected beverages pre-chilled and iced to the dock, ready for your summer event. This eliminates the stress of Austin summer event planning logistics and ensures perfectly cold drinks.'
  },
  {
    question: 'What are the alcohol rules on Premier Party Cruises boats?',
    answer: 'All boats are BYOB (Bring Your Own Beverage). Pool party alcohol coordination must follow cans and plastic only - no glass allowed. This is standard for summer event planning on Lake Travis. Our professional captains ensure a safe, fun experience while you enjoy responsibly.'
  },
  {
    question: 'How many coolers do I need for summer event planning on Lake Travis?',
    answer: 'We provide coolers and ice for your cruise. For pool party alcohol coordination for groups of 25+, we recommend organizing drinks by type: one cooler for beer, one for wine/seltzers, and one for water and non-alcoholic options. This summer event planning tip keeps everything organized and accessible.'
  },
  {
    question: 'What non-alcoholic options should I include in my pool party planning?',
    answer: 'Austin heat demands serious hydration. Pool party alcohol coordination should include 1 water or non-alcoholic drink per alcoholic beverage per person. Summer event planning pros recommend sparkling water, electrolyte drinks, and mocktail ingredients for guests who want a break from alcohol.'
  },
  {
    question: 'How does Austin heat affect summer pool party alcohol planning?',
    answer: 'Austin summer temperatures (often 95-105°F) significantly impact pool party alcohol coordination. Drinks warm faster, guests drink more, and hydration needs increase. Successful summer event planning requires double the ice, pre-chilled beverages, and shaded drink stations. Plan for 20-30% more beverages than a typical indoor party.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Party Cruises', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/party-boat-lake-travis', label: 'Lake Travis Party Boats', icon: Waves },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 }
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '4 Boats', label: 'To Choose From' }
];

export default function PoolPartyAlcoholCoordination() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/pool-party-alcohol-coordination-summer-event-planning-in-austin-heat"
        defaultTitle="Pool Party Alcohol Coordination: Summer Event Planning in Austin Heat | Premier Party Cruises"
        defaultDescription="Master pool party alcohol coordination for Austin summer events. Expert summer event planning tips for Lake Travis boat parties. Calculate drinks for 14-75 guests, keep beverages cold in Austin heat, and coordinate delivery. Pool party alcohol coordination guide from Premier Party Cruises."
        defaultKeywords={['pool party alcohol coordination', 'summer event planning', 'Austin pool party', 'Lake Travis party boat', 'Austin summer party', 'pool party planning Austin', 'boat party alcohol', 'summer event coordination', 'Austin heat party planning', 'Party On Delivery Austin']}
        image="https://premierpartycruises.com/attached_assets/@capitalcityshots-10_1760080740019.jpg"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="pool-party-alcohol-coordination-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Pool party alcohol coordination on Lake Travis boat party in Austin summer heat"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-orange-600 font-bold" data-testid="badge-hero">
              Summer Event Planning Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Pool Party Alcohol Coordination<br />
              <span className="text-yellow-300">Summer Event Planning in Austin Heat</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              The complete guide to pool party alcohol coordination for Austin summer events. From calculating drinks for 14-75 guests to keeping beverages ice-cold in Texas heat - master summer event planning on Lake Travis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-orange-600 font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Get Your Custom Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold"
                data-testid="button-view-boats"
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
            Browse our full range of{' '}
            <Link href="/party-boat-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin party boat rentals</Link>{' '}
            for celebrations of every kind on Lake Travis.
          </p>
        </div>
      </div>


        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
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
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="intro-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Pool Party Alcohol Coordination Matters in Austin
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Austin's legendary summer heat changes everything about <strong>pool party alcohol coordination</strong>. When temperatures soar to 100°F+, your <strong>summer event planning</strong> strategy needs to adapt. A Lake Travis boat party in August is nothing like a backyard party in Seattle - and your beverage planning should reflect that.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Successful <strong>pool party alcohol coordination</strong> in Austin means understanding how heat affects drink consumption, ice melt rates, and guest hydration needs. With 14+ years of <strong>summer event planning</strong> experience on Lake Travis, Premier Party Cruises has perfected the art of keeping parties cool and guests happy.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Whether you're planning a bachelor party on our 14-guest Day Tripper or a corporate event on our 75-guest Clever Girl, this guide covers everything you need for perfect <strong>pool party alcohol coordination</strong> in the Texas heat.
              </p>

              <BlogImageBreak
                src={heroImage}
                alt="Pool party alcohol coordination on Lake Travis boat party - guests enjoying cold drinks in Austin summer"
                caption="Keep your summer event cool with proper pool party alcohol coordination"
              />
            </m.div>
          </div>
        </section>

        {/* Summer Tips Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900" data-testid="summer-tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Essential Summer Event Planning Tips for Austin Heat
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Pool party alcohol coordination in Texas summer requires specific strategies. These summer event planning tips ensure your Lake Travis party stays refreshing.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {summerTips.map((tip, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`summer-tip-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-3 shrink-0">
                          <tip.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Alcohol Calculations Table */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="calculations-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Pool Party Alcohol Coordination by Boat Size
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Use this summer event planning guide to calculate beverages for your Lake Travis boat party. Quantities account for Austin summer heat consumption rates.
              </p>
            </m.div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg" data-testid="alcohol-table">
                <thead>
                  <tr className="bg-orange-600 text-white">
                    <th className="px-4 py-3 text-left">Boat / Guests</th>
                    <th className="px-4 py-3 text-left">Beer/Seltzers</th>
                    <th className="px-4 py-3 text-left">Wine/Rosé</th>
                    <th className="px-4 py-3 text-left">Liquor</th>
                    <th className="px-4 py-3 text-left">Mixers</th>
                    <th className="px-4 py-3 text-left">Ice Needed</th>
                  </tr>
                </thead>
                <tbody>
                  {alcoholCalculations.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.guests}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.beer}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.wine}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.liquor}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.mixers}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.ice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>Pro Tip:</strong> For pool party alcohol coordination in peak Austin summer (June-August), add 20-30% to these estimates. Use <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-semibold">Party On Delivery</a> for pre-chilled beverages delivered right to the dock!
              </p>
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${sectionImage1})` }} data-testid="cta-image-section">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Plan Your Austin Summer Event?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let Premier Party Cruises help with your pool party alcohol coordination. We provide coolers, ice, and 14+ years of summer event planning expertise on Lake Travis.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
              data-testid="button-book-now"
            >
              <Link href="/book-now">Get Your Free Quote</Link>
            </Button>
          </div>
        </section>

        {/* Fleet Options */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Boat for Summer Event Planning
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All boats feature arch canopy shade for pool party alcohol coordination. Single-deck pontoons perfect for Austin summer events.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {boatFleet.map((boat, index) => (
                <m.div
                  key={boat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow" data-testid={`boat-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Ship className="h-8 w-8 text-orange-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{boat.name}</h3>
                          <Badge variant="secondary">{boat.capacity}</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{boat.description}</p>
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Best for: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{boat.best}</span>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coordination Checklist */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="checklist-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Pool Party Alcohol Coordination Checklist
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Follow this summer event planning checklist for a flawless Lake Travis boat party.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {coordinationChecklist.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`checklist-item-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 shrink-0">
                          <item.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
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
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Pool Party Alcohol Coordination FAQs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about summer event planning and alcohol coordination for Austin boat parties.
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border rounded-lg px-4 bg-gray-50 dark:bg-gray-800"
                >
                  <AccordionTrigger 
                    className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline"
                    data-testid={`faq-trigger-${index}`}
                  >
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

        {/* Internal Links Section */}
        <section className="py-16 bg-slate-100 dark:bg-slate-900" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Explore More Austin Party Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Plan your perfect summer event with Premier Party Cruises
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid={`internal-link-${index}`}>
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white" data-testid="final-cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Summer Event Planning Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't let Austin heat ruin your pool party. Let Premier Party Cruises handle the logistics while you enjoy perfect pool party alcohol coordination on Lake Travis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-orange-600 font-bold"
                data-testid="button-final-quote"
              >
                <Link href="/book-now">Get Your Free Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600"
                data-testid="button-final-contact"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
