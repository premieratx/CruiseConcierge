import React from 'react';
import { motion } from 'framer-motion';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock, Gift, Calendar } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -60,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export default function GoldenTicket() {
  // Ensure page loads at top
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Dynamic height adjustment for iframe based on postMessage
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://ppc-quote-builder.lovable.app' && event.data.height) {
        const iframe = document.querySelector('iframe[title="Premier Party Cruises Quote Builder"]') as HTMLIFrameElement;
        if (iframe) {
          iframe.style.height = `${event.data.height}px`;
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Load GoHighLevel form embed script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://events.premierpartycruises.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-start pt-4 pb-12">
        <div className="w-full max-w-6xl px-4">
          <motion.div
            key="intro"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            {/* Welcome Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center space-y-4"
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <motion.img
                  src={logoPath}
                  alt="Premier Party Cruises"
                  className="h-24 w-auto"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                />
              </div>
              
              {/* Golden Ticket Announcement */}
              <motion.div
                className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 p-8 rounded-2xl shadow-2xl border-4 border-yellow-500/50"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Gift className="h-10 w-10 text-amber-900" />
                  <h1 className="text-4xl md:text-5xl font-bold text-amber-900">
                    🎉 Golden Ticket Winner! 🎉
                  </h1>
                  <Gift className="h-10 w-10 text-amber-900" />
                </div>
                
                <div className="space-y-4 text-amber-950">
                  <p className="text-2xl md:text-3xl font-semibold">
                    You've been selected to get a <span className="text-green-700 font-bold">$300 gift card</span> to book your next cruise with Premier!
                  </p>
                  
                  <p className="text-xl md:text-2xl font-medium">
                    And we're also giving you <span className="text-blue-700 font-bold">5 more $300 gift cards</span> to send to your friends!
                  </p>
                  
                  <div className="bg-red-600 text-white p-4 rounded-lg mt-6 flex items-center justify-center gap-3">
                    <Calendar className="h-6 w-6" />
                    <p className="text-lg md:text-xl font-bold">
                      Book by Sunday or the discount drops to $200!
                    </p>
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Features Row */}
            <motion.div
              className="flex items-center justify-center gap-8 flex-wrap text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Ship className="h-5 w-5 text-blue-600" />
                <span>Premium Fleet</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>500+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>7 Years Excellence</span>
              </div>
            </motion.div>
            
            {/* Quote Builder Iframe */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full mb-8"
            >
              <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-2xl">
                <iframe 
                  src="https://ppc-quote-builder.lovable.app/"
                  title="Premier Party Cruises Quote Builder"
                  className="w-full"
                  style={{ 
                    minHeight: '2400px',
                    height: 'auto',
                    maxHeight: 'none',
                    border: 'none',
                    display: 'block'
                  }}
                  allow="payment; geolocation"
                  allowFullScreen
                  scrolling="auto"
                  data-testid="iframe-quote-builder"
                />
              </div>
            </motion.div>

            {/* Friend Referral Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Share the Golden Ticket! 🎁
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Enter your friends' details below to send them their $300 gift cards
                </p>
              </div>

              <div className="space-y-8">
                {/* Friend #1 Form */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Friend #1</h3>
                  <iframe
                    src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                    style={{ width: '100%', height: '456px', border: 'none', borderRadius: '3px' }}
                    id="inline-w33cn0pBz1fFbTC0Hrnh-1"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Golden Ticket Form to Friends"
                    data-height="456"
                    data-layout-iframe-id="inline-w33cn0pBz1fFbTC0Hrnh-1"
                    data-form-id="w33cn0pBz1fFbTC0Hrnh"
                    title="Golden Ticket Form to Friends - Friend 1"
                  />
                </div>

                {/* Friend #2 Form */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Friend #2</h3>
                  <iframe
                    src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                    style={{ width: '100%', height: '456px', border: 'none', borderRadius: '3px' }}
                    id="inline-w33cn0pBz1fFbTC0Hrnh-2"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Golden Ticket Form to Friends"
                    data-height="456"
                    data-layout-iframe-id="inline-w33cn0pBz1fFbTC0Hrnh-2"
                    data-form-id="w33cn0pBz1fFbTC0Hrnh"
                    title="Golden Ticket Form to Friends - Friend 2"
                  />
                </div>

                {/* Friend #3 Form */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Friend #3</h3>
                  <iframe
                    src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                    style={{ width: '100%', height: '456px', border: 'none', borderRadius: '3px' }}
                    id="inline-w33cn0pBz1fFbTC0Hrnh-3"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Golden Ticket Form to Friends"
                    data-height="456"
                    data-layout-iframe-id="inline-w33cn0pBz1fFbTC0Hrnh-3"
                    data-form-id="w33cn0pBz1fFbTC0Hrnh"
                    title="Golden Ticket Form to Friends - Friend 3"
                  />
                </div>

                {/* Friend #4 Form */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Friend #4</h3>
                  <iframe
                    src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                    style={{ width: '100%', height: '456px', border: 'none', borderRadius: '3px' }}
                    id="inline-w33cn0pBz1fFbTC0Hrnh-4"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Golden Ticket Form to Friends"
                    data-height="456"
                    data-layout-iframe-id="inline-w33cn0pBz1fFbTC0Hrnh-4"
                    data-form-id="w33cn0pBz1fFbTC0Hrnh"
                    title="Golden Ticket Form to Friends - Friend 4"
                  />
                </div>

                {/* Friend #5 Form */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Friend #5</h3>
                  <iframe
                    src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                    style={{ width: '100%', height: '456px', border: 'none', borderRadius: '3px' }}
                    id="inline-w33cn0pBz1fFbTC0Hrnh-5"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Golden Ticket Form to Friends"
                    data-height="456"
                    data-layout-iframe-id="inline-w33cn0pBz1fFbTC0Hrnh-5"
                    data-form-id="w33cn0pBz1fFbTC0Hrnh"
                    title="Golden Ticket Form to Friends - Friend 5"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
