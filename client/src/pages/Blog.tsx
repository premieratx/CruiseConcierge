import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PublicNavigation from "@/components/PublicNavigation";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from "@shared/schema";
import SEOHead from "@/components/SEOHead";

interface BlogPostsResponse {
  posts: (BlogPost & {
    author?: BlogAuthor;
    categories?: BlogCategory[];
    tags?: BlogTag[];
  })[];
  total: number;
}

interface BlogPageData {
  posts: (BlogPost & {
    author?: BlogAuthor;
    categories?: BlogCategory[];
    tags?: BlogTag[];
  })[];
  totalCount: number;
  totalPages: number;
  authors: BlogAuthor[];
  categories: BlogCategory[];
  tags: BlogTag[];
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const postsPerPage = 15; // Changed to 15 to work better with 5-column layout

  // Fetch blog data
  const { data, isLoading, error } = useQuery<BlogPageData>({
    queryKey: [
      'blog-page-data',
      currentPage,
      postsPerPage,
      searchQuery,
      selectedCategory,
      selectedTag,
      sortBy,
      sortOrder
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

      // Fetch posts and reference data in parallel
      const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
        fetch(`/api/blog/public/posts?${params}`),
        fetch('/api/blog/public/categories'),
        fetch('/api/blog/public/tags')
      ]);

      if (!postsResponse.ok) throw new Error('Failed to fetch blog posts');
      if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
      if (!tagsResponse.ok) throw new Error('Failed to fetch tags');

      const postsData: BlogPostsResponse = await postsResponse.json();
      const categories: BlogCategory[] = await categoriesResponse.json();
      const tags: BlogTag[] = await tagsResponse.json();

      // Calculate total pages
      const totalPages = Math.ceil(postsData.total / postsPerPage);

      return {
        posts: postsData.posts || [],
        totalCount: postsData.total || 0,
        totalPages,
        authors: [], // We'll get this from posts if needed
        categories,
        tags
      };
    }
  });

  // Reset page when filters change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleTagChange = (tagId: string) => {
    setSelectedTag(tagId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        </>
      );
    }

  const featuredCategories = (data?.categories || []).filter(cat => cat && typeof cat.displayOrder === 'number' && cat.displayOrder <= 5);

  return (
    <>
      <PublicNavigation />
      <SEOHead 
        pageRoute="/blogs"
        defaultTitle="Blog - Premier Party Cruises | Lake Travis Boat Tours & Events"
        defaultDescription="Discover the latest news, tips, and stories from Lake Travis. Read about boat tours, party planning, lake activities, and exclusive cruise experiences on Austin's premier waterway."
        defaultKeywords={["Lake Travis blog", "Austin boat tours", "party planning tips", "lake activities", "cruise stories", "Lake Travis events"]}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
        <BlogHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          categories={data?.categories || []}
          tags={data?.tags || []}
          featuredCategories={featuredCategories}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8">
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        {data && (
          <>
            {/* Results Summary */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-results-summary">
                {data.totalCount === 0 ? (
                  "No posts found"
                ) : (
                  <>
                    Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, data.totalCount)} of {data.totalCount} posts
                  </>
                )}
              </p>
              
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
                  className="px-3 py-1 border rounded-md text-sm"
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

            {/* Posts Grid/List */}
            {data.posts.length === 0 ? (
              <section className="mt-12 text-center">
                <p className="text-xl text-gray-500 dark:text-gray-400">No blog posts found.</p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or filters.</p>
              </section>
            ) : (
              <section className={`mt-8 grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
                {data.posts.map((post) => (
                  <article key={post.id} data-testid={`card-blog-post-${post.id}`}>
                    <BlogCard
                      post={post}
                      author={post.author}
                      categories={post.categories}
                      showExcerpt={true}
                      className={viewMode === 'list' ? 'md:flex md:space-x-6' : ''}
                    />
                  </article>
                ))}
              </section>
            )}

            {/* Pagination */}
            {data.totalPages > 1 && (
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
                  {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                    let pageNum;
                    if (data.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= data.totalPages - 2) {
                      pageNum = data.totalPages - 4 + i;
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
                  disabled={currentPage >= data.totalPages}
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
      </div>
    </>
  );
}