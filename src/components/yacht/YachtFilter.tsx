
import React from 'react';
import { Button } from '@/components/ui/button';

interface YachtFilterProps {
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

const YachtFilter: React.FC<YachtFilterProps> = ({
  selectedFilter,
  onFilterSelect
}) => {
  const filters = [
    'All',
    'Half-Day Charter',
    'Full-Day Charter',
    'Multi-Day Charter',
    'Luxury Yacht',
    'Party Yacht',
    'Fishing Charter'
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-16">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selectedFilter === filter ? "default" : "outline"}
          className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
            selectedFilter === filter
              ? 'bg-gradient-gold text-black hover:scale-105 luxury-shadow-steel'
              : 'border-steel-2 text-steel-3 hover:border-gold-accent hover:text-gold-accent bg-transparent'
          }`}
          onClick={() => onFilterSelect(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default YachtFilter;
