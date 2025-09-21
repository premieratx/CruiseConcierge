import UniversalCalendar from '@/components/UniversalCalendar';
// import { SEOHead } from '@/components/SEOHead'; // Temporarily disabled

// PublicCalendar is now a simple wrapper around UniversalCalendar
// All functionality has been moved to the universal component

export default function PublicCalendar() {
  // Get URL params for initial state
  const urlParams = new URLSearchParams(window.location.search);
  const initialGroupSize = parseInt(urlParams.get('groupSize') || '20');
  const initialEventType = (urlParams.get('eventType') || 'other') as 'private' | 'bachelor' | 'bachelorette';

  return (
    <>
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