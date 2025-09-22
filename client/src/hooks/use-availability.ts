import { useQuery, UseQueryOptions, useQueryClient } from '@tanstack/react-query';
import { NormalizedSlot } from '@shared/schema';
import { useCallback, useMemo } from 'react';

export interface AvailabilitySearchParams {
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format  
  cruiseType?: 'private' | 'disco';
  groupSize?: number;
  minDuration?: number; // hours
  maxDuration?: number; // hours
}

export interface AvailabilityResponse {
  success: boolean;
  slots: NormalizedSlot[];
  count: number;
  filters: {
    startDate: string;
    endDate: string;
    cruiseType?: 'private' | 'disco';
    groupSize?: number;
    minDuration?: number;
    maxDuration?: number;
  };
}

/**
 * Custom hook for searching available slots using TanStack Query
 * Provides caching, automatic refetching, and standardized error handling
 */
export const useAvailability = (
  params: AvailabilitySearchParams,
  options?: Omit<UseQueryOptions<AvailabilityResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  // Create query parameters for the API call
  const searchParams = new URLSearchParams();
  searchParams.set('startDate', params.startDate);
  searchParams.set('endDate', params.endDate);
  
  if (params.cruiseType) {
    searchParams.set('cruiseType', params.cruiseType);
  }
  if (params.groupSize) {
    searchParams.set('groupSize', params.groupSize.toString());
  }
  if (params.minDuration) {
    searchParams.set('minDuration', params.minDuration.toString());
  }
  if (params.maxDuration) {
    searchParams.set('maxDuration', params.maxDuration.toString());
  }

  return useQuery<AvailabilityResponse, Error>({
    queryKey: ['/api/availability/search', params],
    queryFn: async () => {
      const response = await fetch(`/api/availability/search?${searchParams.toString()}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch availability: ${response.status} ${errorText}`);
      }
      
      return response.json();
    },
    enabled: Boolean(params.startDate && params.endDate),
    staleTime: 1000 * 60 * 1, // Consider data stale after 1 minute (legacy compatibility)
    refetchInterval: 1000 * 60 * 3, // Refetch every 3 minutes for real-time availability  
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    retry: 2, // Retry failed requests twice
    // Mark this as legacy - prefer useWeekAvailability for better performance
    meta: { legacy: true },
    ...options,
  });
};

/**
 * Hook for getting available slots for a specific date range
 * Simplified interface for common use cases
 */
export const useAvailabilityForDateRange = (
  startDate: string,
  endDate: string,
  cruiseType?: 'private' | 'disco',
  groupSize?: number,
  options?: Omit<UseQueryOptions<AvailabilityResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useAvailability(
    {
      startDate,
      endDate,
      cruiseType,
      groupSize,
    },
    options
  );
};

/**
 * Hook for getting available slots for a single date
 * Convenience wrapper for single-day searches
 */
export const useAvailabilityForDate = (
  date: string, // YYYY-MM-DD format
  cruiseType?: 'private' | 'disco',
  groupSize?: number,
  options?: Omit<UseQueryOptions<AvailabilityResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useAvailabilityForDateRange(date, date, cruiseType, groupSize, options);
};

/**
 * Utility function to format Date objects to YYYY-MM-DD string format
 * Helper for consistent date formatting across the application
 */
export const formatDateForAvailability = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Utility function to get date range for the next N days
 * Useful for showing upcoming availability
 */
export const getDateRangeFromToday = (days: number): { startDate: string; endDate: string } => {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + days);
  
  return {
    startDate: formatDateForAvailability(today),
    endDate: formatDateForAvailability(endDate),
  };
};

/**
 * Utility function to filter slots by availability status
 */
export const filterAvailableSlots = (slots: NormalizedSlot[]): NormalizedSlot[] => {
  return slots.filter(slot => slot.bookable && !slot.held);
};

/**
 * Utility function to group slots by date
 */
export const groupSlotsByDate = (slots: NormalizedSlot[]): Record<string, NormalizedSlot[]> => {
  return slots.reduce((groups, slot) => {
    const date = slot.dateISO;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(slot);
    return groups;
  }, {} as Record<string, NormalizedSlot[]>);
};

/**
 * Utility function to sort slots by start time
 */
export const sortSlotsByTime = (slots: NormalizedSlot[]): NormalizedSlot[] => {
  return [...slots].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
};

// ==========================================
// WEEK-SCOPED AVAILABILITY CACHING
// ==========================================

