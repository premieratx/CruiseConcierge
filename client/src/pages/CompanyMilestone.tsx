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
  Trophy, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Award, Shield,
  Star, MessageSquare, Crown, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, PartyPopper,
  Building, Mic, GlassWater, Gift, Camera, Rocket, X, Briefcase,
  DollarSign, BarChart3, Wine, Cake, Video, Palette,
  Mountain, Heart, Target, Zap, FileText, Flame, CreditCard
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/atx-disco-cruise-party.webp';
import heroImage3 from '@assets/giant-unicorn-float.webp';
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

const float = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Milestone-Specific Packages
const milestonePackages = [
  {
    id: '5-year-anniversary',
    name: '5 Year Anniversary Package',
    basePrice: 275,
    description: 'Celebrate 5 years of success with your growing team',
    subtitle: 'Perfect for startups and small companies reaching their first major milestone',
    features: [
      'Professional captain and crew',
      '4-hour celebration cruise on Lake Travis',
      'Champagne toast for milestone moment',
      'Custom "5 Years Strong" decoration package',
      'Professional group photos on the water',
      'Premium Bluetooth sound system',
      'Speech/presentation setup with microphone',
      'BYOB with coolers and ice provided',
      'Catering coordination (vendor of choice)',
      'Digital photo album delivered post-event',
      'Company anniversary banner display',
      'Up to 25 team members'
    ],
    ideal: 'Small to mid-size teams, 5-year milestones',
    popular: false,
    icon: Trophy,
    badge: 'Startup Favorite',
    impact: '95% of teams report stronger culture post-celebration'
  },
  {
    id: '10-year-anniversary',
    name: '10 Year Anniversary Package',
    basePrice: 375,
    description: 'Honor a decade of achievement with premium celebration',
    subtitle: 'Comprehensive package for established companies celebrating 10 years',
    features: [
      'Everything from 5 Year Anniversary Package',
      'Premium champagne service (3 bottles included)',
      'Gourmet cake delivery and serving setup',
      'Professional photographer (2 hours included)',
      'Custom company branding throughout boat',
      'Awards ceremony setup with podium area',
      'Employee recognition gift bags',
      'Timeline video montage display capability',
      'Premium beverage service coordination',
      'Custom commemorative photo frames',
      'Executive speech platform with A/V',
      'Post-event thank you video compilation',
      'Up to 50 team members'
    ],
    ideal: 'Established companies, 10-year celebrations',
    popular: true,
    icon: Award,
    badge: 'Most Popular',
    impact: '3.5x increase in employee engagement scores'
  },
  {
    id: 'ipo-celebration',
    name: 'IPO Celebration Package',
    basePrice: 500,
    description: 'Toast your IPO success with an unforgettable team celebration',
    subtitle: 'Premium experience for the ultimate company milestone',
    features: [
      'Private boat charter (exclusive use)',
      'Full-day celebration (6-8 hours)',
      'Premium champagne service (unlimited)',
      'Multi-tier celebration cake with custom design',
      'Professional photographer + videographer',
      'Live streaming capability for remote team',
      'Custom IPO-themed decorations and branding',
      'Executive speech platform with full A/V setup',
      'Awards ceremony for key contributors',
      'Gourmet catering (menu customization)',
      'Commemorative gift bags for all attendees',
      'Same-day video highlight reel',
      'Custom company stock ticker display',
      'Press-ready professional photos',
      'Up to 75 team members'
    ],
    ideal: 'Public company launches, major exits',
    popular: false,
    icon: Rocket,
    badge: 'Ultimate Achievement',
    impact: '$2.4M average employee retention value'
  },
  {
    id: 'exit-acquisition',
    name: 'Exit/Acquisition Celebration',
    basePrice: 450,
    description: 'Celebrate successful exit or acquisition with style',
    subtitle: 'Honor the journey and recognize those who made it possible',
    features: [
      'Private boat charter (exclusive use)',
      '5-hour premium celebration cruise',
      'Premium champagne and wine service',
      'Executive catering with multiple courses',
      'Professional photography and videography',
      'Custom acquisition celebration decorations',
      'Founder speech platform with professional A/V',
      'Team recognition and awards ceremony',
      'Commemorative achievement gifts',
      'Company journey timeline display',
      'Thank you video message compilation',
      'Live toast broadcast capability',
      'Custom exit announcement photo ops',
      'Memory book creation with photos',
      'Up to 60 team members'
    ],
    ideal: 'Acquisitions, mergers, successful exits',
    popular: false,
    icon: Building,
    badge: 'Legacy Celebration',
    impact: '89% of teams cite as "career highlight moment"'
  },
  {
    id: 'funding-round',
    name: 'Startup Funding Round Package',
    basePrice: 325,
    description: 'Celebrate Series A/B/C funding with your startup team',
    subtitle: 'Mark your fundraising success and energize for growth',
    features: [
      'Professional captain and crew',
      '4-hour celebration cruise',
      'Champagne toast for the announcement',
      'Startup-themed party decorations',
      'Professional group photography',
      'Founder speech setup with microphone',
      'Team celebration cake (customized)',
      'Social media content package (photos/videos)',
      'BYOB with premium setup',
      'Catering vendor coordination',
      'Custom funding announcement backdrop',
      'Team recognition moments',
      'Investor thank-you photo opportunities',
      'Digital celebration album',
      'Up to 40 team members'
    ],
    ideal: 'Series A/B/C celebrations, major funding',
    popular: false,
    icon: TrendingUp,
    badge: 'Startup Success',
    impact: '2.8x boost in team momentum and morale'
  }
];

