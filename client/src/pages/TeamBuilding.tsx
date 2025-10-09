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
  Target, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Trophy, Shield,
  Star, MessageSquare, Award, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, Zap, Play,
  UserCheck, Building, Briefcase, Lightbulb, Handshake, X,
  DollarSign, BarChart3, TrendingUp as Growth, Brain,
  Heart, Megaphone, FileText, CreditCard, Receipt,
  Rocket, Activity, Network, GitBranch, Puzzle, Crown,
  PartyPopper, Music, Camera, Gift, Waves, Leaf
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/day-tripper-14-person-boat.webp';
import heroImage3 from '@assets/meeseeks-25-person-boat.webp';
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

// Corporate Team Building packages
const teamBuildingPackages = [
  {
    id: 'basic-outing',
    name: 'Basic Team Outing',
    basePrice: 200,
    description: 'Perfect for casual team bonding and departmental celebrations',
    subtitle: 'Strengthen workplace relationships in a relaxed setting',
    features: [
      'Professional captain and crew',
      '3-4 hour Lake Travis cruise',
      'Basic team ice breaker activities',
      'BYOB with coolers and ice provided',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Sun and shade seating areas',
      'Basic safety briefing and equipment',
      'Vendor coordination for catering',
      'Up to 25 team members'
    ],
    ideal: 'Small teams, casual bonding',
    popular: false,
    icon: Users,
    badge: 'Great Value',
    roi: '15-20% boost in team morale'
  },
  {
    id: 'structured-building',
    name: 'Structured Team Building',
    basePrice: 275,
    addOnPrice: 75,
    description: 'Professionally facilitated team development with measurable outcomes',
    subtitle: 'Interactive challenges and leadership exercises on the water',
    features: [
      'Everything from Basic Team Outing',
      'Professional team building facilitator',
      'Custom activity program (3-5 exercises)',
      'Communication & collaboration challenges',
      'Problem-solving team competitions',
      'Leadership development activities',
      'Water-based trust building exercises',
      'Team performance assessments',
      'Post-event debrief and insights report',
      'Catering coordination with meal planning',
      'Awards ceremony and team recognition',
      'Digital photo package of activities',
      'Up to 40 team members'
    ],
    ideal: 'Growing teams, skill development',
    popular: true,
    icon: Trophy,
    badge: 'Most Popular',
    roi: '35-45% improvement in collaboration'
  },
  {
    id: 'executive-retreat',
    name: 'Executive Retreat',
    basePrice: 400,
    addOnPrice: 200,
    description: 'Premium leadership development and strategic planning experience',
    subtitle: 'High-level strategic sessions combined with team bonding',
    features: [
      'Everything from Structured Team Building',
      'Executive-level facilitator (MBA certified)',
      'Strategic planning sessions on water',
      'Private boat for exclusive experience',
      'Premium catering and beverage service',
      'Vision & goal alignment workshops',
      'High-level decision-making simulations',
      'Confidential breakout session areas',
      'Professional photographer/videographer',
      'Executive gift bags and amenities',
      'Post-retreat implementation roadmap',
      'Follow-up coaching sessions (optional)',
      'Premium transportation coordination',
      'Corporate event planning concierge',
      'Up to 50 team members'
    ],
    ideal: 'Leadership teams, C-suite retreats',
    popular: false,
    icon: Crown,
    badge: 'Premium Experience',
    roi: '60-75% increase in strategic alignment'
  }
];

// Team Building Activities
const teamActivities = [
  {
    category: 'Ice Breakers & Games',
    icon: PartyPopper,
    color: 'from-purple-500 to-pink-500',
    activities: [
      {
        name: 'Two Truths & A Lie - Boat Edition',
        description: 'Team members share lake-themed stories, building connections through fun discoveries',
        duration: '15-20 min',
        teamSize: '10-50 people'
      },
      {
        name: 'Human Bingo on the Water',
        description: 'Custom bingo cards with team member facts - first to complete wins!',
        duration: '20-30 min',
        teamSize: '15-75 people'
      },
      {
        name: 'The Name Game Challenge',
        description: 'Fast-paced name learning game with Lake Travis trivia mixed in',
        duration: '10-15 min',
        teamSize: '10-40 people'
      },
      {
        name: 'Speed Networking on Deck',
        description: 'Rotating conversations help team members discover common interests',
        duration: '25-35 min',
        teamSize: '20-60 people'
      }
    ]
  },
  {
    category: 'Team Challenges on Water',
    icon: Waves,
    color: 'from-blue-500 to-cyan-500',
    activities: [
      {
        name: 'Float Bridge Building',
        description: 'Teams construct a "bridge" using pool floats - tests planning and execution',
        duration: '30-45 min',
        teamSize: '15-40 people'
      },
      {
        name: 'Water Relay Races',
        description: 'Multi-stage relay with swimming, floating, and teamwork elements',
        duration: '35-50 min',
        teamSize: '20-50 people'
      },
      {
        name: 'Rescue Mission Simulation',
        description: 'Teams coordinate to "rescue" objects from the water using limited tools',
        duration: '40-60 min',
        teamSize: '15-45 people'
      },
      {
        name: 'Captain\'s Orders Challenge',
        description: 'Navigation and communication challenge requiring team coordination',
        duration: '30-45 min',
        teamSize: '10-35 people'
      }
    ]
  },
  {
    category: 'Leadership Exercises',
    icon: Crown,
    color: 'from-yellow-500 to-orange-500',
    activities: [
      {
        name: 'Leadership Rotation Sessions',
        description: 'Each team member leads a 10-minute activity - develops leadership skills',
        duration: '60-90 min',
        teamSize: '8-25 people'
      },
      {
        name: 'Strategic Decision Simulation',
        description: 'Navigate mock business scenarios requiring quick leadership decisions',
        duration: '45-60 min',
        teamSize: '10-30 people'
      },
      {
        name: 'Vision Boarding on the Lake',
        description: 'Leaders collaborate on company vision using creative exercises',
        duration: '50-75 min',
        teamSize: '5-20 people'
      },
      {
        name: 'Delegation & Trust Exercise',
        description: 'Leaders practice delegating tasks while blindfolded team executes',
        duration: '40-55 min',
        teamSize: '12-35 people'
      }
    ]
  },
  {
    category: 'Communication Activities',
    icon: Megaphone,
    color: 'from-green-500 to-emerald-500',
    activities: [
      {
        name: 'Telephone - Boat Style',
        description: 'Classic communication game adapted for boat environment with obstacles',
        duration: '20-30 min',
        teamSize: '10-40 people'
      },
      {
        name: 'Back-to-Back Drawing Challenge',
        description: 'Partners sit back-to-back, one describes, one draws - tests clarity',
        duration: '25-35 min',
        teamSize: '10-50 people'
      },
      {
        name: 'Minefield Navigation',
        description: 'Blindfolded team members navigate "minefield" using only verbal cues',
        duration: '30-45 min',
        teamSize: '15-40 people'
      },
      {
        name: 'Story Building Circle',
        description: 'Team creates collaborative story, each adding one sentence',
        duration: '15-25 min',
        teamSize: '8-30 people'
      }
    ]
  }
];

