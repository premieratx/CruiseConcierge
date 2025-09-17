import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Star, ChevronLeft, ChevronRight, Quote, 
  Verified, Calendar, Users, Trophy, Heart,
  Building2, GraduationCap, PartyPopper, Repeat
} from 'lucide-react';
import { 
  corporateReviews, 
  reviewCategories, 
  socialProofStats,
  getReviewsByCategory,
  getFeaturedCorporateReviews,
  getAverageRating,
  type Review 
} from '@shared/reviews';

interface ReviewsCarouselProps {
  showCategories?: boolean;
  showSocialProof?: boolean;
  autoplay?: boolean;
  className?: string;
  maxReviews?: number;
  featuredOnly?: boolean;
}

// Category icons mapping
const categoryIcons = {
  corporate: Building2,
  bachelor: Users,
  bachelorette: Heart,
  birthday: PartyPopper,
  graduation: GraduationCap,
  repeat: Repeat
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const slideAnimation = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export function ReviewsCarousel({
  showCategories = true,
  showSocialProof = true,
  autoplay = true,
  className = '',
  maxReviews = 6,
  featuredOnly = false
}: ReviewsCarouselProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Get reviews based on props and category
  const getDisplayReviews = (): Review[] => {
    let reviews = featuredOnly 
      ? getFeaturedCorporateReviews() 
      : getReviewsByCategory(selectedCategory);
    
    return reviews.slice(0, maxReviews);
  };

  const displayReviews = getDisplayReviews();
  const averageRating = getAverageRating();

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused || displayReviews.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % displayReviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay, isPaused, displayReviews.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % displayReviews.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentSlide(0);
    setDirection(0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  const formatReviewDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Social Proof Stats */}
      {showSocialProof && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8"
        >
          {socialProofStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue">
                {stat.number}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                {stat.label}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Category Filter */}
      {showCategories && !featuredOnly && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
              {reviewCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 text-xs"
                  data-testid={`tab-reviews-${category.id}`}
                >
                  {getCategoryIcon(category.id)}
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
      )}

      {/* Reviews Carousel */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Customer Reviews
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {averageRating}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ({displayReviews.length} reviews)
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          {displayReviews.length > 1 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="h-10 w-10 rounded-full p-0"
                data-testid="button-reviews-prev"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="h-10 w-10 rounded-full p-0"
                data-testid="button-reviews-next"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Carousel Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait" custom={direction}>
            {displayReviews.slice(currentSlide, currentSlide + 3).map((review, index) => (
              <motion.div
                key={`${review.id}-${currentSlide}`}
                custom={direction}
                variants={slideAnimation}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="h-8 w-8 text-brand-blue opacity-20" />
                    </div>

                    {/* Review Content */}
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      "{review.text}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      {renderStars(review.rating)}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="h-10 w-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {review.avatar || review.initials}
                        </div>

                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                            {review.name}
                            {review.verified && (
                              <Verified className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {review.eventType}
                          </div>
                          {review.location && (
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {review.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        data-testid={`badge-review-category-${review.category}`}
                      >
                        {getCategoryIcon(review.category)}
                        <span className="ml-1 capitalize">{review.category}</span>
                      </Badge>
                    </div>

                    {/* Date */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatReviewDate(review.date)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        {displayReviews.length > 3 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(displayReviews.length / 3) }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * 3)}
                className={cn(
                  "h-2 w-8 rounded-full transition-colors duration-200",
                  Math.floor(currentSlide / 3) === index 
                    ? "bg-brand-blue" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                )}
                data-testid={`indicator-reviews-${index}`}
              />
            ))}
          </div>
        )}

        {/* Load More Reviews (for non-carousel mode) */}
        {displayReviews.length >= maxReviews && !featuredOnly && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://www.google.com/search?q=premier+party+cruises+reviews', '_blank')}
              data-testid="button-view-all-reviews"
            >
              View All Google Reviews
              <Trophy className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}