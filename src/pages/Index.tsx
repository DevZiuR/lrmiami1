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

// New section component
const UpdateSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Updates</h2>
        <p className="text-center text-gray-300">Website updated: March 2024</p>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <PipelineSection />
      <UpdateSection />
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
