import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Shield, Wine, AlertTriangle, CheckCircle2, XCircle, Ship, 
  Calendar, Star, Users, Heart, Sparkles, Info, Scale,
  ArrowRight, Anchor, Package, Beer, GlassWater
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/disco_fun6_1765193453548.jpg';
import sectionImage1 from '@assets/disco_fun7_1765193453548.jpg';
import sectionImage2 from '@assets/disco_fun9_1765193453548.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const trustStats = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const allowedItems = [
  { item: 'Canned Beer', description: 'All types of canned beer are welcome for your Lake Travis bachelorette party', icon: Beer },
  { item: 'Canned Hard Seltzers', description: 'White Claw, Truly, High Noon perfect for austin bachelorette party boats', icon: Sparkles },
  { item: 'Canned Wine', description: 'Babe, Barefoot cans great for bachelorette party Austin celebrations', icon: Wine },
  { item: 'Canned Ranch Water', description: 'Austin\'s favorite drink in can form for Lake Travis bachelorette cruises', icon: GlassWater },
  { item: 'Plastic Bottles', description: 'Plastic wine and liquor bottles allowed for your austin bachelorette party', icon: Package },
  { item: 'Boxed Wine', description: 'Perfect for sharing at your Lake Travis bachelorette gathering', icon: Wine }
];

const prohibitedItems = [
  { item: 'Glass Bottles', reason: 'Safety hazard on boats and at swimming areas on Lake Travis' },
  { item: 'Glass Wine Bottles', reason: 'Must transfer to plastic containers for your bachelorette party Austin boat' },
  { item: 'Glass Liquor Bottles', reason: 'Break easily and create dangerous shards at Lake Travis bachelorette parties' },
  { item: 'Kegs', reason: 'Too heavy and difficult to manage on austin bachelorette party boats' },
  { item: 'Illegal Substances', reason: 'Zero tolerance - your Lake Travis bachelorette captain will return to dock' }
];

const texasBoatLaws = [
  { title: 'Open Container - Legal', description: 'Unlike cars, open containers ARE legal on boats in Texas. Your Lake Travis bachelorette can enjoy drinks openly.', icon: CheckCircle2, color: 'text-green-600' },
  { title: 'Captain Cannot Drink', description: 'Your austin bachelorette party captain must remain sober (0.08 BAC limit applies)', icon: Shield, color: 'text-blue-600' },
  { title: 'No Underage Drinking', description: 'Texas law applies on Lake Travis - 21+ only for alcohol at your bachelorette party Austin', icon: Scale, color: 'text-amber-600' },
  { title: 'BWI Laws Apply', description: 'Boating While Intoxicated laws protect everyone at Lake Travis bachelorette events', icon: AlertTriangle, color: 'text-red-600' }
];

const partyOnDeliveryBenefits = [
  { title: 'Pre-Stocked & Iced', description: 'Your Lake Travis bachelorette beverages arrive ready to go' },
  { title: 'Compliant Containers', description: 'Everything in boat-legal cans and plastic for your austin bachelorette party' },
  { title: 'No Store Runs', description: 'Skip the hassle before your bachelorette party Austin cruise' },
  { title: 'Variety Packs', description: 'Curated selections perfect for Lake Travis bachelorette groups' }
];

const fleetOptions = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Intimate Lake Travis bachelorette group' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Perfect mid-size bachelorette party Austin' },
  { name: 'The Irony', capacity: '30 guests', description: 'Popular austin bachelorette party choice' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Large Lake Travis bachelorette (add\'l crew fee for 51-75)' }
];

const packingChecklist = [
  { category: 'Beverages', items: ['Canned beers/seltzers', 'Boxed or canned wine', 'Plastic bottle spirits', 'Non-alcoholic options'] },
  { category: 'Mixers & Extras', items: ['Plastic cups (we provide some)', 'Mixers in plastic bottles', 'Garnishes in containers', 'Straws and stirrers'] },
  { category: 'Don\'t Forget', items: ['Cooler bags for overflow', 'Extra ice (we provide base)', 'Snacks and food', 'Sunscreen and towels'] }
];

