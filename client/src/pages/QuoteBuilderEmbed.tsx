import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export default function QuoteBuilderEmbed() {
  // Build iframe URL immediately for instant loading - NO DELAYS
  const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const baseUrl = 'https://booking.premierpartycruises.com/quote-v2';
  const iframeUrl = `${baseUrl}?sourceUrl=${currentUrl}&sourceType=embedded_quote_v2`;

  useEffect(() => {
    // Auto-resize iframe based on content height
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://booking.premierpartycruises.com') return;
      
      if (event.data.type === 'quote-v2-resize') {
        const iframe = document.getElementById('quote-v2-widget-iframe') as HTMLIFrameElement;
        const container = document.getElementById('quote-v2-widget-container');
        if (iframe && event.data.height) {
          const newHeight = Math.max(event.data.height + 50, 800);
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
        <title>Get a Quote - Premier Party Cruises</title>
        <meta name="description" content="Get an instant quote for your private party cruise or disco cruise on Lake Travis. Book Day Tripper, Meeseeks, The Irony, Clever Girl, or ATX Disco boats." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Get Your Quote in Minutes
            </h1>
            <p className="text-lg text-blue-100">
              Select your date, boat, and party details to receive an instant quote for your Lake Travis adventure
            </p>
          </div>
        </div>

        {/* Quote V2 Widget Container - INSTANT LOADING (NO DELAYS) */}
        <div id="quote-v2-widget-container" className="flex-1 w-full" style={{ minHeight: '800px', position: 'relative', margin: '2rem 0' }}>
          <iframe 
            id="quote-v2-widget-iframe"
            src={iframeUrl}
            style={{ 
              width: '100%', 
              height: '800px', 
              border: 'none', 
              display: 'block',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              zIndex: 1
            }}
            title="Get Your Quote - Premier Party Cruises"
            allow="payment"
            loading="eager"
            data-testid="iframe-quote-builder"
            onLoad={(e) => {
              (e.target as HTMLIFrameElement).style.height = '800px';
            }}
          />
        </div>
      </div>
    </>
  );
}
