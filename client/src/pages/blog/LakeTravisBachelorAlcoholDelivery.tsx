import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Package, Phone, Clock, CheckCircle2, 
  Truck, Beer, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Wine, Sparkles, Sun,
  Anchor, Music, Camera, Heart, Shield, PartyPopper,
  Gift, DollarSign, Zap, ClipboardCheck, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BlogImageBreak, BlogPhotoStrip, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';

import heroImage from '@assets/bachelor-party-group-guys.webp';
import boatImage from '@assets/@capitalcityshots-13_1760080740020.jpg';
import partyImage from '@assets/@capitalcityshots-14_1760080740020.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const deliveryBenefits = [
  {
    icon: Clock,
    title: 'Save Valuable Party Time',
    description: 'Lake Travis bachelor party alcohol delivery means no liquor store runs. Your bachelor party alcohol delivery arrives iced and ready at the dock.'
  },
  {
    icon: Truck,
    title: 'Dock-Side Convenience',
    description: 'Complete coordination guide for boat parties starts with delivery to your exact marina location. Bachelor party alcohol delivery eliminates logistics stress.'
  },
  {
    icon: Beer,
    title: 'Pre-Chilled Beverages',
    description: 'Lake Travis alcohol delivery arrives cold. No warming drinks in your car - essential for our coordination guide for boat parties in Texas heat.'
  },
  {
    icon: DollarSign,
    title: 'Bulk Pricing Benefits',
    description: 'Bachelor party alcohol delivery services often beat retail prices. Our coordination guide for boat parties recommends ordering in advance for best deals.'
  }
];

const boatFleet = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    description: 'Single-deck pontoon with arch canopy - ideal for intimate Lake Travis bachelor party groups',
    alcoholNeeds: '48-72 beers, 2 bottles liquor, plenty of mixers',
    best: 'Smaller bachelor groups, pre-wedding celebrations'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    description: 'Single-deck pontoon with arch canopy - perfect mid-size bachelor party alcohol delivery setup',
    alcoholNeeds: '75-100 beers, 3-4 bottles liquor, full mixer selection',
    best: 'Medium bachelor parties, combined friend groups'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    description: 'Single-deck pontoon with arch canopy - popular coordination guide for boat parties choice',
    alcoholNeeds: '90-120 beers, 4-5 bottles liquor, comprehensive mixers',
    best: 'Larger bachelor celebrations, group rentals'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    description: 'Single-deck pontoon with arch canopy, additional crew fee for 51-75 guests',
    alcoholNeeds: '150-225 beers, 6-10 bottles liquor, full bar setup',
    best: 'Epic bachelor weekends, combined bachelor/bachelorette groups'
  }
];

const coordinationSteps = [
  { step: 1, title: 'Book Your Boat', description: 'Reserve your Lake Travis bachelor party boat 2-4 weeks in advance. This coordination guide for boat parties starts with securing your vessel.' },
  { step: 2, title: 'Calculate Alcohol Needs', description: 'Use our bachelor party alcohol delivery calculator: 3-4 drinks per person for a 3-4 hour cruise, plus 20% extra for Texas heat.' },
  { step: 3, title: 'Order Through Party On Delivery', description: 'Schedule your Lake Travis alcohol delivery 48 hours before. They deliver pre-chilled beverages directly to your dock location.' },
  { step: 4, title: 'Confirm Delivery Details', description: 'Provide exact marina and dock info. Our coordination guide for boat parties ensures your bachelor party alcohol delivery arrives on time.' },
  { step: 5, title: 'Arrive & Board', description: 'Your bachelor party alcohol delivery waits at the dock. Load coolers (we provide them) and start celebrating on Lake Travis!' }
];

const drinkRecommendations = [
  { category: 'Beer & Seltzers', items: 'Light lagers, White Claws, Topo Chico Hard Seltzer, local Austin craft beers', tip: 'Best sellers for Lake Travis bachelor party alcohol delivery' },
  { category: 'Liquor', items: 'Vodka, Tequila, Whiskey, Rum', tip: 'Pre-mixed cocktails reduce coordination guide for boat parties complexity' },
  { category: 'Mixers', items: 'Topo Chico, Sprite, Coke, Orange juice, Bloody Mary mix', tip: 'Essential for complete bachelor party alcohol delivery packages' },
  { category: 'Non-Alcoholic', items: 'Water, Gatorade, Sparkling water', tip: 'Critical hydration for Lake Travis summer boat parties' }
];

