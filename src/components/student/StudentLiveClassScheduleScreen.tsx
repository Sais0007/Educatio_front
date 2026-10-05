import React, { useState, useEffect, useMemo } from 'react';
import {
  StudentLiveClass,
  StudentEnrolledCourse,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

interface StudentLiveClassScheduleScreenProps {
  initialCourseId?: string;
  scenario?: 'active' | 'new';
  onBackToCourses: () => void;
  onBackToCourseOverview?: (courseId: string) => void;
  onNavigateRecording?: (courseId: string, lessonId: string) => void;
  onToast?: (message: string) => void;
}

export const StudentLiveClassScheduleScreen: React.FC<StudentLiveClassScheduleScreenProps> = ({
  initialCourseId,
  scenario = 'active',
  onBackToCourses,
  onBackToCourseOverview,
  onNavigateRecording,
  onToast,
}) => {
  // Data state
  const [classes, setClasses] = useState<StudentLiveClass[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<StudentEnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Tabs & Filters
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>(
    initialCourseId || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Live Classroom Modal State
  const [activeJoiningClass, setActiveJoiningClass] = useState<StudentLiveClass | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
  const [isHandRaised, setIsHandRaised] = useState<boolean>(false);

  // Fetch classes and student's courses
  const fetchScheduleData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [liveClassesRes, coursesRes] = await Promise.all([
        studentService.getLiveClasses({
          scenario,
          tab: activeTab,
          courseId: selectedCourseFilter,
          searchQuery,
          simulateDelayMs: 250,
        }),
        studentService.getStudentCourses({
          scenario,
          status: 'all',
          simulateDelayMs: 0,
        }),
      ]);

      setClasses(liveClassesRes);
      setEnrolledCourses(coursesRes);
    } catch (_err) {
      setError('We couldn\'t load your live class schedule. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, [scenario, activeTab, selectedCourseFilter, searchQuery]);

  // Overall counts for upcoming vs past tab badges
  const [counts, setCounts] = useState<{ upcoming: number; past: number }>({
    upcoming: 0,
    past: 0,
  });

  useEffect(() => {
    Promise.all([
      studentService.getLiveClasses({ scenario, tab: 'upcoming', simulateDelayMs: 0 }),
      studentService.getLiveClasses({ scenario, tab: 'past', simulateDelayMs: 0 }),
    ]).then(([upcomingList, pastList]) => {
      setCounts({
        upcoming: upcomingList.length,
        past: pastList.length,
      });
    });
  }, [scenario]);

  // Highlighted "Next Class": The single most urgent live or starting-soon class in upcoming tab
  const nextClassHighlight = useMemo(() => {
    if (activeTab !== 'upcoming' || classes.length === 0) return null;
    // Prefer LIVE_NOW, then STARTING_SOON, then the first class
    const liveNow = classes.find((c) => c.status === 'LIVE_NOW');
    if (liveNow) return liveNow;
    const startingSoon = classes.find((c) => c.status === 'STARTING_SOON');
    if (startingSoon) return startingSoon;
    const firstUpcoming = classes.find((c) => c.status === 'UPCOMING');
    return firstUpcoming || classes[0];
  }, [classes, activeTab]);

  // Group classes by date category (Today, Tomorrow, Upcoming dates / Past dates)
  const groupedClasses = useMemo(() => {
    const groups: {
      category: 'today' | 'tomorrow' | 'upcoming' | 'past';
      title: string;
      items: StudentLiveClass[];
    }[] = [];

    if (activeTab === 'upcoming') {
      const todayClasses = classes.filter((c) => c.dateCategory === 'today');
      const tomorrowClasses = classes.filter((c) => c.dateCategory === 'tomorrow');
      const futureClasses = classes.filter((c) => c.dateCategory === 'upcoming');

      if (todayClasses.length > 0) {
        groups.push({ category: 'today', title: 'Today', items: todayClasses });
      }
      if (tomorrowClasses.length > 0) {
        groups.push({ category: 'tomorrow', title: 'Tomorrow', items: tomorrowClasses });
      }
      if (futureClasses.length > 0) {
        groups.push({
          category: 'upcoming',
          title: 'Upcoming Dates',
          items: futureClasses,
        });
      }
    } else {
      // Past classes: group by formattedDate
      const dateMap: Record<string, StudentLiveClass[]> = {};
      classes.forEach((c) => {
        const key = c.formattedDate;
        if (!dateMap[key]) dateMap[key] = [];
        dateMap[key].push(c);
      });

      Object.keys(dateMap).forEach((dateKey) => {
        groups.push({
          category: 'past',
          title: dateKey,
          items: dateMap[dateKey],
        });
      });
    }

    return groups;
  }, [classes, activeTab]);

  // Handle joining a live class
  const handleJoinClass = async (liveClass: StudentLiveClass) => {
    if (liveClass.status === 'CANCELLED') {
      if (onToast) onToast('This live class has been cancelled.');
      return;
    }

    if (liveClass.status === 'UPCOMING' && !liveClass.joinWindowOpen) {
      if (onToast) onToast(`Join window opens 15 minutes before ${liveClass.startTime}.`);
      return;
    }

    try {
      await studentService.joinLiveClass(liveClass.id);
      // Update local state to JOINED
      setClasses((prev) =>
        prev.map((c) => (c.id === liveClass.id ? { ...c, status: 'JOINED' } : c))
      );
      setActiveJoiningClass(liveClass);
      if (onToast) {
        onToast(`Connected to live session: ${liveClass.title}`);
      }
    } catch (_err) {
      if (onToast) onToast('Failed to join live class. Please try again.');
    }
  };

  // Resolve Course Title for breadcrumb if initialCourseId was provided
  const matchedCourse = enrolledCourses.find((c) => c.id === initialCourseId);

  // ========================================================
  // 1. SKELETON LOADING STATE
  // ========================================================
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-48 mb-4" />

        {/* Page Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-[#E2E8F0]">
          <div className="space-y-2 w-2/3">
            <div className="h-7 bg-slate-200 rounded w-48" />
            <div className="h-4 bg-slate-200 rounded w-72" />
          </div>
          <div className="h-9 bg-slate-200 rounded-lg w-40" />
        </div>

        {/* Highlight Card Skeleton */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card h-44" />

        {/* Cards Skeleton Grid */}
        <div className="space-y-4">
          <div className="h-5 bg-slate-200 rounded w-28" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card h-48" />
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card h-48" />
          </div>
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
            Unable to Load Live Classes
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchScheduleData}
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
      {/* 1. BREADCRUMB: My Courses / (Course Title) / Live Classes */}
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
                { label: 'Live Classes', isCurrent: true },
              ]
            : [
                { label: 'My Courses', onClick: onBackToCourses },
                { label: 'Live Classes', isCurrent: true },
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
              Live Classes
            </h1>
            {counts.upcoming > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
                {counts.upcoming} Scheduled
              </span>
            )}
          </div>
          <p className="text-sm text-[#64748B] mt-1">
            View your upcoming classes and join when they are live.
          </p>
        </div>

        {/* Tab Segmentation: [ Upcoming ] [ Past ] */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-[#E2E8F0] self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-white text-[#12365A] shadow-xs'
                : 'text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            <span>Upcoming</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'upcoming'
                  ? 'bg-[#E0F4FD] text-[#00A8F0] font-bold'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {counts.upcoming}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'past'
                ? 'bg-white text-[#12365A] shadow-xs'
                : 'text-[#64748B] hover:text-[#12365A]'
            }`}
          >
            <span>Past</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'past'
                  ? 'bg-[#E0F4FD] text-[#00A8F0] font-bold'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {counts.past}
            </span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. LIGHTWEIGHT FILTER & SEARCH BAR                       */}
      {/* ======================================================== */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E2E8F0] shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Course Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-medium text-[#64748B] shrink-0 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            Course:
          </span>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            aria-label="Filter live classes by course"
            className="w-full sm:w-64 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#12365A] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#00A8F0] transition-colors cursor-pointer"
          >
            <option value="all">All Accessible Courses</option>
            {enrolledCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.subject}: {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#94A3B8] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search class, faculty or topic..."
            aria-label="Search live classes"
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8F0] text-[#12365A] placeholder-[#94A3B8] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#12365A] p-0.5 cursor-pointer"
              aria-label="Clear live class search"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. NEXT CLASS HIGHLIGHT (Urgent Action Banner)           */}
      {/* Answers: What is next? When? Who? Batch? Join now?       */}
      {/* ======================================================== */}
      {nextClassHighlight && (
        <section
          aria-labelledby="next-class-heading"
          className="bg-gradient-to-r from-[#12365A] to-[#1E4E7A] text-white rounded-xl p-5 sm:p-6 shadow-card relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-[#00A8F0]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00A8F0] text-white">
                  Your Next Class
                </span>

                {/* Live Status Beacon */}
                {nextClassHighlight.status === 'LIVE_NOW' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#35C978] text-[#064E3B] shadow-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <span>LIVE NOW</span>
                  </span>
                ) : nextClassHighlight.status === 'STARTING_SOON' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F6C20F] text-[#854D0E]">
                    <span className="material-symbols-outlined text-[13px]">alarm</span>
                    <span>Starting Soon</span>
                    {nextClassHighlight.startsInMinutes !== undefined &&
                      ` (in ${nextClassHighlight.startsInMinutes} mins)`}
                  </span>
                ) : nextClassHighlight.status === 'JOINED' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E0F4FD] text-[#00A8F0]">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    <span>Joined / In Room</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-white">
                    {nextClassHighlight.formattedDate}
                  </span>
                )}

                <span className="text-xs text-white/80 font-medium">
                  {nextClassHighlight.batchName}
                </span>
              </div>

              {/* Class Title */}
              <h2
                id="next-class-heading"
                className="text-lg sm:text-2xl font-bold font-serif text-white tracking-tight leading-snug"
              >
                {nextClassHighlight.title}
              </h2>

              {/* Course & Faculty Info */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/80">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                    menu_book
                  </span>
                  <span>{nextClassHighlight.courseTitle}</span>
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                    person
                  </span>
                  <span className="font-medium text-white">
                    {nextClassHighlight.facultyName}
                  </span>
                  {nextClassHighlight.facultyDesignation && (
                    <span className="text-white/60 hidden sm:inline">
                      ({nextClassHighlight.facultyDesignation})
                    </span>
                  )}
                </span>

                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                    schedule
                  </span>
                  <span>
                    {nextClassHighlight.startTime} – {nextClassHighlight.endTime}
                  </span>
                </span>
              </div>

              {/* Topics preview if present */}
              {nextClassHighlight.topicsCovered && nextClassHighlight.topicsCovered.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-white/60">Topics:</span>
                  {nextClassHighlight.topicsCovered.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[10px] font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={() => handleJoinClass(nextClassHighlight)}
                disabled={
                  nextClassHighlight.status === 'CANCELLED' ||
                  (nextClassHighlight.status === 'UPCOMING' &&
                    !nextClassHighlight.joinWindowOpen)
                }
                className={`px-6 py-3 rounded-lg text-xs font-semibold shadow-card transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer ${
                  nextClassHighlight.status === 'LIVE_NOW' ||
                  nextClassHighlight.status === 'STARTING_SOON' ||
                  nextClassHighlight.status === 'JOINED'
                    ? 'bg-[#00A8F0] hover:bg-[#0092D1] text-white active:scale-95'
                    : 'bg-white/10 text-white/50 cursor-not-allowed border border-white/20'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {nextClassHighlight.status === 'JOINED'
                    ? 'sensors'
                    : nextClassHighlight.status === 'LIVE_NOW'
                    ? 'play_circle'
                    : 'login'}
                </span>
                <span>
                  {nextClassHighlight.status === 'JOINED'
                    ? 'Rejoin Class'
                    : nextClassHighlight.status === 'LIVE_NOW'
                    ? 'Join Class Now'
                    : nextClassHighlight.status === 'STARTING_SOON'
                    ? 'Join Class'
                    : 'Upcoming'}
                </span>
              </button>

              {nextClassHighlight.status === 'LIVE_NOW' && nextClassHighlight.attendeesCount && (
                <span className="text-[11px] text-center text-white/70 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C978]" />
                  <span>{nextClassHighlight.attendeesCount} students attending</span>
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 5. MAIN CHRONOLOGICAL SCHEDULE LIST                     */}
      {/* Grouped by Date (Today, Tomorrow, Future / Past dates)   */}
      {/* ======================================================== */}
      {classes.length === 0 ? (
        <EmptyState
          icon={activeTab === 'upcoming' ? 'event_busy' : 'history_toggle_off'}
          title={
            activeTab === 'upcoming'
              ? 'No upcoming live classes'
              : 'No past live classes found'
          }
          description={
            activeTab === 'upcoming'
              ? 'You don\'t have any live classes scheduled at the moment. Classes will appear here once scheduled for your batch.'
              : 'Past sessions and lecture recordings for your enrolled courses will appear here.'
          }
          actionLabel={selectedCourseFilter !== 'all' ? 'Reset Course Filter' : undefined}
          onAction={
            selectedCourseFilter !== 'all'
              ? () => setSelectedCourseFilter('all')
              : undefined
          }
        />
      ) : (
        <div className="space-y-8">
          {groupedClasses.map((group) => (
            <section key={group.title} className="space-y-3">
              {/* Date Group Heading */}
              <div className="flex items-center gap-2 pb-1 border-b border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  calendar_today
                </span>
                <h3 className="font-serif text-lg font-bold text-[#12365A]">
                  {group.title}
                </h3>
                <span className="text-xs text-[#64748B]">
                  ({group.items.length} {group.items.length === 1 ? 'class' : 'classes'})
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((c) => {
                  const isLive = c.status === 'LIVE_NOW';
                  const isStartingSoon = c.status === 'STARTING_SOON';
                  const isJoined = c.status === 'JOINED';
                  const isCancelled = c.status === 'CANCELLED';
                  const isCompleted = c.status === 'COMPLETED';
                  const isUpcoming = c.status === 'UPCOMING';

                  return (
                    <article
                      key={c.id}
                      className={`bg-white rounded-xl border p-5 shadow-card transition-all duration-150 relative overflow-hidden flex flex-col justify-between gap-4 ${
                        isLive
                          ? 'border-[#00A8F0] ring-1 ring-[#00A8F0]/30 hover:shadow-md'
                          : 'border-[#E2E8F0] hover:border-[#00A8F0]/40'
                      }`}
                    >
                      {/* Left Subject Color Accent Strip */}
                      <div
                        className="absolute top-0 left-0 bottom-0 w-1.5"
                        style={{ backgroundColor: c.subjectColor || '#00A8F0' }}
                      />

                      <div className="pl-2 space-y-3">
                        {/* Top Metadata Row: Subject + Status Tag */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: `${c.subjectColor || '#00A8F0'}15`,
                                color: c.subjectColor || '#00A8F0',
                              }}
                            >
                              {c.subject}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F1F5F9] text-[#64748B]">
                              {c.batchName}
                            </span>
                          </div>

                          {/* Status Badge (Never communicate through color alone) */}
                          {isLive ? (
                            <Badge variant="live" size="sm" icon="sensors">
                              Live Now
                            </Badge>
                          ) : isStartingSoon ? (
                            <Badge variant="yellow" size="sm" icon="alarm">
                              Starting Soon
                            </Badge>
                          ) : isJoined ? (
                            <Badge variant="blue" size="sm" icon="check_circle">
                              Joined
                            </Badge>
                          ) : isCancelled ? (
                            <Badge variant="red" size="sm" icon="cancel">
                              Cancelled
                            </Badge>
                          ) : isCompleted ? (
                            <Badge variant="neutral" size="sm" icon="check">
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="neutral" size="sm" icon="event">
                              Upcoming
                            </Badge>
                          )}
                        </div>

                        {/* Class Title */}
                        <div>
                          <h4 className="font-bold text-base text-[#12365A] leading-snug line-clamp-2">
                            {c.title}
                          </h4>
                          <p className="text-xs text-[#64748B] mt-0.5 truncate">
                            Course: {c.courseTitle}
                          </p>
                        </div>

                        {/* Faculty Profile Strip */}
                        <div className="flex items-center gap-2.5 pt-1">
                          {c.facultyAvatar ? (
                            <img
                              src={c.facultyAvatar}
                              alt={c.facultyName}
                              className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0]"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#E0F4FD] text-[#00A8F0] font-bold text-xs flex items-center justify-center">
                              {c.facultyName.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#12365A] truncate">
                              {c.facultyName}
                            </p>
                            {c.facultyDesignation && (
                              <p className="text-[11px] text-[#64748B] truncate">
                                {c.facultyDesignation}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Cancellation Banner if cancelled */}
                        {isCancelled && c.cancellationReason && (
                          <div className="p-2.5 rounded-lg bg-red-50/80 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] text-red-500 shrink-0 mt-0.5">
                              info
                            </span>
                            <span className="leading-relaxed">
                              {c.cancellationReason}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Footer: Date/Time + CTA Button */}
                      <div className="pl-2 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs text-[#64748B] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-[#00A8F0]">
                            schedule
                          </span>
                          <span className="font-semibold text-[#12365A]">
                            {c.startTime} – {c.endTime}
                          </span>
                          <span className="text-[11px]">({c.durationMinutes}m)</span>
                        </div>

                        {/* Action CTA */}
                        <div>
                          {isLive || isStartingSoon || isJoined ? (
                            <button
                              type="button"
                              onClick={() => handleJoinClass(c)}
                              aria-label={`Join live class: ${c.title}`}
                              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {isJoined ? 'sensors' : 'play_arrow'}
                              </span>
                              <span>{isJoined ? 'Rejoin Class' : 'Join Class'}</span>
                            </button>
                          ) : isUpcoming ? (
                            <button
                              type="button"
                              disabled
                              aria-label={`Live class ${c.title} is upcoming`}
                              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-100 text-[#64748B] text-xs font-semibold border border-[#E2E8F0] cursor-not-allowed inline-flex items-center justify-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[14px]">lock_clock</span>
                              <span>Upcoming</span>
                            </button>
                          ) : isCompleted ? (
                            c.hasRecording && onNavigateRecording ? (
                              <button
                                type="button"
                                onClick={() =>
                                  onNavigateRecording(c.courseId, c.recordingLessonId || '')
                                }
                                aria-label={`Watch recording for: ${c.title}`}
                                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] text-xs font-semibold border border-[#BAE6FD] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  smart_display
                                </span>
                                <span>Watch Recording</span>
                              </button>
                            ) : (
                              <span className="text-xs font-medium text-[#64748B] px-3 py-1.5 rounded bg-slate-50 border border-slate-200 inline-block">
                                Completed
                              </span>
                            )
                          ) : isCancelled ? (
                            <span className="text-xs font-medium text-red-600 px-3 py-1.5 rounded bg-red-50 border border-red-200 inline-block">
                              Cancelled
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
      {/* 6. INTERACTIVE SECURE LIVE CLASSROOM MODAL               */}
      {/* Simulated Live Room verifying batch access & interaction */}
      {/* ======================================================== */}
      {activeJoiningClass && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-live-title"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans"
        >
          <div className="bg-[#0B192C] text-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 flex flex-col max-h-[92vh]">
            {/* Modal Room Header */}
            <div className="px-5 py-3.5 bg-[#122238] border-b border-slate-700/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div className="min-w-0">
                  <h3
                    id="modal-live-title"
                    className="text-sm sm:text-base font-bold text-white truncate"
                  >
                    {activeJoiningClass.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span>{activeJoiningClass.batchName}</span>
                    <span>&middot;</span>
                    <span>Instructor: {activeJoiningClass.facultyName}</span>
                  </div>
                </div>
              </div>

              {/* Close / Leave button */}
              <button
                type="button"
                onClick={() => setActiveJoiningClass(null)}
                aria-label="Leave live classroom"
                className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">call_end</span>
                <span>Leave Class</span>
              </button>
            </div>

            {/* Video / Board Canvas Area */}
            <div className="relative flex-1 bg-black aspect-video min-h-[280px] flex items-center justify-center overflow-hidden">
              {/* Simulated Instructor Video Feed / Whiteboard */}
              <div className="absolute inset-0 bg-radial from-[#1A3358] to-[#0A1628] flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#00A8F0]/20 border border-[#00A8F0]/50 text-[#00A8F0] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[36px]">cast_connected</span>
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
                  Live Lecture Stream Active
                </h4>
                <p className="text-xs text-slate-300 max-w-md">
                  Connected to authorized classroom feed for {activeJoiningClass.batchName}.
                  Instructor {activeJoiningClass.facultyName} is sharing board & audio.
                </p>

                {/* Live Watermark for anti-piracy simulation */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/30 bg-black/40 px-2 py-1 rounded">
                  APEX-SECURE &middot; {activeJoiningClass.batchId} &middot; LIVE
                </div>

                {/* Hand Raised Banner */}
                {isHandRaised && (
                  <div className="mt-4 px-3 py-1.5 rounded-full bg-[#F6C20F]/20 border border-[#F6C20F] text-[#F6C20F] text-xs font-semibold flex items-center gap-1.5 animate-bounce">
                    <span className="material-symbols-outlined text-[16px]">pan_tool</span>
                    <span>Your hand is raised &middot; Instructor notified</span>
                  </div>
                )}
              </div>
            </div>

            {/* In-Session Interactive Control Bar */}
            <div className="px-5 py-3 bg-[#122238] border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* Audio Toggle */}
                <button
                  type="button"
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isAudioMuted
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-emerald-600 text-white'
                  }`}
                  aria-label={isAudioMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isAudioMuted ? 'mic_off' : 'mic'}
                  </span>
                  <span className="hidden sm:inline">
                    {isAudioMuted ? 'Muted' : 'Speaking'}
                  </span>
                </button>

                {/* Video Toggle */}
                <button
                  type="button"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    !isVideoOn
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-[#00A8F0] text-white'
                  }`}
                  aria-label={isVideoOn ? 'Stop student camera' : 'Start student camera'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isVideoOn ? 'videocam' : 'videocam_off'}
                  </span>
                  <span className="hidden sm:inline">
                    {isVideoOn ? 'Camera On' : 'Camera Off'}
                  </span>
                </button>

                {/* Raise Hand Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsHandRaised(!isHandRaised);
                    if (onToast) {
                      onToast(isHandRaised ? 'Hand lowered' : 'Hand raised for instructor question');
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isHandRaised
                      ? 'bg-[#F6C20F] text-[#854D0E] font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  aria-label={isHandRaised ? 'Lower hand' : 'Raise hand to ask question'}
                >
                  <span className="material-symbols-outlined text-[16px]">pan_tool</span>
                  <span className="hidden sm:inline">
                    {isHandRaised ? 'Hand Raised' : 'Raise Hand'}
                  </span>
                </button>
              </div>

              {/* Status & Exit */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Quality: HD (1080p) &middot; Latency: 42ms
                </span>
                <button
                  type="button"
                  onClick={() => setActiveJoiningClass(null)}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold cursor-pointer"
                >
                  Back to Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLiveClassScheduleScreen;
