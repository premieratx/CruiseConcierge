import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Shield,
  ThumbsUp, Heart, Sparkles, Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-2_1760072938923.jpg';
import sectionImage1 from '@assets/@capitalcityshots-3_1760072938923.jpg';
import sectionImage2 from '@assets/@capitalcityshots-4_1760072938923.jpg';
import sectionImage3 from '@assets/@capitalcityshots-5_1760072938923.jpg';
import sectionImage4 from '@assets/@capitalcityshots-1_1760072938922.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const whyPremierStats = [
  { stat: '14+', label: 'Years of Excellence' },
  { stat: '125K+', label: 'Happy Guests Served' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const premierAdvantages = [
  { 
    icon: Shield, 
    title: 'Perfect Safety Record', 
    description: 'Premier Party Cruises Austin maintains an impeccable safety record with USCG-certified vessels and trained crew',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Users, 
    title: 'Professional Crew', 
    description: 'Our experienced captains and crew ensure your corporate event runs smoothly from start to finish',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Sparkles, 
    title: 'All-Inclusive Options', 
    description: 'The best corporate boat rental Austin offers with catering coordination and premium amenities',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Handshake, 
    title: 'Party On Delivery', 
    description: 'Exclusive partnership for hassle-free alcohol and beverage delivery right to your Lake Travis party boat company event',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const whatSetsPremierApart = [
  {
    title: 'Dedicated Corporate Services',
    description: 'Premier Party Cruises Austin specializes in professional business events',
    features: [
      'Dedicated event coordinator for your group',
      'Flexible scheduling for busy professionals',
      'Custom branding opportunities available',
      'Professional atmosphere maintained'
    ]
  },
  {
    title: 'Premium Fleet Selection',
    description: 'Best corporate boat rental Austin with boats for every group size',
    features: [
      'Day Tripper: Intimate 14-guest cruises',
      'Meeseeks: 25-guest departmental events',
      'Clever Girl: 50-guest team celebrations',
      'Clever Girl: 75-guest company-wide parties'
    ]
  },
  {
    title: 'Turnkey Event Solutions',
    description: 'Lake Travis party boat company that handles every detail',
    features: [
      'Catering partner coordination',
      'Party On Delivery alcohol service',
      'Sound system and entertainment setup',
      'Swimming and water activities included'
    ]
  },
  {
    title: 'Unmatched Experience',
    description: 'Austin boat party reviews consistently highlight our excellence',
    features: [
      '14+ years serving Austin businesses',
      '125,000+ satisfied guests',
      'Perfect safety record maintained',
      '5-star ratings across platforms'
    ]
  }
];

const testimonialHighlights = [
  {
    quote: "Premier Party Cruises Austin exceeded our expectations for our annual company retreat. The crew was professional and the views were incredible.",
    author: "Sarah M.",
    company: "Austin Tech Startup",
    rating: 5
  },
  {
    quote: "Best corporate boat rental Austin has to offer! Our clients were impressed and the event helped us close two major deals.",
    author: "Michael R.",
    company: "Financial Services Firm",
    rating: 5
  },
  {
    quote: "The Lake Travis party boat company experience was perfect for our team building day. Everyone is still talking about it months later.",
    author: "Jennifer L.",
    company: "Marketing Agency",
    rating: 5
  },
  {
    quote: "Austin boat party reviews led us to Premier, and they delivered exactly what we needed for our milestone celebration.",
    author: "David K.",
    company: "Construction Company",
    rating: 5
  }
];

const premierDifference = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Premier Party Cruises Austin prioritizes guest safety with USCG-certified vessels, trained captains, and comprehensive safety briefings. Our perfect safety record speaks to our commitment.',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Service Excellence',
    description: 'As the best corporate boat rental Austin provider, we go above and beyond. From planning to execution, our team ensures every detail is perfect for your corporate event.',
    color: 'text-red-500'
  },
  {
    icon: ThumbsUp,
    title: 'Satisfaction Guaranteed',
    description: 'Lake Travis party boat company with thousands of 5-star reviews. Austin boat party reviews consistently praise our professionalism and attention to detail.',
    color: 'text-green-600'
  }
];

const faqs = [
  {
    question: 'What makes Premier Party Cruises Austin the best choice for corporate events?',
    answer: 'Premier Party Cruises Austin stands out with 14+ years of experience, 125,000+ happy guests, and a perfect safety record. As the best corporate boat rental Austin offers, we provide professional crew, all-inclusive options, and dedicated corporate event coordination.'
  },
  {
    question: 'How do Austin boat party reviews rate Premier Party Cruises?',
    answer: 'Austin boat party reviews consistently rate Premier Party Cruises at 5 stars across Google, Yelp, and other platforms. Clients praise our professional service, beautiful boats, and seamless corporate event execution.'
  },
  {
    question: 'What corporate packages does your Lake Travis party boat company offer?',
    answer: 'Our Lake Travis party boat company offers boats for groups of 14 to 75 guests. Corporate packages include private charters, catering coordination through our partners, and our exclusive Party On Delivery beverage service.'
  },
  {
    question: 'Why is Premier the best corporate boat rental Austin businesses choose?',
    answer: 'Companies choose Premier as the best corporate boat rental Austin because of our professional approach, flexible scheduling, premium fleet, and all-inclusive event solutions. We understand business needs and deliver accordingly.'
  },
  {
    question: 'What safety measures does Premier Party Cruises Austin have in place?',
    answer: 'Premier Party Cruises Austin maintains USCG-certified vessels, licensed captains, comprehensive safety briefings, and life jackets for all guests. Our perfect safety record over 14+ years demonstrates our commitment to guest wellbeing.'
  },
  {
    question: 'Can Premier coordinate catering and beverages for corporate events?',
    answer: 'Yes! As a full-service Lake Travis party boat company, we partner with local caterers and our exclusive Party On Delivery service for beverages. We handle the coordination so you can focus on your guests.'
  },
  {
    question: 'How far in advance should we book with Premier Party Cruises Austin?',
    answer: 'For corporate events with Premier Party Cruises Austin, we recommend booking 3-4 weeks in advance. Popular dates for the best corporate boat rental Austin fill quickly, especially during spring and fall seasons.'
  },
  {
    question: 'What do Austin boat party reviews say about Premier for team building?',
    answer: 'Austin boat party reviews highlight Premier as ideal for team building due to our professional crew, private charter experience, and beautiful Lake Travis setting. Companies report improved team morale and lasting memories.'
  }
];

const boatOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Executive team outings' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department celebrations' },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Team building events' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Company-wide parties' }
];

