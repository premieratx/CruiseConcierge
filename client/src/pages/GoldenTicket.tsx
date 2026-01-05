import React from 'react';
import { motion } from 'framer-motion';
import AdminNoIndex from '@/components/AdminNoIndex';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock, Gift, Calendar, DollarSign, Tag, Package, Truck, Sparkles, Users, AlertCircle, Crown } from 'lucide-react';

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

  // Load GoHighLevel form script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://events.premierpartycruises.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Dynamic height adjustment for new quote builder iframe - DISABLED to prevent expansion
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://booking.premierpartycruises.com') return;
      
      // Disabled auto-resize to keep iframe at fixed height matching photo slideshow
      // if (event.data.type === 'quote-builder-resize') {
      //   const iframe = document.getElementById('quote-widget-iframe') as HTMLIFrameElement;
      //   const container = document.getElementById('quote-widget-container') as HTMLDivElement;
      //   if (iframe && event.data.height) {
      //     const newHeight = Math.min(Math.max(event.data.height + 50, 650), 700);
      //     iframe.style.transition = 'height 0.3s ease-in-out';
      //     iframe.style.height = `${newHeight}px`;
      //     if (container) {
      //       container.style.minHeight = `${newHeight}px`;
      //     }
      //   }
      // }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Set iframe src with source tracking
  React.useEffect(() => {
    const iframe = document.getElementById('quote-widget-iframe') as HTMLIFrameElement;
    if (iframe && !iframe.src) {
      const currentUrl = encodeURIComponent(window.location.href);
      const baseUrl = 'https://booking.premierpartycruises.com/';
      iframe.src = `${baseUrl}?sourceUrl=${currentUrl}&sourceType=embedded_quote_builder`;
    }
  }, []);

  return (
    <>
      <AdminNoIndex />
      <Helmet>
        <title>Golden Ticket | ATX Disco Cruise Deals</title>
        <meta name="description" content="Exclusive ATX Disco Cruise promotional offer! Get $300 gift card plus 5 friend cards. Limited time Golden Ticket deal for Austin party cruises." />
      </Helmet>
      
      <div data-page-ready="golden-ticket" className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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
                <Clock className="h-5 w-5 text-purple-600" />
                <span>16 Years of Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>150,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>150,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Ship className="h-5 w-5 text-blue-600" />
                <span>Captained Boats for 14-75 Guests</span>
              </div>
            </motion.div>
            
            {/* Offer Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-6">
                Your Golden Ticket Benefits
              </h2>
              
              {/* Section 1: Universal Benefits */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-900 p-6 md:p-8 rounded-2xl shadow-xl border-2 border-amber-300 dark:border-amber-700">
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100">
                    Universal Benefits (Everyone Gets These!)
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Time-Sensitive Discounts */}
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-5 rounded-xl shadow-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">⏰ Time-Sensitive Discounts</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="font-semibold">💰 $300 OFF by Sunday 10/12</li>
                          <li className="font-semibold">💰 $200 OFF by Wednesday 10/15</li>
                          <li className="font-semibold">💰 $100 OFF by end of October</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Free Services */}
                  <div className="bg-white dark:bg-slate-700 p-5 rounded-xl shadow-lg border border-amber-200 dark:border-amber-600">
                    <div className="flex items-start gap-3">
                      <Package className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">🆓 Free Stock the Cooler</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Free service from Party On Delivery</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vouchers */}
                  <div className="bg-white dark:bg-slate-700 p-5 rounded-xl shadow-lg border border-amber-200 dark:border-amber-600">
                    <div className="flex items-start gap-3">
                      <Gift className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">🎁 $50 Airbnb Alcohol Voucher</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">From Party On Delivery</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-700 p-5 rounded-xl shadow-lg border border-amber-200 dark:border-amber-600">
                    <div className="flex items-start gap-3">
                      <Tag className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">🎫 $300-$500 Weekend Voucher</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">For full weekend packages</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transportation Discount */}
                  <div className="bg-white dark:bg-slate-700 p-5 rounded-xl shadow-lg border border-amber-200 dark:border-amber-600 md:col-span-2">
                    <div className="flex items-start gap-3">
                      <Truck className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">🚐 25% Off Round-Trip Transportation</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Save on getting to and from the marina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section 2: Private Cruise Perks */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 p-6 md:p-8 rounded-2xl shadow-xl border-2 border-blue-300 dark:border-blue-700">
                <div className="flex items-center gap-3 mb-4">
                  <Ship className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100">
                    Private Cruise Perks
                  </h3>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-5 rounded-xl mb-4">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    ✅ <strong>All Universal Benefits above</strong> PLUS:
                  </p>
                  <div className="flex items-start gap-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg">
                    <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg text-green-900 dark:text-green-100">🆓 FREE Upgrade Package</h4>
                      <ul className="text-sm text-green-800 dark:text-green-200 mt-2 space-y-1">
                        <li>• Lily pad float</li>
                        <li>• Essentials package</li>
                        <li>• 10 disco ball cups</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section 3: Disco Cruise Perks */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 p-6 md:p-8 rounded-2xl shadow-xl border-2 border-purple-300 dark:border-purple-700">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-900 dark:text-purple-100">
                    Disco Cruise Perks
                  </h3>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-5 rounded-xl">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    ✅ <strong>All Universal Benefits above</strong> PLUS:
                  </p>
                  <div className="flex items-start gap-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg">
                    <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg text-purple-900 dark:text-purple-100">✨ Disco ball cups for the whole group!</h4>
                      <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">Everyone gets their own disco ball cup to keep the party vibes going!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section 4: Bachelor/Bachelorette Note */}
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-6 md:p-8 rounded-2xl shadow-xl text-white">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      💍 Bachelor/Bachelorette Parties
                    </h3>
                    <p className="text-lg md:text-xl font-medium">
                      Planning a bachelor or bachelorette party? Book a Disco Cruise and add the <strong>Disco Crew option</strong> for the ultimate party experience! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Presentation & Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.5 }}
              className="w-full mb-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column: Gamma Presentation */}
                <div className="w-full">
                  <a 
                    href="https://gamma.app/docs/Austins-Premier-Bachelor-Bachelorette-Party-Experience-v9da225x03y1173" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center mb-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                    data-testid="link-presentation-fullsize"
                  >
                    📖 Click to view presentation in full size
                  </a>
                  <iframe 
                    src="https://gamma.app/embed/v9da225x03y1173" 
                    style={{ width: '100%', maxWidth: '100%', height: '450px' }}
                    allow="fullscreen" 
                    title="Austin's Premier Bachelor & Bachelorette Party Experience"
                    className="rounded-lg shadow-xl"
                    data-testid="iframe-gamma-presentation"
                  />
                </div>
                
                {/* Right Column: YouTube Video */}
                <div className="w-full">
                  <iframe 
                    src="https://www.youtube.com/embed/vxy8JM5TMmA"
                    style={{ width: '100%', height: '450px' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Premier Party Cruises Video"
                    className="rounded-lg shadow-xl"
                    data-testid="iframe-youtube-video"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Quote Builder Iframe */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full mb-8"
            >
              <div 
                id="quote-widget-container" 
                className="w-full relative"
                style={{ minHeight: '700px', margin: '2rem 0' }}
              >
                <iframe 
                  id="quote-widget-iframe"
                  title="Get Your Quote - Premier Party Cruises"
                  className="w-full"
                  style={{ 
                    height: '700px',
                    maxHeight: '700px',
                    border: 'none',
                    display: 'block',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden'
                  }}
                  allow="payment"
                  data-testid="iframe-quote-builder"
                />
              </div>
            </motion.div>

            {/* Friend Referral Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-4 md:p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Share the Golden Ticket! 🎁
                </h2>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                  Enter your friends' details below to send them their $300 gift cards
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* Friend #1 Form */}
                <div className="p-3 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Gift className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                    Friend #1
                  </h3>
                  <div className="scale-95 md:scale-100 origin-top">
                    <iframe
                      src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                      style={{ width: '100%', height: '400px', border: 'none', borderRadius: '3px' }}
                      className="md:h-[456px]"
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
                </div>

                {/* Friend #2 Form */}
                <div className="p-3 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Gift className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                    Friend #2
                  </h3>
                  <div className="scale-95 md:scale-100 origin-top">
                    <iframe
                      src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                      style={{ width: '100%', height: '400px', border: 'none', borderRadius: '3px' }}
                      className="md:h-[456px]"
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
                </div>

                {/* Friend #3 Form */}
                <div className="p-3 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Gift className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                    Friend #3
                  </h3>
                  <div className="scale-95 md:scale-100 origin-top">
                    <iframe
                      src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                      style={{ width: '100%', height: '400px', border: 'none', borderRadius: '3px' }}
                      className="md:h-[456px]"
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
                </div>

                {/* Friend #4 Form */}
                <div className="p-3 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Gift className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                    Friend #4
                  </h3>
                  <div className="scale-95 md:scale-100 origin-top">
                    <iframe
                      src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                      style={{ width: '100%', height: '400px', border: 'none', borderRadius: '3px' }}
                      className="md:h-[456px]"
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
                </div>

                {/* Friend #5 Form */}
                <div className="p-3 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Gift className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                    Friend #5
                  </h3>
                  <div className="scale-95 md:scale-100 origin-top">
                    <iframe
                      src="https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh"
                      style={{ width: '100%', height: '400px', border: 'none', borderRadius: '3px' }}
                      className="md:h-[456px]"
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}
