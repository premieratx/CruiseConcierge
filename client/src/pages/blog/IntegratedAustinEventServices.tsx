import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star,
  ArrowRight, Utensils, Wine, Sparkles, Shield,
  DollarSign, Heart, Cake, PartyPopper, Briefcase,
  Building2, Anchor, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import RelatedBlogArticles from '@/components/RelatedBlogArticles';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/atx-disco-cruise-party.webp';
import sectionImage1 from '@assets/day-tripper-14-person-boat.webp';
import sectionImage2 from '@assets/clever-girl-3-bachelorette-boat.jpg';
import sectionImage3 from '@assets/clever-girl-50-person-boat.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const eventTypes = [
  {
    icon: PartyPopper,
    title: 'Bachelor Parties',
    description: 'Epic Lake Travis celebrations with private boats, professional DJs, and unforgettable memories for the groom.',
    stat: '500+',
    statLabel: 'bachelor parties hosted',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    link: '/bachelor-party-austin'
  },
  {
    icon: Heart,
    title: 'Bachelorette Parties',
    description: 'Glamorous lake cruises with dancing, photo ops, and stunning sunset views for the bride tribe.',
    stat: '600+',
    statLabel: 'bachelorette parties',
    color: 'text-pink-600',
    bg: 'bg-pink-100',
    link: '/bachelorette-party-austin'
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    description: 'Team building, client entertainment, and company celebrations on the water. Unique venue, lasting impressions.',
    stat: '200+',
    statLabel: 'corporate events',
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    link: '/corporate-events'
  },
  {
    icon: Cake,
    title: 'Birthday Parties',
    description: 'Milestone celebrations from 21st to 50th birthdays. Make their special day unforgettable on Lake Travis.',
    stat: '400+',
    statLabel: 'birthday cruises',
    color: 'text-orange-600',
    bg: 'bg-orange-100',
    link: '/birthday-parties'
  },
  {
    icon: Wine,
    title: 'Wedding Events',
    description: 'Rehearsal dinners, welcome parties, and after-parties. Start your forever with stunning lake views.',
    stat: '150+',
    statLabel: 'wedding events',
    color: 'text-rose-600',
    bg: 'bg-rose-100',
    link: '/wedding-parties'
  },
  {
    icon: Users,
    title: 'Family Reunions',
    description: 'Bring the whole family together for a memorable day on the water. All ages welcome.',
    stat: '100+',
    statLabel: 'family reunions',
    color: 'text-green-600',
    bg: 'bg-green-100',
    link: '/private-cruises'
  }
];

const whatsIncluded = [
  { icon: Ship, title: 'Professional Captain', description: 'Licensed & experienced' },
  { icon: Music, title: 'Premium Sound System', description: 'Bluetooth-enabled' },
  { icon: Sun, title: 'Fuel & Cleaning', description: 'All costs covered' },
  { icon: Waves, title: 'Water Toys & Floats', description: 'Lily pads & inflatables' },
  { icon: Wine, title: 'Coolers & Ice', description: 'BYOB ready' },
  { icon: Shield, title: 'Safety Equipment', description: 'Life jackets for all' }
];

const cruiseOptions = [
  {
    title: 'ATX Disco Cruise',
    subtitle: 'The ONLY Multi-Group All-Inclusive Party in the U.S.',
    price: 'From $149/person',
    features: [
      '4-hour all-inclusive experience',
      'Professional DJ spinning party hits',
      'Multiple groups celebrating together',
      'Social atmosphere – meet new people',
      'BYOB – order drinks ahead',
      'Giant floats & lily pads'
    ],
    link: '/atx-disco-cruise',
    gradient: 'from-brand-blue to-purple-600',
    badge: 'MOST POPULAR'
  },
  {
    title: 'Private Cruises',
    subtitle: 'Exclusive Boat Just for Your Group',
    price: 'From $850 (14 guests)',
    features: [
      'Private boat for your group only',
      'Flexible 3-4+ hour duration',
      'BYOB – bring whatever you want',
      'Custom itinerary with captain',
      'Optional DJ, photographer, bartender',
      '14, 30, or 75-person boats'
    ],
    link: '/private-cruises',
    gradient: 'from-green-600 to-teal-600',
    badge: 'EXCLUSIVE'
  }
];

