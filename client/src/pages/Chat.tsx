import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';

declare global {
  interface Window {
    __quoteWidgetPreloaded?: boolean;
    __quoteWidgetIframe?: HTMLIFrameElement;
  }
}

interface ChatProps {
  defaultEventType?: string;
}

export default function Chat({ defaultEventType }: ChatProps = {}) {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    
    const currentUrl = encodeURIComponent(window.location.href);
    const baseUrl = 'https://booking.premierpartycruises.com/quote-v2';
    const fullUrl = `${baseUrl}?sourceUrl=${currentUrl}&sourceType=embedded_quote_v2&autoResize=1`;
    
    if (window.__quoteWidgetIframe && containerRef.current) {
      const preloadedIframe = window.__quoteWidgetIframe;
      preloadedIframe.src = fullUrl;
      preloadedIframe.id = 'quote-v2-widget-iframe';
      preloadedIframe.style.cssText = 'width:100%;height:700px;border:none;display:block;position:relative;z-index:1;';
      preloadedIframe.removeAttribute('aria-hidden');
      preloadedIframe.removeAttribute('tabindex');
      containerRef.current.appendChild(preloadedIframe);
      setIframeReady(true);
      window.__quoteWidgetIframe = undefined;
    } else {
      setIframeUrl(fullUrl);
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://booking.premierpartycruises.com') return;
      
      if (event.data.type === 'quote-v2-resize') {
        const iframe = document.getElementById('quote-v2-widget-iframe') as HTMLIFrameElement;
        const container = document.getElementById('quote-v2-widget-container');
        if (iframe && event.data.height) {
          const newHeight = Math.max(event.data.height + 50, 700);
          iframe.style.transition = 'height 0.3s ease-in-out';
          iframe.style.height = newHeight + 'px';
          if (container) {
            (container as HTMLElement).style.minHeight = newHeight + 'px';
          }
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <Helmet>
        <title>Get Quote | Austin Party Boat Rentals</title>
        <meta name="description" content="Get instant quote for Lake Travis boat rentals. Austin party cruises for bachelor/bachelorette parties & events. Quick online booking!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* ULTRA COMPACT HEADER - Max 1/3 iPhone screen (~250px) */}
        <div className="w-full max-h-[250px] md:max-h-none overflow-hidden">
          {/* Mobile: Single row with logo + text. Desktop: Stacked layout */}
          <div className="flex items-center justify-center gap-2 px-2 py-1 md:flex-col md:py-3 md:gap-1">
            {/* Logo */}
            <img
              src={logoPath}
              alt="Premier Party Cruises"
              className="h-9 w-auto md:h-14"
            />
            
            {/* Text - inline on mobile, stacked on desktop */}
            <div className="text-left md:text-center">
              <h1 className="text-base md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight tracking-tight">
                Welcome Aboard!
              </h1>
              <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 leading-tight">
                Lake Travis Premium Boat Charters
              </p>
            </div>
          </div>
          
          {/* Features - Single compact line on mobile, expanded on desktop */}
          <div className="flex items-center justify-center gap-2 px-2 pb-1 md:gap-4 md:pb-3 text-[10px] md:text-xs text-slate-500 flex-wrap">
            <span>16 Years</span>
            <span className="text-slate-300">•</span>
            <span>150K Customers</span>
            <span className="text-slate-300">•</span>
            <span>5-Star Reviews</span>
            <span className="text-slate-300">•</span>
            <span>14-75 Guests</span>
          </div>
        </div>
        
        {/* Quote Widget - FULL WIDTH viewport, immediately after compact header */}
        <div
          id="quote-v2-widget-container"
          ref={containerRef}
          className="w-screen relative left-1/2 right-1/2 -mx-[50vw]"
          style={{ minHeight: '700px' }}
        >
          {!iframeReady && iframeUrl && (
            <iframe 
              id="quote-v2-widget-iframe"
              src={iframeUrl}
              title="Get Your Quote - Premier Party Cruises"
              className="w-full"
              style={{ 
                height: '700px',
                border: 'none',
                display: 'block',
                position: 'relative',
                zIndex: 1
              }}
              allow="payment"
              loading="eager"
              onLoad={(e) => {
                (e.target as HTMLIFrameElement).style.height = '700px';
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}