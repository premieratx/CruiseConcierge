import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Eye, Heart, Share2, Download, MapPin, Camera, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoCardProps {
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
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto';
  showMetadata?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: 'aspect-auto'
};

export default function PhotoCard({
  id,
  src,
  alt,
  title,
  description,
  category,
  location,
  photographer,
  date,
  likes = 0,
  views = 0,
  className,
  aspectRatio = 'auto',
  showMetadata = true,
  onClick,
  onLike,
  onShare,
  onDownload
}: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.();
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.();
  };

  return (
    <motion.div
      className={cn("group cursor-pointer", className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-testid={`photo-card-${id}`}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
        <div className="relative">
          {/* Image container */}
          <div className={cn("relative overflow-hidden bg-gray-100 dark:bg-gray-800", aspectRatioClasses[aspectRatio])}>
            <img
              src={src}
              alt={alt}
              className={cn(
                "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
                !isLoaded && "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
              data-testid={`photo-image-${id}`}
            />
            
            {/* Loading skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <Badge 
                variant="secondary" 
                className="bg-black/70 text-white backdrop-blur-sm border-0"
                data-testid={`photo-category-${id}`}
              >
                {category}
              </Badge>
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="flex items-center gap-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1 : 0.8, 
                  opacity: isHovered ? 1 : 0 
                }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                  }}
                  data-testid={`button-view-${id}`}
                >
                  <Eye className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-12 w-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors",
                    isLiked ? "text-red-400" : "text-white"
                  )}
                  onClick={handleLike}
                  data-testid={`button-like-${id}`}
                >
                  <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
                  onClick={handleShare}
                  data-testid={`button-share-${id}`}
                >
                  <Share2 className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
                  onClick={handleDownload}
                  data-testid={`button-download-${id}`}
                >
                  <Download className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats overlay */}
            {showMetadata && (views > 0 || likes > 0) && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white text-sm bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                {likes > 0 && (
                  <div className="flex items-center gap-1" data-testid={`photo-likes-${id}`}>
                    <Heart className="h-3 w-3" />
                    <span>{likes}</span>
                  </div>
                )}
                {views > 0 && (
                  <div className="flex items-center gap-1" data-testid={`photo-views-${id}`}>
                    <Eye className="h-3 w-3" />
                    <span>{views}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Metadata */}
          {showMetadata && (title || description || location || photographer || date) && (
            <div className="p-4">
              {title && (
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1" data-testid={`photo-title-${id}`}>
                  {title}
                </h3>
              )}
              
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2" data-testid={`photo-description-${id}`}>
                  {description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-2">
                  {location && (
                    <div className="flex items-center gap-1" data-testid={`photo-location-${id}`}>
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{location}</span>
                    </div>
                  )}
                  
                  {photographer && (
                    <div className="flex items-center gap-1" data-testid={`photo-photographer-${id}`}>
                      <Camera className="h-3 w-3" />
                      <span className="truncate">{photographer}</span>
                    </div>
                  )}
                </div>

                {date && (
                  <div className="flex items-center gap-1" data-testid={`photo-date-${id}`}>
                    <Calendar className="h-3 w-3" />
                    <span>{date}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}