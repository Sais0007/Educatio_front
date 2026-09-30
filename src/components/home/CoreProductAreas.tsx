import React from 'react';

interface CoreProductAreasProps {
  onNavigate: (targetPath: string) => void;
}

export const CoreProductAreas: React.FC<CoreProductAreasProps> = ({ onNavigate }) => {
  return (
    <section id="capabilities-section" className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">
          Architecture of Preparation
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal leading-tight">
          Four Pillars Designed for Calm, Purposeful Mastery
        </h2>
        <p className="text-sm text-on-surface-variant mt-4 leading-relaxed font-sans">
          Most online portals treat preparation as video playlists or question dumps. Aura unifies lectures, deliberate practice, official mock simulations, and open study resources into one seamless cognitive environment.
        </p>
      </div>

      {/* Visually Interesting Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pillar 1: LEARN (Large 7-col Card) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-surface-container-low px-3 py-1 rounded-full border border-primary/20">
                01 / LEARN
              </span>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl text-on-surface mb-3 font-medium">
              First-Principles Lectures &amp; Faculty Masterclasses
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              Unrushed theoretical derivations that establish deep invariant mental models. We replace rote shortcut memorization with clinical academic clarity led by senior IIT and IISc mentors.
            </p>

            {/* Embedded Learning UI Snippet */}
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-5 border border-outline-variant/20 space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">Curriculum Flow: Mechanics &rarr; Electrodynamics</span>
                <span className="text-primary font-mono text-[11px]">180+ Video Lectures</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">play_circle</span>
                    <span className="font-medium text-on-surface">Rotating Reference Frames &amp; Coriolis Invariants</span>
                  </div>
                  <span className="text-[11px] text-outline font-mono">48 mins</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">task</span>
                    <span className="font-medium text-on-surface">DPP 08: Slipping Conditions on Curved Boundaries</span>
                  </div>
                  <span className="text-[11px] text-academic-mastered font-semibold">15 Problems</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-xs text-outline font-medium">Syllabus-synchronized with NCERT &amp; IIT-JEE</span>
            <button
              type="button"
              onClick={() => onNavigate('#courses-section')}
              className="text-xs font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1"
            >
              <span>Explore Courses</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>
        </div>

        {/* Pillar 2: PRACTICE (5-col Card) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-secondary tracking-widest uppercase bg-surface-container-low px-3 py-1 rounded-full border border-secondary/20">
                02 / PRACTICE
              </span>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-[24px]">tune</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl text-on-surface mb-3 font-medium">
              Targeted Derivation Practice Engine
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              12,500+ curated problems graded from foundational L1 to Olympiad L4. Solve step-by-step without timer panic, revealing conceptual hints only when stuck.
            </p>

            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 space-y-2.5 mb-6 text-xs font-mono">
              <div className="text-primary font-bold text-[11px]">// Conceptual Hint Ladder</div>
              <div className="bg-surface-container-lowest p-2 rounded text-on-surface border border-outline-variant/20 text-[11px]">
                Hint 1: Apply torque balance about instantaneous axis of rotation.
              </div>
              <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                <span>PYQs 2014–2025</span>
                <span className="text-secondary font-bold">Hints Revealed: 1 of 3</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-xs text-outline font-medium">No artificial guessing games</span>
            <button
              type="button"
              onClick={() => onNavigate('#practice-section')}
              className="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1"
            >
              <span>Practice Engine</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>
        </div>

        {/* Pillar 3: TEST (5-col Card) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-tertiary tracking-widest uppercase bg-surface-container-low px-3 py-1 rounded-full border border-tertiary/20">
                03 / TEST
              </span>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                <span className="material-symbols-outlined text-[24px]">timer</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl text-on-surface mb-3 font-medium">
              National Proctored CBT Simulation
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              Experience the actual high-stakes exam environment before exam day. Exact NTA &amp; IIT interface constraints, offline backup resilience, and Gaussian cohort ranking.
            </p>

            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                <span>CBT Interface Fidelity</span>
                <span className="text-academic-mastered">100% Calibrated</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-outline">
                <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
                  <span className="font-bold text-primary block">Pacing Telemetry</span>
                  Tracks question dwell time
                </div>
                <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
                  <span className="font-bold text-secondary block">Offline Safe</span>
                  Zero lost submissions
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-xs text-outline font-medium">Full Mocks &amp; Sectionals</span>
            <button
              type="button"
              onClick={() => onNavigate('#mock-test-section')}
              className="text-xs font-semibold text-tertiary hover:underline inline-flex items-center gap-1"
            >
              <span>Test Series</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>
        </div>

        {/* Pillar 4: RESOURCES (7-col Card) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-surface-container-low px-3 py-1 rounded-full border border-primary/20">
                04 / RESOURCES
              </span>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl text-on-surface mb-3 font-medium">
              Open Study Vault: Formula Sheets &amp; Past Papers
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              Academic dignity means foundational knowledge is never gatekept. Over 450 verified formula handbooks, invariant sheets, and authenticated 10-year past examination solutions free to every student.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">description</span>
                <div>
                  <div className="text-xs font-bold text-on-surface">Formula Handbooks</div>
                  <div className="text-[11px] text-outline">Invariant equations &amp; coordinate rules</div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">fact_check</span>
                <div>
                  <div className="text-xs font-bold text-on-surface">10-Year PYQ Proofs</div>
                  <div className="text-[11px] text-outline">Authenticated solutions &amp; mark schemes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-xs text-outline font-medium">450+ High-Yield Documents</span>
            <button
              type="button"
              onClick={() => onNavigate('#resources-section')}
              className="text-xs font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1"
            >
              <span>Access Open Vault</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
