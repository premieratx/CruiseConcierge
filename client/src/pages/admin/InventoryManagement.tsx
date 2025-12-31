import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminNoIndex from "@/components/AdminNoIndex";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Edit2, Trash2, Settings, DollarSign, Clock, Users, Anchor, AlertTriangle, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";

interface InventoryItem {
  id: string;
  boatId: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  basePricing: {
    weekday: number;
    friday: number;
    weekend: number;
  };
  allowedEventTypes: string[];
  crewRequirements: {
    standard: number;
    extraThreshold?: number;
    extraCrew?: number;
  };
  amenities: string[];
  features: string[];
  maintenanceBuffer: number;
  status: 'active' | 'maintenance' | 'inactive';
  active: boolean;
}

interface PricingException {
  id: string;
  name: string;
  exceptionType: 'holiday' | 'special_event' | 'dynamic' | 'discount';
  multiplier: number;
  startDate: Date;
  endDate: Date;
  conditions?: {
    minGroupSize?: number;
    maxGroupSize?: number;
    withinHours?: number;
    boatIds?: string[];
    eventTypes?: string[];
  };
  priority: number;
  active: boolean;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  pricing: {
    base: number;
    final: number;
  };
}

export function InventoryManagement() {
  const { toast } = useToast();
  const [selectedBoat, setSelectedBoat] = useState<InventoryItem | null>(null);
  const [isEditingBoat, setIsEditingBoat] = useState(false);
  const [isAddingException, setIsAddingException] = useState(false);
  const [slotDateRange, setSlotDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [expandedBoats, setExpandedBoats] = useState<Set<string>>(new Set());

  // Fetch inventory
  const { data: inventory, isLoading: loadingInventory } = useQuery({
    queryKey: ["/api/inventory"],
  });

  // Fetch pricing exceptions
  const { data: exceptions, isLoading: loadingExceptions } = useQuery({
    queryKey: ["/api/exceptions"],
  });

  // Fetch availability grid for current month
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { data: availabilityGrid } = useQuery({
    queryKey: ["/api/availability/grid", { month: currentMonth, year: currentYear }],
    queryFn: async () => {
      const response = await fetch(`/api/availability/grid?month=${currentMonth}&year=${currentYear}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch availability grid');
      return response.json();
    }
  });

  // Update boat mutation
  const updateBoatMutation = useMutation({
    mutationFn: async (data: Partial<InventoryItem>) => {
      return apiRequest(`/api/inventory/${data.boatId}`, 'PUT', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      toast({ title: "Success", description: "Boat updated successfully" });
      setIsEditingBoat(false);
      setSelectedBoat(null);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update boat",
        variant: "destructive" 
      });
    }
  });

  // Create time slots mutation
  const createSlotsMutation = useMutation({
    mutationFn: async ({ boatId, dateRange, pattern }: any) => {
      return apiRequest(`/api/inventory/${boatId}/slots`, 'POST', { dateRange, pattern });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      toast({ title: "Success", description: "Time slots created successfully" });
      setSlotDateRange({ start: null, end: null });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create time slots",
        variant: "destructive" 
      });
    }
  });

  // Create pricing exception mutation
  const createExceptionMutation = useMutation({
    mutationFn: async (data: Partial<PricingException>) => {
      return apiRequest("/api/exceptions", 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/exceptions"] });
      toast({ title: "Success", description: "Pricing exception created successfully" });
      setIsAddingException(false);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create pricing exception",
        variant: "destructive" 
      });
    }
  });

  // Delete pricing exception mutation
  const deleteExceptionMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/exceptions/${id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/exceptions"] });
      toast({ title: "Success", description: "Pricing exception deleted" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete pricing exception",
        variant: "destructive" 
      });
    }
  });

  // Initialize holidays mutation
  const initializeHolidaysMutation = useMutation({
    mutationFn: async (year: number) => {
      return apiRequest("/api/exceptions/initialize-holidays", 'POST', { year });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/exceptions"] });
      toast({ title: "Success", description: "Holidays initialized successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to initialize holidays",
        variant: "destructive" 
      });
    }
  });

  const toggleBoatExpansion = (boatId: string) => {
    const newExpanded = new Set(expandedBoats);
    if (newExpanded.has(boatId)) {
      newExpanded.delete(boatId);
    } else {
      newExpanded.add(boatId);
    }
    setExpandedBoats(newExpanded);
  };

  const getUtilizationRate = (boatId: string) => {
    // Calculate from availability grid if available
    if (!availabilityGrid?.grid?.days) return 0;
    
    let totalSlots = 0;
    let bookedSlots = 0;
    
    availabilityGrid.grid.days.forEach((day: any) => {
      const boat = day.boats?.find((b: any) => b.boatId === boatId);
      if (boat) {
        totalSlots += boat.slots?.length || 0;
        const booked = boat.slots?.filter((s: any) => s.status === 'booked').length || 0;
        bookedSlots += booked;
      }
    });
    
    return totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;
  };

  if (loadingInventory || loadingExceptions) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading inventory management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <AdminNoIndex />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Manage boats, time slots, and pricing exceptions</p>
        </div>
        <Button
          onClick={() => initializeHolidaysMutation.mutate(currentYear)}
          variant="outline"
          data-testid="button-initialize-holidays"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Initialize {currentYear} Holidays
        </Button>
      </div>

      <Tabs defaultValue="boats" className="space-y-4">
        <TabsList>
          <TabsTrigger value="boats" data-testid="tab-boats">
            <Anchor className="mr-2 h-4 w-4" />
            Boats
          </TabsTrigger>
          <TabsTrigger value="pricing" data-testid="tab-pricing">
            <DollarSign className="mr-2 h-4 w-4" />
            Pricing Exceptions
          </TabsTrigger>
          <TabsTrigger value="availability" data-testid="tab-availability">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Availability Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="boats" className="space-y-4">
          {inventory?.inventory?.map((boat: InventoryItem) => (
            <Card key={boat.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleBoatExpansion(boat.boatId)}
                data-testid={`card-boat-${boat.boatId}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {boat.name}
                        <Badge variant={boat.active ? "default" : "secondary"}>
                          {boat.active ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Capacity: {boat.minCapacity}-{boat.maxCapacity} people | 
                        Utilization: {getUtilizationRate(boat.boatId)}%
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBoat(boat);
                        setIsEditingBoat(true);
                      }}
                      data-testid={`button-edit-boat-${boat.boatId}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {expandedBoats.has(boat.boatId) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {expandedBoats.has(boat.boatId) && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Base Pricing</Label>
                      <div className="space-y-1 mt-1">
                        <div className="text-sm">Weekday: ${(boat.basePricing.weekday / 100).toFixed(2)}/hr</div>
                        <div className="text-sm">Friday: ${(boat.basePricing.friday / 100).toFixed(2)}/hr</div>
                        <div className="text-sm">Weekend: ${(boat.basePricing.weekend / 100).toFixed(2)}/hr</div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Crew Requirements</Label>
                      <div className="space-y-1 mt-1">
                        <div className="text-sm">Standard: {boat.crewRequirements.standard} crew</div>
                        {boat.crewRequirements.extraThreshold && (
                          <div className="text-sm">
                            Extra crew at {boat.crewRequirements.extraThreshold}+ people
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Event Types</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {boat.allowedEventTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {boat.amenities.length > 0 && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Amenities</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {boat.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" data-testid={`button-create-slots-${boat.boatId}`}>
                          <Clock className="mr-2 h-4 w-4" />
                          Create Time Slots
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Time Slots for {boat.name}</DialogTitle>
                          <DialogDescription>
                            Generate time slots for a date range using a recurring pattern
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Start Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {slotDateRange.start ? format(slotDateRange.start, 'PP') : 'Select start'}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={slotDateRange.start || undefined}
                                    onSelect={(date) => setSlotDateRange({ ...slotDateRange, start: date || null })}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {slotDateRange.end ? format(slotDateRange.end, 'PP') : 'Select end'}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={slotDateRange.end || undefined}
                                    onSelect={(date) => setSlotDateRange({ ...slotDateRange, end: date || null })}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                          <div>
                            <Label>Pattern</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select pattern" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weekday">Weekdays (3hr & 4hr)</SelectItem>
                                <SelectItem value="weekend">Weekends (4hr only)</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={() => {
                              if (slotDateRange.start && slotDateRange.end) {
                                createSlotsMutation.mutate({
                                  boatId: boat.boatId,
                                  dateRange: slotDateRange,
                                  pattern: 'daily'
                                });
                              }
                            }}
                            disabled={!slotDateRange.start || !slotDateRange.end}
                            data-testid="button-confirm-create-slots"
                          >
                            Create Slots
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm" data-testid={`button-view-availability-${boat.boatId}`}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      View Availability
                    </Button>
                    
                    <Button variant="outline" size="sm" data-testid={`button-maintenance-${boat.boatId}`}>
                      <Settings className="mr-2 h-4 w-4" />
                      Schedule Maintenance
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Pricing Exceptions</h2>
            <Dialog open={isAddingException} onOpenChange={setIsAddingException}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-exception">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exception
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Pricing Exception</DialogTitle>
                  <DialogDescription>
                    Define special pricing rules for holidays, events, or dynamic conditions
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  createExceptionMutation.mutate({
                    name: formData.get('name') as string,
                    exceptionType: formData.get('type') as any,
                    multiplier: parseFloat(formData.get('multiplier') as string),
                    startDate: new Date(formData.get('startDate') as string),
                    endDate: new Date(formData.get('endDate') as string),
                    priority: parseInt(formData.get('priority') as string),
                    active: true
                  });
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Exception Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Fourth of July Weekend" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="holiday">Holiday</SelectItem>
                          <SelectItem value="special_event">Special Event</SelectItem>
                          <SelectItem value="dynamic">Dynamic Pricing</SelectItem>
                          <SelectItem value="discount">Discount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="multiplier">Price Multiplier</Label>
                      <Input 
                        id="multiplier" 
                        name="multiplier" 
                        type="number" 
                        step="0.1" 
                        placeholder="1.5 = 150%" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" name="startDate" type="date" required />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" name="endDate" type="date" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority (higher overrides lower)</Label>
                    <Input id="priority" name="priority" type="number" defaultValue="50" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit" data-testid="button-confirm-add-exception">Create Exception</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {exceptions?.exceptions?.map((exception: PricingException) => (
              <Card key={exception.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {exception.name}
                        <Badge variant={exception.active ? "default" : "secondary"}>
                          {exception.active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">
                          {(exception.multiplier * 100).toFixed(0)}%
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {format(new Date(exception.startDate), 'PP')} - {format(new Date(exception.endDate), 'PP')}
                        {' • '}Type: {exception.exceptionType}
                        {' • '}Priority: {exception.priority}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExceptionMutation.mutate(exception.id)}
                      data-testid={`button-delete-exception-${exception.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Availability Overview</CardTitle>
              <CardDescription>
                {format(new Date(currentYear, currentMonth - 1), 'MMMM yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
                {availabilityGrid?.grid?.days?.map((day: any) => (
                  <div
                    key={day.date}
                    className={`
                      border rounded-lg p-2 text-center
                      ${day.availability === 'available' ? 'bg-green-50 border-green-200' : ''}
                      ${day.availability === 'limited' ? 'bg-yellow-50 border-yellow-200' : ''}
                      ${day.availability === 'booked' ? 'bg-red-50 border-red-200' : ''}
                      ${day.availability === 'blocked' ? 'bg-gray-50 border-gray-200' : ''}
                    `}
                  >
                    <div className="font-medium">{new Date(day.date).getDate()}</div>
                    <div className="text-xs text-muted-foreground">
                      {day.slots} slots
                    </div>
                    {day.bookings > 0 && (
                      <div className="text-xs font-medium">
                        {day.bookings} booked
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                  <span className="text-sm">Limited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                  <span className="text-sm">Blocked</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {inventory?.inventory?.map((boat: InventoryItem) => (
              <Card key={boat.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{boat.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{getUtilizationRate(boat.boatId)}%</div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Utilization this month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Boat Dialog */}
      <Dialog open={isEditingBoat} onOpenChange={setIsEditingBoat}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit {selectedBoat?.name}</DialogTitle>
            <DialogDescription>
              Update boat configuration and settings
            </DialogDescription>
          </DialogHeader>
          {selectedBoat && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              updateBoatMutation.mutate({
                boatId: selectedBoat.boatId,
                minCapacity: parseInt(formData.get('minCapacity') as string),
                maxCapacity: parseInt(formData.get('maxCapacity') as string),
                basePricing: {
                  weekday: parseFloat(formData.get('weekdayPrice') as string) * 100,
                  friday: parseFloat(formData.get('fridayPrice') as string) * 100,
                  weekend: parseFloat(formData.get('weekendPrice') as string) * 100,
                },
                crewRequirements: {
                  standard: parseInt(formData.get('standardCrew') as string),
                  extraThreshold: parseInt(formData.get('extraThreshold') as string) || undefined,
                  extraCrew: parseInt(formData.get('extraCrew') as string) || undefined,
                },
                maintenanceBuffer: parseInt(formData.get('maintenanceBuffer') as string),
                active: formData.get('active') === 'on'
              });
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minCapacity">Minimum Capacity</Label>
                  <Input 
                    id="minCapacity" 
                    name="minCapacity" 
                    type="number" 
                    defaultValue={selectedBoat.minCapacity} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="maxCapacity">Maximum Capacity</Label>
                  <Input 
                    id="maxCapacity" 
                    name="maxCapacity" 
                    type="number" 
                    defaultValue={selectedBoat.maxCapacity} 
                    required 
                  />
                </div>
              </div>

              <div>
                <Label>Base Pricing (per hour)</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label htmlFor="weekdayPrice" className="text-sm">Weekday</Label>
                    <Input 
                      id="weekdayPrice" 
                      name="weekdayPrice" 
                      type="number" 
                      step="0.01"
                      defaultValue={(selectedBoat.basePricing.weekday / 100).toFixed(2)} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="fridayPrice" className="text-sm">Friday</Label>
                    <Input 
                      id="fridayPrice" 
                      name="fridayPrice" 
                      type="number" 
                      step="0.01"
                      defaultValue={(selectedBoat.basePricing.friday / 100).toFixed(2)} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="weekendPrice" className="text-sm">Weekend</Label>
                    <Input 
                      id="weekendPrice" 
                      name="weekendPrice" 
                      type="number" 
                      step="0.01"
                      defaultValue={(selectedBoat.basePricing.weekend / 100).toFixed(2)} 
                      required 
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Crew Requirements</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label htmlFor="standardCrew" className="text-sm">Standard Crew</Label>
                    <Input 
                      id="standardCrew" 
                      name="standardCrew" 
                      type="number" 
                      defaultValue={selectedBoat.crewRequirements.standard} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="extraThreshold" className="text-sm">Extra Crew Threshold</Label>
                    <Input 
                      id="extraThreshold" 
                      name="extraThreshold" 
                      type="number" 
                      defaultValue={selectedBoat.crewRequirements.extraThreshold} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="extraCrew" className="text-sm">Extra Crew Count</Label>
                    <Input 
                      id="extraCrew" 
                      name="extraCrew" 
                      type="number" 
                      defaultValue={selectedBoat.crewRequirements.extraCrew} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="maintenanceBuffer">Maintenance Buffer (minutes)</Label>
                <Input 
                  id="maintenanceBuffer" 
                  name="maintenanceBuffer" 
                  type="number" 
                  defaultValue={selectedBoat.maintenanceBuffer} 
                  required 
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="active" 
                  name="active" 
                  defaultChecked={selectedBoat.active} 
                />
                <Label htmlFor="active">Active</Label>
              </div>

              <DialogFooter>
                <Button type="submit" data-testid="button-save-boat">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InventoryManagement;