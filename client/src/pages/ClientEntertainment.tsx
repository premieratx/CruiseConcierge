import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
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
  Briefcase, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Wine, Shield,
  Star, MessageSquare, Award, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, Utensils,
  Building, Handshake, Crown, Diamond, GlassWater, X, Trophy,
  Presentation, Wifi, Monitor, FileText, CreditCard, Receipt,
  Snowflake, Heart, PartyPopper, Gift, Music, Camera,
  ChefHat, DollarSign, BarChart3, Rocket, Network,
  Globe, Palette, Mic, Film, Clapperboard, Tv
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Hero and gallery images
import heroImage1 from '@assets/clever-girl-50-person-boat.webp';
import heroImage2 from '@assets/atx-disco-cruise-party.webp';
import heroImage3 from '@assets/dancing-party-scene.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';

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

// Tiered Client Entertainment Packages
const clientPackages = [
  {
    id: 'basic-appreciation',
    name: 'Basic Client Appreciation',
    basePrice: 200,
    description: 'Professional client entertainment with essential amenities',
    subtitle: 'Perfect for small client meetings and relationship building',
    features: [
      'Professional licensed captain and crew',
      '3-4 hour scenic Lake Travis cruise',
      'Premium Bluetooth speaker system',
      'BYOB with coolers and ice provided',
      'Clean restroom facilities',
      'Comfortable sun and shade seating',
      'Safety equipment and briefing',
      'Vendor coordination for catering',
      'Basic company branding support',
      'Up to 14 guests'
    ],
    ideal: 'Small client groups, intimate networking',
    popular: false,
    icon: Briefcase,
    badge: 'Essential Value',
    roi: '2-3x ROI on client retention'
  },
  {
    id: 'premium-experience',
    name: 'Premium Client Experience',
    basePrice: 275,
    addOnPrice: 75,
    description: 'Elevated client entertainment with full-service amenities and catering coordination',
    subtitle: 'Complete white-glove service for impressive client experiences',
    features: [
      'Everything from Basic Client Appreciation',
      'Professional catering coordination',
      'Premium beverage service setup',
      'Insulated dispensers with ice water',
      'Coolers pre-stocked with ice',
      '6-ft folding tables for presentations',
      'Custom company branding display',
      'Professional photography option',
      'Presentation equipment available',
      'WiFi hotspot for business needs',
      'VIP greeting and boarding assistance',
      'Up to 25 guests'
    ],
    ideal: 'Key client events, deal celebrations',
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    roi: '4-6x ROI on new business closed'
  },
  {
    id: 'executive-vip',
    name: 'Executive VIP Entertainment',
    basePrice: 400,
    addOnPrice: 200,
    description: 'Ultimate luxury client entertainment with gourmet service and full presentation capabilities',
    subtitle: 'Impress Fortune 500 clients with unmatched sophistication',
    features: [
      'Everything from Premium Client Experience',
      'Private boat for exclusive experience',
      'Gourmet catering from top Austin chefs',
      'Premium wine and spirits service',
      'Professional event coordinator on-site',
      'Full A/V presentation setup (screen, projector, sound)',
      'High-speed WiFi for video conferencing',
      'Executive gift bags and amenities',
      'Professional photographer/videographer',
      'Custom décor and company branding',
      'Multi-course dining experience',
      'Luxury transportation coordination',
      'Dedicated concierge service',
      'Post-event client follow-up materials',
      'Up to 50 guests'
    ],
    ideal: 'C-suite entertainment, major deals',
    popular: false,
    icon: Diamond,
    badge: 'Ultimate Luxury',
    roi: '8-15x ROI on relationship value'
  }
];

// Success Stories & ROI Case Studies
const successStories = [
  {
    id: 1,
    company: 'Fortune 500 Tech Company',
    industry: 'Technology',
    clientSize: 'Enterprise',
    challenge: 'Needed to strengthen relationship with key partner before major contract renewal',
    solution: 'Executive VIP Entertainment package with gourmet dining and custom presentations',
    results: [
      '$2.4M contract renewed 6 months early',
      '3-year partnership extension secured',
      'Introduction to 5 additional decision makers',
      '12x ROI on event investment'
    ],
    quote: 'The Lake Travis client cruise created an environment where genuine connections happened naturally. Our partners opened up about their strategic priorities, and we aligned our roadmap perfectly. Best client investment of the year.',
    author: 'VP of Strategic Partnerships',
    icon: Rocket,
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    company: 'Regional Law Firm',
    industry: 'Legal Services',
    clientSize: 'Mid-Market',
    challenge: 'Competing for major client against two larger national firms',
    solution: 'Premium Client Experience with professional presentation setup and custom branding',
    results: [
      'Won $850K annual retainer contract',
      'Client cited "personal touch" as key factor',
      'Relationship led to 3 referrals',
      '15x ROI within 90 days'
    ],
    quote: 'In our industry, relationships matter as much as expertise. The Premier cruise showed our client we see them as partners, not transactions. They chose us over bigger firms because we made them feel valued.',
    author: 'Managing Partner',
    icon: Building,
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 3,
    company: 'Financial Services Firm',
    industry: 'Finance',
    clientSize: 'High Net Worth',
    challenge: 'International clients visiting Austin needed memorable experience to cement trust',
    solution: 'Executive VIP package with luxury dining, cultural presentation, and entertainment',
    results: [
      '$5.8M in assets under management transferred',
      'Clients became brand ambassadors in their network',
      'Generated 8 qualified referrals',
      '22x ROI on entertainment investment'
    ],
    quote: 'Our international clients had seen it all. The Lake Travis VIP experience was something they\'d never done - combining business, culture, and Texas hospitality. They signed that evening.',
    author: 'Senior Wealth Advisor',
    icon: TrendingUp,
    color: 'from-purple-600 to-pink-600'
  }
];