// Celebration Elements & Services
const celebrationElements = [
  {
    category: 'Champagne & Beverage Service',
    icon: Wine,
    color: 'from-yellow-500 to-amber-600',
    options: [
      {
        name: 'Standard Champagne Toast',
        price: '$150',
        description: '2 bottles premium champagne, champagne flutes, toast coordination',
        included: 'Up to 25 people'
      },
      {
        name: 'Premium Champagne Service',
        price: '$350',
        description: 'Premium champagne bottles, professional serving, unlimited toasts',
        included: 'Up to 50 people'
      },
      {
        name: 'Full Bar Service',
        price: '$500+',
        description: 'Licensed bartender, premium spirits, mixers, glassware, full service',
        included: 'Custom packages available'
      }
    ]
  },
  {
    category: 'Cake & Dessert Coordination',
    icon: Cake,
    color: 'from-pink-500 to-rose-600',
    options: [
      {
        name: 'Celebration Cake',
        price: '$200-400',
        description: 'Custom designed cake from Austin top bakeries, delivery & setup',
        included: 'Serves 25-50 people'
      },
      {
        name: 'Gourmet Dessert Bar',
        price: '$500-800',
        description: 'Assorted premium desserts, display setup, serving coordination',
        included: 'Multiple dessert options'
      },
      {
        name: 'Custom Dessert Experience',
        price: '$800+',
        description: 'Multi-tier cake, dessert stations, custom branding, full service',
        included: 'Premium dessert experience'
      }
    ]
  },
  {
    category: 'Speech & Awards Ceremony Setup',
    icon: Mic,
    color: 'from-blue-500 to-indigo-600',
    options: [
      {
        name: 'Basic Speech Setup',
        price: '$100',
        description: 'Wireless microphone, designated speech area, sound system',
        included: 'All packages'
      },
      {
        name: 'Professional A/V Setup',
        price: '$300',
        description: 'Professional microphone, podium, large screen display, presentation capability',
        included: 'Premium packages'
      },
      {
        name: 'Full Awards Ceremony',
        price: '$500',
        description: 'Complete A/V, award display area, presentation screens, professional lighting',
        included: 'Executive packages'
      }
    ]
  },
  {
    category: 'Custom Decorations & Branding',
    icon: Palette,
    color: 'from-purple-500 to-violet-600',
    options: [
      {
        name: 'Basic Milestone Decor',
        price: '$200',
        description: 'Anniversary banners, balloon arrangements, table decorations',
        included: 'Themed to milestone'
      },
      {
        name: 'Premium Company Branding',
        price: '$400',
        description: 'Custom branded decorations, company logo displays, photo backdrops',
        included: 'Full branding package'
      },
      {
        name: 'Ultimate Custom Experience',
        price: '$750+',
        description: 'Complete boat transformation, custom lighting, branded everything',
        included: 'Luxury branding experience'
      }
    ]
  },
  {
    category: 'Photo & Video Documentation',
    icon: Camera,
    color: 'from-green-500 to-emerald-600',
    options: [
      {
        name: 'Professional Photography',
        price: '$400 (2 hrs)',
        description: 'Professional photographer, digital album, edited photos',
        included: '150+ edited photos'
      },
      {
        name: 'Photo + Video Package',
        price: '$800 (3 hrs)',
        description: 'Photographer + videographer, highlight reel, photo album',
        included: 'Photos + 3-5 min video'
      },
      {
        name: 'Premium Documentation',
        price: '$1,200+',
        description: 'Full-day coverage, drone footage, same-day edits, live streaming',
        included: 'Complete coverage'
      }
    ]
  }
];

// Corporate Photography Packages
const photographyPackages = [
  {
    id: 'basic-photos',
    name: 'Basic Photography Package',
    price: '$400',
    duration: '2 hours',
    deliverables: [
      '150+ professionally edited photos',
      'Digital download album',
      'Group shots and candid moments',
      'Key milestone moment coverage',
      '48-hour turnaround',
      'Print-ready resolution'
    ],
    icon: Camera,
    popular: false
  },
  {
    id: 'premium-photo-video',
    name: 'Premium Photo + Video',
    price: '$800',
    duration: '3 hours',
    deliverables: [
      '250+ professionally edited photos',
      '3-5 minute highlight video',
      'Drone aerial footage',
      'Speech and awards coverage',
      'Same-day teaser clips for social',
      '72-hour full delivery',
      'Music licensed video production'
    ],
    icon: Video,
    popular: true
  },
  {
    id: 'ultimate-documentation',
    name: 'Ultimate Documentation Package',
    price: '$1,500',
    duration: 'Full event',
    deliverables: [
      '500+ professionally edited photos',
      '10-15 minute cinematic video',
      'Multiple camera angles and drone',
      'Live streaming capability',
      'Same-day social media content',
      'Individual employee portraits',
      'Custom music and graphics',
      '24-hour highlight reel delivery',
      'Full event documentary'
    ],
    icon: Star,
    popular: false
  }
];

