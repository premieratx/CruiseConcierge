import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Gift, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Wine, Sparkles, Shield,
  Music, Snowflake, PartyPopper, Heart, Sun, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage1 from '@assets/@capitalcityshots-23_1760080807865.jpg';
import sectionImage2 from '@assets/@capitalcityshots-24_1760080807866.jpg';
import sectionImage3 from '@assets/@capitalcityshots-25_1760080807866.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const holidayThemes = [
  {
    name: 'New Year\'s Eve',
    icon: Sparkles,
    timing: 'December 31',
    description: 'Ring in the new year with holiday party alcohol themes featuring champagne toasts and midnight celebrations on Lake Travis',
    beverages: ['Champagne', 'Sparkling wine', 'Festive cocktails', 'Midnight toast selections'],
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  {
    name: 'Fourth of July',
    icon: Flame,
    timing: 'July 4',
    description: 'Celebrate Independence Day with Fourth of July alcohol planning featuring patriotic drinks and lakeside fireworks viewing',
    beverages: ['American craft beers', 'Red, white & blue cocktails', 'Summer refreshers', 'Ice-cold selections'],
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  {
    name: 'Austin Celebrations',
    icon: Star,
    timing: 'Year-round',
    description: 'Local Austin celebrations with holiday party alcohol themes showcasing Texas craft beverages and Austin-proud selections',
    beverages: ['Texas craft beers', 'Local distillery spirits', 'Austin-made wines', 'Hill Country selections'],
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    name: 'Holiday Season',
    icon: Snowflake,
    timing: 'November-December',
    description: 'Festive holiday party alcohol themes with seasonal cocktails and warm celebration vibes for winter gatherings',
    beverages: ['Mulled wines', 'Holiday cocktails', 'Seasonal craft beers', 'Festive champagne'],
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  }
];

const newYearsPlanning = [
  'Champagne toast coordination for midnight on Lake Travis',
  'Holiday party alcohol themes with gold and silver accents',
  'New Year\'s countdown entertainment and music',
  'Sunset cruise transitioning to fireworks viewing',
  'Premium champagne and sparkling wine selections'
];

const fourthOfJulyPlanning = [
  'Fourth of July alcohol planning with patriotic beverage selections',
  'Red, white, and blue themed cocktails and decorations',
  'Lake Travis fireworks viewing from the best vantage points',
  'Summer-appropriate holiday party alcohol themes',
  'American craft beer and bourbon highlights'
];

const austinCelebrations = [
  'Local Austin celebrations featuring Texas craft breweries',
  'Hill Country wine selections for sophisticated tastes',
  'Holiday party alcohol themes showcasing Austin distilleries',
  'Seasonal Austin events with themed beverage pairings',
  'Supporting local with Austin celebrations drink menus'
];

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    best: 'Intimate holiday gatherings',
    description: 'Perfect for small group holiday party alcohol themes on single-deck pontoon with arch canopy'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    best: 'Friend group celebrations',
    description: 'Ideal for New Year\'s or Fourth of July alcohol planning with medium-sized parties'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    best: 'Extended celebrations',
    description: 'Great capacity for Austin celebrations with larger friend groups'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    best: 'Large holiday parties',
    description: 'Our flagship for major holiday party alcohol themes (add\'l crew fee for 51-75 guests)'
  }
];

