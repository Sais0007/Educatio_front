import React, { useState, useEffect, useMemo } from 'react';
import {
  CourseOverviewDetail,
  CourseLesson,
  StudentNavSection,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

interface StudentLessonListScreenProps {
  courseId: string;
  scenario?: 'active' | 'new';
  onBackToCourses: () => void;
  onBackToCourseOverview: () => void;
  onNavigateSection?: (section: StudentNavSection) => void;
  onSelectLesson?: (lesson: CourseLesson) => void;
  onToast?: (message: string) => void;
}

export const StudentLessonListScreen: React.FC<StudentLessonListScreenProps> = ({
  courseId,
  scenario = 'active',
  onBackToCourses,
  onBackToCourseOverview,
  onNavigateSection: _onNavigateSection,
  onSelectLesson,
  onToast,
}) => {
  const [data, setData] = useState<CourseOverviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search input state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Accordion state: map of moduleId -> boolean (default current module open)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Active lesson preview modal state (Video Learning layer)
  const [activeLessonModal, setActiveLessonModal] = useState<CourseLesson | null>(null);

  const fetchLessonData = async () => {
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
        // Expand the current module or module 1 by default
        const initialExpanded: Record<string, boolean> = {};
        let foundCurrent = false;
        result.modules.forEach((mod, idx) => {
          const hasInProgress = mod.lessons.some((l) => l.status === 'IN_PROGRESS');
          if (hasInProgress) {
            initialExpanded[mod.id] = true;
            foundCurrent = true;
          } else {
            initialExpanded[mod.id] = idx === 0 && !foundCurrent;
          }
        });
        setExpandedModules(initialExpanded);
      }
    } catch (_err) {
      setError("We couldn't load the lessons. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonData();
  }, [courseId, scenario]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Identify current learning focus
  const currentLearningFocus = useMemo(() => {
    if (!data) return null;
    // 1. Look for in-progress lesson
    for (const mod of data.modules) {
      const inProg = mod.lessons.find((l) => l.status === 'IN_PROGRESS');
      if (inProg) return { module: mod, lesson: inProg };
    }
    // 2. Look for first available lesson
    for (const mod of data.modules) {
      const avail = mod.lessons.find((l) => l.status === 'AVAILABLE');
      if (avail) return { module: mod, lesson: avail };
    }
    // 3. Fallback to first lesson
    if (data.modules[0]?.lessons[0]) {
      return { module: data.modules[0], lesson: data.modules[0].lessons[0] };
    }
    return null;
  }, [data]);

  // Current active module for compact progress summary
  const currentModule = useMemo(() => {
    if (!data) return null;
    return (
      data.modules.find((m) => m.lessons.some((l) => l.status === 'IN_PROGRESS')) ||
      data.modules.find((m) => m.completedLessons < m.totalLessons && !m.isLocked) ||
      data.modules[0] ||
      null
    );
  }, [data]);

  // Filter modules and lessons based on lightweight search
  const filteredModules = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data.modules;

    const q = searchQuery.toLowerCase().trim();
    return data.modules
      .map((mod) => {
        const matchingLessons = mod.lessons.filter((l) =>
          l.title.toLowerCase().includes(q)
        );
        return {
          ...mod,
          lessons: matchingLessons,
        };
      })
      .filter((mod) => mod.lessons.length > 0);
  }, [data, searchQuery]);

  const totalLessonsInFiltered = useMemo(() => {
    return filteredModules.reduce((acc, m) => acc + m.lessons.length, 0);
  }, [filteredModules]);

  const handleLessonClick = (lesson: CourseLesson) => {
    if (lesson.isLocked) {
      if (onToast) {
        onToast(lesson.unlockReason || 'This lesson is currently locked.');
      }
      return;
    }
    if (onSelectLesson) {
      onSelectLesson(lesson);
    } else {
      setActiveLessonModal(lesson);
    }
  };

  // ========================================================
  // 1. LOADING STATE (Layout-Accurate Skeletons)
  // ========================================================
  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-56 mb-4" />

        {/* Compact Header Skeleton */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-2/3">
              <div className="h-3 bg-slate-200 rounded w-32" />
              <div className="h-7 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
            <div className="h-9 bg-slate-200 rounded-lg w-32" />
          </div>
          <div className="h-2 bg-slate-200 rounded-full w-full mt-4" />
        </div>

        {/* Focus Banner Skeleton */}
        <div className="h-24 bg-white rounded-xl border border-[#E2E8F0]" />

        {/* Module Skeletons */}
        <div className="space-y-4">
          <div className="h-20 bg-white rounded-xl border border-[#E2E8F0]" />
          <div className="h-20 bg-white rounded-xl border border-[#E2E8F0]" />
          <div className="h-20 bg-white rounded-xl border border-[#E2E8F0]" />
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. ERROR & UNAUTHORIZED STATE
  // ========================================================
  if (error || !data) {
    const isRestricted = error?.includes('not accessible') || !data;
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
          <span className="material-symbols-outlined text-[32px]">
            {isRestricted ? 'lock' : 'error'}
          </span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#12365A] mb-2">
          {isRestricted ? 'Course Access Restricted' : "We couldn't load the lessons"}
        </h2>
        <p className="text-sm text-[#64748B] max-w-md mx-auto mb-6">
          {error || 'This course is outside your authenticated student entitlement.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToCourses}
            className="px-5 py-2.5 rounded-lg bg-[#12365A] hover:bg-[#0E2C4A] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to My Courses</span>
          </button>
          {!isRestricted && (
            <button
              type="button"
              onClick={fetchLessonData}
              className="px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const { course, modules } = data;
  const isCompleted = course.accessStatus === 'COMPLETED' || course.progressPercent >= 100;
  const isExpired = course.accessStatus === 'EXPIRED';
  const isExpiringSoon = course.accessStatus === 'EXPIRING_SOON';
  const isNotStarted = course.progressPercent === 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* ======================================================== */}
      {/* 1. BREADCRUMB: My Courses / Course Name / Lessons         */}
      {/* ======================================================== */}
      <Breadcrumb
        items={[
          { label: 'My Courses', onClick: onBackToCourses },
          { label: course.title, onClick: onBackToCourseOverview },
          { label: 'Lessons', isCurrent: true },
        ]}
      />

      {/* ======================================================== */}
      {/* 2. COMPACT PAGE HEADER                                   */}
      {/* ======================================================== */}
      <header className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: course.subjectColor || '#00A8F0' }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
                {course.subject}
              </span>
              {course.examinationName && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                  {course.examinationName}
                </span>
              )}
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
                  Expiring Soon
                </Badge>
              ) : (
                <Badge variant="blue" size="sm" icon="bolt">
                  Active
                </Badge>
              )}
            </div>

            {/* Course Name */}
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#12365A] tracking-tight">
              {course.title}
            </h1>

            {course.facultyName && (
              <p className="text-xs text-[#64748B]">
                Faculty: <strong className="text-[#12365A]">{course.facultyName}</strong>
              </p>
            )}
          </div>

          {/* Quick link back to Overview */}
          <button
            type="button"
            onClick={onBackToCourseOverview}
            className="self-start sm:self-center px-4 py-2 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#12365A] hover:text-[#00A8F0] border border-[#E2E8F0] text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">overview</span>
            <span>Course Overview</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* 3. COMPACT COURSE PROGRESS                                */}
        {/* ======================================================== */}
        <div className="mt-5 pt-4 border-t border-[#E2E8F0] space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <span className="font-semibold text-[#12365A] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                trending_up
              </span>
              Course Progress
            </span>
            <span className="text-[#64748B]">
              <strong className="text-[#12365A] font-bold">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </strong>{' '}
              ({course.progressPercent}% Complete)
            </span>
          </div>
          <ProgressBar
            value={course.progressPercent}
            color={isCompleted ? 'green' : 'blue'}
            height="sm"
            showPercent={false}
          />

          {/* Current Module Context */}
          {currentModule && (
            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
              <span className="truncate">
                Current Module: <strong className="text-[#12365A] font-medium">{currentModule.title}</strong>
              </span>
              <span className="shrink-0 font-medium">
                {currentModule.completedLessons} of {currentModule.totalLessons} completed
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ======================================================== */}
      {/* 4. CURRENT LEARNING FOCUS (Quick Continue Banner)         */}
      {/* ======================================================== */}
      {currentLearningFocus && !isExpired && (
        <section
          className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card ${
            isCompleted
              ? 'bg-[#35C978]/10 border-[#35C978]/30'
              : 'bg-[#E0F4FD]/70 border-[#BAE6FD]'
          }`}
          aria-label="Current Learning Focus"
        >
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isCompleted
                    ? 'bg-[#35C978] text-white'
                    : 'bg-[#00A8F0] text-white'
                }`}
              >
                {isCompleted
                  ? 'Course Completed'
                  : isNotStarted
                  ? 'Next Up'
                  : 'Current Learning Focus'}
              </span>
              <span className="text-xs text-[#64748B] truncate">
                {currentLearningFocus.module.title}
              </span>
            </div>

            <h2 className="text-sm sm:text-base font-bold text-[#12365A] flex items-center gap-2 truncate">
              <span
                className={`material-symbols-outlined text-[18px] shrink-0 ${
                  isCompleted ? 'text-[#35C978]' : 'text-[#00A8F0]'
                }`}
              >
                {isCompleted ? 'verified' : 'play_circle'}
              </span>
              <span className="truncate">{currentLearningFocus.lesson.title}</span>
            </h2>

            <div className="flex items-center gap-3 text-xs text-[#64748B]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {currentLearningFocus.lesson.duration}
              </span>
              {currentLearningFocus.lesson.progressPercent !== undefined &&
                currentLearningFocus.lesson.progressPercent > 0 && (
                  <span className="text-[#00A8F0] font-semibold">
                    {currentLearningFocus.lesson.progressPercent}% completed
                  </span>
                )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleLessonClick(currentLearningFocus.lesson)}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-[#35C978] hover:bg-[#2EB86B] text-white'
                : 'bg-[#00A8F0] hover:bg-[#0092D1] text-white shadow-card'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isCompleted ? 'history_edu' : 'play_arrow'}
            </span>
            <span>
              {isCompleted
                ? 'Review Course'
                : isNotStarted
                ? 'Start Learning'
                : 'Continue Learning'}
            </span>
          </button>
        </section>
      )}

      {/* ======================================================== */}
      {/* 5. SEARCH & EXPAND / COLLAPSE TOOLBAR                    */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Lightweight Search Input */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#94A3B8] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons..."
            aria-label="Search lessons"
            className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8F0] text-[#12365A] placeholder-[#94A3B8] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#12365A] p-0.5 cursor-pointer"
              aria-label="Clear lesson search"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        {/* Global Expand/Collapse Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-[#64748B]">
            {searchQuery
              ? `${totalLessonsInFiltered} lesson${totalLessonsInFiltered === 1 ? '' : 's'} found`
              : `${modules.length} Modules · ${course.totalLessons} Lessons`}
          </span>
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
            className="text-xs font-semibold text-[#00A8F0] hover:underline cursor-pointer"
          >
            {Object.values(expandedModules).every(Boolean) ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. MODULE-BASED LESSON LIST                               */}
      {/* ======================================================== */}
      {modules.length === 0 ? (
        // Course Empty State
        <EmptyState
          icon="menu_book"
          title="No Lessons Available"
          description="Lessons for this course are not available yet. Please check back later or contact your instructor."
        />
      ) : filteredModules.length === 0 ? (
        // Search Empty State
        <div className="w-full py-12 px-6 bg-white rounded-xl border border-[#E2E8F0] text-center max-w-md mx-auto shadow-card">
          <div className="w-10 h-10 rounded-xl bg-[#E0F4FD] text-[#00A8F0] flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-[22px]">search_off</span>
          </div>
          <h3 className="font-serif text-base font-bold text-[#12365A] mb-1">
            No Lessons Found
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            We couldn't find any lessons matching "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-lg bg-[#12365A] hover:bg-[#0E2C4A] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-4" role="region" aria-label="Course Modules">
          {filteredModules.map((module) => {
            const isExpanded = !!expandedModules[module.id];
            const isModCompleted =
              module.completedLessons === module.totalLessons && module.totalLessons > 0;

            return (
              <div
                key={module.id}
                className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-card transition-all"
              >
                {/* Module Header (Accordion Toggle) */}
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer focus:outline-none focus:bg-[#F8FAFC]"
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

                    {/* Module Progress */}
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-[11px] font-medium text-[#64748B]">
                        {module.completedLessons} / {module.totalLessons} lessons completed
                      </span>
                      {module.totalLessons > 0 && (
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              isModCompleted ? 'bg-[#35C978]' : 'bg-[#00A8F0]'
                            }`}
                            style={{
                              width: `${Math.round(
                                (module.completedLessons / module.totalLessons) * 100
                              )}%`,
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

                {/* Module Lessons Body */}
                {isExpanded && (
                  <div className="border-t border-[#E2E8F0] divide-y divide-[#F1F5F9] bg-[#FAFCFE]">
                    {module.lessons.length === 0 ? (
                      <div className="p-4 text-center text-xs text-[#64748B] italic">
                        Lessons for this module are not available yet.
                      </div>
                    ) : (
                      module.lessons.map((lesson) => {
                        const isLesCompleted = lesson.status === 'COMPLETED';
                        const isLesInProgress = lesson.status === 'IN_PROGRESS';
                        const isLesLocked = lesson.isLocked || lesson.status === 'LOCKED';

                        return (
                          <div
                            key={lesson.id}
                            className={`p-3.5 sm:p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isLesInProgress
                                ? 'bg-[#E0F4FD]/50 border-l-4 border-l-[#00A8F0]'
                                : isLesLocked
                                ? 'opacity-65 bg-slate-50'
                                : 'hover:bg-white'
                            }`}
                          >
                            {/* Left: Sequence, Icon & Lesson Information */}
                            <div className="flex items-start sm:items-center gap-3 min-w-0">
                              {/* Status Icon */}
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-semibold mt-0.5 sm:mt-0 ${
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
                                  <span className="text-xs font-semibold text-[#64748B] shrink-0">
                                    {lesson.lessonNumber < 10
                                      ? `0${lesson.lessonNumber}`
                                      : lesson.lessonNumber}
                                  </span>
                                  <h4
                                    className={`text-xs sm:text-sm font-semibold truncate ${
                                      isLesInProgress
                                        ? 'text-[#00A8F0]'
                                        : 'text-[#12365A]'
                                    }`}
                                  >
                                    {lesson.title}
                                  </h4>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#64748B]">
                                  {/* Duration */}
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[13px]">
                                      schedule
                                    </span>
                                    {lesson.duration}
                                  </span>

                                  {/* Status Label (Never color alone) */}
                                  {isLesCompleted && (
                                    <span className="text-[#15803D] font-medium flex items-center gap-0.5">
                                      <span className="material-symbols-outlined text-[12px]">
                                        check_circle
                                      </span>
                                      Completed
                                    </span>
                                  )}
                                  {isLesInProgress && (
                                    <span className="text-[#00A8F0] font-semibold">
                                      In Progress
                                      {lesson.progressPercent !== undefined &&
                                        ` (${lesson.progressPercent}% completed)`}
                                    </span>
                                  )}
                                  {!isLesCompleted && !isLesInProgress && !isLesLocked && (
                                    <span className="text-[#64748B] font-medium">Available</span>
                                  )}
                                  {isLesLocked && (
                                    <span className="text-slate-500 font-medium flex items-center gap-0.5">
                                      <span className="material-symbols-outlined text-[12px]">lock</span>
                                      Locked
                                    </span>
                                  )}

                                  {/* Contextual Lock Reason */}
                                  {isLesLocked && lesson.unlockReason && (
                                    <span className="text-amber-700 italic">
                                      · {lesson.unlockReason}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right / Bottom on Mobile: Action Button */}
                            <div className="pl-11 sm:pl-0 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleLessonClick(lesson)}
                                disabled={isLesLocked}
                                aria-label={
                                  isLesLocked
                                    ? `Lesson ${lesson.lessonNumber} is locked`
                                    : isLesInProgress
                                    ? `Continue learning ${lesson.title}`
                                    : isLesCompleted
                                    ? `Review ${lesson.title}`
                                    : `Start learning ${lesson.title}`
                                }
                                className={`w-full sm:w-auto px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                                  isLesLocked
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                    : isLesInProgress
                                    ? 'bg-[#00A8F0] hover:bg-[#0092D1] text-white shadow-xs'
                                    : isLesCompleted
                                    ? 'bg-white hover:bg-[#F1F5F9] text-[#12365A] border border-[#E2E8F0]'
                                    : 'bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] border border-[#BAE6FD]'
                                }`}
                              >
                                {isLesLocked ? (
                                  <span>Locked</span>
                                ) : isLesInProgress ? (
                                  <>
                                    <span className="material-symbols-outlined text-[16px]">
                                      play_arrow
                                    </span>
                                    <span>Continue Learning</span>
                                  </>
                                ) : isLesCompleted ? (
                                  <>
                                    <span className="material-symbols-outlined text-[16px]">
                                      history_edu
                                    </span>
                                    <span>Review</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="material-symbols-outlined text-[16px]">
                                      play_arrow
                                    </span>
                                    <span>Start Learning</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. VIDEO LEARNING MODAL (Downstream Consumption Layer)    */}
      {/* ======================================================== */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A8F0]">
                  Lesson {activeLessonModal.lessonNumber} · Video Learning
                </span>
                <h3 className="font-serif text-xl font-bold text-[#12365A] mt-1">
                  {activeLessonModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLessonModal(null)}
                className="text-[#94A3B8] hover:text-[#12365A] p-1 cursor-pointer"
                aria-label="Close video player"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Video Player Mock Placeholder */}
            <div className="w-full aspect-video bg-[#12365A] rounded-xl flex flex-col items-center justify-center text-white p-6 relative overflow-hidden group">
              <div className="w-16 h-16 rounded-full bg-[#00A8F0]/95 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
              </div>
              <p className="text-xs text-white/75 mt-3 font-medium">
                High Definition 1080p · {activeLessonModal.duration}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
              <span>
                Status:{' '}
                <strong className="text-[#12365A] font-semibold">
                  {activeLessonModal.status}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onToast) {
                    onToast(`Lesson ${activeLessonModal.lessonNumber} marked complete.`);
                  }
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
    </div>
  );
};

export default StudentLessonListScreen;
