import React from 'react';
import { CatalogCourse } from '../../types';

interface CourseCardProps {
  course: CatalogCourse;
  onEnrol: (courseId: string) => void;
  onViewDetails?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnrol,
  onViewDetails,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between border border-outline-variant/30 hover:border-primary/40 group">
      <div className="p-6 sm:p-8">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary text-[11px] font-semibold uppercase tracking-wider">
            {course.badge}
          </span>
          <span className="text-xs text-outline">{course.batchName}</span>
        </div>

        {/* Course Title & Description */}
        <h3
          onClick={() => onViewDetails && onViewDetails(course.id)}
          className="font-serif text-lg sm:text-xl text-on-surface mb-3 leading-snug font-medium group-hover:text-primary transition-colors cursor-pointer"
        >
          {course.title}
        </h3>
        <p className="text-xs text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
          {course.subtitle}
        </p>

        {/* Faculty Block */}
        <div className="flex items-center gap-3 py-3 px-3.5 mb-6 bg-surface-container-low/60 rounded-lg border border-outline-variant/20">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${course.faculty.avatarBg || 'bg-primary-container text-on-primary'}`}
          >
            {course.faculty.initials}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-on-surface truncate">
              {course.faculty.name}
            </div>
            <div className="text-[11px] text-outline truncate">
              {course.faculty.designation}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-lg px-3 text-center mb-4">
          <div>
            <div className="text-xs font-bold text-on-surface">
              {course.metrics.lectures}
            </div>
            <div className="text-[10px] text-outline uppercase font-medium">Lectures</div>
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface">
              {course.metrics.dpps} Sets
            </div>
            <div className="text-[10px] text-outline uppercase font-medium">DPPs</div>
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface">
              {course.metrics.milestones}
            </div>
            <div className="text-[10px] text-outline uppercase font-medium">Milestones</div>
          </div>
        </div>
      </div>

      {/* Card Footer: Pricing & Action */}
      <div className="px-6 sm:px-8 pb-6 pt-4 bg-surface-container-low/40 border-t border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-semibold text-outline tracking-wider block">
            Tuition Fee
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-lg font-bold text-on-surface">
              ₹{course.pricing.amount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-outline font-normal">
              {course.pricing.period}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onEnrol(course.id)}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-xs font-semibold text-primary transition-colors duration-150 shadow-xs"
        >
          <span>Enrol</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
