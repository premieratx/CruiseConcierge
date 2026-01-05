import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Shield, Phone, Clock, CheckCircle2, 
  AlertTriangle, Sun, Waves, MapPin, Heart,
  ArrowRight, Wine, Droplets, LifeBuoy, UserCheck
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
    title: 'Responsible Service', 
    description: 'Party On Delivery follows Texas alcohol laws and promotes safe drinking habits',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: LifeBuoy, 
    title: 'Boat Safety First', 
    description: 'Our BYOB policies keep everyone safe on the water with trained crew',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: UserCheck, 
    title: 'Guest Well-Being', 
    description: 'We watch out for every guest and step in when needed',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: AlertTriangle, 
    title: 'Issue Prevention', 
    description: 'Smart planning stops problems before they start',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  }
];

const byobSafetyTips = [
  {
    title: 'Know Your Limits',
    tips: [
      'Pace yourself throughout the cruise',
      'Eat before and during drinking',
      'Alternate with water or soft drinks',
      'Watch how the sun affects you'
    ]
  },
  {
    title: 'Stay Hydrated',
    tips: [
      'Bring plenty of water bottles',
      'Drink water between alcoholic drinks',
      'Watch for signs of dehydration',
      'Take breaks in the shade'
    ]
  },
  {
    title: 'Look Out for Friends',
    tips: [
      'Use the buddy system',
      'Check on each other often',
      'Know the signs of too much drinking',
      'Never leave anyone alone'
    ]
  },
  {
    title: 'Follow Boat Rules',
    tips: [
      'No glass containers allowed',
      'Listen to the crew at all times',
      'Stay seated when moving',
      'Wear life jackets when swimming'
    ]
  }
];

const hostingBestPractices = [
  {
    category: 'Before the Party',
    practices: [
      'Plan drink amounts based on guest count',
      'Arrange rides home for everyone',
      'Stock up on food and snacks',
      'Have plenty of non-alcoholic options'
    ]
  },
  {
    category: 'During the Party',
    practices: [
      'Serve food throughout the event',
      'Offer water and soft drinks often',
      'Watch guests for signs of trouble',
      'Know when to stop serving'
    ]
  },
  {
    category: 'End of the Party',
    practices: [
      'Never let guests drive drunk',
      'Have rideshare apps ready',
      'Offer a place to stay if needed',
      'Follow up the next day'
    ]
  }
];

const faqs = [
  {
    question: 'What is Party On Delivery\'s approach to responsible service?',
    answer: 'Party On Delivery follows all Texas alcohol laws. They check IDs for every order. They also offer tips on safe drinking and can suggest proper amounts for your party size.'
  },
  {
    question: 'What are the BYOB rules on Premier Party Cruises boats?',
    answer: 'You can bring your own drinks in cans or plastic only. No glass is allowed for safety. Our crew monitors all guests and can step in if someone has too much. We keep everyone safe on the water.'
  },
  {
    question: 'How does the crew handle someone who has had too much?',
    answer: 'Our trained crew watches all guests. If someone needs help, we offer water and a shaded spot to rest. In serious cases, we head back to the marina. Guest safety always comes first.'
  },
  {
    question: 'What happens if someone gets sick on the boat?',
    answer: 'Our crew is trained for these situations. We have first aid supplies on board. We can contact emergency services if needed. We will return to shore for any medical issue.'
  },
  {
    question: 'Can we have a dry cruise with no alcohol?',
    answer: 'Yes! Many groups choose alcohol-free cruises. These are great for family events, corporate outings, or anyone who prefers it. The party is just as fun without drinks.'
  },
  {
    question: 'How much alcohol should we bring for our group?',
    answer: 'A good rule is 2-3 drinks per person for a 3-hour cruise. This keeps things fun but safe. Party On Delivery can help you plan the right amount for your group.'
  }
];

const warningSignsList = [
  'Slurred speech or trouble talking',
  'Loss of balance or coordination',
  'Confusion about where they are',
  'Becoming aggressive or emotional',
  'Nausea or vomiting',
  'Passing out or extreme drowsiness'
];