// Sample Menus & Catering Partners
const cateringPartners = [
  {
    name: 'Austin\'s Premier Caterers',
    specialty: 'Gourmet Corporate Dining',
    priceRange: '$$$',
    description: 'Full-service upscale catering with custom menus',
    sampleMenus: [
      {
        name: 'Executive Lunch',
        price: '$45-65/person',
        items: [
          'Grilled Texas beef tenderloin with chimichurri',
          'Pan-seared local fish with lemon caper sauce',
          'Roasted seasonal vegetables',
          'Mixed greens with balsamic vinaigrette',
          'Gourmet dessert selection'
        ]
      },
      {
        name: 'Light Reception',
        price: '$28-38/person',
        items: [
          'Charcuterie boards with artisan cheeses',
          'Shrimp cocktail station',
          'Bacon-wrapped jalapeño poppers',
          'Caprese skewers',
          'Seasonal fruit display'
        ]
      }
    ]
  },
  {
    name: 'Lake Travis BBQ Co.',
    specialty: 'Texas BBQ & Comfort Food',
    priceRange: '$$',
    description: 'Authentic Texas BBQ with Southern sides',
    sampleMenus: [
      {
        name: 'Texas BBQ Feast',
        price: '$32-42/person',
        items: [
          'Slow-smoked brisket and ribs',
          'Texas sausage links',
          'Mac and cheese',
          'Coleslaw and potato salad',
          'Peach cobbler dessert'
        ]
      }
    ]
  },
  {
    name: 'Fusion & Fine Dining',
    specialty: 'International Cuisine',
    priceRange: '$$$',
    description: 'Global flavors with local ingredients',
    sampleMenus: [
      {
        name: 'Global Tapas',
        price: '$38-52/person',
        items: [
          'Mediterranean mezze platter',
          'Asian-fusion lettuce wraps',
          'Latin ceviche cups',
          'European cheese selections',
          'International dessert trio'
        ]
      }
    ]
  }
];

// Presentation & Technology Capabilities
const presentationCapabilities = [
  {
    category: 'Audio/Visual Equipment',
    icon: Monitor,
    features: [
      {
        name: '4K Projection System',
        description: '120" outdoor projection screen with 4K resolution, perfect for product demos and presentations',
        availability: 'Available on 50-person boat'
      },
      {
        name: 'Professional Sound System',
        description: 'Premium Bluetooth speakers with microphone capability for speeches and announcements',
        availability: 'All boats'
      },
      {
        name: 'Wireless Presentation Display',
        description: 'Large-screen TVs with AirPlay and Chromecast for wireless presentations',
        availability: 'Available on 25+ person boats'
      },
      {
        name: 'Professional Microphone',
        description: 'Wireless microphone system for speeches, toasts, and presentations',
        availability: 'Premium and Executive packages'
      }
    ]
  },
  {
    category: 'Connectivity & Technology',
    icon: Wifi,
    features: [
      {
        name: 'High-Speed WiFi',
        description: 'Mobile hotspot with reliable LTE connection for video calls and presentations',
        availability: 'Premium and Executive packages'
      },
      {
        name: 'Video Conferencing Setup',
        description: 'Dedicated area with screen, camera, and audio for remote attendees',
        availability: 'Executive VIP package'
      },
      {
        name: 'Charging Stations',
        description: 'Multiple USB and standard outlets for device charging',
        availability: 'All boats'
      },
      {
        name: 'Presentation Software',
        description: 'Pre-loaded laptop available with PowerPoint, Keynote, and PDF capabilities',
        availability: 'Executive VIP package'
      }
    ]
  },
  {
    category: 'Professional Services',
    icon: Camera,
    features: [
      {
        name: 'Professional Photography',
        description: 'Dedicated photographer to capture client interactions and event highlights',
        availability: 'Add-on for all packages'
      },
      {
        name: 'Videography & Live Streaming',
        description: 'Professional video recording or live streaming of presentations',
        availability: 'Executive VIP package add-on'
      },
      {
        name: 'Event Coordination',
        description: 'On-site coordinator to manage logistics, timing, and special requests',
        availability: 'Executive VIP package'
      },
      {
        name: 'Technical Support',
        description: 'Dedicated A/V technician for presentation setup and troubleshooting',
        availability: 'Executive VIP package'
      }
    ]
  }
];

