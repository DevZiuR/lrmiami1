import React from 'react';
import { mediaPaths, getPublicUrl } from '@/lib/media';

const BrandsSection = () => {
  const placeholder = getPublicUrl('placeholder.svg');
  const brands = [
    {
      name: "Lamborghini",
      logo: getPublicUrl(mediaPaths.brandLogos.lamborghini)
    },
    {
      name: "Rolls-Royce",
      logo: getPublicUrl('brands/Rolls-Royce-Logo.png')
    },
    {
      name: "Mercedes",
      logo: getPublicUrl(mediaPaths.brandLogos.mercedes)
    },
    {
      name: "BMW",
      logo: getPublicUrl(mediaPaths.brandLogos.bmw)
    },
    {
      name: "Audi",
      logo: getPublicUrl(mediaPaths.brandLogos.audi)
    },
    {
      name: "Ferrari",
      logo: getPublicUrl(mediaPaths.brandLogos.ferrari)
    },
    {
      name: "Porsche",
      logo: getPublicUrl(mediaPaths.brandLogos.porsche)
    },
    {
      name: "McLaren",
      logo: getPublicUrl(mediaPaths.brandLogos.mclaren)
    },
    {
      name: "Corvette",
      logo: getPublicUrl('brands/chevrolet-corvette-1.png')
    },
    {
      name: "Land Rover",
      logo: getPublicUrl(mediaPaths.brandLogos.landRover)
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Signature <span className="text-gradient-gold">Brands.</span> Elite <span className="text-gradient-gold">Performance</span> 
          </h2>
          <p className="text-gray-400 text-xl">
          Handpicked vehicles from the world’s most celebrated luxury and exotic manufacturers.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {brands.map((brand, index) => (
            <div 
              key={brand.name}
              className="flex items-center justify-center p-8 rounded-lg bg-black/40 hover:bg-black/60 transition-all duration-300 group hover:scale-105 luxury-shadow-steel border border-steel-2/20 hover:border-steel-2/40"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-lg"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(128%) contrast(100%)'
                }}
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = placeholder; }}
              />
            </div>
          ))}
        </div>
        {/* Premium Message */}
        <div className="text-center mt-12">
          <p className="text-steel-2 font-semibold text-lg">
            Authorized dealer partnerships ensuring authentic luxury experiences
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
