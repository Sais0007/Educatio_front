import React from 'react';
import { StudentEnrolledCourse } from '../../types/student';
import { ProgressBar } from '../common/ProgressBar';

interface StudentCourseCardProps {
  course: StudentEnrolledCourse;
  onViewCourse: (courseId: string) => void;
  onResumeCourse?: (courseId: string, lessonId?: string) => void;
}

export const StudentCourseCard: React.FC<StudentCourseCardProps> = ({
  course,
  onViewCourse,
  onResumeCourse,
}) => {
  const isCompleted = course.accessStatus === 'COMPLETED' || course.progressPercent >= 100;
  const isExpired = course.accessStatus === 'EXPIRED';
  const isExpiringSoon = course.accessStatus === 'EXPIRING_SOON' || (course.expiresInDays !== undefined && course.expiresInDays <= 14);
  const isNotStarted = course.progressPercent === 0;

  // Resolve CTA label and icon based on authoritative course state
  const getCtaConfig = () => {
    if (isExpired) {
      return {
        label: 'View Course',
        icon: 'lock_clock',
        variant: 'tertiary' as const,
      };
    }
    if (isCompleted) {
      return {
        label: 'Review Course',
        icon: 'history_edu',
        variant: 'secondary' as const,
      };
    }
    if (isNotStarted) {
      return {
        label: 'Start Learning',
        icon: 'play_arrow',
        variant: 'primary' as const,
      };
    }
    return {
      label: 'Continue Learning',
      icon: 'play_circle',
      variant: 'primary' as const,
    };
  };

  const ctaConfig = getCtaConfig();

  // Handle primary action button click
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isExpired || isCompleted) {
      onViewCourse(course.id);
    } else if (onResumeCourse) {
      onResumeCourse(course.id, course.currentLesson?.id);
    } else {
      onViewCourse(course.id);
    }
  };

  // Card header / thumbnail fallback placeholder
  const thumbnail =
    course.thumbnailUrl ||
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80';

  return (
    <article
      className={`bg-white rounded-xl overflow-hidden border transition-all duration-200 flex flex-col justify-between group text-left ${
        isExpired
          ? 'border-slate-300 opacity-90 shadow-xs'
          : isExpiringSoon
          ? 'border-[#F6C20F]/60 shadow-card hover:border-[#F6C20F] hover:shadow-dropdown'
          : 'border-[#E2E8F0] shadow-card hover:border-[#00A8F0] hover:shadow-dropdown'
      }`}
      aria-labelledby={`course-title-${course.id}`}
    >
      <div>
        {/* ======================================================== */}
        {/* 1. COURSE THUMBNAIL / VISUAL                             */}
        {/* ======================================================== */}
        <div
          onClick={() => onViewCourse(course.id)}
          className="relative w-full aspect-[16/9] sm:aspect-[16/8] bg-slate-100 overflow-hidden cursor-pointer"
        >
          <img
            src={thumbnail}
            alt={course.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isExpired ? 'grayscale-40 group-hover:scale-102' : 'group-hover:scale-105'
            }`}
            loading="lazy"
          />

          {/* Gradient Overlay for Scannability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12365A]/80 via-[#12365A]/20 to-transparent" />

          {/* Top Floating Status & Subject Chips */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#12365A] shadow-xs backdrop-blur-xs">
              {course.subject}
            </span>

            {/* Semantic Status Badge */}
            {isExpired ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 text-slate-200 shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">lock</span>
                <span>Expired</span>
              </span>
            ) : isCompleted ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#35C978] text-white shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                <span>Completed</span>
              </span>
            ) : isExpiringSoon ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F6C20F] text-[#12365A] shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">warning</span>
                <span>Expiring Soon</span>
              </span>
            ) : isNotStarted ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#00A8F0] text-white shadow-xs">
                Not Started
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#00A8F0] text-white shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">timelapse</span>
                <span>In Progress</span>
              </span>
            )}
          </div>

          {/* Bottom Floating Exam & Batch Tag */}
          <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white/90 text-[11px]">
            <span className="font-medium truncate drop-shadow-xs">
              {course.examinationName || course.batchName}
            </span>
            {course.lastActivityAt && !isNotStarted && (
              <span className="text-white/80 shrink-0 text-[10px] drop-shadow-xs">
                {course.lastActivityAt}
              </span>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. COURSE DETAILS & METADATA                             */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Course Name */}
          <div>
            <h3
              id={`course-title-${course.id}`}
              onClick={() => onViewCourse(course.id)}
              className="font-serif text-lg sm:text-xl font-bold text-[#12365A] group-hover:text-[#00A8F0] transition-colors leading-snug cursor-pointer line-clamp-2"
              title={course.title}
            >
              {course.title}
            </h3>

            {/* Faculty Information */}
            <div className="flex items-center gap-2 mt-2 text-xs text-[#64748B]">
              {course.facultyAvatar ? (
                <img
                  src={course.facultyAvatar}
                  alt={course.facultyName}
                  className="w-5 h-5 rounded-full object-cover shrink-0 border border-[#E2E8F0]"
                />
              ) : (
                <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                  person
                </span>
              )}
              <span className="truncate">
                <strong className="font-semibold text-[#12365A]">{course.facultyName}</strong>
                {course.facultyDesignation && (
                  <span className="text-slate-400"> &middot; {course.facultyDesignation}</span>
                )}
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. PROGRESS INDICATOR                                    */}
          {/* ======================================================== */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="text-[#64748B]">
                Progress ({course.completedLessons}/{course.totalLessons} Lessons)
              </span>
              <span
                className={`font-bold font-mono ${
                  isCompleted
                    ? 'text-[#35C978]'
                    : isExpired
                    ? 'text-slate-400'
                    : 'text-[#00A8F0]'
                }`}
              >
                {course.progressPercent}%
              </span>
            </div>

            <ProgressBar
              value={course.progressPercent}
              color={isCompleted ? 'green' : 'blue'}
              height="sm"
              showPercent={false}
            />
          </div>

          {/* ======================================================== */}
          {/* 4. CURRENT LEARNING ITEM                                 */}
          {/* ======================================================== */}
          <div
            className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 transition-colors ${
              isExpired
                ? 'bg-slate-50 border-slate-200 text-slate-500'
                : isCompleted
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-[#F5F8FC] border-[#E2E8F0] text-[#12365A]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] shrink-0 ${
                isCompleted
                  ? 'text-[#35C978]'
                  : isExpired
                  ? 'text-slate-400'
                  : 'text-[#00A8F0]'
              }`}
            >
              {isCompleted
                ? 'verified'
                : isExpired
                ? 'lock'
                : course.currentLesson?.type === 'practice'
                ? 'edit_note'
                : 'play_circle'}
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                {isCompleted ? 'Curriculum State' : isNotStarted ? 'Starting Module' : 'Continue Point'}
              </span>
              <span className="font-medium truncate block">
                {isCompleted
                  ? 'All syllabus units and milestone assessments completed'
                  : course.currentLesson?.title || 'Course Orientation & Structure'}
              </span>
            </div>
            {course.currentLesson?.duration && !isCompleted && !isExpired && (
              <span className="text-[11px] font-mono text-[#64748B] shrink-0">
                {course.currentLesson.duration}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. FOOTER: VALIDITY & PRIMARY ACTION                     */}
      {/* ======================================================== */}
      <div className="px-5 sm:px-6 py-4 bg-[#F5F8FC]/60 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Validity Display */}
        <div className="text-xs">
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
            Access Validity
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isExpiringSoon ? (
              <span className="font-semibold text-[#854D0E] flex items-center gap-1 bg-[#F6C20F]/20 px-2 py-0.5 rounded text-[11px]">
                <span className="material-symbols-outlined text-[13px]">alarm</span>
                <span>{course.expiresInDays ? `Expires in ${course.expiresInDays} days` : course.validUntil}</span>
              </span>
            ) : isExpired ? (
              <span className="font-medium text-slate-500 text-[11px]">
                {course.validUntil}
              </span>
            ) : (
              <span className="font-medium text-[#12365A] text-[11px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#35C978]">check_circle</span>
                <span>{course.validUntil}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleActionClick}
          className={`py-2 px-4 rounded-lg text-xs font-semibold shadow-xs transition-all duration-150 inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
            ctaConfig.variant === 'primary'
              ? 'bg-[#00A8F0] hover:bg-[#0092D1] text-white hover:shadow active:scale-[0.99]'
              : ctaConfig.variant === 'secondary'
              ? 'bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] border border-[#BAE6FD]'
              : 'bg-white hover:bg-slate-50 text-[#64748B] hover:text-[#12365A] border border-[#E2E8F0]'
          }`}
          aria-label={`${ctaConfig.label} for ${course.title}`}
        >
          <span>{ctaConfig.label}</span>
          <span className="material-symbols-outlined text-[16px]">{ctaConfig.icon}</span>
        </button>
      </div>
    </article>
  );
};

export default StudentCourseCard;
