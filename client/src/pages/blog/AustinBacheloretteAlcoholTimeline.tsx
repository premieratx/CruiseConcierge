import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Clock, Wine, Sun, Moon, Coffee, Utensils, Ship, 
  Calendar, Star, Users, Heart, Sparkles, CheckCircle2,
  ArrowRight, MapPin, PartyPopper, GlassWater, Beer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/disco_fun_best2_1765193453547.jpg';
import sectionImage1 from '@assets/disco_fun3_1765193453547.jpg';
import sectionImage2 from '@assets/disco_fun5_1765193453548.jpg';

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

const dayOneTimeline = [
  { time: '2:00 PM', activity: 'Check-in & Settle', drink: 'Welcome champagne toast', icon: Sparkles, tip: 'Keep it light - hydrate and save energy for the austin bachelorette party weekend ahead' },
  { time: '4:00 PM', activity: 'Pool or Lounge Time', drink: 'Frozen margaritas or ranch water', icon: Sun, tip: 'Pace yourself with one drink per hour during your bachelorette party Austin arrival day' },
  { time: '7:00 PM', activity: 'Group Dinner', drink: 'Wine with dinner', icon: Utensils, tip: 'Eating a solid meal is crucial for your Lake Travis bachelorette drinking strategy' },
  { time: '9:00 PM', activity: 'Rainey Street or 6th Street', drink: '2-3 cocktails max', icon: Moon, tip: 'Set a hard stop time for night one - you have more celebration ahead' }
];

const dayTwoTimeline = [
  { time: '10:00 AM', activity: 'Brunch', drink: 'Hair of the dog mimosas', icon: Coffee, tip: 'The classic austin bachelorette party brunch pairs food with bubbles' },
  { time: '1:00 PM', activity: 'Lake Travis Boat Party', drink: 'Canned seltzers, ranch water', icon: Ship, tip: 'This is your main event! Party On Delivery can stock your bachelorette party Austin boat with ice-cold drinks' },
  { time: '5:00 PM', activity: 'Dock & Refresh', drink: 'Water break', icon: GlassWater, tip: 'Hydration hour before evening festivities for your Lake Travis bachelorette crew' },
  { time: '8:00 PM', activity: 'Downtown Austin', drink: 'Specialty cocktails', icon: PartyPopper, tip: 'Peak celebration night for the bachelorette party Austin experience' }
];

const dayThreeTimeline = [
  { time: '10:00 AM', activity: 'Recovery Brunch', drink: 'Bloody Marys or virgin options', icon: Coffee, tip: 'Gentle start to the final austin bachelorette party day' },
  { time: '12:00 PM', activity: 'Spa or Pool', drink: 'Infused water, light rose', icon: Sun, tip: 'Recovery mode for the Lake Travis bachelorette crew' },
  { time: '3:00 PM', activity: 'Farewell Gathering', drink: 'Champagne toast', icon: Heart, tip: 'End your bachelorette party Austin with one final celebratory moment' }
];

const hydrationTips = [
  { icon: GlassWater, title: 'Water Between Drinks', description: 'One glass of water between each alcoholic beverage keeps your austin bachelorette party fun and safe' },
  { icon: Utensils, title: 'Never Drink on Empty', description: 'Plan meals around your drinking schedule for your bachelorette party Austin weekend' },
  { icon: Clock, title: 'Pace Yourself', description: 'One drink per hour maximum during your Lake Travis bachelorette boat cruise' },
  { icon: Coffee, title: 'Electrolytes Ready', description: 'Pack Liquid IV or Pedialyte for austin bachelorette party recovery' }
];

const boatDrinkingTips = [
  { title: 'BYOB Smartly', description: 'Cans and plastic only for your Lake Travis bachelorette - no glass allowed on boats' },
  { title: 'Pre-Order with Party On Delivery', description: 'Skip the store run - Party On Delivery stocks your bachelorette party Austin boat with ice-cold beverages' },
  { title: 'Mix Alcohol and Swimming Carefully', description: 'Designate water time vs. drinking time on your austin bachelorette party cruise' },
  { title: 'Snacks Are Essential', description: 'Bring plenty of snacks to keep energy up during your Lake Travis bachelorette adventure' }
];

const fleetOptions = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Intimate Lake Travis bachelorette group' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Perfect mid-size bachelorette party Austin' },
  { name: 'The Irony', capacity: '30 guests', description: 'Popular austin bachelorette party choice' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Large Lake Travis bachelorette (add\'l crew fee for 51-75)' }
];

