import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Users, Clock, DollarSign, Star, Calendar, Phone, Mail, MapPin,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, Anchor, Waves,
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Instagram, Facebook, Twitter, Quote, ChevronRight,
  Navigation, Compass, LifeBuoy, Zap, Target, TrendingUp, Play,
  ExternalLink, BookOpen, Headphones, Car, Wine, Camera as CameraIcon,
  UserCheck, MessageSquare, Ticket, Gift, Disc3, Volume2, 
  MicIcon as Mic, Utensils, GlassWater, Palmtree, CircleDot,
  Calculator, FileCheck, CreditCard, Banknote, HandCoins,
  ChefHat, Wifi, Bluetooth, Building, Settings, Compass as CompassIcon,
  Gauge, Fuel, PersonStanding
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { PRICING_DEFAULTS } from '@shared/constants';
import { apiRequest } from '@/lib/queryClient';
import SEOHead from '@/components/SEOHead';

// Hero and gallery images 
import heroImage1 from '@assets/image_1757844813165.png';
import heroImage2 from '@assets/image_1757850768476.png';
import heroImage3 from '@assets/image_1757853656553.png';
import galleryImage1 from '@assets/image_1757877906674.png';
import galleryImage2 from '@assets/image_1757884902886.png';
import galleryImage3 from '@assets/image_1757886911506.png';

// Animation variants
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

// Types for dynamic pricing
interface DynamicPricing {
  weekdayRate: number;
  weekendRate: number;
  subtotal: number;
  tax: number;
  gratuity: number;
  total: number;
  depositAmount: number;
}

interface FleetOption {
  id: string;
  name: string;
  subtitle: string;
  capacity: number;
  maxCapacity: number;
  features: string[];
  duration: { weekday: number; weekend: number };
  image: string;
  popular: boolean;
  amenities: Array<{ icon: any; label: string }>;
  pricing?: DynamicPricing;
  isLoading?: boolean;
}

// Static fleet options (visual data only - pricing is dynamic)
const staticFleetOptions: Omit<FleetOption, 'pricing' | 'isLoading'>[] = [
  {
    id: 'pontoon-14',
    name: '14-Person Pontoon',
    subtitle: 'Perfect for intimate groups',
    capacity: 14,
    maxCapacity: 14,
    features: [
      'Intimate private setting',
      'Premium sound system',
      'Coolers & ice provided',
      'Professional captain included',
      'Perfect for small celebrations'
    ],
    duration: {
      weekday: 3, // minimum hours Mon-Thu
      weekend: 4  // minimum hours Fri-Sun
    },
    image: galleryImage1,
    popular: false,
    amenities: [
      { icon: Users, label: 'Up to 14 guests' },
      { icon: Volume2, label: 'Premium sound system' },
      { icon: LifeBuoy, label: 'Safety equipment' },
      { icon: GlassWater, label: 'Coolers & ice' }
    ]
  },
  {
    id: 'pontoon-25',
    name: '25-Person Pontoon',
    subtitle: 'Most popular choice',
    capacity: 25,
    maxCapacity: 25,
    features: [
      'Spacious deck & seating',
      'Premium sound system with Bluetooth',
      'Large coolers & ice service',
      'Professional captain & crew',
      'Perfect for parties & celebrations'
    ],
    duration: {
      weekday: 3, // minimum hours Mon-Thu
      weekend: 4  // minimum hours Fri-Sun
    },
    image: galleryImage2,
    popular: true,
    amenities: [
      { icon: Users, label: 'Up to 25 guests' },
      { icon: Bluetooth, label: 'Bluetooth sound system' },
      { icon: Shield, label: 'Professional crew' },
      { icon: Anchor, label: 'Lake access & swimming' }
    ]
  },
  {
    id: 'yacht-50',
    name: '50-Person Yacht',
    subtitle: 'Premium luxury experience',
    capacity: 50,
    maxCapacity: 50,
    features: [
      'Luxury yacht with multiple decks',
      'High-end sound system & entertainment',
      'Full bar setup available',
      'Professional captain & extra crew',
      'Perfect for corporate & large events'
    ],
    duration: {
      weekday: 3, // minimum hours Mon-Thu
      weekend: 4  // minimum hours Fri-Sun
    },
    image: galleryImage3,
    popular: false,
    amenities: [
      { icon: Users, label: 'Up to 50 guests' },
      { icon: Crown, label: 'Luxury yacht amenities' },
      { icon: ChefHat, label: 'Full bar setup' },
      { icon: Camera, label: 'Multiple photo areas' }
    ]
  },
  {
    id: 'mega-yacht-75',
    name: '75-Person Mega Yacht',
    subtitle: 'Ultimate luxury charter',
    capacity: 75,
    maxCapacity: 75,
    features: [
      'Mega yacht with premium amenities',
      'Multi-zone sound system',
      'Full catering kitchen available',
      'Professional crew of 3+',
      'Perfect for weddings & corporate retreats'
    ],
    duration: {
      weekday: 4, // minimum hours Mon-Thu
      weekend: 4  // minimum hours Fri-Sun
    },
    image: galleryImage1,
    popular: false,
    amenities: [
      { icon: Users, label: 'Up to 75 guests' },
      { icon: Building, label: 'Multiple deck levels' },
      { icon: Utensils, label: 'Full catering kitchen' },
      { icon: Wifi, label: 'Premium amenities' }
    ]
  }
];

