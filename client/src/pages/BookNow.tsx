import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useXolaEmbed } from '@/hooks/useXolaEmbed';
import { DISCO_TIME_SLOTS } from '@shared/constants';

export default function BookNow() {
  const [activeTab, setActiveTab] = useState('14p');
  const [discoTimeSlot, setDiscoTimeSlot] = useState('saturday-330-730pm');
  const xolaRef = useRef<HTMLDivElement>(null);
  
  // Initialize Xola widget - same as home page
  useXolaEmbed(xolaRef, [activeTab, discoTimeSlot]);

  const tabs = [
    { id: '14p', name: '14-Person Boat' },
    { id: '25p', name: '25-Person Boat' },
    { id: '50p', name: '50-Person Boat' },
    { id: 'disco', name: 'ATX Disco Cruises' }
  ];

  return (
    <>
      <Helmet>
        <title>Book Now | Lake Travis Party Boats Austin</title>
        <meta name="description" content="Book Austin party boat instantly! Choose 14, 25, or 50-person boats plus ATX Disco Cruise. Secure online booking for Lake Travis cruises." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="container mx-auto px-4 py-12">
          
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Book Your Cruise Online
          </h1>

        {/* Main Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              data-testid={`tab-${tab.id}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Disco Time Slot Sub-tabs */}
        {activeTab === 'disco' && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {DISCO_TIME_SLOTS.map(slot => (
              <button
                key={slot.id}
                onClick={() => setDiscoTimeSlot(slot.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  discoTimeSlot === slot.id
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                data-testid={`disco-tab-${slot.id}`}
              >
                {slot.label}
                {slot.badge && <span className="block text-xs mt-1">{slot.badge}</span>}
              </button>
            ))}
          </div>
        )}

        {/* Widget Container - EXACTLY like home page */}
        <div ref={xolaRef} className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-8" style={{ minHeight: '600px' }}>
          
          {activeTab === '14p' && (
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d0012c2afc7d8d70e285"></div>
          )}

          {activeTab === '25p' && (
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d2b74e1de53cee29395e"></div>
          )}

          {activeTab === '50p' && (
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d4f01be574411500cf62"></div>
          )}

          {activeTab === 'disco' && discoTimeSlot === 'friday-12-4pm' && (
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676fe4a7ff119f53c4063c1b"></div>
          )}

          {activeTab === 'disco' && discoTimeSlot === 'saturday-11am-3pm' && (
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676f0bc68ff6dfb29009b5ad"></div>
          )}

          {activeTab === 'disco' && discoTimeSlot === 'saturday-330-730pm' && (
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676f0ceaa3744b05ae09e9de"></div>
          )}

        </div>
      </div>
    </div>
    </>
  );
}
