import { useState, useEffect, useRef } from 'react';
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
  UserCheck, MessageSquare, X, Eye, Image, Bot
} from 'lucide-react';
import Footer from '@/components/Footer';
import { formatCurrency } from '@shared/formatters';
import SEOHead, { generateFAQSchema, generateComprehensiveLocalBusinessSchema } from '@/components/SEOHead';
import { Endorsement } from '@shared/schema';
import { DiscoVsPrivateComparison, QuickDealHighlight } from '@/components/DiscoVsPrivateComparison';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { 
  calculatePackagePricing, 
  getCapacityTier, 
  getPricingDayType 
} from '@shared/pricing';
import { 
  PRIVATE_CRUISE_PRICING, 
  DISCO_PRICING, 
  compareDiscoVsPrivate, 
  getBestDealRecommendation,
  getSavingsOpportunities,
  BOATS,
  PACKAGE_FLAT_FEES,
  CREW_FEES,
  ADDON_FEES,
  HOURLY_RATES
} from '@shared/constants';

// Hero and gallery images - Real photos from live website
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/atx-disco-cruise-party.jpg';
import heroImage3 from '@assets/dancing-party-scene.jpg';
import galleryImage1 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage2 from '@assets/meeseeks-25-person-boat.jpg';
import galleryImage3 from '@assets/clever-girl-50-person-boat.jpg';

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

// Content data
const services = [
  {
    id: 'private',
    title: 'Private Charters',
    subtitle: 'Exclusive boat rental',
    description: `Choose from our fleet of premium party boats: "${BOATS.DAY_TRIPPER.displayName}" (${BOATS.DAY_TRIPPER.capacity} people), "${BOATS.ME_SEEKS_THE_IRONY.displayName}" (${BOATS.ME_SEEKS_THE_IRONY.seatingCapacity}-${BOATS.ME_SEEKS_THE_IRONY.capacity} people), or flagship "${BOATS.CLEVER_GIRL.displayName}" (${BOATS.CLEVER_GIRL.seatingCapacity}-${BOATS.CLEVER_GIRL.capacity} people) with giant Texas flag and 14 disco balls.`,
    features: [`"${BOATS.DAY_TRIPPER.displayName}", "${BOATS.ME_SEEKS_THE_IRONY.displayName}", "${BOATS.CLEVER_GIRL.displayName}" boats`, 'Licensed captains & crew', 'Premium bluetooth sound systems', 'Large coolers with ice', `Lily pads & floaties available (+$${ADDON_FEES.LILY_PAD / 100})`],
    startingPrice: `$${HOURLY_RATES.MON_THU[14] / 100}`,
    hourlyNote: 'per hour (4-hour minimum)',
    icon: Ship,
    image: galleryImage1,
    popular: true,
    gallery: [galleryImage1, galleryImage2, galleryImage3, heroImage1],
    detailedDescription: `Experience the ultimate private charter on Lake Travis with our premium fleet of party boats. Whether you choose the intimate "${BOATS.DAY_TRIPPER.displayName}" for ${BOATS.DAY_TRIPPER.capacity} guests, the popular "${BOATS.ME_SEEKS_THE_IRONY.displayName}" for ${BOATS.ME_SEEKS_THE_IRONY.seatingCapacity}-${BOATS.ME_SEEKS_THE_IRONY.capacity} people, or our flagship "${BOATS.CLEVER_GIRL.displayName}" for up to ${BOATS.CLEVER_GIRL.capacity} guests, every cruise includes professional captains, premium sound systems, and all the amenities for an unforgettable celebration.`,
    highlights: ['3 Premium Boats Available', `${BOATS.DAY_TRIPPER.capacity}-${BOATS.CLEVER_GIRL.capacity} Person Capacity Options`, 'Professional Licensed Captains', 'Premium Sound Systems', 'Coolers & Ice Included', `Lily Pads & Floaties (+$${ADDON_FEES.LILY_PAD / 100})`, '3-4 Hour Cruise Options']
  },
  {
    id: 'bachelor',
    title: 'Bachelorette Parties',
    subtitle: 'Our specialty since 2009',
    description: 'Austin\'s premier bachelorette party experience! Join the ATX Disco Cruise or book a private charter. Professional DJ, photographer, and everything needed for an unforgettable celebration.',
    features: ['Basic Bach, Disco Queen, or Platinum packages', 'Professional DJ & photographer', 'Party favors & decorations', 'Priority booking & VIP treatment'],
    startingPrice: `$${DISCO_PRICING.basic / 100}`,
    priceNote: 'per person',
    icon: PartyPopper,
    image: galleryImage3,
    badge: 'Our Specialty',
    gallery: [galleryImage3, heroImage1, galleryImage2, heroImage2],
    detailedDescription: 'We\'ve been Austin\'s #1 bachelorette party destination since 2009! Choose from our signature ATX Disco Cruise packages (Basic Bach, Disco Queen, or Platinum) or book a private charter. Every bachelorette experience includes professional DJ, photographer, party favors, and VIP treatment to make the bride\'s celebration absolutely perfect.',
    highlights: ['Austin\'s #1 Since 2009', 'Basic Bach, Disco Queen & Platinum', 'Professional DJ & Photographer', 'Party Favors & Decorations', 'VIP Treatment for Bride', 'ATX Disco or Private Options', 'Priority Booking Available']
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Team building on water',
    description: 'Premium corporate experiences on Lake Travis. Our largest boats perfect for team building, client entertainment, and company celebrations with professional service.',
    features: ['"Clever Girl" flagship boat available', 'Professional atmosphere & service', 'Customizable catering options', 'Team building activities', 'Transportation partnerships'],
    startingPrice: `$${HOURLY_RATES.MON_THU[50] / 100}`,
    hourlyNote: 'per hour (4-hour minimum)',
    icon: Users,
    image: galleryImage1,
    gallery: [galleryImage1, galleryImage3, heroImage1, galleryImage2],
    detailedDescription: 'Elevate your corporate events with premium Lake Travis experiences aboard our flagship boats. Perfect for team building, client entertainment, company celebrations, and executive retreats. Our professional crew ensures a sophisticated atmosphere while our spacious boats provide the perfect setting for business networking and team bonding.',
    highlights: ['Flagship "Clever Girl" Available', 'Professional Business Atmosphere', 'Team Building Activities', 'Customizable Catering Options', 'Transportation Partnerships', 'Client Entertainment Perfect', 'Executive Retreat Setting']
  }
];

