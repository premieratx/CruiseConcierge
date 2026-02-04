import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Wine, Phone, Clock, CheckCircle2, 
  MapPin, Calendar, Star, ArrowRight, Building2, 
  Briefcase, Handshake, Shield, Target, Award,
  Waves, Sun, Music, Camera, Heart, Zap, Trophy,
  Coffee, Utensils, PartyPopper, Package
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
import sectionImage3 from '@assets/@capitalcityshots-36_1760080807868.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const teamBuildingBenefits = [
  {
    icon: Users,
    title: 'Team Bonding in a Unique Setting',
    description: 'Corporate team building Lake Travis alcohol coordination creates memorable shared experiences',
    benefit: 'Break down barriers between departments and hierarchy levels',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    icon: Waves,
    title: 'Active Experience Focus',
    description: 'Swimming, floating, and cruising reduce emphasis on professional event drinks coordination',
    benefit: 'Team activities naturally balance alcohol consumption',
    color: 'text-cyan-600',
    bg: 'bg-cyan-100'
  },
  {
    icon: Sun,
    title: 'Natural Time Boundaries',
    description: 'Lake Travis corporate event alcohol logistics have built-in start and end times',
    benefit: 'Sunset cruises provide clear event conclusion without awkward endings',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    icon: Shield,
    title: 'Professional Yet Relaxed',
    description: 'Team event beverage planning Lake Travis strikes the perfect balance',
    benefit: 'Employees can relax while maintaining appropriate professional boundaries',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const alcoholCoordinationTips = [
  {
    title: 'Pre-Event Planning',
    icon: Calendar,
    tips: [
      'Survey team for dietary restrictions and non-drinker preferences',
      'Plan corporate team building Lake Travis alcohol coordination timeline',
      'Arrange professional event drinks coordination with Party On Delivery',
      'Brief managers on monitoring and modeling appropriate behavior'
    ]
  },
  {
    title: 'During the Event',
    icon: Users,
    tips: [
      'Ensure Lake Travis corporate event alcohol logistics include substantial food',
      'Keep non-alcoholic options equally visible and appealing',
      'Plan activities that don\'t center on drinking',
      'Have team event beverage planning Lake Travis cap at 2 drinks per hour max'
    ]
  },
  {
    title: 'Wrap-Up Considerations',
    icon: Shield,
    tips: [
      'Stop alcohol service 30-60 minutes before cruise ends',
      'Transition to coffee, water, and dessert',
      'Ensure corporate team building Lake Travis alcohol coordination includes safe transport',
      'Never let anyone drive impaired from a company event'
    ]
  }
];

const eventTypes = [
  {
    type: 'Quarterly Team Outings',
    description: 'Regular team building with Lake Travis corporate event alcohol logistics',
    alcoholApproach: 'Moderate - 2-3 drink options, emphasis on activities and team bonding',
    suggestedBoat: 'Meeseeks (25 guests)',
    duration: '3-4 hours'
  },
  {
    type: 'Department Celebrations',
    description: 'Celebrating wins with professional event drinks coordination',
    alcoholApproach: 'Celebratory - champagne toast plus quality selections, 3-hour limit',
    suggestedBoat: 'The Irony (30 guests)',
    duration: '3 hours'
  },
  {
    type: 'Executive Retreats',
    description: 'Leadership bonding with team event beverage planning Lake Travis',
    alcoholApproach: 'Premium but restrained - quality over quantity, lead by example',
    suggestedBoat: 'Day Tripper (14 guests)',
    duration: '3-4 hours'
  },
  {
    type: 'Company-Wide Events',
    description: 'Full team corporate team building Lake Travis alcohol coordination',
    alcoholApproach: 'Carefully managed - designated monitors, clear policies, activity-focused',
    suggestedBoat: 'Clever Girl (50-75 guests)',
    duration: '4-5 hours'
  }
];

const boatOptions = [
  { 
    name: 'Day Tripper', 
    capacity: '14 guests', 
    best: 'Executive team retreats', 
    description: 'Single-deck pontoon with arch canopy',
    alcoholNote: 'Intimate setting ideal for measured professional event drinks coordination'
  },
  { 
    name: 'Meeseeks', 
    capacity: '25 guests', 
    best: 'Department outings', 
    description: 'Single-deck pontoon with arch canopy',
    alcoholNote: 'Great size for team event beverage planning Lake Travis'
  },
  { 
    name: 'The Irony', 
    capacity: '30 guests', 
    best: 'Cross-team building', 
    description: 'Single-deck pontoon with arch canopy',
    alcoholNote: 'Spacious layout for Lake Travis corporate event alcohol logistics'
  },
  { 
    name: 'Clever Girl', 
    capacity: '50-75 guests', 
    best: 'Company-wide events', 
    description: 'Single-deck pontoon with arch canopy (add\'l crew fee for 51-75)',
    alcoholNote: 'Large-scale corporate team building Lake Travis alcohol coordination'
  }
];

const policyGuidelines = [
  { title: 'Clear Communication', description: 'Share corporate team building Lake Travis alcohol coordination expectations before the event' },
  { title: 'Leadership Example', description: 'Managers should model appropriate professional event drinks coordination' },
  { title: 'Activity Integration', description: 'Plan swimming, games, and team challenges that don\'t involve drinking' },
  { title: 'Transportation Planning', description: 'Ensure Lake Travis corporate event alcohol logistics include safe rides home' },
  { title: 'Inclusive Options', description: 'Team event beverage planning Lake Travis must include excellent non-alcoholic choices' },
  { title: 'Time Boundaries', description: 'Use cruise schedule to naturally limit corporate team building Lake Travis alcohol coordination' }
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Reviews' },
  { stat: '125K+', label: 'Corporate Events' }
];

const faqs = [
  {
    question: 'How do we manage corporate team building Lake Travis alcohol coordination responsibly?',
    answer: 'Responsible corporate team building Lake Travis alcohol coordination starts with planning: set clear expectations, brief leadership on modeling behavior, ensure substantial food throughout, provide excellent non-alcoholic options, plan engaging activities, use our cruise timing for natural boundaries, and arrange safe transportation. Our Lake Travis corporate event alcohol logistics experience helps you execute smoothly.'
  },
  {
    question: 'What\'s included in team event beverage planning Lake Travis with your service?',
    answer: 'Team event beverage planning Lake Travis with Premier Party Cruises includes: BYOB-friendly private charter, coolers and ice provided, professional captain, Party On Delivery coordination for beverages to arrive dockside ready to go. All our boats are single-deck pontoons with arch canopy. Professional event drinks coordination is simplified when we handle the logistics.'
  },
  {
    question: 'How much alcohol should we plan for corporate team building Lake Travis?',
    answer: 'For corporate team building Lake Travis alcohol coordination, plan conservatively: 1-2 drinks per person per hour for a maximum of 2-3 hours of service. A 4-hour event with 25 people typically needs 50-100 drinks total. Our Lake Travis corporate event alcohol logistics team can help calculate exact quantities based on your specific event duration and company culture.'
  },
  {
    question: 'What if some team members don\'t drink alcohol?',
    answer: 'Professional event drinks coordination always includes non-drinkers. For team event beverage planning Lake Travis, we recommend: sparkling water, craft sodas, mocktails, and quality non-alcoholic beer or wine. Present these options equally - not as afterthoughts. Corporate team building Lake Travis alcohol coordination succeeds when everyone feels included.'
  },
  {
    question: 'Which boat size is best for our team building event?',
    answer: 'For Lake Travis corporate event alcohol logistics: Day Tripper (14 guests) for executive retreats, Meeseeks (25 guests) for department outings, The Irony (30 guests) for cross-department events, Clever Girl (50-75 guests, add\'l crew fee for 51-75) for company-wide team building. All boats are single-deck pontoons with arch canopy, perfect for professional event drinks coordination.'
  },
  {
    question: 'How do activities on the cruise affect alcohol consumption?',
    answer: 'Lake Travis cruises naturally support team event beverage planning Lake Travis moderation: swimming stops, lily pad floats, scenic cruising, and team games all provide alcohol-free engagement. Our corporate team building Lake Travis alcohol coordination benefits from activity focus - people drink less when they\'re actively participating in experiences.'
  },
  {
    question: 'What should our alcohol policy be for company events?',
    answer: 'Your Lake Travis corporate event alcohol logistics policy should include: clear consumption expectations communicated in advance, leadership modeling appropriate behavior, mandatory food service throughout, designated drivers or transportation arranged, stop alcohol service before cruise ends, and zero tolerance for impairment. Professional event drinks coordination reflects your company values.'
  },
  {
    question: 'Can you help with food coordination for our team building event?',
    answer: 'Yes! Corporate team building Lake Travis alcohol coordination works best with food integration. We can connect you with catering partners or you can bring your own. We provide coolers, ice, and setup space. Team event beverage planning Lake Travis always includes substantial appetizers or full meals - never serve alcohol without food.'
  }
];

const internalLinks = [
  { href: '/team-building', label: 'Team Building', icon: Users },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/client-entertainment', label: 'Client Entertainment', icon: Handshake },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/quote', label: 'Get Quote', icon: Target },
  { href: '/contact', label: 'Contact Us', icon: Phone }
];

