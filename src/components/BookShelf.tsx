import React, { useState } from 'react';
import { Book, BookCategory } from '../types';
import { FEATURED_BOOKS, CATEGORIES } from '../data';
import { LucideIcon } from './LucideIcon';

interface BookShelfProps {
  onSelectBook: (book: Book) => void;
}

export function BookShelf({ onSelectBook }: BookShelfProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);

  // Filters
  const filteredBooks = FEATURED_BOOKS.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shelf" className="py-24 bg-brand-cream border-t border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-widest text-brand-orange-500 block mb-3 font-sans uppercase">
            Our Handpicked Stock
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal leading-tight mb-4">
            Browse the Virtual Bookshelf
          </h2>
          <p className="text-lg text-brand-charcoal/75 font-sans">
            Every book is a premium, hand-selected gem. All purchases are handled securely through our official Vinted storefront with rapid dispatch from London.
          </p>
        </div>

        {/* Curation Search & Filters */}
        <div className="mb-12 space-y-6">
          {/* Controls Container */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-brand-charcoal/10">
            {/* Search Bar */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center text-brand-charcoal/40">
                <LucideIcon name="Search" size={18} />
              </span>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-cream/45 border border-brand-charcoal/10 rounded-xl focus:outline-none focus:border-brand-orange-500 text-brand-charcoal placeholder-brand-charcoal/40 text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-brand-charcoal/40 hover:text-brand-orange-500 transition-colors cursor-pointer"
                >
                  <LucideIcon name="X" size={16} />
                </button>
              )}
            </div>

            {/* Total Indicator */}
            <div className="px-4 py-2 border-l border-brand-charcoal/10 hidden md:block text-xs font-mono text-brand-charcoal/60">
              Showing {filteredBooks.length} curated editions
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-medium font-sans border transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-brand-orange-500 text-white border-brand-orange-500 shadow-sm'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-brand-charcoal border-white/10'
              }`}
            >
              All Genres
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium font-sans border transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-brand-orange-500 text-white border-brand-orange-500 shadow-sm'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-brand-charcoal border-white/10'
                }`}
              >
                <LucideIcon name={category.iconName} size={13} />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-[#0e0e0e] border border-dashed border-white/10 rounded-3xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-orange-500">
              <LucideIcon name="BookMarked" size={28} />
            </div>
            <h3 className="text-lg font-serif font-semibold text-brand-charcoal mb-2">No Curated Book Found</h3>
            <p className="text-brand-charcoal/70 text-sm mb-6">
              We couldn&apos;t find matching volumes for &ldquo;{searchQuery}&rdquo;. Custom bespoke curation is our specialty! Email us and we will source it for you.
            </p>
            <a
              href="mailto:relovedpages@starborne.xyz"
              className="inline-flex items-center gap-2 bg-brand-orange-500 hover:bg-brand-charcoal text-white font-sans text-xs font-medium uppercase tracking-wider px-5 py-3 rounded-full transition-all"
            >
              <LucideIcon name="Mail" size={14} />
              Bespoke Request
            </a>
          </div>
        )}

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => {
            const isHovered = hoveredBookId === book.id;
            return (
              <div
                key={book.id}
                onMouseEnter={() => setHoveredBookId(book.id)}
                onMouseLeave={() => setHoveredBookId(null)}
                className="group flex flex-col justify-between h-full bg-[#0c0c0c] rounded-2xl border border-white/5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Book Card Visual */}
                <div 
                  onClick={() => onSelectBook(book)}
                  className="cursor-pointer p-6 pb-4 relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl flex-grow"
                >
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                    <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md support-backdrop ${
                      book.sold
                        ? 'bg-brand-charcoal text-[#F9F7F2]'
                        : 'bg-brand-orange-500 text-white font-semibold'
                    }`}>
                      {book.sold ? 'Sold' : 'Available'}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] bg-white/95 text-brand-charcoal/80 font-mono rounded-md border border-brand-charcoal/10 shadow-sm">
                      {book.condition}
                    </span>
                  </div>

                  {/* Stylised Isometric Book Spine / Cover Mockup using plain elegant CSS */}
                  <div className="h-64 flex items-center justify-center my-4 select-none relative">
                    <div className="absolute inset-0 bg-brand-orange-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Spine Spine shadow stack */}
                    <div className={`relative w-40 h-56 transition-transform duration-500 rounded-r-lg shadow-lg flex flex-col justify-between p-4 ${
                      book.category === 'classics' ? 'bg-brand-charcoal text-brand-cream' :
                      book.category === 'design' ? 'bg-brand-orange-500 text-brand-cream' :
                      book.category === 'mind' ? 'bg-zinc-800 text-brand-cream' :
                      'bg-brand-charcoal text-brand-cream'
                    }`}
                    style={{
                      transform: isHovered ? 'rotateY(-10deg) scale(1.03)' : 'rotateY(0deg)',
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                    }}>
                      {/* Paper Spine lines */}
                      <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-black/15 group-hover:bg-black/25 transition-colors border-r border-white/5 rounded-l" />
                      
                      <div className="pl-2 flex flex-col justify-between h-full">
                        {/* Title and Author */}
                        <div className="space-y-1">
                          <p className="font-mono text-[9px] tracking-widest uppercase opacity-75">
                            Reloved Pages
                          </p>
                          <h4 className="font-serif text-sm font-semibold leading-snug line-clamp-3 leading-tight mt-1">
                            {book.title}
                          </h4>
                        </div>
                        
                        <div>
                          <p className="font-sans text-[10px] font-medium tracking-wide opacity-80 mt-2 truncate">
                            {book.author}
                          </p>
                          <div className="border-t border-white/20 pt-1.5 mt-1.5 flex justify-between items-center">
                            <span className="font-mono text-[10px] tracking-widest uppercase">
                              Curated
                            </span>
                            <span className="font-mono text-[10px] font-semibold">
                              {book.publishedYear}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Details */}
                  <div className="mt-4">
                    <p className="text-[10px] font-mono text-brand-orange-500 tracking-widest uppercase font-semibold">
                      {CATEGORIES.find(c => c.id === book.category)?.name}
                    </p>
                    <h3 className="text-lg font-serif font-bold text-brand-charcoal group-hover:text-brand-orange-500 transition-colors mt-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/65 font-sans">
                      by {book.author}
                    </p>
                    <p className="text-sm font-serif italic text-brand-charcoal/80 mt-2 line-clamp-2 h-10 font-medium">
                      &ldquo;{book.description}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Action Section */}
                <div className="p-6 pt-2 border-t border-brand-charcoal/5 bg-gradient-to-t from-brand-pebble/10 to-transparent rounded-b-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-serif font-black text-brand-charcoal">
                      {book.price}
                    </span>
                    <button
                      onClick={() => onSelectBook(book)}
                      className="text-xs font-mono font-medium text-brand-orange-500 hover:text-brand-charcoal flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <LucideIcon name="Info" size={13} />
                      Curation Details
                    </button>
                  </div>

                  {book.sold ? (
                    <button
                      disabled
                      className="w-full text-center py-2.5 px-4 bg-zinc-900 text-white/40 text-xs font-sans uppercase tracking-widest rounded-xl italic font-medium cursor-not-allowed"
                    >
                      Recently Sold out
                    </button>
                  ) : (
                    <a
                      href={book.vintedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-brand-orange-500 text-black hover:text-white text-xs font-sans uppercase tracking-wider font-bold rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-orange-500 cursor-pointer border border-transparent"
                    >
                      <LucideIcon name="ShoppingBag" size={13} />
                      Buy on Vinted
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Quality Guarantee Callout */}
        <div className="mt-20 bg-[#0e0e0e] border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 justify-between shadow-sm">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-white/5 text-brand-orange-500 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase font-semibold">
              <LucideIcon name="Award" size={12} />
              The Reloved Pages Pledge
            </div>
            <h3 className="text-2xl font-serif text-brand-charcoal leading-snug">
              Every book hand-cleaned, beautifully sealed & protected
            </h3>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed font-sans">
              Unlike standard marketplace platforms, we personally inspect each copy. Our duo scrubs page edges, restores cover alignment where possible, and packages all volumes elegantly in reusable branded protective paper. Every single purchase from our selection feels like receiving a premium gift.
            </p>
          </div>
          <a
            href="https://www.vinted.co.uk/member/290008843"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap inline-flex items-center gap-2.5 bg-white hover:bg-brand-orange-500 text-black hover:text-white font-sans text-xs uppercase font-bold tracking-widest px-8 py-4.5 rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-transparent"
          >
            Go to Vinted Storefront
            <LucideIcon name="ArrowUpRight" size={15} />
          </a>
        </div>

      </div>
    </section>
  );
}
