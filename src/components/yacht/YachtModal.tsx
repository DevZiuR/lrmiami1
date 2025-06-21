
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, Clock, Ruler, Star, X, Calendar, Phone,
  Anchor, Waves, Music, Wine, Camera, Wifi
} from 'lucide-react';
import YachtBookingForm from './YachtBookingForm';

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

interface YachtModalProps {
  yacht: Yacht;
  isOpen: boolean;
  onClose: () => void;
}

const YachtModal: React.FC<YachtModalProps> = ({ yacht, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const amenityIcons: { [key: string]: any } = {
    'Full Bar': Wine,
    'Sound System': Music,
    'Swimming Platform': Waves,
    'Entertainment': Camera,
    'WiFi': Wifi,
    'Deck Space': Anchor,
    'No Restrictions': Star
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] overflow-hidden p-0 bg-gray-900 border-steel-2">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 border-b border-steel-2">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-3xl font-bold text-gradient-gold mb-2">
                  {yacht.name}
                </DialogTitle>
                <div className="flex items-center gap-4">
                  <Badge className="bg-gradient-gold text-black">
                    {yacht.type}
                  </Badge>
                  <div className="flex items-center text-gold-accent">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="font-semibold">${yacht.price} per {yacht.duration}</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="text-steel-3 hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
              {/* Left Column - Images/Video */}
              <div className="p-6 border-r border-steel-2">
                {/* Main Display */}
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  {yacht.videoUrl && selectedImage === -1 ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={yacht.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={yacht.images[selectedImage]}
                      alt={`${yacht.name} - View ${selectedImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {yacht.videoUrl && (
                    <button
                      onClick={() => setSelectedImage(-1)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === -1 ? 'border-gold-accent' : 'border-transparent'
                      }`}
                    >
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <Music className="w-6 h-6 text-gold-accent" />
                      </div>
                    </button>
                  )}
                  {yacht.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-gold-accent' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${yacht.name} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="p-6">
                {/* Specs */}
                <Card className="bg-steel-1/10 border-steel-2/30 mb-6">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Yacht Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center text-steel-4">
                        <Users className="w-5 h-5 mr-3 text-gold-accent" />
                        <div>
                          <p className="text-xs text-steel-3">Capacity</p>
                          <p className="text-white font-semibold">{yacht.capacity}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-steel-4">
                        <Ruler className="w-5 h-5 mr-3 text-gold-accent" />
                        <div>
                          <p className="text-xs text-steel-3">Length</p>
                          <p className="text-white font-semibold">{yacht.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-steel-4">
                        <Clock className="w-5 h-5 mr-3 text-gold-accent" />
                        <div>
                          <p className="text-xs text-steel-3">Duration</p>
                          <p className="text-white font-semibold">{yacht.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-steel-4">
                        <Star className="w-5 h-5 mr-3 text-gold-accent" />
                        <div>
                          <p className="text-xs text-steel-3">Category</p>
                          <p className="text-white font-semibold">{yacht.category}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Experience</h3>
                  <p className="text-steel-4 leading-relaxed">{yacht.description}</p>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Premium Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {yacht.amenities.map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity] || Anchor;
                      return (
                        <div key={index} className="flex items-center text-steel-4">
                          <IconComponent className="w-4 h-4 mr-3 text-gold-accent" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Booking Actions */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold py-4 text-lg luxury-shadow-steel"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    BOOK THIS YACHT
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-black transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    CALL FOR DETAILS
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showBookingForm && (
          <YachtBookingForm 
            yacht={yacht}
            isOpen={showBookingForm}
            onClose={() => setShowBookingForm(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default YachtModal;