const faqs = [
  {
    question: 'Can we bring alcohol on a Lake Travis bachelorette boat?',
    answer: 'Yes! All our Lake Travis bachelorette cruises are BYOB (bring your own beverages). You can bring beer, wine, seltzers, and spirits for your austin bachelorette party. The key rule is NO GLASS - everything must be in cans or plastic containers. Party On Delivery can handle all purchasing and deliver compliant beverages iced and ready for your bachelorette party Austin.'
  },
  {
    question: 'What alcohol containers are banned on Lake Travis bachelorette boats?',
    answer: 'Glass containers of any kind are prohibited on Lake Travis bachelorette boats. This includes glass wine bottles, glass liquor bottles, and any glass jars. For your austin bachelorette party, transfer wine to plastic containers or buy canned wine. Liquor should be in plastic bottles only. This protects everyone at your bachelorette party Austin from broken glass injuries.'
  },
  {
    question: 'Is it legal to drink openly on a boat during our Lake Travis bachelorette?',
    answer: 'Yes! Unlike in vehicles, open containers are completely legal on boats in Texas. Your Lake Travis bachelorette party can enjoy drinks openly during the cruise. However, the captain must remain sober (below 0.08 BAC). BWI (Boating While Intoxicated) laws protect your austin bachelorette party by ensuring safe operation.'
  },
  {
    question: 'How much alcohol should we bring for a Lake Travis bachelorette cruise?',
    answer: 'For a 3-4 hour Lake Travis bachelorette cruise, plan for 3-4 drinks per person. So for 15 guests at your austin bachelorette party, that\'s roughly 50-60 drinks. Include a variety - seltzers, beer, wine, and some spirits for mixed drinks. Party On Delivery can help calculate the perfect amount for your bachelorette party Austin.'
  },
  {
    question: 'What happens if someone brings glass to our austin bachelorette party boat?',
    answer: 'If glass is discovered before departure on your Lake Travis bachelorette cruise, we\'ll ask you to transfer contents to provided plastic cups. Glass cannot remain on board for safety reasons. To avoid issues at your austin bachelorette party, use Party On Delivery who only provides compliant containers for your bachelorette party Austin.'
  },
  {
    question: 'Are there any alcohol quantity limits for Lake Travis bachelorette boats?',
    answer: 'There\'s no strict limit on quantity for your Lake Travis bachelorette party - bring what you\'ll reasonably consume. We do encourage responsible drinking at every austin bachelorette party. Our captains reserve the right to return to dock if behavior becomes unsafe. The goal is everyone enjoying a memorable bachelorette party Austin safely.'
  },
  {
    question: 'Can Party On Delivery help with Lake Travis bachelorette alcohol laws compliance?',
    answer: 'Absolutely! Party On Delivery specializes in austin bachelorette party beverage coordination. They only supply boat-legal containers (cans, plastic) for your Lake Travis bachelorette. Everything arrives iced and ready, eliminating the hassle of figuring out what you can and can\'t bring to your bachelorette party Austin.'
  },
  {
    question: 'What about swimming and drinking at our Lake Travis bachelorette?',
    answer: 'Swimming is encouraged at Lake Travis bachelorette parties - we stop at beautiful coves! However, use common sense with alcohol and swimming at your austin bachelorette party. Our captain monitors conditions and may limit swimming if conditions aren\'t safe. Life jackets are always available for your bachelorette party Austin guests.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get Your Quote', icon: Calendar }
];

