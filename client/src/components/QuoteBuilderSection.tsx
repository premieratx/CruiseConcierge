import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, X } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function QuoteBuilderSection() {
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(800);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from the quote builder iframe
      if (event.origin === 'https://ppc-quote-builder.lovable.app') {
        if (event.data?.type === 'resize' && typeof event.data.height === 'number') {
          setIframeHeight(Math.min(Math.max(event.data.height, 400), 1200));
        }
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
          className="text-center"
        >
          <h2 
            className="text-3xl font-semibold font-playfair text-center mb-6 text-white"
            data-editable 
            data-editable-id="quote-builder-heading"
          >
            BUILD MY QUOTE NOW
          </h2>
          <p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            data-editable 
            data-editable-id="quote-builder-subheading"
          >
            Get instant pricing for your Lake Travis celebration in minutes
          </p>
          
          {!showQuoteBuilder ? (
            <Button
              size="lg"
              onClick={() => setShowQuoteBuilder(true)}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 lg:py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide whitespace-normal min-h-[3.5rem] sm:min-h-[4rem]"
              data-testid="button-build-quote"
            >
              <Sparkles className="mr-2 sm:mr-2 md:mr-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 flex-shrink-0" />
              <span data-editable data-editable-id="quote-builder-button" className="text-center leading-tight">Start Building Your Quote</span>
              <ArrowRight className="ml-2 sm:ml-2 md:ml-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 flex-shrink-0" />
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowQuoteBuilder(false)}
              className="bg-brand-blue border-3 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-12 py-6 rounded-2xl mb-8"
              data-testid="button-hide-quote"
            >
              <X className="mr-2 h-5 w-5" />
              <span data-editable data-editable-id="quote-builder-hide-button">Hide Quote Builder</span>
            </Button>
          )}
        </motion.div>

        {/* Expandable Quote Builder Iframe */}
        <AnimatePresence>
          {showQuoteBuilder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-12 overflow-hidden"
            >
              <div className="w-full md:max-w-6xl mx-auto">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden"
                >
                  <iframe 
                    ref={iframeRef}
                    src="https://ppc-quote-builder.lovable.app/"
                    title="Build Your Quote - Premier Party Cruises"
                    className="w-full"
                    style={{ 
                      height: `${iframeHeight}px`,
                      border: 'none',
                      overflow: 'hidden'
                    }}
                    scrolling="no"
                    allow="payment; geolocation"
                    allowFullScreen
                    data-testid="iframe-quote-builder"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}