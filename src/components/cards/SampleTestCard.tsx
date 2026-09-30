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
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-card hover:border-[#0369a1]/40 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group text-left">
      <div>
        {/* Top Badges Row: Subject, Examination & Sample Preview Indicator */}
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject Badge */}
            <span className="px-2.5 py-1 rounded-md bg-[#eff4ff] text-[#0369a1] text-xs font-semibold uppercase tracking-wider border border-[#cde5ff]">
              {test.subject}
            </span>

            {/* Examination Tag */}
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
              {test.examinationName}
            </span>

            {/* Test Type Chip */}
            <span className="text-[11px] font-medium text-[#40474f] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {test.testType}
            </span>
          </div>

          {/* Sample Preview Tag */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold tracking-wide">
            <span className="material-symbols-outlined text-[14px] text-blue-600">
              visibility
            </span>
            <span>Sample Preview</span>
          </span>
        </div>

        {/* Test Title */}
        <h3
          onClick={() => (onExploreTest ? onExploreTest(test.id) : onEnrollToExplore(test.id))}
          className="font-serif text-xl sm:text-[22px] text-[#0b1c30] group-hover:text-[#0369a1] transition-colors font-normal leading-snug mb-2 cursor-pointer"
        >
          {test.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#40474f] leading-relaxed mb-4 font-sans">
          {test.description}
        </p>

        {/* Test Metrics Strip (Questions, Duration, Total Marks) */}
        <div className="flex items-center gap-4 text-xs text-[#40474f] py-2.5 px-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]/80 mb-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#0369a1]">
              quiz
            </span>
            <span>
              <strong className="font-semibold text-[#0b1c30]">{test.totalQuestions}</strong> Questions
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#0369a1]">
              timer
            </span>
            <span>
              <strong className="font-semibold text-[#0b1c30]">{test.durationMinutes}</strong> Minutes
            </span>
          </div>

          {test.totalMarks && (
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#0369a1]">
                military_tech
              </span>
              <span>
                <strong className="font-semibold text-[#0b1c30]">{test.totalMarks}</strong> Marks
              </span>
            </div>
          )}
        </div>

        {/* Two-Tier Feature Breakdown: Included Preview vs Gated Capabilities */}
        <div className="space-y-4 pt-3 border-t border-[#f1f5f9] text-xs">
          {/* Included Preview Capabilities */}
          <div>
            <div className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">
                check_circle
              </span>
              <span>Included In This Preview:</span>
            </div>
            <ul className="space-y-1.5 pl-0.5">
              {test.previewFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#40474f]">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gated Capabilities (Unlocked after enrollment) */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-amber-600">
                lock
              </span>
              <span>Available With Enrollment:</span>
            </div>
            <ul className="space-y-1.5 pl-0.5">
              {test.gatedFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#64748b]">
                  <span className="material-symbols-outlined text-[14px] text-amber-600 shrink-0 mt-0.5">
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
      <div className="pt-5 mt-6 border-t border-[#f1f5f9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-[11px] text-[#64748b]">
          Super Admin Curated · Representative Preview
        </div>

        <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
          {onExploreTest && (
            <button
              type="button"
              onClick={() => onExploreTest(test.id)}
              className="px-3.5 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0369a1] text-xs font-semibold border border-[#cde5ff] transition-all duration-150 inline-flex items-center gap-1"
            >
              <span>View Details</span>
              <span className="material-symbols-outlined text-[14px]">info</span>
            </button>
          )}

          {/* Primary CTA (Exact requested label) */}
          <button
            type="button"
            onClick={() => onEnrollToExplore(test.id)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-xs hover:shadow-card transition-all duration-150 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0369a1] focus:ring-offset-1"
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
