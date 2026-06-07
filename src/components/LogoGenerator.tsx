import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from './LucideIcon';

type BgColor = 'black' | 'white' | 'transparent';
type AspectRatio = '1:1' | '16:9' | '4:3' | '9:16';
type FileType = 'png' | 'jpg' | 'svg';
type LogoStyle = 'outline' | 'solid';

export function LogoGenerator() {
  const [bgColor, setBgColor] = useState<BgColor>('white');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [textColor, setTextColor] = useState<string>('#e85a24'); // brand-orange stroke
  const [subtitleColor, setSubtitleColor] = useState<string>('#18181b'); // dark-gray/zinc-900 for white bg
  const [logoStyle, setLogoStyle] = useState<LogoStyle>('outline');
  const [showSubtitle, setShowSubtitle] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-adapt text contrast based on background color choice
  useEffect(() => {
    if (bgColor === 'white') {
      setTextColor('#e85a24'); // Keep brand orange
      setSubtitleColor('#18181b'); // Dark gray/zinc-900
    } else if (bgColor === 'black') {
      setTextColor('#e85a24');
      setSubtitleColor('#ffffff');
    } else {
      // transparent background
      setTextColor('#e85a24');
      setSubtitleColor('#ffffff');
    }
  }, [bgColor]);

  // Dimension mapping based on aspect ratio (at high resolution for crisp downloads)
  const getDimensions = (ratio: AspectRatio): { width: number; height: number } => {
    switch (ratio) {
      case '16:9':
        return { width: 1920, height: 1080 };
      case '4:3':
        return { width: 1600, height: 1200 };
      case '9:16':
        return { width: 1080, height: 1920 };
      case '1:1':
      default:
        return { width: 1200, height: 1200 };
    }
  };

  const handleDownload = (type: FileType) => {
    const { width, height } = getDimensions(aspectRatio);
    
    if (type === 'svg') {
      // Generate clean vector representation
      const bgRect = bgColor === 'transparent' ? '' : `<rect width="${width}" height="${height}" fill="${bgColor === 'black' ? '#000000' : bgColor === 'white' ? '#ffffff' : bgColor}"/>`;
      
      const textStyle = logoStyle === 'outline'
        ? `fill: transparent; stroke: ${textColor}; stroke-width: ${width * 0.003}px; filter: drop-shadow(1px 1px 0px ${textColor});`
        : `fill: ${textColor};`;

      const subtitleElement = showSubtitle 
        ? `<text x="${width / 2}" y="${height / 2 + width * 0.06}" class="subtitle">LONDON BOOKSTORE</text>`
        : '';
      
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
          <defs>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Instrument+Sans:wght@400;600&amp;display=swap');
              .title-text {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: ${width * 0.08}px;
                font-style: italic;
                font-weight: 400;
                ${textStyle}
                text-anchor: middle;
              }
              .subtitle {
                font-family: 'Instrument Sans', Helvetica, sans-serif;
                font-size: ${width * 0.02}px;
                fill: ${subtitleColor};
                text-anchor: middle;
                letter-spacing: 0.28em;
                font-weight: 600;
              }
            </style>
          </defs>
          ${bgRect}
          <text x="${width / 2}" y="${showSubtitle ? height / 2 - width * 0.01 : height / 2}" class="title-text">reloved pages</text>
          ${subtitleElement}
        </svg>
      `;
      
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reloved_pages_logo_${bgColor}_${aspectRatio.replace(':', '_')}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showStatus('SVG Vector file downloaded successfully');
      return;
    }

    // Binary types (PNG, JPG) using a high-density canvas draw
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high dynamic ranges
    canvas.width = width;
    canvas.height = height;

    // 1. Draw Background
    if (bgColor === 'transparent') {
      ctx.clearRect(0, 0, width, height);
      if (type === 'jpg') {
        // JPEGs cannot have transparency, default to white
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      }
    } else {
      ctx.fillStyle = bgColor === 'black' ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw Title Text using elegant italic serif styling
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Primary Title
    const titleSize = width * 0.08;
    ctx.font = `italic 400 ${titleSize}px "Playfair Display", Georgia, "Times New Roman", serif`;

    const titleY = showSubtitle ? (height / 2 - width * 0.01) : (height / 2);

    if (logoStyle === 'outline') {
      // Draw brand signature italic outline with shadow
      ctx.shadowColor = textColor;
      ctx.shadowBlur = 1;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      ctx.strokeStyle = textColor;
      ctx.lineWidth = width * 0.0025; // elegant proportional outline depth
      ctx.strokeText('reloved pages', width / 2, titleY);
      
      // Reset shadows
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    } else {
      // Solid filled italic serif representation
      ctx.fillStyle = textColor;
      ctx.fillText('reloved pages', width / 2, titleY);
    }

    // 3. Draw Subtitle (if toggled on)
    if (showSubtitle) {
      ctx.fillStyle = subtitleColor;
      const subtitleSize = width * 0.02;
      ctx.font = `600 ${subtitleSize}px "Instrument Sans", "Inter", "Helvetica Neue", Arial, sans-serif`;
      
      const subtitleVal = 'LONDON BOOKSTORE';
      ctx.fillText(subtitleVal, width / 2, height / 2 + width * 0.06);
    }

    // Trigger platform downloader anchor logic
    const mimeType = type === 'jpg' ? 'image/jpeg' : 'image/png';
    const filename = `reloved_pages_logo_${bgColor}_${aspectRatio.replace(':', '_')}.${type}`;
    
    const dataUrl = canvas.toDataURL(mimeType, 1.0);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showStatus(`${type.toUpperCase()} image downloaded successfully (${width}x${height}px)`);
  };

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const previewDims = aspectRatio === '1:1' ? 'aspect-square max-w-[320px] w-full' :
                      aspectRatio === '16:9' ? 'aspect-[16/9] w-full' :
                      aspectRatio === '4:3' ? 'aspect-[4/3] w-full' : 'aspect-[9/16] max-w-[220px] w-full';

  return (
    <div className="py-20 min-h-screen bg-neutral-950 font-sans text-white border-y border-white/5 flex flex-col items-center justify-center relative">
      <div className={`${isFullscreen ? 'max-w-7xl' : 'max-w-4xl'} w-full px-6 sm:px-8 space-y-12 transition-all duration-500`}>
        
        {/* Header Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase text-brand-orange-500">
            <LucideIcon name="ShieldAlert" size={12} />
            Internal Studio Utility Page
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white leading-none">
            reloved pages Logo Suite
          </h1>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Design, format, and render the premium official branding asset package securely in different sizes and formats.
          </p>
        </div>

        {/* Studio Tool Frame */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Controls - Left Col (Hidden in Fullscreen) */}
          {!isFullscreen && (
            <div className="md:col-span-5 bg-black/60 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                
                {/* Back Color selector block */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    1. Background Theme
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['black', 'white', 'transparent'] as BgColor[]).map((col) => (
                      <button
                        key={col}
                        onClick={() => setBgColor(col)}
                        className={`py-2 px-3 text-xs capitalize font-medium rounded-lg border transition-all cursor-pointer ${
                          bgColor === col 
                            ? 'bg-brand-orange-500 border-transparent text-white' 
                            : 'bg-zinc-900 border-white/5 hover:border-zinc-700 text-neutral-300'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo Type outline / solid style */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    2. Logo Typo Style
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLogoStyle('outline')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        logoStyle === 'outline'
                          ? 'bg-brand-orange-500 border-transparent text-white' 
                          : 'bg-zinc-900 border-white/5 hover:border-zinc-700 text-neutral-300'
                      }`}
                    >
                      Elegant Outline
                    </button>
                    <button
                      onClick={() => setLogoStyle('solid')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        logoStyle === 'solid'
                          ? 'bg-brand-orange-500 border-transparent text-white' 
                          : 'bg-zinc-900 border-white/5 hover:border-zinc-700 text-neutral-300'
                      }`}
                    >
                      Solid Italic
                    </button>
                  </div>
                </div>

                {/* Subtitle Visibility */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    3. Brand Description
                  </span>
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer bg-zinc-900 border border-white/5 p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={showSubtitle} 
                        onChange={(e) => setShowSubtitle(e.target.checked)} 
                        className="w-4 h-4 rounded text-brand-orange-500 focus:ring-brand-orange-500 bg-neutral-950 border-white/10"
                      />
                      <span className="text-xs text-neutral-300 font-medium">Show "LONDON BOOKSTORE" text</span>
                    </label>
                  </div>
                </div>

                {/* Aspect Ratio block */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    4. Aspect Ratio Settings
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['1:1', '16:9', '4:3', '9:16'] as AspectRatio[]).map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          aspectRatio === ratio
                            ? 'bg-brand-orange-500 border-transparent text-white' 
                            : 'bg-zinc-900 border-white/5 hover:border-zinc-700 text-neutral-300'
                        }`}
                      >
                        {ratio === '1:1' ? 'Square (1:1)' :
                         ratio === '16:9' ? 'Landscape (16:9)' :
                         ratio === '4:3' ? 'Studio (4:3)' : 'Stories (9:16)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Accent Tone Selection */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    5. Typography Color
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTextColor('#e85a24')}
                      className={`py-2 px-1 text-[10px] uppercase font-bold tracking-wider rounded-lg border transition-all cursor-pointer bg-zinc-900 ${
                        textColor === '#e85a24' ? 'border-brand-orange-500 text-brand-orange-500' : 'border-white/5 text-neutral-400'
                      }`}
                    >
                      Orange
                    </button>
                    <button
                      onClick={() => setTextColor('#ffffff')}
                      className={`py-2 px-1 text-[10px] uppercase font-bold tracking-wider rounded-lg border transition-all cursor-pointer bg-zinc-900 ${
                        textColor === '#ffffff' ? 'border-brand-orange-500 text-white' : 'border-white/5 text-neutral-400'
                      }`}
                    >
                      White
                    </button>
                    <button
                      onClick={() => setTextColor('#000000')}
                      className={`py-2 px-1 text-[10px] uppercase font-bold tracking-wider rounded-lg border transition-all cursor-pointer bg-zinc-900 ${
                        textColor === '#000000' ? 'border-brand-orange-500 text-black' : 'border-white/5 text-neutral-400'
                      }`}
                    >
                      Black
                    </button>
                  </div>
                </div>

              </div>

              {/* Downloader Trigger block */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block text-left">
                  6. Download Package
                </span>
                <div className="space-y-2">
                  <button
                    onClick={() => handleDownload('png')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <LucideIcon name="Download" size={12} />
                    Download PNG (High-Res)
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDownload('jpg')}
                      className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                    >
                      Download JPG
                    </button>
                    <button
                      onClick={() => handleDownload('svg')}
                      className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                    >
                      Download SVG (Vector)
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Canvas Preview Area - Right Col (Expands to span-12 in fullscreen mode) */}
          <div className={`${isFullscreen ? 'md:col-span-12 min-h-[60vh]' : 'md:col-span-7'} transition-all duration-500 bg-[#050505] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            
            {/* Fullscreen Mode Float bar overlays */}
            <div className="absolute top-4 right-4 left-4 flex justify-between items-center z-10 pointer-events-none">
              
              {/* Left Action badge */}
              <div className="bg-black/80 backdrop-blur border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest text-neutral-400 pointer-events-auto">
                {isFullscreen ? '🔥 Fullscreen Editor Active' : '🔍 Workspace Preview'}
              </div>

              {/* Right Button row */}
              <div className="flex gap-2 pointer-events-auto">
                {isFullscreen && (
                  <div className="flex items-center gap-1.5 bg-black/80 border border-white/10 p-1 rounded-lg">
                    {(['black', 'white', 'transparent'] as BgColor[]).map((col) => (
                      <button
                        key={col}
                        onClick={() => setBgColor(col)}
                        className={`text-[9px] px-2 py-1 uppercase rounded tracking-wider cursor-pointer font-bold ${bgColor === col ? 'bg-brand-orange-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LucideIcon name={isFullscreen ? 'Minimize' : 'Maximize'} size={11} />
                  {isFullscreen ? 'Exit Full' : 'Fullscreen'}
                </button>
              </div>

            </div>

            {/* Visual transparent tile background pattern for trans preview */}
            {bgColor === 'transparent' && (
              <div className="absolute inset-0 bg-transparent-pattern opacity-10 pointer-events-none" />
            )}

            {/* Dynamic preview block */}
            <div 
              className={`rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/5 flex flex-col items-center justify-center p-8 outline outline-offset-4 outline-neutral-900 ${previewDims}`}
              style={{
                backgroundColor: bgColor === 'transparent' ? 'transparent' : bgColor === 'white' ? '#ffffff' : '#000000'
              }}
            >
              <div className="text-center select-none cursor-default max-w-[90%] select-none">
                
                {logoStyle === 'outline' ? (
                  /* Elegant outline brand style */
                  <h2 
                    className="leading-none py-1 block tracking-tight font-serif italic"
                    style={{ 
                      color: 'transparent',
                      WebkitTextStroke: `${aspectRatio === '9:16' ? '1px' : '1.5px'} ${textColor}`,
                      textShadow: `1.5px 1.5px 0px ${textColor}`,
                      fontSize: aspectRatio === '9:16' ? '1.9rem' : '3.6rem',
                      fontWeight: 400
                    }}
                  >
                    reloved pages
                  </h2>
                ) : (
                  /* Solid filled style */
                  <h2 
                    className="leading-none py-1 block tracking-tight font-serif italic"
                    style={{ 
                      color: textColor,
                      fontSize: aspectRatio === '9:16' ? '1.9rem' : '3.6rem',
                      fontWeight: 400
                    }}
                  >
                    reloved pages
                  </h2>
                )}

                {showSubtitle && (
                  <p 
                    className="font-mono uppercase tracking-[0.28em] leading-none block"
                    style={{ 
                      color: subtitleColor,
                      fontSize: aspectRatio === '9:16' ? '8px' : '11px',
                      marginTop: aspectRatio === '9:16' ? '0.5rem' : '0.8rem',
                      fontFamily: '"Instrument Sans", sans-serif',
                      fontWeight: 600
                    }}
                  >
                    LONDON BOOKSTORE
                  </p>
                )}
              </div>
            </div>

            {/* Float inline download helper button in fullscreen */}
            {isFullscreen && (
              <div className="absolute bottom-4 flex items-center gap-2 bg-black/80 backdrop-blur border border-white/10 p-2 rounded-xl">
                <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 px-2">Download:</span>
                <button
                  onClick={() => handleDownload('png')}
                  className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-mono text-[10px] uppercase font-bold px-3 py-1.5 rounded"
                >
                  PNG
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-[10px] uppercase font-bold px-3 py-1.5 rounded border border-white/5"
                >
                  SVG
                </button>
              </div>
            )}

            {/* Dimensions Badge */}
            <div className="absolute bottom-4 right-4 bg-zinc-900 border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest text-neutral-400">
              Canvas: {getDimensions(aspectRatio).width} x {getDimensions(aspectRatio).height} px
            </div>

            {/* Message alert layer */}
            {statusMessage && (
              <div className="absolute top-4 bg-emerald-500/90 backdrop-blur-sm hover:scale-105 active:scale-95 text-white text-xs px-4 py-2 rounded-xl transition-all shadow-md z-20">
                {statusMessage}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Actual Hidden Canvas for programmatic Rendering and Downloader Trigger */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
