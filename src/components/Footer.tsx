import React from 'react';
import { Instagram, Phone, Mail, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Mission Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="w-32 h-16">
                <img
                  src="https://i.imgur.com/WPDYIq5.jpeg"
                  alt="LR Miami Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience unparalleled luxury with our exclusive collection of premium vehicles. 
              We redefine luxury car rentals in Miami with exceptional service and world-class vehicles.
            </p>
            <a 
              href="https://www.instagram.com/lr_miami_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FBF5B7] hover:scale-110 transition-transform duration-300"
            >
              <Instagram className="w-5 h-5 text-black" />
            </a>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h4 className="font-playfair text-xl font-bold text-gradient-gold">Services</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/fleet" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  Fleet
                </a>
              </li>
              <li>
                <a 
                  href="/yacht" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  Yacht Charter
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Exotic Fleet Section */}
          <div className="space-y-6">
            <h4 className="font-playfair text-xl font-bold text-gradient-gold">Elite Collection</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/fleet/mclaren" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  McLaren
                </a>
              </li>
              <li>
                <a 
                  href="/fleet/cullinan" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  Cullinan
                </a>
              </li>
              <li>
                <a 
                  href="/fleet/urus" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  Urus
                </a>
              </li>
              <li>
                <a 
                  href="/fleet/g-wagon" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  G-Wagon
                </a>
              </li>
              <li>
                <a 
                  href="/fleet" 
                  className="text-gradient-gold hover:opacity-80 transition-opacity duration-300 font-semibold"
                >
                  View All Vehicles →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6">
            <h4 className="font-playfair text-xl font-bold text-gradient-gold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gradient-gold" />
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gradient-gold" />
                <a 
                  href="mailto:info@lrmiami.com" 
                  className="text-gray-300 hover:text-gradient-gold transition-colors duration-300"
                >
                  info@lrmiami.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gradient-gold" />
                <span className="text-gray-300">Serving Miami, Florida</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gradient-gold" />
                <span className="text-gray-300">Available 24/7</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              © 2025 <span className="text-gradient-gold font-bold">LR Miami Entertainment</span>. All rights reserved. by <a href="https://www.instagram.com/ziursolutions/" target="_blank" rel="noopener noreferrer" className="text-gradient-gold font-bold">ZiuR Solutions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
