import { useState, useEffect, useRef, ReactNode, Suspense, useCallback } from 'react';

interface ViewportLazyProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  minHeight?: string;
}

export function ViewportLazy({ 
  children, 
  fallback,
  rootMargin = '200px',
  threshold = 0,
  minHeight = '400px'
}: ViewportLazyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isVisible) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    cleanup();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          cleanup();
        }
      },
      { rootMargin, threshold }
    );

    observerRef.current.observe(element);

    return cleanup;
  }, [rootMargin, threshold, isVisible, cleanup]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const placeholderContent = fallback || (
    <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" style={{ minHeight }} />
  );

  if (!isVisible) {
    return (
      <div ref={elementRef} style={{ minHeight }}>
        {placeholderContent}
      </div>
    );
  }

  return (
    <Suspense fallback={placeholderContent}>
      {children}
    </Suspense>
  );
}

export default ViewportLazy;
