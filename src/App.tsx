import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VINTED_REVIEWS } from './data';
import { Header } from './components/Header';
import { MatchmakerQuiz } from './components/MatchmakerQuiz';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LogoGenerator } from './components/LogoGenerator';
import { LucideIcon } from './components/LucideIcon';

// Image paths from our generated assets resolved robustly for production builds
const HERO_IMAGE = new URL('./assets/images/reloved_hero_books_1780761780392.png', import.meta.url).href;
const CLASSICS_IMAGE = new URL('./assets/images/curated_classics_1780761798615.png', import.meta.url).href;

const VINTED_URL = "https://www.vinted.co.uk/member/290008843";

export default function App() {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaderVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Guarantee window is scrolled to top instantly whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  // Integrated hash/path router + event listener for direct /logo and catalog flows
  useEffect(() => {
    const checkPathAndEvent = () => {
      if (
        window.location.pathname === '/logo' || 
        window.location.hash === '#/logo' || 
        window.location.hash === '#logo'
      ) {
        setCurrentPage('logo');
      }
    };
    
    checkPathAndEvent();
    window.addEventListener('popstate', checkPathAndEvent);
    window.addEventListener('hashchange', checkPathAndEvent);
    
    const handleNavigateCat = () => {
      setCurrentPage('catalogue');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('navigate-catalogue', handleNavigateCat);

    return () => {
      window.removeEventListener('popstate', checkPathAndEvent);
      window.removeEventListener('hashchange', checkPathAndEvent);
      window.removeEventListener('navigate-catalogue', handleNavigateCat);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-orange-500/30 selection:text-brand-orange-500 font-sans flex flex-col">
      
      {/* Cinematic Premium Loader - No circle with "r" inside */}
      {isLoaderVisible && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white transition-opacity duration-500">
          <div className="space-y-6 text-center animate-fadeIn">
            {/* Minimalist premium loading indicator */}
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center bg-zinc-900 border border-white/10 rounded-full">
              {/* Spinning active ring */}
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-0 rounded-full border border-t-[2px] border-l-[1.5px] border-brand-orange-500 animate-spin" />
              {/* Pulsing book element */}
              <LucideIcon name="BookOpen" size={18} className="text-brand-orange-500 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h1 className="reloved-logo-text text-4xl sm:text-5xl tracking-normal leading-none py-1 block">
                reloved pages
              </h1>
              <p className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase">
                Mother & Son Curation • London
              </p>
            </div>

            {/* Aesthetic progress indicator line loading animation */}
            <div className="w-24 h-[1.5px] bg-white/10 mx-auto relative overflow-hidden rounded-full font-mono">
              <div className="absolute top-0 bottom-0 left-0 bg-brand-orange-500 rounded-full animate-loadingProgress" />
            </div>
          </div>
        </div>
      )}

      {/* Premium Header - controls navigation page change state directly */}
      <Header vintedUrl={VINTED_URL} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Dynamic Page Rendering Panel with Framer-motion transitions */}
      <div className="flex-1 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full"
          >
            
            {/* 1. HOME VIEW */}
            {currentPage === 'home' && (
              <>
                {/* Hero Banner Section */}
                <section className="relative bg-black overflow-hidden py-16 lg:py-24">
                  <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                      
                      {/* Left Title Area */}
                      <div className="lg:col-span-6 space-y-8 text-left">
                        
                        {/* Mother-Son Label */}
                        <div className="inline-flex items-center gap-2 bg-brand-orange-500/10 pb-1.5 pt-1 px-4 rounded-full border border-brand-orange-500/20 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-pulse" />
                          <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 uppercase font-semibold">
                            Mother & Son Curated Bookstore
                          </span>
                        </div>

                        {/* Main Slogan */}
                        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif text-brand-charcoal leading-none tracking-tight">
                          Giving premium stories <br />
                          <span className="text-brand-orange-500 italic font-medium">a second life.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-brand-charcoal/75 leading-relaxed font-sans max-w-xl">
                          We handpick, meticulously clean, and professionally wrap premium preloved books from our base in London. Every volume you find on our shelves is guaranteed classic heritage, ready to inspire and style your home.
                        </p>

                        {/* Action routes changed to update page state instead of external redirect/anchor-jump */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                          <button
                            onClick={() => setCurrentPage('catalogue')}
                            className="bg-white hover:bg-brand-orange-500 hover:text-white active:scale-95 text-black font-sans text-xs font-bold uppercase tracking-[0.2em] px-8 py-4.5 rounded-full shadow-md transition-all text-center cursor-pointer inline-flex items-center justify-center gap-2 border border-transparent"
                          >
                            <LucideIcon name="ShoppingBag" size={13} />
                            Store Front
                          </button>
                          <button
                            onClick={() => setCurrentPage('quiz')}
                            className="bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white border border-white/10 font-sans text-xs font-medium uppercase tracking-[0.2em] px-8 py-4.5 rounded-full shadow-sm transition-all text-center cursor-pointer"
                          >
                            Curated Genre Quiz
                          </button>
                        </div>

                        {/* Mini Stats Grid */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-orange-150/40">
                          <div>
                            <h3 className="text-2xl font-serif font-black text-brand-charcoal">4.8 ★</h3>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-brand-charcoal/50">Direct Mail Rating</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-black text-brand-charcoal">100%</h3>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-brand-charcoal/50">Premium Inspection</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-black text-brand-charcoal">Cleaned</h3>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-brand-charcoal/50">Restoration Pledge</p>
                          </div>
                        </div>

                      </div>

                      {/* Right Editorial Image */}
                      <div className="lg:col-span-6 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] lg:aspect-auto h-auto lg:h-[480px]">
                          <img
                            src={HERO_IMAGE}
                            alt="Aesthetic book curation stack on rustic oak table, morning London sun"
                            className="w-full h-full object-cover select-none brightness-90 contrast-105"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Beautiful visual shadow overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Floating review card */}
                        <div className="absolute -bottom-6 -left-4 bg-zinc-900 p-5 rounded-2xl shadow-xl border border-white/5 max-w-xs hidden sm:block">
                          <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <LucideIcon key={i} name="Star" size={13} className="fill-amber-500" />
                            ))}
                          </div>
                          <p className="text-xs text-white/80 italic font-serif leading-relaxed">
                            &ldquo;A masterclass in online bookselling! Arrived beautifully wrapped in bespoke paper like an expensive London gift.&rdquo;
                          </p>
                          <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest mt-2">
                            — @clara_v (Direct Email Submission)
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-12 left-1/3 w-96 h-96 bg-brand-orange-200/5 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* Trust Core Features Ribbon */}
                <div className="bg-[#0e0e0e] text-white/90 py-6 border-y border-white/5 overflow-hidden">
                  <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left text-xs uppercase font-mono tracking-widest">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-brand-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                        <span>All Books are Original Reloved Pages books</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-brand-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                        <span>Mother-Son Curated team based in london</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-brand-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                        <span>Hand-washed cover trims & sanitised page sheets</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Promo cards to guide user to other sections */}
                <section className="py-20 bg-black">
                  <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Promo 1: Take interactive quiz */}
                      <div className="bg-zinc-950 border border-white/5 p-8 sm:p-12 rounded-3xl text-left flex flex-col justify-between items-start gap-6">
                        <div className="space-y-3">
                          <span className="text-[9px] font-mono tracking-widest text-brand-orange-500 uppercase">Aesthetic Matchmaking</span>
                          <h3 className="text-2xl font-serif font-black text-white leading-snug">Let us recommend your next gorgeous read.</h3>
                          <p className="text-sm text-white/60">Take our quick visual, interest, and style diagnostic test. We match your specific room layout or reading desire to original hardbacks.</p>
                        </div>
                        <button
                          onClick={() => setCurrentPage('quiz')}
                          className="bg-white hover:bg-brand-orange-500 text-black hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all cursor-pointer border border-transparent"
                        >
                          Launch Custom Quiz
                        </button>
                      </div>

                      {/* Promo 2: Message Desk */}
                      <div className="bg-zinc-950 border border-white/5 p-8 sm:p-12 rounded-3xl text-left flex flex-col justify-between items-start gap-6">
                        <div className="space-y-3">
                          <span className="text-[9px] font-mono tracking-widest text-brand-orange-500 uppercase">Custom Libraries</span>
                          <h3 className="text-2xl font-serif font-black text-white leading-snug">Sourcing rare matching shelf spine gradients.</h3>
                          <p className="text-sm text-white/60">Looking for custom color bundles, specific vintage leather conditions or have general questions? Our London team is delighted to help.</p>
                        </div>
                        <button
                          onClick={() => setCurrentPage('contact')}
                          className="bg-white hover:bg-brand-orange-500 text-black hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all cursor-pointer border border-transparent"
                        >
                          Contact Our Desk
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Verified Direct Email Reviews Section */}
                <section className="py-24 bg-black border-t border-white/10">
                  <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      {/* Reviews Hook text */}
                      <div className="lg:col-span-4 space-y-6 text-left">
                        <span className="text-xs font-semibold tracking-widest text-brand-orange-500 uppercase block font-sans">
                          Direct Email Reviews
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
                          Reflecting Our 5★ Standard
                        </h2>
                        <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                          Our customer commitment guarantees premium quality. Read honest feedback submitted via our direct email desk by readers across the United Kingdom.
                        </p>
                        
                        <div className="pt-4 flex items-center gap-4 border-t border-white/10">
                          <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <LucideIcon key={i} name="Star" size={16} className="fill-amber-500" />
                            ))}
                          </div>
                          <span className="text-xs font-mono font-bold text-white/80 uppercase">
                            4.8 Rating • 100+ Readers
                          </span>
                        </div>
                      </div>

                      {/* Testimonial Columns */}
                      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {VINTED_REVIEWS.map((review) => (
                          <div key={review.id} className="bg-[#0e0e0e] p-6 rounded-2xl border border-white/5 text-left flex flex-col justify-between shadow-sm">
                            <div className="space-y-3">
                              <div className="flex items-center text-amber-500 gap-0.5">
                                {[...Array(review.rating)].map((_, i) => (
                                  <LucideIcon key={i} name="Star" size={11} className="fill-amber-500" />
                                ))}
                              </div>
                              <p className="text-xs sm:text-sm text-white italic leading-relaxed font-serif">
                                &ldquo;{review.comment}&rdquo;
                              </p>
                            </div>
                            
                            <div className="pt-4 border-t border-white/5 mt-4">
                              <p className="text-xs font-bold text-white font-sans">{review.author}</p>
                              <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mt-1">
                                <span>{review.location}</span>
                                <span>Direct Email Submission</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </section>
              </>
            )}

            {/* 2. QUIZ VIEW */}
            {currentPage === 'quiz' && (
              <MatchmakerQuiz initialCatalogue={false} />
            )}

            {/* 3. CATALOGUE VIEW */}
            {currentPage === 'catalogue' && (
              <MatchmakerQuiz initialCatalogue={true} />
            )}

            {/* 4. ABOUT / STORY VIEW */}
            {currentPage === 'about' && (
              <AboutSection classicsImage={CLASSICS_IMAGE} />
            )}

            {/* 5. HOW TO BUY / PROCUREMENT VIEW */}
            {currentPage === 'how-to-buy' && (
              <section id="how-to-buy" className="py-24 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                  
                  {/* Section Header */}
                  <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
                    <span className="text-xs font-semibold tracking-widest text-brand-orange-500 uppercase block font-sans">
                      Simple Booking Flow
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-serif text-white leading-tight">
                      Procuring Your Reloved Masterpiece
                    </h2>
                    <p className="text-base text-neutral-400 font-sans">
                      Everything of our direct collection is listed on our storefront. Here is how your buying journey works securely from selection to dispatch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        num: '1',
                        title: 'Select on Store Front Catalogue',
                        desc: 'Click on the "Buy on Store" link from our active catalogue collection. You will be redirected right to our active collection profile where live listings reside.'
                      },
                      {
                        num: '2',
                        title: 'Secure Checkout Protection',
                        desc: 'Procure your books with standard buyer protection. Pay safely using card options, and select your preferred postal carrier with combined shipping options.'
                      },
                      {
                        num: '3',
                        title: 'We Aim to Dispatch Next Day',
                        desc: 'We package all books with exquisite visual care. We aim to process and dispatch next day so your beautifully wrapped custom post parcels arrive rapidly.'
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="relative bg-[#0e0e0e] border border-white/5 p-8 sm:p-10 rounded-3xl shadow-sm text-left flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-brand-orange-500 text-white font-serif font-black text-xl flex items-center justify-center shadow-lg">
                            {step.num}
                          </div>
                          <h3 className="text-xl font-serif font-bold text-white">{step.title}</h3>
                          <p className="text-sm text-neutral-400 leading-relaxed font-sans">{step.desc}</p>
                        </div>
                        
                        {idx === 0 && (
                          <div className="mt-8 pt-4 border-t border-white/5">
                            <button
                              onClick={() => setCurrentPage('catalogue')}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-orange-500 hover:text-brand-orange-600 uppercase group cursor-pointer"
                            >
                              Visit the Store Front Catalogue
                              <LucideIcon name="ArrowUpRight" size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              </section>
            )}

            {/* 6. BESPOKE SCOUTING / CONTACT VIEW */}
            {currentPage === 'contact' && (
              <ContactSection vintedUrl={VINTED_URL} />
            )}

            {/* 7. LOGO WORKSPACE UTILITY - NOT LISTED ON NAVIGATION MENU */}
            {currentPage === 'logo' && (
              <LogoGenerator />
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Styled Footer - supports page changes with callback */}
      <Footer vintedUrl={VINTED_URL} setCurrentPage={setCurrentPage} />

    </div>
  );
}