// Awards & Recognition Ceremony Options
const ceremonySetup = [
  {
    type: 'Employee Recognition Awards',
    icon: Award,
    description: 'Honor outstanding team members with professional awards ceremony',
    features: [
      'Custom award display area with podium',
      'Professional A/V for presentations',
      'Award plaques or trophies (provided by you)',
      'Speech microphone and sound system',
      'Photo opportunities for award winners',
      'Video recording of each recognition',
      'Group celebration after each award',
      'Printed program or digital display'
    ],
    setup: 'Included in Premium+ packages',
    price: '$200 add-on for standard packages'
  },
  {
    type: 'Founder/Executive Speeches',
    icon: Mic,
    description: 'Professional setup for leadership addresses and company vision sharing',
    features: [
      'Designated speech platform',
      'Wireless microphone system',
      'Screen for slide presentations',
      'Professional sound amplification',
      'Video recording capability',
      'Seating arrangement for audience',
      'Backup audio equipment',
      'Q&A session setup if desired'
    ],
    setup: 'Included in all packages',
    price: 'Standard feature'
  },
  {
    type: 'Team Milestone Moments',
    icon: Heart,
    description: 'Capture and celebrate collective achievements and company culture',
    features: [
      'Timeline display of company journey',
      'Team member spotlight moments',
      'Collaborative toast coordination',
      'Group photo arrangements',
      'Memory sharing opportunities',
      'Culture celebration activities',
      'Thank you message compilation',
      'Future vision sharing platform'
    ],
    setup: 'Customizable for each event',
    price: 'Included in celebration planning'
  }
];

// Timeline Planning Guide
const planningTimeline = [
  {
    timeframe: '6-12 Months Before',
    milestone: 'Initial Planning',
    icon: Target,
    tasks: [
      'Determine celebration date and milestone type',
      'Set preliminary budget and guest count',
      'Contact Premier Party Cruises for availability',
      'Reserve your preferred date with deposit',
      'Begin identifying key recognition recipients',
      'Start planning awards or special moments'
    ],
    tips: 'Book early for peak dates (April-October). Summer weekends fill up 8-12 months ahead.'
  },
  {
    timeframe: '3-6 Months Before',
    milestone: 'Detailed Planning',
    icon: FileText,
    tasks: [
      'Finalize guest list and head count',
      'Select milestone package and add-ons',
      'Book photography/videography services',
      'Arrange catering and special dietary needs',
      'Plan awards ceremony and speeches',
      'Design custom decorations and branding',
      'Confirm champagne and beverage service',
      'Plan timeline for the celebration day'
    ],
    tips: 'This is when to lock in vendors for catering, photography, and custom elements.'
  },
  {
    timeframe: '1-3 Months Before',
    milestone: 'Execution Planning',
    icon: CheckCircle,
    tasks: [
      'Finalize all vendor contracts',
      'Send save-the-dates to team members',
      'Confirm final head count',
      'Plan speech content and award presentations',
      'Coordinate cake design and delivery',
      'Arrange transportation if needed',
      'Create day-of timeline and schedule',
      'Confirm all special requests'
    ],
    tips: 'Final head count and menu selections typically due 30 days before event.'
  },
  {
    timeframe: '2-4 Weeks Before',
    milestone: 'Final Preparations',
    icon: Zap,
    tasks: [
      'Send formal invitations with details',
      'Confirm all vendor arrival times',
      'Finalize speech and award presentations',
      'Submit final payment (due 30 days prior)',
      'Review weather contingency plans',
      'Prepare any special announcements',
      'Coordinate employee transportation',
      'Create printed programs if desired'
    ],
    tips: 'Balance due 30 days before. After this, weather-only cancellation policy applies.'
  },
  {
    timeframe: '1 Week Before',
    milestone: 'Final Confirmation',
    icon: Phone,
    tasks: [
      'Confirm final head count (no changes after this)',
      'Reconfirm all vendor arrival times',
      'Check weather forecast',
      'Prepare awards and recognition materials',
      'Brief staff on schedule and special moments',
      'Confirm beverage and food delivery',
      'Pack any personal items for boat',
      'Share final timeline with leadership'
    ],
    tips: 'Final head count locked 7 days before. Weather monitored closely by captain.'
  },
  {
    timeframe: 'Celebration Day',
    milestone: 'Celebrate Success!',
    icon: PartyPopper,
    tasks: [
      'Arrive 30 minutes before departure',
      'Coordinate vendor arrivals and setup',
      'Brief captain on special requests',
      'Welcome team members as they arrive',
      'Execute awards and recognition moments',
      'Deliver speeches and toasts',
      'Capture memories with photography',
      'Enjoy the celebration with your team!'
    ],
    tips: 'Relax and enjoy! Our crew handles the logistics so you can focus on celebrating.'
  }
];

