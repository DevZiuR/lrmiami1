import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FooterGradient from '@/components/FooterGradient';
import FloatingChatWidget from '@/components/FloatingChatWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { getPublicUrl } from '@/lib/media';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  requests?: string;
}

const YachtCharter = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [selectedDuration, setSelectedDuration] = React.useState('4');
  const yacht2Video = getPublicUrl('pipeline/yatch2.mp4');

  const calculatePrice = (duration: string) => {
    const basePrice = 1500;
    return (basePrice / 4) * parseInt(duration);
  };

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking submitted:', { ...data, date: selectedDate });
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Yacht Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12"
          >
            <span className="text-gradient-gold">Miami Elite</span> Yacht Charter
          </motion.h1>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Yacht Details */}
            <div className="space-y-8">
              {/* Video Player */}
              <div className="rounded-lg overflow-hidden luxury-shadow">
                <video
                  className="w-full aspect-video object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={yacht2Video}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Yacht Specifications */}
              <Card className="bg-black/30 border-gold-accent/30">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gold-accent mb-4"> <span className="text-gradient-gold">Yacht</span> Specifications</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-steel-3">Length</p>
                      <p className="text-white font-semibold">60ft</p>
                    </div>
                    <div>
                      <p className="text-steel-3">Capacity</p>
                      <p className="text-white font-semibold">12 Guests</p>
                    </div>
                    <div>
                      <p className="text-steel-3">Amenities</p>
                      <p className="text-white font-semibold">Full Bar, Sound System</p>
                    </div>
                    <div>
                      <p className="text-steel-3">Experience</p>
                      <p className="text-white font-semibold">No Restrictions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* No Restrictions Section */}
              <Card className="bg-gradient-to-r from-gold-accent/10 to-transparent border-gold-accent/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gold-accent mb-4">Complete <span className="text-gradient-gold">Freedom</span> Policy</h3>
                  <p className="text-steel-3">
                    Unlike other charter services, we believe in complete freedom. Smoke, drink, party, 
                    and enjoy your time on the water without any restrictions. Your yacht, your rules.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:sticky lg:top-24">
              <Card className="bg-black/30 border-gold-accent/30">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gold-accent mb-6">Book Your <span className="text-gradient-gold">Charter</span></h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-steel-3">Full Name *</Label>
                      <Input
                        {...register('name', { required: 'Name is required' })}
                        className="bg-black/30 border-steel-3 text-white mt-2"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message as string}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-steel-3">Email *</Label>
                      <Input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="bg-black/30 border-steel-3 text-white mt-2"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message as string}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-steel-3">Phone *</Label>
                      <Input
                        {...register('phone', { required: 'Phone is required' })}
                        className="bg-black/30 border-steel-3 text-white mt-2"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message as string}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-steel-3">Charter Duration *</Label>
                      <Select
                        value={selectedDuration}
                        onValueChange={setSelectedDuration}
                      >
                        <SelectTrigger className="bg-black/30 border-steel-3 text-white mt-2">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4 Hours</SelectItem>
                          <SelectItem value="6">6 Hours</SelectItem>
                          <SelectItem value="8">8 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-steel-3">Preferred Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal bg-black/30 border-steel-3 text-white mt-2 ${
                              !selectedDate && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-black/90 border-gold-accent/30">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="requests" className="text-steel-3">Special Requests</Label>
                      <Textarea
                        {...register('requests')}
                        className="bg-black/30 border-steel-3 text-white mt-2"
                        placeholder="Any special requests or requirements?"
                        rows={4}
                      />
                    </div>

                    {/* Price Display */}
                    <div className="bg-gold-accent/10 p-4 rounded-lg">
                      <p className="text-steel-3">Total Price</p>
                      <p className="text-2xl font-bold text-gold-accent">
                        ${calculatePrice(selectedDuration)}
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-gold hover:scale-105 transition-transform duration-300 text-black font-semibold py-6 text-lg luxury-shadow"
                    >
                      Book Your Charter
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <FooterGradient />
      <Footer />
      <FloatingChatWidget />
    </div>
  );
};

export default YachtCharter;
