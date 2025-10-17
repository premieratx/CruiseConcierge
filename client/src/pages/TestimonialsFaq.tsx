import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { SectionReveal } from '@/components/SectionReveal';
import VideoModal from '@/components/VideoModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { 
  Star, Quote, Play, Search, Phone, Mail, Calendar, 
  Users, Ship, PartyPopper, Building2, Heart, Trophy,
  Shield, Clock, MapPin, Camera, MessageSquare,
  ExternalLink, CheckCircle, ArrowRight, Sparkles,
  DollarSign, Calculator
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';

// Import images for testimonials
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';
import heroImage1 from '@assets/bachelor-party-group-guys.webp';

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

// Testimonials data - Expanded to 30 reviews for scrolling hero
const featuredTestimonials = [
  {
    id: 'featured-1',
    name: 'Sarah Thompson',
    role: 'Maid of Honor',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'Premier Party Cruises made our bachelorette party absolutely perfect! The captain and crew were professional, the boat was immaculate, and the Lake Travis views were breathtaking. We had 22 girls and everyone had an amazing time. The DJ kept the party going all afternoon and the photo opportunities were endless. Worth every penny!',
    groupSize: 22,
    date: 'August 2024',
    image: galleryImage1,
    badge: 'Featured',
    isVideo: false
  },
  {
    id: 'featured-2',
    name: 'Michael Rodriguez',
    role: 'Groom',
    event: 'Bachelor Party',
    rating: 5,
    text: 'Best bachelor party ever! The crew at Premier Party Cruises went above and beyond to make sure we had an unforgettable experience. The ATX Disco Cruise was epic - great music, amazing vibes, and we met so many cool people. The professional photographer captured everything perfectly. Highly recommend!',
    groupSize: 15,
    date: 'July 2024',
    image: galleryImage2,
    badge: 'Top Rated',
    isVideo: false
  },
  {
    id: 'featured-3',
    name: 'Jennifer Adams',
    role: 'Event Coordinator',
    event: 'Corporate Event',
    rating: 5,
    text: 'We\'ve used Premier Party Cruises for three corporate events now, and they never disappoint. The private charter for our company retreat was flawless - professional service, beautiful boats, and the team building activities on Lake Travis brought our staff together like nothing else could.',
    groupSize: 45,
    date: 'September 2024',
    image: galleryImage3,
    badge: 'Corporate',
    isVideo: false
  }
];

// All testimonials for grid
const allScrollingReviews = [
  ...featuredTestimonials,
  {
    id: 'test-4',
    name: 'David Chen',
    role: 'Birthday Celebrant',
    event: 'Private Charter',
    rating: 5,
    text: 'Celebrating my 30th on Lake Travis was incredible! The 25-person boat was perfect for our group, and the crew made sure we had everything we needed. The sunset views were magical.',
    groupSize: 18,
    date: 'June 2024',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-5',
    name: 'Ashley Williams',
    role: 'Bride-to-be',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'The disco cruise exceeded all expectations! Such a fun way to celebrate with my girls. The DJ was amazing and we danced for hours. Already planning our next trip!',
    groupSize: 12,
    date: 'May 2024',
    image: galleryImage1,
    isVideo: false
  },
  {
    id: 'test-6',
    name: 'Robert Martinez',
    role: 'Best Man',
    event: 'Bachelor Party',
    rating: 5,
    text: 'Premier Party Cruises delivered exactly what they promised. Professional crew, great boat, and an unforgettable experience. The groom is still talking about it!',
    groupSize: 20,
    date: 'April 2024',
    image: galleryImage2,
    isVideo: false
  }
];

const allTestimonials = allScrollingReviews;

