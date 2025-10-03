import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import SEOHead, { generateFAQSchema } from '@/components/SEOHead';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { 
  Ship, Users, Star, MapPin, Clock, DollarSign, Shield, Trophy, 
  PartyPopper, Music, Anchor, Heart, Camera, CheckCircle, ArrowRight,
  Phone, Mail, Navigation, Sparkles, Award, Crown, MessageCircle, X
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
    question: 'What makes Premier the best party boat in Austin?',
    answer: 'Premier Party Cruises has been Austin\'s #1 party boat company since 2009 with over 100,000 happy customers. We offer the newest fleet on Lake Travis, professional Coast Guard certified captains, perfect safety record, premium sound systems, and unmatched local expertise. Our party boats depart from Anderson Mill Marina and cruise the most beautiful parts of Lake Travis, just 30 minutes from downtown Austin.'
  },
  {
    question: 'How much does a party boat rental cost in Austin?',
    answer: `Party boat rental prices in Austin vary by boat size and day of week. Private charters start at $${HOURLY_RATES.MON_THU[14] / 100}/hour for our 14-person boat on weekdays, with 4-hour minimums. Our ATX Disco Cruise party boat packages start at $${DISCO_PRICING.basic / 100} per person and include DJ, photographer, and party favors. Weekend and holiday rates are higher. Contact us for exact pricing for your Austin party boat rental.`
  },
  {
    question: 'Where do Austin party boats depart from?',
    answer: 'Our Austin party boats depart from Anderson Mill Marina, located at 13993 FM2769, Leander, TX 78641 on Lake Travis. The marina is conveniently located just 30 minutes from downtown Austin, making it easily accessible for Austin party boat guests coming from all parts of the city. Free parking is available at the marina.'
  },
  {
    question: 'What\'s included in an Austin party boat rental?',
    answer: 'Every Austin party boat rental includes: professional Coast Guard certified captain and crew, premium Bluetooth sound system, large coolers with ice, all safety equipment, fuel, and cruising Lake Travis\'s most scenic areas. Optional add-ons include lily pads and floaties for swimming, professional DJ services, photographer, catering coordination, and decorations for special events.'
  },
  {
    question: 'How far in advance should I book a party boat in Austin?',
    answer: 'For weekend Austin party boat rentals, especially during peak season (April-September), we recommend booking 2-4 weeks in advance. <Link href="/bachelorette-party-austin" className="text-primary hover:underline">Bachelorette parties</Link> and <Link href="/corporate-events" className="text-primary hover:underline">corporate events</Link> on <Link href="/party-boat-lake-travis" className="text-primary hover:underline">Lake Travis</Link> should book even earlier. Weekday party boat rentals in Austin typically have more availability and can often be booked with shorter notice. Contact us to check real-time availability.'
  }
];

const whyChooseAustin = [
  {
    icon: Trophy,
    title: '15+ Years Serving Austin',
    description: 'Established in 2009, we\'re Austin\'s longest-running party boat company with deep local expertise and unmatched Lake Travis knowledge.'
  },
  {
    icon: Star,
    title: '100,000+ Austin Guests',
    description: 'Over 100,000 satisfied customers have celebrated on our Austin party boats, making memories on beautiful Lake Travis.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Coast Guard certified captains and pristine safety record ensure every Austin party boat cruise is safe and worry-free.'
  },
  {
    icon: Ship,
    title: 'Newest Fleet in Austin',
    description: 'Our party boats are the newest and nicest on Lake Travis, featuring premium sound systems and modern amenities.'
  },
  {
    icon: MapPin,
    title: 'Prime Lake Travis Location',
    description: 'Departing from Anderson Mill Marina, just 30 minutes from downtown Austin with easy access and free parking.'
  },
  {
    icon: Award,
    title: 'Austin\'s Party Boat Experts',
    description: 'Specializing in bachelorette parties, bachelor parties, and corporate events - we know how to throw the perfect Austin celebration.'
  }
];

