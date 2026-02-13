import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Truck, Wine, Clock, Phone, Package, Ship, 
  Calendar, Star, Users, Heart, Sparkles, CheckCircle2,
  ArrowRight, Zap, AlertTriangle, MapPin, Timer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/disco_fun_1765193453547.jpg';
import sectionImage1 from '@assets/disco_fun2_1765193453547.jpg';
import sectionImage2 from '@assets/disco_fun_28_1765193453540.jpg';

const trustStats = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const emergencyScenarios = [
  { scenario: 'Ran out of drinks mid-party', solution: 'Party On Delivery can do rush orders for your austin bachelorette party', icon: Wine, urgency: 'Common' },
  { scenario: 'Forgot to buy alcohol before boat cruise', solution: 'Same-day delivery to dock for your Lake Travis bachelorette', icon: Truck, urgency: 'Critical' },
  { scenario: 'More guests than expected', solution: 'Quick top-up order for your bachelorette party Austin', icon: Users, urgency: 'Moderate' },
  { scenario: 'Wrong beverage types for group', solution: 'Exchange or add-on order for austin bachelorette party', icon: Package, urgency: 'Moderate' },
  { scenario: 'Hotel/Airbnb has no alcohol', solution: 'Delivery to any Austin address for Lake Travis bachelorette prep', icon: MapPin, urgency: 'Common' },
  { scenario: 'Pre-party supplies depleted', solution: 'Emergency restock before your bachelorette party Austin outing', icon: AlertTriangle, urgency: 'Critical' }
];

const lastMinuteOptions = [
  {
    name: 'Party On Delivery',
    description: 'Premier beverage coordination for austin bachelorette party groups',
    features: ['Same-day delivery available', 'Boat dock delivery', 'Pre-iced and ready', 'Boat-legal containers only'],
    bestFor: 'Lake Travis bachelorette boat cruises',
    turnaround: '2-4 hours'
  },
  {
    name: 'Drizly',
    description: 'App-based alcohol delivery for bachelorette party Austin hotels',
    features: ['Wide selection', 'Quick delivery', 'Multiple stores', 'Easy app ordering'],
    bestFor: 'Hotel and Airbnb deliveries',
    turnaround: '30-60 minutes'
  },
  {
    name: 'Minibar Delivery',
    description: 'Premium spirits delivery for austin bachelorette party celebrations',
    features: ['Curated selections', 'Premium brands', 'Gift packaging', 'Mixers included'],
    bestFor: 'Upscale bachelorette party Austin',
    turnaround: '1-2 hours'
  },
  {
    name: 'Instacart Alcohol',
    description: 'Grocery store alcohol delivery for Lake Travis bachelorette prep',
    features: ['Large quantities', 'Mixers and snacks', 'Multiple stores', 'Same-day available'],
    bestFor: 'Bulk orders and party supplies',
    turnaround: '1-3 hours'
  }
];

const emergencyKitEssentials = [
  { item: 'Canned Ranch Water (12-pack)', reason: 'Austin\'s signature drink for Lake Travis bachelorette parties', priority: 'Essential' },
  { item: 'Hard Seltzer Variety (24-pack)', reason: 'Crowd pleaser for any austin bachelorette party', priority: 'Essential' },
  { item: 'Canned Rosé (8-pack)', reason: 'Perfect for bachelorette party Austin boat cruises', priority: 'Essential' },
  { item: 'Plastic Bottle Vodka', reason: 'Mixer base for custom Lake Travis bachelorette cocktails', priority: 'High' },
  { item: 'Tequila (Plastic Bottle)', reason: 'Margarita essential for austin bachelorette party', priority: 'High' },
  { item: 'Champagne Cans (6-pack)', reason: 'Celebration toasts for bachelorette party Austin', priority: 'High' },
  { item: 'Mixers (Plastic Bottles)', reason: 'Club soda, tonic, juices for Lake Travis bachelorette drinks', priority: 'Moderate' },
  { item: 'Non-Alcoholic Seltzers', reason: 'Options for all guests at your austin bachelorette party', priority: 'Moderate' }
];

const partyOnDeliveryAdvantages = [
  { title: 'Dock Delivery', description: 'Beverages delivered directly to your Lake Travis bachelorette boat dock', icon: Ship },
  { title: 'Pre-Iced', description: 'Everything chilled and ready for your austin bachelorette party', icon: Sparkles },
  { title: 'Boat-Legal Only', description: 'No glass - cans and plastic only for bachelorette party Austin boats', icon: CheckCircle2 },
  { title: 'Rush Available', description: 'Same-day emergency orders for Lake Travis bachelorette cruises', icon: Zap }
];

const fleetOptions = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Intimate Lake Travis bachelorette group' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Perfect mid-size bachelorette party Austin' },
  { name: 'The Irony', capacity: '30 guests', description: 'Popular austin bachelorette party choice' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Large Lake Travis bachelorette (add\'l crew fee for 51-75)' }
];

