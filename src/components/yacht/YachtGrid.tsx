
import React from 'react';
import YachtCard from './YachtCard';

interface YachtGridProps {
  selectedFilter: string;
}

// Mock yacht data - in real app this would come from Supabase
const yachts = [
  {
    id: 1,
    name: "Miami Luxury Experience",
    type: "Luxury Yacht",
    category: "Full-Day Charter",
    price: 1500,
    duration: "4 hours",
    capacity: "12 guests",
    length: "60ft",
    amenities: ["Full Bar", "Sound System", "Deck Space", "No Restrictions"],
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://i.imgur.com/4OtWjfn.mp4",
    description: "Experience ultimate freedom on Miami waters. Smoke, drink, and enjoy without restrictions.",
    featured: true
  },
  {
    id: 2,
    name: "Ocean Paradise",
    type: "Party Yacht",
    category: "Half-Day Charter",
    price: 800,
    duration: "4 hours",
    capacity: "8 guests",
    length: "45ft",
    amenities: ["Sound System", "Bar Setup", "Swimming Platform", "Entertainment"],
    images: [
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Perfect for intimate gatherings with premium amenities and entertainment options.",
    featured: false
  },
  {
    id: 3,
    name: "Elite Navigator",
    type: "Luxury Yacht",
    category: "Multi-Day Charter",
    price: 3500,
    duration: "8 hours",
    capacity: "16 guests",
    length: "80ft",
    amenities: ["Full Kitchen", "Multiple Bars", "VIP Suites", "Water Sports"],
    images: [
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The ultimate luxury experience for extended charters and special events.",
    featured: true
  }
];

const YachtGrid: React.FC<YachtGridProps> = ({ selectedFilter }) => {
  const filteredYachts = selectedFilter === 'All' 
    ? yachts 
    : yachts.filter(yacht => 
        yacht.category === selectedFilter || yacht.type === selectedFilter
      );

  if (filteredYachts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-white mb-4">No Yachts Found</h3>
        <p className="text-gray-400">Try selecting a different charter type</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredYachts.map((yacht, index) => (
        <div 
          key={yacht.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <YachtCard yacht={yacht} />
        </div>
      ))}
    </div>
  );
};

export default YachtGrid;
