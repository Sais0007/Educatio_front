import React, { useState } from 'react';

export const PlatformInterfacePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'practice' | 'mock' | 'autopsy'>('practice');
  const [clueRevealed, setClueRevealed] = useState(false);

  return (
    <section id="preview-section" className="w-full bg-surface-container-low py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
            Sanctuary Interface
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
            Technology Designed to Protect Focus
          </h2>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
            No hyperactive animations, no anxiety-driven streaks, no loud leaderboards. Only pure intellectual space designed for sustained scholarly endurance.
          </p>
        </div>

        {/* Tabbed Preview Mockup Window */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-elevated overflow-hidden max-w-5xl mx-auto border border-outline-variant/40">
          {/* Mock Window Top Bar */}
          <div className="bg-surface-bright px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/80" />
              <span className="ml-3 text-[11px] font-mono text-outline">
                workspace.aurasanctuary.app/study
              </span>
            </div>

            {/* Interactive Workspace Tabs */}
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  activeTab === 'video'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Video Lectures
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  activeTab === 'practice'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Practice Workspace
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mock')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  activeTab === 'mock'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Proctored Exam
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('autopsy')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  activeTab === 'autopsy'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Diagnostic Autopsy
              </button>
            </div>
          </div>

          {/* Inside Workspace Content View */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Problem Formulation */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-surface-container text-primary text-[11px] font-semibold">
                    ROTATIONAL DYNAMICS · ADVANCED L3
                  </span>
                  <span className="text-xs font-mono text-outline">Q.ID #8492</span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-on-surface font-medium leading-snug">
                  Instantaneous Center of Rotation (ICR) in Non-Uniform Pure Rolling
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-sans">
                  A rigid circular cylinder of radius $R$ rolls without slipping over a curved concave surface of radius $3R$. Determine the instantaneous angular acceleration about the instantaneous axis when the contact point subtends angle $\theta = \pi/6$ with the vertical.
                </p>

                {/* Derivation Note Box */}
                <div className="p-4 rounded-xl bg-surface-container-low text-on-surface font-mono text-xs leading-relaxed border border-outline-variant/30">
                  <div className="text-primary font-bold mb-1">// Invariant Kinematic Condition</div>
                  <div>v_cm = &omega; &middot; (R_eff) = &omega; &middot; (3R - R) = 2R&omega;</div>
                  <div className="text-outline text-[11px] mt-1">
                    Applying Euler&apos;s equation directly about the instantaneous point of zero velocity...
                  </div>
                </div>

                {clueRevealed && (
                  <div className="p-3.5 rounded-lg bg-surface-container text-xs text-on-surface border border-secondary/30 animate-in fade-in">
                    <span className="font-bold text-secondary">Conceptual Clue 1: </span>
                    Recall that for a particle on the rim, the centripetal acceleration vector points toward the center of curvature of the cycloidal trajectory, not the cylinder geometric center.
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-xs transition-colors"
                  >
                    Submit Derivation Step
                  </button>
                  <button
                    type="button"
                    onClick={() => setClueRevealed(!clueRevealed)}
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-semibold transition-colors"
                  >
                    {clueRevealed ? 'Hide Conceptual Clue' : 'Request Conceptual Clue (1 of 3)'}
                  </button>
                </div>
              </div>

              {/* Right Workspace Peripheral Panel */}
              <div className="lg:col-span-5 bg-surface-container-low p-6 rounded-xl space-y-4 border border-outline-variant/30">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Active Workspace Tools
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    architecture
                  </span>
                </div>

                {/* Vector Schematic Visual */}
                <div className="w-full h-40 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center p-4 text-center border border-outline-variant/20">
                  <svg
                    className="w-20 h-20 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="38" strokeDasharray="3 3" className="stroke-outline-variant" />
                    <circle cx="50" cy="50" r="20" className="stroke-primary" />
                    <line x1="50" y1="50" x2="68" y2="36" className="stroke-secondary" strokeWidth="2" />
                    <circle cx="68" cy="36" r="3" fill="currentColor" className="text-secondary" />
                    <path d="M 50 12 A 38 38 0 0 1 88 50" strokeWidth="2" className="stroke-primary" />
                  </svg>
                  <span className="text-[11px] font-mono text-outline mt-2">
                    Geometric Coordinate Overlay [R, 3R, &theta;]
                  </span>
                </div>

                {/* Spaced Recall Status */}
                <div className="bg-surface-container-lowest p-3.5 rounded-lg flex items-center justify-between border border-outline-variant/20">
                  <div>
                    <div className="text-xs font-semibold text-on-surface">Mistake Notebook Sync</div>
                    <div className="text-[11px] text-outline">Last reviewed 4 days ago</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary text-[11px] font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Dignity Quote */}
        <div className="mt-8 text-center">
          <p className="font-serif text-base sm:text-lg text-tertiary italic max-w-xl mx-auto font-normal">
            &ldquo;Technology that protects focus rather than demanding attention. No distracting badges, no noisy leaderboards.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
