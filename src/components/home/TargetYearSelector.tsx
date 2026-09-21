import React from 'react';
import { COHORT_YEARS } from '../../data/mockData';
import { CohortYearType } from '../../types';

interface TargetYearSelectorProps {
  selectedYear: CohortYearType;
  onSelect: (year: CohortYearType) => void;
}

export const TargetYearSelector: React.FC<TargetYearSelectorProps> = ({
  selectedYear,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-full bg-surface-container text-primary flex items-center justify-center text-[10px] font-bold">
          2
        </span>
        Target Cohort Year
      </label>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Target Cohort Year">
        {COHORT_YEARS.map((cohort) => {
          const isSelected = selectedYear === cohort.id;
          return (
            <button
              key={cohort.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(cohort.id)}
              className={`px-3.5 py-2 rounded-lg text-left text-xs font-semibold transition-all duration-150 flex items-center justify-between border ${
                isSelected
                  ? 'bg-surface-container-low text-primary border-primary/40 shadow-xs'
                  : 'bg-surface-bright text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span>{cohort.label}</span>
              <span
                className={`material-symbols-outlined text-[16px] text-primary transition-opacity ${
                  isSelected ? 'opacity-100' : 'opacity-0'
                }`}
              >
                check_circle
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