const seasonalBeverages = [
  {
    season: 'New Year\'s Eve',
    recommendations: [
      { name: 'Champagne', description: 'Essential for midnight toasts and holiday party alcohol themes' },
      { name: 'Prosecco', description: 'Affordable sparkling option for Austin celebrations' },
      { name: 'Sparkling Rosé', description: 'Festive color for New Year\'s beverage planning' },
      { name: 'Champagne Cocktails', description: 'Classic additions to holiday party alcohol themes' }
    ]
  },
  {
    season: 'Fourth of July',
    recommendations: [
      { name: 'American Lagers', description: 'Classic choice for Fourth of July alcohol planning' },
      { name: 'Texas Craft Beers', description: 'Local pride for Austin celebrations' },
      { name: 'Bourbon Cocktails', description: 'Patriotic spirits for holiday party alcohol themes' },
      { name: 'Summer Sangria', description: 'Refreshing option for lake party Fourth of July alcohol planning' }
    ]
  }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What holiday party alcohol themes work best for New Year\'s Eve on Lake Travis?',
    answer: 'New Year\'s Eve holiday party alcohol themes should feature champagne and sparkling wines for the midnight toast. Consider a progression from cocktails during sunset to champagne as midnight approaches. Austin celebrations on Lake Travis offer stunning fireworks views to complement your New Year\'s beverage selections.'
  },
  {
    question: 'How should we plan Fourth of July alcohol for a Lake Travis boat party?',
    answer: 'Fourth of July alcohol planning should focus on refreshing, summer-appropriate options. American craft beers, particularly Texas breweries, work perfectly for Austin celebrations. Red, white, and blue themed cocktails add festive flair to your holiday party alcohol themes while celebrating on the water.'
  },
  {
    question: 'What Austin celebrations pair well with Lake Travis boat parties?',
    answer: 'Austin celebrations on Lake Travis work beautifully for major holidays, corporate events, and milestone occasions. From SXSW after-parties to holiday season gatherings, our boats accommodate various holiday party alcohol themes that showcase local Austin craft beverages.'
  },
  {
    question: 'How do I coordinate beverage delivery for holiday party alcohol themes?',
    answer: 'Our Party On Delivery service handles beverage coordination for all holiday party alcohol themes. Whether planning New Year\'s champagne or Fourth of July alcohol selections, we ensure everything arrives iced and dock-ready for your Austin celebrations.'
  },
  {
    question: 'What quantities should we plan for holiday party alcohol themes?',
    answer: 'For holiday party alcohol themes, plan 3-4 drinks per person for a 3-4 hour celebration. New Year\'s events may need additional champagne for toasts. Fourth of July alcohol planning should account for daytime heat with extra refreshing options for Austin celebrations.'
  },
  {
    question: 'Can we do themed decorations with our holiday party alcohol themes?',
    answer: 'Absolutely! Themed decorations enhance holiday party alcohol themes. New Year\'s sparkle, Fourth of July patriotic elements, or Austin celebrations themes are all welcome. We just ask that decorations be removable and not damage the boat.'
  },
  {
    question: 'What non-alcoholic options should we include in holiday party alcohol themes?',
    answer: 'Inclusive holiday party alcohol themes always feature premium non-alcoholic options. Sparkling cider for New Year\'s, craft sodas for Fourth of July alcohol alternatives, and local Austin mocktails ensure all guests enjoy your Austin celebrations.'
  },
  {
    question: 'When should we book for major holiday party alcohol themes events?',
    answer: 'New Year\'s Eve and Fourth of July require early booking - 2-3 months in advance for best availability. Popular holiday party alcohol themes dates fill quickly. Other Austin celebrations should book 4-6 weeks ahead for optimal selection.'
  }
];

const internalLinks = [
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/blogs/company-holiday-party-lake-travis', label: 'Holiday Party Guide', icon: Gift },
  { href: '/blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning', label: 'Office Party Planning', icon: Wine },
  { href: '/quote', label: 'Get a Quote', icon: Calendar }
];

