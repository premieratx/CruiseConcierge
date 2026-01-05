import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Wine, Phone, Clock, CheckCircle2, 
  MapPin, Calendar, Star, ArrowRight, Building2, 
  Heart, Truck, Shield, Package, Sparkles, AlertTriangle,
  FileCheck, Utensils, PartyPopper, Home, TreePine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage1 from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage2 from '@assets/@capitalcityshots-23_1760080807865.jpg';
import sectionImage3 from '@assets/@capitalcityshots-24_1760080807866.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const venueTypes = [
  {
    icon: Building2,
    title: 'Hotel & Resort Venues',
    description: 'Austin wedding venue alcohol policies at hotels often require using in-house catering',
    policies: ['Must use venue bar service', 'Corkage fees may apply', 'Limited outside alcohol', 'Package pricing available'],
    solution: 'Our wedding alcohol delivery Austin service coordinates with hotel staff for seamless integration'
  },
  {
    icon: TreePine,
    title: 'Hill Country Ranches',
    description: 'Flexible wedding venue alcohol policies Austin at rustic ranch locations',
    policies: ['BYOB often allowed', 'Bartender requirements vary', 'Permit may be needed', 'Delivery coordination required'],
    solution: 'Austin wedding alcohol delivery directly to venue with full setup assistance'
  },
  {
    icon: Home,
    title: 'Private Estates',
    description: 'Most flexible Austin wedding venue alcohol policies for private property celebrations',
    policies: ['Full BYOB freedom', 'Host provides bartenders', 'No corkage fees', 'Flexible timing'],
    solution: 'Complete wedding alcohol delivery Austin with quantity guidance and ice/cooler service'
  },
  {
    icon: Ship,
    title: 'Lake Travis Boat Cruises',
    description: 'Unique wedding venue alcohol policies Austin on the water',
    policies: ['BYOB friendly (cans/plastic)', 'No glass containers', 'Coolers provided', 'Captain handles navigation'],
    solution: 'Party On Delivery brings wedding alcohol delivery Austin directly to your dock'
  }
];

const deliveryBenefits = [
  { icon: Truck, title: 'Dock-Side Delivery', description: 'Wedding alcohol delivery Austin right to your venue or marina' },
  { icon: Package, title: 'Iced & Ready', description: 'Beverages arrive chilled with ice for immediate serving' },
  { icon: FileCheck, title: 'Quantity Planning', description: 'Expert guidance on how much to order for your guest count' },
  { icon: Clock, title: 'Flexible Timing', description: 'Schedule delivery to arrive before your event starts' }
];

const boatOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Intimate wedding parties', description: 'Single-deck pontoon with arch canopy' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Small wedding receptions', description: 'Single-deck pontoon with arch canopy' },
  { name: 'The Irony', capacity: '30 guests', best: 'Wedding party cruises', description: 'Single-deck pontoon with arch canopy' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Large wedding celebrations', description: 'Single-deck pontoon with arch canopy (add\'l crew fee for 51-75)' }
];

