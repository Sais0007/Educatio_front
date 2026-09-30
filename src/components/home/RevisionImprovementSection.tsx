import React from 'react';

export const RevisionImprovementSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Mistake Flagged in Mock',
      desc: 'Q.14 in JEE Advanced Simulation dropped 4 marks. Telemetry tags the step failure.',
      icon: 'highlight_off',
      badgeColor: 'text-error',
    },
    {
      num: '02',
      title: 'Concept Identified',
      desc: 'System maps error to King’s Property symmetry transformation in Definite Integrals.',
      icon: 'psychology',
      badgeColor: 'text-secondary',
    },
    {
      num: '03',
      title: 'Revise Exact Derivation',
      desc: 'Direct link to Prof. Arvind’s Lecture 14 note on integral variable substitutions.',
      icon: 'school',
      badgeColor: 'text-primary',
    },
    {
      num: '04',
      title: 'Practice Parallel Stems',
      desc: 'Three new problem stems generated in your private derivation workspace.',
      icon: 'tune',
      badgeColor: 'text-tertiary',
    },
    {
      num: '05',
      title: 'Spaced Recall & Mastery',
      desc: 'Automatic re-attempt prompted on Day 3, 7, and 21 via the SM-2 algorithm.',
      icon: 'verified',
      badgeColor: 'text-academic-mastered',
    },
  ];

  return (
    <section id="revision-section" className="w-full bg-surface-container-low py-20 px-4 sm:px-6 lg:px-12 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-[11px] font-bold text-academic-mastered uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-academic-mastered">repeat</span>
            Closing the Academic Loop
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal leading-tight">
            From Identified Error to Permanent Benchmark Mastery
          </h2>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed font-sans">
            Every competitive examination candidate makes mistakes. What separates top ranks is the systematic protocol for turning those mistakes into permanent conceptual immunity.
          </p>
        </div>

        {/* 5-Step Visual Loop Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((st, i) => (
            <div
              key={st.num}
              className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col justify-between group hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold text-outline">STEP {st.num}</span>
                  <span className={`material-symbols-outlined text-[20px] ${st.badgeColor}`}>
                    {st.icon}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-on-surface mb-2 font-sans">
                  {st.title}
                </h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {st.desc}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-outline-variant/20 text-[10px] text-outline font-mono">
                {i < steps.length - 1 ? 'Continuous Transition \u2192' : 'Marks Recovered'}
              </div>
            </div>
          ))}
        </div>

        {/* Revision Capabilities Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mistake Notebook */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">history_edu</span>
            </div>
            <h4 className="text-sm font-bold text-on-surface">The Mistake Notebook</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Never re-write questions manually. Every flawed attempt is automatically filed with your original calculation transcript and faculty proof.
            </p>
            <div className="text-[11px] text-primary font-semibold pt-1">
              Categorized by Error Archetype &rarr;
            </div>
          </div>

          {/* Card 2: Flashcards & Formula Decks */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">style</span>
            </div>
            <h4 className="text-sm font-bold text-on-surface">Spaced Formula Decks</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Curated flashcards for essential mathematical identities, coordination isomerism rules, and physical constants with SM-2 recall intervals.
            </p>
            <div className="text-[11px] text-secondary font-semibold pt-1">
              Active Recall Protocol &rarr;
            </div>
          </div>

          {/* Card 3: Personal Study Notebook */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-academic-mastered">
              <span className="material-symbols-outlined text-[22px]">edit_note</span>
            </div>
            <h4 className="text-sm font-bold text-on-surface">Personal Study Notebook</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Annotate video lecture timestamps, attach personal derivation observations, and bookmark critical high-yield Olympiad problems.
            </p>
            <div className="text-[11px] text-academic-mastered font-semibold pt-1">
              Synchronized Across Devices &rarr;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
