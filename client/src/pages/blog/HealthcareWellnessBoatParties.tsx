import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Heart, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Stethoscope, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-5_1760072938923.jpg';
import sectionImage1 from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-17_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-18_1760080740021.jpg';
import sectionImage4 from '@assets/@capitalcityshots-19_1760080740021.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const healthcareBenefits = [
  { 
    icon: Heart, 
    title: 'Stress Relief', 
    description: 'Healthcare team building Austin experiences provide essential decompression for medical professionals who give so much daily',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  { 
    icon: Users, 
    title: 'Team Bonding', 
    description: 'Build stronger connections outside hospital walls with a wellness retreat boat Austin adventure on Lake Travis',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Activity, 
    title: 'Wellness Focus', 
    description: 'Fresh air, sunshine, and water activities promote physical and mental wellness for hardworking medical staff',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Award, 
    title: 'Recognition', 
    description: 'Show appreciation for nurses, doctors, and support staff with a memorable hospital team outing Lake Travis celebration',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const eventTypes = [
  {
    title: 'Nurse Appreciation Events',
    description: 'Honor your nursing staff with a special medical staff party Lake Travis experience',
    features: [
      'Private boat charter for your nursing team',
      'Relaxing cruise away from hospital stress',
      'Perfect for Nurses Week celebrations',
      'Customizable to your department size'
    ]
  },
  {
    title: 'Doctor Retreats',
    description: 'Strategic planning and team bonding for physician groups',
    features: [
      'Private setting for confidential discussions',
      'Healthcare team building Austin activities',
      'Multiple boat sizes for any group',
      'Catering coordination available'
    ]
  },
  {
    title: 'Clinic Team Outings',
    description: 'Perfect wellness retreat boat Austin experience for clinic staff',
    features: [
      'Whole clinic team celebrations',
      'Administrative and clinical staff together',
      'Flexible scheduling for shift workers',
      'BYOB to manage your budget'
    ]
  },
  {
    title: 'Hospital Department Celebrations',
    description: 'Unite your department with a hospital team outing Lake Travis adventure',
    features: [
      'ICU, ER, OR team celebrations',
      'End of residency parties',
      'Retirement celebrations',
      'Holiday gatherings for medical teams'
    ]
  }
];

const whyHealthcareTeams = [
  { stat: '24/7', label: 'Healthcare Never Stops' },
  { stat: '100%', label: 'Private Charter Experience' },
  { stat: '14-75', label: 'Guest Capacity Range' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const faqs = [
  {
    question: 'Why is healthcare team building Austin so important for medical professionals?',
    answer: 'Healthcare workers face unique stressors including long shifts, life-and-death decisions, and emotional demands. Healthcare team building Austin events on Lake Travis provide essential time away from clinical settings, allowing medical staff to decompress, reconnect as people (not just colleagues), and return to work refreshed and more cohesive as a team.'
  },
  {
    question: 'What makes a medical staff party Lake Travis different from other venues?',
    answer: 'A medical staff party Lake Travis offers something most venues cannot: complete separation from the healthcare environment. Being on the water removes all reminders of work stress. There are no overhead pages, no code blues, no charts to review. Your team can truly relax and focus on enjoying each other\'s company in a beautiful natural setting.'
  },
  {
    question: 'How can we schedule a wellness retreat boat Austin event with rotating shifts?',
    answer: 'We understand healthcare scheduling challenges. For a wellness retreat boat Austin experience, we offer flexible departure times and can work with you to find dates that maximize attendance. Many hospitals book multiple smaller cruises to ensure all shifts can participate, or choose weekend dates when more staff are available.'
  },
  {
    question: 'What activities are available during a hospital team outing Lake Travis?',
    answer: 'During your hospital team outing Lake Travis, guests can swim in the refreshing lake, relax on our giant lily pad floats, enjoy the onboard sound system, and take in the stunning Hill Country views. The cruise itself is the activity – giving your hardworking team time to simply unwind without structured programming.'
  },
  {
    question: 'Can we bring our own food and drinks for healthcare team events?',
    answer: 'Yes! All our private cruises are BYOB (bring your own everything). This is perfect for healthcare team building Austin events because you can bring catering that fits dietary restrictions, hospital budgets, and team preferences. We can also connect you with local caterers if needed.'
  },
  {
    question: 'How far in advance should we book for medical staff parties?',
    answer: 'For medical staff party Lake Travis events, we recommend booking 3-4 weeks in advance, especially for larger groups or popular dates. Nurses Week (May) and Doctor\'s Day (March) are particularly busy times. The earlier you reach out, the more scheduling options we can offer for your healthcare team.'
  },
  {
    question: 'Do you offer any healthcare professional discounts?',
    answer: 'We appreciate the incredible work healthcare professionals do for our community. Contact us directly to discuss your wellness retreat boat Austin event – we work with hospitals, clinics, and medical groups of all sizes and can create custom packages that work within institutional budgets.'
  },
  {
    question: 'What size groups can you accommodate for hospital department events?',
    answer: 'Our fleet can accommodate hospital team outing Lake Travis events from 14 to 75 guests. Whether you\'re planning a small department celebration or a large hospital-wide event, we have boats that fit. For larger groups, we can coordinate multiple vessels for a truly memorable healthcare team building Austin experience.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Small clinic teams' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department outings' },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Large unit celebrations' },
  { name: 'Clever Girl', capacity: '75 guests', best: 'Hospital-wide events' }
];

export default function HealthcareWellnessBoatParties() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Healthcare Team Building Austin | Medical Staff Party Lake Travis | Wellness Retreat Boat</title>
        <meta name="description" content="Plan the perfect healthcare team building Austin event on Lake Travis. Medical staff parties, nurse appreciation cruises, doctor retreats, and hospital team outings. Private boat charters for wellness-focused celebrations." />
        <meta name="keywords" content="healthcare team building Austin, medical staff party Lake Travis, wellness retreat boat Austin, hospital team outing Lake Travis, nurse appreciation party, doctor retreat Austin, healthcare wellness event" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/healthcare-wellness-boat-parties-austin" />
        <meta property="og:title" content="Healthcare Team Building Austin | Medical Staff Party Lake Travis" />
        <meta property="og:description" content="Private boat cruises for healthcare professionals. Nurse appreciation, doctor retreats, clinic outings, and hospital team celebrations on Lake Travis." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="healthcare-wellness-blog-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-teal-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-teal-600 font-bold" data-testid="badge-healthcare">
              HEALTHCARE & WELLNESS EVENTS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Healthcare Team Building Austin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              A Prescription for Team Bonding: Medical Staff Party Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Give your healthcare heroes the wellness retreat boat Austin experience they deserve. Private cruises for nurses, doctors, and medical teams on beautiful Lake Travis. Plan your hospital team outing Lake Travis today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-teal-600 font-bold text-lg px-8 py-6" data-testid="button-plan-healthcare-event">
                  <Heart className="mr-2 h-5 w-5" />
                  Plan Your Healthcare Event
                </Button>
              </Link>
              <Link href="/team-building">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-team-building">
                  View Team Building Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Why Healthcare Teams Need Time on the Water */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-why-healthcare">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Healthcare Teams Need Time on the Water</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Medical professionals give everything to their patients. A hospital team outing Lake Travis provides the stress relief and team bonding that healthcare workers truly deserve.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthcareBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-teal-200" data-testid={`card-benefit-${index}`}>
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

        {/* Stats Section */}
        <section className="py-12 bg-teal-900 text-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyHealthcareTeams.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-perfect-for">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-teal-100 text-teal-700">HEALTHCARE EVENT TYPES</Badge>
                  <h2 className="text-3xl font-bold mb-6">Perfect For Medical Teams</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you're planning a nurse appreciation celebration, doctor retreat, clinic outing, or hospital department party, our healthcare team building Austin cruises provide the perfect escape from clinical settings.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {eventTypes.map((event, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-event-type-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                          <ul className="space-y-1">
                            {event.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-teal-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Medical staff party Lake Travis healthcare team celebration on boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-8 w-8 text-teal-500" />
                      <div>
                        <p className="font-bold text-sm">Healthcare Focused</p>
                        <p className="text-xs text-gray-500">Events for medical teams</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits of Outdoor Wellness */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-wellness-benefits">
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
                      alt="Wellness retreat boat Austin healthcare workers enjoying Lake Travis sunshine"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-green-100 text-green-700">WELLNESS BENEFITS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Benefits of Outdoor Wellness for Healthcare Workers</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Healthcare professionals spend long hours indoors under fluorescent lights. A wellness retreat boat Austin experience on Lake Travis offers natural healing benefits:
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold">Vitamin D & Fresh Air</p>
                        <p className="text-gray-600 text-sm">Natural sunlight and lake breezes boost mood and energy levels depleted by indoor hospital environments</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold">Water Therapy</p>
                        <p className="text-gray-600 text-sm">Swimming and being near water reduces cortisol levels and promotes relaxation – exactly what medical staff need</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold">Digital Detox</p>
                        <p className="text-gray-600 text-sm">No pagers, no overhead pages, no EMR systems – just quality time with your healthcare team building Austin connections</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold">Natural Beauty</p>
                        <p className="text-gray-600 text-sm">Lake Travis Hill Country views provide a stark contrast to clinical settings, helping reset mental well-being</p>
                      </div>
                    </li>
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button className="bg-teal-600 hover:bg-teal-700" data-testid="button-explore-cruises">
                      Explore Private Cruises
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-gradient-to-br from-teal-900 via-blue-800 to-slate-900 text-white" data-testid="section-boat-options">
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
                      src={sectionImage3}
                      alt="Hospital team outing Lake Travis private boat charter for healthcare professionals"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">OUR FLEET</Badge>
                  <h2 className="text-3xl font-bold mb-6">Boats for Every Healthcare Team Size</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    From small clinic teams to large hospital departments, we have the perfect vessel for your medical staff party Lake Travis celebration. Every boat offers a private, comfortable experience.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {packageOptions.map((boat, index) => (
                      <Card key={index} className="bg-white/10 border-white/20" data-testid={`card-boat-option-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white">{boat.name}</h4>
                          <p className="text-yellow-400 text-sm">{boat.capacity}</p>
                          <p className="text-white/70 text-xs mt-1">Best for: {boat.best}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/corporate-events">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold" data-testid="button-view-corporate-options">
                      View Corporate Event Options
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Additional Healthcare Image Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-healthcare-experience">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">The Ultimate Healthcare Team Building Austin Experience</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Picture your medical team cruising Lake Travis, enjoying the sunshine, swimming in crystal-clear water, and bonding without the stress of hospital walls. That's what a wellness retreat boat Austin delivers.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={sectionImage4}
                  alt="Healthcare team building Austin nurses doctors enjoying Lake Travis boat party"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose Lake Travis for Medical Staff Events?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                    <span>Complete escape from clinical environments</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                    <span>Private charters – no strangers, just your team</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                    <span>BYOB keeps hospital team outing Lake Travis budget-friendly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                    <span>Professional crew handles everything</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                    <span>Flexible scheduling for shift-based teams</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                    <span>Swimming, floating, and relaxation included</span>
                  </li>
                </ul>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/client-entertainment">
                    <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50" data-testid="button-client-entertainment">
                      Client Entertainment Options
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button className="bg-teal-600 hover:bg-teal-700" data-testid="button-start-planning">
                      Start Planning Your Event
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-teal-100 text-teal-700">FAQs</Badge>
              <h2 className="text-3xl font-bold mb-4">Healthcare Team Event Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about planning medical staff party Lake Travis celebrations and healthcare team building Austin events
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-bold hover:no-underline">
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Stethoscope className="h-16 w-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Prescribe Some Fun for Your Healthcare Team?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Your medical staff works tirelessly caring for others. Give them the wellness retreat boat Austin experience they've earned. Plan your healthcare team building Austin event today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-teal-600 font-bold text-lg px-8 py-6" data-testid="button-book-healthcare-event">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Your Healthcare Event
                  </Button>
                </Link>
                <Link href="/team-building">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-explore-team-building">
                    Explore Team Building
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-white/70 text-sm">
                Questions? Call us at <a href="tel:5127809093" className="underline hover:text-white">(512) 780-9093</a> or email <a href="mailto:info@premierpartycruises.com" className="underline hover:text-white">info@premierpartycruises.com</a>
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
