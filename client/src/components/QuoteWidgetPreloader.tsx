import { useEffect } from 'react';

declare global {
  interface Window {
    __quoteWidgetPreloaded?: boolean;
    __quoteWidgetIframe?: HTMLIFrameElement;
  }
}

export function QuoteWidgetPreloader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.__quoteWidgetPreloaded) return;
    
    window.__quoteWidgetPreloaded = true;
    
    const iframe = document.createElement('iframe');
    iframe.id = 'quote-widget-preloader';
    iframe.src = 'https://booking.premierpartycruises.com/quote-v2?sourceUrl=preload&sourceType=preload&autoResize=1';
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
    iframe.setAttribute('loading', 'eager');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('tabindex', '-1');
    
    document.body.appendChild(iframe);
    window.__quoteWidgetIframe = iframe;
    
    import('../pages/Chat');
    
    return () => {};
  }, []);
  
  return null;
}

export default QuoteWidgetPreloader;