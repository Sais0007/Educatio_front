import React from 'react';
import { PublicSampleTest } from '../../types';

interface SampleTestCardProps {
  test: PublicSampleTest;
  onEnrollToExplore: (testId: string) => void;
  onExploreTest?: (testId: string) => void;
}

export const SampleTestCard: React.FC<SampleTestCardProps> = ({
  test,
  onEnrollToExplore,
  onExploreTest,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card hover:shadow-dropdown hover:border-[#00A8F0] transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group text-left">
      <div>
        {/* Top Badges Row: Subject, Examination & Sample Preview Indicator */}
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject Badge */}
            <span className="px-2.5 py-0.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-xs font-bold uppercase tracking-wider border border-[#BAE6FD]">
              {test.subject}
            </span>

            {/* Examination Tag */}
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#F5F8FC] text-[#12365A] border border-[#E2E8F0]">
              {test.examinationName}
            </span>

            {/* Test Type Chip */}
            <span className="text-[11px] font-medium text-[#12365A] bg-[#F5F8FC] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
              {test.testType}
            </span>
          </div>

          {/* Sample Preview Tag */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD] text-xs font-semibold tracking-wide">
            <span className="material-symbols-outlined text-[14px] text-[#00A8F0]">
              visibility
            </span>
            <span>Sample Preview</span>
          </span>
        </div>

        {/* Test Title */}
        <h3
          onClick={() => (onExploreTest ? onExploreTest(test.id) : onEnrollToExplore(test.id))}
          className="font-serif text-xl sm:text-[22px] text-[#12365A] group-hover:text-[#00A8F0] transition-colors font-bold leading-snug mb-2 cursor-pointer"
        >
          {test.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#64748B] leading-relaxed mb-4 font-sans">
          {test.description}
        </p>

        {/* Test Metrics Strip (Questions, Duration, Total Marks) */}
        <div className="flex items-center gap-4 text-xs text-[#64748B] py-2.5 px-3 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] mb-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
              quiz
            </span>
            <span>
              <strong className="font-semibold text-[#12365A]">{test.totalQuestions}</strong> Questions
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
              timer
            </span>
            <span>
              <strong className="font-semibold text-[#12365A]">{test.durationMinutes}</strong> Minutes
            </span>
          </div>

          {test.totalMarks && (
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                military_tech
              </span>
              <span>
                <strong className="font-semibold text-[#12365A]">{test.totalMarks}</strong> Marks
              </span>
            </div>
          )}
        </div>

        {/* Two-Tier Feature Breakdown: Included Preview vs Gated Capabilities */}
        <div className="space-y-4 pt-3 border-t border-[#E2E8F0] text-xs">
          {/* Included Preview Capabilities */}
          <div>
            <div className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#16A34A]">
                check_circle
              </span>
              <span>Included In This Preview:</span>
            </div>
            <ul className="space-y-1.5 pl-0.5">
              {test.previewFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#12365A]">
                  <span className="text-[#16A34A] font-bold shrink-0">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gated Capabilities (Unlocked after enrollment) */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#B45309]">
                lock
              </span>
              <span>Available With Enrollment:</span>
            </div>
            <ul className="space-y-1.5 pl-0.5">
              {test.gatedFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#64748B]">
                  <span className="material-symbols-outlined text-[14px] text-[#B45309] shrink-0 mt-0.5">
                    lock
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-5 mt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-[11px] text-[#64748B]">
          Super Admin Curated · Representative Preview
        </div>

        <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
          {onExploreTest && (
            <button
              type="button"
              onClick={() => onExploreTest(test.id)}
              className="px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#12365A] hover:text-[#00A8F0] text-xs font-semibold border border-[#E2E8F0] transition-all duration-150 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Details</span>
              <span className="material-symbols-outlined text-[14px]">info</span>
            </button>
          )}

          {/* Primary CTA (Exact requested label) */}
          <button
            type="button"
            onClick={() => onEnrollToExplore(test.id)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-card transition-all duration-150 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-1 cursor-pointer"
            aria-label={`Enroll to explore more for ${test.title}`}
          >
            <span>Enroll to Explore More</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleTestCard;
