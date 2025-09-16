import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { NormalizedSlot } from '@shared/schema';

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
    staleTime: 1000 * 60 * 2, // Consider data stale after 2 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes for real-time availability
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    retry: 2, // Retry failed requests twice
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