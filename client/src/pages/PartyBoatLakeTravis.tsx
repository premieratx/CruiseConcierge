import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import SEOHead from '@/components/SEOHead';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { SectionReveal } from '@/components/SectionReveal';
import { privateCruiseReviews } from '@shared/reviews-data';
import { 
  Ship, Users, Star, MapPin, Clock, DollarSign, Shield, Trophy, 
  PartyPopper, Music, Anchor, Heart, Camera, CheckCircle, ArrowRight,
  Phone, Mail, Navigation, Sparkles, Award, Crown, MessageCircle, X,
  Waves, Sun
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { 
  BOATS, 
  HOURLY_RATES, 
  DISCO_PRICING,
  ADDON_FEES 
} from '@shared/constants';

const heroImage1 = '/attached_assets/bachelor-party-group-guys.jpg';
const heroImage2 = '/attached_assets/atx-disco-cruise-party.jpg';
const heroImage3 = '/attached_assets/dancing-party-scene.jpg';
const galleryImage1 = '/attached_assets/day-tripper-14-person-boat.jpg';
const galleryImage2 = '/attached_assets/meeseeks-25-person-boat.jpg';
const galleryImage3 = '/attached_assets/clever-girl-50-person-boat.jpg';
const partyAtmosphere1 = '/attached_assets/party-atmosphere-1.jpg';
const partyAtmosphere2 = '/attached_assets/party-atmosphere-2.jpg';
const partyAtmosphere3 = '/attached_assets/party-atmosphere-3.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const faqData = [
  {
    question: 'What makes Lake Travis the best party boat location?',
    answer: 'Clearest water in Texas, 270+ miles of shoreline, year-round 70° water temp, secluded coves.'
  },
  {
    question: 'How much does a Lake Travis party boat cost?',
    answer: `Private: $${HOURLY_RATES.MON_THU[14] / 100}/hr (weekdays), 4-hour minimum. ATX Disco Cruise (exclusively for bachelor, bachelorette & combined bach parties): $${DISCO_PRICING.basic / 100}+ per person.`
  },
  {
    question: 'Where do Lake Travis party boats depart?',
    answer: 'Anderson Mill Marina: 13993 FM 2769, Leander, TX 78641 (30 min from downtown Austin).'
  },
  {
    question: 'What\'s included in Lake Travis party boat rentals?',
    answer: 'Licensed captain & crew, premium Bluetooth sound, coolers/ice, safety equipment, fuel.'
  },
  {
    question: 'Best Lake Travis swimming spots?',
    answer: "Devil's Cove, Starnes Island, Paradise Cove—secluded, crystal-clear water for swimming."
  },
  {
    question: 'Best time of year for Lake Travis?',
    answer: 'Peak: April–September. Year-round water 70°; March–October best water levels.'
  },
  {
    question: 'Lake Travis vs. other Texas lakes?',
    answer: 'Clearest water, deepest lake, most scenic cliffs, safest for party boats—unmatched in Texas.'
  },
  {
    question: 'How long is a Lake Travis cruise?',
    answer: '4-hour minimum on private charters; ATX Disco Cruise (bachelor/bachelorette parties only) is 4 hours (Fridays & Saturdays).'
  }
];

