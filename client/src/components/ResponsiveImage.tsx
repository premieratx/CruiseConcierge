interface ResponsiveImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  mobileSrc?: string;
  tabletSrc?: string;
  sizes?: string;
  srcSet?: string;
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
  mobileSrc,
  tabletSrc,
  sizes = '100vw',
  srcSet,
}: ResponsiveImageProps) {
  const webpPath = webpSrc || src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Generate srcset if not provided
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    if (!mobileSrc && !tabletSrc) return webpPath;
    
    const sets: string[] = [];
    if (mobileSrc) sets.push(`${mobileSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')} 640w`);
    if (tabletSrc) sets.push(`${tabletSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')} 1024w`);
    sets.push(`${webpPath} 1920w`);
    return sets.join(', ');
  };

  const fallbackSrcSet = () => {
    if (srcSet) return srcSet.replace(/\.webp/g, m => src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg');
    if (!mobileSrc && !tabletSrc) return src;
    
    const sets: string[] = [];
    if (mobileSrc) sets.push(`${mobileSrc} 640w`);
    if (tabletSrc) sets.push(`${tabletSrc} 1024w`);
    sets.push(`${src} 1920w`);
    return sets.join(', ');
  };
  
  return (
    <picture>
      <source 
        type="image/webp" 
        srcSet={generateSrcSet()} 
        sizes={sizes}
      />
      <source 
        srcSet={fallbackSrcSet()} 
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchpriority={fetchpriority}
        width={width}
        height={height}
        decoding={fetchpriority === 'high' ? 'sync' : 'async'}
      />
    </picture>
  );
}
