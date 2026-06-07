import React, { useState, useEffect } from 'react';
import { LucideIcon } from './LucideIcon';

interface MatchmakerQuizProps {
  initialCatalogue?: boolean;
}

export function MatchmakerQuiz({ initialCatalogue = false }: MatchmakerQuizProps) {
  const [isCatalogue, setIsCatalogue] = useState<boolean>(initialCatalogue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Sync internal state with prop changes
  useEffect(() => {
    setIsCatalogue(initialCatalogue);
    setIsLoading(true);
  }, [initialCatalogue]);

  // Auto-loading transition timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (isLoading) {
      setProgress(0);
      const startTime = Date.now();
      const duration = 2400; // 2.4 seconds beautiful cinematic loading

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
        setProgress(currentProgress);
      }, 30);

      timer = setTimeout(() => {
        setIsLoading(false);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isLoading]);

  const handleToggleMode = (catalogueMode: boolean) => {
    setIsCatalogue(catalogueMode);
    setIsLoading(true);
  };

  return (
    <section id="matchmaker" className="py-24 bg-black border-t border-white/10">
      <div className={`mx-auto px-4 sm:px-6 transition-all duration-700 ease-in-out ${isCatalogue ? 'max-w-7xl' : 'max-w-5xl'}`}>
        
        {/* Component Card wrapper */}
        <div 
          className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-4 sm:p-6 relative overflow-hidden text-center shadow-lg transition-all duration-700"
          style={{ minHeight: isCatalogue ? '1220px' : '820px' }}
        >
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange-500/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange-500/5 rounded-full -ml-32 -mb-32 pointer-events-none" />
          
          {/* Blurred Tinted Loading Screen overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center z-20 p-6 animate-fadeIn">
              {/* Circular glowing orbits */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-brand-orange-500/10 animate-pulse pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-brand-orange-500/5 pointer-events-none" />
              
              <div className="space-y-6 text-center max-w-sm relative z-10">
                {/* Advanced circular spinning loader */}
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center bg-zinc-900 border border-white/10 rounded-full shadow-inner">
                  <div className="absolute inset-0 rounded-full border border-white/5" />
                  <div className="absolute inset-0 rounded-full border-t-[3px] border-l-[1px] border-brand-orange-500 animate-spin" />
                  <div className="text-brand-orange-500 relative">
                    <LucideIcon name="BookOpen" size={24} className="animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl sm:text-4xl text-white tracking-wide italic leading-normal">
                    Find your perfect book
                  </h3>
                  <p className="text-[10px] font-mono tracking-[0.25em] text-brand-orange-500 uppercase">
                    {isCatalogue ? "Retrieving Full Catalogue..." : "Curation Expert Loading..."}
                  </p>
                </div>

                {/* Progress Bar Indicator */}
                <div className="w-48 h-[1.5px] bg-white/10 rounded-full mx-auto overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-brand-orange-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <span className="text-[9px] font-mono text-white/40 block tracking-wider">
                  {progress}% Connecting to Genre Genie Engine
                </span>
              </div>
            </div>
          )}

          {/* Iframe Embed section with live link */}
          <div className="relative w-full h-full animate-fadeIn z-10">
            {/* Embedded Active Mode Pill Status */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-black/80 border border-white/10 rounded-full text-[9px] font-mono tracking-widest text-white/95 uppercase support-backdrop">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse" />
              {isCatalogue ? "catalogue browser" : "genre matchmaker"}
            </div>

            <iframe
              src={isCatalogue ? "https://genregeniebystarborne.lovable.app/browse" : "https://genregeniebystarborne.lovable.app/"}
              title={isCatalogue ? "Reloved Pages - Full Book Catalogue Browser" : "Reloved Pages - Interactive Genre Quiz"}
              className="w-full rounded-2xl border border-white/10 shadow-inner bg-zinc-950/40 transition-all duration-700 ease-in-out"
              style={{ height: isCatalogue ? '1150px' : '750px' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Action buttons area beneath the embed */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6 relative z-10">
            <div className="text-left">
              <span className="text-[9px] font-mono tracking-widest text-brand-orange-500 uppercase block">
                {isCatalogue ? "looking for specific genres?" : "curious to browse all stacks?"}
              </span>
              <p className="text-xs text-brand-charcoal/60 mt-0.5">
                {isCatalogue 
                  ? "Toggle back to take our customized visual matchmaker test."
                  : "Explore our complete physical bookshelf direct from London."
                }
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!isCatalogue ? (
                <button
                  onClick={() => handleToggleMode(true)}
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:text-brand-orange-500 hover:border-brand-orange-500 border border-white/15 px-6 py-3 rounded-full bg-zinc-900/40 hover:bg-zinc-900 transition-all duration-300 cursor-pointer"
                >
                  <LucideIcon name="BookOpen" size={12} />
                  View the Full Catalogue
                </button>
              ) : (
                <button
                  onClick={() => handleToggleMode(false)}
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:text-brand-orange-500 hover:border-brand-orange-500 border border-white/15 px-6 py-3 rounded-full bg-zinc-900/40 hover:bg-zinc-900 transition-all duration-300 cursor-pointer"
                >
                  <LucideIcon name="Sparkles" size={12} />
                  Return to Genre Quiz
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
