import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Gift, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Wine, Sparkles, Shield,
  Music, Mic, Ticket, PartyPopper, Heart, Anchor, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-14_1760080740020.jpg';
import sectionImage1 from '@assets/@capitalcityshots-15_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-17_1760080740020.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const austinEvents = [
  {
    name: 'SXSW',
    icon: Mic,
    description: 'Conference after party alcohol coordination for South by Southwest - Austin\'s premier tech, film, and music festival',
    timing: 'March',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  {
    name: 'ACL Festival',
    icon: Music,
    description: 'Austin event integration for Austin City Limits - the iconic music festival demanding premium after party experiences',
    timing: 'October',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    name: 'F1 Grand Prix',
    icon: Zap,
    description: 'Conference after party alcohol service for Formula 1 - global VIP clientele expect exceptional Austin celebrations',
    timing: 'October/November',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    name: 'Corporate Conferences',
    icon: Building2,
    description: 'Year-round Austin event integration for trade shows, conventions, and business conferences at the Convention Center',
    timing: 'Year-round',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const coordinationStrategies = [
  {
    title: 'Venue Exclusivity',
    description: 'Lake Travis boats offer private conference after party alcohol experiences away from crowded downtown venues'
  },
  {
    title: 'Transportation Logistics',
    description: 'Coordinate shuttles from convention centers for seamless Austin event integration with after party destinations'
  },
  {
    title: 'Timing Optimization',
    description: 'Conference after party alcohol service timed perfectly after keynotes, panels, or festival performances'
  },
  {
    title: 'Brand Activation',
    description: 'Customize your Austin event integration with branded elements, themed drinks, and memorable experiences'
  }
];

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    best: 'VIP speaker dinners',
    description: 'Intimate conference after party alcohol coordination for executive guests on single-deck pontoon with arch canopy'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    best: 'Sponsor events',
    description: 'Mid-size Austin event integration for sponsor appreciation and client entertainment'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    best: 'Team celebrations',
    description: 'Perfect for conference after party alcohol service with exhibitor teams and partners'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    best: 'Large after parties',
    description: 'Flagship vessel for major Austin event integration (add\'l crew fee for 51-75 guests)'
  }
];

const sxswIntegration = [
  'Interactive badges and downtown pickup coordination',
  'Conference after party alcohol themes matching your booth or brand',
  'Sunset timing aligned with daily schedules',
  'Photo opportunities for social media amplification',
  'Premium beverage selections for tech-forward audiences'
];

const aclIntegration = [
  'Festival wristband coordination with Lake Travis transportation',
  'Austin event integration with VIP viewing party vibes',
  'Conference after party alcohol that extends the music experience',
  'Artist meet-and-greet potential for sponsors',
  'Zilker Park shuttle connections available'
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'How do you coordinate conference after party alcohol for SXSW events?',
    answer: 'Our SXSW conference after party alcohol coordination includes downtown pickup logistics, timing with keynotes or showcases, and premium beverage packages that appeal to tech-savvy attendees. We handle Austin event integration so you can focus on networking and celebrating.'
  },
  {
    question: 'Can you provide transportation from ACL for Austin event integration?',
    answer: 'Yes! Our ACL Austin event integration includes coordination with transportation services from Zilker Park to Lake Travis. Conference after party alcohol service can begin immediately upon boarding, extending the festival energy onto the water.'
  },
  {
    question: 'What beverages work best for conference after party alcohol coordination?',
    answer: 'For conference after party alcohol, we recommend a mix of craft beers, signature cocktails, and premium wines. SXSW crowds appreciate local Austin brewery selections, while Austin event integration for corporate clients often features curated wine and champagne.'
  },
  {
    question: 'How far in advance should we book for SXSW or ACL after parties?',
    answer: 'Conference after party alcohol bookings for SXSW and ACL should be made 2-3 months in advance. These peak Austin event integration periods book quickly. F1 weekend requires even earlier planning for premium conference after party experiences.'
  },
  {
    question: 'Can we brand the boat for our conference after party?',
    answer: 'Absolutely! Austin event integration includes custom branding options for your conference after party alcohol experience. Add banners, branded cups, themed decorations, and custom playlists to extend your conference presence onto Lake Travis.'
  },
  {
    question: 'What capacity works best for SXSW conference after party alcohol events?',
    answer: 'SXSW conference after party alcohol events typically work best on our 25-75 guest vessels. The Meeseeks (25) is ideal for sponsor dinners, while Clever Girl (50-75) accommodates larger Austin event integration parties. We help match your guest count to the perfect boat.'
  },
  {
    question: 'How does conference after party alcohol service work on BYOB boats?',
    answer: 'Our BYOB policy gives you control over conference after party alcohol selection. We coordinate with Party On Delivery for Austin event integration, ensuring your preferred beverages are iced and ready when your conference guests arrive at the dock.'
  },
  {
    question: 'Can you accommodate last-minute Austin event integration requests?',
    answer: 'While advance booking is recommended for conference after party alcohol during major events, we occasionally have availability for last-minute Austin event integration. Contact us directly to check current options for your conference after party needs.'
  }
];

