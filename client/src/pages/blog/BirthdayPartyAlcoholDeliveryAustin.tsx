import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star, Gift,
  ArrowRight, Sparkles, Wine, Camera, Cake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-4_1760080740017.jpg';
import sectionImage1 from '@assets/@capitalcityshots-5_1760072938923.jpg';
import sectionImage2 from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-7_1760080740018.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const milestoneFeatures = [
  { 
    icon: Gift, 
    title: '21st Birthday Packages', 
    description: 'Welcome to legal drinking! We make your first legal celebration unforgettable.',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Wine, 
    title: 'Alcohol Delivery', 
    description: 'Party On Delivery brings your drinks right to you. No store runs needed.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Ship, 
    title: 'Lake Travis Cruises', 
    description: 'Celebrate on the water with stunning views and party vibes.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Cake, 
    title: 'All Milestone Ages', 
    description: 'From 30th to 50th and beyond. Every decade deserves a party.',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  }
];

const milestonePackages = [
  {
    age: '21st Birthday',
    title: 'Welcome to 21',
    highlights: [
      'First legal drink celebration',
      'Champagne toast on arrival',
      'Giant lily pad floats',
      'DJ and dance floor'
    ],
    popular: true
  },
  {
    age: '30th Birthday',
    title: 'Dirty Thirty',
    highlights: [
      'Premium drink packages',
      'Private cruise options',
      'Sunset timing available',
      'Instagram-worthy moments'
    ],
    popular: true
  },
  {
    age: '40th Birthday',
    title: 'Fabulous 40',
    highlights: [
      'Refined party atmosphere',
      'Wine and cocktail options',
      'Scenic lake views',
      'Comfortable seating areas'
    ],
    popular: false
  },
  {
    age: '50th & Beyond',
    title: 'Golden Celebrations',
    highlights: [
      'Elegant cruise experience',
      'Private charter available',
      'Custom drink menu',
      'Perfect for larger groups'
    ],
    popular: false
  }
];

const deliveryBenefits = [
  {
    title: 'No Store Runs',
    description: 'Skip the liquor store. We bring everything to your door or the marina.'
  },
  {
    title: 'Party Ready',
    description: 'Drinks arrive cold and ready to enjoy. Ice and mixers included.'
  },
  {
    title: 'Austin Coverage',
    description: 'We deliver to hotels, Airbnbs, and Lake Travis marinas.'
  },
  {
    title: 'Legal & Safe',
    description: 'ID verified delivery. All Texas laws followed.'
  }
];

const faqs = [
  {
    question: 'How does birthday alcohol delivery work in Austin?',
    answer: 'Party On Delivery handles everything. Pick your drinks online or by phone. We deliver to your hotel, Airbnb, or the marina. All deliveries require ID check. It\'s that simple.'
  },
  {
    question: 'Can you deliver to Lake Travis for our boat party?',
    answer: 'Yes! We deliver directly to the marina before your cruise. Your drinks will be cold and ready when you board. Just let us know your cruise time.'
  },
  {
    question: 'What milestone birthdays do you specialize in?',
    answer: 'We love them all! 21st birthdays are a favorite. But 30th, 40th, 50th, and beyond are just as special. Each age group gets a customized experience.'
  },
  {
    question: 'What drinks can you deliver?',
    answer: 'Beer, wine, spirits, champagne, mixers, and ice. We can create custom packages for your group size. Just tell us your preferences and budget.'
  },
  {
    question: 'How far in advance should I order?',
    answer: 'We recommend 24-48 hours notice. Same-day delivery is sometimes available. For boat parties, order at least 2 days ahead to ensure smooth delivery.'
  },
  {
    question: 'Can I combine alcohol delivery with a boat cruise?',
    answer: 'Absolutely! This is our most popular option. Book your cruise with Premier Party Cruises. Order drinks through Party On Delivery. We coordinate the timing perfectly.'
  }
];