// Pricing breakdown components
const pricingFeatures = [
  {
    icon: Calculator,
    title: 'Transparent Pricing',
    description: 'Hourly rate × duration = base cost. No hidden fees or surprise charges.'
  },
  {
    icon: PersonStanding,
    title: 'Extra Crew Fee',
    description: 'Groups over 20 people: $200 extra crew fee for enhanced service & safety.'
  },
  {
    icon: FileCheck,
    title: 'Tax & Gratuity',
    description: '8.25% tax added. Suggested 20% gratuity for exceptional crew service.'
  },
  {
    icon: CreditCard,
    title: 'Flexible Deposits',
    description: '25% deposit if >30 days out. Full payment required if <30 days from cruise.'
  }
];

// Why choose Premier Party Cruises
const whyChooseUs = [
  {
    icon: Trophy,
    title: '14+ Years Experience',
    description: 'Austin\'s longest-running party cruise company with unmatched Lake Travis expertise.'
  },
  {
    icon: UserCheck,
    title: '125,000+ Happy Customers',
    description: 'We\'ve created unforgettable memories for over 125,000 guests with 5-star service.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Coast Guard certified captains and pristine safety record ensure your peace of mind.'
  },
  {
    icon: Star,
    title: 'Newest Fleet',
    description: 'Austin\'s newest and nicest boats with premium amenities and sound systems.'
  },
  {
    icon: Headphones,
    title: 'Full-Service Experience',
    description: 'Professional crew, premium sound, coolers, ice, and all amenities included.'
  },
  {
    icon: Target,
    title: 'Custom Experiences',
    description: 'Tailored packages for any celebration - corporate events, weddings, birthdays, anniversaries.'
  }
];

// Testimonials for private cruises
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Corporate Event Planner',
    rating: 5,
    text: 'Premier Party Cruises made our company retreat absolutely unforgettable. The 50-person yacht was perfect, the crew was professional, and the experience exceeded all expectations. Our team is still talking about it!',
    event: 'Corporate Retreat',
    groupSize: 45,
    image: '/testimonials/sarah.jpg'
  },
  {
    id: 2,
    name: 'Michael & Jennifer Chen',
    role: 'Newlyweds',
    rating: 5,
    text: 'Our wedding reception cruise on Lake Travis was magical. The sunset views, professional service, and attention to detail made our special day perfect. Worth every penny!',
    event: 'Wedding Reception',
    groupSize: 75,
    image: '/testimonials/chen.jpg'
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'Birthday Celebration',
    rating: 5,
    text: 'Booked the 25-person pontoon for my 40th birthday and it was incredible. The crew went above and beyond, the boat was immaculate, and the Lake Travis experience was unforgettable.',
    event: '40th Birthday Party',
    groupSize: 22,
    image: '/testimonials/david.jpg'
  }
];

