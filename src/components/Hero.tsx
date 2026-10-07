import React, { useState, useEffect, useRef } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface HeroProps {
  onDiscussProject: () => void;
  onExploreWork: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ onDiscussProject, onExploreWork }) => {
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
              <p><span className="text-[#a3e635] font-bold">stack:</span> Python 3.12 · Django · DRF · React 19 · PostgreSQL</p>
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
            <p className="text-[#a0ada5]">Production esports tournament platform with real-time match engine and bKash payout verification.</p>
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
            <p className="pl-3">&quot;availability&quot;: &quot;IMMEDIATE_FOR_Q4_CONTRACTS&quot;,</p>
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
    handleCommand(cmd);
  };

  return (
    <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#29352e] bg-[#0b0f0e]">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag / Kicker */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#111715] border border-[#29352e] text-xs font-['JetBrains_Mono'] text-[#a0ada5]">
              <span className="text-[#a3e635]">&lt;</span>
              <span className="tracking-wider">FULL STACK DEVELOPER / FREELANCE</span>
              <span className="text-[#a3e635]">&gt;</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#f0f5f1] leading-[1.1]">
              Crafting{' '}
              <span className="text-[#a3e635] block sm:inline">
                complete digital products
              </span>{' '}
              from UI to database.
            </h1>

            {/* Lead Paragraph */}
            <p className="font-['JetBrains_Mono'] text-sm sm:text-base text-[#a0ada5] leading-relaxed max-w-2xl">
              I&apos;m Shopon, a full stack developer crafting high-performance user interfaces and resilient backend
              architectures with Python, Django, DRF, React, and Flet.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onDiscussProject}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-xs sm:text-sm font-bold tracking-wider transition-colors duration-150 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.18)]"
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

            {/* Availability Kicker */}
            <div className="flex items-center gap-2 pt-2 text-xs font-['JetBrains_Mono'] text-[#a0ada5]">
              <span className="w-2 h-2 bg-[#a3e635] shadow-[0_0_8px_#a3e635]"></span>
              <span>Open to freelance projects &amp; contract roles</span>
            </div>
          </div>

          {/* Right Column: Hero Terminal Console */}
          <div className="lg:col-span-5">
            <div className="border border-[#29352e] bg-[#171e1b] shadow-2xl relative">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#111715] border-b border-[#29352e] select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#fb7185]/80 border border-[#fb7185]"></div>
                  <div className="w-2.5 h-2.5 bg-[#fbbf24]/80 border border-[#fbbf24]"></div>
                  <div className="w-2.5 h-2.5 bg-[#4ade80]/80 border border-[#4ade80]"></div>
                  <span className="ml-2 text-xs font-['JetBrains_Mono'] text-[#a0ada5] flex items-center gap-1.5">
                    <span className="text-[#69776e]">#</span> shopon@fullstack:~
                  </span>
                </div>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#69776e] px-1.5 py-0.5 bg-[#0b0f0e] border border-[#29352e]">
                  bash
                </div>
              </div>

              {/* Terminal Body */}
              <div
                ref={terminalBodyRef}
                className="p-4 sm:p-5 font-['JetBrains_Mono'] text-xs sm:text-[13px] leading-relaxed max-h-[380px] overflow-y-auto space-y-3.5"
              >
                
                {/* Default Static Shell Transcript */}
                <div>
                  <div className="text-[#a0ada5] flex items-center gap-2">
                    <span className="text-[#a3e635] font-bold">$</span>
                    <span>whoami</span>
                  </div>
                  <div className="text-[#f0f5f1] font-semibold pl-4 pt-0.5">
                    {DEVELOPER_INFO.name}
                  </div>
                </div>

                <div>
                  <div className="text-[#a0ada5] flex items-center gap-2">
                    <span className="text-[#a3e635] font-bold">$</span>
                    <span>role</span>
                  </div>
                  <div className="text-[#34d399] pl-4 pt-0.5">
                    Full Stack Developer
                  </div>
                </div>

                <div>
                  <div className="text-[#a0ada5] flex items-center gap-2">
                    <span className="text-[#a3e635] font-bold">$</span>
                    <span>frontend</span>
                  </div>
                  <div className="text-[#dee4e0] pl-4 pt-0.5">
                    React.js · Tailwind CSS · Flet · Modern UI
                  </div>
                </div>

                <div>
                  <div className="text-[#a0ada5] flex items-center gap-2">
                    <span className="text-[#a3e635] font-bold">$</span>
                    <span>backend</span>
                  </div>
                  <div className="text-[#dee4e0] pl-4 pt-0.5">
                    Python · Django · Django REST Framework · PostgreSQL
                  </div>
                </div>

                <div>
                  <div className="text-[#a0ada5] flex items-center gap-2">
                    <span className="text-[#a3e635] font-bold">$</span>
                    <span>status</span>
                  </div>
                  <div className="text-[#a3e635] pl-4 pt-0.5 flex items-center gap-2">
                    <span>Available for new projects</span>
                    <span className="inline-block w-2 h-4 bg-[#a3e635] cursor-blink"></span>
                  </div>
                </div>

                {/* Dynamic Terminal Output History */}
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
                  placeholder="type 'help', 'skills', 'benchmarks', or 'status'..."
                  className="w-full bg-transparent border-none outline-none text-[#f0f5f1] placeholder-[#69776e] text-xs font-['JetBrains_Mono']"
                />
                <button
                  onClick={() => handleCommand(inputVal)}
                  className="px-2 py-0.5 text-[10px] bg-[#29352e] hover:bg-[#a3e635] hover:text-[#0b0f0e] text-[#a0ada5] font-mono transition-colors"
                >
                  RUN
                </button>
              </div>

              {/* Suggested Quick Command Chips */}
              <div className="px-3.5 py-1.5 bg-[#0e1412] border-t border-[#29352e] flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[#69776e]">
                <span>TRY:</span>
                <button
                  onClick={() => executeChipCommand('curl /api/status')}
                  className="hover:text-[#a3e635] hover:underline cursor-pointer"
                >
                  [status]
                </button>
                <button
                  onClick={() => executeChipCommand('benchmarks')}
                  className="hover:text-[#a3e635] hover:underline cursor-pointer"
                >
                  [benchmarks]
                </button>
                <button
                  onClick={() => executeChipCommand('skills')}
                  className="hover:text-[#a3e635] hover:underline cursor-pointer"
                >
                  [skills]
                </button>
                <button
                  onClick={() => executeChipCommand('clear')}
                  className="hover:text-[#fb7185] hover:underline cursor-pointer ml-auto"
                >
                  [clear]
                </button>
              </div>

              {/* Terminal Footer Telemetry */}
              <div className="px-3.5 py-2 bg-[#090f0d] border-t border-[#29352e] flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#69776e]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#a3e635]"></span>
                  <span>UTF-8 FULL_STACK</span>
                </div>
                <div>
                  LATENCY: <span className="text-[#a3e635]">{latency}ms</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
