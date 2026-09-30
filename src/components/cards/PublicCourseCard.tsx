import React from 'react';
import { PublicCourse } from '../../types';

interface PublicCourseCardProps {
  course: PublicCourse;
  onExplore: (courseId: string) => void;
}

export const PublicCourseCard: React.FC<PublicCourseCardProps> = ({
  course,
  onExplore,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-card hover:border-[#0369a1]/40 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group text-left">
      <div>
        {/* Top Badges: Subject, Examination & Free Access Indicator */}
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject Badge */}
            <span className="px-2.5 py-1 rounded-md bg-[#eff4ff] text-[#0369a1] text-xs font-semibold uppercase tracking-wider border border-[#cde5ff]">
              {course.subject}
            </span>
            {/* Examination Badge */}
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
              {course.examinationName}
            </span>
          </div>

          {/* Free Access Indicator */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold tracking-wide">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">
              lock_open
            </span>
            <span>Free Access</span>
          </span>
        </div>

        {/* Level Tag (if available) */}
        {course.level && (
          <div className="mb-2">
            <span className="text-[11px] font-semibold text-[#0369a1] tracking-wide uppercase bg-[#eff4ff]/70 px-2 py-0.5 rounded border border-[#cde5ff]/60 inline-block">
              {course.level}
            </span>
          </div>
        )}

        {/* Course Title */}
        <h3
          onClick={() => onExplore(course.id)}
          className="font-serif text-xl sm:text-[22px] text-[#0b1c30] group-hover:text-[#0369a1] transition-colors font-normal leading-snug mb-2.5 cursor-pointer"
        >
          {course.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#40474f] leading-relaxed mb-5 font-sans">
          {course.description}
        </p>

        {/* Basic Course Information / Context Blocks */}
        <div className="space-y-2.5 pt-3.5 border-t border-[#f1f5f9] text-xs">
          {/* Faculty / Instructor (Only if available) */}
          {course.faculty && (
            <div className="flex items-start gap-2 text-[#40474f]">
              <span className="material-symbols-outlined text-[16px] text-[#0369a1] shrink-0 mt-0.5">
                person
              </span>
              <div>
                <span className="font-semibold text-[#0b1c30]">{course.faculty.name}</span>
                {course.faculty.designation && (
                  <span className="text-[#64748b] ml-1">· {course.faculty.designation}</span>
                )}
              </div>
            </div>
          )}

          {/* Duration (Only if available) */}
          {course.duration && (
            <div className="flex items-center gap-2 text-[#40474f]">
              <span className="material-symbols-outlined text-[16px] text-[#0369a1] shrink-0">
                schedule
              </span>
              <span>{course.duration}</span>
            </div>
          )}

          {/* Content Summary (Only if supported by data) */}
          {course.contentSummary && (
            <div className="flex items-center gap-2 text-[#40474f]">
              <span className="material-symbols-outlined text-[16px] text-[#0369a1] shrink-0">
                layers
              </span>
              <span>
                {course.contentSummary.modulesCount} Modules · {course.contentSummary.lecturesCount} Lectures
                {course.contentSummary.practiceSheetsCount ? ` · ${course.contentSummary.practiceSheetsCount} Practice Sets` : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-[#f1f5f9] flex items-center justify-between gap-3">
        <div className="text-xs text-[#64748b]">
          <span className="font-medium text-[#0b1c30]">Public Curriculum</span> · Self-Paced
        </div>

        <button
          type="button"
          onClick={() => onExplore(course.id)}
          className="px-4 py-2 rounded-xl bg-[#eff4ff] group-hover:bg-[#0369a1] text-[#0369a1] group-hover:text-white text-xs font-semibold border border-[#cde5ff] transition-all duration-150 inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1] focus:ring-offset-1"
          aria-label={`Explore course: ${course.title}`}
        >
          <span>Explore Course</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform duration-150">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};

export default PublicCourseCard;
