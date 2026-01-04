import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Gift, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Wine, Sparkles, Shield,
  Music, Snowflake, PartyPopper, Heart, Package, Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-18_1760080740021.jpg';
import sectionImage1 from '@assets/@capitalcityshots-19_1760080740021.jpg';
import sectionImage2 from '@assets/@capitalcityshots-20_1760080740021.jpg';
import sectionImage3 from '@assets/@capitalcityshots-21_1760080807864.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const stressFreeBenefits = [
  {
    icon: Truck,
    title: 'Alcohol Delivery Coordination',
    description: 'Holiday office party alcohol delivery handled through our Party On Delivery service - iced and dock-ready',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  {
    icon: Package,
    title: 'Complete Planning Support',
    description: 'Stress-free corporate celebration planning with our experienced team guiding every detail',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    icon: Shield,
    title: 'Professional Atmosphere',
    description: 'Holiday office party alcohol service that maintains corporate standards while encouraging celebration',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    icon: Sparkles,
    title: 'Memorable Experience',
    description: 'Stress-free corporate celebration that your team will remember and appreciate all year',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const deliveryProcess = [
  { step: '1', title: 'Select Your Beverages', description: 'Choose from curated holiday office party alcohol delivery options through Party On Delivery' },
  { step: '2', title: 'Schedule Delivery', description: 'Coordinate timing so beverages arrive iced and ready for your stress-free corporate celebration' },
  { step: '3', title: 'Dock-Ready Service', description: 'Holiday office party alcohol delivery meets you at the marina, loaded onto your boat' },
  { step: '4', title: 'Enjoy Your Party', description: 'Focus on celebrating while we handle the logistics for your stress-free corporate celebration' }
];

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    best: 'Small department parties',
    description: 'Intimate holiday office party alcohol delivery for close teams on single-deck pontoon with arch canopy'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    best: 'Medium teams',
    description: 'Perfect for department stress-free corporate celebration with room to mingle'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    best: 'Growing companies',
    description: 'Ideal for holiday office party alcohol coordination with extended teams'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    best: 'Full company parties',
    description: 'Our flagship for large stress-free corporate celebration events (add\'l crew fee for 51-75)'
  }
];

const planningChecklist = [
  {
    timeline: '6-8 Weeks Before',
    tasks: [
      'Book your boat for holiday office party alcohol delivery event',
      'Set budget for stress-free corporate celebration',
      'Survey team for dietary preferences and restrictions'
    ]
  },
  {
    timeline: '4 Weeks Before',
    tasks: [
      'Finalize guest count for holiday office party',
      'Coordinate with Party On Delivery for alcohol delivery',
      'Plan catering menu for stress-free corporate celebration'
    ]
  },
  {
    timeline: '2 Weeks Before',
    tasks: [
      'Confirm holiday office party alcohol delivery details',
      'Send invitations with parking and meeting location',
      'Plan any team activities or recognition moments'
    ]
  },
  {
    timeline: 'Week Of',
    tasks: [
      'Confirm final headcount for stress-free corporate celebration',
      'Verify holiday office party alcohol delivery timing',
      'Prepare any awards, gifts, or special announcements'
    ]
  }
];

const beverageRecommendations = [
  {
    category: 'Premium Wines',
    description: 'Holiday office party alcohol delivery featuring festive reds, crisp whites, and celebratory champagne',
    icon: Wine
  },
  {
    category: 'Craft Beer Selection',
    description: 'Local Austin breweries offer seasonal options perfect for stress-free corporate celebration',
    icon: Package
  },
  {
    category: 'Signature Cocktails',
    description: 'Pre-mixed holiday cocktails for easy holiday office party alcohol service',
    icon: Sparkles
  },
  {
    category: 'Premium Non-Alcoholic',
    description: 'Inclusive options ensure everyone enjoys your stress-free corporate celebration',
    icon: Star
  }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'How does holiday office party alcohol delivery work?',
    answer: 'Our Party On Delivery service coordinates your holiday office party alcohol delivery directly to the marina. You select beverages, we handle logistics. Everything arrives iced and ready, making your stress-free corporate celebration truly effortless.'
  },
  {
    question: 'How much alcohol should we order for a holiday office party?',
    answer: 'For holiday office party alcohol delivery, plan 2-3 drinks per person for a 3-4 hour cruise. Our team helps calculate quantities based on your guest count to ensure your stress-free corporate celebration has appropriate supply without excess.'
  },
  {
    question: 'Can we bring our own alcohol for a stress-free corporate celebration?',
    answer: 'Yes! All our boats are BYOB. You can handle holiday office party alcohol delivery yourself or use our Party On Delivery coordination service. We provide coolers and ice for your stress-free corporate celebration.'
  },
  {
    question: 'What if some team members don\'t drink at the holiday office party?',
    answer: 'Inclusive holiday office party alcohol delivery includes premium non-alcoholic options. Craft mocktails, sparkling waters, and specialty sodas ensure all team members feel valued at your stress-free corporate celebration.'
  },
  {
    question: 'How far in advance should we book for holiday office party alcohol delivery?',
    answer: 'December dates fill quickly. Book your holiday office party 6-8 weeks in advance for best selection. This timeline also allows proper coordination of stress-free corporate celebration details including alcohol delivery.'
  },
  {
    question: 'Can we decorate the boat for our holiday office party?',
    answer: 'Absolutely! Holiday decorations are welcome for your stress-free corporate celebration. Many teams bring festive touches, holiday lights (battery-operated), and themed accessories for their holiday office party.'
  },
  {
    question: 'What food pairs well with holiday office party alcohol delivery?',
    answer: 'For stress-free corporate celebration catering, we recommend substantial appetizers or full meals. Local caterers offer holiday-themed menus that pair perfectly with your holiday office party alcohol selections.'
  },
  {
    question: 'How do you ensure responsible holiday office party alcohol service?',
    answer: 'Our professional captains maintain safety throughout your stress-free corporate celebration. We never serve intoxicated guests, and holiday office party alcohol delivery quantities are planned to encourage enjoyment without excess.'
  }
];