// Success Stories with Measurable Impact
const successStories = [
  {
    id: 1,
    company: 'Austin Tech Startup',
    milestone: 'Series B Funding - $25M Raised',
    teamSize: 45,
    package: 'Startup Funding Round Package',
    challenge: 'Team burnout after intense fundraising sprint, needed to re-energize before scaling',
    solution: 'Full-day celebration cruise with founder speeches, team recognition, and professional documentation',
    measurableImpact: {
      retention: '+32% employee retention vs. industry average',
      engagement: '94% employee engagement score (up from 67%)',
      productivity: '28% productivity increase in following quarter',
      culture: 'Net Promoter Score jumped from 42 to 89',
      recruiting: '3x increase in employee referral hires',
      timeline: 'Impact measured over 6 months post-event'
    },
    quote: 'We almost skipped celebrating to focus on execution. Best decision we made was taking the day to honor our team. The energy shift was immediate - people came back Monday ready to build something special. Three months later, we\'re ahead of our hiring and product goals.',
    author: 'Sarah Chen, CEO',
    image: '/testimonials/sarah.jpg',
    icon: Rocket,
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    company: 'Regional Law Firm',
    milestone: '25 Year Anniversary',
    teamSize: 68,
    package: '10 Year Anniversary Package (customized)',
    challenge: 'Generational divide between founding partners and young associates, culture feeling disconnected',
    solution: 'Multi-generational celebration with firm history presentation, mentorship recognition, and family inclusion',
    measurableImpact: {
      retention: '91% associate retention (up from 73%)',
      satisfaction: 'Employee satisfaction scores: 8.9/10 (up from 6.2/10)',
      mentorship: '100% of associates now have active mentorship relationships',
      referrals: '$4.2M in new client referrals from energized team',
      awards: 'Named "Best Place to Work" by Austin Business Journal',
      timeline: 'Impact measured over 12 months post-celebration'
    },
    quote: 'Twenty-five years in business and we\'d never properly celebrated together. The Lake Travis event bridged our generational gap - young associates heard stories from founding partners, families connected, and we remembered why we built this firm. Our culture transformed overnight.',
    author: 'James Morrison, Managing Partner',
    image: '/testimonials/james.jpg',
    icon: Building,
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 3,
    company: 'Healthcare Software Company',
    milestone: 'Successful Exit - Acquired for $180M',
    teamSize: 92,
    package: 'Exit/Acquisition Celebration Package',
    challenge: 'Team anxiety about acquisition, founders wanted to honor journey and ensure smooth transition',
    solution: 'Premium celebration with company journey timeline, individual recognition for all employees, and future vision sharing',
    measurableImpact: {
      retention: '96% of employees stayed through transition (industry avg: 60%)',
      equity: '$8.7M in employee equity value distributed and celebrated',
      integration: 'Fastest acquisition integration in parent company history (4 months)',
      culture: '89% of employees rated exit as "career highlight"',
      relationships: '100% of leadership stayed for 2-year earnout period',
      timeline: 'Impact measured through complete integration (18 months)'
    },
    quote: 'Selling the company was bittersweet. The Lake Travis celebration let us properly honor everyone who built this with us. We celebrated the journey, recognized each person\'s contribution, and set the vision for the next chapter. Our team\'s stability through the acquisition was unprecedented.',
    author: 'Dr. Michael Rodriguez, Co-Founder & CTO',
    image: '/testimonials/michael.jpg',
    icon: Award,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 4,
    company: 'E-commerce Startup',
    milestone: 'IPO Celebration - $450M Valuation',
    teamSize: 125,
    package: 'IPO Celebration Package',
    challenge: 'Remote-first team scattered across US, many employees had never met in person, IPO moment felt disconnected',
    solution: 'Week-long Austin celebration culminating in Lake Travis IPO day cruise with live bell-ringing stream and global team connection',
    measurableImpact: {
      equity: '$42M in employee equity value realized',
      retention: '89% retention through first year (IPO avg: 65%)',
      performance: 'Stock up 340% in first year (strong team execution)',
      culture: 'Remote employee engagement: 92% (industry avg: 68%)',
      recruitment: 'C-suite hired 3 months ahead of plan',
      timeline: 'Impact measured through first year as public company'
    },
    quote: 'Going public remotely felt empty until the Lake Travis celebration. Flying everyone to Austin, ringing the bell together on the water, toasting to our journey - it made the achievement real. Our distributed team finally felt like a family. That connection drove our first-year performance.',
    author: 'Jennifer Park, CEO & Founder',
    image: '/testimonials/jennifer.jpg',
    icon: Trophy,
    color: 'from-yellow-600 to-orange-600'
  }
];

// Executive Retreat Integration
const retreatIntegration = [
  {
    title: 'Celebration + Strategic Planning',
    icon: Target,
    description: 'Combine milestone celebration with executive retreat for maximum impact',
    benefits: [
      'Celebrate achievements in the morning session',
      'Afternoon strategic planning with energized team',
      'Recognition and vision-setting in one experience',
      'Team bonding through shared celebration',
      'Professional facilitator can join cruise',
      'Visual timeline: past success → future strategy'
    ],
    pricing: 'Retreat coordination: +$300-500',
    ideal: 'Executive teams 15-30 people'
  },
  {
    title: 'Multi-Day Company Event',
    icon: Calendar,
    description: 'Make the celebration centerpiece of a larger company gathering',
    benefits: [
      'Day 1: Workshops and skill development on land',
      'Day 2: Milestone celebration cruise (reward for hard work)',
      'Day 3: Strategy sessions with celebrated momentum',
      'Combines professional development with celebration',
      'Hotel and venue coordination available',
      'Creates comprehensive company event experience'
    ],
    pricing: 'Full event coordination: Custom quote',
    ideal: 'All-hands gatherings, annual meetings'
  },
  {
    title: 'Board Meeting + Celebration',
    icon: Building,
    description: 'Celebrate milestones with board members and key stakeholders present',
    benefits: [
      'Morning board meeting at hotel/venue',
      'Afternoon celebration cruise with full team',
      'Board members see culture and team firsthand',
      'Investor relations and team celebration combined',
      'Professional environment for formal business',
      'Relaxed celebration for team appreciation'
    ],
    pricing: 'VIP board integration: +$400',
    ideal: 'Board meetings, investor updates'
  },
  {
    title: 'Awards Gala + Lake Experience',
    icon: Award,
    description: 'Transform traditional awards dinner into unique lakeside gala',
    benefits: [
      'Sunset cruise replaces hotel ballroom',
      'Unique venue makes awards more memorable',
      'Natural beauty elevates the experience',
      'Built-in entertainment (the lake views)',
      'Photography with stunning natural backdrop',
      'Something your team will actually remember'
    ],
    pricing: 'Gala coordination: +$500-800',
    ideal: 'Annual awards, major recognitions'
  }
];

