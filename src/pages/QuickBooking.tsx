import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BookingCategories from '@/components/BookingCategories';
import { Helmet } from 'react-helmet-async';

const QuickBooking = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Quick Booking - LR Miami Entertainment</title>
        <meta name="description" content="Book your luxury car rental or yacht charter in Miami. Experience premium service with LR Miami Entertainment." />
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
            Quick <span className="text-gradient-gold">Booking</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose your preferred luxury experience and let us handle the details
          </p>
        </div>
      </section>

      {/* Booking Categories */}
      <section className="py-20 bg-black">
        <BookingCategories />
      </section>

      <Footer />
    </div>
  );
};

export default QuickBooking;
