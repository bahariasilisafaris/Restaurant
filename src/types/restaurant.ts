export type DietaryFlag = 
  | 'Gluten-Free' 
  | 'Dairy-Free' 
  | 'Wild-Caught' 
  | 'Organic' 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Halal' 
  | 'Signature';

export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: 'starters' | 'mains' | 'seafood' | 'grill' | 'desserts' | 'drinks';
  description: string;
  price: number;
  dietary: DietaryFlag[];
  winePairing?: string;
  ingredients: string[];
  technique?: string;
  origin?: string;
  image?: string;
  calories?: number;
  isChefSpecial?: boolean;
}

export interface SignatureDish {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  description: string;
  ingredients: string[];
  technique: string;
  winePairing: string;
  image: string;
  servingTemperature?: string;
  prepTime?: string;
}

export interface ReservationData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Main Dining Room' | "Chef's Counter" | 'Private Wine Salon' | 'Heated Garden Terrace';
  occasion: 'Casual Dining' | 'Anniversary' | 'Birthday' | 'Business Dinner' | 'Culinary Tasting';
  specialRequests?: string;
  dietaryRestrictions?: string[];
  createdAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'plating' | 'atmosphere' | 'cellar' | 'kitchen';
  image: string;
  description: string;
}
