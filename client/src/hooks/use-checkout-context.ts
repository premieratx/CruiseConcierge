/**
 * Universal Intelligent Checkout Context Hook
 * Manages checkout state and context awareness across all entry points
 * Premier Party Cruises CRM System
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from './use-toast';
import { 
  CheckoutContext, 
  CheckoutSelections, 
  CheckoutPricing, 
  CheckoutValidation, 
  CheckoutSession, 
  BoatOption, 
  DiscoPackageOption, 
  AddOnPackageOption, 
  BachelorComparison,
  CheckoutEntryPoint,
  NormalizedSlot 
} from '@shared/schema';
import { EVENT_TYPES, DISCO_PACKAGES } from '@shared/constants';
import { calculateCompletePricing } from '@shared/pricing';

interface UseCheckoutContextProps {
  entryPoint: CheckoutEntryPoint;
  preselectedData?: any;
  sessionId?: string;
  onCheckoutComplete?: (result: any) => void;
  onError?: (error: string) => void;
}

export interface CheckoutContextHook {
  // State
  session: CheckoutSession | null;
  isLoading: boolean;
  isValidating: boolean;
  error: string | null;
  
  // Selections
  selections: CheckoutSelections | null;
  pricing: CheckoutPricing | null;
  validation: CheckoutValidation | null;
  
  // Options
  availableBoats: BoatOption[];
  availableTimeSlots: NormalizedSlot[];
  discoPackages: DiscoPackageOption[];
  addOnPackages: AddOnPackageOption[];
  
  // Bachelor/Bachelorette Intelligence
  bachelorComparison: BachelorComparison | null;
  showBachelorComparison: boolean;
  
  // Actions
  updateSelections: (updates: Partial<CheckoutSelections>) => void;
  selectBoat: (boat: BoatOption) => void;
  selectTimeSlot: (slot: NormalizedSlot) => void;
  selectCruiseType: (type: 'private' | 'disco') => void;
  selectDiscoPackage: (pkg: DiscoPackageOption) => void;
  toggleAddOnPackage: (pkg: AddOnPackageOption) => void;
  updateContactInfo: (info: { name: string; email: string; phone: string }) => void;
  
  // Validation & Processing
  validateCheckout: () => Promise<CheckoutValidation>;
  refreshPricing: () => Promise<void>;
  processCheckout: (paymentType: 'deposit' | 'full_payment') => Promise<{ clientSecret: string; sessionId: string }>;
  
  // Utility
  reset: () => void;
  canProceedToPayment: boolean;
  isEventTypeBachelorette: boolean;
}

export const useCheckoutContext = (props: UseCheckoutContextProps): CheckoutContextHook => {
  const { entryPoint, preselectedData = {}, sessionId: providedSessionId, onCheckoutComplete, onError } = props;
  const { toast } = useToast();
  const [sessionId] = useState(() => providedSessionId || `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  // Internal state
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Slot hold system removed - direct first-come-first-served checkout
  
  // Fetch available boats
  const { data: boats = [] } = useQuery<BoatOption[]>({
    queryKey: ['/api/boats/options'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/boats/options');
      if (!response.ok) throw new Error('Failed to fetch boat options');
      return response.json();
    }
  });
  
  // Fetch disco packages
  const discoPackages = useMemo<DiscoPackageOption[]>(() => {
    return Object.entries(DISCO_PACKAGES).map(([id, config]) => ({
      id: id as 'basic' | 'disco_queen' | 'platinum',
      label: config.label,
      description: config.description,
      pricePerPerson: 8500, // Base price, will be updated from API
      features: ['Dancing', 'Party atmosphere', 'Great music'],
      popular: id === 'disco_queen'
    }));
  }, []);
  
  // Fetch add-on packages (placeholder - will be implemented based on backend)
  const addOnPackages = useMemo<AddOnPackageOption[]>(() => [
    {
      id: 'essentials',
      name: 'Essentials Package',
      description: 'Enhanced experience with premium amenities',
      hourlyRate: 5000, // $50/hour
      features: ['Premium sound system', 'Coolers with ice', 'Party decorations'],
      eventTypes: ['birthday', 'bachelor', 'bachelorette', 'other'],
      popular: false
    },
    {
      id: 'ultimate',
      name: 'Ultimate Party Package',
      description: 'All-inclusive luxury experience',
      hourlyRate: 7500, // $75/hour
      features: ['Premium sound system', 'Coolers with ice', 'Party decorations', 'Photography package'],
      eventTypes: ['bachelor', 'bachelorette', 'wedding', 'corporate'],
      popular: true
    }
  ], []);
  
  // Initialize checkout session from entry point data
  const initializeSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create initial context from entry point
      const context: CheckoutContext = {
        entryPoint,
        referrerUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        preselectedData: preselectedData || {},
        sessionId,
        quoteId: preselectedData.quoteId,
        projectId: preselectedData.projectId,
        // holdId removed - direct checkout without holds
        createdAt: new Date(),
        lastModified: new Date()
      };
      
      // Initialize selections with smart defaults
      const initialSelections = await createSmartDefaults(context, boats);
      
      // Create initial session
      const newSession: CheckoutSession = {
        sessionId,
        context,
        selections: initialSelections,
        pricing: await calculateInitialPricing(initialSelections),
        validation: { isValid: false, errors: [], warnings: [], slotAvailable: true, holdValid: true, pricingCurrent: true, requiresHoldRenewal: false, requiresPricingUpdate: false },
        currentStep: 'selections',
        completedSteps: [],
        isEditing: false,
        hasChanges: false,
        lastUpdated: new Date(),
        retryCount: 0
      };
      
      setSession(newSession);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to initialize checkout';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [entryPoint, preselectedData, sessionId, boats, onError]);
  
  // Create smart defaults based on entry point and preselected data
  const createSmartDefaults = async (context: CheckoutContext, availableBoats: BoatOption[]): Promise<CheckoutSelections> => {
    const { preselectedData } = context;
    const eventType = preselectedData.eventType || 'birthday';
    const groupSize = preselectedData.groupSize || 15;
    
    // Smart boat selection based on group size
    const selectedBoat = selectOptimalBoat(availableBoats, groupSize, preselectedData.boatId);
    
    // Default time slot (will be refined with availability)
    const defaultTimeSlot: NormalizedSlot = {
      id: 'default',
      cruiseType: 'private',
      dateISO: preselectedData.eventDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      startTime: '12:00',
      endTime: '16:00',
      label: '12:00 PM - 4:00 PM',
      duration: 4,
      capacity: selectedBoat.capacity,
      availableCount: 1,
      price: 0,
      boatCandidates: [selectedBoat.id],
      bookable: true
    };
    
    return {
      eventDate: preselectedData.eventDate || new Date(),
      eventType,
      eventTypeLabel: EVENT_TYPES[eventType as keyof typeof EVENT_TYPES]?.label || 'Birthday',
      groupSize,
      selectedBoat,
      selectedTimeSlot: preselectedData.timeSlot || defaultTimeSlot,
      cruiseType: preselectedData.cruiseType || 'private',
      discoPackage: preselectedData.discoPackage ? 
        discoPackages.find(p => p.id === preselectedData.discoPackage) : undefined,
      discoTicketQuantity: preselectedData.discoTicketQuantity,
      addOnPackages: [],
      contactName: preselectedData.contactName || '',
      contactEmail: preselectedData.contactEmail || '',
      contactPhone: preselectedData.contactPhone || '',
      specialRequests: preselectedData.specialRequests || '',
      marketingConsent: false
    };
  };
  
  // Select optimal boat based on group size and preferences
  const selectOptimalBoat = (availableBoats: BoatOption[], groupSize: number, preferredBoatId?: string): BoatOption => {
    if (preferredBoatId) {
      const preferred = availableBoats.find(b => b.id === preferredBoatId);
      if (preferred && groupSize <= preferred.maxCapacity) {
        return preferred;
      }
    }
    
    // Find smallest boat that can accommodate the group
    const suitableBoats = availableBoats
      .filter(boat => boat.active && groupSize <= boat.maxCapacity)
      .sort((a, b) => a.capacity - b.capacity);
    
    return suitableBoats[0] || availableBoats[0];
  };
  
  // Calculate initial pricing
  const calculateInitialPricing = async (selections: CheckoutSelections): Promise<CheckoutPricing> => {
    try {
      const response = await apiRequest('POST', '/api/checkout/calculate-pricing', {
        eventDate: selections.eventDate.toISOString(),
        groupSize: selections.groupSize,
        cruiseType: selections.cruiseType,
        boatId: selections.selectedBoat.id,
        timeSlot: selections.selectedTimeSlot,
        discoPackage: selections.discoPackage?.id,
        discoTicketQuantity: selections.discoTicketQuantity,
        addOnPackages: selections.addOnPackages.map(p => p.id)
      });
      
      if (!response.ok) throw new Error('Failed to calculate pricing');
      return await response.json();
    } catch (err) {
      console.error('Pricing calculation failed:', err);
      // Return fallback pricing
      return createFallbackPricing(selections);
    }
  };
  
  // Create fallback pricing when API fails
  const createFallbackPricing = (selections: CheckoutSelections): CheckoutPricing => {
    const basePricing = calculateCompletePricing(selections.eventDate, selections.groupSize);
    
    return {
      ...basePricing,
      boatInfo: {
        name: selections.selectedBoat.name,
        baseHourlyRate: 25000, // $250/hour fallback
        crewFee: selections.groupSize > selections.selectedBoat.capacity ? selections.selectedBoat.crewFeePerHour : 0,
        capacity: selections.selectedBoat.capacity
      },
      packageBreakdown: {
        baseCruiseCost: basePricing.subtotal,
        discoPackageCost: 0,
        addOnPackagesCost: 0,
        crewFee: 0
      },
      paymentOptions: {
        depositOnly: {
          amount: basePricing.depositAmount,
          description: 'Deposit Payment (25%)'
        },
        fullPayment: {
          amount: basePricing.total,
          description: 'Full Payment'
        }
      },
      validUntil: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      requiresRevalidation: false
    };
  };
  
  // Update selections with validation and pricing refresh
  const updateSelections = useCallback(async (updates: Partial<CheckoutSelections>) => {
    if (!session) return;
    
    const newSelections = { ...session.selections, ...updates };
    const newPricing = await calculateInitialPricing(newSelections);
    
    setSession(prev => prev ? {
      ...prev,
      selections: newSelections,
      pricing: newPricing,
      hasChanges: true,
      lastUpdated: new Date()
    } : null);
  }, [session]);
  
  // Specialized selection methods
  const selectBoat = useCallback(async (boat: BoatOption) => {
    await updateSelections({ selectedBoat: boat });
    toast({
      title: "Boat Selected",
      description: `${boat.displayName} - Up to ${boat.capacity} guests`,
    });
  }, [updateSelections, toast]);
  
  const selectTimeSlot = useCallback(async (slot: NormalizedSlot) => {
    // Direct slot selection without holds - first-come-first-served
    await updateSelections({ selectedTimeSlot: slot });
    toast({
      title: "Time Slot Selected",
      description: `${slot.label} selected for your cruise`,
    });
  }, [updateSelections, toast]);
  
  const selectCruiseType = useCallback(async (type: 'private' | 'disco') => {
    await updateSelections({ cruiseType: type });
    
    // Clear disco-specific selections if switching to private
    if (type === 'private') {
      await updateSelections({ 
        cruiseType: type, 
        discoPackage: undefined, 
        discoTicketQuantity: undefined 
      });
    }
  }, [updateSelections]);
  
  const selectDiscoPackage = useCallback(async (pkg: DiscoPackageOption) => {
    await updateSelections({ discoPackage: pkg });
  }, [updateSelections]);
  
  const toggleAddOnPackage = useCallback(async (pkg: AddOnPackageOption) => {
    if (!session?.selections) return;
    
    const currentPackages = session.selections.addOnPackages;
    const isSelected = currentPackages.some(p => p.id === pkg.id);
    
    const newPackages = isSelected 
      ? currentPackages.filter(p => p.id !== pkg.id)
      : [...currentPackages, pkg];
      
    await updateSelections({ addOnPackages: newPackages });
  }, [session, updateSelections]);
  
  const updateContactInfo = useCallback(async (info: { name: string; email: string; phone: string }) => {
    await updateSelections({
      contactName: info.name,
      contactEmail: info.email,
      contactPhone: info.phone
    });
  }, [updateSelections]);
  
  // Validation
  const validateCheckout = useCallback(async (): Promise<CheckoutValidation> => {
    if (!session) {
      return {
        isValid: false,
        errors: [{ field: 'session', message: 'Checkout session not initialized', code: 'SESSION_MISSING' }],
        warnings: [],
        slotAvailable: false,
        holdValid: false,
        pricingCurrent: false,
        requiresHoldRenewal: false,
        requiresPricingUpdate: false
      };
    }
    
    setIsValidating(true);
    try {
      const response = await apiRequest('POST', '/api/checkout/validate', {
        sessionId: session.sessionId,
        selections: session.selections,
        // holdId removed for direct checkout
      });
      
      if (!response.ok) throw new Error('Validation failed');
      
      const validation = await response.json();
      setSession(prev => prev ? { ...prev, validation } : null);
      return validation;
    } catch (err) {
      const validation: CheckoutValidation = {
        isValid: false,
        errors: [{ field: 'general', message: 'Validation failed', code: 'VALIDATION_ERROR' }],
        warnings: [],
        slotAvailable: true,
        holdValid: true,
        pricingCurrent: false,
        requiresHoldRenewal: false,
        requiresPricingUpdate: true
      };
      return validation;
    } finally {
      setIsValidating(false);
    }
  }, [session]);
  
  // Process checkout
  const processCheckout = useCallback(async (paymentType: 'deposit' | 'full_payment'): Promise<{ clientSecret: string; sessionId: string }> => {
    if (!session) throw new Error('No checkout session');
    
    const validation = await validateCheckout();
    if (!validation.isValid) {
      throw new Error(`Checkout validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
    }
    
    try {
      const response = await apiRequest('POST', '/api/checkout/create-payment-intent', {
        sessionId: session.sessionId,
        selections: session.selections,
        pricing: session.pricing,
        paymentType,
        // holdId removed for direct checkout
      });
      
      if (!response.ok) throw new Error('Failed to create payment intent');
      
      const result = await response.json();
      return {
        clientSecret: result.clientSecret,
        sessionId: session.sessionId
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Checkout processing failed';
      setError(errorMsg);
      onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }, [session, validateCheckout, onError]);
  
  // Refresh pricing
  const refreshPricing = useCallback(async () => {
    if (!session) return;
    
    const newPricing = await calculateInitialPricing(session.selections);
    setSession(prev => prev ? { ...prev, pricing: newPricing } : null);
  }, [session]);
  
  // Reset checkout
  const reset = useCallback(() => {
    setSession(null);
    setError(null);
    // Slot hold system removed - direct reset
    initializeSession();
  }, [initializeSession]);
  
  // Initialize on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);
  
  // Computed properties
  const canProceedToPayment = useMemo(() => {
    if (!session) return false;
    const s = session.selections;
    return !!(s.contactName && s.contactEmail && s.contactPhone && s.selectedBoat && s.selectedTimeSlot);
  }, [session]);
  
  const isEventTypeBachelorette = useMemo(() => {
    return session?.selections?.eventType === 'bachelor' || session?.selections?.eventType === 'bachelorette';
  }, [session]);
  
  // Direct first-come-first-served booking - no slot holds needed
  const needsHoldRenewal = useMemo(() => {
    return false; // No slot holds in direct booking system
  }, []);
  
  // Bachelor/Bachelorette comparison (placeholder)
  const bachelorComparison = useMemo<BachelorComparison | null>(() => {
    if (!isEventTypeBachelorette || !session) return null;
    
    // This would be implemented with real data from backend
    return {
      privateOption: {
        available: true,
        pricing: session.pricing!,
        boats: boats,
        timeSlots: [session.selections.selectedTimeSlot],
        benefits: ['Private boat', 'Customizable music', 'No time restrictions']
      },
      discoOption: {
        available: true,
        pricing: session.pricing!,
        packages: discoPackages,
        timeSlots: [],
        benefits: ['Party atmosphere', 'Dancing', 'Meet other groups']
      },
      recommendation: session.selections.groupSize <= 20 ? 'disco' : 'private',
      comparisonNote: session.selections.groupSize <= 20 
        ? 'For smaller groups, disco cruises offer great value and energy!'
        : 'For larger groups, private cruises provide more space and flexibility.'
    };
  }, [isEventTypeBachelorette, session, boats, discoPackages]);
  
  return {
    // State
    session,
    isLoading,
    isValidating,
    error,
    
    // Selections
    selections: session?.selections || null,
    pricing: session?.pricing || null,
    validation: session?.validation || null,
    
    // Options
    availableBoats: boats,
    availableTimeSlots: [], // Would be populated from availability API
    discoPackages,
    addOnPackages,
    
    // Bachelor/Bachelorette Intelligence
    bachelorComparison,
    showBachelorComparison: isEventTypeBachelorette,
    
    // Actions
    updateSelections,
    selectBoat,
    selectTimeSlot,
    selectCruiseType,
    selectDiscoPackage,
    toggleAddOnPackage,
    updateContactInfo,
    
    // Validation & Processing
    validateCheckout,
    refreshPricing,
    processCheckout,
    
    // Utility
    reset,
    canProceedToPayment,
    isEventTypeBachelorette,
    needsHoldRenewal
  };
};