// Corporate Booking Process
const bookingProcess = [
  {
    step: 1,
    title: 'Initial Consultation',
    icon: Phone,
    description: 'Discuss your client entertainment objectives, guest count, and desired experience level',
    details: [
      'Free 30-minute planning call',
      'Custom package recommendations',
      'Budget and timeline discussion',
      'Special requirements assessment'
    ]
  },
  {
    step: 2,
    title: 'Proposal & Quote',
    icon: FileText,
    description: 'Receive detailed proposal with pricing, package details, and customization options',
    details: [
      'Itemized pricing breakdown',
      'Package comparison options',
      'Catering menu selections',
      'Custom branding opportunities',
      'Valid for 14 days'
    ]
  },
  {
    step: 3,
    title: 'Contract & Payment',
    icon: CreditCard,
    description: 'Simple contract execution with flexible corporate payment options',
    details: [
      'Purchase order acceptance',
      'Corporate credit card processing',
      'ACH/Wire transfer options',
      'Net-30 terms for established clients',
      '25% deposit to secure date'
    ]
  },
  {
    step: 4,
    title: 'Event Planning',
    icon: Calendar,
    description: 'Collaborative planning to perfect every detail of your client entertainment',
    details: [
      'Dedicated event coordinator',
      'Catering coordination and tastings',
      'Custom branding implementation',
      'Guest list and logistics management',
      'Presentation setup and testing'
    ]
  },
  {
    step: 5,
    title: 'Event Execution',
    icon: Trophy,
    description: 'Flawless white-glove service that impresses your clients and achieves your goals',
    details: [
      'Professional crew and staff',
      'Seamless event flow',
      'Real-time support and adjustments',
      'Professional photo/video capture',
      'VIP guest experience'
    ]
  },
  {
    step: 6,
    title: 'Post-Event Follow-up',
    icon: Receipt,
    description: 'Complete documentation and materials for your records and client follow-up',
    details: [
      'Detailed invoice within 48 hours',
      'Professional event photos',
      'Client feedback summary',
      'ROI metrics and insights',
      'Future event planning discount'
    ]
  }
];

// Seasonal & Holiday Entertainment Ideas
const seasonalIdeas = [
  {
    season: 'Spring',
    icon: Sun,
    color: 'from-green-400 to-emerald-500',
    events: [
      {
        name: 'Spring Client Appreciation',
        description: 'Fresh start networking with outdoor activities and light refreshments',
        bestFor: 'Annual client thank-you events, new client welcomes'
      },
      {
        name: 'SXSW Client Entertainment',
        description: 'Escape the SXSW crowds for exclusive lakeside client experiences',
        bestFor: 'Tech clients, creative agencies, international visitors'
      },
      {
        name: 'Bluebonnet Season Tours',
        description: 'Showcase Texas beauty with scenic lake views and springtime celebrations',
        bestFor: 'Out-of-state clients, cultural experiences'
      }
    ]
  },
  {
    season: 'Summer',
    icon: Sparkles,
    color: 'from-yellow-400 to-orange-500',
    events: [
      {
        name: 'July 4th VIP Experience',
        description: 'Premium Independence Day celebration with fireworks views and patriotic themes',
        bestFor: 'Major clients, milestone celebrations, American companies'
      },
      {
        name: 'Summer Sunset Cruises',
        description: 'Evening entertainment with golden hour views and cool lake breezes',
        bestFor: 'After-work networking, executive dinners'
      },
      {
        name: 'Pool Party Atmosphere',
        description: 'Water activities, swimming, and summer fun for relaxed client bonding',
        bestFor: 'Casual client relationships, younger demographics'
      }
    ]
  },
  {
    season: 'Fall',
    icon: Anchor,
    color: 'from-orange-600 to-red-600',
    events: [
      {
        name: 'Harvest Celebration',
        description: 'Autumn-themed entertainment with seasonal cuisine and Texas wine',
        bestFor: 'Thanksgiving client appreciation, harvest themes'
      },
      {
        name: 'College Football Weekends',
        description: 'Combine UT game weekends with luxury lake entertainment',
        bestFor: 'Alumni clients, sports enthusiasts, Texas pride'
      },
      {
        name: 'Fall Foliage Tours',
        description: 'Scenic cruises showcasing Hill Country autumn colors',
        bestFor: 'Photography opportunities, nature lovers'
      }
    ]
  },
  {
    season: 'Winter',
    icon: Snowflake,
    color: 'from-blue-400 to-cyan-500',
    events: [
      {
        name: 'Holiday Party Cruises',
        description: 'Festive December celebrations with holiday décor and seasonal menus',
        bestFor: 'Year-end client appreciation, holiday networking'
      },
      {
        name: 'New Year\'s Planning Retreat',
        description: 'Strategic planning sessions with champagne toasts and goal-setting',
        bestFor: 'Executive planning, new year kickoffs'
      },
      {
        name: 'Super Bowl Weekend',
        description: 'Pre-game or post-game luxury entertainment for sports-minded clients',
        bestFor: 'Sports fans, Super Bowl parties, big game celebrations'
      }
    ]
  }
];

// VIP Treatment Details
const vipTreatments = [
  {
    category: 'Personalized Service',
    icon: Crown,
    color: 'from-yellow-500 to-amber-600',
    treatments: [
      {
        name: 'Personal Client Concierge',
        description: 'Dedicated concierge service for each VIP client from arrival to departure',
        included: 'Executive VIP package'
      },
      {
        name: 'Custom Welcome Experience',
        description: 'Personalized boarding with client name displays and welcome beverages',
        included: 'Premium and Executive packages'
      },
      {
        name: 'VIP Seating Arrangements',
        description: 'Reserved premium seating areas with best views and comfort',
        included: 'All packages (customizable)'
      },
      {
        name: 'Executive Gift Bags',
        description: 'Luxury branded gift bags with premium items and company swag',
        included: 'Executive VIP package'
      }
    ]
  },
  {
    category: 'Luxury Amenities',
    icon: Diamond,
    color: 'from-purple-500 to-pink-600',
    treatments: [
      {
        name: 'Premium Bar Service',
        description: 'Top-shelf spirits, fine wines, craft cocktails, and sommelier service',
        included: 'Executive VIP package'
      },
      {
        name: 'Gourmet Dining Experience',
        description: 'Multi-course meals from celebrity chefs with wine pairings',
        included: 'Executive VIP package'
      },
      {
        name: 'Luxury Transportation',
        description: 'Coordinated luxury car service for client pickup and drop-off',
        included: 'Executive VIP add-on'
      },
      {
        name: 'Spa & Wellness Amenities',
        description: 'Premium towels, sunscreen, refreshing towelettes, and comfort items',
        included: 'Premium and Executive packages'
      }
    ]
  },
  {
    category: 'Exclusive Experiences',
    icon: Star,
    color: 'from-blue-500 to-indigo-600',
    treatments: [
      {
        name: 'Private Chef Service',
        description: 'Live cooking demonstrations and custom menu preparation on board',
        included: 'Executive VIP add-on'
      },
      {
        name: 'Live Entertainment',
        description: 'Professional musicians, DJs, or entertainers for atmosphere',
        included: 'Executive VIP add-on'
      },
      {
        name: 'Sunset Champagne Toast',
        description: 'Timed perfectly with golden hour for memorable client moments',
        included: 'Premium and Executive packages'
      },
      {
        name: 'Exclusive Lake Access',
        description: 'Private coves and hidden spots for swimming and water activities',
        included: 'All packages (captain\'s discretion)'
      }
    ]
  }
];

