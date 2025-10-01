import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { BlogPost, BlogAuthor, BlogCategory } from "@shared/schema";

interface CategoryPageData {
  category: BlogCategory;
  posts: (BlogPost & {
    author?: BlogAuthor;
    categories?: BlogCategory[];
  })[];
  totalCount: number;
  totalPages: number;
  subcategories: BlogCategory[];
}

export default function BlogCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const postsPerPage = 12;

  // Fetch category data
  const { data, isLoading, error } = useQuery<CategoryPageData>({
    queryKey: [
      '/api/blog/public/categories',
      slug,
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

      const response = await fetch(`/api/blog/public/categories/${slug}?${params}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Category not found');
        }
        throw new Error('Failed to fetch category');
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

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>
              {error.message || "Failed to load category. Please try again later."}
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
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-20 w-full mb-8" />
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

  const { category, posts, totalCount, totalPages, subcategories } = data;

  return (
    <Layout>
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

        {/* Category Header */}
        <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-8">
          <CategoryBadge 
            category={category} 
            linkable={false} 
            className="mb-4" 
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="title-category">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-testid="description-category">
              {category.description}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2" data-testid="count-posts">
            {totalCount} {totalCount === 1 ? 'post' : 'posts'}
          </p>
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <CategoryBadge
                  key={subcategory.id}
                  category={subcategory}
                  variant="outline"
                />
              ))}
            </div>
          </div>
        )}

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={`Search in ${category.name}...`}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search-category"
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
              `No posts found in ${category.name}`
            ) : (
              <>
                Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, totalCount)} of {totalCount} posts in {category.name}
              </>
            )}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No posts found in this category.</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or check back later for new content.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                author={post.author}
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
    </Layout>
  );
}