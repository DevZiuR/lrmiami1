import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-steel-2/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Left */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="https://i.imgur.com/WPDYIq5.jpeg" 
                alt="LR Miami Entertainment" 
                className="h-12 rounded-lg luxury-shadow-steel"
              />
            </Link>
          </div>
          
          {/* Navigation Center */}
          
          
          <div className="hidden md:flex items-center space-x-8">

            <Link 
              to="/" 
              className="text-white transition-colors duration-300 font-medium font-playfair text-[20px] hover:text-gradient-gold hover:text-transparent hover:bg-clip-text px-3 py-1 rounded"
            >
              Home
            </Link>
            <Link 
              to="/fleet" 
              className="text-white transition-colors duration-300 font-medium font-playfair text-[20px] hover:text-gradient-gold hover:text-transparent hover:bg-clip-text px-3 py-1 rounded"
            >
              Fleet
            </Link>
            <Link 
              to="/yacht-charter" 
              className="text-white transition-colors duration-300 font-medium font-playfair text-[20px] hover:text-gradient-gold hover:text-transparent hover:bg-clip-text px-3 py-1 rounded"
            >
              Yacht
            </Link>
            <Link 
              to="/contact" 
              className="text-white transition-colors duration-300 font-medium font-playfair text-[20px] hover:text-gradient-gold hover:text-transparent hover:bg-clip-text px-3 py-1 rounded"
            >
              Contact
            </Link>
          </div>
          
          {/* CTA Right */}
          <div className="flex items-center">
            <Link to="/quick-booking">
              <Button 
                className="bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold px-6 py-2 luxury-shadow-steel"
              >
                BOOK NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
