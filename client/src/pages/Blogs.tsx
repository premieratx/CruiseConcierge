import { useState, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import PublicNavigation from "@/components/PublicNavigation";
import { ClientOnly } from '@/components/ClientOnly';
import Footer from "@/components/Footer";
import Breadcrumb from '@/components/Breadcrumb';
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Search from "lucide-react/dist/esm/icons/search";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up";
import Tag from "lucide-react/dist/esm/icons/tag";
import FolderOpen from "lucide-react/dist/esm/icons/folder-open";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from "@shared/schema";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";

const ClaudeInsight = lazy(() => import("@/components/ClaudeInsight"));
const DiscoInsight = lazy(() => import("@/components/DiscoInsight"));

interface BlogPostsResponse {
  posts: (BlogPost & {
    author?: BlogAuthor;
    categories?: BlogCategory[];
    tags?: BlogTag[];
  })[];
  total: number;
}

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 20;

  const { data: categoriesData } = useQuery<BlogCategory[]>({
    queryKey: ['/api/blog/public/categories'],
  });

  const { data: tagsData } = useQuery<BlogTag[]>({
    queryKey: ['/api/blog/public/tags'],
  });

  const { data: featuredPostsData } = useQuery<BlogPostsResponse>({
    queryKey: ['/api/blog/public/posts', { featured: 'true', limit: '5' }],
    queryFn: async () => {
      const response = await fetch('/api/blog/public/posts?featured=true&limit=5');
      if (!response.ok) throw new Error('Failed to fetch featured posts');
      return response.json();
    }
  });

  const { data, isLoading, error } = useQuery<BlogPostsResponse>({
    queryKey: [
      '/api/blog/public/posts',
      currentPage,
      postsPerPage,
      searchQuery,
      selectedCategory,
      selectedTag
    ],
    queryFn: async () => {
      const offset = (currentPage - 1) * postsPerPage;
      const params = new URLSearchParams({
        limit: postsPerPage.toString(),
        offset: offset.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory && { categorySlug: selectedCategory }),
        ...(selectedTag && { tagSlug: selectedTag })
      });

      const response = await fetch(`/api/blog/public/posts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handleTagChange = (tagSlug: string) => {
    setSelectedTag(tagSlug);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = data ? Math.ceil(data.total / postsPerPage) : 0;
  const categories = categoriesData || [];
  const tags = tagsData || [];
  const featuredPosts = featuredPostsData?.posts || [];

  if (error) {
    return (
      <>
        <ClientOnly><PublicNavigation /></ClientOnly>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load blog posts. Please try again later.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ClientOnly><PublicNavigation /></ClientOnly>
      <Breadcrumb />
      <SEOHead 
        pageRoute="/blogs"
        defaultTitle="Austin Party Boat Blog | Bachelor & Bachelorette Party Tips"
        defaultDescription="Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat guides, itineraries, and Austin party planning advice."
        defaultKeywords={[
          "Austin party boat blog",
          "bachelor party tips Austin",
          "bachelorette party planning",
          "Lake Travis party guides",
          "Austin party planning advice",
          "boat party itineraries"
        ]}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section
          className="bg-gradient-to-br from-brand-blue to-blue-600 text-white py-16 md:py-24 animate-in fade-in slide-in-from-top-4 duration-500"
          data-testid="section-hero"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150"
                data-testid="title-hero"
              >
                Austin Party Boat Blog
              </h1>
              <p
                className="text-xl md:text-2xl text-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300"
                data-testid="subtitle-hero"
              >
                Expert tips, guides, and stories for planning the ultimate Lake Travis party experience
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 py-6 text-lg"
                    data-testid="input-search"
                  />
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Button
                  variant={!selectedCategory && !selectedTag ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedTag("");
                    setCurrentPage(1);
                  }}
                  data-testid="button-filter-all"
                >
                  All Posts
                </Button>
                {categories.slice(0, 5).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.slug)}
                    data-testid={`button-filter-category-${category.slug}`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-3 animate-in fade-in duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                      <Skeleton className="h-56 w-full rounded-xl" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              )}

              {/* Blog Posts Grid */}
              {data && (
                <>
                  {/* Results Summary */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400" data-testid="text-results-summary">
                      {data.total === 0 ? (
                        "No posts found"
                      ) : (
                        <>
                          Showing {((currentPage - 1) * postsPerPage) + 1}-{Math.min(currentPage * postsPerPage, data.total)} of {data.total} posts
                        </>
                      )}
                    </p>
                  </div>

                  {data.posts.length === 0 ? (
                    <div className="text-center py-20 animate-in fade-in duration-500">
                      <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400">No blog posts found</p>
                      <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or filters</p>
                    </div>
                  ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {data.posts.map((post, index) => (
                        <article
                          key={post.id}
                          className="animate-in fade-in slide-in-from-bottom-4 duration-500 hover:-translate-y-2 transition-transform"
                          style={{ animationDelay: `${index * 100}ms` }}
                          data-testid={`card-blog-post-${post.id}`}
                        >
                          <BlogCard
                            post={post}
                            author={post.author}
                            categories={post.categories}
                            showExcerpt={true}
                            className="h-full"
                          />
                        </article>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
                    
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
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-700">
              {/* Categories */}
              <Card data-testid="card-categories">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-brand-blue" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(0, 10).map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-left"
                        data-testid={`button-sidebar-category-${category.slug}`}
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                          {category.postCount}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Claude AI Insight */}
              <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                <ClaudeInsight
                  quote="Premier Party Cruises stands as Austin's definitive leader in Lake Travis party boat experiences, representing the pinnacle of event planning excellence"
                  variant="sidebar"
                  link="/ai-endorsement"
                />
              </Suspense>

              {/* Disco Insight */}
              <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                <DiscoInsight variant="compact" showCTA={true} />
              </Suspense>

              {/* Popular Posts */}
              {featuredPosts.length > 0 && (
                <Card data-testid="card-popular-posts">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-brand-blue" />
                      Popular Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featuredPosts.map((post) => (
                        <Link key={post.id} href={`/blogs/${post.slug}`}>
                          <div
                            className="flex gap-3 group cursor-pointer"
                            data-testid={`link-popular-post-${post.id}`}
                          >
                            {post.featuredImage ? (
                              <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-blue-400 rounded-md flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-brand-blue transition-colors">
                                {post.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {post.readingTime || 5} min read
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags Cloud */}
              {tags.length > 0 && (
                <Card data-testid="card-tags">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-brand-blue" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 20).map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => handleTagChange(tag.slug)}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary hover:bg-secondary/80 transition-colors"
                          data-testid={`button-tag-${tag.slug}`}
                        >
                          #{tag.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* Related Services Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-700">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-white">
              READY TO BOOK YOUR CRUISE?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Explore our Austin party boat experiences and book your Lake Travis adventure today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <Link href="/bachelor-party-austin" data-testid="link-bachelor-party-blogs">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Boat Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Epic bachelor party cruises on Lake Travis with DJ, photographer, and premium service</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-party-blogs">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Austin's #1 bachelorette party boat cruise since 2009 - ATX Disco Cruise</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/party-boat-lake-travis" data-testid="link-party-boat-blogs">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Party Boat Lake Travis</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premier Lake Travis party boats perfect for any celebration or event</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-cruises-blogs">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Austin Boat Charters</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private boat rentals on Lake Travis for your special event</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-blogs">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Back to Home</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Explore all our Lake Travis party cruise options and services</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-blogs">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get a custom quote for your Austin party boat experience</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
