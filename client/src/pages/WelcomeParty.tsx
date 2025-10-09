import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { 
  PartyPopper, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Music, Utensils,
  Star, Shield, Gift, MessageSquare, Wine, GlassWater,
  Mic, Crown, Award, Quote, ChevronRight, Ship,
  Anchor, Sun, Info, TrendingUp, Plane, Heart, Smile, X,
  DollarSign, CalendarClock, MapPinned, Hotel, Bus, Handshake,
  ClipboardCheck, Mic2, Volume2, Wallet, TrendingDown, Megaphone,
  Navigation, Timer, Coffee, Sunset
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/meeseeks-25-person-boat.jpg';
import heroImage3 from '@assets/atx-disco-cruise-party.jpg';
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';

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

// Enhanced Wedding Welcome Party packages with detailed tiers
const welcomePackages = [
  {
    id: 'casual',
    name: 'Casual Welcome',
    guestCapacity: '25-30 guests',
    basePrice: 1500,
    priceRange: '$1,500 - $2,200',
    description: 'Budget-friendly welcome party perfect for intimate gatherings',
    foodBeverage: [
      'Beer & wine bar (local Austin craft selections)',
      'Heavy appetizers & finger foods',
      'Chips, salsa, and Texas-style snacks',
      'Non-alcoholic beverages included'
    ],
    features: [
      'Amazing, experienced captain & crew',
      '3-hour cruise on Lake Travis',
      'Premium Bluetooth speaker system',
      'Coolers with ice for beverages',
      'Clean restroom facilities',
      'Comfortable seating areas',
      'Sun & shade options',
      'Basic setup assistance'
    ],
    popular: false,
    icon: Smile,
    badge: 'Budget-Friendly'
  },
  {
    id: 'elegant',
    name: 'Elegant Welcome',
    guestCapacity: '40-50 guests',
    basePrice: 2800,
    priceRange: '$2,800 - $4,200',
    description: 'Mid-tier welcome reception with premium catering and cocktails',
    foodBeverage: [
      'Full cocktail bar with signature drinks',
      'Premium catering (choose Texas BBQ or Fajita bar)',
      'Gourmet appetizer stations',
      'Wine & champagne service',
      'Fresh fruit & dessert bar',
      'Coffee & tea service'
    ],
    features: [
      'Everything from Casual Welcome',
      '4-hour cruise with extended time',
      'Professional catering setup & service',
      'Cocktail bar with bartender',
      'Elegant table settings & linens',
      'Decorative lighting & ambiance',
      'Welcome bags for guests available',
      'Coordination with wedding planner',
      'Photo-friendly staging areas'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Welcome',
    guestCapacity: '60-75 guests',
    basePrice: 5500,
    priceRange: '$5,500 - $7,500',
    description: 'Premium full-service welcome dinner with open bar and entertainment',
    foodBeverage: [
      'Open bar with premium spirits & wine',
      'Full plated dinner service (3-course meal)',
      'Choice of protein: Steak, Chicken, or Fish',
      'Vegetarian & dietary accommodations',
      'Premium appetizer hour',
      'Wedding cake or dessert service',
      'Champagne toast included'
    ],
    features: [
      'Everything from Elegant Welcome',
      '4-5 hour cruise with flexibility',
      'Live acoustic music or DJ',
      'Professional event coordinator on board',
      'Premium sound system for speeches',
      'Custom decorations matching wedding theme',
      'Photographer coordination available',
      'Transportation coordination from hotels',
      'Welcome gift bags & favors',
      'Microphone & toast setup',
      'Sunset timing coordination',
      'Multiple seating & dining areas'
    ],
    popular: false,
    icon: Sparkles,
    badge: 'Premium Experience'
  }
];

// Wedding Planning Timeline
const planningTimeline = [
  {
    timeframe: '9-12 Months Before',
    icon: CalendarClock,
    color: 'blue',
    tasks: [
      'Ideal booking window for peak wedding season (May-October)',
      'Maximum boat selection and date availability',
      'Best pricing and early bird discounts available',
      'Time to coordinate with wedding planner',
      'Flexibility to adjust guest count'
    ],
    recommendation: 'Book now for best selection and pricing'
  },
  {
    timeframe: '6-9 Months Before',
    icon: Calendar,
    color: 'green',
    tasks: [
      'Good availability for most dates',
      'Coordinate with hotel blocks and wedding venue',
      'Finalize guest count estimates',
      'Choose catering and beverage options',
      'Plan transportation logistics'
    ],
    recommendation: 'Optimal time to secure your welcome party'
  },
  {
    timeframe: '3-6 Months Before',
    icon: Clock,
    color: 'yellow',
    tasks: [
      'Limited availability for popular dates',
      'Confirm final guest count',
      'Finalize menu selections',
      'Arrange hotel transportation',
      'Coordinate with wedding coordinator'
    ],
    recommendation: 'Book soon - popular dates filling up'
  },
  {
    timeframe: '1-3 Months Before',
    icon: TrendingUp,
    color: 'orange',
    tasks: [
      'Very limited availability',
      'Higher demand pricing may apply',
      'Quick decisions required',
      'Immediate deposit needed',
      'Limited customization options'
    ],
    recommendation: 'Contact us immediately for last-minute availability'
  }
];

// Sample Welcome Party Itineraries
const sampleItineraries = [
  {
    id: 'friday-evening',
    name: 'Friday Evening Welcome',
    timing: '6:00 PM - 10:00 PM',
    bestFor: 'Out-of-town guests arriving Friday',
    icon: Sunset,
    schedule: [
      { time: '6:00 PM', event: 'Guest arrival & boarding', details: 'Welcome drinks served as guests arrive' },
      { time: '6:30 PM', event: 'Cruise departs', details: 'Scenic tour of Lake Travis begins' },
      { time: '7:00 PM', event: 'Welcome toast & speeches', details: 'Couple welcomes guests to wedding weekend' },
      { time: '7:15 PM', event: 'Dinner service begins', details: 'BBQ buffet or plated dinner' },
      { time: '8:30 PM', event: 'Sunset viewing', details: 'Perfect photo opportunities on water' },
      { time: '9:00 PM', event: 'Dancing & mingling', details: 'Live music or DJ entertainment' },
      { time: '9:45 PM', event: 'Return to dock', details: 'Transportation to hotels arranged' },
      { time: '10:00 PM', event: 'Event conclusion', details: 'Guests transported to accommodations' }
    ]
  },
  {
    id: 'rehearsal-afternoon',
    name: 'Rehearsal Day Afternoon',
    timing: '2:00 PM - 6:00 PM',
    bestFor: 'After morning rehearsal, before evening dinner',
    icon: Sun,
    schedule: [
      { time: '2:00 PM', event: 'Boarding begins', details: 'Light refreshments available' },
      { time: '2:30 PM', event: 'Departure', details: 'Afternoon cruise on Lake Travis' },
      { time: '3:00 PM', event: 'Casual welcome speech', details: 'Bride & groom greet everyone' },
      { time: '3:30 PM', event: 'Appetizers & cocktails', details: 'Casual mingling and socializing' },
      { time: '4:30 PM', event: 'Swimming & water activities', details: 'Optional water fun (weather permitting)' },
      { time: '5:30 PM', event: 'Return to marina', details: 'Time to prepare for rehearsal dinner' },
      { time: '6:00 PM', event: 'Depart for evening events', details: 'Transition to rehearsal dinner venue' }
    ]
  },
  {
    id: 'sunday-brunch',
    name: 'Sunday Farewell Brunch Cruise',
    timing: '11:00 AM - 3:00 PM',
    bestFor: 'Post-wedding farewell for guests',
    icon: Coffee,
    schedule: [
      { time: '11:00 AM', event: 'Brunch boarding', details: 'Mimosas & coffee service' },
      { time: '11:30 AM', event: 'Cruise begins', details: 'Relaxed morning on the lake' },
      { time: '12:00 PM', event: 'Brunch buffet service', details: 'Full breakfast/lunch spread' },
      { time: '1:00 PM', event: 'Thank you speeches', details: 'Couple thanks guests for celebrating' },
      { time: '1:30 PM', event: 'Casual socializing', details: 'Share wedding memories & photos' },
      { time: '2:30 PM', event: 'Return to dock', details: 'Airport/departure transportation arranged' },
      { time: '3:00 PM', event: 'Farewell', details: 'Send-off for traveling guests' }
    ]
  }
];

// Hotel & Venue Coordination Details
const coordinationDetails = [
  {
    icon: Hotel,
    title: 'Hotel Block Coordination',
    description: 'We coordinate with your hotel blocks for seamless guest experience',
    details: [
      'Work with Austin hotel concierge teams',
      'Arrange group pickup from multiple hotels',
      'Provide hotel staff with cruise details',
      'Coordinate timing with hotel check-in',
      'Special rates for hotel transportation'
    ]
  },
  {
    icon: Bus,
    title: 'Transportation Logistics',
    description: 'Professional shuttle service from hotels to marina and back',
    details: [
      'Charter buses for large groups (40+ guests)',
      'Shuttle vans for smaller groups',
      'Multiple pickup locations supported',
      'Professional drivers familiar with routes',
      'Return transportation included',
      'Coordination with your wedding timeline'
    ]
  },
  {
    icon: MapPinned,
    title: 'Venue Proximity Planning',
    description: 'Strategic planning based on your wedding venue location',
    details: [
      'Lake Travis is 30-40 min from downtown Austin',
      'Close to Hill Country wedding venues',
      'Near popular wedding hotels (Lakeway, Bee Cave)',
      'Easy access from Austin-Bergstrom Airport',
      'Scenic drive becomes part of the experience'
    ]
  },
  {
    icon: Navigation,
    title: 'Guest Accommodation Support',
    description: 'Help your guests plan their visit to Lake Travis',
    details: [
      'Provide detailed directions to marina',
      'Share local hotel recommendations',
      'Austin tourist information for guests',
      'Weather preparation guidance',
      'What to bring/wear recommendations',
      'Parking information for guest vehicles'
    ]
  }
];

// Toast & Speech Setup Details
const toastSetup = [
  {
    icon: Mic2,
    title: 'Professional Sound System',
    description: 'Crystal-clear audio for speeches and toasts',
    features: [
      'Wireless microphone system included',
      'Multiple mics available (2-3 mics)',
      'Premium speakers throughout boat',
      'Background music control',
      'Volume adjustment for different areas'
    ]
  },
  {
    icon: Megaphone,
    title: 'Speech Staging Area',
    description: 'Dedicated space for memorable toasts and announcements',
    features: [
      'Elevated platform or designated speaking area',
      'Good visibility for all guests',
      'Backdrop for photos during speeches',
      'Proper lighting for evening speeches',
      'Coordination with photographer for toast shots'
    ]
  },
  {
    icon: ClipboardCheck,
    title: 'Toast Coordination',
    description: 'Organized timeline for speeches and special moments',
    features: [
      'Coordinate with couple on speech order',
      'Designated toast master/emcee support',
      'Timing coordination with meal service',
      'Champagne distribution for toasts',
      'Signal coordination with captain/crew',
      'Recording capability for speeches'
    ]
  }
];

// Welcome Party vs Rehearsal Dinner Comparison
const comparisonData = {
  cost: [
    { aspect: 'Typical Cost', welcomeParty: '$1,500 - $5,500', rehearsalDinner: '$3,000 - $8,000', winner: 'welcome' },
    { aspect: 'Per Guest Cost', welcomeParty: '$50 - $100', rehearsalDinner: '$75 - $150', winner: 'welcome' },
    { aspect: 'Venue Rental', welcomeParty: 'Included', rehearsalDinner: '$500 - $2,000 extra', winner: 'welcome' },
    { aspect: 'Entertainment', welcomeParty: 'Included', rehearsalDinner: '$500 - $1,500 extra', winner: 'welcome' }
  ],
  experience: [
    { aspect: 'Unique Factor', welcomeParty: 'On-water experience, Lake Travis views', rehearsalDinner: 'Traditional restaurant/venue', winner: 'welcome' },
    { aspect: 'Photo Opportunities', welcomeParty: 'Sunset, water, boat photos', rehearsalDinner: 'Indoor/standard venue shots', winner: 'welcome' },
    { aspect: 'Guest Interaction', welcomeParty: 'Open flow, casual mingling', rehearsalDinner: 'Seated, formal structure', winner: 'welcome' },
    { aspect: 'Formality Level', welcomeParty: 'Relaxed, fun atmosphere', rehearsalDinner: 'Formal, structured event', winner: 'welcome' }
  ],
  engagement: [
    { aspect: 'Guest Excitement', welcomeParty: 'High - unique experience', rehearsalDinner: 'Medium - traditional', winner: 'welcome' },
    { aspect: 'Instagram Moments', welcomeParty: 'Exceptional water/sunset shots', rehearsalDinner: 'Standard venue photos', winner: 'welcome' },
    { aspect: 'Conversation Starters', welcomeParty: 'Natural - beautiful setting', rehearsalDinner: 'Forced - seated arrangements', winner: 'welcome' },
    { aspect: 'Guest Comfort', welcomeParty: 'Casual dress, relaxed vibe', rehearsalDinner: 'Formal attire, structured', winner: 'welcome' }
  ]
};

// Additional Wedding Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Emily & James Wilson',
    role: 'Married May 2024',
    rating: 5,
    text: 'Our welcome party cruise was the perfect way to kick off our wedding weekend! Our guests from across the country got to experience Lake Travis and Austin hospitality. The BBQ was incredible and the sunset was magical.',
    image: '/testimonials/emily-james.jpg'
  },
  {
    id: 2,
    name: 'Robert Martinez',
    role: 'Father of the Groom',
    rating: 5,
    text: 'As hosts of the welcome party, we wanted something special. The crew made everything effortless, the live music was perfect, and watching our families come together on the lake was priceless.',
    image: '/testimonials/robert.jpg'
  },
  {
    id: 3,
    name: 'Lauren & Chris Thompson',
    role: 'Married August 2024',
    rating: 5,
    text: 'Having 60+ guests from different states, the welcome cruise was brilliant! Everyone relaxed, the Texas BBQ was a hit, and it set the perfect tone for our wedding weekend. Highly recommend!',
    image: '/testimonials/lauren-chris.jpg'
  },
  {
    id: 4,
    name: 'Sarah & Michael Chen',
    role: 'Married September 2024',
    rating: 5,
    text: 'We chose the Elegant Welcome package and it exceeded expectations. The cocktail service was professional, the fajita bar was delicious, and our planner said it was the smoothest welcome event she\'d coordinated. Our guests raved about it!',
    image: '/testimonials/sarah-michael.jpg'
  },
  {
    id: 5,
    name: 'Jessica Rodriguez',
    role: 'Bride, June 2024',
    rating: 5,
    text: 'The Ultimate Welcome package was worth every penny. Full dinner service, open bar, live music - our 70 guests had an incredible time. Many said it was better than the wedding itself! The sunset photos were stunning.',
    image: '/testimonials/jessica.jpg'
  },
  {
    id: 6,
    name: 'David & Amanda Foster',
    role: 'Married July 2024',
    rating: 5,
    text: 'We did the Friday evening welcome cruise and it was genius. Guests arrived, got on the boat, and instantly were in vacation mode. The transportation from our hotel blocks was seamless. Premier Party Cruises made us look like rockstar hosts!',
    image: '/testimonials/david-amanda.jpg'
  }
];

