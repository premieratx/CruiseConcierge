import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { calculateSimplePricing } from '@shared/pricing';
import { apiRequest } from '@/lib/queryClient';

// Types for our cached state
interface BookingSelections {
  date: string;
  groupSize: number;
  cruiseType: 'private' | 'disco';
  boatId?: string;
  slotId?: string;
  timeSlot?: string;
  selectedAddOns: string[];
  discoPackage?: string;
  discoTicketQuantity?: number;
  discountCode?: string;
  eventType?: string;
}

interface StaticData {
  boats: any[];
  products: any[];
  pricingRulesVersion: string;
  lastUpdated: number;
}

interface AvailabilitySlot {
  id: string;
  dateISO: string;
  startTime: string;
  endTime: string;
  duration: number;
  boatId: string;
  boatName: string;
  capacity: number;
  basePrice: number;
  available: boolean;
  held?: boolean;
}

interface AvailabilityCacheEntry {
  slots: AvailabilitySlot[];
  fetchedAt: number;
  etag?: string;
  ttlMs: number;
}

interface ComputedPricing {
  subtotal: number;
  tax: number;
  gratuity: number;
  total: number;
  depositAmount: number;
  depositPercent: number;
  duration: number;
  hourlyRate: number;
  perPersonCost: number;
  lastComputed: number;
}

interface BookingCacheState {
  staticData: StaticData | null;
  selections: BookingSelections;
  availabilityCache: Map<string, AvailabilityCacheEntry>;
  currentPricing: ComputedPricing | null;
  isLoading: boolean;
}

interface BookingCacheContextType extends BookingCacheState {
  // Selection management
  updateSelection: (updates: Partial<BookingSelections>) => void;
  resetSelections: () => void;
  
  // Pricing engine
  recomputePricing: () => ComputedPricing | null;
  
  // Availability management
  getAvailability: (date: string, cruiseType: 'private' | 'disco') => AvailabilitySlot[];
  prefetchWeek: (weekStart: string) => void;
  holdSlot: (slotId: string) => Promise<boolean>;
  releaseSlot: (slotId: string) => Promise<boolean>;
  
  // Cache management
  refreshStaticData: () => void;
  clearCache: () => void;
}

const BookingCacheContext = createContext<BookingCacheContextType | null>(null);

// Default selections
const DEFAULT_SELECTIONS: BookingSelections = {
  date: new Date().toISOString().split('T')[0],
  groupSize: 20,
  cruiseType: 'private',
  selectedAddOns: [],
  discountCode: '',
};

// Cache keys and TTL
const AVAILABILITY_TTL = 5 * 60 * 1000; // 5 minutes
const STATIC_DATA_VERSION = 'v1.0';

