import React, { useState, useEffect } from 'react';
import {
  CourseOverviewDetail,
  CourseLesson,
  CourseAssignment,
  StudentNavSection,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';

interface StudentCourseOverviewScreenProps {
  courseId: string;
  scenario?: 'active' | 'new';
  onBackToCourses: () => void;
  onNavigateSection?: (section: StudentNavSection) => void;
  onNavigateLessonList?: () => void;
  onNavigateLiveClasses?: (courseId: string) => void;
  onNavigateAssignments?: (courseId: string) => void;
  onNavigateDPPs?: (courseId: string) => void;
  onStartLesson?: (lesson: CourseLesson) => void;
  onToast?: (message: string) => void;
}

export const StudentCourseOverviewScreen: React.FC<StudentCourseOverviewScreenProps> = ({
  courseId,
  scenario = 'active',
  onBackToCourses,
  onNavigateSection,
  onNavigateLessonList,
  onNavigateLiveClasses,
  onNavigateAssignments,
  onNavigateDPPs,
  onStartLesson,
  onToast,
}) => {
  const [data, setData] = useState<CourseOverviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Section-level errors for granular resilience (Scenario 11)
  const [sectionErrors, setSectionErrors] = useState<{
    content?: string | null;
    assignments?: string | null;
    dpps?: string | null;
    tests?: string | null;
    resources?: string | null;
  }>({});

  // Accordion state: map of moduleId -> boolean (default module 1 & active module open)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Active lesson preview modal state
  const [activeLessonModal, setActiveLessonModal] = useState<CourseLesson | null>(null);
  const [activeAssignmentModal, setActiveAssignmentModal] = useState<CourseAssignment | null>(null);

  const handleRetrySection = async (sectionKey: 'content' | 'assignments' | 'dpps' | 'tests' | 'resources') => {
    setSectionErrors((prev) => ({ ...prev, [sectionKey]: null }));
    try {
      const result = await studentService.getCourseOverview(courseId, { scenario, simulateDelayMs: 250 });
      if (result) {
        setData(result);
        if (onToast) onToast(`${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} reloaded successfully.`);
      }
    } catch (_err) {
      setSectionErrors((prev) => ({ ...prev, [sectionKey]: `Failed to reload ${sectionKey}. Please try again.` }));
    }
  };

  const fetchCourseData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await studentService.getCourseOverview(courseId, {
        scenario,
        simulateDelayMs: 300,
      });
      if (!result) {
        setError('This course is not accessible under your current student enrollment.');
      } else {
        setData(result);
        // Expand the first module and any module containing an in-progress lesson
        const initialExpanded: Record<string, boolean> = {};
        result.modules.forEach((mod, idx) => {
          const hasInProgress = mod.lessons.some((l) => l.status === 'IN_PROGRESS');
          initialExpanded[mod.id] = idx === 0 || hasInProgress;
        });
        setExpandedModules(initialExpanded);
      }
    } catch (_err) {
      setError('Unable to load course content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId, scenario]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Find the current lesson to continue or start
  const currentLearningPoint = React.useMemo(() => {
    if (!data) return null;
    for (const mod of data.modules) {
      const inProg = mod.lessons.find((l) => l.status === 'IN_PROGRESS');
      if (inProg) return { module: mod, lesson: inProg };
    }
    for (const mod of data.modules) {
      const avail = mod.lessons.find((l) => l.status === 'AVAILABLE');
      if (avail) return { module: mod, lesson: avail };
    }
    // If all completed, return first lesson for review
    if (data.modules[0]?.lessons[0]) {
      return { module: data.modules[0], lesson: data.modules[0].lessons[0] };
    }
    return null;
  }, [data]);

  const handleLessonClick = (lesson: CourseLesson) => {
    if (lesson.isLocked) {
      if (onToast) {
        onToast(lesson.unlockReason || 'This lesson is currently locked.');
      }
      return;
    }
    if (onStartLesson) {
      onStartLesson(lesson);
    } else {
      setActiveLessonModal(lesson);
    }
  };

  const handleContinueLearning = () => {
    if (!currentLearningPoint) return;
    handleLessonClick(currentLearningPoint.lesson);
  };

  // ========================================================
  // LOADING STATE
  // ========================================================
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-48 mb-4" />

        {/* Course Header Skeleton */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2.5 w-2/3">
              <div className="h-3 bg-slate-200 rounded w-32" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>
            <div className="h-10 bg-slate-200 rounded-lg w-36" />
          </div>
          <div className="h-2 bg-slate-200 rounded-full w-full mt-4" />
        </div>

        {/* Continue Learning Skeleton */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card h-32" />

        {/* Modules Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-20 bg-white rounded-xl border border-[#E2E8F0]" />
            <div className="h-20 bg-white rounded-xl border border-[#E2E8F0]" />
            <div className="h-20 bg-white rounded-xl border border-[#E2E8F0]" />
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-white rounded-xl border border-[#E2E8F0]" />
            <div className="h-48 bg-white rounded-xl border border-[#E2E8F0]" />
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // ERROR & UNAUTHORIZED / NOT FOUND STATE
  // ========================================================
  if (error || !data) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
          <span className="material-symbols-outlined text-[32px]">lock</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#12365A] mb-2">
          {error?.includes('not accessible') ? 'Course Access Restricted' : 'Unable to Load Course'}
        </h2>
        <p className="text-sm text-[#64748B] max-w-md mx-auto mb-6">
          {error || 'This course is outside your authenticated student entitlement or does not exist.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onBackToCourses}
            className="px-5 py-2.5 rounded-lg bg-[#12365A] hover:bg-[#0E2C4A] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to My Courses</span>
          </button>
          {!error?.includes('not accessible') && (
            <button
              onClick={fetchCourseData}
              className="px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const { course, modules, assignments, dpps, practiceTopic, tests, resources } = data;
  const isCompleted = course.accessStatus === 'COMPLETED' || course.progressPercent >= 100;
  const isExpired = course.accessStatus === 'EXPIRED';
  const isExpiringSoon = course.accessStatus === 'EXPIRING_SOON' || (course.expiresInDays !== undefined && course.expiresInDays <= 14);
  const isNotStarted = course.progressPercent === 0;

  // Resolve Header CTA Label & Icon
  const getHeaderCta = () => {
    if (isExpired) return { label: 'Course Expired', icon: 'lock_clock', disabled: true, variant: 'tertiary' as const };
    if (isCompleted) return { label: 'Review Course', icon: 'history_edu', disabled: false, variant: 'secondary' as const };
    if (isNotStarted) return { label: 'Start Learning', icon: 'play_arrow', disabled: false, variant: 'primary' as const };
    return { label: 'Continue Learning', icon: 'play_circle', disabled: false, variant: 'primary' as const };
  };

  const headerCta = getHeaderCta();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* ======================================================== */}
      {/* 1. BREADCRUMB: My Courses / [Course Name]                 */}
      {/* ======================================================== */}
      <Breadcrumb
        items={[
          { label: 'My Courses', onClick: onBackToCourses },
          { label: course.title, isCurrent: true },
        ]}
      />

      {/* ======================================================== */}
      {/* 2. COURSE HEADER                                         */}
      {/* ======================================================== */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 lg:p-8 shadow-card relative overflow-hidden">
        {/* Subtle top accent border based on subject or status */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: course.subjectColor || '#00A8F0' }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Metadata Chips: Subject, Exam, Status */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
                {course.subject}
              </span>
              {course.examinationName && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                  {course.examinationName}
                </span>
              )}
              {/* Semantic Status Badge */}
              {isExpired ? (
                <Badge variant="red" size="sm" icon="lock">
                  Expired
                </Badge>
              ) : isCompleted ? (
                <Badge variant="green" size="sm" icon="check_circle">
                  Completed
                </Badge>
              ) : isExpiringSoon ? (
                <Badge variant="yellow" size="sm" icon="warning">
                  Expires in {course.expiresInDays || 7} days
                </Badge>
              ) : (
                <Badge variant="blue" size="sm" icon="bolt">
                  Active Enrolled
                </Badge>
              )}
            </div>

            {/* Course Name */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#12365A] tracking-tight leading-tight">
              {course.title}
            </h1>

            {/* Faculty & Validity Information */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#64748B]">
              {course.facultyName && (
                <div className="flex items-center gap-2">
                  {course.facultyAvatar ? (
                    <img
                      src={course.facultyAvatar}
                      alt={course.facultyName}
                      className="w-5 h-5 rounded-full object-cover border border-[#E2E8F0]"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                      person
                    </span>
                  )}
                  <span>
                    Faculty: <strong className="text-[#12365A] font-semibold">{course.facultyName}</strong>
                    {course.facultyDesignation && ` (${course.facultyDesignation})`}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#64748B]">
                  event_available
                </span>
                <span>
                  Validity:{' '}
                  <strong
                    className={`font-semibold ${
                      isExpired
                        ? 'text-red-600'
                        : isExpiringSoon
                        ? 'text-amber-700'
                        : 'text-[#12365A]'
                    }`}
                  >
                    {course.validUntil}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 shrink-0">
            <button
              type="button"
              disabled={headerCta.disabled}
              onClick={handleContinueLearning}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold transition-all duration-150 inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                headerCta.disabled
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : headerCta.variant === 'secondary'
                  ? 'bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] border border-[#BAE6FD]'
                  : 'bg-[#00A8F0] hover:bg-[#0092D1] text-white shadow-card'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{headerCta.icon}</span>
              <span>{headerCta.label}</span>
            </button>

            {onNavigateLiveClasses && (
              <button
                type="button"
                onClick={() => onNavigateLiveClasses(course.id)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#F8FAFC] text-[#12365A] border border-[#E2E8F0] shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">live_tv</span>
                <span>Live Classes</span>
              </button>
            )}
          </div>
        </div>

        {/* Overall Course Progress */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#12365A] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                trending_up
              </span>
              Overall Course Progress
            </span>
            <span className="text-[#64748B]">
              <strong className="text-[#12365A] font-bold">{course.progressPercent}%</strong> ({course.completedLessons} of {course.totalLessons} lessons completed)
            </span>
          </div>
          <ProgressBar
            value={course.progressPercent}
            color={isCompleted ? 'green' : 'blue'}
            height="md"
            showPercent={false}
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CONTINUE LEARNING BANNER (Prominent Action Anchor)    */}
      {/* ======================================================== */}
      {currentLearningPoint && !isExpired && (
        <section className="bg-gradient-to-r from-[#12365A] to-[#1E4E7A] text-white rounded-xl p-5 sm:p-6 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00A8F0] text-white">
                {isCompleted ? 'Course Completed' : isNotStarted ? 'Course Not Started' : 'Current Learning Point'}
              </span>
              <span className="text-xs text-white/80">
                {currentLearningPoint.module.title}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">
                {isCompleted ? 'verified' : 'play_circle'}
              </span>
              {currentLearningPoint.lesson.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {currentLearningPoint.lesson.duration}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">category</span>
                {currentLearningPoint.lesson.type === 'video' ? 'Video Lecture' : 'Interactive Practice'}
              </span>
              {currentLearningPoint.lesson.progressPercent !== undefined && currentLearningPoint.lesson.progressPercent > 0 && (
                <span className="text-[#35C978] font-semibold">
                  {currentLearningPoint.lesson.progressPercent}% completed
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinueLearning}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-card transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCompleted ? 'history_edu' : isNotStarted ? 'play_arrow' : 'play_circle'}
            </span>
            <span>
              {isCompleted ? 'Review Course' : isNotStarted ? 'Start Learning' : 'Continue Learning'}
            </span>
          </button>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. MAIN CONTENT AREA (2-Column Responsive Layout)         */}
      {/* Primary: Course Content (Modules & Lessons)              */}
      {/* Secondary: Course Activities & Resources                 */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ====================================================== */}
        {/* LEFT COLUMN (2 Cols): COURSE CONTENT (Modules & Lessons)*/}
        {/* ====================================================== */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#12365A]">
                Course Content
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                {modules.length} Modules · {course.totalLessons} Lessons
              </p>
            </div>

            <div className="flex items-center gap-4">
              {onNavigateLessonList && (
                <button
                  type="button"
                  onClick={onNavigateLessonList}
                  className="text-xs font-semibold text-[#00A8F0] hover:text-[#0092D1] flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Lesson List</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const allExpanded = Object.values(expandedModules).every(Boolean);
                  const nextState: Record<string, boolean> = {};
                  modules.forEach((m) => {
                    nextState[m.id] = !allExpanded;
                  });
                  setExpandedModules(nextState);
                }}
                className="text-xs font-medium text-[#64748B] hover:text-[#12365A] cursor-pointer"
              >
                {Object.values(expandedModules).every(Boolean) ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </div>

          {sectionErrors.content ? (
            <div className="bg-white rounded-xl border border-red-200 p-8 text-center shadow-card space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[24px]">error</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#12365A]">
                Unable to Load Course Content
              </h4>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                {sectionErrors.content}
              </p>
              <button
                type="button"
                onClick={() => handleRetrySection('content')}
                className="px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Retry</span>
              </button>
            </div>
          ) : modules.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center text-xs text-[#64748B]">
              No course content available yet.
            </div>
          ) : (
            modules.map((module) => {
              const isExpanded = !!expandedModules[module.id];
              const isModCompleted = module.completedLessons === module.totalLessons && module.totalLessons > 0;

              return (
                <div
                  key={module.id}
                  className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-card transition-all"
                >
                  {/* Module Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 sm:p-5 flex items-start justify-between text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A8F0]">
                          Module {module.moduleNumber < 10 ? `0${module.moduleNumber}` : module.moduleNumber}
                        </span>
                        {isModCompleted ? (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#35C978]/15 text-[#15803D] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">check</span>
                            Completed
                          </span>
                        ) : module.isLocked ? (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-slate-100 text-[#64748B] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">lock</span>
                            Locked
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-[#12365A]">
                        {module.title}
                      </h3>

                      {module.description && (
                        <p className="text-xs text-[#64748B] line-clamp-1">
                          {module.description}
                        </p>
                      )}

                      {/* Module Progress text */}
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-[11px] font-medium text-[#64748B]">
                          {module.completedLessons} / {module.totalLessons} lessons completed
                        </span>
                        {module.totalLessons > 0 && (
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${isModCompleted ? 'bg-[#35C978]' : 'bg-[#00A8F0]'}`}
                              style={{
                                width: `${Math.round((module.completedLessons / module.totalLessons) * 100)}%`,
                              }}
                            />
                          </div>
                        )}
                        {module.unlockReason && (
                          <span className="text-[11px] text-amber-700 italic flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">info</span>
                            {module.unlockReason}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`material-symbols-outlined text-[20px] text-[#64748B] transition-transform duration-200 shrink-0 mt-1 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Module Lessons List (Collapsible Body) */}
                  {isExpanded && (
                    <div className="border-t border-[#E2E8F0] divide-y divide-[#F1F5F9] bg-[#FAFCFE]">
                      {module.lessons.map((lesson) => {
                        const isLesCompleted = lesson.status === 'COMPLETED';
                        const isLesInProgress = lesson.status === 'IN_PROGRESS';
                        const isLesLocked = lesson.isLocked || lesson.status === 'LOCKED';

                        return (
                          <div
                            key={lesson.id}
                            className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                              isLesInProgress
                                ? 'bg-[#E0F4FD]/40'
                                : isLesLocked
                                ? 'opacity-70 bg-slate-50'
                                : 'hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Status Icon Indicator */}
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-semibold ${
                                  isLesCompleted
                                    ? 'bg-[#35C978]/15 text-[#15803D]'
                                    : isLesInProgress
                                    ? 'bg-[#00A8F0] text-white shadow-xs'
                                    : isLesLocked
                                    ? 'bg-slate-200 text-slate-500'
                                    : 'bg-[#E0F4FD] text-[#00A8F0]'
                                }`}
                              >
                                {isLesCompleted ? (
                                  <span className="material-symbols-outlined text-[18px]">check</span>
                                ) : isLesInProgress ? (
                                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                                ) : isLesLocked ? (
                                  <span className="material-symbols-outlined text-[16px]">lock</span>
                                ) : (
                                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                                )}
                              </div>

                              {/* Lesson Details */}
                              <div className="min-w-0 space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xs sm:text-sm font-semibold text-[#12365A] truncate">
                                    {lesson.title}
                                  </h4>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#64748B]">
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[13px]">
                                      {lesson.type === 'video' ? 'videocam' : 'quiz'}
                                    </span>
                                    {lesson.duration}
                                  </span>
                                  {isLesCompleted && (
                                    <span className="text-[#15803D] font-medium flex items-center gap-0.5">
                                      <span className="material-symbols-outlined text-[12px]">check_circle</span>
                                      Completed
                                    </span>
                                  )}
                                  {isLesInProgress && (
                                    <span className="text-[#00A8F0] font-semibold">
                                      In Progress ({lesson.progressPercent || 70}%)
                                    </span>
                                  )}
                                  {isLesLocked && lesson.unlockReason && (
                                    <span className="text-amber-700 italic">
                                      {lesson.unlockReason}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              type="button"
                              onClick={() => handleLessonClick(lesson)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                                isLesLocked
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  : isLesInProgress
                                  ? 'bg-[#00A8F0] hover:bg-[#0092D1] text-white shadow-xs'
                                  : isLesCompleted
                                  ? 'bg-white hover:bg-[#F1F5F9] text-[#12365A] border border-[#E2E8F0]'
                                  : 'bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0]'
                              }`}
                              disabled={isLesLocked}
                            >
                              {isLesLocked
                                ? 'Locked'
                                : isLesInProgress
                                ? 'Resume'
                                : isLesCompleted
                                ? 'Rewatch'
                                : 'Start'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN (1 Col): ACTIVITIES & RESOURCES PREVIEW   */}
        {/* ====================================================== */}
        <div className="space-y-6">
          {/* 1. ASSIGNMENTS */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#12365A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#F6C20F]">
                  assignment
                </span>
                Assignments
              </h3>
              {onNavigateAssignments ? (
                <button
                  type="button"
                  onClick={() => onNavigateAssignments(course.id)}
                  className="text-xs font-semibold text-[#00A8F0] hover:underline cursor-pointer"
                >
                  View All ({assignments.length})
                </button>
              ) : (
                <span className="text-[11px] font-semibold text-[#64748B]">
                  {assignments.length} Total
                </span>
              )}
            </div>

            {sectionErrors.assignments ? (
              <div className="p-3.5 rounded-lg border border-red-200 bg-red-50/50 text-center space-y-1.5">
                <p className="text-xs text-red-700 font-medium">{sectionErrors.assignments}</p>
                <button
                  type="button"
                  onClick={() => handleRetrySection('assignments')}
                  className="text-xs font-semibold text-[#00A8F0] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                  <span>Retry</span>
                </button>
              </div>
            ) : assignments.length === 0 ? (
              <p className="text-xs text-[#64748B] py-3 text-center">
                No assignments for this course.
              </p>
            ) : (
              <div className="space-y-2.5">
                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#12365A] leading-tight line-clamp-2">
                        {asg.title}
                      </h4>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                          asg.status === 'GRADED'
                            ? 'bg-[#35C978]/15 text-[#15803D]'
                            : asg.status === 'SUBMITTED'
                            ? 'bg-[#E0F4FD] text-[#00A8F0]'
                            : 'bg-[#F6C20F]/20 text-[#854D0E]'
                        }`}
                      >
                        {asg.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                      <span>Due: {asg.dueDate}</span>
                      <button
                        type="button"
                        onClick={() => setActiveAssignmentModal(asg)}
                        className="text-[#00A8F0] font-semibold hover:underline cursor-pointer"
                      >
                        View Assignment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. DAILY PRACTICE PROBLEMS (DPP) */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#12365A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#35C978]">
                  fact_check
                </span>
                Daily Practice Problems (DPP)
              </h3>
              {onNavigateDPPs ? (
                <button
                  type="button"
                  onClick={() => onNavigateDPPs(course.id)}
                  className="text-xs font-semibold text-[#00A8F0] hover:underline cursor-pointer"
                >
                  View All ({dpps.length})
                </button>
              ) : (
                <span className="text-[11px] font-semibold text-[#64748B]">
                  {dpps.length} Total
                </span>
              )}
            </div>

            {dpps.length === 0 ? (
              <p className="text-xs text-[#64748B] py-3 text-center">
                No DPPs available.
              </p>
            ) : (
              <div className="space-y-2.5">
                {dpps.map((dpp) => (
                  <div
                    key={dpp.id}
                    className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-semibold text-[#12365A] truncate">
                        {dpp.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                        <span>{dpp.date}</span>
                        {dpp.score && (
                          <span className="text-[#35C978] font-bold">
                            Score: {dpp.score}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigateDPPs) {
                          onNavigateDPPs(course.id);
                        } else if (onNavigateSection) {
                          onNavigateSection('practice');
                        }
                      }}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] shrink-0 cursor-pointer"
                    >
                      {dpp.status === 'NOT_ATTEMPTED' ? 'Start DPP' : 'Review'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. PRACTICE ARENA ENTRY POINT */}
          {practiceTopic && (
            <div className="bg-[#6C63D9]/5 border border-[#6C63D9]/20 rounded-xl p-5 space-y-3 shadow-card">
              <div className="flex items-center gap-2 text-[#6C63D9]">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
                <h3 className="font-serif text-base font-bold text-[#12365A]">
                  Course Practice Arena
                </h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {practiceTopic.description}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-[#6C63D9]">
                  {practiceTopic.questionCount} Questions Available
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateSection) onNavigateSection('practice');
                    if (onToast) onToast(`Launching practice arena for ${course.subject}`);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#6C63D9] hover:bg-[#5B52C7] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Start Practice
                </button>
              </div>
            </div>
          )}

          {/* 4. TESTS LINKED TO COURSE */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#12365A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#6C63D9]">
                  quiz
                </span>
                Course Tests
              </h3>
              <span className="text-[11px] font-semibold text-[#64748B]">
                {tests.length} Scheduled
              </span>
            </div>

            {tests.length === 0 ? (
              <p className="text-xs text-[#64748B] py-3 text-center">
                No tests scheduled for this course.
              </p>
            ) : (
              <div className="space-y-2.5">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#12365A] leading-tight">
                        {test.title}
                      </h4>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                          test.status === 'COMPLETED'
                            ? 'bg-[#35C978]/15 text-[#15803D]'
                            : test.status === 'ACTIVE'
                            ? 'bg-[#00A8F0] text-white'
                            : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}
                      >
                        {test.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                      <span>{test.duration} · {test.date}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateSection) onNavigateSection('tests');
                          if (onToast) onToast(`Navigating to test: ${test.title}`);
                        }}
                        className="text-[#00A8F0] font-semibold hover:underline cursor-pointer"
                      >
                        {test.status === 'ACTIVE' ? 'Take Test' : 'View Test'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. COURSE RESOURCES PREVIEW */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#12365A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  folder_open
                </span>
                Course Resources
              </h3>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateSection) onNavigateSection('resources');
                }}
                className="text-xs font-semibold text-[#00A8F0] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            {sectionErrors.resources ? (
              <div className="p-3.5 rounded-lg border border-red-200 bg-red-50/50 text-center space-y-1.5">
                <p className="text-xs text-red-700 font-medium">{sectionErrors.resources}</p>
                <button
                  type="button"
                  onClick={() => handleRetrySection('resources')}
                  className="text-xs font-semibold text-[#00A8F0] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                  <span>Retry</span>
                </button>
              </div>
            ) : resources.length === 0 ? (
              <p className="text-xs text-[#64748B] py-3 text-center">
                No resources available for this course.
              </p>
            ) : (
              <div className="space-y-2">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-2 hover:bg-[#F1F5F9] transition-colors"
                  >
                    <div className="min-w-0 flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-[#DC3545] shrink-0">
                        picture_as_pdf
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#12365A] truncate">
                          {res.title}
                        </p>
                        <p className="text-[10px] text-[#64748B]">
                          {res.type} {res.fileSize && `· ${res.fileSize}`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onToast) onToast(`Downloading: ${res.title}`);
                      }}
                      className="p-1 rounded text-[#64748B] hover:text-[#00A8F0] transition-colors cursor-pointer shrink-0"
                      aria-label="Download resource"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE LESSON PREVIEW MODAL                       */}
      {/* ======================================================== */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A8F0]">
                  Lesson {activeLessonModal.lessonNumber} · {activeLessonModal.type === 'video' ? 'Video Lecture' : 'Practice Workshop'}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#12365A] mt-1">
                  {activeLessonModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLessonModal(null)}
                className="text-[#94A3B8] hover:text-[#12365A] p-1 cursor-pointer"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Video Player Mock Placeholder */}
            <div className="w-full aspect-video bg-[#12365A] rounded-xl flex flex-col items-center justify-center text-white p-6 relative overflow-hidden group">
              <div className="w-16 h-16 rounded-full bg-[#00A8F0]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
              </div>
              <p className="text-xs text-white/70 mt-3 font-medium">
                Lecture Duration: {activeLessonModal.duration} · High Definition 1080p
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
              <span>Status: <strong className="text-[#12365A]">{activeLessonModal.status}</strong></span>
              <button
                type="button"
                onClick={() => {
                  if (onToast) onToast(`Marking lesson ${activeLessonModal.lessonNumber} as completed`);
                  setActiveLessonModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#35C978] hover:bg-[#2EB86B] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Mark Lesson Complete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. ASSIGNMENT DETAILS MODAL                              */}
      {/* ======================================================== */}
      {activeAssignmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F6C20F]">
                  Course Assignment
                </span>
                <h3 className="font-serif text-lg font-bold text-[#12365A] mt-1">
                  {activeAssignmentModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveAssignmentModal(null)}
                className="text-[#94A3B8] hover:text-[#12365A] p-1 cursor-pointer"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Due Date:</span>
                <span className="font-semibold text-[#12365A]">{activeAssignmentModal.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Maximum Marks:</span>
                <span className="font-semibold text-[#12365A]">{activeAssignmentModal.maxMarks || 50} Marks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Submission Status:</span>
                <span className="font-semibold text-[#00A8F0]">{activeAssignmentModal.submissionStatus || activeAssignmentModal.status}</span>
              </div>
              {activeAssignmentModal.obtainedMarks !== undefined && (
                <div className="flex justify-between pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B]">Obtained Score:</span>
                  <span className="font-bold text-[#35C978]">{activeAssignmentModal.obtainedMarks} / {activeAssignmentModal.maxMarks}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveAssignmentModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#12365A] text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onToast) onToast(`Submission portal for ${activeAssignmentModal.title} ready.`);
                  setActiveAssignmentModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Submit Assignment PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourseOverviewScreen;