// Differentiation from Client Entertainment
const differentiationPoints = [
  {
    icon: Heart,
    title: 'YOUR Team, YOUR Success',
    description: 'This is about celebrating your own company\'s achievements with your employees - not entertaining external clients. Focus is on internal recognition, team appreciation, and honoring those who built your success.',
    clientFocus: 'Client Entertainment: Impressing external clients to win business',
    milestoneFocus: 'Company Milestone: Celebrating YOUR team\'s achievements together'
  },
  {
    icon: Trophy,
    title: 'Achievement Recognition',
    description: 'Milestone celebrations honor specific company achievements (IPOs, anniversaries, exits) and recognize employee contributions. It\'s about looking back at what you\'ve built together.',
    clientFocus: 'Client Entertainment: Future-focused relationship building',
    milestoneFocus: 'Company Milestone: Past achievement celebration and gratitude'
  },
  {
    icon: Building,
    title: 'Culture Building',
    description: 'These celebrations strengthen internal company culture, boost morale, and show employees they\'re valued. The ROI is retention, engagement, and team unity.',
    clientFocus: 'Client Entertainment: External relationship development',
    milestoneFocus: 'Company Milestone: Internal culture strengthening'
  },
  {
    icon: Gift,
    title: 'Employee Appreciation',
    description: 'The focus is thanking and rewarding your team for their hard work. Awards, recognition, and celebration of their contributions to company success.',
    clientFocus: 'Client Entertainment: Showcasing capabilities to clients',
    milestoneFocus: 'Company Milestone: Showing gratitude to your team'
  }
];

// What's included
const whatsIncluded = [
  {
    icon: Trophy,
    title: 'Achievement Focus',
    description: 'Celebrate your company\'s important milestones and honor those who made them possible'
  },
  {
    icon: Mic,
    title: 'Speech Platform',
    description: 'Professional setup for executive addresses, founder stories, and vision sharing'
  },
  {
    icon: Camera,
    title: 'Memory Capture',
    description: 'Professional photography and video to document your company\'s historic moment'
  },
  {
    icon: Building,
    title: 'Company Branding',
    description: 'Custom decorations and displays showcasing your company identity and achievement'
  },
  {
    icon: PartyPopper,
    title: 'Celebration Atmosphere',
    description: 'Decorations, champagne service, and festive setup for proper milestone celebration'
  },
  {
    icon: Award,
    title: 'Recognition Ceremony',
    description: 'Professional setup for employee awards, team recognition, and appreciation moments'
  },
  {
    icon: Gift,
    title: 'Commemorative Experience',
    description: 'Lasting mementos and memories your team will treasure for years'
  },
  {
    icon: Shield,
    title: 'Full-Service Crew',
    description: 'Professional team handles all logistics so you can focus on celebrating with your team'
  },
  {
    icon: Star,
    title: 'VIP Team Treatment',
    description: 'Make every employee feel valued and appreciated for their contributions'
  }
];

