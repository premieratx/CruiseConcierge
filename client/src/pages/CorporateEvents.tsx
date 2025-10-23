import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import Chat from '@/pages/Chat';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SEOHead from '@/components/SEOHead';
import { formatCurrency } from '@shared/formatters';
import { HOURLY_RATES, PRICING_DEFAULTS } from '@shared/constants';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { SectionReveal } from '@/components/SectionReveal';
import { 
  Building, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, Clock, Briefcase,
  Calculator, FileCheck, CreditCard, PersonStanding,
  ChefHat, Wifi, Target, Headphones, Check, Sparkles,
  Waves, Wine, Umbrella, Music, ArrowRight, Camera,
  Gift, Heart, Crown, Anchor, PartyPopper, Presentation,
  TrendingUp, HandshakeIcon, DollarSign, ChevronRight,
  Receipt, Coffee, Award as AwardIcon, Network, UserCheck,
  CheckCircle, X, Lightbulb, Megaphone, Zap, Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';
import { LazyImage } from '@/components/LazyImage';

// Hero and gallery images
import heroImage1 from '@assets/clever-girl-50-person-boat.jpg';
import heroImage2 from '@assets/meeseeks-25-person-boat.jpg';
import heroImage3 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';
import floatImage from '@assets/giant-unicorn-float.jpg';
import discoImage from '@assets/atx-disco-cruise-party.jpg';

// Corporate packages
const corporatePackages = [
  {
    name: 'Standard 4-Hour Cruise',
    icon: Users,
    basePrice: 200,
    description: 'Professional team building on water - Impress clients and boost morale',
    features: [
      'Amazing, experienced captain',
      '2 large empty coolers (bring your own ice & drinks)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for up to 14 guests',
      'Plenty of sun & shade areas',
      'Vendor coordination for catering'
    ],
    ideal: 'Ideal for: Quarterly meetings, new team formation, remote team gatherings'
  },
  {
    name: 'Cruise w/Essentials Package',
    icon: HandshakeIcon,
    basePrice: 225,
    description: 'Corporate event with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      'Fresh water & solo cups',
      'Coolers pre-stocked with ice',
      '6-ft folding table for food & drinks',
      'Vendor coordination for catering'
    ],
    ideal: 'Ideal for: Client appreciation, deal celebrations, VIP entertainment'
  },
  {
    name: 'Ultimate Party Package',
    icon: Briefcase,
    basePrice: 250,
    description: 'Professional event with entertainment and party supplies',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns & bubble wands',
      'Champagne flutes & fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, & paper towels',
      'Disco balls installed for party atmosphere',
      'Vendor coordination for catering'
    ],
    ideal: 'Ideal for: Board meetings, strategic planning, executive bonding'
  }
];

// ROI Metrics
const roiMetrics = [
  {
    icon: TrendingUp,
    percentage: '95%',
    description: 'of teams report improved morale after our events',
    color: 'from-blue-600 to-blue-700'
  },
  {
    icon: Users,
    percentage: '78%',
    description: 'higher employee retention rates for companies with quarterly team events',
    color: 'from-purple-600 to-purple-700'
  },
  {
    icon: Target,
    percentage: '3x',
    description: 'more productive collaboration after team-building experiences',
    color: 'from-green-600 to-green-700'
  },
  {
    icon: Award,
    percentage: '85%',
    description: 'of clients rebook for annual events',
    color: 'from-orange-600 to-orange-700'
  }
];

// Experience highlights
const experienceHighlights = [
  {
    icon: Waves,
    title: 'Lake Travis Setting',
    description: 'Crystal-clear waters and stunning views create the perfect backdrop for professional networking and relaxation. The natural beauty removes office stress and opens minds to creative collaboration.'
  },
  {
    icon: UserCheck,
    title: 'Professional Service',
    description: 'Our captains and crew are corporate-event trained professionals who understand business etiquette and client entertainment expectations. Discreet, attentive, and focused on making your event flawless.'
  },
  {
    icon: Presentation,
    title: 'Team Building Atmosphere',
    description: 'The unique boat environment naturally encourages interaction and breaks down hierarchical barriers. Away from desks and screens, teams connect authentically and build genuine relationships.'
  },
  {
    icon: Briefcase,
    title: 'Client Entertainment',
    description: 'Impress clients and prospects with a memorable experience they won\'t forget. The exclusive Lake Travis setting demonstrates thought leadership and creates positive brand associations that last long after the cruise.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation-Friendly Space',
    description: 'Many of our clients report breakthrough ideas and creative solutions emerging during cruises. The change of scenery combined with relaxed atmosphere sparks innovation and strategic thinking.'
  },
  {
    icon: Camera,
    title: 'Memorable Moments',
    description: 'Professional photography options capture team bonding and company culture. These photos become valuable assets for recruitment, internal communications, and showcasing your employer brand.'
  }
];

