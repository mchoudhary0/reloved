export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: string;
  condition: 'Like New' | 'Very Good' | 'Good';
  description: string;
  vintedUrl: string;
  image?: string;
  sold?: boolean;
  publishedYear?: string;
  pages?: number;
}

export interface BookCategory {
  id: string;
  name: string;
  description: string;
  iconName: string; // Used to dynamic render Lucide icons
  tagline: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  location: string;
  date: string;
}
