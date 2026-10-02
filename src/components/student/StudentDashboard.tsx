import React, { useState, useEffect } from 'react';
import {
  StudentDashboardData,
  StudentNavSection,
} from '../../types/student';
import { studentService } from '../../services/studentService';

interface StudentDashboardProps {
  scenario?: 'active' | 'new';
  onNavigateSection: (section: StudentNavSection) => void;
  onToast: (message: string) => void;
  onExplorePublicCourses?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  scenario = 'active',
  onNavigateSection,
  onToast,
  onExplorePublicCourses,
}) => {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section-specific loading/error tracking
  const [recRefreshing, setRecRefreshing] = useState(false);
  const [upcomingRefreshing, setUpcomingRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    studentService
      .getDashboardData({ scenario, simulateDelayMs: 300 })
      .then((res) => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((_err) => {
        if (isMounted) {
          setError('Failed to load student dashboard. Please retry.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [scenario]);

  const handleRefreshRecommendations = async () => {
    setRecRefreshing(true);
    try {
      const recs = await studentService.getRecommendations(scenario);
      if (data) {
        setData({ ...data, recommendations: recs });
      }
      onToast('Recommendations refreshed.');
    } catch {
      onToast('Failed to refresh recommendations.');
    } finally {
      setRecRefreshing(false);
    }
  };

  const handleRefreshUpcoming = async () => {
    setUpcomingRefreshing(true);
    try {
      const upcoming = await studentService.getUpcomingActivities(scenario);
      if (data) {
        setData({ ...data, upcomingActivities: upcoming });
      }
      onToast('Upcoming schedule updated.');
    } catch {
      onToast('Failed to update upcoming activities.');
    } finally {
      setUpcomingRefreshing(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse text-left py-4" aria-busy="true" aria-label="Loading student dashboard">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-slate-200 rounded-lg w-64" />
          <div className="h-4 bg-slate-100 rounded-md w-96" />
        </div>

        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-white rounded-lg border border-[#E2E8F0]" />
          ))}
        </div>

        {/* Continue Learning Skeleton */}
        <div className="h-56 bg-white rounded-xl border border-[#E2E8F0]" />

        {/* 2-Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-44 bg-white rounded-xl border border-[#E2E8F0]" />
            <div className="h-44 bg-white rounded-xl border border-[#E2E8F0]" />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="h-64 bg-white rounded-xl border border-[#E2E8F0]" />
            <div className="h-48 bg-white rounded-xl border border-[#E2E8F0]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 text-[#DC3545] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[28px]">error</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-[#12365A]">
          Unable to Load Dashboard
        </h3>
        <p className="text-xs text-[#64748B] leading-relaxed">
          {error || 'An unexpected error occurred while loading your student profile.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            studentService.getDashboardData({ scenario }).then(setData).finally(() => setIsLoading(false));
          }}
          className="px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  const { student, continueLearning, enrolledCourses, upcomingActivities, performance, recommendations, recentActivities, accessSummary } = data;

  return (
    <div className="space-y-8 text-left pb-16">
      {/* ======================================================== */}
      {/* 1. PERSONALIZED GREETING & CONTEXT HEADER                */}
      {/* ======================================================== */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#12365A] tracking-tight leading-tight font-bold">
            {getGreeting()}, <span className="text-[#00A8F0]">{student.name.split(' ')[0]}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-sans">
            Continue your preparation and stay on track.
          </p>
        </div>

        {/* Student Enrollment Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-[#E2E8F0] shadow-card self-start sm:self-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#35C978]" />
          <div className="text-left text-xs">
            <span className="font-bold text-[#12365A] block">{student.targetExamLabel}</span>
            <span className="text-[10px] text-[#64748B]">{student.branchName}</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* QUICK ACTIONS BAR (Supplementary, Clean & Compact)       */}
      {/* ======================================================== */}
      <section aria-label="Quick Navigation">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'My Learning', section: 'learning' as StudentNavSection, icon: 'menu_book', count: enrolledCourses.length },
            { label: 'Practice Arena', section: 'practice' as StudentNavSection, icon: 'edit_note' },
            { label: 'Test Series', section: 'tests' as StudentNavSection, icon: 'quiz', badge: upcomingActivities.filter((a) => a.type === 'test').length > 0 ? 'Upcoming' : undefined },
            { label: 'Mistake Notebook', section: 'revision' as StudentNavSection, icon: 'auto_fix_high' },
            { label: 'Resource Vault', section: 'resources' as StudentNavSection, icon: 'folder_open' },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onNavigateSection(action.section)}
              className="flex items-center justify-between p-3 rounded-lg bg-white hover:bg-[#E0F4FD]/30 border border-[#E2E8F0] hover:border-[#00A8F0]/40 text-left transition-all duration-150 shadow-card group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#E0F4FD] group-hover:bg-[#00A8F0] text-[#00A8F0] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
                </div>
                <span className="text-xs font-semibold text-[#12365A] group-hover:text-[#00A8F0] truncate font-sans">
                  {action.label}
                </span>
              </div>
              {action.badge ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] font-bold shrink-0">
                  {action.badge}
                </span>
              ) : action.count !== undefined ? (
                <span className="text-[11px] font-bold text-[#64748B] shrink-0 font-sans">
                  {action.count}
                </span>
              ) : (
                <span className="material-symbols-outlined text-[16px] text-slate-300 group-hover:text-[#00A8F0] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CONTINUE LEARNING (Most Prominent Learning Section)   */}
      {/* ======================================================== */}
      <section aria-labelledby="continue-learning-heading">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">play_circle</span>
            <h3 id="continue-learning-heading" className="font-serif text-xl font-bold text-[#12365A]">
              Continue Learning
            </h3>
          </div>
          {enrolledCourses.length > 1 && (
            <button
              type="button"
              onClick={() => onNavigateSection('learning')}
              className="text-xs font-semibold text-[#00A8F0] hover:underline flex items-center gap-1"
            >
              <span>View all ({enrolledCourses.length}) courses</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          )}
        </div>

        {continueLearning ? (
          /* Active Course Hero Card */
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-card border border-[#E2E8F0] relative overflow-hidden">
            {/* Subtle Ambient Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00A8F0]/10 via-transparent to-transparent pointer-events-none rounded-full" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-4">
                {/* Meta tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
                    {continueLearning.subject}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    {continueLearning.batchName}
                  </span>
                  <span className="text-slate-300">&middot;</span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    Last activity: {continueLearning.lastActivityAt}
                  </span>
                </div>

                {/* Course Title */}
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#12365A] font-bold leading-tight">
                    {continueLearning.title}
                  </h4>
                  <p className="text-xs text-[#64748B] mt-1 font-medium">
                    Faculty: {continueLearning.facultyName} ({continueLearning.facultyDesignation})
                  </p>
                </div>

                {/* Current Lesson Box */}
                <div className="p-3.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#00A8F0] shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      {continueLearning.currentLesson.type === 'video' ? 'smart_display' : 'assignment'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                      Next Up: {continueLearning.currentModule.title}
                    </span>
                    <span className="text-xs font-semibold text-[#12365A] truncate block">
                      {continueLearning.currentLesson.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#64748B] shrink-0">
                    {continueLearning.currentLesson.duration}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#64748B]">
                      Progress: <span className="font-semibold text-[#12365A]">{continueLearning.completedLessons} of {continueLearning.totalLessons} lessons completed</span>
                    </span>
                    <span className="font-bold text-[#00A8F0]">{continueLearning.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className="h-full bg-[#00A8F0] rounded-full transition-all duration-300"
                      style={{ width: `${continueLearning.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right CTA Area */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-3 lg:border-l lg:border-[#E2E8F0] lg:pl-6">
                <button
                  type="button"
                  onClick={() => {
                    onToast(`Launching ${continueLearning.currentLesson.title}`);
                    onNavigateSection('learning');
                  }}
                  className="py-3.5 px-6 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-sm font-semibold shadow-card hover:shadow-dropdown transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">play_circle</span>
                  <span>Continue Learning</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateSection('learning')}
                  className="py-2.5 px-4 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#12365A] text-xs font-semibold border border-[#E2E8F0] transition-colors text-center cursor-pointer"
                >
                  Course Syllabus &amp; Modules
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State for New Student */
          <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-[#E2E8F0] shadow-card space-y-4">
            <div className="w-14 h-14 rounded-xl bg-[#E0F4FD] border border-[#BAE6FD] text-[#00A8F0] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">school</span>
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="font-serif text-xl font-bold text-[#12365A]">
                Your learning journey starts here.
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Once you enroll in a course through your Institute and Branch, your lectures, study materials, and batch assignments will appear here.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onExplorePublicCourses || (() => onNavigateSection('learning'))}
                className="px-6 py-3 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-card transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Accessible Courses</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 2-COLUMN MAIN CONTENT GRID (Upcoming + Progress & Performance) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: UPCOMING ACTIVITIES & ENROLLED COURSES (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* ======================================================== */}
          {/* 3. UPCOMING ACTIVITIES                                   */}
          {/* ======================================================== */}
          <section aria-labelledby="upcoming-activities-heading">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">schedule</span>
                <h3 id="upcoming-activities-heading" className="font-serif text-xl font-bold text-[#12365A]">
                  Upcoming Activities
                </h3>
              </div>
              <button
                type="button"
                disabled={upcomingRefreshing}
                onClick={handleRefreshUpcoming}
                className="text-xs text-[#64748B] hover:text-[#00A8F0] flex items-center gap-1 focus:outline-none cursor-pointer"
                title="Refresh schedule"
              >
                <span className={`material-symbols-outlined text-[16px] ${upcomingRefreshing ? 'animate-spin' : ''}`}>
                  refresh
                </span>
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {upcomingActivities.length > 0 ? (
              <div className="space-y-3">
                {upcomingActivities.map((act) => {
                  const isTest = act.type === 'test';
                  const isClass = act.type === 'live_class';

                  return (
                    <div
                      key={act.id}
                      className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-card hover:border-[#00A8F0]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        {/* Type Icon Badge */}
                        <div
                          className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border ${
                            isTest
                              ? 'bg-[#F5F3FF] border-[#DDD6FE] text-[#6C63D9]'
                              : isClass
                              ? 'bg-[#E0F4FD] border-[#BAE6FD] text-[#00A8F0]'
                              : 'bg-[#FEFCE8] border-[#FEF08A] text-[#B45309]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            {isTest ? 'quiz' : isClass ? 'live_tv' : 'assignment'}
                          </span>
                        </div>

                        {/* Title & Metadata */}
                        <div className="space-y-1 min-w-0 text-left">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                                isTest
                                  ? 'bg-[#F5F3FF] text-[#6C63D9] border-[#DDD6FE]'
                                  : isClass
                                  ? 'bg-[#E0F4FD] text-[#00A8F0] border-[#BAE6FD]'
                                  : 'bg-[#FEFCE8] text-[#B45309] border-[#FEF08A]'
                              }`}
                            >
                              {isTest ? 'Mock Test' : isClass ? 'Live Class' : 'Assignment'}
                            </span>
                            <span className="text-xs font-medium text-[#64748B]">
                              {act.formattedDate} &middot; {act.formattedTime}
                            </span>
                          </div>

                          <h5 className="font-bold text-sm sm:text-base text-[#12365A] truncate">
                            {act.title}
                          </h5>

                          <p className="text-xs text-[#64748B] truncate">
                            {act.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* CTA Action */}
                      <div className="shrink-0 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => {
                            if (isTest) onNavigateSection('tests');
                            else if (isClass) onToast(`Connecting to live room: ${act.title}`);
                            else onToast(`Opening ${act.title}`);
                          }}
                          className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                            isTest
                              ? 'bg-[#00A8F0] hover:bg-[#0092D1] text-white shadow-card'
                              : 'bg-white hover:bg-[#E0F4FD] text-[#00A8F0] hover:text-[#0092D1] border border-[#00A8F0]'
                          }`}
                        >
                          <span>{act.actionLabel}</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] text-center text-xs text-[#64748B] shadow-card">
                <span className="material-symbols-outlined text-[24px] text-slate-300 block mb-1">
                  event_available
                </span>
                No upcoming tests or classes scheduled for your branch at this time.
              </div>
            )}
          </section>

          {/* ======================================================== */}
          {/* 4. MY LEARNING / COURSE PROGRESS SUMMARY                 */}
          {/* ======================================================== */}
          <section aria-labelledby="my-learning-heading">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">menu_book</span>
                <h3 id="my-learning-heading" className="font-serif text-xl font-bold text-[#12365A]">
                  My Learning Progress
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateSection('learning')}
                className="text-xs font-semibold text-[#00A8F0] hover:underline"
              >
                Go to My Courses &rarr;
              </button>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-card flex flex-col justify-between hover:border-[#00A8F0]/40 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
                          {c.subject}
                        </span>
                        <span className="text-[11px] font-bold text-[#00A8F0]">
                          {c.progressPercent}%
                        </span>
                      </div>

                      <div>
                        <h5 className="font-bold text-sm text-[#12365A] line-clamp-2 leading-tight">
                          {c.title}
                        </h5>
                        <p className="text-[11px] text-[#64748B] mt-1">
                          {c.facultyName}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                        <div
                          className="h-full bg-[#00A8F0] rounded-full"
                          style={{ width: `${c.progressPercent}%` }}
                        />
                      </div>

                      {/* Current lesson tag */}
                      <div className="p-2 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-[11px] text-[#64748B] truncate">
                        <span className="font-semibold text-[#12365A]">Next: </span>
                        {c.currentLesson.title}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span className="text-[10px] text-[#64748B]">{c.validUntil}</span>
                      <button
                        type="button"
                        onClick={() => {
                          onToast(`Opening ${c.title}`);
                          onNavigateSection('learning');
                        }}
                        className="text-xs font-semibold text-[#00A8F0] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Resume</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] text-center text-xs text-[#64748B] shadow-card">
                No active courses yet. Reach out to your Institute coordinator or browse the Course Catalog.
              </div>
            )}
          </section>

          {/* ======================================================== */}
          {/* 5. RECOMMENDATIONS ("Recommended for You")               */}
          {/* ======================================================== */}
          <section aria-labelledby="recommendations-heading">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#6C63D9]">psychology</span>
                <h3 id="recommendations-heading" className="font-serif text-xl font-bold text-[#12365A]">
                  Recommended for You
                </h3>
              </div>
              <button
                type="button"
                disabled={recRefreshing}
                onClick={handleRefreshRecommendations}
                className="text-xs text-[#64748B] hover:text-[#00A8F0] flex items-center gap-1 focus:outline-none cursor-pointer"
                title="Refresh recommendations"
              >
                <span className={`material-symbols-outlined text-[16px] ${recRefreshing ? 'animate-spin' : ''}`}>
                  refresh
                </span>
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#00A8F0]/40 shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                            rec.priority === 'high'
                              ? 'bg-[#F5F3FF] text-[#6C63D9] border-[#DDD6FE]'
                              : 'bg-[#E0F4FD] text-[#00A8F0] border-[#BAE6FD]'
                          }`}
                        >
                          {rec.actionType === 'revision' ? 'Mistake Remediation' : rec.actionType.toUpperCase()}
                        </span>
                        <span className="text-xs text-[#64748B]">{rec.context}</span>
                      </div>
                      <h5 className="font-bold text-sm text-[#12365A]">
                        {rec.title}
                      </h5>
                      <p className="text-xs text-[#64748B] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#00A8F0]">info</span>
                        {rec.reason}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (rec.actionType === 'revision') onNavigateSection('revision');
                        else if (rec.actionType === 'practice') onNavigateSection('practice');
                        else if (rec.actionType === 'resource') onNavigateSection('resources');
                        else onNavigateSection('learning');
                      }}
                      className="px-4 py-2 rounded-lg bg-white hover:bg-[#E0F4FD] text-[#00A8F0] text-xs font-semibold border border-[#00A8F0] transition-colors shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      {rec.actionLabel} &rarr;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] text-center text-xs text-[#64748B] shadow-card">
                No active recommendations. As you solve practice sheets and complete mock assessments, personalized recommendations will appear here.
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: PERFORMANCE SNAPSHOT, RECENT ACTIVITY, ACCESS (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* ======================================================== */}
          {/* 6. PERFORMANCE SNAPSHOT                                  */}
          {/* ======================================================== */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-card text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#6C63D9]">insights</span>
                <h4 className="font-serif text-lg font-bold text-[#12365A]">
                  Performance Snapshot
                </h4>
              </div>
              <button
                type="button"
                onClick={() => onNavigateSection('results')}
                className="text-xs font-semibold text-[#00A8F0] hover:underline cursor-pointer"
              >
                Analytics &rarr;
              </button>
            </div>

            {performance.hasHistory ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                    Latest Authentic Assessment
                  </span>
                  <div className="font-bold text-xs text-[#12365A] mt-0.5 truncate">
                    {performance.latestTestTitle}
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <div>
                      <span className="font-serif text-2xl font-bold text-[#00A8F0]">
                        {performance.latestTestScore}
                      </span>
                      <span className="text-xs text-[#64748B]"> / {performance.latestTestMaxScore}</span>
                    </div>
                    <span className="text-xs font-bold text-[#35C978]">
                      {performance.latestTestAccuracy}% Accuracy
                    </span>
                  </div>
                  {performance.recentTrendLabel && (
                    <div className="text-[11px] text-[#35C978] font-medium mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      <span>{performance.recentTrendLabel}</span>
                    </div>
                  )}
                </div>

                {/* Subject Accuracy Split */}
                {performance.subjectBreakdown && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                      Subject Distribution
                    </span>
                    {performance.subjectBreakdown.map((s) => (
                      <div key={s.subject} className="flex justify-between items-center text-xs">
                        <span className="text-[#12365A]">{s.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#12365A] font-semibold">{s.score}/{s.maxScore}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F8FC] text-[#64748B] border border-[#E2E8F0]">
                            {s.accuracy}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigateSection('results')}
                    className="w-full py-2.5 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#00A8F0] text-xs font-semibold border border-[#E2E8F0] transition-colors text-center cursor-pointer"
                  >
                    View Question-Wise Autopsy &rarr;
                  </button>
                </div>
              </div>
            ) : (
              /* Meaningful Empty State for New Student (No fake charts/percentiles) */
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[#E0F4FD] text-[#00A8F0] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[24px]">fact_check</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#12365A]">
                    No test results yet.
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Complete an authentic CBT test to evaluate your conceptual accuracy and mistake breakdown.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateSection('tests')}
                  className="px-4 py-2 rounded-lg bg-[#00A8F0] text-white text-xs font-semibold hover:bg-[#0092D1] transition-colors cursor-pointer"
                >
                  Explore Tests
                </button>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* 7. RECENT ACTIVITY                                       */}
          {/* ======================================================== */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-card text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">history</span>
                <h4 className="font-serif text-lg font-bold text-[#12365A]">
                  Recent Activity
                </h4>
              </div>
              <span className="text-[10px] text-[#64748B] font-medium">Timeline</span>
            </div>

            {recentActivities.length > 0 ? (
              <div className="divide-y divide-[#E2E8F0] space-y-3 pt-1">
                {recentActivities.map((act) => (
                  <div key={act.id} className="pt-3 first:pt-0 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-[#00A8F0] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">{act.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-xs font-semibold text-[#12365A] line-clamp-2 leading-tight">
                        {act.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                        <span className="truncate">{act.context}</span>
                        <span className="shrink-0">{act.formattedTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-[#64748B]">
                <span className="material-symbols-outlined text-[20px] text-slate-300 block mb-1">
                  hourglass_empty
                </span>
                Your recent learning activity will appear here.
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* 8. PURCHASE & ACCESS ENTITLEMENT SUMMARY (Subtle Box)    */}
          {/* ======================================================== */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-left text-xs space-y-2 shadow-card">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#00A8F0] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Verified Entitlement
              </span>
              <span className="text-[#35C978] font-bold text-[10px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {accessSummary.status}
              </span>
            </div>
            <div className="font-bold text-[#12365A]">
              {accessSummary.instituteBranchLabel}
            </div>
            <div className="text-[11px] text-[#64748B]">
              {accessSummary.planName} &middot; Valid through {accessSummary.validityExpiry}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
