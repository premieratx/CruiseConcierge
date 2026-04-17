import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Camera, Phone, Clock, CheckCircle2, 
  Image, Award, Sparkles, MapPin, Calendar, Star,
  ArrowRight, Building2, Video, PartyPopper,
  Package, Anchor, Sun, Heart, Focus, Aperture,
  Download, Share2, Film, Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage1 from '@assets/@capitalcityshots-11_1760080740019.jpg';
import sectionImage2 from '@assets/@capitalcityshots-12_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-13_1760080740020.jpg';

const photographyOptions = [
  {
    title: 'DIY Photography',
    icon: Smartphone,
    price: 'Included',
    description: 'Capture your own Lake Travis boat party photography memories',
    features: [
      'Stunning natural backdrops',
      'Perfect lighting during golden hour',
      'Multiple scenic photo spots',
      'Use your own devices for party boat photos Austin'
    ],
    best: 'Budget-conscious groups',
    color: 'border-blue-500',
    headerBg: 'bg-blue-500'
  },
  {
    title: 'Professional Package',
    icon: Camera,
    price: 'Starting at $300',
    description: 'Hire a pro for boat party photographer Lake Travis quality',
    features: [
      'Professional photographer on board',
      '2-3 hours of coverage',
      'Edited digital gallery',
      'High-resolution Austin boat party pictures'
    ],
    best: 'Bachelorette parties, special celebrations',
    color: 'border-green-500',
    headerBg: 'bg-green-500',
    popular: true
  },
  {
    title: 'Premium Package',
    icon: Film,
    price: 'Starting at $600',
    description: 'Full photos on Lake Travis party boat coverage',
    features: [
      'Extended photographer coverage',
      'Video highlights included',
      'Same-day preview photos',
      'Complete Lake Travis boat party photography package'
    ],
    best: 'Corporate events, weddings',
    color: 'border-purple-500',
    headerBg: 'bg-purple-500'
  }
];

const photoSpots = [
  { icon: Sun, title: 'Sunset Backdrop', description: 'Golden hour creates stunning Lake Travis boat party photography' },
  { icon: Anchor, title: 'Bow of the Boat', description: 'Classic party boat photos Austin with open water behind' },
  { icon: Sparkles, title: 'Disco Ball Area', description: 'Clever Girl\'s 14 disco balls for unique photos on Lake Travis party boat' },
  { icon: Image, title: 'Lake Travis Cliffs', description: 'Dramatic cliff backgrounds for boat party photographer Lake Travis shots' },
  { icon: Focus, title: 'Swim Stop Coves', description: 'Scenic coves provide beautiful Austin boat party pictures locations' },
  { icon: Camera, title: 'Action Shots', description: 'Dancing, swimming, and celebration moments for Lake Travis boat party photography' }
];

const photoTips = [
  { icon: Sun, title: 'Book Sunset Cruises', description: 'Golden hour (1-2 hours before sunset) offers best party boat photos Austin lighting' },
  { icon: Smartphone, title: 'Protect Your Phone', description: 'Use waterproof cases for photos on Lake Travis party boat near water' },
  { icon: Camera, title: 'Clean Your Lens', description: 'Wipe off water spots for clear boat party photographer Lake Travis shots' },
  { icon: Focus, title: 'Shoot Candidly', description: 'Natural moments make the best Austin boat party pictures memories' },
  { icon: Image, title: 'Include the Scenery', description: 'Capture Lake Travis backgrounds in your Lake Travis boat party photography' },
  { icon: Share2, title: 'Share a Hashtag', description: 'Create a party hashtag so guests can share party boat photos Austin' }
];

