import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Ship, Clock, Plus, Edit, Trash2, Ticket, AlertCircle, Anchor } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Boat, Booking, DiscoSlot } from "@shared/schema";

const bookingFormSchema = z.object({
  boatId: z.string().min(1, "Boat is required"),
  type: z.enum(["private", "disco"]),
  status: z.enum(["booked", "hold", "blocked", "canceled"]).default("booked"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  partyType: z.string().optional(),
  groupSize: z.number().min(1, "Group size must be at least 1"),
  notes: z.string().optional(),
});

const discoSlotFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  ticketCap: z.number().min(1, "Ticket capacity must be at least 1").default(100),
  status: z.enum(["available", "soldout", "canceled"]).default("available"),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;
type DiscoSlotFormData = z.infer<typeof discoSlotFormSchema>;

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedBoat, setSelectedBoat] = useState<string>("all");
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [discoModalOpen, setDiscoModalOpen] = useState(false);
  const [dayDetailsModalOpen, setDayDetailsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editingDiscoSlot, setEditingDiscoSlot] = useState<DiscoSlot | null>(null);
  const { toast } = useToast();

  // Get current month and year
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  // Fetch boats
  const { data: boats = [] } = useQuery<Boat[]>({
    queryKey: ["/api/boats"],
  });

  // Fetch calendar data for the month
  const { data: calendarData = [] } = useQuery({
    queryKey: ["/api/calendar/month", currentYear, currentMonth, selectedBoat],
    queryFn: async () => {
      const params = new URLSearchParams({
        year: currentYear.toString(),
        month: (currentMonth + 1).toString(),
      });
      if (selectedBoat !== "all") {
        params.append("boatId", selectedBoat);
      }
      const response = await fetch(`/api/calendar/month?${params}`);
      if (!response.ok) throw new Error("Failed to fetch calendar data");
      return response.json();
    },
  });

  // Fetch bookings
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings", currentYear, currentMonth, selectedBoat],
    queryFn: async () => {
      const params = new URLSearchParams({
        year: currentYear.toString(),
        month: (currentMonth + 1).toString(),
      });
      if (selectedBoat !== "all") {
        params.append("boatId", selectedBoat);
      }
      const response = await fetch(`/api/bookings?${params}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return response.json();
    },
  });

  // Fetch disco slots
  const { data: discoSlots = [] } = useQuery<DiscoSlot[]>({
    queryKey: ["/api/disco/slots", currentYear, currentMonth],
    queryFn: async () => {
      const params = new URLSearchParams({
        year: currentYear.toString(),
        month: (currentMonth + 1).toString(),
      });
      const response = await fetch(`/api/disco/slots?${params}`);
      if (!response.ok) throw new Error("Failed to fetch disco slots");
      return response.json();
    },
  });

  // Booking form
  const bookingForm = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      boatId: "",
      type: "private",
      status: "booked",
      startTime: "",
      endTime: "",
      partyType: "",
      groupSize: 1,
      notes: "",
    },
  });

  // Disco slot form
  const discoForm = useForm<DiscoSlotFormData>({
    resolver: zodResolver(discoSlotFormSchema),
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      ticketCap: 100,
      status: "available",
    },
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const formattedData = {
        ...data,
        startTime: new Date(`${selectedDayDate?.toISOString().split('T')[0]}T${data.startTime}:00`).toISOString(),
        endTime: new Date(`${selectedDayDate?.toISOString().split('T')[0]}T${data.endTime}:00`).toISOString(),
      };
      return apiRequest("POST", "/api/bookings", formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/calendar/month"] });
      toast({
        title: "Booking Created",
        description: "The booking has been successfully created.",
      });
      setBookingModalOpen(false);
      bookingForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update booking mutation
  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BookingFormData }) => {
      const formattedData = {
        ...data,
        startTime: new Date(`${selectedDayDate?.toISOString().split('T')[0]}T${data.startTime}:00`).toISOString(),
        endTime: new Date(`${selectedDayDate?.toISOString().split('T')[0]}T${data.endTime}:00`).toISOString(),
      };
      return apiRequest("PATCH", `/api/bookings/${id}`, formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/calendar/month"] });
      toast({
        title: "Booking Updated",
        description: "The booking has been successfully updated.",
      });
      setBookingModalOpen(false);
      setEditingBooking(null);
      bookingForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete booking mutation
  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/calendar/month"] });
      toast({
        title: "Booking Deleted",
        description: "The booking has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Create disco slot mutation
  const createDiscoSlotMutation = useMutation({
    mutationFn: async (data: DiscoSlotFormData) => {
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(),
        startTime: new Date(`${data.date}T${data.startTime}:00`).toISOString(),
        endTime: new Date(`${data.date}T${data.endTime}:00`).toISOString(),
      };
      return apiRequest("POST", "/api/disco/slots", formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/disco/slots"] });
      queryClient.invalidateQueries({ queryKey: ["/api/calendar/month"] });
      toast({
        title: "Disco Slot Created",
        description: "The disco cruise slot has been successfully created.",
      });
      setDiscoModalOpen(false);
      discoForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create disco slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update disco slot mutation
  const updateDiscoSlotMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DiscoSlot> }) => {
      return apiRequest("PATCH", `/api/disco/slots/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/disco/slots"] });
      queryClient.invalidateQueries({ queryKey: ["/api/calendar/month"] });
      toast({
        title: "Disco Slot Updated",
        description: "The disco cruise slot has been successfully updated.",
      });
      setEditingDiscoSlot(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update disco slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Navigation functions
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    const dayBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.startTime).toISOString().split('T')[0];
      return bookingDate === dateStr && (selectedBoat === "all" || booking.boatId === selectedBoat);
    });

    const dayDiscoSlots = discoSlots.filter(slot => {
      const slotDate = new Date(slot.date).toISOString().split('T')[0];
      return slotDate === dateStr;
    });

    return { bookings: dayBookings, discoSlots: dayDiscoSlots };
  };

  // Handle day click
  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDayDate(date);
    setDayDetailsModalOpen(true);
  };

  // Handle booking submit
  const handleBookingSubmit = (data: BookingFormData) => {
    if (editingBooking) {
      updateBookingMutation.mutate({ id: editingBooking.id, data });
    } else {
      createBookingMutation.mutate(data);
    }
  };

  // Handle disco slot submit
  const handleDiscoSlotSubmit = (data: DiscoSlotFormData) => {
    createDiscoSlotMutation.mutate(data);
  };

  // Open edit booking modal
  const openEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    const startTime = new Date(booking.startTime);
    const endTime = new Date(booking.endTime);
    
    bookingForm.reset({
      boatId: booking.boatId || "",
      type: booking.type as "private" | "disco",
      status: booking.status as "booked" | "hold" | "blocked" | "canceled",
      startTime: `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`,
      endTime: `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`,
      partyType: booking.partyType || "",
      groupSize: booking.groupSize,
      notes: booking.notes || "",
    });
    setBookingModalOpen(true);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked": return "bg-austin-500";
      case "hold": return "bg-marine-400";
      case "blocked": return "bg-gray-500";
      case "canceled": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  // Get boat by ID
  const getBoatById = (boatId: string) => {
    return boats.find(boat => boat.id === boatId);
  };

  // Custom day content renderer for calendar
  const DayContent = ({ date }: { date: Date }) => {
    const { bookings: dayBookings, discoSlots: dayDiscoSlots } = getEventsForDate(date);
    const hasEvents = dayBookings.length > 0 || dayDiscoSlots.length > 0;

    return (
      <div className="relative w-full h-full min-h-[60px] p-1">
        <div className="text-sm font-medium">{date.getDate()}</div>
        {hasEvents && (
          <div className="absolute bottom-1 left-1 right-1 space-y-0.5">
            {dayBookings.slice(0, 2).map((booking, idx) => (
              <div
                key={booking.id}
                className={`h-1.5 rounded-full ${getStatusColor(booking.status)}`}
                title={`${booking.partyType || 'Booking'} - ${booking.groupSize} guests`}
              />
            ))}
            {dayDiscoSlots.slice(0, 1).map((slot) => (
              <div
                key={slot.id}
                className="h-1.5 rounded-full bg-yellow-500"
                title={`Disco: ${slot.ticketsSold}/${slot.ticketCap} tickets`}
              />
            ))}
            {(dayBookings.length > 2 || dayDiscoSlots.length > 1) && (
              <div className="text-[10px] text-muted-foreground text-center">
                +{dayBookings.length + dayDiscoSlots.length - 3} more
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="shadow-lg" data-testid="calendar-header">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-austin-500" />
                Booking Calendar
              </CardTitle>
              <CardDescription>Manage boat bookings and disco cruises</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Boat Selector */}
              <Select value={selectedBoat} onValueChange={setSelectedBoat}>
                <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-boat">
                  <Ship className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select boat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" data-testid="select-boat-all">All Boats</SelectItem>
                  {boats.map(boat => (
                    <SelectItem key={boat.id} value={boat.id} data-testid={`select-boat-${boat.id}`}>
                      {boat.name} (Cap: {boat.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth("prev")}
                  data-testid="button-prev-month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="min-w-[140px] text-center font-medium">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth("next")}
                  data-testid="button-next-month"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-austin-500" />
              <span>Private Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
              <span>Disco Cruise</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-marine-400" />
              <span>On Hold</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500" />
              <span>Blocked</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => {
                setEditingBooking(null);
                bookingForm.reset();
                setBookingModalOpen(true);
              }}
              className="bg-austin-500 hover:bg-austin-600"
              data-testid="button-add-booking"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Booking
            </Button>
            <Button
              onClick={() => {
                discoForm.reset();
                setDiscoModalOpen(true);
              }}
              variant="outline"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              data-testid="button-add-disco"
            >
              <Ticket className="h-4 w-4 mr-2" />
              Add Disco Cruise
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="shadow-lg" data-testid="calendar-grid">
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            selected={selectedDayDate || undefined}
            onSelect={handleDayClick}
            month={selectedDate}
            className="w-full"
            classNames={{
              months: "w-full",
              month: "w-full",
              table: "w-full",
              head_row: "flex w-full",
              head_cell: "flex-1 text-muted-foreground font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "flex-1 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
              day: "h-16 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
            }}
            components={{
              Day: ({ date, ...props }) => {
                if (!date) return null;
                return (
                  <button {...props} className="h-full w-full">
                    <DayContent date={date} />
                  </button>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Day Details Modal */}
      <Dialog open={dayDetailsModalOpen} onOpenChange={setDayDetailsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]" data-testid="modal-day-details">
          <DialogHeader>
            <DialogTitle>
              {selectedDayDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </DialogTitle>
            <DialogDescription>
              View and manage bookings for this date
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[400px] pr-4">
            {selectedDayDate && (
              <>
                {/* Private Bookings */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Anchor className="h-4 w-4 text-austin-500" />
                    Private Bookings
                  </h3>
                  {getEventsForDate(selectedDayDate).bookings.length > 0 ? (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDayDate).bookings.map(booking => {
                        const boat = getBoatById(booking.boatId || '');
                        const startTime = new Date(booking.startTime);
                        const endTime = new Date(booking.endTime);
                        
                        return (
                          <Card key={booking.id} className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status}
                                  </Badge>
                                  {boat && (
                                    <span className="text-sm font-medium">{boat.name}</span>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  <Clock className="inline h-3 w-3 mr-1" />
                                  {startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                  {endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                {booking.partyType && (
                                  <div className="text-sm">
                                    Party Type: <span className="font-medium">{booking.partyType}</span>
                                  </div>
                                )}
                                <div className="text-sm">
                                  <Users className="inline h-3 w-3 mr-1" />
                                  {booking.groupSize} guests
                                </div>
                                {booking.notes && (
                                  <div className="text-sm text-muted-foreground mt-2">
                                    {booking.notes}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openEditBooking(booking)}
                                  data-testid={`button-edit-booking-${booking.id}`}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this booking?")) {
                                      deleteBookingMutation.mutate(booking.id);
                                    }
                                  }}
                                  data-testid={`button-delete-booking-${booking.id}`}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No private bookings for this date</p>
                  )}
                </div>

                {/* Disco Cruises */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-yellow-500" />
                    Disco Cruises
                  </h3>
                  {getEventsForDate(selectedDayDate).discoSlots.length > 0 ? (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDayDate).discoSlots.map(slot => {
                        const startTime = new Date(slot.startTime);
                        const endTime = new Date(slot.endTime);
                        const soldPercentage = (slot.ticketsSold / slot.ticketCap) * 100;
                        
                        return (
                          <Card key={slot.id} className="p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <Badge variant={slot.status === "available" ? "default" : slot.status === "soldout" ? "destructive" : "secondary"}>
                                    {slot.status}
                                  </Badge>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    <Clock className="inline h-3 w-3 mr-1" />
                                    {startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                    {endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingDiscoSlot(slot);
                                    // You can implement disco slot editing here
                                  }}
                                  data-testid={`button-edit-disco-${slot.id}`}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Tickets Sold</span>
                                  <span className="font-medium">{slot.ticketsSold} / {slot.ticketCap}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-yellow-500 h-2 rounded-full transition-all"
                                    style={{ width: `${Math.min(soldPercentage, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No disco cruises scheduled for this date</p>
                  )}
                </div>
              </>
            )}
          </ScrollArea>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDayDetailsModalOpen(false)}
              data-testid="button-close-day-details"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="max-w-md" data-testid="modal-booking">
          <DialogHeader>
            <DialogTitle>
              {editingBooking ? "Edit Booking" : "Add New Booking"}
            </DialogTitle>
            <DialogDescription>
              {editingBooking ? "Update the booking details" : "Create a new boat booking"}
            </DialogDescription>
          </DialogHeader>

          <Form {...bookingForm}>
            <form onSubmit={bookingForm.handleSubmit(handleBookingSubmit)} className="space-y-4">
              <FormField
                control={bookingForm.control}
                name="boatId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Boat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="input-booking-boat">
                          <SelectValue placeholder="Select a boat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boats.map(boat => (
                          <SelectItem key={boat.id} value={boat.id}>
                            {boat.name} (Capacity: {boat.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={bookingForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="input-booking-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="private">Private Cruise</SelectItem>
                        <SelectItem value="disco">Disco Cruise</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={bookingForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="input-booking-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="booked">Booked</SelectItem>
                        <SelectItem value="hold">On Hold</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={bookingForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} data-testid="input-booking-start-time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookingForm.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} data-testid="input-booking-end-time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={bookingForm.control}
                name="partyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Party Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Birthday, Wedding, Corporate" {...field} data-testid="input-booking-party-type" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={bookingForm.control}
                name="groupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        data-testid="input-booking-group-size"
                      />
                    </FormControl>
                    <FormMessage />
                    {bookingForm.watch("boatId") && boats.find(b => b.id === bookingForm.watch("boatId")) && (
                      <p className="text-xs text-muted-foreground">
                        {(() => {
                          const boat = boats.find(b => b.id === bookingForm.watch("boatId"));
                          const size = bookingForm.watch("groupSize");
                          if (!boat) return null;
                          if (size > boat.maxCapacity) {
                            return (
                              <span className="text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Exceeds maximum capacity ({boat.maxCapacity})
                              </span>
                            );
                          }
                          if (boat.extraCrewThreshold && size >= boat.extraCrewThreshold) {
                            return (
                              <span className="text-orange-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Extra crew required for {boat.extraCrewThreshold}+ guests
                              </span>
                            );
                          }
                          return `Capacity: ${boat.capacity} (max ${boat.maxCapacity})`;
                        })()}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={bookingForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes..."
                        className="resize-none"
                        {...field}
                        data-testid="input-booking-notes"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setBookingModalOpen(false);
                    setEditingBooking(null);
                    bookingForm.reset();
                  }}
                  data-testid="button-cancel-booking"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-austin-500 hover:bg-austin-600" data-testid="button-save-booking">
                  {editingBooking ? "Update" : "Create"} Booking
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Disco Slot Modal */}
      <Dialog open={discoModalOpen} onOpenChange={setDiscoModalOpen}>
        <DialogContent className="max-w-md" data-testid="modal-disco">
          <DialogHeader>
            <DialogTitle>Add Disco Cruise Slot</DialogTitle>
            <DialogDescription>
              Create a new disco cruise slot for ticket sales
            </DialogDescription>
          </DialogHeader>

          <Form {...discoForm}>
            <form onSubmit={discoForm.handleSubmit(handleDiscoSlotSubmit)} className="space-y-4">
              <FormField
                control={discoForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-disco-date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={discoForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} data-testid="input-disco-start-time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={discoForm.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} data-testid="input-disco-end-time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={discoForm.control}
                name="ticketCap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        data-testid="input-disco-ticket-cap"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={discoForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="input-disco-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="soldout">Sold Out</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDiscoModalOpen(false);
                    discoForm.reset();
                  }}
                  data-testid="button-cancel-disco"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white" data-testid="button-save-disco">
                  Create Disco Slot
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}