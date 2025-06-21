import React from 'react';

interface FooterGradientProps {
  className?: string;
}

const FooterGradient: React.FC<FooterGradientProps> = ({ className = '' }) => {
  return (
    <div 
      className={`w-full h-[120px] bg-gradient-to-b from-transparent via-gray-100/10 to-black pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default FooterGradient; 