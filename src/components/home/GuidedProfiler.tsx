import React from 'react';
import { ExamSelector } from './ExamSelector';
import { TargetYearSelector } from './TargetYearSelector';
import { PREPARATION_OBJECTIVES, EXAMINATIONS } from '../../data/mockData';
import { ExaminationType, CohortYearType, PreparationNeed } from '../../types';

interface GuidedProfilerProps {
  selectedExam: ExaminationType;
  selectedYear: CohortYearType;
  selectedObjective: PreparationNeed;
  onSelectExam: (exam: ExaminationType) => void;
  onSelectYear: (year: CohortYearType) => void;
  onSelectObjective: (obj: PreparationNeed) => void;
  onNavigateObjective: (targetPath: string) => void;
  onStartDiagnostic: () => void;
}

export const GuidedProfiler: React.FC<GuidedProfilerProps> = ({
  selectedExam,
  selectedYear,
  selectedObjective,
  onSelectExam,
  onSelectYear,
  onSelectObjective,
  onNavigateObjective,
  onStartDiagnostic,
}) => {
  const currentExam = EXAMINATIONS.find((e) => e.id === selectedExam);
  const currentObjective = PREPARATION_OBJECTIVES.find((o) => o.id === selectedObjective);

  const getCtaText = () => {
    switch (selectedObjective) {
      case 'learning':
        return `Explore ${currentExam?.title || 'Academic'} Courses`;
      case 'tests':
        return `Explore ${currentExam?.shortCode || ''} Proctored Mock Series`;
      case 'practice':
        return `Open ${currentExam?.shortCode || ''} Practice Engine`;
      case 'resources':
        return 'Access Free Study Vault';
      default:
        return 'Explore Tailored Learning Path';
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/40 p-6 lg:p-8 text-left transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">explore</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface">
              Curate Your Preparation Architecture
            </div>
            <div className="text-xs text-outline">
              Select your examination and objective to preview customized syllabi &amp; diagnostic tracks
            </div>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-primary uppercase tracking-wider bg-surface-container-low px-3 py-1 rounded-full border border-primary/20 hidden sm:inline-block">
          Guided Profiler
        </span>
      </div>

      {/* 3-Step Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Step 1: Exam Selector */}
        <ExamSelector selectedExam={selectedExam} onSelect={onSelectExam} />

        {/* Step 2: Cohort Year Selector */}
        <TargetYearSelector selectedYear={selectedYear} onSelect={onSelectYear} />

        {/* Step 3: Preparation Objective */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-surface-container text-primary flex items-center justify-center text-[10px] font-bold">
              3
            </span>
            Primary Objective
          </label>
          <div className="flex flex-col gap-2" role="radiogroup" aria-label="Primary Objective">
            {PREPARATION_OBJECTIVES.map((obj) => {
              const isSelected = selectedObjective === obj.id;
              return (
                <button
                  key={obj.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelectObjective(obj.id)}
                  className={`px-3.5 py-2 rounded-lg text-left text-xs font-semibold transition-all duration-150 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-surface-container-low text-primary border-primary/40 shadow-xs'
                      : 'bg-surface-bright text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      {obj.icon}
                    </span>
                    <span>{obj.label}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action Bar inside Card */}
      <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onNavigateObjective(currentObjective?.targetPath || '#courses-section')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-sm transition-all duration-150 group"
          >
            <span>{getCtaText()}</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform duration-150">
              arrow_forward
            </span>
          </button>
          <button
            type="button"
            onClick={onStartDiagnostic}
            className="inline-flex items-center gap-1 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors duration-150 py-2"
          >
            <span>Or take a 10-minute diagnostic check</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-outline">
          <span className="material-symbols-outlined text-[18px] text-secondary">
            verified_user
          </span>
          <span>Accredited 2026/2027 Syllabus Matrix</span>
        </div>
      </div>
    </div>
  );
};
