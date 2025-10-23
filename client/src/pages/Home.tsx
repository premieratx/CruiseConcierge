import { useState, useEffect, useRef, lazy, Suspense, FormEvent } from 'react';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LazyImage } from '@/components/LazyImage';
import logoPath from '@assets/PPC-Logo-LARGE.webp';
// Lazy load icons to reduce bundle size
import Ship from 'lucide-react/dist/esm/icons/ship';
import Users from 'lucide-react/dist/esm/icons/users';
import Clock from 'lucide-react/dist/esm/icons/clock';
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import Star from 'lucide-react/dist/esm/icons/star';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Crown from 'lucide-react/dist/esm/icons/crown';
import Music from 'lucide-react/dist/esm/icons/music';
import Anchor from 'lucide-react/dist/esm/icons/anchor';
import Waves from 'lucide-react/dist/esm/icons/waves';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Camera from 'lucide-react/dist/esm/icons/camera';
import PartyPopper from 'lucide-react/dist/esm/icons/party-popper';
import Sun from 'lucide-react/dist/esm/icons/sun';
import Trophy from 'lucide-react/dist/esm/icons/trophy';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Award from 'lucide-react/dist/esm/icons/award';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Facebook from 'lucide-react/dist/esm/icons/facebook';
import Twitter from 'lucide-react/dist/esm/icons/twitter';
import Quote from 'lucide-react/dist/esm/icons/quote';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import Navigation from 'lucide-react/dist/esm/icons/navigation';
import Compass from 'lucide-react/dist/esm/icons/compass';
import LifeBuoy from 'lucide-react/dist/esm/icons/life-buoy';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Target from 'lucide-react/dist/esm/icons/target';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Play from 'lucide-react/dist/esm/icons/play';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';
import Headphones from 'lucide-react/dist/esm/icons/headphones';
import Car from 'lucide-react/dist/esm/icons/car';
import Wine from 'lucide-react/dist/esm/icons/wine';
import CameraIcon from 'lucide-react/dist/esm/icons/camera';
import UserCheck from 'lucide-react/dist/esm/icons/user-check';
import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import X from 'lucide-react/dist/esm/icons/x';
import Eye from 'lucide-react/dist/esm/icons/eye';
import Image from 'lucide-react/dist/esm/icons/image';
import Bot from 'lucide-react/dist/esm/icons/bot';
import Snowflake from 'lucide-react/dist/esm/icons/snowflake';
import Leaf from 'lucide-react/dist/esm/icons/leaf';
import Footer from '@/components/Footer';
import { formatCurrency } from '@shared/formatters';
import { PricingTable } from '@/components/PricingTable';
import { TabbedPrivateCruisePricing } from '@/components/TabbedPrivateCruisePricing';
import { DiscoCruisePricing } from '@/components/DiscoCruisePricing';
import SEOHead from '@/components/SEOHead';
import { Endorsement } from '@shared/schema';
import { QuickDealHighlight } from '@/components/DiscoVsPrivateComparison';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
import { FeaturedSnippet } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { SectionReveal } from '@/components/SectionReveal';

// Lazy load heavy components to improve FCP
const DiscoVsPrivateComparison = lazy(() => import('@/components/DiscoVsPrivateComparison').then(mod => ({ default: mod.DiscoVsPrivateComparison })));
const PartyPlanningChecklist = lazy(() => import('@/components/PartyPlanningChecklist'));
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