// Executive Retreat Capabilities
const retreatCapabilities = [
  {
    category: 'Strategic Planning Sessions',
    icon: Briefcase,
    capabilities: [
      {
        name: 'Boardroom on Water',
        description: 'Conference-style seating with presentation equipment for executive sessions',
        capacity: '8-20 executives',
        duration: '4-8 hours'
      },
      {
        name: 'Breakout Session Areas',
        description: 'Multiple deck levels for simultaneous working groups',
        capacity: '3-5 groups',
        duration: 'Flexible'
      },
      {
        name: 'Vision & Goal Setting',
        description: 'Facilitated planning sessions in inspiring lakeside environment',
        capacity: '10-50 participants',
        duration: '4-6 hours'
      }
    ]
  },
  {
    category: 'Team Building & Bonding',
    icon: Users,
    capabilities: [
      {
        name: 'Leadership Development',
        description: 'Executive coaching and leadership exercises on the water',
        capacity: '5-15 leaders',
        duration: '6-8 hours'
      },
      {
        name: 'Trust-Building Activities',
        description: 'Water-based challenges designed for executive team cohesion',
        capacity: '8-25 executives',
        duration: '3-5 hours'
      },
      {
        name: 'Informal Networking',
        description: 'Structured and unstructured time for relationship building',
        capacity: 'Up to 50',
        duration: 'Throughout event'
      }
    ]
  },
  {
    category: 'Wellness & Renewal',
    icon: Heart,
    capabilities: [
      {
        name: 'Executive Wellness Focus',
        description: 'Stress reduction through nature, water activities, and relaxation',
        capacity: 'All group sizes',
        duration: '3-8 hours'
      },
      {
        name: 'Mindfulness Sessions',
        description: 'Optional guided meditation and wellness activities on deck',
        capacity: '10-30 participants',
        duration: '30-60 minutes'
      },
      {
        name: 'Work-Life Balance',
        description: 'Demonstrate company commitment to executive wellbeing',
        capacity: 'All executives',
        duration: 'Event-long theme'
      }
    ]
  }
];

// Sophisticated Entertainment Options
const entertainmentOptions = [
  {
    category: 'Live Performances',
    icon: Music,
    options: [
      {
        name: 'Jazz Trio or Quartet',
        description: 'Elegant live jazz for sophisticated ambiance during dining',
        price: '$800-1,500',
        duration: '2-3 hours'
      },
      {
        name: 'Acoustic Guitarist/Singer',
        description: 'Professional musician for background music and atmosphere',
        price: '$400-800',
        duration: '2-4 hours'
      },
      {
        name: 'String Quartet',
        description: 'Classical elegance for high-end client entertainment',
        price: '$1,200-2,000',
        duration: '2-3 hours'
      },
      {
        name: 'DJ with Premium Sound',
        description: 'Professional DJ for dancing and party atmosphere',
        price: '$600-1,200',
        duration: '3-5 hours'
      }
    ]
  },
  {
    category: 'Interactive Experiences',
    icon: Palette,
    options: [
      {
        name: 'Wine Tasting & Sommelier',
        description: 'Guided wine tasting with Texas Hill Country vintages',
        price: '$45-75/person',
        duration: '60-90 minutes'
      },
      {
        name: 'Whiskey & Cigar Experience',
        description: 'Premium spirits tasting with Cuban cigar pairings',
        price: '$65-95/person',
        duration: '90 minutes'
      },
      {
        name: 'Cooking Demonstration',
        description: 'Celebrity chef creates signature dish while entertaining',
        price: '$1,000-2,500',
        duration: '45-60 minutes'
      },
      {
        name: 'Art & Culture Experience',
        description: 'Local artist creates live paintings or demonstrations',
        price: '$500-1,000',
        duration: '2-3 hours'
      }
    ]
  },
  {
    category: 'Custom Entertainment',
    icon: Film,
    options: [
      {
        name: 'Corporate Film Screening',
        description: 'Movie or corporate video screening with outdoor cinema setup',
        price: '$400-800',
        duration: '1-2 hours'
      },
      {
        name: 'Motivational Speaker',
        description: 'Keynote speaker or industry expert for inspiration',
        price: '$2,000-10,000',
        duration: '30-60 minutes'
      },
      {
        name: 'Comedy Performance',
        description: 'Professional comedian for light-hearted entertainment',
        price: '$1,500-3,500',
        duration: '30-45 minutes'
      },
      {
        name: 'Magician/Mentalist',
        description: 'Close-up magic and mentalism for client amazement',
        price: '$800-2,000',
        duration: '60-90 minutes'
      }
    ]
  }
];

