import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FooterGradient from '@/components/FooterGradient';
import FloatingChatWidget from '@/components/FloatingChatWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, Clock, MapPin, Instagram } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast.success('Message sent successfully! We will contact you shortly.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
            Get In <span className="text-gradient-gold">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience luxury service at its finest. Our team is ready to create your perfect Miami experience.
          </p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                  Contact <span className="text-gradient-gold">Information</span>
                </h2>
                
                <div className="space-y-6">
                  <a href="tel:+1234567890" className="flex items-center space-x-4 text-gray-300 hover:text-gold-1 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-lg">+1 (234) 567-890</span>
                  </a>
                  
                  <a href="mailto:info@lrmiami.com" className="flex items-center space-x-4 text-gray-300 hover:text-gold-1 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-lg">info@lrmiami.com</span>
                  </a>
                  
                  <div className="flex items-center space-x-4 text-gray-300">
                    <Clock className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-lg">24/7 Service Available</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-300">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-lg">Miami, Florida</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h3 className="font-playfair text-2xl font-bold text-white">
                  Follow Us
                </h3>
                <a 
                  href="https://www.instagram.com/lr_miami_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-gold-1 transition-colors duration-300"
                >
                  <Instagram className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-lg">@lr_miami_</span>
                </a>
              </div>

              {/* Response Time Guarantee */}
              <div className="bg-gradient-to-r from-gold-1/10 to-transparent border border-gold-1/30 p-6 rounded-xl">
                <h3 className="font-playfair text-xl font-bold text-white mb-2">
                  Response Time Guarantee
                </h3>
                <p className="text-gray-300">
                  We respond to all inquiries within 24 hours, ensuring your luxury experience begins promptly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/40 p-8 rounded-xl border border-steel-2/20 luxury-shadow-steel">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1"
                    required
                  />
                  
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1"
                    required
                  />
                  
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1"
                    required
                  />
                  
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-gold-1">
                      <SelectValue placeholder="Service Interest" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-gold-1">
                      <SelectItem value="car-rental">Luxury Car Rental</SelectItem>
                      <SelectItem value="yacht-charter">Yacht Charter</SelectItem>
                      <SelectItem value="event">Special Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-black/60 border border-gold-1 rounded-md px-4 py-3 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1 min-h-[150px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold px-8 py-4 text-lg luxury-shadow-steel"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterGradient />
      <Footer />
      <FloatingChatWidget />
    </div>
  );
};

export default Contact; 