const fleetShowcase = [
  {
    name: BOATS.DAY_TRIPPER.displayName,
    capacity: BOATS.DAY_TRIPPER.capacity,
    description: 'Perfect for intimate Austin party boat experiences',
    features: ['Premium sound system', 'Bluetooth connectivity', 'Coolers with ice', 'Swimming access'],
    image: galleryImage1,
    startingPrice: `$${HOURLY_RATES.MON_THU[14] / 100}/hr`,
    ideal: 'Small groups, intimate celebrations'
  },
  {
    name: BOATS.ME_SEEKS_THE_IRONY.displayName,
    capacity: `${BOATS.ME_SEEKS_THE_IRONY.seatingCapacity}-${BOATS.ME_SEEKS_THE_IRONY.capacity}`,
    description: 'Most popular Austin party boat for mid-sized groups',
    features: ['Spacious layout', 'Premium audio', 'Shade cover', 'Party-ready setup'],
    image: galleryImage2,
    startingPrice: `$${HOURLY_RATES.MON_THU[25] / 100}/hr`,
    ideal: 'Bachelorette parties, bachelor parties'
  },
  {
    name: BOATS.CLEVER_GIRL.displayName,
    capacity: `${BOATS.CLEVER_GIRL.seatingCapacity}-${BOATS.CLEVER_GIRL.capacity}`,
    description: 'Austin\'s premier flagship party boat with giant Texas flag',
    features: ['14 disco balls', 'Giant Texas flag', 'Maximum space', 'VIP experience'],
    image: galleryImage3,
    startingPrice: `$${HOURLY_RATES.MON_THU[50] / 100}/hr`,
    ideal: 'Corporate events, large celebrations'
  }
];

const austinPackages = [
  {
    title: 'Bachelorette Party Boats',
    icon: Heart,
    description: 'Austin\'s #1 bachelorette party boat experience since 2009. Choose from Basic Bach, Disco Queen, or Platinum packages.',
    features: ['Bride cruises FREE', 'Professional DJ & photographer', 'Party favors & decorations', 'ATX Disco Cruise or private charter'],
    startingPrice: `$${DISCO_PRICING.basic / 100}`,
    priceNote: 'per person',
    link: '/bachelorette-party'
  },
  {
    title: 'Bachelor Party Boats',
    icon: Crown,
    description: 'Ultimate Austin bachelor party on Lake Travis. Private boats or join our legendary ATX Disco Cruise.',
    features: ['Groom cruises FREE', 'Professional entertainment', 'Lake Travis adventure', 'Swimming & activities'],
    startingPrice: `$${DISCO_PRICING.basic / 100}`,
    priceNote: 'per person',
    link: '/bachelor-party'
  },
  {
    title: 'Corporate Party Boats',
    icon: Users,
    description: 'Premium Austin corporate events on Lake Travis. Perfect for team building and client entertainment.',
    features: ['Professional service', 'Flagship boat available', 'Catering coordination', 'Transportation partnerships'],
    startingPrice: `$${HOURLY_RATES.MON_THU[50] / 100}`,
    priceNote: 'per hour',
    link: '/corporate-events'
  }
];

const austinTestimonials = [
  {
    name: 'Jessica M.',
    location: 'Downtown Austin',
    event: 'Bachelorette Party',
    text: 'Best party boat in Austin! The Lake Travis cruise was absolutely perfect for my bachelorette. The crew was amazing and the boat was beautiful. All my Austin friends are still talking about it!',
    rating: 5
  },
  {
    name: 'Ryan T.',
    location: 'South Austin',
    event: 'Bachelor Party',
    text: 'We looked at every party boat option in Austin and Premier was hands down the best. Great prices, new boats, and the Lake Travis scenery was incredible. Worth every penny!',
    rating: 5
  },
  {
    name: 'Sarah K.',
    location: 'Tech Company, Austin',
    event: 'Corporate Event',
    text: 'We booked the Clever Girl for our company retreat and it exceeded all expectations. Professional crew, amazing Austin views, and our team had a blast on Lake Travis!',
    rating: 5
  }
];