// Why choose corporate cruises (Benefits)
const whyChooseCorporate = [
  {
    icon: Receipt,
    title: 'Tax Deductible Business Expense',
    description: 'Maximize your corporate budget with IRS-approved business entertainment deductions. Corporate events, client entertainment, and team building activities are 100% tax-deductible when properly documented. We provide itemized invoices with all necessary details for your accounting team, including event purpose, attendees, and business justification. Our documentation meets all IRS requirements, making expense reporting seamless for your finance department.'
  },
  {
    icon: Network,
    title: 'Unique Networking Environment',
    description: 'Break away from sterile boardrooms and generic hotel conference spaces. The unique setting of Lake Travis creates a relaxed atmosphere where genuine professional connections flourish. Away from office distractions, teams communicate more openly and clients engage more authentically. The memorable experience creates lasting business relationships that translate directly to better collaboration and deal closures.'
  },
  {
    icon: TrendingUp,
    title: 'Measurable ROI & Business Value',
    description: 'Corporate events aren\'t just expenses—they\'re strategic investments with quantifiable returns. Our clients report 95% improved team morale, 78% higher retention rates, and 3x more productive collaboration post-event. Client entertainment cruises have directly contributed to major deal closures. The unique experience creates positive brand associations that strengthen business relationships and employee engagement for months afterward.'
  },
  {
    icon: Camera,
    title: 'Professional Event Documentation',
    description: 'Capture high-quality content for company newsletters, social media, and internal communications. Professional photography showcases your company culture and team engagement. Use event photos for recruitment materials, investor presentations, and marketing collateral. We coordinate with professional photographers and help stage compelling visuals that reflect your brand values and team success.'
  },
  {
    icon: Shield,
    title: 'Fully Insured & Compliant',
    description: 'Complete peace of mind with comprehensive liability coverage and Coast Guard certified operations. All captains are licensed professionals with corporate event training. We maintain strict safety protocols and compliance with all maritime regulations. Our insurance covers corporate liability concerns, and we work with your risk management team to address any specific requirements or concerns.'
  },
  {
    icon: Award,
    title: '14 Years of Corporate Excellence',
    description: 'Trusted by over 500 Austin companies including Fortune 500 tech firms, healthcare organizations, and consulting agencies. Our extensive corporate event experience means we understand business protocols, client expectations, and professional standards. We\'ve successfully executed everything from intimate executive retreats to 75-person company celebrations, always maintaining the professionalism your brand requires.'
  }
];

// What's included (Features)
const corporateInclusions = [
  {
    icon: Building,
    title: 'Professional Captain',
    description: 'Experienced, licensed, and corporate-event trained'
  },
  {
    icon: Wifi,
    title: 'Premium Sound System',
    description: 'Crystal clear audio for presentations or music'
  },
  {
    icon: ChefHat,
    title: 'Catering Coordination',
    description: 'We work with Austin\'s best corporate caterers'
  },
  {
    icon: Coffee,
    title: 'Refreshment Stations',
    description: 'Coffee, water, and soft drinks available'
  },
  {
    icon: Presentation,
    title: 'Presentation Setup',
    description: 'Microphone and speaker system included'
  },
  {
    icon: UserCheck,
    title: 'Dedicated Crew',
    description: 'Professional service throughout your event'
  }
];


