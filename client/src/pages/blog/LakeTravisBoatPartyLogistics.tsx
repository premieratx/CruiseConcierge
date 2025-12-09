import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Calendar, MapPin, ClipboardList, Timer,
  ArrowRight, PartyPopper, Anchor, Navigation,
  ListChecks, CalendarCheck, UserCheck, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-20_1760080740021.jpg';
import sectionImage1 from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage2 from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage3 from '@assets/@capitalcityshots-23_1760080807865.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const logisticsElements = [
  { 
    icon: ClipboardList, 
    title: 'Planning Checklist', 
    description: 'Start 4-6 weeks early. Book your boat, set your guest count, and pick your date.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Calendar, 
    title: 'Timeline Guide', 
    description: 'Follow a step-by-step schedule. Know what to do and when to do it.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Users, 
    title: 'Group Coordination', 
    description: 'Collect RSVPs, share details, and keep everyone on the same page.',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Ship, 
    title: 'Premier Services', 
    description: 'Let our team handle the hard parts. You focus on having fun.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  }
];

const planningTimeline = [
  {
    timeframe: '4-6 Weeks Before',
    title: 'Book & Budget',
    tasks: [
      'Choose your party date',
      'Pick a boat size for your group',
      'Set your budget',
      'Book with Premier Party Cruises',
      'Send save-the-dates to guests'
    ]
  },
  {
    timeframe: '2-3 Weeks Before',
    title: 'Guest Management',
    tasks: [
      'Collect final RSVPs',
      'Share the marina address',
      'Plan food and drinks',
      'Assign someone to bring supplies',
      'Create a group chat'
    ]
  },
  {
    timeframe: '1 Week Before',
    title: 'Final Details',
    tasks: [
      'Confirm your booking',
      'Check the weather forecast',
      'Remind guests about arrival time',
      'Pack sunscreen and towels',
      'Charge your camera'
    ]
  },
  {
    timeframe: 'Day Of',
    title: 'Party Time',
    tasks: [
      'Arrive 15 minutes early',
      'Meet your captain',
      'Load your coolers',
      'Take a group photo',
      'Have the time of your life!'
    ]
  }
];

const coordinationTips = [
  {
    title: 'Guest Communication',
    tips: [
      'Create a shared doc with all party details',
      'Use a group chat for quick updates',
      'Send reminders 3 days and 1 day before',
      'Share parking info and directions',
      'Provide a contact number for the day'
    ]
  },
  {
    title: 'What to Bring',
    tips: [
      'Coolers with ice (no glass bottles)',
      'Snacks and food for your group',
      'Sunscreen and sunglasses',
      'Towels and swimwear',
      'Phone chargers (portable)',
      'Bluetooth speaker (optional)'
    ]
  },
  {
    title: 'Money Matters',
    tips: [
      'Collect funds early from all guests',
      'Use Venmo or Zelle for easy payment',
      'Budget for boat rental + food + drinks',
      'Plan for optional gratuity for crew',
      'Keep one person in charge of the budget'
    ]
  }
];

const premierServices = [
  { 
    title: 'Multiple Boat Options', 
    desc: 'Choose from 14 to 75 person capacity boats',
    icon: Ship
  },
  { 
    title: 'Experienced Captains', 
    desc: 'Licensed and friendly crew members',
    icon: Anchor
  },
  { 
    title: 'Flexible Scheduling', 
    desc: '3-hour or full-day cruise options',
    icon: Clock
  },
  { 
    title: 'Easy Booking', 
    desc: 'Online quotes and simple reservations',
    icon: CalendarCheck
  },
  { 
    title: 'BYOB Friendly', 
    desc: 'Bring your own food and drinks',
    icon: PartyPopper
  },
  { 
    title: 'Swimming Stops', 
    desc: 'Anchor in coves for lake swimming',
    icon: Navigation
  }
];

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'Book 4-6 weeks ahead for the best selection. Peak season (May-September) fills up fast. Weekends go quickly, so plan early!'
  },
  {
    question: 'What size boat do I need?',
    answer: 'We offer boats for 14-75 guests. Tell us your group size, and we\'ll help you pick the right fit. It\'s better to have a little extra space.'
  },
  {
    question: 'Can we bring our own food and drinks?',
    answer: 'Yes! All our cruises are BYOB. Bring coolers with ice. The only rule is no glass bottles for safety reasons.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'We watch the forecast closely. If conditions are unsafe, we\'ll work with you to reschedule. Your safety comes first.'
  },
  {
    question: 'Where do we meet the boat?',
    answer: 'We depart from marinas on Lake Travis. You\'ll get exact directions and parking info when you book.'
  },
  {
    question: 'Is a captain included?',
    answer: 'Yes! Every cruise includes a licensed captain. You just relax and enjoy the party. No boating experience needed.'
  },
  {
    question: 'Can we swim during the cruise?',
    answer: 'Absolutely! We stop in calm coves so you can swim, float, and cool off. It\'s one of the best parts of a Lake Travis party.'
  },
  {
    question: 'How do I pay and split costs?',
    answer: 'We take a deposit to reserve your date. Collect money from your group using apps like Venmo. We make it easy!'
  }
];

