import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function QuoteBuilderSection() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // PERFORMANCE: Load iframe immediately on mount (no IntersectionObserver delay)
  // This ensures the quote builder is ready when user scrolls to it
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set iframe URL immediately to start loading
    const currentUrl = encodeURIComponent(window.location.href);
    const baseUrl = 'https://booking.premierpartycruises.com/quote-v2';
    setIframeUrl(`${baseUrl}?sourceUrl=${currentUrl}&sourceType=embedded_quote_v2`);
  }, []);

  // CLS FIX: Dynamic iframe resizing removed to prevent layout shifts
  // The iframe uses a fixed height of 660px which accommodates all content
  // Dynamic resizing was causing CLS score of 1.0 on mobile PageSpeed

  return (
    <section ref={sectionRef} id="quote-builder" className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700" style={{ position: 'relative', zIndex: 0 }}>
      <div className="container mx-auto px-0 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide border-b-4 border-brand-yellow inline-block pb-3" data-editable data-editable-id="quote-builder-button">
            Start Building Your Quote
          </h2>
        </div>

        <div className="overflow-visible">
          <div className="w-full md:max-w-6xl mx-auto">
            <div 
              ref={containerRef}
              id="quote-v2-widget-container" 
              className="bg-white rounded-none md:rounded-2xl shadow-2xl"
              style={{ 
                width: '100%', 
                minHeight: '660px', 
                position: 'relative',
                margin: '0'
              }}
            >
              {!iframeUrl && (
                <div className="flex items-center justify-center h-[660px] text-gray-500">
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 animate-pulse text-brand-blue" />
                    <p className="text-lg font-medium">Loading Quote Builder...</p>
                  </div>
                </div>
              )}
              {iframeUrl && (
                <iframe 
                  ref={iframeRef}
                  id="quote-v2-widget-iframe"
                  src={iframeUrl}
                  title="Get Your Quote - Premier Party Cruises"
                  className="w-full"
                  style={{ 
                    height: '660px',
                    border: 'none',
                    display: 'block',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    zIndex: 1
                  }}
                  allow="payment"
                  loading="eager"
                  data-testid="iframe-quote-builder"
                  onLoad={(e) => {
                    const iframe = e.target as HTMLIFrameElement;
                    iframe.style.height = '660px';
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