export default function LakeTravisBacheloretteAlcoholLaws() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Bachelorette Party Alcohol Laws | What You Can Bring on Boats | Premier Party Cruises</title>
        <meta name="description" content="Know the rules for your Lake Travis bachelorette party. Complete guide to alcohol laws on austin bachelorette party boats - what you CAN and CAN'T bring. No glass policy, BYOB rules, and Party On Delivery options for your bachelorette party Austin." />
        <meta name="keywords" content="Lake Travis bachelorette, austin bachelorette party, bachelorette party Austin, Lake Travis alcohol laws, boat party alcohol rules, austin bachelorette party boats, Lake Travis bachelorette BYOB" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats" />
        <meta property="og:title" content="Lake Travis Bachelorette Party Alcohol Laws | What You Can Bring on Boats" />
        <meta property="og:description" content="Complete guide to alcohol rules for your austin bachelorette party boat cruise on Lake Travis." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-bachelorette-alcohol-laws-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-700 via-pink-600 to-rose-600 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis bachelorette party group with legal canned beverages on boat"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              KNOW THE RULES
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Bachelorette<br />
              <span className="text-pink-300">Alcohol Laws & Rules</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              What you CAN and CAN'T bring on boats for your austin bachelorette party. 
              Complete guide to BYOB rules, container restrictions, and Texas boating laws for your bachelorette party Austin.
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
                className="border-white text-white hover:bg-white hover:text-purple-900 font-semibold"
                data-testid="button-get-quote"
              >
                <Link href="/quote">Get Custom Quote</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Trust Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustStats.map((item, index) => (
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
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="summary-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="summary-title">The #1 Rule for Your Lake Travis Bachelorette</h2>
              <div className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 p-6 rounded-2xl max-w-2xl mx-auto">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-600 mb-2">NO GLASS ALLOWED</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The most important rule for your austin bachelorette party boat cruise - absolutely no glass containers. 
                  This keeps everyone safe at your bachelorette party Austin celebration on Lake Travis.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Allowed Items */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900" data-testid="allowed-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-500 text-white">✓ ALLOWED</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="allowed-title">What You CAN Bring to Your Lake Travis Bachelorette</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything in cans or plastic is welcome for your austin bachelorette party
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {allowedItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-green-500" data-testid={`allowed-item-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{item.item}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Prohibited Items */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="prohibited-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-red-500 text-white">✗ PROHIBITED</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="prohibited-title">What You CAN'T Bring to Your Bachelorette Party Austin Boat</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Leave these at home for your Lake Travis bachelorette safety
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {prohibitedItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20" data-testid={`prohibited-item-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-red-700 dark:text-red-400">{item.item}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Texas Boat Laws */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white" data-testid="laws-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="laws-title">Texas Boating Laws for Your Austin Bachelorette Party</h2>
              <p className="text-xl text-blue-100">
                Know your rights and responsibilities for a safe Lake Travis bachelorette
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {texasBoatLaws.map((law, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full bg-white/10 backdrop-blur border-white/20" data-testid={`law-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <law.icon className={`h-8 w-8 flex-shrink-0 ${law.color}`} />
                        <div>
                          <h3 className="font-bold text-lg mb-2">{law.title}</h3>
                          <p className="text-blue-100">{law.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Party On Delivery */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="pod-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <Badge className="mb-4 bg-pink-100 text-pink-700">EASY SOLUTION</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="pod-title">Let Party On Delivery Handle Your Lake Travis Bachelorette Beverages</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Skip the stress of figuring out what containers are allowed. Party On Delivery provides only 
                  boat-legal beverages for your austin bachelorette party - iced and waiting at the dock.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {partyOnDeliveryBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2" data-testid={`pod-benefit-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm">{benefit.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={sectionImage1}
                  alt="Austin bachelorette party with compliant canned beverages on Lake Travis boat"
                  className="rounded-2xl shadow-xl w-full"
                  data-testid="img-pod"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Packing Checklist */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="checklist-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="checklist-title">Lake Travis Bachelorette Beverage Packing Checklist</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to bring for your bachelorette party Austin boat cruise
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {packingChecklist.map((category, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full" data-testid={`checklist-category-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-lg text-pink-600">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{item}</span>
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

        {/* Fleet Options */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="fleet-title">Choose Your Austin Bachelorette Party Boat</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                All boats are BYOB-friendly for your Lake Travis bachelorette
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {fleetOptions.map((boat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`fleet-${index}`}>
                    <CardContent className="pt-6">
                      <Ship className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-1">{boat.name}</h3>
                      <div className="text-purple-600 font-semibold mb-2">{boat.capacity}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder */}
        <QuoteBuilderSection />

        {/* FAQs */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Lake Travis Bachelorette Alcohol Law FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about alcohol rules for your austin bachelorette party boat
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
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
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Plan Your Complete Lake Travis Bachelorette</h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {internalLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card className="h-full text-center hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-300" data-testid={`link-${index}`}>
                      <CardContent className="pt-6">
                        <link.icon className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                        <h3 className="font-bold">{link.label}</h3>
                        <ArrowRight className="h-5 w-5 mx-auto mt-2 text-gray-400" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="cta-title">
                Book Your Lake Travis Bachelorette Today
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Now that you know the rules, let Party On Delivery handle the beverages for your austin bachelorette party!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-purple-100 font-bold text-lg px-8"
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
                  <Link href="/quote">Get Custom Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
