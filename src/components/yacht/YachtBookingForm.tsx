import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Clock, Star, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Yacht {
  id: number;
  name: string;
  price: number;
  duration: string;
  capacity: string;
}

interface YachtBookingFormProps {
  yacht: Yacht;
  isOpen: boolean;
  onClose: () => void;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  duration: string;
  specialRequests: string;
}

const YachtBookingForm: React.FC<YachtBookingFormProps> = ({ yacht, isOpen, onClose }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>();
  
  const watchedDuration = watch('duration', yacht.duration);
  const watchedGuests = watch('guests', 1);

  const calculateTotal = () => {
    const baseDuration = parseInt(yacht.duration);
    const selectedDuration = parseInt(watchedDuration) || baseDuration;
    const multiplier = selectedDuration / baseDuration;
    return yacht.price * multiplier;
  };

  const onSubmit = (data: BookingFormData) => {
    // Compose mailto with yacht booking data
    const subject = encodeURIComponent(`New Yacht Booking Request - ${yacht.name}`);
    const body = encodeURIComponent(
      `Yacht: ${yacht.name}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nGuests: ${data.guests}\nDate: ${data.date}\nTime: ${data.time}\nDuration: ${data.duration} hours\nSpecial Requests: ${data.specialRequests || 'None'}`
    );
    
    // Open email client with pre-filled data
    window.location.href = `mailto:LRmiamiLLC@gmail.com?subject=${subject}&body=${body}`;
    
    alert('Booking request submitted! We will contact you shortly.');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] overflow-hidden p-0 bg-gray-900 border-steel-2">
        <DialogHeader className="p-6 border-b border-steel-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gradient-gold">
              Book {yacht.name}
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-steel-3 hover:text-white"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <Card className="bg-steel-1/10 border-steel-2/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-steel-3">Full Name *</Label>
                        <Input
                          {...register('name', { required: 'Name is required' })}
                          className="bg-black/30 border-steel-3 text-white"
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-steel-3">Email Address *</Label>
                        <Input
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          type="email"
                          className="bg-black/30 border-steel-3 text-white"
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-steel-3">Phone Number *</Label>
                        <Input
                          {...register('phone', { required: 'Phone number is required' })}
                          className="bg-black/30 border-steel-3 text-white"
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="guests" className="text-steel-3">Number of Guests *</Label>
                        <Input
                          {...register('guests', { 
                            required: 'Number of guests is required',
                            min: { value: 1, message: 'Minimum 1 guest' },
                            max: { value: parseInt(yacht.capacity), message: `Maximum ${yacht.capacity}` }
                          })}
                          type="number"
                          min="1"
                          max={parseInt(yacht.capacity)}
                          className="bg-black/30 border-steel-3 text-white"
                          placeholder="Number of guests"
                        />
                        {errors.guests && (
                          <p className="text-red-400 text-sm mt-1">{errors.guests.message}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Charter Details */}
                <Card className="bg-steel-1/10 border-steel-2/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Charter Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-steel-3">Preferred Date *</Label>
                        <Input
                          {...register('date', { required: 'Date is required' })}
                          type="date"
                          className="bg-black/30 border-steel-3 text-white"
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.date && (
                          <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-steel-3">Preferred Time *</Label>
                        <Input
                          {...register('time', { required: 'Time is required' })}
                          type="time"
                          className="bg-black/30 border-steel-3 text-white"
                        />
                        {errors.time && (
                          <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="duration" className="text-steel-3">Charter Duration</Label>
                        <select
                          {...register('duration')}
                          className="w-full px-3 py-2 bg-black/30 border border-steel-3 rounded-md text-white"
                        >
                          <option value="4">4 Hours - $1,500</option>
                          <option value="6">6 Hours - $2,250</option>
                          <option value="8">8 Hours - $3,000</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Requests */}
                <Card className="bg-steel-1/10 border-steel-2/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Special Requests</h3>
                    <Textarea
                      {...register('specialRequests')}
                      className="bg-black/30 border-steel-3 text-white min-h-24"
                      placeholder="Any special requests, dietary restrictions, or preferences..."
                    />
                  </CardContent>
                </Card>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-bold py-4 text-lg luxury-shadow-steel"
                >
                  SUBMIT BOOKING REQUEST
                </Button>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-steel-1/10 border-steel-2/30 sticky top-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Booking Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-steel-4">
                      <Star className="w-5 h-5 mr-3 text-gold-accent" />
                      <div>
                        <p className="text-white font-semibold">{yacht.name}</p>
                        <p className="text-sm text-steel-3">Luxury Yacht Charter</p>
                      </div>
                    </div>

                    <div className="border-t border-steel-3 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-steel-4">
                          <Users className="w-4 h-4 mr-2 text-gold-accent" />
                          <span className="text-sm">Guests</span>
                        </div>
                        <span className="text-white font-semibold">{watchedGuests || 1}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-steel-4">
                          <Clock className="w-4 h-4 mr-2 text-gold-accent" />
                          <span className="text-sm">Duration</span>
                        </div>
                        <span className="text-white font-semibold">{watchedDuration} hours</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-steel-4">
                          <Calendar className="w-4 h-4 mr-2 text-gold-accent" />
                          <span className="text-sm">Base Rate</span>
                        </div>
                        <span className="text-white font-semibold">${yacht.price}</span>
                      </div>
                    </div>

                    <div className="border-t border-steel-3 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">Total</span>
                        <span className="text-2xl font-bold text-gradient-gold">
                          ${calculateTotal().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-steel-4 mt-1">
                        *Final price may vary based on additional services
                      </p>
                    </div>

                    <div className="bg-gold-accent/10 border border-gold-accent/30 rounded-lg p-4 mt-4">
                      <p className="text-gold-accent text-sm font-semibold mb-2">
                        🎉 No Restrictions Policy
                      </p>
                      <p className="text-steel-4 text-xs">
                        Smoke, drink, and enjoy complete freedom on your charter experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YachtBookingForm;
