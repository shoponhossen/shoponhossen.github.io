import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090f0d] border-t border-[#29352e] text-[#a0ada5] font-['JetBrains_Mono'] text-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top 3-Column Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#29352e]">
          
          {/* Column 1: Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#a3e635] font-bold">&gt;</span>
              <span className="text-[#f0f5f1] font-bold text-sm tracking-wider">SHOPON HOSSEN</span>
              <span className="text-[10px] bg-[#111715] text-[#34d399] border border-[#29352e] px-1.5 py-0.5">
                Available
              </span>
            </div>

            <p className="text-xs text-[#a0ada5] leading-relaxed max-w-sm">
              Building reliable software, one system at a time. Specializing in high-throughput Django architectures,
              resilient async pipelines, and distributed backends.
            </p>

            <div className="text-[11px] text-[#69776e]">
              STACK: DJANGO · DRF · PYTHON · REACT · FLET · POSTGRESQL
            </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[#dee4e0] font-semibold text-xs tracking-wider uppercase">
              NAVIGATION DIRECTORY
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#a3e635] transition-colors flex items-center gap-1.5">
                  <span className="text-[#69776e]">&gt;</span> Home
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#a3e635] transition-colors flex items-center gap-1.5">
                  <span className="text-[#69776e]">&gt;</span> Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#a3e635] transition-colors flex items-center gap-1.5">
                  <span className="text-[#69776e]">&gt;</span> Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#a3e635] transition-colors flex items-center gap-1.5">
                  <span className="text-[#69776e]">&gt;</span> About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#a3e635] transition-colors flex items-center gap-1.5">
                  <span className="text-[#69776e]">&gt;</span> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Telemetry Channels */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[#dee4e0] font-semibold text-xs tracking-wider uppercase">
              DIRECT TELEMETRY
            </div>
            <div className="space-y-2 text-xs">
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-[#111715] border border-[#29352e] hover:border-[#a3e635] hover:text-[#f0f5f1] transition-all"
              >
                <span>[01] GitHub Profile</span>
                <span className="text-[#a3e635]">↗</span>
              </a>

              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="flex items-center justify-between p-2 bg-[#111715] border border-[#29352e] hover:border-[#a3e635] hover:text-[#f0f5f1] transition-all"
              >
                <span className="truncate">[02] {DEVELOPER_INFO.email}</span>
                <span className="text-[#a3e635]">✉</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Diagnostics Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#69776e]">
          <div>
            © 2026 Shopon. Built with curiosity and clean code.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#dee4e0]">
              <span className="w-1.5 h-1.5 bg-[#a3e635]"></span>
              <span>SYS: OPERATIONAL</span>
            </div>
            <span className="text-[#29352e]">|</span>
            <div className="flex items-center gap-1.5 text-[#dee4e0]">
              <span className="w-1.5 h-1.5 bg-[#34d399]"></span>
              <span>REGION: GLOBAL</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
