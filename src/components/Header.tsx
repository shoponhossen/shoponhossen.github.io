import React, { useState, useEffect } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import developerPortrait from '../assets/images/shopon_hossen_nav.jpg';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenTerminalModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenTerminalModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SERVICES', href: '#services' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0f1513]/95 backdrop-blur-md border-b border-[#29352e]">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          
          {/* Left Brand & Desktop Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-0 flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-1.5 sm:gap-2 group text-[#f0f5f1] font-['JetBrains_Mono'] text-xs sm:text-sm tracking-wider font-semibold whitespace-nowrap"
            >
              <span className="text-[#a3e635]">&gt;</span>
              <span className="tracking-tight">
                SHOPON <span className="text-[#a3e635]">HOSSEN</span>
              </span>
            </a>

            {/* Desktop Nav Items (hidden on mobile, visible on md+) */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-xs font-['JetBrains_Mono'] tracking-wider text-[#a0ada5] hover:text-[#a3e635] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#a3e635] hover:after:w-full after:transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Status & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Terminal Quick Button (hidden on small mobile, visible on sm+) */}
            {onOpenTerminalModal && (
              <button
                onClick={onOpenTerminalModal}
                title="Open Terminal Workbench"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-['JetBrains_Mono'] text-[#a0ada5] border border-[#29352e] hover:border-[#a3e635] hover:text-[#a3e635] bg-[#111715] transition-colors cursor-pointer"
              >
                <span className="text-[#a3e635] font-bold">&gt;_</span>
                <span>CLI</span>
              </button>
            )}

            {/* Live Status Badge (visible on lg+) */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-[#111715] border border-[#29352e] text-[11px] font-['JetBrains_Mono'] text-[#a0ada5]">
              <span className="w-1.5 h-1.5 bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse"></span>
              <span>Available for freelance</span>
            </div>

            {/* Primary CTA (compact on mobile) */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-[11px] sm:text-xs font-bold tracking-wider transition-all duration-150 cursor-pointer shadow-[0_0_12px_rgba(163,230,53,0.15)] active:translate-y-[1px] whitespace-nowrap"
            >
              <span>LET&apos;S TALK</span>
              <span className="text-xs sm:text-sm">↗</span>
            </button>

            {/* Developer Thumbnail */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 relative border border-[#29352e] bg-[#171e1b] overflow-hidden flex-shrink-0 group">
              <img
                src={developerPortrait}
                alt={DEVELOPER_INFO.name}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#a3e635]" title="Verified Engineer" />
            </div>

            {/* Mobile Menu Hamburger Button (visible on < md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-[#29352e] hover:border-[#a3e635] text-[#a0ada5] hover:text-[#a3e635] bg-[#111715] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="font-mono text-xs font-bold">
                {mobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer & Backdrop Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col pt-16 animate-fadeIn">
          
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-[#090f0d]/80 backdrop-blur-sm -z-10"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Panel */}
          <div className="w-full bg-[#0f1513] border-b border-[#29352e] px-4 py-5 shadow-2xl flex flex-col space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            
            {/* Drawer Header Terminal Tag */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#69776e] pb-2 border-b border-[#29352e]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#a3e635]"></span>
                <span className="text-[#a0ada5]">NAVIGATION CONSOLE</span>
              </div>
              <span className="text-[#34d399]">KHULNA // REMOTE</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between py-3 px-3 border border-transparent hover:border-[#29352e] hover:bg-[#111715] text-xs font-['JetBrains_Mono'] tracking-wider text-[#f0f5f1] hover:text-[#a3e635] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#a3e635] font-bold">0{index + 1}</span>
                    <span>{link.label}</span>
                  </div>
                  <span className="text-[#69776e] text-[11px]">→</span>
                </a>
              ))}
            </nav>

            {/* Drawer Actions */}
            <div className="pt-2 border-t border-[#29352e]/60 space-y-2.5">
              
              {/* Project Discovery CTA */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(163,230,53,0.2)]"
              >
                <span>INITIATE PROJECT SCOPING</span>
                <span>↗</span>
              </button>

              {/* CLI Terminal Trigger */}
              {onOpenTerminalModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminalModal();
                  }}
                  className="w-full py-2.5 bg-[#111715] hover:bg-[#171e1b] border border-[#29352e] hover:border-[#a3e635] text-[#a0ada5] hover:text-[#f0f5f1] font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="text-[#a3e635]">&gt;_</span>
                  <span>LAUNCH CLI WORKBENCH</span>
                </button>
              )}
            </div>

            {/* Telemetry Footer */}
            <div className="pt-2 text-[10px] font-mono text-[#69776e] flex items-center justify-between">
              <span>STATUS: AVAILABLE FOR WORK</span>
              <span className="text-[#a3e635]">TAP ANY LINK TO JUMP</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
