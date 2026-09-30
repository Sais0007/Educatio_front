import React from 'react';
import { CatalogCourse } from '../../types';

interface CourseDetailModalProps {
  course: CatalogCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onEnrol: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnrol,
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-elevated border border-outline-variant/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Course Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-surface-container text-primary text-xs font-bold uppercase tracking-wider">
              {course.badge}
            </span>
            <span className="text-xs text-outline">{course.batchName}</span>
          </div>
          <h2 className="font-serif text-2xl text-on-surface font-normal leading-snug">
            {course.title}
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        {/* Faculty Block */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 mb-6">
          <img
            src={course.faculty.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
            alt={course.faculty.name}
            className="w-12 h-12 rounded-full object-cover border border-outline-variant/30 shrink-0"
          />
          <div>
            <div className="text-sm font-bold text-on-surface">{course.faculty.name}</div>
            <div className="text-xs text-outline">{course.faculty.designation}</div>
          </div>
        </div>

        {/* Inclusions Metrics */}
        <div className="grid grid-cols-4 gap-3 text-center mb-6">
          <div className="p-3 bg-surface-bright rounded-xl border border-outline-variant/20">
            <div className="font-mono text-base font-bold text-on-surface">{course.metrics.lectures}+</div>
            <div className="text-[10px] text-outline uppercase font-semibold">Lessons</div>
          </div>
          <div className="p-3 bg-surface-bright rounded-xl border border-outline-variant/20">
            <div className="font-mono text-base font-bold text-on-surface">{course.metrics.dpps} Sets</div>
            <div className="text-[10px] text-outline uppercase font-semibold">DPPs</div>
          </div>
          <div className="p-3 bg-surface-bright rounded-xl border border-outline-variant/20">
            <div className="font-mono text-base font-bold text-on-surface">{course.metrics.milestones}</div>
            <div className="text-[10px] text-outline uppercase font-semibold">Tests</div>
          </div>
          <div className="p-3 bg-surface-bright rounded-xl border border-outline-variant/20">
            <div className="font-mono text-base font-bold text-on-surface">{course.metrics.accessMonths} Mo</div>
            <div className="text-[10px] text-outline uppercase font-semibold">Validity</div>
          </div>
        </div>

        {/* Curriculum Outline */}
        <div className="space-y-3 mb-8">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Curriculum Architecture &amp; Milestone Chapters
          </h4>
          <div className="space-y-2">
            {course.curriculumOverview?.sampleChapters.map((ch, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50 border border-outline-variant/20 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-surface-container text-primary flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="font-medium text-on-surface">{ch}</span>
                </div>
                <span className="text-[11px] text-outline font-mono">Derivation &amp; DPP Track</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
              Full Tuition (All Inclusive)
            </span>
            <span className="font-serif text-2xl font-bold text-on-surface">
              ₹{course.pricing.amount.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-outline font-normal font-sans">{course.pricing.period}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEnrol(course.id);
            }}
            className="px-6 py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-sm transition-all"
          >
            Enrol in Program &rarr;
          </button>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
