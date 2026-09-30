import React from 'react';

export const PerformanceAnalyticsSection: React.FC = () => {
  return (
    <section id="analytics-section" className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-left">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
          Diagnostic Performance Autopsy
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal leading-tight">
          Understand Exactly Why You Lost Marks
        </h2>
        <p className="text-sm text-on-surface-variant mt-3 leading-relaxed font-sans">
          A score alone tells you nothing. Our post-test telemetry isolates whether you dropped marks because of a genuine conceptual gap, a careless minus sign, or a 6-minute time-trap question.
        </p>
      </div>

      {/* Realistic Analytics Dashboard Preview Canvas */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-elevated border border-outline-variant/40 overflow-hidden">
        {/* Dashboard Top Telemetry Bar */}
        <div className="bg-surface-bright px-6 py-4 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-on-surface">
              JEE Advanced Full Syllabus Simulation 04 · Diagnostic Report
            </div>
            <div className="text-[11px] text-outline font-mono">
              Candidate: Rahul Sharma · Attempt Date: 24 August 2026 · Gaussian Calibrated
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-academic-mastered-bg text-academic-mastered font-bold text-xs">
              AIR 142 Mock Equivalent
            </span>
            <span className="px-3 py-1 rounded bg-surface-container text-primary font-bold text-xs font-mono">
              98.6th Percentile
            </span>
          </div>
        </div>

        {/* 4 Score Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20 border-b border-outline-variant/30 bg-surface-container-low/30">
          <div className="p-5 text-left">
            <span className="text-[10px] font-bold uppercase text-outline tracking-wider block">Total Score</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-on-surface">248</span>
              <span className="text-xs text-outline font-mono">/ 360</span>
            </div>
            <span className="text-[11px] text-academic-mastered font-semibold">+18 over baseline</span>
          </div>

          <div className="p-5 text-left">
            <span className="text-[10px] font-bold uppercase text-outline tracking-wider block">Question Accuracy</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-primary">76.4%</span>
            </div>
            <span className="text-[11px] text-outline font-mono">48 Correct · 12 Incorrect · 6 Skipped</span>
          </div>

          <div className="p-5 text-left">
            <span className="text-[10px] font-bold uppercase text-outline tracking-wider block">Average Question Dwell</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-secondary">1m 58s</span>
            </div>
            <span className="text-[11px] text-outline font-mono">Optimal benchmark: 2m 00s</span>
          </div>

          <div className="p-5 text-left">
            <span className="text-[10px] font-bold uppercase text-outline tracking-wider block">Recoverable Lost Marks</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-error">24 Marks</span>
            </div>
            <span className="text-[11px] text-error font-medium">Careless &amp; Time Traps</span>
          </div>
        </div>

        {/* Main Dashboard Visualizations Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Subject Accuracy Breakdown (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Subject Accuracy &amp; Benchmark Comparison
            </div>

            <div className="space-y-4">
              {/* Physics */}
              <div className="p-4 rounded-xl bg-surface-bright border border-outline-variant/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-on-surface">Physics</span>
                  <span className="font-bold text-academic-mastered font-mono">82% Accuracy</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-academic-mastered h-full rounded-full" style={{ width: '82%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-outline font-mono">
                  <span>96 / 120 Marks</span>
                  <span>Strong: Rotational Mechanics (91%)</span>
                </div>
              </div>

              {/* Chemistry */}
              <div className="p-4 rounded-xl bg-surface-bright border border-outline-variant/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-on-surface">Chemistry</span>
                  <span className="font-bold text-secondary font-mono">68% Accuracy</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '68%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-outline font-mono">
                  <span>82 / 120 Marks</span>
                  <span>Moderate: Coordination (75%), Ionic Eq (50%)</span>
                </div>
              </div>

              {/* Mathematics */}
              <div className="p-4 rounded-xl bg-surface-bright border border-outline-variant/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-on-surface">Mathematics (Critical Focus)</span>
                  <span className="font-bold text-error font-mono">54% Accuracy</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: '54%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-error font-mono font-medium">
                  <span>70 / 120 Marks</span>
                  <span>Weak Area: Calculus King&apos;s Rule Invariants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic Autopsy & Mistake Archetypes (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Diagnostic Mistake Archetype Distribution
            </div>

            {/* Error Distribution Breakdown Card */}
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-error mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-on-surface">
                      Careless / Algebraic Slips · 6 Questions (50% of Errors)
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Lost 24 marks simply from negative sign reversals and index arithmetic, not conceptual ignorance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-secondary mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-on-surface">
                      Conceptual Gaps · 4 Questions (33% of Errors)
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Definite Integral King&apos;s Property symmetry was missed in Q.14 and Q.19. Queued for revision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-tertiary mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-on-surface">
                      Pacing Time-Traps · 2 Questions (17% of Errors)
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Spent 6m 45s on a single Conic Section stem that yielded zero marks. Sunk cost trap isolated.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Remediation Prescription */}
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                <span className="text-primary font-bold">Actionable Revision Plan Created:</span>
                <span className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-bold text-[11px]">
                  12 Problems Queued
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
