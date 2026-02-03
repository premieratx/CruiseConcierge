import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Wine, Phone, Clock, CheckCircle2, 
  MapPin, Calendar, Star, ArrowRight, Building2, 
  Briefcase, Handshake, Shield, Target, AlertTriangle,
  Scale, TrendingUp, Award, Crown, Coffee, Utensils
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-29_1760080807867.jpg';
import sectionImage1 from '@assets/@capitalcityshots-30_1760080807867.jpg';
import sectionImage2 from '@assets/@capitalcityshots-31_1760080807867.jpg';
import sectionImage3 from '@assets/@capitalcityshots-32_1760080807868.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const strategyPrinciples = [
  {
    icon: Scale,
    title: 'Quality Over Quantity',
    description: 'Client entertainment alcohol strategy focuses on premium selections, not abundance',
    tips: ['Curate 3-4 excellent options vs. 10 mediocre ones', 'Focus on what clients actually drink', 'Premium presentation matters more than volume'],
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    icon: Clock,
    title: 'Strategic Timing',
    description: 'Professional event alcohol balance means knowing when and how long to serve',
    tips: ['2-3 hour events are ideal for business settings', 'Sunset cruises signal natural end times', 'Avoid open-ended alcohol availability'],
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    icon: Utensils,
    title: 'Food Integration',
    description: 'Impressive client alcohol without overserving requires strategic food pairing',
    tips: ['Always serve substantial appetizers or dinner', 'Match food to alcohol selections', 'Ensure eating continues throughout event'],
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    icon: Target,
    title: 'Know Your Audience',
    description: 'Corporate event alcohol etiquette varies by industry and relationship stage',
    tips: ['Research client preferences when possible', 'Offer non-alcoholic options prominently', 'Adjust formality to relationship level'],
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const dosDonts = {
  dos: [
    'Offer premium but recognizable brands for client entertainment alcohol strategy',
    'Provide elegant non-alcoholic alternatives equally',
    'Keep professional event alcohol balance to 1-2 drinks per hour max',
    'Have food available throughout the event',
    'Choose venues with natural time boundaries (like sunset cruises)',
    'Consider impressive client alcohol without overserving - quality presentation',
    'Brief your team on corporate event alcohol etiquette'
  ],
  donts: [
    'Push alcohol on clients who decline',
    'Let drinks flow without food or activity',
    'Extend events beyond 3-4 hours with open bar',
    'Forget that you\'re still representing your company',
    'Ignore signs that clients want to slow down',
    'Make alcohol the primary focus of the event',
    'Overlook transportation arrangements'
  ]
};

const eventScenarios = [
  {
    scenario: 'First Meeting with Prospective Client',
    recommendation: 'Light, sophisticated approach',
    alcoholStrategy: 'Offer 1-2 premium options. Focus on memorable experience over drinking. Lake Travis sunset cruise creates impressive backdrop without alcohol focus.',
    suggestedBoat: 'Day Tripper (14 guests) - Intimate professional setting'
  },
  {
    scenario: 'Celebrating Closed Deal',
    recommendation: 'Appropriate celebration without excess',
    alcoholStrategy: 'Champagne toast plus 2-3 quality options. Client entertainment alcohol strategy should match deal significance. Keep to 3-hour timeframe.',
    suggestedBoat: 'Meeseeks (25 guests) - Celebration capacity'
  },
  {
    scenario: 'Annual Client Appreciation',
    recommendation: 'Thoughtful, relationship-focused',
    alcoholStrategy: 'Full bar with emphasis on quality. Professional event alcohol balance with substantial food. Activity-focused event reduces drinking emphasis.',
    suggestedBoat: 'The Irony (30 guests) - Multiple client groups'
  },
  {
    scenario: 'Multi-Client Entertainment',
    recommendation: 'Professionally managed, universally appropriate',
    alcoholStrategy: 'Impressive client alcohol without overserving any individual. Variety of options including mocktails. Staff monitors consumption patterns.',
    suggestedBoat: 'Clever Girl (50-75 guests) - Large client events'
  }
];

const boatOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Intimate client meetings', description: 'Single-deck pontoon with arch canopy' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Small client groups', description: 'Single-deck pontoon with arch canopy' },
  { name: 'The Irony', capacity: '30 guests', best: 'Client appreciation events', description: 'Single-deck pontoon with arch canopy' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Major client entertainment', description: 'Single-deck pontoon with arch canopy (add\'l crew fee for 51-75)' }
];

