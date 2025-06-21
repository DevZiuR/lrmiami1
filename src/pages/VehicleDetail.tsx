import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FooterGradient from '@/components/FooterGradient';
import VehicleImageGallery from '@/components/vehicle-detail/VehicleImageGallery';
import VehicleSpecs from '@/components/vehicle-detail/VehicleSpecs';
import BookingSection from '@/components/vehicle-detail/BookingSection';
import SimilarVehicles from '@/components/vehicle-detail/SimilarVehicles';
import { Button } from '@/components/ui/button';
import { ChevronRight, Share2, Instagram, MessageCircle } from 'lucide-react';
import { Vehicle } from '@/hooks/useVehicles';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { generateVehicleUrl } from '@/lib/utils';

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      if (!id) throw new Error('No vehicle ID provided');
      
      // Fetch all available vehicles
      const { data: vehicles, error: listError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true);

      if (listError) throw listError;
      if (!vehicles) throw new Error('No vehicles found');

      // Try to find the vehicle by UUID first
      let vehicle = vehicles.find(v => v.id === id);

      // If not found by UUID, try to find by SEO-friendly URL
      if (!vehicle) {
        vehicle = vehicles.find(v => {
          const seoFriendlyUrl = generateVehicleUrl(v);
          return seoFriendlyUrl === id;
        });
      }

      if (!vehicle) throw new Error('Vehicle not found');
      return vehicle as Vehicle;
    },
    enabled: !!id,
  });

  // Handle SEO-friendly URL
  useEffect(() => {
    if (vehicle) {
      const seoFriendlyUrl = generateVehicleUrl(vehicle);
      
      if (id !== seoFriendlyUrl) {
        navigate(`/fleet/${seoFriendlyUrl}`, { replace: true });
      }
    }
  }, [vehicle, id, navigate]);

  const handleShare = (platform: 'instagram' | 'whatsapp') => {
    const url = window.location.href;
    const text = `Check out this amazing ${vehicle?.brand} ${vehicle?.model} at LR Miami!`;
    
    if (platform === 'instagram') {
      // For Instagram, we'll copy the link to clipboard
      navigator.clipboard.writeText(url);
      toast.success('Link copied! Share it on Instagram');
    } else if (platform === 'whatsapp') {
      // For WhatsApp, open the share URL with the correct phone number
      const message = encodeURIComponent(text + ' ' + url);
      window.open(`https://wa.me/13059048151?text=${message}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading luxury experience...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Vehicle Not Found</h2>
          <p className="text-gray-400 mb-8">The requested vehicle could not be found.</p>
          <Link to="/fleet">
            <Button className="bg-gradient-gold text-black font-semibold">
              Return to Fleet
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const vehicleName = `${vehicle.brand} ${vehicle.model}`;
  const pageTitle = `${vehicleName} - LR Miami Entertainment`;

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Experience luxury with our ${vehicleName} rental. Premium car rental service in Miami.`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={`Experience luxury with our ${vehicleName} rental. Premium car rental service in Miami.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        {vehicle.images?.[0] && <meta property="og:image" content={vehicle.images[0]} />}
      </Helmet>

      <Navigation />

      {/* Breadcrumb */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-8 bg-black overflow-x-hidden">
        <div className="w-full max-w-full md:max-w-7xl mx-auto px-2 md:px-4">
          <nav className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm font-bold italic overflow-x-auto scrollbar-hide">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
            <Link to="/fleet" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
              Fleet
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gold-accent font-bold truncate">{vehicleName}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 bg-black overflow-x-hidden">
        <div className="w-full max-w-full md:max-w-7xl mx-auto px-2 md:px-4">
          {/* Vehicle Title and Share Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-0">
              {vehicleName}
              {vehicle.variant && (
                <span className="block text-xl md:text-2xl lg:text-3xl text-gradient-gold mt-2">
                  {vehicle.variant}
                </span>
              )}
            </h1>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="border-steel-2 text-white hover:text-gradient-gold hover:bg-steel-2/20 transition-colors"
                onClick={() => handleShare('instagram')}
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-steel-2 text-white hover:text-gradient-gold hover:bg-steel-2/20 transition-colors"
                onClick={() => handleShare('whatsapp')}
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-steel-2 text-white hover:text-gradient-gold hover:bg-steel-2/20 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Link copied to clipboard!');
                }}
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Images and Details */}
            <div className="space-y-8 md:space-y-12 w-full overflow-x-hidden">
              {/* Image Gallery */}
              {vehicle.images && vehicle.images.length > 0 && (
                <VehicleImageGallery images={vehicle.images} vehicleName={vehicleName} />
              )}

              {/* Description */}
              {vehicle.description && (
                <div className="space-y-4 md:space-y-6">
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                    About This <span className="text-gradient-gold">Vehicle</span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>
              )}

              {/* Specifications */}
              <VehicleSpecs vehicle={vehicle} />

              {/* Special Features */}
              {vehicle.special_features && vehicle.special_features.length > 0 && (
                <div className="space-y-4 md:space-y-6">
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                    Premium <span className="text-gradient-gold">Features</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    {vehicle.special_features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 bg-steel-1/10 p-3 md:p-4 rounded-lg border border-steel-2/20"
                      >
                        <div className="w-2 h-2 bg-gradient-gold rounded-full"></div>
                        <span className="text-sm md:text-base text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:sticky lg:top-24">
              <BookingSection vehicle={vehicle} />
            </div>
          </div>
        </div>
      </section>

      {/* Similar Vehicles */}
      <SimilarVehicles currentVehicle={vehicle} />

      <FooterGradient />
      <Footer />
    </div>
  );
};

export default VehicleDetail;
