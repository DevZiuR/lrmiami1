import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const EliteSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compose mailto with form data
    const subject = encodeURIComponent('New Elite Booking Request from Website');
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: Elite Booking Request`
    );
    
    // Open email client with pre-filled data
    window.location.href = `mailto:LRmiamiLLC@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-secondary relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--steel-gray-2)_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="relative z-10">
          {/* Headline */}
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Experience<span className="text-gradient-gold"> Miami's Finest?</span>
          </h2>
          
          {/* Copy */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join the elite circle of clients who demand nothing but the absolute best. 
            Your luxury experience awaits.
          </p>
          
          {/* Premium CTA */}
          <div className="space-y-6">
            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto bg-black/40 p-6 rounded-xl luxury-shadow-steel">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="col-span-1 bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="col-span-1 bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-1 bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-1 bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1"
                required
              />
              <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-gold hover:scale-105 transition-all duration-300 text-black font-bold px-12 py-4 text-lg luxury-shadow-steel hover:luxury-shadow"
                >
                  BOOK NOW
                </Button>
              </div>
            </form>
            {/* Alternative Contact Option removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteSection;
