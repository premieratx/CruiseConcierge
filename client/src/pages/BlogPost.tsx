import { useParams } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PublicNavigation from "@/components/PublicNavigation";
import { ClientOnly } from '@/components/ClientOnly';
import Footer from "@/components/Footer";
import Breadcrumb from '@/components/Breadcrumb';
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { TagBadge } from "@/components/blog/TagBadge";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Clock from "lucide-react/dist/esm/icons/clock";
import Eye from "lucide-react/dist/esm/icons/eye";
import Share2 from "lucide-react/dist/esm/icons/share-2";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import Twitter from "lucide-react/dist/esm/icons/twitter";
import Linkedin from "lucide-react/dist/esm/icons/linkedin";
import { Link } from "wouter";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { format } from "date-fns";

const DiscoInsight = lazy(() => import("@/components/DiscoInsight"));

interface BlogPostData {
  post: BlogPost;
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: BlogTag[];
  relatedPosts: (BlogPost & {
    author?: BlogAuthor;
    categories?: BlogCategory[];
  })[];
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch blog post data
  const { data, isLoading, error } = useQuery<BlogPostData>({
    queryKey: ['/api/blog/public/posts', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/public/posts/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog post not found');
        }
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    }
  });

  // Track post view
  const trackViewMutation = useMutation({
    mutationFn: async (postId: string) => {
      await fetch(`/api/blog/posts/${postId}/views`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      // Invalidate the post data to update view count
      queryClient.invalidateQueries({ queryKey: ['/api/blog/public/posts', slug] });
    }
  });

  // Track view on mount
  useEffect(() => {
    if (data?.post?.id && !trackViewMutation.isPending) {
      trackViewMutation.mutate(data.post.id);
    }
  }, [data?.post?.id, trackViewMutation]);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    try {
      return format(new Date(date), 'MMMM d, yyyy');
    } catch {
      return "";
    }
  };

  const safeToISOString = (date: Date | string | null | undefined): string | undefined => {
    if (!date) return undefined;
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return undefined;
      return dateObj.toISOString();
    } catch {
      return undefined;
    }
  };

  const calculateReadingTime = (content: string, wordCount?: number) => {
    if (wordCount) return Math.ceil(wordCount / 200);
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const handleShare = async () => {
    if (navigator.share && data?.post) {
      try {
        await navigator.share({
          title: data.post.title,
          text: data.post.excerpt || "",
          url: window.location.href
        });
      } catch (err) {
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Blog post URL has been copied to your clipboard."
    });
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(data?.post?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
  };

  if (error) {
    return (
      <>
        <ClientOnly><PublicNavigation /></ClientOnly>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive">
              <AlertDescription>
                {error.message || "Failed to load blog post. Please try again later."}
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Link href="/blogs">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ClientOnly><PublicNavigation /></ClientOnly>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-8 w-32 mb-6" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-4 w-64 mb-8" />
              <Skeleton className="h-64 w-full mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!data) return null;

  const { post, author, categories, tags, relatedPosts } = data;

  // Create comprehensive Article and Organization schemas for SEO
  const publishedDate = safeToISOString(post.publishedAt || post.createdAt);
  const modifiedDate = safeToISOString(post.updatedAt || post.createdAt);
  
  // Extract article body (first 300 chars of content without HTML tags, or use excerpt)
  const getArticleBody = () => {
    if (post.excerpt) return post.excerpt;
    const plainText = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return plainText.substring(0, 300) + (plainText.length > 300 ? '...' : '');
  };

  // Strip the first H1 tag from content to prevent double titles
  const getProcessedContent = () => {
    // Remove first H1 tag and its content (to avoid double title)
    // Use multiline-safe regex with dotall flag simulation
    return post.content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();
  };

  // Enhanced BlogPosting schema with comprehensive metadata
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "author": {
      "@type": "Person",
      "name": author.name || "Premier Party Cruises Team",
      ...(author.bio && { "description": author.bio }),
      ...(author.website && { "url": author.website })
    },
    ...(publishedDate && { "datePublished": publishedDate }),
    ...(modifiedDate && { "dateModified": modifiedDate }),
    "image": post.featuredImage || post.socialImage || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=630&fit=crop",
    "publisher": {
      "@type": "Organization",
      "name": "Premier Party Cruises",
      "url": "https://premierpartycruises.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://premierpartycruises.com/PPC%20Logo%20LARGE_1757881944449.png"
      },
      "description": "Austin's premier party boat rental service on Lake Travis, validated by independent AI analysis",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5"
      }
    },
    "description": post.excerpt || post.metaDescription || "",
    "articleBody": getArticleBody(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://premierpartycruises.com/blog/${slug}`
    },
    ...(tags.length > 0 && { "keywords": tags.map(t => t.name).join(", ") }),
    ...(categories.length > 0 && { "articleSection": categories[0].name }),
    ...(post.wordCount && { "wordCount": post.wordCount })
  };

  // Organization schema with Claude AI validation for this specific blog post
  const organizationSchema = slug === 'claude-ai-market-analysis-premier-party-cruises' ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Premier Party Cruises",
    "url": "https://premierpartycruises.com",
    "description": "Austin's #1 party boat rental service on Lake Travis, independently validated by Claude AI analysis",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "9.8",
        "bestRating": "10"
      },
      "author": {
        "@type": "Organization",
        "name": "Claude AI (Anthropic)"
      },
      "reviewBody": "Premier Party Cruises stands as Austin's definitive leader in Lake Travis party boat experiences, representing the pinnacle of event planning excellence. With 14+ years of experience, 125,000+ customers served, and a perfect safety record, the data confirms their market authority position.",
      "datePublished": "2025-10-04"
    },
    "knowsAbout": [
      "Party boat rentals",
      "Bachelor party planning",
      "Bachelorette party cruises",
      "Corporate events on Lake Travis",
      "Private boat charters",
      "Event planning excellence"
    ]
  } : null;

  // Combine schemas into array
  const combinedSchemas = organizationSchema 
    ? [articleSchema, organizationSchema]
    : articleSchema;

  return (
    <>
      <ClientOnly><PublicNavigation /></ClientOnly>
      <Breadcrumb 
        customSegments={data ? [
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blogs' },
          { label: data.post.title, current: true }
        ] : undefined}
      />
      <SEOHead 
        pageRoute={`/blog/${slug}`}
        defaultTitle={(post.metaTitle || post.title || "Blog Post").replace(/\s*\|\s*Premier Party Cruises.*$/i, '')}
        defaultDescription={post.metaDescription || post.excerpt || ""}
        defaultKeywords={post.focusKeyphrase ? [post.focusKeyphrase, ...tags.map(t => t.name)] : tags.map(t => t.name)}
        customSchema={combinedSchemas}
        image={post.featuredImage || post.socialImage}
        article={{
          publishedTime: publishedDate,
          modifiedTime: modifiedDate,
          author: author.name,
          section: categories.length > 0 ? categories[0].name : undefined,
          tags: tags.map(t => t.name)
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blogs">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="button-back-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Post Header */}
          <header className="px-6 md:px-12 pt-8 md:pt-12 pb-6">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight" data-testid="title-blog-post">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed" data-testid="excerpt-blog-post">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-700 py-4">
              {/* Author */}
              <Link href={`/blogs/author/${author.id}`}>
                <div className="flex items-center gap-2 hover:text-brand-blue transition-colors" data-testid="link-author">
                  <Avatar className="h-9 w-9 ring-2 ring-gray-200 dark:ring-gray-700">
                    <AvatarImage src={author.avatarUrl || ""} alt={author.name} />
                    <AvatarFallback className="bg-brand-blue text-white font-semibold">
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{author.name}</span>
                </div>
              </Link>

              <Separator orientation="vertical" className="h-5 bg-gray-300 dark:bg-gray-600" />

              {/* Published Date */}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span data-testid="date-published">{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>

              {/* Reading Time */}
              {post.readingTime && (
                <>
                  <Separator orientation="vertical" className="h-5 bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span data-testid="reading-time">{post.readingTime} min read</span>
                  </div>
                </>
              )}

              {/* View Count */}
              <Separator orientation="vertical" className="h-5 bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-gray-400" />
                <span data-testid="view-count">{post.viewCount || 0} views</span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-1">Share:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={shareToFacebook}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 dark:hover:bg-blue-950 transition-colors"
                data-testid="button-share-facebook"
              >
                <Facebook className="h-4 w-4 mr-1" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareToTwitter}
                className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600 dark:hover:bg-sky-950 transition-colors"
                data-testid="button-share-twitter"
              >
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareToLinkedIn}
                className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 dark:hover:bg-blue-950 transition-colors"
                data-testid="button-share-linkedin"
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-0">
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full h-auto object-cover max-h-[500px]"
                loading="lazy"
                data-testid="img-featured"
              />
            ) : (
              <div 
                className="w-full h-64 md:h-80 bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center"
                data-testid="img-featured-placeholder"
              >
                <div className="text-white text-center px-4">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{post.title}</h2>
                  <p className="text-blue-100">Featured Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none px-6 md:px-12 py-10 md:py-12 
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
            prose-ul:my-6 prose-ol:my-6 prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-brand-blue prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: getProcessedContent() }}
            data-testid="content-blog-post"
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="px-6 md:px-12 pb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagBadge key={tag.id} tag={tag} />
                ))}
              </div>
            </div>
          )}

          <Separator className="mx-6 md:mx-12" />

          {/* Author Bio */}
          <div className="px-6 md:px-12 py-8">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-gray-800">
                <AvatarImage src={author.avatarUrl || ""} alt={author.name} />
                <AvatarFallback className="text-lg bg-brand-blue text-white font-bold">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white" data-testid="name-author">{author.name}</h3>
                {author.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed" data-testid="bio-author">
                    {author.bio}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <Link href={`/blogs/author/${author.id}`}>
                    <Button variant="default" size="sm" className="bg-brand-blue hover:bg-blue-700" data-testid="button-view-author">
                      View Profile
                    </Button>
                  </Link>
                  {author.website && (
                    <a 
                      href={author.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-medium transition-colors"
                      data-testid="link-author-website"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Disco Insight - Conditional based on bachelor/bachelorette categories */}
        {categories.some(cat => 
          cat.name.toLowerCase().includes('bachelor') || 
          cat.name.toLowerCase().includes('bachelorette') ||
          cat.name.toLowerCase().includes('party')
        ) && (
          <div className="mt-8 mb-12 max-w-3xl mx-auto">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <DiscoInsight variant="default" showCTA={true} />
            </Suspense>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white" data-testid="title-related-posts">You May Also Like</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  post={relatedPost}
                  author={relatedPost.author}
                  categories={relatedPost.categories}
                  showExcerpt={true}
                />
              ))}
            </div>
          </section>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
}