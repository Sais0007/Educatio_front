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
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-dropdown transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] hover:border-[#00A8F0] group text-left">
      <div className="p-6 sm:p-7">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-[11px] font-bold uppercase tracking-wider border border-[#BAE6FD]">
            {course.badge}
          </span>
          <span className="text-xs text-[#64748B] font-medium">{course.batchName}</span>
        </div>

        {/* Course Title & Description */}
        <h3
          onClick={() => onViewDetails && onViewDetails(course)}
          className="font-serif text-lg sm:text-xl text-[#12365A] mb-3 leading-snug font-bold group-hover:text-[#00A8F0] transition-colors cursor-pointer"
        >
          {course.title}
        </h3>
        <p className="text-xs text-[#64748B] mb-5 line-clamp-3 leading-relaxed">
          {course.subtitle}
        </p>

        {/* Faculty Profile Card */}
        <div className="flex items-center gap-3.5 py-3 px-3.5 mb-5 bg-[#F5F8FC] rounded-lg border border-[#E2E8F0]">
          <img
            src={course.faculty.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
            alt={course.faculty.name}
            className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0] shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#12365A] truncate">
              {course.faculty.name}
            </div>
            <div className="text-[11px] text-[#64748B] truncate">
              {course.faculty.designation}
            </div>
          </div>
        </div>

        {/* 4-Item Production Metric Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 bg-[#F5F8FC] rounded-lg px-3 text-center mb-4 border border-[#E2E8F0]">
          <div>
            <div className="text-xs font-bold text-[#12365A] font-mono">
              {course.metrics.lectures}+
            </div>
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">Lessons</div>
          </div>
          <div>
            <div className="text-xs font-bold text-[#12365A] font-mono">
              {course.metrics.milestones}
            </div>
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">Tests</div>
          </div>
          <div>
            <div className="text-xs font-bold text-[#12365A] font-mono">
              {course.metrics.accessMonths} Mo
            </div>
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">Access</div>
          </div>
        </div>

        {/* Feature bullets */}
        <ul className="space-y-1.5 mb-2 text-[11px] text-[#64748B]">
          {course.features.slice(0, 3).map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A8F0] shrink-0" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer: Pricing & Actions */}
      <div className="px-6 sm:px-7 pb-6 pt-4 bg-[#F5F8FC]/50 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
            Tuition Fee
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-lg font-bold text-[#12365A]">
              ₹{course.pricing.amount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#64748B] font-normal">
              {course.pricing.period}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(course)}
              className="px-3 py-2 rounded-lg bg-white hover:bg-[#F5F8FC] text-xs font-semibold text-[#12365A] border border-[#E2E8F0] transition-colors shadow-card cursor-pointer"
            >
              View Course
            </button>
          )}
          <button
            type="button"
            onClick={() => onEnrol(course.id)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-xs font-semibold text-white transition-colors duration-150 shadow-card cursor-pointer"
          >
            <span>Enrol</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
