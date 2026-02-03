import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Package, Clock, CheckCircle2, 
  Wine, Sparkles, DollarSign, ArrowRight, Heart,
  AlertTriangle, Truck, Calculator, ShoppingCart,
  Martini, GlassWater, Percent, Star, Award,
  ClipboardCheck, Lightbulb, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage3 from '@assets/@capitalcityshots-5_1760072938923.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const cocktailKitBenefits = [
  { icon: Package, title: 'Pre-Portioned Ingredients', description: 'Cocktail kits for bachelorette parties come with exact measurements - no guesswork needed' },
  { icon: Clock, title: 'Time Savings', description: 'Skip the shopping list - bachelorette party cocktail kits arrive ready to mix' },
  { icon: DollarSign, title: 'Cost Predictability', description: 'Know your bachelorette party alcohol budget upfront with cocktail kit pricing' },
  { icon: Sparkles, title: 'Themed Options', description: 'Find cocktail kits designed specifically for bachelorette party celebrations' },
  { icon: ClipboardCheck, title: 'Recipe Cards Included', description: 'Easy-to-follow instructions make bachelorette party cocktails foolproof' },
  { icon: Truck, title: 'Delivery Convenience', description: 'Bachelorette party cocktail kit delivery saves time and effort' }
];

const individualBottleBenefits = [
  { icon: Wine, title: 'Flexibility', description: 'Individual bottles let you customize your bachelorette party alcohol selection' },
  { icon: Calculator, title: 'Better Value for Large Groups', description: 'Buying bottles separately often costs less for bigger bachelorette parties' },
  { icon: ShoppingCart, title: 'Brand Selection', description: 'Choose your favorite spirits for your bachelorette party cocktails' },
  { icon: GlassWater, title: 'Quantity Control', description: 'Buy exactly what you need for your bachelorette party alcohol needs' }
];

const costComparison = [
  { 
    scenario: 'Small Group (6-10 guests)',
    cocktailKits: 'Cocktail kits: $150-250 total',
    bottles: 'Individual bottles: $200-300 total',
    winner: 'Cocktail Kits',
    reason: 'Pre-portioned bachelorette party cocktail kits minimize waste for smaller groups'
  },
  { 
    scenario: 'Medium Group (15-20 guests)',
    cocktailKits: 'Cocktail kits: $300-450 total',
    bottles: 'Individual bottles: $250-400 total',
    winner: 'Individual Bottles',
    reason: 'Bachelorette party alcohol strategy favors bulk buying at this size'
  },
  { 
    scenario: 'Large Group (25+ guests)',
    cocktailKits: 'Cocktail kits: $500+ total',
    bottles: 'Individual bottles: $350-500 total',
    winner: 'Individual Bottles',
    reason: 'Large bachelorette party alcohol needs are more economical with bottles'
  }
];

const smartStrategies = [
  {
    title: 'Hybrid Approach',
    description: 'Use cocktail kits for signature bachelorette party cocktails and individual bottles for basics like wine and beer',
    icon: Lightbulb
  },
  {
    title: 'Pre-Made Cocktail Pouches',
    description: 'Perfect for bachelorette party boat cruises - no mixing required, just pour and enjoy',
    icon: Martini
  },
  {
    title: 'Bulk Mixer Strategy',
    description: 'Buy individual bottles and pre-made mixers for easy bachelorette party cocktail creation',
    icon: Package
  },
  {
    title: 'Party On Delivery Service',
    description: 'Let Premier Party Cruises coordinate your bachelorette party alcohol delivery to the dock',
    icon: Truck
  }
];

const boatFleet = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Perfect for intimate bachelorette parties with cocktail kits' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Mid-size bachelorette party boat - hybrid alcohol strategy works best' },
  { name: 'The Irony', capacity: '30 guests', description: 'Popular choice - individual bottles often more economical' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Large bachelorette parties benefit from bulk bottle purchases' }
];

