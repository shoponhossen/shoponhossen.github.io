import React, { useState, useRef } from 'react';
import { FEATURED_PROJECT } from '../data/portfolioData';

interface FeaturedProjectProps {
  onOpenProjectModal: () => void;
}

// Automatically load all PNG screenshots from assets/images/fireclashbd/*.png
const screenshotModules = import.meta.glob<{ default: string }>(
  '../assets/images/fireclashbd/*.png',
  { eager: true }
);

interface ScreenshotItem {
  id: string;
  src: string;
  title: string;
  label: string;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ onOpenProjectModal }) => {
  // Convert globbed modules into ordered gallery items
  const galleryScreens: ScreenshotItem[] = Object.entries(screenshotModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod], index) => {
      const fileName = path.split('/').pop()?.replace('.png', '') || `screen_${index}`;
      // Clean up filename for display: "01_tournament_lobby" -> "Tournament Lobby"
      const cleanTitle = fileName
        .replace(/^[0-9]+_/, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        id: fileName,
        src: mod.default,
        title: cleanTitle,
        label: `0${index + 1}`,
      };
    });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= galleryScreens.length) return;
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 16 : 280;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < galleryScreens.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 border-b border-[#29352e] bg-[#0b0f0e] relative overflow-hidden">
      
      {/* Blueprint grid subtle accent */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="text-xs font-['JetBrains_Mono'] tracking-wider text-[#a0ada5] mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">02</span> / SELECTED WORK ----
              <span className="text-[10px] bg-[#111715] border border-[#29352e] px-1.5 py-0.5 text-[#34d399] font-bold">
                PROFITABLE STARTUP · ACTIVE REVENUE
              </span>
            </div>
            
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#f0f5f1] tracking-tight">
              Fire Clash BD — Esports Startup
            </h2>
            
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#a0ada5] mt-2 max-w-3xl leading-relaxed">
              A real, profitable esports tournament business in Bangladesh. The <span className="text-[#a3e635] font-semibold">Android mobile app</span> is the primary money-making engine handling tournament entry fees, matchmaking, and automated bKash/Nagad prize payouts—while the website is our landing gateway for distributing the APK.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={FEATURED_PROJECT.apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-xs font-bold tracking-wider transition-colors cursor-pointer shadow-[0_0_12px_rgba(163,230,53,0.15)]"
            >
              <span>Download APK / Web Portal</span>
              <span>↗</span>
            </a>

            <button
              onClick={onOpenProjectModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111715] hover:bg-[#171e1b] border border-[#29352e] hover:border-[#a3e635] text-xs font-['JetBrains_Mono'] text-[#dee4e0] hover:text-[#a3e635] transition-colors cursor-pointer"
            >
              <span>System Specs</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Startup Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8">
          {FEATURED_PROJECT.metrics.map((m, idx) => (
            <div key={idx} className="p-3 sm:p-4 bg-[#111715] border border-[#29352e]">
              <div className="text-[10px] font-mono text-[#69776e] uppercase tracking-wider">{m.label}</div>
              <div className="text-base sm:text-xl font-bold font-mono text-[#a3e635] mt-0.5">{m.value}</div>
              <div className="text-[10px] font-mono text-[#a0ada5] mt-1 truncate">{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Simple Swipeable App Image Gallery */}
        <div className="border border-[#29352e] bg-[#111715] p-4 sm:p-6 shadow-2xl">
          
          {/* Gallery Header Bar with Swipe Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#29352e]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#a3e635] inline-block shadow-[0_0_6px_#a3e635]"></span>
              <span className="font-mono text-xs font-bold text-[#f0f5f1]">
                APP SCREENSHOT GALLERY
              </span>
              <span className="text-[10px] font-mono text-[#69776e] hidden sm:inline">
                (Swipe or scroll horizontally)
              </span>
            </div>

            {/* Navigation Buttons and Index Indicator */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-mono text-[#a0ada5] mr-2">
                <span className="text-[#a3e635] font-bold">0{activeIndex + 1}</span> / 0{galleryScreens.length}
              </span>

              <button
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="w-8 h-8 flex items-center justify-center bg-[#171e1b] border border-[#29352e] hover:border-[#a3e635] text-[#f0f5f1] disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors cursor-pointer"
                aria-label="Previous screenshot"
              >
                &larr;
              </button>
              <button
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex === galleryScreens.length - 1}
                className="w-8 h-8 flex items-center justify-center bg-[#171e1b] border border-[#29352e] hover:border-[#a3e635] text-[#f0f5f1] disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors cursor-pointer"
                aria-label="Next screenshot"
              >
                &rarr;
              </button>
            </div>
          </div>

          {/* Swipeable / Scrollable Image Track */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth touch-pan-x select-none"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#29352e #111715' }}
          >
            {galleryScreens.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] snap-center flex flex-col border transition-all duration-200 cursor-pointer ${
                  activeIndex === idx
                    ? 'border-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.15)] bg-[#171e1b]'
                    : 'border-[#29352e] hover:border-[#69776e] bg-[#141b18]'
                }`}
              >
                {/* Screenshot Frame */}
                <div
                  className="relative aspect-[9/16] w-full overflow-hidden bg-black group"
                  onClick={() => setLightboxImage(item.src)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />

                  {/* Hover Zoom Badge */}
                  <div className="absolute inset-0 bg-[#090f0d]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-mono text-[#a3e635] bg-[#111715] border border-[#a3e635] px-2.5 py-1">
                      🔍 Tap to expand
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#090f0d]/85 border border-[#29352e] text-[9px] font-mono text-[#a3e635]">
                    {item.label} // ANDROID APK
                  </div>
                </div>

                {/* Screenshot Caption Footer */}
                <div className="p-3 border-t border-[#29352e] flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#f0f5f1] truncate">
                    {item.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImage(item.src);
                    }}
                    className="text-[10px] text-[#a3e635] hover:underline whitespace-nowrap ml-2"
                  >
                    Zoom ↗
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Progress Indicators */}
          <div className="mt-4 pt-3 border-t border-[#29352e]/60 flex items-center justify-between text-[11px] font-mono text-[#69776e]">
            <div className="flex items-center gap-1.5">
              {galleryScreens.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToIndex(dotIdx)}
                  aria-label={`Jump to screenshot ${dotIdx + 1}`}
                  className={`h-1.5 transition-all cursor-pointer ${
                    activeIndex === dotIdx
                      ? 'w-6 bg-[#a3e635]'
                      : 'w-2 bg-[#29352e] hover:bg-[#69776e]'
                  }`}
                />
              ))}
            </div>

            <span className="text-[#a0ada5]">
              Core Android APK Engine · Real Cashflow Tournaments
            </span>
          </div>

        </div>

      </div>

      {/* Clean Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#090f0d]/95 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#111715] border border-[#29352e] p-3 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#29352e] text-xs font-mono">
              <span className="text-[#a3e635] font-bold">FIRE CLASH BD // APP SCREENSHOT</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="text-[#a0ada5] hover:text-[#fb7185] px-2 py-0.5 border border-[#29352e] cursor-pointer"
              >
                [CLOSE]
              </button>
            </div>

            {/* Large Image Preview */}
            <div className="w-full max-h-[80vh] overflow-hidden rounded border border-[#29352e] flex items-center justify-center bg-black">
              <img
                src={lightboxImage}
                alt="Enlarged app screenshot"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="w-full pt-2 flex items-center justify-between text-[11px] font-mono text-[#69776e]">
              <span>Tap anywhere outside to close</span>
              <span className="text-[#a3e635]">FIRE CLASH BD ANDROID</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
