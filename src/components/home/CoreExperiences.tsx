import React from 'react';

export const CoreExperiences: React.FC = () => {
  return (
    <section className="w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-28 lg:space-y-36">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-bold uppercase tracking-widest border border-[#cde5ff]">
          <span>Three Core Experiences</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0b1c30] tracking-tight leading-[1.12] font-normal">
          Designed for Intellectual Rigor, Not Dopamine.
        </h2>
        <p className="text-base sm:text-lg text-[#40474f] leading-relaxed font-sans">
          Every surface of the platform is engineered to foster deep conceptual mastery, calm confidence, and measurable mark improvement.
        </p>
      </div>

      {/* Experience 1: LEARN (Text Left + Visual Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Open Editorial Narrative */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0369a1] uppercase tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0369a1]" />
            <span>01 · Learn</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#0b1c30] tracking-tight leading-[1.12] font-normal">
            Structured preparation designed around the student&apos;s goals.
          </h3>

          <p className="text-base sm:text-lg text-[#40474f] leading-relaxed font-sans">
            Find the right preparation path through your Institute and Branch. Courses are not generic platform-wide video catalogues—they are structured academic curricula delivered by your institute&apos;s senior faculty, deconstructing complex theorems and derivations step by step.
          </p>

          {/* One Key Supporting Detail */}
          <div className="pt-2 border-l-2 border-[#0369a1] pl-5 space-y-2">
            <div className="text-base font-semibold text-[#0b1c30]">
              Institute &amp; Branch Curriculum Mapping
            </div>
            <p className="text-sm text-[#40474f] leading-relaxed">
              Curricula are synchronized with your center&apos;s academic milestones, giving enrolled students complete clarity from foundational mechanics to modern physics.
            </p>
          </div>
        </div>

        {/* Right: Large Editorial Visual Composition */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden shadow-elevated border border-[#e2e8f0] bg-white group">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                alt="Student attending focused seminar lecture"
                className="w-full h-full object-cover brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#7dd3fc]">
                  Branch Cohort Sanctuary
                </span>
                <p className="text-sm font-medium text-white/95 mt-0.5">
                  First-principles lecture track · Synchronized with your institute syllabus
                </p>
              </div>
            </div>

            {/* Subtle product preview peek */}
            <div className="p-5 bg-white border-t border-[#e2e8f0] flex items-center gap-4 text-left">
              <div className="w-16 h-12 rounded-lg overflow-hidden border border-[#e2e8f0] shrink-0 bg-[#eff4ff]">
                <img
                  src="/assets/screens/learning-preview.png"
                  alt="Aura Sanctuary Learning interface"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0b1c30]">Chapter Derivation Blueprint</div>
                <div className="text-xs text-[#64748b]">Synchronized lecture notes &amp; concept milestone checklists</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience 2: PRACTICE (Visual Left + Text Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Large Editorial Visual Composition */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden shadow-elevated border border-[#e2e8f0] bg-white group">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
                alt="Student writing step-by-step problem derivation"
                className="w-full h-full object-cover brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#7dd3fc]">
                  Deliberate Workspace
                </span>
                <p className="text-sm font-medium text-white/95 mt-0.5">
                  Step-by-step invariant validation · Preserving the struggle needed for recall
                </p>
              </div>
            </div>

            {/* Subtle product preview peek */}
            <div className="p-5 bg-white border-t border-[#e2e8f0] flex items-center gap-4 text-left">
              <div className="w-16 h-12 rounded-lg overflow-hidden border border-[#e2e8f0] shrink-0 bg-[#eff4ff]">
                <img
                  src="/assets/screens/practice-preview.png"
                  alt="Aura Sanctuary Practice interface"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0b1c30]">Progressive Clue Architecture</div>
                <div className="text-xs text-[#64748b]">Tiered hints guide intuition without revealing the full solution</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Open Editorial Narrative */}
        <div className="lg:col-span-6 text-left space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00668a] uppercase tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00668a]" />
            <span>02 · Practice</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#0b1c30] tracking-tight leading-[1.12] font-normal">
            Build confidence through focused practice throughout preparation.
          </h3>

          <p className="text-base sm:text-lg text-[#40474f] leading-relaxed font-sans">
            Instant answer keys ruin memory retention. Throughout your preparation, Aura provides progressive conceptual clues that point your mathematical reasoning in the right direction without stealing the breakthrough feeling.
          </p>

          {/* One Key Supporting Detail */}
          <div className="pt-2 border-l-2 border-[#00668a] pl-5 space-y-2">
            <div className="text-base font-semibold text-[#0b1c30]">
              12,500+ Authenticated Stems &amp; PYQs
            </div>
            <p className="text-sm text-[#40474f] leading-relaxed">
              Every question stem is tagged by difficulty tier and concept invariant, enabling targeted practice aligned with your institute&apos;s classroom pacing.
            </p>
          </div>
        </div>
      </div>

      {/* Experience 3: IMPROVE (Text Left + Visual Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Open Editorial Narrative */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] uppercase tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
            <span>03 · Improve</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#0b1c30] tracking-tight leading-[1.12] font-normal">
            Understand performance and identify where to focus next.
          </h3>

          <p className="text-base sm:text-lg text-[#40474f] leading-relaxed font-sans">
            A test score is not an actionable diagnosis. As an enrolled student, second-by-second error autopsies on every proctored mock exam pinpoint whether lost marks came from conceptual gaps, calculation slips, or pacing stalls.
          </p>

          {/* One Key Supporting Detail */}
          <div className="pt-2 border-l-2 border-[#059669] pl-5 space-y-2">
            <div className="text-base font-semibold text-[#0b1c30]">
              Automated Spaced Mistake Remediation
            </div>
            <p className="text-sm text-[#40474f] leading-relaxed">
              Missed stems automatically populate your personal Mistake Notebook, triggering re-attempts at 3, 7, and 21 days until permanent mastery.
            </p>
          </div>
        </div>

        {/* Right: Large Editorial Visual Composition */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden shadow-elevated border border-[#e2e8f0] bg-white group">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80"
                alt="Student calmly reviewing diagnostic error autopsy notes"
                className="w-full h-full object-cover brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#7dd3fc]">
                  Diagnostic Composure
                </span>
                <p className="text-sm font-medium text-white/95 mt-0.5">
                  Pacing telemetry &amp; error autopsies replace anxiety with surgical focus
                </p>
              </div>
            </div>

            {/* Subtle product preview peek */}
            <div className="p-5 bg-white border-t border-[#e2e8f0] flex items-center gap-4 text-left">
              <div className="w-16 h-12 rounded-lg overflow-hidden border border-[#e2e8f0] shrink-0 bg-[#eff4ff]">
                <img
                  src="/assets/screens/analytics-preview.png"
                  alt="Aura Sanctuary Analytics interface"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0b1c30]">Second-by-Second Telemetry</div>
                <div className="text-xs text-[#64748b]">Dwell time breakdown, stall detection, and error classification</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreExperiences;
