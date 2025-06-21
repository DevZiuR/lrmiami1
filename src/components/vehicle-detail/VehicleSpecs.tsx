import React from 'react';
import { Vehicle } from '@/hooks/useVehicles';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

const VehicleSpecs: React.FC<VehicleSpecsProps> = ({ vehicle }) => {
  const specs = [
    {
      category: 'Performance',
      items: [
        { label: 'Fuel Type', value: vehicle.fuel_type || 'N/A' },
        { label: 'Transmission', value: vehicle.transmission || 'N/A' },
      ]
    },
    {
      category: 'Design',
      items: [
        { label: 'Year', value: vehicle.year?.toString() || 'N/A' },
        { label: 'Exterior Color', value: vehicle.color_exterior || 'N/A' },
        { label: 'Interior Color', value: vehicle.color_interior || 'N/A' },
      ]
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
        Technical <span className="text-gradient-gold">Specifications</span>
      </h2>

      <div className="space-y-8">
        {specs.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-steel-1/10 rounded-lg p-6 border border-steel-2/20">
            <h3 className="text-xl font-semibold text-gold-accent mb-4 pb-2 border-b border-steel-2/20">
              {section.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center py-2">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Availability Status */}
        <div className="bg-steel-1/10 rounded-lg p-6 border border-steel-2/20">
          <h3 className="text-xl font-semibold text-gold-accent mb-4 pb-2 border-b border-steel-2/20">
            Availability
          </h3>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${vehicle.is_available ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-white font-medium">
              {vehicle.is_available ? 'Available for Booking' : 'Currently Unavailable'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;
