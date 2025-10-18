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

  // Determine which widget URL to show
  let widgetUrl = '';
  if (activeTab === 'disco') {
    widgetUrl = `/widgets/${discoTab}.html`;
  } else {
    widgetUrl = `/widgets/${activeTab}.html`;
  }

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

        {/* Widget iframe */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <iframe
            key={widgetUrl}
            src={widgetUrl}
            style={{
              width: '100%',
              minHeight: '700px',
              border: 'none'
            }}
            title="Booking Widget"
          />
        </div>
      </div>
    </div>
  );
}