const safetyStats = [
  { value: '15+', label: 'Years in Business' },
  { value: '150,000+', label: 'Happy Customers' },
  { value: '0', label: 'Safety Incidents' },
  { value: '100%', label: 'Coast Guard Certified' }
];

const faqs = [
  {
    question: 'What areas do you serve in Austin, Texas?',
    answer: 'Premier Party Cruises operates exclusively on Lake Travis, departing from multiple marina locations including Lakeway and Volente for your convenience.'
  },
  {
    question: 'Can I customize my boat rental package?',
    answer: 'Absolutely! We offer flexible packages and encourage you to contact us to discuss your specific needs. Our goal is to create a tailored experience that perfectly matches your event vision.'
  },
  {
    question: 'What safety measures are in place for Lake Travis cruises?',
    answer: 'Premier Party Cruises maintains a perfect safety record over 15+ years. All our boats are equipped with extensive safety gear, including life jackets, and are operated by experienced, certified captains.'
  },
  {
    question: 'How far in advance should I book my event?',
    answer: 'We recommend booking as far in advance as possible, especially for peak seasons (March-October) and popular dates. This ensures availability and allows ample time for detailed planning.'
  },
  {
    question: 'Do you offer services for smaller gatherings?',
    answer: 'Yes! Premier Party Cruises caters to events of all sizes, from intimate gatherings on our 14-person Day Tripper to large celebrations on our 75-person flagship Clever Girl.'
  },
  {
    question: 'Can we bring our own alcohol?',
    answer: 'Yes! All Premier Party Cruises are BYOB (Bring Your Own Beverage). We provide coolers and ice. Just no glass containers allowed for safety reasons.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety is our priority. If weather conditions are unsafe, we work with you to reschedule at no additional cost. Light rain typically doesn\'t cancel cruises – our boats have shade coverage.'
  },
  {
    question: 'Do you provide food on the cruises?',
    answer: 'We don\'t provide food, but you\'re welcome to bring your own snacks, catering, or picnic. Many guests order from local restaurants. We can suggest catering options when you book.'
  }
];

