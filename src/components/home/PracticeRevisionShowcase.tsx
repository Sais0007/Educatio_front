import React from 'react';

interface PracticeRevisionShowcaseProps {
  onOpenPractice: () => void;
  onOpenQuestionBank: () => void;
}

export const PracticeRevisionShowcase: React.FC<PracticeRevisionShowcaseProps> = ({
  onOpenPractice,
  onOpenQuestionBank,
}) => {
  return (
    <section id="practice-section" className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-16">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
          Cognitive Retentive Systems
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
          The Practice Workspace &amp; Personal Error Notebook
        </h2>
        <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
          Practicing at random is inefficient. Education Platform categorizes every step of your analytical work, providing untimed step-by-step derivations and routing missed problems into a spaced-repetition retention deck.
        </p>
      </div>

      {/* 2-Column Feature Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Column 1: Derivation Mode & Mistake Notebook */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-xl shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between border border-outline-variant/30 hover:border-primary/30">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-[26px]">history_edu</span>
            </div>
            <h3 className="font-serif text-xl text-on-surface mb-3 font-medium">
              Self-Paced Derivation &amp; Mistake Autopsy
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              Solve problems without the artificial anxiety of a ticking timer when learning. Reveal multi-tier conceptual hints only when genuinely stuck, preserving the intellectual struggle required for deep retention.
            </p>

            <div className="space-y-3 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  check_circle
                </span>
                <span>Automated routing of flawed steps into your Private Mistake Vault</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  check_circle
                </span>
                <span>Categorize error archetypes: Algebraic Slip, Misread Stem, or Conceptual Gap</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  check_circle
                </span>
                <span>Re-attempt missed questions every 3, 7, and 21 days via SM-2 recall</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onOpenPractice}
              className="text-xs font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Practice Workspace Mode</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>
        </div>

        {/* Column 2: Question Repositories */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-xl shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between border border-outline-variant/30 hover:border-primary/30">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-6">
              <span className="material-symbols-outlined text-[26px]">layers</span>
            </div>
            <h3 className="font-serif text-xl text-on-surface mb-3 font-medium">
              Authenticated Question Repositories
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              Access over a decade of meticulously proofread past examination problems accompanied by modern, non-standard solutions that prioritize geometric and thermodynamic symmetry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <div className="text-xs font-semibold text-on-surface">PYQ Archive</div>
                <div className="text-[11px] text-outline mt-0.5">
                  2014–2025 verified stems with step-by-step invariant proofs
                </div>
              </div>
              <div className="p-3.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <div className="text-xs font-semibold text-on-surface">Difficulty Tiers</div>
                <div className="text-[11px] text-outline mt-0.5">
                  Graded smoothly from Level 1 Foundations to Olympiad L4
                </div>
              </div>
              <div className="p-3.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <div className="text-xs font-semibold text-on-surface">Formula Decks</div>
                <div className="text-[11px] text-outline mt-0.5">
                  Spaced repetition cards for essential mathematical identities
                </div>
              </div>
              <div className="p-3.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <div className="text-xs font-semibold text-on-surface">Daily Sprints</div>
                <div className="text-[11px] text-outline mt-0.5">
                  15-minute high-focus sets to sustain cognitive agility
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onOpenQuestionBank}
              className="text-xs font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Practice Question Bank (12,500+ Questions)</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
