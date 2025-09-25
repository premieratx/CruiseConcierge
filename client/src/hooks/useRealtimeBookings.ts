import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSSE } from './use-sse';
import { useToast } from './use-toast';

export interface BookingRealtimeEvent {
  type: 'quote_created' | 'booking_confirmed' | 'admin_booking_created' | 'lead_updated';
  quoteId?: string;
  leadId?: string;
  contactId?: string;
  projectId?: string;
  bookingId?: string;
  customerName?: string;
  customerEmail?: string;
  eventTitle?: string;
  eventDate?: string;
  amount?: number;
  leadStatus?: string;
  timestamp?: string;
  data?: any;
}

export interface BookingNotification {
  id: string;
  type: BookingRealtimeEvent['type'];
  title: string;
  message: string;
  timestamp: Date;
  data: any;
  read: boolean;
}

export interface UseRealtimeBookingsResult {
  notifications: BookingNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  isConnected: boolean;
}

/**
 * Hook for subscribing to real-time booking events and managing notifications
 * 
 * @example
 * ```tsx
 * function Dashboard() {
 *   const { notifications, unreadCount, markAsRead, isConnected } = useRealtimeBookings();
 *   
 *   return (
 *     <div>
 *       <Badge variant={unreadCount > 0 ? "destructive" : "secondary"}>
 *         {unreadCount} new notifications
 *       </Badge>
 *       {notifications.map(notification => (
 *         <NotificationCard key={notification.id} notification={notification} onRead={markAsRead} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export const useRealtimeBookings = (options?: {
  showToasts?: boolean;
  maxNotifications?: number;
}): UseRealtimeBookingsResult => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isConnected } = useSSE();
  
  const showToasts = options?.showToasts ?? true;
  const maxNotifications = options?.maxNotifications ?? 50;
  
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const notificationIdCounter = useRef(0);

  const createNotification = useCallback((event: BookingRealtimeEvent): BookingNotification => {
    const id = `booking-${++notificationIdCounter.current}-${Date.now()}`;
    
    let title = '';
    let message = '';
    
    switch (event.type) {
      case 'quote_created':
        title = 'New Quote Created';
        message = `Quote created for ${event.customerName || 'customer'}${event.eventTitle ? ` - ${event.eventTitle}` : ''}`;
        break;
      case 'booking_confirmed':
        title = 'Booking Confirmed';
        message = `Payment confirmed for ${event.customerName || 'customer'}${event.amount ? ` - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(event.amount / 100)}` : ''}`;
        break;
      case 'admin_booking_created':
        title = 'Manual Booking Created';
        message = `Admin booking created${event.eventTitle ? ` - ${event.eventTitle}` : ''}`;
        break;
      case 'lead_updated':
        title = 'Lead Updated';
        message = `Lead status updated${event.leadStatus ? ` to ${event.leadStatus}` : ''}${event.customerName ? ` for ${event.customerName}` : ''}`;
        break;
      default:
        title = 'Booking Update';
        message = 'A booking-related event occurred';
    }

    return {
      id,
      type: event.type,
      title,
      message,
      timestamp: new Date(event.timestamp || Date.now()),
      data: event,
      read: false
    };
  }, []);

  const addNotification = useCallback((event: BookingRealtimeEvent) => {
    const notification = createNotification(event);
    
    setNotifications(prev => {
      const updated = [notification, ...prev].slice(0, maxNotifications);
      return updated;
    });

    // Show toast notification if enabled
    if (showToasts) {
      toast({
        title: notification.title,
        description: notification.message,
        duration: 5000,
      });
    }

    // Invalidate relevant queries
    queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
    queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
    queryClient.invalidateQueries({ queryKey: ['/api/admin/leads'] });
    
    console.log('📨 Booking notification added:', notification);
  }, [createNotification, maxNotifications, showToasts, toast, queryClient]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Listen for booking-related SSE events
  const handleSSEMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type && ['quote_created', 'booking_confirmed', 'admin_booking_created', 'lead_updated'].includes(data.type)) {
        addNotification(data as BookingRealtimeEvent);
      }
    } catch (error) {
      console.error('❌ Error parsing booking SSE message:', error);
    }
  }, [addNotification]);

  // Subscribe to SSE events on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const eventSource = new EventSource('/api/events/sse', {
          withCredentials: true
        });
        
        eventSource.addEventListener('message', handleSSEMessage);
        eventSourceRef.current = eventSource;
        
        console.log('🔗 Booking SSE listener connected');
        
        return () => {
          eventSource.removeEventListener('message', handleSSEMessage);
          eventSource.close();
          eventSourceRef.current = null;
          console.log('🔌 Booking SSE listener disconnected');
        };
      } catch (error) {
        console.error('❌ Failed to establish booking SSE connection:', error);
      }
    }
  }, [handleSSEMessage]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    isConnected,
  };
};

/**
 * Simplified hook that just tracks unread booking notifications count
 * Useful for displaying notification badges without full notification management
 * 
 * @example
 * ```tsx
 * function NotificationBadge() {
 *   const { unreadCount } = useRealtimeBookingNotifications();
 *   
 *   return unreadCount > 0 ? (
 *     <Badge variant="destructive">{unreadCount}</Badge>
 *   ) : null;
 * }
 * ```
 */
export const useRealtimeBookingNotifications = () => {
  const { unreadCount, isConnected } = useRealtimeBookings({ 
    showToasts: false,
    maxNotifications: 20 
  });
  
  return { unreadCount, isConnected };
};