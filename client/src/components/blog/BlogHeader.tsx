import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List } from "lucide-react";
import { BlogCategory, BlogTag } from "@shared/schema";
import { CategoryBadge } from "./CategoryBadge";
import { TagBadge } from "./TagBadge";

interface BlogHeaderProps {
  title?: string;
  subtitle?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  selectedTag?: string;
  onTagChange?: (tag: string) => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  categories?: BlogCategory[];
  tags?: BlogTag[];
  showFilters?: boolean;
  featuredCategories?: BlogCategory[];
  className?: string;
}

export function BlogHeader({
  title = "Blog",
  subtitle = "Latest insights, updates, and stories",
  searchQuery = "",
  onSearchChange,
  selectedCategory = "",
  onCategoryChange,
  selectedTag = "",
  onTagChange,
  viewMode = "grid",
  onViewModeChange,
  categories = [],
  tags = [],
  showFilters = true,
  featuredCategories = [],
  className = ""
}: BlogHeaderProps) {
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="title-blog-header">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-testid="subtitle-blog-header">
          {subtitle}
        </p>
      </div>

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {featuredCategories.map((category) => (
            <CategoryBadge
              key={category.id}
              category={category}
              variant="outline"
              className="text-sm"
            />
          ))}
        </div>
      )}

      {/* Filters and Controls */}
      {showFilters && (
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10"
              data-testid="input-search-blog"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Category Filter */}
            {categories.length > 0 && (
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-[200px]" data-testid="select-category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.postCount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Tag Filter */}
            {tags.length > 0 && (
              <Select value={selectedTag} onValueChange={onTagChange}>
                <SelectTrigger className="w-[180px]" data-testid="select-tag-filter">
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      #{tag.name} ({tag.postCount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange?.("grid")}
                className="rounded-r-none"
                data-testid="button-view-grid"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange?.("list")}
                className="rounded-l-none"
                data-testid="button-view-list"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(selectedCategory || selectedTag || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="secondary" className="gap-1" data-testid="badge-search-filter">
              Search: "{searchQuery}"
              <button
                onClick={() => onSearchChange?.("")}
                className="ml-1 hover:text-red-500"
                data-testid="button-clear-search"
              >
                ×
              </button>
            </Badge>
          )}
          
          {selectedCategory && selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1" data-testid="badge-category-filter">
              Category: {categories.find(c => c.id === selectedCategory)?.name}
              <button
                onClick={() => onCategoryChange?.("all")}
                className="ml-1 hover:text-red-500"
                data-testid="button-clear-category"
              >
                ×
              </button>
            </Badge>
          )}
          
          {selectedTag && selectedTag !== "all" && (
            <Badge variant="secondary" className="gap-1" data-testid="badge-tag-filter">
              Tag: #{tags.find(t => t.id === selectedTag)?.name}
              <button
                onClick={() => onTagChange?.("all")}
                className="ml-1 hover:text-red-500"
                data-testid="button-clear-tag"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}