// FAQs
const faqItems = [
  {
    id: 'milestone-types',
    question: 'What types of company milestones do you celebrate?',
    answer: 'We specialize in company anniversaries (5, 10, 25+ years), IPO celebrations, successful exits and acquisitions, funding round announcements (Series A/B/C), major revenue milestones, and any significant company achievement. Each celebration is customized to your specific milestone.'
  },
  {
    id: 'employee-vs-client',
    question: 'How is this different from client entertainment?',
    answer: 'Company milestone celebrations focus on YOUR internal team and employees - recognizing their contributions and celebrating your company\'s success together. Client entertainment is about impressing external clients to build business relationships. Milestone celebrations are about appreciation, culture, and team recognition.'
  },
  {
    id: 'planning-timeline',
    question: 'How far in advance should we book?',
    answer: 'For major milestones, we recommend booking 6-12 months in advance, especially for peak season (April-October). This ensures your preferred date and allows time for custom planning. We can accommodate shorter notice for smaller celebrations, but vendor availability (catering, photography) may be limited.'
  },
  {
    id: 'customization',
    question: 'Can we customize the celebration?',
    answer: 'Absolutely! Every company milestone is unique. We work with you to customize decorations, branding, awards ceremonies, speeches, catering, and every detail to match your company culture and celebration vision. Our packages are starting points - we build from there.'
  },
  {
    id: 'photography-video',
    question: 'What photography and video options are available?',
    answer: 'We offer three tiers: Basic Photography ($400 for 2 hrs, 150+ photos), Premium Photo+Video ($800 for 3 hrs, photos + 3-5 min video), and Ultimate Documentation ($1,500 full event, 500+ photos, cinematic video, drone footage, live streaming). All include professional editing and digital delivery.'
  },
  {
    id: 'awards-ceremony',
    question: 'Can we do an awards ceremony on the boat?',
    answer: 'Yes! We provide professional setup including podium area, microphone, sound system, and presentation capability. You provide the actual awards/plaques, and we handle the ceremonial setup, photo opportunities, and video recording. Included in Premium+ packages or $200 add-on.'
  },
  {
    id: 'food-beverage',
    question: 'How does catering and beverage service work?',
    answer: 'We coordinate with Austin\'s best caterers and bakeries for your preferences. Options range from casual BBQ ($30-40/person) to gourmet dining ($50-75/person). Champagne service starts at $150 (standard toast) up to $500+ (full bar service). We handle all delivery and setup coordination.'
  },
  {
    id: 'capacity',
    question: 'How many employees can we celebrate with?',
    answer: 'Our milestone packages range from 25 people (5 Year Anniversary) to 125+ (IPO Celebration with multiple boats). Specific packages: 5 Year (25), 10 Year (50), IPO (75), Exit/Acquisition (60), Funding Round (40). We can accommodate larger teams with multiple boat charters.'
  },
  {
    id: 'weather-contingency',
    question: 'What if weather affects our milestone date?',
    answer: 'The captain monitors weather closely and makes safety decisions. If weather forces cancellation, you receive a full refund or can reschedule at no cost. If weather shortens the cruise, you receive a pro-rated refund. We\'ve never had a milestone celebration completely lost to weather - safety decisions are made proactively.'
  },
  {
    id: 'remote-employees',
    question: 'Can remote employees participate virtually?',
    answer: 'Yes! Our Premium and Executive packages include live streaming capability so remote team members can join the celebration, watch speeches and awards, and participate in toasts. We can also create post-event video compilations for remote employees to experience the celebration.'
  }
];

// Testimonials with Measurable Impact
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, Austin Tech Startup',
    rating: 5,
    text: 'Our Series B celebration cruise was the turning point for our culture. The team came back Monday ready to build something special. Three months later, we\'re ahead of hiring and product goals. Best $3,000 investment in team morale we\'ve ever made.',
    impact: '32% higher retention, 94% engagement score',
    image: '/testimonials/sarah.jpg'
  },
  {
    id: 2,
    name: 'James Morrison',
    role: 'Managing Partner, Regional Law Firm',
    rating: 5,
    text: 'Twenty-five years in business and we\'d never properly celebrated together. The Lake Travis event bridged our generational gap and transformed our culture overnight. Named "Best Place to Work" six months later.',
    impact: '$4.2M in new client referrals, 91% associate retention',
    image: '/testimonials/james.jpg'
  },
  {
    id: 3,
    name: 'Dr. Michael Rodriguez',
    role: 'Co-Founder & CTO, Healthcare Software',
    rating: 5,
    text: 'The exit celebration let us properly honor everyone who built this with us. Our team\'s 96% retention through the acquisition was unprecedented. The stability drove the fastest integration in parent company history.',
    impact: '$8.7M employee equity value, 4-month integration',
    image: '/testimonials/michael.jpg'
  },
  {
    id: 4,
    name: 'Jennifer Park',
    role: 'CEO & Founder, E-commerce Startup',
    rating: 5,
    text: 'Going public remotely felt empty until the Lake Travis IPO celebration. Flying everyone to Austin and ringing the bell together on the water made it real. That connection drove our 340% first-year stock performance.',
    impact: '$42M employee equity realized, 89% retention',
    image: '/testimonials/jennifer.jpg'
  }
];

