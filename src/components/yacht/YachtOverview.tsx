
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Clock, Star, Anchor, Waves, Wine, Music } from 'lucide-react';

const YachtOverview = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single Yacht Showcase */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-playfair mb-6 text-gradient-gold">
            MIAMI ELITE YACHT
          </h2>
          <p className="text-xl text-steel-3 max-w-3xl mx-auto mb-8">
            Experience Miami waters with complete freedom. Our luxury yacht offers the ultimate 
            entertainment experience with no restrictions - smoke, drink, and enjoy.
          </p>
          <div className="text-3xl font-bold text-gradient-gold mb-2">
            $1,500 per 4 Hours
          </div>
          <p className="text-steel-4">4-hour minimum booking</p>
        </div>

        {/* Yacht Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Yacht Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden luxury-shadow-steel">
              <video
                src="https://i.imgur.com/ZLX6fY0.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="https://i.imgur.com/ZLX6fY0.jpg"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-gold text-black px-4 py-2 rounded-lg font-bold">
                NO RESTRICTIONS
              </div>
            </div>
          </div>

          {/* Yacht Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Premium Yacht Experience</h3>
              <p className="text-steel-4 text-lg leading-relaxed">
                Cruise Miami's stunning waters aboard our luxury yacht with complete freedom. 
                Smoke, drink, party, and create unforgettable memories with no restrictions whatsoever.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center text-steel-4">
                <Users className="w-6 h-6 mr-3 text-gold-accent" />
                <div>
                  <p className="text-white font-semibold">Up to 12 Guests</p>
                  <p className="text-sm text-steel-3">Perfect for groups</p>
                </div>
              </div>
              <div className="flex items-center text-steel-4">
                <Clock className="w-6 h-6 mr-3 text-gold-accent" />
                <div>
                  <p className="text-white font-semibold">4+ Hours</p>
                  <p className="text-sm text-steel-3">Minimum charter</p>
                </div>
              </div>
              <div className="flex items-center text-steel-4">
                <Wine className="w-6 h-6 mr-3 text-gold-accent" />
                <div>
                  <p className="text-white font-semibold">Full Bar</p>
                  <p className="text-sm text-steel-3">Premium selection</p>
                </div>
              </div>
              <div className="flex items-center text-steel-4">
                <Music className="w-6 h-6 mr-3 text-gold-accent" />
                <div>
                  <p className="text-white font-semibold">Sound System</p>
                  <p className="text-sm text-steel-3">Party ready</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/yacht-detail">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold px-8 py-3 text-lg luxury-shadow-steel"
                >
                  VIEW YACHT DETAILS
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-black transition-all duration-300 px-8 py-3 text-lg bg-black/30"
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>

        {/* No Restrictions Section */}
        <Card className="bg-gradient-to-r from-gold-accent/10 to-transparent border-gold-accent/30">
          <CardContent className="p-8">
            <div className="text-center">
              <Star className="w-12 h-12 text-gold-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gold-accent mb-4">
                Complete Freedom Policy
              </h3>
              <p className="text-steel-4 text-lg max-w-3xl mx-auto">
                Unlike other charter services, we believe in complete freedom. Smoke, drink, party, 
                and enjoy your time on the water without any restrictions. Your yacht, your rules.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default YachtOverview;
