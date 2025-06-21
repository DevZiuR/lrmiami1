
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Experience = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://i.imgur.com/a5JuHcn.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1
            className="text-7xl md:text-8xl font-bold font-playfair mb-8 text-gradient-white leading-tight"
            style={{
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            More Than Just a <span className="text-gradient-gold">Rental</span>
          </h1>
          {/* Removed business-focused paragraph as requested */}
          <Link to="/quick-booking">
            <Button className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold px-8 py-4 text-lg md:text-xl luxury-shadow-steel w-full sm:w-auto">
              BOOK YOUR EXPERIENCE
            </Button>
          </Link>
        </div>
      </section>

      {/* Premium VIP Experiences */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Premium <span className="text-gradient-gold">VIP Experiences</span>
            </h2>
            <p className="text-xl text-steel-2 max-w-3xl mx-auto">
              We don't just rent vehicles — we create unforgettable luxury experiences 
              that elevate your lifestyle and create Instagram-worthy moments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-steel-2/30 p-8 rounded-xl luxury-shadow-steel hover:border-gold-1/50 transition-all duration-300">
              <div className="text-4xl mb-4">🏟️</div>
              <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                Sports Events
              </h3>
              <p className="text-steel-2 mb-6">
                Arrive in style at major sporting events with our premium fleet. 
                Perfect for game days, tailgates, and VIP experiences.
              </p>
              <ul className="space-y-2 text-steel-3">
                <li>• Stadium deliveries</li>
                <li>• VIP game day packages</li>
                <li>• Photo opportunities</li>
              </ul>
            </div>

            <div className="bg-black/50 border border-steel-2/30 p-8 rounded-xl luxury-shadow-steel hover:border-gold-1/50 transition-all duration-300">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                Content Creation
              </h3>
              <p className="text-steel-2 mb-6">
                Create stunning content with our exotic vehicles. Perfect for 
                influencers, brands, and anyone looking to make a statement.
              </p>
              <ul className="space-y-2 text-steel-3">
                <li>• Instagram shoots</li>
                <li>• Brand collaborations</li>
                <li>• Music videos</li>
              </ul>
            </div>

            <div className="bg-black/50 border border-steel-2/30 p-8 rounded-xl luxury-shadow-steel hover:border-gold-1/50 transition-all duration-300">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                Special Events
              </h3>
              <p className="text-steel-2 mb-6">
                Make any occasion extraordinary with our luxury vehicles and yacht. 
                Weddings, birthdays, corporate events — we do it all.
              </p>
              <ul className="space-y-2 text-steel-3">
                <li>• Wedding packages</li>
                <li>• Corporate events</li>
                <li>• Birthday celebrations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram-worthy Experiences */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Instagram-Worthy <span className="text-gradient-gold">Moments</span>
            </h2>
            <p className="text-xl text-steel-2 max-w-3xl mx-auto">
              Every rental becomes a content opportunity. Our vehicles don't just transport — 
              they transform your social media presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold mb-2 text-white">
                    Professional Content
                  </h3>
                  <p className="text-steel-2">
                    High-end vehicles that photograph beautifully and create viral-worthy content
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold mb-2 text-white">
                    Prime Locations
                  </h3>
                  <p className="text-steel-2">
                    Miami's most iconic backdrops — South Beach, Downtown, Brickell
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold mb-2 text-white">
                    Brand Partnerships
                  </h3>
                  <p className="text-steel-2">
                    Join exclusive collaborations with major brands and influencers
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-gold-1/10 to-black border border-gold-1/30 p-8 rounded-xl luxury-shadow-steel">
                <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                  Ready to Create?
                </h3>
                <p className="text-steel-2 mb-6">
                  Book now and turn your rental into a content creation experience
                </p>
                <Link to="/quick-booking">
                  <Button className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold px-6 py-3 luxury-shadow-steel w-full">
                    START BOOKING
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experience;