export default function HolidayPartyAlcoholThemes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Holiday Party Alcohol Themes: New Year's, Fourth of July & Austin Celebrations | Premier Party Cruises</title>
        <meta name="description" content="Plan perfect holiday party alcohol themes for New Year's Eve, Fourth of July, and Austin celebrations on Lake Travis. Complete guide to themed beverage planning for 14-75 guests." />
        <meta name="keywords" content="holiday party alcohol themes, New Year's Eve party, Fourth of July alcohol planning, Austin celebrations, holiday themed drinks, Lake Travis holiday party, New Year's boat party, Fourth of July Lake Travis" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations" />
        <meta property="og:title" content="Holiday Party Alcohol Themes: New Year's, Fourth of July & Austin Celebrations" />
        <meta property="og:description" content="Plan perfect holiday party alcohol themes for New Year's Eve, Fourth of July, and Austin celebrations on Lake Travis." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-22_1760080807865.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="holiday-party-alcohol-themes-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-red-900 to-blue-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Holiday party alcohol themes for New Year's, Fourth of July and Austin celebrations on Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-purple-600 font-bold" data-testid="badge-hero">
              <PartyPopper className="mr-1 h-4 w-4" />
              Holiday Celebration Themes
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Holiday Party Alcohol Themes<br />
              <span className="text-amber-400">New Year's, Fourth of July & Austin Celebrations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Create unforgettable holiday party alcohol themes for every major celebration. 
              From New Year's champagne toasts to Fourth of July lakeside festivities, make your Austin celebrations legendary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-plan-party"
              >
                <Link href="/quote">Plan Your Holiday Party</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-900 font-semibold"
                data-testid="button-view-options"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
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
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Holiday Themes Overview */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="themes-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Holiday Party Alcohol Themes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From New Year's Eve elegance to Fourth of July patriotism, explore holiday party alcohol themes that make Austin celebrations unforgettable.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {holidayThemes.map((theme, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-theme-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${theme.bg} rounded-full flex items-center justify-center`}>
                        <theme.icon className={`h-8 w-8 ${theme.color}`} />
                      </div>
                      <h3 className="font-bold text-lg text-center mb-1">{theme.name}</h3>
                      <p className={`text-sm text-center font-semibold mb-3 ${theme.color}`}>{theme.timing}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{theme.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {theme.beverages.slice(0, 3).map((bev, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{bev}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* New Year's Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900" data-testid="newyears-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-purple-100 text-purple-700">NEW YEAR'S EVE</Badge>
                <h2 className="text-3xl font-bold mb-6">Holiday Party Alcohol Themes for New Year's Eve</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Ring in the new year with spectacular holiday party alcohol themes on Lake Travis. 
                  Watch fireworks from the water while toasting with champagne at midnight.
                </p>
                
                <div className="space-y-3">
                  {newYearsPlanning.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start" data-testid={`newyears-feature-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={sectionImage1}
                    alt="New Year's Eve holiday party alcohol themes with champagne toast on Lake Travis"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fourth of July Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="july4-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative order-2 lg:order-1"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={sectionImage2}
                    alt="Fourth of July alcohol planning with patriotic themes for Austin celebrations on Lake Travis"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-1 lg:order-2"
              >
                <Badge className="mb-4 bg-red-100 text-red-700">FOURTH OF JULY</Badge>
                <h2 className="text-3xl font-bold mb-6">Fourth of July Alcohol Planning on Lake Travis</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Celebrate Independence Day with epic Fourth of July alcohol planning on the water. 
                  Lake Travis offers prime fireworks viewing while you enjoy patriotic holiday party alcohol themes.
                </p>
                
                <div className="space-y-3">
                  {fourthOfJulyPlanning.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start" data-testid={`july4-feature-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Austin Celebrations Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900" data-testid="austin-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-amber-100 text-amber-700">AUSTIN CELEBRATIONS</Badge>
                <h2 className="text-3xl font-bold mb-6">Year-Round Austin Celebrations on Lake Travis</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Austin celebrations deserve local flair. Feature Texas craft beverages and 
                  Hill Country wines in your holiday party alcohol themes for authentic Austin experiences.
                </p>
                
                <div className="space-y-3">
                  {austinCelebrations.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start" data-testid={`austin-feature-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={sectionImage3}
                    alt="Austin celebrations with local holiday party alcohol themes featuring Texas craft beverages"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Beverage Recommendations */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="beverages-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Holiday Party Alcohol Themes Beverage Guide</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Curated recommendations for New Year's and Fourth of July alcohol planning success.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {seasonalBeverages.map((season, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full" data-testid={`card-season-${index}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {index === 0 ? <Sparkles className="h-5 w-5 text-purple-500" /> : <Flame className="h-5 w-5 text-red-500" />}
                        {season.season}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {season.recommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="border-b last:border-0 pb-3 last:pb-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{rec.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Holiday Celebration Venue</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All boats are single-deck pontoons with arch canopy, perfect for holiday party alcohol themes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatOptions.map((boat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-boat-${index}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Ship className="h-5 w-5 text-purple-500" />
                        {boat.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-600 font-semibold mb-2">{boat.capacity}</p>
                      <p className="text-sm text-gray-500 mb-2">Best for: {boat.best}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600 text-white font-bold" data-testid="button-view-fleet">
                <Link href="/private-cruises">View Full Fleet Details</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Holiday Party Alcohol Themes FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about New Year's, Fourth of July, and Austin celebrations.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow-sm border"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Internal Links Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Celebration Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover our complete range of holiday and celebration services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internalLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:border-purple-300 cursor-pointer group" data-testid={`link-card-${index}`}>
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <link.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                            {link.label}
                          </h3>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                      </CardContent>
                    </Card>
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