export function BookingCacheProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  
  // Core state
  const [selections, setSelections] = useState<BookingSelections>(() => {
    // Try to restore from sessionStorage
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('ppc:selections');
      if (saved) {
        try {
          return { ...DEFAULT_SELECTIONS, ...JSON.parse(saved) };
        } catch (e) {
          console.warn('Failed to restore selections from sessionStorage:', e);
        }
      }
    }
    return DEFAULT_SELECTIONS;
  });
  
  const [availabilityCache, setAvailabilityCache] = useState<Map<string, AvailabilityCacheEntry>>(new Map());
  const [currentPricing, setCurrentPricing] = useState<ComputedPricing | null>(null);
  
  // Load static data (boats, pricing rules) with long-term caching
  const { data: staticData, isLoading: staticLoading, refetch: refreshStaticData } = useQuery({
    queryKey: ['booking-static-data', STATIC_DATA_VERSION],
    queryFn: async () => {
      const [boatsRes] = await Promise.all([
        apiRequest('GET', '/api/boats')
      ]);
      
      if (!boatsRes.ok) throw new Error('Failed to fetch static data');
      
      const boats = await boatsRes.json();
      
      return {
        boats,
        products: [], // Will be populated as needed
        pricingRulesVersion: STATIC_DATA_VERSION,
        lastUpdated: Date.now()
      } as StaticData;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
  
  // Persist selections to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ppc:selections', JSON.stringify(selections));
    }
  }, [selections]);
  
  // Client-side pricing computation with debounce
  const recomputePricing = useCallback((): ComputedPricing | null => {
    if (!selections.date) return null;
    
    try {
      const date = new Date(selections.date);
      
      if (selections.cruiseType === 'private') {
        const pricing = calculateSimplePricing(
          date,
          selections.groupSize,
          4, // Default duration - could be derived from time slot
          selections.selectedAddOns
        );
        
        const computed: ComputedPricing = {
          subtotal: pricing.subtotal,
          tax: pricing.tax,
          gratuity: pricing.gratuity,
          total: pricing.total,
          depositAmount: pricing.depositAmount,
          depositPercent: pricing.depositPercent,
          duration: pricing.duration,
          hourlyRate: pricing.hourlyRate,
          perPersonCost: pricing.perPersonCost,
          lastComputed: Date.now()
        };
        
        return computed;
      } else if (selections.cruiseType === 'disco') {
        // Simple disco pricing calculation
        const basePrice = getDiscoBasePrice(selections.discoPackage || 'basic');
        const ticketCount = selections.discoTicketQuantity || 10;
        const subtotal = basePrice * ticketCount;
        const tax = Math.floor(subtotal * 0.0825); // 8.25%
        const gratuity = Math.floor(subtotal * 0.20); // 20%
        const total = subtotal + tax + gratuity;
        
        const pricing = {
          subtotal,
          tax,
          gratuity,
          total,
          depositAmount: Math.floor(total * 0.25), // 25% deposit
          depositPercent: 25,
          perPersonCost: Math.floor(total / ticketCount)
        };
        
        const computed: ComputedPricing = {
          subtotal: pricing.subtotal,
          tax: pricing.tax,
          gratuity: pricing.gratuity,
          total: pricing.total,
          depositAmount: pricing.depositAmount,
          depositPercent: pricing.depositPercent,
          duration: 4, // Disco cruises are always 4 hours
          hourlyRate: 0, // Not applicable for disco
          perPersonCost: pricing.perPersonCost,
          lastComputed: Date.now()
        };
        
        return computed;
      }
      
      return null;
    } catch (error) {
      console.error('Pricing computation failed:', error);
      return null;
    }
  }, [selections]);
  
  // Auto-recompute pricing when selections change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const pricing = recomputePricing();
      setCurrentPricing(pricing);
    }, 150); // 150ms debounce
    
    return () => clearTimeout(timer);
  }, [recomputePricing]);
  
  // Generate cache key for availability
  const getAvailabilityCacheKey = useCallback((date: string, cruiseType: 'private' | 'disco'): string => {
    const weekStart = getWeekStart(date);
    const capacityTier = getCapacityTier(selections.groupSize);
    return `${weekStart}|${cruiseType}|${capacityTier}`;
  }, [selections.groupSize]);
  
  // Get availability from cache or fetch
  const getAvailability = useCallback((date: string, cruiseType: 'private' | 'disco'): AvailabilitySlot[] => {
    const cacheKey = getAvailabilityCacheKey(date, cruiseType);
    const cached = availabilityCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.fetchedAt) < cached.ttlMs) {
      return cached.slots.filter(slot => slot.dateISO === date);
    }
    
    // Return empty array and trigger background fetch
    prefetchWeek(getWeekStart(date));
    return [];
  }, [availabilityCache, getAvailabilityCacheKey]);
  
  // Prefetch availability for a week
  const prefetchWeek = useCallback((weekStart: string) => {
    const cacheKey = `${weekStart}|${selections.cruiseType}|${getCapacityTier(selections.groupSize)}`;
    
    // Skip if recently fetched
    const cached = availabilityCache.get(cacheKey);
    if (cached && (Date.now() - cached.fetchedAt) < AVAILABILITY_TTL) {
      return;
    }
    
    // Fetch availability for the week
    const endDate = new Date(weekStart);
    endDate.setDate(endDate.getDate() + 6);
    
    apiRequest('GET', `/api/availability/search?startDate=${weekStart}&endDate=${endDate.toISOString().split('T')[0]}&cruiseType=${selections.cruiseType}&groupSize=${selections.groupSize}`)
      .then(async res => {
        if (res.ok) {
          const data = await res.json();
          const entry: AvailabilityCacheEntry = {
            slots: data.slots || [],
            fetchedAt: Date.now(),
            etag: res.headers.get('etag') || undefined,
            ttlMs: AVAILABILITY_TTL
          };
          
          setAvailabilityCache(prev => new Map(prev).set(cacheKey, entry));
        }
      })
      .catch(error => {
        console.error('Failed to prefetch availability:', error);
      });
  }, [selections.cruiseType, selections.groupSize, availabilityCache]);
  
  // Update selections with optimistic UI updates
  const updateSelection = useCallback((updates: Partial<BookingSelections>) => {
    setSelections(prev => {
      const next = { ...prev, ...updates };
      
      // Clear slot selection if date/group size changes significantly
      if (updates.date && updates.date !== prev.date) {
        next.slotId = undefined;
        next.timeSlot = undefined;
        next.boatId = undefined;
      }
      
      if (updates.groupSize && Math.abs(updates.groupSize - prev.groupSize) > 5) {
        next.slotId = undefined;
        next.timeSlot = undefined;
        next.boatId = undefined;
      }
      
      return next;
    });
  }, []);
  
  // Slot holding (optimistic)
  const holdSlot = useCallback(async (slotId: string): Promise<boolean> => {
    try {
      // Optimistic update
      setAvailabilityCache(prev => {
        const next = new Map(prev);
        next.forEach((entry, key) => {
          const updatedSlots = entry.slots.map(slot => 
            slot.id === slotId ? { ...slot, held: true } : slot
          );
          next.set(key, { ...entry, slots: updatedSlots });
        });
        return next;
      });
      
      const res = await apiRequest('POST', '/api/availability/hold', {
        slotId,
        cruiseType: selections.cruiseType,
        dateISO: selections.date,
        sessionId: `session-${Date.now()}`,
        ttlMinutes: 15
      });
      
      return res.ok;
    } catch (error) {
      console.error('Failed to hold slot:', error);
      // Revert optimistic update
      setAvailabilityCache(prev => {
        const next = new Map(prev);
        next.forEach((entry, key) => {
          const updatedSlots = entry.slots.map(slot => 
            slot.id === slotId ? { ...slot, held: false } : slot
          );
          next.set(key, { ...entry, slots: updatedSlots });
        });
        return next;
      });
      return false;
    }
  }, [selections.cruiseType, selections.date]);
  
  // Release slot hold
  const releaseSlot = useCallback(async (slotId: string): Promise<boolean> => {
    try {
      const res = await apiRequest('POST', '/api/availability/release', {
        slotId,
        sessionId: `session-${Date.now()}`
      });
      
      if (res.ok) {
        // Update cache
        setAvailabilityCache(prev => {
          const next = new Map(prev);
          next.forEach((entry, key) => {
            const updatedSlots = entry.slots.map(slot => 
              slot.id === slotId ? { ...slot, held: false } : slot
            );
            next.set(key, { ...entry, slots: updatedSlots });
          });
          return next;
        });
      }
      
      return res.ok;
    } catch (error) {
      console.error('Failed to release slot:', error);
      return false;
    }
  }, []);
  
  // Context value
  const contextValue: BookingCacheContextType = {
    staticData,
    selections,
    availabilityCache,
    currentPricing,
    isLoading: staticLoading,
    
    updateSelection,
    resetSelections: () => setSelections(DEFAULT_SELECTIONS),
    
    recomputePricing,
    
    getAvailability,
    prefetchWeek,
    holdSlot,
    releaseSlot,
    
    refreshStaticData,
    clearCache: () => {
      setAvailabilityCache(new Map());
      queryClient.clear();
    }
  };
  
  return (
    <BookingCacheContext.Provider value={contextValue}>
      {children}
    </BookingCacheContext.Provider>
  );
}

// Helper hook
export function useBookingCache(): BookingCacheContextType {
  const context = useContext(BookingCacheContext);
  if (!context) {
    throw new Error('useBookingCache must be used within BookingCacheProvider');
  }
  return context;
}

// Utility functions
function getWeekStart(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDay();
  const diff = date.getDate() - day;
  const weekStart = new Date(date.setDate(diff));
  return weekStart.toISOString().split('T')[0];
}

function getCapacityTier(groupSize: number): string {
  if (groupSize <= 14) return 'small';
  if (groupSize <= 25) return 'medium';
  if (groupSize <= 50) return 'large';
  return 'xlarge';
}

function getDiscoBasePrice(packageType: string): number {
  switch (packageType) {
    case 'basic': return 8500; // $85.00 in cents
    case 'disco_queen': return 9500; // $95.00 in cents
    case 'platinum': return 10500; // $105.00 in cents
    default: return 8500;
  }
}