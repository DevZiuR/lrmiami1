import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateVehicleUrl(vehicle: { brand: string; model: string; color_exterior?: string | null }) {
  const baseUrl = `${vehicle.brand}-${vehicle.model}`;
  
  // Extract basic color name (remove prefixes like "satin", "metallic", etc.)
  let colorSuffix = '';
  if (vehicle.color_exterior) {
    const color = vehicle.color_exterior.toLowerCase();
    // Remove common prefixes and get the basic color
    const basicColor = color
      .replace(/^(satin|metallic|pearl|matte|glossy|chrome|carbon|brushed|polished|anodized|powder|coated)\s+/i, '')
      .replace(/\s+(satin|metallic|pearl|matte|glossy|chrome|carbon|brushed|polished|anodized|powder|coated)$/i, '')
      .trim();
    
    if (basicColor) {
      colorSuffix = `-${basicColor}`;
    }
  }
  
  return `${baseUrl}${colorSuffix}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
