import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigationLuxury';
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


// FAQ data - comprehensive FAQs from all pages
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
        question: 'How much is the deposit?',
        answer: 'If booking 14+ days before cruise: 25% deposit required, remaining balance due 14 days before cruise. If booking less than 14 days before cruise: 50% deposit required, remaining balance due within 48 hours of booking (or 3 days after booking). Flexible payment options available.'
      },
      {
        question: 'What is the minimum booking time?',
        answer: '4-hour minimum required for all private cruises. Most groups book 4 hours for a perfect Lake Travis experience.'
      },
      {
        question: 'How far in advance should we book?',
        answer: 'We recommend booking 8-12 weeks for priority time slots - once they book they\'re gone! This is especially important for weekends and peak season (May-September). Prime corporate event dates and wedding season weekends book even further out. Contact us ASAP to secure your preferred date!'
      },
      {
        question: 'Can we add more people after booking?',
        answer: 'Yes, usually 1-2 if availability allows—contact us ASAP.'
      },
      {
        question: 'Do you offer a refund window after booking?',
        answer: "Yes—48 hours after booking for a full refund. After that, weather rules apply at captain's discretion."
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Full refund if canceled within 48 hours of booking. After that, weather-related cancellations receive full refund at captain\'s discretion.'
      }
    ]
  },
  pricing: {
    title: 'Pricing & Packages',
    icon: DollarSign,
    faqs: [
      {
        question: 'How does private cruise pricing work?',
        answer: 'Private cruises have THREE pricing components: (1) Base boat rental for 4-hour cruise - Day Tripper (1-14 guests) $1,050-$1,838, Meeseeks/Irony (15-30 guests) $1,181-$2,231, Clever Girl (31-75 guests) $1,313-$2,660, based on day of week. (2) Package upgrades are FLAT FEES per cruise - Essentials +$100-200, Ultimate +$250-350. (3) Add-ons are FLAT FEES - DJ $600, Photographer $600, Lily Pad $50.'
      },
      {
        question: 'Can you show me a pricing example?',
        answer: 'Example: Saturday 4-hour cruise for 20 guests: Base boat rental (Meeseeks) = $1,500. Add Essentials Package = +$150 flat fee. With Ultimate Package instead = +$300 flat fee. Add Professional DJ = +$600 flat fee. Total with Ultimate + DJ = $1,500 + $300 + $600 = $2,400 plus tax and gratuity.'
      },
      {
        question: 'How much are ATX Disco Cruise tickets?',
        answer: 'Tickets are priced by time slot: Friday 12-4pm ($95/person), Saturday 11am-3pm ($105/person - most popular), and Saturday 3:30-7:30pm ($85/person). All prices include DJ, photographer, floats, and party atmosphere.'
      },
      {
        question: 'Are there additional crew fees?',
        answer: 'Additional crew fees apply for larger groups: $50/hour for 26-30 guests, $100/hour for 51-75 guests. 8.25% tax added. Suggested 20% gratuity for exceptional service.'
      },
      {
        question: 'What does the cruise price include?',
        answer: 'All cruises include the boat, licensed captains, fuel, cooler space, premium sound system, and safety equipment. Essentials/Ultimate packages include ice. ATX Disco Cruise includes DJ, photographer, floats, and party atmosphere.'
      },
      {
        question: 'Do you offer group discounts?',
        answer: 'Yes! Groups of 10+ receive special perks including group discounts, priority boarding, and complimentary items for the guest of honor. Contact us for custom packages for groups of 20+.'
      }
    ]
  },
  discoCruise: {
    title: 'ATX Disco Cruise',
    icon: Sparkles,
    faqs: [
      {
        question: 'What is the ATX Disco Cruise?',
        answer: 'A shared 4-hour party boat for bachelor/bachelorette groups with pro DJ and photographer, BYOB, floats, and multi-group energy. It\'s like Vegas on the water!'
      },
      {
        question: 'When does the Disco Cruise run?',
        answer: 'Fridays 12-4 PM and Saturdays 11am-3pm or 3:30-7:30pm from March to October.'
      },
      {
        question: 'Where do we meet for the cruise?',
        answer: 'Anderson Mill Marina, 13993 FM 2769, Leander, TX 78641. Arrive 15-20 minutes early; free parking available.'
      },
      {
        question: 'Is food included on the Disco Cruise?',
        answer: 'Food is not included. Please eat before your cruise and bring snacks/light refreshments if needed. We provide coolers with ice for your BYOB beverages.'
      },
      {
        question: 'What kind of music is played?',
        answer: 'Some of the best DJs in Austin play an amazing selection - not all disco! Expect a mix of top 40, throwback classics, hip-hop, country, and party anthems. They read the crowd perfectly!'
      },
      {
        question: 'When do we get our photos?',
        answer: 'Professional photos are delivered digitally within 2-3 weeks after your cruise.'
      },
      {
        question: 'Is disco attire required?',
        answer: 'Encouraged but not required! Many groups coordinate outfits - it makes for legendary photos.'
      }
    ]
  },
  bachelorette: {
    title: 'Bachelorette Parties',
    icon: Flower2,
    faqs: [
      {
        question: 'Can we decorate for the bride?',
        answer: 'Absolutely! We encourage bachelorette decorations. We provide disco ball cups, bubble guns, and party supplies. You can bring additional decorations like banners, signs, sashes, and matching outfits. Just avoid confetti or loose glitter that could blow into the lake.'
      },
      {
        question: 'Is it safe for non-swimmers?',
        answer: 'Yes! Safety is our #1 priority. Life jackets are available for everyone, swimming is optional, boats have railings and safe areas, and our experienced captains maintain a safe, female-friendly environment. Many guests enjoy the cruise without ever getting in the water.'
      },
      {
        question: 'What if some girls don\'t drink?',
        answer: 'Perfect for everyone! We provide ice water stations, you can bring non-alcoholic beverages, mocktails are popular. The experience is about celebrating the bride - not just drinking. The DJ, floats, and party atmosphere make it fun for everyone.'
      },
      {
        question: 'Do you provide decorations?',
        answer: 'Basic decorations included with all packages! We provide disco ball cups, bubble guns, and party supplies. Higher packages include personalized items for the bride and premium decorations. You\'re welcome to bring additional custom decorations.'
      },
      {
        question: 'Is there a bathroom on the boat?',
        answer: 'Yes, all boats have clean, private restroom facilities onboard for your comfort. Our boats are equipped with flushing toilets and handwashing stations, maintained throughout the cruise and stocked with necessary supplies.'
      }
    ]
  },
  bachelor: {
    title: 'Bachelor Parties',
    icon: Beer,
    faqs: [
      {
        question: 'Can we bring a cooler of whatever we want?',
        answer: 'Hell yes! BYOB - bring beer, liquor, seltzers - whatever your crew drinks. We provide the coolers and ice. Cans/plastic only for safety.'
      },
      {
        question: 'Is there room for our whole crew?',
        answer: 'We\'ve got boats from 14 to 75 people. Most bachelor parties book the Disco Cruise where you party with other bachelor crews - more energy, more fun.'
      },
      {
        question: 'What\'s the party vibe like?',
        answer: 'Think Vegas energy on Lake Travis. DJ spinning, multiple bachelor crews getting wild, giant floats, epic atmosphere. It\'s your last hurrah done right.'
      },
      {
        question: 'What is the best bachelor party boat in Austin?',
        answer: 'Premier Party Cruises offers Austin\'s #1 rated bachelor party boat experience on Lake Travis. With the ATX Disco Cruise, every cruise includes professional DJ, photographer, giant floats, and 4 hours of legendary celebration.'
      }
    ]
  },
  corporate: {
    title: 'Corporate Events',
    icon: Building2,
    faqs: [
      {
        question: 'Can you host corporate events?',
        answer: 'Absolutely! We accommodate groups up to 75 guests on our largest boat. For larger corporate events, we can coordinate multiple boats. Professional service, custom amenities, and dedicated event planning for corporate team building and client entertainment.'
      },
      {
        question: 'Are corporate cruise expenses tax-deductible?',
        answer: 'Yes! Business entertainment expenses, including boat charters for corporate events, are typically tax-deductible. We provide detailed invoices with all necessary information for your accounting department. Consult your tax advisor for specific guidance.'
      },
      {
        question: 'Can we have a presentation or meeting on board?',
        answer: 'Absolutely! Our boats are equipped with premium sound systems perfect for presentations. We have microphones available and can accommodate both formal presentations and casual discussions. Many companies find the unique setting enhances creativity and engagement.'
      },
      {
        question: 'Do you handle corporate invoicing and payment?',
        answer: 'Yes! We provide professional invoicing with all details needed for expense reports. We accept purchase orders, corporate cards, and can work with your accounting department. NET 30 terms available for established corporate clients.'
      },
      {
        question: 'What\'s the best boat size for our team?',
        answer: 'Day Tripper (14 people): Perfect for executive teams or small departments. Meeseeks/The Irony (15-30 people): Ideal for medium teams or client groups. Clever Girl (50-75 people): Best for large departments or company-wide events.'
      },
      {
        question: 'Can we brand the experience with our company logo?',
        answer: 'Yes! We can accommodate custom banners, branded materials, and corporate decorations. Many companies bring branded merchandise, welcome signs, and company flags. We\'ll help coordinate the setup before your guests arrive.'
      }
    ]
  },
  safety: {
    title: 'Safety & Requirements',
    icon: Shield,
    faqs: [
      {
        question: 'What safety measures are in place?',
        answer: 'All boats have licensed, experienced captains, required safety equipment, life jackets for every passenger, and comprehensive insurance. We maintain a perfect safety record over 16 years.'
      },
      {
        question: 'Are life jackets provided?',
        answer: 'Yes, life jackets are on board and available for swimming - we encourage guests to wear them for safety. Approved life jackets provided for all guests in various sizes including children and adults.'
      },
      {
        question: 'What happens in bad weather?',
        answer: 'Captain makes final call on weather safety. For Private Cruises: Severe weather results in reschedule or full refund. Light rain usually continues as planned. For Disco Cruise: Rain or shine - for severe weather, we move the party to Lemonade Disco (land venue).'
      }
    ]
  },
  experience: {
    title: 'What to Expect',
    icon: PartyPopper,
    faqs: [
      {
        question: 'What should we bring on the cruise?',
        answer: 'Bring sunscreen, sunglasses, towels, swimsuits, and your favorite drinks/snacks in cans or plastic (no glass). We provide cooler space - bring your own ice, OR add Essentials/Ultimate packages for ice included, OR order stocked and ready from Party On Delivery.'
      },
      {
        question: 'Can we bring our own alcohol?',
        answer: 'Yes! All our cruises are BYOB (Bring Your Own Booze). We provide cooler space. You can also order from Party On Delivery - our sister company that delivers alcohol directly to your boat at the marina!'
      },
      {
        question: 'Can we customize our route?',
        answer: 'Yes! The typical cruise includes 30-45 minutes of cruising, then we tie up along the cliffs of a Lake Travis nature preserve with crystal clear water for swimming (typically 1.5-2 hours), then cruise back. However, the time is yours - work with your captain to customize.'
      },
      {
        question: 'Can we swim from the boats?',
        answer: 'Yes! You can swim at designated swimming areas on Lake Travis. We anchor at popular coves where you can jump off the boat and enjoy the water. We provide lily pads for floating.'
      },
      {
        question: 'Can we customize the music and entertainment?',
        answer: 'Absolutely! Connect your phone to our premium Bluetooth sound system and play your custom playlist. We can also arrange professional DJs ($600 per cruise), karaoke equipment ($150), or acoustic performers.'
      },
      {
        question: 'Can we bring food aboard?',
        answer: 'Yes! Bring your own easy items that won\'t make a mess, or we can help arrange full catering from Austin vendors. Our Essentials and Ultimate packages include a 6-foot table for food service.'
      },
      {
        question: 'What about decorations?',
        answer: 'Bring any decorations you want! Corporate clients often add company banners, wedding parties love florals and lights, and bach parties go all out with themed decor. The Ultimate Package includes party atmosphere decorations.'
      },
      {
        question: 'How many people fit on your boats?',
        answer: 'Day Tripper holds up to 14 people (perfect for intimate gatherings), Meeseeks/The Irony accommodates 25-30 people (ideal for parties), and our flagship Clever Girl holds up to 75 people (great for large corporate events or weddings).'
      },
      {
        question: 'Where do Austin party boats depart from?',
        answer: 'All Premier Party Cruises depart from Anderson Mill Marina located at 13993 FM2769, Leander, TX 78641 on Lake Travis. The marina is conveniently located just 30 minutes from downtown Austin. Free parking is available.'
      },
      {
        question: 'How far is Lake Travis from downtown Austin?',
        answer: 'Lake Travis is 30-45 minutes from downtown Austin, located northwest of the city. We depart from Anderson Mill Marina (20 minutes closer than other marinas). Round-trip transportation available from downtown hotels and Airbnbs.'
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
  const handleGetQuote = () => navigate('/chat');

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
      "reviewCount": "150000",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const combinedSchema = useMemo(() => [faqSchema, productReviewSchema], [faqSchema, productReviewSchema]);

  return (
    <div data-page-ready="testimonials-faq">
      <SEOHead
        pageRoute="/testimonials-faq"
        defaultTitle="Reviews & Testimonials | Premier Cruises"
        defaultDescription="Read authentic reviews from hundreds of happy customers. 5-star rated Lake Travis party boat cruises. Bachelor parties, bachelorette parties, corporate events."
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
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-yellow-400 text-black font-sans tracking-wider font-bold">
              <Sparkles className="w-3 h-3 mr-1" />
              Real Reviews
            </Badge>
            <h1 className="text-5xl md:text-6xl heading-unbounded font-bold mb-4 text-white">
              Customer Reviews & Testimonials
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
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
              <h2 className="text-3xl heading-unbounded font-bold text-yellow-400 mb-6">
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
                { number: 'Hundreds', label: '5-Star Reviews' },
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
              <h2 className="text-4xl heading-unbounded font-bold mb-6 text-gray-900 dark:text-white">
                Real Customer Reviews
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Read authentic reviews from our happy customers across all event types
              </p>
            </div>

            <Tabs defaultValue="corporate" className="w-full">
              {/* FIXED: All tabs now fully visible - removed overflow clipping, all tabs same height */}
              <TabsList className="flex flex-wrap justify-center w-full mb-12 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl gap-2 h-auto overflow-visible">
                <TabsTrigger 
                  value="corporate" 
                  className="flex flex-col items-center gap-1 py-3 px-4 min-w-[120px] rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-bold"
                  data-testid="tab-corporate"
                >
                  <Building2 className="h-5 w-5" />
                  <span className="text-xs font-semibold whitespace-nowrap">Corporate Events</span>
                  <span className="text-xs opacity-70">{corporateReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="wedding"
                  className="flex flex-col items-center gap-1 py-3 px-4 min-w-[120px] rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-bold"
                  data-testid="tab-wedding"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-xs font-semibold whitespace-nowrap">Weddings</span>
                  <span className="text-xs opacity-70">{weddingReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="birthday"
                  className="flex flex-col items-center gap-1 py-3 px-4 min-w-[120px] rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-bold"
                  data-testid="tab-birthday"
                >
                  <PartyPopper className="h-5 w-5" />
                  <span className="text-xs font-semibold whitespace-nowrap">Birthdays</span>
                  <span className="text-xs opacity-70">{birthdayReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="combined"
                  className="flex flex-col items-center gap-1 py-3 px-4 min-w-[120px] rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-bold"
                  data-testid="tab-combined"
                >
                  <Users className="h-5 w-5" />
                  <span className="text-xs font-semibold whitespace-nowrap">Combined Bach</span>
                  <span className="text-xs opacity-70">{combinedBachReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="bachelorette"
                  className="flex flex-col items-center gap-1 py-3 px-4 min-w-[120px] rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-bold"
                  data-testid="tab-bachelorette"
                >
                  <Gem className="h-5 w-5" />
                  <span className="text-xs font-semibold whitespace-nowrap">Bachelorette</span>
                  <span className="text-xs opacity-70">{bacheloretteReviews.length} reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="bachelor"
                  className="flex flex-col items-center gap-1 py-3 px-4 min-w-[120px] rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:font-bold"
                  data-testid="tab-bachelor"
                >
                  <Beer className="h-5 w-5" />
                  <span className="text-xs font-semibold whitespace-nowrap">Bachelor</span>
                  <span className="text-xs opacity-70">{bachelorReviews.length} reviews</span>
                </TabsTrigger>
              </TabsList>

              {/* Corporate Reviews */}
              <TabsContent value="corporate" className="mt-12">
                <div className="mb-6">
                  <h3 className="text-2xl heading-unbounded font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
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
              <TabsContent value="wedding" className="mt-12">
                <div className="mb-6">
                  <h3 className="text-2xl heading-unbounded font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
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
              <TabsContent value="birthday" className="mt-12">
                <div className="mb-6">
                  <h3 className="text-2xl heading-unbounded font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
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
              <TabsContent value="combined" className="mt-12">
                <div className="mb-6">
                  <h3 className="text-2xl heading-unbounded font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
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
              <TabsContent value="bachelorette" className="mt-12">
                <div className="mb-6">
                  <h3 className="text-2xl heading-unbounded font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
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
              <TabsContent value="bachelor" className="mt-12">
                <div className="mb-6">
                  <h3 className="text-2xl heading-unbounded font-bold text-gray-900 dark:text-white flex items-center justify-center mb-2">
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
              <h2 className="text-3xl heading-unbounded font-bold mb-6 text-gray-900 dark:text-white">
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
                      <h3 className="text-2xl heading-unbounded font-bold text-gray-900 dark:text-white flex items-center justify-center">
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
            <h2 className="text-3xl heading-unbounded font-bold mb-6 text-gray-900 dark:text-white">
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
    </div>
  );
}
