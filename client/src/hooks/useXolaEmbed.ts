import { useEffect, RefObject } from 'react';
import { loadXolaScript, initXolaEmbeds } from '@/services/xola';

/**
 * Hook to initialize Xola embedded checkout widgets in React components
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

    async function initEmbed() {
      try {
        // Wait for Xola script to load
        await loadXolaScript();
        
        if (!mounted) return;

        // Small delay to ensure DOM is ready
        setTimeout(() => {
          if (mounted && containerRef.current) {
            initXolaEmbeds(containerRef.current);
          }
        }, 200);
      } catch (error) {
        console.error('Failed to initialize Xola embed:', error);
      }
    }

    initEmbed();

    return () => {
      mounted = false;
    };
  }, deps);
}
