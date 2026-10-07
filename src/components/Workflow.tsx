import React, { useState, useEffect } from 'react';
import { WORKFLOW_STEPS } from '../data/portfolioData';

export const Workflow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Auto-advance simulation loop across the 4 nodes
  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isSimulating]);

  return (
    <section className="py-16 md:py-24 border-b border-[#29352e] bg-[#0b0f0e] relative overflow-hidden">
      
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-['JetBrains_Mono'] tracking-wider text-[#a0ada5] mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">04</span> / WORKFLOW ----
              <span className="hidden sm:inline-block text-[10px] bg-[#111715] border border-[#29352e] px-1.5 py-0.5 text-[#34d399]">
                UE_BLUEPRINT_EXECUTION_GRAPH
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0f5f1] tracking-tight">
              From requirements to reliable delivery.
            </h2>
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#a0ada5] mt-2 max-w-2xl leading-relaxed">
              A disciplined, step-by-step methodology to keep delivery predictable and zero-surprise.
            </p>
          </div>

          {/* Blueprint Controls / Simulation Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="px-3 py-1.5 bg-[#171e1b] hover:bg-[#1b2420] border border-[#29352e] hover:border-[#a3e635] text-xs font-mono text-[#dee4e0] flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span className={`w-2 h-2 ${isSimulating ? 'bg-[#a3e635] animate-pulse' : 'bg-[#69776e]'}`}></span>
              <span>{isSimulating ? 'PAUSE SIMULATION' : 'RESUME SIMULATION'}</span>
            </button>

            <span className="text-[11px] font-mono text-[#69776e] hidden lg:inline-block">
              ZOOM: 100% · COMPILED ✓
            </span>
          </div>
        </div>

        {/* Blueprint Canvas Container */}
        <div className="border border-[#29352e] bg-[#0d1311] p-4 sm:p-6 lg:p-8 relative">
          
          {/* Top Graph Canvas Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#29352e]/80 text-[11px] font-mono text-[#69776e]">
            <div className="flex items-center gap-2">
              <span className="text-[#a3e635] font-bold">EventGraph</span>
              <span>/</span>
              <span className="text-[#dee4e0]">ExecutionPipeline.uasset</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">STATE: {isSimulating ? 'PROPAGATING SIGNAL' : 'IDLE'}</span>
              <span className="text-[#34d399] font-bold">STEP {activeStepIndex + 1} / 4 ACTIVE</span>
            </div>
          </div>

          {/* 4 Connected Nodes in Blueprint Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            
            {WORKFLOW_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;
              const hasNext = idx < WORKFLOW_STEPS.length - 1;

              return (
                <div key={step.number} className="relative flex flex-col">
                  
                  {/* Node Card */}
                  <div
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setIsSimulating(false);
                    }}
                    className={`bg-[#171e1b] border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full relative z-20 group ${
                      isActive
                        ? 'border-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.18)] scale-[1.01]'
                        : isPast
                        ? 'border-[#424936] hover:border-[#a3e635]/60'
                        : 'border-[#29352e] hover:border-[#424936]'
                    }`}
                  >
                    
                    {/* Unreal Node Header Bar */}
                    <div
                      className={`px-3.5 py-2 border-b flex items-center justify-between select-none ${
                        isActive
                          ? 'bg-[#1b3a20] border-[#a3e635]'
                          : 'bg-[#111715] border-[#29352e]'
                      }`}
                    >
                      {/* Left: Input Execution Pin */}
                      <div className="flex items-center gap-1.5">
                        {idx > 0 ? (
                          <div
                            className={`w-3.5 h-3.5 flex items-center justify-center text-[10px] ${
                              isActive || isPast ? 'text-[#a3e635]' : 'text-[#69776e]'
                            }`}
                            title="Execution Input Pin"
                          >
                            ▶
                          </div>
                        ) : (
                          <div className="w-2 h-2 bg-[#a3e635] shadow-[0_0_6px_#a3e635]" title="Event Entrypoint" />
                        )}
                        <span className="text-[10px] font-mono text-[#a0ada5] uppercase tracking-wider">
                          {idx === 0 ? 'START' : 'EXEC IN'}
                        </span>
                      </div>

                      {/* Right: Output Execution Pin */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#a0ada5] uppercase tracking-wider">
                          {idx === WORKFLOW_STEPS.length - 1 ? 'RETURN' : 'EXEC OUT'}
                        </span>
                        {idx < WORKFLOW_STEPS.length - 1 ? (
                          <div
                            className={`w-3.5 h-3.5 flex items-center justify-center text-[10px] ${
                              isActive || isPast ? 'text-[#a3e635]' : 'text-[#69776e]'
                            }`}
                            title="Execution Output Pin"
                          >
                            ▶
                          </div>
                        ) : (
                          <div className="w-2 h-2 bg-[#34d399]" title="Pipeline Completed" />
                        )}
                      </div>
                    </div>

                    {/* Node Sub-Header: Phase & Step Badge */}
                    <div className="px-4 pt-4 pb-2">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="w-5 h-5 bg-[#a3e635] text-[#0b0f0e] font-bold font-mono text-xs flex items-center justify-center">
                          {step.number}
                        </span>
                        <span className="text-[10px] font-mono text-[#34d399] tracking-wider uppercase font-semibold">
                          {step.phase}
                        </span>
                      </div>

                      {/* Step Title */}
                      <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#f0f5f1] mb-2 group-hover:text-[#a3e635] transition-colors">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="font-['JetBrains_Mono'] text-xs text-[#a0ada5] leading-relaxed mb-4">
                        {step.description}
                      </p>
                    </div>

                    {/* Node Sockets / Parameter Pins */}
                    <div className="px-4 pb-4 pt-2 border-t border-[#29352e]/60 space-y-2 text-[11px] font-mono">
                      
                      {/* Input Param Socket */}
                      <div className="flex items-center gap-2 text-[#69776e]">
                        <span className="text-[#38bdf8] text-xs">○</span>
                        <span className="truncate">input: specs &amp; contracts</span>
                      </div>

                      {/* Output Param Socket (Deliverable) */}
                      <div className="flex items-start gap-2 text-[#dee4e0] bg-[#111715] p-2 border border-[#29352e]">
                        <span className="text-[#a3e635] text-xs mt-0.5">●</span>
                        <div className="truncate">
                          <span className="text-[#69776e] block text-[9px] uppercase">Output Value:</span>
                          <span className="text-[11px] text-[#a3e635] font-semibold">{step.deliverable}</span>
                        </div>
                      </div>

                      {/* Active State Telemetry */}
                      {isActive && (
                        <div className="text-[10px] text-[#a3e635] pt-1 flex items-center justify-between">
                          <span className="animate-pulse">● EXECUTING PIPELINE</span>
                          <span>THREAD #0{idx + 1}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Desktop Connecting Cable (Wire between Card idx and Card idx+1) */}
                  {hasNext && (
                    <div className="hidden lg:block absolute top-[22px] -right-[24px] w-[24px] h-[30px] z-30 pointer-events-none">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 24 30">
                        {/* Static dim background cable */}
                        <path
                          d="M 0 5 L 24 5"
                          fill="none"
                          stroke="#29352e"
                          strokeWidth="2"
                        />
                        {/* Active glowing animated execution line */}
                        <path
                          d="M 0 5 L 24 5"
                          fill="none"
                          stroke={isPast || isActive ? '#a3e635' : '#424936'}
                          strokeWidth="2"
                          className={isPast || isActive ? 'animate-wire-flow' : ''}
                        />
                        {/* Terminal wire connection point dot */}
                        <circle
                          cx="12"
                          cy="5"
                          r="2.5"
                          fill={isPast || isActive ? '#a3e635' : '#29352e'}
                          className={isActive ? 'animate-pulse' : ''}
                        />
                      </svg>
                    </div>
                  )}

                  {/* Mobile Connecting Wire (Vertical arrow down between cards) */}
                  {hasNext && (
                    <div className="lg:hidden flex justify-center py-2 relative z-10">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-0.5 h-6 ${
                            isPast || isActive ? 'bg-[#a3e635]' : 'bg-[#29352e]'
                          }`}
                        />
                        <div
                          className={`text-xs ${
                            isPast || isActive ? 'text-[#a3e635] animate-bounce' : 'text-[#69776e]'
                          }`}
                        >
                          ▼
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* Bottom Blueprint Diagnostic Status */}
          <div className="mt-8 pt-4 border-t border-[#29352e]/80 flex flex-col sm:flex-row items-center justify-end gap-3 text-[11px] font-mono text-[#69776e]">
            <div className="flex items-center gap-4">
              <span>LATENCY: ZERO-OVERHEAD</span>
              <span className="text-[#a3e635]">CLICK ANY NODE TO DIRECTLY EXECUTE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