export default function PartyAlcoholSafetyAustin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Party Alcohol Safety in Austin | Responsible Service Guide</title>
        <meta name="description" content="Learn about responsible alcohol service and guest safety at Austin parties. Tips for BYOB boat cruises, Party On Delivery service, and keeping everyone safe." />
        <meta name="keywords" content="Austin party safety, responsible alcohol service, BYOB boat rules, party guest safety, Lake Travis boat safety" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/party-alcohol-safety-in-austin-responsible-service-and-guest-well-being" />
        <meta property="og:title" content="Party Alcohol Safety in Austin | Responsible Service Guide" />
        <meta property="og:description" content="Your guide to responsible alcohol service and guest well-being at Austin parties and boat cruises." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-700 via-blue-600 to-green-600 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('/attached_assets/@capitalcityshots-36_1760080807868.jpg')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              SAFETY GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Party Alcohol Safety in Austin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Responsible Service and Guest Well-Being
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Keep your Austin party fun and safe with these tips for responsible drinking
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <Ship className="mr-2 h-5 w-5" />
                  Plan a Safe Cruise
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

        {/* Safety Pillars Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Four Pillars of Party Safety</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A great party is a safe party. Here's how we keep everyone having fun.
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

        {/* Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">RESPONSIBLE SERVICE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Party On Delivery Does It Right</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Party On Delivery makes getting drinks easy. But they also care about safety. 
                    Every order gets an ID check. They follow all Texas alcohol rules.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Need help planning drink amounts? They can advise you. Having a big group? 
                    They'll suggest the right mix of drinks, water, and mixers.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'ID verification on every order',
                      'Follows all Texas alcohol laws',
                      'Helps plan proper drink amounts',
                      'Delivers to hotels, homes, and marinas',
                      'Suggests non-alcoholic options too'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                      <Wine className="mr-2 h-5 w-5" />
                      Visit Party On Delivery
                    </Button>
                  </a>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/attached_assets/@capitalcityshots-37_1760080807869.jpg" 
                      alt="Party guests enjoying drinks responsibly on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Safe Service</p>
                        <p className="text-xs text-gray-500">ID verified orders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BYOB Boat Safety Section */}
        <section className="py-16 bg-gradient-to-br from-green-800 via-blue-800 to-green-900 text-white">
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
                      src="/attached_assets/@capitalcityshots-38_1760080807869.jpg" 
                      alt="Safe BYOB party on Lake Travis boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">BYOB SAFETY</Badge>
                  <h2 className="text-3xl font-bold mb-6">Stay Safe on the Water</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Our boats are BYOB friendly. But we have rules to keep everyone safe. 
                    The sun, water, and waves can make alcohol hit harder. Be smart out there.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {byobSafetyTips.map((section, index) => (
                      <Card key={index} className="bg-white/10 border-white/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {section.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                                <CheckCircle2 className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="py-16 bg-amber-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-amber-200 text-amber-800">KNOW THE SIGNS</Badge>
                  <h2 className="text-3xl font-bold mb-6">When Someone Has Had Too Much</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Keep an eye on your friends. If you see these signs, it's time to help. 
                    Don't wait. Acting fast can prevent serious problems.
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                      Warning Signs to Watch For
                    </h3>
                    <ul className="space-y-3">
                      {warningSignsList.map((sign, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full" />
                          <span className="text-gray-700 dark:text-gray-300">{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-red-800 dark:text-red-300 font-medium">
                      <strong>Emergency?</strong> Call 911 right away. Don't hesitate if someone can't wake up, 
                      has trouble breathing, or has pale or bluish skin.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/attached_assets/@capitalcityshots-39_1760080807869.jpg" 
                      alt="Friends looking out for each other at Austin party"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hosting Best Practices */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Be a Great Party Host</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Good hosts keep their guests safe. Follow these tips for a party everyone will enjoy.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {hostingBestPractices.map((section, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <Badge className="w-fit mb-2 bg-blue-100 text-blue-700 text-xs">{section.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.practices.map((practice, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{practice}</span>
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

        {/* Our Crew Commitment */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Crew Keeps You Safe</h2>
                <p className="text-lg text-white/90 max-w-3xl mx-auto">
                  Every Premier Party Cruises boat has trained staff. They know how to handle any situation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Users, title: 'Trained Staff', desc: 'CPR and first aid certified' },
                  { icon: Shield, title: 'Safety First', desc: 'Monitoring all guests' },
                  { icon: LifeBuoy, title: 'Ready to Help', desc: 'Life jackets and equipment' },
                  { icon: Phone, title: 'Quick Response', desc: 'Radio contact with shore' }
                ].map((item, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 text-center">
                    <CardContent className="pt-6">
                      <item.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
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
              <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get answers about alcohol safety on Austin party boats
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold py-4">
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
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Safe Party?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Book a cruise with a crew that puts your safety first. We make sure everyone has fun and gets home safe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6">
                    <Ship className="mr-2 h-5 w-5" />
                    Start Planning
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6">
                    View Private Cruises
                    <ArrowRight className="ml-2 h-5 w-5" />
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
