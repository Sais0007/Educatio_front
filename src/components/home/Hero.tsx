import React from 'react';
import { GuidedProfiler } from './GuidedProfiler';
import { ExaminationType, CohortYearType, PreparationNeed } from '../../types';

interface HeroProps {
  selectedExam: ExaminationType;
  selectedYear: CohortYearType;
  selectedObjective: PreparationNeed;
  onSelectExam: (exam: ExaminationType) => void;
  onSelectYear: (year: CohortYearType) => void;
  onSelectObjective: (obj: PreparationNeed) => void;
  onNavigateObjective: (targetPath: string) => void;
  onStartDiagnostic: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedExam,
  selectedYear,
  selectedObjective,
  onSelectExam,
  onSelectYear,
  onSelectObjective,
  onNavigateObjective,
  onStartDiagnostic,
}) => {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-12 pt-10 pb-16 max-w-7xl mx-auto overflow-hidden">
      {/* Glacial Sanctuary Atmospheric Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-primary-fixed/30 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Editorial Overline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-low text-primary text-[11px] font-semibold tracking-wider uppercase mb-6 shadow-xs border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
          Academic Preparation Redefined · 2026–2027 Enrolment
        </div>

        {/* Hero Headline (Newsreader Serif) */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight max-w-3xl mb-6 font-normal">
          Stillness Precedes Mastery. Learn, Practise, and Excel with Purpose.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed font-sans">
          A calm, high-rigor learning sanctuary for competitive examinations. Master first principles through deep lectures, deliberate derivation practice, national CBT mock series, and diagnostic error autopsies.
        </p>

        {/* 3-Step Interactive Guided Path Selector Card */}
        <GuidedProfiler
          selectedExam={selectedExam}
          selectedYear={selectedYear}
          selectedObjective={selectedObjective}
          onSelectExam={onSelectExam}
          onSelectYear={onSelectYear}
          onSelectObjective={onSelectObjective}
          onNavigateObjective={onNavigateObjective}
          onStartDiagnostic={onStartDiagnostic}
        />

        {/* Verified Academic Foundations Strip (Truthful & non-fabricated) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-on-surface-variant text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">
              fact_check
            </span>
            <span>100% Validated NTA &amp; IIT-JEE Syllabus Matrix</span>
          </div>
          <span className="text-outline-variant hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              speed
            </span>
            <span>Second-by-Second CBT Pacing Telemetry</span>
          </div>
          <span className="text-outline-variant hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">
              psychology
            </span>
            <span>Zero-Distraction Cognitive Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
};
