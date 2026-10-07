import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenProjectModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenProjectModal }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[#29352e] bg-[#0b0f0e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Card */}
        <div className="border border-[#29352e] bg-[#171e1b] p-8 sm:p-12 lg:p-16 relative">
          
          {/* Kicker */}
          <div className="text-xs font-['JetBrains_Mono'] tracking-wider text-[#a0ada5] mb-4">
            <span className="text-[#a3e635]">05</span> / INITIATE COLLABORATION ----
          </div>

          {/* Headline */}
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f5f1] tracking-tight max-w-3xl mb-4">
            Have a project in mind?
          </h2>

          {/* Description */}
          <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#a0ada5] max-w-2xl leading-relaxed mb-8">
            Let&apos;s discuss what you&apos;re building and how I can help bring the backend to life. Whether it&apos;s an API from scratch,
            database redesign, or ongoing backend support.
          </p>

          {/* Terminal Command Box */}
          <div className="p-4 sm:p-5 bg-[#111715] border border-[#29352e] mb-8 font-['JetBrains_Mono'] text-xs sm:text-sm space-y-1.5 max-w-2xl">
            <div className="text-[#a0ada5] flex items-center gap-2">
              <span className="text-[#a3e635] font-bold">$</span>
              <span>contact --status</span>
            </div>
            <div className="text-[#f0f5f1] pl-4 flex items-center gap-2">
              <span className="text-[#34d399]">&gt;</span>
              <span>Ready to discuss your project.</span>
              <span className="inline-block w-2 h-4 bg-[#a3e635] cursor-blink"></span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenProjectModal}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-xs sm:text-sm font-bold tracking-wider transition-colors duration-150 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.18)]"
            >
              <span>Describe Your Idea</span>
              <span className="text-base">↗</span>
            </button>

            <button
              onClick={copyEmail}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[#111715] hover:bg-[#1b2420] text-[#dee4e0] hover:text-[#a3e635] border border-[#29352e] hover:border-[#a3e635] font-['JetBrains_Mono'] text-xs sm:text-sm tracking-wider transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#a3e635]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{copied ? '✓ COPIED TO CLIPBOARD' : DEVELOPER_INFO.email}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
