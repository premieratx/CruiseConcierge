import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BookOnlineProps {
  defaultBoatType?: '14p' | '25p' | '50p' | 'disco';
}

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

export default function BookOnline({ defaultBoatType = '14p' }: BookOnlineProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultBoatType);
  const [xolaLoaded, setXolaLoaded] = useState(false);

  // Ensure page loads at top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Load Xola checkout script
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src*="xola.com/checkout"]')) {
      setXolaLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://xola.com/checkout.js';
    script.async = true;
    script.onload = () => setXolaLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[src*="xola.com/checkout"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Re-initialize Xola widgets when tab changes
  useEffect(() => {
    if (xolaLoaded && window.XolaCheckout) {
      // Give DOM time to render before initializing
      setTimeout(() => {
        window.XolaCheckout.init();
      }, 100);
    }
  }, [activeTab, xolaLoaded]);

  // Xola experience IDs
  const xolaConfig = {
    seller: '64c43a70daa3e618b7229ddf',
    experiences: {
      '14p': '64c7d0012c2afc7d8d70e285', // Day Tripper 14-person boat
      '25p': '64c7d2b74e1de53cee29395e', // Meeseeks 25-person boat
      '50p': '64c7d0012c2afc7d8d70e285', // TODO: Replace with actual 50p experience ID
      'disco': '64c7d0012c2afc7d8d70e285', // TODO: Replace with actual Disco Cruise experience ID
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-start pt-4 pb-12">
        <div className="w-full max-w-7xl px-4">
          <motion.div
            key="booking-intro"
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
                  data-testid="img-ppc-logo"
                />
              </div>
              
              {/* Hero Text */}
              <div className="space-y-3">
                <motion.h1
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-playfair"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  data-testid="text-page-title"
                >
                  Book Your Cruise Online
                </motion.h1>
                
                <motion.p
                  className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  data-testid="text-page-subtitle"
                >
                  Reserve your spot on Lake Travis's premium party boat experience
                </motion.p>
              </div>
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
            
            {/* Tabbed Booking Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full"
            >
              <Tabs 
                defaultValue={defaultBoatType} 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 mb-6 bg-white/80 dark:bg-gray-900/80 p-2 rounded-xl shadow-lg">
                  <TabsTrigger 
                    value="14p" 
                    className="text-sm md:text-base font-semibold data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    data-testid="tab-14p"
                  >
                    14-Person Boat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="25p" 
                    className="text-sm md:text-base font-semibold data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    data-testid="tab-25p"
                  >
                    25-Person Boat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="50p" 
                    className="text-sm md:text-base font-semibold data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    data-testid="tab-50p"
                  >
                    50-Person Boat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="disco" 
                    className="text-sm md:text-base font-semibold data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    data-testid="tab-disco"
                  >
                    Disco Cruise
                  </TabsTrigger>
                </TabsList>

                {/* 14-Person Boat Tab */}
                <TabsContent value="14p" className="mt-0">
                  <div className="w-full rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <div 
                      className="xola-embedded-checkout" 
                      data-seller={xolaConfig.seller}
                      data-version="2" 
                      data-experience={xolaConfig.experiences['14p']}
                      style={{ minHeight: '85vh' }}
                      data-testid="widget-14p"
                    />
                  </div>
                </TabsContent>

                {/* 25-Person Boat Tab */}
                <TabsContent value="25p" className="mt-0">
                  <div className="w-full rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <div 
                      className="xola-embedded-checkout" 
                      data-seller={xolaConfig.seller}
                      data-version="2" 
                      data-experience={xolaConfig.experiences['25p']}
                      style={{ minHeight: '85vh' }}
                      data-testid="widget-25p"
                    />
                  </div>
                </TabsContent>

                {/* 50-Person Boat Tab */}
                <TabsContent value="50p" className="mt-0">
                  <div className="w-full rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <div 
                      className="xola-embedded-checkout" 
                      data-seller={xolaConfig.seller}
                      data-version="2" 
                      data-experience={xolaConfig.experiences['50p']}
                      style={{ minHeight: '85vh' }}
                      data-testid="widget-50p"
                    />
                  </div>
                </TabsContent>

                {/* Disco Cruise Tab */}
                <TabsContent value="disco" className="mt-0">
                  <div className="w-full rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <div 
                      className="xola-embedded-checkout" 
                      data-seller={xolaConfig.seller}
                      data-version="2" 
                      data-experience={xolaConfig.experiences['disco']}
                      style={{ minHeight: '85vh' }}
                      data-testid="widget-disco"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Loading State */}
              {!xolaLoaded && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Loading booking system...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Type declaration for Xola
declare global {
  interface Window {
    XolaCheckout?: {
      init: () => void;
    };
  }
}