export default function IntegratedAustinEventServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Integrated Austin Event Services | Lake Travis Boat Rentals & Party Planning</title>
        <meta name="description" content="Planning an event in Austin? Premier Party Cruises offers seamless Lake Travis boat rentals for bachelor/bachelorette parties, corporate events, weddings, and more. 15+ years experience." />
        <meta name="keywords" content="Austin event services, Lake Travis party planning, Austin party boat rental, bachelor party Austin, bachelorette party Austin, corporate events Austin, wedding party boat" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations" />
        <meta property="og:title" content="Integrated Austin Event Services | Lake Travis Boat Rentals & Party Planning" />
        <meta property="og:description" content="Planning an event in Austin? Premier Party Cruises offers seamless Lake Travis boat rentals for all your celebration needs." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-blue to-purple-900" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-gray-900/50" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-6 bg-brand-blue text-white font-bold text-sm px-4 py-1" data-testid="badge-hero">
              AUSTIN'S PREMIER EVENT SOLUTION
            </Badge>
            
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" data-testid="heading-hero">
              Seamless Austin <br className="hidden sm:block" />
              <span className="text-brand-yellow">Event Services</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Lake Travis party boats for every celebration.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Bachelor parties. Bachelorettes. Corporate events. Weddings. Birthdays. All in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/atx-disco-cruise">
                <Button size="lg" className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue/90 hover:to-purple-600/90 text-white font-bold text-lg px-8 py-6" data-testid="button-book-cruise">
                  <Ship className="mr-2 h-5 w-5" />
                  Book Your Party Cruise
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Free Quote
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>15+ years experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-blue" />
                <span>150,000+ guests served</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Perfect safety record</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Event Types Grid */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-events">Every Celebration, One Solution</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From intimate gatherings to large group celebrations, we've got you covered.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={event.link}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-brand-blue group cursor-pointer" data-testid={`card-event-${index}`}>
                      <CardContent className="pt-6 text-center">
                        <div className={`w-14 h-14 mx-auto mb-4 ${event.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <event.icon className={`h-7 w-7 ${event.color}`} />
                        </div>
                        <div className="mb-3">
                          <span className={`text-2xl font-bold ${event.color}`}>{event.stat}</span>
                          <p className="text-xs text-gray-500">{event.statLabel}</p>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{event.description}</p>
                        <div className="mt-4 text-brand-blue font-semibold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                          Learn More <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Premier Party Cruises */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-brand-blue/10 text-brand-blue font-bold">THE PREMIER DIFFERENCE</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-why-us">Why 150,000+ Guests Choose Us</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  In Austin's competitive party boat market, Premier Party Cruises stands apart with our commitment to 
                  exceptional experiences, safety, and service. We're not just boat rentals – we're celebration experts.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {safetyStats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                      <div className="text-2xl md:text-3xl font-bold text-brand-blue">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold" data-testid="button-contact-us">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us Today
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <img 
                  src={sectionImage1}
                  alt="Party boat on Lake Travis"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  data-testid="image-boat-1"
                />
                <div className="absolute -bottom-6 -left-6 bg-brand-blue text-white p-6 rounded-xl shadow-lg hidden md:block">
                  <div className="text-3xl font-bold">4+</div>
                  <div className="text-sm">Boats Available</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-gradient-to-br from-brand-blue to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-included">What's Included with Every Cruise</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                No hidden fees. No surprises. Everything you need for an amazing day on the water.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {whatsIncluded.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-brand-yellow" />
                  </div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cruise Options */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-options">Choose Your Experience</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Two ways to party on Lake Travis – pick the one that fits your style.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {cruiseOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden" data-testid={`card-cruise-${index}`}>
                    <div className={`bg-gradient-to-r ${option.gradient} text-white p-6`}>
                      <Badge className="mb-3 bg-white/20 text-white border-0">{option.badge}</Badge>
                      <h3 className="text-2xl font-bold mb-1">{option.title}</h3>
                      <p className="text-white/80 text-sm mb-2">{option.subtitle}</p>
                      <p className="text-xl font-bold">{option.price}</p>
                    </div>
                    <CardContent className="pt-6">
                      <ul className="space-y-3 mb-6">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={option.link}>
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 font-bold">
                          Explore {option.title} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-gallery">See Our Fleet in Action</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Real celebrations. Real memories. Your event could be next.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img 
                  src={sectionImage2}
                  alt="Bachelorette party on Lake Travis"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  data-testid="image-gallery-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Bachelorette Parties</h3>
                  <p className="text-white/80 text-sm">Dancing, sun, and sisterhood</p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img 
                  src={sectionImage1}
                  alt="Private boat cruise on Lake Travis"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  data-testid="image-gallery-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Private Cruises</h3>
                  <p className="text-white/80 text-sm">Your boat, your rules</p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img 
                  src={sectionImage3}
                  alt="Large group celebration on Clever Girl"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  data-testid="image-gallery-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Large Groups</h3>
                  <p className="text-white/80 text-sm">Up to 75 guests</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-faq">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about planning your Austin event.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <AccordionItem value={`item-${index}`} className="bg-white dark:bg-gray-800 rounded-lg mb-4 px-6 border">
                    <AccordionTrigger className="text-left font-semibold py-4" data-testid={`faq-trigger-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-brand-blue via-purple-700 to-brand-blue text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-final-cta">
                Your Austin Event, Perfected
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                Planning an event in Austin no longer needs to be complex. With Premier Party Cruises, 
                you gain access to a unique, integrated solution that makes your celebration unforgettable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-10 py-6" data-testid="button-book-now-final">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Your Party Cruise
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-10 py-6" data-testid="button-quote-final">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Free Quote
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Free cancellation 48hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Best price guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <RelatedBlogArticles category="planning" currentSlug="/blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options" />
        <Footer />
      </div>
    </>
  );
}
