import React, { useState } from 'react';
import { SOLUTIONS, Solution } from '../data/portfolioData';

interface SolutionsProps {
  onSelectSolution?: (solution: Solution) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onSelectSolution }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const getSolutionIcon = (index: string) => {
    switch (index) {
      case '01':
        return '⊞';
      case '02':
        return '⌨';
      case '03':
        return '📱';
      case '04':
        return '⚛';
      case '05':
        return '📲';
      case '06':
        return '⚙';
      default:
        return '>';
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 border-b border-[#29352e] bg-[#0b0f0e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-['JetBrains_Mono'] tracking-wider text-[#a0ada5] mb-2">
            <span className="text-[#a3e635]">03</span> / WHAT I DO ----
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0f5f1] tracking-tight">
            Full stack solutions tailored to your product goals.
          </h2>
          <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#a0ada5] mt-2 max-w-2xl leading-relaxed">
            Engineered for stability, rapid delivery, and seamless collaboration across modern web, desktop, and mobile
            technologies.
          </p>
        </div>

        {/* 6-Card Bento Grid: Symmetrical 3x2 on desktop, 2-col on tablet, 1-col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution) => {
            const isSelected = selectedCard === solution.id;
            const icon = getSolutionIcon(solution.index);

            return (
              <div
                key={solution.id}
                onClick={() => {
                  setSelectedCard(isSelected ? null : solution.id);
                  if (onSelectSolution) onSelectSolution(solution);
                }}
                className={`bg-[#171e1b] border ${
                  isSelected ? 'border-[#a3e635]' : 'border-[#29352e]'
                } hover:border-[#424936] p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer group`}
              >
                <div>
                  {/* Header: Index & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#a3e635] tracking-wider">
                      [ {solution.index} ]
                    </span>
                    <span className="text-[#69776e] group-hover:text-[#a3e635] transition-colors text-base font-mono">
                      {icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f0f5f1] mb-3 group-hover:text-[#a3e635] transition-colors">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="font-['JetBrains_Mono'] text-xs text-[#a0ada5] leading-relaxed mb-6">
                    {solution.description}
                  </p>
                </div>

                <div>
                  {/* Technical tags */}
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#69776e] pt-4 border-t border-[#29352e]">
                    {solution.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="hover:text-[#dee4e0] transition-colors">
                        {tIdx === 0 ? `> ${tag}` : `· ${tag}`}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Tech Snippet */}
                  {isSelected && (
                    <div className="mt-3 p-2.5 bg-[#0b0f0e] border border-[#29352e] text-[10px] font-mono text-[#a3e635]">
                      <span className="text-[#69776e]">STACK BLUEPRINT:</span> {solution.techSnippet}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