/**
 * Calculate week boundaries for consistent cache keys
 * Returns Monday of the week containing the given date
 */
export const getWeekStart = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  const dayOfWeek = date.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 0, Monday = 1
  
  const monday = new Date(date);
  monday.setDate(date.getDate() - daysToMonday);
  
  return formatDateForAvailability(monday);
};

/**
 * Get week range (Monday to Sunday) for a given date
 */
export const getWeekRange = (dateString: string): { startDate: string; endDate: string } => {
  const weekStart = getWeekStart(dateString);
  const startDate = new Date(weekStart + 'T00:00:00');
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // Sunday
  
  return {
    startDate: weekStart,
    endDate: formatDateForAvailability(endDate)
  };
};

/**
 * Generate week-scoped cache key for availability queries
 */
export const getWeekCacheKey = (weekStart: string, cruiseType?: 'private' | 'disco', groupSize?: number): string[] => {
  const key = ['availability', 'week', weekStart];
  if (cruiseType) key.push(cruiseType);
  if (groupSize) key.push(`group-${groupSize}`);
  return key;
};

/**
 * Hook for week-scoped availability with SWR pattern
 * Fetches entire week at once for better caching
 */
export const useWeekAvailability = (
  weekStart: string,
  cruiseType?: 'private' | 'disco',
  groupSize?: number,
  options?: Omit<UseQueryOptions<AvailabilityResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  const weekRange = useMemo(() => getWeekRange(weekStart), [weekStart]);
  
  return useQuery<AvailabilityResponse, Error>({
    queryKey: getWeekCacheKey(weekStart, cruiseType, groupSize),
    queryFn: async () => {
      console.time(`⚡ Week availability fetch: ${weekStart}`);
      
      const searchParams = new URLSearchParams();
      searchParams.set('startDate', weekRange.startDate);
      searchParams.set('endDate', weekRange.endDate);
      
      if (cruiseType) {
        searchParams.set('cruiseType', cruiseType);
      }
      if (groupSize) {
        searchParams.set('groupSize', groupSize.toString());
      }
      
      const response = await fetch(`/api/availability/search?${searchParams.toString()}`, {
        credentials: 'include',
        headers: {
          'Cache-Control': 'max-age=0', // Force fresh data for week queries
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch week availability: ${response.status} ${errorText}`);
      }
      
      const result = await response.json();
      console.timeEnd(`⚡ Week availability fetch: ${weekStart}`);
      console.log(`📊 Week ${weekStart}: ${result.slots.length} slots cached`);
      
      return result;
    },
    enabled: Boolean(weekStart),
    // SWR pattern: Show stale data while revalidating
    staleTime: 1000 * 60 * 3, // Consider stale after 3 minutes
    gcTime: 1000 * 60 * 15, // Keep in cache for 15 minutes
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 5, // Background refresh every 5 minutes
    retry: (failureCount, error) => {
      // Retry failed requests up to 3 times with exponential backoff
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};

/**
 * Hook for date-specific availability using week cache
 * Extracts slots for a specific date from the week cache
 */
export const useAvailabilityForDateOptimized = (
  date: string,
  cruiseType?: 'private' | 'disco',
  groupSize?: number
) => {
  const weekStart = useMemo(() => getWeekStart(date), [date]);
  const weekQuery = useWeekAvailability(weekStart, cruiseType, groupSize);
  
  const slotsForDate = useMemo(() => {
    if (!weekQuery.data?.slots) return [];
    return weekQuery.data.slots.filter(slot => slot.dateISO === date);
  }, [weekQuery.data?.slots, date]);
  
  return {
    ...weekQuery,
    data: weekQuery.data ? {
      ...weekQuery.data,
      slots: slotsForDate,
      count: slotsForDate.length
    } : undefined
  };
};

/**
 * Hook for optimistic availability updates
 * Provides functions to update cache immediately when bookings are made
 */
export const useAvailabilityOptimisticUpdates = () => {
  const queryClient = useQueryClient();
  
  const markSlotAsBooked = useCallback(async (slotId: string, weekStart: string) => {
    console.log(`🔄 Optimistic update: marking slot ${slotId} as booked`);
    
    // Update all relevant week caches
    const cacheKeys = [
      getWeekCacheKey(weekStart),
      getWeekCacheKey(weekStart, 'private'),
      getWeekCacheKey(weekStart, 'disco'),
    ];
    
    cacheKeys.forEach(key => {
      queryClient.setQueryData(key, (oldData: AvailabilityResponse | undefined) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          slots: oldData.slots.map(slot => 
            slot.id === slotId 
              ? { ...slot, bookable: false, held: false }
              : slot
          )
        };
      });
    });
    
    // Trigger background revalidation to sync with server
    await Promise.all(cacheKeys.map(key => 
      queryClient.refetchQueries({ queryKey: key, type: 'active' })
    ));
  }, [queryClient]);
  
  const markSlotAsAvailable = useCallback(async (slotId: string, weekStart: string) => {
    console.log(`🔄 Optimistic update: marking slot ${slotId} as available`);
    
    const cacheKeys = [
      getWeekCacheKey(weekStart),
      getWeekCacheKey(weekStart, 'private'),
      getWeekCacheKey(weekStart, 'disco'),
    ];
    
    cacheKeys.forEach(key => {
      queryClient.setQueryData(key, (oldData: AvailabilityResponse | undefined) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          slots: oldData.slots.map(slot => 
            slot.id === slotId 
              ? { ...slot, bookable: true, held: false }
              : slot
          )
        };
      });
    });
    
    await Promise.all(cacheKeys.map(key => 
      queryClient.refetchQueries({ queryKey: key, type: 'active' })
    ));
  }, [queryClient]);
  
  const holdSlotOptimistically = useCallback(async (slotId: string, weekStart: string) => {
    console.log(`🔄 Optimistic update: holding slot ${slotId}`);
    
    const cacheKeys = [
      getWeekCacheKey(weekStart),
      getWeekCacheKey(weekStart, 'private'),
      getWeekCacheKey(weekStart, 'disco'),
    ];
    
    cacheKeys.forEach(key => {
      queryClient.setQueryData(key, (oldData: AvailabilityResponse | undefined) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          slots: oldData.slots.map(slot => 
            slot.id === slotId 
              ? { ...slot, held: true }
              : slot
          )
        };
      });
    });
  }, [queryClient]);
  
  const prefetchAdjacentWeeks = useCallback(async (
    currentWeek: string, 
    cruiseType?: 'private' | 'disco', 
    groupSize?: number
  ) => {
    const currentDate = new Date(currentWeek + 'T00:00:00');
    
    // Prefetch previous and next week
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    
    const prevWeekStart = formatDateForAvailability(prevWeek);
    const nextWeekStart = formatDateForAvailability(nextWeek);
    
    console.log(`🚀 Background prefetch: weeks ${prevWeekStart} and ${nextWeekStart}`);
    
    // Prefetch in background without blocking
    Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: getWeekCacheKey(prevWeekStart, cruiseType, groupSize),
        queryFn: async () => {
          const weekRange = getWeekRange(prevWeekStart);
          const searchParams = new URLSearchParams();
          searchParams.set('startDate', weekRange.startDate);
          searchParams.set('endDate', weekRange.endDate);
          if (cruiseType) searchParams.set('cruiseType', cruiseType);
          if (groupSize) searchParams.set('groupSize', groupSize.toString());
          
          const response = await fetch(`/api/availability/search?${searchParams.toString()}`, {
            credentials: 'include',
          });
          
          if (!response.ok) throw new Error('Prefetch failed');
          return response.json();
        },
        staleTime: 1000 * 60 * 3,
      }),
      queryClient.prefetchQuery({
        queryKey: getWeekCacheKey(nextWeekStart, cruiseType, groupSize),
        queryFn: async () => {
          const weekRange = getWeekRange(nextWeekStart);
          const searchParams = new URLSearchParams();
          searchParams.set('startDate', weekRange.startDate);
          searchParams.set('endDate', weekRange.endDate);
          if (cruiseType) searchParams.set('cruiseType', cruiseType);
          if (groupSize) searchParams.set('groupSize', groupSize.toString());
          
          const response = await fetch(`/api/availability/search?${searchParams.toString()}`, {
            credentials: 'include',
          });
          
          if (!response.ok) throw new Error('Prefetch failed');
          return response.json();
        },
        staleTime: 1000 * 60 * 3,
      })
    ]).then(results => {
      const successful = results.filter(r => r.status === 'fulfilled').length;
      console.log(`📦 Prefetched ${successful}/2 adjacent weeks`);
    });
  }, [queryClient]);
  
  return {
    markSlotAsBooked,
    markSlotAsAvailable, 
    holdSlotOptimistically,
    prefetchAdjacentWeeks
  };
};