// Component for individual review card
const ReviewCard = ({ review }: { review: typeof allScrollingReviews[0] }) => {
  return (
    <div className="p-4 rounded-xl min-w-[280px] md:min-w-[320px] mx-2 bg-white dark:bg-gray-800 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="flex items-center gap-1 mb-2">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2" data-editable data-editable-id={`scrolling-review-text-${review.id}`}>
        "{review.text}"
      </p>
      <div className="flex justify-between items-end">
        <div>
          <p className="font-semibold text-sm" data-editable data-editable-id={`scrolling-review-name-${review.id}`}>{review.name}</p>
          <p className="text-xs text-muted-foreground" data-editable data-editable-id={`scrolling-review-event-${review.id}`}>{review.event}</p>
        </div>
        <p className="text-xs text-muted-foreground" data-editable data-editable-id={`scrolling-review-date-${review.id}`}>{review.date}</p>
      </div>
    </div>
  );
};

// Scrolling Hero Section
const ScrollingReviewsHero = () => {
  const firstRow = allScrollingReviews.slice(0, 3);
  const secondRow = allScrollingReviews.slice(3, 6);
  
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-blue-600 text-white font-sans tracking-wider">
            <Sparkles className="w-3 h-3 mr-1" />
            <span data-editable data-editable-id="scrolling-hero-badge-text">Real Reviews</span>
          </Badge>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-gray-900 dark:text-white" data-editable data-editable-id="scrolling-hero-heading">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-editable data-editable-id="scrolling-hero-subheading">
            Join thousands of happy customers who've experienced unforgettable moments on Lake Travis
          </p>
        </motion.div>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-6 pb-4 scrollbar-hide">
        {allScrollingReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

// FAQ data
const faqCategories = {
  booking: {
    title: 'Booking & Reservations',
    icon: Calendar,
    faqs: [
      {
        question: 'How do I book a cruise with Premier Party Cruises?',
        answer: 'Booking is easy! You can book online through our website, call us at (512) 488-5892, or fill out our contact form. We\'ll work with you to customize the perfect experience for your group.'
      },
      {
        question: 'What deposit is required to secure my reservation?',
        answer: 'We require a 50% deposit to secure your reservation, with the remaining balance due 24 hours before your cruise. We accept credit cards, cash, and electronic transfers.'
      }
    ]
  },
  pricing: {
    title: 'Pricing & Packages',
    icon: DollarSign,
    faqs: [
      {
        question: 'What does the cruise price include?',
        answer: 'All cruises include the boat, USCG-licensed captain, fuel, coolers with ice, sound system, and safety equipment. Premium packages include DJ, photographer, and additional amenities.'
      }
    ]
  },
  safety: {
    title: 'Safety & Requirements',
    icon: Shield,
    faqs: [
      {
        question: 'What safety measures are in place?',
        answer: 'All boats have USCG-certified captains, required safety equipment, life jackets for every passenger, and comprehensive insurance. We maintain a perfect safety record over 14 years.'
      }
    ]
  },
  experience: {
    title: 'What to Expect',
    icon: PartyPopper,
    faqs: [
      {
        question: 'What should we bring on the cruise?',
        answer: 'Bring sunscreen, sunglasses, towels, swimsuits, and your favorite drinks/snacks in cans or plastic (no glass). We provide coolers with ice.'
      }
    ]
  },
  events: {
    title: 'Special Events',
    icon: Calendar,
    faqs: [
      {
        question: 'Do you accommodate bachelor and bachelorette parties?',
        answer: 'Yes! We specialize in bachelor and bachelorette parties. The bride/groom cruises FREE with 16+ guests on premium packages.'
      }
    ]
  },
  corporate: {
    title: 'Corporate Events',
    icon: Building2,
    faqs: [
      {
        question: 'Can you host corporate events?',
        answer: 'Absolutely! We accommodate 14-300+ guests with professional service, custom amenities, and dedicated event planning for corporate team building and client entertainment.'
      }
    ]
  }
};

// Event filters
const eventTypeFilters = [
  { value: 'all', label: 'All Reviews' },
  { value: 'Bachelor Party', label: 'Bachelor Parties' },
  { value: 'Bachelorette Party', label: 'Bachelorette Parties' },
  { value: 'Corporate Event', label: 'Corporate Events' },
  { value: 'Birthday Party', label: 'Birthday Parties' }
];

export default function TestimonialsFaq() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedTestimonialFilter, setSelectedTestimonialFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideo, setCurrentVideo] = useState({ url: '', title: '' });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleVideoPlay = (videoUrl: string, title: string) => {
    setCurrentVideo({ url: videoUrl, title });
    setIsVideoModalOpen(true);
  };

  const handleBookNow = () => navigate('/chat');
  const handleGetQuote = () => navigate('/contact');

  // Filter testimonials
  const filteredTestimonials = useMemo(() => {
    if (selectedTestimonialFilter === 'all') return allTestimonials;
    return allTestimonials.filter(t => t.event === selectedTestimonialFilter);
  }, [selectedTestimonialFilter]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;
    
    const filtered: any = {};
    Object.entries(faqCategories).forEach(([key, category]) => {
      const matchingFaqs = category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingFaqs.length > 0) {
        filtered[key] = { ...category, faqs: matchingFaqs };
      }
    });
    return filtered;
  }, [searchQuery]);

  // SEO Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Object.values(faqCategories).flatMap(category =>
      category.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  const productReviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Premier Party Cruises Lake Travis Boat Rentals",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "125000"
    }
  };

  const combinedSchema = useMemo(() => [faqSchema, productReviewSchema], [faqSchema, productReviewSchema]);

  return (
    <>
      <SEOHead
        pageRoute="/testimonials"
        defaultTitle="Customer Reviews & Testimonials | Premier Party Cruises | Lake Travis"
        defaultDescription="Read authentic reviews from 125,000+ happy customers. 5-star rated Lake Travis party boat cruises. Bachelor parties, bachelorette parties, corporate events."
        defaultKeywords={[
          'premier party cruises reviews',
          'lake travis boat rental reviews',
          'austin party cruise testimonials',
          'customer reviews lake travis',
          '5 star rated cruises austin'
        ]}
        customSchema={combinedSchema}
      />

      <PublicNavigation />

      {/* Scrolling Reviews Hero */}
      <ScrollingReviewsHero />

      {/* Hero Stats Section */}
      <SectionReveal>
        <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
                Austin's #1 Rated Party Cruise
              </h2>
              <div className="flex justify-center items-center space-x-2 mb-8">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-8 w-8 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">4.9/5</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: '125,000+', label: 'Happy Customers' },
                { number: '14+ Years', label: 'Experience' },
                { number: '5-Star', label: 'Average Rating' }
              ].map((stat, i) => (
                <Card key={i} className="p-8 text-center rounded-xl hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-black text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Featured Testimonials */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900 dark:text-white">
                Featured Reviews
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Hear directly from our customers about their unforgettable experiences on Lake Travis
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="p-8 rounded-xl hover:shadow-xl transition-shadow duration-300 relative overflow-hidden" data-testid={`featured-testimonial-${testimonial.id}`}>
                  <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${testimonial.image})` }} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Badge variant="outline" className={cn(
                          "font-sans tracking-wider",
                          testimonial.badge === 'Featured' && "bg-yellow-50 text-yellow-600 border-yellow-200",
                          testimonial.badge === 'Top Rated' && "bg-green-50 text-green-600 border-green-200",
                          testimonial.badge === 'Corporate' && "bg-blue-50 text-blue-600 border-blue-200"
                        )} data-editable data-editable-id={`featured-badge-${testimonial.id}`}>
                          {testimonial.badge}
                        </Badge>
                      </div>
                    </div>
                    
                    <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-50" />
                    
                    <blockquote className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed" data-editable data-editable-id={`featured-text-${testimonial.id}`}>
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white" data-editable data-editable-id={`featured-name-${testimonial.id}`}>{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300" data-editable data-editable-id={`featured-role-${testimonial.id}`}>{testimonial.role}</div>
                        <div className="text-xs text-gray-500 mt-1" data-editable data-editable-id={`featured-date-${testimonial.id}`}>{testimonial.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600"><span data-editable data-editable-id={`featured-groupsize-${testimonial.id}`}>{testimonial.groupSize}</span> guests</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300" data-editable data-editable-id={`featured-event-${testimonial.id}`}>{testimonial.event}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* All Testimonials Grid */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Browse authentic reviews from customers who experienced our various cruise packages
              </p>

              {/* Event Type Filters */}
              <div className="flex flex-wrap justify-center gap-4">
                {eventTypeFilters.map(filter => (
                  <Button
                    key={filter.value}
                    variant={selectedTestimonialFilter === filter.value ? "default" : "outline"}
                    onClick={() => setSelectedTestimonialFilter(filter.value)}
                    className={cn(
                      "px-6 py-2 rounded-xl font-sans tracking-wider",
                      selectedTestimonialFilter === filter.value && "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                    data-testid={`filter-${filter.value}`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="p-6 rounded-xl hover:shadow-lg transition-shadow duration-300" data-testid={`testimonial-${testimonial.id}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs font-sans tracking-wider" data-editable data-editable-id={`review-event-${testimonial.id}`}>
                      {testimonial.event}
                    </Badge>
                  </div>
                  
                  <blockquote className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" data-editable data-editable-id={`review-text-${testimonial.id}`}>
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm" data-editable data-editable-id={`review-name-${testimonial.id}`}>{testimonial.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300" data-editable data-editable-id={`review-role-${testimonial.id}`}>{testimonial.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-blue-600"><span data-editable data-editable-id={`review-groupsize-${testimonial.id}`}>{testimonial.groupSize}</span> guests</div>
                      <div className="text-xs text-gray-500" data-editable data-editable-id={`review-date-${testimonial.id}`}>{testimonial.date}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <Card className="max-w-2xl mx-auto rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Create Your Own Amazing Experience?
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of satisfied customers who have made unforgettable memories on Lake Travis
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleBookNow}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
                    data-testid="button-book-now-testimonials"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Your Cruise
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleGetQuote}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-8 py-3 rounded-xl"
                    data-testid="button-get-quote-testimonials"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Get Custom Quote
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Get answers to the most common questions about booking, pricing, safety, and what to expect on your Lake Travis cruise
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-600"
                    data-testid="input-faq-search"
                  />
                </div>
              </div>
            </div>

            {Object.keys(filteredFaqs).length > 0 ? (
              <Tabs defaultValue={Object.keys(filteredFaqs)[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 rounded-xl">
                  {Object.entries(filteredFaqs).map(([key, category]) => (
                    <TabsTrigger 
                      key={key} 
                      value={key} 
                      className="flex items-center space-x-2 text-xs lg:text-sm font-sans tracking-wider rounded-xl"
                      data-testid={`tab-${key}`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(filteredFaqs).map(([key, category]) => (
                  <TabsContent key={key} value={key}>
                    <div className="mb-6 text-center">
                      <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white flex items-center justify-center">
                        <category.icon className="h-6 w-6 mr-3 text-blue-600" />
                        {category.title}
                      </h3>
                      <p className="text-base text-gray-600 dark:text-gray-300 mt-2">
                        Everything you need to know about {category.title.toLowerCase()}
                      </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`${key}-${idx}`} className="border-0">
                          <Card className="rounded-xl overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <span className="text-left font-semibold text-base text-gray-900 dark:text-white">
                                {faq.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {faq.answer}
                              </p>
                            </AccordionContent>
                          </Card>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <Card className="p-12 text-center rounded-xl">
                <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No FAQs found matching your search
                </p>
              </Card>
            )}
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900 dark:text-white">
              Still Have Questions?
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team is here to help you plan the perfect Lake Travis experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="rounded-xl px-8 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Get Instant Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={currentVideo.url}
        title={currentVideo.title}
      />

      <Footer />
    </>
  );
}
