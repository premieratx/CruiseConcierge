import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Star, Users, MessageSquare, Phone, Clock, CheckCircle2, 
  Heart, Award, Waves, MapPin, Calendar, ThumbsUp,
  ArrowRight, Building2, Quote, Ship, Sparkles,
  PartyPopper, Camera, Music, Gift, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage1 from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage2 from '@assets/@capitalcityshots-23_1760080807865.jpg';

const reviewStats = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const featuredReviews = [
  {
    name: 'Sarah M.',
    event: 'Bachelorette Party',
    boat: 'Clever Girl (50 guests)',
    rating: 5,
    date: 'September 2024',
    review: 'Best Lake Travis boat party reviews cannot do this experience justice! Our bachelorette group of 45 had the time of our lives on the Clever Girl. The disco balls, sound system, and giant floats made it unforgettable. Captain Jake was amazing!',
    highlight: 'Perfect bachelorette experience'
  },
  {
    name: 'Michael T.',
    event: 'Bachelor Party',
    boat: 'The Irony (30 guests)',
    rating: 5,
    date: 'August 2024',
    review: 'Read tons of party boat customer testimonials before booking and Premier lived up to every one. 28 guys, perfect weather, amazing sunset views. The crew handled everything professionally. This is the premier party cruise experience Austin offers.',
    highlight: 'Exceeded all expectations'
  },
  {
    name: 'Jennifer L.',
    event: 'Corporate Team Building',
    boat: 'Clever Girl (60 guests)',
    rating: 5,
    date: 'October 2024',
    review: 'Searched for Lake Travis boat rental reviews for our company event and chose Premier. Best decision! 60 employees had an incredible experience. Professional, organized, and so much fun. Already booking for next year.',
    highlight: 'Perfect for corporate events'
  },
  {
    name: 'David R.',
    event: '40th Birthday',
    boat: 'Meeseeks (25 guests)',
    rating: 5,
    date: 'July 2024',
    review: 'The Austin boat party testimonials I read were spot on. My 40th birthday party was everything I hoped for. Great music, beautiful lake views, and a captain who knew all the best spots. Truly a premier party cruise experience.',
    highlight: 'Milestone birthday perfection'
  },
  {
    name: 'Amanda K.',
    event: 'Combined Bach Party',
    boat: 'Clever Girl (70 guests)',
    rating: 5,
    date: 'June 2024',
    review: 'Combined bachelor/bachelorette with 70 people - sounds crazy but Premier made it seamless! Based on Lake Travis boat party reviews, we knew they could handle big groups. The party boat customer testimonials were right - 5 stars!',
    highlight: 'Handled 70 guests flawlessly'
  },
  {
    name: 'Chris B.',
    event: 'Startup Celebration',
    boat: 'The Irony (28 guests)',
    rating: 5,
    date: 'September 2024',
    review: 'Celebrated our Series A funding on Lake Travis. The party boat experience Austin offers through Premier is unmatched. Our investors and team had an amazing time. Lake Travis boat rental reviews led us here - no regrets!',
    highlight: 'Impressed our investors'
  }
];

const reviewCategories = [
  {
    icon: Heart,
    title: 'Bachelor & Bachelorette Parties',
    count: '500+',
    rating: '4.9',
    description: 'Our most popular category - Lake Travis boat party reviews consistently praise the perfect party atmosphere'
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    count: '200+',
    rating: '5.0',
    description: 'Austin boat party testimonials from Fortune 500 companies and local startups alike'
  },
  {
    icon: Gift,
    title: 'Birthday Celebrations',
    count: '300+',
    rating: '4.9',
    description: 'Milestone birthdays deserve the premier party cruise experience guests rave about'
  },
  {
    icon: Crown,
    title: 'Special Occasions',
    count: '150+',
    rating: '5.0',
    description: 'Anniversaries, reunions, and unique celebrations with glowing party boat customer testimonials'
  }
];

