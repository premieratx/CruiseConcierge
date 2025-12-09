import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  DollarSign, Calendar, Star, Anchor, MapPin, ArrowRight,
  Shield, Music, Waves, Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-32_1760080807868.jpg';
import sectionImage1 from '@assets/@capitalcityshots-33_1760080807868.jpg';
import sectionImage2 from '@assets/@capitalcityshots-34_1760080807868.jpg';
import sectionImage3 from '@assets/@capitalcityshots-35_1760080807868.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const keyBenefits = [
  { 
    icon: Users, 
    title: 'Groups of 20-75', 
    description: 'Boats sized for large parties. No splitting your group across multiple vessels.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Ship, 
    title: 'Private Charters', 
    description: 'Your group gets the whole boat. Enjoy exclusive lake access together.',
    color: 'text-teal-600',
    bg: 'bg-teal-100'
  },
  { 
    icon: DollarSign, 
    title: 'Group Pricing', 
    description: 'Per-person costs drop as your group grows. Better value for everyone.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Shield, 
    title: 'Expert Crew', 
    description: 'Licensed captains and crew manage everything. You just have fun.',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const fleetOptions = [
  {
    name: 'Meeseeks',
    capacity: '25 Guests',
    description: 'Perfect for medium groups. Great for birthdays and small corporate events.',
    features: ['Covered seating', 'Swim platform', 'Sound system', 'Cooler space'],
    priceRange: '$900-$1,400',
    bestFor: 'Medium groups, intimate celebrations'
  },
  {
    name: 'Clever Girl',
    capacity: '50 Guests',
    description: 'Our most popular large group boat. Ideal for weddings and big parties.',
    features: ['Two-level deck', 'Dance floor', 'Full bar area', 'Premium sound'],
    priceRange: '$1,600-$2,400',
    bestFor: 'Large parties, bachelorette weekends'
  },
  {
    name: 'The Irony',
    capacity: '75 Guests',
    description: 'The biggest boat on Lake Travis. Perfect for corporate events and large celebrations.',
    features: ['Three-level design', 'Multiple lounges', 'Giant lily pads', 'DJ booth'],
    priceRange: '$2,200-$3,400',
    bestFor: 'Major events, corporate retreats'
  }
];

const planningTips = [
  {
    title: 'Book Early',
    items: [
      'Reserve 4-6 weeks ahead for weekends',
      'Summer months fill fast',
      'Holiday weekends need 2+ months notice',
      'Weekday bookings offer more flexibility'
    ]
  },
  {
    title: 'Coordinate Guests',
    items: [
      'Share marina directions early',
      'Set a 30-minute arrival buffer',
      'Create a group chat for updates',
      'Assign a point person for headcount'
    ]
  },
  {
    title: 'Plan Drinks & Food',
    items: [
      'BYOB is allowed on private charters',
      'Use Party On Delivery for easy setup',
      'Pack coolers the night before',
      'Consider catering for 30+ guests'
    ]
  },
  {
    title: 'Know What to Bring',
    items: [
      'Sunscreen and hats for everyone',
      'Swimsuits and towels',
      'Cash for crew gratuity',
      'Bluetooth speaker backup'
    ]
  }
];

const faqs = [
  {
    question: 'What is the maximum group size for Lake Travis party boats?',
    answer: 'Our largest boat holds 75 guests. For bigger groups, we can arrange multiple boats. They cruise together on the lake. This creates an amazing multi-boat party experience.'
  },
  {
    question: 'How much does it cost to rent a party boat for 20+ people?',
    answer: 'Pricing depends on boat size and rental time. A 25-person boat starts at $900 for 3 hours. Larger boats for 50-75 guests range from $1,600 to $3,400. Per-person costs drop as your group grows.'
  },
  {
    question: 'Can we bring our own alcohol on the boat?',
    answer: 'Yes! Private charters are BYOB. No corkage fees. Just no glass containers. Party On Delivery can drop drinks at the marina. They handle pickup too.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Light rain usually does not cancel trips. Storms with lightning will. We monitor forecasts closely. You can reschedule at no charge if we cancel due to weather.'
  },
  {
    question: 'How far in advance should large groups book?',
    answer: 'Book 4-6 weeks ahead for weekend dates. Summer and holidays need even more lead time. We recommend 2 months for groups over 40 people. Weekdays often have last-minute availability.'
  },
  {
    question: 'Is there parking at the marina for large groups?',
    answer: 'Yes. The marina has ample parking. Carpooling helps with space. We recommend arriving 15-20 minutes before departure. This gives time to board and settle in.'
  },
  {
    question: 'Can we decorate the boat for our event?',
    answer: 'Absolutely! Bring banners, balloons, and props. No confetti or glitter (lake pollution rules). Tape and removable hooks work best. We can suggest decoration ideas too.'
  },
  {
    question: 'Do you provide food and drinks?',
    answer: 'We do not provide food or drinks. Private charters are BYOB. Pack coolers with your favorites. Catering delivery to the marina works great for large groups.'
  }
];

const eventTypes = [
  { name: 'Corporate Team Building', icon: Users },
  { name: 'Bachelor/Bachelorette Parties', icon: PartyPopper },
  { name: 'Birthday Celebrations', icon: Star },
  { name: 'Wedding Parties', icon: Anchor },
  { name: 'Family Reunions', icon: Users },
  { name: 'Graduation Parties', icon: Star }
];

export default function LakeTravisLargeGroupBoatRentals() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Party Boat Rentals for Large Groups (20+ Guests) | Ultimate Guide</title>
        <meta name="description" content="Plan the perfect large group boat party on Lake Travis. Boats for 20-75 guests with private charters, group pricing, and expert crews. Book your Austin celebration today." />
        <meta name="keywords" content="Lake Travis party boat, large group boat rental, Austin party boat 20 guests, Lake Travis charter, group boat party Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests" />
        <meta property="og:title" content="Lake Travis Party Boat Rentals for Large Groups (20+ Guests)" />
        <meta property="og:description" content="The ultimate guide to planning large group boat parties on Lake Travis. Boats for 20-75 guests with private charters." />
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
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-700 via-teal-600 to-blue-800 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-700 font-bold">
              LARGE GROUP GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lake Travis Party Boat Rentals
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Ultimate Guide for Large Group Events (20+ Guests)
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Everything you need to plan the perfect boat party for your big group on Lake Travis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-6">
                  <Users className="mr-2 h-5 w-5" />
                  Get a Group Quote
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Fleet Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Key Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Large Groups Choose Premier Party Cruises</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                We specialize in big group celebrations. Here's what makes us different.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyBenefits.map((item, index) => (
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

        {/* Fleet Options Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-700">OUR FLEET</Badge>
                <h2 className="text-3xl font-bold mb-4">Boats for Every Group Size</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Pick the perfect boat for your party. All boats include captain and crew.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {fleetOptions.map((boat, index) => (
                  <Card key={index} className="h-full hover:shadow-xl transition-shadow border-2">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{boat.name}</CardTitle>
                          <Badge className="mt-2 bg-blue-600 text-white">{boat.capacity}</Badge>
                        </div>
                        <Ship className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{boat.description}</p>
                      <ul className="space-y-2 mb-4">
                        {boat.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm text-gray-500 mb-1">Price Range (3-4 hours)</p>
                        <p className="text-xl font-bold text-blue-600">{boat.priceRange}</p>
                        <p className="text-xs text-gray-500 mt-2">Best for: {boat.bestFor}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    See Full Fleet Details
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Large Group Photo Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-teal-800 to-blue-900 text-white">
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
                      alt="Large group celebrating on Lake Travis party boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">PERFECT FOR CELEBRATIONS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Events We Host for Large Groups</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Our boats are built for big celebrations. From corporate outings to wedding parties, we handle it all. No event is too large.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {eventTypes.map((event, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <event.icon className="h-5 w-5 text-yellow-400" />
                        </div>
                        <span className="text-white/90">{event.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Planning Tips Section */}
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
                  <Badge className="mb-4 bg-teal-100 text-teal-700">PLANNING CHECKLIST</Badge>
                  <h2 className="text-3xl font-bold mb-6">Tips for Large Group Success</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Big groups need good planning. Follow these tips to make sure your event runs smooth.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    {planningTips.map((section, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="pt-4">
                          <h4 className="font-bold text-lg mb-3 text-blue-600">{section.title}</h4>
                          <ul className="space-y-2">
                            {section.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle2 className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
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
                      src={sectionImage2}
                      alt="Group planning their Lake Travis boat party"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Book 4-6 Weeks Early</p>
                        <p className="text-xs text-gray-500">Weekends fill fast!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Breakdown Section */}
        <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
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
                      alt="Party guests enjoying Lake Travis boat rental"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-green-100 text-green-700">VALUE FOR GROUPS</Badge>
                  <h2 className="text-3xl font-bold mb-6">How Pricing Works for Large Groups</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Bigger groups mean better value per person. Here's how to get the most for your money.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      'Flat charter rate means per-person cost drops with more guests',
                      'Weekday bookings offer 15-20% savings',
                      'Morning cruises are priced lower than sunset slots',
                      'Multi-boat packages for 75+ guests',
                      'No hidden fees - price includes captain and crew'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-blue-600 text-white rounded-xl p-6">
                    <h3 className="font-bold text-xl mb-2">Quick Math Example</h3>
                    <p className="text-white/90 mb-4">
                      50-person boat at $2,000 = <strong>$40 per person</strong> for 4 hours on Lake Travis
                    </p>
                    <Link href="/chat">
                      <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold">
                        Get Your Custom Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">What's Included in Every Charter</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Everything you need for an amazing day on the lake
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Anchor, text: 'Licensed Captain' },
                { icon: Users, text: 'Experienced Crew' },
                { icon: Music, text: 'Sound System' },
                { icon: Waves, text: 'Swim Stop' },
                { icon: Sun, text: 'Shade Cover' },
                { icon: Shield, text: 'Safety Gear' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow h-full">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="font-medium text-sm">{item.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
              <h2 className="text-3xl font-bold mb-4">Large Group FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about booking party boats for 20+ guests
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
        <section className="py-16 bg-gradient-to-br from-blue-700 via-teal-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Book Your Large Group Event?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get a custom quote in minutes. Our team will help you pick the perfect boat for your group.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-6">
                    <Users className="mr-2 h-5 w-5" />
                    Get Your Free Quote
                  </Button>
                </Link>
                <a href="tel:5127504621">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 750-4621
                  </Button>
                </a>
              </div>
              
              <p className="mt-6 text-white/70 text-sm">
                Serving Austin & Lake Travis since 2018 | 500+ large group events hosted
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
