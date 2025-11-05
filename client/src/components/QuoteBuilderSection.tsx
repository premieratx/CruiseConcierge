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
  const [iframeUrl, setIframeUrl] = useState('');
  const [iframeHeight, setIframeHeight] = useState(600);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = encodeURIComponent(window.location.href);
      const baseUrl = 'https://booking.premierpartycruises.com/new-quote';
      setIframeUrl(`${baseUrl}?sourceUrl=${currentUrl}&sourceType=embedded_new_quote`);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://booking.premierpartycruises.com') return;
      
      if (event.data.type === 'new-quote-resize' && event.data.height) {
        // Set maximum height to 800px to prevent page breaking
        const newHeight = Math.min(Math.max(event.data.height + 20, 400), 800);
        setIframeHeight(newHeight);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section id="quote-builder" className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
      <div className="container mx-auto px-0 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center bg-brand-yellow hover:bg-brand-yellow text-black font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 lg:py-8 rounded-2xl shadow-2xl tracking-wide min-h-[3.5rem] sm:min-h-[4rem]">
            <Sparkles className="mr-2 sm:mr-2 md:mr-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 flex-shrink-0" />
            <span data-editable data-editable-id="quote-builder-button" className="text-center leading-tight">Start Building Your Quote</span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="overflow-hidden"
        >
          <div className="w-full md:max-w-6xl mx-auto">
            <div className="bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden">
              {iframeUrl && (
                <iframe 
                  ref={iframeRef}
                  src={iframeUrl}
                  title="Build Your Quote - Premier Party Cruises"
                  className="w-full"
                  style={{ 
                    height: `${iframeHeight}px`,
                    border: 'none',
                    overflow: 'auto'
                  }}
                  scrolling="yes"
                  allow="payment; geolocation"
                  allowFullScreen
                  data-testid="iframe-quote-builder"
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