const whyChooseUs = [
  {
    icon: Trophy,
    title: '15+ Years Experience',
    description: 'Austin\'s longest-running party cruise company since 2009 with unmatched expertise on Lake Travis.'
  },
  {
    icon: UserCheck,
    title: '100,000+ Happy Customers',
    description: 'We\'ve created unforgettable memories for over 100,000 guests with 5-star service since 2009.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Coast Guard certified captains and pristine safety record ensure your peace of mind.'
  },
  {
    icon: Star,
    title: 'Premier Fleet',
    description: 'Four awesome boats: "Day Tripper", "The Irony", "Meeseeks", and flagship "Clever Girl" - Austin\'s nicest party boats.'
  },
  {
    icon: Headphones,
    title: 'DJ & Photography',
    description: 'Professional DJ services and on-board photography to capture every moment.'
  },
  {
    icon: Wine,
    title: 'Party On Delivery',
    description: 'Direct-to-boat alcohol delivery through our sister company Party On Delivery! Order online, they deliver 50 feet from your boat.'
  }
];

// General FAQs about party boat services
const faqData = [
  {
    question: 'What types of party boat services do you offer in Austin?',
    answer: 'We offer two main types of party boat experiences on Lake Travis: Private Charters (exclusive boat rentals for your group with boats holding 14-75 people) and ATX Disco Cruises (shared party boat experiences with professional DJ and photographer starting at $85/person). Both include professional captains, premium sound systems, coolers with ice, and depart from Anderson Mill Marina.'
  },
  {
    question: 'How much does a party boat rental cost in Austin?',
    answer: 'Austin party boat pricing varies by experience type. Private charters start at $275/hour for our 14-person boat with 4-hour minimums. ATX Disco Cruise packages start at $85/person for Basic Bach, $95/person for Disco Queen/King, and $105/person for Platinum packages. Weekend rates are higher than weekday rates. Contact us for exact pricing for your specific date and group size.'
  },
  {
    question: 'Where do Austin party boats depart from?',
    answer: 'All Premier Party Cruises depart from Anderson Mill Marina located at 13993 FM2769, Leander, TX 78641 on Lake Travis. The marina is conveniently located just 30 minutes from downtown Austin, making it easily accessible for guests from Austin, Lakeway, Bee Cave, and Cedar Park. Free parking is available at the marina.'
  },
  {
    question: 'What\'s included in your party boat services?',
    answer: 'Every party boat cruise includes: professional Coast Guard certified captain and crew, premium Bluetooth sound system, large coolers with ice, all required safety equipment, fuel, and access to Lake Travis\'s most scenic coves and beaches. ATX Disco Cruises also include professional DJ, photographer, party favors, and reserved seating areas. Optional add-ons include lily pads, alcohol delivery, and transportation services.'
  },
  {
    question: 'Can we bring our own alcohol on the party boat?',
    answer: 'Yes! All our party boats are BYOB (Bring Your Own Booze). We provide large coolers with ice for your beverages. For added convenience, we partner with Party On Delivery - our sister company that delivers alcohol directly to your boat at the marina. You can order online and they deliver everything 50 feet from your boat, so you don\'t have to carry anything!'
  },
  {
    question: 'How far in advance should we book our Austin party boat?',
    answer: 'We recommend booking 4-6 weeks in advance, especially for weekend dates and during peak season (April-September). ATX Disco Cruises for bachelorette and bachelor parties sell out the fastest. Private charters for corporate events and large groups should be booked 6-8 weeks ahead. Last-minute bookings (1-2 weeks) may be available on weekdays.'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'ATX Disco Cruise Bachelorette',
    rating: 5,
    text: "The ATX Disco Cruise was absolutely perfect for my bachelorette party! The DJ was incredible, photographer captured amazing moments, and the Clever Girl boat with those 14 disco balls was unreal!",
    avatar: '👰'
  },
  {
    id: 2,
    name: 'Mike R.',
    role: 'Corporate Private Charter',
    rating: 5,
    text: "Booked the Clever Girl for our company event - 50 people, perfect service. The giant Texas flag deck and professional crew made it unforgettable. Party On Delivery made it seamless!",
    avatar: '💼'
  },
  {
    id: 3,
    name: 'Jessica & Chris',
    role: '25-Person Private Cruise',
    rating: 5,
    text: "The Irony was perfect for our celebration! Anderson Mill Marina was convenient, crew was professional, and 4 hours on Lake Travis was magical. Best decision ever!",
    avatar: '💕'
  }
];

const stats = [
  { value: '15+', label: 'Years Experience', icon: Trophy },
  { value: '100K+', label: 'Happy Customers', icon: Heart },
  { value: 'Perfect', label: 'Safety Record', icon: Shield },
  { value: '5-Star', label: 'Customer Reviews', icon: Star }
];

// Sample pricing calculations for different scenarios
const samplePricingScenarios = {
  weekday14: calculatePackagePricing(new Date(2024, 1, 5), 14, 'standard'), // Monday
  weekend14: calculatePackagePricing(new Date(2024, 1, 10), 14, 'standard'), // Saturday
  weekday25: calculatePackagePricing(new Date(2024, 1, 5), 25, 'standard'), // Monday
  weekend25: calculatePackagePricing(new Date(2024, 1, 10), 25, 'standard'), // Saturday
  weekday75: calculatePackagePricing(new Date(2024, 1, 5), 75, 'standard'), // Monday
  weekend75: calculatePackagePricing(new Date(2024, 1, 10), 75, 'standard'), // Saturday
};

// Quick pricing highlights
const pricingHighlights = [
  {
    type: 'Private Cruises',
    weekdayFrom: Math.floor(samplePricingScenarios.weekday14.perPersonCost / 100),
    weekendFrom: Math.floor(samplePricingScenarios.weekend14.perPersonCost / 100),
    description: 'Starting prices for 14-person private cruises'
  },
  {
    type: 'ATX Disco Cruises',
    weekdayFrom: Math.floor(DISCO_PRICING.basic / 100),
    weekendFrom: Math.floor(DISCO_PRICING.basic / 100),
    description: 'Friday & Saturday party cruise tickets'
  }
];

// Capacity-based pricing examples
const capacityPricingExamples = [
  {
    capacity: 14,
    weekdayPrice: samplePricingScenarios.weekday14.totalPrice,
    weekendPrice: samplePricingScenarios.weekend14.totalPrice,
    perPersonWeekday: samplePricingScenarios.weekday14.perPersonCost,
    perPersonWeekend: samplePricingScenarios.weekend14.perPersonCost,
  },
  {
    capacity: 25,
    weekdayPrice: samplePricingScenarios.weekday25.totalPrice,
    weekendPrice: samplePricingScenarios.weekend25.totalPrice,
    perPersonWeekday: samplePricingScenarios.weekday25.perPersonCost,
    perPersonWeekend: samplePricingScenarios.weekend25.perPersonCost,
  },
  {
    capacity: 75,
    weekdayPrice: samplePricingScenarios.weekday75.totalPrice,
    weekendPrice: samplePricingScenarios.weekend75.totalPrice,
    perPersonWeekday: samplePricingScenarios.weekday75.perPersonCost,
    perPersonWeekend: samplePricingScenarios.weekend75.perPersonCost,
  },
];

