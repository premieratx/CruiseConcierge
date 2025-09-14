import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users } from "lucide-react";

interface AvailabilitySlot {
  id?: string;
  date: string;
  time: string;
  boat: string;
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
  capacity: number;
  bookedBy?: string;
  slotReference?: string;
  pricePerPerson?: number;
  basePrice?: number;
}

interface AvailabilityGridProps {
  onSlotSelect?: (slot: AvailabilitySlot) => void;
  selectedQuoteId?: string;
  groupSize?: number;
}

export function AvailabilityGrid({ onSlotSelect, selectedQuoteId, groupSize: propGroupSize }: AvailabilityGridProps) {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [groupSize, setGroupSize] = useState(propGroupSize?.toString() || "15");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAvailability();
  }, [selectedDate, groupSize]);

  useEffect(() => {
    if (propGroupSize) {
      setGroupSize(propGroupSize.toString());
    }
  }, [propGroupSize]);

  const loadAvailability = async () => {
    setIsLoading(true);
    try {
      const startDate = selectedDate;
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 7);

      const response = await apiRequest("GET", 
        `/api/availability?startDate=${startDate}&endDate=${endDate.toISOString().split('T')[0]}&groupSize=${groupSize}`
      );
      const data = await response.json();
      setAvailability(data.availability || []);
    } catch (error) {
      console.error("Failed to load availability:", error);
      toast({
        title: "Error",
        description: "Failed to load availability. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string, capacity: number, groupSizeNum: number) => {
    if (status === 'BOOKED') {
      return <Badge variant="secondary" className="text-xs">Booked</Badge>;
    }
    if (status === 'MAINTENANCE') {
      return <Badge variant="destructive" className="text-xs">Maintenance</Badge>;
    }
    if (capacity < groupSizeNum) {
      return <Badge variant="outline" className="text-xs">Too Small</Badge>;
    }
    return <Badge variant="default" className="text-xs bg-green-500">Available</Badge>;
  };

  const groupedByBoat = availability.reduce((acc, slot) => {
    if (!acc[slot.boat]) {
      acc[slot.boat] = [];
    }
    acc[slot.boat].push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  const handleSlotSelect = (slot: AvailabilitySlot, time: string) => {
    if (slot.status !== 'AVAILABLE' || slot.capacity < groupSizeNum) return;
    
    const fullSlot = {
      ...slot,
      time,
      slotReference: `${slot.date}-${time}-${slot.boat}`,
    };
    
    const slotId = `${slot.date}-${time}-${slot.boat}`;
    setSelectedSlot(slotId);
    
    if (onSlotSelect) {
      onSlotSelect(fullSlot);
    }
    
    toast({
      title: "Slot Selected",
      description: `${slot.boat} on ${new Date(slot.date).toLocaleDateString()} at ${time}`,
    });
  };
  
  const togglePricingDisplay = () => {
    setShowPricing(!showPricing);
  };

  const groupSizeNum = parseInt(groupSize);

  return (
    <Card className="boat-shadow" data-testid="availability-grid">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg font-heading flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span data-testid="text-availability-title">Real-Time Availability</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground" data-testid="text-availability-subtitle">
          Connected to Google Sheets
        </p>
      </CardHeader>

      <CardContent className="p-4">
        {/* Search Filters */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
            <Label className="text-xs font-medium mb-1" htmlFor="group-size">
              Group Size
            </Label>
            <Select value={groupSize} onValueChange={setGroupSize}>
              <SelectTrigger className="text-sm" data-testid="select-group-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 people</SelectItem>
                <SelectItem value="10">10 people</SelectItem>
                <SelectItem value="15">15 people</SelectItem>
                <SelectItem value="20">20 people</SelectItem>
                <SelectItem value="25">25 people</SelectItem>
                <SelectItem value="30">30 people</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-medium mb-1" htmlFor="date-picker">
              Date
            </Label>
            <Input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm"
              data-testid="input-date-picker"
            />
          </div>
          </div>
          
          {/* Additional Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePricingDisplay}
              className="text-xs"
              data-testid="button-toggle-pricing"
            >
              {showPricing ? 'Hide' : 'Show'} Pricing
            </Button>
            
            {selectedSlot && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedSlot(null)}
                className="text-xs"
                data-testid="button-clear-selection"
              >
                Clear Selection
              </Button>
            )}
            
            {selectedQuoteId && (
              <Badge variant="secondary" className="text-xs">
                Quote: {selectedQuoteId}
              </Badge>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8" data-testid="loading-availability">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="ml-2 text-sm text-muted-foreground">Loading availability...</span>
          </div>
        )}

        {/* Available Boats */}
        {!isLoading && (
          <div className="space-y-3">
            {selectedSlot && (
              <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="default">Selected Slot</Badge>
                  <span className="text-sm font-medium">Ready for Quote Match</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Slot Reference: <code className="bg-muted px-1 rounded">{selectedSlot}</code>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This slot will be automatically referenced in your quote
                </p>
              </div>
            )}
            
            {Object.keys(groupedByBoat).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground" data-testid="no-availability">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No availability found for selected criteria</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadAvailability}
                  className="mt-2 text-xs"
                  data-testid="button-reload-availability"
                >
                  Reload Availability
                </Button>
              </div>
            ) : (
              Object.entries(groupedByBoat).map(([boatName, slots]) => {
                const boat = slots[0];
                const availableSlots = slots.filter(s => s.status === 'AVAILABLE' && s.capacity >= groupSizeNum);
                
                return (
                  <div
                    key={boatName}
                    className={`border border-border rounded-lg p-3 transition-all cursor-pointer ${
                      availableSlots.length > 0 
                        ? 'bg-gradient-to-r from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/15'
                        : 'bg-gradient-to-r from-marine-50 to-marine-100 hover:from-marine-100 hover:to-marine-200'
                    }`}
                    data-testid={`boat-card-${boatName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-sm flex items-center space-x-1">
                          <span data-testid={`text-boat-name-${boatName.toLowerCase().replace(/\s+/g, '-')}`}>
                            {boatName}
                          </span>
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span data-testid={`text-boat-capacity-${boatName.toLowerCase().replace(/\s+/g, '-')}`}>
                            Capacity: {boat.capacity} people
                          </span>
                        </p>
                      </div>
                      {getStatusBadge(
                        availableSlots.length > 0 ? 'AVAILABLE' : 'BOOKED',
                        boat.capacity,
                        groupSizeNum
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {['12:00', '15:00', '18:00'].map(time => {
                        const slot = slots.find(s => s.time === time) || {
                          date: selectedDate,
                          time,
                          boat: boatName,
                          status: 'AVAILABLE' as const,
                          capacity: boat.capacity,
                          pricePerPerson: 2500, // $25 per person base price
                          basePrice: 60000, // $600 base price
                        };
                        const isAvailable = slot && slot.status === 'AVAILABLE' && slot.capacity >= groupSizeNum;
                        
                        const slotId = `${slot?.date}-${time}-${boatName}`;
                        const isSelected = selectedSlot === slotId;
                        
                        return (
                          <Button
                            key={time}
                            variant={isSelected ? "default" : isAvailable ? "outline" : "secondary"}
                            size="sm"
                            disabled={!isAvailable}
                            className={`h-8 text-xs relative ${
                              isSelected ? 'ring-2 ring-primary' : ''
                            } ${
                              isAvailable ? 'hover:bg-primary/10' : ''
                            }`}
                            onClick={() => handleSlotSelect(slot!, time)}
                            data-testid={`button-time-slot-${time.replace(':', '')}-${boatName.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {time} {time >= '12:00' ? 'PM' : 'AM'}
                            {slot?.pricePerPerson && showPricing && (
                              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1">
                                ${(slot.pricePerPerson / 100).toFixed(0)}
                              </span>
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
