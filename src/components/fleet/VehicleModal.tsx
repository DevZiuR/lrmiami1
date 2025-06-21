import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Vehicle } from '@/hooks/useVehicles';

interface VehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ vehicle, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black border-steel-2/30 text-white">
        <DialogHeader>
          <DialogTitle className="font-playfair text-3xl font-bold text-white">
            {vehicle.brand} {vehicle.model}
          </DialogTitle>
          {vehicle.variant && (
            <p className="text-gradient-gold text-xl font-semibold">
              {vehicle.variant}
            </p>
          )}
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            {vehicle.images && vehicle.images.length > 0 && (
              <Carousel className="w-full">
                <CarouselContent>
                  {vehicle.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${vehicle.brand} ${vehicle.model} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {vehicle.images.length > 1 && (
                  <>
                    <CarouselPrevious className="bg-black/50 border-steel-2/30 text-white hover:bg-black/70" />
                    <CarouselNext className="bg-black/50 border-steel-2/30 text-white hover:bg-black/70" />
                  </>
                )}
              </Carousel>
            )}
          </div>
          
          {/* Vehicle Details */}
          <div className="space-y-6">
            {vehicle.description && (
              <p className="text-gray-300 text-lg leading-relaxed">
                {vehicle.description}
              </p>
            )}
            
            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {vehicle.year && (
                  <div>
                    <span className="text-gray-400 text-sm">Year</span>
                    <p className="text-white font-semibold">{vehicle.year}</p>
                  </div>
                )}
                
                {vehicle.fuel_type && (
                  <div>
                    <span className="text-gray-400 text-sm">Fuel Type</span>
                    <p className="text-white font-semibold">{vehicle.fuel_type}</p>
                  </div>
                )}
                
                {vehicle.transmission && (
                  <div>
                    <span className="text-gray-400 text-sm">Transmission</span>
                    <p className="text-white font-semibold">{vehicle.transmission}</p>
                  </div>
                )}
                
                {vehicle.color_exterior && (
                  <div>
                    <span className="text-gray-400 text-sm">Exterior Color</span>
                    <p className="text-white font-semibold">{vehicle.color_exterior}</p>
                  </div>
                )}
                
                {vehicle.color_interior && (
                  <div>
                    <span className="text-gray-400 text-sm">Interior Color</span>
                    <p className="text-white font-semibold">{vehicle.color_interior}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Special Features */}
            {vehicle.special_features && vehicle.special_features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Special Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.special_features.map((feature, index) => (
                    <Badge 
                      key={index}
                      className="bg-gradient-gold text-black font-semibold px-3 py-1"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Pricing */}
            {(vehicle.price_per_day || vehicle.price_per_hour) && (
              <div className="space-y-2 p-4 bg-steel-1/10 rounded-lg">
                <h3 className="text-xl font-bold text-white">Pricing</h3>
                {vehicle.price_per_day && (
                  <p className="text-gradient-gold font-bold text-2xl">
                    ${vehicle.price_per_day}/day
                  </p>
                )}
                {vehicle.price_per_hour && (
                  <p className="text-steel-3 text-lg">
                    ${vehicle.price_per_hour}/hour
                  </p>
                )}
              </div>
            )}
            
            {/* Book Now Button */}
            <Button 
              size="lg"
              className="w-full bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold py-4 text-lg luxury-shadow-steel"
            >
              BOOK NOW
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleModal;