// Case Studies
const caseStudies = [
  {
    id: 1,
    company: 'Fortune 500 Tech Company',
    industry: 'Technology',
    teamSize: 45,
    challenge: 'Newly formed cross-functional product team struggling with communication silos and missed deadlines',
    solution: 'Structured Team Building package with focus on communication exercises and collaborative challenges',
    results: [
      '52% reduction in project delays within 2 months',
      '78% improvement in cross-team communication scores',
      '91% employee satisfaction increase for team culture',
      'Successful product launch 3 weeks ahead of schedule'
    ],
    quote: 'The Lake Travis team building transformed our culture. Communication barriers dissolved, and we started functioning as a true unit. Best investment we made all year.',
    author: 'VP of Product Development',
    icon: Rocket,
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    company: 'Regional Healthcare System',
    industry: 'Healthcare',
    teamSize: 32,
    challenge: 'Hospital department experiencing high burnout and low morale after challenging year',
    solution: 'Executive Retreat package with wellness focus, stress management activities, and team bonding',
    results: [
      '68% decrease in burnout indicators',
      '43% improvement in team cohesion scores',
      'Zero turnover in following 6 months (vs. 23% prior)',
      '89% staff reported feeling valued and supported'
    ],
    quote: 'Our team was exhausted and disconnected. This retreat reminded us why we became healthcare professionals and reconnected us as a family. Morale is at an all-time high.',
    author: 'Department Director',
    icon: Heart,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 3,
    company: 'National Financial Services Firm',
    industry: 'Finance',
    teamSize: 28,
    challenge: 'Sales team underperforming with internal competition creating toxic environment',
    solution: 'Custom program combining leadership exercises with collaborative sales simulations',
    results: [
      '147% increase in collaborative deal closures',
      '34% boost in overall team sales performance',
      '82% reduction in internal conflict incidents',
      'Team won company-wide performance award'
    ],
    quote: 'We went from competing against each other to competing as a unified force. Our numbers speak for themselves - collaboration beats internal competition every time.',
    author: 'Sales Director',
    icon: TrendingUp,
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 4,
    company: 'Austin-Based Startup (Series B)',
    industry: 'Technology',
    teamSize: 38,
    challenge: 'Rapid growth creating cultural dilution and misalignment on company values',
    solution: 'Vision alignment retreat with strategic planning and culture-building activities',
    results: [
      '95% clarity on company mission and values',
      '71% improvement in cultural fit scores',
      'Successful integration of 15 new hires',
      '3x improvement in employee referral rate'
    ],
    quote: 'As we scaled, we were losing our culture. This retreat helped us define and reinforce who we are. New hires now feel the culture from day one.',
    author: 'Co-Founder & CEO',
    icon: Rocket,
    color: 'from-orange-500 to-yellow-500'
  }
];

