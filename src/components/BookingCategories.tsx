import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BookingCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
      {/* Car Rental Category */}
      <div 
        className="relative group cursor-pointer"
        onClick={() => navigate('/fleet')}
      >
        <div className="relative rounded-xl overflow-hidden luxury-shadow-steel">
          <video
            src="https://i.imgur.com/XVDGmEV.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <h3 className="font-playfair text-3xl font-bold mb-2">Car Rental</h3>
            <p className="text-center text-gray-300 mb-6">
              Experience luxury with our premium fleet of exotic vehicles
            </p>
            <Button 
              className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-6 py-2 luxury-shadow-steel"
            >
              View Fleet
            </Button>
          </div>
        </div>
      </div>

      {/* Yacht Charter Category */}
      <div 
        className="relative group cursor-pointer"
        onClick={() => navigate('/yacht-charter')}
      >
        <div className="relative rounded-xl overflow-hidden luxury-shadow-steel">
          <video
            src="https://i.imgur.com/4OtWjfn.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <h3 className="font-playfair text-3xl font-bold mb-2">Yacht Charter</h3>
            <p className="text-center text-gray-300 mb-6">
              Discover Miami's waters in style with our luxury yacht charters
            </p>
            <Button 
              className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-6 py-2 luxury-shadow-steel"
            >
              View Yachts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCategories; 