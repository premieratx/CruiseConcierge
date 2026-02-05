import { useEffect } from 'react';
import { useLocation } from 'wouter';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  const [location] = useLocation();
  
  // SSR safety: import.meta.env is undefined during server-side rendering
  const GA_MEASUREMENT_ID = typeof window !== 'undefined' && typeof import.meta !== 'undefined'
    ? (import.meta.env?.VITE_GA4_MEASUREMENT_ID || 'G-GL3D7NEFVT')
    : 'G-GL3D7NEFVT';

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics not configured');
      return;
    }

    // Check if already loaded
    if (typeof window.gtag === 'function') {
      return;
    }

    // Track appended scripts for cleanup
    let script1: HTMLScriptElement | null = null;
    let script2: HTMLScriptElement | null = null;
    let isLoaded = false;

    // Defer Google Analytics loading until browser is idle to improve mobile performance
    const loadAnalytics = () => {
      isLoaded = true;
      
      // Load Google Analytics script
      script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

      script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
          send_page_view: true
        });
      `;
      document.head.appendChild(script2);
    };

    // TBT OPTIMIZATION: Defer analytics loading by 5 seconds to ensure no blocking
    // This gives the main thread time to complete critical rendering first
    let timeoutId: ReturnType<typeof setTimeout>;
    let idleId: ReturnType<typeof requestIdleCallback> | undefined;
    
    // Wait 5 seconds, then use requestIdleCallback for additional safety
    timeoutId = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleId = requestIdleCallback(loadAnalytics, { timeout: 3000 });
      } else {
        loadAnalytics();
      }
    }, 5000);
    
    return () => {
      clearTimeout(timeoutId);
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleId);
      }
      
      // Cleanup appended scripts if component unmounts
      if (isLoaded) {
        if (script1 && script1.parentNode) {
          script1.parentNode.removeChild(script1);
        }
        if (script2 && script2.parentNode) {
          script2.parentNode.removeChild(script2);
        }
      }
    };
  }, [GA_MEASUREMENT_ID]);

  // Track page views on route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location,
      });
    }
  }, [location, GA_MEASUREMENT_ID]);

  return null;
}