const policyChecklist = [
  'Confirm if outside alcohol is permitted at your Austin wedding venue',
  'Ask about corkage fees and bartender requirements',
  'Verify if you need a temporary alcohol permit',
  'Check wedding venue alcohol policies Austin for serving cut-off times',
  'Confirm delivery access points and timing windows',
  'Review liability and insurance requirements',
  'Ask about leftover alcohol storage or removal policies'
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What are typical Austin wedding venue alcohol policies?',
    answer: 'Austin wedding venue alcohol policies vary significantly by location. Hotels and resorts typically require using their bar service. Hill Country ranches often allow BYOB with bartender requirements. Private estates offer the most flexibility. Lake Travis boat cruises are BYOB-friendly with cans and plastic only. Always confirm wedding venue alcohol policies Austin before booking.'
  },
  {
    question: 'How does wedding alcohol delivery Austin work with different venues?',
    answer: 'Our wedding alcohol delivery Austin service adapts to each venue type. For hotels, we coordinate with their receiving department. For ranches and estates, we deliver directly to your designated area. For Lake Travis boat events, Party On Delivery brings everything dockside, iced and ready. We handle wedding venue alcohol policies Austin coordination on your behalf.'
  },
  {
    question: 'Do I need a permit for Austin wedding venue alcohol?',
    answer: 'It depends on your venue and whether you\'re selling or providing alcohol. Most private events where alcohol is provided free don\'t require permits. However, some Austin wedding venue alcohol policies require temporary permits for liability purposes. Venues with their own liquor licenses handle this for you. We can advise on wedding alcohol delivery Austin permit requirements.'
  },
  {
    question: 'What if my venue has strict wedding venue alcohol policies Austin?',
    answer: 'If your venue has restrictive wedding venue alcohol policies Austin, we help you work within their rules. This might mean coordinating with their preferred vendors, handling corkage fee logistics, or timing wedding alcohol delivery Austin to their receiving schedule. Our experience with various Austin venues means we know how to navigate different policies.'
  },
  {
    question: 'How much alcohol should I order for my wedding?',
    answer: 'As a general rule for wedding alcohol delivery Austin: plan for 1-2 drinks per guest per hour for the first hour, then 1 drink per hour after. A 4-hour reception for 100 guests typically needs 300-400 drinks. We help calculate exact quantities based on your guest count, event duration, and wedding venue alcohol policies Austin restrictions.'
  },
  {
    question: 'Can Party On Delivery handle alcohol for Lake Travis wedding events?',
    answer: 'Absolutely! Our wedding alcohol delivery Austin service is perfect for Lake Travis celebrations. We deliver to the marina dock, everything arrives iced and ready. Remember: Lake Travis wedding venue alcohol policies require cans and plastic only - no glass. Our boats provide coolers and ice for the cruise.'
  },
  {
    question: 'What\'s included with your Lake Travis wedding boat packages?',
    answer: 'All Lake Travis wedding cruises include: private charter, professional captain, premium Bluetooth sound system, giant lily pad floats, coolers with ice, and swimming stops. We\'re BYOB-friendly - just follow wedding venue alcohol policies Austin for lake events (cans/plastic only). Wedding alcohol delivery Austin brings everything dockside before departure.'
  },
  {
    question: 'How do Austin wedding venue alcohol policies affect timing?',
    answer: 'Many Austin wedding venue alcohol policies include serving cut-off times (often 12-1 AM). Some require alcohol to be removed or secured after service ends. For wedding alcohol delivery Austin, we recommend delivery 1-2 hours before your event. Lake Travis cruises have flexible timing - your cruise, your schedule.'
  }
];

const internalLinks = [
  { href: '/welcome-party', label: 'Welcome Parties', icon: PartyPopper },
  { href: '/rehearsal-dinner', label: 'Rehearsal Dinners', icon: Utensils },
  { href: '/after-party', label: 'After Parties', icon: Sparkles },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/contact', label: 'Contact Us', icon: Phone }
];

