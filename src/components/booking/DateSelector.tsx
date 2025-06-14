
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

interface DateSelectorProps {
  bookingDates: { startDate: Date | null; endDate: Date | null };
  onDatesChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ bookingDates, onDatesChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <div className="space-y-2">
        <label className="text-steel-3 text-sm font-medium">Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal bg-black border-steel-2 text-white hover:bg-steel-1/20"
            >
              {bookingDates.startDate ? (
                format(bookingDates.startDate, "PPP")
              ) : (
                <span className="text-steel-3">Pick start date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-black border-steel-2">
            <Calendar
              mode="single"
              selected={bookingDates.startDate}
              onSelect={(date) => onDatesChange({ ...bookingDates, startDate: date })}
              disabled={(date) => date < new Date()}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-steel-3 text-sm font-medium">End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal bg-black border-steel-2 text-white hover:bg-steel-1/20"
            >
              {bookingDates.endDate ? (
                format(bookingDates.endDate, "PPP")
              ) : (
                <span className="text-steel-3">Pick end date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-black border-steel-2">
            <Calendar
              mode="single"
              selected={bookingDates.endDate}
              onSelect={(date) => onDatesChange({ ...bookingDates, endDate: date })}
              disabled={(date) => date < (bookingDates.startDate || new Date())}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateSelector;