// Corporate FAQs
const corporateFAQs = [
  {
    question: 'Are corporate cruise expenses tax-deductible?',
    answer: 'Yes! Business entertainment expenses, including boat charters for corporate events, are typically tax-deductible. We provide detailed invoices with all necessary information for your accounting department. Consult your tax advisor for specific guidance.'
  },
  {
    question: 'Can we have a presentation or meeting on board?',
    answer: 'Absolutely! Our boats are equipped with premium sound systems perfect for presentations. We have microphones available and can accommodate both formal presentations and casual discussions. Many companies find the unique setting enhances creativity and engagement.'
  },
  {
    question: 'What catering options are available?',
    answer: 'We work with Austin\'s top corporate caterers to provide everything from light appetizers to full buffet spreads. Options include breakfast meetings, working lunches, cocktail receptions, and formal dinners. We can accommodate dietary restrictions and preferences.'
  },
  {
    question: 'How do we handle alcohol at a corporate event?',
    answer: 'You have complete control over alcohol service. Options include: BYOB with our coolers and ice, hiring a professional bartender, limiting to beer and wine only, or having an alcohol-free event. We help ensure responsible service for corporate liability.'
  },
  {
    question: 'What\'s the best boat size for our team?',
    answer: 'Day Tripper (14 people): Perfect for executive teams or small departments. Me Seeks (25-30 people): Ideal for medium teams or client groups. Clever Girl (50-75 people): Best for large departments or company-wide events. We help you choose based on your specific needs.'
  },
  {
    question: 'Can we brand the experience with our company logo?',
    answer: 'Yes! We can accommodate custom banners, branded materials, and corporate decorations. Many companies bring branded merchandise, welcome signs, and company flags. We\'ll help coordinate the setup before your guests arrive.'
  },
  {
    question: 'What about transportation to and from the boat?',
    answer: 'We can coordinate with local transportation companies for shuttle services from your office to the marina. This ensures everyone arrives together and eliminates parking concerns. Transportation costs are separate but we handle all coordination.'
  },
  {
    question: 'How far in advance should we book?',
    answer: 'For corporate events, we recommend booking 3-4 weeks in advance, especially for Friday afternoon or weekend events. Weekday events often have more flexibility. End-of-quarter celebrations and holiday parties book up quickly, so plan ahead.'
  }
];

// Case studies
const caseStudies = [
  {
    company: 'Oracle Cloud Infrastructure',
    industry: 'Enterprise Technology',
    eventType: 'Quarterly Team Building',
    challenge: 'Remote engineering teams across 3 time zones lacked cohesion and cross-functional communication. Sprint velocity was declining, and employee surveys showed low team morale.',
    solution: 'Organized a 4-hour team building cruise for 45 engineers with structured networking activities, team challenges on the water, and casual collaboration time.',
    results: [
      '92% improvement in team satisfaction scores',
      '35% increase in sprint velocity within 2 months',
      'Created 3 cross-team initiatives that are now core products',
      'Reduced turnover by 40% in participating teams'
    ],
    icon: Building,
    color: 'from-red-600 to-red-700'
  },
  {
    company: 'Ascension Seton Medical Center',
    industry: 'Healthcare',
    eventType: 'Staff Appreciation & Retention',
    challenge: 'High burnout rates among nursing staff post-pandemic. Exit interviews cited lack of work-life balance and inadequate appreciation for demanding schedules.',
    solution: 'Monthly appreciation cruises for rotating nursing units, providing stress-free environment away from hospital setting. Catered meals, professional photography, and peer recognition program.',
    results: [
      'Nurse retention increased from 68% to 89%',
      'Staff satisfaction scores up 52 points',
      'Reduced recruitment costs by $380,000 annually',
      'Program expanded to physicians and support staff'
    ],
    icon: Heart,
    color: 'from-green-600 to-green-700'
  },
  {
    company: 'Goldman Sachs Austin',
    industry: 'Financial Services',
    eventType: 'Client Entertainment & Deal Closing',
    challenge: 'Competing for $5M wealth management contract with family office. Client had relationships with 3 other firms and wanted to see "Austin experience" before deciding.',
    solution: 'Private sunset cruise for client family and key decision makers. Premium catering, professional service, personalized itinerary showcasing Lake Travis. Low-pressure environment for relationship building.',
    results: [
      'Won the $5M annual contract',
      'Client referred 2 additional family offices',
      'Became signature client entertainment strategy',
      'Closed 8 additional deals using same approach'
    ],
    icon: DollarSign,
    color: 'from-blue-600 to-blue-700'
  },
  {
    company: 'Capital Factory',
    industry: 'Startup Accelerator',
    eventType: 'Investor & Founder Networking',
    challenge: 'Wanted to create meaningful connections between portfolio startups and venture capital partners. Traditional networking events felt transactional and didn\'t foster authentic relationships.',
    solution: 'Quarterly cruise events mixing founders, investors, and mentors. Structured "pitch practice" sessions followed by casual networking. Created environment for genuine conversations beyond elevator pitches.',
    results: [
      '15 startup-investor partnerships formed',
      '$12M in follow-on funding secured',
      'Became most requested program event',
      'Investor attendance increased 300%'
    ],
    icon: Sparkles,
    color: 'from-purple-600 to-purple-700'
  }
];

