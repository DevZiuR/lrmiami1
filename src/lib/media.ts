import { supabase } from '@/integrations/supabase/client';

// Function to get a public URL for a file in Supabase storage
export const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
};

// Media paths in Supabase storage
export const mediaPaths = {
  // Hero section
  heroBackground: 'hero/background.jpg',
  
  // Pipeline section
  pipelineVideo: 'pipeline/video.mp4',
  
  // Yacht section
  yachtVideo: 'yacht/video.mp4',
  yachtImages: [
    'yacht/image1.jpg',
    'yacht/image2.jpg',
    'yacht/image3.jpg',
    'yacht/image4.jpg',
  ],
  
  // Logo
  logo: 'brand/logo.jpg',
  
  // Brand logos
  brandLogos: {
    lamborghini: 'brands/lamborghini.svg',
    rollsRoyce: 'brands/rolls-royce.png',
    mercedes: 'brands/mercedes.png',
    bmw: 'brands/bmw.svg',
    audi: 'brands/audi.svg',
    ferrari: 'brands/ferrari.svg',
    porsche: 'brands/porsche.svg',
    mclaren: 'brands/mclaren.svg',
    corvette: 'brands/corvette.png',
    landRover: 'brands/land-rover.png',
  },
  
  // Vehicle images (to be added)
  vehicles: {
    // Add vehicle images here
  }
};