const faqs = [
  {
    question: 'Are cocktail kits or individual bottles better for bachelorette party alcohol?',
    answer: 'The smart bachelorette party alcohol strategy depends on group size. Cocktail kits are ideal for smaller groups (under 15), while individual bottles provide better value for larger bachelorette parties. For Lake Travis boat parties, consider the hybrid approach: use cocktail kits for signature drinks and individual bottles for basics.'
  },
  {
    question: 'Can I bring cocktail kits on a Lake Travis bachelorette party boat?',
    answer: 'Yes! All Premier Party Cruises boats are BYOB-friendly (cans and plastic only - no glass). Bachelorette party cocktail kits work great as long as they are in plastic containers. Pre-made cocktail pouches are especially popular for our bachelorette party boat cruises.'
  },
  {
    question: 'How much alcohol do I need for a bachelorette party?',
    answer: 'A good bachelorette party alcohol strategy estimates 2-3 drinks per person for a 3-4 hour event. For cocktail kits, this typically means one kit serves 4-6 people. For individual bottles, plan on one bottle of spirits making about 15-20 cocktails, depending on the recipe.'
  },
  {
    question: 'What are the best cocktail kits for bachelorette parties?',
    answer: 'Popular bachelorette party cocktail kits include margarita kits (crowd favorite), frosé kits (Instagram-worthy), and spritz kits. Look for kits designed for your group size. Many brides choose signature cocktail kits that match their wedding colors or theme.'
  },
  {
    question: 'Does Premier Party Cruises offer alcohol delivery for bachelorette parties?',
    answer: 'Yes! Our Party On Delivery service coordinates bachelorette party alcohol delivery directly to the dock. Whether you choose cocktail kits or individual bottles, we can help arrange delivery so everything is iced and ready when you arrive for your Lake Travis bachelorette cruise.'
  },
  {
    question: 'What is the most cost-effective bachelorette party alcohol strategy?',
    answer: 'For most bachelorette parties on Lake Travis, the hybrid approach offers the best value: use cocktail kits for 1-2 signature drinks and individual bottles for wine, beer, and simple cocktails. This bachelorette party alcohol strategy balances convenience with cost-effectiveness.'
  },
  {
    question: 'Can I mix cocktails on the boat during a bachelorette party cruise?',
    answer: 'Absolutely! Our bachelorette party boats have coolers and ice provided. Many groups bring cocktail kits and mix drinks during the cruise. For easier service, consider pre-batched bachelorette party cocktails in drink dispensers - just avoid glass containers.'
  },
  {
    question: 'What alcohol can I NOT bring on a Lake Travis bachelorette boat?',
    answer: 'Glass bottles and containers are not allowed on Lake Travis bachelorette party boats for safety reasons. Transfer your bachelorette party alcohol from glass bottles to plastic containers before boarding. Cans are always welcome, and cocktail kits in plastic packaging work perfectly.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/blogs/austin-bachelorette-alcohol-timeline', label: 'Alcohol Timeline Guide', icon: Clock },
  { href: '/blogs/budget-friendly-bachelorette-alcohol', label: 'Budget-Friendly Tips', icon: DollarSign },
  { href: '/blogs/lake-travis-bachelorette-alcohol-laws', label: 'Lake Travis Alcohol Laws', icon: AlertTriangle }
];

