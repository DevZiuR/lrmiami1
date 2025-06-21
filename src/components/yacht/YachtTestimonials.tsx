
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const YachtTestimonials = () => {
  const testimonials = [
    {
      name: "Marcus R.",
      event: "Bachelor Party",
      rating: 5,
      text: "Absolutely incredible experience! The no restrictions policy made our bachelor party unforgettable. The crew was professional and the yacht was pristine. 10/10 would book again!"
    },
    {
      name: "Sarah M.",
      event: "Birthday Celebration",
      rating: 5,
      text: "Perfect for our group of 10. We loved the freedom to enjoy ourselves without worrying about rules. The Miami skyline views were breathtaking. Amazing value for the experience!"
    },
    {
      name: "Carlos T.",
      event: "Corporate Event",
      rating: 5,
      text: "Professional service with a relaxed atmosphere. Our clients were impressed by the luxury yacht and the beautiful Miami waters. The team made everything seamless."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-playfair mb-6 text-gradient-gold">
            GUEST EXPERIENCES
          </h2>
          <p className="text-xl text-steel-3 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied guests who experienced 
            the ultimate freedom on Miami waters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-steel-1/10 border-steel-2/30 hover:border-gold-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-accent fill-current" />
                  ))}
                </div>
                <p className="text-steel-4 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-steel-3 pt-4">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-steel-3 text-sm">{testimonial.event}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-gold mb-2">100+</div>
            <p className="text-steel-3">Satisfied Guests</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-gold mb-2">5.0★</div>
            <p className="text-steel-3">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-gold mb-2">24/7</div>
            <p className="text-steel-3">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtTestimonials;