const timelineGuide = [
  { timeframe: '24+ Hours Before', action: 'Ideal for Party On Delivery orders - best selection for austin bachelorette party' },
  { timeframe: '4-24 Hours Before', action: 'Still great - most Lake Travis bachelorette deliveries available' },
  { timeframe: '2-4 Hours Before', action: 'Rush order needed - contact Party On Delivery directly for bachelorette party Austin' },
  { timeframe: 'Under 2 Hours', action: 'Emergency! Use Drizly + Party On Delivery combo for Lake Travis bachelorette' }
];

const faqs = [
  {
    question: 'Can I get last-minute alcohol delivery for my Lake Travis bachelorette boat?',
    answer: 'Yes! Party On Delivery offers same-day delivery for Lake Travis bachelorette boat cruises. They can deliver directly to the dock with your beverages iced and in boat-legal containers (cans and plastic only). For your austin bachelorette party, we recommend ordering at least 4 hours in advance, but rush orders are available for bachelorette party Austin emergencies.'
  },
  {
    question: 'What delivery services work best for austin bachelorette party last-minute orders?',
    answer: 'For Lake Travis bachelorette boat parties specifically, Party On Delivery is your best option because they deliver to docks and only provide boat-legal containers. For austin bachelorette party hotel or Airbnb deliveries, Drizly and Minibar offer 30-60 minute delivery. Use Instacart for bulk orders when prepping for your bachelorette party Austin weekend.'
  },
  {
    question: 'How do I build an emergency alcohol kit for my bachelorette party Austin?',
    answer: 'A solid emergency kit for your austin bachelorette party includes: 24-pack hard seltzers, 12-pack ranch water, 8-pack canned rosé, plastic bottle vodka and tequila, mixers, and champagne cans for toasts. All boat-legal containers for your Lake Travis bachelorette cruise. Party On Delivery can create a custom kit for your bachelorette party Austin.'
  },
  {
    question: 'What if we run out of drinks during our Lake Travis bachelorette boat cruise?',
    answer: 'If you run low during your Lake Travis bachelorette cruise, you\'re limited to what\'s on the boat. That\'s why pre-planning with Party On Delivery for your austin bachelorette party is crucial. They help calculate exactly how much you need based on group size and cruise length. Better to have extra than run short during your bachelorette party Austin!'
  },
  {
    question: 'How much lead time does Party On Delivery need for Lake Travis bachelorette orders?',
    answer: 'Party On Delivery recommends 24+ hours for ideal selection for your austin bachelorette party. However, they can accommodate same-day orders for Lake Travis bachelorette cruises with 4+ hours notice. Rush orders under 2 hours are possible but may have limited selection for your bachelorette party Austin.'
  },
  {
    question: 'Can alcohol be delivered to my Austin hotel for our bachelorette party?',
    answer: 'Absolutely! Multiple services deliver to Austin hotels for your austin bachelorette party prep. Drizly is the fastest (30-60 minutes). Minibar offers premium selections. Just make sure you\'ll be available to receive the order (must be 21+ with ID) before your Lake Travis bachelorette boat cruise.'
  },
  {
    question: 'What alcohol containers are allowed on Lake Travis bachelorette boats?',
    answer: 'Only cans and plastic containers are allowed on Lake Travis bachelorette boats - no glass. Party On Delivery only supplies boat-legal containers for your austin bachelorette party. If using other delivery services for your bachelorette party Austin, transfer any glass bottle contents to plastic containers before boarding.'
  },
  {
    question: 'How do I calculate how much alcohol to order for my austin bachelorette party boat cruise?',
    answer: 'For a 3-4 hour Lake Travis bachelorette cruise, plan 3-4 drinks per person. A group of 20 for your austin bachelorette party needs approximately 60-80 drinks. Include variety: 50% seltzers/beer, 30% wine/cocktails, 20% spirits with mixers. Party On Delivery helps calculate exactly what you need for your bachelorette party Austin.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get Your Quote', icon: Calendar }
];

