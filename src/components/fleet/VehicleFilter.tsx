
import React from 'react';
import { Button } from '@/components/ui/button';

// Brand logo mapping (from BrandsSection)
const brandLogos: Record<string, string> = {
  'Lamborghini': 'https://gtrentals.es/wp-content/uploads/2023/08/lamborghini.svg',
  'Rolls-Royce': 'https://www.pngplay.com/wp-content/uploads/13/Rolls-Royce-Logo-Transparent-File.png',
  'Mercedes': 'https://i.imgur.com/0XNbP5i.png',
  'BMW i8': 'https://gtrentals.es/wp-content/uploads/2023/08/bmw.svg',
  'Audi': 'https://gtrentals.es/wp-content/uploads/2023/08/audi.svg',
};
interface VehicleFilterProps {
  brands: string[];
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({
  brands,
  selectedBrand,
  onBrandSelect
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {brands.map((brand) => (
        <Button
          key={brand}
          variant={selectedBrand === brand ? "default" : "outline"}
          className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
            selectedBrand === brand
              ? 'bg-gradient-gold text-black hover:scale-105 luxury-shadow-steel'
              : 'border-steel-2 text-steel-3 hover:border-gold-accent hover:text-gold-accent bg-transparent'
          } flex items-center gap-2`}
          onClick={() => onBrandSelect(brand)}
        >
          {brandLogos[brand] && (
            <img
              src={brandLogos[brand]}
              alt={brand}
              className="h-6 w-6 object-contain"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
          )}
          {brand}
        </Button>
      ))}
    </div>
  );
};

export default VehicleFilter;
