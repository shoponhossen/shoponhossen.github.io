import React, { useState, useEffect, useRef } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import developerPortrait from '../assets/images/shopon_hossen_nav.jpg';

interface HeroProps {
  onDiscussProject: () => void;
  onExploreWork: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ onDiscussProject, onExploreWork }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [latency, setLatency] = useState(14);
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Periodic subtle latency fluctuation like a real server ping
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let response: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        response = (
          <div className="space-y-1 text-xs text-[#a0ada5]">
            <p className="text-[#a3e635]">Available commands:</p>
            <p><span className="text-[#f0f5f1]">neofetch</span> - Display developer specs and ASCII banner</p>
            <p><span className="text-[#f0f5f1]">whoami</span> - Display architect identity</p>
            <p><span className="text-[#f0f5f1]">role</span> - Core competencies and focus</p>
            <p><span className="text-[#f0f5f1]">skills</span> - Full-stack technology breakdown</p>
            <p><span className="text-[#f0f5f1]">projects</span> - List highlighted production systems</p>
            <p><span className="text-[#f0f5f1]">curl /api/status</span> - Inspect backend diagnostics</p>
            <p><span className="text-[#f0f5f1]">benchmarks</span> - View database and latency metrics</p>
            <p><span className="text-[#f0f5f1]">contact</span> - Direct channels to initiate work</p>
            <p><span className="text-[#f0f5f1]">clear</span> - Reset terminal window</p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'neofetch':
        response = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#a3e635] text-[10px] sm:text-xs leading-tight whitespace-pre select-none font-bold overflow-x-auto">
{`  _____ _                                
 / ____| |                               
| (___ | |__   ___  _ __   ___  _ __     
 \\___ \\| '_ \\ / _ \\| '_ \\ / _ \\| '_ \\    
 ____) | | | | (_) | |_) | (_) | | | |   
|_____/|_| |_|\\___/| .__/ \\___/|_| |_|   
                   | |                   
                   |_|                   `}
            </div>
            <div className="space-y-0.5 text-[#a0ada5] text-[11px]">
              <p><span className="text-[#a3e635] font-bold">user:</span> shopon@fullstack</p>
              <p><span className="text-[#a3e635] font-bold">role:</span> Full Stack Developer &amp; Backend Systems Architect</p>
              <p><span className="text-[#a3e635] font-bold">stack:</span> Python 3.12 · Django · DRF · React 19 · PostgreSQL · Flet</p>
              <p><span className="text-[#34d399] font-bold">status:</span> Available for new projects</p>
            </div>
          </div>
        );
        break;
      case 'whoami':
        response = (
          <div className="text-xs text-[#f0f5f1]">
            <p className="font-bold text-[#a3e635]">Shopon Hossen</p>
            <p className="text-[#a0ada5]">Full Stack Developer &amp; Backend Systems Architect</p>
            <p className="text-[#69776e]">Location: Khulna, Bangladesh (Working globally across US/EU/APAC timezones)</p>
          </div>
        );
        break;
      case 'role':
        response = (
          <p className="text-xs text-[#34d399]">
            Full Stack Developer &amp; Backend Architect specializing in Python, Django, DRF, React, and Flet.
          </p>
        );
        break;
      case 'skills':
      case 'cat stack.json':
        response = (
          <div className="text-xs space-y-1 font-mono">
            <p className="text-[#a0ada5]">&#123;</p>
            <p className="pl-4 text-[#69776e]">&quot;frontend&quot;: [&quot;React.js&quot;, &quot;Tailwind CSS&quot;, &quot;Python Flet&quot;, &quot;TypeScript&quot;],</p>
            <p className="pl-4 text-[#a3e635]">&quot;backend&quot;: [&quot;Python 3.12&quot;, &quot;Django 5.0&quot;, &quot;DRF&quot;, &quot;PostgreSQL&quot;, &quot;Redis&quot;],</p>
            <p className="pl-4 text-[#34d399]">&quot;architecture&quot;: [&quot;REST APIs&quot;, &quot;ORM Optimization&quot;, &quot;JWT Auth&quot;, &quot;Celery&quot;]</p>
            <p className="text-[#a0ada5]">&#125;</p>
          </div>
        );
        break;
      case 'projects':
        response = (
          <div className="text-xs space-y-1">
            <p className="text-[#a3e635] font-semibold">[01] Fire Clash BD</p>
            <p className="text-[#a0ada5]">Profitable production esports tournament startup with mobile APK engine and automated bKash/Nagad payouts.</p>
            <p className="text-[#69776e]">&gt; Live URL: https://fireclashbd.github.io</p>
          </div>
        );
        break;
      case 'curl /api/status':
      case 'status':
        response = (
          <div className="text-xs font-mono text-[#a0ada5] bg-[#111715] p-2 border border-[#29352e]">
            <p className="text-[#4ade80]">HTTP/2 200 OK</p>
            <p className="text-[#69776e]">Content-Type: application/json</p>
            <p className="mt-1 text-[#f0f5f1]">&#123;</p>
            <p className="pl-3 text-[#a3e635]">&quot;developer&quot;: &quot;Shopon Hossen&quot;,</p>
            <p className="pl-3">&quot;availability&quot;: &quot;AVAILABLE_FOR_CONTRACTS&quot;,</p>
            <p className="pl-3 text-[#34d399]">&quot;health&quot;: &quot;ALL_SYSTEMS_OPTIMAL&quot;,</p>
            <p className="pl-3">&quot;verified_skills&quot;: 18</p>
            <p className="text-[#f0f5f1]">&#125;</p>
          </div>
        );
        break;
      case 'benchmarks':
        response = (
          <div className="text-xs space-y-1">
            <p className="text-[#f0f5f1] font-semibold">&gt; SYSTEM PERFORMANCE TELEMETRY:</p>
            <p className="text-[#a0ada5]">- P99 API Latency: <span className="text-[#a3e635]">18.4ms</span></p>
            <p className="text-[#a0ada5]">- Redis Cache Hit Ratio: <span className="text-[#34d399]">96.8%</span></p>
            <p className="text-[#a0ada5]">- Django ORM Query Count: <span className="text-[#a3e635]">1-2 per endpoint (N+1 eliminated)</span></p>
          </div>
        );
        break;
      case 'contact':
        response = (
          <div className="text-xs space-y-1">
            <p className="text-[#a3e635]">Contact Direct Channels:</p>
            <p className="text-[#f0f5f1]">Email: <span className="text-[#34d399]">shoponhossen2008@gmail.com</span></p>
            <p className="text-[#a0ada5]">GitHub: github.com/shoponhossen</p>
            <p className="text-[#69776e]">Click &quot;Discuss Your Project&quot; to initialize project scope directly.</p>
          </div>
        );
        break;
      default:
        response = (
          <p className="text-xs text-[#fb7185]">
            zsh: command not found: {trimmed}. Type <span className="underline text-[#a3e635]">help</span> for valid diagnostic commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }]);
    setInputVal('');

    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTo({
          top: terminalBodyRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const executeChipCommand = (cmd: string) => {
    setTerminalOpen(true);
    handleCommand(cmd);
  };

  return (
    <section id="home" className="relative pt-[14px] pb-12 sm:pb-16 md:pb-24 border-b border-[#29352e] bg-[#0b0f0e] overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* PHOTO COLUMN: ON MOBILE THIS IS ORDER-1 (FIRST ELEMENT SEEN!) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center py-4 sm:py-6">
            
            {/* The Animated Orbiting Cyber-Orb Container */}
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] flex items-center justify-center select-none">
              
              {/* Layer 1: Ambient Pulsing Green Glow Backdrop */}
              <div className="absolute inset-4 rounded-full bg-[#a3e635]/10 blur-2xl animate-pulse pointer-events-none" />

              {/* Layer 2: Outermost Wavy Ripple SVG Circle (Animated Sonar Pulse) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_35s_linear_infinite]"
                viewBox="0 0 400 400"
                fill="none"
              >
                {/* Wavy undulating perimeter path */}
                <path
                  d="M 200, 20
                     C 240, 25 285, 45 320, 80
                     C 355, 115 375, 160 380, 200
                     C 375, 240 355, 285 320, 320
                     C 285, 355 240, 375 200, 380
                     C 160, 375 115, 355 80, 320
                     C 45, 285 25, 240 20, 200
                     C 25, 160 45, 115 80, 80
                     C 115, 45 160, 25 200, 20 Z"
                  stroke="#a3e635"
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                  strokeDasharray="4 6"
                />
              </svg>

              {/* Layer 3: Reverse Rotating Technical Compass Ring */}
              <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-[#a3e635]/30 animate-[spin_20s_linear_infinite_reverse] pointer-events-none flex items-center justify-center">
                {/* Crosshair Cardinal Ticks */}
                <span className="absolute -top-1.5 text-[10px] font-mono text-[#a3e635] font-bold">N·00°</span>
                <span className="absolute -bottom-1.5 text-[10px] font-mono text-[#34d399] font-bold">S·180°</span>
                <span className="absolute -left-2 text-[10px] font-mono text-[#69776e]">W·270°</span>
                <span className="absolute -right-2 text-[10px] font-mono text-[#69776e]">E·90°</span>
              </div>

              {/* Layer 4: Orbiting Tech Badges (Satellites in Planetary Motion) */}
              <div className="absolute inset-0 pointer-events-none animate-[spin_28s_linear_infinite]">
                
                {/* Satellite 1: Top (Python) */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-[spin_28s_linear_infinite_reverse]">
                    <span className="px-2.5 py-0.5 bg-[#0b0f0e] border border-[#a3e635] text-[#a3e635] text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(163,230,53,0.3)] tracking-wider">
                      PYTHON
                    </span>
                  </div>
                </div>

                {/* Satellite 2: Right (Django) */}
                <div className="absolute top-1/2 right-1 translate-x-1/2 -translate-y-1/2">
                  <div className="animate-[spin_28s_linear_infinite_reverse]">
                    <span className="px-2.5 py-0.5 bg-[#0b0f0e] border border-[#34d399] text-[#34d399] text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(52,211,153,0.3)] tracking-wider">
                      DJANGO
                    </span>
                  </div>
                </div>

                {/* Satellite 3: Bottom (React) */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="animate-[spin_28s_linear_infinite_reverse]">
                    <span className="px-2.5 py-0.5 bg-[#0b0f0e] border border-[#38bdf8] text-[#38bdf8] text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(56,189,248,0.3)] tracking-wider">
                      REACT
                    </span>
                  </div>
                </div>

                {/* Satellite 4: Left (Flet) */}
                <div className="absolute top-1/2 left-1 -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-[spin_28s_linear_infinite_reverse]">
                    <span className="px-2.5 py-0.5 bg-[#0b0f0e] border border-[#fbbf24] text-[#fbbf24] text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)] tracking-wider">
                      FLET
                    </span>
                  </div>
                </div>

              </div>

              {/* Layer 5: Inner Concentric Pulsing Wave */}
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-[#a3e635]/40 animate-ping opacity-20 pointer-events-none" />

              {/* Layer 6: The Central Circular Photo Frame */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-tr from-[#a3e635] via-[#34d399]/60 to-[#a3e635] shadow-[0_0_35px_rgba(163,230,53,0.35)] group z-10">
                
                {/* Photo Clip Inner */}
                <div className="w-full h-full rounded-full overflow-hidden bg-[#090f0d] relative border-2 border-[#0b0f0e]">
                  <img
                    src={developerPortrait}
                    alt={DEVELOPER_INFO.name}
                    className="w-full h-full object-cover object-[center_20%] filter contrast-[1.08] brightness-[0.98] group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Radial Vignette & Scanline Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Live Status Pill Inside Bottom of Circle */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#0b0f0e]/90 backdrop-blur-md border border-[#a3e635]/80 rounded-full text-[9px] font-mono text-[#f0f5f1] flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
                    <span className="font-semibold">ONLINE</span>
                    <span className="text-[#69776e]">·</span>
                    <span className="text-[#a3e635]">{latency}ms</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Status Sub-bar underneath circular avatar */}
            <div className="mt-3 sm:mt-4 text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111715] border border-[#29352e] rounded-full text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]"></span>
                <span className="text-[#f0f5f1] font-semibold">SHOPON HOSSEN</span>
                <span className="text-[#69776e]">·</span>
                <span className="text-[#34d399]">KHULNA [UTC+6]</span>
              </div>

              <div>
                <button
                  onClick={() => setTerminalOpen(!terminalOpen)}
                  className="text-[11px] font-mono text-[#a3e635] hover:underline cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{terminalOpen ? '[-] Close Terminal Drawer' : '[>_ Open Interactive Terminal]'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* TEXT COLUMN: ON MOBILE THIS IS ORDER-2 (COMES AFTER THE PHOTO) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Main Headline */}
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-[#f0f5f1] leading-[1.12]">
              Crafting{' '}
              <span className="text-[#a3e635] block sm:inline">
                complete digital products
              </span>{' '}
              from UI to database.
            </h1>

            {/* Lead Paragraph */}
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm md:text-base text-[#a0ada5] leading-relaxed max-w-2xl">
              I&apos;m Shopon, a full stack developer crafting high-performance user interfaces and resilient backend
              architectures with Python, Django, DRF, React, and Flet.
            </p>

            {/* Empirical Capability Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <span className="px-2.5 py-1 bg-[#111715] border border-[#29352e] text-[#dee4e0]">
                Python 3.12 &amp; Django
              </span>
              <span className="px-2.5 py-1 bg-[#111715] border border-[#29352e] text-[#dee4e0]">
                Django REST Framework
              </span>
              <span className="px-2.5 py-1 bg-[#111715] border border-[#29352e] text-[#dee4e0]">
                React 19 &amp; Tailwind CSS
              </span>
              <span className="px-2.5 py-1 bg-[#111715] border border-[#29352e] text-[#a3e635]">
                Python Flet Desktop &amp; Mobile
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onDiscussProject}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-xs sm:text-sm font-bold tracking-wider transition-colors duration-150 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.2)] active:translate-y-[1px]"
              >
                <span>Discuss Your Project</span>
                <span className="text-base font-normal">↗</span>
              </button>

              <button
                onClick={onExploreWork}
                className="flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-[#171e1b] text-[#f0f5f1] hover:text-[#a3e635] border border-[#29352e] hover:border-[#a3e635] font-['JetBrains_Mono'] text-xs sm:text-sm tracking-wider transition-colors duration-150 cursor-pointer"
              >
                <span>&gt; Explore My Work</span>
              </button>
            </div>

            {/* Quick Interactive Shell Command Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#69776e]">
              <span className="text-[#a0ada5]">QUERY CLI:</span>
              <button
                onClick={() => executeChipCommand('whoami')}
                className="px-2 py-0.5 bg-[#111715] hover:bg-[#1b2420] border border-[#29352e] hover:border-[#a3e635] text-[#a0ada5] hover:text-[#a3e635] transition-colors cursor-pointer"
              >
                $ whoami
              </button>
              <button
                onClick={() => executeChipCommand('skills')}
                className="px-2 py-0.5 bg-[#111715] hover:bg-[#1b2420] border border-[#29352e] hover:border-[#a3e635] text-[#a0ada5] hover:text-[#a3e635] transition-colors cursor-pointer"
              >
                $ skills
              </button>
              <button
                onClick={() => executeChipCommand('curl /api/status')}
                className="px-2 py-0.5 bg-[#111715] hover:bg-[#1b2420] border border-[#29352e] hover:border-[#a3e635] text-[#a0ada5] hover:text-[#a3e635] transition-colors cursor-pointer"
              >
                $ status
              </button>
              <button
                onClick={() => executeChipCommand('benchmarks')}
                className="px-2 py-0.5 bg-[#111715] hover:bg-[#1b2420] border border-[#29352e] hover:border-[#a3e635] text-[#a0ada5] hover:text-[#a3e635] transition-colors cursor-pointer"
              >
                $ benchmarks
              </button>
            </div>

          </div>

        </div>

        {/* Expandable Interactive Terminal Drawer (When Opened) */}
        {terminalOpen && (
          <div className="mt-8 border border-[#29352e] bg-[#171e1b] shadow-2xl animate-fadeIn">
            
            {/* Window Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#111715] border-b border-[#29352e]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#fb7185]/80 border border-[#fb7185]"></div>
                <div className="w-2.5 h-2.5 bg-[#fbbf24]/80 border border-[#fbbf24]"></div>
                <div className="w-2.5 h-2.5 bg-[#4ade80]/80 border border-[#4ade80]"></div>
                <span className="ml-1 text-xs font-mono text-[#a0ada5]">
                  shopon@fullstack: ~/interactive-console.sh
                </span>
              </div>

              <button
                onClick={() => setTerminalOpen(false)}
                className="text-xs font-mono text-[#a0ada5] hover:text-[#fb7185] px-1.5 py-0.5 border border-[#29352e] cursor-pointer"
              >
                [CLOSE]
              </button>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              className="p-4 sm:p-5 font-['JetBrains_Mono'] text-xs sm:text-[13px] leading-relaxed max-h-[300px] overflow-y-auto space-y-3"
            >
              <div>
                <div className="text-[#a0ada5] flex items-center gap-2">
                  <span className="text-[#a3e635] font-bold">$</span>
                  <span>whoami</span>
                </div>
                <div className="text-[#f0f5f1] font-semibold pl-4 pt-0.5">
                  {DEVELOPER_INFO.name} — Full Stack Developer &amp; Systems Architect
                </div>
              </div>

              {history.map((item, idx) => (
                <div key={idx} className="space-y-1 pt-1 border-t border-[#29352e]/50">
                  <div className="text-[#a0ada5] flex items-center gap-2">
                    <span className="text-[#a3e635] font-bold">$</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}
            </div>

            {/* Interactive Input Bar */}
            <div className="px-3.5 py-2.5 bg-[#111715] border-t border-[#29352e] flex items-center gap-2">
              <span className="text-[#a3e635] text-xs font-mono font-bold">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'neofetch', 'benchmarks', or 'skills'..."
                className="w-full bg-transparent border-none outline-none text-[#f0f5f1] placeholder-[#69776e] text-xs font-['JetBrains_Mono']"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="px-2.5 py-1 text-[10px] bg-[#29352e] hover:bg-[#a3e635] hover:text-[#0b0f0e] text-[#a0ada5] font-mono transition-colors cursor-pointer"
              >
                RUN
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
