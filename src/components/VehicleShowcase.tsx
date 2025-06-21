import React from 'react';
import VehicleCard from './VehicleCard';
import { Button } from '@/components/ui/button';
import { useVehicles } from '@/hooks/useVehicles';

const VehicleShowcase = () => {
  const { data: vehicles, isLoading, error } = useVehicles();

  // Filter for the 4 specific elite vehicles
  const eliteVehicles = vehicles?.filter(vehicle => {
    const vehicleName = `${vehicle.brand} ${vehicle.model}`.toLowerCase();
    const variant = vehicle.variant?.toLowerCase() || '';
    const color = vehicle.color_exterior?.toLowerCase() || '';
    
    return (
      // Urus Orange
      (vehicleName.includes('urus') && color.includes('orange')) ||
      // Cullinan White
      (vehicleName.includes('cullinan') && color.includes('white')) ||
      // G63
      (vehicleName.includes('g63') || (vehicleName.includes('g-wagon') && variant.includes('63'))) ||
      // 580 Maybach
      (vehicleName.includes('maybach') && variant.includes('580'))
    );
  }).slice(0, 4); // Limit to maximum 4 vehicles

  if (isLoading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Elite <span className="text-gradient-gold">Fleet</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Each vehicle in our collection represents the pinnacle of automotive excellence, 
              curated for those who demand nothing but the best.
            </p>
          </div>
          <div className="text-center text-steel-2">
            <p className="text-xl">Loading our exclusive fleet...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Vehicle showcase error:', error);
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Elite <span className="text-gradient-gold">Fleet</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Each vehicle in our collection represents the pinnacle of automotive excellence, 
              curated for those who demand nothing but the best.
            </p>
          </div>
          <div className="text-center text-red-400">
            <p className="text-xl">Unable to load fleet at this moment. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
            Elite <span className="text-gradient-gold">Fleet</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each vehicle in our collection represents the <span className="text-gradient-gold font-bold">pinnacle</span> of automotive <span className="text-gradient-gold font-bold">excellence</span>, 
            curated for those who demand <span className="text-gradient-gold font-bold">nothing but the best</span>.
          </p>
        </div>
        
        {/* Vehicle Cards */}
        <div className="space-y-24">
          {eliteVehicles?.map((vehicle, index) => (
            <div key={vehicle.id} className="animate-fade-in-up">
              <VehicleCard
                id={vehicle.id}
                title={`${vehicle.brand} ${vehicle.model}`}
                subtitle={vehicle.variant || undefined}
                description={vehicle.description || undefined}
                images={vehicle.images || []}
                reverse={index % 2 === 1}
              />
            </div>
          ))}
        </div>
        
        {/* VIEW MORE ELITE CARS Button */}
        <div className="text-center mt-16">
          <a href="/fleet">
            <Button
              size="lg"
              className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-12 py-4 text-xl luxury-shadow-steel"
            >
              VIEW MORE ELITE CARS
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
