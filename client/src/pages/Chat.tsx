import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock } from 'lucide-react';

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
        {/* COMPACT Header - Half vertical space, minimal on mobile */}
        <div className="w-full px-2 py-1 md:py-3">
          <div className="text-center">
            {/* Logo - Smaller on mobile */}
            <div className="flex justify-center mb-1">
              <img
                src={logoPath}
                alt="Premier Party Cruises"
                className="h-10 md:h-14 w-auto"
              />
            </div>
            
            {/* Hero Text - Very compact */}
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-0.5">
              Welcome Aboard!
            </h1>
            
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-1">
              Lake Travis's Premium Boat Charter Experience
            </p>
            
            {/* Features Row - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-center gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-purple-600" />
                <span>16 Years of Excellence</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>150,000 Happy Customers</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>Hundreds of 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-1">
                <Ship className="h-3 w-3 text-blue-600" />
                <span>Captained Boats for 14-75 Guests</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quote Widget - FULL WIDTH viewport */}
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