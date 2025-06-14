
import React from 'react';

const BrandsSection = () => {
  const brands = [
    {
      name: "Lamborghini",
      logo: "https://gtrentals.es/wp-content/uploads/2023/08/lamborghini.svg"
    },
    {
      name: "Rolls-Royce",
      logo: "https://logohistory.net/wp-content/uploads/2023/01/Rolls-Royce-Logo.png"
    },
    {
      name: "Mercedes",
      logo: "https://i.imgur.com/0XNbP5i.png"
    },
    {
      name: "BMW i8",
      logo: "https://gtrentals.es/wp-content/uploads/2023/08/bmw.svg"
    },
    {
      name: "Audi",
      logo: "https://gtrentals.es/wp-content/uploads/2023/08/audi.svg"
    },
    {
      name: "Ferrari",
      logo: "https://gtrentals.es/wp-content/uploads/2023/08/ferrari.svg"
    },
    {
      name: "Porsche",
      logo: "https://gtrentals.es/wp-content/uploads/2023/08/porsche.svg"
    },
    {
      name: "McLaren",
      logo: "https://gtrentals.es/wp-content/uploads/2023/08/mclaren.svg"
    },
    {
      name: "Corvette",
      logo: "https://i.ibb.co/v60nwSqy/chevrolet-corvette-1.png"
    },
    {
      name: "Land Rover",
      logo: "https://gtrentals.es/wp-content/uploads/2023/01/land-rover.png"
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
