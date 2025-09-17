import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoCard from '@/components/PhotoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid, LayoutGrid, Filter, SortAsc } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GridImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category: string;
  location?: string;
  photographer?: string;
  date?: string;
  likes?: number;
  views?: number;
  tags?: string[];
}

interface ImageGridProps {
  images: GridImage[];
  categories: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  onImageClick?: (image: GridImage, index: number) => void;
  className?: string;
  showSearch?: boolean;
  showSort?: boolean;
  showLayoutToggle?: boolean;
  defaultLayout?: 'grid' | 'masonry';
  itemsPerPage?: number;
}

type SortOption = 'newest' | 'oldest' | 'popular' | 'name';
type LayoutType = 'grid' | 'masonry';

export default function ImageGrid({
  images,
  categories,
  selectedCategory = 'All',
  onCategoryChange,
  onImageClick,
  className,
  showSearch = true,
  showSort = true,
  showLayoutToggle = true,
  defaultLayout = 'masonry',
  itemsPerPage = 12
}: ImageGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [layout, setLayout] = useState<LayoutType>(defaultLayout);
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort images
  const filteredAndSortedImages = useMemo(() => {
    let filtered = images;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(img =>
        img.title?.toLowerCase().includes(term) ||
        img.description?.toLowerCase().includes(term) ||
        img.category.toLowerCase().includes(term) ||
        img.location?.toLowerCase().includes(term) ||
        img.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Sort images
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime());
      case 'popular':
        return filtered.sort((a, b) => (b.likes || 0) + (b.views || 0) - ((a.likes || 0) + (a.views || 0)));
      case 'name':
        return filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      default:
        return filtered;
    }
  }, [images, selectedCategory, searchTerm, sortBy]);

  const displayedImages = filteredAndSortedImages.slice(0, visibleItems);
  const hasMore = visibleItems < filteredAndSortedImages.length;

  // Load more images
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + itemsPerPage);
      setIsLoading(false);
    }, 300);
  };

  // Reset visible items when filters change
  useEffect(() => {
    setVisibleItems(itemsPerPage);
  }, [selectedCategory, searchTerm, sortBy, itemsPerPage]);

  const handleCategoryChange = (category: string) => {
    onCategoryChange?.(category);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        {showSearch && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-photos"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[140px]" data-testid="select-category-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Photos</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          {showSort && (
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[120px]" data-testid="select-sort-filter">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Layout Toggle */}
          {showLayoutToggle && (
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <Button
                variant={layout === 'masonry' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLayout('masonry')}
                className="h-8 w-8 p-0"
                data-testid="button-layout-masonry"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={layout === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLayout('grid')}
                className="h-8 w-8 p-0"
                data-testid="button-layout-grid"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400" data-testid="text-results-count">
          Showing {displayedImages.length} of {filteredAndSortedImages.length} photos
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${searchTerm}-${sortBy}-${layout}`}
          className={cn(
            "grid gap-4",
            layout === 'masonry' 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          data-testid="image-grid"
        >
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                layout === 'masonry' && index % 3 === 1 ? "lg:mt-8" : "",
                layout === 'masonry' && index % 4 === 2 ? "xl:mt-12" : ""
              )}
            >
              <PhotoCard
                {...image}
                aspectRatio={layout === 'grid' ? 'square' : 'auto'}
                onClick={() => onImageClick?.(image, index)}
                onLike={() => console.log('Liked:', image.id)}
                onShare={() => console.log('Shared:', image.id)}
                onDownload={() => console.log('Downloaded:', image.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No results */}
      {filteredAndSortedImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
            No photos found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-8">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            size="lg"
            variant="outline"
            className="px-8"
            data-testid="button-load-more"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-black mr-2" />
                Loading...
              </>
            ) : (
              'Load More Photos'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}