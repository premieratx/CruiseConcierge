import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { SectionReveal } from '@/components/SectionReveal';
import { privateCruiseReviews } from '@shared/reviews-data';
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
    question: 'What makes Premier Party Cruises Austin\'s best?',
    answer: '15+ years in Austin, 150,000+ happy customers, perfect safety record.'
  },
  {
    question: 'How much does a party boat cost in Austin?',
    answer: `Private charters: $${HOURLY_RATES.MON_THU[14] / 100}/hr (weekdays), 4-hour minimum. ATX Disco Cruise (exclusively for bachelor, bachelorette & combined bach parties): $${DISCO_PRICING.basic / 100}+ per person.`
  },
  {
    question: 'Where do Austin party boats depart?',
    answer: 'Anderson Mill Marina: 13993 FM 2769, Leander, TX 78641 (30 min from downtown Austin).'
  },
  {
    question: 'What\'s included in Austin party boat rentals?',
    answer: 'Licensed captain & crew, premium Bluetooth sound, coolers/ice, safety equipment, fuel.'
  },
  {
    question: 'Best Austin neighborhoods to visit?',
    answer: 'South Congress, East 6th Street, Rainey Street, Red River District—all within 30 min of departure.'
  },
  {
    question: 'How far in advance to book Austin party boats?',
    answer: 'Peak season: 2–4 weeks for weekends. Weekdays: often available on short notice.'
  },
  {
    question: 'What Austin events pair well with party boats?',
    answer: 'SXSW, ACL Fest, F1 weekends, UT football games, bachelorette/bachelor parties.'
  },
  {
    question: 'Transportation from Austin to Lake Travis?',
    answer: 'We partner with shuttle services for groups. Free parking at Anderson Mill Marina.'
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
    title: '150,000+ Austin Guests',
    description: 'Over 150,000 satisfied customers have celebrated on our Austin party boats, making memories on beautiful Lake Travis.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Licensed, fun, experienced captains and pristine safety record ensure every Austin party boat cruise is safe and worry-free.'
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
    link: '/bachelorette-party-austin'
  },
  {
    title: 'Bachelor Party Boats',
    icon: Crown,
    description: 'Ultimate Austin bachelor party on Lake Travis. Private boats or join our legendary ATX Disco Cruise.',
    features: ['Groom cruises FREE', 'Professional entertainment', 'Lake Travis adventure', 'Swimming & activities'],
    startingPrice: `$${DISCO_PRICING.basic / 100}`,
    priceNote: 'per person',
    link: '/bachelor-party-austin'
  },
  {
    title: 'Corporate Party Boats',
    icon: Users,
    description: 'Premium Austin corporate events on Lake Travis. Perfect for team building and client entertainment.',
    features: ['Professional service', 'Flagship boat available', 'Alcohol delivery coordination', 'Transportation partnerships'],
    startingPrice: `$${HOURLY_RATES.MON_THU[50] / 100}`,
    priceNote: 'per hour',
    link: '/corporate-events'
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        pageRoute="/party-boat-austin"
        defaultTitle="Party Boat Austin | Premier Lake Travis"
        defaultDescription="Best party boats in Austin since 2009. Bachelor parties, corporate events, private charters. 15+ years experience. Book today!"
        defaultKeywords={['party boat Austin', 'Austin party boat rental', 'Lake Travis party boat', 'party boat rental Austin', 'Austin boat party', 'Lake Travis boat rental', 'Austin bachelorette boat', 'Austin bachelor party boat']}
      />

      <ClientOnly><PublicNavigation /></ClientOnly>

      <motion.section 
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
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
          {/* White Overlay for contrast - 75% opacity */}
          <div className="absolute inset-0 bg-white/75"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 bg-yellow-100 text-gray-900 border-yellow-400 text-lg px-6 py-2 font-sans tracking-wider shadow-lg" data-testid="badge-austin-1">
              <MapPin className="w-4 h-4 mr-2" />
              Austin's #1 Party Boat Since 2009
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold text-gray-900 mb-6 leading-tight text-center drop-shadow-sm"
            variants={fadeInUp}
            data-testid="heading-main"
          >
            Party Boat Austin: Lake Travis's Premier Party Cruise Experience
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 font-bold drop-shadow-sm max-w-3xl mx-auto"
            variants={fadeInUp}
            data-testid="text-hero-description"
          >
            Austin's #1 Party Boat Since 2009
          </motion.p>

          <motion.div 
            className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl max-w-5xl mx-auto mb-8"
            variants={fadeInUp}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
              Experience the ultimate Austin party boat adventure on Lake Travis! Private charters, disco cruises, and unforgettable celebrations with Austin's longest-running party boat company.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-6"
              onClick={() => navigate('/chat')}
              data-testid="button-instant-quote"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Instant Austin Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-lg px-8 py-6"
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

      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl font-playfair font-bold mb-6 text-center"
                data-testid="heading-why-choose"
              >
                Why Choose Austin's Premier Party Boat Company?
              </h2>
              <p 
                className="text-base text-gray-600 max-w-3xl mx-auto"
                data-testid="text-why-description"
              >
                Since 2009, Premier Party Cruises has been Austin's trusted choice for Lake Travis party boat rentals. Here's what makes our Austin party boats the best choice for your celebration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseAustin.map((item, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-shadow rounded-xl" data-testid={`card-reason-${index}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-playfair">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="fleet-section" className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl font-playfair font-bold mb-6 text-center"
                data-testid="heading-fleet"
              >
                Austin's Newest Party Boat Fleet
              </h2>
              <p 
                className="text-base text-gray-600 max-w-3xl mx-auto"
                data-testid="text-fleet-description"
              >
                Choose from three premium party boats on Lake Travis. Every Austin party boat rental includes professional captain, premium sound, and all amenities for the perfect celebration.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {fleetShowcase.map((boat, index) => (
                <Card key={index} className="h-full hover:shadow-2xl transition-all hover:-translate-y-1 rounded-xl" data-testid={`card-boat-${index}`}>
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <img 
                      src={boat.image} 
                      alt={`${boat.name} Party Boat Austin on Lake Travis party cruise`}
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
                        onClick={() => navigate('/chat')}
                        data-testid={`button-quote-${index}`}
                      >
                        Get Austin Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
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
            <div className="text-center mb-16">
              <h2 
                className="text-3xl font-playfair font-bold mb-6 text-center"
                data-testid="heading-pricing"
              >
                Transparent Austin Party Boat Pricing
              </h2>
              <p 
                className="text-base text-gray-600 max-w-3xl mx-auto"
                data-testid="text-pricing-description"
              >
                No hidden fees. No surprises. Just honest pricing for the best party boat experience in Austin. All Lake Travis cruises include captain, fuel, premium sound, coolers, and ice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="h-full rounded-xl" data-testid="card-pricing-private">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Ship className="w-12 h-12 text-blue-600" />
                    <Badge className="font-sans tracking-wider">Private Charters</Badge>
                  </div>
                  <CardTitle className="text-xl font-playfair">Austin Private Party Boats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">14-Person Boat</p>
                      <p className="text-2xl font-bold text-blue-600">${HOURLY_RATES.MON_THU[14] / 100}-${HOURLY_RATES.SATURDAY[14] / 100}/hr</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">25-30 Person Boat</p>
                      <p className="text-2xl font-bold text-blue-600">${HOURLY_RATES.MON_THU[25] / 100}-${HOURLY_RATES.SATURDAY[25] / 100}/hr</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">50-75 Person Boat</p>
                      <p className="text-2xl font-bold text-blue-600">${HOURLY_RATES.MON_THU[50] / 100}-${HOURLY_RATES.SATURDAY[50] / 100}/hr</p>
                    </div>
                    <p className="text-sm text-gray-500 pt-4">4-hour minimum. Weekday-Weekend rates shown.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full rounded-xl" data-testid="card-pricing-disco">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Music className="w-12 h-12 text-purple-600" />
                    <Badge className="bg-purple-600 font-sans tracking-wider">ATX Disco Cruise</Badge>
                  </div>
                  <CardTitle className="text-xl font-playfair">Austin Disco Party Boat</CardTitle>
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
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl font-playfair font-bold mb-6 text-center"
                data-testid="heading-packages"
              >
                Austin Party Boat Packages
              </h2>
              <p 
                className="text-base text-gray-600 max-w-3xl mx-auto"
                data-testid="text-packages-description"
              >
                Specialized Austin party boat packages for every celebration on Lake Travis. From bachelorette parties to corporate events, we have the perfect package for your group.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {austinPackages.map((pkg, index) => (
                <Card key={index} className="h-full hover:shadow-2xl transition-all hover:-translate-y-1 rounded-xl" data-testid={`card-package-${index}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <pkg.icon className="w-8 h-8 text-white" />
                    </div>
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
                      <p className="text-sm text-gray-600 mb-2 text-center">Starting from</p>
                      <p className="text-2xl font-bold text-blue-600 mb-1 text-center">{pkg.startingPrice}</p>
                      <p className="text-sm text-gray-600 mb-4 text-center">{pkg.priceNote}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => navigate(pkg.link)}
                        data-testid={`button-package-${index}`}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
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
              <h2 
                className="text-3xl font-playfair font-bold mb-6 text-center"
                data-testid="heading-testimonials"
              >
                What Austin Customers Say
              </h2>
              <p 
                className="text-xl text-gray-700 max-w-3xl mx-auto mb-8"
                data-testid="text-testimonials-description"
              >
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
              <h2 
                className="text-3xl font-playfair font-bold mb-6 text-center"
                data-testid="heading-faq"
              >
                Austin Party Boat FAQ
              </h2>
              <p 
                className="text-base text-gray-600"
                data-testid="text-faq-description"
              >
                Common questions about Austin party boat rentals on Lake Travis
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
            <PartyPlanningChecklist />
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 
              className="text-3xl font-playfair font-bold mb-6 text-center" 
              data-testid="heading-final-cta"
            >
              Ready to Book Your Austin Party Boat?
            </h2>
            <p 
              className="text-base mb-8 max-w-3xl mx-auto" 
              data-testid="text-final-cta"
            >
              Join over 150,000 happy customers who've celebrated on Austin's premier Lake Travis party boats. Book your unforgettable Austin party boat experience today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => navigate('/chat')}
                data-testid="button-book-now"
              >
                <PartyPopper className="w-5 h-5 mr-2" />
                Book Austin Party Boat
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6"
                onClick={() => navigate('/contact')}
                data-testid="button-contact"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center">
                Explore More Austin Party Experiences
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Discover other ways to celebrate in Austin and on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/bachelor-party-austin">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500 rounded-xl">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Crown className="h-8 w-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-center">Bachelor Party Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-center">
                      Epic bachelor party experiences on Lake Travis
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Bachelor Parties
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/bachelorette-party-austin">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500 rounded-xl">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-center">Bachelorette Party Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-center">
                      #1 bachelorette party boat in Austin
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Bachelorette Parties
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/party-boat-lake-travis">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500 rounded-xl">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Ship className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-center">Party Boat Lake Travis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-center">
                      Complete Lake Travis party boat guide
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View Lake Travis Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
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