const internalLinks = [
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/blogs/company-holiday-party-lake-travis', label: 'Holiday Party Guide', icon: Gift },
  { href: '/blogs/austin-party-venue-alcohol-delivery', label: 'Alcohol Delivery Guide', icon: Wine },
  { href: '/quote', label: 'Get a Quote', icon: Calendar }
];

export default function ConferenceAfterPartyAlcohol() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Conference After Party Alcohol Coordination: SXSW, ACL & Austin Event Integration | Premier Party Cruises</title>
        <meta name="description" content="Master conference after party alcohol coordination for SXSW, ACL, and Austin events. Expert Austin event integration for corporate gatherings on Lake Travis. BYOB boats for 14-75 guests." />
        <meta name="keywords" content="conference after party alcohol, SXSW after party, ACL after party, Austin event integration, conference after party coordination, Austin conference parties, SXSW boat party, Lake Travis conference events" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration" />
        <meta property="og:title" content="Conference After Party Alcohol Coordination: SXSW, ACL & Austin Event Integration" />
        <meta property="og:description" content="Master conference after party alcohol coordination for SXSW, ACL, and Austin events. Expert Austin event integration on Lake Travis." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-14_1760080740020.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="conference-after-party-alcohol-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Conference after party alcohol coordination on Lake Travis for SXSW and ACL Austin event integration"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-purple-400 text-black font-bold" data-testid="badge-hero">
              <Ticket className="mr-1 h-4 w-4" />
              SXSW • ACL • Austin Events
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Conference After Party Alcohol Coordination<br />
              <span className="text-purple-400">SXSW, ACL & Austin Event Integration</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Elevate your conference after party alcohol experience with seamless Austin event integration. From SXSW tech mixers to ACL music celebrations, create unforgettable moments on Lake Travis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg px-8"
                data-testid="button-plan-after-party"
              >
                <Link href="/quote">Plan Your After Party</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-900 font-semibold"
                data-testid="button-view-options"
              >
                <Link href="/corporate-events">View Corporate Options</Link>
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

        {/* Austin Events Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="events-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Austin Event Integration for Major Conferences
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Premier Party Cruises provides expert conference after party alcohol coordination for Austin's biggest events, from SXSW to ACL and beyond.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {austinEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`card-event-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${event.bg} rounded-full flex items-center justify-center`}>
                        <event.icon className={`h-8 w-8 ${event.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{event.name}</h3>
                      <p className="text-sm text-purple-600 font-semibold mb-2">{event.timing}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SXSW Integration Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900" data-testid="sxsw-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-red-100 text-red-700">SXSW INTEGRATION</Badge>
                <h2 className="text-3xl font-bold mb-6">Conference After Party Alcohol for SXSW</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  SXSW brings the world's innovators to Austin. Stand out with conference after party alcohol experiences that 
                  take networking beyond the convention center onto beautiful Lake Travis.
                </p>
                
                <div className="space-y-3">
                  {sxswIntegration.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start" data-testid={`sxsw-feature-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
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
                    alt="SXSW conference after party alcohol coordination on Lake Travis boat for Austin event integration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ACL Integration Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900" data-testid="acl-section">
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
                    alt="ACL Festival Austin event integration with conference after party alcohol service on Lake Travis"
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
                <Badge className="mb-4 bg-green-100 text-green-700">ACL INTEGRATION</Badge>
                <h2 className="text-3xl font-bold mb-6">Austin Event Integration for ACL Festival</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Austin City Limits draws music lovers worldwide. Extend the festival energy with conference after party alcohol 
                  experiences that offer VIP exclusivity and stunning Lake Travis sunsets.
                </p>
                
                <div className="space-y-3">
                  {aclIntegration.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start" data-testid={`acl-feature-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Coordination Strategies */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="strategies-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Conference After Party Alcohol Coordination Strategies</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our Austin event integration expertise ensures flawless conference after party experiences.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coordinationStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-strategy-${index}`}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2">{strategy.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{strategy.description}</p>
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
              <h2 className="text-3xl font-bold mb-4">Choose Your Conference After Party Venue</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All boats are single-deck pontoons with arch canopy, perfect for Austin event integration.
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

        {/* Image Section */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={sectionImage3}
                alt="Conference after party alcohol coordination success with SXSW and ACL Austin event integration on Lake Travis"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Conference After Party Alcohol FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about SXSW, ACL, and Austin event integration.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border"
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
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Event Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover our complete range of corporate and conference after party services.
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
