
import React from 'react';
import { Button } from '@/components/ui/button';
import { Anchor, Waves } from 'lucide-react';

const YachtHeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://i.imgur.com/4OtWjfn.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <Anchor className="w-16 h-16 text-gold-accent mr-4" />
          <div className="h-16 w-px bg-gold-accent mx-4"></div>
          <Waves className="w-16 h-16 text-gold-accent ml-4" />
        </div>

        <h1 className="text-7xl md:text-8xl font-bold font-playfair mb-8 text-gradient-white leading-tight">
          YACHT <span className='text-gradient-gold'>CHARTER</span> 
        </h1>

        <div className="mb-12">
          <p className="text-2xl md:text-3xl text-white font-light mb-4">
            Experience Miami’s waters in true luxury. Charter your private yacht for an unforgettable escape.
          </p>
        </div>

        {/* Single CTA Button */}
        <div className="flex justify-center">
          <a href="/quick-booking" className="w-full sm:w-auto">
            <Button 
              size="lg"
              className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold px-12 py-4 text-xl luxury-shadow-steel w-full sm:w-auto"
            >
              Book Your Yacht
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default YachtHeroSection;
