import { useEffect, useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getWeekCacheKey, getWeekStart } from './use-availability';

export interface SSECacheInvalidationEvent {
  type: 'booking_created' | 'admin_booking_created' | 'disco_tickets_purchased';
  slotId?: string;
  eventDate?: string;
  boatId?: string;
  startTime?: string;
  endTime?: string;
  weekStart?: string;
  discoSlotId?: string;
  ticketsSold?: number;
}

export interface SSEConnection {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
}

/**
 * Custom hook for Server-Sent Events (SSE) cache invalidation
 * Connects to the backend SSE endpoint and invalidates TanStack Query keys
 * when real-time booking events occur (Stripe payments, admin bookings, disco tickets)
 */
export const useSSE = (): SSEConnection => {
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleCacheInvalidation = useCallback((event: SSECacheInvalidationEvent) => {
    console.log(`🚨 SSE Cache Invalidation Event:`, event);
    
    try {
      switch (event.type) {
        case 'booking_created':
        case 'admin_booking_created': {
          if (event.weekStart && event.eventDate) {
            // Invalidate week-based availability caches
            const weekCacheKeys = [
              getWeekCacheKey(event.weekStart),
              getWeekCacheKey(event.weekStart, 'private'),
            ];
            
            console.log(`📅 Invalidating availability caches for week ${event.weekStart}`);
            weekCacheKeys.forEach(key => {
              queryClient.invalidateQueries({ queryKey: key });
            });
            
            // Invalidate admin calendar data for the affected month
            const eventDate = new Date(event.eventDate);
            const monthKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
            queryClient.invalidateQueries({ queryKey: ['/api/admin/calendar', monthKey] });
            
            // Invalidate bookings queries
            queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
            queryClient.invalidateQueries({ queryKey: ['/api/admin/bookings'] });
            
            console.log(`✅ Private booking cache invalidation complete for ${event.slotId}`);
          }
          break;
        }
        
        case 'disco_tickets_purchased': {
          if (event.eventDate && event.discoSlotId) {
            // Invalidate disco-specific caches
            const eventDate = new Date(event.eventDate);
            const monthKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
            const yearKey = eventDate.getFullYear();
            
            console.log(`🎫 Invalidating disco caches for ${event.discoSlotId} (${event.ticketsSold} tickets sold)`);
            
            // Invalidate disco slot queries
            queryClient.invalidateQueries({ queryKey: ['/api/disco/slots'] });
            queryClient.invalidateQueries({ queryKey: ['/api/disco/slots', yearKey, monthKey] });
            
            // Invalidate week availability for disco
            const weekStart = getWeekStart(event.eventDate);
            const discoCacheKeys = [
              getWeekCacheKey(weekStart, 'disco'),
              getWeekCacheKey(weekStart), // All slots
            ];
            
            discoCacheKeys.forEach(key => {
              queryClient.invalidateQueries({ queryKey: key });
            });
            
            console.log(`✅ Disco ticket cache invalidation complete for ${event.discoSlotId}`);
          }
          break;
        }
        
        default:
          console.warn(`⚠️ Unknown SSE event type: ${event.type}`);
      }
      
      // Always invalidate general queries that might be affected
      queryClient.invalidateQueries({ queryKey: ['/api/availability'] });
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      
    } catch (error) {
      console.error(`❌ Error handling SSE cache invalidation:`, error);
    }
  }, [queryClient]);
  
  const connect = useCallback(() => {
    if (eventSourceRef.current?.readyState === EventSource.OPEN) {
      console.log(`🔗 SSE already connected`);
      return;
    }
    
    try {
      console.log(`🔌 Connecting to SSE endpoint...`);
      const eventSource = new EventSource('/api/events/sse', {
        withCredentials: true
      });
      
      eventSource.onopen = () => {
        console.log(`✅ SSE connection established`);
        setIsConnected(true);
        
        // Clear any pending reconnection attempts
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };
      
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle different message types
          if (data.type === 'connected') {
            console.log(`🎯 SSE client registered: ${data.clientId}`);
          } else if (data.type === 'heartbeat') {
            // Heartbeat - no action needed, just validates connection
          } else if (data.type && ['booking_created', 'admin_booking_created', 'disco_tickets_purchased'].includes(data.type)) {
            // Cache invalidation event
            handleCacheInvalidation(data as SSECacheInvalidationEvent);
          } else {
            console.log(`📡 SSE event:`, data);
          }
        } catch (error) {
          console.error(`❌ Error parsing SSE message:`, error, event.data);
        }
      };
      
      eventSource.onerror = (error) => {
        console.error(`❌ SSE connection error:`, error);
        setIsConnected(false);
        
        // Attempt reconnection after 5 seconds if not manually disconnected
        if (eventSourceRef.current === eventSource) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`🔄 Attempting SSE reconnection...`);
            disconnect();
            connect();
          }, 5000);
        }
      };
      
      eventSourceRef.current = eventSource;
      
    } catch (error) {
      console.error(`❌ Failed to establish SSE connection:`, error);
      setIsConnected(false);
    }
  }, [handleCacheInvalidation]);
  
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (eventSourceRef.current) {
      console.log(`🔌 Disconnecting SSE...`);
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  }, []);
  
  // Auto-connect on mount and clean up on unmount
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  
  // Handle page visibility changes (reconnect when user returns to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isConnected) {
        console.log(`👁️ Page visible again, reconnecting SSE...`);
        connect();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [connect, isConnected]);
  
  return {
    connect,
    disconnect,
    isConnected
  };
};

/**
 * Utility hook for components that need SSE but don't need direct control
 * Just call this in your component to automatically get real-time updates
 */
export const useSSEAutoConnect = () => {
  const { isConnected } = useSSE();
  return { isConnected };
};