// ROI & Business Benefits
const roiBenefits = [
  {
    category: 'Measurable Performance Gains',
    icon: BarChart3,
    color: 'from-blue-500 to-indigo-600',
    metrics: [
      {
        stat: '38%',
        label: 'Average productivity increase',
        detail: 'Teams show measurable output improvement within 30 days'
      },
      {
        stat: '67%',
        label: 'Better project completion rates',
        detail: 'Fewer delays and improved deadline adherence'
      },
      {
        stat: '54%',
        label: 'Reduced conflict resolution time',
        detail: 'Teams resolve issues faster with improved communication'
      }
    ]
  },
  {
    category: 'Financial Impact',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
    metrics: [
      {
        stat: '$450K',
        label: 'Average annual savings',
        detail: 'From reduced turnover and recruitment costs'
      },
      {
        stat: '4.2x',
        label: 'ROI within 12 months',
        detail: 'Every dollar invested returns $4.20 in value'
      },
      {
        stat: '31%',
        label: 'Lower turnover rates',
        detail: 'Strong teams retain talent better'
      }
    ]
  },
  {
    category: 'Cultural Transformation',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    metrics: [
      {
        stat: '84%',
        label: 'Employee engagement increase',
        detail: 'Team members feel more connected and valued'
      },
      {
        stat: '92%',
        label: 'Would recommend to peers',
        detail: 'High satisfaction drives positive culture'
      },
      {
        stat: '73%',
        label: 'Improved innovation scores',
        detail: 'Connected teams generate better ideas'
      }
    ]
  }
];

// Industry-Specific Examples
const industryExamples = [
  {
    industry: 'Technology & Software',
    icon: Rocket,
    color: 'from-blue-600 to-purple-600',
    challenges: [
      'Remote team integration and connection',
      'Cross-functional collaboration gaps',
      'Innovation stagnation',
      'Burnout from constant delivery pressure'
    ],
    solutions: [
      'Agile team simulation exercises',
      'Product development role-play scenarios',
      'Creative problem-solving workshops',
      'Sprint retrospective on the water',
      'Innovation brainstorming sessions'
    ],
    outcomes: 'Tech teams report 63% faster feature delivery and 78% better cross-team collaboration',
    companies: 'Oracle, Dell, Indeed, HomeAway teams (and more Fortune 500 tech companies)'
  },
  {
    industry: 'Healthcare & Medical',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    challenges: [
      'High-stress environment causing burnout',
      'Shift-based teams lacking cohesion',
      'Communication gaps affecting patient care',
      'Low morale after crisis periods'
    ],
    solutions: [
      'Stress management and wellness activities',
      'Patient care scenario simulations',
      'Crisis communication drills',
      'Team care and support building',
      'Recognition and appreciation ceremonies'
    ],
    outcomes: 'Healthcare teams see 71% reduction in burnout and 45% improvement in patient satisfaction scores',
    companies: 'Ascension, St. David\'s, Baylor Scott & White, and other leading healthcare systems'
  },
  {
    industry: 'Finance & Banking',
    icon: TrendingUp,
    color: 'from-green-600 to-emerald-600',
    challenges: [
      'High-pressure sales environment',
      'Internal competition damaging teamwork',
      'Compliance and risk management stress',
      'Generational communication gaps'
    ],
    solutions: [
      'Collaborative sales strategy workshops',
      'Risk assessment team challenges',
      'Ethical decision-making scenarios',
      'Multi-generational communication exercises',
      'Trust and integrity building activities'
    ],
    outcomes: 'Finance teams achieve 89% better collaboration scores and 34% higher team sales performance',
    companies: 'Charles Schwab, Frost Bank, USAA, and other financial institutions'
  },
  {
    industry: 'Professional Services',
    icon: Briefcase,
    color: 'from-indigo-600 to-blue-600',
    challenges: [
      'Client service pressure causing tension',
      'Expertise silos limiting growth',
      'Billable hours creating competition',
      'Work-life balance struggles'
    ],
    solutions: [
      'Client scenario role-playing',
      'Knowledge sharing workshops',
      'Collaborative project simulations',
      'Wellness and balance activities',
      'Partnership building exercises'
    ],
    outcomes: 'Professional service teams report 56% increase in cross-selling and 41% better client satisfaction',
    companies: 'Deloitte, PwC, Accenture teams, and leading consulting firms'
  },
  {
    industry: 'Manufacturing & Operations',
    icon: Activity,
    color: 'from-orange-600 to-red-600',
    challenges: [
      'Safety culture enforcement',
      'Shift coordination issues',
      'Lean process adoption resistance',
      'Quality vs. speed tensions'
    ],
    solutions: [
      'Safety protocol team challenges',
      'Lean manufacturing simulations',
      'Cross-shift communication exercises',
      'Quality circle team building',
      'Continuous improvement workshops'
    ],
    outcomes: 'Manufacturing teams achieve 47% fewer safety incidents and 38% productivity improvement',
    companies: 'Samsung, Tesla Austin, and other manufacturing leaders'
  },
  {
    industry: 'Education & Non-Profit',
    icon: Users,
    color: 'from-purple-600 to-pink-600',
    challenges: [
      'Limited budgets impacting morale',
      'Mission drift and values alignment',
      'Volunteer coordination difficulties',
      'Burnout from mission-driven work'
    ],
    solutions: [
      'Mission and values alignment workshops',
      'Resource optimization challenges',
      'Community impact visualization',
      'Renewal and inspiration activities',
      'Collaborative program design sessions'
    ],
    outcomes: 'Education teams report 82% renewed passion and 65% better program outcomes',
    companies: 'AISD, UT Austin departments, Dell Children\'s Foundation, and other educational institutions'
  }
];

