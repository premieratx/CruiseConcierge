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
  srcSet?: string;
  sizes?: string;
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
  srcSet,
  sizes,
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

  // Default to 16/9 aspect ratio when no sizing info is provided to prevent CLS
  const computedAspectRatio = aspectRatio || (width && height ? `${width}/${height}` : undefined);
  const hasExplicitSize = computedAspectRatio || className?.match(/\bh-\d+\b|\bh-\[|\bmin-h-|\bmax-h-/);

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    ...((computedAspectRatio || !hasExplicitSize) && { aspectRatio: computedAspectRatio || '16/9' })
  };

  const effectiveAspectRatio = computedAspectRatio || (!hasExplicitSize ? '16/9' : undefined);

  const imgStyle: React.CSSProperties = effectiveAspectRatio ? {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  } : {};

  const placeholderStyle: React.CSSProperties = {
    aspectRatio: effectiveAspectRatio,
    width: '100%',
    height: effectiveAspectRatio ? '100%' : 'auto'
  };

  return (
    <div className={cn("relative overflow-hidden", className)} style={wrapperStyle}>
      {!isLoaded && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse",
            placeholderClassName
          )}
          style={placeholderStyle}
        />
      )}

      <img
        ref={imgRef}
        src={isInView ? (error && fallbackSrc ? fallbackSrc : src) : undefined}
        srcSet={isInView ? srcSet : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchpriority: "high" } : {})}
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
