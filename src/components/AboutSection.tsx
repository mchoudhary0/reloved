import React from 'react';
import { LucideIcon } from './LucideIcon';

interface AboutSectionProps {
  classicsImage: string;
}

export function AboutSection({ classicsImage }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-brand-cream border-t border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Core Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Visual Presentation Frame */}
          <div className="lg:col-span-5 space-y-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-brand-charcoal/10 shadow-md">
              <img
                src={classicsImage}
                alt="Curated books stacked gently on a bedside table in London"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700 select-none"
                referrerPolicy="no-referrer"
              />
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Custom geometric detail block */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-orange-500/10 rounded-full blur-2xl z-0" />
            
            {/* Direct London Marker Card */}
            <div className="absolute -bottom-2 -right-2 bg-zinc-900 px-5 py-4.5 rounded-2xl shadow-lg border border-white/5 flex items-center gap-3.5 z-20">
              <div className="w-10 h-10 bg-brand-pebble rounded-full flex items-center justify-center text-brand-orange-500">
                <LucideIcon name="MapPin" size={18} />
              </div>
              <div>
                <p className="text-xs font-mono text-brand-sage uppercase font-semibold">Handpicked In</p>
                <p className="text-sm font-serif font-black text-brand-charcoal">London, United Kingdom</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-widest text-brand-orange-500 uppercase block font-sans">
                Our Story & Philosophy
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-brand-charcoal leading-tight">
                Crafted by a mother-son duo, based in London.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-brand-charcoal/80 leading-relaxed font-sans">
              At <strong className="font-serif">Reloved Pages</strong>, we believe that premium books contain two stories: the beautiful narrative written upon their pages, and the physical history of those who held them before.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              
              {/* Point 1 */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-brand-pebble text-brand-orange-500 rounded-xl flex items-center justify-center shadow-inner">
                  <LucideIcon name="Heart" size={18} />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-charcoal">
                  Meticulous Mother-Son Curation
                </h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed font-sans">
                  We scour London&apos;s hidden treasure troves, estate sales, and independent stalls side by side. Every copy is individually appraised, selected, and hand-cleaned together by our family.
                </p>
              </div>

              {/* Point 2 */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-brand-pebble text-brand-orange-500 rounded-xl flex items-center justify-center shadow-inner">
                  <LucideIcon name="RefreshCw" size={18} />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-charcoal">
                  True Preloved Character
                </h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed font-sans">
                  Instead of mass production waste, we embrace circular heritage. Our curation preserves pristine aesthetic layout while minimising the environmental footprint of reading luxury copy sheets.
                </p>
              </div>

            </div>

            {/* Blockquote styling */}
            <div className="border-l-4 border-brand-orange-500 pl-6 py-1 italic text-brand-charcoal/85 text-base sm:text-lg font-serif">
              &ldquo;We don&apos;t just sell novels. We restore aesthetic pieces. Every crease is verified, every alignment wiped clean, bringing the utmost care of old-school London bookshops straight to your post box.&rdquo;
              <span className="block text-xs font-mono font-bold tracking-wide text-brand-orange-500 uppercase not-italic mt-2">
                — Reloved Pages Founders
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