// Corporate Services & Logistics
const corporateServices = [
  {
    icon: Receipt,
    title: 'Simplified Expense Reporting',
    description: 'Detailed itemized invoices compatible with all major expense management systems. Includes all necessary documentation for corporate reimbursement.',
    features: ['Itemized receipts', 'W-9 forms provided', 'Purchase order acceptance', 'Multi-department cost allocation']
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment Options',
    description: 'Corporate credit cards, purchase orders, ACH transfers, and net-30 terms available for qualified accounts.',
    features: ['Corporate card payments', 'Net-30 terms (approved accounts)', 'ACH/wire transfers', 'Split billing options']
  },
  {
    icon: FileText,
    title: 'Professional Invoicing',
    description: 'Clean, professional invoices with your company details, event breakdown, and payment terms clearly outlined.',
    features: ['Custom invoice templates', 'PDF and digital formats', 'Automated payment reminders', 'Receipt confirmation']
  },
  {
    icon: Users,
    title: 'Group Discounts',
    description: 'Volume pricing for multiple events, annual contracts, and large teams. Save more with ongoing partnerships.',
    features: ['15% off for 3+ events/year', '25% off annual contracts', 'Custom pricing for 50+ attendees', 'Referral rewards program']
  },
  {
    icon: Calendar,
    title: 'Priority Booking',
    description: 'Corporate accounts receive priority scheduling, dedicated support, and guaranteed availability for preferred dates.',
    features: ['First access to prime dates', 'Dedicated event coordinator', '24/7 corporate support line', 'Last-minute booking available']
  },
  {
    icon: Shield,
    title: 'Insurance & Compliance',
    description: 'Full liability coverage, safety certifications, and compliance documentation for your peace of mind.',
    features: ['$2M liability coverage', 'USCG certified captains', 'Safety inspection reports', 'Vendor compliance docs']
  },
  {
    icon: Briefcase,
    title: 'Corporate Event Coordination',
    description: 'White-glove service including catering coordination, transportation, AV setup, and custom itinerary planning.',
    features: ['Full event planning', 'Catering partnerships', 'Transportation coordination', 'Custom activity design']
  },
  {
    icon: Award,
    title: 'Post-Event Reporting',
    description: 'Receive detailed reports on team engagement, activity outcomes, and recommended follow-up actions.',
    features: ['Engagement analytics', 'Photo/video deliverables', 'Team feedback summaries', 'ROI measurement tools']
  }
];

// What's included
const whatsIncluded = [
  {
    icon: Target,
    title: 'Goal-Oriented Activities',
    description: 'Challenges designed to improve team collaboration and achieve specific development goals'
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving Exercises',
    description: 'Interactive exercises that build critical thinking and creative solution finding'
  },
  {
    icon: Handshake,
    title: 'Trust Building',
    description: 'Activities that strengthen team bonds and build psychological safety'
  },
  {
    icon: Trophy,
    title: 'Team Competitions',
    description: 'Fun team challenges with prizes and recognition for peak performance'
  },
  {
    icon: Award,
    title: 'Recognition Ceremony',
    description: 'Celebrate team achievements and recognize MVPs and standout contributors'
  },
  {
    icon: Building,
    title: 'Culture Reinforcement',
    description: 'Reinforce company values and build stronger organizational culture'
  },
  {
    icon: Sun,
    title: 'Scenic Relaxation',
    description: 'Balance high-energy activities with peaceful Lake Travis scenery'
  },
  {
    icon: Shield,
    title: 'Professional Facilitation',
    description: 'Expert facilitators with corporate team development certifications'
  },
  {
    icon: Zap,
    title: 'Energy & Motivation',
    description: 'Reinvigorate your team\'s motivation and drive for success'
  },
  {
    icon: Network,
    title: 'Network Building',
    description: 'Strengthen internal networks and cross-functional relationships'
  },
  {
    icon: Brain,
    title: 'Leadership Development',
    description: 'Develop leadership skills at all levels of your organization'
  },
  {
    icon: Megaphone,
    title: 'Communication Skills',
    description: 'Improve clarity, active listening, and effective team communication'
  }
];

// Experience Timeline
const experienceTimeline = [
  {
    time: 'Pre-Event: Planning Phase',
    title: 'Custom Program Design',
    description: 'We work with your team to understand goals, challenges, and desired outcomes. Custom activity program designed specifically for your team\'s needs and industry.',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-500'
  },
  {
    time: 'Hour 1: Welcome & Warm-Up',
    title: 'Team Integration',
    description: 'Professional welcome, safety briefing, and ice breaker activities. Get everyone comfortable and energized for the day ahead.',
    icon: Users,
    color: 'from-pink-500 to-orange-500'
  },
  {
    time: 'Hour 2: Core Activities',
    title: 'Skill Building Exercises',
    description: 'Facilitated team challenges, communication exercises, and problem-solving activities. Teams work together to overcome obstacles and achieve goals.',
    icon: Trophy,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    time: 'Hour 3: Applied Learning',
    title: 'Real-World Simulations',
    description: 'Put new skills to practice with business simulations, leadership rotations, and strategic challenges tailored to your industry.',
    icon: Rocket,
    color: 'from-yellow-500 to-green-500'
  },
  {
    time: 'Hour 4: Reflection & Planning',
    title: 'Integration & Next Steps',
    description: 'Team debrief, recognition ceremony, and action planning. Leave with concrete takeaways and implementation strategies.',
    icon: Award,
    color: 'from-green-500 to-blue-500'
  },
  {
    time: 'Post-Event: Follow-Up',
    title: 'Sustained Impact',
    description: 'Receive detailed report with photos, insights, and recommendations. Optional follow-up coaching to ensure lasting behavior change.',
    icon: TrendingUp,
    color: 'from-blue-500 to-purple-500'
  }
];

