import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock } from 'lucide-react';

interface BookOnlineWidgetProps {
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

export default function BookOnlineWidget({ defaultBoatType = '14p' }: BookOnlineWidgetProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultBoatType);
  const [activeDiscoPackage, setActiveDiscoPackage] = useState<string>('super-sparkle');
  const [mountKey, setMountKey] = useState(0);

  // checkout.js (loaded in Footer) automatically finds and renders all .xola-embedded-checkout divs
  // No manual initialization needed

  // Xola experience IDs
  const xolaConfig = {
    seller: '64c43a70daa3e618b7229ddf',
    experiences: {
      '14p': '64c7d0012c2afc7d8d70e285',
      '25p': '64c7d2b74e1de53cee29395e',
      '50p': '64c7d4f01be574411500cf62',
      'basic-bach': '676fe4a7ff119f53c4063c1b',
      'disco-queen': '676f0bc68ff6dfb29009b5ad',
      'super-sparkle': '676f0ceaa3744b05ae09e9de',
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-yellow-50">
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
                <Ship className="h-5 w-5 text-blue-600" />
                <span>Premium Fleet</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>300+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>15 Years Excellence</span>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="space-y-2 md:space-y-6">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setActiveTab('14p')}
                className={`flex-1 min-w-[90px] md:min-w-[140px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
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
                className={`flex-1 min-w-[90px] md:min-w-[140px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
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
                className={`flex-1 min-w-[90px] md:min-w-[140px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
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
                className={`flex-1 min-w-[90px] md:min-w-[140px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all flex flex-col items-center justify-center ${
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

            {/* Disco Package Sub-tabs */}
            {activeTab === 'disco' && (
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button
                  onClick={() => setActiveDiscoPackage('basic-bach')}
                  className={`flex-1 min-w-[100px] md:min-w-[160px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                    activeDiscoPackage === 'basic-bach'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 shadow'
                  }`}
                  data-testid="tab-disco-basic"
                >
                  Basic Bach Package
                </button>
                <button
                  onClick={() => setActiveDiscoPackage('disco-queen')}
                  className={`flex-1 min-w-[100px] md:min-w-[160px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                    activeDiscoPackage === 'disco-queen'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 shadow'
                  }`}
                  data-testid="tab-disco-queen"
                >
                  Disco Queen Package
                </button>
                <button
                  onClick={() => setActiveDiscoPackage('super-sparkle')}
                  className={`flex-1 min-w-[100px] md:min-w-[160px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                    activeDiscoPackage === 'super-sparkle'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 shadow'
                  }`}
                  data-testid="tab-disco-sparkle"
                >
                  Super Sparkle Platinum
                </button>
              </div>
            )}

            {/* Xola Direct Link Buttons - Opens Xola checkout in new window */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-12" style={{ minHeight: '600px' }}>
              {activeTab === '14p' && (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Book Your 14-Person Boat</h3>
                  <p className="text-gray-600">Select your date and complete your booking</p>
                  <a
                    href={`https://premierpartycruises.xola.com/experiences/${xolaConfig.experiences['14p']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                    data-testid="button-14p"
                  >
                    Continue to Booking →
                  </a>
                </div>
              )}

              {activeTab === '25p' && (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Book Your 25-Person Boat</h3>
                  <p className="text-gray-600">Select your date and complete your booking</p>
                  <a
                    href={`https://premierpartycruises.xola.com/experiences/${xolaConfig.experiences['25p']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                    data-testid="button-25p"
                  >
                    Continue to Booking →
                  </a>
                </div>
              )}

              {activeTab === '50p' && (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Book Your 50-Person Boat</h3>
                  <p className="text-gray-600">Select your date and complete your booking</p>
                  <a
                    href={`https://premierpartycruises.xola.com/experiences/${xolaConfig.experiences['50p']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                    data-testid="button-50p"
                  >
                    Continue to Booking →
                  </a>
                </div>
              )}

              {activeTab === 'disco' && activeDiscoPackage === 'basic-bach' && (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Book Basic Bach Package</h3>
                  <p className="text-gray-600">Select your date and complete your booking</p>
                  <a
                    href={`https://premierpartycruises.xola.com/experiences/${xolaConfig.experiences['basic-bach']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                    data-testid="button-disco-basic"
                  >
                    Continue to Booking →
                  </a>
                </div>
              )}

              {activeTab === 'disco' && activeDiscoPackage === 'disco-queen' && (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Book Disco Queen Package</h3>
                  <p className="text-gray-600">Select your date and complete your booking</p>
                  <a
                    href={`https://premierpartycruises.xola.com/experiences/${xolaConfig.experiences['disco-queen']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                    data-testid="button-disco-queen"
                  >
                    Continue to Booking →
                  </a>
                </div>
              )}

              {activeTab === 'disco' && activeDiscoPackage === 'super-sparkle' && (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Book Super Sparkle Platinum</h3>
                  <p className="text-gray-600">Select your date and complete your booking</p>
                  <a
                    href={`https://premierpartycruises.xola.com/experiences/${xolaConfig.experiences['super-sparkle']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                    data-testid="button-disco-sparkle"
                  >
                    Continue to Booking →
                  </a>
                </div>
              )}
            </div>
          </div>

        </motion.div>
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
