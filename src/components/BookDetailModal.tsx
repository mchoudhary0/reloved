import React from 'react';
import { Book } from '../types';
import { LucideIcon } from './LucideIcon';
import { CATEGORIES } from '../data';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
}

export function BookDetailModal({ book, onClose }: BookDetailModalProps) {
  if (!book) return null;

  const currentCategory = CATEGORIES.find(c => c.id === book.category);

  return (
    <div className="fixed inset-0 z-55 overflow-y-auto font-sans" role="dialog" aria-modal="true">
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Center modal alignment */}
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-[#0e0e0e] text-left shadow-2xl transition-all my-8 w-full max-w-2xl border border-white/10 animate-scaleUp">
          
          {/* Close button icon */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2 text-white/50 hover:text-brand-orange-500 hover:bg-white/5 rounded-full transition-all focus:outline-none cursor-pointer"
            aria-label="Close details"
          >
            <LucideIcon name="X" size={20} />
          </button>

          {/* Modal Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left Column Accent / Book Mock Structure */}
            <div className="md:col-span-5 p-8 flex flex-col justify-between items-center relative bg-white/5 border-r border-white/5">
              <div className="text-center w-full mt-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-orange-500 font-semibold block mb-2">
                  Curation Spot
                </span>
                
                {/* Hand-drawn look of book spine/front cover in custom colors */}
                <div className={`mx-auto w-32 h-44 shadow-xl rounded-r-lg p-3 pt-6 text-left relative flex flex-col justify-between ${
                  book.category === 'classics' ? 'bg-[#181818] text-white border border-white/10' :
                  book.category === 'design' ? 'bg-brand-orange-500 text-white' :
                  book.category === 'mind' ? 'bg-zinc-800 text-white' :
                  'bg-zinc-900 text-white'
                }`}>
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20 rounded-l" />
                  <div>
                    <h4 className="font-serif text-xs font-semibold leading-tight line-clamp-3 pl-1">
                      {book.title}
                    </h4>
                  </div>
                  <div className="pl-1">
                    <p className="font-sans text-[9px] opacity-80 truncate">{book.author}</p>
                    <div className="border-t border-white/20 pt-1 mt-1 font-mono text-[7px] flex justify-between">
                      <span>Curated</span>
                      <span>{book.publishedYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vinted Status Banner */}
              <div className="text-center mt-6 w-full">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full inline-block ${
                  book.sold 
                    ? 'bg-zinc-800 text-[#F9F7F2]' 
                    : 'bg-brand-orange-500 text-white font-semibold'
                }`}>
                  {book.sold ? 'Sold out' : '1 copy available'}
                </span>
                <p className="text-[11px] text-white/40 mt-2 font-mono">
                  All items are unique 1-of-1s
                </p>
              </div>
            </div>

            {/* Right Column / Narrative & Details */}
            <div className="md:col-span-7 p-8 sm:p-10 space-y-6">
              
              {/* Category Info */}
              <div className="space-y-1">
                <p className="text-xs font-mono font-semibold text-brand-orange-500 uppercase tracking-widest flex items-center gap-1.5">
                  <LucideIcon name={currentCategory?.iconName || "BookMarked"} size={12} />
                  {currentCategory?.name}
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                  {book.title}
                </h3>
                <p className="text-sm text-white/60 font-sans font-medium">
                  by <span className="text-white font-semibold">{book.author}</span>
                </p>
              </div>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs text-white/70 font-mono">
                <div>
                  <span className="text-white/40 block font-sans">Condition:</span>
                  <span className="font-semibold text-brand-orange-500 block text-sm mt-0.5">{book.condition}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-sans">Price:</span>
                  <span className="font-semibold text-white block text-sm mt-0.5">{book.price}</span>
                </div>
                {book.publishedYear && (
                  <div>
                    <span className="text-white/40 block font-sans">Published:</span>
                    <span className="font-semibold text-white block mt-0.5">{book.publishedYear}</span>
                  </div>
                )}
                {book.pages && (
                  <div>
                    <span className="text-white/40 block font-sans">Pages count:</span>
                    <span className="font-semibold text-white block mt-0.5">{book.pages} pages</span>
                  </div>
                )}
              </div>

              {/* Custon Curation description */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-wider text-brand-orange-500 uppercase font-mono">
                  Duo Curation Profile
                </h3>
                <p className="text-sm font-sans text-white/80 leading-relaxed">
                  {book.description} Our mother-son duo carefully sanitised, buffed the pages, and wrapped this book in protective vintage covers. It has zero musty odours and remains ready for permanent placement on your shelf.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                {book.sold ? (
                  <button
                    disabled
                    className="flex-1 text-center py-3 px-6 bg-zinc-900 text-white/30 text-xs font-sans uppercase tracking-widest rounded-xl italic font-medium cursor-not-allowed"
                  >
                    Recently Sold Out
                  </button>
                ) : (
                  <a
                    href={book.vintedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 bg-brand-orange-500 hover:bg-brand-orange-600 text-white text-xs font-sans uppercase tracking-widest font-medium rounded-xl transition-all shadow-md focus:outline-none cursor-pointer"
                  >
                    <LucideIcon name="ShoppingBag" size={13} />
                    Procure on Vinted
                  </a>
                )}
                <a
                  href={`mailto:relovedpages@starborne.xyz?subject=Inquiry on "${book.title}"`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-transparent hover:bg-white/5 border border-white/10 text-white text-xs font-sans uppercase tracking-widest font-medium rounded-xl transition-all cursor-pointer"
                >
                  <LucideIcon name="Mail" size={13} />
                  Inquire
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
