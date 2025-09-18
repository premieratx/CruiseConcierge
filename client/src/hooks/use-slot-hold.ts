import { useState, useEffect, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { SlotHold } from '@shared/schema';

export interface CreateSlotHoldParams {
  slotId: string;
  boatId?: string;
  cruiseType: 'private' | 'disco';
  dateISO: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  sessionId?: string;
  groupSize?: number;
  ttlMinutes?: number; // Default 15 minutes, max 60 minutes
}

export interface ReleaseSlotHoldParams {
  holdId?: string;
  slotId?: string;
  sessionId?: string;
}

export interface SlotHoldResponse {
  success: boolean;
  hold: SlotHold;
  message: string;
}

export interface UseSlotHoldOptions {
  onHoldCreated?: (hold: SlotHold) => void;
  onHoldReleased?: () => void;
  onHoldExpired?: () => void;
  autoRelease?: boolean; // Auto-release on component unmount
  sessionId?: string; // Session ID for tracking
}

/**
 * Custom hook for managing slot holds with TTL countdown
 * Provides creation, release, and automatic expiration handling
 */
export const useSlotHold = (options: UseSlotHoldOptions = {}) => {
  const {
    onHoldCreated,
    onHoldReleased,
    onHoldExpired,
    autoRelease = true,
    sessionId = generateSessionId(),
  } = options;

  const queryClient = useQueryClient();
  const [currentHold, setCurrentHold] = useState<SlotHold | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null); // seconds
  const [isExpired, setIsExpired] = useState(false);
  
  // Use refs to track state for cleanup
  const holdIdRef = useRef<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update refs when hold changes
  useEffect(() => {
    holdIdRef.current = currentHold?.id || null;
  }, [currentHold]);

  // Create slot hold mutation
  const createHoldMutation = useMutation({
    mutationFn: async (params: CreateSlotHoldParams): Promise<SlotHoldResponse> => {
      const response = await apiRequest('POST', '/api/availability/hold', {
        ...params,
        sessionId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      const hold = data.hold;
      setCurrentHold(hold);
      setIsExpired(false);
      startCountdown(hold.expiresAt);
      
      // Invalidate availability queries to refresh slot status
      queryClient.invalidateQueries({ queryKey: ['/api/availability/search'] });
      
      onHoldCreated?.(hold);
    },
    onError: (error) => {
      console.error('Failed to create slot hold:', error);
    },
  });

  // Release slot hold mutation
  const releaseHoldMutation = useMutation({
    mutationFn: async (params: ReleaseSlotHoldParams): Promise<{ success: boolean; message: string }> => {
      const response = await apiRequest('POST', '/api/availability/release', params);
      return response.json();
    },
    onSuccess: () => {
      setCurrentHold(null);
      setTimeRemaining(null);
      setIsExpired(false);
      stopCountdown();
      
      // Invalidate availability queries to refresh slot status
      queryClient.invalidateQueries({ queryKey: ['/api/availability/search'] });
      
      onHoldReleased?.();
    },
    onError: (error) => {
      console.error('Failed to release slot hold:', error);
    },
  });

  // Start countdown timer
  const startCountdown = useCallback((expiresAt: Date) => {
    stopCountdown(); // Clear any existing timer
    
    const updateTimer = () => {
      const now = new Date();
      const expiration = new Date(expiresAt);
      const remaining = Math.max(0, expiration.getTime() - now.getTime());
      
      if (remaining <= 0) {
        setTimeRemaining(0);
        setIsExpired(true);
        setCurrentHold(null);
        stopCountdown();
        
        // Invalidate queries when hold expires
        queryClient.invalidateQueries({ queryKey: ['/api/availability/search'] });
        
        onHoldExpired?.();
        return;
      }
      
      setTimeRemaining(Math.floor(remaining / 1000));
    };
    
    // Update immediately and then every second
    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);
  }, [queryClient, onHoldExpired]);

  // Stop countdown timer
  const stopCountdown = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Create a slot hold
  const createHold = useCallback((params: CreateSlotHoldParams) => {
    // Release any existing hold first
    if (currentHold) {
      releaseHold();
    }
    createHoldMutation.mutate(params);
  }, [currentHold, createHoldMutation]);

  // Release current slot hold
  const releaseHold = useCallback(() => {
    if (currentHold) {
      releaseHoldMutation.mutate({ holdId: currentHold.id });
    }
  }, [currentHold, releaseHoldMutation]);

  // Create a slot hold with async/await support
  const createHoldAsync = useCallback(async (params: CreateSlotHoldParams): Promise<SlotHoldResponse> => {
    // Release any existing hold first
    if (currentHold) {
      releaseHold();
    }
    return createHoldMutation.mutateAsync(params);
  }, [currentHold, createHoldMutation, releaseHold]);

  // Release hold by slot and session (alternative method)
  const releaseHoldBySlot = useCallback((slotId: string, sessionId?: string) => {
    releaseHoldMutation.mutate({ 
      slotId, 
      sessionId: sessionId || currentHold?.sessionId 
    });
  }, [currentHold, releaseHoldMutation]);

  // Format time remaining for display
  const formatTimeRemaining = useCallback((): string => {
    if (timeRemaining === null) return '';
    if (timeRemaining <= 0) return 'Expired';
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  // Check if hold is about to expire (last 2 minutes)
  const isAboutToExpire = useCallback((): boolean => {
    return timeRemaining !== null && timeRemaining > 0 && timeRemaining <= 120;
  }, [timeRemaining]);

  // Auto-release on unmount if enabled
  useEffect(() => {
    return () => {
      stopCountdown();
      
      if (autoRelease && holdIdRef.current) {
        // Fire and forget release on unmount
        apiRequest('POST', '/api/availability/release', {
          holdId: holdIdRef.current,
        }).catch(error => {
          console.warn('Failed to auto-release hold on unmount:', error);
        });
      }
    };
  }, [autoRelease, stopCountdown]);

  // Extend hold (create new hold with same parameters)
  const extendHold = useCallback((ttlMinutes: number = 15) => {
    if (!currentHold) return;
    
    createHoldMutation.mutate({
      slotId: currentHold.slotId,
      boatId: currentHold.boatId || undefined,
      cruiseType: currentHold.cruiseType,
      dateISO: currentHold.dateISO,
      startTime: currentHold.startTime,
      endTime: currentHold.endTime,
      sessionId: currentHold.sessionId || undefined,
      groupSize: currentHold.groupSize || undefined,
      ttlMinutes,
    });
  }, [currentHold, createHoldMutation]);

  return {
    // State
    currentHold,
    timeRemaining,
    isExpired,
    isHolding: Boolean(currentHold && !isExpired),
    
    // Actions
    createHold,
    createHoldAsync,
    releaseHold,
    releaseHoldBySlot,
    extendHold,
    
    // Mutation states
    isCreatingHold: createHoldMutation.isPending,
    isReleasingHold: releaseHoldMutation.isPending,
    createHoldError: createHoldMutation.error,
    releaseHoldError: releaseHoldMutation.error,
    
    // Utility functions
    formatTimeRemaining,
    isAboutToExpire,
    
    // Session tracking
    sessionId,
  };
};

/**
 * Hook for managing multiple slot holds
 * Useful for batch operations or managing holds across multiple slots
 */
export const useMultipleSlotHolds = (options: UseSlotHoldOptions = {}) => {
  const [holds, setHolds] = useState<Map<string, SlotHold>>(new Map());
  const queryClient = useQueryClient();

  const createHoldMutation = useMutation({
    mutationFn: async (params: CreateSlotHoldParams): Promise<SlotHoldResponse> => {
      const response = await apiRequest('POST', '/api/availability/hold', params);
      return response.json();
    },
    onSuccess: (data) => {
      const hold = data.hold;
      setHolds(prev => new Map(prev).set(hold.slotId, hold));
      queryClient.invalidateQueries({ queryKey: ['/api/availability/search'] });
      options.onHoldCreated?.(hold);
    },
  });

  const releaseHoldMutation = useMutation({
    mutationFn: async (params: ReleaseSlotHoldParams): Promise<{ success: boolean; message: string }> => {
      const response = await apiRequest('POST', '/api/availability/release', params);
      return response.json();
    },
    onSuccess: (_, variables) => {
      if (variables.slotId) {
        setHolds(prev => {
          const newHolds = new Map(prev);
          newHolds.delete(variables.slotId!);
          return newHolds;
        });
      }
      queryClient.invalidateQueries({ queryKey: ['/api/availability/search'] });
      options.onHoldReleased?.();
    },
  });

  const createHold = useCallback((params: CreateSlotHoldParams) => {
    createHoldMutation.mutate(params);
  }, [createHoldMutation]);

  const releaseHold = useCallback((slotId: string) => {
    const hold = holds.get(slotId);
    if (hold) {
      releaseHoldMutation.mutate({ holdId: hold.id });
    }
  }, [holds, releaseHoldMutation]);

  const releaseAllHolds = useCallback(() => {
    holds.forEach((hold) => {
      releaseHoldMutation.mutate({ holdId: hold.id });
    });
  }, [holds, releaseHoldMutation]);

  const getHoldForSlot = useCallback((slotId: string): SlotHold | undefined => {
    return holds.get(slotId);
  }, [holds]);

  const isSlotHeld = useCallback((slotId: string): boolean => {
    return holds.has(slotId);
  }, [holds]);

  return {
    holds: Array.from(holds.values()),
    holdsMap: holds,
    createHold,
    releaseHold,
    releaseAllHolds,
    getHoldForSlot,
    isSlotHeld,
    isCreatingHold: createHoldMutation.isPending,
    isReleasingHold: releaseHoldMutation.isPending,
  };
};

/**
 * Utility function to generate a unique session ID
 * Used for tracking holds across page reloads
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Utility function to check if a hold is still valid
 */
export const isHoldValid = (hold: SlotHold): boolean => {
  const now = new Date();
  const expiresAt = new Date(hold.expiresAt);
  return expiresAt > now;
};