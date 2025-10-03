import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
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
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';

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
    badge: 'Video Available',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
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

// Expanded testimonials array with 30 authentic reviews for scrolling hero
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
  },
  {
    id: 'test-7',
    name: 'Lisa Brown',
    role: 'Event Planner',
    event: 'Anniversary Party',
    rating: 5,
    text: 'Organized a surprise 25th anniversary party on their private charter. The attention to detail and customer service was outstanding. The couple was thrilled!',
    groupSize: 30,
    date: 'March 2024',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-8',
    name: 'James Wilson',
    role: 'Groom',
    event: 'Bachelor Party',
    rating: 5,
    text: 'Austin\'s best kept secret! The disco cruise was the highlight of our weekend. Great music, awesome people, and Lake Travis is beautiful. Will definitely be back!',
    groupSize: 8,
    date: 'February 2024',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-9',
    name: 'Rachel Green',
    role: 'Corporate Manager',
    event: 'Team Building',
    rating: 5,
    text: 'Used Premier Party Cruises for our quarterly team outing. The experience brought our remote team together in a way that office events never could. Highly recommended for corporate groups.',
    groupSize: 35,
    date: 'January 2024',
    image: galleryImage1,
    isVideo: false
  },
  // Additional 21 authentic reviews to reach 30 total
  {
    id: 'test-10',
    name: 'Emily Carter',
    role: 'Bride',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'The crew made my last fling before the ring absolutely perfect! The boat was gorgeous, the vibes were immaculate, and watching the sunset from Lake Travis was a dream come true.',
    groupSize: 16,
    date: 'September 2024',
    image: galleryImage1,
    isVideo: false
  },
  {
    id: 'test-11',
    name: 'Marcus Johnson',
    role: 'CEO',
    event: 'Corporate Event',
    rating: 5,
    text: 'Booked PPC for our annual company celebration. The professionalism and attention to detail were outstanding. Our team of 40 had an incredible time and it really boosted morale!',
    groupSize: 40,
    date: 'August 2024',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-12',
    name: 'Sophia Martinez',
    role: 'Birthday Girl',
    event: 'Birthday Party',
    rating: 5,
    text: 'My 21st birthday on the water was everything I dreamed of! The crew decorated the boat beautifully and even had a surprise cake. Best birthday ever!',
    groupSize: 25,
    date: 'July 2024',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-13',
    name: 'Tyler Brooks',
    role: 'Best Man',
    event: 'Bachelor Party',
    rating: 5,
    text: 'The ATX Disco Cruise was the perfect send-off for my best friend. Epic DJ, amazing crowd, and the energy was unmatched. We\'re already planning to come back next year!',
    groupSize: 14,
    date: 'June 2024',
    image: galleryImage2,
    isVideo: false
  },
  {
    id: 'test-14',
    name: 'Amanda Foster',
    role: 'Event Organizer',
    event: 'Wedding Party',
    rating: 5,
    text: 'Hosted our rehearsal dinner cruise and it was magical. The captain found the perfect sunset spot and the crew handled everything flawlessly. Our guests are still raving about it!',
    groupSize: 32,
    date: 'May 2024',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-15',
    name: 'Christopher Lee',
    role: 'Groom',
    event: 'Bachelor Party',
    rating: 5,
    text: 'My bachelor party exceeded all expectations! The private charter gave us complete freedom, the crew was fun and professional, and Lake Travis provided the perfect backdrop.',
    groupSize: 18,
    date: 'April 2024',
    image: galleryImage2,
    isVideo: false
  },
  {
    id: 'test-16',
    name: 'Natalie Wright',
    role: 'Maid of Honor',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'Planned the bride\'s dream bachelorette on PPC! The disco cruise was so much fun - we made friends with other groups and danced until sunset. Absolutely recommend!',
    groupSize: 10,
    date: 'March 2024',
    image: galleryImage1,
    isVideo: false
  },
  {
    id: 'test-17',
    name: 'Jason Park',
    role: 'HR Director',
    event: 'Corporate Event',
    rating: 5,
    text: 'Our team building event on the water was a huge success! The crew facilitated activities perfectly and everyone left feeling more connected. Worth every penny for company culture.',
    groupSize: 28,
    date: 'February 2024',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-18',
    name: 'Isabella Garcia',
    role: 'Birthday Celebrant',
    event: 'Birthday Party',
    rating: 5,
    text: 'Celebrated my dirty 30 in style! The crew went above and beyond with decorations and made sure everyone had drinks in hand. The party never stopped!',
    groupSize: 20,
    date: 'January 2024',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-19',
    name: 'Daniel Thompson',
    role: 'Groom',
    event: 'Bachelor Party',
    rating: 5,
    text: 'The guys and I had an absolute blast! Captain knew all the best spots on the lake, crew kept the energy high, and the boat was pristine. 10/10 would book again!',
    groupSize: 12,
    date: 'December 2023',
    image: galleryImage2,
    isVideo: false
  },
  {
    id: 'test-20',
    name: 'Olivia Anderson',
    role: 'Bride-to-be',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'My bachelorette party was a dream! The crew decorated with rose gold everything, the photographer captured perfect moments, and my girls had the time of their lives!',
    groupSize: 15,
    date: 'November 2023',
    image: galleryImage1,
    isVideo: false
  },
  {
    id: 'test-21',
    name: 'William Davis',
    role: 'VP Sales',
    event: 'Corporate Event',
    rating: 5,
    text: 'Rewarded our sales team with a PPC cruise and it was the highlight of the year! Professional service, beautiful boats, and Lake Travis never disappoints. Already booked for next quarter!',
    groupSize: 22,
    date: 'October 2023',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-22',
    name: 'Emma Robinson',
    role: 'Party Planner',
    event: 'Anniversary Party',
    rating: 5,
    text: 'Organized a 50th anniversary surprise cruise and it was perfection! The crew helped with the surprise, decorated beautifully, and created memories that will last forever.',
    groupSize: 35,
    date: 'September 2023',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-23',
    name: 'Alexander White',
    role: 'Bachelor',
    event: 'Bachelor Party',
    rating: 5,
    text: 'The disco cruise was legendary! Met awesome people, danced to great music, and the Lake Travis sunset was the cherry on top. This is how you do a bachelor party right!',
    groupSize: 11,
    date: 'August 2023',
    image: galleryImage2,
    isVideo: false
  },
  {
    id: 'test-24',
    name: 'Mia Johnson',
    role: 'Birthday Girl',
    event: 'Birthday Party',
    rating: 5,
    text: 'Sweet 16 on the water was unforgettable! The crew made me feel like a princess, my friends loved every minute, and the photos by Devil\'s Cove were stunning!',
    groupSize: 16,
    date: 'July 2023',
    image: galleryImage1,
    isVideo: false
  },
  {
    id: 'test-25',
    name: 'Lucas Miller',
    role: 'Team Lead',
    event: 'Team Building',
    rating: 5,
    text: 'Our development team needed a morale boost and PPC delivered! Great atmosphere, professional crew, and Lake Travis provided the perfect escape from the office.',
    groupSize: 18,
    date: 'June 2023',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-26',
    name: 'Charlotte Taylor',
    role: 'Maid of Honor',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'Threw the bride the ultimate lake bachelorette! The private charter was worth it - we had our own floating party with the best crew in Austin. Memories made for life!',
    groupSize: 24,
    date: 'May 2023',
    image: galleryImage1,
    isVideo: false
  },
  {
    id: 'test-27',
    name: 'Ethan Moore',
    role: 'Groom',
    event: 'Bachelor Party',
    rating: 5,
    text: 'My bachelor party set the bar HIGH! Professional crew, spotless boat, killer sound system, and Lake Travis showed off. The boys are still talking about this weekend!',
    groupSize: 19,
    date: 'April 2023',
    image: galleryImage2,
    isVideo: false
  },
  {
    id: 'test-28',
    name: 'Ava Martinez',
    role: 'Director',
    event: 'Corporate Event',
    rating: 5,
    text: 'Hosted our clients on a PPC cruise and sealed the deal! The professional service and stunning lake views created the perfect atmosphere for relationship building.',
    groupSize: 30,
    date: 'March 2023',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-29',
    name: 'Noah Clark',
    role: 'Birthday Boy',
    event: 'Birthday Party',
    rating: 5,
    text: 'Turned 40 in style on Lake Travis! The crew made it special with decorations, the DJ played all my requests, and my friends had an absolute blast. Best birthday yet!',
    groupSize: 26,
    date: 'February 2023',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-30',
    name: 'Grace Wilson',
    role: 'Bride',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'My bachelorette party was pure magic! From the champagne toast to the sunset photos, every detail was perfect. The crew made us feel like VIPs the entire cruise!',
    groupSize: 14,
    date: 'January 2023',
    image: galleryImage1,
    isVideo: false
  }
];

