import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Star, ExternalLink, Award, TrendingUp, Shield, 
  CheckCircle, Sparkles, Quote, ArrowRight, Bot, BarChart3, FileText
} from 'lucide-react';
import type { Endorsement } from '@shared/schema';

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

// Category icon mapping
const categoryIcons: Record<string, any> = {
  seo: TrendingUp,
  content: Sparkles,
  authority: Shield,
  excellence: Award,
  analysis: Bot,
  market: BarChart3,
  business: FileText,
};

// Helper function to render endorsement content
function EndorsementContent({ endorsement }: { endorsement: Endorsement }) {
  const rating = endorsement.rating || 0;
  const maxRating = endorsement.maxRating || 10;
  const displayRating = maxRating === 100 ? rating / 10 : rating;
  const stars = Math.floor(displayRating / 2);
  const hasRating = rating > 0;

  return (
    <div className="space-y-12">
      {/* Rating Display (if applicable) */}
      {hasRating && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-xl">
            <div className="flex items-baseline gap-2">
              <span 
                className="text-6xl md:text-7xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
                data-testid={`text-rating-score-${endorsement.id}`}
              >
                {displayRating.toFixed(1)}
              </span>
              <span className="text-3xl md:text-4xl font-bold text-muted-foreground">/10</span>
            </div>
            
            {/* Star Rating */}
            <div className="flex gap-1" data-testid={`stars-rating-${endorsement.id}`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < stars
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Headline */}
      <div className="text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          data-testid={`text-headline-${endorsement.id}`}
        >
          {endorsement.headline}
        </h2>
        
        {/* Categories */}
        {endorsement.categories && endorsement.categories.length > 0 && (
          <div 
            className="flex flex-wrap justify-center gap-2"
            data-testid={`categories-list-${endorsement.id}`}
          >
            {endorsement.categories.map((category) => {
              const Icon = categoryIcons[category.toLowerCase()] || Sparkles;
              return (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="px-3 py-1"
                  data-testid={`badge-category-${category}-${endorsement.id}`}
                >
                  <Icon className="w-3 h-3 mr-2" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-full bg-primary/10">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl" data-testid={`text-summary-title-${endorsement.id}`}>
              Key Findings
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p 
            className="text-lg leading-relaxed text-muted-foreground"
            data-testid={`text-summary-content-${endorsement.id}`}
          >
            {endorsement.summary}
          </p>
        </CardContent>
      </Card>

      {/* Highlight Quotes */}
      {endorsement.highlightQuotes && endorsement.highlightQuotes.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" data-testid={`text-highlights-title-${endorsement.id}`}>
              Assessment Highlights
            </h3>
            <p className="text-muted-foreground">
              Key insights from the AI analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endorsement.highlightQuotes.map((quote, index) => (
              <Card 
                key={index}
                className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                data-testid={`card-quote-${index}-${endorsement.id}`}
              >
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-primary/20 mb-3" />
                  <p className="text-sm leading-relaxed">{quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Full Analysis */}
      {endorsement.fullAnalysis && (
        <div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="analysis" className="border-2 rounded-lg px-6">
              <AccordionTrigger 
                className="text-xl font-semibold hover:no-underline"
                data-testid={`button-toggle-analysis-${endorsement.id}`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span>View Full Analysis</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div 
                  className="prose prose-lg max-w-none mt-4 text-muted-foreground whitespace-pre-wrap"
                  data-testid={`text-full-analysis-${endorsement.id}`}
                >
                  {endorsement.fullAnalysis}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* Artifact Link */}
      {endorsement.artifactUrl && (
        <div className="flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group"
            data-testid={`button-view-artifact-${endorsement.id}`}
          >
            <a 
              href={endorsement.artifactUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View Original Analysis
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function AIEndorsement() {
  const { data: endorsements, isLoading } = useQuery<Endorsement[]>({
    queryKey: ['/api/endorsements/homepage'],
  });

  const [activeTab, setActiveTab] = useState<string>('0');

  // Generate schema for reviews
  const reviewsSchema = endorsements && endorsements.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": endorsements.map((endorsement, index) => {
      const rating = endorsement.rating || 0;
      const maxRating = endorsement.maxRating || 10;
      const displayRating = maxRating === 100 ? rating / 10 : rating;
      
      return {
        "@type": "Review",
        "position": index + 1,
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Premier Party Cruises",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Austin",
            "addressRegion": "TX"
          }
        },
        "reviewRating": rating > 0 ? {
          "@type": "Rating",
          "ratingValue": displayRating.toString(),
          "bestRating": "10"
        } : undefined,
        "author": {
          "@type": "Organization",
          "name": endorsement.source
        },
        "reviewBody": endorsement.summary,
        "datePublished": endorsement.publishedAt
      };
    })
  } : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <ClientOnly><PublicNavigation /></ClientOnly>
        <div className="container mx-auto px-4 py-20">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!endorsements || endorsements.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <ClientOnly><PublicNavigation /></ClientOnly>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Endorsements Not Found</h1>
          <p className="text-muted-foreground mb-8">AI endorsements are currently unavailable.</p>
          <Link href="/">
            <Button data-testid="button-home">Return Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SEOHead
        pageRoute="/ai-endorsement"
        defaultTitle="AI SEO Endorsement"
        defaultDescription="Claude AI has recognized Premier Party Cruises with comprehensive assessments including a 9.8/10 SEO Excellence rating and detailed business & market analysis."
        defaultKeywords={['AI endorsement', 'SEO excellence', 'Claude AI', 'authority signal', 'party boat Austin', 'market analysis', 'business assessment']}
        customSchema={reviewsSchema}
      />
      
      <ClientOnly><PublicNavigation /></ClientOnly>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-background py-20 md:py-32 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge 
                variant="secondary" 
                className="text-lg px-6 py-2 bg-primary/10 border-primary/20"
                data-testid="badge-ai-authority"
              >
                <Bot className="w-5 h-5 mr-2" />
                AI Authority Hub
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
              data-testid="text-page-title"
            >
              Claude AI Endorsements
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              data-testid="text-page-subtitle"
            >
              Claude AI has recognized Premier Party Cruises with {endorsements.length} comprehensive assessment{endorsements.length > 1 ? 's' : ''}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Introduction Content Section - Static SEO Content */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">Understanding AI-Powered Business Assessments</h2>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              In today's digital landscape, artificial intelligence has become an essential tool for evaluating business excellence and market positioning. Advanced AI systems like Claude AI analyze thousands of data points to provide comprehensive, unbiased assessments of company performance, SEO effectiveness, and overall market competitiveness.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Premier Party Cruises has undergone rigorous AI-powered evaluation to measure our performance across multiple critical business dimensions. These assessments examine our website's technical SEO implementation, content quality, user experience design, market positioning, and competitive advantages in the Austin Lake Travis party boat rental market.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Why AI Endorsements Matter for Your Experience</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              When planning special events like bachelorette parties, bachelor parties, corporate team building, birthday celebrations, or wedding gatherings on Lake Travis, you deserve confidence that you're choosing the best provider. AI assessments provide objective, data-driven validation of service quality, safety standards, and customer satisfaction.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Our high ratings in SEO excellence demonstrate that we maintain comprehensive, accurate, and helpful information across our entire website. This commitment to transparency extends to our pricing, availability systems, booking processes, and customer support. When AI systems recognize superior content quality and user experience, it reflects our dedication to serving your needs with clarity and professionalism.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">The Premier Party Cruises Difference</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our fleet of party boats on Lake Travis offers unmatched experiences for groups of all sizes. From intimate private cruises for small gatherings to our popular ATX Disco Cruise serving larger parties, we've built our reputation on reliability, safety, and creating unforgettable memories. Our boats feature premium sound systems, comfortable seating, professional crew members, and all the amenities needed for a perfect celebration on the water.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              The AI endorsements displayed on this page validate what our customers have been telling us for years: we deliver exceptional service, maintain transparent pricing, provide accurate real-time availability, and consistently exceed expectations. These technical assessments complement our extensive collection of five-star customer reviews, creating a complete picture of excellence in the Lake Travis party boat industry.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're researching options for your upcoming event or comparing party boat providers in Austin, these AI-powered insights offer valuable third-party validation of our commitment to quality, transparency, and customer satisfaction. We invite you to explore the detailed assessments below and discover why Premier Party Cruises continues to set the standard for luxury party boat experiences on Lake Travis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Claude AI Endorsement Yellow Box */}
      {endorsements.length > 0 && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-16 px-4"
          data-testid="section-endorsement-highlight"
        >
          <div className="max-w-5xl mx-auto">
            <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-10 h-10 text-yellow-600" />
                  <div>
                    <CardTitle className="text-2xl" data-testid="text-endorsement-source">
                      {endorsements[0].source} Endorsement
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {[...Array(endorsements[0].rating || 10)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                      <span className="text-lg font-bold ml-2" data-testid="text-endorsement-rating">
                        {endorsements[0].rating || 10}/{endorsements[0].maxRating || 10}
                      </span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-lg" data-testid="text-endorsement-headline">
                  {endorsements[0].headline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4" data-testid="text-endorsement-summary">
                  {endorsements[0].summary}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      )}

      {/* Overview Section - Both Endorsements Side by Side */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-overview-title">
              Dual Recognition from Claude AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our business has been thoroughly evaluated across multiple dimensions, 
              from technical SEO excellence to comprehensive market positioning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {endorsements.map((endorsement, index) => {
              const rating = endorsement.rating || 0;
              const maxRating = endorsement.maxRating || 10;
              const displayRating = maxRating === 100 ? rating / 10 : rating;
              const hasRating = rating > 0;
              const isRatingType = hasRating && displayRating >= 9;
              
              return (
                <motion.div key={endorsement.id} variants={scaleIn}>
                  <Card 
                    className={`h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                      activeTab === index.toString() ? 'border-primary shadow-xl' : ''
                    }`}
                    onClick={() => setActiveTab(index.toString())}
                    data-testid={`card-overview-${index}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant={isRatingType ? "default" : "secondary"}
                          className="mb-2"
                          data-testid={`badge-type-${index}`}
                        >
                          {isRatingType ? (
                            <>
                              <Award className="w-3 h-3 mr-1" />
                              Excellence Rating
                            </>
                          ) : (
                            <>
                              <BarChart3 className="w-3 h-3 mr-1" />
                              Comprehensive Analysis
                            </>
                          )}
                        </Badge>
                        {hasRating && (
                          <div className="text-right">
                            <div className="text-3xl font-black text-primary" data-testid={`text-overview-rating-${index}`}>
                              {displayRating.toFixed(1)}/10
                            </div>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl" data-testid={`text-overview-headline-${index}`}>
                        {endorsement.headline}
                      </CardTitle>
                      <CardDescription className="line-clamp-3" data-testid={`text-overview-summary-${index}`}>
                        {endorsement.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Bot className="w-4 h-4" />
                        <span>{endorsement.source}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 group"
                        data-testid={`button-view-details-${index}`}
                      >
                        View Full Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Tabbed Endorsement Details */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12 h-auto p-2" data-testid="tabs-list">
                {endorsements.map((endorsement, index) => {
                  const rating = endorsement.rating || 0;
                  const maxRating = endorsement.maxRating || 10;
                  const displayRating = maxRating === 100 ? rating / 10 : rating;
                  const hasRating = rating > 0;
                  const isRatingType = hasRating && displayRating >= 9;
                  
                  return (
                    <TabsTrigger 
                      key={endorsement.id} 
                      value={index.toString()}
                      className="flex flex-col items-start gap-2 p-4 data-[state=active]:bg-background"
                      data-testid={`tab-trigger-${index}`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {isRatingType ? (
                          <Award className="w-5 h-5" />
                        ) : (
                          <BarChart3 className="w-5 h-5" />
                        )}
                        <span className="font-semibold text-left flex-1">
                          {isRatingType ? 'SEO Excellence Rating' : 'Market Analysis Report'}
                        </span>
                        {hasRating && (
                          <Badge variant="secondary" className="ml-auto">
                            {displayRating.toFixed(1)}/10
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground text-left w-full line-clamp-1">
                        {endorsement.source}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {endorsements.map((endorsement, index) => (
                <TabsContent 
                  key={endorsement.id} 
                  value={index.toString()}
                  className="mt-0"
                  data-testid={`tab-content-${index}`}
                >
                  <div className="bg-background rounded-lg p-8 border-2 shadow-xl">
                    <EndorsementContent endorsement={endorsement} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Experience Award-Winning Service</h2>
            
            <Button
              asChild
              size="lg"
              className="group"
              data-testid="button-get-quote"
            >
              <Link href="/chat" className="flex items-center gap-2">
                Get Your Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
              Experience the SEO excellence and professional service that earned us these 
              outstanding recognitions. Start planning your perfect Lake Travis celebration today.
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
