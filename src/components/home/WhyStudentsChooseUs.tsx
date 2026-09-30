import React from 'react';

export const WhyStudentsChooseUs: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Structured Preparation',
      subtitle: 'Zero syllabus ambiguity',
      description:
        'A systematic syllabus architecture mapped directly to your Institute and Branch academic calendar. We eliminate the constant anxiety of syllabus ambiguity so you always know your exact stage of readiness.',
      tag: 'Milestone Roadmap',
    },
    {
      num: '02',
      title: 'Focused Practice',
      subtitle: 'True derivation struggle over shallow tricks',
      description:
        'Deliberate multi-tier problem solving with progressive conceptual clues. Preserves the mental friction required for neuroplastic memory retention and exam-day recall.',
      tag: 'Cognitive Friction',
    },
    {
      num: '03',
      title: 'Performance Understanding',
      subtitle: 'Clinical diagnosis replaces empty scores',
      description:
        'Detailed error autopsies distinguish conceptual blind spots from careless algebraic slips and pacing traps. Revision becomes surgical rather than exhausting.',
      tag: 'Diagnostic Autopsy',
    },
    {
      num: '04',
      title: 'One Connected Platform',
      subtitle: 'Closed feedback loop between mock & study',
      description:
        'Your Institute lectures, branch practice sets, CBT simulations, and mistake notebooks operate inside a single closed loop. What you miss in a test directly shapes what you practice next.',
      tag: 'Closed Loop',
    },
  ];

  return (
    <section className="w-full bg-[#eff4ff]/50 py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-y border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0369a1] text-xs font-bold uppercase tracking-widest border border-[#cde5ff] shadow-xs">
            <span>The Sanctuary Advantage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0b1c30] tracking-tight leading-[1.12] font-normal">
            Why Serious Aspirants Choose Aura
          </h2>
          <p className="text-base sm:text-lg text-[#40474f] leading-relaxed font-sans">
            Most competitive exam journeys fail not from lack of effort, but from disjointed tools, noisy gamification, and unaddressed error habits.
          </p>
        </div>

        {/* Visual Storytelling Comparison Banner (Asymmetric Layout) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2e8f0] shadow-card text-left">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
              Visual Storytelling · The Sanctuary Contrast
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0b1c30] font-normal mt-1 leading-snug">
              From Disjointed Frustration to Measured Mastery
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* The Fragmented Trap */}
            <div className="p-8 rounded-2xl bg-[#eff4ff]/40 border border-[#e2e8f0] space-y-4">
              <div className="flex items-center gap-2 text-[#ba1a1a] font-semibold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
                <span>The Fragmented Preparation Trap</span>
              </div>
              <h4 className="font-serif text-xl font-medium text-[#0b1c30]">
                Watching disconnected playlists &amp; random question PDFs
              </h4>
              <p className="text-sm text-[#40474f] leading-relaxed">
                When you solve isolated PDF question banks and sit mock tests on disconnected portals, you cannot identify whether lost marks came from concept depth, algebra, or time management. Errors repeat endlessly.
              </p>
              <div className="pt-2 text-xs font-mono text-[#ba1a1a] font-semibold">
                Result: High anxiety · Repeated errors · Score stagnation
              </div>
            </div>

            {/* The Connected System */}
            <div className="p-8 rounded-2xl bg-white border-2 border-[#0369a1] shadow-card space-y-4">
              <div className="flex items-center gap-2 text-[#059669] font-semibold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>The Unified Aura Sanctuary System</span>
              </div>
              <h4 className="font-serif text-xl font-medium text-[#0b1c30]">
                One calm intellectual workspace with closed feedback
              </h4>
              <p className="text-sm text-[#40474f] leading-relaxed">
                A question missed in Sunday&apos;s full mock is immediately categorized, flagged in your Institute lecture, and scheduled into your Monday practice deck for spaced repetition until full resolution.
              </p>
              <div className="pt-2 text-xs font-mono text-[#0369a1] font-semibold">
                Result: Calm composure · Diagnostic clarity · Continuous score recovery
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Pillars: Open Typographic Progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left pt-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="border-t border-[#e2e8f0] pt-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#0369a1] tracking-wider">
                    PILLAR {pillar.num}
                  </span>
                  <span className="text-[11px] font-semibold text-[#64748b] bg-white px-2.5 py-0.5 rounded border border-[#e2e8f0]">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal text-[#0b1c30] group-hover:text-[#0369a1] transition-colors mb-1.5">
                  {pillar.title}
                </h3>
                <div className="text-xs font-semibold text-[#0369a1] mb-3">
                  {pillar.subtitle}
                </div>

                <p className="text-sm text-[#40474f] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#0369a1]">
                <span>Integrated into daily student workflow</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStudentsChooseUs;
