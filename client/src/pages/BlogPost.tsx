import { useParams } from "wouter";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PublicNavigation from "@/components/PublicNavigation";
import Footer from "@/components/Footer";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { TagBadge } from "@/components/blog/TagBadge";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Eye, Share2, MessageCircle, User, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { format } from "date-fns";

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
        <PublicNavigation />
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
        <PublicNavigation />
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

  // Create Article schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "author": {
      "@type": "Person",
      "name": author.name || "Premier Party Cruises Team"
    },
    "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
    "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date(post.createdAt).toISOString(),
    ...(post.featuredImageUrl && {
      "image": post.featuredImageUrl
    }),
    "publisher": {
      "@type": "Organization",
      "name": "Premier Party Cruises",
      "logo": {
        "@type": "ImageObject",
        "url": "https://premierppartycruises.com/logo.png"
      }
    },
    "description": post.excerpt || post.metaDescription || "",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://premierppartycruises.com/blogs/${slug}`
    }
  };

  return (
    <>
      <PublicNavigation />
      <SEOHead 
        pageRoute={`/blogs/${slug}`}
        defaultTitle={post.metaTitle || post.title || "Blog Post"}
        defaultDescription={post.metaDescription || post.excerpt || ""}
        defaultKeywords={post.focusKeyphrase ? [post.focusKeyphrase] : []}
        customSchema={articleSchema}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/blogs">
            <Button variant="ghost" size="sm" data-testid="button-back-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="mb-8">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-testid="title-blog-post">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6" data-testid="excerpt-blog-post">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              {/* Author */}
              <Link href={`/blogs/author/${author.id}`}>
                <div className="flex items-center gap-2 hover:text-primary transition-colors" data-testid="link-author">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={author.avatarUrl || ""} alt={author.name} />
                    <AvatarFallback>
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{author.name}</span>
                </div>
              </Link>

              <Separator orientation="vertical" className="h-4" />

              {/* Published Date */}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span data-testid="date-published">{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>

              {/* Reading Time */}
              {post.readingTime && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span data-testid="reading-time">{post.readingTime} min read</span>
                  </div>
                </>
              )}

              {/* View Count */}
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span data-testid="view-count">{post.viewCount || 0} views</span>
              </div>

            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Share:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={shareToFacebook}
                data-testid="button-share-facebook"
              >
                <Facebook className="h-4 w-4 mr-1" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareToTwitter}
                data-testid="button-share-twitter"
              >
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareToLinkedIn}
                data-testid="button-share-linkedin"
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full h-auto rounded-lg shadow-lg"
                data-testid="img-featured"
              />
            ) : (
              <div 
                className="w-full h-64 md:h-96 rounded-lg bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center"
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
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
            data-testid="content-blog-post"
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagBadge key={tag.id} tag={tag} />
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          {/* Author Bio */}
          <div className="mb-8">
            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src={author.avatarUrl || ""} alt={author.name} />
                <AvatarFallback className="text-lg">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" data-testid="name-author">{author.name}</h3>
                {author.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3" data-testid="bio-author">
                    {author.bio}
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <Link href={`/blogs/author/${author.id}`}>
                    <Button variant="outline" size="sm" data-testid="button-view-author">
                      View Profile
                    </Button>
                  </Link>
                  {author.website && (
                    <a 
                      href={author.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-author-website"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 mb-12">
            <h2 className="text-2xl font-bold mb-6" data-testid="title-related-posts">Related Posts</h2>
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