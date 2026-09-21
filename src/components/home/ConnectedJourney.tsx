import React from 'react';

export const ConnectedJourney: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'Learn',
      label: 'DISCOVERY',
      icon: 'school',
      description:
        'Unrushed derivations and clinical seminars. Deconstruct complex physical laws and mathematical identities from their conceptual roots without rote shortcuts.',
      actionLabel: 'Video & Lecture Vault',
      targetHref: '#courses-section',
    },
    {
      step: '02',
      title: 'Practise',
      label: 'MASTERY',
      icon: 'tune',
      description:
        '12,500+ curated problems. Unhurried derivation mode, step-by-step invariant validation, immediate multi-tier conceptual hints, and daily sprints.',
      actionLabel: 'Derivation Workspace',
      targetHref: '#practice-section',
    },
    {
      step: '03',
      title: 'Test',
      label: 'CALIBRATION',
      icon: 'timer',
      description:
        'Official CBT-calibrated testing environments replicating national test-day interfaces down to keyboard constraints, shortcuts, and pacing timers.',
      actionLabel: 'Proctored Mock Series',
      targetHref: '#test-series-section',
    },
    {
      step: '04',
      title: 'Analyse',
      label: 'RESOLUTION',
      icon: 'biotech',
      description:
        'Diagnostic error autopsy categorizing exact mistake archetypes: conceptual gaps, algebraic slips, misread stems, or pacing stall traps.',
      actionLabel: 'Diagnostic Telemetry',
      targetHref: '#test-series-section',
    },
    {
      step: '05',
      title: 'Revise',
      label: 'RETENTION',
      icon: 'history_edu',
      description:
        'Flawed steps and missed problems automatically populate your private Mistake Notebook. Scheduled re-attempts powered by SM-2 spaced recall.',
      actionLabel: 'Personal Error Vault',
      targetHref: '#practice-section',
    },
    {
      step: '06',
      title: 'Improve',
      label: 'ELEVATION',
      icon: 'trending_up',
      description:
        'Convert recovered marks into measurable percentile jumps. Track first-attempt accuracy, solution time efficiency, and repeat error elimination.',
      actionLabel: 'Benchmark Analytics',
      targetHref: '#preview-section',
    },
  ];

  return (
    <section id="journey-section" className="w-full bg-surface-container-low py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
              The Systematic Preparation Journey
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
              From First Principles to Examination Precision
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
            A six-stage closed-loop progression designed to eliminate cognitive fatigue and convert theoretical comprehension into calm, reproducible reflex.
          </p>
        </div>

        {/* 6 Progression Cards Grid (2x3 on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.step}
              className="bg-surface-container-lowest p-6 sm:p-7 rounded-xl shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between group border border-outline-variant/30 hover:border-primary/30"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold text-outline tracking-wider">
                    {stage.step} / {stage.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200">
                    <span className="material-symbols-outlined text-[20px]">{stage.icon}</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg text-on-surface mb-2.5 font-medium">
                  {stage.title}: {stage.label === 'DISCOVERY' ? 'First-Principles Learning' : stage.label === 'MASTERY' ? 'Deliberate Practice' : stage.label === 'CALIBRATION' ? 'Proctored Testing' : stage.label === 'RESOLUTION' ? 'Error Autopsy' : stage.label === 'RETENTION' ? 'Mistake Notebook' : 'Percentile Recovery'}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {stage.description}
                </p>
              </div>
              <a
                href={stage.targetHref}
                className="pt-5 mt-5 border-t border-outline-variant/20 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-container transition-colors"
              >
                <span>{stage.actionLabel}</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  east
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