export default function LakeTravisBoatPartyLogistics() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Boat Party Logistics | Complete Planning Guide</title>
        <meta name="description" content="Plan your Lake Travis boat party with ease. Get our complete logistics guide with checklists, timelines, and coordination tips for a perfect celebration." />
        <meta name="keywords" content="Lake Travis boat party planning, boat party logistics, Lake Travis party coordination, Austin boat rental guide, party boat planning tips" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide" />
        <meta property="og:title" content="Lake Travis Boat Party Logistics | Complete Planning Guide" />
        <meta property="og:description" content="Your complete guide to planning a Lake Travis boat party. Checklists, timelines, and expert tips." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              COMPLETE PLANNING GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lake Travis Boat Party Logistics
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Your Step-by-Step Guide to Planning the Perfect Celebration
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Checklists, timelines, and coordination tips to make your Lake Travis boat party stress-free
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <Ship className="mr-2 h-5 w-5" />
                  Get Your Quote
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Boat Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Logistics Elements Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Four Keys to Party Success</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Master these four areas. Your boat party will run smoothly.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {logisticsElements.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Timeline Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-700">STEP-BY-STEP</Badge>
                <h2 className="text-3xl font-bold mb-4">Your Planning Timeline</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Follow this timeline. Stay organized and stress-free.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {planningTimeline.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <Badge className="w-fit mb-2 bg-blue-600 text-white text-xs">{phase.timeframe}</Badge>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Timer className="h-5 w-5 text-blue-600" />
                          {phase.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {phase.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Coordination Tips Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">COORDINATION TIPS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Keep Your Group Organized</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    A great party starts with great communication. Use these tips to keep everyone informed and excited.
                  </p>
                  
                  <div className="space-y-6">
                    {coordinationTips.map((section, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                          <ListChecks className="h-5 w-5 text-purple-600" />
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1} 
                      alt="Friends enjoying a Lake Travis boat party"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">Easy Planning</p>
                        <p className="text-xs text-gray-500">We guide you every step</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Premier Services Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage2} 
                      alt="Premier Party Cruises boat on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">PREMIER PARTY CRUISES</Badge>
                  <h2 className="text-3xl font-bold mb-6">We Handle the Hard Parts</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Planning a boat party should be fun, not stressful. Our team takes care of the details so you can focus on celebrating.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {premierServices.map((service, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <service.icon className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{service.title}</h4>
                          <p className="text-xs text-white/70">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/chat">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      Start Planning Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Day-Of Checklist Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">DAY-OF CHECKLIST</Badge>
                  <h2 className="text-3xl font-bold mb-6">Party Day Essentials</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    It's finally here! Make sure you have everything ready for an amazing day on the water.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="bg-white dark:bg-gray-900">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-sm mb-3 text-green-600">Must-Haves</h4>
                        <ul className="space-y-2">
                          {[
                            'Coolers with ice',
                            'Food and snacks',
                            'Drinks (no glass)',
                            'Sunscreen SPF 30+',
                            'Towels',
                            'Phone & charger'
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white dark:bg-gray-900">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-sm mb-3 text-blue-600">Nice-to-Haves</h4>
                        <ul className="space-y-2">
                          {[
                            'Bluetooth speaker',
                            'Party decorations',
                            'Pool floats',
                            'Waterproof phone case',
                            'Hat or visor',
                            'Change of clothes'
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-blue-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3} 
                      alt="Lake Travis boat party fun"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">All Set!</p>
                        <p className="text-xs text-gray-500">Ready for fun</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Quick answers to help you plan
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Ship className="h-16 w-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Lake Travis Party?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Our team is here to help. Get a free quote and start planning your perfect day on the water.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    Explore Our Boats
                  </Button>
                </Link>
              </div>
              
              <Card className="bg-white/10 border-white/20 max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <Ship className="h-10 w-10 mx-auto mb-3 text-white" />
                  <h3 className="font-bold text-lg mb-2">Premier Party Cruises</h3>
                  <p className="text-white/80 text-sm mb-2">Lake Travis Party Boat Experts</p>
                  <a href="tel:5124885892" className="text-white hover:text-yellow-300 flex items-center justify-center gap-2 text-lg font-bold">
                    <Phone className="h-5 w-5" />
                    (512) 488-5892
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