export default function BacheloretteAlcoholEmergencyKit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions"
        defaultTitle="Bachelorette Party Alcohol Emergency Kit | Last-Minute Delivery Solutions | Premier Party Cruises"
        defaultDescription="Last-minute alcohol solutions for your austin bachelorette party. Emergency delivery options, Party On Delivery for Lake Travis bachelorette boats, and quick-order guides. Never run out at your bachelorette party Austin!"
        defaultKeywords={['austin bachelorette party', 'bachelorette party Austin', 'Lake Travis bachelorette', 'bachelorette alcohol delivery', 'last minute party alcohol', 'austin alcohol delivery', 'Lake Travis boat party drinks']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="bachelorette-alcohol-emergency-kit-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-red-600 via-pink-600 to-purple-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Bachelorette party Austin group with emergency alcohol delivery on Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-red-400 text-black font-bold" data-testid="badge-hero">
              🚨 EMERGENCY SOLUTIONS
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Bachelorette Party<br />
              <span className="text-pink-300">Alcohol Emergency Kit</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Last-minute delivery solutions for your austin bachelorette party. 
              Never let a beverage shortage derail your Lake Travis bachelorette celebration!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-book-cruise"
              >
                <Link href="/bachelorette-party-austin">Book Your Cruise</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-red-900 font-semibold"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Get Custom Quote</Link>
              </Button>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This guide is part of our complete{' '}
            <Link href="/bachelorette-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelorette party boats</Link>{' '}
            resource — your ultimate planning hub for Lake Travis bachelorette celebrations.
          </p>
        </div>
      </div>


        {/* Trust Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustStats.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Scenarios */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="scenarios-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-red-100 text-red-700">COMMON EMERGENCIES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="scenarios-title">Austin Bachelorette Party Alcohol Emergencies We've Seen</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                And how to solve them for your Lake Travis bachelorette
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyScenarios.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`scenario-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <Badge className="mb-2" variant="outline">{item.urgency}</Badge>
                          <h3 className="font-bold text-lg mb-2">{item.scenario}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.solution}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Party On Delivery Feature */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white" data-testid="pod-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <Badge className="mb-4 bg-white/20 text-white">RECOMMENDED SOLUTION</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="pod-title">Party On Delivery for Lake Travis Bachelorette</h2>
                <p className="text-xl text-pink-100 mb-6">
                  The ultimate solution for your austin bachelorette party beverage needs. 
                  Same-day delivery, dock service, and boat-legal containers only.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {partyOnDeliveryAdvantages.map((adv, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/10 p-3 rounded-lg" data-testid={`pod-adv-${index}`}>
                      <adv.icon className="h-6 w-6 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold">{adv.title}</h3>
                        <p className="text-sm text-pink-100">{adv.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={sectionImage1}
                  alt="Party On Delivery service for austin bachelorette party Lake Travis boat cruise"
                  className="rounded-2xl shadow-xl w-full"
                  data-testid="img-pod"
                />
              </div>
            </m.div>
          </div>
        </section>

        {/* Delivery Options */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="delivery-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="delivery-title">Last-Minute Delivery Options for Your Bachelorette Party Austin</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Compare services for your austin bachelorette party emergency
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {lastMinuteOptions.map((option, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`delivery-option-${index}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{option.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-700">{option.turnaround}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-pink-600">Best for: </span>
                        <span className="text-sm">{option.bestFor}</span>
                      </div>
                      <ul className="space-y-2">
                        {option.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
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

        {/* Emergency Kit Essentials */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="kit-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-500 text-white">BUILD YOUR KIT</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="kit-title">Lake Travis Bachelorette Emergency Alcohol Kit</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Essential items to always have ready for your austin bachelorette party
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyKitEssentials.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`kit-item-${index}`}>
                    <CardContent className="pt-4">
                      <Badge className="mb-2" variant={item.priority === 'Essential' ? 'default' : 'outline'}>
                        {item.priority}
                      </Badge>
                      <h3 className="font-bold text-sm mb-2">{item.item}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.reason}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Guide */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="timeline-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="timeline-title">Order Timeline for Your Austin Bachelorette Party</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                How far in advance to order for your Lake Travis bachelorette
              </p>
            </m.div>

            <div className="space-y-4">
              {timelineGuide.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`border-l-4 ${index === 0 ? 'border-green-500' : index === 3 ? 'border-red-500' : 'border-amber-500'}`} data-testid={`timeline-item-${index}`}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Timer className={`h-8 w-8 ${index === 0 ? 'text-green-500' : index === 3 ? 'text-red-500' : 'text-amber-500'}`} />
                      <div>
                        <h3 className="font-bold">{item.timeframe}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.action}</p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Options */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="fleet-title">Choose Your Bachelorette Party Austin Boat</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                All boats BYOB-friendly with Party On Delivery available
              </p>
            </m.div>

            <div className="grid md:grid-cols-4 gap-6">
              {fleetOptions.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`fleet-${index}`}>
                    <CardContent className="pt-6">
                      <Ship className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-1">{boat.name}</h3>
                      <div className="text-pink-600 font-semibold mb-2">{boat.capacity}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boat.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder */}
        <QuoteBuilderSection />

        {/* FAQs */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Last-Minute Alcohol Delivery FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about emergency delivery for your austin bachelorette party
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:text-pink-600">
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
              <h2 className="text-3xl font-bold mb-4">Plan Your Complete Austin Bachelorette Party</h2>
            </m.div>

            <div className="grid md:grid-cols-4 gap-6">
              {internalLinks.map((link, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card className="h-full text-center hover:shadow-lg transition-shadow cursor-pointer hover:border-pink-300" data-testid={`link-${index}`}>
                      <CardContent className="pt-6">
                        <link.icon className="h-10 w-10 text-pink-500 mx-auto mb-3" />
                        <h3 className="font-bold">{link.label}</h3>
                        <ArrowRight className="h-5 w-5 mx-auto mt-2 text-gray-400" />
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-red-600 to-pink-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="cta-title">
                Don't Wait Until It's an Emergency!
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Book your Lake Travis bachelorette cruise and arrange Party On Delivery for your austin bachelorette party today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-red-100 font-bold text-lg px-8"
                  data-testid="cta-button-book"
                >
                  <Link href="/bachelorette-party-austin">Book Bachelorette Cruise</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-bold"
                  data-testid="cta-button-quote"
                >
                  <Link href="/book-now">Get Custom Quote</Link>
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