const boatPhotoFeatures = [
  {
    boat: 'Day Tripper',
    capacity: '14 guests',
    highlights: ['Intimate photo opportunities', 'Single-deck with arch canopy', 'Perfect for small group Lake Travis boat party photography'],
    icon: Users
  },
  {
    boat: 'Meeseeks',
    capacity: '25 guests',
    highlights: ['Medium group setups', 'Great natural lighting', 'Ideal party boat photos Austin for friends'],
    icon: Camera
  },
  {
    boat: 'The Irony',
    capacity: '30 guests',
    highlights: ['Spacious for group shots', 'Multiple photo zones', 'Popular photos on Lake Travis party boat option'],
    icon: Image
  },
  {
    boat: 'Clever Girl',
    capacity: '50-75 guests',
    highlights: ['14 disco balls for unique backdrops', 'Maximum dance floor photos', 'Best boat party photographer Lake Travis features'],
    icon: Sparkles
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
    question: 'Can we take our own Lake Travis boat party photography?',
    answer: 'Absolutely! Lake Travis boat party photography with your own devices is encouraged. All our boats provide stunning backdrops for party boat photos Austin. Sunset cruises offer the best lighting for photos on Lake Travis party boat. Just be careful with devices near water and consider waterproof protection.'
  },
  {
    question: 'Do you offer professional boat party photographer Lake Travis services?',
    answer: 'Yes! We can connect you with professional boat party photographer Lake Travis options. Starting at $300, you\'ll get 2-3 hours of on-boat coverage and edited digital photos. This is popular for Austin boat party pictures at bachelor/bachelorette parties and special celebrations.'
  },
  {
    question: 'What makes great photos on Lake Travis party boat?',
    answer: 'The best photos on Lake Travis party boat feature natural lighting, scenic backgrounds, and candid moments. Sunset cruises provide golden hour magic for Lake Travis boat party photography. Use the water, cliffs, and boat features like Clever Girl\'s disco balls for unique party boat photos Austin.'
  },
  {
    question: 'When is the best time for Austin boat party pictures?',
    answer: 'The best Austin boat party pictures happen 1-2 hours before sunset during "golden hour." This soft, warm light is perfect for Lake Travis boat party photography. Morning cruises also offer great lighting without harsh shadows for photos on Lake Travis party boat.'
  },
  {
    question: 'Can a photographer stay on board the entire party boat photos Austin cruise?',
    answer: 'Yes! For professional party boat photos Austin coverage, photographers can stay the entire cruise. This ensures you capture boat party photographer Lake Travis moments from departure to swimming stops to dancing. We recommend at least 2-3 hours of coverage for comprehensive Austin boat party pictures.'
  },
  {
    question: 'What should we wear for Lake Travis boat party photography?',
    answer: 'For Lake Travis boat party photography, consider coordinating group colors for cohesive photos on Lake Travis party boat. Bright colors photograph well on water. Bring multiple outfits if celebrating a special occasion. Sunglasses add style to party boat photos Austin but remove for some shots.'
  },
  {
    question: 'Are drones allowed for boat party photographer Lake Travis shoots?',
    answer: 'Drone policies for boat party photographer Lake Travis depend on location and regulations. Lake Travis has some drone restrictions. If you\'re interested in aerial Austin boat party pictures, let us know in advance so we can discuss options and any required permissions for Lake Travis boat party photography.'
  },
  {
    question: 'How do we get our photos on Lake Travis party boat after the cruise?',
    answer: 'For professional photos on Lake Travis party boat, you\'ll typically receive an online gallery within 1-2 weeks. High-resolution downloads are included. For DIY party boat photos Austin, we recommend creating a shared album or party hashtag so everyone can contribute their Lake Travis boat party photography.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get Quote', icon: Star }
];

