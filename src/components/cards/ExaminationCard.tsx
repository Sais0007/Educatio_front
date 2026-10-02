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
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card hover:shadow-dropdown hover:border-[#00A8F0] transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group text-left">
      <div>
        {/* Top Badges: Category & ShortCode */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-xs font-bold uppercase tracking-wider border border-[#BAE6FD]">
              {examination.category ? categoryLabels[examination.category] : examination.badge}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#F5F8FC] text-[#12365A] border border-[#E2E8F0]">
              {examination.shortCode}
            </span>
          </div>

          <span className="text-[11px] font-mono font-medium text-[#64748B]">
            {examination.supportedYears?.map(y => (y === 'dropper' ? 'Dropper' : y)).join(' · ')}
          </span>
        </div>

        {/* Examination Title */}
        <h3
          onClick={() => onExplore(examination.id)}
          className="font-serif text-2xl sm:text-[26px] text-[#12365A] group-hover:text-[#00A8F0] transition-colors font-bold leading-snug mb-2.5 cursor-pointer"
        >
          {examination.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#64748B] leading-relaxed mb-5 font-sans">
          {examination.description}
        </p>

        {/* Basic Academic Context Blocks */}
        <div className="space-y-3 pt-3 border-t border-[#E2E8F0] text-xs">
          {/* Conducting Body */}
          {examination.conductingBody && (
            <div className="flex items-start gap-2 text-[#64748B]">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0] shrink-0 mt-0.5">
                account_balance
              </span>
              <span>
                <strong className="text-[#12365A] font-semibold">Authority:</strong> {examination.conductingBody}
              </span>
            </div>
          )}

          {/* Core Subjects */}
          {examination.subjects && examination.subjects.length > 0 && (
            <div className="flex items-start gap-2 text-[#64748B]">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0] shrink-0 mt-0.5">
                subject
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <strong className="text-[#12365A] font-semibold">Subjects:</strong>
                {examination.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5F8FC] border border-[#E2E8F0] text-[11px] text-[#12365A]"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Format / Pacing */}
          {examination.format && (
            <div className="flex items-start gap-2 text-[#64748B]">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0] shrink-0 mt-0.5">
                desktop_windows
              </span>
              <span>
                <strong className="text-[#12365A] font-semibold">Format:</strong> {examination.format}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Discovery CTA */}
      <div className="mt-7 pt-4 border-t border-[#E2E8F0]">
        <button
          type="button"
          onClick={() => onExplore(examination.id)}
          className="w-full py-3 px-4 rounded-lg bg-[#E0F4FD] hover:bg-[#00A8F0] text-[#00A8F0] hover:text-white font-semibold text-sm border border-[#BAE6FD] hover:border-[#00A8F0] transition-all duration-150 flex items-center justify-center gap-2 group/btn cursor-pointer"
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
