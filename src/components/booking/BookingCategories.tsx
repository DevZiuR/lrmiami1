
import React from 'react';
import { Card } from '@/components/ui/card';

interface BookingCategoriesProps {
  selectedCategory: 'car' | 'yacht' | null;
  onCategorySelect: (category: 'car' | 'yacht') => void;
}

const BookingCategories: React.FC<BookingCategoriesProps> = ({ 
  selectedCategory, 
  onCategorySelect 
}) => {
  const categories = [
    {
      id: 'car' as const,
      title: 'Exotic Car Rental',
      icon: (
        <img
          src="https://gtrentals.es/wp-content/uploads/2023/08/lamborghini.svg"
          alt="Lamborghini"
          className="h-12 w-auto mx-auto"
          style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(128%) contrast(100%)' }}
        />
      ),
      description: 'Premium supercars and luxury vehicles',
      features: ['Daily/Weekly rentals', 'Full insurance', 'White glove delivery']
    },
    {
      id: 'yacht' as const,
      title: 'Yacht Charter',
      icon: (
        <img
          src="https://i.imgur.com/CiqkYvj.png"
          alt="Yacht Icon"
          className="h-12 w-auto mx-auto"
          style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(100%)' }}
        />
      ),
      description: 'Luxury yacht experiences on Miami waters',
      features: ['4+ hour charters', 'No restrictions', 'Premium amenities']
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {categories.map((category) => (
        <Card
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`
            p-8 cursor-pointer transition-all duration-300 border-2
            ${selectedCategory === category.id 
              ? 'border-gold-1 bg-gradient-to-br from-gold-1/10 to-black' 
              : 'border-steel-2/30 bg-black hover:border-gold-1/50'
            }
            hover:scale-105 luxury-shadow-steel
          `}
        >
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="font-playfair text-2xl font-bold text-white">
              {category.title}
            </h3>
            <p className="text-steel-3 text-lg">
              {category.description}
            </p>
            <ul className="space-y-2 pt-4">
              {category.features.map((feature, index) => (
                <li key={index} className="text-steel-2 flex items-center justify-center">
                  <span className="w-2 h-2 bg-gold-1 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookingCategories;
