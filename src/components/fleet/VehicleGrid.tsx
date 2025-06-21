import React from 'react';
import VehicleCard from './VehicleCard';
import { Vehicle } from '@/hooks/useVehicles';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ vehicles }) => {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-white mb-4">No Vehicles Found</h3>
        <p className="text-gray-400">Try selecting a different brand filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle, index) => (
        <div 
          key={vehicle.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <VehicleCard vehicle={vehicle} />
        </div>
      ))}
    </div>
  );
};

export default VehicleGrid;