export default function PartyBoatAustin() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://ppc-quote-builder.lovable.app') {
        return;
      }
      
      if (event.data && event.data.type === 'quote-submitted') {
        navigate('/chat');
        toast({
          title: "Quote Submitted!",
          description: "Redirecting you to chat with our team...",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate, toast]);

  const faqSchema = generateFAQSchema(faqData);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Party Boat Austin - Lake Travis Boat Rentals",
    "description": "Premier party boat rentals in Austin, Texas on Lake Travis. Specializing in bachelorette parties, bachelor parties, and corporate events with professional crew and newest fleet.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Premier Party Cruises",
      "telephone": "+1-512-488-5892",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13993 FM2769",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78641",
        "addressCountry": "US"
      }
    },
    "serviceType": "Party Boat Rental",
    "areaServed": {
      "@type": "City",
      "name": "Austin",
      "@id": "https://en.wikipedia.org/wiki/Austin,_Texas"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": {
        "@type": "Place",
        "name": "Anderson Mill Marina - Lake Travis",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "13993 FM2769",
          "addressLocality": "Leander",
          "addressRegion": "TX",
          "postalCode": "78641"
        }
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": HOURLY_RATES.MON_THU[14] / 100,
      "highPrice": HOURLY_RATES.SAT_SUN[75] / 100,
      "offerCount": "3"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        pageRoute="/party-boat-austin"
        defaultTitle="Party Boat Austin | #1 Lake Travis Boat Rentals | Premier Party Cruises"
        defaultDescription="Looking for a party boat in Austin? Premier Party Cruises offers the best Lake Travis boat rentals for bachelorette parties, bachelor parties & corporate events. Book now!"
        defaultKeywords={['party boat Austin', 'Austin party boat rental', 'Lake Travis party boat', 'party boat rental Austin', 'Austin boat party', 'Lake Travis boat rental', 'Austin bachelorette boat', 'Austin bachelor party boat']}
        schemaType="service"
        customSchema={[serviceSchema, faqSchema]}
      />

      <PublicNavigation />

      <motion.section 
        className="relative h-[600px] flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60 z-10" />
          <img 
            src={heroImage2} 
            alt="Party boat on Lake Travis Austin with disco lights and celebration"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-6 py-2" data-testid="badge-austin-1">
              <MapPin className="w-4 h-4 mr-2" />
              Austin's #1 Party Boat Since 2009
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
            data-testid="heading-main"
          >
            Party Boat Austin: Lake Travis's Premier Party Cruise Experience
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
            data-testid="text-hero-description"
          >
            Experience the ultimate Austin party boat adventure on Lake Travis! Private charters, disco cruises, and unforgettable celebrations with Austin's longest-running party boat company.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-6"
              onClick={() => navigate('/chat')}
              data-testid="button-instant-quote"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Instant Austin Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white font-bold text-lg px-8 py-6 backdrop-blur-sm"
              onClick={() => {
                const element = document.getElementById('fleet-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-testid="button-view-fleet"
            >
              <Ship className="w-5 h-5 mr-2" />
              View Austin Fleet
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
              data-testid="heading-why-choose"
            >
              Why Choose Austin's Premier Party Boat Company?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
              data-testid="text-why-description"
            >
              Since 2009, Premier Party Cruises has been Austin's trusted choice for Lake Travis party boat rentals. Here's what makes our Austin party boats the best choice for your celebration.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyChooseAustin.map((item, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-xl transition-shadow" data-testid={`card-reason-${index}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="fleet-section" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
              data-testid="heading-fleet"
            >
              Austin's Newest Party Boat Fleet
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
              data-testid="text-fleet-description"
            >
              Choose from three premium party boats on Lake Travis. Every Austin party boat rental includes professional captain, premium sound, and all amenities for the perfect celebration.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-3 gap-8"
          >
            {fleetShowcase.map((boat, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1" data-testid={`card-boat-${index}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={boat.image} 
                      alt={`${boat.name} party boat on Lake Travis Austin`}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                      {boat.capacity} People
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{boat.name}</CardTitle>
                    <p className="text-gray-600">{boat.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {boat.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">Starting from</p>
                      <p className="text-3xl font-bold text-blue-600 mb-2">{boat.startingPrice}</p>
                      <p className="text-sm text-gray-600 mb-4">Ideal for: {boat.ideal}</p>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate('/chat')}
                        data-testid={`button-quote-${index}`}
                      >
                        Get Austin Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
              data-testid="heading-pricing"
            >
              Transparent Austin Party Boat Pricing
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
              data-testid="text-pricing-description"
            >
              No hidden fees. No surprises. Just honest pricing for the best party boat experience in Austin. All Lake Travis cruises include captain, fuel, premium sound, coolers, and ice.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={scaleIn}>
              <Card className="h-full" data-testid="card-pricing-private">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Ship className="w-12 h-12 text-blue-600" />
                    <Badge>Private Charters</Badge>
                  </div>
                  <CardTitle className="text-2xl">Austin Private Party Boats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">14-Person Boat</p>
                      <p className="text-2xl font-bold text-blue-600">${HOURLY_RATES.MON_THU[14] / 100}-${HOURLY_RATES.SAT_SUN[14] / 100}/hr</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">25-30 Person Boat</p>
                      <p className="text-2xl font-bold text-blue-600">${HOURLY_RATES.MON_THU[25] / 100}-${HOURLY_RATES.SAT_SUN[25] / 100}/hr</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">50-75 Person Boat</p>
                      <p className="text-2xl font-bold text-blue-600">${HOURLY_RATES.MON_THU[50] / 100}-${HOURLY_RATES.SAT_SUN[50] / 100}/hr</p>
                    </div>
                    <p className="text-sm text-gray-500 pt-4">4-hour minimum. Weekday-Weekend rates shown.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Card className="h-full" data-testid="card-pricing-disco">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Music className="w-12 h-12 text-purple-600" />
                    <Badge className="bg-purple-600">ATX Disco Cruise</Badge>
                  </div>
                  <CardTitle className="text-2xl">Austin Disco Party Boat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Basic Bach Package</p>
                      <p className="text-2xl font-bold text-purple-600">${DISCO_PRICING.basic / 100}/person</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Disco Queen Package</p>
                      <p className="text-2xl font-bold text-purple-600">${DISCO_PRICING.disco_queen / 100}/person</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Platinum Package</p>
                      <p className="text-2xl font-bold text-purple-600">${DISCO_PRICING.platinum / 100}/person</p>
                    </div>
                    <p className="text-sm text-gray-500 pt-4">Includes DJ, photographer & party favors. Bride/Groom FREE!</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
              data-testid="heading-packages"
            >
              Popular Austin Party Boat Packages
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
              data-testid="text-packages-description"
            >
              From bachelorette parties to corporate events, we specialize in creating unforgettable Austin celebrations on Lake Travis. Every package is customizable to your needs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-3 gap-8"
          >
            {austinPackages.map((pkg, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-xl transition-shadow" data-testid={`card-package-${index}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <pkg.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                    <p className="text-gray-600">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Sparkles className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">Starting from</p>
                      <p className="text-3xl font-bold text-blue-600 mb-1">{pkg.startingPrice}</p>
                      <p className="text-sm text-gray-600 mb-4">{pkg.priceNote}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => navigate(pkg.link)}
                        data-testid={`button-learn-more-${index}`}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-5xl mx-auto"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
              variants={fadeInUp}
              data-testid="heading-location"
            >
              Austin's Premier Lake Travis Location
            </motion.h2>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12"
              variants={fadeInUp}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start mb-6">
                    <MapPin className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Anderson Mill Marina</h3>
                      <p className="text-white/90">13993 FM2769, Leander, TX 78641</p>
                      <p className="text-white/80 mt-2">Just 30 minutes from downtown Austin</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Navigation className="w-5 h-5 mr-3 flex-shrink-0 mt-1 text-yellow-400" />
                      <div>
                        <p className="font-semibold">Easy Access from Austin</p>
                        <p className="text-white/80 text-sm">Convenient drive from all parts of Austin metro area</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Anchor className="w-5 h-5 mr-3 flex-shrink-0 mt-1 text-yellow-400" />
                      <div>
                        <p className="font-semibold">Free Parking at Marina</p>
                        <p className="text-white/80 text-sm">Ample parking for all Austin party boat guests</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Ship className="w-5 h-5 mr-3 flex-shrink-0 mt-1 text-yellow-400" />
                      <div>
                        <p className="font-semibold">Beautiful Lake Travis Views</p>
                        <p className="text-white/80 text-sm">Cruise the most scenic parts of Austin's favorite lake</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-4">Austin Area Coverage</h3>
                  <p className="text-white/90">
                    We proudly serve all of Austin and surrounding areas including Downtown Austin, South Austin, North Austin, East Austin, West Lake Hills, Cedar Park, Round Rock, and Georgetown. Our Lake Travis party boats are easily accessible from anywhere in the Austin metro area.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      <span className="text-sm">Downtown Austin</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      <span className="text-sm">South Austin</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      <span className="text-sm">Cedar Park</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      <span className="text-sm">Round Rock</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
              data-testid="heading-testimonials"
            >
              What Austin Guests Say
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
              data-testid="text-testimonials-description"
            >
              Don't just take our word for it. Here's what Austin party boat guests have to say about their Lake Travis experience with Premier Party Cruises.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-3 gap-8"
          >
            {austinTestimonials.map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full" data-testid={`card-testimonial-${index}`}>
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="pt-4 border-t">
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                      <p className="text-sm text-blue-600 font-semibold">{testimonial.event}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
              data-testid="heading-faq"
            >
              Austin Party Boat FAQ
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
              data-testid="text-faq-description"
            >
              Common questions about party boat rentals in Austin and Lake Travis cruises. Have a question not listed? Contact our Austin team for personalized assistance!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-sm px-6"
                  data-testid={`accordion-item-${index}`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUp}
              data-testid="heading-cta-quote"
            >
              Build Your Austin Party Boat Quote Now
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-white/90"
              variants={fadeInUp}
              data-testid="text-cta-description"
            >
              Get an instant quote for your Lake Travis party boat adventure. Our Austin team will help you plan the perfect celebration!
            </motion.p>

            <motion.div variants={fadeInUp}>
              <AnimatePresence>
                {!showQuoteBuilder ? (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button 
                      size="lg"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-12 py-8"
                      onClick={() => setShowQuoteBuilder(true)}
                      data-testid="button-build-quote"
                    >
                      <Sparkles className="w-6 h-6 mr-3" />
                      Build My Austin Quote Now
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white rounded-2xl p-2 shadow-2xl"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -top-12 right-0 text-white hover:bg-white/20"
                      onClick={() => setShowQuoteBuilder(false)}
                      data-testid="button-close-quote"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                    <iframe
                      src="https://ppc-quote-builder.lovable.app"
                      className="w-full h-[600px] rounded-xl"
                      title="Austin Party Boat Quote Builder"
                      allow="clipboard-write"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <PartyPlanningChecklist 
            partyType="Party Boat Austin"
            eventType="Austin party boat celebration"
          />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-contact">
              Ready to Book Your Austin Party Boat?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact our Austin team today for personalized service and expert Lake Travis recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="tel:+15124885892" className="flex items-center text-lg hover:text-yellow-400 transition-colors" data-testid="link-phone">
                <Phone className="w-5 h-5 mr-2" />
                (512) 488-5892
              </a>
              <a href="mailto:clientservices@premierpartycruises.com" className="flex items-center text-lg hover:text-yellow-400 transition-colors" data-testid="link-email">
                <Mail className="w-5 h-5 mr-2" />
                clientservices@premierpartycruises.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Experiences Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Related Austin Party Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of Lake Travis party boat experiences in Austin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/bachelor-party">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Bachelor Party Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Austin bachelor party boats
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Bachelor Parties
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/bachelorette-party">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Bachelorette Party Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Austin bachelorette party cruises
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Bachelorette Parties
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/party-boat-lake-travis">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Ship className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Party Boat Lake Travis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Complete Lake Travis party boat guide
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View Lake Travis Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
