
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const YachtDetailGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(0);
  
  const media = [
    { type: 'video', src: 'https://i.imgur.com/4OtWjfn.mp4' },
    { type: 'image', src: 'https://i.imgur.com/wQGqDVk.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/8k7x9Lm.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/5nF2pQs.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/7mR4tNp.jpeg' },
  ];

  const nextMedia = () => {
    setSelectedMedia((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setSelectedMedia((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Display */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8 luxury-shadow-steel">
          {media[selectedMedia].type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={media[selectedMedia].src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={media[selectedMedia].src}
              alt={`Yacht view ${selectedMedia + 1}`}
              className="w-full h-full object-cover"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={prevMedia}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextMedia}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Media Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
            {selectedMedia + 1} / {media.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedMedia(index)}
              className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedMedia === index ? 'border-gold-accent' : 'border-transparent'
              }`}
            >
              {item.type === 'video' ? (
                <div className="w-full h-full bg-black flex items-center justify-center relative">
                  <Play className="w-6 h-6 text-gold-accent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/20 to-transparent"></div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YachtDetailGallery;
