import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  sizes?: string;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio = '16/9',
  className = '',
  priority = false,
  loading,
  objectFit = 'cover',
  sizes,
  onLoad
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: width ? `${width}px` : '100%',
    aspectRatio: aspectRatio,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6'
  };

  if (height && width) {
    containerStyle.height = `${height}px`;
    delete containerStyle.aspectRatio;
  }

  const imgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: objectFit,
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out'
  };

  return (
    <div style={containerStyle} className={className}>
      {!loaded && !error && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#e5e7eb',
            animation: 'pulse 2s infinite'
          }}
          aria-hidden="true"
        />
      )}
      {error ? (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            color: '#9ca3af',
            fontSize: '14px'
          }}
        >
          Image unavailable
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading || (priority ? 'eager' : 'lazy')}
          fetchPriority={priority ? 'high' : undefined}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          style={imgStyle}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}

export function HeroImage({
  src,
  alt,
  className = '',
  overlay = true,
  overlayOpacity = 0.4
}: {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}) {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ 
        aspectRatio: '16/9',
        minHeight: '100%'
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      {overlay && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default OptimizedImage;
