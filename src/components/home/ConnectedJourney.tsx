import React from 'react';

export const ConnectedJourney: React.FC = () => {
  const steps = [
    {
      num: '01',
      name: 'Learn',
      summary: 'Institute Derivations',
      detail:
        'Master conceptual theorems and physical laws from foundational roots through your Institute syllabus.',
      icon: 'school',
    },
    {
      num: '02',
      name: 'Practice',
      summary: 'Focused Problem Solving',
      detail:
        'Untimed derivations with progressive clues that protect the mental struggle required for memory retention.',
      icon: 'tune',
    },
    {
      num: '03',
      name: 'Test',
      summary: 'Authentic CBT Mocks',
      detail:
        'Faithful replication of official NTA and IIT-JEE computer interfaces with real-time pacing telemetry.',
      icon: 'timer',
    },
    {
      num: '04',
      name: 'Analyse',
      summary: 'Diagnostic Error Autopsy',
      detail:
        'Pinpoint whether dropped marks came from conceptual gaps, algebraic errors, or pacing stall traps.',
      icon: 'insights',
    },
    {
      num: '05',
      name: 'Improve',
      summary: 'Spaced Remediation',
      detail:
        'Flawed steps automatically populate your revision deck for scheduled re-attempts until permanent mastery.',
      icon: 'published_with_changes',
    },
  ];

  return (
    <section id="journey" className="w-full bg-[#F5F8FC] py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
        {/* Section Header with Clear Value Proposition Framing */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#00A8F0] text-xs font-bold uppercase tracking-widest border border-[#BAE6FD] shadow-card">
            <span>The Enrolled Preparation Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#12365A] tracking-tight leading-[1.12] font-bold">
            Learn → Practice → Test → Analyse → Improve
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-sans max-w-2xl mx-auto">
            This continuous preparation loop is what students unlock upon enrolling through their Institute and Branch. Every lecture, practice problem, and mock test operates inside one cohesive learning environment.
          </p>
        </div>

        {/* The Open Connected Progression Architecture */}
        <div className="relative">
          {/* Continuous Primary Blue Beam across desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-1 bg-[#00A8F0] rounded-full z-0 opacity-80" />

          {/* 5 Milestone Progression Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="flex flex-col text-left group"
              >
                {/* Node Anchor on Timeline */}
                <div className="flex items-center justify-between lg:justify-start lg:flex-col lg:items-start gap-4 mb-4">
                  {/* Distinctive Round Milestone Node */}
                  <div className="w-14 h-14 rounded-xl bg-white border-2 border-[#00A8F0] shadow-card group-hover:scale-105 group-hover:bg-[#00A8F0] group-hover:text-white text-[#00A8F0] flex items-center justify-center transition-all duration-200 shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      {step.icon}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold text-[#00A8F0] bg-white px-2.5 py-1 rounded-full border border-[#BAE6FD]">
                    PHASE {step.num}
                  </span>
                </div>

                {/* Milestone Content */}
                <div className="pt-1">
                  <h3 className="font-serif text-2xl lg:text-[26px] font-bold text-[#12365A] group-hover:text-[#00A8F0] transition-colors leading-tight">
                    {step.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#00A8F0] uppercase tracking-wider mt-1 mb-2">
                    {step.summary}
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {/* Micro progression arrow */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-1.5 text-xs text-[#64748B]">
                  <span className="font-medium">
                    {idx === steps.length - 1 ? 'Loops to Phase 01' : `Leads to ${steps[idx + 1].name}`}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0] group-hover:translate-x-1 transition-transform">
                    {idx === steps.length - 1 ? 'restart_alt' : 'east'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closed-Loop Value Proposition Callout */}
        <div className="bg-white rounded-xl p-8 sm:p-10 border border-[#E2E8F0] shadow-card text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5 max-w-2xl">
            <div className="w-14 h-14 rounded-lg bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD] flex items-center justify-center shrink-0 mt-1">
              <span className="material-symbols-outlined text-[30px]">all_inclusive</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Value Proposition for Enrolled Students
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#12365A]">
                A missed question on Sunday becomes your focused practice on Monday.
              </h4>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Once enrolled in your Branch course, the platform automatically tags every missed stem from Sunday mock assessments and schedules targeted derivations into your practice queue—turning every error into measurable score recovery.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full lg:w-auto">
            <div className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#E0F4FD] border border-[#BAE6FD] flex items-center gap-3 text-xs font-semibold text-[#00A8F0]">
              <span className="material-symbols-outlined text-[20px]">sync</span>
              <span>Available to Enrolled Students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectedJourney;
