import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import SEOHead, { generateFAQSchema, generateComprehensiveLocalBusinessSchema } from '@/components/SEOHead';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
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

import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/atx-disco-cruise-party.jpg';
import heroImage3 from '@assets/dancing-party-scene.jpg';
import galleryImage1 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage2 from '@assets/meeseeks-25-person-boat.jpg';
import galleryImage3 from '@assets/clever-girl-50-person-boat.jpg';
import partyAtmosphere1 from '@assets/party-atmosphere-1.jpg';
import partyAtmosphere2 from '@assets/party-atmosphere-2.jpg';
import partyAtmosphere3 from '@assets/party-atmosphere-3.jpg';

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
    answer: 'Lake Travis is renowned for having the clearest water in Texas with over 270 miles of pristine shoreline and countless secluded coves perfect for swimming and partying. The lake maintains a constant 70-degree water temperature year-round, making it ideal for Lake Travis party boat adventures any season. With crystal clear water, dramatic limestone cliffs, and protected coves, Lake Travis offers the most scenic and enjoyable party boat experience in Central Texas.'
  },
  {
    question: 'How much does a Lake Travis party boat rental cost?',
    answer: `Lake Travis party boat rental prices vary by boat size and day. Private Lake Travis charters start at $${HOURLY_RATES.MON_THU[14] / 100}/hour for our 14-person boat on weekdays with 4-hour minimums. Our Lake Travis ATX Disco Cruise packages start at $${DISCO_PRICING.basic / 100} per person and include DJ, photographer, and party favors. Weekend and holiday Lake Travis party boat rates are higher. Contact us for exact Lake Travis pricing for your event.`
  },
  {
    question: 'Where do Lake Travis party boats depart from?',
    answer: 'Our Lake Travis party boats depart from Anderson Mill Marina, located at 13993 FM2769, Leander, TX 78641 on the northwest side of Lake Travis. The marina is conveniently just 30 minutes from downtown Austin, making it easily accessible for Lake Travis party boat guests from Austin, Lakeway, Bee Cave, and Cedar Park. Free parking is available at the Lake Travis marina.'
  },
  {
    question: 'What\'s included in a Lake Travis party boat rental?',
    answer: 'Every Lake Travis party boat rental includes: professional Coast Guard certified captain and crew familiar with Lake Travis waters, premium Bluetooth sound system, large coolers with ice, all safety equipment, fuel, and cruising Lake Travis\'s most scenic coves and beaches. Optional Lake Travis add-ons include lily pads and floaties for swimming, professional DJ services, photographer, catering coordination, and decorations for special Lake Travis events.'
  },
  {
    question: 'What\'s the best time of year for Lake Travis?',
    answer: 'Lake Travis party boats operate year-round with the lake maintaining comfortable water temperatures even in winter. Peak Lake Travis season runs April through September with warm weather and calm waters. However, fall and spring offer beautiful Lake Travis conditions with fewer crowds. Lake Travis water levels are typically best March through October, making these ideal months for your Lake Travis party boat experience.'
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
    title: '100K+ Lake Travis Guests',
    description: 'Over 100,000 satisfied customers have celebrated on our Lake Travis party boats, making unforgettable memories on this stunning Central Texas treasure.'
  },
  {
    icon: Shield,
    title: 'Perfect Lake Travis Safety Record',
    description: 'Our Coast Guard certified captains know Lake Travis intimately and maintain a pristine safety record. Every Lake Travis cruise is conducted with the highest safety standards and local expertise.'
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
    highlight: 'Most Popular on Lake Travis'
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
    highlight: 'Lake Travis Adventure'
  },
  {
    title: 'Corporate Events on Lake Travis',
    icon: Award,
    description: 'Professional Lake Travis corporate events and team building. Impress clients and reward your team on beautiful Lake Travis.',
    price: 'Custom Lake Travis pricing',
    features: [
      'Private Lake Travis venues',
      'Catering on Lake Travis',
      'Professional Lake Travis service',
      'Scenic Lake Travis backdrop'
    ],
    highlight: 'Premium Lake Travis Experience'
  }
];

