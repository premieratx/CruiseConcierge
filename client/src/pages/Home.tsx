import { useState, useEffect, useRef, lazy, Suspense, FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { LazyMotionProvider, m } from '@/components/LazyMotion';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LazyImage } from '@/components/LazyImage';
// MOBILE PAGESPEED: Optimized logo sizes (80x80=5KB, 140x140=7KB, 280x280=26KB)
const logoPath = '/attached_assets/PPC-Logo-280x280.webp';
const logoPathSmall = '/attached_assets/PPC-Logo-80x80.webp';
const logoPathMedium = '/attached_assets/PPC-Logo-140x140.webp';
const logoPathLarge = '/attached_assets/PPC-Logo-LARGE.webp';
// Import all icons from lucide-react using standard bundled imports for production compatibility
import {
  Anchor,
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Calendar,
  Camera,
  Camera as CameraIcon,
  Car,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Crown,
  DollarSign,
  ExternalLink,
  Eye,
  Facebook,
  Gift,
  Headphones,
  Heart,
  Image,
  Instagram,
  Leaf,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Music,
  Navigation,
  PartyPopper,
  Phone,
  Play,
  Quote,
  Shield,
  Ship,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  Twitter,
  UserCheck,
  Users,
  Waves,
  Wine,
  X,
  Zap
} from 'lucide-react';
import Footer from '@/components/Footer';
import { formatCurrency } from '@shared/formatters';
// PricingTable and TabbedPrivateCruisePricing are now lazy-loaded above
import SEOHead from '@/components/SEOHead';
import { Endorsement } from '@shared/schema';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
// ComparisonTable is now lazy-loaded above
import { type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
import { FeaturedSnippet } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { SectionReveal } from '@/components/SectionReveal';

// PAGESPEED FIX: Lazy load ALL heavy below-fold components to reduce TBT and improve FCP
const PartyPlanningChecklist = lazy(() => import('@/components/PartyPlanningChecklist'));
const FleetSection = lazy(() => import('@/components/FleetSection'));
const QuoteBuilderSection = lazy(() => import('@/components/QuoteBuilderSection'));
const TabbedPrivateCruisePricingLazy = lazy(() => import('@/components/TabbedPrivateCruisePricing').then(m => ({ default: m.TabbedPrivateCruisePricing })));
const ComparisonTableLazy = lazy(() => import('@/components/ComparisonTable').then(m => ({ default: m.ComparisonTable })));
const PricingTableLazy = lazy(() => import('@/components/PricingTable').then(m => ({ default: m.PricingTable })));
import { 
  calculatePackagePricing, 
  getCapacityTier, 
  getPricingDayType 
} from '@shared/pricing';
import { 
  PRIVATE_CRUISE_PRICING, 
  BOATS,
  PACKAGE_FLAT_FEES,
  CREW_FEES,
  ADDON_FEES
} from '@shared/constants';

// Hero and gallery images - Optimized WebP format for fast loading
// PAGESPEED FIX: Hero poster compressed to 64KB (40% smaller!) with mobile variant (41KB)
const heroImage1 = '/attached_assets/bachelor-party-group-guys-hero-compressed.webp';
const heroImage1Mobile = '/attached_assets/bachelor-party-group-guys-mobile.webp';
const heroImage2 = '/attached_assets/atx-disco-cruise-party.webp';
const heroImage3 = '/attached_assets/dancing-party-scene.webp';
const galleryImage1 = '/attached_assets/day-tripper-14-person-boat.webp';
const galleryImage2 = '/attached_assets/meeseeks-25-person-boat.webp';
const galleryImage3 = '/attached_assets/clever-girl-50-person-boat.webp';

// Animation variants - Optimized to prevent layout thrashing
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

// Performance-optimized: No animations (used when reducedMotion is true)
const noAnimation = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 }
};

// Helper function to get optimized animation props
const getAnimationProps = (reducedMotion: boolean, variants: any) => {
  if (reducedMotion) {
    return {
      initial: undefined,
      animate: undefined,
      variants: undefined,
      whileInView: undefined,
      viewport: undefined
    };
  }
  return { variants };
};

