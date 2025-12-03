import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock } from 'lucide-react';
import Footer from '@/components/Footer';
import { DISCO_TIME_SLOTS } from '@shared/constants';

interface BookOnlineProps {
  defaultBoatType?: '14p' | '25p' | '50p' | 'disco';
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function BookOnline({ defaultBoatType = '14p' }: BookOnlineProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultBoatType);
  const [activeDiscoTimeSlot, setActiveDiscoTimeSlot] = useState<string>('saturday-330-730pm');
  const [xolaLoaded, setXolaLoaded] = useState(false);

  // Ensure page loads at top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Preload Xola script with DNS prefetch for faster loading
  useEffect(() => {
    // Add DNS prefetch and preconnect for faster Xola loading
    if (!document.querySelector('link[href="https://xola.com"][rel="dns-prefetch"]')) {
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'dns-prefetch';
      prefetchLink.href = 'https://xola.com';
      document.head.appendChild(prefetchLink);
    }

    if (!document.querySelector('link[href="https://xola.com"][rel="preconnect"]')) {
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = 'https://xola.com';
      preconnectLink.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectLink);
    }

    // Xola script loads from index.html - mark as ready
    setXolaLoaded(true);
  }, []);

  // Xola experience IDs
  const xolaConfig = {
    seller: '64c43a70daa3e618b7229ddf',
    experiences: {
      '14p': '64c7d0012c2afc7d8d70e285',
      '25p': '64c7d2b74e1de53cee29395e',
      '50p': '64c7d4f01be574411500cf62',
      'friday-12-4pm': '676fe4a7ff119f53c4063c1b',
      'saturday-11am-3pm': '676f0bc68ff6dfb29009b5ad',
      'saturday-330-730pm': '676f0ceaa3744b05ae09e9de',
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Online | Austin Lake Travis Boats</title>
        <meta name="description" content="Book Lake Travis party boats online! Select 14, 25, or 50-person boats or ATX Disco Cruise. Instant confirmation for Austin cruises." />
      </Helmet>
      
      <div data-page-ready="book-online" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
          <div className="text-center space-y-4">
            <img
              src={logoPath}
              alt="Premier Party Cruises"
              className="h-20 w-auto mx-auto"
              data-testid="img-ppc-logo"
            />
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-playfair">
              Book Your Cruise Online
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Reserve your spot on Lake Travis's premium party boat experience
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base pt-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>16 Years of Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>150,000 Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Hundreds of 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Ship className="h-5 w-5 text-blue-600" />
                <span>Captained Boats for 14-75 Guests</span>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="space-y-6">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('14p')}
                className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === '14p'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
                data-testid="tab-14p"
              >
                14-Person Boat
              </button>
              <button
                onClick={() => setActiveTab('25p')}
                className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === '25p'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
                data-testid="tab-25p"
              >
                25-Person Boat
              </button>
              <button
                onClick={() => setActiveTab('50p')}
                className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === '50p'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
                data-testid="tab-50p"
              >
                50-Person Boat
              </button>
              <button
                onClick={() => setActiveTab('disco')}
                className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-semibold transition-all flex flex-col items-center justify-center ${
                  activeTab === 'disco'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
                data-testid="tab-disco"
              >
                <span>ATX</span>
                <span>Disco Cruise</span>
              </button>
            </div>

            {/* Disco Time Slot Sub-tabs */}
            {activeTab === 'disco' && (
              <div className="flex flex-wrap gap-3">
                {DISCO_TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setActiveDiscoTimeSlot(slot.id)}
                    className={`flex-1 min-w-[160px] px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeDiscoTimeSlot === slot.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200 shadow'
                    }`}
                    data-testid={`tab-disco-${slot.id}`}
                  >
                    {slot.label}
                    {slot.badge && <span className="block text-xs mt-1">{slot.badge}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Widget Container */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              {/* 14p Widget */}
              <div style={{ display: activeTab === '14p' ? 'block' : 'none' }}>
                <div
                  className="xola-embedded-checkout"
                  data-seller={xolaConfig.seller}
                  data-version="2"
                  data-experience={xolaConfig.experiences['14p']}
                  style={{ minHeight: '600px' }}
                  data-testid="widget-14p"
                />
              </div>

              {/* 25p Widget */}
              <div style={{ display: activeTab === '25p' ? 'block' : 'none' }}>
                <div
                  className="xola-embedded-checkout"
                  data-seller={xolaConfig.seller}
                  data-version="2"
                  data-experience={xolaConfig.experiences['25p']}
                  style={{ minHeight: '600px' }}
                  data-testid="widget-25p"
                />
              </div>

              {/* 50p Widget */}
              <div style={{ display: activeTab === '50p' ? 'block' : 'none' }}>
                <div
                  className="xola-embedded-checkout"
                  data-seller={xolaConfig.seller}
                  data-version="2"
                  data-experience={xolaConfig.experiences['50p']}
                  style={{ minHeight: '600px' }}
                  data-testid="widget-50p"
                />
              </div>

              {/* Friday 12-4pm Time Slot - Visible initially for Xola init, then toggled */}
              <div style={{ display: !xolaLoaded || (activeTab === 'disco' && activeDiscoTimeSlot === 'friday-12-4pm') ? 'block' : 'none' }}>
                <div
                  className="xola-embedded-checkout"
                  data-seller={xolaConfig.seller}
                  data-version="2"
                  data-experience={xolaConfig.experiences['friday-12-4pm']}
                  style={{ minHeight: '600px' }}
                  data-testid="widget-disco-friday"
                />
              </div>

              {/* Saturday 11am-3pm Time Slot - Visible initially for Xola init, then toggled */}
              <div style={{ display: !xolaLoaded || (activeTab === 'disco' && activeDiscoTimeSlot === 'saturday-11am-3pm') ? 'block' : 'none' }}>
                <div
                  className="xola-embedded-checkout"
                  data-seller={xolaConfig.seller}
                  data-version="2"
                  data-experience={xolaConfig.experiences['saturday-11am-3pm']}
                  style={{ minHeight: '600px' }}
                  data-testid="widget-disco-saturday-morning"
                />
              </div>

              {/* Saturday 3:30-7:30pm Time Slot - Visible initially for Xola init, then toggled */}
              <div style={{ display: !xolaLoaded || (activeTab === 'disco' && activeDiscoTimeSlot === 'saturday-330-730pm') ? 'block' : 'none' }}>
                <div
                  className="xola-embedded-checkout"
                  data-seller={xolaConfig.seller}
                  data-version="2"
                  data-experience={xolaConfig.experiences['saturday-330-730pm']}
                  style={{ minHeight: '600px' }}
                  data-testid="widget-disco-saturday-afternoon"
                />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {!xolaLoaded && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-lg font-semibold text-gray-700">Loading booking system...</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
      
    <Footer />
    </>
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