// FAQs - Updated for corporate focus
const faqItems = [
  {
    id: 'included',
    question: "What's included in client entertainment packages?",
    answer: 'All packages include licensed captain & crew, premium sound system, coolers with ice, restrooms, sun & shade seating, and safety equipment. Premium and Executive packages add catering coordination, presentation equipment, WiFi, and white-glove service.'
  },
  {
    id: 'catering',
    question: 'How does catering work for corporate events?',
    answer: 'We coordinate with Austin\'s top caterers to provide custom menus. Options range from $28-65 per person. We handle all logistics including setup, service, and cleanup. BYOB is also allowed for all packages.'
  },
  {
    id: 'deposits-payments',
    question: 'What are the payment terms for corporate bookings?',
    answer: 'We accept purchase orders, corporate credit cards, ACH transfers, and checks. 25% deposit secures your date, with balance due 30 days before the event. Established corporate clients may qualify for Net-30 terms.'
  },
  {
    id: 'presentations',
    question: 'Can we do presentations and business meetings on board?',
    answer: 'Absolutely! Premium and Executive packages include presentation equipment, WiFi, and dedicated presentation areas. Our 50-person boat has a 120" projection screen, and all boats have wireless display capabilities.'
  },
  {
    id: 'cancellation',
    question: 'What\'s your cancellation policy for corporate events?',
    answer: '48-hour full refund window after booking. For established corporate clients, we offer flexible rescheduling. Weather cancellations are at captain\'s discretion with full refunds or reschedules offered.'
  },
  {
    id: 'capacity',
    question: 'What\'s the maximum capacity for client entertainment events?',
    answer: 'We accommodate 14-75 guests across our fleet. The 14-person boat is perfect for executive entertaining, 25-person for key client groups, and 50-person for major client events and networking.'
  },
  {
    id: 'branding',
    question: 'Can we add company branding to the event?',
    answer: 'Yes! Premium and Executive packages include custom branding opportunities including welcome displays, banners, branded materials, and logo projections. We can also coordinate branded gift bags and merchandise.'
  },
  {
    id: 'entertainment-options',
    question: 'What entertainment options are available?',
    answer: 'We offer live musicians (jazz, classical, acoustic), DJs, wine tastings, celebrity chef demonstrations, motivational speakers, and more. Entertainment can be added to any package and customized to your client audience.'
  }
];

// Testimonials - Updated with more corporate focus
const testimonials = [
  {
    id: 1,
    name: 'Richard Anderson',
    role: 'Partner, Law Firm',
    rating: 5,
    text: 'We\'ve entertained our top clients on Premier Party Cruises three times now. The professional service, attention to detail, and stunning Lake Travis views never fail to impress. It\'s become our go-to for important client events.',
    image: '/testimonials/richard.jpg'
  },
  {
    id: 2,
    name: 'Lisa Martinez',
    role: 'VP Sales, Tech Company',
    rating: 5,
    text: 'Closed our biggest deal of the year after a client cruise. The relaxed atmosphere and VIP treatment showed our clients how much we value the relationship. Worth every penny for the ROI.',
    image: '/testimonials/lisa.jpg'
  },
  {
    id: 3,
    name: 'James Chen',
    role: 'CEO, Financial Services',
    rating: 5,
    text: 'The Executive VIP package exceeded expectations. Our international clients were blown away by the experience. The crew was discreet and professional, the food was exceptional, and the setting was perfect.',
    image: '/testimonials/james.jpg'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    role: 'Marketing Director, Fortune 500',
    rating: 5,
    text: 'We needed something unique for our executive retreat. The Lake Travis cruise provided the perfect balance of business and pleasure. The presentation equipment worked flawlessly, and the team bonding was incredible.',
    image: '/testimonials/sarah.jpg'
  }
];

