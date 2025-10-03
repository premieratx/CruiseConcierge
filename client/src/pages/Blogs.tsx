import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PublicNavigation from "@/components/PublicNavigation";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { TagBadge } from "@/components/blog/TagBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight, Search, TrendingUp, Tag, FolderOpen } from "lucide-react";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from "@shared/schema";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (error) {
    return (
      <>
        <PublicNavigation />
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
      <PublicNavigation />
      <SEOHead 
        pageRoute="/blogs"
        defaultTitle="Austin Party Boat Blog | Bachelor & Bachelorette Party Tips | Premier Party Cruises"
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
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-brand-blue to-blue-600 text-white py-16 md:py-24"
          data-testid="section-hero"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                data-testid="title-hero"
              >
                Austin Party Boat Blog
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-blue-100"
                data-testid="subtitle-hero"
              >
                Expert tips, guides, and stories for planning the ultimate Lake Travis party experience
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-8"
              >
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
              </motion.div>

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
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div key={i} variants={itemVariants} className="space-y-3">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Blog Posts Grid */}
              {data && (
                <>
                  {/* Results Summary */}
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300" data-testid="text-results-summary">
                      {data.total === 0 ? (
                        "No posts found"
                      ) : (
                        <>
                          Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, data.total)} of {data.total} posts
                        </>
                      )}
                    </p>
                  </div>

                  {data.posts.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <p className="text-xl text-gray-500 dark:text-gray-400">No blog posts found.</p>
                      <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                    >
                      {data.posts.map((post, index) => (
                        <motion.article
                          key={post.id}
                          variants={itemVariants}
                          data-testid={`card-blog-post-${post.id}`}
                        >
                          <BlogCard
                            post={post}
                            author={post.author}
                            categories={post.categories}
                            showExcerpt={true}
                          />
                        </motion.article>
                      ))}
                    </motion.div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="mt-12 flex items-center justify-center gap-2"
                    >
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
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
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
            </motion.aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