// What's included
const whatsIncluded = [
  {
    icon: Plane,
    title: 'Guest Welcome',
    description: 'Perfect for welcoming out-of-town wedding guests'
  },
  {
    icon: Utensils,
    title: 'Texas Cuisine',
    description: 'Authentic BBQ or Fajita bar options'
  },
  {
    icon: Music,
    title: 'Live Entertainment',
    description: 'Options for acoustic or full band performances'
  },
  {
    icon: Wine,
    title: 'Bar Service',
    description: 'Full bar setup with local craft options'
  },
  {
    icon: PartyPopper,
    title: 'Festive Atmosphere',
    description: 'Casual mingling space for guests to connect'
  },
  {
    icon: Gift,
    title: 'Welcome Amenities',
    description: 'Welcome bags and local treats available'
  },
  {
    icon: Sun,
    title: 'Flexible Timing',
    description: 'Afternoon or evening cruise options'
  },
  {
    icon: Shield,
    title: 'Full Service',
    description: 'Professional crew handles everything'
  },
  {
    icon: Heart,
    title: 'Wedding Focus',
    description: 'Customized to match your wedding theme'
  }
];

// FAQs - Enhanced with more wedding-specific questions
const faqItems = [
  {
    id: 'included',
    question: "What's included in all packages?",
    answer: 'All packages include licensed, experienced captain & crew, premium Bluetooth sound system, coolers with ice, clean restroom facilities, sun & shade seating areas, and all safety equipment. Package-specific amenities vary by tier.'
  },
  {
    id: 'food-drinks',
    question: 'What are the food and beverage options?',
    answer: 'Casual Welcome includes beer/wine bar and appetizers. Elegant Welcome adds cocktail service and premium catering (BBQ or fajitas). Ultimate Welcome features full plated dinner service, open bar, and champagne toast. All dietary restrictions can be accommodated.'
  },
  {
    id: 'guest-capacity',
    question: 'How many guests can each package accommodate?',
    answer: 'Casual Welcome: 25-30 guests, Elegant Welcome: 40-50 guests, Ultimate Welcome: 60-75 guests. We have multiple boats in our fleet to accommodate your exact guest count.'
  },
  {
    id: 'transportation',
    question: 'Do you provide transportation from hotels?',
    answer: 'Yes! We coordinate shuttle service from Austin hotel blocks to the marina and back. This is included in Elegant and Ultimate packages, and available as an add-on for Casual Welcome.'
  },
  {
    id: 'timeline',
    question: 'When should we book our welcome party?',
    answer: 'For peak wedding season (May-October), book 9-12 months in advance for best selection. 6-9 months is optimal for most dates. We can accommodate last-minute bookings based on availability, but options may be limited.'
  },
  {
    id: 'deposits-payments',
    question: 'How do deposits and payments work?',
    answer: '25% deposit if booking >30 days out (balance due 30 days prior). If booking within 30 days, 50% deposit due immediately and remainder within 72 hours. We accept all major credit cards and can coordinate with wedding planners.'
  },
  {
    id: 'wedding-planner',
    question: 'Do you work with wedding planners and coordinators?',
    answer: 'Absolutely! We regularly coordinate with wedding planners and event coordinators. We can handle all communication through your planner and integrate seamlessly into your wedding weekend timeline.'
  },
  {
    id: 'weather',
    question: 'What happens if weather is bad?',
    answer: 'We monitor weather closely. If conditions are unsafe, we reschedule at no charge. If weather impacts only part of the cruise, we provide prorated refunds. Covered areas protect from light rain, but safety is our top priority.'
  },
  {
    id: 'customization',
    question: 'Can we customize our welcome party?',
    answer: 'Yes! We can match your wedding colors, coordinate special decorations, arrange specific music, accommodate dietary needs, and adjust timing to fit your wedding weekend schedule. Elegant and Ultimate packages offer most customization.'
  },
  {
    id: 'cancellation',
    question: 'What\'s your cancellation policy?',
    answer: "48-hour full refund window after booking. After that, cancellations are weather-dependent at the captain's discretion. We work with couples to reschedule when possible. Wedding insurance is recommended for added protection."
  }
];

