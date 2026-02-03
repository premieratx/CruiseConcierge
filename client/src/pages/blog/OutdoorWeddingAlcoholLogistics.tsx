import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Wine, Phone, Clock, CheckCircle2, 
  MapPin, Calendar, Star, ArrowRight, Building2, 
  Heart, Truck, Shield, Package, Sparkles, Sun,
  TreePine, Mountain, Waves, Thermometer, Cloud, Umbrella
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-25_1760080807866.jpg';
import sectionImage1 from '@assets/@capitalcityshots-26_1760080807866.jpg';
import sectionImage2 from '@assets/@capitalcityshots-27_1760080807866.jpg';
import sectionImage3 from '@assets/@capitalcityshots-28_1760080807867.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const outdoorVenueTypes = [
  {
    icon: Mountain,
    title: 'Hill Country Ranches',
    region: 'Dripping Springs, Wimberley, Fredericksburg',
    challenges: ['Remote locations', 'Limited refrigeration', 'Long vendor drive times'],
    solutions: ['Early delivery scheduling', 'Extra ice provisions', 'On-site cooler setup'],
    alcoholTip: 'Plan for outdoor wedding alcohol logistics Hill Country with extra ice - temperatures can spike unexpectedly'
  },
  {
    icon: Waves,
    title: 'Lake Travis Venues',
    region: 'Lakeway, Marble Falls, Lago Vista',
    challenges: ['Marina access timing', 'Weather variability', 'Guest transportation'],
    solutions: ['Dock-side delivery coordination', 'Covered boat options', 'Flexible timing'],
    alcoholTip: 'Lake Travis wedding alcohol coordination includes BYOB-friendly boats with coolers provided'
  },
  {
    icon: TreePine,
    title: 'Garden & Estate Venues',
    region: 'Austin, Round Rock, Georgetown',
    challenges: ['Outdoor bar setup', 'Temperature control', 'Evening service transitions'],
    solutions: ['Shaded bar stations', 'Iced beverage service', 'Lighting coordination'],
    alcoholTip: 'Outdoor wedding alcohol logistics require backup plans for sudden Texas weather changes'
  }
];

const seasonalConsiderations = [
  {
    season: 'Spring (March-May)',
    icon: Cloud,
    tips: [
      'Plan for pop-up showers with covered alternatives',
      'Moderate temperatures - standard ice quantities',
      'Popular wedding season - book early for outdoor wedding alcohol logistics Hill Country'
    ],
    alcoholNote: 'Light, refreshing cocktails perfect for Lake Travis wedding alcohol coordination'
  },
  {
    season: 'Summer (June-August)',
    icon: Sun,
    tips: [
      'Double your ice order for outdoor wedding alcohol logistics',
      'Consider sunset timing for cooler temperatures',
      'Hydration stations alongside alcoholic beverages'
    ],
    alcoholNote: 'Frozen drinks and cold beer dominate - plan for rapid consumption on hot days'
  },
  {
    season: 'Fall (September-November)',
    icon: TreePine,
    tips: [
      'Peak wedding season in Texas Hill Country',
      'Comfortable temperatures for outdoor events',
      'Book outdoor wedding alcohol logistics Hill Country 3-4 months ahead'
    ],
    alcoholNote: 'Wine and craft cocktails popular - moderate ice needs for Lake Travis wedding alcohol coordination'
  },
  {
    season: 'Winter (December-February)',
    icon: Thermometer,
    tips: [
      'Warm beverage options alongside cocktails',
      'Earlier sunset times - adjust event schedule',
      'Fewer outdoor wedding alcohol logistics concerns with cooler temps'
    ],
    alcoholNote: 'Hot toddies and mulled wine options for outdoor wedding alcohol logistics'
  }
];

const logisticsChecklist = [
  { category: 'Delivery Coordination', items: [
    'Confirm venue access hours and delivery windows',
    'Identify refrigeration or cold storage options on-site',
    'Plan backup delivery routes for Hill Country locations',
    'Coordinate with venue for outdoor wedding alcohol logistics setup'
  ]},
  { category: 'Temperature Management', items: [
    'Order 50% extra ice for summer Lake Travis wedding alcohol coordination',
    'Arrange shaded bar stations or tent coverage',
    'Plan cooler rotation schedule for multi-hour events',
    'Consider insulated containers for outdoor wedding alcohol logistics Hill Country'
  ]},
  { category: 'Serving Setup', items: [
    'Confirm bartender requirements with venue',
    'Plan bar station locations for guest flow',
    'Arrange for cups, ice buckets, and garnishes',
    'Set up recycling and waste stations for Lake Travis wedding alcohol coordination'
  ]},
  { category: 'Contingency Planning', items: [
    'Weather backup plan for outdoor wedding alcohol logistics',
    'Extra quantities for unexpected guest increases',
    'Transportation plan for remote Hill Country locations',
    'Emergency vendor contact numbers on hand'
  ]}
];

const boatOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Intimate lakeside weddings', description: 'Single-deck pontoon with arch canopy' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Wedding party celebrations', description: 'Single-deck pontoon with arch canopy' },
  { name: 'The Irony', capacity: '30 guests', best: 'Extended family gatherings', description: 'Single-deck pontoon with arch canopy' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Large wedding receptions', description: 'Single-deck pontoon with arch canopy (add\'l crew fee for 51-75)' }
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Reviews' },
  { stat: '125K+', label: 'Happy Guests' }
];

const faqs = [
  {
    question: 'What are the biggest challenges with outdoor wedding alcohol logistics Hill Country?',
    answer: 'The main challenges for outdoor wedding alcohol logistics Hill Country include: remote venue locations requiring advance delivery planning, limited or no refrigeration requiring significant ice quantities, Texas heat demanding extra cooling solutions, and variable weather requiring backup plans. Our Lake Travis wedding alcohol coordination team has experience navigating all these challenges.'
  },
  {
    question: 'How does Lake Travis wedding alcohol coordination differ from land-based venues?',
    answer: 'Lake Travis wedding alcohol coordination has unique requirements: beverages must be in cans or plastic (no glass), delivery happens at marina docks before departure, our boats provide coolers and ice on-board, and you have the flexibility of a private cruise. Outdoor wedding alcohol logistics on the lake actually simplify many aspects since we handle the setup.'
  },
  {
    question: 'How much extra ice should I order for outdoor wedding alcohol logistics?',
    answer: 'For outdoor wedding alcohol logistics Hill Country in summer, plan for at least 50% more ice than indoor events. For Lake Travis wedding alcohol coordination, our boats come with coolers and we provide ice. General rule: 1.5 lbs of ice per person for a 4-hour event, doubled for outdoor wedding alcohol logistics in temperatures above 85°F.'
  },
  {
    question: 'What permits do I need for outdoor wedding alcohol logistics?',
    answer: 'Most private outdoor wedding alcohol logistics events where alcohol is provided (not sold) don\'t require permits. Some Hill Country venues may have their own licensing that covers your event. For Lake Travis wedding alcohol coordination on our boats, we\'re fully licensed for private charters. Always confirm outdoor wedding alcohol logistics requirements with your specific venue.'
  },
  {
    question: 'Can you deliver to remote Hill Country wedding venues?',
    answer: 'Yes! Our outdoor wedding alcohol logistics Hill Country service includes delivery to remote ranch and estate locations. We recommend confirming delivery windows with your venue and providing detailed directions. For Lake Travis wedding alcohol coordination, we deliver directly to the marina dock where your boat departs.'
  },
  {
    question: 'What happens if weather affects my outdoor wedding?',
    answer: 'Weather contingencies are essential for outdoor wedding alcohol logistics. For land venues, confirm their covered backup options. For Lake Travis wedding alcohol coordination, we monitor conditions closely and can reschedule if unsafe. Our outdoor wedding alcohol logistics planning includes flexible timing options when possible.'
  },
  {
    question: 'How do I keep beverages cold at an outdoor Hill Country wedding?',
    answer: 'Outdoor wedding alcohol logistics Hill Country temperature management includes: multiple large coolers with drainage, rotating ice replenishment, shaded bar stations, and considering insulated beverage dispensers. For Lake Travis wedding alcohol coordination, our boats have built-in coolers and we provide ice - one less thing to worry about.'
  },
  {
    question: 'What\'s the best timing for outdoor wedding alcohol logistics delivery?',
    answer: 'For outdoor wedding alcohol logistics Hill Country, schedule delivery 2-3 hours before guests arrive to allow setup time. Avoid peak heat for summer deliveries. For Lake Travis wedding alcohol coordination, we recommend dock delivery 1 hour before your cruise. Early morning deliveries help with outdoor wedding alcohol logistics temperature control.'
  }
];

const internalLinks = [
  { href: '/welcome-party', label: 'Welcome Parties', icon: Heart },
  { href: '/rehearsal-dinner', label: 'Rehearsal Dinners', icon: Star },
  { href: '/after-party', label: 'After Parties', icon: Sparkles },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Users },
  { href: '/contact', label: 'Contact Us', icon: Phone }
];

