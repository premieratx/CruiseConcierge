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
  CheckCircle, X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';

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

// Why choose corporate cruises
const whyChooseCorporate = [
  {
    icon: Receipt,
    title: 'Tax Deductible',
    description: 'Business entertainment expenses are tax-deductible. We provide detailed invoices for easy expense reporting.'
  },
  {
    icon: Network,
    title: 'Unique Networking',
    description: 'Break away from boardrooms. Foster genuine connections in a relaxed, memorable setting.'
  },
  {
    icon: TrendingUp,
    title: 'ROI Focused',
    description: 'Boost team morale, strengthen client relationships, and see real returns on your investment.'
  },
  {
    icon: Camera,
    title: 'Professional Documentation',
    description: 'Capture the event with professional photography for company newsletters and social media.'
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Complete liability coverage and Coast Guard certified operations for corporate peace of mind.'
  },
  {
    icon: Award,
    title: '14 Years Experience',
    description: 'Trusted by Austin\'s top companies for over a decade. We know corporate events.'
  }
];

// What's included
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

// Corporate testimonials
const corporateTestimonials = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    role: 'HR Director',
    company: 'TechCorp Austin',
    rating: 5,
    text: "Our quarterly team building event was a huge success! The crew was professional, the boat was perfect for our 45-person team, and the experience brought everyone together. Best corporate event we've had in years!",
    avatar: '👔',
    event: 'Team Building'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Sales Director',
    company: 'Global Solutions Inc',
    rating: 5,
    text: "We closed our biggest deal of the year after taking clients out on the yacht. The premium experience and Austin skyline views created the perfect atmosphere. Worth every penny!",
    avatar: '💼',
    event: 'Client Entertainment'
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'CEO',
    company: 'StartUp Hub',
    rating: 5,
    text: "Our executive retreat on Lake Travis was incredibly productive. Away from office distractions, we accomplished more in 4 hours than we typically do in a week of meetings. Highly recommend!",
    avatar: '🏆',
    event: 'Executive Retreat'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Operations Manager',
    company: 'Austin Logistics',
    rating: 5,
    text: "Perfect for our company anniversary celebration! The crew handled everything professionally, the boat was immaculate, and our employees are still talking about it months later.",
    avatar: '🎯',
    event: 'Company Celebration'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Marketing Director',
    company: 'Creative Agency',
    rating: 5,
    text: "We use Premier Party Cruises for all our client entertainment now. The tax-deductible aspect combined with the memorable experience makes it our go-to for important meetings.",
    avatar: '📈',
    event: 'Client Meetings'
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
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage1}
            alt="Corporate Party Boat Austin cruise event on Lake Travis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white py-24">
          <Badge className="mb-6 bg-blue-600 text-white px-6 py-2 text-sm font-sans tracking-wider uppercase">
            PROFESSIONAL CORPORATE CRUISES
          </Badge>
          <h1 className="text-5xl font-playfair font-bold mb-6 tracking-tight" data-editable data-editable-id="h1-corporate-hero">
            Corporate Event Cruises
          </h1>
          <p className="text-xl mb-4 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="corporate-hero-tagline">
            Impress Clients. Reward Your Team. Elevate Your Business.
          </p>
          <p className="text-base mb-8 max-w-3xl mx-auto text-white/90" data-editable data-editable-id="p-corporate-tagline">
            Tax-deductible business entertainment • Professional service • Unforgettable experiences
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

      {/* Why Choose Corporate Cruises */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">WHY CHOOSE US</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-why-choose">
                Why Choose Corporate Cruises
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
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
                        <p className="text-base text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Corporate Packages */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">PACKAGES</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-packages">
                Corporate Cruise Packages
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Choose the perfect package for your corporate event
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
          </div>
        </section>
      </SectionReveal>

      {/* What's Included */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">INCLUDED</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-included">
                What's Included
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
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

      {/* Testimonials */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">TESTIMONIALS</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-testimonials">
                What Corporate Clients Say
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Trusted by Austin's leading companies
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {corporateTestimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id} className="rounded-xl border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-base text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{testimonial.avatar}</div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                    <Badge className="mt-4 font-sans tracking-wider">{testimonial.event}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Pricing Table */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">PRICING</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-pricing">
                Corporate Event Pricing
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Transparent pricing for your business planning
              </p>
            </div>
            <PricingTable />
          </div>
        </section>
      </SectionReveal>

      {/* Photo Gallery */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">GALLERY</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-gallery">
                Corporate Events Gallery
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                See our professional corporate cruises in action
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img
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
        </section>
      </SectionReveal>

      {/* FAQs */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">FAQS</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-faqs">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
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
            <h2 className="text-3xl font-playfair font-bold mb-6" data-editable data-editable-id="h2-cta">
              Ready to Plan Your Corporate Event?
            </h2>
            <p className="text-base mb-8 max-w-2xl mx-auto">
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

      {/* Related Experiences Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 font-sans tracking-wider uppercase">RELATED</Badge>
              <h2 className="text-3xl font-playfair font-bold mb-4 text-center" data-editable data-editable-id="h2-related">
                Related Corporate Experiences
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
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
                      Impress your top clients with exclusive Lake Travis experiences and premium service
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" data-testid="link-client-entertainment">
                      Explore Client Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/company-milestone">
                <Card className="h-full rounded-xl hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-600">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-600" />
                    </div>
                    <CardTitle className="text-xl">Company Milestone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 text-center mb-4">
                      Celebrate company achievements and anniversaries with memorable Lake Travis cruises
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" data-testid="link-company-milestone">
                      Celebrate Milestones
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden shadow-lg">
        <div className="flex gap-4">
          <Button
            onClick={handleBookNow}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
            data-testid="button-sticky-book"
          >
            <Calendar className="mr-2 h-4 w-4" />
            BOOK EVENT
          </Button>
          <Button
            onClick={handleGetQuote}
            variant="outline"
            className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            data-testid="button-sticky-quote"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            GET QUOTE
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
