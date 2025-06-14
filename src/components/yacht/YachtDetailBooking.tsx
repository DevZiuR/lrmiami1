
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Users, Clock, Star, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: Date | undefined;
  time: string;
  duration: string;
  specialRequests: string;
}

const YachtDetailBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>();
  
  const watchedDuration = watch('duration', '4');
  const watchedGuests = watch('guests', 1);

  const calculateTotal = () => {
    const duration = parseInt(watchedDuration) || 4;
    const basePrice = 1500;
    return (basePrice / 4) * duration;
  };

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking submitted:', { ...data, date: selectedDate });
    alert('Booking request submitted! We will contact you shortly.');
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-playfair mb-6 text-gradient-gold">
            BOOK YOUR CHARTER
          </h2>
          <p className="text-xl text-steel-3 max-w-3xl mx-auto">
            Reserve your luxury yacht experience and create unforgettable memories on Miami waters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <Card className="bg-steel-1/10 border-steel-2/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
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
                          max: { value: 12, message: 'Maximum 12 guests' }
                        })}
                        type="number"
                        min="1"
                        max="12"
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
                  <h3 className="text-xl font-semibold text-white mb-6">Charter Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-steel-3 mb-3 block">Select Date *</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="bg-black/30 border border-steel-3 rounded-md p-3"
                      />
                    </div>
                    <div className="space-y-4">
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
                        <Label htmlFor="duration" className="text-steel-3">Charter Duration *</Label>
                        <select
                          {...register('duration')}
                          className="w-full px-3 py-2 bg-black/30 border border-steel-3 rounded-md text-white"
                        >
                          <option value="4">4 Hours - $1,500</option>
                          <option value="6">6 Hours - $2,250</option>
                          <option value="8">8 Hours - $3,000</option>
                          <option value="12">Full Day (12 Hours) - $4,500</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Requests */}
              <Card className="bg-steel-1/10 border-steel-2/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Special Requests</h3>
                  <Textarea
                    {...register('specialRequests')}
                    className="bg-black/30 border-steel-3 text-white min-h-24"
                    placeholder="Any special requests, celebrations, or preferences..."
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
            <Card className="bg-steel-1/10 border-steel-2/30 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center text-steel-4">
                    <Star className="w-5 h-5 mr-3 text-gold-accent" />
                    <div>
                      <p className="text-white font-semibold">Miami Elite Yacht</p>
                      <p className="text-sm text-steel-3">Luxury Charter Experience</p>
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
                        <CalendarIcon className="w-4 h-4 mr-2 text-gold-accent" />
                        <span className="text-sm">Rate</span>
                      </div>
                      <span className="text-white font-semibold">$375/hour</span>
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
                      *Final price confirmed upon booking
                    </p>
                  </div>

                  <div className="bg-gold-accent/10 border border-gold-accent/30 rounded-lg p-4 mt-6">
                    <p className="text-gold-accent text-sm font-semibold mb-2">
                      🎉 No Restrictions Policy
                    </p>
                    <p className="text-steel-4 text-xs">
                      Smoke, drink, and enjoy complete freedom on your charter experience.
                    </p>
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-black transition-all duration-300 mt-4"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    CALL FOR DETAILS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtDetailBooking;
