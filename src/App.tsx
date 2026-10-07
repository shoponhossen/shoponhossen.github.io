/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { About } from './components/About';
import { FeaturedProject } from './components/FeaturedProject';
import { Solutions } from './components/Solutions';
import { Workflow } from './components/Workflow';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDiscoverySurvey } from './components/ProjectDiscoverySurvey';
import { ProjectOverviewModal } from './components/ProjectOverviewModal';
import { TerminalWorkbenchModal } from './components/TerminalWorkbenchModal';

export default function App() {
  const [isScopingOpen, setIsScopingOpen] = useState(false);
  const [isProjectOverviewOpen, setIsProjectOverviewOpen] = useState(false);
  const [isTerminalWorkbenchOpen, setIsTerminalWorkbenchOpen] = useState(false);

  const handleOpenContact = () => {
    setIsScopingOpen(true);
  };

  const handleExploreWork = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-[#dee4e0] font-['JetBrains_Mono'] relative selection:bg-[#a3e635] selection:text-[#0b0f0e]">
      
      {/* Top Engineering Header */}
      <Header
        onOpenContact={handleOpenContact}
        onOpenTerminalModal={() => setIsTerminalWorkbenchOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section with Interactive Terminal */}
        <Hero
          onDiscussProject={handleOpenContact}
          onExploreWork={handleExploreWork}
        />

        {/* Two Pillars of Strength: Frontend & Backend */}
        <Pillars />

        {/* 01 / About Shopon Hossen */}
        <About onGetInTouch={handleOpenContact} />

        {/* 02 / Featured Full Stack Project (Fire Clash BD) */}
        <FeaturedProject
          onOpenProjectModal={() => setIsProjectOverviewOpen(true)}
        />

        {/* 03 / What I Do - Full Stack Solutions Bento Grid */}
        <Solutions
          onSelectSolution={() => {
            // Optional callback when a solution card is clicked
          }}
        />

        {/* 04 / Workflow - From requirements to reliable delivery */}
        <Workflow />

        {/* 05 / Initiate Collaboration / Contact */}
        <ContactSection onOpenProjectModal={handleOpenContact} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Interactive Overlays */}
      <ProjectDiscoverySurvey
        isOpen={isScopingOpen}
        onClose={() => setIsScopingOpen(false)}
      />

      <ProjectOverviewModal
        isOpen={isProjectOverviewOpen}
        onClose={() => setIsProjectOverviewOpen(false)}
      />

      <TerminalWorkbenchModal
        isOpen={isTerminalWorkbenchOpen}
        onClose={() => setIsTerminalWorkbenchOpen(false)}
        onOpenScoping={() => setIsScopingOpen(true)}
      />

    </div>
  );
}