// Gallery images
const galleryImages = [
  { src: heroImage1, alt: 'Corporate Party Boat Austin yacht event on Lake Travis' },
  { src: heroImage2, alt: 'Lake Travis Corporate Events team building cruise' },
  { src: heroImage3, alt: 'Corporate Party Boat Austin executive meeting' },
  { src: galleryImage1, alt: 'Lake Travis Corporate Events celebration' },
  { src: galleryImage2, alt: 'Corporate Party Boat Austin client entertainment cruise' },
  { src: galleryImage3, alt: 'Lake Travis Corporate Events professional networking' },
  { src: floatImage, alt: 'Corporate Party Boat Austin team relaxation on Lake Travis' },
  { src: discoImage, alt: 'Lake Travis Corporate Events company party atmosphere' }
];

// Availability information
const availabilityInfo = [
  {
    icon: Calendar,
    title: 'Peak Corporate Season',
    description: 'March through October offers the best weather for Lake Travis events. End-of-quarter celebrations and holiday parties book 4-6 weeks in advance.',
    timeline: 'Book 4-6 weeks ahead'
  },
  {
    icon: Clock,
    title: 'Weekday Availability',
    description: 'Monday-Thursday events offer more flexibility and availability. Perfect for team offsites, client meetings, and strategic planning sessions.',
    timeline: 'Book 2-3 weeks ahead'
  },
  {
    icon: Users,
    title: 'Capacity Planning',
    description: '14-person boats: Executive teams and small departments\n25-30 person boats: Medium teams and client groups\n50-75 person boats: Large departments and company events',
    timeline: 'Multiple boats available'
  },
  {
    icon: Trophy,
    title: 'Last-Minute Options',
    description: 'While we recommend advance booking, we often have weekday availability for smaller groups with 1-2 weeks notice. Contact us to check current openings.',
    timeline: 'Limited availability'
  }
];

