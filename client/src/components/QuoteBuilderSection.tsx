import { useEffect, useRef, useState } from 'react';
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
  // Build iframe URL immediately for instant loading - NO DELAYS
  const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const baseUrl = 'https://booking.premierpartycruises.com/quote-v2';
  const iframeUrl = `${baseUrl}?sourceUrl=${currentUrl}&sourceType=embedded_quote_v2`;
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
          <div className="inline-flex items-center justify-center bg-brand-yellow hover:bg-brand-yellow text-black font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl px-8 sm:px-12 md:px-16 lg:px-20 py-6 sm:py-7 md:py-8 lg:py-10 rounded-2xl shadow-2xl tracking-wide">
            <Sparkles className="mr-3 sm:mr-3 md:mr-4 h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 flex-shrink-0" />
            <span data-editable data-editable-id="quote-builder-button" className="text-center leading-tight">Build My Quote Now</span>
          </div>
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
                minHeight: '800px', 
                position: 'relative',
                margin: '2rem 0'
              }}
            >
              <iframe 
                ref={iframeRef}
                id="quote-v2-widget-iframe"
                src={iframeUrl}
                title="Get Your Quote - Premier Party Cruises"
                className="w-full"
                style={{ 
                  height: '800px',
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
                  (e.target as HTMLIFrameElement).style.height = '800px';
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
