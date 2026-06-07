import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface HeaderProps {
  vintedUrl: string;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Header({ vintedUrl, currentPage, setCurrentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', subtitle: 'Return to welcome page & features', icon: 'Home' },
    { id: 'quiz', label: 'Genre Quiz', subtitle: 'Let our smart engine find your perfect fit', icon: 'Sparkles' },
    { id: 'catalogue', label: 'Book Catalogue', subtitle: 'Explore our complete physical bookshelf direct from London', icon: 'BookOpen' },
    { id: 'about', label: 'Our Story', subtitle: 'Mother & son duo restoring preloved literature', icon: 'Heart' },
    { id: 'how-to-buy', label: 'How To Buy', subtitle: 'Secure checkouts, exquisite protection & fast dispatch', icon: 'HelpCircle' },
    { id: 'contact', label: 'Contact Us', subtitle: 'Send direct questions, feedback or styling inquiries', icon: 'Mail' }
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 font-sans ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5' 
          : 'bg-black py-6 border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Brand Frame - No circle R icon */}
            <button 
              onClick={() => handleNavigate('home')}
              className="flex flex-col items-start group focus:outline-none cursor-pointer text-left"
            >
              {/* Typographic Header */}
              <span className="reloved-logo-text text-3xl tracking-normal leading-none block py-0.5 group-hover:opacity-90 transition-opacity">
                reloved pages
              </span>
              <span className="text-[10px] font-mono tracking-[0.22em] text-brand-orange-500 uppercase block mt-1">
                London Bookstore
              </span>
            </button>

            {/* Collapsible Menu Actions */}
            <div className="flex items-center gap-4">
              
              {/* Store Front Quick link on desktop points directly to Catalogue page */}
              <button
                onClick={() => handleNavigate('catalogue')}
                className="hidden sm:inline-flex items-center gap-2 bg-zinc-900 hover:bg-brand-orange-500 text-white hover:text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-sm transition-all duration-300 border border-white/10 hover:border-transparent cursor-pointer"
              >
                <LucideIcon name="ShoppingBag" size={11} />
                Store Front
              </button>

              {/* Collapsible Hamburger Menu Trigger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-full hover:border-brand-orange-500 text-white hover:text-brand-orange-500 transition-all duration-300 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 select-none">
                  Menu
                </span>
                <div className="relative w-4 h-4 flex flex-col justify-center items-center gap-1.5 overflow-hidden">
                  <span className={`w-4 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
                  <span className={`w-4 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 -translate-x-2' : ''}`} />
                  <span className={`w-4 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 translate-y-[-5px]' : ''}`} />
                </div>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Animated Navigation Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 cursor-pointer"
            />

            {/* Slidout Drawer Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-[#0c0c0c] border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto"
            >
              {/* Draw Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 uppercase block">
                    restoring heritage
                  </span>
                  <p className="font-serif text-lg text-white">Navigation Portal</p>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-full bg-zinc-900 border border-white/10 text-white/70 hover:text-brand-orange-500 hover:border-brand-orange-500 transition-all cursor-pointer"
                >
                  <LucideIcon name="X" size={16} />
                </button>
              </div>

              {/* Big Typographic Menu Links */}
              <div className="p-8 flex-1 flex flex-col justify-center py-12 space-y-4">
                <span className="text-[9px] font-mono tracking-[0.25em] text-white/30 uppercase block mb-2">
                  select destination
                </span>
                
                <div className="space-y-3">
                  {navItems.map((item, idx) => {
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleNavigate(item.id)}
                        className={`w-full group text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                          isActive 
                            ? 'bg-brand-orange-500/10 border-brand-orange-500/30 text-white' 
                            : 'bg-zinc-950/40 border-white/5 hover:border-brand-orange-500/20 text-white/70 hover:text-white'
                        }`}
                      >
                        {/* Bullet Icon */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-brand-orange-500 text-white' 
                            : 'bg-zinc-900 text-white/40 group-hover:bg-brand-orange-500 group-hover:text-white'
                        }`}>
                          <LucideIcon name={item.icon} size={15} />
                        </div>

                        {/* Text */}
                        <div className="flex-1 mt-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                              {item.label}
                            </span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse" />
                            )}
                          </div>
                          <span className="text-[10px] font-sans text-brand-charcoal/50 group-hover:text-brand-charcoal/70 transition-colors block leading-tight mt-0.5">
                            {item.subtitle}
                          </span>
                        </div>

                        <LucideIcon 
                          name="ChevronRight" 
                          size={14} 
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-orange-500" 
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Draw Footer */}
              <div className="p-8 border-t border-white/5 bg-black/60 space-y-4">
                <button
                  onClick={() => handleNavigate('catalogue')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-orange-500 text-black hover:text-white text-xs font-bold uppercase tracking-[0.16em] py-4 rounded-full transition-all duration-300 cursor-pointer shadow-md border border-transparent"
                >
                  <LucideIcon name="ShoppingBag" size={13} />
                  Explore Store Front
                  <LucideIcon name="ArrowUpRight" size={12} />
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest px-1">
                  <span>duo shop • london</span>
                  <span>4.8 rating ★</span>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