export default function OutdoorWeddingAlcoholLogistics() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Outdoor Wedding Alcohol Logistics - Hill Country & Lake Travis Coordination | Premier Party Cruises</title>
        <meta name="description" content="Master outdoor wedding alcohol logistics for Hill Country and Lake Travis venues. Expert Lake Travis wedding alcohol coordination, delivery solutions, temperature management, and seasonal planning tips." />
        <meta name="keywords" content="outdoor wedding alcohol logistics, Hill Country wedding alcohol, Lake Travis wedding alcohol coordination, outdoor wedding alcohol logistics Hill Country, Texas outdoor wedding drinks, Hill Country wedding planning, Lake Travis wedding venue" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination" />
        <meta property="og:title" content="Outdoor Wedding Alcohol Logistics - Hill Country & Lake Travis Coordination" />
        <meta property="og:description" content="Master outdoor wedding alcohol logistics for Hill Country and Lake Travis venues. Expert coordination, delivery solutions, and seasonal planning." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="outdoor-wedding-alcohol-logistics-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Outdoor wedding celebration at Hill Country venue with Lake Travis views"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-emerald-400 text-black font-bold" data-testid="badge-hero">
              Hill Country & Lake Travis Wedding Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Outdoor Wedding Alcohol Logistics<br />
              <span className="text-emerald-300">Hill Country & Lake Travis Coordination</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Navigate outdoor wedding alcohol logistics for Texas Hill Country ranches and Lake Travis venues. From temperature management to delivery coordination, ensure your celebration flows perfectly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Outdoor Wedding</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-emerald-900 font-semibold"
                data-testid="button-view-options"
              >
                <Link href="/private-cruises">Lake Travis Boat Options</Link>
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
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Outdoor Venue Types */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="venue-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Outdoor Wedding Alcohol Logistics by Venue Type
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Each outdoor venue presents unique challenges for outdoor wedding alcohol logistics. Here's how to plan for Hill Country ranches and Lake Travis wedding alcohol coordination.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {outdoorVenueTypes.map((venue, index) => (
                <motion.div
                  key={venue.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`venue-card-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                          <venue.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{venue.title}</CardTitle>
                          <p className="text-sm text-gray-500">{venue.region}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2">Challenges:</h4>
                        <ul className="space-y-1">
                          {venue.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-2">Solutions:</h4>
                        <ul className="space-y-1">
                          {venue.solutions.map((solution, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">{venue.alcoholTip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Planning */}
        <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800" data-testid="seasonal-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-emerald-100 text-emerald-700">SEASONAL PLANNING</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Seasonal Outdoor Wedding Alcohol Logistics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Texas weather varies dramatically by season. Plan your outdoor wedding alcohol logistics Hill Country or Lake Travis wedding alcohol coordination accordingly.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalConsiderations.map((season, index) => (
                <motion.div
                  key={season.season}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full" data-testid={`season-card-${index}`}>
                    <CardHeader className="text-center">
                      <div className="mx-auto p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full w-fit mb-2">
                        <season.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <CardTitle className="text-lg">{season.season}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {season.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                      <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-xs text-amber-700 dark:text-amber-300">
                        {season.alcoholNote}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image + Checklist Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="checklist-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-emerald-100 text-emerald-700">LOGISTICS CHECKLIST</Badge>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Complete Outdoor Wedding Alcohol Logistics Checklist
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Use this comprehensive checklist to ensure smooth outdoor wedding alcohol logistics for your Hill Country or Lake Travis wedding alcohol coordination.
                </p>
                
                <div className="space-y-6">
                  {logisticsChecklist.map((section, index) => (
                    <div key={section.category}>
                      <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">{section.category}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <img 
                  src={sectionImage1} 
                  alt="Outdoor wedding alcohol logistics setup at Hill Country venue" 
                  className="rounded-2xl shadow-xl w-full"
                />
                <img 
                  src={sectionImage2} 
                  alt="Lake Travis wedding alcohol coordination with beverage service on boat" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lake Travis Options */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-cyan-800 to-slate-900 text-white" data-testid="boat-options-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-400 text-black font-bold">LAKE TRAVIS WEDDING BOATS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simplify Your Lake Travis Wedding Alcohol Coordination
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Skip the outdoor wedding alcohol logistics complexity. Our Lake Travis boats come with coolers, ice, and BYOB-friendly policies. We handle the setup - you enjoy your celebration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatOptions.map((boat, index) => (
                <motion.div
                  key={boat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/10 border-white/20 text-white" data-testid={`boat-card-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{boat.name}</CardTitle>
                      <Badge variant="outline" className="w-fit border-amber-400 text-amber-400">{boat.capacity}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-300 font-medium mb-2">{boat.best}</p>
                      <p className="text-sm text-gray-300">{boat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                data-testid="button-explore-fleet"
              >
                <Link href="/private-cruises">Explore Lake Travis Options</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Outdoor Wedding Alcohol Logistics FAQ
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about outdoor wedding alcohol logistics Hill Country and Lake Travis wedding alcohol coordination.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-lg px-6 shadow-sm"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline" data-testid={`faq-trigger-${index}`}>
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

        {/* Internal Links Section */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Explore More Wedding Celebration Options
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                From welcome parties to after-parties, we help coordinate outdoor wedding alcohol logistics for every event.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer hover:border-emerald-300" data-testid={`link-card-${index}`}>
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{link.label}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan Your Outdoor Wedding?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Let us handle the outdoor wedding alcohol logistics. Get a custom quote for your Hill Country or Lake Travis wedding alcohol coordination needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-100 font-bold text-lg px-8"
                data-testid="button-cta-quote"
              >
                <Link href="/book-now">Get Your Custom Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-bold text-lg px-8"
                data-testid="button-cta-contact"
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
  );
}
