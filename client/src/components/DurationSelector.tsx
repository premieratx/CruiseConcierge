import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DurationSelectorProps {
  selectedDuration: '3-hour' | '4-hour' | null;
  onDurationChange: (duration: '3-hour' | '4-hour') => void;
  availableDurations: Array<'3-hour' | '4-hour'>;
  className?: string;
  disabled?: boolean;
}

export const DurationSelector = ({
  selectedDuration,
  onDurationChange,
  availableDurations = ['3-hour', '4-hour'],
  className,
  disabled = false,
}: DurationSelectorProps) => {
  const durationOptions = [
    {
      id: '3-hour',
      label: '3-Hour Cruise',
      description: 'Perfect for shorter celebrations',
      icon: Clock,
      price: 'Starting at $125/hour',
      popular: false,
    },
    {
      id: '4-hour',
      label: '4-Hour Cruise',
      description: 'Extended experience with more time to enjoy',
      icon: Timer,
      price: 'Starting at $125/hour',
      popular: true,
    },
  ].filter(option => availableDurations.includes(option.id as '3-hour' | '4-hour'));

  return (
    <Card className={cn("w-full", className)} data-testid="duration-selector">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Choose Cruise Duration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select your preferred cruise length. Time slots will be filtered based on your selection.
        </p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedDuration || ''}
          onValueChange={(value) => onDurationChange(value as '3-hour' | '4-hour')}
          disabled={disabled}
          className="space-y-3"
          data-testid="duration-radio-group"
        >
          {durationOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedDuration === option.id;
            
            return (
              <div key={option.id} className="relative">
                <Label
                  htmlFor={`duration-${option.id}`}
                  className={cn(
                    "flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-muted/50",
                    isSelected 
                      ? "border-primary bg-primary/5" 
                      : "border-border",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                  data-testid={`duration-option-${option.id}`}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`duration-${option.id}`}
                    className="mt-1"
                    disabled={disabled}
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-lg">
                          {option.label}
                        </span>
                        {option.popular && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {option.price}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        
        {selectedDuration && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary font-medium">
              ✨ Great choice! We'll now show you all available {selectedDuration.replace('-', ' ')} time slots for your selected date.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};