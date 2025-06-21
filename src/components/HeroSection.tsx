import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getPublicUrl, mediaPaths } from '@/lib/media';

const HeroSection = () => {
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-b from-black/60 via-black/40 to-black/80"
        style={{
          backgroundImage: `url(${getPublicUrl(mediaPaths.heroBackground)})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-dark"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
        {/* Main Headline */}
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 animate-fade-in-up">
          <span className="text-gradient-gold">LUXURY</span>
          <br />
          <span className="text-white">REDEFINED</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 font-lato font-light animate-fade-in-up delay-200">
          Miami's leading Exotic Car Rental & Full celebrity entertainment agency
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
          <Link to="/quick-booking">
            <Button 
              size="lg" 
              className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-8 py-4 text-lg luxury-shadow-steel"
            >
              BOOK NOW
            </Button>
          </Link>
          <Link to="/fleet">
            <Button 
              variant="outline" 
              size="lg"
              className="border-gold text-gold-2 hover:bg-steel-2 hover:text-black transition-all duration-300 px-8 py-4 text-lg"
            >
              EXPLORE FLEET
            </Button>
          </Link>
        </div>

        {/* Modern Luxury Scroll Indicator with Automotive Elements */}
        <div 
          className="mt-12 flex justify-center cursor-pointer group animate-fade-in-up delay-700"
          onClick={handleScrollClick}
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Glowing Background Effect */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37]/30 via-[#D4AF37]/15 to-transparent blur-md animate-pulse"></div>
            
            {/* Rotating Outer Ring - Inspired by luxury car rim */}
            <div className="absolute w-full h-full bg-gradient-to-br from-black/90 to-black/70 border-2 border-[#D4AF37] rounded-full opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-180 transform">
              {/* Luxury car rim spokes effect */}
              <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Inner Premium Ring */}
            <div className="absolute w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37] rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
            
            {/* Center Arrow with Car-Inspired Design */}
            <div className="relative w-6 h-6 flex items-center justify-center z-10">
              {/* Modern geometric arrow */}
              <div className="relative">
                <div className="w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] transform rotate-45 translate-y-0 group-hover:translate-y-1 transition-all duration-300 shadow-lg animate-arrow-bounce"></div>
                {/* Arrow trail effect */}
                <div className="absolute top-0 left-0 w-4 h-4 border-b border-r border-[#D4AF37]/50 transform rotate-45 -translate-y-1 opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            </div>
            
            {/* Luxury Hover Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37]/25 via-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-110"></div>
            
            {/* Speedometer-inspired tick marks */}
            <div className="absolute w-full h-full">
              <div className="absolute top-2 left-1/2 w-0.5 h-2 bg-[#D4AF37]/40 transform -translate-x-1/2"></div>
              <div className="absolute bottom-2 left-1/2 w-0.5 h-2 bg-[#D4AF37]/40 transform -translate-x-1/2"></div>
              <div className="absolute left-2 top-1/2 h-0.5 w-2 bg-[#D4AF37]/40 transform -translate-y-1/2"></div>
              <div className="absolute right-2 top-1/2 h-0.5 w-2 bg-[#D4AF37]/40 transform -translate-y-1/2"></div>
            </div>
          </div>
          
          {/* Scroll Text with Premium Typography */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="text-[#D4AF37] text-xs font-light tracking-widest opacity-70 group-hover:opacity-100 transition-opacity duration-300 uppercase">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
