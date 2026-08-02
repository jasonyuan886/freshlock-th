export interface Product {
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  discountBadge?: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  features: string[];
  specs: Record<string, string>;
  category: 'devices' | 'bags' | 'kits';
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
  images?: string[];
}
