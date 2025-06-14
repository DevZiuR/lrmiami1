
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const YachtSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
                Miami Yacht <span className="text-gradient-gold">Charter</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-light max-w-xl">
                Private luxury on the water. Book your exclusive Miami yacht experience today.
              </p>
            </div>
            
            <Link to="/yacht-charter">
              <Button 
                size="lg"
                className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-8 py-4 text-lg mt-6 luxury-shadow"
              >
                BOOK YACHT EXPERIENCE
              </Button>
            </Link>
          </div>
          
          {/* Video */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden luxury-shadow">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://i.imgur.com/ZLX6fY0.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Overlay with price highlight */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-gold-1 font-semibold">LUXURY CHARTER</div>
              <div className="text-white text-sm">4 Hour Minimum</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtSection;