const internalLinks = [
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/team-building', label: 'Team Building', icon: Users },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/blogs/company-holiday-party-lake-travis', label: 'Holiday Party Guide', icon: Gift },
  { href: '/blogs/corporate-team-building-alcohol-etiquette-guide', label: 'Corporate Alcohol Etiquette', icon: Wine },
  { href: '/quote', label: 'Get a Quote', icon: Calendar }
];

export default function HolidayOfficePartyAlcohol() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Holiday Office Party Alcohol Delivery: Stress-Free Corporate Celebration Planning | Premier Party Cruises</title>
        <meta name="description" content="Plan stress-free corporate celebration with holiday office party alcohol delivery on Lake Travis. Complete planning guide for 14-75 guests. Party On Delivery coordination included." />
        <meta name="keywords" content="holiday office party alcohol delivery, stress-free corporate celebration, holiday office party planning, corporate holiday party alcohol, Austin holiday office party, Lake Travis holiday party, office party alcohol service, corporate celebration planning" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning" />
        <meta property="og:title" content="Holiday Office Party Alcohol Delivery: Stress-Free Corporate Celebration Planning" />
        <meta property="og:description" content="Plan stress-free corporate celebration with holiday office party alcohol delivery on Lake Travis. Complete planning guide included." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-18_1760080740021.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="holiday-office-party-alcohol-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-red-900 via-green-900 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Holiday office party alcohol delivery for stress-free corporate celebration on Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-red-600 font-bold" data-testid="badge-hero">
              <Snowflake className="mr-1 h-4 w-4" />
              Stress-Free Holiday Planning
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Holiday Office Party Alcohol Delivery<br />
              <span className="text-green-400">Stress-Free Corporate Celebration Planning</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Take the stress out of planning with holiday office party alcohol delivery that handles everything. 
              From beverage coordination to dock-ready service, create a memorable stress-free corporate celebration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8"
                data-testid="button-plan-party"
              >
                <Link href="/quote">Plan Your Holiday Party</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-red-900 font-semibold"
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
                  <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stress-Free Benefits Section */}
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
                Why Choose Our Holiday Office Party Alcohol Delivery
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experience truly stress-free corporate celebration planning with our comprehensive holiday office party services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stressFreeBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`card-benefit-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${benefit.bg} rounded-full flex items-center justify-center`}>
                        <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Process Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-green-50 dark:from-gray-800 dark:to-gray-900" data-testid="delivery-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-red-100 text-red-700">ALCOHOL DELIVERY PROCESS</Badge>
                <h2 className="text-3xl font-bold mb-6">How Holiday Office Party Alcohol Delivery Works</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Our streamlined process makes holiday office party alcohol delivery effortless, 
                  ensuring your stress-free corporate celebration starts the moment you arrive at the dock.
                </p>
                
                <div className="space-y-6">
                  {deliveryProcess.map((item, index) => (
                    <div key={index} className="flex gap-4" data-testid={`delivery-step-${index}`}>
                      <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
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
                    alt="Holiday office party alcohol delivery being prepared for stress-free corporate celebration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Planning Checklist Section */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="checklist-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Stress-Free Corporate Celebration Checklist</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Follow this timeline for perfect holiday office party alcohol delivery coordination.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {planningChecklist.map((phase, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-checklist-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-red-600">{phase.timeline}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400">{task}</span>
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

        {/* Beverage Recommendations */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900" data-testid="beverages-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={sectionImage2}
                    alt="Stress-free corporate celebration with curated holiday office party alcohol delivery selections"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-green-100 text-green-700">BEVERAGE RECOMMENDATIONS</Badge>
                <h2 className="text-3xl font-bold mb-6">Holiday Office Party Alcohol Delivery Selections</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Curated options for your stress-free corporate celebration that balance festive spirit with professional standards.
                </p>
                
                <div className="space-y-4">
                  {beverageRecommendations.map((item, index) => (
                    <div key={index} className="flex gap-4" data-testid={`beverage-${index}`}>
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.category}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Holiday Party Venue</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All boats are single-deck pontoons with arch canopy, perfect for stress-free corporate celebration.
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
                        <Ship className="h-5 w-5 text-red-500" />
                        {boat.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-red-600 font-semibold mb-2">{boat.capacity}</p>
                      <p className="text-sm text-gray-500 mb-2">Best for: {boat.best}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-white font-bold" data-testid="button-view-fleet">
                <Link href="/private-cruises">View Full Fleet Details</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={sectionImage3}
                alt="Successful holiday office party alcohol delivery event with stress-free corporate celebration on Lake Travis"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Holiday Office Party Alcohol Delivery FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about stress-free corporate celebration planning.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow-sm border"
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
        <section className="py-16 bg-slate-50 dark:bg-slate-900" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Holiday Party Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover our complete range of corporate holiday celebration services.
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
                    <Card className="h-full hover:shadow-lg transition-all hover:border-red-300 cursor-pointer group" data-testid={`link-card-${index}`}>
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <link.icon className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                            {link.label}
                          </h3>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
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