const professionalTips = [
  { icon: Crown, title: 'VIP Treatment', description: 'Make clients feel special through experience, not excessive alcohol' },
  { icon: Shield, title: 'Liability Awareness', description: 'Your company is responsible - manage corporate event alcohol etiquette carefully' },
  { icon: Handshake, title: 'Relationship Building', description: 'Alcohol is a tool, not the goal - focus on meaningful connection' },
  { icon: Award, title: 'Memorable Experience', description: 'Client entertainment alcohol strategy succeeds when they remember the experience, not the drinks' }
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Reviews' },
  { stat: '125K+', label: 'Happy Guests' }
];

const faqs = [
  {
    question: 'What is the ideal client entertainment alcohol strategy for business settings?',
    answer: 'The ideal client entertainment alcohol strategy balances sophistication with professionalism. Focus on quality over quantity - 2-3 premium options well-presented beats an extensive bar. Pair with substantial food, keep events to 2-4 hours, and choose venues like Lake Travis cruises that have natural time boundaries. Impressive client alcohol without overserving means everyone remembers a great experience.'
  },
  {
    question: 'How do I maintain professional event alcohol balance?',
    answer: 'Professional event alcohol balance starts with planning. Limit event duration to 2-4 hours, always serve substantial food, offer prominent non-alcoholic options, and choose activities that don\'t center on drinking. A sunset cruise provides natural timing cues. Corporate event alcohol etiquette means reading the room and adjusting - if clients slow down, so does service.'
  },
  {
    question: 'What does corporate event alcohol etiquette look like in practice?',
    answer: 'Corporate event alcohol etiquette includes: never pushing drinks on anyone, providing equal attention to non-drinkers, having your team lead by example with moderation, ensuring transportation options, and keeping the focus on relationship building rather than consumption. Your client entertainment alcohol strategy reflects on your company culture.'
  },
  {
    question: 'How can I create impressive client alcohol without overserving?',
    answer: 'Impressive client alcohol without overserving focuses on experience: premium selections, elegant presentation, perfect pairings with food, and a memorable setting. On Lake Travis cruises, the stunning views and activity of cruising naturally balance alcohol consumption. Quality glassware, garnishes, and service elevate perception without increasing volume.'
  },
  {
    question: 'What boat size is best for client entertainment events?',
    answer: 'For client entertainment alcohol strategy events: Day Tripper (14 guests) for intimate prospect meetings, Meeseeks (25 guests) for small client appreciation, The Irony (30 guests) for departmental client events, Clever Girl (50-75 guests, add\'l crew fee for 51-75) for major client entertainment. All single-deck pontoons with arch canopy for professional comfort.'
  },
  {
    question: 'How does a boat cruise help with professional event alcohol balance?',
    answer: 'Lake Travis cruises naturally support professional event alcohol balance: defined duration (cruises have start and end times), engaging activity (swimming, scenery) reduces drinking focus, the experience itself impresses clients, and the setting encourages conversation over consumption. Your client entertainment alcohol strategy benefits from built-in structure.'
  },
  {
    question: 'What should I do if a client drinks too much at our event?',
    answer: 'Corporate event alcohol etiquette requires preparation: have transportation options ready, designate a team member to monitor, smoothly transition to coffee/water service, and never let an impaired client drive. On our cruises, we return to dock safely. Impressive client alcohol without overserving means preventing this scenario through thoughtful planning.'
  },
  {
    question: 'How do I plan client entertainment alcohol strategy for different industries?',
    answer: 'Adjust your client entertainment alcohol strategy to industry norms: tech and creative industries often accept casual settings, finance and law expect sophistication, healthcare may prefer minimal alcohol focus. Research client company culture when possible. Professional event alcohol balance adapts to audience - when in doubt, err toward restraint.'
  }
];

const internalLinks = [
  { href: '/client-entertainment', label: 'Client Entertainment', icon: Handshake },
  { href: '/team-building', label: 'Team Building', icon: Users },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/quote', label: 'Get Quote', icon: Target },
  { href: '/contact', label: 'Contact Us', icon: Phone }
];

