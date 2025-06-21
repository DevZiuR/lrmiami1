
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Ruler, Star, Play } from 'lucide-react';
import YachtModal from './YachtModal';

interface Yacht {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  duration: string;
  capacity: string;
  length: string;
  amenities: string[];
  images: string[];
  videoUrl?: string;
  description: string;
  featured: boolean;
}

interface YachtCardProps {
  yacht: Yacht;
}

const YachtCard: React.FC<YachtCardProps> = ({ yacht }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Card 
        className="bg-steel-1/10 border-steel-2/30 overflow-hidden hover-lift cursor-pointer transition-all duration-500 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          {/* Main Image/Video */}
          <div className="aspect-[4/3] overflow-hidden relative">
            {yacht.videoUrl && isHovered ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
                <source src={yacht.videoUrl} type="video/mp4" />
              </video>
            ) : (
              <img
                src={yacht.images[0]}
                alt={yacht.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Video Play Icon */}
            {yacht.videoUrl && !isHovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
                  <Play className="w-8 h-8 text-gold-accent" />
                </div>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {yacht.featured && (
                <Badge className="bg-gradient-gold text-black font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  FEATURED
                </Badge>
              )}
              <Badge variant="outline" className="border-gold-accent text-gold-accent bg-black/50">
                {yacht.category}
              </Badge>
            </div>

            {/* Price */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-gold-accent font-bold text-lg">${yacht.price}</p>
              <p className="text-xs text-steel-4">per {yacht.duration}</p>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Yacht Name & Type */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gradient-gold transition-colors duration-300">
                {yacht.name}
              </h3>
              <p className="text-steel-3 font-medium">{yacht.type}</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-steel-4">
                <Users className="w-4 h-4 mr-2 text-gold-accent" />
                <span className="text-sm">{yacht.capacity}</span>
              </div>
              <div className="flex items-center text-steel-4">
                <Ruler className="w-4 h-4 mr-2 text-gold-accent" />
                <span className="text-sm">{yacht.length}</span>
              </div>
              <div className="flex items-center text-steel-4">
                <Clock className="w-4 h-4 mr-2 text-gold-accent" />
                <span className="text-sm">{yacht.duration}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-1">
                {yacht.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="text-xs border-steel-3 text-steel-3 bg-transparent"
                  >
                    {amenity}
                  </Badge>
                ))}
                {yacht.amenities.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs border-gold-accent text-gold-accent bg-transparent"
                  >
                    +{yacht.amenities.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-steel-4 text-sm mb-6 line-clamp-2">
              {yacht.description}
            </p>

            {/* CTA Button */}
            <Button 
              className="w-full bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold luxury-shadow-steel"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              BOOK THIS YACHT
            </Button>
          </CardContent>
        </div>
      </Card>

      <YachtModal 
        yacht={yacht}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default YachtCard;