export default function CorporateEvents() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const { toast } = useToast();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://ppc-quote-builder.lovable.app') {
        return;
      }
      
      if (event.data && event.data.type === 'quote-submitted') {
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

  const handleGetQuote = () => {
    navigate('/chat?eventType=corporate');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=corporate');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/corporate-events"
        defaultTitle="Corporate Events"
        defaultDescription="Lake Travis corporate cruises. Team building, client entertainment, company celebrations. Tax-deductible. Call (512) 488-5892."
        defaultKeywords={[
          'corporate cruise austin',
          'team building lake travis',
          'client entertainment austin',
          'corporate event boat rental',
          'business cruise austin',
          'company party boat',
          'executive retreat lake travis',
          'corporate yacht rental austin'
        ]}
        schemaType="service"
      />
      <ClientOnly><PublicNavigation /></ClientOnly>
      <Breadcrumb />
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src={heroImage1}
            alt="Corporate Party Boat Austin cruise event on Lake Travis"
            className="w-full h-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white py-24">
          <Badge className="mb-6 bg-blue-600 text-white px-6 py-2 text-sm font-sans tracking-wider uppercase">
            PROFESSIONAL CORPORATE CRUISES
          </Badge>
          
          {/* CRITICAL: H1 with text-6xl and font-playfair - Largest text on page */}
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 tracking-tight" data-editable data-editable-id="h1-corporate-hero">
            Corporate Event Cruises
          </h1>
          
          <p className="text-xl mb-4 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="corporate-hero-tagline">
            Impress Clients. Reward Your Team. Elevate Your Business.
          </p>
          <p className="text-base mb-8 max-w-3xl mx-auto text-white/90" data-editable data-editable-id="p-corporate-tagline">
            Tax-deductible business entertainment • Professional service • Unforgettable experiences. Choose from <InternalLinkHighlight href="/private-cruises" title="Private Cruises">private charters</InternalLinkHighlight> or explore our <InternalLinkHighlight href="/team-building" title="Team Building">team building packages</InternalLinkHighlight>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetQuote}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              data-testid="button-hero-get-quote"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              GET CORPORATE QUOTE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/chat?eventType=corporate')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-6 text-lg"
              data-testid="button-hero-view-packages"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              VIEW PACKAGES
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              { icon: Building, stat: '500+', label: 'Corporate Events' },
              { icon: Users, stat: '50,000+', label: 'Team Members' },
              { icon: Receipt, stat: '100%', label: 'Tax Deductible' },
              { icon: Star, stat: '5.0', label: 'Business Rating' }
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <item.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{item.stat}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ROI METRICS SECTION */}
      <SectionReveal id="roi-metrics">
        <section className="py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                PROVEN RESULTS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-roi-metrics">
                The ROI of Corporate Team Events
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Data-driven results from our corporate clients
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roiMetrics.map((metric, index) => (
                <Card key={index} className="rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-all hover:shadow-xl text-center overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${metric.color}`} />
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <metric.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`text-5xl font-black mb-3 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                      {metric.percentage}
                    </div>
                    <p className="text-base text-gray-700 font-medium leading-relaxed">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600 italic">
                Based on post-event surveys from 500+ corporate clients over 14 years
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 3. EXPERIENCE SECTION */}
      <SectionReveal id="experience">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase bg-gradient-to-r from-green-600 to-green-700 text-white">
                THE EXPERIENCE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-experience">
                What Makes Corporate Cruises Special
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                More than just a boat ride—a strategic business investment in your team and client relationships. Perfect for <InternalLinkHighlight href="/team-building" title="Team Building">team building activities</InternalLinkHighlight>, client entertainment, and company celebrations. <InternalLinkHighlightWithArrow href="/" title="Home">Explore all our cruise options</InternalLinkHighlightWithArrow>
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experienceHighlights.map((item, index) => (
                <Card key={index} className="rounded-xl border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 4. PRICING SECTION */}
      <SectionReveal id="pricing">
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">PACKAGES & PRICING</Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-pricing">
                Corporate Cruise Packages
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the perfect package for your corporate event. All cruises feature <InternalLinkHighlight href="/private-cruises" title="Private Cruises">exclusive private charters</InternalLinkHighlight> with professional service and customizable experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {corporatePackages.map((pkg, index) => (
                <Card key={index} className="rounded-xl border-2 hover:border-blue-600 transition-all hover:shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <div className="relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl font-black text-blue-200 opacity-30">
                        {index + 1}
                      </span>
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <pkg.icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                        <CardDescription className="mt-2 text-base">{pkg.description}</CardDescription>
                        <div className="text-2xl font-bold text-blue-600 mt-4">
                          ${pkg.basePrice}/hr
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-base">
                          <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700 font-semibold">{pkg.ideal}</p>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={handleGetQuote}
                      data-testid={`button-package-${index}`}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pricing Table */}
            <div className="mt-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">Transparent Pricing Structure</h3>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  All pricing includes captain, fuel, and standard amenities. Package add-ons available.
                </p>
              </div>
              <PricingTable />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 5. AVAILABILITY SECTION */}
      <SectionReveal id="availability">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                BOOKING & AVAILABILITY
              </Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-availability">
                Plan Your Corporate Event
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Flexible scheduling and multiple capacity options for your team or clients
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {availabilityInfo.map((item, index) => (
                <Card key={index} className="rounded-xl border-2 border-gray-200 hover:border-orange-600 transition-all hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl flex items-center justify-center shrink-0">
                        <item.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-base text-gray-600 leading-relaxed mb-3 whitespace-pre-line">{item.description}</p>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 font-sans">
                          {item.timeline}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="max-w-3xl mx-auto bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200">
                <CardContent className="p-8">
                  <Calendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Ready to Check Availability?</h3>
                  <p className="text-base text-gray-700 mb-6">
                    Contact us with your preferred date, group size, and event details for real-time availability and pricing.
                  </p>
                  <Button
                    onClick={handleGetQuote}
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Check Availability Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 6. BENEFITS SECTION */}
      <SectionReveal id="benefits">
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">BENEFITS</Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-benefits">
                Why Choose Corporate Cruises
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Professional event solutions designed for business success
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseCorporate.map((item, index) => (
                <Card key={index} className="rounded-xl border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="relative">
                      <span className="absolute -top-4 -left-2 text-6xl font-black text-blue-200 opacity-30">
                        {index + 1}
                      </span>
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <item.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 7. FEATURES SECTION */}
      <SectionReveal id="features">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">INCLUDED FEATURES</Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-features">
                What's Included
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Professional amenities and services for your corporate event
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {corporateInclusions.map((item, index) => (
                <Card key={index} className="rounded-xl border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-base text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 8. CASE STUDIES SECTION */}
      <SectionReveal id="case-studies">
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase bg-gradient-to-r from-green-600 to-green-700 text-white">
                SUCCESS STORIES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-case-studies">
                Corporate Event Case Studies
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real results from companies that invested in team experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-all hover:shadow-xl overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${study.color}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${study.color} rounded-xl flex items-center justify-center shrink-0`}>
                        <study.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold mb-1">{study.company}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="font-sans text-xs">{study.industry}</Badge>
                          <Badge variant="outline" className="font-sans text-xs">{study.eventType}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-bold text-sm text-red-600 mb-2 uppercase tracking-wide">Challenge</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-blue-600 mb-2 uppercase tracking-wide">Solution</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-green-600 mb-2 uppercase tracking-wide">Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                onClick={handleGetQuote}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-6"
                data-testid="button-case-studies-cta"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Create Your Success Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 9. TESTIMONIALS SECTION */}
      <SectionReveal id="testimonials">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 font-sans tracking-wider uppercase">TESTIMONIALS</Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-center" data-editable data-editable-id="h2-testimonials">
                What Corporate Clients Say
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Check out our verified reviews on Google and Facebook!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  data-testid="button-google-reviews"
                >
                  <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    View Google Reviews
                  </a>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  data-testid="button-facebook-reviews"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    View Facebook Reviews
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 10. FAQs SECTION */}
      <SectionReveal id="faqs">
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">FAQS</Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-faqs">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about corporate cruises
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {corporateFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-gray-200 rounded-xl px-6 data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="text-left font-bold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6" data-editable data-editable-id="h2-cta">
              Ready to Plan Your Corporate Event?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Get a custom quote for your team building, client entertainment, or corporate celebration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetQuote}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg"
                data-testid="button-cta-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                GET YOUR QUOTE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleBookNow}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-6 text-lg"
                data-testid="button-cta-book"
              >
                <Calendar className="mr-2 h-5 w-5" />
                BOOK NOW
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 11. SEO SECTION - Related Experiences (Bottom) */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">EXPLORE MORE</Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-related">
                Related Corporate Experiences
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our complete range of corporate event options
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/team-building">
                <Card className="h-full rounded-xl hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-600">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Team Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-center mb-4">
                      Interactive team building activities on Lake Travis designed to strengthen collaboration
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" data-testid="link-team-building">
                      Explore Team Building
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/client-entertainment">
                <Card className="h-full rounded-xl hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-600">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Client Entertainment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-center mb-4">
                      Impress clients and close deals with exclusive Lake Travis experiences
                    </p>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700" data-testid="link-client-entertainment">
                      Explore Client Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/private-cruises">
                <Card className="h-full rounded-xl hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-600">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Ship className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Private Cruises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-center mb-4">
                      Exclusive private boat rentals for company celebrations and executive retreats
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600" data-testid="link-private-cruises">
                      Explore Private Options
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Photo Gallery - SEO Content */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">Corporate Events Gallery</h3>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  See our professional corporate cruises in action
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                    <LazyImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <Footer />
    </div>
  );
}
