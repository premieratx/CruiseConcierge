import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { BlogCard } from "@/components/blog/BlogCard";
import { TagBadge } from "@/components/blog/TagBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Search, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import { Link } from "wouter";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from "@shared/schema";

interface TagPageData {
  tag: BlogTag;
  posts: (BlogPost & {
    author?: BlogAuthor;
    categories?: BlogCategory[];
  })[];
  totalCount: number;
  totalPages: number;
  relatedTags: BlogTag[];
}

export default function BlogTagPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const postsPerPage = 12;

  // Fetch tag data
  const { data, isLoading, error } = useQuery<TagPageData>({
    queryKey: [
      '/api/blog/public/tags',
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

      const response = await fetch(`/api/blog/public/tags/${slug}?${params}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Tag not found');
        }
        throw new Error('Failed to fetch tag');
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
              {error.message || "Failed to load tag. Please try again later."}
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Link href="/blog">
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

  const { tag, posts, totalCount, totalPages, relatedTags } = data;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" data-testid="button-back-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Tag Header */}
        <div className="text-center py-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-lg mb-8">
          <div className="flex items-center justify-center mb-4">
            <Hash className="h-8 w-8 text-purple-500 mr-2" />
            <TagBadge 
              tag={tag} 
              linkable={false} 
              size="lg"
              className="text-lg px-4 py-2"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="title-tag">
            #{tag.name}
          </h1>
          {tag.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-testid="description-tag">
              {tag.description}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2" data-testid="count-posts">
            {totalCount} {totalCount === 1 ? 'post' : 'posts'} tagged with #{tag.name}
          </p>
        </div>

        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Related Tags</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((relatedTag) => (
                <TagBadge
                  key={relatedTag.id}
                  tag={relatedTag}
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
              placeholder={`Search posts tagged with #${tag.name}...`}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search-tag"
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
              `No posts found with tag #${tag.name}`
            ) : (
              <>
                Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, totalCount)} of {totalCount} posts tagged with #{tag.name}
              </>
            )}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <Hash className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">No posts found with this tag.</p>
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