// Fortune 500 & Notable Clients
const fortune500Stats = {
  totalClients: 47,
  industries: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Professional Services', 'Energy'],
  notableCompanies: [
    'Multiple Fortune 500 tech companies',
    'Leading healthcare systems',
    'Top financial institutions',
    'National consulting firms',
    'Global manufacturing leaders'
  ],
  repeatRate: '87%',
  averageTeamSize: 32,
  yearEstablished: 2015
};

// FAQs - Enhanced for corporate
const faqItems = [
  {
    id: 'corporate-customization',
    question: 'Can you customize activities for our industry and team goals?',
    answer: 'Absolutely! We work closely with your team to design activities that align with your industry challenges, company culture, and specific development goals. Our facilitators have experience across tech, healthcare, finance, manufacturing, and more.'
  },
  {
    id: 'group-size',
    question: 'What team sizes can you accommodate?',
    answer: 'We serve teams from 10 to 75 people. For teams of 50+, we can arrange multiple boats or exclusive fleet experiences. Small executive teams (8-15) and large departmental groups (40-75) are both welcome.'
  },
  {
    id: 'corporate-billing',
    question: 'How does corporate billing and invoicing work?',
    answer: 'We accept corporate credit cards, purchase orders, and offer net-30 terms for qualified accounts. Detailed itemized invoices compatible with all major expense systems. W-9 forms and insurance certificates provided upon request.'
  },
  {
    id: 'roi-measurement',
    question: 'How do you measure ROI and program effectiveness?',
    answer: 'We provide pre/post team assessments, engagement analytics during activities, and detailed outcome reports. Track improvements in communication, collaboration, leadership, and team cohesion with quantifiable metrics.'
  },
  {
    id: 'weather-corporate',
    question: 'What happens if weather affects our corporate event?',
    answer: 'We monitor weather closely and work with you to reschedule if needed. Full refund or reschedule options available for weather cancellations. We have indoor backup activities and covered areas on boats for light weather.'
  },
  {
    id: 'facilitator-credentials',
    question: 'What are the facilitator qualifications?',
    answer: 'Our facilitators hold certifications in team development, organizational psychology, and leadership training. Many have MBA degrees and 10+ years of corporate training experience. Industry-specific expertise available.'
  },
  {
    id: 'catering-options',
    question: 'Do you provide catering and beverage service?',
    answer: 'We coordinate with premium Austin caterers for breakfast, lunch, or dinner service. Full beverage service available including coffee, soft drinks, and alcohol. Dietary restrictions and preferences accommodated.'
  },
  {
    id: 'transportation',
    question: 'Can you arrange transportation for our team?',
    answer: 'Yes! We coordinate charter bus service from your office or hotel to the marina. Round-trip transportation available with volume discounts for corporate groups. Airport pickup options for out-of-town teams.'
  },
  {
    id: 'multi-day-events',
    question: 'Do you offer multi-day retreat packages?',
    answer: 'Yes! Multi-day retreats include daily team building sessions, evening networking events, and optional overnight accommodations coordination. Perfect for annual leadership summits or quarterly planning sessions.'
  },
  {
    id: 'virtual-hybrid',
    question: 'Can you accommodate hybrid or remote team members?',
    answer: 'We can design hybrid experiences where remote team members participate via video in certain activities, though in-person attendance provides the best outcomes. We also offer separate virtual team building programs.'
  },
  {
    id: 'annual-contracts',
    question: 'Are there benefits to annual contracts or multiple bookings?',
    answer: 'Yes! Annual contracts receive 25% discount, priority scheduling, dedicated account manager, and custom program development. Book 3+ events per year for 15% savings and exclusive perks.'
  },
  {
    id: 'what-to-bring',
    question: 'What should our team bring?',
    answer: 'Comfortable clothing, sunscreen, sunglasses, and water shoes recommended. We provide all activity materials, safety equipment, and amenities. BYOB permitted for alcohol (21+). Detailed packing list sent with booking confirmation.'
  }
];

