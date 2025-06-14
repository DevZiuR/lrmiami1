import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FooterGradient from '@/components/FooterGradient';
import VehicleGrid from '@/components/fleet/VehicleGrid';
import VehicleFilter from '@/components/fleet/VehicleFilter';
import { useVehicles } from '@/hooks/useVehicles';

const Fleet = () => {
  const { data: vehicles, isLoading, error } = useVehicles();
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const filteredVehicles = vehicles?.filter(vehicle => 
    selectedBrand === 'All' || vehicle.brand === selectedBrand
  ) || [];

  const brands = ['All', ...new Set(vehicles?.map(v => v.brand) || [])];

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Fleet</h2>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
            ELITE <span className="text-gradient-gold">FLEET</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Handpicked exotic vehicles for the discerning driver. Each car represents 
            the pinnacle of automotive excellence and luxury.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-black/50 backdrop-blur-sm border-b border-steel-2/20">
        <div className="max-w-7xl mx-auto px-4">
          <VehicleFilter 
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandSelect={setSelectedBrand}
          />
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-steel-1/20 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <VehicleGrid vehicles={filteredVehicles} />
          )}
        </div>
      </section>

      <FooterGradient />
      <Footer />
    </div>
  );
};

export default Fleet;
