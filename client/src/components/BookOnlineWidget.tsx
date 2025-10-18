import { useState } from 'react';
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
                className={`flex-1 min-w-[90px] md:min-w-[140px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  activeTab === 'disco'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
                data-testid="tab-disco"
              >
                ATX Disco Cruise
              </button>
            </div>

            {/* Disco Package Sub-tabs */}
            {activeTab === 'disco' && (
              <div className="flex flex-wrap gap-2 md:gap-3 pl-0 md:pl-4">
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

            {/* BLANK CONTENT AREAS - READY FOR YOUR EMBED CODES */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              
              {/* 14-Person Boat */}
              {activeTab === '14p' && (
                <div className="p-8" data-testid="content-14p">
                  {/* YOUR 14-PERSON BOAT EMBED CODE GOES HERE */}
                </div>
              )}

              {/* 25-Person Boat */}
              {activeTab === '25p' && (
                <div className="p-8" data-testid="content-25p">
                  {/* YOUR 25-PERSON BOAT EMBED CODE GOES HERE */}
                </div>
              )}

              {/* 50-Person Boat */}
              {activeTab === '50p' && (
                <div className="p-8" data-testid="content-50p">
                  {/* YOUR 50-PERSON BOAT EMBED CODE GOES HERE */}
                </div>
              )}

              {/* Disco Packages */}
              {activeTab === 'disco' && activeDiscoPackage === 'basic-bach' && (
                <div className="p-8" data-testid="content-disco-basic">
                  {/* YOUR BASIC BACH PACKAGE EMBED CODE GOES HERE */}
                </div>
              )}

              {activeTab === 'disco' && activeDiscoPackage === 'disco-queen' && (
                <div className="p-8" data-testid="content-disco-queen">
                  {/* YOUR DISCO QUEEN PACKAGE EMBED CODE GOES HERE */}
                </div>
              )}

              {activeTab === 'disco' && activeDiscoPackage === 'super-sparkle' && (
                <div className="p-8" data-testid="content-disco-sparkle">
                  {/* YOUR SUPER SPARKLE PLATINUM EMBED CODE GOES HERE */}
                </div>
              )}

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
