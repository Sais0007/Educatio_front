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
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card hover:shadow-dropdown hover:border-[#00A8F0] transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group text-left">
      <div>
        {/* Top Badges: Subject, Examination & Free Access Indicator */}
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject Badge */}
            <span className="px-2.5 py-1 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-xs font-bold uppercase tracking-wider border border-[#BAE6FD]">
              {course.subject}
            </span>
            {/* Examination Badge */}
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F5F8FC] text-[#12365A] border border-[#E2E8F0]">
              {course.examinationName}
            </span>
          </div>

          {/* Free Access Indicator */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] text-xs font-semibold tracking-wide">
            <span className="material-symbols-outlined text-[14px] text-[#16A34A]">
              lock_open
            </span>
            <span>Free Access</span>
          </span>
        </div>

        {/* Level Tag (if available) */}
        {course.level && (
          <div className="mb-2">
            <span className="text-[11px] font-semibold text-[#00A8F0] tracking-wide uppercase bg-[#E0F4FD] px-2.5 py-0.5 rounded-full border border-[#BAE6FD] inline-block">
              {course.level}
            </span>
          </div>
        )}

        {/* Course Title */}
        <h3
          onClick={() => onExplore(course.id)}
          className="font-serif text-xl sm:text-[22px] text-[#12365A] group-hover:text-[#00A8F0] transition-colors font-bold leading-snug mb-2.5 cursor-pointer"
        >
          {course.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#64748B] leading-relaxed mb-5 font-sans">
          {course.description}
        </p>

        {/* Basic Course Information / Context Blocks */}
        <div className="space-y-2.5 pt-3.5 border-t border-[#E2E8F0] text-xs">
          {/* Faculty / Instructor (Only if available) */}
          {course.faculty && (
            <div className="flex items-start gap-2 text-[#64748B]">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0] shrink-0 mt-0.5">
                person
              </span>
              <div>
                <span className="font-semibold text-[#12365A]">{course.faculty.name}</span>
                {course.faculty.designation && (
                  <span className="text-[#64748B] ml-1">· {course.faculty.designation}</span>
                )}
              </div>
            </div>
          )}

          {/* Duration (Only if available) */}
          {course.duration && (
            <div className="flex items-center gap-2 text-[#64748B]">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0] shrink-0">
                schedule
              </span>
              <span>{course.duration}</span>
            </div>
          )}

          {/* Content Summary (Only if supported by data) */}
          {course.contentSummary && (
            <div className="flex items-center gap-2 text-[#64748B]">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0] shrink-0">
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
      <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
        <div className="text-xs text-[#64748B]">
          <span className="font-semibold text-[#12365A]">Public Curriculum</span> · Self-Paced
        </div>

        <button
          type="button"
          onClick={() => onExplore(course.id)}
          className="px-4 py-2 rounded-lg bg-[#E0F4FD] group-hover:bg-[#00A8F0] text-[#00A8F0] group-hover:text-white text-xs font-semibold border border-[#BAE6FD] hover:border-[#00A8F0] transition-all duration-150 inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-1 cursor-pointer"
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
