import { Book, BookCategory, Review } from './types';

export const CATEGORIES: BookCategory[] = [
  {
    id: 'classics',
    name: 'Curated Classics',
    description: 'Beautiful clothbound editions, vintage Penguin treasures, and timeless works of world literature.',
    iconName: 'BookMarked',
    tagline: 'Timeless masterpieces for your permanent shelf'
  },
  {
    id: 'modern',
    name: 'Modern & Contemporary Fiction',
    description: 'Award-winning novels, Booker Prize contenders, and independent press favourites in beautiful condition.',
    iconName: 'Sparkles',
    tagline: 'Modern voices and narrative masterpieces'
  },
  {
    id: 'design',
    name: 'Art, Design & Fashion',
    description: 'Stunning visual monographs, architect histories, and premium coffee table items, kept in clean state.',
    iconName: 'Palette',
    tagline: 'Sought-after aesthetic guides and coffee table volumes'
  },
  {
    id: 'mind',
    name: 'Philosophy & Essays',
    description: 'Compelling essays, classic philosophical debates, and thoughtful guides to conscious living.',
    iconName: 'Compass',
    tagline: 'Invaluable perspectives and reflective essays'
  }
];

export const FEATURED_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    category: 'classics',
    price: '£8.50',
    condition: 'Like New',
    description: 'A beautiful special edition with gilded orange foil accents and pristine pages. Perfect for an decorative vintage visual or a cozy read.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '1890',
    pages: 254,
    sold: false
  },
  {
    id: 'b2',
    title: 'On Beauty and Art',
    author: 'John Ruskin',
    category: 'classics',
    price: '£9.00',
    condition: 'Very Good',
    description: 'Clothbound classic, printed in London. Features beautiful typographic curves and a beautiful silk ribbon page marker.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '1904',
    pages: 320,
    sold: true
  },
  {
    id: 'b3',
    title: 'Persuasion (Penguin Clothbound)',
    author: 'Jane Austen',
    category: 'classics',
    price: '£12.00',
    condition: 'Like New',
    description: 'Designed by Coralie Bickford-Smith. Exquisite orange and cream pattern matching, completely unread and collectible.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '2016',
    pages: 288,
    sold: false
  },
  {
    id: 'b4',
    title: 'Minimalist Architecture & Spaces',
    author: 'Tadao Ando',
    category: 'design',
    price: '£24.00',
    condition: 'Like New',
    description: 'Large-format coffee table volume showcasing serene cement structures. Flawless jacket and thick, heavyweight art paper.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '2021',
    pages: 180,
    sold: false
  },
  {
    id: 'b5',
    title: 'The Great Gatsby (Vintage Deco Edition)',
    author: 'F. Scott Fitzgerald',
    category: 'classics',
    price: '£7.50',
    condition: 'Very Good',
    description: 'A pocket-sized masterpiece decorated in high art-deco graphics. Light edge-toning adding to its authentic heritage feel.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '2013',
    pages: 144,
    sold: false
  },
  {
    id: 'b6',
    title: 'Interiors & Living Objects',
    author: 'Kinfolk',
    category: 'design',
    price: '£18.50',
    condition: 'Like New',
    description: 'Stunning focus on home architecture and design curation. Excellent spine alignment and clean satin pages throughout.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '2019',
    pages: 368,
    sold: true
  },
  {
    id: 'b7',
    title: 'To the Lighthouse',
    author: 'Virginia Woolf',
    category: 'modern',
    price: '£6.00',
    condition: 'Good',
    description: 'Delightful Hogarth Press anniversary paperback. Minor shelf wear on back cover, neat annotations on three pages adding lovely character.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '2015',
    pages: 204,
    sold: false
  },
  {
    id: 'b8',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    category: 'mind',
    price: '£7.00',
    condition: 'Like New',
    description: 'The celebrated Gregory Hays translation, featuring premium rough-cut deckle edges and an elegant cream paper stock.',
    vintedUrl: 'https://www.vinted.co.uk/member/290008843',
    publishedYear: '2018',
    pages: 196,
    sold: false
  }
];

export const VINTED_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'clara_books_london',
    rating: 5,
    comment: 'The book arrived beautifully prepared and wrapped like an expensive boutique item! Absolutely in love, premium quality and lovely London makers.',
    location: 'Richmond, London',
    date: '3 weeks ago'
  },
  {
    id: 'r2',
    author: 'tom_reads_ox',
    rating: 5,
    comment: 'Impeccable condition as described. Standard setting dispatch, books from Reloved Pages are definitely curated with absolute care.',
    location: 'Oxfordshire',
    date: '1 month ago'
  },
  {
    id: 'r3',
    author: 'harriet_v',
    rating: 5,
    comment: 'Best experience buying books online. Truly premium preloved collection. Will buy again from this brilliant mother-son team!',
    location: 'Kensington, London',
    date: '2 months ago'
  }
];
