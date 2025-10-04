import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Star, ExternalLink, Award, TrendingUp, Shield, 
  CheckCircle, Sparkles, Quote, ArrowRight, Bot
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
};

export default function AIEndorsement() {
  const { data: endorsements, isLoading } = useQuery<Endorsement[]>({
    queryKey: ['/api/endorsements/homepage'],
  });

  const endorsement = endorsements?.[0];
  const rating = endorsement?.rating || 98;
  const maxRating = endorsement?.maxRating || 10;
  const displayRating = maxRating === 100 ? rating / 10 : rating;
  const stars = Math.floor(displayRating / 2);

  // Generate schema for review
  const reviewSchema = endorsement ? {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "Premier Party Cruises",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Austin",
        "addressRegion": "TX"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": displayRating.toString(),
      "bestRating": "10"
    },
    "author": {
      "@type": "Organization",
      "name": endorsement.source
    },
    "reviewBody": endorsement.summary,
    "datePublished": endorsement.publishedAt
  } : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <PublicNavigation />
        <div className="container mx-auto px-4 py-20">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!endorsement) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <PublicNavigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Endorsement Not Found</h1>
          <p className="text-muted-foreground mb-8">The AI endorsement is currently unavailable.</p>
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
        defaultTitle="AI Endorsement: 9.8/10 SEO Excellence | Premier Party Cruises"
        defaultDescription={endorsement.summary}
        defaultKeywords={['AI endorsement', 'SEO excellence', 'Claude AI', 'authority signal', 'party boat Austin']}
        customSchema={reviewSchema}
      />
      
      <PublicNavigation />

      {/* Hero Section with Rating */}
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
                data-testid="badge-ai-source"
              >
                <Bot className="w-5 h-5 mr-2" />
                {endorsement.source}
              </Badge>
            </motion.div>

            {/* Large Rating Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-card border-2 border-primary/20 shadow-2xl backdrop-blur-sm">
                <div className="flex items-baseline gap-2">
                  <span 
                    className="text-8xl md:text-9xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
                    data-testid="text-rating-score"
                  >
                    {displayRating.toFixed(1)}
                  </span>
                  <span className="text-4xl md:text-5xl font-bold text-muted-foreground">/10</span>
                </div>
                
                {/* Star Rating */}
                <div className="flex gap-1" data-testid="stars-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < stars
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-5 h-5" />
                  <span>SEO Excellence Rating</span>
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
              data-testid="text-headline"
            >
              {endorsement.headline}
            </motion.h1>

            {/* Categories */}
            {endorsement.categories && endorsement.categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mb-8"
                data-testid="categories-list"
              >
                {endorsement.categories.map((category) => {
                  const Icon = categoryIcons[category.toLowerCase()] || Sparkles;
                  return (
                    <Badge 
                      key={category} 
                      variant="outline" 
                      className="px-4 py-1.5"
                      data-testid={`badge-category-${category}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Summary Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp}>
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-full bg-primary/10">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl" data-testid="text-summary-title">
                    Key Findings
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p 
                  className="text-lg leading-relaxed text-muted-foreground"
                  data-testid="text-summary-content"
                >
                  {endorsement.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Highlight Quotes */}
      {endorsement.highlightQuotes && endorsement.highlightQuotes.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 bg-muted/30"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-highlights-title">
                Assessment Highlights
              </h2>
              <p className="text-lg text-muted-foreground">
                Key insights from the AI analysis
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {endorsement.highlightQuotes.map((quote, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card 
                    className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                    data-testid={`card-quote-${index}`}
                  >
                    <CardContent className="pt-6">
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />
                      <p className="text-base leading-relaxed">{quote}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Full Analysis */}
      {endorsement.fullAnalysis && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="analysis" className="border-2 rounded-lg px-6">
                <AccordionTrigger 
                  className="text-xl font-semibold hover:no-underline"
                  data-testid="button-toggle-analysis"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <span>View Full Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div 
                    className="prose prose-lg max-w-none mt-4 text-muted-foreground whitespace-pre-wrap"
                    data-testid="text-full-analysis"
                  >
                    {endorsement.fullAnalysis}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.section>
      )}

      {/* Artifact Link & CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Explore More</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {endorsement.artifactUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group"
                  data-testid="button-view-artifact"
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
              )}

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
            </div>

            <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
              Experience the SEO excellence and professional service that earned us this 
              outstanding rating. Start planning your perfect Lake Travis celebration today.
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
