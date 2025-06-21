

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleCardProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  images: string[];
  reverse?: boolean;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ 
  id,
  title, 
  subtitle, 
  description, 
  images, 
  reverse = false 
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-cols-2' : ''}`}>
      {/* Content */}
      <div className={`space-y-6 ${reverse ? 'lg:order-2' : ''}`}>
        <div className="space-y-4">
          <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xl text-gradient-steel font-semibold">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <Link to={`/fleet/${id}`}>
          <Button 
            size="lg"
            className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-8 mt-5 py-4 luxury-shadow-steel"
          >
            BOOK NOW
          </Button>
        </Link>
      </div>
      {/* Image Carousel */}
      <div className={`relative ${reverse ? 'lg:order-1' : ''}`}>
        <div className="aspect-[4/3] rounded-lg overflow-hidden luxury-shadow-steel relative group">
          <img
            src={images[currentImage]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImage ? 'bg-steel-2 w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
