import React, { useState, useEffect, useMemo } from 'react';
import {
  StudentDPP,
  StudentEnrolledCourse,
  DPPStatus,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { Badge } from '../common/Badge';

interface StudentDPPListScreenProps {
  initialCourseId?: string;
  scenario?: 'active' | 'new';
  onBackToCourses: () => void;
  onBackToCourseOverview?: (courseId: string) => void;
  onToast?: (message: string) => void;
}

type StatusFilter = 'all' | 'available' | 'in_progress' | 'completed' | 'upcoming' | 'expired';

export const StudentDPPListScreen: React.FC<StudentDPPListScreenProps> = ({
  initialCourseId,
  scenario = 'active',
  onBackToCourses,
  onBackToCourseOverview,
  onToast,
}) => {
  // Data State
  const [dpps, setDpps] = useState<StudentDPP[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<StudentEnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<StatusFilter>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>(
    initialCourseId || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Modal State (Practice entry / Result preview)
  const [activePracticeModal, setActivePracticeModal] = useState<StudentDPP | null>(null);
  const [activeResultModal, setActiveResultModal] = useState<StudentDPP | null>(null);
  const [isStartingSession, setIsStartingSession] = useState<boolean>(false);

  // Load DPPs and Courses
  const loadDPPData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [dppsRes, coursesRes] = await Promise.all([
        studentService.getDPPs({
          scenario,
          courseId: selectedCourseFilter,
          subject: selectedSubjectFilter,
          status: selectedStatusFilter === 'all' ? undefined : selectedStatusFilter.toUpperCase(),
          searchQuery,
          simulateDelayMs: 240,
        }),
        studentService.getStudentCourses({
          scenario,
          status: 'all',
          simulateDelayMs: 0,
        }),
      ]);

      setDpps(dppsRes);
      setEnrolledCourses(coursesRes);
    } catch (_err) {
      setError("We couldn't load your Daily Practice Problems. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDPPData();
  }, [scenario, selectedStatusFilter, selectedSubjectFilter, selectedCourseFilter, searchQuery]);

  // Overall counts for quick filter tabs
  const [statusCounts, setStatusCounts] = useState<{
    all: number;
    available: number;
    in_progress: number;
    completed: number;
    upcoming: number;
    expired: number;
  }>({
    all: 0,
    available: 0,
    in_progress: 0,
    completed: 0,
    upcoming: 0,
    expired: 0,
  });

  useEffect(() => {
    studentService.getDPPs({ scenario, simulateDelayMs: 0 }).then((allList) => {
      setStatusCounts({
        all: allList.length,
        available: allList.filter((d) => d.status === 'AVAILABLE').length,
        in_progress: allList.filter((d) => d.status === 'IN_PROGRESS').length,
        completed: allList.filter((d) => d.status === 'COMPLETED').length,
        upcoming: allList.filter((d) => d.status === 'UPCOMING').length,
        expired: allList.filter((d) => d.status === 'EXPIRED').length,
      });
    });
  }, [scenario]);

  // Unique list of subjects present in data
  const availableSubjects = useMemo(() => {
    const subs = new Set<string>();
    dpps.forEach((d) => subs.add(d.subject));
    return Array.from(subs);
  }, [dpps]);

  // Identified Today's DPP (if any active for today)
  const todaysFeaturedDPP = useMemo(() => {
    return dpps.find(
      (d) =>
        d.dateCategory === 'today' &&
        (d.status === 'AVAILABLE' || d.status === 'IN_PROGRESS')
    );
  }, [dpps]);

  // Chronological Grouping
  const groupedDPPs = useMemo(() => {
    const groups: {
      category: 'today' | 'yesterday' | 'upcoming' | 'earlier';
      title: string;
      items: StudentDPP[];
    }[] = [
      { category: 'today', title: "Today's DPPs", items: [] },
      { category: 'yesterday', title: 'Yesterday', items: [] },
      { category: 'upcoming', title: 'Upcoming Scheduled DPPs', items: [] },
      { category: 'earlier', title: 'Earlier Practice Problems', items: [] },
    ];

    dpps.forEach((d) => {
      const g = groups.find((grp) => grp.category === d.dateCategory);
      if (g) {
        g.items.push(d);
      } else {
        groups[3].items.push(d);
      }
    });

    return groups.filter((g) => g.items.length > 0);
  }, [dpps]);

  // Start Practice Action
  const handleStartDPP = async (dpp: StudentDPP) => {
    setIsStartingSession(true);
    try {
      const res = await studentService.startDPP(dpp.id);
      if (res.success && res.dpp) {
        setDpps((prev) => prev.map((item) => (item.id === dpp.id ? res.dpp! : item)));
        if (onToast) onToast(`Started "${dpp.title}". 15-minute practice session initialized.`);
      }
    } catch (_err) {
      if (onToast) onToast('Failed to start DPP session. Please try again.');
    } finally {
      setIsStartingSession(false);
      setActivePracticeModal(null);
    }
  };

  // Complete Simulation Action inside modal
  const handleSimulateCompletion = async (dppId: string) => {
    try {
      const res = await studentService.completeDPP(dppId, 18, 20);
      if (res.success && res.dpp) {
        setDpps((prev) => prev.map((item) => (item.id === dppId ? res.dpp! : item)));
        setActivePracticeModal(null);
        setActiveResultModal(res.dpp);
        if (onToast) onToast(`DPP completed! Score: ${res.dpp.score}`);
      }
    } catch (_err) {
      if (onToast) onToast('Failed to record DPP completion.');
    }
  };

  // Helper for Status Badge
  const renderStatusBadge = (status: DPPStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <Badge variant="blue" size="sm" icon="bolt">
            Available
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge variant="yellow" size="sm" icon="pending">
            In Progress
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge variant="green" size="sm" icon="check_circle">
            Completed
          </Badge>
        );
      case 'UPCOMING':
        return (
          <Badge variant="neutral" size="sm" icon="schedule">
            Upcoming
          </Badge>
        );
      case 'EXPIRED':
        return (
          <Badge variant="red" size="sm" icon="lock_clock">
            Expired
          </Badge>
        );
    }
  };

  // Resolved Scoped Course Title
  const matchedCourse = enrolledCourses.find((c) => c.id === selectedCourseFilter);

  // Clear Filters helper
  const handleClearFilters = () => {
    setSelectedStatusFilter('all');
    setSelectedSubjectFilter('all');
    setSelectedCourseFilter(initialCourseId || 'all');
    setSearchQuery('');
  };

  // ========================================================
  // 1. SKELETON LOADING STATE
  // ========================================================
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-48 mb-4" />

        {/* Header Skeleton */}
        <div className="space-y-2 pb-4 border-b border-[#E2E8F0]">
          <div className="h-7 bg-slate-200 rounded w-64" />
          <div className="h-4 bg-slate-200 rounded w-96" />
        </div>

        {/* Toolbar Skeleton */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 h-16" />

        {/* Group Skeleton */}
        <div className="space-y-3">
          <div className="h-5 bg-slate-200 rounded w-32" />
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 h-20" />
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 h-20" />
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. ERROR STATE
  // ========================================================
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <div className="max-w-md mx-auto bg-white rounded-xl border border-red-200 p-8 text-center shadow-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[26px]">error</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#12365A]">
            Unable to Load DPPs
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">{error}</p>
          <button
            type="button"
            onClick={loadDPPData}
            className="px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* ======================================================== */}
      {/* 1. BREADCRUMB NAVIGATION                                 */}
      {/* ======================================================== */}
      <Breadcrumb
        items={
          matchedCourse
            ? [
                { label: 'My Courses', onClick: onBackToCourses },
                {
                  label: matchedCourse.title,
                  onClick: () =>
                    onBackToCourseOverview && onBackToCourseOverview(matchedCourse.id),
                },
                { label: 'Daily Practice Problems', isCurrent: true },
              ]
            : [
                { label: 'My Courses', onClick: onBackToCourses },
                { label: 'Daily Practice Problems', isCurrent: true },
              ]
        }
      />

      {/* ======================================================== */}
      {/* 2. PAGE HEADER                                           */}
      {/* ======================================================== */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#12365A] tracking-tight">
              Daily Practice Problems
            </h1>
            {statusCounts.available > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
                {statusCounts.available} Available
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Practice regularly to strengthen your understanding and improve your performance.
          </p>
        </div>

        {matchedCourse && (
          <div className="self-start md:self-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
            <span className="text-[#64748B]">Course Filter:</span>
            <strong className="text-[#12365A] font-semibold truncate max-w-xs">
              {matchedCourse.title}
            </strong>
            <button
              type="button"
              onClick={() => setSelectedCourseFilter('all')}
              className="text-[#00A8F0] hover:text-[#0092D1] text-[11px] font-semibold ml-1 cursor-pointer"
            >
              Show All
            </button>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 3. TODAY'S DPP HIGHLIGHT (Answers: What to practice today)*/}
      {/* ======================================================== */}
      {todaysFeaturedDPP && selectedStatusFilter !== 'completed' && selectedStatusFilter !== 'expired' && (
        <section className="bg-gradient-to-r from-[#12365A] to-[#1E4D7B] rounded-xl p-5 text-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#F6C20F] text-[#12365A]">
                Today's Focus
              </span>
              <span className="text-xs text-white/80 font-medium">
                {todaysFeaturedDPP.subject} &middot; {todaysFeaturedDPP.date}
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white truncate">
              {todaysFeaturedDPP.title}
            </h2>
            <p className="text-xs text-white/70">
              {todaysFeaturedDPP.courseTitle} &middot; {todaysFeaturedDPP.totalQuestions} Questions
              {todaysFeaturedDPP.completedQuestions
                ? ` (${todaysFeaturedDPP.completedQuestions} of ${todaysFeaturedDPP.totalQuestions} completed)`
                : ''}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActivePracticeModal(todaysFeaturedDPP)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-bold shadow-xs transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {todaysFeaturedDPP.status === 'IN_PROGRESS' ? 'play_arrow' : 'bolt'}
              </span>
              <span>
                {todaysFeaturedDPP.status === 'IN_PROGRESS' ? 'Continue DPP' : 'Start DPP'}
              </span>
            </button>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. LIGHTWEIGHT FILTER & SEARCH TOOLBAR                   */}
      {/* ======================================================== */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-card space-y-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedStatusFilter === 'all'
                ? 'bg-[#12365A] text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            All ({statusCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatusFilter('available')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedStatusFilter === 'available'
                ? 'bg-[#00A8F0] text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            Available ({statusCounts.available})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedStatusFilter === 'in_progress'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            In Progress ({statusCounts.in_progress})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedStatusFilter === 'completed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            Completed ({statusCounts.completed})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatusFilter('upcoming')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedStatusFilter === 'upcoming'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            Upcoming ({statusCounts.upcoming})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatusFilter('expired')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedStatusFilter === 'expired'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            Expired ({statusCounts.expired})
          </button>
        </div>

        {/* Secondary Filters: Course, Subject & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#F1F5F9]">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Subject Dropdown */}
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-[#12365A] font-medium focus:ring-1 focus:ring-[#00A8F0] focus:outline-hidden"
              aria-label="Filter by subject"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            {/* Course Dropdown */}
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-[#12365A] font-medium focus:ring-1 focus:ring-[#00A8F0] focus:outline-hidden max-w-[220px] truncate"
              aria-label="Filter by course"
            >
              <option value="all">All Enrolled Courses</option>
              {enrolledCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            {(selectedStatusFilter !== 'all' ||
              selectedSubjectFilter !== 'all' ||
              selectedCourseFilter !== (initialCourseId || 'all') ||
              searchQuery) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-[#00A8F0] hover:underline font-semibold px-2 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#64748B]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search DPPs..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs text-[#12365A] placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#00A8F0] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. PRIMARY DPP LIST (Chronological Grouping)             */}
      {/* ======================================================== */}
      {dpps.length === 0 ? (
        /* Empty States */
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center shadow-card space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[26px]">fact_check</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#12365A]">
            {selectedStatusFilter !== 'all' || selectedSubjectFilter !== 'all' || searchQuery
              ? 'No DPPs match your filters'
              : 'No DPPs Available'}
          </h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
            {selectedStatusFilter !== 'all' || selectedSubjectFilter !== 'all' || searchQuery
              ? 'Try modifying your filter settings or search terms.'
              : 'Daily practice problems from your courses will appear here as your schedule progresses.'}
          </p>
          {(selectedStatusFilter !== 'all' || selectedSubjectFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-2 px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {groupedDPPs.map((group) => (
            <section key={group.category} className="space-y-3">
              {/* Group Heading */}
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  calendar_today
                </span>
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#12365A]">
                  {group.title}
                </h2>
                <span className="text-xs text-[#64748B] font-medium">
                  ({group.items.length})
                </span>
              </div>

              {/* Group Item Cards / Structured List */}
              <div className="space-y-3">
                {group.items.map((dpp) => {
                  const isAvailable = dpp.status === 'AVAILABLE';
                  const isInProgress = dpp.status === 'IN_PROGRESS';
                  const isCompleted = dpp.status === 'COMPLETED';
                  const isUpcoming = dpp.status === 'UPCOMING';
                  const isExpired = dpp.status === 'EXPIRED';

                  return (
                    <article
                      key={dpp.id}
                      className="bg-white rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] p-4 sm:p-5 shadow-card hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      {/* Left: Subject Tag, DPP Name, Course Context & Metadata */}
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Subject Pill */}
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${dpp.subjectColor || '#00A8F0'}15`,
                              color: dpp.subjectColor || '#00A8F0',
                            }}
                          >
                            {dpp.subject}
                          </span>
                          <span className="text-xs text-[#64748B] font-medium truncate max-w-xs">
                            {dpp.courseTitle}
                          </span>
                          <span className="text-[10px] text-slate-300 hidden sm:inline">&middot;</span>
                          <span className="text-xs text-[#64748B] hidden sm:inline">
                            {dpp.date}
                          </span>
                        </div>

                        {/* DPP Name */}
                        <h3 className="font-bold text-base text-[#12365A] leading-snug">
                          {dpp.title}
                        </h3>

                        {/* Metadata: Questions count, In-progress info, Date */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B]">
                          <span className="sm:hidden font-medium text-[#12365A]">
                            {dpp.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">quiz</span>
                            <span>{dpp.totalQuestions} Questions</span>
                          </span>

                          {isInProgress && dpp.completedQuestions && (
                            <span className="text-amber-700 font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">pending</span>
                              <span>{dpp.completedQuestions} of {dpp.totalQuestions} completed</span>
                            </span>
                          )}

                          {dpp.durationMinutes && (
                            <span className="flex items-center gap-1 hidden sm:inline-flex">
                              <span className="material-symbols-outlined text-[15px]">timer</span>
                              <span>{dpp.durationMinutes} mins</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Status Badges, Score & Action CTA */}
                      <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#F1F5F9] shrink-0">
                        {/* Status Badge */}
                        <div>{renderStatusBadge(dpp.status)}</div>

                        {/* Score Display (Completed only) */}
                        {isCompleted && dpp.score && (
                          <div className="text-right">
                            <span className="text-[10px] text-[#64748B] block">Score</span>
                            <span className="font-bold text-xs sm:text-sm text-emerald-700">
                              {dpp.score}
                            </span>
                          </div>
                        )}

                        {/* Contextual Action CTA */}
                        <div>
                          {isAvailable ? (
                            <button
                              type="button"
                              onClick={() => setActivePracticeModal(dpp)}
                              className="px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Start DPP</span>
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                          ) : isInProgress ? (
                            <button
                              type="button"
                              onClick={() => setActivePracticeModal(dpp)}
                              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Continue DPP</span>
                              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                            </button>
                          ) : isCompleted ? (
                            <button
                              type="button"
                              onClick={() => setActiveResultModal(dpp)}
                              className="px-4 py-2 rounded-lg bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] border border-[#BAE6FD] text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>View Result</span>
                              <span className="material-symbols-outlined text-[16px]">insights</span>
                            </button>
                          ) : isUpcoming ? (
                            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400 text-xs font-medium cursor-not-allowed">
                              Upcoming
                            </span>
                          ) : isExpired ? (
                            <span className="px-3 py-1.5 rounded-lg bg-red-50 text-red-400 text-xs font-medium cursor-not-allowed">
                              Expired
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. INTERACTIVE PRACTICE ENTRY MODAL                      */}
      {/* ======================================================== */}
      {activePracticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#E2E8F0] max-w-md w-full p-6 shadow-2xl space-y-4 font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">
                  assignment_turned_in
                </span>
                <span className="text-xs font-bold uppercase text-[#64748B]">
                  {activePracticeModal.subject} Practice
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePracticeModal(null)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#12365A] leading-tight">
                {activePracticeModal.title}
              </h3>
              <p className="text-xs text-[#64748B]">
                {activePracticeModal.courseTitle} &middot; {activePracticeModal.date}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-[#64748B]">
                <span>Total Questions:</span>
                <strong className="text-[#12365A]">{activePracticeModal.totalQuestions} Questions</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Recommended Time:</span>
                <strong className="text-[#12365A]">{activePracticeModal.durationMinutes || 30} Minutes</strong>
              </div>
              {activePracticeModal.topicsCovered && (
                <div className="pt-1 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">
                    Topics Included:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activePracticeModal.topicsCovered.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-[#12365A]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActivePracticeModal(null)}
                className="flex-1 py-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-xs font-semibold text-[#12365A] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isStartingSession}
                onClick={() => handleStartDPP(activePracticeModal)}
                className="flex-1 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold transition-colors shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isStartingSession ? (
                  <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                )}
                <span>Begin Practice</span>
              </button>
            </div>

            {/* Quick Simulation Option for testing flow */}
            <div className="text-center pt-1 border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={() => handleSimulateCompletion(activePracticeModal.id)}
                className="text-[11px] text-[#64748B] hover:text-[#00A8F0] underline cursor-pointer"
              >
                Simulate Instant Completion & Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. DPP RESULT PREVIEW MODAL                              */}
      {/* ======================================================== */}
      {activeResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#E2E8F0] max-w-md w-full p-6 shadow-2xl space-y-4 font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-emerald-600">
                  verified
                </span>
                <span className="text-xs font-bold uppercase text-emerald-800">
                  DPP Assessment Result
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveResultModal(null)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#12365A] leading-tight">
                {activeResultModal.title}
              </h3>
              <p className="text-xs text-[#64748B]">
                {activeResultModal.subject} &middot; {activeResultModal.courseTitle}
              </p>
            </div>

            {/* Scorecard Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/40 border border-emerald-200 text-center space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Accuracy & Score
              </span>
              <div className="font-serif text-3xl font-extrabold text-emerald-800">
                {activeResultModal.score}
              </div>
              <p className="text-xs text-emerald-700 font-medium">
                {activeResultModal.scorePercent || 85}% Accuracy Recorded
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-[#64748B]">
                <span>Status:</span>
                <strong className="text-emerald-700">Completed & Evaluated</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Attempted On:</span>
                <span className="text-[#12365A]">{activeResultModal.completedAt || activeResultModal.date}</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Questions Completed:</span>
                <span className="text-[#12365A]">{activeResultModal.totalQuestions} of {activeResultModal.totalQuestions}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveResultModal(null)}
                className="w-full py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-xs font-semibold text-white transition-colors cursor-pointer shadow-xs"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDPPListScreen;
