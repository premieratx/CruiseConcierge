import { useEffect, RefObject } from 'react';
import { initXolaEmbeds } from '@/services/xola';

declare global {
  interface Window {
    xolaLoaded?: boolean;
  }
}

/**
 * Hook to initialize Xola embedded checkout widgets in React components
 * PAGESPEED: Only initializes if Xola is already loaded (user has interacted)
 * 
 * @param containerRef - Ref to the container with .xola-embedded-checkout divs
 * @param deps - Dependencies that trigger re-initialization (e.g., active tab)
 * 
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * useXolaEmbed(containerRef, [activeTab]);
 */
export function useXolaEmbed(
  containerRef: RefObject<HTMLElement>,
  deps: any[] = []
): void {
  useEffect(() => {
    let mounted = true;

    // PAGESPEED: Only initialize if Xola is already loaded (user has clicked)
    // Xola loads on first user interaction via index.html
    if (typeof window !== 'undefined' && window.xolaLoaded) {
      setTimeout(() => {
        if (mounted && containerRef.current) {
          initXolaEmbeds(containerRef.current);
        }
      }, 200);
    }

    return () => {
      mounted = false;
    };
  }, deps);
}