export default function ClientEntertainment() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState('premium-experience');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleGetQuote = () => {
    navigate('/chat?eventType=client-entertainment');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=client-entertainment&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/client-entertainment"
        defaultTitle="Client Entertainment Cruises Austin | Corporate Events Lake Travis | Premier Party Cruises"
        defaultDescription="Impress clients with luxury Lake Travis cruises. Gourmet dining, premium bar service, presentation capabilities. Fortune 500 trusted. ROI-focused client entertainment. Book today!"
        defaultKeywords={[
          'client entertainment austin',
          'corporate client cruise lake travis',
          'business entertainment austin tx',
          'client appreciation events',
          'luxury corporate cruise austin',
          'executive vip entertainment',
          'client relationship building',
          'corporate hospitality austin'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section with Crossfade */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        {/* Image Background with Smooth Crossfade */}
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
                alt="Client Entertainment Party Boat Austin cruise on Lake Travis - Professional corporate events"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "low"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </motion.div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white flex-grow flex items-center">
          <motion.div 
            className="max-w-4xl mx-auto text-center w-full"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-4 py-2 text-lg bg-white/20 backdrop-blur-sm border-white/30">
                <Diamond className="mr-2 h-5 w-5" />
                Impress Your Most Important Clients
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Client Entertainment
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Cruises
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Create unforgettable experiences that strengthen relationships and 
              close deals on Austin's beautiful Lake Travis.
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
                Plan Client Event
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

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">500+</div>
                <div className="text-sm text-white/80">Corporate Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">Fortune 500</div>
                <div className="text-sm text-white/80">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">8-15x</div>
                <div className="text-sm text-white/80">Average ROI</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
              <span className="text-brand-blue">Impress & Close Deals</span> • Professional Service • <span className="text-brand-blue">Proven ROI Results</span>
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
              Get instant pricing for your client entertainment event in minutes
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

      {/* Tiered Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Tiered Client Entertainment Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From basic client appreciation to executive VIP experiences - choose the perfect level 
              of luxury to match your business objectives and ROI goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {clientPackages.map((pkg, index) => (
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
                    <CardDescription className="text-sm mt-2">{pkg.subtitle}</CardDescription>
                    
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-brand-blue">
                        ${pkg.basePrice}<span className="text-lg font-normal">/hr</span>
                      </div>
                      {pkg.addOnPrice && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          +${pkg.addOnPrice}/hr from base
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Minimum 3 hours</p>
                    </div>

                    <Badge variant="outline" className="mt-3">
                      {pkg.roi}
                    </Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      {pkg.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-semibold mb-2">Ideal For:</p>
                      <Badge variant="secondary" className="text-xs">
                        {pkg.ideal}
                      </Badge>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={handleGetQuote}
                      data-testid={`button-package-${pkg.id}`}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories & ROI Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-2 text-base">
              <TrendingUp className="mr-2 h-4 w-4" />
              Proven Results
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Client Success Stories & ROI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real results from companies who invested in client entertainment and 
              saw measurable returns on their business relationships.
            </p>
          </motion.div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className={cn(
                    "h-2 bg-gradient-to-r",
                    story.color
                  )} />
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <div className={cn(
                          "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center mb-4",
                          story.color
                        )}>
                          <story.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{story.company}</h3>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <p><strong>Industry:</strong> {story.industry}</p>
                          <p><strong>Client Size:</strong> {story.clientSize}</p>
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Challenge:</h4>
                          <p className="text-gray-600 dark:text-gray-400">{story.challenge}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Solution:</h4>
                          <p className="text-gray-600 dark:text-gray-400">{story.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Results:</h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {story.results.map((result, idx) => (
                              <div key={idx} className="flex items-start">
                                <Trophy className="h-5 w-5 text-brand-yellow mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm font-medium">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-brand-blue">
                          <Quote className="h-5 w-5 text-brand-blue mb-2" />
                          <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                            "{story.quote}"
                          </p>
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            — {story.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Menus & Catering Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-2 text-base">
              <ChefHat className="mr-2 h-4 w-4" />
              Gourmet Experiences
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Sample Menus & Catering Partners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Impress your clients with cuisine from Austin's finest caterers. We coordinate 
              everything from elegant receptions to multi-course gourmet dinners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cateringPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                        <Utensils className="h-6 w-6 text-brand-blue" />
                      </div>
                      <Badge variant="outline">{partner.priceRange}</Badge>
                    </div>
                    <CardTitle className="text-xl">{partner.name}</CardTitle>
                    <CardDescription>{partner.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {partner.description}
                    </p>

                    {partner.sampleMenus.map((menu, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{menu.name}</h4>
                          <span className="text-sm text-brand-blue font-medium">{menu.price}</span>
                        </div>
                        <ul className="space-y-1">
                          {menu.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Custom menus available for dietary restrictions, cultural preferences, and special requests
            </p>
            <Button onClick={handleGetQuote} size="lg" variant="outline" data-testid="button-catering-quote">
              <MessageSquare className="mr-2 h-5 w-5" />
              Discuss Catering Options
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Presentation & Technology Capabilities */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-2 text-base">
              <Presentation className="mr-2 h-4 w-4" />
              Business Ready
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Presentation & Technology Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Conduct business on the water with professional presentation equipment, 
              high-speed WiFi, and full A/V capabilities.
            </p>
          </motion.div>

          <Tabs defaultValue="av" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="av">Audio/Visual</TabsTrigger>
              <TabsTrigger value="tech">Connectivity</TabsTrigger>
              <TabsTrigger value="services">Professional Services</TabsTrigger>
            </TabsList>

            {presentationCapabilities.map((category) => (
              <TabsContent 
                key={category.category} 
                value={category.category === 'Audio/Visual Equipment' ? 'av' : category.category === 'Connectivity & Technology' ? 'tech' : 'services'}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {category.features.map((feature, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center">
                              <category.icon className="h-5 w-5 text-brand-blue mr-2" />
                              {feature.name}
                            </CardTitle>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {feature.availability}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Corporate Booking Process */}
      <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-purple-100/20 dark:from-brand-blue/10 dark:to-purple-900/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-2 text-base">
              <Briefcase className="mr-2 h-4 w-4" />
              Simple & Professional
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Corporate Booking Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From initial consultation to post-event follow-up, we make corporate 
              event planning seamless with purchase orders, flexible terms, and dedicated support.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {bookingProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <step.icon className="h-6 w-6 text-brand-blue" />
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {step.description}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button onClick={handleGetQuote} size="lg" data-testid="button-start-booking">
              <Calendar className="mr-2 h-5 w-5" />
              Start Your Corporate Booking
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Seasonal & Holiday Entertainment Ideas */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-2 text-base">
              <Calendar className="mr-2 h-4 w-4" />
              Year-Round Opportunities
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Seasonal & Holiday Entertainment Ideas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Create memorable client experiences throughout the year with seasonal themes 
              and holiday celebrations tailored to your business calendar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {seasonalIdeas.map((season, index) => (
              <motion.div
                key={season.season}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className={cn(
                      "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center mb-4",
                      season.color
                    )}>
                      <season.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{season.season}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {season.events.map((event, idx) => (
                      <div key={idx} className="pb-4 last:pb-0 border-b last:border-0 dark:border-gray-800">
                        <h4 className="font-semibold text-brand-blue mb-1">{event.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {event.description}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {event.bestFor}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Treatment & Executive Retreat */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-2 text-base">
              <Crown className="mr-2 h-4 w-4" />
              Ultimate Luxury
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              VIP Treatment & Executive Retreat Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Deliver unforgettable VIP experiences and host productive executive retreats 
              that combine strategic planning with relationship building.
            </p>
          </motion.div>

          <Tabs defaultValue="vip" className="max-w-6xl mx-auto mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="vip">VIP Treatment</TabsTrigger>
              <TabsTrigger value="luxury">Luxury Amenities</TabsTrigger>
              <TabsTrigger value="exclusive">Exclusive Experiences</TabsTrigger>
            </TabsList>

            {vipTreatments.map((treatment) => (
              <TabsContent 
                key={treatment.category} 
                value={treatment.category === 'Personalized Service' ? 'vip' : treatment.category === 'Luxury Amenities' ? 'luxury' : 'exclusive'}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {treatment.treatments.map((item, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {item.included}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Executive Retreat Capabilities */}
          <div className="border-t dark:border-gray-800 pt-16">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Executive Retreat Capabilities
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transform your executive retreat with strategic planning sessions and team building 
                in an inspiring lakeside environment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {retreatCapabilities.map((retreat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                        <retreat.icon className="h-6 w-6 text-brand-blue" />
                      </div>
                      <CardTitle className="text-xl">{retreat.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {retreat.capabilities.map((cap, idx) => (
                        <div key={idx} className="pb-4 last:pb-0 border-b last:border-0 dark:border-gray-800">
                          <h4 className="font-semibold mb-2">{cap.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {cap.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {cap.capacity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {cap.duration}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sophisticated Entertainment Options */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-2 text-base">
              <Music className="mr-2 h-4 w-4" />
              Premium Entertainment
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Sophisticated Entertainment Options
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Elevate your client entertainment with world-class performers, interactive 
              experiences, and custom entertainment tailored to your audience.
            </p>
          </motion.div>

          <Tabs defaultValue="live" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="live">Live Performances</TabsTrigger>
              <TabsTrigger value="interactive">Interactive Experiences</TabsTrigger>
              <TabsTrigger value="custom">Custom Entertainment</TabsTrigger>
            </TabsList>

            {entertainmentOptions.map((entertainment) => (
              <TabsContent 
                key={entertainment.category} 
                value={entertainment.category === 'Live Performances' ? 'live' : entertainment.category === 'Interactive Experiences' ? 'interactive' : 'custom'}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {entertainment.options.map((option, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <entertainment.icon className="h-8 w-8 text-brand-blue" />
                          <div className="text-right">
                            <p className="text-sm font-semibold text-brand-blue">{option.price}</p>
                            <p className="text-xs text-gray-500">{option.duration}</p>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{option.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All entertainment options can be customized to match your brand, audience, and event objectives
            </p>
            <Button onClick={handleGetQuote} size="lg" variant="outline" data-testid="button-entertainment-quote">
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Entertainment Options
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-purple-100/20 dark:from-brand-blue/10 dark:to-purple-900/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              What Our Corporate Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Trusted by businesses across Austin for exceptional client entertainment
            </p>
          </motion.div>

          <Carousel className="max-w-5xl mx-auto" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-brand-blue" />
                        </div>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Client Entertainment Gallery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See how we create impressive experiences for our corporate clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[galleryImage1, galleryImage2, galleryImage3].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={image}
                  alt={`Client entertainment event ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-semibold">Client Event {index + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about corporate client entertainment
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqItems.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Ready to Impress Your Most Important Clients?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let's create an unforgettable client entertainment experience that strengthens 
              relationships and drives business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6"
                data-testid="button-final-cta"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Your Client Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = 'tel:5124885892'}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-call-now"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (512) 488-5892
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Content - Hidden but indexed */}
      <div className="sr-only" aria-hidden="true">
        <h2>Client Entertainment Pricing by Group Size</h2>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">14 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$200</span> per hour for groups up to 14 people</p>
          <p itemProp="description">Perfect for VIP client experiences and executive entertaining</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">15-25 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$250</span> per hour for groups of 15-25 people</p>
          <p itemProp="description">Ideal for client appreciation and business networking events</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">26-30 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$300</span> per hour for groups of 26-30 people</p>
          <p itemProp="description">Perfect for client mixers and business development events</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">31-50 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$350</span> per hour for groups of 31-50 people</p>
          <p itemProp="description">Ideal for major client events and industry networking</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">51-75 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$400</span> per hour for groups of 51-75 people</p>
          <p itemProp="description">Perfect for large client appreciation events</p>
        </div>
        
        <h2>Client Entertainment Features & Capabilities</h2>
        <ul>
          <li>Premium bar service with top-shelf spirits and fine wines</li>
          <li>Gourmet catering from Austin's best caterers - sample menus from $28-65 per person</li>
          <li>Professional networking layout designed for business conversations</li>
          <li>Scenic routes showcasing Lake Travis and Austin beauty</li>
          <li>Custom company branding and signage options</li>
          <li>White-glove service from professional staff</li>
          <li>VIP treatment to impress your most important clients</li>
          <li>Full amenities for comfort and luxury</li>
          <li>Professional presentation equipment - 4K projection, wireless displays, microphones</li>
          <li>High-speed WiFi and video conferencing capabilities</li>
          <li>Executive retreat planning and strategic session support</li>
          <li>Seasonal and holiday themed entertainment options</li>
          <li>Live entertainment - jazz bands, DJs, wine tastings, celebrity chefs</li>
          <li>Professional photography and videography services</li>
          <li>Purchase order processing and corporate payment terms</li>
          <li>Proven ROI - 8-15x average return on client entertainment investment</li>
          <li>Fortune 500 trusted - over 500 corporate events executed</li>
          <li>Experienced captain and professional crew</li>
        </ul>
        
        <h2>Keywords: Client Entertainment Austin, Corporate Events Lake Travis, Business Boat Cruise</h2>
        <p>
          client entertainment Austin, corporate client events Lake Travis, client entertainment boat cruise, 
          business entertainment Austin, client appreciation Lake Travis, corporate hospitality Austin Texas, 
          VIP client events boat Austin, business development Lake Travis, corporate party boat Austin, 
          client networking cruise Austin, Lake Travis corporate entertainment, Austin client events boat, 
          business relationship building Austin, client appreciation cruise Austin, corporate boat rental Austin,
          executive vip entertainment Austin, luxury client entertainment Lake Travis, corporate retreat Austin,
          business entertainment Lake Travis, client relationship ROI, Fortune 500 client events Austin,
          gourmet catering corporate events, presentation equipment boat Austin, corporate WiFi boat cruise,
          seasonal client entertainment, holiday corporate events Austin, executive retreat Lake Travis
        </p>
        
        <h2>Fleet Options for Client Entertainment</h2>
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Day Tripper - 14 Person Boat</h3>
          <p itemProp="description">
            Perfect for VIP client entertainment and executive hosting. Intimate luxury setting with premium 
            amenities, ideal for confidential business discussions and high-level relationship building.
          </p>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Me Seeks the Irony - 25 Person Boat</h3>
          <p itemProp="description">
            Ideal for client appreciation events. Spacious layout for networking, comfortable seating for 
            conversations, perfect size for impressive yet intimate business entertainment, presentation equipment available.
          </p>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Clever Girl - 50 Person Boat</h3>
          <p itemProp="description">
            Our flagship vessel for major client events. Multiple deck levels for mingling, 4K presentation 
            areas for announcements, luxury amenities that demonstrate your commitment to excellence, full A/V capabilities.
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Corporate Client Entertainment Events",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "image": "https://premierpartycruises.com/logo.png",
            "@id": "https://premierpartycruises.com",
            "url": "https://premierpartycruises.com",
            "telephone": "(512) 488-5892",
            "priceRange": "$200-$400 per hour",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Lake Travis",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "postalCode": "78734",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.3894,
              "longitude": -97.9322
            },
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "21:00"
            }],
            "sameAs": [
              "https://www.facebook.com/premierpartycruises",
              "https://www.instagram.com/premierpartycruises"
            ]
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin",
            "sameAs": "https://en.wikipedia.org/wiki/Austin,_Texas"
          },
          "description": "VIP client entertainment experiences on Lake Travis in Austin, Texas. Luxury boat cruises with gourmet catering, premium service, presentation capabilities, and white-glove hospitality for groups of 14-75 people. Proven 8-15x ROI on client relationships.",
          "offers": [
            {
              "@type": "Offer",
              "name": "Basic Client Appreciation Package",
              "price": "200",
              "priceCurrency": "USD",
              "description": "Professional client entertainment with essential amenities up to 14 people"
            },
            {
              "@type": "Offer",
              "name": "Premium Client Experience Package",
              "price": "275",
              "priceCurrency": "USD",
              "description": "Elevated client entertainment with full-service amenities, catering coordination, and presentation equipment for 15-25 people"
            },
            {
              "@type": "Offer",
              "name": "Executive VIP Entertainment Package",
              "price": "400",
              "priceCurrency": "USD",
              "description": "Ultimate luxury client entertainment with gourmet service, full A/V capabilities, and executive retreat planning for 26-50 people"
            }
          ]
        })
      }} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />

      {/* Related Links */}
      <RelatedLinks 
        blogLinks={[
          { title: 'Client Entertainment Best Practices', href: '/blogs/client-entertainment-ideas-austin' },
          { title: 'Luxury Corporate Events Guide', href: '/blogs/luxury-corporate-events-lake-travis' },
          { title: 'Impress Your Clients', href: '/blogs/impressive-client-appreciation-events' },
          { title: 'ROI of Client Entertainment', href: '/blogs/client-entertainment-roi' },
          { title: 'Executive Retreat Planning', href: '/blogs/executive-retreat-lake-travis' }
        ]}
      />

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/client-entertainment/#service",
                    "name": "Private Cruise — Client Entertainment",
                    "provider": {
                              "@id": "https://premierpartycruises.com/#organization"
                    },
                    "areaServed": [
                              "Austin TX",
                              "Texas",
                              "United States"
                    ],
                    "description": "Private 3–4 hour cruise with licensed, experienced captain & crew, premium Bluetooth sound, coolers, restrooms, sun & shade seating. Choose Essentials or Ultimate Disco Party package add‑ons."
          })
      }} />

      <Footer />
    </div>
  );
}
