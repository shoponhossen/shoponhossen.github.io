import React, { useState } from 'react';
import { PILLARS } from '../data/portfolioData';

export const Pillars: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | null>(null);

  return (
    <section className="py-16 md:py-24 border-b border-[#29352e] bg-[#0b0f0e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-['JetBrains_Mono'] tracking-wider text-[#a3e635] mb-2">
              // ARCHITECTURAL BALANCE
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f0f5f1] tracking-tight">
              Two Pillars of Strength: Frontend &amp; Backend
            </h2>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => {
            const isFrontend = pillar.id === 'frontend';
            const isExpanded = activeTab === pillar.id;

            return (
              <div
                key={pillar.id}
                className="bg-[#171e1b] border border-[#29352e] hover:border-[#424936] transition-all p-6 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#111715] border border-[#29352e] flex items-center justify-center text-[#a3e635]">
                        {isFrontend ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.75} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-[11px] font-['JetBrains_Mono'] tracking-widest text-[#a3e635] font-semibold">
                          {pillar.badge}
                        </div>
                        <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-semibold text-[#f0f5f1]">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="px-2.5 py-1 bg-[#111715] border border-[#29352e] text-[11px] font-['JetBrains_Mono'] text-[#34d399] tracking-wider whitespace-nowrap">
                      {pillar.tag}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#a0ada5] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* 2x2 Feature Checkpoint Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-4">
                    {pillar.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2.5 p-2 bg-[#111715] border border-[#29352e] text-xs font-['JetBrains_Mono'] text-[#dee4e0]"
                      >
                        <span className="w-4 h-4 bg-[#1b2420] border border-[#a3e635]/40 text-[#a3e635] flex items-center justify-center text-[11px] flex-shrink-0">
                          ✓
                        </span>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Architecture Snippet Toggle */}
                  {isExpanded && (
                    <div className="mt-4 p-3 bg-[#0b0f0e] border border-[#29352e] font-mono text-xs text-[#a0ada5] space-y-1">
                      <div className="text-[#a3e635] pb-1 border-b border-[#29352e] flex justify-between">
                        <span>{isFrontend ? 'ARCHITECTURAL PATTERN: REACT + FLET' : 'ARCHITECTURAL PATTERN: DJANGO + DRF'}</span>
                        <span className="text-[#69776e]">OPTIMIZED</span>
                      </div>
                      {isFrontend ? (
                        <p className="pt-1 text-[#f0f5f1]">
                          State tree mapped with atomic selectors; dynamic bundle splitting reducing initial paint time below 800ms. Flet modules deployed to desktop via Python runtime.
                        </p>
                      ) : (
                        <p className="pt-1 text-[#f0f5f1]">
                          PostgreSQL composite indexes on high-frequency filters, Django ORM select_related/prefetch_related zero-overhead data graphs, Redis query cache TTL = 300s.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer action inside card */}
                <div className="pt-4 border-t border-[#29352e]/60 flex items-center justify-between mt-2">
                  <button
                    onClick={() => setActiveTab(isExpanded ? null : (pillar.id as 'frontend' | 'backend'))}
                    className="text-xs font-['JetBrains_Mono'] text-[#a0ada5] hover:text-[#a3e635] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? '[-] Collapse Details' : '[+] Technical Breakdown'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