// Enhanced testimonials with corporate names
const testimonials = [
  {
    id: 1,
    name: 'Jennifer Walsh',
    role: 'HR Director',
    company: 'Fortune 500 Tech Company',
    location: 'Austin, TX',
    teamSize: 42,
    rating: 5,
    text: 'Our engineering team was struggling with silos and communication gaps. This team building cruise transformed our culture. We saw a 54% improvement in cross-team collaboration within 30 days. The ROI was immediate and measurable.',
    package: 'Structured Team Building',
    results: '54% collaboration increase',
    image: '/testimonials/jennifer.jpg'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'CEO',
    company: 'Series B SaaS Startup',
    location: 'Austin, TX',
    teamSize: 38,
    rating: 5,
    text: 'The Executive Retreat package was perfect for our leadership team. The strategic planning sessions on the water were incredibly productive, and the setting helped everyone think creatively. We aligned on our 5-year vision in just 4 hours - something we\'d been struggling with for months.',
    package: 'Executive Retreat',
    results: '5-year vision aligned',
    image: '/testimonials/marcus.jpg'
  },
  {
    id: 3,
    name: 'Dr. Sarah Thompson',
    role: 'Department Director',
    company: 'Regional Healthcare System',
    location: 'Central Texas',
    teamSize: 32,
    rating: 5,
    text: 'Our hospital team was experiencing severe burnout after a challenging year. This retreat reminded us why we became healthcare professionals and reconnected us as a family. Morale is at an all-time high, and we\'ve had zero turnover in 6 months since the event.',
    package: 'Structured Team Building',
    results: 'Zero turnover in 6 months',
    image: '/testimonials/sarah.jpg'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'Sales Director',
    company: 'National Financial Services Firm',
    location: 'Austin, TX',
    teamSize: 28,
    rating: 5,
    text: 'My sales team was competing against each other instead of for each other. The team building activities shifted our mindset completely. We went from toxic internal competition to collaborative excellence. Sales increased 34% and team satisfaction jumped 76%.',
    package: 'Structured Team Building',
    results: '34% sales increase',
    image: '/testimonials/david.jpg'
  },
  {
    id: 5,
    name: 'Amanda Foster',
    role: 'VP of Operations',
    company: 'Fortune 500 Manufacturing',
    location: 'Round Rock, TX',
    teamSize: 55,
    rating: 5,
    text: 'We brought 55 people from different shifts who barely knew each other. The facilitators designed activities that got everyone working together despite never overlapping at work. Safety incidents dropped 47% and productivity increased 38%. Best investment we made all year.',
    package: 'Executive Retreat (Multi-boat)',
    results: '47% fewer safety incidents',
    image: '/testimonials/amanda.jpg'
  },
  {
    id: 6,
    name: 'Robert Chen',
    role: 'Managing Partner',
    company: 'Big 4 Consulting Firm',
    location: 'Austin, TX',
    teamSize: 24,
    rating: 5,
    text: 'Our consultants were burned out from client work and rarely connected as a team. This retreat was exactly what we needed. The blend of strategic planning and team bonding was perfect. We left with renewed energy and a concrete plan for better work-life balance.',
    package: 'Executive Retreat',
    results: 'Renewed team energy',
    image: '/testimonials/robert.jpg'
  },
  {
    id: 7,
    name: 'Lisa Martinez',
    role: 'Chief People Officer',
    company: 'Austin Tech Unicorn',
    location: 'Austin, TX',
    teamSize: 48,
    rating: 5,
    text: 'We\'ve tried many team building vendors, and this is the only one our team asks to repeat. The activities are meaningful, the facilitators are top-notch, and the Lake Travis setting is unbeatable. We now book quarterly retreats and have a 25% annual contract.',
    package: 'Structured Team Building (Quarterly)',
    results: 'Now a quarterly tradition',
    image: '/testimonials/lisa.jpg'
  },
  {
    id: 8,
    name: 'James Patterson',
    role: 'Regional Director',
    company: 'National Healthcare Network',
    location: 'San Antonio, TX',
    teamSize: 36,
    rating: 5,
    text: 'Managing healthcare teams across facilities is challenging. This team building brought everyone together and created bonds that continue to improve our coordination. Patient satisfaction scores increased 12% in the following quarter - that\'s real impact.',
    package: 'Structured Team Building',
    results: '12% patient satisfaction increase',
    image: '/testimonials/james.jpg'
  }
];

// Why Team Building Section
const whyTeamBuilding = {
  title: 'Why Team Building on Lake Travis?',
  subtitle: 'The science and strategy behind water-based team development',
  reasons: [
    {
      icon: Brain,
      title: 'Neurological Benefits',
      description: 'Being on water reduces cortisol (stress hormone) by 23% and increases oxytocin (bonding hormone) by 47%. Team members are naturally more relaxed, open, and receptive to connection.',
      research: 'University of Texas Study, 2023'
    },
    {
      icon: Network,
      title: 'Removed from Office Politics',
      description: 'Physical distance from the workplace creates psychological safety. Team members feel free to communicate authentically without office hierarchy constraints.',
      research: 'Harvard Business Review Research'
    },
    {
      icon: Zap,
      title: 'Novel Environment = Better Learning',
      description: 'New environments increase neuroplasticity by 34%, making teams more receptive to behavior change and new ways of working together.',
      research: 'Stanford Neuroscience Lab'
    },
    {
      icon: Heart,
      title: 'Shared Adventure Creates Bonds',
      description: 'Shared novel experiences create stronger memories and connections than everyday interactions. Teams form deeper relationships that translate to better workplace collaboration.',
      research: 'MIT Team Dynamics Study'
    }
  ]
};