// Wedding Coordinator Integration Info
const coordinatorInfo = [
  {
    icon: Handshake,
    title: 'Planner Partnerships',
    description: 'Seamless collaboration with your wedding coordinator',
    benefits: [
      'Direct communication with your planner',
      'Integrated into master wedding timeline',
      'Coordinate with other wedding vendors',
      'Single point of contact for planning',
      'Professional vendor network'
    ]
  },
  {
    icon: ClipboardCheck,
    title: 'Coordination Benefits',
    description: 'Why planners love working with us',
    benefits: [
      'Detailed planning documents provided',
      'Flexible communication (email, phone, video)',
      'Experience with 100+ weddings',
      'Backup plans for all scenarios',
      'On-time, professional execution',
      'Post-event coordination reports'
    ]
  },
  {
    icon: Award,
    title: 'Preferred Vendor Status',
    description: 'Trusted partner for Austin wedding professionals',
    benefits: [
      'Recommended by top Austin planners',
      'Featured vendor at wedding showcases',
      'Preferred rates for planner clients',
      'Priority booking for planner events',
      'Coordinated marketing opportunities'
    ]
  }
];

export default function WelcomeParty() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState('elegant');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedItinerary, setSelectedItinerary] = useState('friday-evening');
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleGetQuote = () => {
    navigate('/chat?eventType=welcome-party');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=welcome-party&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/welcome-party"
        defaultTitle="Wedding Welcome Party Cruises | Lake Travis Austin"
        defaultDescription="Premium wedding welcome party cruises on Lake Travis. Choose from Casual, Elegant, or Ultimate packages. Texas BBQ, live music, full service. Perfect way to start your wedding weekend!"
        defaultKeywords={[
          'wedding welcome party cruise',
          'lake travis welcome reception',
          'wedding weekend cruise austin',
          'out of town guest welcome',
          'austin wedding cruise',
          'wedding welcome dinner boat',
          'lake travis wedding events'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section with Crossfade */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
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
              <img 
                src={image}
                alt="Wedding Welcome Party Boat Austin cruise on Lake Travis"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 text-white flex-grow flex items-center">
          <motion.div 
            className="max-w-4xl mx-auto text-center w-full"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-4 py-2 text-lg bg-white/20 backdrop-blur-sm border-white/30">
                <Plane className="mr-2 h-5 w-5" />
                Welcome Your Wedding Guests in Style
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Wedding Welcome Party
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Cruises on Lake Travis
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Kick off your wedding weekend with an unforgettable Lake Travis cruise. 
              From casual gatherings to elegant dinners - perfect for bringing families together.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Your Welcome Party
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">400+</div>
                <div className="text-sm text-white/80">Welcome Parties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">25-75</div>
                <div className="text-sm text-white/80">Guest Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">5.0★</div>
                <div className="text-sm text-white/80">Guest Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
              <span className="text-brand-blue">Texas Hospitality</span> • Lake Views • <span className="text-brand-blue">Wedding Weekend Kickoff</span>
            </p>
          </div>
        </div>
      </section>

      {/* Build My Quote Now Section */}
      <section className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white tracking-wider"
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
              Get instant pricing for your Lake Travis wedding welcome party in minutes
            </p>
            
            {!showQuoteBuilder ? (
              <Button
                size="lg"
                onClick={() => setShowQuoteBuilder(true)}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-2xl px-16 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-build-quote"
              >
                <Sparkles className="mr-3 h-7 w-7" />
                <span data-editable data-editable-id="quote-builder-button">Start Building Your Quote</span>
                <ArrowRight className="ml-3 h-7 w-7" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowQuoteBuilder(false)}
                className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-12 py-6 rounded-2xl backdrop-blur-sm mb-8"
                data-testid="button-hide-quote"
              >
                <X className="mr-2 h-5 w-5" />
                <span data-editable data-editable-id="quote-builder-hide-button">Hide Quote Builder</span>
              </Button>
            )}
          </motion.div>

          <AnimatePresence>
            {showQuoteBuilder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-12 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <iframe 
                      src="https://ppc-quote-builder.lovable.app/"
                      title="Build Your Quote - Premier Party Cruises"
                      className="w-full"
                      style={{ 
                        minHeight: '1200px',
                        height: '90vh',
                        border: 'none'
                      }}
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

      {/* Wedding Welcome Party Packages - ENHANCED */}
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Wedding Welcome Party Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package to welcome your wedding guests with authentic Texas hospitality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {welcomePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "relative h-full hover:shadow-2xl transition-all duration-300",
                  pkg.popular && "border-2 border-brand-yellow shadow-xl scale-105"
                )}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-brand-yellow text-black font-bold px-4 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <pkg.icon className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{pkg.guestCapacity}</p>
                    
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-brand-blue">
                        {pkg.priceRange}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Final pricing based on guest count & date</p>
                    </div>
                    
                    <Badge className={cn(
                      "mt-3",
                      pkg.popular ? "bg-brand-yellow text-black" : "bg-gray-100 text-gray-700"
                    )}>
                      {pkg.badge}
                    </Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                      {pkg.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3 flex items-center">
                        <Utensils className="h-4 w-4 mr-2 text-brand-blue" />
                        Food & Beverage
                      </h4>
                      <ul className="space-y-2">
                        {pkg.foodBeverage.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-brand-blue" />
                        Included Features
                      </h4>
                      <ul className="space-y-2">
                        {pkg.features.slice(0, 5).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {pkg.features.length > 5 && (
                        <p className="text-xs text-gray-500 mt-2">+ {pkg.features.length - 5} more features</p>
                      )}
                    </div>

                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={handleGetQuote}
                      data-testid={`button-package-${pkg.id}`}
                    >
                      Get Custom Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Planning Timeline - NEW SECTION */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              When to Book Your Welcome Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Strategic timeline for securing the perfect welcome party for your wedding weekend
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {planningTimeline.map((timeline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "h-full border-2 hover:shadow-xl transition-all",
                  timeline.color === 'blue' && "border-blue-500",
                  timeline.color === 'green' && "border-green-500",
                  timeline.color === 'yellow' && "border-yellow-500",
                  timeline.color === 'orange' && "border-orange-500"
                )}>
                  <CardHeader className="text-center">
                    <div className={cn(
                      "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center",
                      timeline.color === 'blue' && "bg-blue-100",
                      timeline.color === 'green' && "bg-green-100",
                      timeline.color === 'yellow' && "bg-yellow-100",
                      timeline.color === 'orange' && "bg-orange-100"
                    )}>
                      <timeline.icon className={cn(
                        "h-8 w-8",
                        timeline.color === 'blue' && "text-blue-600",
                        timeline.color === 'green' && "text-green-600",
                        timeline.color === 'yellow' && "text-yellow-600",
                        timeline.color === 'orange' && "text-orange-600"
                      )} />
                    </div>
                    <CardTitle className="text-lg">{timeline.timeframe}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {timeline.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{task}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={cn(
                      "text-xs font-semibold text-center p-2 rounded",
                      timeline.color === 'blue' && "bg-blue-50 text-blue-700",
                      timeline.color === 'green' && "bg-green-50 text-green-700",
                      timeline.color === 'yellow' && "bg-yellow-50 text-yellow-700",
                      timeline.color === 'orange' && "bg-orange-50 text-orange-700"
                    )}>
                      {timeline.recommendation}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Itineraries - NEW SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Sample Welcome Party Itineraries
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect timing and flow for your wedding weekend welcome event
            </p>
          </motion.div>

          <Tabs value={selectedItinerary} onValueChange={setSelectedItinerary} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {sampleItineraries.map((itinerary) => (
                <TabsTrigger key={itinerary.id} value={itinerary.id} className="flex items-center gap-2">
                  <itinerary.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{itinerary.name}</span>
                  <span className="sm:hidden">{itinerary.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {sampleItineraries.map((itinerary) => (
              <TabsContent key={itinerary.id} value={itinerary.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-2xl mb-2">{itinerary.name}</CardTitle>
                        <CardDescription className="text-lg">{itinerary.bestFor}</CardDescription>
                      </div>
                      <Badge className="text-lg px-4 py-2">
                        <Clock className="mr-2 h-5 w-5" />
                        {itinerary.timing}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {itinerary.schedule.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex-shrink-0 w-24 text-right">
                            <span className="font-bold text-brand-blue">{item.time}</span>
                          </div>
                          <div className="flex-grow border-l-2 border-brand-yellow pl-4">
                            <h4 className="font-bold mb-1">{item.event}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.details}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Hotel & Venue Coordination - NEW SECTION */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Seamless Hotel & Venue Coordination
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We coordinate every detail with your hotels and wedding venues for a flawless guest experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {coordinationDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <detail.icon className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-center text-xl">{detail.title}</CardTitle>
                    <CardDescription className="text-center">{detail.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {detail.details.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-brand-blue/5 to-purple-500/5 border-brand-blue/20">
              <CardContent className="pt-6">
                <Info className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Popular Austin Hotel Areas for Wedding Guests</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We regularly coordinate with hotels in Lakeway, Bee Cave, Downtown Austin, and Lake Travis area. 
                  Our team knows the best routes and timing from each location to ensure your guests arrive relaxed and ready to celebrate.
                </p>
                <Button variant="outline" onClick={handleGetQuote}>
                  Discuss Your Hotel Coordination
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Toast & Speech Setup - NEW SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Professional Toast & Speech Setup
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Make your welcome speeches memorable with our professional audio and staging
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {toastSetup.map((setup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <setup.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{setup.title}</CardTitle>
                    <CardDescription>{setup.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {setup.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-4 w-4 text-brand-yellow mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Mic2 className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">Sample Toast Timeline for Welcome Party</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>6:45 PM:</strong> Sound check with speakers (parents, couple)</p>
                      <p><strong>7:15 PM:</strong> Welcome toast by hosts (5 minutes)</p>
                      <p><strong>7:20 PM:</strong> Bride & groom welcome speech (5-7 minutes)</p>
                      <p><strong>7:30 PM:</strong> Optional parent toasts (3-4 minutes each)</p>
                      <p><strong>8:00 PM:</strong> Informal mingling with background music</p>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Our crew coordinates timing and ensures smooth transitions between speakers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Welcome Party vs Rehearsal Dinner Comparison - NEW SECTION */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Welcome Party vs. Traditional Rehearsal Dinner
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Why couples choose welcome party cruises over traditional rehearsal dinners
            </p>
          </motion.div>

          <Tabs defaultValue="cost" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cost" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Cost Comparison
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Experience Value
              </TabsTrigger>
              <TabsTrigger value="engagement" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Guest Engagement
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cost">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Comparison Analysis</CardTitle>
                  <CardDescription>See how welcome party cruises compare to traditional venue costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comparisonData.cost.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="font-semibold">{item.aspect}</div>
                        <div className={cn(
                          "text-center",
                          item.winner === 'welcome' && "text-green-600 font-bold"
                        )}>
                          {item.welcomeParty}
                        </div>
                        <div className={cn(
                          "text-center",
                          item.winner !== 'welcome' && "text-red-600"
                        )}>
                          {item.rehearsalDinner}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>💰 Average Savings:</strong> Couples save $1,500-$3,000 choosing a welcome party cruise over traditional rehearsal dinner venues, 
                      while providing a more memorable experience for guests.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Experience & Value Comparison</CardTitle>
                  <CardDescription>What makes welcome party cruises special</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comparisonData.experience.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="font-semibold">{item.aspect}</div>
                        <div className={cn(
                          "text-center",
                          item.winner === 'welcome' && "text-green-600 font-bold"
                        )}>
                          {item.welcomeParty}
                        </div>
                        <div className={cn(
                          "text-center text-gray-500"
                        )}>
                          {item.rehearsalDinner}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>✨ Experience Factor:</strong> 95% of couples report their welcome party cruise was the most talked-about event of their wedding weekend, 
                      with guests sharing photos and memories for months afterward.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Engagement & Memorability</CardTitle>
                  <CardDescription>How welcome parties create better guest experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comparisonData.engagement.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="font-semibold">{item.aspect}</div>
                        <div className={cn(
                          "text-center",
                          item.winner === 'welcome' && "text-green-600 font-bold"
                        )}>
                          {item.welcomeParty}
                        </div>
                        <div className={cn(
                          "text-center text-gray-500"
                        )}>
                          {item.rehearsalDinner}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      <strong>🎉 Engagement Stats:</strong> Welcome party cruises generate 3x more social media posts than traditional rehearsal dinners, 
                      and guests report feeling more connected to other wedding attendees before the ceremony.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              The Perfect Wedding Weekend Start
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to welcome your guests in true Austin style
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatsIncluded.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <item.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Coordinator Integration - NEW SECTION */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Wedding Planner & Coordinator Integration
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Seamless collaboration with your wedding planning team for flawless execution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {coordinatorInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <info.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {info.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Trusted by Austin's Top Wedding Planners</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We're the preferred welcome party vendor for over 50 Austin wedding planners and coordinators. 
                    Our team has coordinated 400+ wedding welcome events with zero mishaps.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">100%</div>
                      <p className="text-sm text-gray-600">Planner Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">50+</div>
                      <p className="text-sm text-gray-600">Partner Planners</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">400+</div>
                      <p className="text-sm text-gray-600">Events Coordinated</p>
                    </div>
                  </div>
                  <Button onClick={handleGetQuote} size="lg">
                    <Handshake className="mr-2 h-5 w-5" />
                    Coordinate with Your Planner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Real Wedding Welcome Party Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hear from couples and families who chose our welcome party cruises
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                      ))}
                    </div>
                    
                    <Quote className="h-8 w-8 text-brand-blue/20 mb-2" />
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    <div className="border-t pt-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.slice(3, 6).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                      ))}
                    </div>
                    
                    <Quote className="h-8 w-8 text-brand-blue/20 mb-2" />
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    <div className="border-t pt-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs - Enhanced */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Wedding Welcome Party FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about hosting your welcome party cruise
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem value={item.id} className="mb-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 pl-8">
                      <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Party Planning Checklist */}
      <PartyPlanningChecklist 
        partyType="Wedding Welcome Party"
        eventType="welcome party"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-600">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Ready to Welcome Your Wedding Guests?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Start your wedding weekend with an unforgettable Lake Travis welcome party. 
              From casual gatherings to elegant dinners - we create the perfect first impression.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
                data-testid="button-cta-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Planning Your Welcome Party
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-cta-contact"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us: 512-488-5892
              </Button>
            </div>
          </motion.div>
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
              Complete Your Wedding Weekend
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of wedding event experiences on Lake Travis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/rehearsal-dinner">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Utensils className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Rehearsal Dinner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                      Elegant rehearsal dinner cruises with sunset views and premium service
                    </p>
                    <Button className="w-full" variant="outline">
                      Explore Rehearsal Dinners
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
              <Link href="/after-party">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Music className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">After Party</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                      Keep the celebration going with post-wedding party cruises
                    </p>
                    <Button className="w-full" variant="outline">
                      Explore After Parties
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
              <Link href="/wedding-parties">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">All Wedding Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                      View all wedding event options and complete packages
                    </p>
                    <Button className="w-full" variant="outline">
                      View All Wedding Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Wedding Welcome Party Cruise Austin - Lake Travis Wedding Guest Reception</h2>
        <p itemProp="description">
          Premier wedding welcome party cruises on Lake Travis for out-of-town wedding guests. Choose from Casual Welcome (25-30 guests, $1,500-$2,200), 
          Elegant Welcome (40-50 guests, $2,800-$4,200), or Ultimate Welcome (60-75 guests, $5,500-$7,500) packages. Perfect for greeting visitors with 
          Texas BBQ, live music, cocktail service, and stunning lake views. Complete wedding weekend planning with hotel coordination, transportation logistics, 
          professional toast setup, and wedding planner integration.
        </p>
        
        <h3>Wedding Welcome Party Package Pricing - All Tiers</h3>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">Casual Welcome Party Package (25-30 Guests)</h4>
          <p>Budget-friendly welcome party: $1,500-$2,200. Includes beer & wine bar, heavy appetizers, 3-hour cruise, captain & crew, sound system, all amenities.</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">Elegant Welcome Reception Package (40-50 Guests)</h4>
          <p>Mid-tier welcome party: $2,800-$4,200. Full cocktail bar, premium catering (BBQ or fajitas), 4-hour cruise, professional service, wedding planner coordination.</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">Ultimate Welcome Dinner Package (60-75 Guests)</h4>
          <p>Premium welcome party: $5,500-$7,500. Open bar, 3-course plated dinner, live music, 4-5 hour cruise, event coordinator, custom decorations, hotel transportation.</p>
        </div>
        
        <h3>Wedding Welcome Party Planning Timeline</h3>
        <p>Book 9-12 months before wedding for peak season (May-October) - best selection and pricing. Book 6-9 months for good availability and optimal planning time. 
        Book 3-6 months for limited availability. Last minute bookings (1-3 months) subject to availability with higher demand pricing.</p>
        
        <h3>Sample Wedding Welcome Party Itineraries</h3>
        <h4>Friday Evening Welcome (6:00 PM - 10:00 PM)</h4>
        <p>Perfect for out-of-town guests arriving Friday. Guest arrival 6pm, cruise departs 6:30pm, welcome toast 7pm, dinner service 7:15pm, sunset viewing 8:30pm, 
        dancing & mingling 9pm, return to dock 9:45pm, hotel transportation 10pm.</p>
        
        <h4>Rehearsal Day Afternoon (2:00 PM - 6:00 PM)</h4>
        <p>After morning rehearsal, before evening dinner. Boarding 2pm, departure 2:30pm, casual speech 3pm, appetizers & cocktails 3:30pm, swimming 4:30pm, 
        return 5:30pm, depart for rehearsal dinner 6pm.</p>
        
        <h4>Sunday Farewell Brunch (11:00 AM - 3:00 PM)</h4>
        <p>Post-wedding farewell for guests. Brunch boarding 11am, cruise begins 11:30am, brunch buffet noon, thank you speeches 1pm, casual socializing 1:30pm, 
        return 2:30pm, airport transportation 3pm.</p>
        
        <h3>Hotel & Venue Coordination Services</h3>
        <ul>
          <li>Hotel block coordination with Austin hotels (Lakeway, Bee Cave, Downtown, Lake Travis area)</li>
          <li>Group transportation from multiple hotel pickup locations</li>
          <li>Charter buses for 40+ guests, shuttle vans for smaller groups</li>
          <li>Venue proximity planning - Lake Travis 30-40 min from downtown Austin</li>
          <li>Close to Hill Country wedding venues and popular wedding hotels</li>
          <li>Guest accommodation support with directions, hotel recommendations, parking info</li>
        </ul>
        
        <h3>Professional Toast & Speech Setup</h3>
        <ul>
          <li>Wireless microphone system (2-3 mics available)</li>
          <li>Premium speakers throughout boat for crystal-clear audio</li>
          <li>Elevated staging area with good guest visibility</li>
          <li>Proper lighting for evening speeches</li>
          <li>Toast coordination with meal service timing</li>
          <li>Champagne distribution for toasts</li>
          <li>Recording capability for memorable speeches</li>
        </ul>
        
        <h3>Welcome Party vs Rehearsal Dinner Comparison</h3>
        <h4>Cost Savings</h4>
        <p>Welcome party cruises: $1,500-$5,500 total. Rehearsal dinners: $3,000-$8,000 total. Average savings: $1,500-$3,000. Per guest cost: $50-$100 vs $75-$150. 
        Venue rental included vs $500-$2,000 extra. Entertainment included vs $500-$1,500 extra.</p>
        
        <h4>Experience Value</h4>
        <p>On-water experience with Lake Travis views vs traditional venue. Sunset and water photo opportunities vs indoor shots. Open flow casual mingling vs seated formal structure. 
        Relaxed fun atmosphere vs formal event. 95% of couples report welcome party was most talked-about wedding weekend event.</p>
        
        <h4>Guest Engagement</h4>
        <p>High guest excitement with unique experience vs medium with traditional event. Exceptional Instagram moments - water/sunset shots vs standard venue photos. 
        Natural conversation starters in beautiful setting vs forced seated arrangements. Casual dress and relaxed vibe vs formal attire requirements. 
        3x more social media posts than rehearsal dinners. Guests feel more connected before ceremony.</p>
        
        <h3>Wedding Planner & Coordinator Integration</h3>
        <ul>
          <li>Seamless collaboration with wedding coordinators and planners</li>
          <li>Direct planner communication and integration into master timeline</li>
          <li>Coordination with other wedding vendors</li>
          <li>Detailed planning documents and flexible communication</li>
          <li>Experience with 100+ weddings, backup plans for all scenarios</li>
          <li>Preferred vendor for 50+ Austin wedding planners</li>
          <li>100% planner satisfaction rate, 400+ events coordinated</li>
          <li>Featured vendor at wedding showcases with preferred rates</li>
        </ul>
        
        <h3>Austin Wedding Welcome Party Cruise Keywords</h3>
        <p>wedding welcome party Austin, Lake Travis welcome cruise, wedding weekend kickoff, out of town guest reception Austin, wedding welcome dinner boat, 
        Lake Travis wedding events, Austin wedding hospitality cruise, wedding guest welcome party boat, Lake Travis private welcome party, Austin wedding cruise packages, 
        wedding welcome reception on water, Texas wedding welcome event, Lake Travis wedding weekend, wedding guest cruise Austin, welcome party boat rental Austin, 
        Lake Travis wedding coordinator cruise, Austin wedding planner cruise, wedding welcome party packages Austin, elegant welcome party Lake Travis, 
        casual wedding welcome Austin, ultimate wedding welcome dinner cruise, Friday wedding welcome party, rehearsal day welcome cruise, wedding farewell brunch cruise</p>
        
        <h3>Wedding Welcome Party Features & Amenities</h3>
        <ul>
          <li>Casual Welcome: Beer/wine bar, heavy appetizers, 25-30 guests, 3-hour cruise, $1,500-$2,200</li>
          <li>Elegant Welcome: Full cocktail bar, premium catering (BBQ/fajitas), 40-50 guests, 4-hour cruise, hotel transportation, $2,800-$4,200</li>
          <li>Ultimate Welcome: Open bar, 3-course plated dinner, 60-75 guests, live music/DJ, event coordinator, custom decorations, 4-5 hour cruise, $5,500-$7,500</li>
          <li>Professional captain & experienced crew included all packages</li>
          <li>Premium Bluetooth sound system for toasts and music</li>
          <li>Multiple seating areas with sun & shade options</li>
          <li>Clean restroom facilities on all boats</li>
          <li>Coolers with ice for beverages</li>
          <li>Setup assistance and coordination</li>
          <li>Customization to match wedding colors and theme</li>
          <li>Dietary restriction accommodations</li>
          <li>Photographer coordination available</li>
          <li>Welcome gift bags and favors available</li>
        </ul>
        
        <h3>Fleet Options for Wedding Welcome Parties</h3>
        <p>Day Tripper (14 guests - intimate gatherings), Meeseeks (25 guests - small welcome parties), Tito (30 guests - casual welcome events), 
        Clever Girl (50 guests - elegant receptions), Millennium Falcon (75 guests - large welcome dinners)</p>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Wedding Welcome Party Cruise Austin",
          "description": "Premium wedding welcome party cruises on Lake Travis. Choose from Casual Welcome ($1,500-$2,200, 25-30 guests), Elegant Welcome ($2,800-$4,200, 40-50 guests), or Ultimate Welcome ($5,500-$7,500, 60-75 guests) packages. Texas BBQ, live music, full service, hotel coordination.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "30.3895",
              "longitude": "-97.8686"
            },
            "telephone": "(512) 488-5892",
            "priceRange": "$1,500-$7,500"
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin, TX"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Casual Welcome Party Package",
              "price": "1500",
              "priceCurrency": "USD",
              "description": "Budget-friendly welcome party for 25-30 guests with beer/wine bar and appetizers"
            },
            {
              "@type": "Offer",
              "name": "Elegant Welcome Reception Package",
              "price": "2800",
              "priceCurrency": "USD",
              "description": "Mid-tier welcome party for 40-50 guests with full cocktail service and premium catering"
            },
            {
              "@type": "Offer",
              "name": "Ultimate Welcome Dinner Package",
              "price": "5500",
              "priceCurrency": "USD",
              "description": "Premium welcome party for 60-75 guests with open bar, plated dinner, and live entertainment"
            }
          ]
        })
      }} />

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/welcome-party/#service",
                    "name": "Private Cruise — Wedding Welcome Parties",
                    "provider": {
                              "@id": "https://premierpartycruises.com/#organization"
                    },
                    "areaServed": [
                              "Austin TX",
                              "Texas",
                              "United States"
                    ],
                    "description": "Premium wedding welcome party cruises on Lake Travis. Casual Welcome (25-30 guests, $1,500-$2,200), Elegant Welcome (40-50 guests, $2,800-$4,200), Ultimate Welcome (60-75 guests, $5,500-$7,500). Texas hospitality, professional service, hotel coordination, wedding planner integration."
          })
      }} />

      <Footer />
    </div>
  );
}
