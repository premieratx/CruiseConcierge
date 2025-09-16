import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { format, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { formatCurrency, formatLongDate, formatTimeForDisplay, formatTimeRange } from '@shared/formatters';
import { EVENT_TYPES, CRUISE_TYPES } from '@shared/constants';

interface TimeSlot {
  id: string;
  label: string;
  time: string;
  icon: string;
  popular?: boolean;
}

interface AlternativeDate {
  date: Date;
  timeSlots: TimeSlot[];
  isWeekend: boolean;
  availability: 'high' | 'medium' | 'low';
}

interface AlternativeDatesProps {
  selectedDate: Date;
  groupSize: number;
  onSelectDate: (date: Date, timeSlot: string) => void;
  getTimeSlotsForDate: (date: Date) => TimeSlot[];
  formatCurrency: (cents: number) => string;
  basePrice?: number;
}

export function AlternativeDates({
  selectedDate,
  groupSize,
  onSelectDate,
  getTimeSlotsForDate,
  formatCurrency,
  basePrice = 0
}: AlternativeDatesProps) {
  // Generate alternative dates around the selected date
  const getAlternativeDates = (): AlternativeDate[] => {
    const alternatives: AlternativeDate[] = [];
    const daysToCheck = [-3, -2, -1, 1, 2, 3, 7, 14]; // Days relative to selected date
    
    for (const dayOffset of daysToCheck) {
      const date = addDays(selectedDate, dayOffset);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const timeSlots = getTimeSlotsForDate(date);
      
      // Skip if no time slots available
      if (timeSlots.length === 0) continue;
      
      // Determine availability based on day and time slots
      const availability = isWeekend ? 
        (timeSlots.length > 4 ? 'high' : 'medium') : 
        'high';
      
      alternatives.push({
        date,
        timeSlots,
        isWeekend,
        availability
      });
      
      // Limit to 4 alternative dates
      if (alternatives.length >= 4) break;
    }
    
    return alternatives;
  };

  const alternativeDates = getAlternativeDates();

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-gradient-to-b from-white to-purple-50/30 dark:from-slate-800 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-slate-200 dark:border-slate-700 transition-all w-full hover:shadow-3xl"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Alternative Dates
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Other great dates for your event
        </p>
      </div>

      {/* Alternative Dates List */}
      <div className="space-y-4">
        {alternativeDates.map((altDate, index) => (
          <Card key={index} className="border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {formatLongDate(altDate.date)}
                </CardTitle>
                <div className="flex gap-2">
                  {altDate.isWeekend && (
                    <Badge variant="secondary" className="text-xs">Weekend</Badge>
                  )}
                  <Badge 
                    variant={altDate.availability === 'high' ? 'default' : 'secondary'}
                    className={cn(
                      "text-xs",
                      altDate.availability === 'high' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    )}
                  >
                    {altDate.availability === 'high' ? 'Great Availability' : 
                     altDate.availability === 'medium' ? 'Limited Spots' : 'Few Spots'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Time Slots for Alternative Date */}
              <div className="space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {altDate.timeSlots.length} time slots available
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {altDate.timeSlots.slice(0, 4).map((slot) => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectDate(altDate.date, slot.id)}
                      className="justify-start text-xs h-9"
                      data-testid={`button-alt-date-${format(altDate.date, 'yyyy-MM-dd')}-${slot.id}`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
                {altDate.timeSlots.length > 4 && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">
                    +{altDate.timeSlots.length - 4} more times
                  </p>
                )}
              </div>
              
              {/* Quick Select Button */}
              <Button
                onClick={() => onSelectDate(altDate.date, altDate.timeSlots[0].id)}
                className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                size="sm"
                data-testid={`button-select-alt-date-${format(altDate.date, 'yyyy-MM-dd')}`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Select {format(altDate.date, 'MMM d')}
              </Button>
              
              {/* Price Estimate */}
              {basePrice > 0 && (
                <div className="text-center mt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Starting from {formatCurrency(basePrice)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* More Dates Link */}
      <div className="mt-6 text-center">
        <Button
          variant="link"
          className="text-purple-600 hover:text-purple-700"
          data-testid="button-view-more-dates"
        >
          View calendar for more dates →
        </Button>
      </div>
    </motion.div>
  );
}