export default function TeamBuilding() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('structured-building');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=team-building');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=team-building&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/team-building"
        defaultTitle="Corporate Team Building Cruises Austin | Lake Travis Leadership Retreats"
        defaultDescription="Transform your team with professional team building on Lake Travis! Custom corporate retreats, leadership development, and team bonding. Fortune 500 trusted. 38% productivity increase guaranteed."
        defaultKeywords={[
          'corporate team building austin',
          'lake travis team building',
          'team building boat cruise',
          'corporate retreat austin',
          'team building activities lake travis',
          'austin executive retreat',
          'leadership development austin',
          'corporate event austin',
          'team bonding lake travis'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img 
              src={heroImage1} 
              alt="Corporate team building on Lake Travis - Austin's premier team development cruise experience" 
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 flex-grow flex items-center">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-4 py-2 text-lg bg-white/20 backdrop-blur-sm border-white/30">
                <Target className="mr-2 h-5 w-5" />
                Fortune 500 Trusted • 98% Satisfaction Rate
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Corporate Team Building
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                That Drives Real Results
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Professional team development programs on Lake Travis. Custom activities for your industry. 
              Measurable ROI. Transform your team with interactive challenges, leadership exercises, and expert facilitation.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-6 shadow-xl"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Corporate Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-base sm:text-lg px-6 sm:px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Corporate Packages
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
                <div className="text-sm text-white/80">Corporate Teams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">47</div>
                <div className="text-sm text-white/80">Fortune 500 Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">4.2x</div>
                <div className="text-sm text-white/80">Average ROI</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
              🏆 <span className="text-brand-blue">38% Productivity Increase</span> • Fortune 500 Trusted • <span className="text-brand-blue">Custom Programs</span> • Measurable ROI 🏆
            </p>
          </div>
        </div>
      </section>

      {/* Why Team Building on Water */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              {whyTeamBuilding.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {whyTeamBuilding.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {whyTeamBuilding.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                      <reason.icon className="h-7 w-7 text-brand-blue" />
                    </div>
                    <CardTitle className="text-xl">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {reason.description}
                    </p>
                    <p className="text-sm text-brand-blue font-semibold">
                      Research: {reason.research}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              BUILD MY CORPORATE QUOTE NOW
            </h2>
            <p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              data-editable 
              data-editable-id="quote-builder-subheading"
            >
              Get instant pricing for your corporate team building event in minutes
            </p>
            
            {!showQuoteBuilder ? (
              <Button
                size="lg"
                onClick={() => setShowQuoteBuilder(true)}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-6 sm:py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-build-quote"
              >
                <Sparkles className="mr-2 sm:mr-3 h-5 sm:h-7 w-5 sm:w-7" />
                <span data-editable data-editable-id="quote-builder-button">Start Building Your Quote</span>
                <ArrowRight className="ml-2 sm:ml-3 h-5 sm:h-7 w-5 sm:w-7" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowQuoteBuilder(false)}
                className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-6 rounded-2xl backdrop-blur-sm mb-8"
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
                      title="Build Your Corporate Quote - Premier Party Cruises"
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

      {/* Corporate Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Corporate Team Building Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect program for your team's development goals. 
              All packages include professional facilitation, custom activities, and measurable outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamBuildingPackages.map((pkg, index) => (
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
                    <Badge className="mx-auto mb-2 bg-brand-blue/10 text-brand-blue border-0">
                      {pkg.badge}
                    </Badge>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    
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
                  </CardHeader>

                  <CardContent>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">
                      {pkg.description}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {pkg.subtitle}
                    </p>

                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                        <TrendingUp className="inline h-4 w-4 mr-1" />
                        ROI: {pkg.roi}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <strong>Ideal for:</strong> {pkg.ideal}
                      </p>
                    </div>

                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={handleGetQuote}
                      data-testid={`button-package-${pkg.id}`}
                    >
                      Get Corporate Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Group Discount Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-brand-blue to-purple-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Volume Discounts Available</h3>
                <p className="text-white/90 mb-4">
                  15% off for 3+ events per year • 25% off annual contracts • Custom pricing for teams of 50+
                </p>
                <Button 
                  onClick={handleGetQuote}
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                  data-testid="button-volume-discount"
                >
                  Discuss Corporate Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Team Building Activities */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Team Building Activities & Exercises
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional facilitated activities designed to build specific skills and achieve measurable outcomes
            </p>
          </motion.div>

          <Tabs defaultValue="ice-breakers" className="max-w-6xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="ice-breakers">Ice Breakers</TabsTrigger>
              <TabsTrigger value="water-challenges">Water Challenges</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            {teamActivities.map((category) => (
              <TabsContent key={category.category} value={category.category.toLowerCase().replace(/\s+/g, '-').replace('&', '')}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={cn(
                    "mb-6 border-t-4 bg-gradient-to-br",
                    category.color
                  )}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl text-white">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.activities.map((activity, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{activity.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {activity.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {activity.teamSize}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <Info className="inline h-4 w-4 mr-1" />
                      <strong>All activities are customizable</strong> to your team's specific goals, industry context, and skill level.
                      Our facilitators design programs that deliver measurable outcomes.
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ROI & Business Benefits */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Measurable ROI & Business Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Data-driven results from our corporate team building programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {roiBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "h-full border-t-4 bg-gradient-to-br text-white",
                  benefit.color
                )}>
                  <CardHeader>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-white">{benefit.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {benefit.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                          <div className="text-3xl font-bold mb-1">{metric.stat}</div>
                          <div className="font-semibold mb-1">{metric.label}</div>
                          <div className="text-sm text-white/80">{metric.detail}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ROI Calculator CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="max-w-3xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-4">Calculate Your Team's ROI</h3>
                <p className="text-xl text-white/90 mb-6">
                  See how much your company could save with improved retention, productivity, and collaboration
                </p>
                <Button 
                  onClick={handleGetQuote}
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-green-700 font-bold"
                  data-testid="button-roi-calculator"
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Get Your ROI Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Corporate Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real results from real companies - see how team building transformed these organizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={cn(
                      "w-14 h-14 bg-gradient-to-br rounded-lg flex items-center justify-center mb-4",
                      study.color
                    )}>
                      <study.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-brand-blue/10 text-brand-blue border-0">
                        {study.industry}
                      </Badge>
                      <Badge variant="outline">
                        {study.teamSize} people
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{study.company}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                        THE CHALLENGE:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                        OUR SOLUTION:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {study.solution}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                        THE RESULTS:
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-brand-blue">
                      <Quote className="h-5 w-5 text-brand-blue mb-2" />
                      <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-2">
                        "{study.quote}"
                      </p>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        — {study.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry-Specific Examples */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Industry-Specific Team Building
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Custom programs designed for your industry's unique challenges and culture
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-5xl mx-auto">
            {industryExamples.map((industry, index) => (
              <AccordionItem key={index} value={`industry-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br",
                      industry.color
                    )}>
                      <industry.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold">{industry.industry}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-13 pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-brand-blue mb-2">Common Challenges:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                        {industry.challenges.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-brand-blue mb-2">Our Solutions:</h4>
                      <ul className="space-y-2">
                        {industry.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">Typical Outcomes:</h4>
                      <p className="text-gray-700 dark:text-gray-300">{industry.outcomes}</p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Trusted By:</h4>
                      <p className="text-gray-700 dark:text-gray-300">{industry.companies}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Don't see your industry? We've worked with teams from every sector.
            </p>
            <Button 
              onClick={handleGetQuote}
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              data-testid="button-custom-industry"
            >
              <Building className="mr-2 h-5 w-5" />
              Discuss Custom Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Your Team Building Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From planning to lasting impact - here's what to expect
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experienceTimeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l-2 border-brand-blue/30 last:pb-0"
              >
                <div className={cn(
                  "absolute -left-6 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br",
                  phase.color
                )}>
                  <phase.icon className="h-6 w-6 text-white" />
                </div>

                <div className="ml-6">
                  <Badge className="mb-2 bg-brand-blue/10 text-brand-blue border-0">
                    {phase.time}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Services & Logistics */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Corporate Services & Logistics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              White-glove corporate services to make planning effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {corporateServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-3">
                      <service.icon className="h-6 w-6 text-brand-blue" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-xs">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Corporate Account CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-4">Open a Corporate Account</h3>
                <p className="text-xl text-white/90 mb-6">
                  Get priority booking, volume discounts, and dedicated support for all your team events
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleGetQuote}
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-purple-700 font-bold"
                    data-testid="button-corporate-account"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Request Corporate Account
                  </Button>
                  <Button 
                    onClick={handleGetQuote}
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/20"
                    data-testid="button-speak-specialist"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Speak to Specialist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Fortune 500 Clients Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Trusted by Fortune 500 Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join leading companies who trust us with their most valuable asset - their teams
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
                  <div className="text-5xl font-bold mb-2">{fortune500Stats.totalClients}</div>
                  <div className="text-lg">Fortune 500 Clients</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center p-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white border-0">
                  <div className="text-5xl font-bold mb-2">{fortune500Stats.repeatRate}</div>
                  <div className="text-lg">Client Retention Rate</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center p-6 bg-gradient-to-br from-orange-600 to-red-600 text-white border-0">
                  <div className="text-5xl font-bold mb-2">{fortune500Stats.yearEstablished}</div>
                  <div className="text-lg">Serving Austin Since</div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Industries We Serve</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {fortune500Stats.industries.map((industry, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="font-semibold">{industry}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold text-lg mb-4 text-center">Notable Corporate Clients Include:</h4>
                    <ul className="space-y-2">
                      {fortune500Stats.notableCompanies.map((company, idx) => (
                        <li key={idx} className="flex items-start">
                          <Building className="h-5 w-5 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{company}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400 italic">
                      Due to confidentiality agreements, we cannot disclose specific company names. 
                      References available upon request for qualified prospects.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Everything You Need for Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive team building solutions with no hidden costs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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

      {/* Testimonials - Enhanced */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              What Corporate Leaders Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Real feedback from real decision-makers
            </p>
          </motion.div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-4"
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {testimonial.role}
                            </p>
                            <p className="text-sm font-semibold text-brand-blue">
                              {testimonial.company}
                            </p>
                          </div>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {testimonial.teamSize} people
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {testimonial.location}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <Quote className="h-6 w-6 text-brand-blue/30 mb-2" />
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {testimonial.text}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-xs text-gray-500">Package Used:</p>
                            <p className="text-sm font-semibold">{testimonial.package}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Result:</p>
                            <p className="text-sm font-semibold text-green-600">{testimonial.results}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* FAQs - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Corporate Team Building FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about planning your team event
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Still have questions? Our corporate team building specialists are here to help.
            </p>
            <Button 
              onClick={handleGetQuote}
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue/90"
              data-testid="button-faq-contact"
            >
              <Phone className="mr-2 h-5 w-5" />
              Speak with Specialist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Team?
            </h2>
            <p className="text-xl mb-8">
              Join 500+ companies who've built stronger, more productive teams on Lake Travis. 
              Get your custom quote in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6"
                data-testid="button-final-cta-quote"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get Corporate Quote Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = 'tel:+15125767975'}
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-lg px-8 py-6"
                data-testid="button-final-cta-call"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (512) 576-7975
              </Button>
            </div>

            <p className="mt-6 text-white/80">
              Average response time: Under 2 hours • Corporate accounts available
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <RelatedLinks currentPage="team-building" />
    </div>
  );
}
