import React from 'react';
import { EXAMINATIONS } from '../../data/mockData';
import { ExaminationType } from '../../types';

interface ExamSelectorProps {
  selectedExam: ExaminationType;
  onSelect: (examId: ExaminationType) => void;
}

export const ExamSelector: React.FC<ExamSelectorProps> = ({
  selectedExam,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-full bg-surface-container text-primary flex items-center justify-center text-[10px] font-bold">
          1
        </span>
        Target Examination
      </label>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Target Examination">
        {EXAMINATIONS.map((exam) => {
          const isSelected = selectedExam === exam.id;
          return (
            <button
              key={exam.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(exam.id)}
              className={`px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all duration-150 border ${
                isSelected
                  ? 'bg-surface-container-low text-primary border-primary/40 shadow-xs'
                  : 'bg-surface-bright text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="truncate">{exam.title}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
