import React, { useState, useEffect, useRef } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface TerminalWorkbenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScoping: () => void;
}

interface TermLine {
  type: 'cmd' | 'output' | 'error' | 'info';
  text: string | React.ReactNode;
}

export const TerminalWorkbenchModal: React.FC<TerminalWorkbenchModalProps> = ({
  isOpen,
  onClose,
  onOpenScoping,
}) => {
  const [history, setHistory] = useState<TermLine[]>([
    {
      type: 'info',
      text: 'SHOPON UNIX ARCHITECT CONSOLE (x86_64-pc-linux-gnu)\nType "help" for available diagnostic and portfolio commands.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTo({
        top: screenRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory: TermLine[] = [...history, { type: 'cmd', text: `$ ${trimmed}` }];

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'exit' || lower === 'quit') {
      onClose();
      return;
    }

    if (lower === 'help') {
      newHistory.push({
        type: 'output',
        text: (
          <div className="space-y-1 text-xs">
            <p className="text-[#a3e635]">Terminal Architect Diagnostic Commands:</p>
            <p><span className="text-[#f0f5f1]">neofetch</span> - System specs and profile summary</p>
            <p><span className="text-[#f0f5f1]">whoami</span> - Identity of the lead engineer</p>
            <p><span className="text-[#f0f5f1]">stack</span> - Inspect full technology matrix</p>
            <p><span className="text-[#f0f5f1]">projects</span> - List flagship deployed applications</p>
            <p><span className="text-[#f0f5f1]">hire</span> - Initialize project proposal protocol</p>
            <p><span className="text-[#f0f5f1]">contact</span> - Direct contact channels and PGP/email</p>
            <p><span className="text-[#f0f5f1]">uptime</span> - Server &amp; availability metrics</p>
            <p><span className="text-[#f0f5f1]">clear</span> - Clear terminal buffer</p>
            <p><span className="text-[#f0f5f1]">exit</span> - Close terminal workbench</p>
          </div>
        ),
      });
    } else if (lower === 'neofetch') {
      newHistory.push({
        type: 'output',
        text: (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs font-mono">
            <div className="sm:col-span-5 text-[#a3e635] leading-tight whitespace-pre select-none font-bold overflow-x-auto">
{`  _____ _                                
 / ____| |                               
| (___ | |__   ___  _ __   ___  _ __     
 \\___ \\| '_ \\ / _ \\| '_ \\ / _ \\| '_ \\    
 ____) | | | | (_) | |_) | (_) | | | |   
|_____/|_| |_|\\___/| .__/ \\___/|_| |_|   
                   | |                   
                   |_|                   `}
            </div>
            <div className="sm:col-span-7 space-y-1 text-[#dee4e0]">
              <p><span className="text-[#a3e635] font-bold">user:</span> shopon@terminal-architect</p>
              <p><span className="text-[#a3e635] font-bold">role:</span> Full Stack Developer &amp; Backend Systems Architect</p>
              <p><span className="text-[#a3e635] font-bold">core_backend:</span> Python 3.12, Django 5.0, DRF, PostgreSQL 16, Redis</p>
              <p><span className="text-[#a3e635] font-bold">core_frontend:</span> React 19, TypeScript, Tailwind CSS, Python Flet</p>
              <p><span className="text-[#a3e635] font-bold">uptime:</span> 99.98% production record</p>
              <p><span className="text-[#a3e635] font-bold">location:</span> Khulna, Bangladesh (Global Remote Available)</p>
            </div>
          </div>
        ),
      });
    } else if (lower === 'whoami') {
      newHistory.push({
        type: 'output',
        text: 'Shopon Hossen — Full Stack Developer & Backend Architect specializing in robust, high-performance systems from UI to database.',
      });
    } else if (lower === 'stack') {
      newHistory.push({
        type: 'output',
        text: 'BACKEND: Python · Django · Django REST Framework · PostgreSQL · Redis · Celery\nFRONTEND: React.js · Tailwind CSS · TypeScript · Python Flet (Cross-platform)',
      });
    } else if (lower === 'projects') {
      newHistory.push({
        type: 'output',
        text: '1. Fire Clash BD (https://fireclashbd.github.io) — Esports Tournament Platform & Landing Ecosystem',
      });
    } else if (lower === 'hire') {
      newHistory.push({
        type: 'info',
        text: 'Launching project briefing protocol modal...',
      });
      setTimeout(() => {
        onClose();
        onOpenScoping();
      }, 400);
    } else if (lower === 'contact') {
      newHistory.push({
        type: 'output',
        text: `Email: ${DEVELOPER_INFO.email}\nGitHub: ${DEVELOPER_INFO.github}\nLinkedIn: ${DEVELOPER_INFO.linkedin}`,
      });
    } else if (lower === 'uptime') {
      newHistory.push({
        type: 'output',
        text: 'SYS_TIME: 2026-10-01 UTC · LOAD AVERAGE: 0.14, 0.08, 0.05 · STATUS: READY_FOR_CONTRACTS',
      });
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not recognized: "${trimmed}". Type "help" for a list of valid commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090f0d]/90 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#171e1b] border border-[#29352e] shadow-2xl my-6 flex flex-col h-[650px] max-h-[85vh]">
        
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#111715] border-b border-[#29352e] select-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#fb7185]/80 border border-[#fb7185]"></div>
            <div className="w-2.5 h-2.5 bg-[#fbbf24]/80 border border-[#fbbf24]"></div>
            <div className="w-2.5 h-2.5 bg-[#4ade80]/80 border border-[#4ade80]"></div>
            <span className="ml-2 font-mono text-xs text-[#a0ada5]">
              shopon@workbench: ~/terminal-architect
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#69776e]">xterm-256color</span>
            <button
              onClick={onClose}
              className="text-xs font-mono text-[#a0ada5] hover:text-[#fb7185] border border-[#29352e] px-1.5 py-0.5 cursor-pointer"
            >
              [X]
            </button>
          </div>
        </div>

        {/* Terminal Screen Output */}
        <div
          ref={screenRef}
          onClick={() => inputRef.current?.focus()}
          className="p-5 font-['JetBrains_Mono'] text-xs flex-1 overflow-y-auto space-y-3 bg-[#0b0f0e] cursor-text"
        >
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'cmd' && (
                <div className="text-[#a3e635] font-semibold">{line.text}</div>
              )}
              {line.type === 'output' && (
                <div className="text-[#dee4e0] pl-2 whitespace-pre-wrap">{line.text}</div>
              )}
              {line.type === 'info' && (
                <div className="text-[#a0ada5] pl-2 border-l-2 border-[#a3e635]/60 whitespace-pre-wrap">
                  {line.text}
                </div>
              )}
              {line.type === 'error' && (
                <div className="text-[#fb7185] pl-2">{line.text}</div>
              )}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#a3e635] font-bold select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-[#f0f5f1] font-mono text-xs"
              autoFocus
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#111715] border-t border-[#29352e] flex items-center justify-between text-[11px] font-mono text-[#69776e]">
          <div>
            TYPE &apos;<span className="text-[#a3e635]">neofetch</span>&apos; OR &apos;<span className="text-[#a3e635]">hire</span>&apos;
          </div>
          <div>
            SHELL: ZSH 5.9 (x86_64)
          </div>
        </div>

      </div>
    </div>
  );
};
