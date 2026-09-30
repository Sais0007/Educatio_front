import React from 'react';
import { Examination, ExaminationType } from '../../types';

interface ExaminationCardProps {
  examination: Examination;
  onExplore: (examId: ExaminationType) => void;
  selectedYear?: number | string;
}

export const ExaminationCard: React.FC<ExaminationCardProps> = ({
  examination,
  onExplore,
}) => {
  const categoryLabels: Record<string, string> = {
    engineering: 'Engineering Entrance',
    medical: 'Medical Entrance',
    foundation: 'Foundation & Olympiad',
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-card hover:border-[#0369a1]/40 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group text-left">
      <div>
        {/* Top Badges: Category & ShortCode */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-[#eff4ff] text-[#0369a1] text-xs font-semibold uppercase tracking-wider border border-[#cde5ff]">
              {examination.category ? categoryLabels[examination.category] : examination.badge}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
              {examination.shortCode}
            </span>
          </div>

          <span className="text-[11px] font-mono font-medium text-[#64748b]">
            {examination.supportedYears?.map(y => (y === 'dropper' ? 'Dropper' : y)).join(' · ')}
          </span>
        </div>

        {/* Examination Title */}
        <h3
          onClick={() => onExplore(examination.id)}
          className="font-serif text-2xl sm:text-[26px] text-[#0b1c30] group-hover:text-[#0369a1] transition-colors font-normal leading-snug mb-2.5 cursor-pointer"
        >
          {examination.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#40474f] leading-relaxed mb-5 font-sans">
          {examination.description}
        </p>

        {/* Basic Academic Context Blocks */}
        <div className="space-y-3 pt-3 border-t border-[#f1f5f9] text-xs">
          {/* Conducting Body */}
          {examination.conductingBody && (
            <div className="flex items-start gap-2 text-[#40474f]">
              <span className="material-symbols-outlined text-[16px] text-[#0369a1] shrink-0 mt-0.5">
                account_balance
              </span>
              <span>
                <strong className="text-[#0b1c30] font-semibold">Authority:</strong> {examination.conductingBody}
              </span>
            </div>
          )}

          {/* Core Subjects */}
          {examination.subjects && examination.subjects.length > 0 && (
            <div className="flex items-start gap-2 text-[#40474f]">
              <span className="material-symbols-outlined text-[16px] text-[#0369a1] shrink-0 mt-0.5">
                subject
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <strong className="text-[#0b1c30] font-semibold">Subjects:</strong>
                {examination.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="inline-block px-2 py-0.5 rounded bg-[#f8fafc] border border-[#e2e8f0] text-[11px] text-[#475569]"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Format / Pacing */}
          {examination.format && (
            <div className="flex items-start gap-2 text-[#40474f]">
              <span className="material-symbols-outlined text-[16px] text-[#0369a1] shrink-0 mt-0.5">
                desktop_windows
              </span>
              <span>
                <strong className="text-[#0b1c30] font-semibold">Format:</strong> {examination.format}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Discovery CTA */}
      <div className="mt-7 pt-4 border-t border-[#e2e8f0]">
        <button
          type="button"
          onClick={() => onExplore(examination.id)}
          className="w-full py-3 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#0369a1] text-[#0369a1] hover:text-white font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 group/btn"
          aria-label={`Explore ${examination.title} preparation and details`}
        >
          <span>Explore Examination</span>
          <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};

export default ExaminationCard;
