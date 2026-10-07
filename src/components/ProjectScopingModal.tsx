import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface ProjectScopingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectScopingModal: React.FC<ProjectScopingModalProps> = ({ isOpen, onClose }) => {
  const [projectType, setProjectType] = useState<'fullstack' | 'backend' | 'flet' | 'frontend'>('fullstack');
  const [timeline, setTimeline] = useState<'urgent' | 'standard' | 'flexible'>('standard');
  const [clientEmail, setClientEmail] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'PostgreSQL & Database Modeling',
    'REST API & JWT Authentication'
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [dispatchHash, setDispatchHash] = useState('');

  if (!isOpen) return null;

  const featureOptions = [
    'PostgreSQL & Database Modeling',
    'REST API & JWT Authentication',
    'React SPA & Modern Dashboard',
    'Python Flet Desktop / Mobile',
    'Payment Gateway (bKash/Stripe)',
    'Async Task Queues (Celery/Redis)',
    'Query Optimization & Indexing',
    'Automated CI/CD & Deployments',
  ];

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim()) return;

    const hash = '0x' + Math.random().toString(16).substring(2, 10).toUpperCase();
    setDispatchHash(hash);
    setSubmitted(true);
  };

  const copyBrief = () => {
    const text = `PROJECT PROPOSAL PROTOCOL\n` +
      `------------------------\n` +
      `Client: ${clientEmail}\n` +
      `Type: ${projectType.toUpperCase()}\n` +
      `Timeline: ${timeline.toUpperCase()}\n` +
      `Features: ${selectedFeatures.join(', ')}\n` +
      `Description: ${description || 'No custom description'}\n` +
      `Target: ${DEVELOPER_INFO.email}`;
    navigator.clipboard.writeText(text);
    alert('Project specification copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090f0d]/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#171e1b] border border-[#29352e] shadow-2xl my-8">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111715] border-b border-[#29352e]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#a3e635]"></span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#f0f5f1] font-semibold">
              INITIATE PROJECT PROTOCOL // SHOPON
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-[#a0ada5] hover:text-[#fb7185] px-2 py-0.5 border border-[#29352e] hover:border-[#fb7185] cursor-pointer"
          >
            [ESC / CLOSE]
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 font-['JetBrains_Mono'] text-xs">
          {submitted ? (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-[#111715] border border-[#a3e635] text-[#f0f5f1] space-y-2">
                <div className="text-[#a3e635] font-bold text-sm flex items-center gap-2">
                  <span>✓</span>
                  <span>TRANSMISSION CONFIRMED</span>
                </div>
                <p className="text-[#a0ada5]">
                  Your project blueprint has been generated. Shopon will review your requirements and respond within 24 hours.
                </p>
                <div className="pt-2 text-[11px] text-[#69776e]">
                  <span>DISPATCH_HASH: </span>
                  <span className="text-[#34d399]">{dispatchHash}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={copyBrief}
                  className="px-4 py-2 bg-[#a3e635] text-[#0b0f0e] font-bold text-xs hover:bg-white transition-colors cursor-pointer"
                >
                  COPY SPECIFICATION TO CLIPBOARD
                </button>
                <a
                  href={`mailto:${DEVELOPER_INFO.email}?subject=Project Blueprint [${dispatchHash}]&body=Hi Shopon,%0D%0A%0D%0AI submitted this project proposal:%0D%0AType: ${projectType}%0D%0AEmail: ${clientEmail}%0D%0ADescription: ${encodeURIComponent(description)}`}
                  className="px-4 py-2 bg-[#111715] text-[#f0f5f1] border border-[#29352e] hover:border-[#a3e635] transition-colors flex items-center gap-1.5"
                >
                  <span>SEND VIA EMAIL CLIENT</span>
                  <span>↗</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-[#29352e] text-[#a0ada5] hover:text-[#f0f5f1]"
                >
                  DISMISS
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Step 1: Project Type */}
              <div>
                <label className="text-[11px] font-semibold text-[#a3e635] block mb-2 uppercase">
                  1. Project Classification
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'fullstack', label: 'Full-Stack' },
                    { id: 'backend', label: 'Django / DRF' },
                    { id: 'flet', label: 'Python Flet' },
                    { id: 'frontend', label: 'React SPA' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setProjectType(t.id as any)}
                      className={`p-2 border text-center transition-all cursor-pointer ${
                        projectType === t.id
                          ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1] font-bold'
                          : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#424936]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Architecture Features */}
              <div>
                <label className="text-[11px] font-semibold text-[#a3e635] block mb-2 uppercase">
                  2. Select Architectural Deliverables
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {featureOptions.map((feat) => {
                    const active = selectedFeatures.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`p-2 border text-left flex items-center justify-between transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1b2420] border-[#a3e635] text-[#dee4e0]'
                            : 'bg-[#111715] border-[#29352e] text-[#69776e] hover:border-[#424936]'
                        }`}
                      >
                        <span className="truncate">{feat}</span>
                        <span className={`text-[10px] ${active ? 'text-[#a3e635]' : 'text-[#29352e]'}`}>
                          {active ? '[X]' : '[ ]'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Project Notes */}
              <div>
                <label className="text-[11px] font-semibold text-[#a3e635] block mb-1 uppercase">
                  3. Project Scope or Problem Statement
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe target userbase, core features, or technical bottlenecks..."
                  className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] outline-none p-3 text-[#f0f5f1] placeholder-[#69776e] text-xs resize-none"
                />
              </div>

              {/* Step 4: Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-[#a3e635] block mb-1 uppercase">
                    Your Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] outline-none p-2.5 text-[#f0f5f1] placeholder-[#69776e] text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#a3e635] block mb-1 uppercase">
                    Timeline Urgency
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value as any)}
                    className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] outline-none p-2.5 text-[#f0f5f1] text-xs cursor-pointer"
                  >
                    <option value="urgent">Immediate (&lt; 2 Weeks)</option>
                    <option value="standard">Standard (1-2 Months)</option>
                    <option value="flexible">Ongoing Retainer / Flexible</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-bold text-xs transition-colors cursor-pointer shadow-[0_0_12px_rgba(163,230,53,0.2)]"
                >
                  TRANSMIT PROJECT BRIEF ↗
                </button>

                <div className="text-[10px] text-[#69776e]">
                  ENCRYPTED VIA DIRECT PROTOCOL
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
