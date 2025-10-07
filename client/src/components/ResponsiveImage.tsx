interface ResponsiveImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
}

export function ResponsiveImage({
  src,
  webpSrc,
  alt,
  className = '',
  loading = 'lazy',
  fetchpriority = 'auto',
  width,
  height,
}: ResponsiveImageProps) {
  const webpPath = webpSrc || src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <picture>
      <source type="image/webp" srcSet={webpPath} />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchpriority={fetchpriority}
        width={width}
        height={height}
      />
    </picture>
  );
}