// Content data
const services = [
  {
    id: 'private',
    title: 'Private Charters',
    subtitle: 'Exclusive boat rental',
    description: `Choose from our fleet of premium party boats: "${BOATS.DAY_TRIPPER.displayName}" (${BOATS.DAY_TRIPPER.capacity} people), "${BOATS.ME_SEEKS_THE_IRONY.displayName}" (${BOATS.ME_SEEKS_THE_IRONY.seatingCapacity}-${BOATS.ME_SEEKS_THE_IRONY.capacity} people), or flagship "${BOATS.CLEVER_GIRL.displayName}" (${BOATS.CLEVER_GIRL.seatingCapacity}-${BOATS.CLEVER_GIRL.capacity} people) with giant Texas flag and 14 disco balls.`,
    features: [`"${BOATS.DAY_TRIPPER.displayName}", "${BOATS.ME_SEEKS_THE_IRONY.displayName}", "${BOATS.CLEVER_GIRL.displayName}" boats`, 'Licensed, fun, experienced captains to take your group safely around the lake in style', 'Premium bluetooth sound systems', 'Cooler space - bring your own ice, or add Essentials/Ultimate for ice included', `Lily pads & floaties available (+$${ADDON_FEES.LILY_PAD / 100})`],
    startingPrice: '$1,050',
    priceNote: 'for 4-hour cruise',
    icon: Ship,
    image: galleryImage1,
    popular: true,
    gallery: [galleryImage1, galleryImage2, galleryImage3, heroImage1],
    detailedDescription: `Experience the ultimate private charter on Lake Travis with our premium fleet of party boats. Whether you choose the intimate "${BOATS.DAY_TRIPPER.displayName}" for ${BOATS.DAY_TRIPPER.capacity} guests, the popular "${BOATS.ME_SEEKS_THE_IRONY.displayName}" for ${BOATS.ME_SEEKS_THE_IRONY.seatingCapacity}-${BOATS.ME_SEEKS_THE_IRONY.capacity} people, or our flagship "${BOATS.CLEVER_GIRL.displayName}" for up to ${BOATS.CLEVER_GIRL.capacity} guests, every cruise includes licensed, fun, experienced captains to take your group safely around the lake in style, premium sound systems, and all the amenities for an unforgettable celebration.`,
    highlights: ['3 Premium Boats Available', `${BOATS.DAY_TRIPPER.capacity}-${BOATS.CLEVER_GIRL.capacity} Person Capacity Options`, 'Licensed, fun, experienced captains to take your group safely around the lake in style', 'Premium Sound Systems', 'Cooler Space Provided (ice included with Essentials/Ultimate)', `Lily Pads & Floaties (+$${ADDON_FEES.LILY_PAD / 100})`, '3-4 Hour Cruise Options']
  },
  {
    id: 'wedding',
    title: 'Wedding Parties',
    subtitle: 'Celebrate your special day',
    description: (
      <>
        Make your wedding celebration unforgettable with a <InternalLinkHighlight href="/wedding-parties" title="Wedding Party Cruise">private Lake Travis cruise</InternalLinkHighlight>. Perfect for rehearsal dinners, welcome parties, and after parties with exclusive boat charters.
      </>
    ),
    features: ['Rehearsal dinner cruises', 'Welcome party events', 'After party celebrations', 'Exclusive private charters', 'Customizable packages'],
    startingPrice: '$1,181',
    priceNote: 'for 4-hour cruise',
    icon: Heart,
    image: galleryImage3,
    badge: 'Wedding Specialists',
    gallery: [galleryImage3, heroImage1, galleryImage2, heroImage3],
    detailedDescription: 'Create magical wedding memories on Lake Travis with our exclusive wedding party cruises. Whether it\'s a rehearsal dinner, welcome party, or after-party celebration, our professional crew ensures a sophisticated and memorable experience for you and your guests.',
    highlights: ['Rehearsal Dinner Cruises', 'Welcome Party Events', 'After Party Celebrations', 'Exclusive Private Charters', 'Professional Service', 'Tables & Coolers Provided', 'Premium Sound Systems']
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Professional lake experiences',
    description: (
      <>
        Premium <InternalLinkHighlight href="/corporate-events" title="Corporate Events">corporate experiences on Lake Travis</InternalLinkHighlight>. Our largest boats perfect for client entertainment and company celebrations with professional service.
      </>
    ),
    features: ['"Clever Girl" flagship boat available', 'Professional atmosphere & service', 'Alcohol delivery coordination available', 'Up to 75 guests capacity', 'BYOB allowed'],
    startingPrice: '$1,413',
    priceNote: 'for 4-hour cruise',
    icon: Users,
    image: galleryImage1,
    gallery: [galleryImage1, galleryImage3, heroImage1, galleryImage2],
    detailedDescription: 'Elevate your corporate events with premium Lake Travis experiences aboard our flagship boats. Perfect for client entertainment, company celebrations, and executive retreats. Our professional crew ensures a sophisticated atmosphere while our spacious boats provide the perfect setting for business networking.',
    highlights: ['Flagship "Clever Girl" Available', 'Professional Business Atmosphere', 'Up to 75 Guests', 'Alcohol Delivery Coordination', 'BYOB Allowed', 'Client Entertainment Perfect', 'Executive Retreat Setting']
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
    title: '150,000+ Happy Customers',
    description: 'We\'ve created unforgettable memories for over 150,000 guests with 5-star service since 2009.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Licensed, fun, experienced captains to take your group safely around the lake in style and pristine safety record ensure your peace of mind.'
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
    answer: 'We offer exclusive Private Charters on Lake Travis with boats holding 14-75 people. Perfect for corporate events, wedding parties, birthdays, and all special celebrations. Every cruise includes licensed, fun, experienced captains to take your group safely around the lake in style, premium sound systems, cooler space (bring your own ice, or order ahead from Party On Delivery), and departs from Anderson Mill Marina. Choose from our fleet of premium boats based on your group size and event type.'
  },
  {
    question: 'How much does a party boat rental cost in Austin?',
    answer: 'Private boat charters start at $1,050 for 4-hour cruises (14-person boat), ranging up to $2,660 for larger boats (75 people). Weekend rates are higher than weekday rates. Contact us for exact pricing for your specific date and group size. All prices include captain, crew, fuel, and amenities.'
  },
  {
    question: 'Where do Austin party boats depart from?',
    answer: 'All Premier Party Cruises depart from Anderson Mill Marina located at 13993 FM2769, Leander, TX 78641 on Lake Travis. The marina is conveniently located just 30 minutes from downtown Austin, making it easily accessible for guests from Austin, Lakeway, Bee Cave, and Cedar Park. Free parking is available at the marina.'
  },
  {
    question: 'What\'s included in your party boat services?',
    answer: 'Every party boat cruise includes: licensed, fun, experienced captains to take your group safely around the lake in style, premium Bluetooth sound system, cooler space (bring your own ice & drinks, or order ahead from Party On Delivery), all required safety equipment, fuel, and access to Lake Travis\'s most scenic coves and beaches. Optional add-ons include lily pads, alcohol delivery, and transportation services. We can also arrange DJs and photographers for special events.'
  },
  {
    question: 'Can we bring our own alcohol on the party boat?',
    answer: 'Yes! All our party boats are BYOB (Bring Your Own Booze). We provide cooler space - bring your own ice, OR add Essentials/Ultimate packages for ice included, OR order stocked and ready from Party On Delivery - our sister company that delivers alcohol directly to your boat at the marina. You can order online and they deliver everything 50 feet from your boat, so you don\'t have to carry anything!'
  },
  {
    question: 'How far in advance should we book our Austin party boat?',
    answer: 'We recommend booking 8-12 weeks for priority time slots - once they book they\'re gone! Weekend dates and peak season (April-September) sell out fastest. Wedding parties and corporate events should also book 8-12 weeks ahead. Holiday weekends book up even quicker. Contact us immediately to check availability for your preferred date.'
  }
];

// Import real reviews from shared/reviews-data.ts
import {
  corporateReviews,
  weddingReviews,
  birthdayReviews,
  bacheloretteReviews,
  discoHighlightReviews,
  privateCruiseReviews,
  type Review
} from '@shared/reviews-data';

// Mix of best reviews from all categories for home page (8-10 reviews)
const testimonials: Review[] = [
  corporateReviews[0], // Andrew A. - Company End of Summer Party
  discoHighlightReviews[0], // Bailey T. - Bachelorette Weekend highlight
  privateCruiseReviews[0], // Sarah M. - Wedding Welcome Party
  corporateReviews[3], // Myaann Payne - Company Five-Year Anniversary
  weddingReviews[0], // Celeste Winn - Wedding Weekend
  birthdayReviews[0], // Delisia Jones - Birthday Party
  discoHighlightReviews[1], // Zach Augustyn - Bachelor/Bachelorette Cruise
  privateCruiseReviews[4], // The Johnson Family - Family Reunion
  corporateReviews[5], // Colleen Mertes - Corporate Event
  birthdayReviews[1] // Natalie Hernandez - Birthday-Turned-Engagement Party
].slice(0, 8);

