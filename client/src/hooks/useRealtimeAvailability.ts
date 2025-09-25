import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSSE } from './use-sse';
import { useToast } from './use-toast';
import { getWeekCacheKey, getWeekStart } from './use-availability';

export interface AvailabilityRealtimeEvent {
  type: 'booking_created' | 'admin_booking_created' | 'disco_tickets_purchased' | 'availability_changed' | 'cache_invalidate';
  slotId?: string;
  eventDate?: string;
  boatId?: string;
  startTime?: string;
  endTime?: string;
  weekStart?: string;
  discoSlotId?: string;
  ticketsSold?: number;
  timestamp?: string;
  data?: any;
}

export interface AvailabilityUpdate {
  id: string;
  type: AvailabilityRealtimeEvent['type'];
  eventDate: string;
  slotId?: string;
  boatId?: string;
  message: string;
  timestamp: Date;
}

export interface UseRealtimeAvailabilityResult {
  recentUpdates: AvailabilityUpdate[];
  isConnected: boolean;
  invalidateAvailability: (date?: string) => void;
  clearUpdates: () => void;
}

/**
 * Hook for subscribing to real-time availability changes and managing cache invalidation
 * Specifically handles booking confirmations, admin bookings, and disco ticket sales
 * 
 * @example
 * ```tsx
 * function CalendarView() {
 *   const { recentUpdates, isConnected, invalidateAvailability } = useRealtimeAvailability();
 *   
 *   return (
 *     <div>
 *       <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
 *         {isConnected ? '🟢 Live Updates' : '🔴 Disconnected'}
 *       </div>
 *       {recentUpdates.map(update => (
 *         <div key={update.id} className="availability-update">
 *           {update.message}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export const useRealtimeAvailability = (options?: {
  showToasts?: boolean;
  maxUpdates?: number;
  targetDate?: string; // Only show updates for specific date
}): UseRealtimeAvailabilityResult => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isConnected } = useSSE();
  
  const showToasts = options?.showToasts ?? false; // Default to false for availability updates
  const maxUpdates = options?.maxUpdates ?? 20;
  const targetDate = options?.targetDate;
  
  const [recentUpdates, setRecentUpdates] = useState<AvailabilityUpdate[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const updateIdCounter = useRef(0);

  const createAvailabilityUpdate = useCallback((event: AvailabilityRealtimeEvent): AvailabilityUpdate => {
    const id = `availability-${++updateIdCounter.current}-${Date.now()}`;
    
    let message = '';
    let eventDate = event.eventDate || new Date().toISOString().split('T')[0];
    
    switch (event.type) {
      case 'booking_created':
        message = `Private cruise booking confirmed${event.boatId ? ` on ${event.boatId}` : ''}`;
        break;
      case 'admin_booking_created':
        message = `Manual booking created${event.boatId ? ` on ${event.boatId}` : ''}`;
        break;
      case 'disco_tickets_purchased':
        message = `${event.ticketsSold || 'Some'} disco tickets sold`;
        break;
      case 'availability_changed':
        message = `Availability updated${event.slotId ? ` for slot ${event.slotId}` : ''}`;
        break;
      case 'cache_invalidate':
        message = 'Availability data refreshed';
        break;
      default:
        message = 'Availability changed';
    }

    return {
      id,
      type: event.type,
      eventDate,
      slotId: event.slotId,
      boatId: event.boatId,
      message,
      timestamp: new Date(event.timestamp || Date.now())
    };
  }, []);

  const invalidateAvailability = useCallback((date?: string) => {
    // Invalidate general availability queries
    queryClient.invalidateQueries({ queryKey: ['/api/availability'] });
    queryClient.invalidateQueries({ queryKey: ['availability'] });
    
    // Invalidate week-based caches
    const targetWeekStart = date ? getWeekStart(date) : getWeekStart(new Date().toISOString());
    const weekCacheKeys = [
      getWeekCacheKey(targetWeekStart),
      getWeekCacheKey(targetWeekStart, 'private'),
      getWeekCacheKey(targetWeekStart, 'disco'),
    ];
    
    weekCacheKeys.forEach(key => {
      queryClient.invalidateQueries({ queryKey: key });
    });
    
    // Invalidate admin calendar data
    if (date) {
      const eventDate = new Date(date);
      const monthKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
      queryClient.invalidateQueries({ queryKey: ['/api/admin/calendar', monthKey] });
    }
    
    // Invalidate bookings and disco slots
    queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    queryClient.invalidateQueries({ queryKey: ['/api/admin/bookings'] });
    queryClient.invalidateQueries({ queryKey: ['/api/disco/slots'] });
    
    console.log('🔄 Availability cache invalidated', { date, targetWeekStart });
  }, [queryClient]);

  const addAvailabilityUpdate = useCallback((event: AvailabilityRealtimeEvent) => {
    // Filter by target date if specified
    if (targetDate && event.eventDate && event.eventDate !== targetDate) {
      return; // Skip events not for our target date
    }
    
    const update = createAvailabilityUpdate(event);
    
    setRecentUpdates(prev => {
      const updated = [update, ...prev].slice(0, maxUpdates);
      return updated;
    });

    // Show toast notification if enabled
    if (showToasts) {
      toast({
        title: 'Availability Updated',
        description: update.message,
        duration: 3000,
      });
    }

    // Invalidate relevant availability caches
    invalidateAvailability(event.eventDate);
    
    console.log('📅 Availability update processed:', update);
  }, [createAvailabilityUpdate, maxUpdates, showToasts, toast, invalidateAvailability, targetDate]);

  const clearUpdates = useCallback(() => {
    setRecentUpdates([]);
  }, []);

  // Listen for availability-related SSE events
  const handleSSEMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type && ['booking_created', 'admin_booking_created', 'disco_tickets_purchased', 'availability_changed', 'cache_invalidate'].includes(data.type)) {
        addAvailabilityUpdate(data as AvailabilityRealtimeEvent);
      }
    } catch (error) {
      console.error('❌ Error parsing availability SSE message:', error);
    }
  }, [addAvailabilityUpdate]);

  // Subscribe to SSE events on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const eventSource = new EventSource('/api/events/sse', {
          withCredentials: true
        });
        
        eventSource.addEventListener('message', handleSSEMessage);
        eventSourceRef.current = eventSource;
        
        console.log('🔗 Availability SSE listener connected');
        
        return () => {
          eventSource.removeEventListener('message', handleSSEMessage);
          eventSource.close();
          eventSourceRef.current = null;
          console.log('🔌 Availability SSE listener disconnected');
        };
      } catch (error) {
        console.error('❌ Failed to establish availability SSE connection:', error);
      }
    }
  }, [handleSSEMessage]);

  return {
    recentUpdates,
    isConnected,
    invalidateAvailability,
    clearUpdates,
  };
};

/**
 * Simplified hook that just handles cache invalidation without tracking updates
 * Useful for components that need reactive data but don't show update notifications
 * 
 * @example
 * ```tsx
 * function BookingWidget() {
 *   useRealtimeAvailabilitySync(); // Just keep data fresh
 *   
 *   const { data: availability } = useQuery({
 *     queryKey: ['/api/availability', selectedDate],
 *     // ... query config
 *   });
 *   
 *   return <AvailabilityGrid data={availability} />;
 * }
 * ```
 */
export const useRealtimeAvailabilitySync = (targetDate?: string) => {
  const { isConnected, invalidateAvailability } = useRealtimeAvailability({ 
    showToasts: false,
    maxUpdates: 0, // Don't track updates
    targetDate 
  });
  
  return { isConnected, invalidateAvailability };
};