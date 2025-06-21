import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import YachtSection from '@/components/YachtSection';
import VehicleShowcase from '@/components/VehicleShowcase';
import BrandsSection from '@/components/BrandsSection';
import PipelineSection from '@/components/PipelineSection';
import EliteSection from '@/components/EliteSection';
import FloatingChatWidget from '@/components/FloatingChatWidget';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <PipelineSection />
      <VehicleShowcase />
      <YachtSection />
      <BrandsSection />
      <EliteSection />
      <Footer />
      <FloatingChatWidget />
    </div>
  );
};

export default Index;
