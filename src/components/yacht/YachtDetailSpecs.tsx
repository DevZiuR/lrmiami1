
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, Ruler, Anchor, Waves, Wine, Music, 
  Wifi, Camera, Star, Clock
} from 'lucide-react';

const YachtDetailSpecs = () => {
  const specifications = [
    { icon: Ruler, label: 'Length', value: '65 Feet' },
    { icon: Users, label: 'Capacity', value: '12 Guests' },
    { icon: Anchor, label: 'Type', value: 'Motor Yacht' },
    { icon: Waves, label: 'Draft', value: '4.5 Feet' },
  ];

  const amenities = [
    { icon: Wine, label: 'Full Premium Bar', description: 'Top-shelf liquors and wines' },
    { icon: Music, label: 'Professional Sound System', description: 'Bluetooth connectivity' },
    { icon: Wifi, label: 'High-Speed WiFi', description: 'Stay connected on the water' },
    { icon: Camera, label: 'Entertainment Areas', description: 'Multiple deck spaces' },
    { icon: Waves, label: 'Swimming Platform', description: 'Easy water access' },
    { icon: Star, label: 'No Restrictions Policy', description: 'Complete freedom to enjoy' },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-playfair mb-6 text-gradient-gold">
            YACHT SPECIFICATIONS
          </h2>
          <p className="text-xl text-steel-3 max-w-3xl mx-auto">
            Discover the premium features and amenities that make our yacht the perfect choice 
            for your Miami waters adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Specifications */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Technical Details</h3>
            <div className="grid grid-cols-2 gap-6">
              {specifications.map((spec, index) => {
                const IconComponent = spec.icon;
                return (
                  <Card key={index} className="bg-steel-1/10 border-steel-2/30">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <IconComponent className="w-6 h-6 text-gold-accent mr-3" />
                        <span className="text-steel-3 text-sm">{spec.label}</span>
                      </div>
                      <p className="text-white font-bold text-lg">{spec.value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pricing */}
            <Card className="bg-gradient-to-r from-gold-accent/10 to-transparent border-gold-accent/30 mt-8">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Clock className="w-6 h-6 text-gold-accent mr-3" />
                  <span className="text-steel-3">Charter Pricing</span>
                </div>
                <div className="text-3xl font-bold text-gradient-gold mb-2">
                  $1,500 per 4 Hours
                </div>
                <p className="text-steel-4">
                  Minimum 4-hour booking • Additional hours available
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Premium Amenities */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Premium Amenities</h3>
            <div className="space-y-4">
              {amenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <Card key={index} className="bg-steel-1/10 border-steel-2/30 hover:border-gold-accent/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <IconComponent className="w-6 h-6 text-gold-accent mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">{amenity.label}</h4>
                          <p className="text-steel-4 text-sm">{amenity.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience Description */}
        <Card className="bg-black/50 border-steel-2/30 mt-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gradient-gold mb-6 text-center">
              The Ultimate Miami Waters Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-steel-4">
              <div>
                <p className="mb-4">
                  Step aboard our luxury yacht and experience Miami like never before. With our 
                  "no restrictions" policy, you're free to smoke, drink, and party as you cruise 
                  the pristine waters of Biscayne Bay.
                </p>
                <p>
                  Our professional crew ensures your safety while you enjoy complete freedom. 
                  Whether it's a bachelor party, birthday celebration, or corporate event, 
                  we provide the perfect floating venue.
                </p>
              </div>
              <div>
                <p className="mb-4">
                  Take in stunning views of the Miami skyline, Star Island mansions, and 
                  the crystal-clear waters of the Atlantic. Our yacht features multiple 
                  entertainment areas, a full bar, and state-of-the-art sound system.
                </p>
                <p>
                  Book your charter today and discover why we're Miami's premier yacht 
                  experience for those who demand luxury without limitations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default YachtDetailSpecs;
