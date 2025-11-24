import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function QuoteBuilderSection() {
  // FIXED: Build iframe URL client-side only to avoid SSR/client mismatch
  // Using state initialized in useLayoutEffect runs BEFORE paint (no delay visible to user)
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize URL as early as possible (before paint) to minimize any delay
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = encodeURIComponent(window.location.href);
      const baseUrl = 'https://booking.premierpartycruises.com/quote-v2';
      setIframeUrl(`${baseUrl}?sourceUrl=${currentUrl}&sourceType=embedded_quote_v2`);
    }
  }, []);

  // Setup auto-resize handler
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Auto-resize iframe based on content height
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== 'https://booking.premierpartycruises.com') return;
        
        if (event.data.type === 'quote-v2-resize') {
          const iframe = document.getElementById('quote-v2-widget-iframe') as HTMLIFrameElement;
          const container = document.getElementById('quote-v2-widget-container');
          if (iframe && event.data.height) {
            // Add max 100px padding to content height, no minimum
            const newHeight = event.data.height + 100;
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
    }
  }, []);

  return (
    <section id="quote-builder" className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700" style={{ position: 'relative', zIndex: 0 }}>
      <div className="container mx-auto px-0 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <h2 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide border-b-4 border-brand-yellow inline-block pb-3" data-editable data-editable-id="quote-builder-button">
            Start Building Your Quote
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="overflow-visible"
        >
          <div className="w-full md:max-w-6xl mx-auto">
            <div 
              ref={containerRef}
              id="quote-v2-widget-container" 
              className="bg-white rounded-none md:rounded-2xl shadow-2xl"
              style={{ 
                width: '100%', 
                minHeight: '600px', 
                position: 'relative',
                margin: '0'
              }}
            >
              {iframeUrl && (
                <iframe 
                  ref={iframeRef}
                  id="quote-v2-widget-iframe"
                  src={iframeUrl}
                  title="Get Your Quote - Premier Party Cruises"
                  className="w-full"
                  style={{ 
                    height: '600px',
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
                    // Start with a reasonable height, will auto-adjust via postMessage
                    iframe.style.height = '600px';
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
