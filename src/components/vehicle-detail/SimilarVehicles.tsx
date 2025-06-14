
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Vehicle } from '@/hooks/useVehicles';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SimilarVehiclesProps {
  currentVehicle: Vehicle;
}

const SimilarVehicles: React.FC<SimilarVehiclesProps> = ({ currentVehicle }) => {
  const { data: similarVehicles } = useQuery({
    queryKey: ['similar-vehicles', currentVehicle.brand, currentVehicle.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('brand', currentVehicle.brand)
        .neq('id', currentVehicle.id)
        .eq('is_available', true)
        .limit(3);

      if (error) throw error;
      return data as Vehicle[];
    },
  });

  if (!similarVehicles || similarVehicles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            You Might Also <span className="text-gradient-gold">Like</span>
          </h2>
          <p className="text-xl text-gray-400">
            Discover more vehicles from our exclusive collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarVehicles.map((vehicle) => (
            <div key={vehicle.id} className="group">
              <div className="bg-steel-1/10 rounded-lg overflow-hidden border border-steel-2/20 hover:border-gold-accent/50 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={vehicle.images?.[0] || '/placeholder.svg'}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-white mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  
                  {vehicle.variant && (
                    <p className="text-steel-3 mb-3">{vehicle.variant}</p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    {vehicle.power_hp && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-gold-accent">{vehicle.power_hp}</div>
                        <div className="text-xs text-steel-3">HP</div>
                      </div>
                    )}
                    
                    {vehicle.price_per_day && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-gradient-gold">
                          ${vehicle.price_per_day}
                        </div>
                        <div className="text-xs text-steel-3">per day</div>
                      </div>
                    )}
                  </div>

                  <Link to={`/fleet/${vehicle.id}`}>
                    <Button className="w-full bg-transparent border border-steel-2 text-white hover:bg-gradient-gold hover:text-black hover:border-gold-accent transition-all duration-300">
                      VIEW DETAILS
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/fleet">
            <Button 
              size="lg"
              className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-12 py-4 text-xl"
            >
              VIEW ENTIRE FLEET
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimilarVehicles;