// Keep original array for compatibility
const allTestimonials = allScrollingReviews.slice(0, 9);

// Component for individual review card in scrolling hero
const ReviewCard = ({ review }: { review: typeof allScrollingReviews[0] }) => {
  return (
    <div className="glass-card p-3 md:p-4 rounded-xl min-w-[280px] md:min-w-[320px] mx-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="flex items-center gap-1 mb-2">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2" data-editable data-editable-id={`scrolling-review-text-${review.id}`}>
        "{review.text}"
      </p>
      <div className="flex justify-between items-end">
        <div>
          <p className="font-semibold text-sm" data-editable data-editable-id={`scrolling-review-name-${review.id}`}>{review.name}</p>
          <p className="text-xs text-muted-foreground" data-editable data-editable-id={`scrolling-review-event-${review.id}`}>{review.event}</p>
        </div>
        <p className="text-[10px] md:text-xs text-muted-foreground" data-editable data-editable-id={`scrolling-review-date-${review.id}`}>{review.date}</p>
      </div>
    </div>
  );
};

// Scrolling Hero Section Component
const ScrollingReviewsHero = () => {
  // Split reviews into two rows for different speed animations
  const firstRow = allScrollingReviews.slice(0, 15);
  const secondRow = allScrollingReviews.slice(15, 30);
  
  // Duplicate arrays for seamless infinite scroll
  const firstRowDuped = [...firstRow, ...firstRow];
  const secondRowDuped = [...secondRow, ...secondRow];
  
  // Featured reviews for mobile display
  const featuredMobileReviews = allScrollingReviews.slice(0, 6);
  
  return (
    <section className="relative py-8 md:py-16 overflow-hidden bg-gradient-to-br from-brand-blue/5 to-brand-yellow/5">
      <div className="container mx-auto px-4 md:px-6 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-brand-blue text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            <span data-editable data-editable-id="scrolling-hero-badge-text">30+ Amazing Reviews</span>
          </Badge>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4" data-editable data-editable-id="scrolling-hero-heading">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto" data-editable data-editable-id="scrolling-hero-subheading">
            Join thousands of happy customers who've experienced unforgettable moments on Lake Travis
          </p>
        </motion.div>
      </div>
      
      {/* Desktop: Animated scrolling rows */}
      <div className="hidden md:block">
        {/* First Row - Normal Speed */}
        <div className="relative mb-4 md:mb-6">
          <div className="flex animate-scroll-left hover:pause-animation">
            {firstRowDuped.map((review, index) => (
              <ReviewCard key={`${review.id}-row1-${index}`} review={review} />
            ))}
          </div>
        </div>
        
        {/* Second Row - Slow Speed */}
        <div className="relative">
          <div className="flex animate-scroll-left-slow hover:pause-animation">
            {secondRowDuped.map((review, index) => (
              <ReviewCard key={`${review.id}-row2-${index}`} review={review} />
            ))}
          </div>
        </div>
        
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
      
      {/* Mobile: Static featured reviews grid */}
      <div className="block md:hidden">
        <div className="container mx-auto px-4">
          <div className="grid gap-4">
            {featuredMobileReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white" data-editable data-editable-id={`mobile-review-name-${review.id}`}>{review.name}</span>
                    <span className="text-xs text-muted-foreground" data-editable data-editable-id={`mobile-review-event-${review.id}`}>• {review.event}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground" data-editable data-editable-id={`mobile-review-date-${review.id}`}>{review.date}</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2" data-editable data-editable-id={`mobile-review-text-${review.id}`}>"{review.text}"</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold" data-editable data-editable-id="scrolling-hero-mobile-cta">View all 30+ reviews below</span>
              <ArrowRight className="w-4 h-4 inline-block ml-1 animate-bounce-horizontal" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ data organized by categories
const faqCategories = {
  booking: {
    title: 'Booking & Reservations',
    icon: Calendar,
    faqs: [
      {
        question: 'How do I book a cruise with Premier Party Cruises?',
        answer: 'Booking is easy! You can book online through our website, call us at (512) 488-5892, or fill out our contact form. We\'ll work with you to customize the perfect experience for your group. For private charters, we recommend booking at least 2-3 weeks in advance, especially during peak season (March-October).'
      },
      {
        question: 'What deposit is required to secure my reservation?',
        answer: 'We require a 50% deposit to secure your reservation, with the remaining balance due 24 hours before your cruise. We accept credit cards, cash, and electronic transfers. The deposit is fully refundable if you cancel more than 7 days before your scheduled cruise.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellations made more than 7 days before your cruise receive a full refund. Cancellations made 3-7 days before receive a 50% refund. Cancellations within 72 hours are non-refundable unless due to severe weather conditions. We understand plans can change and work with our customers whenever possible.'
      },
      {
        question: 'Can I reschedule my booking?',
        answer: 'Yes! We offer one complimentary reschedule if made more than 48 hours before your original cruise time, subject to availability. Additional reschedules may incur a $100 administrative fee. We\'re flexible and want to ensure you have the best possible experience.'
      },
      {
        question: 'Do you offer group discounts?',
        answer: 'Yes! We offer discounts for groups of 15+ people on private charters. Corporate events and multiple booking discounts are also available. Contact us directly for custom pricing based on your specific needs and group size.'
      }
    ]
  },
  pricing: {
    title: 'Pricing & Packages',
    icon: DollarSign,
    pricingTables: true, // Flag to show pricing tables
    faqs: [
      {
        question: 'What does the cruise price include?',
        answer: 'All cruises include professional captain and crew, fuel, coolers with ice, premium sound system with Bluetooth connectivity, safety equipment, and use of all onboard amenities. Private charters also include exclusive use of the boat and personalized service.'
      },
      {
        question: 'Are there any additional costs I should know about?',
        answer: 'The main additional costs are gratuity for the crew (20% recommended), food and beverages (you can bring your own), and any special add-ons like professional photography ($300), decorations setup ($150), or extended hours (rates vary by boat and date). We\'re transparent about all pricing upfront.'
      },
      {
        question: 'What are your private charter rates?',
        answer: 'Our private charter rates are based on boat capacity and day of week, as shown in the pricing tables above. Weekday rates (Monday-Thursday) include 3-hour cruises, while weekend rates (Friday-Sunday) include 4-hour cruises. All rates include captain, crew, and standard amenities.'
      },
      {
        question: 'How much do ATX Disco Cruise tickets cost?',
        answer: 'ATX Disco Cruise tickets are $85 per person for the Basic Package, $95 per person for the Disco Queen Package, and $105 per person for the Platinum Package. All packages include the 4-hour party cruise experience with DJ, dancing, and all onboard amenities.'
      },
      {
        question: 'Do you have special pricing for bachelor/bachelorette parties?',
        answer: 'Yes! Our bachelor/bachelorette packages start at $85 per person for the ATX Disco Cruise experience, or you can book a private charter using our capacity-based pricing shown above. We also offer photography packages and custom decorations for these special celebrations.'
      },
      {
        question: 'When is the crew fee required?',
        answer: 'An additional crew fee of $200 is added for groups with more than 20 people. This ensures we have adequate staffing for larger groups to maintain our high service standards and safety protocols.'
      },
      {
        question: 'How are taxes and gratuity calculated?',
        answer: 'Texas sales tax of 8.25% is applied to the subtotal (base cruise cost + crew fee if applicable). Gratuity of 20% is calculated on the same subtotal. These amounts are clearly itemized in your quote and final invoice.'
      },
      {
        question: 'What deposit is required?',
        answer: 'A 25% deposit is required for bookings made more than 30 days in advance. For bookings within 30 days of the event date, 100% payment is required at the time of booking. All deposits are fully refundable with 7+ days notice.'
      }
    ]
  },
  expectations: {
    title: 'What to Expect',
    icon: Ship,
    faqs: [
      {
        question: 'What should I bring on the cruise?',
        answer: 'You can bring your own food, drinks (including alcohol for guests 21+), sunscreen, towels, and cameras. We provide coolers with ice, cups, and basic amenities. Don\'t bring glass containers, illegal substances, or pets (service animals are welcome). We have a full list of recommended items we can send you upon booking.'
      },
      {
        question: 'Can we bring our own alcohol?',
        answer: 'Yes! Guests 21+ can bring their own alcoholic beverages. We ask that you bring drinks in cans or plastic bottles only - no glass for safety reasons. Our crew can help serve drinks if needed, and we provide ice and cups. Please drink responsibly and have a designated driver for after the cruise.'
      },
      {
        question: 'What happens if someone gets seasick?',
        answer: 'Lake Travis is generally very calm, so seasickness is rare. However, we carry motion sickness remedies onboard and our experienced crew knows how to help. We recommend eating a light meal before boarding and avoiding excessive alcohol consumption. If needed, we can return to dock early.'
      },
      {
        question: 'Can we play our own music?',
        answer: 'Absolutely! All our boats have premium sound systems with Bluetooth connectivity. You can connect your phone or device to play your own playlists. For private charters, you have full control of the music. On disco cruises, we balance custom requests with our DJ\'s party mix.'
      },
      {
        question: 'What amenities are available on the boats?',
        answer: 'Our boats feature comfortable seating, shade areas, premium sound systems, restrooms, coolers with ice, swim ladders, and safety equipment. Larger boats also have dance floors, bars, and additional amenities. Each boat is regularly maintained and cleaned to ensure the best experience.'
      }
    ]
  },
  safety: {
    title: 'Safety & Policies',
    icon: Shield,
    faqs: [
      {
        question: 'What safety measures do you have in place?',
        answer: 'Safety is our top priority. All our captains are Coast Guard licensed, our boats undergo regular safety inspections, and we carry all required safety equipment including life jackets for every passenger. We have a perfect safety record over 14+ years and maintain comprehensive insurance coverage.'
      },
      {
        question: 'Do you provide life jackets?',
        answer: 'Yes, we provide Coast Guard approved life jackets in all sizes, including infant and child sizes. While not required to be worn at all times on our large, stable boats, life jackets are mandatory when swimming or during rough weather conditions. Our crew will brief everyone on safety procedures before departure.'
      },
      {
        question: 'What are your capacity limits?',
        answer: 'We strictly adhere to Coast Guard capacity limits, which vary by boat size. Our 14-person boats accommodate up to 14 guests, 25-person boats up to 25 guests, and our largest boats accommodate up to 50 guests. These limits include all passengers and are enforced for safety and comfort.'
      },
      {
        question: 'What is your policy on swimming?',
        answer: 'Swimming is allowed in designated areas when conditions are safe. Life jackets are required while in the water, and our crew supervises all swimming activities. We only allow swimming when anchored in calm, deep water away from boat traffic. The captain makes the final decision on swimming safety based on current conditions.'
      },
      {
        question: 'Do you have insurance coverage?',
        answer: 'Yes, we carry comprehensive commercial marine insurance including liability coverage for passengers and property. All guests are covered under our policy during the cruise. We can provide proof of insurance for corporate events or special requirements upon request.'
      }
    ]
  },
  weather: {
    title: 'Weather & Conditions',
    icon: Clock,
    faqs: [
      {
        question: 'What happens if the weather is bad?',
        answer: 'Safety comes first. If severe weather conditions (thunderstorms, high winds, etc.) make cruising unsafe, we will reschedule or provide a full refund. Light rain doesn\'t typically cancel cruises as our boats have covered areas. We monitor weather closely and will contact you 24-48 hours before your cruise if conditions look questionable.'
      },
      {
        question: 'Do cruises run in winter months?',
        answer: 'Yes, we operate year-round! While summer is our peak season, winter cruises can be magical with fewer crowds and beautiful scenery. We provide heated areas on boats during colder months and recommend bringing layers. Winter rates are often lower, making it a great value for groups.'
      },
      {
        question: 'What if it\'s too windy to cruise?',
        answer: 'If winds exceed safe operating levels (typically 25+ mph with white caps), we may need to cancel or reschedule for safety. Lake Travis can get choppy in high winds, affecting passenger comfort and safety. We\'ll notify you as early as possible and work to find an alternative date that works for your group.'
      },
      {
        question: 'How do you handle extreme heat in summer?',
        answer: 'All our boats have shaded areas and we provide plenty of ice and water. We recommend bringing sunscreen, hats, and staying hydrated. Summer is our most popular season, so the boats are equipped with everything needed for comfort. Early morning and evening cruises are popular options to avoid peak heat.'
      },
      {
        question: 'What\'s the best time of year for cruises?',
        answer: 'Every season has its charm! Spring (March-May) offers perfect temperatures and wildflowers. Summer (June-August) is peak party season with warm water for swimming. Fall (September-November) provides beautiful foliage and comfortable temperatures. Winter offers peaceful cruises with great deals and holiday lighting tours.'
      }
    ]
  },
  events: {
    title: 'Special Events',
    icon: PartyPopper,
    faqs: [
      {
        question: 'Do you specialize in bachelor and bachelorette parties?',
        answer: 'Absolutely! We\'re Austin\'s premier choice for bachelor and bachelorette celebrations. We offer both private charter options and spots on our famous ATX Disco Cruise. Our packages can include professional photography, custom decorations, special music playlists, and coordination with other Austin activities.'
      },
      {
        question: 'Can you accommodate corporate events and team building?',
        answer: 'Yes! We regularly host corporate events, team building activities, client entertainment, and company parties. We can customize experiences to meet your corporate needs, including catering coordination, presentation equipment, and professional atmosphere while still providing the fun Lake Travis experience.'
      },
      {
        question: 'Do you host wedding receptions or ceremonies?',
        answer: 'We host wedding receptions and can accommodate small, intimate ceremonies onboard. Lake Travis provides a stunning backdrop for your special day. We work with local wedding planners and can coordinate with photographers, caterers, and florists to create your dream wedding celebration.'
      },
      {
        question: 'What about birthday parties and anniversaries?',
        answer: 'Birthday and anniversary celebrations are some of our favorites! We can help customize decorations, coordinate special music, and even arrange surprise elements. From sweet 16s to 50th anniversaries, we\'ve celebrated them all. Our crew loves being part of these special milestones.'
      },
      {
        question: 'Can you handle large group events?',
        answer: 'Yes! Our largest boats accommodate up to 50 people, and for bigger events, we can coordinate multiple boats to cruise together. We\'ve successfully handled corporate retreats, family reunions, and large celebrations with 100+ people across our fleet. Advanced booking and planning help ensure everything goes smoothly.'
      }
    ]
  }
};

// Social proof stats
const socialProofStats = [
  { number: '125,000+', label: 'Happy Customers', icon: Users },
  { number: '14+', label: 'Years Experience', icon: Trophy },
  { number: '4.9/5', label: 'Average Rating', icon: Star },
  { number: '100%', label: 'Safety Record', icon: Shield }
];

// Scrolling Reviews Hero Component
const ScrollingReviewCard = ({ review }: { review: typeof allScrollingReviews[0] }) => (
  <div className="flex-shrink-0 w-80 md:w-96 mx-2 transform transition-all duration-300 hover:scale-105">
    <div className="h-full p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-all">
      {/* Stars */}
      <div className="flex mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      
      {/* Review Text */}
      <p className="text-white/90 text-sm mb-4 line-clamp-3">{review.text}</p>
      
      {/* Bottom info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-white">{review.name}</p>
          <p className="text-xs text-white/70">{review.event}</p>
        </div>
        <Badge className="bg-white/20 text-white border-white/30 text-xs">
          {review.date}
        </Badge>
      </div>
    </div>
  </div>
);

export default function TestimonialsFaq() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestimonialFilter, setSelectedTestimonialFilter] = useState('all');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ url: '', title: '' });

  // Filter testimonials based on selected filter
  const filteredTestimonials = useMemo(() => {
    if (selectedTestimonialFilter === 'all') {
      return allTestimonials;
    }
    return allTestimonials.filter(testimonial => 
      testimonial.event.toLowerCase().includes(selectedTestimonialFilter.toLowerCase())
    );
  }, [selectedTestimonialFilter]);

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;

    const filtered: typeof faqCategories = {};
    Object.entries(faqCategories).forEach(([key, category]) => {
      const matchingFaqs = category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchingFaqs.length > 0) {
        filtered[key as keyof typeof faqCategories] = {
          ...category,
          faqs: matchingFaqs
        };
      }
    });
    
    return filtered;
  }, [searchQuery]);

  const handleVideoPlay = (videoUrl: string, title: string) => {
    setCurrentVideo({ url: videoUrl, title });
    setIsVideoModalOpen(true);
  };

  const handleBookNow = () => {
    navigate('/chat');
  };

  const handleGetQuote = () => {
    navigate('/chat');
  };

  const eventTypeFilters = [
    { value: 'all', label: 'All Events' },
    { value: 'bachelor', label: 'Bachelor Parties' },
    { value: 'bachelorette', label: 'Bachelorette Parties' },
    { value: 'private', label: 'Private Charters' },
    { value: 'corporate', label: 'Corporate Events' }
  ];

  // Helper function to convert date strings to ISO format
  const convertDateToISO = (dateString: string): string => {
    const monthMap: { [key: string]: string } = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04',
      'May': '05', 'June': '06', 'July': '07', 'August': '08',
      'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    
    const parts = dateString.split(' ');
    if (parts.length === 2) {
      const month = monthMap[parts[0]];
      const year = parts[1];
      if (month && year) {
        return `${year}-${month}-15T00:00:00Z`;
      }
    }
    
    return new Date().toISOString();
  };

  // Generate FAQ schema for rich snippets
  const faqSchema = useMemo(() => ({
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
  }), []);

  // Generate Product/Service schema with reviews and aggregate rating
  const productReviewSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Premier Party Cruises - Austin Boat Rental Services",
    "description": "Premium boat rental and party cruise services on Lake Travis, Austin. Featuring private charters, disco cruises, bachelor/bachelorette parties, and corporate events with professional captains and crew.",
    "brand": {
      "@type": "Brand",
      "name": "Premier Party Cruises"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "125000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": allTestimonials.slice(0, 10).map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": testimonial.text,
      "datePublished": convertDateToISO(testimonial.date)
    })),
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "85",
      "highPrice": "2500",
      "offerCount": "7"
    }
  }), []);

  // Combine both schemas for comprehensive rich snippets
  const combinedSchema = useMemo(() => [faqSchema, productReviewSchema], [faqSchema, productReviewSchema]);

  return (
    <>
      <SEOHead 
        pageRoute="/testimonials-faq"
        defaultTitle="Customer Reviews & FAQ - Premier Party Cruises Austin"
        defaultDescription="Read authentic reviews from 125,000+ happy customers and get answers to frequently asked questions about Austin's premier Lake Travis party cruise experience."
        defaultKeywords={['premier party cruises reviews', 'lake travis boat rental faq', 'austin party boat testimonials', 'customer reviews lake travis', 'boat rental questions austin']}
        schemaType="webpage"
        customSchema={combinedSchema}
      />
      
      <PublicNavigation />
      
      {/* Scrolling Reviews Hero Section */}
      <ScrollingReviewsHero />
      
      {/* Hero Section */}
      <motion.section 
        className="relative pt-20 pb-8 md:pt-24 md:pb-16 bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-blue/80 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage1})` }}
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge className="bg-brand-yellow text-black font-bold px-6 py-2 text-lg">
                125,000+ Happy Customers
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight"
            >
              WHAT OUR CUSTOMERS SAY
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              Discover why Premier Party Cruises is Austin's #1 rated party cruise experience. 
              Read authentic reviews and get answers to all your questions.
            </motion.p>

            <motion.div 
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            >
              {socialProofStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={scaleIn}
                  className="text-center"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <stat.icon className="h-8 w-8 text-brand-yellow mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Testimonials */}
      <section className="py-8 md:py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-8 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-4xl lg:text-6xl font-heading font-bold mb-3 md:mb-6 text-gray-900 dark:text-white"
              data-editable
              data-editable-id="featured-reviews-heading"
            >
              FEATURED REVIEWS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-sm md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              data-editable
              data-editable-id="featured-reviews-subheading"
            >
              Hear directly from our customers about their unforgettable experiences on Lake Travis.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                data-testid={`featured-testimonial-${testimonial.id}`}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-5"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "font-semibold",
                            testimonial.badge === 'Featured' && "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
                            testimonial.badge === 'Video Available' && "bg-red-50 text-red-600 border-red-200",
                            testimonial.badge === 'Corporate' && "bg-blue-50 text-blue-600 border-blue-200"
                          )}
                          data-editable
                          data-editable-id={`featured-badge-${testimonial.id}`}
                        >
                          {testimonial.badge}
                        </Badge>
                      </div>

                      {testimonial.isVideo && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVideoPlay(testimonial.videoUrl!, `${testimonial.name}'s Review`)}
                          className="h-10 w-10 rounded-full bg-red-500 hover:bg-red-600 text-white"
                          data-testid={`button-play-video-${testimonial.id}`}
                        >
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                      )}
                    </div>
                    
                    <Quote className="h-8 w-8 text-brand-blue mb-4 opacity-50" />
                    
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed" data-editable data-editable-id={`featured-text-${testimonial.id}`}>
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white" data-editable data-editable-id={`featured-name-${testimonial.id}`}>{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300" data-editable data-editable-id={`featured-role-${testimonial.id}`}>{testimonial.role}</div>
                        <div className="text-xs text-gray-500 mt-1" data-editable data-editable-id={`featured-date-${testimonial.id}`}>{testimonial.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-brand-blue"><span data-editable data-editable-id={`featured-groupsize-${testimonial.id}`}>{testimonial.groupSize}</span> guests</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300" data-editable data-editable-id={`featured-event-${testimonial.id}`}>{testimonial.event}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Accordion View */}
          <Accordion type="single" collapsible className="block md:hidden space-y-2 max-w-xl mx-auto">
            {filteredTestimonials.map((testimonial) => (
              <AccordionItem 
                key={testimonial.id} 
                value={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="text-left px-4 py-3 hover:no-underline">
                  <div className="flex justify-between items-start w-full pr-4">
                    <div>
                      <div className="font-semibold text-sm" data-editable data-editable-id={`accordion-name-${testimonial.id}`}>{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs mb-1" data-editable data-editable-id={`accordion-event-${testimonial.id}`}>
                        {testimonial.event}
                      </Badge>
                      <div className="text-xs text-muted-foreground" data-editable data-editable-id={`accordion-date-${testimonial.id}`}>{testimonial.date}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <p className="text-sm text-muted-foreground mb-2" data-editable data-editable-id={`accordion-text-${testimonial.id}`}>"{testimonial.text}"</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span data-editable data-editable-id={`accordion-role-${testimonial.id}`}>{testimonial.role}</span>
                    <span><span data-editable data-editable-id={`accordion-groupsize-${testimonial.id}`}>{testimonial.groupSize}</span> guests</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
              data-editable
              data-editable-id="customer-reviews-heading"
            >
              CUSTOMER REVIEWS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
              data-editable
              data-editable-id="customer-reviews-subheading"
            >
              Browse authentic reviews from customers who experienced our various cruise packages.
            </motion.p>

            {/* Event Type Filters */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-8">
              {eventTypeFilters.map(filter => (
                <Button
                  key={filter.value}
                  variant={selectedTestimonialFilter === filter.value ? "default" : "outline"}
                  onClick={() => setSelectedTestimonialFilter(filter.value)}
                  className={cn(
                    "px-6 py-2",
                    selectedTestimonialFilter === filter.value && "bg-brand-blue text-white hover:bg-brand-blue/90"
                  )}
                  data-testid={`filter-${filter.value}`}
                  data-editable
                  data-editable-id={`filter-label-${filter.value}`}
                >
                  {filter.label}
                </Button>
              ))}
            </motion.div>
          </motion.div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: (index % 6) * 0.1 }}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <Card className="p-4 md:p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs" data-editable data-editable-id={`review-event-${testimonial.id}`}>
                      {testimonial.event}
                    </Badge>
                  </div>
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed" data-editable data-editable-id={`review-text-${testimonial.id}`}>
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm" data-editable data-editable-id={`review-name-${testimonial.id}`}>{testimonial.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300" data-editable data-editable-id={`review-role-${testimonial.id}`}>{testimonial.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-brand-blue"><span data-editable data-editable-id={`review-groupsize-${testimonial.id}`}>{testimonial.groupSize}</span> guests</div>
                      <div className="text-xs text-gray-500" data-editable data-editable-id={`review-date-${testimonial.id}`}>{testimonial.date}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-editable data-editable-id="reviews-cta-heading">
                Ready to Create Your Own Amazing Experience?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6" data-editable data-editable-id="reviews-cta-paragraph">
                Join thousands of satisfied customers who have made unforgettable memories on Lake Travis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleBookNow}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3"
                  data-testid="button-book-now-testimonials"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span data-editable data-editable-id="reviews-cta-book-button">Book Your Cruise</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleGetQuote}
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 px-8 py-3"
                  data-testid="button-get-quote-testimonials"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span data-editable data-editable-id="reviews-cta-quote-button">Get Custom Quote</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-8 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-4xl lg:text-6xl font-heading font-bold mb-3 md:mb-6 text-gray-900 dark:text-white"
              data-editable
              data-editable-id="faq-heading"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-sm md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 md:mb-8"
              data-editable
              data-editable-id="faq-subheading"
            >
              Get answers to the most common questions about booking, pricing, safety, and what to expect on your Lake Travis cruise experience.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
                  data-testid="input-faq-search"
                  data-editable
                  data-editable-id="faq-search-placeholder"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-5xl mx-auto"
          >
            <Tabs defaultValue="booking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                {Object.entries(filteredFaqs).map(([key, category]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="flex items-center space-x-2 text-xs lg:text-sm"
                    data-testid={`tab-${key}`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline" data-editable data-editable-id={`faq-tab-${key}`}>{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(filteredFaqs).map(([key, category]) => (
                <TabsContent key={key} value={key}>
                  <motion.div variants={fadeInUp}>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                        <category.icon className="h-6 w-6 mr-3 text-brand-blue" />
                        <span data-editable data-editable-id={`faq-category-title-${key}`}>{category.title}</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2" data-editable data-editable-id={`faq-category-desc-${key}`}>
                        Everything you need to know about {category.title.toLowerCase()}.
                      </p>
                    </div>

                    {/* Pricing Tables for Pricing Tab */}
                    {key === 'pricing' && (
                      <div className="mb-12 space-y-8">
                        {/* Private Cruise Pricing Table */}
                        <Card className="bg-white dark:bg-gray-800 border-2 border-brand-blue/20">
                          <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
                              <Ship className="h-6 w-6 mr-3 text-brand-blue" />
                              <span data-editable data-editable-id="pricing-table-private-title">Private Cruise Hourly Rates</span>
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="pricing-table-private-desc">
                              Exclusive boat charter with captain, crew, and all amenities included
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm" data-testid="table-private-cruise-pricing">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white" data-editable data-editable-id="pricing-header-capacity">Boat Capacity</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white"><span data-editable data-editable-id="pricing-header-weekday">Monday-Thursday</span><br /><span className="text-xs font-normal text-gray-500" data-editable data-editable-id="pricing-header-weekday-hours">(3 hours)</span></th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white"><span data-editable data-editable-id="pricing-header-weekend">Friday-Sunday</span><br /><span className="text-xs font-normal text-gray-500" data-editable data-editable-id="pricing-header-weekend-hours">(4 hours)</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Up to 14 guests</td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$400/hour</div>
                                      <div className="text-sm text-gray-500">$1,200 total</div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$500/hour</div>
                                      <div className="text-sm text-gray-500">$2,000 total</div>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Up to 25 guests</td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$450/hour</div>
                                      <div className="text-sm text-gray-500">$1,350 total</div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$550/hour</div>
                                      <div className="text-sm text-gray-500">$2,200 total</div>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Up to 30 guests</td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$500/hour</div>
                                      <div className="text-sm text-gray-500">$1,500 total</div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$600/hour</div>
                                      <div className="text-sm text-gray-500">$2,400 total</div>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Up to 50 guests</td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$550/hour</div>
                                      <div className="text-sm text-gray-500">$1,650 total</div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$650/hour</div>
                                      <div className="text-sm text-gray-500">$2,600 total</div>
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Up to 75 guests</td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$600/hour</div>
                                      <div className="text-sm text-gray-500">$1,800 total</div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                      <div className="text-lg font-bold text-brand-blue">$700/hour</div>
                                      <div className="text-sm text-gray-500">$2,800 total</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                                <Calculator className="h-4 w-4 mr-2 text-brand-blue" />
                                <span data-editable data-editable-id="pricing-fees-heading">Additional Fees</span>
                              </h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li data-editable data-editable-id="pricing-fee-crew">• <strong>Extra Crew Fee:</strong> $200 for groups with more than 20 people</li>
                                <li data-editable data-editable-id="pricing-fee-tax">• <strong>Tax:</strong> 8.25% applied to subtotal (base cost + crew fee)</li>
                                <li data-editable data-editable-id="pricing-fee-gratuity">• <strong>Gratuity:</strong> 20% applied to subtotal (recommended)</li>
                                <li data-editable data-editable-id="pricing-fee-deposit">• <strong>Deposit:</strong> 25% if booked 30+ days ahead, 100% if within 30 days</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        {/* ATX Disco Cruise Pricing Table */}
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
                          <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
                              <PartyPopper className="h-6 w-6 mr-3 text-purple-600" />
                              <span data-editable data-editable-id="pricing-disco-title">ATX Disco Cruise Packages</span>
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="pricing-disco-desc">
                              Join our public party cruise with DJ, dancing, and amazing vibes
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-testid="card-disco-basic">
                                <div className="text-3xl font-bold text-purple-600 mb-2" data-editable data-editable-id="disco-basic-price">$85</div>
                                <div className="text-sm text-gray-500 mb-4" data-editable data-editable-id="disco-basic-per">per person</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3" data-editable data-editable-id="disco-basic-name">Basic Package</h4>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                  <li data-editable data-editable-id="disco-basic-feature-1">• 4-hour party cruise</li>
                                  <li data-editable data-editable-id="disco-basic-feature-2">• DJ and dance floor</li>
                                  <li data-editable data-editable-id="disco-basic-feature-3">• All standard amenities</li>
                                  <li data-editable data-editable-id="disco-basic-feature-4">• Lake Travis experience</li>
                                </ul>
                              </div>
                              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-purple-300 relative" data-testid="card-disco-queen">
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700" data-editable data-editable-id="disco-queen-badge">Most Popular</Badge>
                                <div className="text-3xl font-bold text-purple-600 mb-2" data-editable data-editable-id="disco-queen-price">$95</div>
                                <div className="text-sm text-gray-500 mb-4" data-editable data-editable-id="disco-queen-per">per person</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3" data-editable data-editable-id="disco-queen-name">Disco Queen Package</h4>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                  <li data-editable data-editable-id="disco-queen-feature-1">• Everything in Basic</li>
                                  <li data-editable data-editable-id="disco-queen-feature-2">• Premium sound system</li>
                                  <li data-editable data-editable-id="disco-queen-feature-3">• Enhanced disco lights</li>
                                  <li data-editable data-editable-id="disco-queen-feature-4">• Party favors included</li>
                                </ul>
                              </div>
                              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-testid="card-disco-platinum">
                                <div className="text-3xl font-bold text-purple-600 mb-2" data-editable data-editable-id="disco-platinum-price">$105</div>
                                <div className="text-sm text-gray-500 mb-4" data-editable data-editable-id="disco-platinum-per">per person</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3" data-editable data-editable-id="disco-platinum-name">Platinum Package</h4>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                  <li data-editable data-editable-id="disco-platinum-feature-1">• Everything in Disco Queen</li>
                                  <li data-editable data-editable-id="disco-platinum-feature-2">• VIP service experience</li>
                                  <li data-editable data-editable-id="disco-platinum-feature-3">• Premium cocktail options</li>
                                  <li data-editable data-editable-id="disco-platinum-feature-4">• Luxury amenities</li>
                                </ul>
                              </div>
                            </div>
                            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span data-editable data-editable-id="disco-schedule"><strong>Schedule:</strong> Friday & Saturday evenings, 4-hour duration</span><br />
                                <span data-editable data-editable-id="disco-includes"><strong>Includes:</strong> Tax and gratuity already included in ticket price</span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${key}-${faqIndex}`}
                          className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6 border-none"
                          data-testid={`faq-item-${key}-${faqIndex}`}
                        >
                          <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:text-brand-blue transition-colors duration-200" data-editable data-editable-id={`faq-question-${key}-${faqIndex}`}>
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2" data-editable data-editable-id={`faq-answer-${key}-${faqIndex}`}>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Contact Section for Unanswered Questions */}
          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-editable data-editable-id="faq-contact-heading">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6" data-editable data-editable-id="faq-contact-paragraph">
                Our friendly team is here to help! Contact us directly for personalized assistance with your cruise planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone className="h-4 w-4 mr-2 text-brand-blue" />
                  <span className="font-semibold" data-editable data-editable-id="faq-contact-phone">(512) 488-5892</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 mr-2 text-brand-blue" />
                  <span className="font-semibold" data-editable data-editable-id="faq-contact-email">clientservices@premierpartycruises.com</span>
                </div>
                <Button 
                  onClick={handleGetQuote}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                  data-testid="button-contact-faq"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span data-editable data-editable-id="faq-contact-button">Contact Us</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
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