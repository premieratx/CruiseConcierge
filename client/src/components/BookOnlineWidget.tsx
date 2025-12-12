import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { Ship, Star, CheckCircle, Clock } from 'lucide-react';
import { useXolaEmbed } from '@/hooks/useXolaEmbed';
import { DISCO_TIME_SLOTS } from '@shared/constants';

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
  const [activeDiscoTimeSlot, setActiveDiscoTimeSlot] = useState<string>('saturday-330-730pm');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Re-initialize Xola whenever tabs change
  useXolaEmbed(containerRef, [activeTab, activeDiscoTimeSlot]);

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
              loading="eager"
              width={80}
              height={80}
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
                <span>150,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>150,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Ship className="h-5 w-5 text-blue-600" />
                <span>Captained Boats for 14-75 Guests</span>
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

            {/* Disco Time Slot Sub-tabs */}
            {activeTab === 'disco' && (
              <div className="flex flex-wrap gap-2 md:gap-3 pl-0 md:pl-4">
                {DISCO_TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setActiveDiscoTimeSlot(slot.id)}
                    className={`flex-1 min-w-[100px] md:min-w-[160px] px-2 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
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

            {/* Xola Widget Container */}
            <div ref={containerRef} className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              
              {/* 14-Person Boat */}
              {activeTab === '14p' && (
                <div className="p-8" data-testid="content-14p">
                  <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d0012c2afc7d8d70e285"></div>
                </div>
              )}

              {/* 25-Person Boat */}
              {activeTab === '25p' && (
                <div className="p-8" data-testid="content-25p">
                  <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d2b74e1de53cee29395e"></div>
                </div>
              )}

              {/* 50-Person Boat */}
              {activeTab === '50p' && (
                <div className="p-8" data-testid="content-50p">
                  <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d4f01be574411500cf62"></div>
                </div>
              )}

              {/* Disco Time Slots */}
              {activeTab === 'disco' && activeDiscoTimeSlot === 'friday-12-4pm' && (
                <div className="p-8" data-testid="content-disco-friday">
                  <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676fe4a7ff119f53c4063c1b"></div>
                </div>
              )}

              {activeTab === 'disco' && activeDiscoTimeSlot === 'saturday-11am-3pm' && (
                <div className="p-8" data-testid="content-disco-saturday-morning">
                  <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676f0bc68ff6dfb29009b5ad"></div>
                </div>
              )}

              {activeTab === 'disco' && activeDiscoTimeSlot === 'saturday-330-730pm' && (
                <div className="p-8" data-testid="content-disco-saturday-afternoon">
                  <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676f0ceaa3744b05ae09e9de"></div>
                </div>
              )}

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
