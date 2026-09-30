import React, { useState } from 'react';

export const PracticeExperiencePreview: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>('B');
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(true);
  const [hintTier, setHintTier] = useState<number>(1);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const options = [
    { id: 'A', text: '\\omega = \\sqrt{\\frac{2g(1 - \\cos\\theta)}{3R}}' },
    { id: 'B', text: '\\omega = \\sqrt{\\frac{4g(1 - \\cos\\theta)}{3R}}', isCorrect: true },
    { id: 'C', text: '\\omega = \\sqrt{\\frac{g(1 - \\cos\\theta)}{2R}}' },
    { id: 'D', text: '\\omega = \\sqrt{\\frac{3g(1 - \\cos\\theta)}{4R}}' },
  ];

  return (
    <section id="practice-section" className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">
            Targeted Problem Solving
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
            The Practice Engine · Untimed Step Derivation
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-lg leading-relaxed">
            Eliminate timer panic while mastering new concepts. Progressive hint ladders preserve cognitive struggle before revealing rigorous invariant proofs.
          </p>
        </div>

        {/* Taxonomy Pathway Display */}
        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-container-low rounded-xl border border-outline-variant/30 text-[11px] font-semibold text-on-surface-variant">
          <span className="px-2 py-0.5 rounded bg-surface-container text-primary">JEE Adv</span>
          <span>&rsaquo;</span>
          <span>Physics</span>
          <span>&rsaquo;</span>
          <span>Rotational Motion</span>
          <span>&rsaquo;</span>
          <span className="text-secondary font-bold">L3 Advanced</span>
        </div>
      </div>

      {/* Realistic Question Workspace UI Mockup */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-elevated border border-outline-variant/40 overflow-hidden">
        {/* Workspace Sub-header */}
        <div className="bg-surface-bright px-6 py-3.5 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-surface-container text-primary font-mono font-bold text-[11px]">
              Q.ID #8492
            </span>
            <span className="font-bold text-on-surface">Question 14 of 25 in Chapter Session</span>
            <span className="text-outline text-[11px]">· Single Correct Choice</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                bookmarked
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {bookmarked ? 'bookmark_added' : 'bookmark_border'}
              </span>
              <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <span className="px-2.5 py-1 rounded bg-surface-container text-outline font-mono text-[11px]">
              Untimed Mode · 03:42 elapsed
            </span>
          </div>
        </div>

        {/* Question Content & Stems */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Question Stem */}
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-on-surface font-sans leading-relaxed">
              A solid homogeneous circular cylinder of mass $m$ and radius $R$ is released from rest at an angle $\theta_0$ on the inner concave surface of a fixed cylinder of radius $3R$. Assuming the cylinder rolls without slipping throughout its descent, determine the instantaneous angular velocity $\omega$ about its center of mass when it subtends an angle $\theta$ with the vertical:
            </p>
          </div>

          {/* 4 Interactive Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let stateClasses = 'bg-surface-bright border-outline-variant/30 hover:border-outline-variant';

              if (answerSubmitted) {
                if (opt.isCorrect) {
                  stateClasses = 'bg-academic-mastered-bg border-academic-mastered text-academic-mastered font-bold shadow-xs';
                } else if (isSelected && !opt.isCorrect) {
                  stateClasses = 'bg-academic-revision-bg border-error text-error';
                }
              } else if (isSelected) {
                stateClasses = 'bg-surface-container-low border-primary text-primary font-bold shadow-xs';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedOption(opt.id)}
                  className={`p-4 rounded-xl text-left border flex items-center justify-between text-xs sm:text-sm transition-all duration-150 ${stateClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-mono font-bold text-xs text-on-surface">
                      {opt.id}
                    </span>
                    <span className="font-mono">{opt.text}</span>
                  </div>
                  {answerSubmitted && opt.isCorrect && (
                    <span className="material-symbols-outlined text-[18px] text-academic-mastered">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer State & Derivation Explanation */}
          {answerSubmitted && (
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-academic-mastered flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Correct Selection · Option B Verified
                </span>
                <span className="text-[11px] font-mono text-outline">First-Attempt Accuracy: +4 Marks</span>
              </div>
              <div className="text-xs text-on-surface-variant leading-relaxed font-sans space-y-1">
                <p className="font-bold text-on-surface">Derivation Invariant Proof:</p>
                <p>
                  {"1. The effective radius of the path traversed by the cylinder's center of mass is R_eff = 3R - R = 2R."}
                </p>
                <p>
                  {"2. Applying conservation of mechanical energy: ΔK_trans + ΔK_rot = mg(2R)(1 - cos θ)."}
                </p>
                <p>
                  {"3. With rolling without slipping v_cm = Rω and I_cm = (1/2)mR², the total kinetic energy simplifies to K = (3/4)mR²ω²."}
                </p>
                <p className="font-mono text-primary font-bold pt-1">
                  {"∴ ω = √[4g(1 - cos θ) / 3R]"}
                </p>
              </div>
            </div>
          )}

          {/* Hint Ladder & Action Bar */}
          <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Hint Ladder:</span>
              <button
                type="button"
                onClick={() => setHintTier(1)}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${hintTier >= 1 ? 'bg-surface-container text-primary' : 'text-outline'}`}
              >
                Clue 1 (Kinematics)
              </button>
              <button
                type="button"
                onClick={() => setHintTier(2)}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${hintTier >= 2 ? 'bg-surface-container text-primary' : 'text-outline'}`}
              >
                Clue 2 (Energy Balance)
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAnswerSubmitted(!answerSubmitted)}
                className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface"
              >
                {answerSubmitted ? 'Reset Question State' : 'Submit Step Answer'}
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-xs font-semibold text-on-primary"
              >
                Next Problem &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
