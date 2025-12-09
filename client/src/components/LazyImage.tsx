import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  fallbackSrc?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  placeholderClassName,
  fallbackSrc,
  priority = false,
  aspectRatio,
  width,
  height,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setIsLoaded(true);
    }
  };

  const wrapperStyle: React.CSSProperties = aspectRatio ? {
    aspectRatio: aspectRatio,
    position: 'relative',
    overflow: 'hidden'
  } : {};

  const imgStyle: React.CSSProperties = aspectRatio ? {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  } : {};

  return (
    <div className={cn("relative overflow-hidden", className)} style={wrapperStyle}>
      {!isLoaded && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse",
            placeholderClassName
          )}
        />
      )}

      <img
        ref={imgRef}
        src={isInView ? (error && fallbackSrc ? fallbackSrc : src) : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          !aspectRatio && className
        )}
        style={imgStyle}
        {...props}
      />
    </div>
  );
}
