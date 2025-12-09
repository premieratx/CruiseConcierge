import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Shield, Anchor, Wrench, Award, Star,
  ArrowRight, LifeBuoy, ClipboardCheck, BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const safetyPillars = [
  { 
    icon: Shield, 
    title: 'Safety First', 
    description: 'Every cruise follows strict safety rules. Your well-being is our top priority.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Wrench, 
    title: 'Regular Maintenance', 
    description: 'Our boats get checked before every trip. We fix issues before they become problems.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Award, 
    title: 'Certified Captains', 
    description: 'All captains are licensed and trained. They know Lake Travis inside and out.',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: LifeBuoy, 
    title: 'Full Safety Gear', 
    description: 'Life jackets for everyone. First aid kits on every boat. Emergency plans ready.',
    color: 'text-red-600',
    bg: 'bg-red-100'
  }
];

const maintenanceChecklist = [
  {
    category: 'Before Every Trip',
    items: [
      'Engine check and oil levels',
      'Fuel system inspection',
      'Safety equipment count',
      'Navigation lights test',
      'Bilge pump function check',
      'Fire extinguisher inspection'
    ]
  },
  {
    category: 'Weekly Checks',
    items: [
      'Hull cleaning and inspection',
      'Propeller condition check',
      'Battery voltage testing',
      'Steering system review',
      'Anchor and rope inspection',
      'Sound system testing'
    ]
  },
  {
    category: 'Monthly Service',
    items: [
      'Full engine service',
      'Electrical system audit',
      'Safety gear replacement',
      'Deep cleaning and sanitizing',
      'Upholstery inspection',
      'Coast Guard compliance review'
    ]
  }
];

const captainCredentials = [
  { title: 'USCG Licensed', desc: 'Coast Guard certified captains' },
  { title: 'CPR Certified', desc: 'First aid and CPR trained' },
  { title: '5+ Years Experience', desc: 'Extensive Lake Travis knowledge' },
  { title: 'Background Checked', desc: 'Verified and trustworthy crew' }
];

const faqs = [
  {
    question: 'What safety equipment is on each boat?',
    answer: 'Every boat has life jackets for all passengers. We also carry first aid kits, fire extinguishers, throwable flotation devices, and emergency flares. Our boats meet all Coast Guard requirements.'
  },
  {
    question: 'How often do you service your boats?',
    answer: 'We check our boats before every cruise. Weekly deep inspections happen on off-days. Monthly, we do full engine service and safety audits. We never skip maintenance.'
  },
  {
    question: 'Are your captains licensed?',
    answer: 'Yes! All our captains hold valid USCG licenses. They also have CPR and first aid training. Most have 5+ years of Lake Travis experience.'
  },
  {
    question: 'What happens if there is bad weather?',
    answer: 'Safety comes first. We watch the weather closely. If storms approach, we return to the marina. We reschedule trips affected by dangerous weather at no extra cost.'
  },
  {
    question: 'Can I bring my own safety equipment?',
    answer: 'You can bring extra gear if you like. But we provide everything required by law. All life jackets are Coast Guard approved and regularly inspected.'
  },
  {
    question: 'What makes Premier Party Cruises safer than others?',
    answer: 'We maintain our boats more often than required. Our captains exceed training standards. We have a perfect safety record. And we never overbook or rush trips.'
  }
];

const safetyStats = [
  { number: '100%', label: 'Safety Record' },
  { number: '10+', label: 'Years Experience' },
  { number: '5,000+', label: 'Safe Cruises' },
  { number: '24/7', label: 'Weather Monitoring' }
];

