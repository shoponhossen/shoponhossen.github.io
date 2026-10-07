import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import developerPortrait from '../assets/images/shopon_hossen_about.jpeg';

interface AboutProps {
  onGetInTouch: () => void;
}

export const About: React.FC<AboutProps> = ({ onGetInTouch }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'workflow'>('profile');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email).catch(() => {});
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const keyStats = [
    { label: 'EXPERIENCE', value: '5+', desc: 'Years building digital products' },
    { label: 'AVAILABILITY', value: 'IMMEDIATE', desc: 'Accepting client contracts' },
    { label: 'DELIVERY', value: 'END-TO-END', desc: 'From UI to database' },
    { label: 'LOCATION', value: 'KHULNA, BD', desc: 'Remote worldwide (UTC+6)' },
  ];

  const engineeringPrinciples = [
    {
      title: 'Full Stack Engineering',
      desc: 'Seamlessly unifying modern reactive frontends with battle-tested server architectures.',
      tag: '01_ARCHITECTURE',
    },
    {
      title: 'Clean Code & Maintainability',
      desc: 'Structured, readable, and documented codebases ready for long-term scalability.',
      tag: '02_CRAFT',
    },
    {
      title: 'Rapid Prototyping',
      desc: 'Fast iterations and interactive prototypes to validate concepts without dragging timelines.',
      tag: '03_AGILITY',
    },
    {
      title: 'API-First Architecture',
      desc: 'High-throughput, strictly validated REST APIs and relational schemas built on Django & DRF.',
      tag: '04_SYSTEMS',
    },
  ];

  const techArsenal = [
    {
      category: 'BACKEND SYSTEMS',
      skills: ['Python 3.12', 'Django 5', 'Django REST Framework', 'WebSockets', 'Celery / Redis'],
    },
    {
      category: 'FRONTEND & DESKTOP',
      skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Python Flet (Desktop/Mobile)', 'Vite'],
    },
    {
      category: 'DATABASE & INFRASTRUCTURE',
      skills: ['PostgreSQL', 'SQLite', 'MySQL', 'Docker', 'Linux/Bash', 'Git Workflow'],
    },
  ];

  const collaborationGuarantees = [
    {
      step: '01',
      title: 'Transparent Communication',
      desc: 'Frequent async updates, clear sprint milestones, and zero guessing games.',
    },
    {
      step: '02',
      title: 'Direct Engineering Ownership',
      desc: 'You work directly with the developer building the product—not through middlemen.',
    },
    {
      step: '03',
      title: 'Complete Handoff & Independence',
      desc: 'Clean GitHub repositories, setup documentation, and deployment guides so you own 100% of your product.',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 border-b border-[#29352e] bg-[#0b0f0e] relative overflow-hidden">
      
      {/* Background blueprint grid accents */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-[#29352e]/80 pb-6">
          <div>
            <div className="text-xs font-['JetBrains_Mono'] tracking-wider text-[#a0ada5] mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">01</span> / ABOUT ----
              <span className="text-[10px] bg-[#111715] border border-[#29352e] px-1.5 py-0.5 text-[#34d399]">
                DEVELOPER_PROFILE_V2
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#f0f5f1] tracking-tight">
              Hello, this is Shopon Hossen.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#a0ada5]">
            <span className="w-2 h-2 bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse"></span>
            <span>AVAILABLE FOR FREELANCE &amp; CONTRACT ROLES</span>
          </div>
        </div>

        {/* Quick Stats Matrix (Responsive Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          {keyStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#111715] border border-[#29352e] p-3 sm:p-4 hover:border-[#a3e635]/60 transition-colors"
            >
              <div className="text-[10px] font-mono text-[#69776e] tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="font-['Space_Grotesk'] text-base sm:text-xl md:text-2xl font-bold text-[#a3e635]">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-[#a0ada5] mt-1 truncate">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Main Profile Grid: Interactive Content + Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Tabbed Storyboard */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Lead Statement Box */}
            <div className="bg-[#111715] border border-[#29352e] p-4 sm:p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#a3e635]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#a3e635]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#a3e635]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#a3e635]" />

              <div className="text-[10px] font-mono text-[#a3e635] tracking-widest uppercase mb-2">
                // MISSION STATEMENT
              </div>
              <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#dee4e0] leading-relaxed">
                I&apos;m a full-stack developer passionate about turning ambitious ideas into polished, end-to-end digital experiences. I build responsive interfaces with React.js and Python Flet, backed by reliable and scalable systems powered by Python, Django, and Django REST Framework. I enjoy connecting the frontend and backend into cohesive products where thoughtful UI meets solid engineering.
              </p>
            </div>

            {/* Interactive Tab Controls */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#29352e] pb-3">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
                  activeTab === 'profile'
                    ? 'bg-[#1b2420] border-[#a3e635] text-[#a3e635] font-bold'
                    : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#a0ada5]'
                }`}
              >
                [01 / PRINCIPLES]
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
                  activeTab === 'stack'
                    ? 'bg-[#1b2420] border-[#a3e635] text-[#a3e635] font-bold'
                    : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#a0ada5]'
                }`}
              >
                [02 / TECH ARSENAL]
              </button>
              <button
                onClick={() => setActiveTab('workflow')}
                className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
                  activeTab === 'workflow'
                    ? 'bg-[#1b2420] border-[#a3e635] text-[#a3e635] font-bold'
                    : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#a0ada5]'
                }`}
              >
                [03 / HOW WE WORK]
              </button>
            </div>

            {/* Tab 1: Principles */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                {engineeringPrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#111715] border border-[#29352e] hover:border-[#a3e635]/60 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#a3e635] mb-1">
                        {principle.tag}
                      </div>
                      <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#f0f5f1] mb-1.5">
                        {principle.title}
                      </div>
                      <p className="text-[11px] font-mono text-[#a0ada5] leading-relaxed">
                        {principle.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Tech Arsenal */}
            {activeTab === 'stack' && (
              <div className="space-y-3.5 animate-fadeIn">
                {techArsenal.map((category, idx) => (
                  <div key={idx} className="p-3.5 bg-[#111715] border border-[#29352e]">
                    <div className="text-[10px] font-mono text-[#a3e635] uppercase mb-2">
                      &gt; {category.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-[#171e1b] border border-[#29352e] text-xs font-mono text-[#dee4e0]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Workflow */}
            {activeTab === 'workflow' && (
              <div className="space-y-3 animate-fadeIn">
                {collaborationGuarantees.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-[#111715] border border-[#29352e] flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-[#a3e635] bg-[#171e1b] border border-[#29352e] px-2 py-0.5">
                      {item.step}
                    </span>
                    <div>
                      <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#f0f5f1] mb-0.5">
                        {item.title}
                      </div>
                      <p className="text-[11px] font-mono text-[#a0ada5] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onGetInTouch}
                className="flex items-center gap-2 px-5 sm:px-6 py-3 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-xs sm:text-sm font-bold tracking-wider transition-colors duration-150 cursor-pointer shadow-[0_0_12px_rgba(163,230,53,0.15)]"
              >
                <span>Get In Touch</span>
                <span className="text-base font-normal">↗</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 bg-[#111715] hover:bg-[#171e1b] text-[#f0f5f1] border border-[#29352e] hover:border-[#a3e635] text-xs font-mono transition-colors cursor-pointer"
              >
                {copiedEmail ? '✓ Copied Email' : '✉ Copy Email'}
              </button>

              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-[#111715] hover:bg-[#171e1b] text-[#a0ada5] hover:text-[#f0f5f1] border border-[#29352e] hover:border-[#a0ada5] text-xs font-mono transition-colors"
              >
                GitHub ↗
              </a>
            </div>

          </div>

          {/* Right Column: Developer Photo Card (Fully Responsive) */}
          <div className="lg:col-span-5 w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none mx-auto">
            <div className="border border-[#29352e] bg-[#171e1b] p-3 sm:p-4 shadow-2xl relative group">
              
              {/* Corner crosshairs */}
              <span className="absolute -top-1.5 -left-1.5 text-xs text-[#a3e635] select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 text-xs text-[#a3e635] select-none">+</span>
              <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#a3e635] select-none">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#a3e635] select-none">+</span>

              {/* Top Terminal Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#29352e] text-[11px] font-mono text-[#a0ada5]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#a3e635]"></span>
                  <span className="text-[#dee4e0] font-semibold">shopon@khulna</span>
                </div>
                <span className="text-[10px] text-[#34d399] bg-[#111715] border border-[#29352e] px-1.5 py-0.5">
                  ID: VERIFIED_DEV
                </span>
              </div>

              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.5] overflow-hidden border border-[#29352e] bg-[#090f0d]">
                <img
                  src={developerPortrait}
                  alt={DEVELOPER_INFO.name}
                  className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-[1.02] transition-transform duration-300"
                />
                
                {/* Subtle vignette/scanline overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating telemetry tag inside image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#0b0f0e]/85 backdrop-blur-sm border border-[#29352e] px-2.5 py-1 text-[10px] font-mono">
                  <span className="text-[#dee4e0]">FULL STACK ARCHITECT</span>
                  <span className="text-[#a3e635]">KHULNA, BD</span>
                </div>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="mt-3 p-3 bg-[#111715] border border-[#29352e] space-y-2 text-xs font-['JetBrains_Mono']">
                <div className="flex items-center justify-between text-[#f0f5f1]">
                  <span className="font-semibold text-sm">{DEVELOPER_INFO.name}</span>
                  <span className="text-[10px] text-[#a3e635]">[STATUS: 200 OK]</span>
                </div>

                <div className="text-[11px] text-[#a0ada5] flex items-center justify-between pt-1 border-t border-[#29352e]/60">
                  <span>Stack: Python · Django · React</span>
                  <span className="text-[#34d399]">UTC+6</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
