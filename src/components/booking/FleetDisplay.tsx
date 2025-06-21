import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DateSelector from './DateSelector';
import { Vehicle } from '@/hooks/useVehicles';

interface FleetDisplayProps {
  category: 'car' | 'yacht';
  vehicles: Vehicle[];
  isLoading: boolean;
  selectedItems: any[];
  onItemSelect: (item: any) => void;
  bookingDates: { startDate: Date | null; endDate: Date | null };
  onDatesChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
}

const FleetDisplay: React.FC<FleetDisplayProps> = ({
  category,
  vehicles,
  isLoading,
  selectedItems,
  onItemSelect,
  bookingDates,
  onDatesChange
}) => {
  if (category === 'yacht') {
    const yachtData = {
      id: 'yacht-1',
      type: 'yacht',
      name: 'Miami Elite Yacht',
      description: 'Luxury yacht experience with no restrictions',
      pricePerHour: 375,
      image: 'https://i.imgur.com/4OtWjfn.mp4',
      features: ['Bar & Entertainment', 'Spacious Deck', 'Premium Sound System'],
      available: true
    };

    const isSelected = selectedItems.some(item => item.id === yachtData.id);

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold text-white mb-4">
            Luxury Yacht Charter
          </h2>
          <DateSelector 
            bookingDates={bookingDates}
            onDatesChange={onDatesChange}
          />
        </div>

        <Card className="bg-black border-steel-2/30 overflow-hidden luxury-shadow-steel">
          <div className="grid lg:grid-cols-2 gap-8 p-6">
            <div className="relative rounded-lg overflow-hidden">
              <video
                src={yachtData.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {yachtData.available ? 'Available' : 'Booked'}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-playfair text-2xl font-bold text-white">
                {yachtData.name}
              </h3>
              <p className="text-steel-3">{yachtData.description}</p>
              
              <div className="space-y-2">
                <div className="text-gold-1 text-2xl font-bold">
                  ${yachtData.pricePerHour}/hour
                </div>
                <div className="text-steel-2 text-sm">
                  4 hour minimum • No restrictions policy
                </div>
              </div>

              <ul className="space-y-2">
                {yachtData.features.map((feature, index) => (
                  <li key={index} className="text-steel-2 flex items-center">
                    <span className="w-2 h-2 bg-gold-1 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onItemSelect(yachtData)}
                className={`w-full ${
                  isSelected 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gradient-gold hover:scale-105'
                } text-black font-semibold transition-all duration-300`}
              >
                {isSelected ? 'Selected ✓' : 'Add to Booking'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold text-white mb-4">
            Available Fleet
          </h2>
          <DateSelector 
            bookingDates={bookingDates}
            onDatesChange={onDatesChange}
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-steel-1/20 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-playfair text-3xl font-bold text-white mb-4">
          Available Fleet
        </h2>
        <DateSelector 
          bookingDates={bookingDates}
          onDatesChange={onDatesChange}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => {
          const isSelected = selectedItems.some(item => item.id === vehicle.id);
          
          return (
            <Card key={vehicle.id} className="bg-black border-steel-2/30 overflow-hidden luxury-shadow-steel">
              <div className="relative">
                <img
                  src={vehicle.images?.[0] || '/placeholder.svg'}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {vehicle.is_available ? 'Available' : 'Booked'}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-playfair text-xl font-bold text-white">
                  {vehicle.brand} {vehicle.model}
                </h3>
                
                {vehicle.variant && (
                  <p className="text-steel-3">{vehicle.variant}</p>
                )}

                <div className="flex justify-between text-sm text-steel-2">
                  {vehicle.year && (
                    <span>{vehicle.year}</span>
                  )}
                </div>

                <div className="text-gold-1 text-xl font-bold">
                  ${vehicle.price_per_day}/day
                </div>

                <Button
                  onClick={() => onItemSelect(vehicle)}
                  disabled={!vehicle.is_available}
                  className={`w-full ${
                    isSelected 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-gold hover:scale-105'
                  } text-black font-semibold transition-all duration-300 disabled:opacity-50`}
                >
                  {isSelected ? 'Selected ✓' : 'Add to Booking'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FleetDisplay;
