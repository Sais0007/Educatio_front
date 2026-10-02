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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-[#64748B] hover:text-[#12365A] hover:bg-[#F5F8FC] transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Course Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-[#00A8F0] text-xs font-semibold uppercase tracking-wider border border-[#00A8F0]/20">
              {course.badge}
            </span>
            <span className="text-xs text-[#64748B]">{course.batchName}</span>
          </div>
          <h2 className="font-serif text-2xl text-[#12365A] font-bold leading-snug">
            {course.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed font-sans">
            {course.subtitle}
          </p>
        </div>

        {/* Faculty Block */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] mb-6">
          <img
            src={course.faculty.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
            alt={course.faculty.name}
            className="w-12 h-12 rounded-full object-cover border border-[#E2E8F0] shrink-0"
          />
          <div>
            <div className="text-sm font-bold text-[#12365A]">{course.faculty.name}</div>
            <div className="text-xs text-[#64748B]">{course.faculty.designation}</div>
          </div>
        </div>

        {/* Inclusions Metrics */}
        <div className="grid grid-cols-4 gap-3 text-center mb-6">
          <div className="p-3 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0]">
            <div className="font-mono text-base font-bold text-[#12365A]">{course.metrics.lectures}+</div>
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">Lessons</div>
          </div>
          <div className="p-3 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0]">
            <div className="font-mono text-base font-bold text-[#12365A]">{course.metrics.dpps} Sets</div>
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">DPPs</div>
          </div>
          <div className="p-3 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0]">
            <div className="font-mono text-base font-bold text-[#12365A]">{course.metrics.milestones}</div>
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">Tests</div>
          </div>
          <div className="p-3 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0]">
            <div className="font-mono text-base font-bold text-[#12365A]">{course.metrics.accessMonths} Mo</div>
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">Validity</div>
          </div>
        </div>

        {/* Curriculum Outline */}
        <div className="space-y-3 mb-8">
          <h4 className="text-xs font-bold text-[#12365A] uppercase tracking-wider">
            Curriculum Architecture &amp; Milestone Chapters
          </h4>
          <div className="space-y-2">
            {course.curriculumOverview?.sampleChapters.map((ch, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white text-[#00A8F0] border border-[#00A8F0]/30 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="font-medium text-[#12365A]">{ch}</span>
                </div>
                <span className="text-[11px] text-[#64748B] font-mono">Derivation &amp; DPP Track</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
              Full Tuition (All Inclusive)
            </span>
            <span className="font-serif text-2xl font-bold text-[#12365A]">
              ₹{course.pricing.amount.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-[#64748B] font-normal font-sans">{course.pricing.period}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEnrol(course.id);
            }}
            className="px-6 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Enrol in Program &rarr;
          </button>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default CourseDetailModal;
