import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface ProjectDiscoverySurveyProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SurveyState {
  name: string;
  projectType: string;
  designPersonality: string;
  timeline: string;
  additionalDetails: string;
}

const INITIAL_SURVEY_STATE: SurveyState = {
  name: '',
  projectType: '',
  designPersonality: '',
  timeline: '',
  additionalDetails: '',
};

export const ProjectDiscoverySurvey: React.FC<ProjectDiscoverySurveyProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<SurveyState>(INITIAL_SURVEY_STATE);
  const [clipboardCopied, setClipboardCopied] = useState<boolean>(false);
  const [showCopiedToast, setShowCopiedToast] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalSteps = 6;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // Helper updates
  const updateField = <K extends keyof SurveyState>(field: K, value: SurveyState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const jumpToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  // Generate organized project brief text for clipboard & email
  const generateProjectBriefText = () => {
    return `========================================
SHOPON — PROJECT INQUIRY BRIEF
========================================

CLIENT INFORMATION:
------------------
Name: ${formData.name || 'Not provided'}
Inquiry Date: ${new Date().toLocaleDateString()}

PROJECT OVERVIEW:
----------------
Project Type: ${formData.projectType || 'Not specified'}
Aesthetic / Vibe: ${formData.designPersonality || 'I trust your creativity!'}
Target Timeline: ${formData.timeline || 'Flexible'}

ADDITIONAL DETAILS / NOTES:
--------------------------
${formData.additionalDetails.trim() || 'No additional notes provided'}

========================================
Sent via Shopon Hossen Portfolio (shoponhossen.github.io)
Developer: Shopon Hossen <${DEVELOPER_INFO.email}>
========================================`;
  };

  // Final Action: "Let's Make This Happen →"
  const handleFinalSubmit = () => {
    const briefText = generateProjectBriefText();

    // 1. Copy formatted brief to clipboard
    navigator.clipboard.writeText(briefText).catch(() => {});
    setClipboardCopied(true);
    setShowCopiedToast(true);

    setTimeout(() => {
      setShowCopiedToast(false);
    }, 4000);

    // 2. Open Gmail compose window with required parameters
    const encodedSubject = encodeURIComponent(
      `New Project Inquiry — ${formData.projectType || 'Custom Project'} — ${formData.name || 'Client'}`
    );
    const encodedBody = encodeURIComponent('remove me and paste (ctrl+v)\n\n');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${DEVELOPER_INFO.email}&su=${encodedSubject}&body=${encodedBody}`;

    window.open(gmailUrl, '_blank');
  };

  const copyBriefManually = () => {
    const briefText = generateProjectBriefText();
    navigator.clipboard.writeText(briefText).catch(() => {});
    setClipboardCopied(true);
    setShowCopiedToast(true);

    setTimeout(() => {
      setShowCopiedToast(false);
      setClipboardCopied(false);
    }, 4000);
  };

  // Step 2 Project Type Options
  const projectTypes = [
    {
      title: 'Full Stack Web App',
      tag: 'PYTHON + REACT',
      desc: 'Complete end-to-end web system with responsive UI, DRF backend, and PostgreSQL.',
    },
    {
      title: 'Mobile / Desktop App',
      tag: 'PYTHON FLET / FLUTTER',
      desc: 'Native-feel multi-platform applications with rapid Python prototyping.',
    },
    {
      title: 'Backend API & Database',
      tag: 'DJANGO REST FRAMEWORK',
      desc: 'Scalable REST endpoints, JWT authentication, and optimized SQL schemas.',
    },
    {
      title: 'Modern React Frontend',
      tag: 'REACT 19 + TAILWIND',
      desc: 'Fluid, high-performance interfaces, design systems, and animations.',
    },
    {
      title: 'Startup MVP / Prototype',
      tag: 'RAPID TURNAROUND',
      desc: 'Speed-to-market working product ready for real users and payment verification.',
    },
    {
      title: 'Consulting or Other',
      tag: 'CUSTOM SCOPE',
      desc: 'Code review, database optimization, or custom engineering collaboration.',
    },
  ];

  // Step 3 Design Personality Options
  const designOptions = [
    {
      label: 'Minimalist & Editorial',
      desc: 'Clean typography, ample negative space, calm monochrome palette, laser-focused on reading.',
      previewClass: 'border-l-4 border-l-[#a0ada5]',
    },
    {
      label: 'Terminal & Cyberpunk',
      desc: 'Monospaced fonts, phosphor green accents, dark slate theme, technical telemetry (like this site).',
      previewClass: 'border-l-4 border-l-[#a3e635]',
    },
    {
      label: 'Modern High-Conversion SaaS',
      desc: 'Clear value metrics, bold callouts, trust badges, smooth micro-interactions, conversion-ready.',
      previewClass: 'border-l-4 border-l-[#38bdf8]',
    },
    {
      label: 'Bold & Expressive',
      desc: 'Vibrant color blocks, energetic layouts, unconventional grids, distinctive creative character.',
      previewClass: 'border-l-4 border-l-[#fb7185]',
    },
    {
      label: 'Corporate & Enterprise',
      desc: 'Traditional trustworthiness, structured data tables, crisp navigation, compliance-friendly.',
      previewClass: 'border-l-4 border-l-[#60a5fa]',
    },
    {
      label: 'I trust your creativity!',
      desc: 'You select the visual direction that best positions this project for maximum impact.',
      previewClass: 'border-l-4 border-l-[#34d399]',
    },
  ];

  // Step 4 Timeline Options
  const timelineOptions = [
    'As soon as possible',
    'Within 1–2 weeks',
    'Within a month',
    'Just exploring ideas',
    'Flexible',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090f0d]/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#171e1b] border border-[#29352e] shadow-2xl my-6 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#111715] border-b border-[#29352e] select-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#a3e635] shadow-[0_0_8px_#a3e635]"></span>
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#f0f5f1] tracking-wide">
              LET&apos;S TALK // PROJECT SCOPING
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#a0ada5] hidden sm:inline">
              STEP {currentStep} OF {totalSteps}
            </span>
            <button
              onClick={onClose}
              className="text-xs font-mono text-[#a0ada5] hover:text-[#fb7185] px-2 py-0.5 border border-[#29352e] hover:border-[#fb7185] transition-colors cursor-pointer"
            >
              [ESC / CLOSE]
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#111715] border-b border-[#29352e] relative overflow-hidden">
          <div
            className="h-full bg-[#a3e635] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 font-['JetBrains_Mono'] overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Meet the Visitor */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 01 // Identity
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  First things first, what should I call you?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Great engineering partnerships start with a proper introduction:
                </p>
              </div>

              <div className="pt-2">
                <input
                  type="text"
                  autoFocus
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && formData.name.trim()) {
                      handleNext();
                    }
                  }}
                  placeholder="e.g. Alex, Sarah, or Your Company Name"
                  className="w-full bg-[#111715] border-b-2 border-[#29352e] focus:border-[#a3e635] focus:outline-none py-3 px-2 text-sm sm:text-base text-[#f0f5f1] placeholder-[#69776e] transition-colors"
                />
              </div>

              <div className="text-[11px] text-[#69776e] flex items-center gap-2 pt-2">
                <span>Press</span>
                <kbd className="px-2 py-0.5 bg-[#111715] border border-[#29352e] text-[#a0ada5] text-[10px]">
                  ENTER ↵
                </kbd>
                <span>to proceed</span>
              </div>
            </div>
          )}

          {/* STEP 2: Project Classification */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 02 // Project Classification
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  What are we bringing to life today?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Select the category that best matches your immediate need:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {projectTypes.map((pt) => {
                  const isSelected = formData.projectType === pt.title;
                  return (
                    <div
                      key={pt.title}
                      onClick={() => updateField('projectType', pt.title)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                          : 'bg-[#111715] border-[#29352e] hover:border-[#424936]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#f0f5f1]">{pt.title}</span>
                          <span className={`text-xs ${isSelected ? 'text-[#a3e635]' : 'text-[#69776e]'}`}>
                            {isSelected ? '✓' : '○'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#a0ada5] leading-relaxed">{pt.desc}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#29352e]/50 text-[10px] text-[#34d399]">
                        &gt; {pt.tag}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Aesthetic Direction */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 03 // Aesthetic Direction
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  How should your project feel?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Visual tone sets expectations, user trust, and brand presence:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {designOptions.map((item) => {
                  const isSelected = formData.designPersonality === item.label;
                  return (
                    <div
                      key={item.label}
                      onClick={() => updateField('designPersonality', item.label)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        item.previewClass
                      } ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                          : 'bg-[#111715] border-[#29352e] hover:border-[#424936]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-[#f0f5f1]">{item.label}</span>
                        <span className={`text-xs ${isSelected ? 'text-[#a3e635]' : 'text-[#69776e]'}`}>
                          {isSelected ? '✓' : '○'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#a0ada5] leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Timeline */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 04 // Timing &amp; Delivery
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  When would you like to get started?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Let me know your target scheduling to verify availability:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {timelineOptions.map((time) => {
                  const isSelected = formData.timeline === time;
                  return (
                    <button
                      type="button"
                      key={time}
                      onClick={() => updateField('timeline', time)}
                      className={`p-4 border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1] font-bold'
                          : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#424936]'
                      }`}
                    >
                      <span className="text-xs">{time}</span>
                      <span className={`text-xs ${isSelected ? 'text-[#a3e635]' : 'text-[#69776e]'}`}>
                        {isSelected ? '✓' : '○'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Additional Details */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 05 // Context &amp; Details
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Anything else I should know, {formData.name || 'friend'}?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Feel free to share reference links, inspiration, existing code repos, or specific ideas:
                </p>
              </div>

              <div className="pt-2">
                <textarea
                  rows={5}
                  value={formData.additionalDetails}
                  onChange={(e) => updateField('additionalDetails', e.target.value)}
                  placeholder="Tell me anything about your project. Even if it's just a rough concept, I'd love to hear it..."
                  className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] focus:outline-none p-4 text-xs text-[#f0f5f1] placeholder-[#69776e] resize-none leading-relaxed"
                />
              </div>

              <div className="text-[11px] text-[#69776e]">
                Tip: You can also skip this and explain directly in your email!
              </div>
            </div>
          )}

          {/* STEP 6: The Project Brief & Final CTA */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header */}
              <div className="space-y-2 pb-4 border-b border-[#29352e]">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 06 // Ready For Launch
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Look what we&apos;re planning, {formData.name || 'there'}!
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Here is the organized project inquiry we created together. You can click &quot;Edit&quot; on any section to revise before dispatching.
                </p>
              </div>

              {/* Summary Cards Table / Matrix */}
              <div className="space-y-2.5 text-xs font-mono">
                
                {/* 1. Name */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Client / Collaborator</span>
                    <span className="text-[#f0f5f1] font-semibold">{formData.name || 'Anonymous'}</span>
                  </div>
                  <button
                    onClick={() => jumpToStep(1)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 2. Project Type */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Project Type</span>
                    <span className="text-[#f0f5f1] font-semibold">{formData.projectType || 'Not specified'}</span>
                  </div>
                  <button
                    onClick={() => jumpToStep(2)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 3. Design Personality */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Aesthetic / Vibe</span>
                    <span className="text-[#f0f5f1] font-semibold">{formData.designPersonality || 'I trust your creativity!'}</span>
                  </div>
                  <button
                    onClick={() => jumpToStep(3)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 4. Timeline */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Target Timeline</span>
                    <span className="text-[#f0f5f1] font-semibold">{formData.timeline || 'Flexible'}</span>
                  </div>
                  <button
                    onClick={() => jumpToStep(4)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 5. Additional Details */}
                {formData.additionalDetails && (
                  <div className="p-3 bg-[#111715] border border-[#29352e] flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <span className="text-[#69776e] block text-[10px] uppercase">Additional Details</span>
                      <p className="text-[#dee4e0] text-xs pt-1 leading-relaxed whitespace-pre-wrap">
                        {formData.additionalDetails}
                      </p>
                    </div>
                    <button
                      onClick={() => jumpToStep(5)}
                      className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                    >
                      [Edit]
                    </button>
                  </div>
                )}

              </div>

              {/* Toast Notification */}
              {showCopiedToast && (
                <div className="p-3 bg-[#003825] border border-[#34d399] text-[#45dfa4] text-xs font-mono flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">✓</span>
                    <span>Project brief copied to your clipboard! Ready to paste into Gmail.</span>
                  </div>
                  <span className="text-[10px] text-[#68fcbf]">CLIPBOARD_SYNCED</span>
                </div>
              )}

              {/* Final Dispatch Action Box */}
              <div className="p-5 bg-[#111715] border border-[#a3e635] space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#f0f5f1]">
                      Ready to build with Shopon?
                    </h4>
                    <p className="text-xs text-[#a0ada5] leading-relaxed pt-1">
                      Clicking below copies this full project specification to your clipboard and opens Gmail with recipient{' '}
                      <span className="text-[#a3e635] font-semibold">{DEVELOPER_INFO.email}</span>. Simply paste (Ctrl+V) and review before sending!
                    </p>
                  </div>
                  <div className="hidden sm:block text-2xl">🚀</div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleFinalSubmit}
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#a3e635] hover:bg-white text-[#0b0f0e] font-['JetBrains_Mono'] text-xs sm:text-sm font-bold tracking-wider transition-colors duration-150 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.25)]"
                  >
                    <span>Let&apos;s Make This Happen</span>
                    <span className="text-base font-normal">→</span>
                  </button>

                  <button
                    onClick={copyBriefManually}
                    className="px-4 py-3 bg-[#171e1b] hover:bg-[#1b2420] text-[#f0f5f1] border border-[#29352e] hover:border-[#a3e635] text-xs font-mono transition-colors cursor-pointer"
                  >
                    {clipboardCopied ? '✓ Copied Brief' : '📋 Copy Brief Only'}
                  </button>

                  <a
                    href={`mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent(
                      `New Project Inquiry — ${formData.projectType || 'Project'} — ${formData.name || 'Client'}`
                    )}&body=${encodeURIComponent('remove me and paste (ctrl+v)\n\n')}`}
                    className="px-4 py-3 bg-[#171e1b] hover:bg-[#1b2420] text-[#a0ada5] hover:text-[#f0f5f1] border border-[#29352e] text-xs font-mono transition-colors"
                  >
                    Standard Mail App ↗
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Navigation Footer (Steps 1 to 5) */}
        {currentStep < 6 && (
          <div className="px-6 py-4 bg-[#111715] border-t border-[#29352e] flex items-center justify-between select-none">
            {/* Back Button */}
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-[#171e1b] hover:bg-[#1b2420] border border-[#29352e] hover:border-[#a0ada5] text-xs font-mono text-[#a0ada5] hover:text-[#f0f5f1] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>←</span>
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {/* Continue / Next Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 1 && !formData.name.trim()}
                className="px-6 py-2.5 bg-[#a3e635] hover:bg-white disabled:opacity-40 disabled:hover:bg-[#a3e635] text-[#0b0f0e] font-mono text-xs font-bold tracking-wider transition-colors cursor-pointer shadow-[0_0_10px_rgba(163,230,53,0.15)] flex items-center gap-1.5"
              >
                <span>Continue</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