export default function LakeTravisBoatPartyPhotography() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water"
        defaultTitle="Lake Travis Boat Party Photography - Capturing Perfect Memories | Premier Party Cruises"
        defaultDescription="Complete guide to Lake Travis boat party photography. Party boat photos Austin tips, professional boat party photographer Lake Travis options, and how to capture amazing photos on Lake Travis party boat. Austin boat party pictures made easy."
        defaultKeywords={['Lake Travis boat party photography', 'party boat photos Austin', 'boat party photographer Lake Travis', 'photos on Lake Travis party boat', 'Austin boat party pictures', 'Lake Travis party boat photos', 'party boat photography Austin']}
        image={heroImage}
      />

      <BlogV2Layout
        title="Lake Travis Boat Party Photography - Capturing Perfect Memories"
        description="Complete guide to Lake Travis boat party photography. Party boat photos Austin tips, professional boat party photographer Lake Travis options, and how to capture amazing photos on Lake Travis party boat. Austin boat party pictures made easy."
        slug="lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water"
        category="Planning Guides"
        categoryHref="/private-cruises"
        pillarTitle="Private Party Boat Charters"
        pillarHref="/private-cruises"
        relatedArticles={[
          { title: "Lake Travis Boat Party Entertainment - Activities & Amenities", href: "/blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events" },
          { title: "Lake Travis Boat Party Music - Sound Systems & Entertainment", href: "/blogs/lake-travis-boat-party-music-sound-systems-and-entertainment-coordination" },
          { title: "Lake Travis Boat Party Catering - Food & Beverage", href: "/blogs/lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events" },
        ]}
      >
      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-photography-page">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-rose-900 via-pink-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party photography - stunning photos on party boat Austin"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Photography Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Photography<br />
              <span className="text-amber-400">Capturing Perfect Memories</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Everything you need for amazing party boat photos Austin. From DIY tips to professional boat party photographer Lake Travis options, capture unforgettable photos on Lake Travis party boat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Book Your Cruise</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-rose-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Explore our full guide to{' '}
            <Link href="/party-boat-lake-travis" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Lake Travis party boat rentals</Link>{' '}
            for everything from pricing and logistics to safety and entertainment.
          </p>
        </div>
      </div>


        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-rose-600 dark:text-rose-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Party boat photos Austin - guests taking Lake Travis boat party photography at sunset"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Photography Options */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="options-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-rose-100 text-rose-700">PHOTOGRAPHY OPTIONS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="options-title">Lake Travis Boat Party Photography Packages</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose how to capture your party boat photos Austin memories
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {photographyOptions.map((option, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${option.color} border-2 ${option.popular ? 'ring-2 ring-amber-400' : ''}`} data-testid={`card-option-${index}`}>
                    {option.popular && (
                      <div className="bg-amber-400 text-black text-center py-1 font-bold text-sm">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className={`${option.headerBg} text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{option.title}</CardTitle>
                          <p className="text-white/90">{option.price}</p>
                        </div>
                        <option.icon className="h-10 w-10" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{option.description}</p>
                      <ul className="space-y-2 mb-4">
                        {option.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <strong>Best for:</strong> {option.best}
                      </p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Spots */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="spots-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-pink-100 text-pink-700">PHOTO LOCATIONS</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="spots-title">Best Spots for Photos on Lake Travis Party Boat</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  These locations create stunning Austin boat party pictures
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {photoSpots.map((spot, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                      <spot.icon className="h-6 w-6 text-rose-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{spot.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{spot.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage1}
                  alt="Boat party photographer Lake Travis - professional photos on Lake Travis party boat"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-spots"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Photo Tips */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">PRO TIPS</Badge>
              <h2 className="text-3xl font-bold mb-4">Austin Boat Party Pictures Tips</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Expert advice for amazing Lake Travis boat party photography
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoTips.map((tip, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-tip-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <tip.icon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{tip.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Photo Features */}
        <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-900" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">BY VESSEL</Badge>
              <h2 className="text-3xl font-bold mb-4">Party Boat Photos Austin by Boat</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Each vessel offers unique boat party photographer Lake Travis opportunities
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatPhotoFeatures.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-boat-${index}`}>
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center mb-3">
                          <boat.icon className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                        </div>
                        <h3 className="font-bold text-xl">{boat.boat}</h3>
                        <p className="text-rose-600 dark:text-rose-400 font-medium">{boat.capacity}</p>
                      </div>
                      <ul className="space-y-2">
                        {boat.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">Lake Travis Boat Party Photography FAQs</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Common questions about party boat photos Austin and boat party photographer Lake Travis
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-white dark:bg-gray-900 rounded-lg px-6" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
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

        {/* Internal Links Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Party Options</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find the perfect Lake Travis experience for your photos
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid={`link-card-${index}`}>
                      <CardContent className="pt-6 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-rose-600" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-rose-900 via-pink-800 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Stunning Lake Travis Boat Party Photography?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Book your cruise and capture amazing party boat photos Austin. Whether DIY or professional boat party photographer Lake Travis, your photos on Lake Travis party boat will be unforgettable!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                  data-testid="button-final-quote"
                >
                  <Link href="/book-now">Book Your Cruise</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-rose-900 font-semibold"
                  data-testid="button-final-call"
                >
                  <a href="tel:512-488-5892">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 512-488-5892
                  </a>
                </Button>
              </div>
            </m.div>
          </div>
        </section>

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}