export default function LakeTravisBoatSafetyMaintenance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Boat Safety & Maintenance | Premier Party Cruises Standards</title>
        <meta name="description" content="Learn about Premier Party Cruises' boat safety and maintenance standards on Lake Travis. USCG licensed captains, rigorous inspections, and a perfect safety record." />
        <meta name="keywords" content="Lake Travis boat safety, party boat maintenance, USCG licensed captains, Lake Travis party cruise safety, Premier Party Cruises safety" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises" />
        <meta property="og:title" content="Lake Travis Boat Safety & Maintenance | Premier Party Cruises Standards" />
        <meta property="og:description" content="Discover how Premier Party Cruises maintains the highest safety and maintenance standards for party cruises on Lake Travis." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('/attached_assets/@capitalcityshots-28_1760080807867.jpg')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              SAFETY & QUALITY GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lake Travis Boat Safety
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Quality Standards for Party Cruises
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Learn why Premier Party Cruises is the safest choice on Lake Travis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <Ship className="mr-2 h-5 w-5" />
                  Book a Safe Cruise
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Our Fleet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Safety Stats */}
        <section className="py-12 bg-white dark:bg-gray-900 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {safetyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Pillars Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Four Safety Pillars</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every cruise is built on these core principles
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyPillars.map((item, index) => (
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

        {/* Captain Expertise Section */}
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
                  <Badge className="mb-4 bg-blue-100 text-blue-700">EXPERT CREW</Badge>
                  <h2 className="text-3xl font-bold mb-6">Meet Our Licensed Captains</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Your safety starts with our crew. Every captain at Premier Party Cruises holds a valid USCG license. 
                    They know Lake Travis like the back of their hand.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    But licenses are just the start. Our captains also train in first aid and CPR. 
                    They practice emergency drills monthly. They can handle any situation on the water.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {captainCredentials.map((cred, index) => (
                      <Card key={index} className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <BadgeCheck className="h-6 w-6 text-blue-600 mb-2" />
                          <h4 className="font-bold text-sm">{cred.title}</h4>
                          <p className="text-xs text-gray-600">{cred.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/attached_assets/@capitalcityshots-29_1760080807867.jpg" 
                      alt="Premier Party Cruises captain and crew on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">USCG Licensed</p>
                        <p className="text-xs text-gray-500">All captains certified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Maintenance Standards Section */}
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
                      src="/attached_assets/@capitalcityshots-30_1760080807867.jpg" 
                      alt="Boat maintenance and inspection at Premier Party Cruises"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">RIGOROUS STANDARDS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Boat Maintenance That Goes Beyond</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    We don't just meet safety standards. We exceed them. Every boat in our fleet 
                    gets more attention than the law requires.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Pre-cruise inspection every single trip',
                      'Weekly deep cleaning and mechanical checks',
                      'Monthly professional engine service',
                      'Annual Coast Guard compliance audits',
                      'Immediate repair policy for any issue',
                      'Brand new safety equipment each season'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      See Our Fleet
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Maintenance Checklist Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Maintenance Schedule</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A look at how we keep every boat in top shape
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {maintenanceChecklist.map((section, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <ClipboardCheck className="h-6 w-6 text-blue-600" />
                        <CardTitle className="text-lg">{section.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
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

        {/* Why We're Different Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">WHAT SETS US APART</Badge>
                  <h2 className="text-3xl font-bold mb-6">Why Choose Premier Party Cruises?</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Perfect Safety Record
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Over 5,000 cruises without a single safety incident. That's not luck. 
                        That's preparation and professionalism.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-blue-500" />
                        Never Skip Maintenance
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Some operators cut corners. We never do. If a boat needs work, 
                        it stays at the dock until it's perfect.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        Right-Sized Trips
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        We never overbook. Every guest has room to move and enjoy. 
                        Crowded boats are unsafe boats.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-500" />
                        Weather Watching
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        We monitor weather 24/7. If conditions aren't safe, we reschedule. 
                        Your safety matters more than our schedule.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/attached_assets/@capitalcityshots-31_1760080807867.jpg" 
                      alt="Safe and enjoyable party cruise on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about our safety and maintenance
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
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
        <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Shield className="h-16 w-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Cruise with Confidence?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Book with Premier Party Cruises and enjoy Lake Travis on the safest boats available.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                    <Anchor className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    Explore Our Boats
                  </Button>
                </Link>
              </div>
              
              <Card className="bg-white/10 border-white/20 max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <Ship className="h-10 w-10 mx-auto mb-3 text-white" />
                  <h3 className="font-bold text-lg mb-2">Premier Party Cruises</h3>
                  <p className="text-white/80 text-sm mb-3">Lake Travis's Safest Party Boats</p>
                  <a href="tel:5124885892" className="text-white/90 hover:text-white flex items-center justify-center gap-2 text-lg font-bold">
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