// FAQ data
const faqData = [
  {
    question: 'How far in advance should I book my private cruise?',
    answer: 'We recommend booking 2-4 weeks in advance for weekend dates, especially during peak season (April-September). Weekday cruises typically have more availability and can often be booked with shorter notice.'
  },
  {
    question: 'What\'s included in the private cruise price?',
    answer: 'All private cruises include: professional Coast Guard certified captain, fuel, coolers with ice, premium sound system with Bluetooth connectivity, safety equipment, and basic amenities. Food, beverages, and extra crew (if needed) are additional.'
  },
  {
    question: 'Can we bring our own food and drinks?',
    answer: 'Absolutely! You can bring your own food, snacks, and beverages (including alcohol for guests 21+). We provide coolers and ice. We can also connect you with preferred catering partners for full-service dining.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety is our top priority. If weather conditions are unsafe, we\'ll work with you to reschedule your cruise to another date. We monitor weather closely and will contact you 24-48 hours before your cruise if conditions look questionable.'
  },
  {
    question: 'Do you provide decorations for special events?',
    answer: 'We can accommodate basic decorations and help coordinate with local vendors for more elaborate setups. Many clients bring their own decorations, and our crew is happy to help with setup before departure.'
  },
  {
    question: 'What are your cancellation policies?',
    answer: 'Cancellations more than 14 days prior receive full refund. 7-14 days prior: 50% refund. Less than 7 days: no refund except for unsafe weather conditions. We offer date changes based on availability.'
  },
  {
    question: 'How do deposits and payments work?',
    answer: 'If booking more than 30 days out, we require a 25% deposit to secure your date. The balance is due 30 days before your cruise. If booking within 30 days, full payment is required upfront.'
  },
  {
    question: 'Can swimming be included in our private cruise?',
    answer: 'Yes! Lake Travis offers great swimming opportunities. We can anchor in swimming areas and provide ladder access. We recommend bringing water shoes and sunscreen. Swimming is always at your own risk.'
  }
];

