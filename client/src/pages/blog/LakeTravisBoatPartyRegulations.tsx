import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Shield, FileCheck, Phone, CheckCircle2, 
  AlertTriangle, Anchor, Users, Clock, Scale,
  ArrowRight, BadgeCheck, LifeBuoy, ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-24_1760080807866.jpg';
import sectionImage1 from '@assets/@capitalcityshots-25_1760080807866.jpg';
import sectionImage2 from '@assets/@capitalcityshots-26_1760080807866.jpg';
import sectionImage3 from '@assets/@capitalcityshots-27_1760080807866.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const regulationCategories = [
  { 
    icon: Scale, 
    title: 'TABC Compliance', 
    description: 'Alcohol rules are strict on Texas waterways. We handle all the details so you stay compliant.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Anchor, 
    title: 'Boating Rules', 
    description: 'TPWD rules apply. Our licensed captains know them all.',
    color: 'text-teal-600',
    bg: 'bg-teal-100'
  },
  { 
    icon: LifeBuoy, 
    title: 'Safety Gear', 
    description: 'Life jackets, fire gear, and first aid are required. We provide everything.',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  { 
    icon: BadgeCheck, 
    title: 'Permits & Licenses', 
    description: 'Commercial boats need special permits. Ours are always current and inspected.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const tabcRules = [
  'No open containers while boat is moving (driver only)',
  'No glass bottles allowed on most boats',
  'Guests must be 21+ to drink',
  'No serving alcohol to visibly drunk guests',
  'BYOB is allowed on private charters',
  'Coolers must be easily accessible for inspection'
];

const safetyRequirements = [
  'TPWD-approved life jackets for every guest',
  'Working fire extinguisher on board',
  'First aid kit with required supplies',
  'Sound-producing device (horn or whistle)',
  'Visual distress signals for emergencies',
  'Navigation lights for evening cruises'
];

const whatWeHandle = [
  {
    title: 'Licensed Captains',
    description: 'Every cruise has a TPWD licensed captain. They know the lake and all the rules.'
  },
  {
    title: 'Current Permits',
    description: 'Our boats pass annual TPWD inspections. All permits stay up to date.'
  },
  {
    title: 'Safety Equipment',
    description: 'Life jackets, first aid, fire gear - we provide it all. No extra cost.'
  },
  {
    title: 'Insurance Coverage',
    description: 'Full commercial insurance protects you and your guests during the cruise.'
  },
  {
    title: 'Capacity Limits',
    description: 'We never exceed safe passenger limits. Your group size is carefully managed.'
  },
  {
    title: 'Weather Monitoring',
    description: 'We watch conditions closely. If weather gets bad, we reschedule for free.'
  }
];

const faqs = [
  {
    question: 'Can we bring our own alcohol on the boat?',
    answer: 'Yes! BYOB is allowed on private charters. Bring beer, wine, or spirits. Just no glass bottles. Cans and plastic are fine. We recommend Party On Delivery for easy beverage delivery to the marina.'
  },
  {
    question: 'Does the captain drink alcohol?',
    answer: 'Never. Our captains follow strict zero-tolerance policies. The legal limit for boat operators is 0.08% BAC, but we require complete sobriety. Your safety comes first.'
  },
  {
    question: 'What happens if someone gets too drunk?',
    answer: 'Our crew is trained to handle these situations. We may limit drinks or return to the dock early if needed. Texas law requires us to stop serving visibly intoxicated guests.'
  },
  {
    question: 'Are there age limits for passengers?',
    answer: 'All ages welcome on private cruises! For the ATX Disco Cruise, guests must be 21+. Kids need life jackets at all times on any boat.'
  },
  {
    question: 'What if weather cancels our cruise?',
    answer: 'Safety comes first. If lightning or high winds make boating unsafe, we reschedule at no charge. You can also get a full refund if the new date doesn\'t work.'
  },
  {
    question: 'Do we need to bring life jackets?',
    answer: 'No. We provide TPWD-approved life jackets for every passenger. Kids under 13 must wear them at all times. Adults should have them accessible.'
  },
  {
    question: 'Is smoking allowed on the boats?',
    answer: 'No smoking or vaping on any of our vessels. This keeps everyone comfortable and meets fire safety requirements.'
  },
  {
    question: 'What documents do you have for compliance?',
    answer: 'Every boat carries its Certificate of Documentation, TPWD inspection certificate, captain\'s license, and proof of insurance. Ask to see them anytime.'
  }
];

const commonMistakes = [
  {
    mistake: 'Renting from unlicensed operators',
    why: 'No insurance, no safety gear, possible fines for you',
    solution: 'Always ask to see permits and captain licenses'
  },
  {
    mistake: 'Bringing glass bottles',
    why: 'Glass breaks and creates dangerous debris',
    solution: 'Use cans, plastic bottles, or bag-in-box wine'
  },
  {
    mistake: 'Overcrowding the boat',
    why: 'Illegal and unsafe - can capsize or sink',
    solution: 'Book a boat with the right capacity for your group'
  },
  {
    mistake: 'No designated sober captain',
    why: 'BUI (boating under influence) is a serious crime',
    solution: 'Book with a professional charter service'
  }
];

export default function LakeTravisBoatPartyRegulations() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Boat Party Regulations | Legal Requirements Guide</title>
        <meta name="description" content="Complete guide to Lake Travis boat party regulations. Learn about TABC rules, boating laws, safety requirements, and how Premier Party Cruises handles compliance for you." />
        <meta name="keywords" content="Lake Travis boat regulations, TABC compliance boat party, Texas boating laws, Lake Travis party rules, boat party legal requirements" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide" />
        <meta property="og:title" content="Lake Travis Boat Party Regulations | Legal Requirements Guide" />
        <meta property="og:description" content="Everything you need to know about Lake Travis boat party regulations and how Premier Party Cruises keeps you compliant." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              COMPLIANCE GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lake Travis Boat Party Regulations
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Legal Requirements & Compliance Guide
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Know the rules. Stay safe. Party with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <Ship className="mr-2 h-5 w-5" />
                  Book a Compliant Cruise
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Our Boats
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Regulation Categories Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Four Areas of Boat Party Compliance</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Texas has strict rules for boat parties. Here's what you need to know.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regulationCategories.map((item, index) => (
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

        {/* TABC Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">ALCOHOL RULES</Badge>
                  <h2 className="text-3xl font-bold mb-6">TABC Compliance on Lake Travis</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The Texas Alcoholic Beverage Commission (TABC) sets the rules for alcohol on boats. 
                    These rules are different from land-based events. Breaking them can mean fines or arrest.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Good news: BYOB is legal on private boat charters. You just need to follow a few simple rules.
                  </p>
                  
                  <h3 className="font-bold text-xl mb-4">Key Alcohol Rules:</h3>
                  <ul className="space-y-3 mb-8">
                    {tabcRules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Guests enjoying drinks responsibly on Lake Travis boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Scale className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">BYOB Friendly</p>
                        <p className="text-xs text-gray-500">On private charters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Safety Requirements Section */}
        <section className="py-16 bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white">
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
                      alt="Safety equipment on Premier Party Cruises boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">SAFETY FIRST</Badge>
                  <h2 className="text-3xl font-bold mb-6">Required Safety Equipment</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Texas Parks & Wildlife (TPWD) requires specific safety gear on every boat. 
                    Missing equipment can result in fines. It can also put lives at risk.
                  </p>
                  
                  <h3 className="font-bold text-xl mb-4">What Every Boat Must Have:</h3>
                  <ul className="space-y-3 mb-8">
                    {safetyRequirements.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <LifeBuoy className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-white/80 italic">
                    We provide all required safety equipment. It's inspected before every cruise.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Handle Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">STRESS-FREE BOOKING</Badge>
              <h2 className="text-3xl font-bold mb-4">What Premier Party Cruises Handles For You</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                You focus on having fun. We handle the paperwork and compliance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatWeHandle.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
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

        {/* Common Mistakes Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-orange-100 text-orange-700">AVOID THESE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Common Boat Party Mistakes</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Planning your first Lake Travis boat party? Learn from others' mistakes. 
                    These errors can ruin your day or get you in legal trouble.
                  </p>
                  
                  <div className="space-y-6">
                    {commonMistakes.map((item, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-red-600 dark:text-red-400">{item.mistake}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><strong>Why it's bad:</strong> {item.why}</p>
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1"><strong>Solution:</strong> {item.solution}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Professional boat party with licensed captain"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">Book With Confidence</p>
                        <p className="text-xs text-gray-500">Fully compliant cruises</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">QUESTIONS ANSWERED</Badge>
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get answers to common questions about boat party rules and regulations.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Skip the Stress. Book a Compliant Cruise.
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Premier Party Cruises handles all the legal stuff. You just show up and have fun. 
                Licensed captains, current permits, full insurance - it's all included.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                    <ClipboardCheck className="mr-2 h-5 w-5" />
                    Get a Free Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us: (512) 709-9806
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
