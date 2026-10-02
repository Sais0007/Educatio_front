import React, { useState } from 'react';
import { EXAMINATIONS } from '../../data/mockData';
import { ExaminationType } from '../../types';

interface HeroProps {
  onStartPreparation: () => void;
  onSeeHowItWorks: () => void;
  selectedExam?: ExaminationType;
  onSelectExam?: (exam: ExaminationType) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPreparation,
  onSeeHowItWorks,
  selectedExam = 'jee-adv',
  onSelectExam,
}) => {
  const [activeExam, setActiveExam] = useState<ExaminationType>(selectedExam);

  const handleExamClick = (id: ExaminationType) => {
    setActiveExam(id);
    if (onSelectExam) {
      onSelectExam(id);
    }
  };

  const examDescriptions: Record<ExaminationType, string> = {
    'jee-adv': 'Multi-concept derivations, rotating frames, and Olympiad-tier conceptual proofs.',
    'jee-main': 'High-accuracy NCERT alignment, speed calibration, and NTA scoring efficiency.',
    'neet-ug': 'Line-by-line bio recall, physical chemistry mechanisms, and timed sectional composure.',
    'foundation': 'First-principles natural science & competitive mathematics for early scholars.',
  };

  return (
    <section id="hero" className="relative w-full px-4 sm:px-6 lg:px-12 pt-10 pb-24 lg:pb-32 max-w-7xl mx-auto overflow-hidden">
      {/* Education Platform Ambient Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#00A8F0]/10 via-[#E0F4FD]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Outcome Headline & Value Proposition */}
        <div className="lg:col-span-7 text-left space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-xs font-semibold tracking-wide border border-[#BAE6FD]">
            <span className="w-2 h-2 rounded-full bg-[#00A8F0] animate-pulse" />
            <span>Academic Preparation Platform · Institute &amp; Branch Network</span>
          </div>

          {/* Hero Display Typography */}
          <h1 className="font-serif text-[40px] sm:text-[52px] lg:text-[66px] text-[#12365A] tracking-tight leading-[1.05] font-bold">
            Prepare smarter. <br />
            <span className="text-[#00A8F0]">Improve with confidence.</span>
          </h1>

          {/* Explanatory Sentence Connecting 4 Pillars */}
          <p className="text-base sm:text-lg lg:text-xl text-[#64748B] max-w-xl leading-relaxed font-sans font-normal">
            One connected platform that connects structured learning, deliberate practice, authentic testing, and continuous performance improvement through your Institute and Branch.
          </p>

          {/* Lightweight Path Selector (Contextual, Not a complex configurator) */}
          <div className="pt-2 space-y-3">
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Target Examinations:
            </div>
            <div className="flex flex-wrap gap-2.5">
              {EXAMINATIONS.map((exam) => {
                const isActive = activeExam === exam.id;
                return (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => handleExamClick(exam.id)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#12365A] text-white shadow-card ring-1 ring-[#12365A]'
                        : 'bg-white text-[#12365A] hover:bg-[#E0F4FD] border border-[#E2E8F0]'
                    }`}
                  >
                    <span>{exam.title}</span>
                    <span
                      className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F5F8FC] text-[#64748B]'
                      }`}
                    >
                      {exam.shortCode}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Context Line for Selected Track */}
            <p className="text-sm text-[#00A8F0] font-medium flex items-center gap-2 pt-0.5">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span>{examDescriptions[activeExam]}</span>
            </p>
          </div>

          {/* Action CTAs: Primary 'Get Started', Secondary 'Explore Examinations' */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onStartPreparation}
              className="px-8 py-3.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-base font-semibold shadow-card hover:shadow-dropdown transition-all duration-150 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              type="button"
              onClick={onSeeHowItWorks}
              className="px-8 py-3.5 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#12365A] text-base font-semibold transition-all duration-150 border border-[#E2E8F0] flex items-center justify-center gap-2 shadow-card cursor-pointer"
            >
              <span>Explore Examinations</span>
              <span className="material-symbols-outlined text-[20px] text-[#64748B]">
                expand_more
              </span>
            </button>
          </div>

          {/* Reassurance Guarantees */}
          <div className="flex items-center gap-6 pt-1 text-sm text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#35C978] text-[18px]">
                check_circle
              </span>
              <span className="text-[#12365A] font-medium">Free student profile registration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#35C978] text-[18px]">
                check_circle
              </span>
              <span className="text-[#12365A] font-medium">Institute &amp; Branch mapping</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Dignity, Integrated Student Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Primary Student Photography Card */}
            <div className="rounded-xl overflow-hidden shadow-card border border-[#E2E8F0] bg-white relative aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Students studying collaboratively with focus in an academic library"
                className="w-full h-full object-cover brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12365A]/90 via-[#12365A]/20 to-transparent pointer-events-none" />

              {/* Integrated Editorial Overlay Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#BAE6FD]">
                  The Enrolled Experience
                </span>
                <p className="font-serif text-xl font-bold text-white mt-1 leading-snug">
                  Connect your classroom lectures with targeted practice and CBT mock telemetry.
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-[#E0F4FD]">
                  <span>Institute Derivations</span>
                  <span>•</span>
                  <span>Branch Cohorts</span>
                  <span>•</span>
                  <span>Diagnostic Tests</span>
                </div>
              </div>
            </div>

            {/* Restrained Proof Badge 1: Mark Recovery */}
            <div className="absolute -top-4 -right-3 sm:-right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-card border border-[#E2E8F0] max-w-[210px] text-left">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#35C978]" />
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  Verified Outcome
                </span>
              </div>
              <div className="text-lg font-bold text-[#00A8F0] font-mono leading-none">
                +16 Marks
              </div>
              <div className="text-xs text-[#12365A] font-medium mt-1 leading-snug">
                Calculus diagnostic mark recovery
              </div>
            </div>

            {/* Restrained Proof Badge 2: Continuous Feedback Chip */}
            <div className="absolute -bottom-4 -left-3 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-card border border-[#E2E8F0] flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">all_inclusive</span>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Continuous Feedback
                </div>
                <div className="text-xs font-bold text-[#12365A]">
                  Learn → Practice → Test → Improve
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
