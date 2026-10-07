import React, { useState } from 'react';
import { FEATURED_PROJECT } from '../data/portfolioData';
import appLobbyScreenshot from '../assets/images/fireclashbd/01_tournament_lobby.png';
import appWalletScreenshot from '../assets/images/fireclashbd/02_in_app_wallet.png';
import appMatchScreenshot from '../assets/images/fireclashbd/03_custom_room.png';
import fireClashMockup from '../assets/images/fireclashbd/04_web_apk_gateway.png';

interface ProjectOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectOverviewModal: React.FC<ProjectOverviewModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'app_screens' | 'overview' | 'database' | 'payment_flow'>('app_screens');
  const [selectedAppScreen, setSelectedAppScreen] = useState<number>(0);

  if (!isOpen) return null;

  const appScreens = [
    {
      title: 'Tournament Match Lobby',
      tag: '01_LOBBY',
      image: appLobbyScreenshot,
      desc: 'Browse entry fees in BDT, live prize pools, squad slots, and instant one-click registration.',
      businessNote: 'Handles hundreds of burst registrations within 60s when new tournament rooms open.',
    },
    {
      title: 'In-App Wallet & Cashout',
      tag: '02_FINTECH',
      image: appWalletScreenshot,
      desc: 'Automated bKash & Nagad deposits, winnings balance tracking, and instant cash withdrawals.',
      businessNote: 'The core monetization and payout pipeline generating real revenue.',
    },
    {
      title: 'Custom Match Room & Credentials',
      tag: '03_ROOM_LOCK',
      image: appMatchScreenshot,
      desc: 'Automated reveal of secret Custom Room ID and password for confirmed players before kickoff.',
      businessNote: 'Zero-leak credential delivery ensuring only paying participants access matches.',
    },
    {
      title: 'Web APK Distribution Gateway',
      tag: '04_WEB_PORTAL',
      image: fireClashMockup,
      desc: 'Landing ecosystem hosting patch notes and frictionless direct Android APK distribution.',
      businessNote: 'Bypasses app store distribution friction and cuts acquisition costs.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090f0d]/90 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#171e1b] border border-[#29352e] shadow-2xl my-6">
        
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111715] border-b border-[#29352e]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#f0f5f1] font-semibold">
              STARTUP ARCHITECTURE SPECIFICATION // FIRE CLASH BD
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-[#a0ada5] hover:text-[#fb7185] px-2 py-0.5 border border-[#29352e] hover:border-[#fb7185] cursor-pointer"
          >
            [CLOSE]
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-[#29352e] bg-[#0e1412] px-2 sm:px-4">
          <button
            onClick={() => setActiveTab('app_screens')}
            className={`py-2 px-3 text-xs font-mono cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'app_screens'
                ? 'border-[#a3e635] text-[#a3e635] font-bold'
                : 'border-transparent text-[#69776e] hover:text-[#dee4e0]'
            }`}
          >
            [01] MOBILE APP SCREENS
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-3 text-xs font-mono cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#a3e635] text-[#a3e635] font-bold'
                : 'border-transparent text-[#69776e] hover:text-[#dee4e0]'
            }`}
          >
            [02] STARTUP SPECS
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`py-2 px-3 text-xs font-mono cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'database'
                ? 'border-[#a3e635] text-[#a3e635] font-bold'
                : 'border-transparent text-[#69776e] hover:text-[#dee4e0]'
            }`}
          >
            [03] DATABASE SCHEMA
          </button>
          <button
            onClick={() => setActiveTab('payment_flow')}
            className={`py-2 px-3 text-xs font-mono cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'payment_flow'
                ? 'border-[#a3e635] text-[#a3e635] font-bold'
                : 'border-transparent text-[#69776e] hover:text-[#dee4e0]'
            }`}
          >
            [04] PAYMENT RECONCILER
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 font-['JetBrains_Mono'] text-xs text-[#dee4e0] max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: Mobile App Screens (The Core Product) */}
          {activeTab === 'app_screens' && (
            <div className="space-y-6">
              
              {/* Startup Context Banner */}
              <div className="p-3.5 bg-[#111715] border border-[#29352e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[#a3e635] font-bold">CORE PRODUCT:</span>{' '}
                  <span>The Android APK is the primary engine where money is made.</span>
                </div>
                <span className="text-[#34d399] text-[10px] bg-[#171e1b] px-2 py-0.5 border border-[#29352e]">
                  ACTIVE CASHFLOW
                </span>
              </div>

              {/* Screens Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Active Screen Viewport */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-[260px] bg-black border-2 border-[#29352e] rounded-2xl p-2 shadow-xl">
                    <div className="aspect-[9/16] rounded-xl overflow-hidden border border-[#29352e] bg-[#090f0d]">
                      <img
                        src={appScreens[selectedAppScreen].image}
                        alt={appScreens[selectedAppScreen].title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                {/* Screen Selector & Notes */}
                <div className="md:col-span-7 space-y-3">
                  <div className="text-[11px] text-[#69776e] uppercase">
                    Select screen to inspect:
                  </div>

                  {appScreens.map((screen, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedAppScreen(idx)}
                      className={`p-3 border transition-colors cursor-pointer ${
                        selectedAppScreen === idx
                          ? 'bg-[#1b2420] border-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.1)]'
                          : 'bg-[#111715] border-[#29352e] hover:border-[#69776e]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#f0f5f1]">{screen.title}</span>
                        <span className="text-[10px] text-[#a3e635]">{screen.tag}</span>
                      </div>
                      <p className="text-[11px] text-[#a0ada5] leading-relaxed">
                        {screen.desc}
                      </p>
                      <div className="mt-1.5 pt-1.5 border-t border-[#29352e]/50 text-[10px] text-[#34d399]">
                        &gt; {screen.businessNote}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Startup Specs & Metrics */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-['Space_Grotesk'] text-xl font-bold text-[#f0f5f1] mb-2">
                  Esports Tournament Engine &amp; Web APK Distribution
                </h4>
                <p className="text-[#a0ada5] leading-relaxed text-xs">
                  Fire Clash BD was engineered as a profitable, high-concurrency esports tournament platform. Gamers register
                  teams across Bangladesh, deposit entry fees via bKash/Nagad, and receive instant prize pool payouts upon match completion.
                  The platform uses atomic database row locking to guarantee zero overbooking during high-traffic registration rushes.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FEATURED_PROJECT.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 bg-[#111715] border border-[#29352e]">
                    <div className="text-[10px] text-[#69776e] uppercase">{m.label}</div>
                    <div className="text-lg font-bold text-[#a3e635]">{m.value}</div>
                    <div className="text-[10px] text-[#a0ada5]">{m.desc}</div>
                  </div>
                ))}
              </div>

              {/* Architectural Highlights */}
              <div className="p-4 bg-[#111715] border border-[#29352e] space-y-2">
                <div className="text-[#a3e635] font-semibold text-xs border-b border-[#29352e] pb-1.5">
                  KEY ARCHITECTURAL DECISIONS
                </div>
                <ul className="space-y-2 text-[#a0ada5] text-xs">
                  {FEATURED_PROJECT.architectureHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#34d399] font-bold">✔</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Database Schema */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#111715] border border-[#29352e] text-[#a0ada5]">
                <p className="text-[#a3e635] font-semibold mb-1">RELATIONAL ENTITY RELATIONSHIP (ERD)</p>
                <p className="text-[11px]">
                  Engineered in PostgreSQL with foreign key constraints, composite index cascades, and select_for_update locking.
                </p>
              </div>

              <div className="p-4 bg-[#090f0d] border border-[#29352e] space-y-3 font-mono text-xs">
                <div className="text-[#34d399] font-bold">[TABLE: Tournament]</div>
                <div className="pl-4 text-[#a0ada5] space-y-0.5">
                  <p>id: UUID (PRIMARY KEY)</p>
                  <p>title: VARCHAR(200)</p>
                  <p>prize_pool_bdt: DECIMAL(10,2)</p>
                  <p>max_teams: SMALLINT (default 48)</p>
                  <p>status: ENUM(&apos;REGISTRATION&apos;, &apos;ACTIVE&apos;, &apos;COMPLETED&apos;)</p>
                  <p className="text-[#69776e]">INDEX: idx_tournament_status_created (status, created_at DESC)</p>
                </div>

                <div className="text-[#34d399] font-bold pt-2">[TABLE: Registration]</div>
                <div className="pl-4 text-[#a0ada5] space-y-0.5">
                  <p>id: UUID (PRIMARY KEY)</p>
                  <p>tournament_id: FK -&gt; Tournament.id (ON DELETE CASCADE)</p>
                  <p>captain_id: FK -&gt; auth_user.id</p>
                  <p>team_name: VARCHAR(100)</p>
                  <p>transaction_trxid: VARCHAR(64) UNIQUE</p>
                  <p>is_paid: BOOLEAN (INDEXED)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Payment Coordinator */}
          {activeTab === 'payment_flow' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#111715] border border-[#29352e] text-[#a0ada5]">
                <p className="text-[#a3e635] font-semibold mb-1">bKash &amp; Nagad Merchant Automated Reconciliation</p>
                <p className="text-[11px]">
                  State machine handling mobile financial services (MFS) reconciliation without human intervention.
                </p>
              </div>

              <div className="p-4 bg-[#090f0d] border border-[#29352e] font-mono text-xs space-y-3">
                <div className="flex items-center gap-2 text-[#a3e635]">
                  <span>[01]</span>
                  <span>Player submits bKash TrxID in Mobile App</span>
                </div>
                <div className="flex items-center gap-2 text-[#a0ada5] pl-6">
                  <span>↓</span>
                  <span>Backend queries MFS API endpoint with idempotency key</span>
                </div>
                <div className="flex items-center gap-2 text-[#34d399] pl-6">
                  <span>↓</span>
                  <span>Instant slot confirmation + Room credentials delivered</span>
                </div>
                <div className="flex items-center gap-2 text-[#dee4e0] pl-6">
                  <span>↓</span>
                  <span>Match completed → Automated winner payout credited to wallet</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