export default function BirthdayPartyAlcoholDeliveryAustin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Birthday Party Alcohol Delivery Austin | Milestone Celebrations Made Easy</title>
        <meta name="description" content="Plan your Austin milestone birthday with alcohol delivery and Lake Travis boat cruises. 21st, 30th, 40th, 50th birthdays made easy with Party On Delivery service." />
        <meta name="keywords" content="birthday party alcohol delivery Austin, 21st birthday Austin, milestone birthday Lake Travis, party boat birthday Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy" />
        <meta property="og:title" content="Birthday Party Alcohol Delivery Austin | Milestone Celebrations Made Easy" />
        <meta property="og:description" content="Make your Austin milestone birthday unforgettable with alcohol delivery and Lake Travis cruises." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-purple-600 font-bold">
              MILESTONE BIRTHDAY GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Birthday Party Alcohol Delivery Austin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Milestone Celebrations Made Easy
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              From 21st to 50th and beyond. Lake Travis cruises plus drinks delivered to your door.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-lg px-8 py-6">
                  <Gift className="mr-2 h-5 w-5" />
                  Plan Your Birthday
                </Button>
              </Link>
              <Link href="/milestone-birthday">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Birthday Cruises
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Feature Cards */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Austin for Your Milestone Birthday?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Great weather. Amazing lake. Easy drink delivery. It's the perfect combo.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestoneFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
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

        {/* Milestone Packages Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-700">EVERY AGE IS SPECIAL</Badge>
                <h2 className="text-3xl font-bold mb-4">Milestone Birthday Packages</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Pick your decade. We handle the rest.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestonePackages.map((pkg, index) => (
                  <Card key={index} className={`relative ${pkg.popular ? 'border-2 border-purple-400 shadow-lg' : ''}`}>
                    {pkg.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white">
                        POPULAR
                      </Badge>
                    )}
                    <CardContent className="pt-8">
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-500">{pkg.age}</p>
                        <h3 className="text-xl font-bold">{pkg.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {pkg.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Alcohol Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 text-white">
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
                      src={sectionImage1}
                      alt="Party On Delivery alcohol service"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-white text-amber-600">DRINKS DELIVERED</Badge>
                  <h2 className="text-3xl font-bold mb-6">Party On Delivery Service</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Skip the store. We bring the party to you.
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Whether you're at a hotel, Airbnb, or heading to Lake Travis, your drinks arrive cold and ready.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {deliveryBenefits.map((benefit, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-bold text-sm mb-1">{benefit.title}</h4>
                        <p className="text-xs text-white/80">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lake Travis Cruise Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-yellow-400 text-black">CELEBRATE ON THE WATER</Badge>
                  <h2 className="text-3xl font-bold mb-6">Lake Travis Birthday Cruises</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Take your birthday to the lake. Dance, swim, and celebrate with stunning views.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Professional DJ with party lights',
                      'Giant lily pad floats for swimming',
                      'BYOB or delivery to marina',
                      'Private and shared cruise options',
                      'Sunset timing available',
                      'Groups from 14 to 75 guests'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/atx-disco-cruise">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      Explore Birthday Cruises
                    </Button>
                  </Link>
                </div>
                
                <div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage2}
                      alt="Lake Travis birthday cruise"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Three simple steps to an amazing birthday.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Book Your Cruise</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Pick your boat and time. Share cruise options work great for smaller groups. Private charters for bigger parties.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-600">2</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Order Drinks</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tell us what you want. Beer, wine, champagne, spirits. We deliver to your hotel or the marina.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-pink-600">3</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Celebrate!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Show up and party. Your drinks are ready. The boat is waiting. Make memories that last.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Photo Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={sectionImage3}
                    alt="Birthday celebration on Lake Travis"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Why Choose Austin?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Sun className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold">Perfect Weather</h4>
                        <p className="text-gray-600 dark:text-gray-400">300+ sunny days a year. Lake season runs March through October.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Waves className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold">Lake Travis</h4>
                        <p className="text-gray-600 dark:text-gray-400">Crystal clear water. 65 miles of shoreline. Stunning Hill Country views.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Music className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold">Live Music Capital</h4>
                        <p className="text-gray-600 dark:text-gray-400">After the cruise, hit 6th Street or Rainey Street. Austin never sleeps.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold">Easy Access</h4>
                        <p className="text-gray-600 dark:text-gray-400">Direct flights from most US cities. Lake Travis is 30 minutes from downtown.</p>
                      </div>
                    </li>
                  </ul>
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
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Everything you need to know about birthday alcohol delivery in Austin.
                </p>
              </div>

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
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Birthday?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Whether you're turning 21 or 50, we make it easy. Book your cruise. Order your drinks. Show up and celebrate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Start Planning
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us
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
