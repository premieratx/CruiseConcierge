import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead, { generateFAQSchema } from '@/components/SEOHead';
import { DISCO_PRICING } from '@shared/constants';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import DiscoVsPrivateComparison from '@/components/DiscoVsPrivateComparison';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, Zap, Target, MessageSquare, Ticket, 
  Gift, Disc3, Volume2, Mic, Utensils, GlassWater, UserCheck, 
  Leaf, Check, AlertCircle, DollarSign, Timer, CreditCard, 
  CloudRain, HelpCircle, Anchor, Droplets, Waves, Info, 
  TrendingUp, Package, Plane, Wine, PartyPopper as ConfettiIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

import heroImage1 from '@assets/atx-disco-cruise-party.jpg';
import heroImage2 from '@assets/dancing-party-scene.jpg';
import heroImage3 from '@assets/bachelor-party-group-guys.jpg';
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';
import floatImage from '@assets/giant-unicorn-float.jpg';

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

const discoPackages = [
  {
    id: 'basic',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the BEST Party on Lake Travis, Exclusively for Bach Parties!',
    subtitle: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise',
    features: [
      'Full 4-hour Lake Travis cruise experience',
      'Professional DJ entertainment all day',
      'Professional photographer capturing memories',
      'Digital photo delivery after the event',
      'Giant unicorn float access',
      'Multi-group party atmosphere',
      'BYOB with shared coolers & ice',
      'Alcohol delivery & lunch delivery available'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value'
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 110,
    description: 'Enhanced party experience with premium perks and VIP treatment',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
    features: [
      'Everything in Basic Bach Package',
      'Private cooler with ice & storage bin for your group',
      'Reserved spot for your group on the boat',
      'Disco ball cup & bubble gun for guest of honor',
      'Complimentary direct-to-boat alcohol & lunch delivery',
      '25% discount on round-trip transportation',
      '$50-$100 voucher for Airbnb booze delivery',
      'Premium positioning on the boat'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'platinum',
    name: 'Super Sparkle Platinum Disco',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 125,
    description: 'Ultimate all-inclusive party experience with maximum celebration',
    subtitle: 'Nothing to Carry, Cooler Stocked When You Arrive!',
    features: [
      'Everything in Disco Queen Package',
      'Personal unicorn float for guest of honor',
      'Mimosa setup with champagne flutes, 3 juices & chambong',
      '$100 voucher for Airbnb concierge services',
      'Towel service & SPF-50 spray sunscreen provided',
      'Nothing to carry - cooler pre-stocked with drinks',
      'VIP treatment throughout the cruise',
      'Extended photo coverage & exclusive surprises'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP'
  }
];

const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing your favorites ALL DAY - party starts when you arrive!'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capture every epic moment with high-quality photos sent after'
  },
  {
    icon: Anchor,
    title: 'Shared Coolers with Ice',
    description: 'BYOB - bring your drinks, we provide coolers and ice'
  },
  {
    icon: Waves,
    title: 'Giant Unicorn Float',
    description: 'Massive floats to lounge in style on the water'
  },
  {
    icon: Gift,
    title: 'Party Supplies',
    description: 'Cups, koozies, bubbles, and more - all included!'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'Stay hydrated with unlimited ice water'
  },
  {
    icon: Shield,
    title: 'Clean Restroom',
    description: 'Full restroom facilities on board'
  },
  {
    icon: Sun,
    title: 'Plenty of Shade',
    description: 'Covered areas to escape the Texas sun'
  },
  {
    icon: Users,
    title: 'Multi-Group Energy',
    description: 'Meet bachelor & bachelorette parties from across the country!'
  }
];

const experienceTimeline = [
  {
    time: 'Hour 1: Boarding & Meet-Up',
    title: 'Welcome Aboard!',
    description: 'Arrive at Anderson Mill Marina, meet your fellow party-goers from across the country, get your drinks in the coolers, and let the DJ get the energy going!',
    icon: Ship,
    color: 'from-purple-500 to-pink-500'
  },
  {
    time: 'Hour 2: Party Starts',
    title: 'Full Party Mode',
    description: 'DJ cranking hits, photographer capturing moments, floats deployed! Dance, mingle with other bach parties, and experience the legendary multi-group energy.',
    icon: Music,
    color: 'from-pink-500 to-orange-500'
  },
  {
    time: 'Hour 3: Peak Celebration',
    title: 'Maximum Fun',
    description: 'The party is at its peak! Floats in full use, dancing non-stop, making friends with groups from Dallas, Houston, California, and beyond. Pure celebration!',
    icon: PartyPopper,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    time: 'Hour 4: Grand Finale',
    title: 'Epic Send-Off',
    description: 'Final dance party, group photos with your new friends, exchange numbers, and leave with unforgettable memories. The best bach party experience, guaranteed!',
    icon: Trophy,
    color: 'from-yellow-500 to-green-500'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'Bride',
    location: 'Austin, TX',
    rating: 5,
    text: "This was LEGENDARY! We met bachelorette parties from California, Chicago, and Dallas - made so many friends! The DJ was incredible, photographer got AMAZING shots, and the vibe was absolutely electric. Best. Bach. Party. EVER!",
    avatar: '👰',
    package: 'Disco Queen Package'
  },
  {
    id: 2,
    name: 'Jake T.',
    role: 'Best Man',
    location: 'Dallas, TX',
    rating: 5,
    text: "I planned this and the groom won't stop thanking me! Everything was handled - DJ crushed it, photos came out FIRE, and we partied with bachelor groups from across the country. The energy was INSANE. Easiest party I've ever planned!",
    avatar: '🎉',
    package: 'Platinum Package'
  },
  {
    id: 3,
    name: 'Emily R.',
    role: 'Maid of Honor',
    location: 'Houston, TX',
    rating: 5,
    text: "The multi-group atmosphere is what makes this SO special! We danced with parties from everywhere, exchanged Instagrams, and the bride said it was the best day of her life. Professional photos are stunning - better than expected!",
    avatar: '💃',
    package: 'Disco Queen Package'
  },
  {
    id: 4,
    name: 'Marcus L.',
    role: 'Groom',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Meeting other bachelor parties from different states made this unforgettable! The giant unicorn float was EPIC, DJ had everyone dancing, and we left with numbers from guys we're still friends with. This is THE bachelor party experience!",
    avatar: '🦄',
    package: 'Basic Bach Package'
  },
  {
    id: 5,
    name: 'Ashley K.',
    role: 'Bride',
    location: 'Fort Worth, TX',
    rating: 5,
    text: "Nothing to plan, nothing to carry - just SHOW UP and PARTY! The Platinum package had everything ready, cooler stocked, photographer everywhere. Dancing on the water with bachelorettes from across America was MAGICAL!",
    avatar: '✨',
    package: 'Super Sparkle Platinum Disco'
  },
  {
    id: 6,
    name: 'Tyler B.',
    role: 'Best Man',
    location: 'Round Rock, TX',
    rating: 5,
    text: "The professional DJ made this LEGENDARY - best playlist ever! We partied with groups from 5 different states, all celebrating the same thing. The vibe was electric, photos came out amazing, and I'm the hero for booking this!",
    avatar: '🎧',
    package: 'Disco Queen Package'
  }
];

const faqItems = [
  {
    id: 'what-is-atx-disco',
    question: 'What exactly is the ATX Disco Cruise?',
    answer: "The ATX Disco Cruise is America's premier bachelor and bachelorette party cruise experience! It's a shared party boat on Lake Travis where multiple bach parties from across the country come together for an epic 4-hour celebration with a professional DJ, photographer, and unforgettable multi-group energy."
  },
  {
    id: 'refund-policy',
    question: 'What is your refund policy?',
    answer: 'We offer a 48-hour full refund window after booking. After 48 hours, deposits become non-refundable but can be transferred to another date with advance notice. Weather cancellations include the Lemonade Disco backup option or full refund.'
  },
  {
    id: 'split-payment',
    question: 'Can we split the payment between multiple people?',
    answer: 'Absolutely! We offer split payment options at checkout. Each person can pay their portion directly, making it easy to manage group bookings. The organizer doesn\'t have to front the entire cost.'
  },
  {
    id: 'weather-policy',
    question: 'What happens if there\'s bad weather?',
    answer: 'We cruise rain or shine - the boat has covered areas! For severe weather (lightning, high winds), we activate the "Lemonade Disco" - a land-based party with fajita/BBQ buffet, drinks, and DJ. You still get an epic party, just on dry land!'
  },
  {
    id: 'add-people',
    question: 'Can we add people after booking?',
    answer: 'Yes! You can add 1-2 people after booking, subject to availability. Contact us as soon as you know and we\'ll add them to your reservation. The earlier you let us know, the better we can accommodate.'
  },
  {
    id: 'group-size',
    question: 'What if we have a large group?',
    answer: 'Perfect! Groups of all sizes are welcome. The boat holds up to 100 people total across all bach parties. Larger groups get better positioning and recognition. Book early to secure your spot!'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s your alcohol policy?',
    answer: 'BYOB - bring your own beverages! We provide coolers with ice (private coolers for Queen/Platinum packages). We also partner with delivery services who can bring alcohol directly to the boat. Just bring what you want to drink!'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance should we book?',
    answer: 'Book as early as possible! Peak weekends (March-October) sell out 4-6 weeks in advance. Summer Saturdays often book 2+ months ahead. Secure your date now to avoid disappointment!'
  },
  {
    id: 'what-to-bring',
    question: 'What should we bring?',
    answer: 'Bring: Your drinks (BYOB), sunscreen, sunglasses, swimwear, towel, and your party energy! Platinum package includes most supplies. Basic package - bring cups, ice, and anything else you need.'
  },
  {
    id: 'schedule',
    question: 'When does the ATX Disco Cruise run?',
    answer: 'Friday: 12:00 PM - 4:00 PM ($85/person) • Saturday: 11:00 AM - 3:00 PM ($95/person) • Saturday: 3:30 PM - 7:30 PM ($95/person). Available year-round, weather permitting.'
  },
  {
    id: 'photos',
    question: 'When do we get our photos?',
    answer: 'Professional photos are delivered digitally within 48-72 hours after your cruise via email or download link. You\'ll receive high-quality images of all the epic moments captured by our photographer!'
  },
  {
    id: 'parking',
    question: 'Where do we park and meet?',
    answer: 'Meet at Anderson Mill Marina on Lake Travis (13619 FM 2769, Austin, TX 78730). Free parking available. Arrive 15-20 minutes early for check-in. Transportation packages available with discount!'
  },
  {
    id: 'dress-code',
    question: 'Is there a dress code?',
    answer: 'No formal dress code! Many groups do fun themes (disco, nautical, matching outfits) which makes for amazing photos. Bring swimwear for the floats. Most important: be comfortable and ready to party!'
  },
  {
    id: 'other-parties',
    question: 'Will there be other bach parties on the boat?',
    answer: 'YES - that\'s the magic! You\'ll meet 3-8 other bach parties from across America (Texas, California, Chicago, etc.). The multi-group energy creates an unforgettable experience. Everyone\'s celebrating, the vibe is electric!'
  },
  {
    id: 'food',
    question: 'Is food included?',
    answer: 'Food is not included, but lunch delivery is available! Local restaurants deliver directly to the boat. Or bring your own snacks/meals. Queen & Platinum packages include delivery coordination assistance.'
  },
  {
    id: 'age-limit',
    question: 'Is there an age limit?',
    answer: 'Must be 21+ to consume alcohol. All guests welcome, but this is a party cruise atmosphere best suited for adults. Valid ID required for alcohol consumption.'
  }
];

const quickStats = [
  { icon: Trophy, label: '100%', value: 'Satisfaction Track Record', color: 'text-yellow-600' },
  { icon: Users, label: 'Thousands', value: 'Groups Served Nationwide', color: 'text-pink-600' },
  { icon: DollarSign, label: '3-5x', value: 'Better Value vs Private', color: 'text-green-600' },
  { icon: Star, label: '10/10', value: 'Claude AI Rating', color: 'text-purple-600' },
  { icon: Calendar, label: '5+ Years', value: 'Weekly Operations', color: 'text-blue-600' },
  { icon: Shield, label: 'Only in USA', value: 'Multi-Group Bach Cruise', color: 'text-orange-600' }
];

export default function ATXDiscoCruise() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  const { data: endorsements } = useQuery<any[]>({
    queryKey: ['/api/endorsements'],
  });

  const discoEndorsement = endorsements?.find(e => 
    e.categories?.includes('disco_cruise') || e.categories?.includes('general')
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBookNow = () => {
    navigate('/booking-flow?cruise=disco');
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "ATX Disco Cruise - Bachelor & Bachelorette Party Experience",
    "description": "America's premier bachelor and bachelorette party cruise experience on Lake Travis. Professional DJ, photographer, 4-hour party with multi-group energy.",
    "image": heroImage1,
    "startDate": new Date().toISOString(),
    "endDate": new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Anderson Mill Marina, Lake Travis",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13619 FM 2769",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78730",
        "addressCountry": "US"
      }
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Bach Package",
        "price": "85",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": typeof window !== 'undefined' ? `${window.location.origin}/atx-disco-cruise` : '',
        "validFrom": new Date().toISOString()
      },
      {
        "@type": "Offer",
        "name": "Disco Queen Package",
        "price": "95",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": typeof window !== 'undefined' ? `${window.location.origin}/atx-disco-cruise` : '',
        "validFrom": new Date().toISOString()
      },
      {
        "@type": "Offer",
        "name": "Super Sparkle Platinum Disco",
        "price": "105",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": typeof window !== 'undefined' ? `${window.location.origin}/atx-disco-cruise` : '',
        "validFrom": new Date().toISOString()
      }
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Premier Party Cruises",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    },
    "performer": {
      "@type": "PerformingGroup",
      "name": "Professional DJ & Photographer Team"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Bachelor & Bachelorette Party Cruise",
    "provider": {
      "@type": "Organization",
      "name": "Premier Party Cruises",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "10",
        "bestRating": "10",
        "ratingCount": "1000"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Austin",
      "state": "TX"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "85",
      "highPrice": "105",
      "priceCurrency": "USD"
    }
  };

  const reviewSchema = discoEndorsement ? {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Service",
      "name": "ATX Disco Cruise"
    },
    "author": {
      "@type": "Organization",
      "name": discoEndorsement.source
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": discoEndorsement.rating?.toString() || "10",
      "bestRating": discoEndorsement.maxRating?.toString() || "10"
    },
    "reviewBody": discoEndorsement.summary
  } : null;

  const faqSchema = generateFAQSchema(faqItems.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));

  const combinedSchema = [eventSchema, serviceSchema, reviewSchema, faqSchema].filter(Boolean);

  return (
    <>
      <SEOHead
        pageRoute="/atx-disco-cruise"
        defaultTitle="ATX Disco Cruise - Austin's Premier Bachelor & Bachelorette Party Experience"
        defaultDescription="Rated 10/10 by Claude AI. Join America's best bach party cruise on Lake Travis. $85-105/person all-inclusive. Professional DJ, photographer, 4-hour experience. Book now!"
        defaultKeywords={['ATX disco cruise', 'bachelor party Austin', 'bachelorette party Austin', 'party boat Lake Travis', 'all-inclusive bachelor party', 'Austin party cruise', 'Lake Travis party boat', 'disco cruise Austin']}
        customSchema={combinedSchema}
        image={heroImage1}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative h-[70vh] flex items-center justify-center overflow-hidden"
          data-testid="section-hero"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/70 to-orange-900/80 z-10" />
              <img 
                src={heroImages[currentHeroImage]} 
                alt="ATX Disco Cruise party atmosphere on Lake Travis"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 bg-yellow-500 text-black text-lg px-6 py-2" data-testid="badge-rating">
                <Star className="w-5 h-5 mr-2 inline" /> 10/10 Rated by Claude AI
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" data-testid="text-hero-headline">
                ATX Disco Cruise
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mt-2">
                  The Country's Only Multi-Group Bach Party Cruise
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-semibold" data-testid="text-hero-subheadline">
                The single most unique and comprehensive bachelor/bachelorette party experience in the United States
              </p>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto" data-testid="text-hero-description">
                Only all-inclusive, multi-group bachelor/bachelorette party cruise in the country. Join parties from across America for an unforgettable 4-hour Lake Travis celebration with professional DJ, photographer, and 100% satisfaction track record!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6"
                  data-testid="button-book-now"
                >
                  Book Your Spot Now <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6"
                  data-testid="button-learn-more"
                >
                  <Phone className="mr-2" /> Talk to an Expert
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Quick Stats Bar */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 py-8"
          data-testid="section-stats"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickStats.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="text-center text-white"
                  data-testid={`stat-${idx}`}
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color} filter brightness-200`} />
                  <div className="text-2xl font-bold">{stat.label}</div>
                  <div className="text-sm opacity-90">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Claude AI Endorsement Section */}
        {discoEndorsement && (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="py-16 px-4"
            data-testid="section-endorsement"
          >
            <div className="max-w-5xl mx-auto">
              <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-10 h-10 text-yellow-600" />
                    <div>
                      <CardTitle className="text-2xl" data-testid="text-endorsement-source">
                        {discoEndorsement.source} Endorsement
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {[...Array(discoEndorsement.rating || 10)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        ))}
                        <span className="text-lg font-bold ml-2" data-testid="text-endorsement-rating">
                          {discoEndorsement.rating || 10}/{discoEndorsement.maxRating || 10}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-lg" data-testid="text-endorsement-headline">
                    {discoEndorsement.headline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4" data-testid="text-endorsement-summary">
                    {discoEndorsement.summary}
                  </p>
                  <Link href="/ai-endorsement">
                    <Button variant="outline" className="border-yellow-600 text-yellow-700 hover:bg-yellow-50" data-testid="link-full-analysis">
                      Read Full AI Analysis <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        )}

        {/* National Leadership & Market Impact Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white"
          data-testid="section-national-leadership"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black text-lg px-6 py-3">
                <Trophy className="w-5 h-5 mr-2 inline" /> National Market Leader
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why We're #1 in the Nation
              </h2>
              <p className="text-2xl text-white/90 font-semibold mb-2">
                Single-handedly making Austin a top-tier bachelor & bachelorette destination
              </p>
              <p className="text-xl text-white/80 max-w-4xl mx-auto">
                After analyzing thousands of customer reviews and competitive offerings nationwide, one conclusion is clear: nothing else comes close to what we've created with the ATX Disco Cruise.
              </p>
            </motion.div>

            <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Shield className="w-8 h-8 text-yellow-400" />
                    Only in America
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">The country's only all-inclusive, multi-group bachelor/bachelorette party cruise</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>No other company offers this unique multi-group experience nationwide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Exclusive format perfected over 5+ years of weekly operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Thousands of groups from across America served with 100% satisfaction</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <CloudRain className="w-8 h-8 text-blue-400" />
                    Industry's Only Weather Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">The Lemonade Disco - Weather Backup Plan</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Only company with comprehensive rain backup protocol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Land-based party with fajita/BBQ buffet, drinks, and DJ if severe weather</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Your celebration happens no matter what - guaranteed!</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    Unbeatable Value
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">3-5x better value than private rentals while including MORE</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Professional DJ & photographer included (not extra)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Full 4-hour experience (2x longer than typical 2-hour rentals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Almost always cheaper per person with better amenities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Award className="w-8 h-8 text-purple-400" />
                    Proven Track Record
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">14+ years of excellence, 100% satisfaction guarantee</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Consistent 5-star reviews from thousands of groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>84% of reviews specifically mention "great value"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>America's most trusted bachelor/bachelorette party cruise</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Schedule Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-16 px-4 bg-white/50 dark:bg-gray-800/50"
          data-testid="section-schedule"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12" data-testid="text-schedule-headline">
              <Calendar className="w-10 h-10 inline mr-3 text-purple-600" />
              Weekly Schedule
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-xl transition-shadow" data-testid="card-schedule-friday">
                <CardHeader>
                  <CardTitle className="text-2xl">Friday</CardTitle>
                  <CardDescription className="text-lg font-semibold">12:00 PM - 4:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-600 mb-2">$85</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">per person</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-xl transition-shadow border-2 border-pink-500" data-testid="card-schedule-saturday-morning">
                <CardHeader>
                  <Badge className="mb-2 bg-pink-500">Most Popular</Badge>
                  <CardTitle className="text-2xl">Saturday Morning</CardTitle>
                  <CardDescription className="text-lg font-semibold">11:00 AM - 3:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-pink-600 mb-2">$95</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">per person</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-xl transition-shadow" data-testid="card-schedule-saturday-afternoon">
                <CardHeader>
                  <CardTitle className="text-2xl">Saturday Afternoon</CardTitle>
                  <CardDescription className="text-lg font-semibold">3:30 PM - 7:30 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-orange-600 mb-2">$95</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">per person</div>
                </CardContent>
              </Card>
            </div>
            <p className="text-center mt-6 text-gray-600 dark:text-gray-400" data-testid="text-schedule-note">
              Available year-round • Weather permitting
            </p>
          </div>
        </motion.section>

        {/* Packages Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-4"
          data-testid="section-packages"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-packages-headline">
                Choose Your Package
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-packages-subheadline">
                From budget-friendly to all-inclusive VIP - we've got you covered
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {discoPackages.map((pkg, idx) => (
                <motion.div key={pkg.id} variants={fadeInUp}>
                  <Card 
                    className={cn(
                      "relative h-full hover:shadow-2xl transition-all duration-300",
                      pkg.popular && "border-4 border-pink-500 shadow-xl scale-105"
                    )}
                    data-testid={`card-package-${pkg.id}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-pink-500 text-white px-6 py-1 text-sm">
                          {pkg.badge}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <pkg.icon className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                      <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-purple-600">
                          ${pkg.price}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-xl text-gray-400 line-through">
                            ${pkg.originalPrice}
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-base font-medium">
                        {pkg.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {pkg.description}
                      </p>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={cn(
                          "w-full mt-6",
                          pkg.popular 
                            ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                            : "bg-purple-600 hover:bg-purple-700"
                        )}
                        onClick={handleBookNow}
                        data-testid={`button-select-${pkg.id}`}
                      >
                        Select {pkg.name} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* What's Included Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20"
          data-testid="section-whats-included"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-included-headline">
                Everything You Need, All Included
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-included-subheadline">
                Premium amenities and services for the ultimate party experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {whatsIncluded.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="text-center hover:shadow-lg transition-shadow h-full" data-testid={`card-included-${idx}`}>
                    <CardContent className="pt-6">
                      <item.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 4-Hour Experience Timeline */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-4"
          data-testid="section-experience"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-experience-headline">
                Your 4-Hour Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-experience-subheadline">
                Hour-by-hour breakdown of an unforgettable experience
              </p>
            </motion.div>

            <div className="space-y-8">
              {experienceTimeline.map((hour, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow" data-testid={`card-hour-${idx + 1}`}>
                    <div className={cn("h-2 bg-gradient-to-r", hour.color)} />
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-full bg-gradient-to-br", hour.color)}>
                          <hour.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{hour.title}</CardTitle>
                          <CardDescription className="text-base font-semibold">{hour.time}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">{hour.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Value Comparison Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10"
          data-testid="section-value-comparison"
        >
          <div className="max-w-6xl mx-auto">
            <DiscoVsPrivateComparison />
          </div>
        </motion.section>

        {/* Testimonials Carousel */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4"
          data-testid="section-testimonials"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" data-testid="text-testimonials-headline">
              <Quote className="w-10 h-10 inline mr-3 text-purple-600" />
              What Our Customers Say
            </h2>
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full" data-testid={`card-testimonial-${testimonial.id}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{testimonial.avatar}</span>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.role} • {testimonial.location}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{testimonial.text}</p>
                        <Badge variant="outline" className="text-xs">{testimonial.package}</Badge>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-white/50 dark:bg-gray-800/50"
          data-testid="section-faq"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" data-testid="text-faq-headline">
              <HelpCircle className="w-10 h-10 inline mr-3 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-6 bg-white dark:bg-gray-800" data-testid={`accordion-faq-${faq.id}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* Party Planning Checklist */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4"
          data-testid="section-checklist"
        >
          <div className="max-w-5xl mx-auto">
            <PartyPlanningChecklist eventType="disco" />
          </div>
        </motion.section>

        {/* Lemonade Disco Weather Backup */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
          data-testid="section-weather-backup"
        >
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-yellow-500">
              <CardHeader className="text-center">
                <CloudRain className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                <CardTitle className="text-3xl mb-2" data-testid="text-weather-headline">
                  Lemonade Disco - Weather Backup Plan
                </CardTitle>
                <CardDescription className="text-lg" data-testid="text-weather-subheadline">
                  When life gives you rain, we throw a Lemonade Disco!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-center" data-testid="text-weather-description">
                  We cruise rain or shine with covered areas on the boat! But for severe weather (lightning, high winds), 
                  we activate our legendary backup plan - a land-based party that's become famous in its own right.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-orange-600" /> What's Included
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Fajita or BBQ buffet with all the fixings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Professional DJ keeping the party going</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Indoor/covered venue with full bar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Same multi-group party atmosphere</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" /> Our Guarantee
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Still an epic party, just on dry land</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Full refund if we cancel and can't provide Lemonade Disco</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Many groups love the Lemonade Disco as much as the cruise!</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg mt-6">
                  <p className="text-center font-semibold text-yellow-800 dark:text-yellow-200">
                    💡 Pro Tip: Some bach parties book specifically hoping for the Lemonade Disco - it's that good!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600"
          data-testid="section-final-cta"
        >
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-final-cta-headline">
              Ready for America's Best Bach Party?
            </h2>
            <p className="text-xl mb-8 opacity-90" data-testid="text-final-cta-subheadline">
              Join bachelor & bachelorette parties from across the country for an unforgettable experience. 
              Book now before your date sells out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleBookNow}
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6"
                data-testid="button-final-book-now"
              >
                Book Your Spot Now <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
                className="border-white text-white hover:bg-white/20 text-lg px-8 py-6"
                data-testid="button-final-contact"
              >
                <Phone className="mr-2" /> Questions? Call Us
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75" data-testid="text-final-urgency">
              ⚡ Peak weekends sell out 4-6 weeks in advance. Don't wait!
            </p>
          </div>
        </motion.section>

        <Footer />
      </div>
    </>
  );
}