export default function CorporateTeamBuildingAlcohol() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Corporate Team Building on Lake Travis - Alcohol Coordination for Professional Events | Premier Party Cruises</title>
        <meta name="description" content="Expert corporate team building Lake Travis alcohol coordination for professional events. Learn Lake Travis corporate event alcohol logistics, team event beverage planning Lake Travis, and professional event drinks coordination strategies." />
        <meta name="keywords" content="corporate team building Lake Travis alcohol coordination, Lake Travis corporate event alcohol logistics, team event beverage planning Lake Travis, professional event drinks coordination, corporate party Lake Travis, team building Austin, company event alcohol management" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events" />
        <meta property="og:title" content="Corporate Team Building on Lake Travis - Alcohol Coordination for Professional Events" />
        <meta property="og:description" content="Expert corporate team building Lake Travis alcohol coordination. Lake Travis corporate event alcohol logistics and team event beverage planning for professional events." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="corporate-team-building-alcohol-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-indigo-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Corporate team building event on Lake Travis with professional beverage service"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-cyan-400 text-black font-bold" data-testid="badge-hero">
              Professional Team Building on the Water
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Corporate Team Building on Lake Travis<br />
              <span className="text-cyan-300">Alcohol Coordination for Professional Events</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Master corporate team building Lake Travis alcohol coordination. Expert guidance on Lake Travis corporate event alcohol logistics, team event beverage planning Lake Travis, and professional event drinks coordination that keeps your event memorable for the right reasons.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Team Event</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-indigo-900 font-semibold"
                data-testid="button-view-options"
              >
                <Link href="/team-building">View Team Building Options</Link>
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
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Lake Travis for Corporate Team Building Alcohol Coordination
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Lake Travis corporate event alcohol logistics naturally support responsible team events. The unique setting provides structure that makes professional event drinks coordination easier.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamBuildingBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`benefit-card-${index}`}>
                    <CardHeader className="text-center">
                      <div className={`mx-auto p-3 ${benefit.bg} dark:bg-opacity-20 rounded-full w-fit mb-2`}>
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{benefit.description}</p>
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{benefit.benefit}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coordination Tips Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-indigo-100 text-indigo-700">ALCOHOL COORDINATION GUIDE</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Team Event Beverage Planning Lake Travis Best Practices
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Successful corporate team building Lake Travis alcohol coordination follows a clear timeline. Here's how to manage professional event drinks coordination before, during, and after your cruise.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {alcoholCoordinationTips.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full" data-testid={`coordination-card-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                          <section.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <CardTitle>{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
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

        {/* Event Types Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="event-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Lake Travis Corporate Event Alcohol Logistics by Event Type
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Different corporate events require different approaches to professional event drinks coordination. Here's how to tailor your corporate team building Lake Travis alcohol coordination.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={event.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`event-type-card-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.type}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-indigo-600 dark:text-indigo-400 mb-1">Alcohol Approach:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.alcoholApproach}</p>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{event.suggestedBoat}</p>
                          <p className="text-xs text-gray-500">{event.duration}</p>
                        </div>
                        <Ship className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image + Policy Guidelines */}
        <section className="py-16 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800" data-testid="policy-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">COMPANY POLICY GUIDELINES</Badge>
                <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Professional Event Drinks Coordination Policy Framework
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Successful corporate team building Lake Travis alcohol coordination requires clear policies. These guidelines help ensure your Lake Travis corporate event alcohol logistics protect your company while allowing your team to enjoy a memorable experience.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {policyGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{guideline.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{guideline.description}</p>
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
                  src={sectionImage1} 
                  alt="Corporate team building Lake Travis alcohol coordination on boat cruise" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Boat Options */}
        <section className="py-16 bg-gradient-to-br from-indigo-900 via-blue-800 to-slate-900 text-white" data-testid="boat-options-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-cyan-400 text-black font-bold">TEAM BUILDING FLEET</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Corporate Team Building Lake Travis Vessel
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Each boat offers unique advantages for Lake Travis corporate event alcohol logistics. All feature BYOB-friendly policies and team event beverage planning Lake Travis support.
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
                      <Badge variant="outline" className="w-fit border-cyan-400 text-cyan-400">{boat.capacity}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cyan-300 font-medium mb-2">{boat.best}</p>
                      <p className="text-sm text-gray-300 mb-3">{boat.description}</p>
                      <p className="text-xs text-gray-400 italic">{boat.alcoholNote}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                data-testid="button-explore-fleet"
              >
                <Link href="/team-building">Explore Team Building Options</Link>
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
                Corporate Team Building Lake Travis Alcohol Coordination FAQ
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Lake Travis corporate event alcohol logistics and professional event drinks coordination.
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
                Explore More Corporate Event Options
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                From team building to client entertainment, we help coordinate Lake Travis corporate event alcohol logistics for every occasion.
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
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer hover:border-indigo-300" data-testid={`link-card-${index}`}>
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
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
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan Your Team Building Event?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Let us help you execute perfect corporate team building Lake Travis alcohol coordination. Professional event drinks coordination is our specialty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100 font-bold text-lg px-8"
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
