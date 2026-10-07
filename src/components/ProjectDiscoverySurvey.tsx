import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface ProjectDiscoverySurveyProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SurveyState {
  name: string;
  projectType: string;
  purpose: string;
  customPurpose: string;
  audience: string;
  features: string[];
  customFeature: string;
  designPersonality: string;
  frontendTech: string[];
  backendTech: string[];
  databaseTech: string;
  projectSize: string;
  timeline: string;
  budget: string;
  additionalDetails: string;
}

const INITIAL_SURVEY_STATE: SurveyState = {
  name: '',
  projectType: '',
  purpose: '',
  customPurpose: '',
  audience: '',
  features: [],
  customFeature: '',
  designPersonality: '',
  frontendTech: [],
  backendTech: [],
  databaseTech: '',
  projectSize: '',
  timeline: '',
  budget: '',
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

  const totalSteps = 12;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // Helper updates
  const updateField = <K extends keyof SurveyState>(field: K, value: SurveyState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'features' | 'frontendTech' | 'backendTech', item: string) => {
    setFormData((prev) => {
      const currentList = prev[field];
      if (currentList.includes(item)) {
        return { ...prev, [field]: currentList.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...currentList, item] };
      }
    });
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
    const purposeText =
      formData.purpose === 'Something else' && formData.customPurpose.trim()
        ? `Custom: ${formData.customPurpose.trim()}`
        : formData.purpose || 'Not specified';

    const featuresList = [
      ...formData.features,
      ...(formData.customFeature.trim() ? [`Custom: ${formData.customFeature.trim()}`] : []),
    ];

    const techChoices: string[] = [];
    if (formData.frontendTech.length > 0) {
      techChoices.push(`Frontend: ${formData.frontendTech.join(', ')}`);
    }
    if (formData.backendTech.length > 0) {
      techChoices.push(`Backend: ${formData.backendTech.join(', ')}`);
    }
    if (formData.databaseTech) {
      techChoices.push(`Database: ${formData.databaseTech}`);
    }

    return `========================================
SHOPON — PROJECT BLUEPRINT BRIEF
========================================

CLIENT INFORMATION:
------------------
Name: ${formData.name || 'Not provided'}
Inquiry Date: ${new Date().toLocaleDateString()}

THE BIG IDEA:
------------
Project Type: ${formData.projectType || 'Not specified'}
Primary Purpose: ${purposeText}
Target Audience: ${formData.audience || 'Not specified'}

FEATURES & CAPABILITIES:
-----------------------
${featuresList.length > 0 ? featuresList.map((f) => `- ${f}`).join('\n') : '- To be defined during planning'}

DESIGN & PERSONALITY:
--------------------
Aesthetic Direction: ${formData.designPersonality || 'I trust your creativity!'}

TECHNICAL PREFERENCES:
---------------------
${techChoices.length > 0 ? techChoices.join('\n') : 'Let Shopon recommend the best architectural stack'}

PROJECT SCALE & LOGISTICS:
-------------------------
Project Scope / Size: ${formData.projectSize || 'Not specified'}
Target Timeline: ${formData.timeline || 'Flexible'}
Estimated Budget: ${formData.budget || 'To be discussed'}

ADDITIONAL DETAILS / NOTES:
--------------------------
${formData.additionalDetails.trim() || 'No additional notes provided'}

========================================
Sent via Shopon.dev Interactive Project Discovery
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
    navigator.clipboard.writeText(briefText);
    setClipboardCopied(true);
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 3000);
  };

  // Step 2 Project Types
  const projectTypeOptions = [
    {
      id: 'A full-stack website',
      label: 'A full-stack website',
      desc: 'Complete end-to-end web system with custom UI, server logic, and database.',
      icon: '🌐',
    },
    {
      id: 'A full-stack application',
      label: 'A full-stack application',
      desc: 'Complex interactive web app with authentication, state management, and real-time features.',
      icon: '⚡',
    },
    {
      id: 'A React.js website',
      label: 'A React.js website',
      desc: 'Ultra-fast, responsive frontend SPA crafted with modern React and Tailwind CSS.',
      icon: '⚛',
    },
    {
      id: 'A Flet desktop application',
      label: 'A Flet desktop application',
      desc: 'Cross-platform native-feeling desktop software powered by Python and Flutter.',
      icon: '💻',
    },
    {
      id: 'A Django-powered website',
      label: 'A Django-powered website',
      desc: 'Robust, secure server-rendered platform leveraging Django ORM and battery-included security.',
      icon: '🐍',
    },
    {
      id: 'A backend / REST API',
      label: 'A backend / REST API',
      desc: 'High-throughput RESTful API, database architecture, or microservice for existing apps.',
      icon: '⚙',
    },
    {
      id: "I'm not sure yet. Help me figure it out!",
      label: "I'm not sure yet. Help me figure it out!",
      desc: "No worries at all! We'll explore your goals and find the right fit together.",
      icon: '💡',
    },
  ];

  // Step 3 Purpose Options based on Project Type
  const getPurposeOptions = () => {
    const type = formData.projectType.toLowerCase();

    if (type.includes('backend') || type.includes('api')) {
      return [
        'REST API',
        'Authentication System',
        'Database-driven Backend',
        'Third-party API Integration',
        'Existing Application Backend',
        'Custom Backend',
        'Something else',
      ];
    }

    if (type.includes('application') || type.includes('flet')) {
      return [
        'Management System',
        'Booking / Reservation System',
        'Dashboard',
        'Productivity Tool',
        'E-commerce Application',
        'Custom Application',
        'Something else',
      ];
    }

    if (type.includes('not sure')) {
      return [
        'Validating a startup idea',
        'Automating an internal workflow',
        'Selling products or services online',
        'Community or content hub',
        'Solving a specific operational problem',
        'Something else',
      ];
    }

    // Default: Websites
    return [
      'Business / Company Website',
      'Portfolio',
      'E-commerce',
      'Blog / Content Platform',
      'SaaS Platform',
      'Educational Platform',
      'Custom Idea',
      'Something else',
    ];
  };

  // Step 4 Audience Options
  const audienceOptions = [
    { label: 'Just me', desc: 'Personal tool or internal automation' },
    { label: 'My business or team', desc: 'Staff, operational members, and collaborators' },
    { label: 'My customers', desc: 'Direct paying users, clients, or subscribers' },
    { label: 'The general public', desc: 'Open web visitors across the internet' },
    { label: 'A specific community', desc: 'Niche groups, club members, gamers, or students' },
    { label: 'Not decided yet', desc: 'Still evaluating use cases and reach' },
  ];

  // Step 5 Features
  const featureList = [
    { label: 'User Registration / Login', icon: '👤' },
    { label: 'Admin Dashboard', icon: '📊' },
    { label: 'User Dashboard', icon: '📋' },
    { label: 'Payment Integration', icon: '💳' },
    { label: 'Search and Filtering', icon: '🔍' },
    { label: 'File Uploads', icon: '📁' },
    { label: 'Notifications', icon: '🔔' },
    { label: 'Real-time Chat', icon: '💬' },
    { label: 'Analytics', icon: '📈' },
    { label: 'Role-based Permissions', icon: '🛡' },
    { label: 'API Integration', icon: '🔌' },
    { label: 'Responsive Design', icon: '📱' },
  ];

  // Step 6 Design Personality
  const designOptions = [
    {
      label: 'Minimal & Clean',
      desc: 'Sharp typography, generous whitespace, focused content hierarchy.',
      previewClass: 'border-l-4 border-l-[#a0ada5]',
    },
    {
      label: 'Modern SaaS',
      desc: 'High-polish surfaces, subtle micro-borders, clean metrics presentation.',
      previewClass: 'border-l-4 border-l-[#38bdf8]',
    },
    {
      label: 'Bold & Creative',
      desc: 'High-contrast vibrant accents, expressive layout, and memorable branding.',
      previewClass: 'border-l-4 border-l-[#fbbf24]',
    },
    {
      label: 'Corporate & Professional',
      desc: 'Structured matrices, disciplined enterprise styling, trust-building clarity.',
      previewClass: 'border-l-4 border-l-[#34d399]',
    },
    {
      label: 'Dark & Developer-focused',
      desc: 'Terminal dark mode, monospace accents, phosphor green/cyan glow.',
      previewClass: 'border-l-4 border-l-[#a3e635]',
    },
    {
      label: 'I trust your creativity!',
      desc: 'Let Shopon design a tailored aesthetic that fits the product domain.',
      previewClass: 'border-l-4 border-l-[#ccff80]',
    },
  ];

  // Step 8 Project Size
  const sizeOptions = [
    {
      label: 'Small',
      desc: 'A focused website or simple tool with a specific primary purpose.',
    },
    {
      label: 'Medium',
      desc: 'Several pages, multiple features, or role-based user experiences.',
    },
    {
      label: 'Large',
      desc: 'A complete application with multiple interconnected systems.',
    },
    {
      label: 'Not sure',
      desc: "Let's discuss it together to determine the optimal scope.",
    },
  ];

  // Step 9 Timeline
  const timelineOptions = [
    'As soon as possible',
    'Within 1–2 weeks',
    'Within a month',
    'Just exploring ideas',
    'Flexible',
  ];

  // Step 10 Budget
  const budgetOptions = [
    'Under $50',
    '$50–$150',
    '$150–$300',
    '$300–$500',
    '$500+',
    "Let's discuss it first",
    'Prefer not to say',
  ];

  const isFrontendRelevant =
    !formData.projectType.toLowerCase().includes('backend') &&
    !formData.projectType.toLowerCase().includes('not sure');

  const isBackendRelevant =
    !formData.projectType.toLowerCase().includes('react.js website') &&
    !formData.projectType.toLowerCase().includes('not sure');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090f0d]/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#171e1b] border border-[#29352e] shadow-2xl my-6 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#111715] border-b border-[#29352e] select-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#a3e635] shadow-[0_0_8px_#a3e635]"></span>
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#f0f5f1] tracking-wide">
              PROJECT DISCOVERY WORKBENCH // SHOPON.DEV
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
                  Step 01 // Introduction
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  First things first, what should I call you?
                </h3>
                <p className="text-xs text-[#a0ada5] leading-relaxed">
                  I like to keep things personal and collaborative right from the start.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  autoFocus
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && formData.name.trim()) handleNext();
                  }}
                  placeholder="Your name or nickname..."
                  className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] focus:outline-none p-3.5 text-[#f0f5f1] placeholder-[#69776e] text-sm"
                />

                {formData.name.trim() && (
                  <div className="p-3 bg-[#111715] border border-[#a3e635]/50 text-xs text-[#dee4e0] flex items-center gap-2">
                    <span className="text-[#a3e635]">👋</span>
                    <span>
                      Nice to meet you, <strong className="text-[#a3e635]">{formData.name.trim()}</strong>! Let&apos;s
                      build something interesting.
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: The Big Idea */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 02 // Project Classification
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  What are we bringing to life today?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Pick the archetype that best matches your target deliverable:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {projectTypeOptions.map((item) => {
                  const isSelected = formData.projectType === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => updateField('projectType', item.id)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                          : 'bg-[#111715] border-[#29352e] hover:border-[#424936]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xl">{item.icon}</span>
                        <span
                          className={`text-xs ${
                            isSelected ? 'text-[#a3e635] font-bold' : 'text-[#69776e]'
                          }`}
                        >
                          {isSelected ? '[ SELECTED ]' : '[ ]'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#f0f5f1] mb-1">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-[#a0ada5] leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: The Purpose */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 03 // Primary Purpose
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  What will your project actually do?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Select the primary role this software plays in your workflow:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {getPurposeOptions().map((opt) => {
                  const isSelected = formData.purpose === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => updateField('purpose', opt)}
                      className={`p-3.5 border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1] font-bold'
                          : 'bg-[#111715] border-[#29352e] text-[#dee4e0] hover:border-[#424936]'
                      }`}
                    >
                      <span className="text-xs">{opt}</span>
                      <span className={`text-xs ${isSelected ? 'text-[#a3e635]' : 'text-[#69776e]'}`}>
                        {isSelected ? '✓' : '○'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {formData.purpose === 'Something else' && (
                <div className="pt-2 space-y-1.5">
                  <label className="text-[11px] text-[#a3e635] block uppercase">
                    Tell me your custom concept:
                  </label>
                  <input
                    type="text"
                    value={formData.customPurpose}
                    onChange={(e) => updateField('customPurpose', e.target.value)}
                    placeholder="e.g., An automated tournament bracket generator for college sports..."
                    className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] focus:outline-none p-3 text-xs text-[#f0f5f1]"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 4: The Audience */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 04 // Target Audience
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Who&apos;s going to use this?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Designing for the right user persona shapes user flows and accessibility choices:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {audienceOptions.map((aud) => {
                  const isSelected = formData.audience === aud.label;
                  return (
                    <div
                      key={aud.label}
                      onClick={() => updateField('audience', aud.label)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                          : 'bg-[#111715] border-[#29352e] hover:border-[#424936]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-[#f0f5f1]">{aud.label}</span>
                        <span className={`text-xs ${isSelected ? 'text-[#a3e635]' : 'text-[#69776e]'}`}>
                          {isSelected ? '[✓]' : '[ ]'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#a0ada5]">{aud.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: The Feature Wishlist */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 05 // Capabilities &amp; Features
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Let&apos;s talk features. What should your project be capable of?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Select all that apply (multiple selections welcome):
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {featureList.map((feat) => {
                  const isChecked = formData.features.includes(feat.label);
                  return (
                    <button
                      type="button"
                      key={feat.label}
                      onClick={() => toggleArrayItem('features', feat.label)}
                      className={`p-3 border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1]'
                          : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#424936]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-sm">{feat.icon}</span>
                        <span className="text-xs truncate">{feat.label}</span>
                      </div>
                      <span className={`text-xs ml-1 ${isChecked ? 'text-[#a3e635] font-bold' : 'text-[#69776e]'}`}>
                        {isChecked ? '[X]' : '[ ]'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 space-y-1.5">
                <label className="text-[11px] text-[#a0ada5] block uppercase">
                  Something else? Add custom features:
                </label>
                <input
                  type="text"
                  value={formData.customFeature}
                  onChange={(e) => updateField('customFeature', e.target.value)}
                  placeholder="e.g., PDF report export, webhook triggers, multi-currency support..."
                  className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] focus:outline-none p-3 text-xs text-[#f0f5f1]"
                />
              </div>
            </div>
          )}

          {/* STEP 6: Design Personality */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 06 // Aesthetic Direction
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

          {/* STEP 7: Technology Preferences */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 07 // Technology Stack
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Any technology preferences, or should I handle the technical decisions?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  If you have preferred libraries or team standards, choose them below. Otherwise, Shopon will select the most dependable tools.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {/* Frontend preferences */}
                {isFrontendRelevant && (
                  <div>
                    <label className="text-[11px] text-[#a3e635] block mb-2 uppercase font-semibold">
                      Frontend Frameworks
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['React.js', 'Flet', 'Django Templates', 'No preference'].map((tech) => {
                        const active = formData.frontendTech.includes(tech);
                        return (
                          <button
                            type="button"
                            key={tech}
                            onClick={() => toggleArrayItem('frontendTech', tech)}
                            className={`p-2.5 border text-center text-xs transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1] font-bold'
                                : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#424936]'
                            }`}
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Backend preferences */}
                {isBackendRelevant && (
                  <div>
                    <label className="text-[11px] text-[#a3e635] block mb-2 uppercase font-semibold">
                      Backend Systems
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Django', 'Django REST Framework', 'WebSockets', 'No preference'].map((tech) => {
                        const active = formData.backendTech.includes(tech);
                        return (
                          <button
                            type="button"
                            key={tech}
                            onClick={() => toggleArrayItem('backendTech', tech)}
                            className={`p-2.5 border text-center text-xs transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1] font-bold'
                                : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#424936]'
                            }`}
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Database preferences */}
                <div>
                  <label className="text-[11px] text-[#a3e635] block mb-2 uppercase font-semibold">
                    Database Engine
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['SQLite', 'PostgreSQL', 'MySQL', 'Let Shopon decide'].map((db) => {
                      const active = formData.databaseTech === db;
                      return (
                        <button
                          type="button"
                          key={db}
                          onClick={() => updateField('databaseTech', db)}
                          className={`p-2.5 border text-center text-xs transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1] font-bold'
                              : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#424936]'
                          }`}
                        >
                          {db}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Project Size */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 08 // Project Scope
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  How big is the idea?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Helps determine architecture complexity, milestones, and testing rigor:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {sizeOptions.map((s) => {
                  const isSelected = formData.projectSize === s.label;
                  return (
                    <div
                      key={s.label}
                      onClick={() => updateField('projectSize', s.label)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                          : 'bg-[#111715] border-[#29352e] hover:border-[#424936]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-[#f0f5f1]">{s.label}</span>
                        <span className={`text-xs ${isSelected ? 'text-[#a3e635]' : 'text-[#69776e]'}`}>
                          {isSelected ? '✓' : '○'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#a0ada5] leading-relaxed">{s.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-[#69776e] bg-[#111715] p-3 border border-[#29352e]">
                💡 Note: No fixed pricing is assigned based on this answer. It simply helps calibrate the technical architecture.
              </div>
            </div>
          )}

          {/* STEP 9: Timeline */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 09 // Timing &amp; Delivery
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

          {/* STEP 10: Budget */}
          {currentStep === 10 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold flex items-center justify-between">
                  <span>Step 10 // Budget (Optional)</span>
                  <span className="text-[#69776e]">[OPTIONAL QUESTION]</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Do you have a budget in mind?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Totally optional! If you&apos;re not sure or prefer to discuss it first, choose &quot;Let&apos;s discuss it first&quot;.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {budgetOptions.map((b) => {
                  const isSelected = formData.budget === b;
                  return (
                    <button
                      type="button"
                      key={b}
                      onClick={() => updateField('budget', b)}
                      className={`p-3.5 border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1b2420] border-[#a3e635] text-[#f0f5f1] font-bold'
                          : 'bg-[#111715] border-[#29352e] text-[#a0ada5] hover:border-[#424936]'
                      }`}
                    >
                      <div className="text-xs">{b}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 11: The Final Details */}
          {currentStep === 11 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 11 // Context &amp; Details
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Anything else I should know, {formData.name || 'friend'}?
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Feel free to share reference links, inspiration, existing code repos, or specific challenges:
                </p>
              </div>

              <div className="pt-2">
                <textarea
                  rows={5}
                  value={formData.additionalDetails}
                  onChange={(e) => updateField('additionalDetails', e.target.value)}
                  placeholder="Tell me everything. Even if it's just a rough idea, I'd love to hear it..."
                  className="w-full bg-[#111715] border border-[#29352e] focus:border-[#a3e635] focus:outline-none p-4 text-xs text-[#f0f5f1] placeholder-[#69776e] resize-none leading-relaxed"
                />
              </div>

              <div className="text-[11px] text-[#69776e]">
                Tip: Even 1 or 2 bullet points about who your ideal user is helps immensely during initial architecture scoping.
              </div>
            </div>
          )}

          {/* STEP 12: The Project Brief & Final CTA */}
          {currentStep === 12 && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="space-y-2 pb-4 border-b border-[#29352e]">
                <div className="text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  Step 12 // Ready For Launch
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f0f5f1]">
                  Look what we&apos;re planning, {formData.name || 'there'}!
                </h3>
                <p className="text-xs text-[#a0ada5]">
                  Here is the organized project blueprint we created together. You can click &quot;Edit&quot; on any section to revise before dispatching.
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

                {/* 3. Purpose */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Primary Purpose</span>
                    <span className="text-[#f0f5f1]">
                      {formData.purpose === 'Something else' && formData.customPurpose
                        ? formData.customPurpose
                        : formData.purpose || 'Not specified'}
                    </span>
                  </div>
                  <button
                    onClick={() => jumpToStep(3)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 4. Audience */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Target Audience</span>
                    <span className="text-[#f0f5f1]">{formData.audience || 'Not decided'}</span>
                  </div>
                  <button
                    onClick={() => jumpToStep(4)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 5. Features */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <span className="text-[#69776e] block text-[10px] uppercase">Selected Features</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {formData.features.length > 0 ? (
                        formData.features.map((f, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[#0b0f0e] border border-[#29352e] text-[#a3e635] text-[11px]">
                            {f}
                          </span>
                        ))
                      ) : (
                        <span className="text-[#69776e]">To be defined during planning</span>
                      )}
                      {formData.customFeature && (
                        <span className="px-2 py-0.5 bg-[#0b0f0e] border border-[#29352e] text-[#34d399] text-[11px]">
                          + {formData.customFeature}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => jumpToStep(5)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 6. Design Preference */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Design Personality</span>
                    <span className="text-[#f0f5f1]">{formData.designPersonality || 'I trust your creativity!'}</span>
                  </div>
                  <button
                    onClick={() => jumpToStep(6)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 7. Technology */}
                <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                  <div>
                    <span className="text-[#69776e] block text-[10px] uppercase">Technology Stack Preferences</span>
                    <span className="text-[#f0f5f1]">
                      {[
                        ...formData.frontendTech,
                        ...formData.backendTech,
                        formData.databaseTech,
                      ].filter(Boolean).join(' · ') || 'Let Shopon decide'}
                    </span>
                  </div>
                  <button
                    onClick={() => jumpToStep(7)}
                    className="text-[#a3e635] hover:underline text-[11px] cursor-pointer"
                  >
                    [Edit]
                  </button>
                </div>

                {/* 8, 9, 10: Size, Timeline & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                    <div>
                      <span className="text-[#69776e] block text-[10px] uppercase">Scope Size</span>
                      <span className="text-[#f0f5f1]">{formData.projectSize || 'Not sure'}</span>
                    </div>
                    <button onClick={() => jumpToStep(8)} className="text-[#a3e635] text-[11px]">
                      [Edit]
                    </button>
                  </div>

                  <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                    <div>
                      <span className="text-[#69776e] block text-[10px] uppercase">Timeline</span>
                      <span className="text-[#f0f5f1]">{formData.timeline || 'Flexible'}</span>
                    </div>
                    <button onClick={() => jumpToStep(9)} className="text-[#a3e635] text-[11px]">
                      [Edit]
                    </button>
                  </div>

                  <div className="p-3 bg-[#111715] border border-[#29352e] flex items-center justify-between">
                    <div>
                      <span className="text-[#69776e] block text-[10px] uppercase">Budget</span>
                      <span className="text-[#a3e635]">{formData.budget || 'To discuss'}</span>
                    </div>
                    <button onClick={() => jumpToStep(10)} className="text-[#a3e635] text-[11px]">
                      [Edit]
                    </button>
                  </div>
                </div>

                {/* 11. Additional Details */}
                {formData.additionalDetails && (
                  <div className="p-3 bg-[#111715] border border-[#29352e] flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <span className="text-[#69776e] block text-[10px] uppercase">Additional Details</span>
                      <p className="text-[#dee4e0] text-xs pt-1 leading-relaxed whitespace-pre-wrap">
                        {formData.additionalDetails}
                      </p>
                    </div>
                    <button
                      onClick={() => jumpToStep(11)}
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

        {/* Modal Navigation Footer (Steps 1 to 11) */}
        {currentStep < 12 && (
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

            {/* Step Counter or Skip if optional */}
            <div className="flex items-center gap-3">
              {currentStep === 10 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-xs font-mono text-[#69776e] hover:text-[#dee4e0] cursor-pointer"
                >
                  Skip this step →
                </button>
              )}

              {/* Continue / Next Button */}
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