export default function WhyAustinCompaniesChoosePremier() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Why Austin Companies Choose Premier Party Cruises | Best Corporate Boat Rental Austin</title>
        <meta name="description" content="Discover why Austin companies choose Premier Party Cruises for corporate events. Best corporate boat rental Austin with 14+ years experience, 125K+ guests, perfect safety record. Lake Travis party boat company with 5-star Austin boat party reviews." />
        <meta name="keywords" content="premier party cruises Austin, best corporate boat rental Austin, Lake Travis party boat company, Austin boat party reviews, corporate events Austin, team building Lake Travis" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/why-austin-companies-choose-premier" />
        <meta property="og:title" content="Why Austin Companies Choose Premier Party Cruises | Best Corporate Boat Rental Austin" />
        <meta property="og:description" content="Premier Party Cruises Austin: 14+ years, 125K+ guests, perfect safety record. The best corporate boat rental Austin trusts for corporate events." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-why-austin-companies-choose-premier">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-corporate">
              TRUSTED BY AUSTIN BUSINESSES
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Why Austin Companies Choose Premier Party Cruises
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              The Best Corporate Boat Rental Austin Trusts for 14+ Years
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Premier Party Cruises Austin has served 125,000+ guests with a perfect safety record. Discover why we're the Lake Travis party boat company businesses choose.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Corporate Event
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View Corporate Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 bg-blue-900 text-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyPremierStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`stat-${index}`}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage}
                alt="Premier Party Cruises Austin best corporate boat rental Lake Travis"
                className="w-full h-[400px] object-cover"
                data-testid="image-hero"
              />
            </div>
          </div>
        </section>

        {/* Why Premier Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-why-premier">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">WHY PREMIER PARTY CRUISES</Badge>
              <h2 className="text-3xl font-bold mb-4">14+ Years as Austin's Premier Corporate Event Partner</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Premier Party Cruises Austin has built a reputation as the best corporate boat rental Austin offers. With 125,000+ guests served and a perfect safety record, companies trust us for their most important events.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premierAdvantages.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`advantage-card-${index}`}>
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

        {/* What Sets Premier Apart Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-what-sets-apart">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">WHAT SETS PREMIER APART</Badge>
                  <h2 className="text-3xl font-bold mb-6">The Best Corporate Boat Rental Austin Has to Offer</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    When companies search for the best corporate boat rental Austin provides, Premier Party Cruises Austin consistently comes out on top. Our Lake Travis party boat company offers professional service, premium vessels, and turnkey solutions. Austin boat party reviews highlight our attention to detail and seamless event execution.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {whatSetsPremierApart.map((item, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`sets-apart-card-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                          <ul className="space-y-1">
                            {item.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-blue-600 flex items-center gap-1">
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
                      alt="Premier Party Cruises Austin corporate event Lake Travis party boat company"
                      className="w-full h-full object-cover"
                      data-testid="image-section-1"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="font-bold text-sm">5-Star Rated</p>
                        <p className="text-xs text-gray-500">Austin boat party reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Client Testimonials Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="section-testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-yellow-400 text-black">CLIENT TESTIMONIALS</Badge>
              <h2 className="text-3xl font-bold mb-4">Austin Boat Party Reviews Speak for Themselves</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                See why companies rate Premier Party Cruises Austin as the best corporate boat rental Austin offers. These Austin boat party reviews highlight our commitment to excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonialHighlights.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="bg-white/10 border-white/20 h-full" data-testid={`testimonial-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-yellow-400 mb-4" />
                      <p className="text-white/90 mb-4 italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-bold text-white">{testimonial.author}</p>
                        <p className="text-white/60 text-sm">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Experience the Lake Travis Party Boat Company Difference</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Premier Party Cruises Austin provides unforgettable experiences on Lake Travis. See why we're the best corporate boat rental Austin businesses recommend.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage2}
                  alt="Best corporate boat rental Austin team building event Premier Party Cruises"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  data-testid="image-gallery-1"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage3}
                  alt="Lake Travis party boat company corporate celebration Austin boat party reviews"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  data-testid="image-gallery-2"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage4}
                  alt="Premier Party Cruises Austin client entertainment best corporate boat rental"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  data-testid="image-gallery-3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Premier Difference Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-premier-difference">
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
                      alt="Premier Party Cruises Austin Lake Travis party boat company reviews"
                      className="w-full h-full object-cover"
                      data-testid="image-premier-difference"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-blue-100 text-blue-700">THE PREMIER DIFFERENCE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Safety, Service, Satisfaction</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Premier Party Cruises Austin built our reputation on three pillars: safety, service, and satisfaction. As the best corporate boat rental Austin offers, we've maintained a perfect safety record while delivering exceptional experiences that earn us 5-star Austin boat party reviews.
                  </p>
                  
                  <div className="space-y-6">
                    {premierDifference.map((item, index) => (
                      <div key={index} className="flex gap-4" data-testid={`difference-item-${index}`}>
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-boats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">OUR FLEET</Badge>
              <h2 className="text-3xl font-bold mb-4">Best Corporate Boat Rental Austin Fleet Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Premier Party Cruises Austin offers four premium vessels. Our Lake Travis party boat company has the perfect boat for every corporate event size.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatOptions.map((boat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`boat-option-${index}`}>
                  <CardContent className="pt-6">
                    <Ship className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-lg mb-1">{boat.name}</h3>
                    <p className="text-yellow-600 font-semibold mb-2">{boat.capacity}</p>
                    <p className="text-gray-500 text-sm">{boat.best}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-explore-fleet">
                  Explore Our Full Fleet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="section-explore">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore Premier Party Cruises Austin Services</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Discover why Premier Party Cruises Austin is the best corporate boat rental Austin offers for every type of business event.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/team-building">
                <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer h-full" data-testid="link-team-building">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="font-bold text-white mb-2">Team Building</h3>
                    <p className="text-white/70 text-sm">Build stronger teams on Lake Travis</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/client-entertainment">
                <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer h-full" data-testid="link-client-entertainment">
                  <CardContent className="p-6 text-center">
                    <Handshake className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="font-bold text-white mb-2">Client Entertainment</h3>
                    <p className="text-white/70 text-sm">Impress clients with unforgettable events</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/private-cruises">
                <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer h-full" data-testid="link-private-cruises">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="font-bold text-white mb-2">Private Cruises</h3>
                    <p className="text-white/70 text-sm">Exclusive charters for your group</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/corporate-events">
                <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer h-full" data-testid="link-corporate-events">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="font-bold text-white mb-2">Corporate Events</h3>
                    <p className="text-white/70 text-sm">Full-service corporate solutions</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FREQUENTLY ASKED QUESTIONS</Badge>
              <h2 className="text-3xl font-bold mb-4">FAQs About Premier Party Cruises Austin</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get answers about why we're the best corporate boat rental Austin and learn more about our Lake Travis party boat company services.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-lg px-6 bg-gray-50 dark:bg-gray-800"
                  data-testid={`faq-item-${index}`}
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

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="section-final-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Experience the Best Corporate Boat Rental Austin Offers?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join the thousands of companies who trust Premier Party Cruises Austin for their corporate events. Our Lake Travis party boat company is ready to make your event unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/testimonials-faq">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-read-reviews">
                    <Star className="mr-2 h-5 w-5" />
                    Read Austin Boat Party Reviews
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
