import { useState } from 'react';

export default function BookNow() {
  const [activeTab, setActiveTab] = useState('14p');
  const [discoTab, setDiscoTab] = useState('super-sparkle');

  const tabs = [
    { id: '14p', name: '14-Person Boat' },
    { id: '25p', name: '25-Person Boat' },
    { id: '50p', name: '50-Person Boat' },
    { id: 'disco', name: 'ATX Disco Cruises' }
  ];

  const discoTabs = [
    { id: 'basic-bach', name: 'Basic Bach' },
    { id: 'disco-queen', name: 'Disco Queen' },
    { id: 'super-sparkle', name: 'Super Sparkle Platinum' }
  ];

  return (
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

        {/* Disco Sub-tabs */}
        {activeTab === 'disco' && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {discoTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setDiscoTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  discoTab === tab.id
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                data-testid={`disco-tab-${tab.id}`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}

        {/* Widget Container - ALL divs exist, use CSS to show/hide */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-8" style={{ minHeight: '600px' }}>
          
          {/* 14-Person Boat */}
          <div style={{ display: activeTab === '14p' ? 'block' : 'none' }}>
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d0012c2afc7d8d70e285"></div>
          </div>

          {/* 25-Person Boat */}
          <div style={{ display: activeTab === '25p' ? 'block' : 'none' }}>
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d2b74e1de53cee29395e"></div>
          </div>

          {/* 50-Person Boat */}
          <div style={{ display: activeTab === '50p' ? 'block' : 'none' }}>
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="64c7d4f01be574411500cf62"></div>
          </div>

          {/* Disco Packages */}
          <div style={{ display: activeTab === 'disco' && discoTab === 'basic-bach' ? 'block' : 'none' }}>
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676fe4a7ff119f53c4063c1b"></div>
          </div>

          <div style={{ display: activeTab === 'disco' && discoTab === 'disco-queen' ? 'block' : 'none' }}>
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676f0bc68ff6dfb29009b5ad"></div>
          </div>

          <div style={{ display: activeTab === 'disco' && discoTab === 'super-sparkle' ? 'block' : 'none' }}>
            <div className="xola-embedded-checkout" data-seller="64c43a70daa3e618b7229ddf" data-version="2" data-experience="676f0ceaa3744b05ae09e9de"></div>
          </div>

        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    XolaCheckout?: any;
  }
}
