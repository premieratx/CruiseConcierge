import UniversalCalendar from '@/components/UniversalCalendar';
import { SEOHead } from '@/components/SEOHead';

// PublicCalendar is now a simple wrapper around UniversalCalendar
// All functionality has been moved to the universal component

export default function PublicCalendar() {
  // Get URL params for initial state
  const urlParams = new URLSearchParams(window.location.search);
  const initialGroupSize = parseInt(urlParams.get('groupSize') || '20');
  const initialEventType = (urlParams.get('eventType') || 'other') as 'private' | 'bachelor' | 'bachelorette';

  return (
    <>
      <SEOHead 
        title="Book Your Austin Party Boat - Available Times | Premier Party Cruises"
        description="View real-time availability and book your Austin party boat cruise. Choose from private boats holding 14-75 people. Live pricing and instant booking."
        keywords="austin party boat booking, lake travis boat rental, available times, book cruise austin"
      />
      
      <UniversalCalendar
        defaultGroupSize={initialGroupSize}
        defaultEventType={initialEventType === 'bachelor' || initialEventType === 'bachelorette' ? initialEventType : 'private'}
        showEventTypeSelector={true}
        mode="full"
        embedMode={false}
        entryPoint="public_calendar"
        className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50"
      />
    </>
  );
}