export default function PrivateCruises() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [fleetOptions, setFleetOptions] = useState<FleetOption[]>(
    staticFleetOptions.map(option => ({ ...option, isLoading: true }))
  );
  const [selectedBoat, setSelectedBoat] = useState<FleetOption | null>(null);
  const [showPricingCalculator, setShowPricingCalculator] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({
    groupSize: 20,
    hours: 4,
    isWeekend: true
  });

  // Fetch pricing settings for tax and gratuity calculations
  const { data: pricingSettings } = useQuery<any>({
    queryKey: ['/api/pricing-settings'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Calculate dynamic pricing for each fleet option
  const calculateFleetPricing = async (option: Omit<FleetOption, 'pricing' | 'isLoading'>, isWeekend: boolean): Promise<DynamicPricing> => {
    const baseHourlyRate = PRICING_DEFAULTS.BASE_HOURLY_RATE / 100; // Convert from cents to dollars
    const duration = isWeekend ? option.duration.weekend : option.duration.weekday;
    
    // Apply capacity-based rate adjustments (matching booking system logic)
    let adjustedHourlyRate = baseHourlyRate;
    if (option.capacity <= 14) {
      adjustedHourlyRate = 180; // Small boats: $180/hour
    } else if (option.capacity <= 25) {
      adjustedHourlyRate = isWeekend ? 340 : 280; // Popular size with weekend premium
    } else if (option.capacity <= 50) {
      adjustedHourlyRate = isWeekend ? 550 : 450; // Luxury yacht rates
    } else {
      adjustedHourlyRate = isWeekend ? 800 : 650; // Mega yacht rates
    }

    const subtotal = adjustedHourlyRate * duration;
    
    // Apply crew fee for larger groups (matching booking system)
    const crewFee = option.capacity > 20 ? 200 : 0;
    const subtotalWithCrew = subtotal + crewFee;
    
    // Use pricing settings or defaults
    const taxRate = pricingSettings?.taxRate ? pricingSettings.taxRate / 10000 : 0.0825; // Convert basis points
    const gratuityRate = pricingSettings?.defaultGratuityPercent ? pricingSettings.defaultGratuityPercent / 100 : 0.18;
    const depositPercent = pricingSettings?.defaultDepositPercent || 25;
    
    const tax = Math.round(subtotalWithCrew * taxRate);
    const gratuity = Math.round(subtotalWithCrew * gratuityRate);
    const total = subtotalWithCrew + tax + gratuity;
    const depositAmount = Math.round(total * (depositPercent / 100));

    return {
      weekdayRate: isWeekend ? adjustedHourlyRate * 0.83 : adjustedHourlyRate, // Reverse calculate weekday rate
      weekendRate: isWeekend ? adjustedHourlyRate : adjustedHourlyRate * 1.2, // Weekend premium
      subtotal: subtotalWithCrew,
      tax,
      gratuity,
      total,
      depositAmount,
    };
  };

  // Update fleet options with dynamic pricing
  useEffect(() => {
    const updatePricing = async () => {
      const sampleDate = new Date(); // Default to today for initial pricing
      const isWeekend = sampleDate.getDay() === 0 || sampleDate.getDay() >= 5; // Friday, Saturday, Sunday
      
      const updatedOptions = await Promise.all(
        staticFleetOptions.map(async (option) => {
          try {
            const pricing = await calculateFleetPricing(option, isWeekend);
            return { ...option, pricing, isLoading: false };
          } catch (error) {
            console.error(`Failed to calculate pricing for ${option.name}:`, error);
            return { ...option, isLoading: false };
          }
        })
      );
      
      setFleetOptions(updatedOptions);
      
      // Set default selected boat to most popular once loaded
      if (!selectedBoat) {
        const popularOption = updatedOptions.find(option => option.popular) || updatedOptions[0];
        setSelectedBoat(popularOption);
      }
    };

    updatePricing();
  }, [pricingSettings, selectedBoat]);

  // Calculate pricing for calculator with dynamic data
  const calculatePrice = (boat: FleetOption, inputs: typeof calculatorInputs) => {
    if (!boat.pricing) {
      return {
        basePrice: 0,
        extraCrewFee: 0,
        subtotal: 0,
        tax: 0,
        suggestedGratuity: 0,
        total: 0
      };
    }

    const rate = inputs.isWeekend ? boat.pricing.weekendRate : boat.pricing.weekdayRate;
    const basePrice = rate * inputs.hours;
    const extraCrewFee = inputs.groupSize > 20 ? 200 : 0;
    const subtotal = basePrice + extraCrewFee;
    const taxRate = pricingSettings?.taxRate ? pricingSettings.taxRate / 10000 : 0.0825;
    const gratuityRate = pricingSettings?.defaultGratuityPercent ? pricingSettings.defaultGratuityPercent / 100 : 0.20;
    const tax = Math.round(subtotal * taxRate);
    const suggestedGratuity = Math.round(subtotal * gratuityRate);
    const total = subtotal + tax + suggestedGratuity;
    
    return {
      basePrice,
      extraCrewFee,
      subtotal,
      tax,
      suggestedGratuity,
      total
    };
  };

  const handleBookNow = (boat?: FleetOption) => {
    // Navigate to booking flow with pre-filled boat selection
    if (boat) {
      const params = new URLSearchParams({
        cruiseType: 'private',
        boatCapacity: boat.capacity.toString(),
        eventType: 'other',
        groupSize: Math.min(boat.capacity, 20).toString(),
        preselectedBoat: boat.id
      });
      navigate(`/booking-flow?${params.toString()}`);
    } else {
      navigate('/booking-flow?cruiseType=private');
    }
  };

  const handleGetQuote = (boat?: FleetOption) => {
    // Navigate to chat with pre-filled boat information for instant quote
    if (boat) {
      const message = `I'm interested in getting a quote for the ${boat.name} for a private cruise. Can you help me with pricing?`;
      navigate(`/chat?message=${encodeURIComponent(message)}&boatType=${boat.capacity}&cruiseType=private`);
    } else {
      navigate('/chat?cruiseType=private');
    }
  };

  const handleStartBooking = () => {
    // Navigate to booking flow from hero section
    navigate('/booking-flow?cruiseType=private&source=hero');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/private-cruises"
        defaultTitle="Private Cruise Charters Lake Travis Austin | Premier Party Cruises"
        defaultDescription="Exclusive private boat charters on Lake Travis. 14-75 person capacity boats with professional crews. Perfect for corporate events, weddings, birthdays & celebrations. Book your private cruise today!"
        defaultKeywords={[
          'private cruise austin',
          'boat rental lake travis',
          'private party boat austin',
          'lake travis charter boat',
          'austin boat rental private',
          'corporate boat rental austin',
          'wedding boat charter lake travis',
          'private yacht rental austin'
        ]}
        schemaType="service"
        customSchema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Private Cruise Charters",
          "description": "Exclusive private boat charters on Lake Travis with professional crews and premium amenities",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "url": "https://premierppartycruises.com",
            "telephone": "+1-512-123-4567",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            }
          },
          "areaServed": "Lake Travis, Austin, Texas",
          "serviceType": "Private Boat Charter"
        }}
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-marine-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-yellow/20 dark:from-brand-blue/10 dark:to-brand-yellow/10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Ship className="h-20 w-20 text-brand-blue mx-auto mb-8" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-gray-900 dark:text-white"
            >
              EXCLUSIVE PRIVATE
              <span className="block text-brand-blue">LAKE TRAVIS CRUISES</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Your own private floating paradise with professional crew, premium amenities, 
              and unforgettable Austin Hill Country views. From intimate gatherings to grand celebrations.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Button
                size="lg"
                onClick={() => handleBookNow()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-book-private-cruise"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK YOUR PRIVATE CRUISE
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowPricingCalculator(true)}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-pricing-calculator"
              >
                <Calculator className="mr-3 h-6 w-6" />
                PRICING CALCULATOR
              </Button>
            </motion.div>

            {/* Key selling points */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
            >
              {[
                { icon: Users, text: '14-75 Person Boats', subtext: 'Perfect for any group size' },
                { icon: Trophy, text: '14+ Years Experience', subtext: 'Austin\'s most trusted' },
                { icon: Shield, text: 'Professional Crews', subtext: 'Coast Guard certified' },
                { icon: Star, text: 'Premium Amenities', subtext: 'Everything included' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <item.icon className="h-12 w-12 text-brand-blue mb-4" />
                  <div className="font-bold text-gray-900 dark:text-white mb-2">{item.text}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{item.subtext}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-yellow rounded-full animate-ping opacity-30" style={{animationDelay: '0s'}} />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-brand-blue rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-brand-yellow rounded-full animate-ping opacity-20" style={{animationDelay: '2s'}} />
        </div>
      </section>

      {/* Fleet Showcase Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              OUR PREMIUM FLEET
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Choose from Austin's newest and nicest boats, each equipped with premium amenities 
              and professional crews to ensure your perfect day on Lake Travis.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {fleetOptions.map((boat, index) => (
              <motion.div
                key={boat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={cn(
                  "relative group cursor-pointer transition-all duration-300",
                  selectedBoat?.id === boat.id && "scale-105"
                )}
                onClick={() => setSelectedBoat(boat)}
                data-testid={`card-boat-${boat.id}`}
              >
                <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-brand-blue/50">
                  {boat.popular && (
                    <Badge className="absolute top-4 right-4 z-10 bg-brand-yellow text-black font-bold px-4 py-2">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={boat.image} 
                      alt={boat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl font-heading font-bold">{boat.name}</div>
                      <div className="text-sm opacity-90">{boat.subtitle}</div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-2xl font-heading mb-2">{boat.name}</CardTitle>
                        <CardDescription className="text-lg">{boat.subtitle}</CardDescription>
                      </div>
                      <div className="text-right">
                        {boat.isLoading ? (
                          <div className="animate-pulse space-y-2">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                          </div>
                        ) : boat.pricing ? (
                          <>
                            <div className="text-2xl font-bold text-brand-blue" data-testid={`text-weekday-rate-${boat.id}`}>
                              {formatCurrency(boat.pricing.weekdayRate)}/hr
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Mon-Thu</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white mt-1" data-testid={`text-weekend-rate-${boat.id}`}>
                              {formatCurrency(boat.pricing.weekendRate)}/hr
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Fri-Sun</div>
                            <div className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium" data-testid={`text-total-${boat.id}`}>
                              Total: {formatCurrency(boat.pricing.total)}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Call for pricing
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Amenities Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {boat.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <amenity.icon className="h-4 w-4 text-brand-blue" />
                          <span className="text-sm font-medium">{amenity.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {boat.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(boat);
                        }}
                        data-testid={`button-book-${boat.id}`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book {boat.name}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetQuote(boat);
                        }}
                        data-testid={`button-quote-${boat.id}`}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Get Instant Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Transparency Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              TRANSPARENT PRICING
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              No hidden fees or surprise charges. Here's exactly how our pricing works.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pricingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <feature.icon className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Example Pricing Breakdown */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-heading font-bold mb-6 text-center text-gray-900 dark:text-white">
                Example: 25-Person Weekend Cruise (4 Hours)
              </h3>
              
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Base Rate (4 hours × $340/hr)</span>
                  <span className="font-bold">{formatCurrency(1360)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Extra Crew Fee (25 people)</span>
                  <span className="font-bold">{formatCurrency(200)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold">{formatCurrency(1560)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Tax (8.25%)</span>
                  <span className="font-bold">{formatCurrency(129)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Suggested Gratuity (20%)</span>
                  <span className="font-bold">{formatCurrency(312)}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t-2 border-brand-blue text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-brand-blue">{formatCurrency(2001)}</span>
                </div>
                <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                  = {formatCurrency(Math.round(2001 / 25))} per person
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={() => setShowPricingCalculator(true)}
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-8 py-3"
                  data-testid="button-open-calculator"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Your Cruise Cost
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Premier Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              WHY CHOOSE PREMIER
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Austin's most trusted and experienced party cruise company delivers exceptional experiences every time.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center group"
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-brand-blue/50">
                  <reason.icon className="h-16 w-16 text-brand-blue mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {reason.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              HAPPY CUSTOMERS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Read what our satisfied customers say about their private cruise experiences.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-1 mr-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                      {testimonial.event}
                    </Badge>
                  </div>
                  
                  <Quote className="h-8 w-8 text-brand-blue mb-4 opacity-50" />
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-brand-blue">{testimonial.groupSize} guests</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Get answers to common questions about private cruise bookings and experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6 border-none"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:text-brand-blue transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-yellow text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-8"
            >
              READY TO CRUISE?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 leading-relaxed"
            >
              Book your exclusive private Lake Travis experience today. 
              Our team is ready to create the perfect celebration for your group.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button
                size="lg"
                onClick={() => handleBookNow()}
                className="bg-white text-brand-blue hover:bg-gray-100 font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-book-now-final"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK NOW
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleGetQuote}
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-get-quote-final"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET CUSTOM QUOTE
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator Modal */}
      <Dialog open={showPricingCalculator} onOpenChange={setShowPricingCalculator}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">Private Cruise Pricing Calculator</DialogTitle>
            <DialogDescription>
              Get an estimate for your private cruise. Final pricing may vary based on specific requirements.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Boat Selection */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Select Your Boat</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fleetOptions.filter(boat => boat?.id).map((boat) => (
                  <Button
                    key={boat.id}
                    variant={selectedBoat?.id === boat.id ? "default" : "outline"}
                    onClick={() => setSelectedBoat(boat)}
                    className="p-4 h-auto text-left flex flex-col items-start space-y-1"
                    data-testid={`calculator-boat-${boat.id}`}
                  >
                    <span className="font-semibold">{boat.name}</span>
                    <span className="text-sm opacity-75">Up to {boat.capacity} guests</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Calculator Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="groupSize" className="font-semibold">Group Size</Label>
                <Input
                  id="groupSize"
                  type="number"
                  min="1"
                  max={selectedBoat?.maxCapacity || 50}
                  value={calculatorInputs.groupSize}
                  onChange={(e) => setCalculatorInputs(prev => ({ ...prev, groupSize: parseInt(e.target.value) || 1 }))}
                  className="mt-2"
                  data-testid="input-group-size"
                />
              </div>
              
              <div>
                <Label htmlFor="hours" className="font-semibold">Duration (Hours)</Label>
                <Input
                  id="hours"
                  type="number"
                  min={selectedBoat?.duration?.weekday || 3}
                  max="8"
                  value={calculatorInputs.hours}
                  onChange={(e) => setCalculatorInputs(prev => ({ ...prev, hours: parseInt(e.target.value) || 3 }))}
                  className="mt-2"
                  data-testid="input-hours"
                />
              </div>
              
              <div>
                <Label className="font-semibold">Day Type</Label>
                <div className="mt-2 space-y-2">
                  <Button
                    variant={!calculatorInputs.isWeekend ? "default" : "outline"}
                    onClick={() => setCalculatorInputs(prev => ({ ...prev, isWeekend: false }))}
                    className="w-full"
                    data-testid="button-weekday"
                  >
                    Weekday
                  </Button>
                  <Button
                    variant={calculatorInputs.isWeekend ? "default" : "outline"}
                    onClick={() => setCalculatorInputs(prev => ({ ...prev, isWeekend: true }))}
                    className="w-full"
                    data-testid="button-weekend"
                  >
                    Weekend
                  </Button>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            {(() => {
              if (!selectedBoat) {
                return (
                  <Card className="p-6 bg-gray-50 dark:bg-gray-800">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      Please select a boat to see pricing
                    </div>
                  </Card>
                );
              }
              const pricing = calculatePrice(selectedBoat, calculatorInputs);
              return (
                <Card className="p-6 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-4">Estimated Pricing Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Rate ({calculatorInputs.hours} hours × {formatCurrency(calculatorInputs.isWeekend ? selectedBoat?.pricing?.weekendRate || 0 : selectedBoat?.pricing?.weekdayRate || 0)}/hr)</span>
                      <span className="font-semibold">{formatCurrency(pricing.basePrice)}</span>
                    </div>
                    {pricing.extraCrewFee > 0 && (
                      <div className="flex justify-between">
                        <span>Extra Crew Fee ({calculatorInputs.groupSize} people)</span>
                        <span className="font-semibold">{formatCurrency(pricing.extraCrewFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Subtotal</span>
                      <span>{formatCurrency(pricing.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8.25%)</span>
                      <span>{formatCurrency(pricing.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Suggested Gratuity (20%)</span>
                      <span>{formatCurrency(pricing.suggestedGratuity)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t-2 border-brand-blue pt-3">
                      <span>Estimated Total</span>
                      <span className="text-brand-blue">{formatCurrency(pricing.total)}</span>
                    </div>
                    <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                      = {formatCurrency(Math.round(pricing.total / calculatorInputs.groupSize))} per person
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => {
                        setShowPricingCalculator(false);
                        const message = `I'm interested in booking a ${selectedBoat?.name || 'boat'} for ${calculatorInputs.groupSize} people for ${calculatorInputs.hours} hours on a ${calculatorInputs.isWeekend ? 'weekend' : 'weekday'}. The calculator estimated ${formatCurrency(pricing.total)}. Can you help me with booking?`;
                        navigate(`/contact?message=${encodeURIComponent(message)}`);
                      }}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold px-8 py-3"
                      data-testid="button-book-from-calculator"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book This Cruise
                    </Button>
                  </div>
                </Card>
              );
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}