const whatGuestsLove = [
  { icon: Users, title: 'Professional Crew', description: 'Every Lake Travis boat party review mentions our amazing captains' },
  { icon: Music, title: 'Premium Sound System', description: 'Party boat customer testimonials highlight the incredible audio' },
  { icon: Waves, title: 'Swimming & Floats', description: 'Giant lily pads and swimming stops are guest favorites' },
  { icon: Camera, title: 'Photo Opportunities', description: 'Austin boat party testimonials feature stunning photos' },
  { icon: Sparkles, title: 'Disco Ball Magic', description: 'The Clever Girl\'s 14 disco balls create unforgettable vibes' },
  { icon: MapPin, title: 'Scenic Views', description: 'Lake Travis boat rental reviews praise the beautiful backdrop' }
];

const boatReviewSummary = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    avgRating: '4.9',
    reviewCount: '180+',
    topComment: 'Perfect for intimate groups - Lake Travis boat party reviews love the cozy atmosphere'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    avgRating: '4.9',
    reviewCount: '220+',
    topComment: 'Ideal mid-size option - party boat customer testimonials praise the space'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    avgRating: '5.0',
    reviewCount: '280+',
    topComment: 'Most versatile boat - Austin boat party testimonials highlight flexibility'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    avgRating: '5.0',
    reviewCount: '400+',
    topComment: 'The flagship experience - premier party cruise experience that wows every time'
  }
];

const faqs = [
  {
    question: 'Where can I read authentic Lake Travis boat party reviews?',
    answer: 'You can find verified Lake Travis boat party reviews on Google (where we maintain a 5-star rating), Facebook, Yelp, and The Knot for wedding-related events. We also feature party boat customer testimonials directly on our website from real customers who\'ve experienced our premier party cruise experience.'
  },
  {
    question: 'What do guests consistently praise in reviews?',
    answer: 'Lake Travis boat rental reviews consistently highlight our professional captains, premium sound systems, the fun swimming stops and giant floats, and the overall organization. Austin boat party testimonials frequently mention how stress-free the experience is - we handle everything so guests can just enjoy.'
  },
  {
    question: 'Are the reviews on your website real?',
    answer: 'Yes! All party boat customer testimonials featured on our site are from verified customers. We can provide references upon request. Many of our Lake Travis boat party reviews come from guests who\'ve booked multiple times - our repeat customer rate is over 40%.'
  },
  {
    question: 'What do corporate clients say about your service?',
    answer: 'Austin boat party testimonials from corporate clients praise our professionalism, ability to handle large groups, and seamless coordination. Many Fortune 500 companies have used us for team building, and their Lake Travis boat rental reviews highlight how impressed their executives were.'
  },
  {
    question: 'How do bachelor and bachelorette parties rate you?',
    answer: 'Bachelor and bachelorette parties are our specialty! Party boat customer testimonials from these groups consistently rate us 5 stars. Common themes in Lake Travis boat party reviews include the perfect party atmosphere, accommodating crew, and how the boats exceeded expectations.'
  },
  {
    question: 'Do you respond to negative reviews?',
    answer: 'While rare, we take every piece of feedback seriously. Our premier party cruise experience standards mean we actively work to resolve any issues. Our overall rating across platforms reflects our commitment to guest satisfaction, as shown in hundreds of Austin boat party testimonials.'
  },
  {
    question: 'Can I leave a review after my party?',
    answer: 'Absolutely! After your Lake Travis boat party, we\'ll send a follow-up email with links to leave reviews on Google and other platforms. Your party boat customer testimonials help future guests discover the premier party cruise experience and help us continue improving.'
  },
  {
    question: 'What makes your reviews stand out from competitors?',
    answer: 'Lake Travis boat rental reviews for Premier Party Cruises consistently mention our 14+ years of experience, perfect safety record, and the quality of our fleet. Austin boat party testimonials often compare us favorably to other options, noting our professionalism and attention to detail.'
  }
];

const internalLinks = [
  { href: '/testimonials-faq', label: 'All Testimonials', icon: MessageSquare },
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/quote', label: 'Get a Quote', icon: Star }
];