const faqs = [
  {
    question: 'How should we pace alcohol during a 3-day austin bachelorette party?',
    answer: 'For a 3-day austin bachelorette party, think of it as a marathon, not a sprint. Day one should be light (arrival drinks, dinner wine, maybe one bar). Day two is your peak celebration day with the Lake Travis bachelorette boat party as the centerpiece. Day three should be recovery-focused with optional light drinking at brunch. This pacing ensures everyone enjoys the full bachelorette party Austin experience without burning out.'
  },
  {
    question: 'What drinks work best for a Lake Travis bachelorette boat party?',
    answer: 'For your Lake Travis bachelorette boat cruise, stick to canned beverages like hard seltzers, canned wine, and ranch water (no glass allowed). Party On Delivery can coordinate all your bachelorette party Austin boat beverages and have them iced and ready at the dock. Light, refreshing drinks work best in the Texas sun - save the heavy cocktails for evening activities.'
  },
  {
    question: 'How much alcohol should we bring for an austin bachelorette party weekend?',
    answer: 'A good rule for an austin bachelorette party is 2-3 drinks per person per activity session. For a Lake Travis bachelorette boat party (3-4 hours), plan about 3-4 drinks per person. For evening outings, budget 2-3 drinks per bar. Party On Delivery can help you calculate exactly what you need for your bachelorette party Austin and deliver it ready to go.'
  },
  {
    question: 'What are the best recovery strategies during a bachelorette party Austin?',
    answer: 'Smart recovery during your bachelorette party Austin includes: electrolyte drinks (Liquid IV, Pedialyte) every morning, substantial meals before drinking, water between every alcoholic drink, and scheduled rest time. For your Lake Travis bachelorette, bring electrolytes to the boat too. Taking care of yourselves ensures the whole austin bachelorette party stays fun.'
  },
  {
    question: 'Can we bring alcohol on the boat for our Lake Travis bachelorette?',
    answer: 'Yes! All our Lake Travis bachelorette boat cruises are BYOB - bring your own beverages in cans and plastic containers (no glass). Party On Delivery makes your bachelorette party Austin even easier by purchasing, icing, and delivering all beverages right to the dock. You arrive to a fully stocked boat for your austin bachelorette party.'
  },
  {
    question: 'What time should we start drinking during our austin bachelorette party boat cruise?',
    answer: 'For a Lake Travis bachelorette cruise, we recommend starting about 30 minutes into the cruise once everyone is settled and safety briefing is complete. If you have a morning cruise, lighter drinks like mimosas work well. Afternoon bachelorette party Austin cruises pair great with seltzers and ranch water. Sunset cruises can start with rosé or cocktails.'
  },
  {
    question: 'How do we handle different alcohol tolerances in our Lake Travis bachelorette group?',
    answer: 'Every Lake Travis bachelorette group has different tolerance levels. Stock a variety of options including non-alcoholic seltzers and mocktails. Nobody should feel pressured. Party On Delivery can include a mix of alcoholic and non-alcoholic options for your bachelorette party Austin celebration. The goal is everyone having fun at the austin bachelorette party.'
  },
  {
    question: 'What drinking mistakes should we avoid during our bachelorette party Austin?',
    answer: 'Common austin bachelorette party mistakes: going too hard on night one, not eating enough, skipping water, and not planning the Lake Travis bachelorette boat party around peak drinking hours. Avoid drinking in the hottest part of the day on the boat. Don\'t save all your energy for the last night. Pace your bachelorette party Austin to enjoy every moment.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get Your Quote', icon: Calendar }
];

