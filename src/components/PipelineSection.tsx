
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PipelineSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden luxury-shadow-steel">
              <video
                src="https://i.imgur.com/OE8gV4H.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white leading-tight">
                We are the <span className="text-gradient-gold">PipeLine</span>, 
                <br />
                We Supply the <span className="text-gradient-gold">Whole City</span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-steel-3 text-xl leading-relaxed">
                  Miami's most exclusive luxury vehicle and entertainment network. From exotic supercars to premium yacht charters, we deliver unmatched experiences across the entire city.
                </p>
                <p className="text-steel-2 text-lg">
                  Our curated fleet and elite services set the standard for luxury in Miami. When the city's most discerning clients demand the extraordinary, they call us.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => navigate('/fleet')}
                className="bg-gradient-gold text-black font-semibold px-8 py-3 text-lg hover:scale-105 transition-all duration-300 luxury-shadow"
              >
                View Fleet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
