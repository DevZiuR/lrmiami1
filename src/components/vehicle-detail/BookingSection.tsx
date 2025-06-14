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

interface BookingSectionProps {
  vehicle: Vehicle;
}

const BookingSection: React.FC<BookingSectionProps> = ({ vehicle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: new Date(),
    endDate: new Date(),
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the booking request to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      toast.success('Booking request sent successfully! We will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        startDate: new Date(),
        endDate: new Date(),
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

  const handleDateSelect = (date: Date | undefined, isStartDate: boolean) => {
    if (!date) return;
    
    if (isBefore(date, startOfDay(new Date()))) {
      toast.error('Please select a future date');
      return;
    }

    if (isStartDate) {
      setFormData(prev => ({ ...prev, startDate: date }));
    } else {
      if (isBefore(date, formData.startDate)) {
        toast.error('End date must be after start date');
        return;
      }
      setFormData(prev => ({ ...prev, endDate: date }));
    }
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

        {/* Contact Options */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="border-steel-2 text-white hover:bg-steel-2/20 h-12"
            onClick={() => window.open(`https://wa.me/?text=Hi, I'm interested in the ${vehicle.brand} ${vehicle.model}`)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
          <Button
            variant="outline"
            className="border-steel-2 text-white hover:bg-steel-2/20 h-12"
            onClick={() => window.location.href = 'tel:+1234567890'}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us
          </Button>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black/30 border-steel-2/20 text-white placeholder:text-gray-500"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-black/30 border-steel-2/20 text-white placeholder:text-gray-500"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-black/30 border-steel-2/20 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-steel-1/10 border-steel-2/20 text-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? format(formData.startDate, 'PPP') : 'Pick start date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black border-steel-2/20">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => date && handleDateSelect(date, true)}
                  disabled={(date) => isBefore(date, startOfDay(new Date()))}
                  initialFocus
                  className="bg-black text-white"
                />
              </PopoverContent>
            </Popover>

            {/* End Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-steel-1/10 border-steel-2/20 text-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? format(formData.endDate, 'PPP') : 'Pick end date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black border-steel-2/20">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => date && handleDateSelect(date, false)}
                  disabled={(date) => isBefore(date, formData.startDate)}
                  initialFocus
                  className="bg-black text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Textarea
            name="message"
            placeholder="Special requests or additional information"
            value={formData.message}
            onChange={handleChange}
            className="bg-black/30 border-steel-2/20 text-white placeholder:text-gray-500 min-h-[100px]"
          />

          <Button
            type="submit"
            className="w-full bg-gradient-gold text-black font-semibold h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Book Now'}
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