export default function AustinBacheloretteAlcoholTimeline() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Austin Bachelorette Weekend Alcohol Timeline | Day-by-Day Drinking Strategy | Premier Party Cruises</title>
        <meta name="description" content="Plan your austin bachelorette party drinking schedule with our day-by-day timeline. Smart strategies for a 3-day bachelorette party Austin weekend including Lake Travis bachelorette boat party tips. Pace yourself for maximum fun." />
        <meta name="keywords" content="austin bachelorette party, bachelorette party Austin, Lake Travis bachelorette, austin bachelorette party drinks, bachelorette weekend drinking timeline, austin bachelorette boat party alcohol" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations" />
        <meta property="og:title" content="Austin Bachelorette Weekend Alcohol Timeline | Day-by-Day Drinking Strategy" />
        <meta property="og:description" content="Smart drinking strategies for your 3-day austin bachelorette party including Lake Travis boat party tips." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="austin-bachelorette-alcohol-timeline-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Austin bachelorette party group celebrating on Lake Travis boat with drinks"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-pink-400 text-black font-bold" data-testid="badge-hero">
              MULTI-DAY CELEBRATION GUIDE
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Austin Bachelorette Weekend<br />
              <span className="text-pink-300">Alcohol Timeline</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Your day-by-day drinking strategy for a multi-day bachelorette party Austin celebration. 
              Smart pacing tips including Lake Travis bachelorette boat party drink planning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-book-cruise"
              >
                <Link href="/bachelorette-party-austin">Book Your Bachelorette Cruise</Link>
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
                  <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Day 1 Timeline */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="day-one-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">DAY 1</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="day-one-title">Arrival Day - Ease Into It</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Your austin bachelorette party marathon starts with a smart pace
              </p>
            </motion.div>

            <div className="space-y-6">
              {dayOneTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="hover:shadow-lg transition-shadow" data-testid={`day-one-item-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-4 md:w-1/4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <item.icon className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-bold text-purple-600">{item.time}</div>
                            <div className="font-semibold">{item.activity}</div>
                          </div>
                        </div>
                        <div className="md:w-1/4">
                          <span className="text-sm text-gray-500">Drink:</span>
                          <div className="font-medium">{item.drink}</div>
                        </div>
                        <div className="md:w-1/2 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                          <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Pro Tip:</span>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{item.tip}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Day 2 Timeline - Main Event */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="day-two-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-500 text-white">DAY 2 - THE MAIN EVENT</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="day-two-title">Lake Travis Bachelorette Boat Day</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The centerpiece of your bachelorette party Austin - pace for the full experience
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="space-y-6">
                {dayTwoTimeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                  >
                    <Card className="hover:shadow-lg transition-shadow border-l-4 border-pink-500" data-testid={`day-two-item-${index}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-5 w-5 text-pink-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-pink-600">{item.time}</span>
                              <span className="font-semibold">{item.activity}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">🍹 {item.drink}</div>
                            <p className="text-sm bg-pink-50 dark:bg-pink-900/20 p-2 rounded">{item.tip}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div>
                <img 
                  src={sectionImage1}
                  alt="Bachelorette party Austin group enjoying drinks on Lake Travis boat cruise"
                  className="rounded-2xl shadow-xl w-full"
                  data-testid="img-day-two"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Day 3 Timeline */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="day-three-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">DAY 3</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="day-three-title">Recovery & Farewell</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Wind down your austin bachelorette party gracefully
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {dayThreeTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`day-three-item-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="font-bold text-green-600 mb-1">{item.time}</div>
                      <h3 className="font-bold text-lg mb-2">{item.activity}</h3>
                      <div className="text-gray-600 dark:text-gray-400 mb-3">🍹 {item.drink}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.tip}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hydration Tips */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white" data-testid="hydration-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="hydration-title">Hydration = Happy Bachelorette Party Austin</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                The secret to enjoying every moment of your Lake Travis bachelorette weekend
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {hydrationTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                  data-testid={`hydration-tip-${index}`}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-blue-100 text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Drinking Tips */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="boat-tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <Badge className="mb-4 bg-pink-100 text-pink-700">BOAT PARTY TIPS</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="boat-tips-title">Lake Travis Bachelorette Boat Drinking Guide</h2>
                <div className="space-y-4">
                  {boatDrinkingTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3" data-testid={`boat-tip-${index}`}>
                      <CheckCircle2 className="h-6 w-6 text-pink-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold">{tip.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={sectionImage2}
                  alt="Lake Travis bachelorette party with beverages and floats on private boat rental"
                  className="rounded-2xl shadow-xl w-full"
                  data-testid="img-boat-tips"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fleet Options */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="fleet-section">
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
                Our Lake Travis bachelorette fleet for every group size
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
                      <Ship className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-1">{boat.name}</h3>
                      <div className="text-pink-600 font-semibold mb-2">{boat.capacity}</div>
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
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Austin Bachelorette Party Alcohol FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about drinking during your bachelorette party Austin weekend
              </p>
            </motion.div>

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
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Plan Your Complete Austin Bachelorette Party</h2>
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
                    <Card className="h-full text-center hover:shadow-lg transition-shadow cursor-pointer hover:border-pink-300" data-testid={`link-${index}`}>
                      <CardContent className="pt-6">
                        <link.icon className="h-10 w-10 text-pink-500 mx-auto mb-3" />
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
        <section className="py-16 bg-gradient-to-br from-pink-600 to-purple-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="cta-title">
                Ready to Plan Your Austin Bachelorette Party?
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Book your Lake Travis bachelorette boat cruise today. Party On Delivery can handle all your beverage coordination!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-pink-600 hover:bg-pink-100 font-bold text-lg px-8"
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