export default function AustinWeddingVenueAlcohol() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Austin Wedding Venue Alcohol Policies & Delivery Solutions | Premier Party Cruises</title>
        <meta name="description" content="Navigate Austin wedding venue alcohol policies with confidence. Wedding alcohol delivery Austin service for every location - hotels, ranches, estates, and Lake Travis boats. Expert guidance on permits, quantities, and coordination." />
        <meta name="keywords" content="Austin wedding venue alcohol policies, wedding alcohol delivery Austin, wedding venue alcohol policies Austin, Austin wedding alcohol, Lake Travis wedding alcohol, wedding drink delivery Austin, wedding beverage service Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location" />
        <meta property="og:title" content="Austin Wedding Venue Alcohol Policies & Delivery Solutions" />
        <meta property="og:description" content="Navigate Austin wedding venue alcohol policies with confidence. Wedding alcohol delivery Austin for hotels, ranches, estates, and Lake Travis boats." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="austin-wedding-venue-alcohol-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-rose-900 via-pink-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Austin wedding venue celebration with guests enjoying drinks on Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-rose-400 text-black font-bold" data-testid="badge-hero">
              Wedding Alcohol Solutions for Every Venue
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Austin Wedding Venue Alcohol Policies<br />
              <span className="text-rose-300">& Delivery Solutions for Every Location</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Navigate Austin wedding venue alcohol policies with confidence. Our wedding alcohol delivery Austin service works with hotels, ranches, estates, and Lake Travis boat venues to ensure your celebration flows perfectly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/quote">Plan Your Wedding Celebration</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-rose-900 font-semibold"
                data-testid="button-view-options"
              >
                <Link href="/private-cruises">View Lake Travis Options</Link>
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
                  <div className="text-3xl md:text-4xl font-bold text-rose-600 dark:text-rose-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue Types Section */}
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
                Understanding Austin Wedding Venue Alcohol Policies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every venue type has different wedding venue alcohol policies Austin couples need to navigate. Here's what to expect and how our wedding alcohol delivery Austin service adapts to each.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {venueTypes.map((venue, index) => (
                <motion.div
                  key={venue.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`venue-card-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-100 dark:bg-rose-900 rounded-lg">
                          <venue.icon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                        </div>
                        <CardTitle className="text-xl">{venue.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{venue.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">Typical Policies:</h4>
                        <ul className="space-y-1">
                          {venue.policies.map((policy, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-rose-500 flex-shrink-0" />
                              {policy}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                        <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                          <strong>Our Solution:</strong> {venue.solution}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 1 */}
        <section className="py-16 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800" data-testid="image-section-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-rose-100 text-rose-700">WEDDING ALCOHOL DELIVERY AUSTIN</Badge>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Seamless Wedding Alcohol Delivery Austin Service
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Don't let Austin wedding venue alcohol policies stress you out. Our wedding alcohol delivery Austin service handles the logistics so you can focus on your celebration. From quantity planning to dock-side delivery, we make it easy.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {deliveryBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 dark:bg-rose-900 rounded-lg">
                        <benefit.icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{benefit.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src={sectionImage1} 
                  alt="Wedding alcohol delivery Austin - beverages ready for Lake Travis wedding celebration" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Policy Checklist Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="checklist-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img 
                  src={sectionImage2} 
                  alt="Austin wedding venue alcohol policies - couples planning their celebration" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <Badge className="mb-4 bg-rose-100 text-rose-700">PLANNING CHECKLIST</Badge>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Austin Wedding Venue Alcohol Policies Checklist
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Before finalizing your wedding alcohol delivery Austin plans, confirm these details with your venue to avoid surprises.
                </p>
                <ul className="space-y-3">
                  {policyChecklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lake Travis Boat Options */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-cyan-800 to-slate-900 text-white" data-testid="boat-options-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-400 text-black font-bold">LAKE TRAVIS WEDDING CRUISES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Lake Travis Wedding Venue Alcohol Policies Made Easy
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Our Lake Travis boats offer the most flexible wedding venue alcohol policies Austin has to offer. BYOB-friendly with wedding alcohol delivery Austin right to your dock.
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
                <Link href="/private-cruises">Explore Our Wedding Fleet</Link>
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
                Austin Wedding Venue Alcohol Policies FAQ
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about wedding venue alcohol policies Austin and our wedding alcohol delivery Austin service.
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
                From rehearsal dinners to after parties, we help with wedding alcohol delivery Austin for every event.
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
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer hover:border-rose-300" data-testid={`link-card-${index}`}>
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-rose-600 dark:text-rose-400" />
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
        <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan Your Wedding Celebration?
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Let us handle the Austin wedding venue alcohol policies navigation. Get a custom quote for your wedding alcohol delivery Austin needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-rose-600 hover:bg-gray-100 font-bold text-lg px-8"
                data-testid="button-cta-quote"
              >
                <Link href="/quote">Get Your Custom Quote</Link>
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