export default function ClientEntertainmentAlcoholStrategy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Client Entertainment Alcohol Strategy - Impressing Without Overdoing It | Premier Party Cruises</title>
        <meta name="description" content="Master client entertainment alcohol strategy for professional events. Learn professional event alcohol balance, corporate event alcohol etiquette, and how to deliver impressive client alcohol without overserving on Lake Travis cruises." />
        <meta name="keywords" content="client entertainment alcohol strategy, professional event alcohol balance, corporate event alcohol etiquette, impressive client alcohol without overserving, client entertainment drinks, business alcohol etiquette, corporate hospitality Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/client-entertainment-alcohol-strategy-impressing-without-overdoing-it" />
        <meta property="og:title" content="Client Entertainment Alcohol Strategy - Impressing Without Overdoing It" />
        <meta property="og:description" content="Master client entertainment alcohol strategy. Professional event alcohol balance and corporate event alcohol etiquette for impressive client experiences." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="client-entertainment-alcohol-strategy-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Professional client entertainment event on Lake Travis with elegant beverage service"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Corporate Hospitality Excellence
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Client Entertainment Alcohol Strategy<br />
              <span className="text-amber-400">Impressing Without Overdoing It</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Master the art of professional event alcohol balance. Learn corporate event alcohol etiquette that impresses clients while maintaining your company's reputation. Deliver impressive client alcohol without overserving.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Client Event</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
                data-testid="button-view-options"
              >
                <Link href="/client-entertainment">View Client Entertainment Options</Link>
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
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Principles */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="principles-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Client Entertainment Alcohol Strategy Principles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Professional event alcohol balance isn't about restriction - it's about creating memorable experiences that reflect well on your company. Master these principles for impressive client alcohol without overserving.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {strategyPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`principle-card-${index}`}>
                    <CardHeader className="text-center">
                      <div className={`mx-auto p-3 ${principle.bg} dark:bg-opacity-20 rounded-full w-fit mb-2`}>
                        <principle.icon className={`h-6 w-6 ${principle.color}`} />
                      </div>
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{principle.description}</p>
                      <ul className="space-y-2">
                        {principle.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {tip}
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

        {/* Dos and Don'ts Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-800" data-testid="dos-donts-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">CORPORATE EVENT ALCOHOL ETIQUETTE</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                The Do's and Don'ts of Professional Event Alcohol Balance
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-green-200 dark:border-green-800" data-testid="dos-card">
                  <CardHeader className="bg-green-50 dark:bg-green-900/20">
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-6 w-6" />
                      DO: Client Entertainment Alcohol Strategy Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {dosDonts.dos.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-red-200 dark:border-red-800" data-testid="donts-card">
                  <CardHeader className="bg-red-50 dark:bg-red-900/20">
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                      <AlertTriangle className="h-6 w-6" />
                      DON'T: Corporate Event Alcohol Etiquette Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {dosDonts.donts.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Event Scenarios */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="scenarios-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Client Entertainment Alcohol Strategy by Scenario
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Different situations call for different approaches to professional event alcohol balance. Here's how to achieve impressive client alcohol without overserving in common scenarios.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {eventScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.scenario}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`scenario-card-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{scenario.scenario}</CardTitle>
                      <Badge variant="outline" className="w-fit">{scenario.recommendation}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{scenario.alcoholStrategy}</p>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          <Ship className="h-4 w-4 inline mr-2" />
                          {scenario.suggestedBoat}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Tips Section with Image */}
        <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-blue-100 text-blue-700">PROFESSIONAL EXCELLENCE</Badge>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Keys to Impressive Client Alcohol Without Overserving
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Your client entertainment alcohol strategy says as much about your company as your pitch deck. Corporate event alcohol etiquette, done right, strengthens relationships. Done poorly, it can damage them irreparably.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {professionalTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <tip.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
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
                  alt="Professional client entertainment alcohol strategy on Lake Travis cruise" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Boat Options */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-white" data-testid="boat-options-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-400 text-black font-bold">CLIENT ENTERTAINMENT CRUISES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Lake Travis: The Perfect Venue for Professional Event Alcohol Balance
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Our cruises provide natural structure for client entertainment alcohol strategy - defined duration, engaging activities, and stunning scenery that doesn't require alcohol to impress.
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
                <Link href="/client-entertainment">Explore Client Entertainment Options</Link>
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
                Client Entertainment Alcohol Strategy FAQ
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about professional event alcohol balance and corporate event alcohol etiquette.
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
                From client entertainment to team building, we help you execute corporate event alcohol etiquette perfectly.
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
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300" data-testid={`link-card-${index}`}>
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-slate-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan Your Client Entertainment Event?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let us help you execute the perfect client entertainment alcohol strategy. Impressive client alcohol without overserving - that's our specialty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8"
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
