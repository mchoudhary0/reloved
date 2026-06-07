import React from 'react';
import { LucideIcon } from './LucideIcon';

interface FooterProps {
  vintedUrl: string;
  setCurrentPage?: (page: string) => void;
}

export function Footer({ vintedUrl, setCurrentPage }: FooterProps) {
  const handleFooterLink = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <footer className="bg-brand-cream text-brand-charcoal pt-20 pb-12 font-sans overflow-hidden border-t border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-brand-charcoal/10">
          
          {/* Brand Col */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* No circle r logo icon */}
              <span className="reloved-logo-text text-3xl block py-0.5 opacity-90 text-zinc-900">reloved pages</span>
            </div>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed max-w-sm">
              Premium curated preloved books brand, handpicked with family care in London. We deliver beautifully restored literary works right to your doorstep.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-brand-orange-500 font-mono font-medium uppercase tracking-wide">
              <LucideIcon name="Award" size={12} />
              Mother-Son Duo • London, UK
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-orange-500 font-mono">Navigation</h4>
            <div className="space-y-2.5 flex flex-col items-start text-left">
              {setCurrentPage ? (
                <>
                  <button
                    onClick={(e) => handleFooterLink(e, 'about')}
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors cursor-pointer text-left"
                  >
                    Story & Philosophy
                  </button>
                  <button
                    onClick={(e) => handleFooterLink(e, 'quiz')}
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors cursor-pointer text-left"
                  >
                    Book Genre Quiz
                  </button>
                  <button
                    onClick={(e) => handleFooterLink(e, 'catalogue')}
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors cursor-pointer text-left font-semibold text-brand-orange-500"
                  >
                    Store Front (Catalogue)
                  </button>
                  <button
                    onClick={(e) => handleFooterLink(e, 'how-to-buy')}
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors cursor-pointer text-left"
                  >
                    Delivery details
                  </button>
                  <button
                    onClick={(e) => handleFooterLink(e, 'contact')}
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors cursor-pointer text-left"
                  >
                    Contact Us
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="#about"
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors"
                  >
                    Story & Philosophy
                  </a>
                  <a
                    href="#matchmaker"
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors"
                  >
                    Book Genre Quiz
                  </a>
                  <a
                    href="#how-to-buy"
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors"
                  >
                    Delivery details
                  </a>
                  <a
                    href="#contact"
                    className="text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors"
                  >
                    Contact Us
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Contact and Direct Store Col */}
          <div className="md:col-span-6 lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-orange-500 font-mono">Bookstore Details</h4>
            
            <div className="space-y-3.5 text-left">
              <a
                href="mailto:relovedpages@starborne.xyz"
                className="flex items-center gap-3 text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors group"
              >
                <span className="w-8 h-8 bg-black/5 rounded-lg flex items-center justify-center text-brand-orange-500 group-hover:bg-brand-orange-500 group-hover:text-white transition-all">
                  <LucideIcon name="Mail" size={14} />
                </span>
                relovedpages@starborne.xyz
              </a>

              {setCurrentPage ? (
                <button
                  onClick={(e) => handleFooterLink(e, 'catalogue')}
                  className="flex items-center gap-3 text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors group cursor-pointer text-left"
                >
                  <span className="w-8 h-8 bg-black/5 rounded-lg flex items-center justify-center text-brand-orange-500 group-hover:bg-brand-orange-500 group-hover:text-white transition-all">
                    <LucideIcon name="ShoppingBag" size={14} />
                  </span>
                  Store Front Catalogue
                </button>
              ) : (
                <a
                  href={vintedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-brand-charcoal/80 hover:text-brand-orange-500 transition-colors group"
                >
                  <span className="w-8 h-8 bg-black/5 rounded-lg flex items-center justify-center text-brand-orange-500 group-hover:bg-brand-orange-500 group-hover:text-white transition-all">
                    <LucideIcon name="ShoppingBag" size={14} />
                  </span>
                  Store Front Channel
                </a>
              )}

              <div className="flex items-center gap-3 text-sm text-brand-charcoal/80">
                <span className="w-8 h-8 bg-black/5 rounded-lg flex items-center justify-center text-brand-orange-500">
                  <LucideIcon name="MapPin" size={14} />
                </span>
                London, United Kingdom
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-charcoal/40">
          <p>© {new Date().getFullYear()} reloved pages. Curated with care in London.</p>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider">
            <span>Mother & Son Duo</span>
            <span className="text-brand-charcoal/20">•</span>
            <span>London, UK</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
