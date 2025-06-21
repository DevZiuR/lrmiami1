import React, { useState } from 'react';
import { Vehicle } from '@/hooks/useVehicles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isBefore, startOfDay } from 'date-fns';
import { CalendarIcon, Phone, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

// WhatsApp SVG Icon Component
const WhatsAppIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="flex-shrink-0"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

// Phone Icon Component
const PhoneIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="flex-shrink-0"
  >
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19c-.54 0-.99.45-.99.99 0 9.36 7.6 16.96 16.96 16.96.54 0 .99-.45.99-.99v-3.5c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

interface BookingSectionProps {
  vehicle: Vehicle;
}

const BookingSection: React.FC<BookingSectionProps> = ({ vehicle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: new Date(),
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Compose mailto with booking data
      const subject = encodeURIComponent(`New Vehicle Booking Request - ${vehicle.brand} ${vehicle.model}`);
      const body = encodeURIComponent(
        `Vehicle: ${vehicle.brand} ${vehicle.model}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPreferred Date: ${formData.preferredDate.toLocaleDateString()}\nMessage: ${formData.message}`
      );
      
      // Open email client with pre-filled data
      window.location.href = `mailto:LRmiamiLLC@gmail.com?subject=${subject}&body=${body}`;
      
      toast.success('Booking request sent successfully! We will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: new Date(),
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (isBefore(date, startOfDay(new Date()))) {
      toast.error('Please select a future date');
      return;
    }

    setFormData(prev => ({ ...prev, preferredDate: date }));
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${vehicle.brand} ${vehicle.model}. Can you provide more information about availability and pricing?`);
    window.open(`https://wa.me/13059048151?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+13059048151';
  };

  return (
    <div className="bg-steel-1/5 rounded-2xl border border-steel-2/20 p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold text-white mb-2">
            Book This <span className="text-gradient-gold">Vehicle</span>
          </h2>
          <p className="text-gray-400">
            Experience luxury on wheels with our premium rental service
          </p>
        </div>

        {/* Price Display */}
        <div className="bg-steel-1/10 rounded-xl p-6 text-center border border-steel-2/20">
          <p className="text-gray-400 mb-2">Starting from</p>
          <p className="text-4xl font-bold text-gradient-gold">${vehicle.price_per_day}</p>
          <p className="text-gray-400 mt-1">per day</p>
        </div>

        {/* Contact Options - Modern Buttons */}
        <div className="space-y-3">
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl border-2 border-green-400 hover:border-green-300 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/25 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <WhatsAppIcon />
              <span className="text-base font-semibold">Chat on WhatsApp</span>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          {/* Call Us Button */}
          <button
            onClick={handleCallClick}
            className="w-full group relative overflow-hidden bg-gradient-gold text-black font-semibold py-3 px-4 rounded-xl border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/25 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <PhoneIcon />
              <span className="text-base font-semibold">Call Now</span>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-steel-2/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-steel-1/5 text-gray-400">Or book online</span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-base font-semibold text-white">Full Name</label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-14 text-base bg-black/40 border-2 border-steel-2/30 text-white placeholder:text-gray-400 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 focus:bg-black/50 transition-all duration-300 rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-base font-semibold text-white">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-14 text-base bg-black/40 border-2 border-steel-2/30 text-white placeholder:text-gray-400 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 focus:bg-black/50 transition-all duration-300 rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-base font-semibold text-white">Phone Number</label>
              <Input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-14 text-base bg-black/40 border-2 border-steel-2/30 text-white placeholder:text-gray-400 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 focus:bg-black/50 transition-all duration-300 rounded-xl"
              />
            </div>
          </div>

          {/* Preferred Date Picker */}
          <div className="space-y-3">
            <label className="text-base font-semibold text-white">Preferred Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-14 justify-start text-left font-normal bg-black/40 border-2 border-steel-2/30 text-white hover:border-gold-accent focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all duration-300 rounded-xl text-base"
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'Select your preferred date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black border-2 border-steel-2/30 rounded-xl">
                <Calendar
                  mode="single"
                  selected={formData.preferredDate}
                  onSelect={(date) => date && handleDateSelect(date)}
                  disabled={(date) => isBefore(date, startOfDay(new Date()))}
                  initialFocus
                  className="bg-black text-white rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <label className="text-base font-semibold text-white">Special Requests</label>
            <Textarea
              name="message"
              placeholder="Any special requests or additional information..."
              value={formData.message}
              onChange={handleChange}
              className="min-h-[120px] text-base bg-black/40 border-2 border-steel-2/30 text-white placeholder:text-gray-400 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 focus:bg-black/50 transition-all duration-300 rounded-xl resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-gold text-black font-bold text-lg h-14 rounded-xl hover:shadow-2xl hover:shadow-gold-accent/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Book This Vehicle'
            )}
          </Button>
        </form>

        {/* Trust Indicators */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Instant Confirmation</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Flexible Cancellation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
