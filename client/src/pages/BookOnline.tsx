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
  const [activeDiscoPackage, setActiveDiscoPackage] = useState<string>('basic-bach');
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
    script.onload = () => {
      setXolaLoaded(true);
      // Initialize immediately after load
      if (window.XolaCheckout) {
        window.XolaCheckout.init();
      }
    };
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
      // Give DOM more time to render before initializing
      setTimeout(() => {
        window.XolaCheckout.init();
      }, 300);
    }
  }, [activeTab, activeDiscoPackage, xolaLoaded]);

  // Xola experience IDs
  const xolaConfig = {
    seller: '64c43a70daa3e618b7229ddf',
    experiences: {
      '14p': '64c7d0012c2afc7d8d70e285', // Day Tripper 14-person boat
      '25p': '64c7d2b74e1de53cee29395e', // Meeseeks 25-person boat
      '50p': '64c7d4f01be574411500cf62', // Clever Girl 50-person boat
      disco: {
        'basic-bach': '676fe4a7ff119f53c4063c1b', // Basic Bach Package
        'disco-queen': '676f0bc68ff6dfb29009b5ad', // Disco Queen Package
        'super-sparkle': '676f0ceaa3744b05ae09e9de', // Super Sparkle Platinum Disco Package
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-start pt-4 pb-12 px-4">
        <div className="w-full max-w-6xl">
          <motion.div
            key="booking-intro"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Welcome Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center space-y-3"
            >
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <motion.img
                  src={logoPath}
                  alt="Premier Party Cruises"
                  className="h-16 md:h-20 w-auto"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  data-testid="img-ppc-logo"
                />
              </div>
              
              {/* Hero Text */}
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-playfair px-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  data-testid="text-page-title"
                >
                  Book Your Cruise Online
                </motion.h1>
                
                <motion.p
                  className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4"
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
              className="flex items-center justify-center gap-4 md:gap-8 flex-wrap text-xs md:text-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2 text-slate-600 dark:text-slate-400">
                <Ship className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                <span className="whitespace-nowrap">Premium Fleet</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-slate-600 dark:text-slate-400">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 flex-shrink-0" />
                <span className="whitespace-nowrap">500+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                <span className="whitespace-nowrap">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
                <span className="whitespace-nowrap">7 Years Excellence</span>
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
                {/* Main Boat Type Tabs */}
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 mb-4 md:mb-6 bg-white/80 dark:bg-gray-900/80 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg">
                  <TabsTrigger 
                    value="14p" 
                    className="text-xs md:text-sm lg:text-base font-semibold py-2 md:py-2.5 px-2 md:px-4 data-[state=active]:bg-brand-blue data-[state=active]:text-white whitespace-nowrap"
                    data-testid="tab-14p"
                  >
                    <span className="hidden sm:inline">14-Person Boat</span>
                    <span className="sm:hidden">14-Person</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="25p" 
                    className="text-xs md:text-sm lg:text-base font-semibold py-2 md:py-2.5 px-2 md:px-4 data-[state=active]:bg-brand-blue data-[state=active]:text-white whitespace-nowrap"
                    data-testid="tab-25p"
                  >
                    <span className="hidden sm:inline">25-Person Boat</span>
                    <span className="sm:hidden">25-Person</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="50p" 
                    className="text-xs md:text-sm lg:text-base font-semibold py-2 md:py-2.5 px-2 md:px-4 data-[state=active]:bg-brand-blue data-[state=active]:text-white whitespace-nowrap"
                    data-testid="tab-50p"
                  >
                    <span className="hidden sm:inline">50-Person Boat</span>
                    <span className="sm:hidden">50-Person</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="disco" 
                    className="text-xs md:text-sm lg:text-base font-semibold py-2 md:py-2.5 px-2 md:px-4 data-[state=active]:bg-brand-blue data-[state=active]:text-white whitespace-nowrap"
                    data-testid="tab-disco"
                  >
                    Disco Cruise
                  </TabsTrigger>
                </TabsList>

                {/* 14-Person Boat Tab */}
                <TabsContent value="14p" className="mt-0">
                  <div className="w-full rounded-lg md:rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <div 
                      className="xola-embedded-checkout" 
                      data-seller={xolaConfig.seller}
                      data-version="2" 
                      data-experience={xolaConfig.experiences['14p']}
                      style={{ minHeight: '80vh' }}
                      data-testid="widget-14p"
                    />
                  </div>
                </TabsContent>

                {/* 25-Person Boat Tab */}
                <TabsContent value="25p" className="mt-0">
                  <div className="w-full rounded-lg md:rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <div 
                      className="xola-embedded-checkout" 
                      data-seller={xolaConfig.seller}
                      data-version="2" 
                      data-experience={xolaConfig.experiences['25p']}
                      style={{ minHeight: '80vh' }}
                      data-testid="widget-25p"
                    />
                  </div>
                </TabsContent>

                {/* 50-Person Boat Tab */}
                <TabsContent value="50p" className="mt-0">
                  <div className="w-full rounded-lg md:rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <div 
                      className="xola-embedded-checkout" 
                      data-seller={xolaConfig.seller}
                      data-version="2" 
                      data-experience={xolaConfig.experiences['50p']}
                      style={{ minHeight: '80vh' }}
                      data-testid="widget-50p"
                    />
                  </div>
                </TabsContent>

                {/* Disco Cruise Tab with Nested Package Tabs */}
                <TabsContent value="disco" className="mt-0">
                  <div className="w-full space-y-3 md:space-y-4">
                    {/* Package Selection Tabs */}
                    <Tabs 
                      defaultValue="basic-bach"
                      value={activeDiscoPackage}
                      onValueChange={setActiveDiscoPackage}
                      className="w-full"
                    >
                      <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 gap-1.5 md:gap-2 mb-3 md:mb-4 bg-purple-100/80 dark:bg-purple-900/30 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-md">
                        <TabsTrigger 
                          value="basic-bach" 
                          className="text-xs md:text-sm font-semibold py-2 md:py-2.5 px-2 md:px-4 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                          data-testid="tab-disco-basic"
                        >
                          <span className="hidden sm:inline">Basic Bach Package</span>
                          <span className="sm:hidden">Basic Bach</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="disco-queen" 
                          className="text-xs md:text-sm font-semibold py-2 md:py-2.5 px-2 md:px-4 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                          data-testid="tab-disco-queen"
                        >
                          <span className="hidden sm:inline">Disco Queen Package</span>
                          <span className="sm:hidden">Disco Queen</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="super-sparkle" 
                          className="text-xs md:text-sm font-semibold py-2 md:py-2.5 px-2 md:px-4 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                          data-testid="tab-disco-sparkle"
                        >
                          <span className="hidden sm:inline">Super Sparkle Platinum</span>
                          <span className="sm:hidden">Super Sparkle</span>
                        </TabsTrigger>
                      </TabsList>

                      {/* Basic Bach Package Content */}
                      <TabsContent value="basic-bach" className="mt-0">
                        <div className="w-full rounded-lg md:rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                          <div 
                            className="xola-embedded-checkout" 
                            data-seller={xolaConfig.seller}
                            data-version="2" 
                            data-experience={xolaConfig.experiences.disco['basic-bach']}
                            style={{ minHeight: '80vh' }}
                            data-testid="widget-disco-basic"
                          />
                        </div>
                      </TabsContent>

                      {/* Disco Queen Package Content */}
                      <TabsContent value="disco-queen" className="mt-0">
                        <div className="w-full rounded-lg md:rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                          <div 
                            className="xola-embedded-checkout" 
                            data-seller={xolaConfig.seller}
                            data-version="2" 
                            data-experience={xolaConfig.experiences.disco['disco-queen']}
                            style={{ minHeight: '80vh' }}
                            data-testid="widget-disco-queen"
                          />
                        </div>
                      </TabsContent>

                      {/* Super Sparkle Platinum Package Content */}
                      <TabsContent value="super-sparkle" className="mt-0">
                        <div className="w-full rounded-lg md:rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                          <div 
                            className="xola-embedded-checkout" 
                            data-seller={xolaConfig.seller}
                            data-version="2" 
                            data-experience={xolaConfig.experiences.disco['super-sparkle']}
                            style={{ minHeight: '80vh' }}
                            data-testid="widget-disco-sparkle"
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Loading State */}
              {!xolaLoaded && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl mx-4">
                    <div className="flex flex-col items-center gap-3 md:gap-4">
                      <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-brand-blue"></div>
                      <p className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
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
