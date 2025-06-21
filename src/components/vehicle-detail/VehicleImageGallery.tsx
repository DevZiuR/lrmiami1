import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface VehicleImageGalleryProps {
  images: string[];
  vehicleName: string;
}

const VehicleImageGallery: React.FC<VehicleImageGalleryProps> = ({
  images,
  vehicleName
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-4 md:py-12 bg-gray-900 overflow-x-hidden">
      <div className="w-[85%] md:w-full max-w-full mx-auto px-0 md:px-4">
        {/* Main Image */}
        <div className="relative mb-4 md:mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group">
                <img
                  src={images[selectedImage]}
                  alt={`${vehicleName} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-xs md:text-lg font-semibold text-center px-2 md:px-4">Click to view fullscreen</div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[95vw] h-[80vh] md:h-[75vh] p-0 mx-auto">
              <div className="relative w-full h-full">
                <img
                  src={images[selectedImage]}
                  alt={`${vehicleName} - Fullscreen`}
                  className="w-full h-full object-contain"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="w-3 h-3 md:w-6 md:h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="w-3 h-3 md:w-6 md:h-6" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="w-full flex gap-1 md:gap-4 overflow-x-auto pb-1 md:pb-4 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-12 h-9 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === selectedImage
                    ? 'border-gold-accent scale-105'
                    : 'border-transparent hover:border-steel-2'
                }`}
              >
                <img
                  src={image}
                  alt={`${vehicleName} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleImageGallery;