const lakeTravisTestimonials = [
  {
    name: 'Sarah M.',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'Our Lake Travis bachelorette party was absolutely perfect! The water was crystal clear, and our captain knew all the best spots on Lake Travis. We swam in secluded coves and had the time of our lives. Lake Travis is stunning!',
    date: 'September 2024'
  },
  {
    name: 'Mike T.',
    event: 'Bachelor Party',
    rating: 5,
    text: 'Best bachelor party ever on Lake Travis! The crew took us to amazing Lake Travis locations, the boat was incredible, and Lake Travis itself is gorgeous. Can\'t recommend Premier Party Cruises enough for Lake Travis adventures!',
    date: 'August 2024'
  },
  {
    name: 'Jennifer K.',
    event: 'Corporate Event',
    rating: 5,
    text: 'Our team building event on Lake Travis exceeded all expectations. The scenery on Lake Travis is breathtaking, and our group loved exploring the lake. Perfect Lake Travis experience for our company retreat!',
    date: 'October 2024'
  }
];

export default function PartyBoatLakeTravis() {
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  const heroImages = [heroImage1, heroImage2, heroImage3];

  const faqSchema = generateFAQSchema(faqData);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "ATX DISCO CRUISE - Lake Travis Party Boat Experience",
    "description": "Experience the ultimate party boat on Lake Travis! ATX DISCO CRUISE offers the best Lake Travis party boat experience featuring professional DJ, photographer, disco dance floor, and premium sound system for bachelor parties, bachelorette parties, and celebrations.",
    "startDate": "2025-10-11T14:00:00-05:00",
    "endDate": "2025-10-11T21:00:00-05:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Anderson Mill Marina - Lake Travis",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13993 FM2769",
        "addressLocality": "Leander",
        "addressRegion": "TX",
        "postalCode": "78641",
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Premier Party Cruises",
      "url": "https://premierpartycruises.com",
      "telephone": "(512) 488-5892"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://premierpartycruises.com/party-boat-lake-travis",
      "price": "85.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "description": "Lake Travis party boat packages starting at $85/person with professional entertainment"
    },
    "performer": {
      "@type": "Organization",
      "name": "Premier Party Cruises"
    },
    "image": "https://premierpartycruises.com/assets/atx-disco-cruise-party.jpg"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Party Boat Lake Travis",
    "description": "Premier party boat rentals and cruises on Lake Travis near Austin, Texas. Professional captains, modern fleet, and unforgettable Lake Travis experiences.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Premier Party Cruises",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13993 FM2769",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78641"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.3879",
        "longitude": "-97.9723"
      }
    },
    "serviceType": "Party Boat Rental on Lake Travis",
    "areaServed": {
      "@type": "Place",
      "name": "Lake Travis, Austin, Lakeway, Bee Cave, Cedar Park, TX"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lake Travis Party Boat Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lake Travis Private Charters"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lake Travis Disco Cruises"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SEOHead
        pageRoute="/party-boat-lake-travis"
        defaultTitle="Party Boat Lake Travis | Austin's Best Lake Cruises | Premier Party Cruises"
        defaultDescription="Looking for a party boat on Lake Travis? Premier Party Cruises offers the best Lake Travis boat rentals near Austin. Book your Lake Travis party cruise today!"
        defaultKeywords={['party boat Lake Travis', 'Lake Travis party boat', 'Lake Travis boat rental', 'party boat rental Lake Travis', 'Lake Travis party cruise']}
        schemaType="service"
        customSchema={[
          generateComprehensiveLocalBusinessSchema({
            pageDescription: "Premier Lake Travis party boat rentals in Austin, TX. Experience the best Lake Travis cruises with professional captains and premium party boats. 14+ years serving Austin with 125,000+ happy customers.",
            additionalServices: [
              {
                name: "Lake Travis Party Boat Rentals",
                description: "Professional party boat rentals on Lake Travis with experienced captains and premium boats"
              },
              {
                name: "Lake Travis Cruises",
                description: "Scenic Lake Travis cruises for all occasions - bachelor parties, bachelorette parties, and celebrations"
              },
              {
                name: "Austin Boat Rentals",
                description: "Premium boat rentals near Austin on beautiful Lake Travis"
              },
              {
                name: "Lake Travis Events",
                description: "Customized Lake Travis boat party experiences and event cruises"
              }
            ]
          }),
          eventSchema,
          serviceSchema,
          faqSchema
        ]}
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${heroImages[currentImageIndex]})`,
            opacity: 0.3
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-2xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={fadeInUp}
              data-testid="heading-hero"
            >
              Party Boat Lake Travis: Austin's Premier Lake Party Cruise Experience
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100"
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
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
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
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6"
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
              <div className="flex items-center gap-2" data-testid="stat-experience">
                <Trophy className="h-5 w-5 text-yellow-300" />
                <span>15+ Years on Lake Travis</span>
              </div>
              <div className="flex items-center gap-2" data-testid="stat-guests">
                <Users className="h-5 w-5 text-yellow-300" />
                <span>100K+ Lake Travis Guests</span>
              </div>
              <div className="flex items-center gap-2" data-testid="stat-safety">
                <Shield className="h-5 w-5 text-yellow-300" />
                <span>Perfect Lake Travis Safety Record</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Lake Travis Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-why-lake-travis">
              Why Choose Lake Travis for Your Party Boat?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-why-subtitle">
              Lake Travis is Central Texas's premier party boat destination, offering crystal-clear waters, stunning scenery, and year-round perfect conditions
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {whyChooseLakeTravis.map((reason, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-shadow" data-testid={`card-reason-${index}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                      <reason.icon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Complete Party Guide Section - SEO Hub */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-complete-guide">
              Complete Lake Travis Party Boat Guide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-guide-subtitle">
              Discover the perfect Lake Travis party boat experience for your celebration. From bachelor parties to corporate events, we specialize in creating unforgettable Austin experiences.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Link href="/bachelor-party-austin">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-bachelor">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
                      <Crown className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Austin Bachelor Party Boats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Epic bachelor party cruises on Lake Travis with ATX Disco Cruise or private charters. Professional DJ, photographer, and groom cruises free!
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/bachelorette-party-austin">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-bachelorette">
                  <CardHeader>
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-3">
                      <Heart className="h-6 w-6 text-pink-600 dark:text-pink-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      Lake Travis Bachelorette Parties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Ultimate bachelorette party on Lake Travis! Bride cruises FREE, professional entertainment, and unforgettable Austin memories.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/combined-bachelor-bachelorette-austin">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-combined">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Combined Bachelor Bachelorette Party
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Celebrate together on Lake Travis! Modern trend of combined parties with both sides joining for one epic Austin celebration.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/corporate-events">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-corporate">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                      <Award className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                      Austin Corporate Events on Lake Travis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Professional corporate cruises for team building and client entertainment. Tax-deductible Lake Travis business events.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/birthday-parties">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-birthday">
                  <CardHeader>
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-3">
                      <PartyPopper className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      Birthday Party Boats Austin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Celebrate birthdays on Lake Travis! From milestone birthdays to Sweet 16s, create unforgettable Austin birthday memories.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/wedding-parties">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-wedding">
                  <CardHeader>
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center mb-3">
                      <Sparkles className="h-6 w-6 text-rose-600 dark:text-rose-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      Wedding Party Cruises Lake Travis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Rehearsal dinners, welcome parties, and after-parties on beautiful Lake Travis. Perfect Austin wedding celebrations!
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-private">
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-3">
                      <Ship className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Private Charter Boats Austin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Exclusive private Lake Travis cruises for any occasion. Your boat, your party, your perfect Austin day on the water.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/graduation-party">
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" data-testid="card-guide-graduation">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
                      <Trophy className="h-6 w-6 text-green-600 dark:text-green-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      Graduation Party Boats Lake Travis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Celebrate graduation achievements on Lake Travis! High school and college grad parties with Austin's best party boats.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Can't find what you're looking for? We specialize in creating custom Lake Travis experiences for any celebration.
            </p>
            <Button 
              size="lg" 
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-custom-quote"
            >
              <Link href="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Custom Quote
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Fleet Showcase Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-fleet">
              Our Lake Travis Party Boat Fleet
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-fleet-subtitle">
              Choose the perfect Lake Travis party boat for your celebration - from intimate gatherings to grand Lake Travis events
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {lakeTravisFleetShowcase.map((boat, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow h-full" data-testid={`card-boat-${index}`}>
                  <div className="relative h-64">
                    <img 
                      src={boat.image} 
                      alt={`${boat.name} Party Boat Lake Travis Austin party cruise`}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                      {boat.capacity} People
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">{boat.name}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">{boat.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Starting at</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid={`price-boat-${index}`}>
                          {boat.startingPrice}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {boat.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <strong>Ideal for:</strong> {boat.ideal}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lake Travis Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-pricing">
              Transparent Lake Travis Party Boat Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-pricing-subtitle">
              Affordable Lake Travis party boat rentals with no hidden fees - book your Lake Travis adventure today
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="h-full" data-testid="card-private-pricing">
                <CardHeader className="text-center">
                  <Ship className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">Lake Travis Private Charters</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">Exclusive Lake Travis experience</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400" data-testid="price-private-range">
                      ${HOURLY_RATES.MON_THU[14] / 100}-${HOURLY_RATES.MON_THU[50] / 100}/hr
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">4-hour minimum on Lake Travis</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Your own Lake Travis party boat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Expert Lake Travis captain</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Premium Lake Travis locations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Custom Lake Travis itinerary</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="h-full border-2 border-purple-500 dark:border-purple-400" data-testid="card-disco-pricing">
                <CardHeader className="text-center">
                  <Music className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">Lake Travis Disco Cruise</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">Ultimate Lake Travis party experience</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400" data-testid="price-disco-range">
                      ${DISCO_PRICING.basic / 100}-${DISCO_PRICING.platinum / 100}/person
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">3-hour Lake Travis cruise</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Professional DJ on Lake Travis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Lake Travis photographer included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Party favors for Lake Travis fun</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Scenic Lake Travis route</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Lake Travis Packages Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-packages">
              Popular Lake Travis Party Boat Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-packages-subtitle">
              Specialized Lake Travis party boat experiences for every celebration
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {lakeTravisPackages.map((pkg, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-xl transition-shadow" data-testid={`card-package-${index}`}>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <pkg.icon className="h-8 w-8 text-white" />
                    </div>
                    {pkg.highlight && (
                      <Badge className="mb-2 bg-yellow-500 text-white">{pkg.highlight}</Badge>
                    )}
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">{pkg.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400" data-testid={`price-package-${index}`}>
                        {pkg.price}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" asChild data-testid={`button-package-${index}`}>
                      <Link href="/chat">
                        Book Lake Travis Package
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lake Travis Location Information */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-location">
              Lake Travis Location & Access
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-location-subtitle">
              Conveniently located on Lake Travis, just 30 minutes from downtown Austin
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card data-testid="card-marina">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-gray-900 dark:text-white">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    Anderson Mill Marina on Lake Travis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Address:</p>
                    <p className="text-gray-600 dark:text-gray-300">13993 FM2769, Leander, TX 78641</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">From Austin:</p>
                    <p className="text-gray-600 dark:text-gray-300">Just 30 minutes to Lake Travis via Highway 183</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Parking:</p>
                    <p className="text-gray-600 dark:text-gray-300">Free parking at the Lake Travis marina</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Check-in:</p>
                    <p className="text-gray-600 dark:text-gray-300">30 minutes before your Lake Travis cruise</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card data-testid="card-areas">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-gray-900 dark:text-white">
                    <Navigation className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    Areas We Serve Around Lake Travis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Austin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Lakeway</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Bee Cave</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Cedar Park</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Leander</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Round Rock</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Popular Lake Travis Destinations:</p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Devil's Cove - Famous Lake Travis party cove</li>
                      <li>• Hippie Hollow - Scenic Lake Travis swimming</li>
                      <li>• Starnes Island - Private Lake Travis beaches</li>
                      <li>• Paradise Cove - Beautiful Lake Travis dining</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lake Travis Testimonials */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-testimonials">
              Lake Travis Party Boat Reviews
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-testimonials-subtitle">
              See why our Lake Travis party boats are rated 5 stars
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {lakeTravisTestimonials.map((review, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full" data-testid={`card-review-${index}`}>
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{review.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.event} • {review.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{review.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-faq">
              Lake Travis Party Boat FAQ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300" data-testid="text-faq-subtitle">
              Everything you need to know about Lake Travis party boats
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg px-6"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Build My Quote Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="heading-quote-builder">
              Get Your Lake Travis Party Boat Quote
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="text-quote-subtitle">
              Start planning your perfect Lake Travis party boat experience
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-2xl flex items-center justify-between">
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
                    <MessageCircle className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Ready for Your Lake Travis Adventure?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
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
          </motion.div>
        </div>
      </section>

      {/* Party Planning Checklist */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <PartyPlanningChecklist />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-final-cta">
              Ready to Party on Lake Travis?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto" data-testid="text-final-cta">
              Book your Lake Travis party boat today and experience the clearest water in Texas with Austin's premier party cruise company
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
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
          </motion.div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              EXPLORE OUR PARTY BOAT EXPERIENCES
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From bachelor parties to private cruises, discover the perfect Austin celebration on Lake Travis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/private-cruises" data-testid="link-private-from-party-boat">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Austin Cruises</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private Lake Travis boat charters for your group</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/client-entertainment" data-testid="link-client-entertainment-from-party-boat">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Corporate Entertainment</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Professional client entertainment cruises on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-party-boat">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Party Boat Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Real photos from Austin party boat cruises on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-party-boat">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get your custom party boat quote for Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-from-party-boat">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Home</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Explore all our Austin party cruise services</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/blogs" data-testid="link-blogs-from-party-boat">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Cruise Blog & Tips</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Planning guides for your Lake Travis party boat experience</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
