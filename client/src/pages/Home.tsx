// SSR FIX: Explicit React import needed for Node.js SSR environment (JSX fragments)
import React, { useState, useEffect, useRef, lazy, Suspense, FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { LazyMotionProvider, m } from '@/components/LazyMotion';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// TBT OPTIMIZATION: Dialog and Collapsible lazy loaded - not needed above fold
const Dialog = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.Dialog })));
const DialogContent = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogContent })));
const DialogHeader = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogHeader })));
const DialogTitle = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogTitle })));
const DialogDescription = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogDescription })));
const Collapsible = lazy(() => import('@/components/ui/collapsible').then(m => ({ default: m.Collapsible })));
const CollapsibleContent = lazy(() => import('@/components/ui/collapsible').then(m => ({ default: m.CollapsibleContent })));
const CollapsibleTrigger = lazy(() => import('@/components/ui/collapsible').then(m => ({ default: m.CollapsibleTrigger })));
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LazyImage } from '@/components/LazyImage';
// MOBILE PAGESPEED: Optimized logo sizes (80x80=5KB, 140x140=7KB, 280x280=26KB)
const logoPath = '/attached_assets/PPC-Logo-280x280.webp';
const logoPathSmall = '/attached_assets/PPC-Logo-80x80.webp';
const logoPathMedium = '/attached_assets/PPC-Logo-140x140.webp';
const logoPathLarge = '/attached_assets/PPC-Logo-LARGE.webp';
// TBT OPTIMIZATION: Reduced from 32 to 17 icons for faster bundle parsing
// Consolidated: Crown→Trophy, Gift→Star, Headphones→Music, MessageSquare→Phone,
// PartyPopper→Star, Play→Image, Quote→Star, Snowflake/Sun→removed (use emoji),
// Target/Zap→CheckCircle, UserCheck→Users, Waves→Ship, DollarSign/Eye→removed
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Heart,
  Image,
  Mail,
  MapPin,
  Music,
  Phone,
  Shield,
  Ship,
  Star,
  Trophy,
  Users,
  Wine
} from 'lucide-react';
// PAGESPEED FIX: Footer lazy loaded to reduce TBT
import { formatCurrency } from '@shared/formatters';
// PricingTable and TabbedPrivateCruisePricing are now lazy-loaded above
import SEOHead from '@/components/SEOHead';
import { Endorsement } from '@shared/schema';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
// ComparisonTable is now lazy-loaded above
import { type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
// PAGESPEED FIX: FeaturedSnippet removed (unused), QuickAnswerBox and RelatedServicesSection lazy loaded
// TBT OPTIMIZATION: InternalLinkHighlight, AIOptimizedSection, SectionReveal now lazy loaded
const InternalLinkHighlight = lazy(() => import('@/components/InternalLinkHighlight').then(m => ({ default: m.InternalLinkHighlight })));
const InternalLinkHighlightWithArrow = lazy(() => import('@/components/InternalLinkHighlight').then(m => ({ default: m.InternalLinkHighlightWithArrow })));
const AIOptimizedSection = lazy(() => import('@/components/AIOptimizedSection'));
const SectionReveal = lazy(() => import('@/components/SectionReveal').then(m => ({ default: m.SectionReveal })));

// PAGESPEED FIX: Lazy load ALL heavy below-fold components to reduce TBT and improve FCP
const PartyPlanningChecklist = lazy(() => import('@/components/PartyPlanningChecklist'));
const FleetSection = lazy(() => import('@/components/FleetSection'));
// PERFORMANCE: QuoteBuilderSection loaded eagerly (not lazy) so iframe starts loading immediately
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
const TabbedPrivateCruisePricingLazy = lazy(() => import('@/components/TabbedPrivateCruisePricing').then(m => ({ default: m.TabbedPrivateCruisePricing })));
const ComparisonTableLazy = lazy(() => import('@/components/ComparisonTable').then(m => ({ default: m.ComparisonTable })));
const PricingTableLazy = lazy(() => import('@/components/PricingTable').then(m => ({ default: m.PricingTable })));
// Additional lazy-loaded components for better TBT
const Footer = lazy(() => import('@/components/Footer'));
const QuickAnswerBoxGroup = lazy(() => import('@/components/QuickAnswerBox').then(m => ({ default: m.QuickAnswerBoxGroup })));
const RelatedServicesSection = lazy(() => import('@/components/RelatedServicesSection').then(m => ({ default: m.RelatedServicesSection })));
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
// Hero video - Clever Girl walkthrough
const heroVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4';
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
    startingPrice: '$800',
    priceNote: 'base price for 4-hour cruise',
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
    startingPrice: '$900',
    priceNote: 'base price for 4-hour cruise',
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
    startingPrice: '$1,000',
    priceNote: 'base price for 4-hour cruise',
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
    icon: Users,
    title: '150,000+ Happy Customers',
    description: 'We\'ve created unforgettable memories for 150,000+ guests with 5-star service since 2009.'
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
    icon: Music,
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
    answer: 'We offer two main experiences on Lake Travis: the ATX Disco Cruise (all-inclusive multi-group bachelor/bachelorette cruise with DJ, photographer, and open bar) and Private Charters (exclusive use of the entire boat for 14–75 people). Whether you call it a party boat, party barge, or charter cruise — our captained boats depart from Anderson Mill Marina with premium sound systems, cooler space, and a licensed crew. Perfect for bachelor parties, bachelorette parties, birthdays, corporate events, and weddings.'
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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
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
  
  // PAGESPEED: Removed isMobile state - now using <picture> srcset for responsive images (browser-native, no JS needed)

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

  // Hero video loaded handler - show video when ready
  const handleVideoLoadedData = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked - still show video
      });
    }
  };

  const handleVideoError = () => {
    setVideoFailed(true);
  };


  // Update page title for SEO
  useEffect(() => {
    document.title = 'Austin Party Boat Rentals on Lake Travis | Corporate | Bachelorette | Bachelor | Everyone';
    
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


  const scrollToQuoteBuilder = () => {
    document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-white dark:bg-gray-950" data-page-ready="home">
      <SEOHead
        pageRoute="/"
        defaultTitle="Austin Party Boat Rentals on Lake Travis | Corporate | Bachelorette | Bachelor | Everyone"
        defaultDescription="Austin party boat rentals on Lake Travis since 2009. BYOB bachelor parties, bachelorette cruises & private charters for 5-75 guests. DJ, photographer & floats included. Get a free quote!"
        defaultKeywords={['party boat Austin', 'party barge Austin', 'bachelorette party Austin', 'Austin boat rental', 'Lake Travis party boat', 'Lake Travis party barge', 'bachelor party Austin', 'party boat Lake Travis', 'Austin party barge', 'boat rental Lake Travis Austin']}
        schemaType="organization"
      />
      <LazyMotionProvider>
      <PublicNavigation />
      {/* Hero Section - PAGESPEED: Fixed height prevents CLS, poster-first prevents LCP delay */}
      <section id="hero" className="relative flex flex-col overflow-hidden bg-gray-900 pt-[116px]" style={{ minHeight: 'clamp(750px, 100vh, 1400px)', contain: 'layout paint' }}>
        {/* Hero Background: Video with image fallback */}
        <div className="absolute inset-0 z-0" style={{ aspectRatio: '16/9', minHeight: '100%' }}>
          {/* Fallback image - shows immediately, hidden when video loads */}
          <picture style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }}>
            <source 
              media="(max-width: 768px)" 
              srcSet={heroImage1Mobile}
              type="image/webp"
            />
            <source 
              media="(min-width: 769px)" 
              srcSet={heroImage1}
              type="image/webp"
            />
            <img
              src={heroImage1}
              alt="Lake Travis party boat cruise with happy guests celebrating"
              className="w-full h-full object-cover opacity-60"
              loading="eager"
              width={1920}
              height={1080}
              decoding="async"
              style={{ contentVisibility: 'auto' }}
              {...{ fetchpriority: "high" }}
            />
          </picture>
          {/* Hero Video - Clever Girl walkthrough, all devices */}
          {!videoFailed && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover opacity-80"
              style={{ display: videoLoaded ? 'block' : 'none' }}
              src={heroVideo}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              onLoadedData={handleVideoLoadedData}
              onError={handleVideoError}
              poster={heroImage1}
            />
          )}
          {/* Overlay: dark enough to read text, light enough to show video */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
          {/* Subtle blue brand tint */}
          <div className="absolute inset-0 bg-blue-900/10" />
        </div>


        {/* Hero Content - PAGESPEED: No m.div above fold */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-white flex-grow flex items-center">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo - CLS FIX: Fixed dimensions with srcset, no JS-based sizing to prevent hydration shift */}
            <div className="mb-8" style={{ minHeight: '80px' }}>
              <img 
                src={logoPath}
                srcSet={`${logoPathSmall} 80w, ${logoPathMedium} 140w, ${logoPath} 280w`}
                sizes="(max-width: 768px) 80px, 140px"
                alt="Party Boat Austin - Premier Party Cruises on Lake Travis" 
                className="h-20 md:h-24 w-auto mx-auto mb-6"
                loading="eager"
                width={140}
                height={140}
                data-testid="img-hero-logo"
                {...{ fetchpriority: "high" }}
              />
            </div>

            {/* Main Headline */}
            <div className="mb-8 md:mb-10">
              <h1 className="heading-unbounded text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-editable data-editable-id="hero-title">
                Austin's Favorite Party Boat Rentals on Lake Travis
              </h1>
              <h2 className="heading-unbounded text-lg sm:text-xl md:text-2xl text-brand-yellow font-semibold leading-relaxed" data-editable data-editable-id="hero-tagline">
                The trip your group will talk about for years — captained cruises for 5–75 people, all-inclusive packages, 150K+ happy guests since 2009
              </h2>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-7 rounded-xl shadow-2xl transition-all duration-300"
                  data-testid="button-hero-get-quote"
                >
                  <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  <span data-editable data-editable-id="hero-cta-quote">Check Availability</span>
                </Button>
              </div>
              
              <button
                onClick={scrollToQuoteBuilder}
                className="font-bold text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-5 rounded-xl border-2 border-white/70 text-white hover:bg-white/15 transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
                data-testid="button-hero-book-now"
              >
                <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span data-editable data-editable-id="hero-cta-book">Get a Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="relative z-20 w-full bg-black/60 backdrop-blur-sm py-3 px-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-sm text-white font-medium">
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-brand-yellow fill-brand-yellow" /> 4.9 on Google</span>
              <span className="hidden sm:inline">150,000+ Guests Served</span>
              <span>15+ Years in Austin</span>
              <span className="hidden md:inline">Perfect Safety Record</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
            {[
              { stat: '4.9★', label: 'Google Rating', Icon: Star },
              { stat: '150K+', label: 'Happy Guests', Icon: Users },
              { stat: '15+', label: 'Years in Austin', Icon: Trophy },
              { stat: 'Zero', label: 'Safety Incidents', Icon: Shield },
            ].map(({ stat, label, Icon }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 heading-unbounded">{stat}</div>
                <div className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section — Two Experiences */}
      <section id="services" className="bg-white dark:bg-gray-900">

        {/* ATX Disco Cruise — Photo Left, Text Right */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
              <LazyImage
                src={heroImage2}
                alt="ATX Disco Cruise bachelor bachelorette party Lake Travis Austin"
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-brand-yellow bg-brand-navy inline-block px-3 py-1 rounded self-start">
                From $85 / Person
              </p>
              <h2 className="heading-unbounded text-3xl sm:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                ATX Disco Cruise
              </h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
                The <em>only</em> multi-group all-inclusive <Suspense fallback="bachelor"><InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Party Austin">bachelor</InternalLinkHighlight></Suspense> and <Suspense fallback="bachelorette"><InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Party Austin">bachelorette party</InternalLinkHighlight></Suspense> cruise in the U.S. DJ, photographer, and open bar — everything included. Friday & Saturday on Lake Travis.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Professional DJ + on-board Photographer included',
                  'All-inclusive bar package — no BYOB needed',
                  'Groups of 8–30 people · March through October',
                  'Mix with other bach groups for maximum energy',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-yellow mt-0.5 flex-shrink-0" style={{ color: 'var(--brand-yellow)' }} />
                    <span className="text-gray-700 dark:text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                  <Button className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-5 rounded-xl text-base" data-testid="button-atx-disco-cta">
                    <Calendar className="mr-2 h-5 w-5" /> Check ATX Disco Dates
                  </Button>
                </div>
                <button onClick={scrollToQuoteBuilder} className="font-bold text-base px-6 py-5 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all">
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Private Charters — Text Left, Photo Right */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col justify-center lg:order-1 order-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-blue-600">
                Your Boat. Your Group. Your Rules.
              </p>
              <h2 className="heading-unbounded text-3xl sm:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                Private Charters
              </h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
                Rent the entire boat exclusively for your group. Perfect for <Suspense fallback="weddings"><InternalLinkHighlight href="/wedding-parties" title="Wedding Parties Lake Travis">weddings</InternalLinkHighlight></Suspense>, <Suspense fallback="birthdays"><InternalLinkHighlight href="/birthday-parties" title="Birthday Party Boat Austin">birthdays</InternalLinkHighlight></Suspense>, <Suspense fallback="corporate events"><InternalLinkHighlight href="/corporate-events" title="Corporate Events Lake Travis">corporate events</InternalLinkHighlight></Suspense>, and every celebration. 14–75 guests, 7 days a week, year-round.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '4 boats available · 14–75 guests · from $800 for 4 hours',
                  'BYOB or order direct alcohol delivery to the marina',
                  'Licensed captain + premium Bluetooth sound system',
                  'Anderson Mill Marina · Leander, TX · 30 min from Austin',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={scrollToQuoteBuilder} className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-5 rounded-xl text-base transition-all" data-testid="button-private-charter-quote">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5 inline" />
                </button>
                <Link href="/private-cruises">
                  <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-semibold px-6 py-5 rounded-xl" data-testid="button-private-charter-cta">
                    View Pricing & Fleet
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] lg:order-2 order-1">
              <LazyImage
                src={galleryImage3}
                alt="Clever Girl 75-person private charter boat Lake Travis Austin"
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

      </section>

      {/* Testimonials Section */}
      <SectionReveal id="testimonials">
        <section className="py-16 md:py-24 bg-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold heading-unbounded mb-1 text-gray-900 dark:text-white">
                What Our Customers Say
              </h2>
              <p className="text-gray-600 dark:text-gray-400">⭐ 420+ five-star reviews from real party-goers</p>
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
              <button
                onClick={scrollToQuoteBuilder}
                className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-10 py-5 rounded-xl shadow-lg text-base transition-all inline-flex items-center"
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </SectionReveal>


      {/* Quote Builder Section */}
      <div id="quote-builder">
        <QuoteBuilderSection title="Get Your Free Quote in 60 Seconds" />
      </div>

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
                        data-button-id="695186923c261203770cc2e7"
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

      {/* Booking & Availability Section */}
      <SectionReveal id="availability">
        <section className="py-10 md:py-14 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold heading-unbounded mb-4" data-editable data-editable-id="availability-main-title">Book Your Date on Lake Travis</h2>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-yellow flex-shrink-0" /> Available 7 days a week, year-round</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-yellow flex-shrink-0" /> Peak season (May–Sep): book 8–12 weeks ahead</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-yellow flex-shrink-0" /> Off-peak (Oct–Apr): more flexibility, best rates</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-yellow flex-shrink-0" /> ATX Disco Cruise: Friday &amp; Saturday nights only</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-yellow flex-shrink-0" /> Departs Anderson Mill Marina · 13993 FM2769 Leander TX</li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 min-w-[220px]">
                <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                  <Button className="w-full bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl text-base" data-testid="button-availability-cta">
                    <Calendar className="mr-2 h-5 w-5" /> Check Availability
                  </Button>
                </div>
                <a href="tel:+15124885892">
                  <Button variant="outline" className="w-full border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-base">
                    <Phone className="mr-2 h-5 w-5" /> (512) 488-5892
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="ghost" className="w-full text-blue-200 hover:text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl text-sm">
                    Send us a message →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Photo Gallery Section */}
      <SectionReveal id="gallery">
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">05</div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-semibold heading-unbounded text-center mb-1 text-gray-900 dark:text-white" data-editable data-editable-id="gallery-main-title">
                Experience the Premier Difference
              </h2>
              <InternalLinkHighlightWithArrow href="/gallery" title="View Our Fleet" className="text-sm">View Full Gallery</InternalLinkHighlightWithArrow>
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
                      <Image className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section — 2-Column Accordion */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900" id="faq">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold heading-unbounded mb-3 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need to know about cruising Lake Travis — click any question to expand
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-5xl mx-auto">
            {[
              {
                q: "What types of party boat services do you offer?",
                a: "Two main options on Lake Travis: the ATX Disco Cruise (all-inclusive multi-group party for 8–30 guests from $85/person with DJ + photographer) and Private Charters (exclusive boat rental for 5–75 guests from $800 for 4 hours). Both depart from Anderson Mill Marina."
              },
              {
                q: "How much does a Lake Travis party boat cost?",
                a: "Private charters start at $800 for 4 hours (up to 14 guests) — up to $2,660 for larger groups. The ATX Disco Cruise starts at $85/person all-inclusive. Weekend rates are slightly higher. All prices are before 8.25% tax and 20% gratuity."
              },
              {
                q: "Where do your boats depart from?",
                a: "All cruises depart from Anderson Mill Marina at 13993 FM2769, Leander TX 78641 — about 30 minutes from downtown Austin. Free parking available. Arrive 15–20 minutes before departure."
              },
              {
                q: "What's included in the price?",
                a: "Every cruise includes a licensed captain, premium Bluetooth sound system, and cooler space. BYOB allowed — bring your own ice and drinks, upgrade to Essentials/Ultimate packages for ice included, or order stocked-and-ready from Party On Delivery (delivers right to your boat)."
              },
              {
                q: "Can we bring our own alcohol?",
                a: "Yes! All cruises are BYOB. Bring your own ice and drinks, or order through Party On Delivery — our sister company delivers directly to your boat. The ATX Disco Cruise includes an all-inclusive bar package (no BYOB needed)."
              },
              {
                q: "Can you swim from the boats?",
                a: "Yes! We anchor at popular coves on Lake Travis where guests can jump off and swim. We provide lily pads for floating. Your captain knows the best spots based on that day's conditions."
              },
              {
                q: "What if it rains or weather is bad?",
                a: "Your captain can reschedule or cancel at their discretion. If cruise time is lost, a prorated refund applies. We monitor conditions closely and will contact you with concerns. Safety is always our top priority."
              },
              {
                q: "How far in advance should I book?",
                a: "Peak season (May–Sep): book 8–12 weeks ahead — weekends sell out fast. Off-peak (Oct–Apr): more flexibility and better rates. Deposits are 25% if booking 14+ days out, or 50% if booking within 14 days."
              },
              {
                q: "How many people fit on each boat?",
                a: "Day Tripper: up to 14 guests. Meeseeks & The Irony: up to 30 guests each. Flagship Clever Girl: up to 75 guests. We'll match you with the right boat for your group size and occasion."
              }
            ].map((faq, i) => (
              <Suspense key={i} fallback={null}>
                <Collapsible open={openFaq === i} onOpenChange={(open) => setOpenFaq(open ? i : null)}>
                  <CollapsibleTrigger asChild>
                    <button className="flex justify-between items-center w-full p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:border-brand-yellow hover:shadow-sm transition-all">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
                      <ChevronDown className={cn("h-4 w-4 text-gray-500 flex-shrink-0 transition-transform duration-200", openFaq === i && "rotate-180")} />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 py-3 bg-white dark:bg-gray-800 border-x border-b border-gray-200 dark:border-gray-700 rounded-b-xl text-sm text-gray-600 dark:text-gray-300 leading-relaxed -mt-1">
                      {faq.a}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <SectionReveal id="contact">
        <section className="py-10 md:py-14 bg-brand-yellow">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold heading-unbounded mb-3 text-gray-900" data-editable data-editable-id="contact-main-title">
              Ready to Set Sail?
            </h2>
            <p className="text-gray-800 mb-8 max-w-xl mx-auto" data-editable data-editable-id="contact-description">
              Austin's favorite party cruise since 2009 — let's plan your unforgettable Lake Travis experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl text-base" data-testid="button-contact-book">
                  <Calendar className="mr-2 h-5 w-5" /> Book Online Now
                </Button>
              </div>
              <Link href="/chat">
                <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900/10 font-bold px-8 py-4 rounded-xl text-base">
                  <Phone className="mr-2 h-5 w-5" /> Chat for a Custom Quote
                </Button>
              </Link>
              <a href="tel:+15124885892">
                <Button variant="ghost" className="text-gray-800 hover:bg-gray-900/10 font-semibold px-6 py-3 rounded-xl">
                  Call (512) 488-5892
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Anderson Mill Marina, Leander TX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:clientservices@premierpartycruises.com" className="hover:text-gray-900 hover:underline" data-editable data-editable-id="contact-email-address">clientservices@premierpartycruises.com</a>
              </div>
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

      {/* Internal Links Strip */}
      <section className="py-6 bg-gray-900 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/atx-disco-cruise" className="hover:text-brand-yellow transition-colors">ATX Disco Cruise</Link>
            <Link href="/private-cruises" className="hover:text-brand-yellow transition-colors">Private Cruises</Link>
            <Link href="/bachelor-party-austin" className="hover:text-brand-yellow transition-colors" data-testid="link-bachelor-from-home">Bachelor Party Austin</Link>
            <Link href="/bachelorette-party-austin" className="hover:text-brand-yellow transition-colors" data-testid="link-bachelorette-from-home">Bachelorette Party Austin</Link>
            <Link href="/combined-bachelor-bachelorette-austin" className="hover:text-brand-yellow transition-colors" data-testid="link-combined-from-home">Combined Bach Party</Link>
            <Link href="/wedding-parties" className="hover:text-brand-yellow transition-colors" data-testid="link-wedding-from-home">Wedding Parties</Link>
            <Link href="/birthday-parties" className="hover:text-brand-yellow transition-colors">Birthday Parties</Link>
            <Link href="/celebration-cruises" className="hover:text-brand-yellow transition-colors" data-testid="link-celebration-from-home">Celebration Cruises</Link>
            <Link href="/corporate-events" className="hover:text-brand-yellow transition-colors" data-testid="link-client-entertainment-from-home">Corporate Events</Link>
            <Link href="/party-boat-lake-travis" className="hover:text-brand-yellow transition-colors" data-testid="link-party-boat-from-home">Party Boat Lake Travis</Link>
            <Link href="/gallery" className="hover:text-brand-yellow transition-colors" data-testid="link-gallery-from-home">Gallery</Link>
            <Link href="/blogs" className="hover:text-brand-yellow transition-colors" data-testid="link-blogs-from-home">Blog & Tips</Link>
            <Link href="/contact" className="hover:text-brand-yellow transition-colors" data-testid="link-contact-from-home">Contact</Link>
          </div>
        </div>
      </section>

      {/* NOTE: All structured data (Organization, Service, Product, FAQ, etc.) is handled by SSR via schemaLoader.ts
          to avoid duplicate/conflicting schemas and Google Search Console errors.
          SSR schemas loaded: homepage/organization.jsonld, homepage/faq.jsonld, homepage/service-private.jsonld,
          homepage/service-disco.jsonld, homepage/service-daytripper.jsonld, homepage/service-meeseeks.jsonld,
          homepage/service-clevergirl.jsonld */}
      {/* AI-Optimized Location & Entity Recognition Section */}
      <section className="py-8 bg-gray-50 dark:from-blue-950/20 dark:to-green-950/20">
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

      {/* Footer */}
      <Suspense fallback={<div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" style={{ minHeight: '400px' }} />}>
        <Footer />
      </Suspense>
      </LazyMotionProvider>
    </div>
  );
}