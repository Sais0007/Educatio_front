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
    <section className="w-full bg-[#F5F8FC] py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#00A8F0] text-xs font-bold uppercase tracking-widest border border-[#BAE6FD] shadow-card">
            <span>The Education Platform Advantage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#12365A] tracking-tight leading-[1.12] font-bold">
            Why Serious Aspirants Choose Education Platform
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-sans">
            Most competitive exam journeys fail not from lack of effort, but from disjointed tools, noisy gamification, and unaddressed error habits.
          </p>
        </div>

        {/* Visual Storytelling Comparison Banner (Asymmetric Layout) */}
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-[#E2E8F0] shadow-card text-left">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Visual Storytelling · The Platform Contrast
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#12365A] font-bold mt-1 leading-snug">
              From Disjointed Frustration to Measured Mastery
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* The Fragmented Trap */}
            <div className="p-8 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] space-y-4">
              <div className="flex items-center gap-2 text-[#DC3545] font-semibold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
                <span>The Fragmented Preparation Trap</span>
              </div>
              <h4 className="font-serif text-xl font-bold text-[#12365A]">
                Watching disconnected playlists &amp; random question PDFs
              </h4>
              <p className="text-sm text-[#64748B] leading-relaxed">
                When you solve isolated PDF question banks and sit mock tests on disconnected portals, you cannot identify whether lost marks came from concept depth, algebra, or time management. Errors repeat endlessly.
              </p>
              <div className="pt-2 text-xs font-mono text-[#DC3545] font-semibold">
                Result: High anxiety · Repeated errors · Score stagnation
              </div>
            </div>

            {/* The Connected System */}
            <div className="p-8 rounded-xl bg-white border-2 border-[#00A8F0] shadow-card space-y-4">
              <div className="flex items-center gap-2 text-[#35C978] font-semibold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>The Unified Education Platform System</span>
              </div>
              <h4 className="font-serif text-xl font-bold text-[#12365A]">
                One calm intellectual workspace with closed feedback
              </h4>
              <p className="text-sm text-[#64748B] leading-relaxed">
                A question missed in Sunday&apos;s full mock is immediately categorized, flagged in your Institute lecture, and scheduled into your Monday practice deck for spaced repetition until full resolution.
              </p>
              <div className="pt-2 text-xs font-mono text-[#00A8F0] font-semibold">
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
              className="border-t border-[#E2E8F0] pt-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#00A8F0] tracking-wider">
                    PILLAR {pillar.num}
                  </span>
                  <span className="text-[11px] font-semibold text-[#12365A] bg-[#F5F8FC] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#12365A] group-hover:text-[#00A8F0] transition-colors mb-1.5">
                  {pillar.title}
                </h3>
                <div className="text-xs font-semibold text-[#00A8F0] mb-3">
                  {pillar.subtitle}
                </div>

                <p className="text-sm text-[#64748B] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#00A8F0]">
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