const whyChooseLakeTravis = [
  {
    icon: Waves,
    title: 'Clearest Water in Texas',
    description: 'Lake Travis boasts the clearest, most pristine water in Texas with visibility up to 20 feet deep. The crystal-clear water and constant 70-degree temperature make Lake Travis perfect for swimming and water activities year-round.'
  },
  {
    icon: MapPin,
    title: '270 Miles of Shoreline',
    description: 'With over 270 miles of stunning shoreline and 60+ miles of pristine waterways, Lake Travis offers endless exploration. Discover secluded coves, dramatic limestone cliffs, and hidden beaches throughout Lake Travis.'
  },
  {
    icon: Sun,
    title: 'Year-Round Perfect Weather',
    description: 'Lake Travis enjoys over 300 days of sunshine annually with mild winters and warm summers. The lake\'s protected location and consistent water temperature make Lake Travis party boats enjoyable every season.'
  },
  {
    icon: Trophy,
    title: '15+ Years on Lake Travis',
    description: 'Established in 2009, we\'re Lake Travis\'s longest-running party boat company with unmatched expertise navigating the lake\'s coves, beaches, and waterways. Our Lake Travis knowledge ensures the best experience.'
  },
  {
    icon: Star,
    title: '150K+ Lake Travis Guests',
    description: 'Over 150,000 satisfied customers have celebrated on our Lake Travis party boats, making unforgettable memories on this stunning Central Texas treasure.'
  },
  {
    icon: Shield,
    title: 'Perfect Lake Travis Safety Record',
    description: 'Our licensed, fun, experienced captains know Lake Travis intimately and maintain a pristine safety record. Every Lake Travis cruise is conducted with the highest safety standards and local expertise.'
  }
];

const lakeTravisFleetShowcase = [
  {
    name: BOATS.DAY_TRIPPER.displayName,
    capacity: BOATS.DAY_TRIPPER.capacity,
    description: 'Perfect for intimate Lake Travis adventures',
    features: ['Premium sound system', 'Lake Travis navigation', 'Coolers with ice', 'Swimming at Lake Travis coves'],
    image: galleryImage1,
    startingPrice: `$${HOURLY_RATES.MON_THU[14] / 100}/hr`,
    ideal: 'Small groups exploring Lake Travis'
  },
  {
    name: BOATS.ME_SEEKS_THE_IRONY.displayName,
    capacity: `${BOATS.ME_SEEKS_THE_IRONY.seatingCapacity}-${BOATS.ME_SEEKS_THE_IRONY.capacity}`,
    description: 'Most popular Lake Travis party boat',
    features: ['Spacious Lake Travis cruising', 'Premium audio', 'Shade cover', 'Access to best Lake Travis spots'],
    image: galleryImage2,
    startingPrice: `$${HOURLY_RATES.MON_THU[25] / 100}/hr`,
    ideal: 'Bachelorette parties on Lake Travis'
  },
  {
    name: BOATS.CLEVER_GIRL.displayName,
    capacity: `${BOATS.CLEVER_GIRL.seatingCapacity}-${BOATS.CLEVER_GIRL.capacity}`,
    description: 'Lake Travis\'s premier flagship party boat',
    features: ['14 disco balls', 'Giant Texas flag', 'Maximum Lake Travis space', 'VIP Lake Travis experience'],
    image: galleryImage3,
    startingPrice: `$${HOURLY_RATES.MON_THU[50] / 100}/hr`,
    ideal: 'Large Lake Travis celebrations'
  }
];

const lakeTravisPackages = [
  {
    title: 'Bachelorette Parties on Lake Travis',
    icon: Heart,
    description: 'Create unforgettable Lake Travis bachelorette memories with our specialized packages. Cruise Lake Travis\'s most beautiful coves with your best friends.',
    price: `Starting at $${DISCO_PRICING.basic / 100}/person`,
    features: [
      'Lake Travis\'s best party spots',
      'Swimming at secluded Lake Travis coves',
      'Professional photos on Lake Travis',
      'Bride cruises free on Lake Travis'
    ],
    highlight: 'Most Popular on Lake Travis',
    link: '/bachelorette-party-austin'
  },
  {
    title: 'Bachelor Parties on Lake Travis',
    icon: PartyPopper,
    description: 'Epic Lake Travis bachelor party experiences with premium amenities. Explore Lake Travis like never before with your crew.',
    price: `Starting at $${HOURLY_RATES.MON_THU[25] / 100}/hr`,
    features: [
      'Full Lake Travis access',
      'Water toys for Lake Travis fun',
      'Premium sound on Lake Travis',
      'Expert Lake Travis captains'
    ],
    highlight: 'Lake Travis Adventure',
    link: '/bachelor-party-austin'
  },
  {
    title: 'Corporate Events on Lake Travis',
    icon: Award,
    description: 'Professional Lake Travis corporate events and team building. Impress clients and reward your team on beautiful Lake Travis.',
    price: 'Custom Lake Travis pricing',
    features: [
      'Private Lake Travis venues',
      'Tables & coolers provided on Lake Travis',
      'Professional Lake Travis service',
      'Scenic Lake Travis backdrop'
    ],
    highlight: 'Premium Lake Travis Experience',
    link: '/corporate-events'
  }
];