const faqs = [
  {
    question: 'How does Lake Travis bachelor party alcohol delivery work?',
    answer: 'Lake Travis bachelor party alcohol delivery through Party On Delivery is simple: order online, select your beverages, provide your dock location, and they deliver pre-chilled drinks directly to your marina. This coordination guide for boat parties eliminates the hassle of liquor store runs and keeps your beverages cold for boarding.'
  },
  {
    question: 'What is the best coordination guide for boat parties on Lake Travis?',
    answer: 'The best coordination guide for boat parties includes: book your boat 2-4 weeks ahead, calculate 3-4 drinks per person (add 20% for heat), order bachelor party alcohol delivery 48 hours before, and confirm dock details. Premier Party Cruises provides coolers and ice - you just need to bring the beverages.'
  },
  {
    question: 'How much alcohol do I need for a bachelor party on Lake Travis?',
    answer: 'For a 3-4 hour Lake Travis bachelor party, plan 3-4 drinks per person plus 20% extra for heat. For 25 guests on the Meeseeks: 75-100 beers/seltzers, 3-4 bottles liquor, 6L mixers, and plenty of water. Bachelor party alcohol delivery services can help calculate exact quantities.'
  },
  {
    question: 'Can I have alcohol delivered directly to the Lake Travis marina?',
    answer: 'Yes! Party On Delivery specializes in Lake Travis bachelor party alcohol delivery directly to marina docks. This coordination guide for boat parties tip saves time and ensures cold beverages. Provide your exact dock location when ordering for seamless bachelor party alcohol delivery.'
  },
  {
    question: 'What types of alcohol are best for Lake Travis boat parties?',
    answer: 'Light beers, hard seltzers, and vodka-based drinks work best for Lake Travis bachelor party events. This coordination guide for boat parties recommends avoiding heavy wines or dark liquors in Texas heat. Pre-mixed cocktails simplify bachelor party alcohol delivery logistics.'
  },
  {
    question: 'What are the alcohol rules on Premier Party Cruises boats?',
    answer: 'All boats are BYOB (Bring Your Own Beverage). Our coordination guide for boat parties requires cans and plastic only - no glass. Bachelor party alcohol delivery should be ordered accordingly. We provide coolers and ice for your Lake Travis bachelor party.'
  },
  {
    question: 'How far in advance should I order bachelor party alcohol delivery?',
    answer: 'Order Lake Travis bachelor party alcohol delivery at least 48 hours before your cruise. For weekend parties during peak season (April-October), order 3-4 days ahead. This coordination guide for boat parties tip ensures availability and proper chilling time.'
  },
  {
    question: 'What if I forget something for my Lake Travis bachelor party?',
    answer: 'Party On Delivery offers same-day bachelor party alcohol delivery for forgotten items. However, our coordination guide for boat parties recommends ordering everything 48 hours ahead for the best Lake Travis bachelor party experience. Last-minute delivery fees may apply.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Party Cruises', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/private-cruises', label: 'Private Rentals', icon: Ship },
  { href: '/party-boat-lake-travis', label: 'Lake Travis Boats', icon: Waves },
  { href: '/combined-bachelor-bachelorette', label: 'Combined Parties', icon: PartyPopper }
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Reviews' }
];

export default function LakeTravisBachelorAlcoholDelivery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Bachelor Party Alcohol Delivery: Complete Coordination Guide for Boat Parties | Premier Party Cruises</title>
        <meta name="description" content="Complete Lake Travis bachelor party alcohol delivery guide. Coordination guide for boat parties with dock delivery, drink calculations for 14-75 guests, and BYOB tips. Bachelor party alcohol delivery from Party On Delivery makes Lake Travis boat parties easy." />
        <meta name="keywords" content="Lake Travis bachelor party alcohol delivery, coordination guide for boat parties, bachelor party alcohol delivery, Lake Travis boat party, Austin bachelor party, Party On Delivery Lake Travis, boat party alcohol, bachelor party planning Austin, Lake Travis bachelor weekend" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties" />
        <meta property="og:title" content="Lake Travis Bachelor Party Alcohol Delivery: Complete Coordination Guide for Boat Parties" />
        <meta property="og:description" content="Your complete Lake Travis bachelor party alcohol delivery guide. Dock delivery, drink calculations, and boat party coordination tips from Premier Party Cruises." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys.webp" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-bachelor-alcohol-delivery-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis bachelor party alcohol delivery - bachelor group celebrating on party boat"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Complete Coordination Guide for Boat Parties
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Bachelor Party<br />
              <span className="text-amber-400">Alcohol Delivery Guide</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              The complete coordination guide for boat parties on Lake Travis. From bachelor party alcohol delivery to drink calculations - everything you need for an epic Lake Travis bachelor party experience.
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
                <Link href="/bachelor-party-austin">Bachelor Party Options</Link>
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

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="intro-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The Ultimate Lake Travis Bachelor Party Alcohol Delivery Guide
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Planning a <strong>Lake Travis bachelor party</strong> is exciting - but coordinating alcohol for a boat party can be stressful. This complete <strong>coordination guide for boat parties</strong> eliminates the guesswork. From <strong>bachelor party alcohol delivery</strong> directly to your dock to calculating exactly how much you need, we've got you covered.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                With 14+ years of hosting epic <strong>Lake Travis bachelor parties</strong>, Premier Party Cruises knows exactly what makes these celebrations legendary. The secret? Flawless logistics. That's why we recommend <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> for <strong>bachelor party alcohol delivery</strong> - they deliver pre-chilled beverages directly to your marina dock.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                This <strong>coordination guide for boat parties</strong> covers everything from boat selection (14-75 guests) to drink calculations, delivery timing, and BYOB rules. Whether you're booking our intimate Day Tripper or our flagship Clever Girl, your <strong>Lake Travis bachelor party</strong> deserves perfect planning.
              </p>

              <BlogImageBreak
                src={heroImage}
                alt="Lake Travis bachelor party alcohol delivery - bachelor group celebrating on party boat cruise"
                caption="Lake Travis bachelor parties made easy with dock-side alcohol delivery"
              />
            </motion.div>
          </div>
        </section>

        {/* Delivery Benefits */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Bachelor Party Alcohol Delivery is Essential
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                This coordination guide for boat parties starts with the smartest decision: dock-side alcohol delivery for your Lake Travis bachelor party.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {deliveryBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`benefit-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 shrink-0">
                          <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coordination Steps */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="steps-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Complete Coordination Guide for Boat Parties
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Follow these 5 steps for seamless Lake Travis bachelor party alcohol delivery and boat party coordination.
              </p>
            </motion.div>

            <div className="space-y-6">
              {coordinationSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow" data-testid={`step-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${boatImage})` }} data-testid="cta-image-section">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Your Lake Travis Bachelor Party?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Premier Party Cruises + Party On Delivery = the perfect coordination guide for boat parties. We provide the boat, coolers, and ice - they deliver your bachelor party alcohol delivery on time.
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

        {/* Fleet Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Lake Travis Bachelor Party Boat
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                This coordination guide for boat parties includes alcohol estimates for each vessel. All boats are single-deck pontoons with arch canopy.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {boatFleet.map((boat, index) => (
                <motion.div
                  key={boat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow" data-testid={`boat-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Ship className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{boat.name}</h3>
                          <Badge variant="secondary">{boat.capacity}</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{boat.description}</p>
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 mb-4">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bachelor Party Alcohol Delivery: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{boat.alcoholNeeds}</span>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Best for: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{boat.best}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Drink Recommendations */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="drinks-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Bachelor Party Alcohol Delivery Recommendations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our coordination guide for boat parties recommends these drinks for Lake Travis bachelor parties.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {drinkRecommendations.map((drink, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`drink-card-${index}`}>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{drink.category}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{drink.items}</p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                        <p className="text-xs text-green-700 dark:text-green-300 font-medium">{drink.tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

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
                Lake Travis Bachelor Party Alcohol Delivery FAQs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about bachelor party alcohol delivery and our coordination guide for boat parties.
              </p>
            </motion.div>

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
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Explore More Lake Travis Party Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Plan your complete Lake Travis bachelor party experience
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
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid={`internal-link-${index}`}>
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white" data-testid="final-cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Planning Your Lake Travis Bachelor Party
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Use this coordination guide for boat parties and let Party On Delivery handle your bachelor party alcohol delivery. Premier Party Cruises makes Lake Travis bachelor parties legendary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-blue-600 font-bold"
                data-testid="button-final-quote"
              >
                <Link href="/quote">Get Your Free Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
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
  );
}