// Hero and gallery images - Optimized WebP format for fast loading
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/atx-disco-cruise-party.webp';
import heroImage3 from '@assets/dancing-party-scene.webp';
import galleryImage1 from '@assets/day-tripper-14-person-boat.webp';
import galleryImage2 from '@assets/meeseeks-25-person-boat.webp';
import galleryImage3 from '@assets/clever-girl-50-person-boat.webp';

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
    description: (
      <>
        Austin's premier bachelorette party experience! Join the <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">ATX Disco Cruise</InternalLinkHighlight> or book a <InternalLinkHighlight href="/private-cruises" title="Private Charter">private charter</InternalLinkHighlight>. Professional DJ, photographer, and everything needed for an unforgettable celebration.
      </>
    ),
    features: ['Basic Bach, Disco Queen, or Platinum packages', 'Professional DJ & photographer', 'Giant unicorn floats & party supplies', 'BYOB with coolers & ice'],
    startingPrice: `$${DISCO_PRICING.basic / 100}`,
    priceNote: 'per person',
    icon: PartyPopper,
    image: galleryImage3,
    badge: 'Our Specialty',
    gallery: [galleryImage3, heroImage1, galleryImage2, heroImage2],
    detailedDescription: 'We\'ve been Austin\'s #1 bachelorette party destination since 2009! Choose from our signature ATX Disco Cruise packages (Basic Bach, Disco Queen, or Platinum) or book a private charter. Every bachelorette experience includes professional DJ, photographer, giant floats, and party supplies to make the bride\'s celebration absolutely perfect.',
    highlights: ['Austin\'s #1 Since 2009', 'Basic Bach, Disco Queen & Platinum', 'Professional DJ & Photographer', 'Giant Floats & Party Supplies', 'BYOB with Coolers & Ice', 'ATX Disco or Private Options', 'Multi-Group Party Atmosphere']
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
    features: ['"Clever Girl" flagship boat available', 'Professional atmosphere & service', 'Customizable catering options', 'Up to 75 guests capacity', 'BYOB allowed'],
    startingPrice: `$${HOURLY_RATES.MON_THU[50] / 100}`,
    hourlyNote: 'per hour (4-hour minimum)',
    icon: Users,
    image: galleryImage1,
    gallery: [galleryImage1, galleryImage3, heroImage1, galleryImage2],
    detailedDescription: 'Elevate your corporate events with premium Lake Travis experiences aboard our flagship boats. Perfect for client entertainment, company celebrations, and executive retreats. Our professional crew ensures a sophisticated atmosphere while our spacious boats provide the perfect setting for business networking.',
    highlights: ['Flagship "Clever Girl" Available', 'Professional Business Atmosphere', 'Up to 75 Guests', 'Customizable Catering Options', 'BYOB Allowed', 'Client Entertainment Perfect', 'Executive Retreat Setting']
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
  const reducedMotion = useReducedMotion();
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

  // Fetch homepage endorsements with aggressive caching
  const { data: endorsements } = useQuery<Endorsement[]>({
    queryKey: ['/api/endorsements/homepage'],
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/"
        defaultTitle="Party Boat Austin"
        defaultDescription="Lake Travis party boats since 2009. ATX Disco Cruise, bachelor parties, private charters. 100K+ guests. Call (512) 488-5892."
        defaultKeywords={['party boat Austin', 'bachelorette party Austin', 'Austin boat rental', 'Lake Travis party boat', 'bachelor party Austin']}
        schemaType="organization"
      />
      <PublicNavigation onBookNowClick={() => setShowBookingModal(true)} />
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background with smooth crossfade */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentHeroImage ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ pointerEvents: index === currentHeroImage ? 'auto' : 'none' }}
            >
              <LazyImage 
                src={image}
                alt="Party boat on Lake Travis Austin - Premier Party Cruises with guests celebrating bachelor and bachelorette parties"
                className="w-full h-full object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white flex-grow flex items-center">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? false : "visible"}
            variants={reducedMotion ? undefined : staggerChildren}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div variants={reducedMotion ? undefined : fadeInUp} className="mb-8">
              <LazyImage 
                src={logoPath} 
                alt="Party Boat Austin - Premier Party Cruises on Lake Travis" 
                className="h-20 md:h-24 mx-auto mb-6"
                priority={true}
                data-testid="img-hero-logo"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={reducedMotion ? undefined : fadeInUp} className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold font-playfair mb-6 leading-tight" data-editable data-editable-id="hero-title">
                Austin Party Boat Rentals on Lake Travis
              </h1>
              <p className="text-xl md:text-2xl text-brand-yellow font-semibold leading-relaxed" data-editable data-editable-id="hero-tagline">
                Premier Party Cruises - Austin's Ultimate Lake Travis Experience Since 2009
              </p>
            </motion.div>

            {/* Subheadline with Pricing Value Proposition */}
            <motion.p 
              variants={reducedMotion ? undefined : fadeInUp}
              className="text-base mb-8 text-gray-100 max-w-4xl mx-auto leading-relaxed"
              data-editable data-editable-id="hero-description"
            >
              Experience Austin's ultimate Lake Travis adventure with the most trusted party cruise company since 2009. 
              From <InternalLinkHighlight href="/private-cruises" title="Private Cruises">intimate 14-person private cruises</InternalLinkHighlight> on "Day Tripper" to epic 75-person celebrations on flagship "Clever Girl" - 
              perfect for <InternalLinkHighlight href="/bachelor-party" title="Bachelor Parties">bachelor parties</InternalLinkHighlight>, <InternalLinkHighlight href="/bachelorette-party" title="Bachelorette Parties">bachelorette celebrations</InternalLinkHighlight>, and <InternalLinkHighlight href="/corporate-events" title="Corporate Events">corporate team building</InternalLinkHighlight>.
            </motion.p>

            {/* Pricing Value Proposition */}
            <motion.div 
              variants={reducedMotion ? undefined : fadeInUp}
              className="bg-white border border-gray-200 rounded-xl p-6 max-w-3xl mx-auto mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <div className="font-sans tracking-wider font-bold uppercase text-sm text-blue-600 mb-2" data-editable data-editable-id="pricing-overlay-private-label">PRIVATE CRUISES FROM</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1" data-editable data-editable-id="pricing-overlay-private-price">
                    ${HOURLY_RATES.MON_THU[14] / 100} per hour
                  </div>
                  <div className="text-sm text-gray-700" data-editable data-editable-id="pricing-overlay-private-subtitle">Weekdays • 14+ people</div>
                </div>
                <div>
                  <div className="font-sans tracking-wider font-bold uppercase text-sm text-blue-600 mb-2" data-editable data-editable-id="pricing-overlay-disco-label">DISCO CRUISES</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1" data-editable data-editable-id="pricing-overlay-disco-price">
                    ${pricingHighlights[1].weekdayFrom}/person
                  </div>
                  <div className="text-sm text-gray-700" data-editable data-editable-id="pricing-overlay-disco-subtitle">Friday & Saturday</div>
                </div>
              </div>
              <div className="text-center mt-4 text-sm text-blue-600 font-medium" data-editable data-editable-id="pricing-overlay-tagline">
                ✨ Transparent pricing • No hidden fees • Best value guaranteed
              </div>
            </motion.div>

            {/* Key Features with Pricing */}
            <motion.div 
              variants={reducedMotion ? undefined : fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-sans tracking-wider font-bold uppercase text-sm" data-editable data-editable-id="hero-badge-marina">Anderson Mill Marina</span>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-sans tracking-wider font-bold uppercase text-sm" data-editable data-editable-id="hero-badge-boats">4 Awesome Boats</span>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-sans tracking-wider font-bold uppercase text-sm whitespace-nowrap" data-editable data-editable-id="hero-badge-pricing">From ${HOURLY_RATES.MON_THU[14] / 100} per hour</span>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-sans tracking-wider font-bold uppercase text-sm" data-editable data-editable-id="hero-badge-disco">ATX Disco Fri/Sat</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={reducedMotion ? undefined : fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl px-12 py-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-testid="button-hero-book-now"
              >
                <Calendar className="mr-3 h-6 w-6 flex-shrink-0" />
                <span data-editable data-editable-id="hero-cta-book">BOOK YOUR CRUISE</span>
                <ArrowRight className="ml-3 h-6 w-6 flex-shrink-0" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleGetQuote()}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-xl px-12 py-8 rounded-xl backdrop-blur-sm"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-3 h-6 w-6 flex-shrink-0" />
                <span data-editable data-editable-id="hero-cta-quote">GET FREE QUOTE</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-base font-semibold">
              ✨ <span className="text-brand-blue">Transparent Pricing</span> • No Hidden Fees • <span className="text-brand-blue">Best Value</span> Guaranteed ✨
            </p>
          </div>
        </div>
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
              className="text-3xl font-semibold font-playfair text-center mb-6 text-white"
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
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 lg:py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide whitespace-normal min-h-[3.5rem] sm:min-h-[4rem]"
                data-testid="button-build-quote"
              >
                <Sparkles className="mr-2 sm:mr-2 md:mr-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 flex-shrink-0" />
                <span data-editable data-editable-id="quote-builder-button" className="text-center leading-tight">Start Building Your Quote</span>
                <ArrowRight className="ml-2 sm:ml-2 md:ml-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 flex-shrink-0" />
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
      <SectionReveal>
        <section id="services" className="py-24 bg-white dark:bg-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">01</div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="services-main-title">
                Choose Your Perfect Experience
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto" data-editable data-editable-id="services-description">
                From intimate celebrations to epic disco parties, we have the perfect cruise experience 
                for every group size and occasion.
              </p>
            </div>

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

                    <div className="text-center pt-4">
                      <div className="text-sm text-gray-600 mb-2" data-editable data-editable-id={`service-${service.id}-price-label`}>Starting from</div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-editable data-editable-id={`service-${service.id}-price`}>
                        {service.startingPrice}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-4" data-editable data-editable-id={`service-${service.id}-price-note`}>
                        {service.hourlyNote || service.priceNote || ''}
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl"
                        onClick={() => {
                          // Handle specific service booking with package context
                          switch(service.id) {
                            case 'private':
                              handleGetQuote('private-cruise', 'general');
                              break;
                            case 'bachelor':
                              handleGetQuote('disco-cruise', 'bachelorette');
                              break;
                            case 'disco':
                              handleGetQuote('disco-cruise', 'general');
                              break;
                            case 'corporate':
                              handleGetQuote('private-cruise', 'corporate');
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
      </SectionReveal>

      {/* Pricing & Packages Section - MOVED UP FOR PROMINENCE */}
      <SectionReveal>
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 relative" id="pricing">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-20">02</div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <DollarSign className="h-4 w-4 mr-2 inline" />
                Transparent Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white leading-tight">
                Pricing & Packages
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Find the perfect Lake Travis cruise for your budget and group size - transparent pricing with no hidden fees
              </p>
            </div>

            {/* ATX Disco Cruise Pricing */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 font-semibold">
                  <Music className="h-4 w-4 mr-2 inline" />
                  ATX Disco Cruise
                </Badge>
                <h3 className="text-3xl font-semibold font-playfair mb-4 text-gray-900 dark:text-white">
                  Multi-Group Bachelor/Bachelorette Party Cruise
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  The ONLY all-inclusive, multi-group bach party cruise in the United States. DJ, photographer, and giant floats all included!
                </p>
              </div>
              <DiscoCruisePricing />
            </div>

            {/* Private Cruise Detailed Pricing */}
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
                  Choose your boat size and package level. All packages include professional captain, crew, premium sound system, and coolers with ice.
                </p>
              </div>
              <TabbedPrivateCruisePricing dayType="SATURDAY" duration={4} />
            </div>

            {/* All Services Overview Comparison */}
            <div className="mb-16">
              <h3 className="text-3xl font-semibold font-playfair text-center mb-8 text-gray-900 dark:text-white">
                Compare All Our Services
              </h3>
              <PricingTable
                title="All Services Overview"
                items={[
                  {
                    name: 'ATX Disco Cruise',
                    basePrice: 85,
                    pricingType: 'person',
                    description: 'Public party cruises with DJ and dancing',
                    features: [
                      'Per-person tickets',
                      'DJ and dance floor',
                      'Professional photographer',
                      'Party favors included',
                      'Friday & Saturday cruises'
                    ],
                    capacity: 'Groups of 8-30',
                    duration: '4 hours',
                    priceNote: '$85-105 per person',
                    ctaText: 'View Disco Packages',
                    ctaHref: '/atx-disco-cruise'
                  },
                  {
                    name: 'Private Cruises',
                    basePrice: 200,
                    pricingType: 'hour',
                    description: 'Exclusive boat rental for your group',
                    features: [
                      '4-hour minimum',
                      'Choose your boat (14-75 capacity)',
                      'BYOB allowed',
                      'Customizable packages',
                      '7 days a week'
                    ],
                    capacity: '14-75 guests',
                    duration: '4+ hours',
                    priceNote: '$200-350/hour',
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
                      'Catering partnerships',
                      'BYOB allowed',
                      'Tax deductible'
                    ],
                    capacity: '14-75 guests',
                    duration: '4+ hours',
                    priceNote: 'Starting at $225/hr',
                    ctaText: 'Plan Corporate Event',
                    ctaHref: '/client-entertainment'
                  }
                ]}
              />
            </div>

            {/* Seasonal Pricing Note */}
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Pricing Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-left">
                  <h4 className="font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                    Peak Season (May - September)
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                    <li>• Weekend rates 20-25% higher</li>
                    <li>• Holiday premium pricing</li>
                    <li>• Book 4-6 weeks in advance</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                    Off-Peak Season (October - April)
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                    <li>• Standard weekday rates</li>
                    <li>• More availability</li>
                    <li>• Best value deals</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  All prices subject to 8.25% tax. 20% gratuity recommended. 50% deposit required to secure booking.
                  <br />
                  <span className="font-semibold text-brand-blue">✨ Price Match Guarantee - Best Value on Lake Travis Guaranteed</span>
                </p>
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
                      <LazyImage
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
                      
                      <Button 
                        onClick={handleLightboxBookNow}
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
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-20">03</div>
          <div className="container mx-auto px-6">
            <Collapsible className="max-w-7xl mx-auto" defaultOpen={false}>
              <div className="text-center mb-8">
                <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Calendar className="h-4 w-4 mr-2 inline" />
                  Availability & Booking
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white leading-tight" data-editable data-editable-id="availability-main-title">
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
                    High demand season - book 2-4 weeks in advance
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
                    Every Saturday 12pm-4pm during peak season
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
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">7pm - 11pm</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id="timeslot-evening-description">
                      Sunset views and night celebrations
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
                      Book 4-6 weeks in advance, especially for ATX Disco Cruises on weekends during peak season
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
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                data-testid="button-check-availability"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Check Availability & Book Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                <Phone className="inline h-4 w-4 mr-1" />
                Or call us at <a href="tel:5124885892" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">(512) 488-5892</a>
              </p>
            </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>
      </SectionReveal>

      {/* Benefits of Booking with Premier Section */}
      <SectionReveal id="why-choose-us">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-20">04</div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Award className="h-4 w-4 mr-2 inline" />
                Why Book With Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white leading-tight" data-editable data-editable-id="why-choose-main-title">
                Benefits of Booking with Premier
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="why-choose-description">
                Austin's most trusted party cruise company with unmatched experience, safety, and service since 2009
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="text-center bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all min-h-[250px] flex flex-col"
                >
                  <div className="p-4 bg-blue-100 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white" data-editable data-editable-id={`why-choose-item-${index}-title`}>
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 flex-grow" data-editable data-editable-id={`why-choose-item-${index}-description`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center"
                    data-testid={`stat-${index}`}
                  >
                    <div className="p-4 bg-blue-100 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white" data-editable data-editable-id={`stat-${index}-value`}>
                      {stat.value}
                    </div>
                    <div className="text-base text-gray-700 dark:text-gray-300 font-medium" data-editable data-editable-id={`stat-${index}-label`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Photo Gallery Section */}
      <SectionReveal id="gallery">
        <section className="py-24 bg-blue-50/30 dark:bg-gray-900 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">05</div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="gallery-main-title">
                Experience the Premier Difference
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6" data-editable data-editable-id="gallery-description">
                See why 125,000+ customers choose Premier Party Cruises for their unforgettable Lake Travis experience.
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
        <section className="py-24 bg-white dark:bg-gray-800 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">06</div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900 dark:text-white">
                Compare Your Options
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                Compare our cruise options and boat fleet to find the perfect fit for your celebration
              </p>
            </div>

          {/* Disco vs Private Comparison */}
          <motion.div 
            variants={fadeInUp}
            className="mb-16 max-w-5xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
              ATX Disco Cruise vs Private Charter
            </h3>
            <ComparisonTable
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
                    { text: '$85-$125 per person', highlight: true },
                    '$200-$400+ per hour'
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
                  values: ['Fri, Sat, Sun only', '7 days a week']
                }
              ]}
              caption="ATX Disco Cruise vs Private Charter Comparison"
              summary="Compare the features and benefits of our ATX Disco Cruise public party experience versus a private charter boat rental on Lake Travis"
              mobileView="cards"
              schemaType="Service"
              ariaLabel="Comparison of ATX Disco Cruise and Private Charter options"
              highlightBest={true}
            />
          </motion.div>

          {/* Fleet Comparison */}
          <motion.div 
            variants={fadeInUp}
            className="max-w-7xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
              Our Lake Travis Fleet
            </h3>
            <ComparisonTable
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
                  values: ['Up to 14 guests', '15-25 guests', '30-75 guests', '15-30 guests']
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
                  feature: 'Hourly Rate',
                  values: [
                    { text: '$200/hr', highlight: true },
                    '$225/hr',
                    '$300/hr',
                    '$225/hr'
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
          </motion.div>
          </div>
        </section>
      </SectionReveal>

      {/* Testimonials Section */}
      <SectionReveal id="testimonials">
        <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-white opacity-10">07</div>
          <div className="container mx-auto px-6">
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
                answer: "You should bring your own alcohol (we're BYOB), towels, sunscreen, and snacks. We provide coolers with ice, cups, and Bluetooth speakers. For ATX Disco Cruises, just bring your drinks - we handle everything else including party supplies and music. Don't forget your ID and swimsuit!",
                category: "What to Bring"
              },
              {
                question: "How does your party boat rental process work?",
                answer: "First, you check availability for your date online. Then you choose between our ATX Disco Cruise (shared party) or a private charter. You'll pay a deposit to secure your booking, receive confirmation via email, and show up at Anderson Mill Marina on Lake Travis 15 minutes before departure. Your captain handles everything else!",
                category: "Booking Process"
              },
              {
                question: "What happens if it rains on your scheduled cruise date?",
                answer: "For Private Cruises: Your captain can reschedule or cancel at their discretion. If any cruise time is lost, a prorated refund will be applied. For ATX Disco Cruises: You have 48 hours after booking to cancel for a refund. After 48 hours, no refunds are available. If weather conditions are unsafe (determined day-of by captain and management), we offer the Lemonade Disco as a backup indoor party option.",
                category: "Weather Policy"
              },
              {
                question: "Can you swim from your party boats?",
                answer: "Yes! You can swim at designated swimming areas on Lake Travis. We anchor at popular coves like Devil's Cove where you can jump off the boat and enjoy the water. We provide lily pads for floating. Your captain knows the best spots based on conditions that day.",
                category: "Swimming"
              },
              {
                question: "How many people fit on your boats?",
                answer: "Your group size determines which boat: Day Tripper holds up to 14 people (perfect for intimate gatherings), Meeseeks accommodates 25 people (ideal for birthday parties), and our flagship Clever Girl holds up to 75 people (great for large corporate events or weddings). ATX Disco Cruises combine multiple groups on larger boats.",
                category: "Capacity"
              }
            ]}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Contact & CTA Section */}
      <SectionReveal id="contact">
        <section className="py-24 bg-blue-50/30 dark:bg-gray-950 relative">
          <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">07</div>
          <div className="container mx-auto px-6">
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
            <motion.div
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
            </motion.div>

            {/* Contact Info & Quick Actions */}
            <motion.div
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
                    onClick={() => navigate('/chat?type=general')}
                    size="lg"
                    className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold py-4 text-base rounded-xl tracking-wide"
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

            </motion.div>
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

            <Link href="/combined-bachelor-bachelorette-austin" data-testid="link-combined-from-home">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Combined Parties</CardTitle>
                  <p className="text-gray-700 dark:text-gray-300">Bachelor and bachelorette together on Lake Travis</p>
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
            Austin's #1 bachelorette party experience since 2009! Join our famous ATX Disco Cruise or book a private charter. Professional DJ, photographer, giant floats, and party supplies. Perfect for bachelorette parties and bachelor parties on Lake Travis.
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
            <li>Giant unicorn floats and party supplies</li>
            <li>BYOB with coolers and ice</li>
            <li>Friday and Saturday cruises</li>
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
          <h3 itemProp="name">Corporate Events - Austin Lake Travis Experiences</h3>
          <p itemProp="description">
            Premium corporate event experiences on Lake Travis. Perfect for client entertainment, company celebrations, and executive retreats aboard our flagship boats with professional service.
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
            <li>BYOB allowed for corporate events</li>
            <li>Transportation partnerships available</li>
            <li>Client entertainment packages</li>
            <li>Executive retreat setting</li>
            <li>Up to 75 guests capacity</li>
          </ul>
        </div>
        
        {/* Fleet Details */}
        <h2>Premier Austin Party Boat Fleet</h2>
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Day Tripper - 14 Person Party Boat</h3>
          <img itemProp="image" src="https://premierpartycruises.com/assets/daytripper.jpg" alt="Day Tripper 14-person party boat" style={{display: 'none'}} />
          <p itemProp="description">
            Intimate 14-person party boat perfect for small celebrations and private groups on Lake Travis. Features professional captain, premium sound system, coolers with ice, and comfortable seating.
          </p>
          <span itemProp="capacity">14 passengers</span>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="price" content="200" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <meta itemProp="url" content="https://premierpartycruises.com/private-cruises" />
          </div>
          <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content="5" />
            <meta itemProp="reviewCount" content="100000" />
          </div>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Me Seeks the Irony - 25 Person Party Boat</h3>
          <img itemProp="image" src="https://premierpartycruises.com/assets/meeseeks.jpg" alt="Meeseeks 25-person party boat" style={{display: 'none'}} />
          <p itemProp="description">
            Popular 25-person party boat (seating for 18-25 guests) ideal for medium-sized celebrations on Lake Travis. Premium amenities, professional crew, and excellent sound system for the perfect Austin party boat experience.
          </p>
          <span itemProp="capacity">25 passengers (18-25 seating)</span>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="price" content="225" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <meta itemProp="url" content="https://premierpartycruises.com/private-cruises" />
          </div>
          <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content="5" />
            <meta itemProp="reviewCount" content="100000" />
          </div>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Clever Girl - 50 Person Flagship Party Boat</h3>
          <img itemProp="image" src="https://premierpartycruises.com/assets/clevergirl.jpg" alt="Clever Girl 50-person flagship party boat" style={{display: 'none'}} />
          <p itemProp="description">
            Flagship 50-person party boat (seating for 35-50 guests) featuring giant Texas flag and 14 disco balls. Austin's premiere party boat for large celebrations, corporate events, and unforgettable Lake Travis experiences.
          </p>
          <span itemProp="capacity">50 passengers (35-50 seating)</span>
          <span itemProp="feature">Giant Texas flag, 14 disco balls, premium sound system</span>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="price" content="250" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <meta itemProp="url" content="https://premierpartycruises.com/private-cruises" />
          </div>
          <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content="5" />
            <meta itemProp="reviewCount" content="100000" />
          </div>
        </div>
        
        {/* Pricing Information */}
        <h2>Austin Party Boat Rental Pricing</h2>
        <div itemScope itemType="https://schema.org/Offer">
          <h3>Private Charter Hourly Rates</h3>
          <p>Day Tripper (14 guests): Starting at $200/hour (Monday-Thursday), $250/hour (Friday-Sunday)</p>
          <p>Meeseeks & The Irony (15-30 guests): Starting at $225/hour (Monday-Thursday), $300/hour (Friday-Sunday)</p>
          <p>Clever Girl (30-75 guests): Starting at $300/hour (Monday-Thursday), $350/hour (Friday-Sunday)</p>
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
                value: "125,000+", 
                label: "Happy Customers", 
                icon: <Users className="w-8 h-8" />,
                itemProp: "numberOfCustomers"
              },
              { 
                value: "14+", 
                label: "Years in Business", 
                icon: <Trophy className="w-8 h-8" />,
                itemProp: "yearsFounded"
              },
              { 
                value: "4", 
                label: "Premium Boats", 
                icon: <Ship className="w-8 h-8" />,
                itemProp: "numberOfBoats"
              },
              { 
                value: "75", 
                label: "Max Capacity", 
                icon: <Users className="w-8 h-8" />,
                itemProp: "maxCapacity"
              },
              { 
                value: "4.9/5", 
                label: "Average Rating", 
                icon: <Star className="w-8 h-8" />,
                itemProp: "ratingValue"
              }
            ]}
            className="max-w-6xl mx-auto"
            schemaType="Organization"
            structuredData={{
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Premier Party Cruises",
              "description": "Austin's premier party boat rental company on Lake Travis",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Austin",
                "addressRegion": "Texas",
                "postalCode": "78641"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "125000"
              }
            }}
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
                description: "Rent an entire boat exclusively for your group. Choose from Day Tripper (14 people), Meeseeks (25 people), or Clever Girl (75 people). Starting at $200/hour with 4-hour minimum.",
                icon: <Ship className="w-6 h-6" />
              },
              {
                title: "Bachelor Party Packages - Austin's #1 Choice",
                description: "Specialized bachelor party experiences with professional DJ, photographer, and giant floats. Available as ATX Disco Cruise or private charter options.",
                icon: <Crown className="w-6 h-6" />
              },
              {
                title: "Bachelorette Party Cruises - Celebrate in Style",
                description: "Premium bachelorette party packages with mimosa supplies, decorations, and professional photography. Bride cruises free with Disco Queen and Platinum packages.",
                icon: <Heart className="w-6 h-6" />
              },
              {
                title: "Corporate Events - Professional Lake Travis Experiences",
                description: "Client entertainment and company celebrations on our flagship boats. Professional service, customizable catering, and capacity up to 75 guests.",
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
                answer: 'Yes, BYOB is allowed on all our Lake Travis cruises! Bring your favorite beverages - we provide large coolers with ice, cups, and all necessary supplies. Our crews help with loading/unloading, and we can arrange alcohol delivery directly to the boat for your convenience.',
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
    </div>
  );
}