export default function CocktailKitsVsBottles() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Cocktail Kits vs Individual Bottles: Smart Bachelorette Party Alcohol Strategy | Premier Party Cruises</title>
        <meta name="description" content="Compare cocktail kits vs individual bottles for your bachelorette party. Smart alcohol strategy guide with cost analysis, pros/cons, and tips for Lake Travis boat parties. Expert bachelorette party planning." />
        <meta name="keywords" content="cocktail kits bachelorette party, bachelorette party alcohol, bachelorette party cocktails, cocktail kits vs bottles, bachelorette party alcohol strategy, Lake Travis bachelorette, bachelorette cocktail kit delivery, party alcohol planning" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy" />
        <meta property="og:title" content="Cocktail Kits vs Individual Bottles: Smart Bachelorette Party Alcohol Strategy" />
        <meta property="og:description" content="Compare cocktail kits vs individual bottles for your bachelorette party. Cost analysis, pros/cons, and expert tips for Lake Travis boat celebrations." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760080740012.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="cocktail-kits-vs-bottles-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-900 via-purple-800 to-pink-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage 
            src={heroImage}
            alt="Bachelorette party cocktails and cocktail kits on Lake Travis boat cruise"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-pink-400 text-black font-bold" data-testid="badge-hero">
              Bachelorette Party Alcohol Strategy Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Cocktail Kits vs Individual Bottles<br />
              <span className="text-pink-300">The Smart Bachelorette Party Alcohol Strategy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Should you buy cocktail kits or individual bottles for your bachelorette party? 
              Get the complete breakdown with cost analysis, pros and cons, and expert tips for your Lake Travis celebration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Bachelorette</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-pink-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/bachelorette-party-austin">View Bachelorette Options</Link>
              </Button>
            </div>
          </div>
        </motion.section>

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
                The Great Bachelorette Party Alcohol Debate
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Planning the perfect <strong>bachelorette party alcohol</strong> strategy can feel overwhelming. 
                Should you invest in convenient <strong>cocktail kits for your bachelorette party</strong>, or is buying 
                individual bottles more cost-effective? This guide breaks down everything you need to know about 
                <strong> bachelorette party cocktails</strong> and the smartest approach for your celebration.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Whether you're hosting a Lake Travis boat party or a downtown Austin celebration, your 
                <strong> bachelorette party alcohol strategy</strong> directly impacts your budget, convenience, and overall experience. 
                Let's compare <strong>cocktail kits vs individual bottles</strong> so you can make the best choice.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cocktail Kit Benefits */}
        <section className="py-16 bg-pink-50 dark:bg-gray-800" data-testid="cocktail-kits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-200 text-pink-800">Cocktail Kits</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Cocktail Kits Work for Bachelorette Parties
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Bachelorette party cocktail kits have surged in popularity for good reason. 
                Here's why cocktail kits might be the perfect choice for your celebration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cocktailKitBenefits.map((benefit, index) => (
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
                        <benefit.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Individual Bottles Benefits */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="bottles-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage1}
                  alt="Individual bottles for bachelorette party alcohol planning"
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-purple-200 text-purple-800">Individual Bottles</Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  When Individual Bottles Make More Sense
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  For many <strong>bachelorette party alcohol</strong> needs, buying individual bottles 
                  offers advantages that cocktail kits can't match. Here's when bottles are the smarter choice:
                </p>
                <div className="space-y-4">
                  {individualBottleBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="cost-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-200 text-green-800">Cost Analysis</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Bachelorette Party Alcohol Cost Comparison
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The right <strong>bachelorette party alcohol strategy</strong> depends largely on your group size. 
                Here's a realistic cost breakdown for cocktail kits vs individual bottles.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {costComparison.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-gray-200 dark:border-gray-700">
                    <CardHeader className="bg-gray-100 dark:bg-gray-800">
                      <CardTitle className="text-xl text-center">{item.scenario}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-pink-600" />
                          <span className="text-gray-700 dark:text-gray-300">{item.cocktailKits}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wine className="h-5 w-5 text-purple-600" />
                          <span className="text-gray-700 dark:text-gray-300">{item.bottles}</span>
                        </div>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-5 w-5 text-green-600" />
                          <span className="font-bold text-green-800 dark:text-green-300">Winner: {item.winner}</span>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-400">{item.reason}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Strategies */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="strategies-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-200 text-amber-800">Expert Tips</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Smart Bachelorette Party Alcohol Strategies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The best approach often combines cocktail kits and individual bottles. 
                Here are proven strategies for your <strong>bachelorette party cocktails</strong>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {smartStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <strategy.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{strategy.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{strategy.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lake Travis Boat Section */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-blue-200 text-blue-800">Lake Travis Boats</Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Alcohol Strategy by Boat Size
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Your <strong>bachelorette party alcohol</strong> approach should match your boat size. 
                  All our boats are BYOB-friendly (cans and plastic only). Here's our fleet with 
                  <strong> cocktail kit</strong> recommendations:
                </p>
                <div className="space-y-4">
                  {boatFleet.map((boat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">{boat.name}</h3>
                        <Badge variant="outline">{boat.capacity}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{boat.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                  All boats are single-deck pontoons with arch canopy. Clever Girl has additional crew fee for 51-75 guests.
                </p>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage2}
                  alt="Lake Travis bachelorette party boat with cocktails and celebration"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
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
                Common questions about cocktail kits, bachelorette party alcohol, and Lake Travis celebrations.
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
                Continue planning your perfect Lake Travis bachelorette celebration.
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