export default function PartyBoatLakeTravis() {
  const reducedMotion = useReducedMotion();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        pageRoute="/party-boat-lake-travis"
        defaultTitle="Party Boat Lake Travis | Austin Cruises"
        defaultDescription="Premier Lake Travis party boats. Crystal clear water, 270 miles of shoreline. ATX Disco & private charters. 150K+ happy guests!"
        defaultKeywords={['party boat Lake Travis', 'Lake Travis party boat', 'Lake Travis boat rental', 'party boat rental Lake Travis', 'Lake Travis party cruise']}
      />

      <ClientOnly><PublicNavigation /></ClientOnly>

      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-20">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/FABtEDZZBA0?autoplay=1&mute=1&loop=1&playlist=FABtEDZZBA0&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&playsinline=1"
            title="Premier Party Cruises Drone Video Background"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 'none' }}
            data-testid="youtube-background-video"
          />
          {/* White Overlay for contrast - 60% opacity */}
          <div className="absolute inset-0 bg-white/60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex-grow flex items-center w-full">
          <motion.div 
            className="max-w-4xl mx-auto text-center w-full"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Badge className="bg-yellow-100 text-gray-900 border-yellow-400 text-lg px-6 py-2 font-sans tracking-wider" data-testid="badge-lake-travis-1">
                <MapPin className="w-4 h-4 mr-2" />
                Lake Travis's Premier Party Boat
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-5xl font-playfair font-bold mb-6 leading-tight text-center text-gray-900"
              variants={fadeInUp}
              data-testid="heading-hero"
            >
              Party Boat Lake Travis: Austin's Premier Lake Party Cruise Experience
            </motion.h1>

            <motion.p 
              className="text-base md:text-lg mb-8 text-gray-700"
              variants={fadeInUp}
              data-testid="text-hero-subtitle"
            >
              Experience the clearest water in Texas with 270 miles of pristine Lake Travis shoreline. Your ultimate Lake Travis party boat adventure awaits just 30 minutes from Austin!
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-6"
                asChild
                data-testid="button-book-lake-travis"
              >
                <Link href="/chat">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book Lake Travis Party Boat
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-8 py-6"
                onClick={() => setShowQuoteBuilder(true)}
                data-testid="button-quote-lake-travis"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Lake Travis Quote
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex flex-wrap gap-8 justify-center items-center text-sm"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-gray-700" data-testid="stat-experience">
                <Trophy className="h-5 w-5 text-blue-600" />
                <span>15+ Years on Lake Travis</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700" data-testid="stat-guests">
                <Users className="h-5 w-5 text-blue-600" />
                <span>150K+ Lake Travis Guests</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700" data-testid="stat-safety">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Perfect Lake Travis Safety Record</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-base md:text-lg font-semibold">
              <span className="text-blue-600">Clearest Water in Texas</span> • 270 Miles of Shoreline • <span className="text-blue-600">Year-Round 70° Water</span>
            </p>
          </div>
        </div>
      </section>

      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-testid="heading-why-lake-travis">
                Why Choose Lake Travis for Your Party Boat?
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto" data-testid="text-why-subtitle">
                Lake Travis is Central Texas's premier party boat destination, offering crystal-clear waters, stunning scenery, and year-round perfect conditions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseLakeTravis.map((reason, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-shadow rounded-xl" data-testid={`card-reason-${index}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <reason.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-playfair">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-testid="heading-complete-guide">
                Complete Lake Travis Party Boat Guide
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto" data-testid="text-guide-subtitle">
                Discover the perfect Lake Travis party boat experience for your celebration. From bachelor parties to corporate events, we specialize in creating unforgettable Austin experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/bachelor-party-austin">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group rounded-xl" data-testid="card-guide-bachelor">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Crown className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-playfair group-hover:text-blue-600 transition-colors">
                      Austin Bachelor Party Boats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-sm">
                      Epic bachelor party cruises on Lake Travis with ATX Disco Cruise or private charters. Professional DJ, photographer, and groom cruises free!
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/bachelorette-party-austin">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group rounded-xl" data-testid="card-guide-bachelorette">
                  <CardHeader>
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <CardTitle className="text-lg font-playfair group-hover:text-pink-600 transition-colors">
                      Lake Travis Bachelorette Parties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-sm">
                      Ultimate bachelorette party on Lake Travis! Bride cruises FREE, professional entertainment, and unforgettable Austin memories.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/atx-disco-cruise">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group rounded-xl" data-testid="card-guide-atx-disco">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg font-playfair group-hover:text-purple-600 transition-colors">
                      ATX Disco Cruise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-sm">
                      Join the legendary party boat experience on Lake Travis! <strong>Exclusively for bachelor, bachelorette & combined bach parties.</strong> Professional DJ, photographer, giant floats, and the ultimate Austin celebration.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/corporate-events">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group rounded-xl" data-testid="card-guide-corporate">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Award className="h-6 w-6 text-gray-600" />
                    </div>
                    <CardTitle className="text-lg font-playfair group-hover:text-gray-600 transition-colors">
                      Austin Corporate Events on Lake Travis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-sm">
                      Professional corporate cruises for team building and client entertainment. Tax-deductible Lake Travis business events.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-testid="heading-fleet">
                Lake Travis Party Boat Fleet
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto" data-testid="text-fleet-subtitle">
                Choose from three premium party boats perfect for Lake Travis adventures
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {lakeTravisFleetShowcase.map((boat, index) => (
                <Card key={index} className="h-full hover:shadow-2xl transition-all hover:-translate-y-1 rounded-xl" data-testid={`card-boat-${index}`}>
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <img 
                      src={boat.image}
                      alt={`${boat.name} - Lake Travis party boat`}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white font-sans tracking-wider">
                      {boat.capacity} People
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">{boat.name}</CardTitle>
                    <p className="text-base text-gray-600">{boat.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {boat.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-base text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">Starting from</p>
                      <p className="text-2xl font-bold text-blue-600 mb-2">{boat.startingPrice}</p>
                      <p className="text-sm text-gray-600 mb-4">Ideal for: {boat.ideal}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        asChild
                        data-testid={`button-quote-${index}`}
                      >
                        <Link href="/chat">
                          Get Lake Travis Quote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-testid="heading-packages">
                Lake Travis Party Boat Packages
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto" data-testid="text-packages-subtitle">
                Specialized packages for unforgettable Lake Travis celebrations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {lakeTravisPackages.map((pkg, index) => (
                <Card key={index} className="h-full hover:shadow-2xl transition-all hover:-translate-y-1 rounded-xl" data-testid={`card-package-${index}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <pkg.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="mb-2 mx-auto font-sans tracking-wider">{pkg.highlight}</Badge>
                    <CardTitle className="text-xl font-playfair text-center">{pkg.title}</CardTitle>
                    <p className="text-base text-gray-600 text-center">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-base text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-2xl font-bold text-blue-600 mb-4 text-center">{pkg.price}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        asChild
                        data-testid={`button-package-${index}`}
                      >
                        <Link href={pkg.link}>
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-6 text-center" data-testid="heading-testimonials">
                Lake Travis Party Boat Reviews
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8" data-testid="text-testimonials-subtitle">
                Check out our verified reviews on Google and Facebook!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  data-testid="button-google-reviews"
                >
                  <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    View Google Reviews
                  </a>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  data-testid="button-facebook-reviews"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    View Facebook Reviews
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-testid="heading-faq">
                Lake Travis Party Boat FAQ
              </h2>
              <p className="text-base text-gray-600" data-testid="text-faq-subtitle">
                Everything you need to know about Lake Travis party boats
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-xl px-6 bg-white"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold text-base text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-testid="heading-quote-builder">
                Get Your Lake Travis Party Boat Quote
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto" data-testid="text-quote-subtitle">
                Start planning your perfect Lake Travis party boat experience
              </p>
            </div>

            <Card className="overflow-hidden max-w-4xl mx-auto rounded-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-2xl flex items-center justify-between font-playfair">
                  <span>Lake Travis Quote Builder</span>
                  {showQuoteBuilder && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowQuoteBuilder(false)}
                      className="text-white hover:bg-white/20"
                      data-testid="button-close-quote"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {!showQuoteBuilder ? (
                  <div className="p-12 text-center">
                    <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-playfair font-bold mb-4">
                      Ready for Your Lake Travis Adventure?
                    </h3>
                    <p className="text-base text-gray-600 mb-8">
                      Click below to start building your custom Lake Travis party boat quote
                    </p>
                    <Button 
                      size="lg" 
                      onClick={() => setShowQuoteBuilder(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      data-testid="button-start-quote"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Build Lake Travis Quote
                    </Button>
                  </div>
                ) : (
                  <div className="relative" style={{ height: '600px' }}>
                    <iframe
                      src="/chat"
                      className="w-full h-full border-0"
                      title="Lake Travis Quote Builder"
                      data-testid="iframe-quote-builder"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <PartyPlanningChecklist />
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-6 text-center" data-testid="heading-final-cta">
              Ready to Party on Lake Travis?
            </h2>
            <p className="text-base mb-8 max-w-3xl mx-auto" data-testid="text-final-cta">
              Book your Lake Travis party boat today and experience the clearest water in Texas with Austin's premier party cruise company
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                asChild
                data-testid="button-book-final"
              >
                <Link href="/chat">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book Lake Travis Now
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6"
                asChild
                data-testid="button-contact-final"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Call About Lake Travis
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center">
                EXPLORE OUR PARTY BOAT EXPERIENCES
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                From bachelor parties to private cruises, discover the perfect Austin celebration on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/private-cruises" data-testid="link-private-from-party-boat">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-600 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">Private Austin Cruises</CardTitle>
                    <p className="text-base text-gray-600">Exclusive private Lake Travis boat charters for your group</p>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/client-entertainment" data-testid="link-client-entertainment-from-party-boat">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-600 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">Corporate Entertainment</CardTitle>
                    <p className="text-base text-gray-600">Professional client entertainment cruises on Lake Travis</p>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/gallery" data-testid="link-gallery-from-party-boat">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-600 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">Party Boat Photo Gallery</CardTitle>
                    <p className="text-base text-gray-600">Real photos from Austin party boat cruises on Lake Travis</p>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/contact" data-testid="link-contact-from-party-boat">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-600 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">Contact Us</CardTitle>
                    <p className="text-base text-gray-600">Get your custom party boat quote for Lake Travis</p>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/" data-testid="link-home-from-party-boat">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-600 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">Home</CardTitle>
                    <p className="text-base text-gray-600">Explore all our Austin party cruise services</p>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/blogs" data-testid="link-blogs-from-party-boat">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-600 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">Cruise Blog & Tips</CardTitle>
                    <p className="text-base text-gray-600">Planning guides for your Lake Travis party boat experience</p>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      <Footer />
    </div>
  );
}
