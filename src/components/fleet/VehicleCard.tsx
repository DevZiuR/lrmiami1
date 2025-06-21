import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Vehicle } from '@/hooks/useVehicles';
import { generateVehicleUrl } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const images = vehicle.images || [];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on image navigation or button
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest('button') || e.target.closest('a'))
    ) {
      return;
    }
    navigate(`/fleet/${generateVehicleUrl(vehicle)}`);
  };

  return (
    <div 
      className="bg-steel-1/10 rounded-lg overflow-hidden border border-steel-2/20 hover:border-gold-accent/50 transition-all duration-300 group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={images[currentImageIndex] || '/placeholder.svg'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-gold-accent w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            vehicle.is_available 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {vehicle.is_available ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-1">
            {vehicle.brand} {vehicle.model}
          </h3>
          
          {vehicle.variant && (
            <p className="text-steel-3 text-sm">{vehicle.variant}</p>
          )}
        </div>

        {/* Vehicle Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          {vehicle.year && (
            <div className="text-center">
              <div className="text-lg font-bold text-white">{vehicle.year}</div>
              <div className="text-steel-3 text-xs">Year</div>
            </div>
          )}
        </div>

        {/* Pricing */}
        {vehicle.price_per_day && (
          <div className="mb-4 text-center">
            <div className="text-2xl font-bold text-gradient-gold">
              ${vehicle.price_per_day}
            </div>
            <div className="text-steel-3 text-sm">per day</div>
            {vehicle.price_per_hour && (
              <div className="text-white text-sm mt-1">
                ${vehicle.price_per_hour}/hour
              </div>
            )}
          </div>
        )}

        {/* Single Action Button */}
        <Link to={`/fleet/${generateVehicleUrl(vehicle)}`} onClick={(e) => e.stopPropagation()}>
          <Button className="w-full bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold">
            VIEW DETAILS
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
