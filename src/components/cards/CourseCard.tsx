import React from 'react';
import { CatalogCourse } from '../../types';

interface CourseCardProps {
  course: CatalogCourse;
  onEnrol: (courseId: string) => void;
  onViewDetails?: (course: CatalogCourse) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnrol,
  onViewDetails,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between border border-outline-variant/30 hover:border-primary/40 group">
      <div className="p-6 sm:p-8">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary text-[11px] font-bold uppercase tracking-wider">
            {course.badge}
          </span>
          <span className="text-xs text-outline font-medium">{course.batchName}</span>
        </div>

        {/* Course Title & Description */}
        <h3
          onClick={() => onViewDetails && onViewDetails(course)}
          className="font-serif text-lg sm:text-xl text-on-surface mb-3 leading-snug font-medium group-hover:text-primary transition-colors cursor-pointer"
        >
          {course.title}
        </h3>
        <p className="text-xs text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
          {course.subtitle}
        </p>

        {/* Faculty Profile Card */}
        <div className="flex items-center gap-3.5 py-3 px-3.5 mb-6 bg-surface-container-low/70 rounded-xl border border-outline-variant/20">
          <img
            src={course.faculty.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
            alt={course.faculty.name}
            className="w-10 h-10 rounded-full object-cover border border-outline-variant/30 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-on-surface truncate">
              {course.faculty.name}
            </div>
            <div className="text-[11px] text-outline truncate">
              {course.faculty.designation}
            </div>
          </div>
        </div>

        {/* 4-Item Production Metric Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-xl px-3 text-center mb-4 border border-outline-variant/20">
          <div>
            <div className="text-xs font-bold text-on-surface font-mono">
              {course.metrics.lectures}+
            </div>
            <div className="text-[10px] text-outline uppercase font-semibold">Lessons</div>
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface font-mono">
              {course.metrics.milestones}
            </div>
            <div className="text-[10px] text-outline uppercase font-semibold">Tests</div>
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface font-mono">
              {course.metrics.accessMonths} Mo
            </div>
            <div className="text-[10px] text-outline uppercase font-semibold">Access</div>
          </div>
        </div>

        {/* Feature bullets */}
        <ul className="space-y-1.5 mb-2 text-[11px] text-on-surface-variant">
          {course.features.slice(0, 3).map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer: Pricing & Actions */}
      <div className="px-6 sm:px-8 pb-6 pt-4 bg-surface-container-low/40 border-t border-outline-variant/30 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
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
        <div className="flex items-center gap-2">
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(course)}
              className="px-3 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-xs font-semibold text-on-surface border border-outline-variant/30 transition-colors shadow-xs"
            >
              View Course
            </button>
          )}
          <button
            type="button"
            onClick={() => onEnrol(course.id)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-xs font-semibold text-on-primary transition-colors duration-150 shadow-xs"
          >
            <span>Enrol</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
