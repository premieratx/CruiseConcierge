import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Search, ChevronLeft, ChevronRight, Globe, Twitter, Linkedin, Facebook, Instagram, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { BlogPost, BlogAuthor, BlogCategory } from "@shared/schema";

interface AuthorPageData {
  author: BlogAuthor;
  posts: (BlogPost & {
    categories?: BlogCategory[];
  })[];
  totalCount: number;
  totalPages: number;
  totalViews: number;
  totalComments: number;
}

export default function BlogAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const postsPerPage = 12;

  // Fetch author data
  const { data, isLoading, error } = useQuery<AuthorPageData>({
    queryKey: [
      '/api/blog/public/authors',
      id,
      currentPage,
      postsPerPage,
      searchQuery,
      sortBy,
      sortOrder
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: postsPerPage.toString(),
        sortBy,
        sortOrder,
        ...(searchQuery && { search: searchQuery })
      });

      const response = await fetch(`/api/blog/public/authors/${id}?${params}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Author not found');
        }
        throw new Error('Failed to fetch author');
      }
      return response.json();
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>
              {error.message || "Failed to load author. Please try again later."}
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
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
            <div className="flex items-start gap-6">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) return null;

  const { author, posts, totalCount, totalPages, totalViews, totalComments } = data;

  return (
    <Layout>
      <SEOHead 
        pageRoute={`/blog/author/${id}`}
        defaultTitle={`${author?.name || 'Author'} - Premier Party Cruises Blog`}
        defaultDescription={author?.bio || `Read articles by ${author?.name || 'this author'} about Austin boat rentals, Lake Travis cruises, and party planning tips.`}
        schemaType="webpage"
        customSchema={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": author?.name || '',
            "description": author?.bio || '',
            "url": author?.website || ''
          }
        }}
      />
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

        {/* Author Profile */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <Avatar className="h-32 w-32 mx-auto md:mx-0">
              <AvatarImage src={author.avatarUrl || ""} alt={author.name} />
              <AvatarFallback className="text-2xl">
                {author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-testid="name-author">
                {author.name}
              </h1>
              {author.bio && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4" data-testid="bio-author">
                  {author.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {totalCount} {totalCount === 1 ? 'Post' : 'Posts'}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {totalViews} Total Views
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {totalComments} Total Comments
                </Badge>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    data-testid="link-author-website"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {author.socialLinks && Object.entries(author.socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline capitalize"
                      data-testid={`link-social-${platform}`}
                    >
                      {getSocialIcon(platform)}
                      {platform}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6" data-testid="title-author-posts">
            Posts by {author.name}
          </h2>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={`Search ${author.name}'s posts...`}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search-author"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as "asc" | "desc");
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border rounded-md text-sm"
                data-testid="select-sort-posts"
              >
                <option value="publishedAt-desc">Newest First</option>
                <option value="publishedAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="viewCount-desc">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300" data-testid="text-results-summary">
              {totalCount === 0 ? (
                `No posts found by ${author.name}`
              ) : (
                <>
                  Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, totalCount)} of {totalCount} posts by {author.name}
                </>
              )}
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">No posts found by this author.</p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or check back later for new content.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  author={author}
                  categories={post.categories}
                  showExcerpt={true}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                data-testid="button-prev-page"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      data-testid={`button-page-${pageNum}`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                data-testid="button-next-page"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}