import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';

export default function QuoteBuilderEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('supabase.co')) return;
      
      if (event.data.type === 'quote-widget-height' && iframeRef.current) {
        iframeRef.current.style.height = event.data.height + 'px';
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
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

        {/* Quote Widget Container */}
        <div id="quote-widget-container" className="flex-1 w-full" style={{ minHeight: '600px' }}>
          <iframe 
            ref={iframeRef}
            id="quote-widget-iframe"
            src="https://tgambsdjfwgoohkqopns.supabase.co/functions/v1/get-quote-widget" 
            style={{ 
              width: '100%', 
              height: '600px', 
              border: 'none', 
              display: 'block' 
            }}
            title="Get Your Quote"
            allow="payment"
            data-testid="iframe-quote-builder"
          />
        </div>
      </div>
    </>
  );
}