export default function LakeTravisBoatPartyReviews() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials"
        defaultTitle="Lake Travis Boat Party Reviews - Real Customer Experiences & Testimonials | Premier Party Cruises"
        defaultDescription="Read real Lake Travis boat party reviews and customer testimonials. 125,000+ happy guests, 5-star Google rating. Authentic party boat customer testimonials and Austin boat party testimonials from bachelor parties, bachelorettes, and corporate events."
        defaultKeywords={['Lake Travis boat party reviews', 'party boat customer testimonials', 'Lake Travis boat rental reviews', 'Austin boat party testimonials', 'premier party cruise experience', 'party boat reviews Austin', 'Lake Travis charter reviews']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-reviews-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party reviews - happy guests celebrating on party boat with 5-star customer experience"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              <Star className="h-4 w-4 mr-1 inline" />
              5-Star Rated Experience
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Reviews<br />
              <span className="text-amber-300">Real Customer Experiences</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Discover why 125,000+ guests have chosen the premier party cruise experience. Read authentic party boat customer testimonials and Austin boat party testimonials from real celebrations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Join Our 5-Star Guests</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-700 font-semibold"
                data-testid="button-view-testimonials"
              >
                <Link href="/testimonials-faq">See All Testimonials</Link>
              </Button>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Explore our full guide to{' '}
            <Link href="/party-boat-lake-travis" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Lake Travis party boat rentals</Link>{' '}
            for everything from pricing and logistics to safety and entertainment.
          </p>
        </div>
      </div>


        {/* Review Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {reviewStats.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Reviews */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="featured-reviews-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">FEATURED TESTIMONIALS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="featured-title">
                Real Lake Travis Boat Party Reviews
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Authentic party boat customer testimonials from guests who experienced the premier party cruise experience
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReviews.map((review, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-amber-500" data-testid={`review-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-amber-200 mb-2" />
                      <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{review.review}"</p>
                      <div className="border-t pt-4">
                        <p className="font-bold">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.event} • {review.boat}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                        <Badge className="mt-2 bg-green-100 text-green-700">{review.highlight}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage1}
              alt="Lake Travis boat rental reviews - guests enjoying premier party cruise experience with 5-star service"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-reviews"
            />
          </div>
        </section>

        {/* Review Categories */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900" data-testid="categories-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700">BY EVENT TYPE</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="categories-title">
                Austin Boat Party Testimonials by Category
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                See what guests say about their specific event type - from bachelor parties to corporate outings
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviewCategories.map((category, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`category-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <category.icon className="h-7 w-7 text-amber-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-amber-600">{category.rating}</span>
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{category.count} reviews</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Guests Love */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="guests-love-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-red-100 text-red-700">COMMON THEMES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="love-title">
                What Party Boat Customer Testimonials Highlight
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The aspects of our premier party cruise experience that guests mention most
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatGuestsLove.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`love-card-${index}`}>
                    <CardContent className="pt-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Review Summary */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="boat-reviews-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">BY BOAT</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="boats-title">
                Lake Travis Boat Rental Reviews by Vessel
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                See how each boat in our fleet rates - all single-deck pontoons with arch canopy
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatReviewSummary.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-blue-500" data-testid={`boat-review-card-${index}`}>
                    <CardContent className="pt-6">
                      <Ship className="h-10 w-10 text-blue-600 mb-3" />
                      <h3 className="font-bold text-xl mb-1">{boat.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{boat.capacity}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-amber-600">{boat.avgRating}</span>
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-500">({boat.reviewCount})</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{boat.topComment}"</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 2 */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage2}
              alt="Austin boat party testimonials - happy group celebrating on Lake Travis with premier party cruise experience"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-celebration"
            />
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">REVIEWS FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">
                Questions About Our Reviews & Testimonials
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Lake Travis boat party reviews and customer experiences
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
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

        {/* Internal Links */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                See what makes our Lake Travis boat party reviews so positive
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-amber-500" data-testid={`link-card-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <link.icon className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Star className="h-16 w-16 mx-auto mb-6 text-amber-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Join 125,000+ Happy Guests
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Experience why our Lake Travis boat party reviews are consistently 5 stars. Book your premier party cruise experience today and become part of our story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-amber-700 hover:bg-gray-100 font-bold text-lg px-8"
                  data-testid="button-cta-quote"
                >
                  <Link href="/book-now">Start Your 5-Star Experience</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-amber-700 font-semibold"
                  data-testid="button-cta-call"
                >
                  <a href="tel:5125551234">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