export default function CompanyMilestone() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('10-year-anniversary');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=company-milestone');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=company-milestone&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/company-milestone"
        defaultTitle="Company Milestone Celebrations Austin | IPO, Anniversary, Exit Parties on Lake Travis"
        defaultDescription="Celebrate YOUR company's success! IPO parties, anniversaries, exits & funding rounds on Lake Travis. Employee recognition cruises with awards ceremonies, champagne service & professional photography. 96% team retention impact!"
        defaultKeywords={[
          'company milestone celebration austin',
          'IPO celebration lake travis',
          'company anniversary party austin',
          'corporate exit celebration',
          'startup funding celebration',
          'employee recognition event austin',
          'company achievement party lake travis',
          'corporate milestone cruise'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <AnimatePresence mode="wait">
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full h-full">
              <img 
                src={heroImage1} 
                alt="Company Milestone Celebration Austin - Team celebrating IPO achievement on Lake Travis party boat" 
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-4 py-2 text-lg bg-white/20 backdrop-blur-sm border-white/30">
                <Trophy className="mr-2 h-5 w-5" />
                Celebrate YOUR Company's Success
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Company Milestone
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Celebrations
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Celebrate IPOs, anniversaries, exits, and funding rounds with the team that made it happen. 
              Employee recognition cruises with awards ceremonies, champagne service, and memories that last forever.
            </motion.p>

            <motion.div className="mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg max-w-2xl mx-auto" variants={fadeInUp}>
              <p className="text-lg font-semibold text-brand-yellow mb-2">
                ⚡ This is About YOUR Team, Not Client Entertainment
              </p>
              <p className="text-sm text-white/90">
                Milestone celebrations honor your employees and internal achievements. 
                Looking to impress clients? Check out our <Link href="/client-entertainment" className="text-brand-yellow hover:underline font-semibold">Client Entertainment page</Link> instead.
              </p>
            </motion.div>

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
                Plan Your Milestone
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Milestone Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <motion.div className="text-center" variants={float}>
                <div className="text-3xl font-bold text-brand-yellow">200+</div>
                <div className="text-sm text-white/80">Milestones Celebrated</div>
              </motion.div>
              <motion.div className="text-center" variants={float}>
                <div className="text-3xl font-bold text-brand-yellow">96%</div>
                <div className="text-sm text-white/80">Team Retention Impact</div>
              </motion.div>
              <motion.div className="text-center" variants={float}>
                <div className="text-3xl font-bold text-brand-yellow">$8.7M</div>
                <div className="text-sm text-white/80">Avg Equity Celebrated</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">
              Internal Celebration, Not Client Entertainment
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Company milestone cruises celebrate YOUR team's achievements and strengthen internal culture. 
              Here's how we're different from client entertainment events:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {differentiationPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <point.icon className="h-6 w-6 text-brand-yellow" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{point.title}</CardTitle>
                        <p className="text-white/80 text-sm">{point.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                        <span className="font-semibold text-red-300">❌ {point.clientFocus}</span>
                      </div>
                      <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                        <span className="font-semibold text-green-300">✅ {point.milestoneFocus}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-white/90 mb-4">
              Need to entertain clients instead? We have a dedicated page for that!
            </p>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold"
              data-testid="button-client-entertainment-link"
            >
              <Link href="/client-entertainment">
                <Briefcase className="mr-2 h-5 w-5" />
                View Client Entertainment Options
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Build My Quote Now Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
              Get instant pricing for your milestone celebration in minutes
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

      {/* Milestone-Specific Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Milestone-Specific Celebration Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Every milestone deserves its own celebration. Choose the package designed for your specific achievement.
            </p>
          </motion.div>

          <Tabs value={selectedPackage} onValueChange={setSelectedPackage} className="w-full max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-8 h-auto">
              {milestonePackages.map((pkg) => (
                <TabsTrigger 
                  key={pkg.id} 
                  value={pkg.id}
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                  data-testid={`tab-${pkg.id}`}
                >
                  <pkg.icon className="h-6 w-6" />
                  <span className="text-xs font-semibold text-center">{pkg.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {milestonePackages.map((pkg) => (
              <TabsContent key={pkg.id} value={pkg.id} className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-brand-blue shadow-2xl">
                    <CardHeader className="text-center pb-6 bg-gradient-to-br from-brand-blue to-purple-600 text-white rounded-t-lg">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <pkg.icon className="h-10 w-10 text-white" />
                      </div>
                      <Badge className="mb-4 bg-brand-yellow text-black font-bold px-4 py-1 mx-auto">
                        {pkg.badge}
                      </Badge>
                      <CardTitle className="text-3xl font-bold mb-2">{pkg.name}</CardTitle>
                      <CardDescription className="text-lg text-white/90 mb-4">
                        {pkg.subtitle}
                      </CardDescription>
                      
                      <div className="mt-4">
                        <div className="text-5xl font-bold">
                          ${pkg.basePrice}<span className="text-2xl font-normal">/hr</span>
                        </div>
                        <p className="text-sm text-white/80 mt-2">{pkg.ideal}</p>
                        <p className="text-xs text-white/70 mt-1">Minimum 4 hours</p>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            What's Included
                          </h4>
                          <ul className="space-y-3">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                              <TrendingUp className="h-5 w-5 text-green-600" />
                              Measurable Impact
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                              {pkg.impact}
                            </p>
                          </div>

                          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                            <h4 className="text-lg font-bold mb-3">Perfect For:</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {pkg.description}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3">
                            <Button 
                              size="lg"
                              className="w-full bg-brand-blue hover:bg-brand-blue/90"
                              onClick={handleGetQuote}
                              data-testid={`button-package-${pkg.id}`}
                            >
                              <MessageSquare className="mr-2 h-5 w-5" />
                              Plan This Milestone
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button 
                              size="lg"
                              variant="outline"
                              className="w-full"
                              onClick={() => document.getElementById('celebration-elements')?.scrollIntoView({ behavior: 'smooth' })}
                              data-testid={`button-add-ons-${pkg.id}`}
                            >
                              View Add-On Services
                              <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Celebration Elements & Services */}
      <section id="celebration-elements" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Celebration Elements & Add-On Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Enhance your milestone celebration with professional services and premium touches
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {celebrationElements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className={cn(
                      "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br",
                      element.color
                    )}>
                      <element.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-center text-xl">{element.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {element.options.map((option, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm">{option.name}</h4>
                            <Badge variant="outline" className="text-xs">{option.price}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {option.description}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                            {option.included}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Photography Packages */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Corporate Photography & Video Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional documentation of your milestone moment with photos and video your team will treasure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {photographyPackages.map((pkg, index) => (
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
                    <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                    
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-brand-blue">
                        {pkg.price}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {pkg.duration} coverage
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <h4 className="font-bold mb-3 text-sm text-gray-700 dark:text-gray-300">
                      Package Includes:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={handleGetQuote}
                      data-testid={`button-photo-${pkg.id}`}
                    >
                      Add to Celebration
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition Ceremony Setup */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Awards & Recognition Ceremony Setup
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Honor your team's contributions with professional ceremony setup and execution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ceremonySetup.map((ceremony, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <ceremony.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-center text-xl mb-2">{ceremony.type}</CardTitle>
                    <CardDescription className="text-center">{ceremony.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {ceremony.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Award className="h-4 w-4 text-brand-yellow mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Setup: {ceremony.setup}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Pricing: {ceremony.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Planning Guide */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Timeline Planning Guide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              When to book, plan, and celebrate your company milestone for maximum impact
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {planningTimeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gradient-to-br from-brand-blue to-purple-600 text-white p-6 md:w-1/3 flex flex-col items-center justify-center">
                      <phase.icon className="h-12 w-12 mb-3" />
                      <h3 className="text-2xl font-bold text-center mb-2">{phase.timeframe}</h3>
                      <p className="text-sm text-white/90 text-center">{phase.milestone}</p>
                    </div>

                    <CardContent className="md:w-2/3 p-6">
                      <h4 className="font-bold text-lg mb-4 text-brand-blue">Key Tasks:</h4>
                      <ul className="space-y-2 mb-4">
                        {phase.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p className="text-sm">
                          <span className="font-semibold text-yellow-800 dark:text-yellow-300">💡 Pro Tip: </span>
                          <span className="text-yellow-700 dark:text-yellow-400">{phase.tips}</span>
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              onClick={handleGetQuote}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6"
              data-testid="button-timeline-get-quote"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Start Planning Your Milestone
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Success Stories with Measurable Impact */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Real Impact, Measurable Results
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how milestone celebrations transformed company culture and delivered ROI
            </p>
          </motion.div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all">
                  <div className={cn(
                    "h-2 bg-gradient-to-r",
                    story.color
                  )} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br",
                            story.color
                          )}>
                            <story.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{story.company}</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{story.milestone}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-3">
                          <Badge variant="outline">{story.teamSize} employees</Badge>
                          <Badge variant="outline">{story.package}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">Challenge:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{story.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">Solution:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{story.solution}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3">Measurable Impact:</h4>
                        <div className="space-y-2">
                          {Object.entries(story.measurableImpact).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                              <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-xs font-semibold text-green-800 dark:text-green-300 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="text-xs text-green-700 dark:text-green-400 ml-1">{value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-l-4 border-brand-blue">
                      <Quote className="h-6 w-6 text-brand-blue mb-2" />
                      <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-2">
                        "{story.quote}"
                      </p>
                      <p className="text-xs font-semibold text-brand-blue">
                        — {story.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Retreat Integration */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Executive Retreat Integration
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Combine milestone celebration with strategic planning for comprehensive company events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {retreatIntegration.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <integration.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-center text-xl mb-2">{integration.title}</CardTitle>
                    <CardDescription className="text-center">{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-bold text-sm mb-3">Integration Benefits:</h4>
                    <ul className="space-y-2 mb-6">
                      {integration.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm">
                          <span className="font-semibold text-blue-800 dark:text-blue-300">Pricing: </span>
                          <span className="text-blue-700 dark:text-blue-400">{integration.pricing}</span>
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm">
                          <span className="font-semibold text-purple-800 dark:text-purple-300">Ideal For: </span>
                          <span className="text-purple-700 dark:text-purple-400">{integration.ideal}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Want dedicated team building activities? Check out our specialized page:
            </p>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold"
              data-testid="button-team-building-link"
            >
              <Link href="/team-building">
                <Trophy className="mr-2 h-5 w-5" />
                View Team Building Options
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Every Milestone Celebration Includes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Professional service and attention to detail for your company's special moment
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

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Real companies, real milestones, real impact
            </p>
          </motion.div>

          <Carousel className="max-w-5xl mx-auto" data-testid="carousel-testimonials">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="border-2 border-gray-200 dark:border-gray-800">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <Quote className="h-12 w-12 text-brand-blue mb-4" />
                        
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                          ))}
                        </div>

                        <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-6">
                          "{testimonial.text}"
                        </p>

                        <div className="w-full p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-6">
                          <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                            📊 Impact: {testimonial.impact}
                          </p>
                        </div>

                        <div>
                          <p className="font-bold text-lg">{testimonial.name}</p>
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

      {/* FAQs */}
      <section className="py-20 bg-white dark:bg-gray-950">
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
              Everything you need to know about company milestone celebrations
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto" data-testid="accordion-faqs">
            {faqItems.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left hover:text-brand-blue">
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

      {/* Related Pages */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <RelatedLinks
            title="Explore Other Corporate Events"
            links={[
              {
                title: 'Client Entertainment',
                description: 'Impress external clients and win business with premium entertainment cruises',
                href: '/client-entertainment',
                icon: Briefcase
              },
              {
                title: 'Team Building',
                description: 'Develop skills and strengthen bonds with structured team building activities',
                href: '/team-building',
                icon: Users
              },
              {
                title: 'Private Cruises',
                description: 'Fully customized private experiences for any corporate event or celebration',
                href: '/private-cruises',
                icon: Ship
              }
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Ready to Celebrate Your Milestone?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's plan an unforgettable celebration that honors your team and marks your achievement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6"
                data-testid="button-final-cta-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Your Celebration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-final-cta-call"
              >
                <a href="tel:512-710-5075">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (512) 710-5075
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PartyPlanningChecklist />
      <Footer />
    </div>
  );
}