const stats = [
  { value: '15+', label: 'Years Experience', icon: Trophy },
  { value: '150K+', label: 'Happy Customers', icon: Heart },
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
    type: 'Wedding Parties',
    weekdayFrom: Math.floor(samplePricingScenarios.weekday25.perPersonCost / 100),
    weekendFrom: Math.floor(samplePricingScenarios.weekend25.perPersonCost / 100),
    description: 'Elegant celebrations for wedding events'
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
  const reducedMotion = useReducedMotion();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [quickPricingGroupSize, setQuickPricingGroupSize] = useState(20);
  const [quickPricingDayOfWeek, setQuickPricingDayOfWeek] = useState(6); // Saturday
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
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // MOBILE PAGESPEED: Detect mobile for responsive image loading (saves ~22KB)
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // PERFORMANCE FIX: Defer non-critical endorsements API (was blocking 4,163ms!)
  // Only fetch after page loads to improve LCP/FCP
  const { data: endorsements } = useQuery<Endorsement[]>({
    queryKey: ['/api/endorsements/homepage'],
    enabled: isPageLoaded, // Defer until page interactive
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  // Enable endorsements fetch after initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroImages = [heroImage1, heroImage2, heroImage3];
  const galleryImages = [galleryImage1, galleryImage2, galleryImage3, heroImage1, heroImage2, heroImage3];

  // Auto-rotate hero images
  useEffect(() => {
    if (reducedMotion) return; // Skip animation for reduced motion
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reducedMotion]);


  // Update page title for SEO
  useEffect(() => {
    document.title = 'Premier Party Cruises | Austin Party Boat Rentals on Lake Travis | 150K+ Reviews';
    
    // Add meta description
    const existingDesc = document.querySelector('meta[name="description"]');
    if (existingDesc) {
      existingDesc.setAttribute('content', 'Austin\'s favorite party boat rentals on Lake Travis since 2009. Captained cruises for 5-75 people with all-inclusive packages. Read reviews from 150K+ happy customers!');
    } else {
      const metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = 'Austin\'s favorite party boat rentals on Lake Travis since 2009. Captained cruises for 5-75 people with all-inclusive packages. Read reviews from 150K+ happy customers!';
      document.head.appendChild(metaDesc);
    }
  }, []);


  const handleGetQuote = (packageType?: string, eventType?: string) => {
    if (packageType && eventType) {
      navigate(`/chat?package=${packageType}&type=${eventType}`);
    } else {
      navigate('/chat?type=general');
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
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
    
    // Navigate to chat page
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:bg-gray-950" data-page-ready="home">
      <SEOHead
        pageRoute="/"
        defaultTitle="Party Boat Austin"
        defaultDescription="Austin's favorite party boat rentals on Lake Travis since 2009. Captained cruises for 5-75 people with all-inclusive packages. 150K+ guests. Call (512) 488-5892."
        defaultKeywords={['party boat Austin', 'bachelorette party Austin', 'Austin boat rental', 'Lake Travis party boat', 'bachelor party Austin']}
        schemaType="organization"
      />
      <LazyMotionProvider>
      <PublicNavigation />
      {/* Hero Section - PAGESPEED: Fixed height prevents CLS, poster-first prevents LCP delay */}
      <section id="hero" className="relative flex flex-col justify-center overflow-hidden bg-gray-900" style={{ minHeight: 'clamp(600px, 100vh, 1200px)', contain: 'layout paint' }}>
        {/* PAGESPEED FIX: Static poster image as LCP element (not video) - loads instantly */}
        <div className="absolute inset-0 z-0" style={{ aspectRatio: '16/9' }}>
          <img
            src={isMobile ? heroImage1Mobile : heroImage1}
            alt="Lake Travis party boat cruise with happy guests celebrating"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
            decoding="async"
          />
          {/* Lighter overlay for bright and happy feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/15 to-black/15" />
          {/* Additional blue tint overlay for brand color */}
          <div className="absolute inset-0 bg-blue-900/5" />
        </div>


        {/* Hero Content - PAGESPEED: No m.div above fold */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-white flex-grow flex items-center">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo - Optimized with srcset for responsive loading */}
            <div className="mb-8">
              <img 
                src={isMobile ? logoPathMedium : logoPath}
                srcSet={`${logoPathSmall} 80w, ${logoPathMedium} 140w, ${logoPath} 280w`}
                sizes="(max-width: 768px) 80px, 140px"
                alt="Party Boat Austin - Premier Party Cruises on Lake Travis" 
                className="h-20 md:h-24 w-auto mx-auto mb-6"
                loading="eager"
                fetchPriority="high"
                width={isMobile ? 140 : 280}
                height={isMobile ? 140 : 280}
                data-testid="img-hero-logo"
              />
            </div>

            {/* Main Headline */}
            <div className="mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 leading-tight" data-editable data-editable-id="hero-title">
                Austin's Favorite Party Boat Rentals on Lake Travis
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-brand-yellow font-semibold leading-relaxed" data-editable data-editable-id="hero-tagline">
                Captained party cruises on Lake Travis for 5-75 People, Offering All-Inclusive Party Packages & Pre-Party Setup
              </h2>
            </div>

            {/* Pricing Value Proposition - Smaller & 60% opacity on mobile */}
            <div className="bg-white/60 sm:bg-white border border-gray-200/60 sm:border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-4 max-w-xs sm:max-w-2xl mx-auto mb-6 md:mb-12 backdrop-blur-sm sm:backdrop-blur-none">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="font-sans tracking-wider font-bold uppercase text-[10px] sm:text-xs text-blue-600 mb-0.5 sm:mb-1" data-editable data-editable-id="pricing-overlay-private-label">PRIVATE CRUISES FROM:</div>
                  <div className="text-base sm:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1" data-editable data-editable-id="pricing-overlay-private-price">
                    $200+/hr
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-700" data-editable data-editable-id="pricing-overlay-private-subtitle">Starting price for Up to 14ppl • Private Cruises for 14 to 75 ppl</div>
                </div>
                <div>
                  <div className="font-sans tracking-wider font-bold uppercase text-[10px] sm:text-xs text-blue-600 mb-0.5 sm:mb-1" data-editable data-editable-id="pricing-overlay-disco-label">ATX DISCO CRUISE</div>
                  <div className="text-base sm:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1" data-editable data-editable-id="pricing-overlay-disco-price">
                    $85+ per person
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-700" data-editable data-editable-id="pricing-overlay-disco-subtitle">Friday and Saturdays</div>
                  <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5" data-editable data-editable-id="pricing-overlay-disco-restriction">Bachelorette and Bachelor parties only</div>
                </div>
              </div>
              <div className="text-center mt-1.5 sm:mt-3 text-[10px] sm:text-xs text-blue-600 font-medium hidden sm:block" data-editable data-editable-id="pricing-overlay-tagline">
                ✨ Transparent pricing • No hidden fees • Best value guaranteed
              </div>
            </div>

            {/* CTA Buttons - PAGESPEED: No m.div above fold */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-7 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  data-testid="button-hero-get-quote"
                >
                  <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  <span data-editable data-editable-id="hero-cta-quote">Check Availability</span>
                </Button>
              </div>
              
              <a
                href="/chat"
                className="font-bold text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-5 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to right, #facc15, #f59e0b)',
                  color: '#1f2937'
                }}
                data-testid="button-hero-book-now"
              >
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span data-editable data-editable-id="hero-cta-book">Get Custom Quote</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-sm md:text-base font-semibold">
              ✨ Transparent Pricing • No Hidden Fees • Best Value Guaranteed ✨
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges - Subtle Row */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span className="font-medium">150K+ Customers</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <Trophy className="w-4 h-4 text-blue-600" />
              <span className="font-medium">15+ Years</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Perfect Safety Record</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section - Welcome Text */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold font-playfair mb-6 text-gray-900 dark:text-white">
              Austin's Premier Party Cruise Experience
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Experience the ultimate Lake Travis party boat adventure! From <InternalLinkHighlight href="/private-cruises" title="Private Cruises">intimate 14-person private cruises</InternalLinkHighlight> on "Day Tripper" to epic 75-person celebrations on flagship "Clever Girl", we've been Austin's most trusted party cruise company since 2009. 
              Perfect for <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">bachelor parties</InternalLinkHighlight>, <InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Parties">bachelorette celebrations</InternalLinkHighlight>, and <InternalLinkHighlight href="/corporate-events" title="Corporate Events">corporate team building</InternalLinkHighlight> - read our <InternalLinkHighlight href="/testimonials-faq" title="Customer Reviews">customer reviews</InternalLinkHighlight> to see why 150K+ guests love us!
            </p>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Operating from Anderson Mill Marina on beautiful Lake Travis, our experienced licensed captains and pristine fleet provide unforgettable party boat experiences for groups of all sizes. With transparent pricing, no hidden fees, and unmatched service backed by thousands of 5-star reviews, we make your Lake Travis celebration effortless and extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Section - Lazy loaded for better FCP */}
      <Suspense fallback={<div className="py-16 bg-gray-50"></div>}>
        <FleetSection />
      </Suspense>

      {/* Quote Builder Section - Lazy loaded for better FCP */}
      <Suspense fallback={<div className="py-16 bg-white"></div>}>
        <QuoteBuilderSection />
      </Suspense>

      {/* Services Section */}
      <SectionReveal>
        <section id="services" className="py-12 md:py-24 bg-white dark:bg-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">01</div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="services-main-title">
                Choose Your Perfect Experience
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto" data-editable data-editable-id="services-description">
                From intimate celebrations to epic parties, we have the perfect cruise experience 
                for every group size and occasion.
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <m.div
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
                  "h-full bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer overflow-hidden",
                  service.popular && "shadow-xl"
                )}>
                  {service.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm rounded-full shadow-lg border-0">
                        <span data-editable data-editable-id={`service-${service.id}-badge`}>{service.badge}</span>
                      </Badge>
                    </div>
                  )}

                  {/* Service Image with Lightbox Trigger */}
                  <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => handleOpenLightbox(service)}>
                    <LazyImage 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={400}
                      height={192}
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
                    <CardTitle className="text-xl font-semibold mb-2" data-editable data-editable-id={`service-${service.id}-title`}>{service.title}</CardTitle>
                    <CardDescription className="font-sans tracking-wider font-bold uppercase text-sm text-blue-600" data-editable data-editable-id={`service-${service.id}-subtitle`}>
                      {service.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Hormozi/McDowell Value Badge */}
                    {service.id === 'bachelor' && (
                      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white text-center py-2 px-4 rounded-lg font-bold text-sm animate-pulse">
                        🌟 BEST VALUE - Only $85/person 🌟
                      </div>
                    )}
                    {service.id === 'private' && (
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 rounded-lg font-bold text-sm">
                        🚢 Starting at $1,050 for 4 hours • 14-75 People
                      </div>
                    )}
                    {service.id === 'corporate' && (
                      <div className="bg-gradient-to-r from-gold-500 to-yellow-500 text-black text-center py-2 px-4 rounded-lg font-bold text-sm">
                        💼 Premium Corporate Experience
                      </div>
                    )}

                    <p className="text-base text-gray-700 dark:text-gray-300" data-editable data-editable-id={`service-${service.id}-description`}>
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

                    {/* Urgency Text */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                      <p className="text-red-600 text-sm font-semibold">
                        ⏰ Books 8-10 weeks before the date • {service.id === 'bachelor' ? 'Weekends sell out fast!' : 'Limited availability'}
                      </p>
                    </div>

                    <div className="text-center pt-4">
                      <div className="text-sm text-gray-600 mb-2" data-editable data-editable-id={`service-${service.id}-price-label`}>Starting from</div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-editable data-editable-id={`service-${service.id}-price`}>
                        {service.startingPrice}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-4" data-editable data-editable-id={`service-${service.id}-price-note`}>
                        {service.hourlyNote || service.priceNote || ''}
                      </div>
                      
                      <div
                        className="xola-custom xola-checkout"
                        data-button-id="691574bd162501edc00f151a"
                      >
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl"
                          data-testid={`button-service-${service.id}`}
                        >
                          <span data-editable data-editable-id={`service-${service.id}-cta-button`}>
                            {service.id === 'private' ? 'BOOK PRIVATE CRUISE' : service.id === 'wedding' ? 'PLAN WEDDING EVENT' : 'GET QUOTE'}
                          </span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
          </div>
        </section>
      </SectionReveal>

      {/* Pricing & Packages Section - MOVED UP FOR PROMINENCE */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 relative" id="pricing">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-20">02</div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <DollarSign className="h-4 w-4 mr-2 inline" />
                Transparent Pricing
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white leading-tight">
                Pricing & Packages
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Find the perfect Lake Travis cruise for your budget and group size - transparent pricing with no hidden fees
              </p>
            </div>

            {/* Private Cruise Detailed Pricing - MOVED UP FOR PROMINENCE */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-white text-brand-blue px-4 py-2 font-semibold">
                  <Ship className="h-4 w-4 mr-2 inline" />
                  Private Cruises
                </Badge>
                <h3 className="text-3xl font-semibold font-playfair mb-4 text-gray-900 dark:text-white">
                  Your Boat, Your Way - Private Cruise Pricing
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Choose your boat size and package level. All packages include licensed, fun, experienced captains to take your group safely around the lake in style, premium sound system, and cooler space (bring your own ice, or add Essentials/Ultimate for ice included, or order from Party On Delivery).
                </p>
              </div>
              <Suspense fallback={<div className="py-8 bg-gray-50 rounded-xl animate-pulse"></div>}>
                <TabbedPrivateCruisePricingLazy />
              </Suspense>
            </div>


            {/* All Services Overview Comparison */}
            <div className="mb-16">
              <h3 className="text-3xl font-semibold font-playfair text-center mb-8 text-gray-900 dark:text-white">
                Compare All Our Services
              </h3>
              <Suspense fallback={<div className="py-8 bg-gray-50 rounded-xl animate-pulse"></div>}>
              <PricingTableLazy
                title="All Services Overview"
                items={[
                  {
                    name: 'Private Cruises',
                    basePrice: 1050,
                    pricingType: 'cruise',
                    description: 'Exclusive boat rental for your group',
                    features: [
                      '4-hour cruise',
                      'Choose your boat (14-75 capacity)',
                      'BYOB allowed',
                      'Customizable packages',
                      '7 days a week'
                    ],
                    capacity: '14-75 guests',
                    duration: '4 hours',
                    priceNote: '$1,050-$2,660 for 4-hour cruise',
                    ctaText: 'Book Private Charter',
                    ctaHref: '/private-cruises',
                    isPopular: true
                  },
                  {
                    name: 'Corporate Events',
                    basePrice: 225,
                    pricingType: 'hour',
                    description: 'Professional corporate experiences on Lake Travis',
                    features: [
                      'Professional atmosphere',
                      'Client entertainment',
                      'Alcohol delivery coordination',
                      'BYOB allowed',
                      'Tax deductible'
                    ],
                    capacity: '14-75 guests',
                    duration: '4+ hours',
                    priceNote: '$1,181 for 4-hour cruise',
                    ctaText: 'Plan Corporate Event',
                    ctaHref: '/client-entertainment'
                  },
                  {
                    name: 'Wedding Parties',
                    basePrice: 250,
                    pricingType: 'hour',
                    description: 'Elegant celebrations for wedding events',
                    features: [
                      'Rehearsal dinners',
                      'Welcome parties',
                      'After parties',
                      'Tables & coolers provided',
                      'Professional service'
                    ],
                    capacity: '14-75 guests',
                    duration: '4+ hours',
                    priceNote: '$1,313 for 4-hour cruise',
                    ctaText: 'Plan Wedding Event',
                    ctaHref: '/wedding-parties'
                  }
                ]}
              />
              </Suspense>
            </div>

            {/* Complete Pricing Information Table */}
            <div className="p-8 bg-gradient-to-br from-white via-yellow-50/30 to-white dark:from-gray-800 dark:via-yellow-900/20 dark:to-gray-800 rounded-2xl shadow-2xl border-2 border-yellow-400/30">
              <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                ⚓ Private Cruise Pricing ⚓
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-base mx-auto">
                  <thead>
                    <tr className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
                      <th className="text-center py-4 px-4 font-bold border-r border-yellow-600/30">
                        <Ship className="inline w-5 h-5 mr-2" />
                        Day Tripper
                        <span className="block text-xs font-semibold mt-1">Up to 14 people</span>
                      </th>
                      <th className="text-center py-4 px-4 font-bold border-r border-yellow-600/30">
                        <Ship className="inline w-5 h-5 mr-2" />
                        Meeseeks / The Irony
                        <span className="block text-xs font-semibold mt-1">15-30 people</span>
                      </th>
                      <th className="text-center py-4 px-4 font-bold">
                        <Ship className="inline w-5 h-5 mr-2" />
                        Clever Girl
                        <span className="block text-xs font-semibold mt-1">31-75 people</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-semibold">
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors">
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Mon-Thu: <span className="text-green-600 dark:text-green-400 font-bold">$1,050</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200 border-x border-gray-200 dark:border-gray-700">Mon-Thu: <span className="text-green-600 dark:text-green-400 font-bold">$1,181</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Mon-Thu: <span className="text-green-600 dark:text-green-400 font-bold">$1,413</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors">
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Friday: <span className="text-blue-600 dark:text-blue-400 font-bold">$1,181</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200 border-x border-gray-200 dark:border-gray-700">Friday: <span className="text-blue-600 dark:text-blue-400 font-bold">$1,313</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Friday: <span className="text-blue-600 dark:text-blue-400 font-bold">$1,554</span></td>
                    </tr>
                    <tr className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-b-2 border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-center font-bold text-purple-700 dark:text-purple-300">Saturday: <span className="text-xl">$1,838</span></td>
                      <td className="py-3 px-4 text-center font-bold text-purple-700 dark:text-purple-300 border-x border-purple-300 dark:border-purple-700">Saturday: <span className="text-xl">$1,969</span></td>
                      <td className="py-3 px-4 text-center font-bold text-purple-700 dark:text-purple-300">Saturday: <span className="text-xl">$2,260</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors">
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Sunday: <span className="text-blue-600 dark:text-blue-400 font-bold">$1,313</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200 border-x border-gray-200 dark:border-gray-700">Sunday: <span className="text-blue-600 dark:text-blue-400 font-bold">$1,444</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Sunday: <span className="text-blue-600 dark:text-blue-400 font-bold">$1,695</span></td>
                    </tr>
                    <tr className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
                      <td colSpan={3} className="py-4 px-4 font-bold text-center text-lg text-orange-700 dark:text-orange-300">
                        <Gift className="inline w-5 h-5 mr-2" />
                        Package Add-Ons (Flat Fee Per Cruise)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors">
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Essentials: <span className="text-orange-600 dark:text-orange-400 font-bold">+$100</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200 border-x border-gray-200 dark:border-gray-700">Essentials: <span className="text-orange-600 dark:text-orange-400 font-bold">+$150</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Essentials: <span className="text-orange-600 dark:text-orange-400 font-bold">+$200</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors">
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Ultimate: <span className="text-purple-600 dark:text-purple-400 font-bold">+$250</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200 border-x border-gray-200 dark:border-gray-700">Ultimate: <span className="text-purple-600 dark:text-purple-400 font-bold">+$300</span></td>
                      <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">Ultimate: <span className="text-purple-600 dark:text-purple-400 font-bold">+$350</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-center text-gray-800 dark:text-gray-200">
                  💰 All prices subject to 8.25% tax • 20% gratuity recommended • Deposit: 25% if booking 14+ days out, 50% if less than 14 days
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Testimonials Section - Hormozi/McDowell Social Proof */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 font-bold">
                ⭐ 420+ Five-Star Reviews
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Real reviews from real party-goers who chose Premier Party Cruises
              </p>
            </div>

            {/* Testimonial Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <m.div
                  key={testimonial.id}
                  initial={reducedMotion ? false : "hidden"}
                  whileInView={reducedMotion ? false : "visible"}
                  viewport={{ once: true }}
                  variants={reducedMotion ? undefined : fadeInUp}
                  transition={reducedMotion ? undefined : { delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {testimonial.verified && (
                      <Badge className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{testimonial.avatar}</div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-gray-500">
                          {testimonial.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-orange-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Join 150,000+ Happy Customers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>


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
                <DialogDescription className="text-base text-gray-600 dark:text-gray-300" data-editable data-editable-id={`lightbox-${selectedService.id}-subtitle`}>
                  {selectedService.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Photo Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedService.gallery?.map((image, index) => (
                    <m.div
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
                      <LazyImage
                        src={image}
                        alt={`${selectedService.title} gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        width={200}
                        height={200}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span data-editable data-editable-id={`lightbox-${selectedService.id}-gallery-view-full`}>View Full</span>
                      </div>
                    </m.div>
                  ))}
                </div>

                {/* Detailed Description */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white" data-editable data-editable-id={`lightbox-${selectedService.id}-details-title`}>
                    Experience Details
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base" data-editable data-editable-id={`lightbox-${selectedService.id}-detailed-description`}>
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
                      <m.div
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
                      </m.div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking Section */}
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1" data-editable data-editable-id={`lightbox-${selectedService.id}-pricing-label`}>Starting from</div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
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
                      
                      <div
                        className="xola-custom xola-checkout"
                        data-button-id="691574bd162501edc00f151a"
                      >
                        <Button 
                          className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 text-base font-bold"
                          data-testid={`button-lightbox-book-${selectedService.id}`}
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          <span data-editable data-editable-id={`lightbox-${selectedService.id}-book-button`}>Book Now</span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
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

      {/* Availability & Booking Section */}
      <SectionReveal id="availability">
        <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-20">03</div>
          <div className="container mx-auto px-4 sm:px-6">
            <Collapsible className="max-w-7xl mx-auto" defaultOpen={false}>
              <div className="text-center mb-8">
                <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Calendar className="h-4 w-4 mr-2 inline" />
                  Availability & Booking
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white leading-tight" data-editable data-editable-id="availability-main-title">
                  When Can You Book?
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6" data-editable data-editable-id="availability-description">
                  We operate year-round on Lake Travis with flexible scheduling to fit your celebration
                </p>
                
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="lg" className="group" data-testid="button-toggle-availability">
                    <span>View Booking Details</span>
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="space-y-12">
                {/* Main Availability Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
              {/* 7 Days a Week */}
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 transition-all hover:shadow-xl bg-white dark:bg-gray-800">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white" data-editable data-editable-id="availability-card-1-title">
                    7 Days a Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed" data-editable data-editable-id="availability-card-1-description">
                    Private charters available every day of the week, year-round on Lake Travis
                  </p>
                </CardContent>
              </Card>

              {/* Peak Season */}
              <Card className="border-2 border-orange-200 dark:border-orange-900 hover:border-orange-400 dark:hover:border-orange-700 transition-all hover:shadow-xl bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-800">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center">
                    <Sun className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white" data-editable data-editable-id="availability-card-2-title">
                    Peak Season
                  </CardTitle>
                  <CardDescription className="font-semibold" data-editable data-editable-id="availability-card-2-subtitle">
                    May - September
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3" data-editable data-editable-id="availability-card-2-description">
                    High demand season - book 8-12 weeks for priority time slots - once they book they're gone!
                  </p>
                  <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
                    Book Early
                  </Badge>
                </CardContent>
              </Card>

              {/* Off Season */}
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 transition-all hover:shadow-xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-800">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center">
                    <Snowflake className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white" data-editable data-editable-id="availability-card-3-title">
                    Off-Peak Season
                  </CardTitle>
                  <CardDescription className="font-semibold" data-editable data-editable-id="availability-card-3-subtitle">
                    October - April
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3" data-editable data-editable-id="availability-card-3-description">
                    More flexible scheduling and last-minute availability
                  </p>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    Best Value
                  </Badge>
                </CardContent>
              </Card>

              {/* ATX Disco Cruise Schedule */}
              <Card className="border-2 border-purple-200 dark:border-purple-900 hover:border-purple-400 dark:hover:border-purple-700 transition-all hover:shadow-xl bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-800">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center">
                    <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white" data-editable data-editable-id="availability-card-4-title">
                    ATX Disco Cruise
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3" data-editable data-editable-id="availability-card-4-description">
                    Friday & Saturday time slots - $85-$105/person depending on time slot
                  </p>
                  <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    Weekly Event
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Time Slots Section */}
            <div className="max-w-5xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold font-playfair text-center mb-8 text-gray-900 dark:text-white" data-editable data-editable-id="availability-timeslots-title">
                Available Time Slots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Morning Cruises */}
                <Card className="border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-lg bg-white dark:bg-gray-800">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-3 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full w-14 h-14 flex items-center justify-center">
                      <Sun className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white" data-editable data-editable-id="timeslot-morning-title">
                      Morning Cruises
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">9am - 1pm</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id="timeslot-morning-description">
                      Perfect for early risers and calm waters
                    </p>
                  </CardContent>
                </Card>

                {/* Afternoon Cruises */}
                <Card className="border-2 border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg bg-white dark:bg-gray-800">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-3 p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-14 h-14 flex items-center justify-center">
                      <Clock className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white" data-editable data-editable-id="timeslot-afternoon-title">
                      Afternoon Cruises
                    </CardTitle>
                    <Badge className="mt-2 bg-blue-600 text-white">Most Popular</Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">2pm - 6pm</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id="timeslot-afternoon-description">
                      Peak party time on Lake Travis
                    </p>
                  </CardContent>
                </Card>

                {/* Evening Cruises */}
                <Card className="border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-lg bg-white dark:bg-gray-800">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-3 p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-14 h-14 flex items-center justify-center">
                      <Waves className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white" data-editable data-editable-id="timeslot-evening-title">
                      Evening Cruises
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">4pm - 8pm</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id="timeslot-evening-description">
                      Sunset views and celebrations (cruises end by 8:30pm)
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Booking Timeline */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white" data-editable data-editable-id="booking-timeline-title">
                How Far in Advance Should You Book?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white" data-editable data-editable-id="booking-timeline-1-title">
                      Bachelorette & Bachelor Parties
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300" data-editable data-editable-id="booking-timeline-1-description">
                      Book 8-12 weeks for priority time slots - once they book they're gone! Especially for ATX Disco Cruises on weekends during peak season
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white" data-editable data-editable-id="booking-timeline-2-title">
                      Large Groups & Corporate Events
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300" data-editable data-editable-id="booking-timeline-2-description">
                      Book 6-8 weeks ahead for groups of 30+ or corporate events requiring our flagship boats
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white" data-editable data-editable-id="booking-timeline-3-title">
                      Last-Minute Bookings
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300" data-editable data-editable-id="booking-timeline-3-description">
                      Weekday cruises during off-peak season may be available with 1-2 weeks notice - call us to check!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <div
                className="xola-custom xola-checkout inline-block"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-check-availability"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Check Availability & Book Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                <Phone className="inline h-4 w-4 mr-1" />
                Or call us at <a href="tel:+15124885892" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">(512) 488-5892</a>
              </p>
            </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>
      </SectionReveal>

      {/* Photo Gallery Section */}
      <SectionReveal id="gallery">
        <section className="py-12 md:py-24 bg-blue-50/30 dark:bg-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">05</div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="gallery-main-title">
                Experience the Premier Difference
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6" data-editable data-editable-id="gallery-description">
                See why 150,000+ customers choose Premier Party Cruises for their unforgettable Lake Travis experience.
              </p>
              <div className="mt-6">
                <InternalLinkHighlightWithArrow href="/gallery" title="View Our Fleet" className="text-base">
                  View Our Fleet
                </InternalLinkHighlightWithArrow>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  <div
                    key={index}
                    className="group relative cursor-pointer overflow-hidden rounded-xl aspect-square border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <LazyImage 
                      src={image}
                      alt={altTexts[index]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Comparison Tables Section */}
      <SectionReveal id="fleet">
        <section className="py-12 md:py-24 bg-white dark:bg-gray-800 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">06</div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white">
                Compare Your Options
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                Compare our cruise options and boat fleet to find the perfect fit for your celebration
              </p>
            </div>

          {/* Disco vs Private Comparison */}
          <m.div 
            variants={reducedMotion ? undefined : fadeInUp}
            className="mb-16 max-w-5xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
              ATX Disco Cruise vs Private Charter
            </h3>
            <Suspense fallback={<div className="py-8 bg-gray-50 rounded-xl animate-pulse"></div>}>
            <ComparisonTableLazy
              columns={[
                {
                  id: 'disco',
                  title: 'ATX Disco Cruise',
                  subtitle: 'Multi-group party experience',
                  recommended: true,
                  badge: { text: 'Best Value', variant: 'default' }
                },
                {
                  id: 'private',
                  title: 'Private Charter',
                  subtitle: 'Exclusive boat rental'
                }
              ]}
              rows={[
                {
                  feature: 'Price Range',
                  values: [
                    { text: '$85-$105/person depending on time slot', highlight: true },
                    '$1,050-$2,660 for 4-hour cruise'
                  ]
                },
                {
                  feature: 'Group Size',
                  values: ['8-30 people typical', '1-75 people']
                },
                {
                  feature: 'Duration',
                  values: ['4 hours fixed', '4+ hours flexible']
                },
                {
                  feature: 'Professional DJ',
                  values: [true, false]
                },
                {
                  feature: 'Professional Photographer',
                  values: [true, false]
                },
                {
                  feature: 'Food Options',
                  values: ['Delivery available', 'Bring your own']
                },
                {
                  feature: 'Customization',
                  values: ['Limited', 'Full control']
                },
                {
                  feature: 'Best For',
                  values: ['Bach parties, social groups', 'Any private event']
                },
                {
                  feature: 'Booking Type',
                  values: ['Per person tickets', 'Charter entire boat']
                },
                {
                  feature: 'Availability',
                  values: ['Friday & Saturday time slots', '7 days a week']
                }
              ]}
              caption="ATX Disco Cruise vs Private Charter Comparison"
              summary="Compare the features and benefits of our ATX Disco Cruise public party experience versus a private charter boat rental on Lake Travis"
              mobileView="cards"
              schemaType="Service"
              ariaLabel="Comparison of ATX Disco Cruise and Private Charter options"
              highlightBest={true}
            />
            </Suspense>
          </m.div>

          {/* Fleet Comparison */}
          <m.div 
            variants={reducedMotion ? undefined : fadeInUp}
            className="max-w-7xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
              Our Lake Travis Fleet
            </h3>
            <Suspense fallback={<div className="py-8 bg-gray-50 rounded-xl animate-pulse"></div>}>
            <ComparisonTableLazy
              columns={[
                {
                  id: 'daytripper',
                  title: 'Day Tripper',
                  subtitle: 'Intimate cruiser'
                },
                {
                  id: 'meeseeks',
                  title: 'Meeseeks',
                  subtitle: 'Party favorite',
                  recommended: true,
                  badge: { text: 'Most Popular', variant: 'default' }
                },
                {
                  id: 'clevergirl',
                  title: 'Clever Girl',
                  subtitle: 'Flagship vessel'
                },
                {
                  id: 'irony',
                  title: 'The Irony',
                  subtitle: 'Comfort cruiser'
                }
              ]}
              rows={[
                {
                  feature: 'Capacity',
                  values: ['1-14 guests', '15-25 guests', '31-75 guests', '15-30 guests']
                },
                {
                  feature: 'Boat Size',
                  values: ['Intimate', 'Medium', 'Flagship Large', 'Medium Plus']
                },
                {
                  feature: 'Amenities',
                  values: [
                    'Sound system, coolers',
                    'Premium sound, spacious',
                    '14 disco balls, Texas flag',
                    'Dual decks, comfort seating'
                  ]
                },
                {
                  feature: 'Best For',
                  values: [
                    'Small birthdays, dates',
                    'Bach parties, friends',
                    'Corporate, large groups',
                    'Mixed groups, comfort'
                  ]
                },
                {
                  feature: '4-Hour Total',
                  values: [
                    { text: '$1,050', highlight: true },
                    '$1,181',
                    '$1,413',
                    '$1,181'
                  ]
                },
                {
                  feature: 'Marina',
                  values: ['Anderson Mill', 'Anderson Mill', 'Anderson Mill', 'Anderson Mill']
                }
              ]}
              caption="Premier Party Cruises Fleet Comparison"
              summary="Compare our four Lake Travis party boats to find the perfect vessel for your group size and celebration type"
              mobileView="scroll"
              schemaType="Product"
              ariaLabel="Comparison of Premier Party Cruises boat fleet"
            />
            </Suspense>
          </m.div>
          </div>
        </section>
      </SectionReveal>

      {/* Testimonials Section */}
      <SectionReveal id="testimonials">
        <section className="py-12 md:py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-white opacity-10">07</div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-white" data-editable data-editable-id="testimonials-main-title">
                What Our Customers Say
              </h2>
              <p className="text-base text-blue-100 max-w-3xl mx-auto" data-editable data-editable-id="testimonials-description">
                Don't just take our word for it - see what makes us Austin's most trusted party cruise company.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id}>
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                    <CardHeader className="text-center pb-4">
                      <div className="text-3xl mb-4">{testimonial.avatar}</div>
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        <span data-editable data-editable-id={`testimonial-${testimonial.id}-name`}>{testimonial.name}</span>
                      </CardTitle>
                      <CardDescription className="text-base text-blue-200">
                        <span data-editable data-editable-id={`testimonial-${testimonial.id}-role`}>{testimonial.role}</span>
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <Quote className="h-6 w-6 text-yellow-400 mb-4 mx-auto" />
                      <p className="text-base text-white/90 italic text-center" data-editable data-editable-id={`testimonial-${testimonial.id}-text`}>
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <Suspense fallback={<div className="py-12"></div>}>
        <PartyPlanningChecklist partyType="Lake Travis Party" eventType="celebration" />
      </Suspense>

      {/* AI-Optimized Conversational Q&A Content */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <AIOptimizedSection
            type="qa"
            title="You Asked, We Answer - Lake Travis Party Boat FAQs"
            description="Natural language answers to your common questions about party boat rentals in Austin"
            data={[
              {
                question: "What should you bring on a Lake Travis party boat?",
                answer: "You should bring your own alcohol (we're BYOB), towels, sunscreen, and snacks. We provide cooler space - bring your own ice, OR add Essentials/Ultimate packages for ice included, OR order stocked and ready from Party On Delivery. We also provide cups and Bluetooth speakers. For special events, we can arrange DJ services and party supplies. Don't forget your ID and swimsuit!",
                category: "What to Bring"
              },
              {
                question: "How does your party boat rental process work?",
                answer: "First, you check availability for your date online. Then you choose the perfect boat size for your private charter based on your group (14-75 people). You'll pay a deposit to secure your booking, receive confirmation via email, and show up at Anderson Mill Marina on Lake Travis 15 minutes before departure. Your captain handles everything else!",
                category: "Booking Process"
              },
              {
                question: "What happens if it rains on your scheduled cruise date?",
                answer: "For Private Cruises: Your captain can reschedule or cancel at their discretion. If any cruise time is lost, a prorated refund will be applied. We monitor weather conditions closely and will contact you if there are concerns. Safety is our top priority, and we'll work with you to find the best solution for your event.",
                category: "Weather Policy"
              },
              {
                question: "Can you swim from your party boats?",
                answer: "Yes! You can swim at designated swimming areas on Lake Travis. We anchor at popular coves where you can jump off the boat and enjoy the water. We provide lily pads for floating. Your captain knows the best spots based on conditions that day.",
                category: "Swimming"
              },
              {
                question: "How many people fit on your boats?",
                answer: "Your group size determines which boat: Day Tripper holds up to 14 people (perfect for intimate gatherings), Meeseeks accommodates 25 people (ideal for birthday parties), and our flagship Clever Girl holds up to 75 people (great for large corporate events or weddings). We'll help you choose the perfect boat for your group size.",
                category: "Capacity"
              }
            ]}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Contact & CTA Section */}
      <SectionReveal id="contact">
        <section className="py-12 md:py-24 bg-blue-50/30 dark:bg-gray-950 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">07</div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="contact-main-title">
                Ready to Set Sail?
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12" data-editable data-editable-id="contact-description">
                Contact us today for a free quote and let's start planning your unforgettable Lake Travis adventure.
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <m.div
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={reducedMotion ? undefined : { once: true, margin: "-50px" }}
              variants={reducedMotion ? undefined : fadeInUp}
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
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 text-base rounded-xl"
                      data-testid="button-contact-submit"
                    >
                      <Mail className="mr-3 h-5 w-5" />
                      <span data-editable data-editable-id="contact-form-submit-button">GET FREE QUOTE</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </m.div>

            {/* Contact Info & Quick Actions */}
            <m.div
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={reducedMotion ? undefined : { once: true, margin: "-50px" }}
              variants={reducedMotion ? undefined : fadeInUp}
              className="space-y-8"
            >
              {/* Quick Book Button */}
              <Card className="border-2 border-brand-yellow bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4 tracking-wide" data-editable data-editable-id="quick-book-title">Book Online Now</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" data-editable data-editable-id="quick-book-description">
                    See our real-time availability and book your perfect cruise date instantly.
                  </p>
                  <Button 
                    onClick={() => scrollToSection('quote-builder')}
                    size="lg"
                    className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold py-4 text-base rounded-xl tracking-wide"
                    data-testid="button-quick-book"
                  >
                    <span data-editable data-editable-id="quick-book-button">GET MY QUOTE</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <Phone className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-base tracking-wide" data-editable data-editable-id="contact-phone-title">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-phone-number">(512) 488-5892</p>
                      <p className="text-sm text-gray-600" data-editable data-editable-id="contact-phone-note">Available 7 days a week</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-base tracking-wide" data-editable data-editable-id="contact-email-title">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-email-address">clientservices@premierpartycruises.com</p>
                      <p className="text-sm text-gray-600" data-editable data-editable-id="contact-email-note">Response within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <MapPin className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-base tracking-wide" data-editable data-editable-id="contact-location-title">Lake Travis</h4>
                      <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-location-city">Austin, Texas</p>
                      <p className="text-sm text-gray-600" data-editable data-editable-id="contact-location-note">Austin, Texas</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </m.div>
          </div>
          </div>
        </section>
      </SectionReveal>

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
              <LazyImage 
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
                width={800}
                height={600}
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold font-playfair text-center mb-4 text-white">
              Explore All Our Austin Party Boat Services
            </h2>
            <p className="text-base text-blue-100 max-w-2xl mx-auto">
              Discover the perfect Lake Travis party cruise for your celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link href="/bachelor-party-austin" data-testid="link-bachelor-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Austin</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Epic bachelor party boat cruises on Lake Travis with DJ and photographer</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Party Austin</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Austin's #1 bachelorette party cruise - Our specialty since 2009</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/wedding-parties" data-testid="link-wedding-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Wedding Parties</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Elegant wedding celebrations on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/party-boat-lake-travis" data-testid="link-party-boat-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Party Boat Lake Travis</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Premium Austin party boats for unforgettable celebrations</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Cruises</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Exclusive private boat charters on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/client-entertainment" data-testid="link-client-entertainment-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Corporate Events</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Professional client entertainment on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">See real photos from our Austin party boat cruises</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/blogs" data-testid="link-blogs-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Cruise Blog & Tips</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Expert guides for planning your Lake Travis experience</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Get your custom party boat quote today</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* NOTE: All structured data (Organization, Service, Product, FAQ, etc.) is handled by SSR via schemaLoader.ts
          to avoid duplicate/conflicting schemas and Google Search Console errors.
          SSR schemas loaded: homepage/organization.jsonld, homepage/faq.jsonld, homepage/service-private.jsonld,
          homepage/service-disco.jsonld, homepage/service-daytripper.jsonld, homepage/service-meeseeks.jsonld,
          homepage/service-clevergirl.jsonld */}

      {/* ========== SEO-OPTIMIZED CONTENT SECTION (FOR SEARCH ENGINES) ========== */}
      
      {/* AI-Optimized By The Numbers Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-6">
          <AIOptimizedSection
            type="statistics"
            title="Premier Party Cruises By The Numbers"
            description="Trusted by thousands of customers in Austin, Texas (ATX) and Lake Travis area since 2009"
            data={[
              { 
                value: "150,000+", 
                label: "Happy Customers", 
                icon: <Users className="w-8 h-8" />
              },
              { 
                value: "15+", 
                label: "Years in Business", 
                icon: <Trophy className="w-8 h-8" />
              },
              { 
                value: "4", 
                label: "Premium Boats", 
                icon: <Ship className="w-8 h-8" />
              },
              { 
                value: "75", 
                label: "Max Capacity", 
                icon: <Users className="w-8 h-8" />
              },
              { 
                value: "4.9/5", 
                label: "Average Rating", 
                icon: <Star className="w-8 h-8" />
              }
            ]}
            className="max-w-6xl mx-auto"
          />
        </div>
      </section>

      {/* Structured Services Overview - AI Optimized */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <AIOptimizedSection
            type="list"
            title="Our Services Overview - Lake Travis Party Boats"
            description="Choose from our comprehensive range of party boat services on Lake Travis, Austin Texas"
            data={[
              {
                title: "ATX Disco Cruise - Multi-Group Party Experience",
                description: "Join other bachelor and bachelorette parties for a 4-hour cruise with professional DJ, photographer, and all-inclusive amenities. Perfect for groups of 8-30 people looking for the best value at $85-125 per person.",
                icon: <Music className="w-6 h-6" />,
                badge: "Best Value",
                highlighted: true
              },
              {
                title: "Private Boat Charters - Exclusive Rentals",
                description: "Rent an entire boat exclusively for your group. Choose from Day Tripper (14 people), Meeseeks (25 people), or Clever Girl (75 people). Starting at $1,050 for 4-hour cruise.",
                icon: <Ship className="w-6 h-6" />
              },
              {
                title: "Bachelor Party Packages - Austin's #1 Choice",
                description: "Specialized bachelor party experiences with professional DJ, photographer, and giant floats. Available as ATX Disco Cruise or private charter options.",
                icon: <Crown className="w-6 h-6" />
              },
              {
                title: "Bachelorette Party Cruises - Celebrate in Style",
                description: "Premium bachelorette party packages with mimosa supplies, decorations, and professional photography.",
                icon: <Heart className="w-6 h-6" />
              },
              {
                title: "Corporate Events - Professional Lake Travis Experiences",
                description: "Client entertainment and company celebrations on our flagship boats. Professional service, flexible food options, and capacity up to 75 guests.",
                icon: <Users className="w-6 h-6" />
              }
            ]}
            className="max-w-5xl mx-auto mb-12"
          />
        </div>
      </section>

      {/* AI-Optimized Location & Entity Recognition Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
        <div className="container mx-auto px-6">
          <AIOptimizedSection
            type="definition"
            data={{
              term: "Premier Party Cruises - Austin's Original Party Boat Company",
              definition: "Premier Party Cruises is a party boat rental company operating on Lake Travis in Austin, Texas (often referred to as ATX). Founded in 2009, we specialize in bachelor parties, bachelorette parties, birthday celebrations, and corporate events. Our fleet includes four boats departing from Anderson Mill Marina in Leander, Texas, just 30 minutes northwest of downtown Austin.",
              context: "Lake Travis is a 65-mile long reservoir on the Colorado River, known as Austin's playground for water activities. The lake offers 270+ miles of shoreline and is the most visited freshwater recreation area in Texas."
            }}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Related Services Section */}
      <RelatedServicesSection currentPath="/" />

      {/* Social Proof Counter Section - Hormozi/McDowell Style */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Join Thousands of Happy Cruisers
            </h2>
            <p className="text-xl opacity-90">
              Austin's Most Trusted Party Boat Company Since 2009
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Parties Hosted Counter */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                  <m.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    150,000+
                  </m.span>
                </div>
                <div className="text-xl font-semibold">Parties Hosted</div>
                <div className="text-sm opacity-80 mt-2">Since 2009</div>
              </div>
            </m.div>

            {/* Five-Star Reviews Counter */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 flex items-center justify-center gap-2">
                  <m.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    420+
                  </m.span>
                  <Star className="h-10 w-10 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-xl font-semibold">Five-Star Reviews</div>
                <div className="text-sm opacity-80 mt-2">4.9/5 Average Rating</div>
              </div>
            </m.div>

            {/* Weather Guarantee Counter */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                  <m.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    100%
                  </m.span>
                </div>
                <div className="text-xl font-semibold">Weather Guarantee</div>
                <div className="text-sm opacity-80 mt-2">Full Refund Protection</div>
              </div>
            </m.div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12">
            <div
              className="xola-custom xola-checkout"
              data-button-id="691574bd162501edc00f151a"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-orange-500 hover:to-orange-600 text-black font-extrabold px-10 py-6 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK YOUR PARTY NOW
                <ArrowRight className="ml-3 h-6 w-6 animate-bounce-horizontal" />
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-90">
              ⚠️ Weekend spots fill up - book 8-12 weeks for priority time slots - once they book they're gone!
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer Boxes Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <QuickAnswerBoxGroup
            title="Quick Answers About Lake Travis"
            boxes={[
              {
                id: 'parties-good',
                question: 'Is Lake Travis good for parties?',
                answer: 'Yes! Lake Travis offers the perfect setting for unforgettable parties with crystal-clear waters, scenic coves, and year-round sunshine. Our party boats feature premium sound systems, spacious decks, and professional crews ensuring safe, memorable celebrations on Austin\'s premier lake destination.',
                keywords: ['Lake Travis', 'parties', 'party boats', 'Austin'],
                icon: PartyPopper,
                relatedLink: {
                  href: '#services',
                  text: 'View our party packages'
                }
              },
              {
                id: 'alcohol-allowed',
                question: 'Can you bring alcohol on Lake Travis boats?',
                answer: 'Yes, BYOB is allowed on all our Lake Travis cruises! Bring your favorite beverages - we provide cooler space - bring your own ice, OR add Essentials/Ultimate packages for ice included, OR order stocked and ready from Party On Delivery. We also provide cups and all necessary supplies. Our crews help with loading/unloading, and we can arrange alcohol delivery directly to the boat for your convenience.',
                keywords: ['BYOB', 'alcohol', 'coolers', 'Lake Travis'],
                icon: Wine,
                relatedLink: {
                  href: '/faq',
                  text: 'See all FAQs'
                }
              },
              {
                id: 'distance-austin',
                question: 'How far is Lake Travis from downtown Austin?',
                answer: 'Lake Travis is 30-45 minutes from downtown Austin, located northwest of the city. We depart from Anderson Mill Marina (20 minutes closer than other marinas), making it convenient for locals and visitors. Round-trip transportation available from downtown hotels and Airbnbs.',
                keywords: ['downtown Austin', 'Anderson Mill Marina', 'transportation'],
                icon: MapPin,
                relatedLink: {
                  href: '/contact',
                  text: 'Get directions'
                }
              }
            ]}
            columns={3}
            className="max-w-7xl mx-auto"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </LazyMotionProvider>
    </div>
  );
}