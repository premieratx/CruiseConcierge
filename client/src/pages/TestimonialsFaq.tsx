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
  Star, Play, Search, Phone, Mail, Calendar, 
  Users, Ship, PartyPopper, Building2, Heart, Trophy,
  Shield, Clock, MapPin, Camera, MessageSquare,
  ExternalLink, CheckCircle, ArrowRight, Sparkles,
  DollarSign, Calculator, Gem, Flower2, Beer
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import {
  corporateReviews,
  weddingReviews,
  birthdayReviews,
  combinedBachReviews,
  bacheloretteReviews,
  bachelorReviews,
  Review
} from '@shared/reviews-data';

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
        answer: 'All boats have USCG-certified captains, required safety equipment, life jackets for every passenger, and comprehensive insurance. We maintain a perfect safety record over 15 years.'
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


// Review Card Component with Truncation
interface ReviewCardProps {
  review: Review;
  badgeColor: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function ReviewCard({ review, badgeColor, isExpanded, onToggle }: ReviewCardProps) {
  const MAX_LENGTH = 200;
  const needsTruncation = review.text.length > MAX_LENGTH;
  const displayText = needsTruncation && !isExpanded 
    ? review.text.substring(0, MAX_LENGTH) + '...' 
    : review.text;

  return (
    <Card className="rounded-xl hover:shadow-lg transition-shadow flex flex-col h-full min-h-[400px]" data-testid={`review-card-${review.id}`}>
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
              {review.name}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {review.role}
            </p>
          </div>
          {review.verified && (
            <Badge variant="secondary" className={badgeColor}>
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
          {displayText}
        </p>
        {needsTruncation && (
          <button
            onClick={onToggle}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold text-sm mt-3 text-left transition-colors"
            data-testid={`button-toggle-${review.id}`}
          >
            {isExpanded ? 'Show Less' : 'See More'}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

export default function TestimonialsFaq() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideo, setCurrentVideo] = useState({ url: '', title: '' });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const toggleReview = (reviewId: string) => {
    setExpandedReviews(prev => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  const handleVideoPlay = (videoUrl: string, title: string) => {
    setCurrentVideo({ url: videoUrl, title });
    setIsVideoModalOpen(true);
  };

  const handleBookNow = () => navigate('/chat');
  const handleGetQuote = () => navigate('/contact');

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
      "reviewCount": "150000"
    }
  };

  const combinedSchema = useMemo(() => [faqSchema, productReviewSchema], [faqSchema, productReviewSchema]);

  return (
    <>
      <SEOHead
        pageRoute="/testimonials"
        defaultTitle="Customer Reviews & Testimonials | Premier Party Cruises | Lake Travis"
        defaultDescription="Read authentic reviews from 150,000+ happy customers. 5-star rated Lake Travis party boat cruises. Bachelor parties, bachelorette parties, corporate events."
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

      {/* Hero Section with Verified Reviews */}
      <section className="relative py-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-blue-600 text-white font-sans tracking-wider">
              <Sparkles className="w-3 h-3 mr-1" />
              Real Reviews
            </Badge>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
              Customer Reviews & Testimonials
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Check out our verified reviews on Google and Facebook!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                data-testid="button-google-reviews"
                className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 font-bold text-lg px-10 py-7"
              >
                <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  View Google Reviews
                </a>
              </Button>
              
              <Button
                size="lg"
                data-testid="button-facebook-reviews"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-7"
              >
                <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  View Facebook Reviews
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

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
                { number: '150,000+', label: 'Happy Customers' },
                { number: '15+ Years', label: 'Experience' },
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

      {/* Customer Reviews Section */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold mb-6 text-gray-900 dark:text-white">
                Real Customer Reviews
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Read authentic reviews from our happy customers across all event types
              </p>
            </div>

            <Tabs defaultValue="corporate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8 rounded-xl gap-2">
                <TabsTrigger 
                  value="corporate" 
                  className="flex flex-col items-center gap-1 py-3 rounded-xl data-testid-tab-corporate"
                  data-testid="tab-corporate"
                >
                  <Building2 className="h-5 w-5" />
                  <span className="text-xs font-semibold">Corporate Events</span>
                  <span className="text-xs text-gray-500">{corporateReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="wedding"
                  className="flex flex-col items-center gap-1 py-3 rounded-xl"
                  data-testid="tab-wedding"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-xs font-semibold">Weddings</span>
                  <span className="text-xs text-gray-500">{weddingReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="birthday"
                  className="flex flex-col items-center gap-1 py-3 rounded-xl"
                  data-testid="tab-birthday"
                >
                  <PartyPopper className="h-5 w-5" />
                  <span className="text-xs font-semibold">Birthdays</span>
                  <span className="text-xs text-gray-500">{birthdayReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="combined"
                  className="flex flex-col items-center gap-1 py-3 rounded-xl"
                  data-testid="tab-combined"
                >
                  <Users className="h-5 w-5" />
                  <span className="text-xs font-semibold">Combined Bach</span>
                  <span className="text-xs text-gray-500">{combinedBachReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="bachelorette"
                  className="flex flex-col items-center gap-1 py-3 rounded-xl"
                  data-testid="tab-bachelorette"
                >
                  <Gem className="h-5 w-5" />
                  <span className="text-xs font-semibold">Bachelorette</span>
                  <span className="text-xs text-gray-500">{bacheloretteReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="bachelor"
                  className="flex flex-col items-center gap-1 py-3 rounded-xl"
                  data-testid="tab-bachelor"
                >
                  <Beer className="h-5 w-5" />
                  <span className="text-xs font-semibold">Bachelor</span>
                  <span className="text-xs text-gray-500">{bachelorReviews.length} reviews</span>
                </TabsTrigger>
              </TabsList>

              {/* Corporate Reviews */}
              <TabsContent value="corporate" className="mt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
                    <Building2 className="h-6 w-6 mr-3 text-blue-600" />
                    🏢 Corporate, Company & Business Events
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {corporateReviews.length} verified reviews from corporate clients
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {corporateReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      isExpanded={expandedReviews.has(review.id.toString())}
                      onToggle={() => toggleReview(review.id.toString())}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Wedding Reviews */}
              <TabsContent value="wedding" className="mt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 mr-3 text-pink-600" />
                    💍 Weddings, Post-Wedding & Rehearsal Parties
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {weddingReviews.length} verified reviews from wedding celebrations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {weddingReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      badgeColor="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                      isExpanded={expandedReviews.has(review.id.toString())}
                      onToggle={() => toggleReview(review.id.toString())}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Birthday Reviews */}
              <TabsContent value="birthday" className="mt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
                    <PartyPopper className="h-6 w-6 mr-3 text-purple-600" />
                    🎉 Family, Birthday & Anniversary Parties
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {birthdayReviews.length} verified reviews from family celebrations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {birthdayReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      badgeColor="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      isExpanded={expandedReviews.has(review.id.toString())}
                      onToggle={() => toggleReview(review.id.toString())}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Combined Bach Reviews */}
              <TabsContent value="combined" className="mt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 mr-3 text-orange-600" />
                    💃🕺 Combined Bachelor & Bachelorette Parties
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {combinedBachReviews.length} verified reviews from combined celebrations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {combinedBachReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      badgeColor="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                      isExpanded={expandedReviews.has(review.id.toString())}
                      onToggle={() => toggleReview(review.id.toString())}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Bachelorette Reviews */}
              <TabsContent value="bachelorette" className="mt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
                    <Gem className="h-6 w-6 mr-3 text-pink-600" />
                    💃 Bachelorette Party Highlights
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {bacheloretteReviews.length} verified reviews from bachelorette celebrations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bacheloretteReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      badgeColor="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                      isExpanded={expandedReviews.has(review.id.toString())}
                      onToggle={() => toggleReview(review.id.toString())}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Bachelor Reviews */}
              <TabsContent value="bachelor" className="mt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
                    <Beer className="h-6 w-6 mr-3 text-amber-600" />
                    🕺 Bachelor Party Highlights
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {bachelorReviews.length} verified reviews from bachelor celebrations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bachelorReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      isExpanded={expandedReviews.has(review.id.toString())}
                      onToggle={() => toggleReview(review.id.toString())}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
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