export default function Home() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [quickPricingGroupSize, setQuickPricingGroupSize] = useState(20);
  const [quickPricingDayOfWeek, setQuickPricingDayOfWeek] = useState(6); // Saturday
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(3000); // Very large height to prevent any internal scrolling
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    eventDate: '',
    message: ''
  });
  const { toast } = useToast();

  // Fetch homepage endorsements
  const { data: endorsements } = useQuery<Endorsement[]>({
    queryKey: ['/api/endorsements/homepage'],
  });

  const heroImages = [heroImage1, heroImage2, heroImage3];
  const galleryImages = [galleryImage1, galleryImage2, galleryImage3, heroImage1, heroImage2, heroImage3];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Listen for quote builder messages (height changes and completion)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== 'https://ppc-quote-builder.lovable.app') {
        return;
      }
      
      // Handle iframe height changes for dynamic resizing
      if (event.data && event.data.type === 'resize' && event.data.height) {
        const newHeight = Math.max(event.data.height + 100, 1200); // Add padding, minimum 1200px
        setIframeHeight(newHeight);
      }
      
      // Handle quote submission completion
      if (event.data && event.data.type === 'quote-submitted') {
        // Navigate to /chat page to show results
        navigate('/chat');
        
        toast({
          title: "Quote Submitted!",
          description: "Redirecting you to view your quote details...",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate, toast]);

  // Adjust iframe height based on viewport for optimal display
  useEffect(() => {
    const updateHeight = () => {
      // Set height to 2x viewport height to ensure no scrolling needed
      const viewportHeight = window.innerHeight;
      setIframeHeight(Math.max(viewportHeight * 2, 3000));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Update page title for SEO
  useEffect(() => {
    document.title = 'Premier Party Cruises - Austin Lake Travis Boat Rentals Since 2009';
    
    // Add meta description
    const existingDesc = document.querySelector('meta[name="description"]');
    if (existingDesc) {
      existingDesc.setAttribute('content', 'Austin\'s premier party cruise company since 2009 offering ATX Disco Cruises and private boat charters on Lake Travis. 100,000+ happy customers, 4 awesome boats. Book today!');
    } else {
      const metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = 'Austin\'s premier party cruise company since 2009 offering ATX Disco Cruises and private boat charters on Lake Travis. 100,000+ happy customers, 4 awesome boats. Book today!';
      document.head.appendChild(metaDesc);
    }
  }, []);

  const handleBookNow = (packageType?: string, eventType?: string) => {
    if (packageType && eventType) {
      navigate(`/chat?package=${packageType}&type=${eventType}`);
    } else {
      navigate('/chat?type=general');
    }
  };

  const handleGetQuote = (packageType?: string, eventType?: string) => {
    if (packageType && eventType) {
      navigate(`/chat?package=${packageType}&type=${eventType}`);
    } else {
      navigate('/chat?type=general');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and phone are required to get started.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Here you would normally send to your API
      console.log('Contact form submitted:', contactForm);
      
      toast({
        title: "Thank you for your inquiry!",
        description: "We'll get back to you within 24 hours with a custom quote.",
        variant: "default"
      });

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        groupSize: '',
        eventDate: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at (512) 488-5892",
        variant: "destructive"
      });
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle opening lightbox for service
  const handleOpenLightbox = (service: typeof services[0]) => {
    setSelectedService(service);
    setShowLightbox(true);
  };

  // Handle lightbox book now
  const handleLightboxBookNow = () => {
    if (!selectedService) return;
    
    setShowLightbox(false);
    
    // Handle specific service booking - Route to /chat for all bookings
    switch(selectedService.id) {
      case 'private':
        navigate('/chat?eventType=private&groupSize=25');
        break;
      case 'disco':
        navigate('/chat?eventType=disco&groupSize=20');
        break;
      case 'bachelor':
        navigate('/chat?eventType=disco&groupSize=15');
        break;
      case 'corporate':
        navigate('/chat?eventType=private&groupSize=30');
        break;
      default:
        navigate('/chat?type=general');
    }
    
    toast({
      title: "Redirecting to Chat",
      description: `Let's book your ${selectedService.title.toLowerCase()}!`,
    });
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "ATX DISCO CRUISE - Austin's Premier Party Boat Experience",
    "description": "Austin's #1 rated party boat experience on Lake Travis. The ATX DISCO CRUISE features professional DJ, photographer, disco dance floor, premium sound system, and unforgettable party atmosphere for bachelor parties, bachelorette parties, and celebrations.",
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
      "url": "https://premierpartycruises.com/chat",
      "price": "85.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "description": "ATX DISCO CRUISE party packages starting at $85/person with professional DJ and photographer"
    },
    "performer": {
      "@type": "Organization",
      "name": "Premier Party Cruises"
    },
    "image": "https://premierpartycruises.com/assets/atx-disco-cruise-party.jpg"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/"
        defaultTitle="Party Boat Austin | Lake Travis Cruises"
        defaultDescription="Austin's #1 party boat on Lake Travis! Perfect for bachelorette parties, bachelor parties & corporate events. Book your Austin boat party today! (512) 488-5892"
        defaultKeywords={['party boat Austin', 'bachelorette party Austin', 'Austin boat rental', 'Lake Travis party boat', 'bachelor party Austin']}
        schemaType="organization"
        customSchema={[
          generateComprehensiveLocalBusinessSchema({
            pageDescription: "Austin's premier party boat rental service on Lake Travis. Specializing in bachelor parties, bachelorette parties, corporate events, and private cruises. 14+ years experience, 125,000+ customers served."
          }),
          eventSchema,
          generateFAQSchema(faqData)
        ]}
      />
      <PublicNavigation />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with rotating images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentHeroImage]}
                alt="Party boat on Lake Travis Austin - Premier Party Cruises with guests celebrating bachelor and bachelorette parties"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-8">
              <img 
                src={logoPath} 
                alt="Party Boat Austin - Premier Party Cruises on Lake Travis" 
                className="h-20 md:h-24 mx-auto mb-6"
                loading="eager"
                fetchpriority="high"
                data-testid="img-hero-logo"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 leading-tight tracking-wider" data-editable data-editable-id="hero-title">
                Austin's Premier Party Boat Experience on Lake Travis
              </h1>
            </motion.div>

            {/* Subheadline with Pricing Value Proposition */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
              data-editable data-editable-id="hero-description"
            >
              Experience Austin's ultimate Lake Travis adventure with the most trusted party cruise company since 2009. 
              From intimate 14-person cruises on "Day Tripper" to epic 75-person celebrations on flagship "Clever Girl" - we create unforgettable memories.
            </motion.p>

            {/* Pricing Value Proposition */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto mb-12 border border-white/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-brand-yellow text-sm font-bold mb-2" data-editable data-editable-id="pricing-overlay-private-label">PRIVATE CRUISES FROM</div>
                  <div className="text-3xl font-bold text-white mb-1" data-editable data-editable-id="pricing-overlay-private-price">
                    $${HOURLY_RATES.MON_THU[14] / 100} per hour
                  </div>
                  <div className="text-sm text-gray-200" data-editable data-editable-id="pricing-overlay-private-subtitle">Weekdays • 14+ people</div>
                </div>
                <div>
                  <div className="text-brand-yellow text-sm font-bold mb-2" data-editable data-editable-id="pricing-overlay-disco-label">DISCO CRUISES</div>
                  <div className="text-3xl font-bold text-white mb-1" data-editable data-editable-id="pricing-overlay-disco-price">
                    ${pricingHighlights[1].weekdayFrom}/person
                  </div>
                  <div className="text-sm text-gray-200" data-editable data-editable-id="pricing-overlay-disco-subtitle">Friday & Saturday</div>
                </div>
              </div>
              <div className="text-center mt-4 text-sm text-brand-yellow font-medium" data-editable data-editable-id="pricing-overlay-tagline">
                ✨ Transparent pricing • No hidden fees • Best value guaranteed
              </div>
            </motion.div>

            {/* Key Features with Pricing */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <MapPin className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg" data-editable data-editable-id="hero-badge-marina">Anderson Mill Marina</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Users className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg" data-editable data-editable-id="hero-badge-boats">4 Awesome Boats</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <DollarSign className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg" data-editable data-editable-id="hero-badge-pricing">From $${HOURLY_RATES.MON_THU[14] / 100} per hour</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Clock className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg" data-editable data-editable-id="hero-badge-disco">ATX Disco Fri/Sat</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <Button
                size="lg"
                onClick={() => handleBookNow()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-hero-book-now"
              >
                <Calendar className="mr-3 h-6 w-6" />
                <span data-editable data-editable-id="hero-cta-book">BOOK YOUR CRUISE</span>
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleGetQuote()}
                className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-6 rounded-2xl backdrop-blur-sm tracking-wide bg-[#07c0ff]"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                <span data-editable data-editable-id="hero-cta-quote">GET FREE QUOTE</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex flex-col items-center cursor-pointer" onClick={() => scrollToSection('services')}>
            <span className="text-sm mb-3 font-medium tracking-wide" data-editable data-editable-id="scroll-indicator-text">DISCOVER MORE</span>
            <motion.div 
              className="w-6 h-12 border-2 border-white rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-1 h-4 bg-white rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Build My Quote Now Section */}
      <section className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-0 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 text-white tracking-wider"
              data-editable 
              data-editable-id="quote-builder-heading"
            >
              BUILD MY QUOTE NOW
            </h2>
            <p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              data-editable 
              data-editable-id="quote-builder-subheading"
            >
              Get instant pricing for your Lake Travis celebration in minutes
            </p>
            
            {!showQuoteBuilder ? (
              <Button
                size="lg"
                onClick={() => setShowQuoteBuilder(true)}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base md:text-lg lg:text-xl px-6 md:px-12 lg:px-16 py-3 md:py-6 lg:py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-build-quote"
              >
                <Sparkles className="mr-2 md:mr-3 h-5 md:h-7 w-5 md:w-7" />
                <span data-editable data-editable-id="quote-builder-button">Start Building Your Quote</span>
                <ArrowRight className="ml-2 md:ml-3 h-5 md:h-7 w-5 md:w-7" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowQuoteBuilder(false)}
                className="bg-brand-blue border-3 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-12 py-6 rounded-2xl mb-8"
                data-testid="button-hide-quote"
              >
                <X className="mr-2 h-5 w-5" />
                <span data-editable data-editable-id="quote-builder-hide-button">Hide Quote Builder</span>
              </Button>
            )}
          </motion.div>

          {/* Expandable Quote Builder Iframe */}
          <AnimatePresence>
            {showQuoteBuilder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-12 overflow-hidden"
              >
                <div className="w-full md:max-w-6xl mx-auto">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <iframe 
                      ref={iframeRef}
                      src="https://ppc-quote-builder.lovable.app/"
                      title="Build Your Quote - Premier Party Cruises"
                      className="w-full"
                      style={{ 
                        height: `${iframeHeight}px`,
                        border: 'none',
                        overflow: 'hidden'
                      }}
                      scrolling="no"
                      allow="payment; geolocation"
                      allowFullScreen
                      data-testid="iframe-quote-builder"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider" data-editable data-editable-id="services-main-title">
                CHOOSE YOUR
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-8 text-brand-blue tracking-wider" data-editable data-editable-id="services-subtitle">
                PERFECT EXPERIENCE
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="services-description">
                From intimate celebrations to epic disco parties, we have the perfect cruise experience 
                for every group size and occasion.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                transition={{ delay: index * 0.2 }}
                className={cn(
                  "group relative",
                  service.popular && "lg:scale-105"
                )}
              >
                <Card className={cn(
                  "h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden border-2",
                  service.popular 
                    ? "border-brand-blue shadow-xl" 
                    : "border-gray-200 dark:border-gray-700 hover:border-brand-blue/50"
                )}>
                  {service.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-brand-blue text-white px-6 py-2 text-sm font-bold rounded-full shadow-lg">
                        <span data-editable data-editable-id={`service-${service.id}-badge`}>{service.badge}</span>
                      </Badge>
                    </div>
                  )}

                  {/* Service Image with Lightbox Trigger */}
                  <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => handleOpenLightbox(service)}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/60" />
                    <service.icon className="absolute bottom-4 right-4 h-8 w-8 text-white" />
                    {/* View Gallery Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {/* Gallery Indicator */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Image className="h-4 w-4 inline mr-1" />
                      <span data-editable data-editable-id={`service-${service.id}-view-gallery`}>View Gallery</span>
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl md:text-3xl font-bold mb-2 tracking-wide" data-editable data-editable-id={`service-${service.id}-title`}>{service.title}</CardTitle>
                    <CardDescription className="text-lg md:text-xl font-semibold text-brand-blue" data-editable data-editable-id={`service-${service.id}-subtitle`}>
                      {service.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed" data-editable data-editable-id={`service-${service.id}-description`}>
                      {service.description}
                    </p>
                    
                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-base">
                          <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium" data-editable data-editable-id={`service-${service.id}-feature-${featureIndex}`}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4">
                      <div className="text-base text-gray-500 mb-2 font-semibold" data-editable data-editable-id={`service-${service.id}-price-label`}>Starting from</div>
                      <div className="text-2xl md:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4" data-editable data-editable-id={`service-${service.id}-price`}>
                        {service.startingPrice}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4" data-editable data-editable-id={`service-${service.id}-price-note`}>
                        {service.hourlyNote || service.priceNote || ''}
                      </div>
                      
                      <Button 
                        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 rounded-xl tracking-wide"
                        onClick={() => {
                          // Handle specific service booking with package context
                          switch(service.id) {
                            case 'private':
                              handleBookNow('private-cruise', 'general');
                              break;
                            case 'bachelor':
                              handleBookNow('disco-cruise', 'bachelorette');
                              break;
                            case 'disco':
                              handleBookNow('disco-cruise', 'general');
                              break;
                            case 'corporate':
                              handleBookNow('private-cruise', 'corporate');
                              break;
                            default:
                              handleGetQuote();
                          }
                        }}
                        data-testid={`button-service-${service.id}`}
                      >
                        <span data-editable data-editable-id={`service-${service.id}-cta-button`}>
                          {service.id === 'private' ? 'BOOK PRIVATE CRUISE' : service.id === 'disco' ? 'BOOK DISCO CRUISE' : 'GET QUOTE'}
                        </span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRITICAL: Lightbox Photo Gallery for Experience Cards */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <selectedService.icon className="w-8 h-8 text-brand-blue" />
                  <span data-editable data-editable-id={`lightbox-${selectedService.id}-title`}>{selectedService.title}</span>
                  {selectedService.badge && (
                    <Badge className="bg-brand-blue text-white px-3 py-1">
                      <span data-editable data-editable-id={`lightbox-${selectedService.id}-badge`}>{selectedService.badge}</span>
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600 dark:text-gray-300" data-editable data-editable-id={`lightbox-${selectedService.id}-subtitle`}>
                  {selectedService.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Photo Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedService.gallery?.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => {
                        setSelectedImageIndex(index);
                        // You could expand this to show full-size image viewer
                      }}
                      data-testid={`img-gallery-${selectedService.id}-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${selectedService.title} gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span data-editable data-editable-id={`lightbox-${selectedService.id}-gallery-view-full`}>View Full</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Detailed Description */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white" data-editable data-editable-id={`lightbox-${selectedService.id}-details-title`}>
                    Experience Details
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" data-editable data-editable-id={`lightbox-${selectedService.id}-detailed-description`}>
                    {selectedService.detailedDescription}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white" data-editable data-editable-id={`lightbox-${selectedService.id}-included-title`}>
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.highlights?.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium" data-editable data-editable-id={`lightbox-${selectedService.id}-highlight-${index}`}>
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking Section */}
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1" data-editable data-editable-id={`lightbox-${selectedService.id}-pricing-label`}>Starting from</div>
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        {selectedService.startingPrice}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1" data-editable data-editable-id={`lightbox-${selectedService.id}-pricing-note`}>
                        {selectedService.hourlyNote || selectedService.priceNote || (selectedService.id === 'disco' ? 'per person' : 'per charter')}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => setShowLightbox(false)}
                        className="px-6 py-3"
                        data-testid={`button-lightbox-close-${selectedService.id}`}
                      >
                        <span data-editable data-editable-id={`lightbox-${selectedService.id}-continue-button`}>Continue Browsing</span>
                      </Button>
                      
                      <Button 
                        onClick={handleLightboxBookNow}
                        className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 text-lg font-bold"
                        data-testid={`button-lightbox-book-${selectedService.id}`}
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        <span data-editable data-editable-id={`lightbox-${selectedService.id}-book-button`}>Book Now</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400" data-editable data-editable-id="lightbox-security-features">
                  🔒 Secure booking • Instant confirmation • Full refund protection
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider" data-editable data-editable-id="why-choose-main-title">
                WHY CHOOSE
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-heading font-bold mb-8 text-brand-yellow tracking-wider" data-editable data-editable-id="why-choose-subtitle">
                PREMIER PARTY CRUISES
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="why-choose-description">
                Austin's most trusted party cruise company with unmatched experience, safety, and service.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-brand-blue to-brand-blue/80 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white tracking-wide" data-editable data-editable-id={`why-choose-item-${index}-title`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed" data-editable data-editable-id={`why-choose-item-${index}-description`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={scaleIn}
                  className="text-center group"
                  data-testid={`stat-${index}`}
                >
                  <div className="bg-brand-yellow/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-yellow/20 transition-colors duration-300">
                    <stat.icon className="h-8 w-8 text-brand-blue" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900 dark:text-white" data-editable data-editable-id={`stat-${index}-value`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium tracking-wide" data-editable data-editable-id={`stat-${index}-label`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ATX Disco Cruise Callout Section */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-pink-950/20" data-testid="section-atx-disco-cruise">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            {/* Header with Badge */}
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 text-base font-bold" data-testid="badge-atx-featured">
                <Star className="h-4 w-4 mr-2 inline" />
                Claude AI 10/10 Validation
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wide" data-testid="text-atx-title">
                Experience America's #1 Bachelor & Bachelorette Party Cruise
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The only all-inclusive, multi-group party cruise on Lake Travis
              </p>
            </div>

            <Card className="border-2 border-yellow-500/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                {/* Key Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl"
                    data-testid="benefit-duration"
                  >
                    <Clock className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">4-Hour Experience</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Full party cruise</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl"
                    data-testid="benefit-inclusions"
                  >
                    <Music className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">DJ + Photographer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">All included</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl"
                    data-testid="benefit-pricing"
                  >
                    <DollarSign className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">$85-105/Person</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Best value</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl"
                    data-testid="benefit-multi-group"
                  >
                    <Users className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Multi-Group Energy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Electric atmosphere</p>
                  </motion.div>
                </div>

                {/* Claude AI Highlight Quotes */}
                <div className="space-y-4 mb-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-4 items-start bg-gradient-to-r from-yellow-100/50 to-orange-100/50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-xl p-4 border-l-4 border-yellow-500"
                    data-testid="quote-unique"
                  >
                    <Quote className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 dark:text-gray-200 font-semibold italic leading-relaxed">
                      "The country's only all-inclusive, multi-group bachelor/bachelorette party cruise"
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-4 items-start bg-gradient-to-r from-yellow-100/50 to-orange-100/50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-xl p-4 border-l-4 border-orange-500"
                    data-testid="quote-value"
                  >
                    <Quote className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 dark:text-gray-200 font-semibold italic leading-relaxed">
                      "3-5x better value than private rentals with professional entertainment included"
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 items-start bg-gradient-to-r from-yellow-100/50 to-orange-100/50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-xl p-4 border-l-4 border-pink-500"
                    data-testid="quote-satisfaction"
                  >
                    <Quote className="h-6 w-6 text-pink-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 dark:text-gray-200 font-semibold italic leading-relaxed">
                      "100% satisfaction track record with thousands of groups served since 2009"
                    </p>
                  </motion.div>
                </div>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/atx-disco-cruise">
                    <Button 
                      variant="default"
                      size="lg"
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold px-10 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      data-testid="button-explore-disco"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Explore ATX Disco Cruise
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <Link href="/chat">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-2 border-yellow-500 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500 hover:text-white font-bold px-10 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      data-testid="button-book-cruise"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Your Cruise
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider" data-editable data-editable-id="gallery-main-title">
                EXPERIENCE THE
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-heading font-bold mb-8 text-brand-blue tracking-wider" data-editable data-editable-id="gallery-subtitle">
                PREMIER DIFFERENCE
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="gallery-description">
                See why 125,000+ customers choose Premier Party Cruises for their unforgettable Lake Travis experience.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => {
              const altTexts = [
                "Party Boat Austin Day Tripper 14-person vessel on Lake Travis",
                "Party Boat Lake Travis Meeseeks 25-person charter boat",
                "Party Boat Austin Clever Girl 50-person flagship on Lake Travis",
                "Bachelor Party Austin celebration on Party Boat Lake Travis",
                "Bachelorette Party Austin celebration on Party Boat Lake Travis",
                "Party Boat Austin guests dancing and celebrating on Lake Travis"
              ];
              
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={scaleIn}
                  transition={{ delay: index * 0.1 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-square"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image}
                    alt={altTexts[index]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={600}
                    height={600}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 tracking-wider" data-editable data-editable-id="testimonials-main-title">
                WHAT OUR
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-heading font-bold mb-8 text-brand-yellow tracking-wider" data-editable data-editable-id="testimonials-subtitle">
                CUSTOMERS SAY
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="testimonials-description">
                Don't just take our word for it - see what makes us Austin's most trusted party cruise company.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="text-3xl md:text-4xl mb-4">{testimonial.avatar}</div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-brand-yellow fill-current" />
                      ))}
                    </div>
                    <CardTitle className="text-lg font-bold">
                      <span data-editable data-editable-id={`testimonial-${testimonial.id}-name`}>{testimonial.name}</span>
                    </CardTitle>
                    <CardDescription className="text-blue-200 font-medium">
                      <span data-editable data-editable-id={`testimonial-${testimonial.id}-role`}>{testimonial.role}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Quote className="h-6 w-6 text-brand-yellow mb-4 mx-auto" />
                    <p className="text-white/90 leading-relaxed italic text-center" data-editable data-editable-id={`testimonial-${testimonial.id}-text`}>
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PartyPlanningChecklist partyType="Lake Travis Party" eventType="celebration" />

      {/* Contact & CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider" data-editable data-editable-id="contact-main-title">
                READY TO
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-heading font-bold mb-8 text-brand-yellow tracking-wider" data-editable data-editable-id="contact-subtitle">
                SET SAIL?
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12" data-editable data-editable-id="contact-description">
                Contact us today for a free quote and let's start planning your unforgettable Lake Travis adventure.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center mb-4 tracking-wide">
                    <span data-editable data-editable-id="contact-form-title">Get Your Free Quote</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); navigate('/chat?type=general'); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-semibold tracking-wide">
                          <span data-editable data-editable-id="contact-form-label-name">Full Name *</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold tracking-wide">
                          <span data-editable data-editable-id="contact-form-label-email">Email *</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold tracking-wide">
                          <span data-editable data-editable-id="contact-form-label-phone">Phone *</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-phone"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType" className="text-sm font-semibold tracking-wide">
                          <span data-editable data-editable-id="contact-form-label-event-type">Event Type</span>
                        </Label>
                        <Input
                          id="eventType"
                          type="text"
                          placeholder="Birthday, Bachelor/ette, Corporate..."
                          value={contactForm.eventType}
                          onChange={(e) => setContactForm(prev => ({ ...prev, eventType: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-event-type"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="groupSize" className="text-sm font-semibold tracking-wide">
                          <span data-editable data-editable-id="contact-form-label-group-size">Group Size</span>
                        </Label>
                        <Input
                          id="groupSize"
                          type="text"
                          placeholder="e.g., 20 people"
                          value={contactForm.groupSize}
                          onChange={(e) => setContactForm(prev => ({ ...prev, groupSize: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-group-size"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventDate" className="text-sm font-semibold tracking-wide">
                          <span data-editable data-editable-id="contact-form-label-event-date">Event Date</span>
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={contactForm.eventDate}
                          onChange={(e) => setContactForm(prev => ({ ...prev, eventDate: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-event-date"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-semibold tracking-wide">
                        <span data-editable data-editable-id="contact-form-label-message">Additional Details</span>
                      </Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your event, special requests, or any questions..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="mt-1 rounded-xl resize-none"
                        data-testid="textarea-contact-message"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 text-lg rounded-xl tracking-wide"
                      data-testid="button-contact-submit"
                    >
                      <Mail className="mr-3 h-5 w-5" />
                      <span data-editable data-editable-id="contact-form-submit-button">GET FREE QUOTE</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Quick Actions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="space-y-8"
            >
              {/* Quick Book Button */}
              <Card className="border-2 border-brand-yellow bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 tracking-wide" data-editable data-editable-id="quick-book-title">Book Online Now</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" data-editable data-editable-id="quick-book-description">
                    See our real-time availability and book your perfect cruise date instantly.
                  </p>
                  <Button 
                    onClick={() => navigate('/chat?type=general')}
                    size="lg"
                    className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold py-4 text-lg rounded-xl tracking-wide"
                    data-testid="button-quick-book"
                  >
                    <span data-editable data-editable-id="quick-book-button">VIEW AVAILABILITY</span>
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <Phone className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg tracking-wide" data-editable data-editable-id="contact-phone-title">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-phone-number">(512) 488-5892</p>
                      <p className="text-sm text-gray-500" data-editable data-editable-id="contact-phone-note">Available 7 days a week</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg tracking-wide" data-editable data-editable-id="contact-email-title">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-email-address">clientservices@premierpartycruises.com</p>
                      <p className="text-sm text-gray-500" data-editable data-editable-id="contact-email-note">Response within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <MapPin className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg tracking-wide" data-editable data-editable-id="contact-location-title">Lake Travis</h4>
                      <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-location-city">Austin, Texas</p>
                      <p className="text-sm text-gray-500" data-editable data-editable-id="contact-location-note">Austin, Texas</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="sr-only">Gallery Image</DialogTitle>
            <DialogDescription className="sr-only">
              View full size gallery image
            </DialogDescription>
          </DialogHeader>
          {selectedImageIndex !== null && (
            <div className="relative">
              <img 
                src={galleryImages[selectedImageIndex]}
                alt={[
                  "Party Boat Austin Day Tripper 14-person vessel on Lake Travis",
                  "Party Boat Lake Travis Meeseeks 25-person charter boat",
                  "Party Boat Austin Clever Girl 50-person flagship on Lake Travis",
                  "Bachelor Party Austin celebration on Party Boat Lake Travis",
                  "Bachelorette Party Austin celebration on Party Boat Lake Travis",
                  "Party Boat Austin guests dancing and celebrating on Lake Travis"
                ][selectedImageIndex]}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                width={1200}
                height={800}
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-700">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-white">
              EXPLORE ALL OUR AUSTIN PARTY BOAT SERVICES
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Discover the perfect Lake Travis party cruise for your celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link href="/bachelor-party-austin" data-testid="link-bachelor-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Epic bachelor party boat cruises on Lake Travis with DJ and photographer</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Austin's #1 bachelorette party cruise - Our specialty since 2009</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/combined-bachelor-bachelorette-austin" data-testid="link-combined-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Combined Parties</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Bachelor and bachelorette together on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/party-boat-lake-travis" data-testid="link-party-boat-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Party Boat Lake Travis</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premium Austin party boats for unforgettable celebrations</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Cruises</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private boat charters on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/client-entertainment" data-testid="link-client-entertainment-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Corporate Events</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Professional client entertainment on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">See real photos from our Austin party boat cruises</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/blogs" data-testid="link-blogs-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Cruise Blog & Tips</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Expert guides for planning your Lake Travis experience</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get your custom party boat quote today</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/LocalBusiness">
        <h2 itemProp="name">Premier Party Cruises - Austin Party Boat Lake Travis Rentals</h2>
        
        {/* Business Information */}
        <div itemProp="description">
          <p>Premier Party Cruises is Austin's premier party boat rental company on Lake Travis, serving over 100,000 happy customers since 2009. We specialize in bachelorette parties, bachelor parties, corporate events, and private boat charters with professional captains and crew.</p>
        </div>
        
        {/* Location & Contact */}
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">13993 FM2769, Anderson Mill Marina</span>
          <span itemProp="addressLocality">Austin</span>
          <span itemProp="addressRegion">TX</span>
          <span itemProp="postalCode">78641</span>
        </div>
        <span itemProp="telephone">(512) 488-5892</span>
        <span itemProp="email">clientservices@premierpartycruises.com</span>
        
        {/* Service Areas */}
        <h2>Service Areas</h2>
        <p>Lake Travis Austin TX, Lakeway, Bee Cave, Cedar Park, Leander, Anderson Mill Marina</p>
        
        {/* Key Services */}
        <h2>Our Party Boat Services</h2>
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Private Charters - Exclusive Austin Boat Rentals</h3>
          <p itemProp="description">
            Private party boat charters on Lake Travis with exclusive boat rental for your group. Choose from our fleet of premium boats: Day Tripper 14-person boat, Me Seeks the Irony 25-person boat, or flagship Clever Girl 50-person boat with giant Texas flag and 14 disco balls.
          </p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <span itemProp="price">262</span>
            <span itemProp="priceSpecification">per hour (4-hour minimum)</span>
          </div>
          <h4>Private Charter Features & Benefits:</h4>
          <ul>
            <li>Professional licensed Coast Guard certified captains and crew</li>
            <li>Premium Bluetooth sound systems for your playlist</li>
            <li>Large coolers with ice included</li>
            <li>Lily pads and floaties available (additional $60)</li>
            <li>BYOB - Bring Your Own Booze allowed</li>
            <li>Party On Delivery - alcohol delivery directly to boat</li>
            <li>Clean restroom facilities onboard</li>
            <li>Fuel and safety equipment included</li>
            <li>Devil's Cove and scenic Lake Travis locations</li>
          </ul>
        </div>
        
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Bachelorette Party Austin - ATX Disco Cruise</h3>
          <p itemProp="description">
            Austin's #1 bachelorette party experience since 2009! Join our famous ATX Disco Cruise or book a private charter. Professional DJ, photographer, party favors, decorations, and VIP treatment for the bride. Perfect for bachelorette parties and bachelor parties on Lake Travis.
          </p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <span itemProp="lowPrice">85</span>
            <span itemProp="highPrice">105</span>
            <span itemProp="priceSpecification">per person</span>
          </div>
          <h4>Bachelorette Party Features:</h4>
          <ul>
            <li>Basic Bach package - $85 per person</li>
            <li>Disco Queen package - $95 per person (most popular)</li>
            <li>Platinum package - $105 per person (ultimate experience)</li>
            <li>Professional DJ and dance floor</li>
            <li>On-board professional photographer</li>
            <li>Party favors and decorations included</li>
            <li>VIP treatment for bride-to-be</li>
            <li>Friday and Saturday evening cruises</li>
            <li>4-hour party cruise on Lake Travis</li>
            <li>Meet other bachelorette groups</li>
          </ul>
        </div>
        
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Bachelor Party Austin - Lake Travis Party Boat</h3>
          <p itemProp="description">
            Epic bachelor party boat cruises on Lake Travis with ATX Disco Cruise or private charter options. Professional DJ, photographer, and Austin's best party atmosphere for the groom's celebration.
          </p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <span itemProp="lowPrice">85</span>
            <span itemProp="highPrice">105</span>
            <span itemProp="priceSpecification">per person for disco cruise</span>
          </div>
          <h4>Bachelor Party Features:</h4>
          <ul>
            <li>ATX Disco Cruise packages available</li>
            <li>Private charter options for larger groups</li>
            <li>Professional DJ and party music</li>
            <li>BYOB - bring your own alcohol</li>
            <li>Party On Delivery service available</li>
            <li>Lake Travis scenic locations</li>
            <li>Photography services included</li>
            <li>Professional crew and captains</li>
          </ul>
        </div>
        
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Corporate Events - Austin Team Building on Lake Travis</h3>
          <p itemProp="description">
            Premium corporate event experiences on Lake Travis. Perfect for team building, client entertainment, company celebrations, and executive retreats aboard our flagship boats with professional service.
          </p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <span itemProp="price">300</span>
            <span itemProp="priceSpecification">per hour (4-hour minimum for groups 31-50)</span>
          </div>
          <h4>Corporate Event Features:</h4>
          <ul>
            <li>Flagship Clever Girl 50-person boat available</li>
            <li>Professional business atmosphere and service</li>
            <li>Customizable catering options</li>
            <li>Team building activities on water</li>
            <li>Transportation partnerships available</li>
            <li>Client entertainment packages</li>
            <li>Executive retreat setting</li>
            <li>Conference and presentation capabilities</li>
          </ul>
        </div>
        
        {/* Fleet Details */}
        <h2>Premier Austin Party Boat Fleet</h2>
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Day Tripper - 14 Person Party Boat</h3>
          <p itemProp="description">
            Intimate 14-person party boat perfect for small celebrations and private groups on Lake Travis. Features professional captain, premium sound system, coolers with ice, and comfortable seating.
          </p>
          <span itemProp="capacity">14 passengers</span>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Me Seeks the Irony - 25 Person Party Boat</h3>
          <p itemProp="description">
            Popular 25-person party boat (seating for 18-25 guests) ideal for medium-sized celebrations on Lake Travis. Premium amenities, professional crew, and excellent sound system for the perfect Austin party boat experience.
          </p>
          <span itemProp="capacity">25 passengers (18-25 seating)</span>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Clever Girl - 50 Person Flagship Party Boat</h3>
          <p itemProp="description">
            Flagship 50-person party boat (seating for 35-50 guests) featuring giant Texas flag and 14 disco balls. Austin's premiere party boat for large celebrations, corporate events, and unforgettable Lake Travis experiences.
          </p>
          <span itemProp="capacity">50 passengers (35-50 seating)</span>
          <span itemProp="feature">Giant Texas flag, 14 disco balls, premium sound system</span>
        </div>
        
        {/* Pricing Information */}
        <h2>Austin Party Boat Rental Pricing</h2>
        <div itemScope itemType="https://schema.org/Offer">
          <h3>Private Charter Hourly Rates</h3>
          <p>14-person boat: Starting at $262/hour (Monday-Thursday), $314/hour (Friday-Sunday)</p>
          <p>25-person boat: Starting at $275/hour (Monday-Thursday), $327/hour (Friday-Sunday)</p>
          <p>50-person boat: Starting at $300/hour (Monday-Thursday), $350/hour (Friday-Sunday)</p>
          <p>All private charters have a 4-hour minimum. Includes captain, crew, fuel, coolers with ice, sound system, and safety equipment.</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3>ATX Disco Cruise Packages</h3>
          <p>Basic Bach Package: $85 per person - 4-hour party cruise with DJ and dance floor</p>
          <p>Disco Queen Package: $95 per person - Most popular! VIP experience with premium amenities</p>
          <p>Platinum Package: $105 per person - Ultimate disco experience with all extras</p>
          <p>Friday and Saturday evening cruises. Includes professional DJ, photographer, party favors, and Lake Travis experience.</p>
        </div>
        
        {/* Keywords and Search Terms */}
        <h2>Lake Travis Party Boat Services</h2>
        <p>
          Austin party boat, Lake Travis boat rental, party boat Austin, Austin bachelorette party, 
          bachelor party Austin, Lake Travis party cruise, Austin boat rental, party boat Lake Travis, 
          bachelorette party boat Austin, Austin disco cruise, Lake Travis cruises, corporate events Austin, 
          team building Lake Travis, Austin boat charter, party boat rental Austin, Lake Travis party boat, 
          Austin TX party boat, Anderson Mill Marina, Devil's Cove Austin, Lake Travis bachelorette, 
          Austin bachelor party boat, private boat charter Austin, ATX Disco Cruise, Premier Party Cruises
        </p>
        
        {/* Why Choose Us */}
        <h2>Why Choose Premier Party Cruises</h2>
        <ul>
          <li>15+ Years Experience - Austin's longest-running party cruise company since 2009</li>
          <li>100,000+ Happy Customers - Over 100,000 guests served with 5-star service</li>
          <li>Perfect Safety Record - Coast Guard certified captains and pristine safety record</li>
          <li>Premier Fleet - Four awesome boats with Austin's nicest party boat amenities</li>
          <li>Professional DJ & Photography - On-board entertainment and memory capture</li>
          <li>Party On Delivery - Direct-to-boat alcohol delivery service</li>
          <li>Anderson Mill Marina Location - Convenient Lake Travis access 30 minutes from downtown Austin</li>
        </ul>
      </div>

      {/* JSON-LD Structured Data for LocalBusiness and Services */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://premierpartycruises.com",
          "name": "Premier Party Cruises",
          "image": "https://premierpartycruises.com/assets/PPC_Logo_LARGE.png",
          "description": "Austin's premier party boat rental company on Lake Travis since 2009. Specializing in bachelorette parties, bachelor parties, corporate events, and private charters with 100,000+ happy customers.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "13993 FM2769, Anderson Mill Marina",
            "addressLocality": "Austin",
            "addressRegion": "TX",
            "postalCode": "78641",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.4515",
            "longitude": "-97.9267"
          },
          "url": "https://premierpartycruises.com",
          "telephone": "(512) 488-5892",
          "email": "clientservices@premierpartycruises.com",
          "priceRange": "$85-$400",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "22:00"
            }
          ],
          "areaServed": [
            {
              "@type": "City",
              "name": "Austin"
            },
            {
              "@type": "City", 
              "name": "Lakeway"
            },
            {
              "@type": "City",
              "name": "Bee Cave"
            },
            {
              "@type": "City",
              "name": "Cedar Park"
            },
            {
              "@type": "City",
              "name": "Leander"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "100000"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Party Boat Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Private Charter Boat Rental",
                  "description": "Exclusive private boat charters on Lake Travis with professional captain, crew, and premium amenities. Fleet includes 14-person, 25-person, and 50-person boats.",
                  "provider": {
                    "@type": "LocalBusiness",
                    "name": "Premier Party Cruises"
                  },
                  "areaServed": "Austin, TX"
                },
                "price": "262.00",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "262.00",
                  "priceCurrency": "USD",
                  "unitText": "per hour"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "ATX Disco Cruise - Bachelorette Party",
                  "description": "Austin's #1 bachelorette party experience with professional DJ, photographer, party favors, and Lake Travis cruise. Three package levels available.",
                  "provider": {
                    "@type": "LocalBusiness",
                    "name": "Premier Party Cruises"
                  },
                  "areaServed": "Austin, TX"
                },
                "price": "85.00",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "85.00",
                  "priceCurrency": "USD",
                  "unitText": "per person",
                  "referenceQuantity": {
                    "@type": "QuantitativeValue",
                    "value": "1"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "ATX Disco Cruise - Bachelor Party",
                  "description": "Epic bachelor party boat cruise on Lake Travis with DJ, photographer, and party atmosphere. Public disco cruise or private charter options.",
                  "provider": {
                    "@type": "LocalBusiness",
                    "name": "Premier Party Cruises"
                  },
                  "areaServed": "Austin, TX"
                },
                "price": "85.00",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "85.00",
                  "priceCurrency": "USD",
                  "unitText": "per person"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Corporate Events & Team Building",
                  "description": "Premium corporate event experiences on Lake Travis with flagship boats, professional service, and customizable catering for team building and client entertainment.",
                  "provider": {
                    "@type": "LocalBusiness",
                    "name": "Premier Party Cruises"
                  },
                  "areaServed": "Austin, TX"
                },
                "price": "300.00",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "300.00",
                  "priceCurrency": "USD",
                  "unitText": "per hour"
                }
              }
            ]
          }
        })
      }} />

      {/* Footer */}
      <Footer />
    </div>
  );
}