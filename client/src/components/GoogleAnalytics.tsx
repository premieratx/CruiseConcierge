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
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-GL3D7NEFVT';

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics not configured');
      return;
    }

    // Check if already loaded
    if (window.gtag) {
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

    // Use requestIdleCallback to defer analytics loading until browser is idle
    // Falls back to setTimeout for browsers that don't support requestIdleCallback
    let timeoutId: number;
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(loadAnalytics, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleId);
        
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
    } else {
      timeoutId = window.setTimeout(loadAnalytics, 3000);
      return () => {
        clearTimeout(timeoutId);
        
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
    }
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
