
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { differenceInDays, differenceInHours } from 'date-fns';

interface BookingSummaryProps {
  selectedItems: any[];
  bookingDates: { startDate: Date | null; endDate: Date | null };
  onRemoveItem: (id: string) => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedItems,
  bookingDates,
  onRemoveItem
}) => {
  const calculateTotal = () => {
    if (!bookingDates.startDate || !bookingDates.endDate) return 0;

    return selectedItems.reduce((total, item) => {
      if (item.type === 'yacht') {
        const hours = Math.max(4, differenceInHours(bookingDates.endDate!, bookingDates.startDate!));
        return total + (item.pricePerHour * hours);
      } else {
        const days = Math.max(1, differenceInDays(bookingDates.endDate!, bookingDates.startDate!) + 1);
        return total + (item.price_per_day * days);
      }
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-steel-2/30 p-4 z-40">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-black border-gold-1/30 p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Selected Items */}
            <div className="flex-1">
              <h3 className="font-playfair text-xl font-bold text-white mb-4">
                Booking Summary
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-steel-1/20 rounded-lg p-3">
                    <div className="flex-1">
                      <div className="text-white font-medium">
                        {item.type === 'yacht' ? item.name : `${item.brand} ${item.model}`}
                      </div>
                      <div className="text-steel-3 text-sm">
                        {item.type === 'yacht' 
                          ? `$${item.pricePerHour}/hour (4hr min)`
                          : `$${item.price_per_day}/day`
                        }
                      </div>
                    </div>
                    <Button
                      onClick={() => onRemoveItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="text-center lg:text-right space-y-4">
              {bookingDates.startDate && bookingDates.endDate ? (
                <div className="space-y-2">
                  <div className="text-steel-3">
                    {bookingDates.startDate.toLocaleDateString()} - {bookingDates.endDate.toLocaleDateString()}
                  </div>
                  <div className="text-gold-1 text-3xl font-bold">
                    ${total.toLocaleString()}
                  </div>
                  <div className="text-steel-2 text-sm">
                    Total estimated cost
                  </div>
                </div>
              ) : (
                <div className="text-steel-3">
                  Select dates to see pricing
                </div>
              )}

              <Button
                disabled={!bookingDates.startDate || !bookingDates.endDate}
                className="bg-gradient-gold text-black font-semibold px-8 py-3 text-lg hover:scale-105 transition-all duration-300 luxury-shadow disabled:opacity-50"
              >
                Proceed to Booking
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingSummary;
