import React, { useState, useEffect, useMemo } from 'react';
import { StudentEnrolledCourse } from '../../types/student';
import { studentService } from '../../services/studentService';
import { StudentCourseCard } from '../cards/StudentCourseCard';
import { EmptyState } from '../common/EmptyState';

interface StudentCoursesScreenProps {
  scenario?: 'active' | 'new';
  onSelectCourse: (courseId: string) => void;
  onResumeCourse?: (courseId: string, lessonId?: string) => void;
  onExploreCourses?: () => void;
  onNavigateLiveClasses?: () => void;
  onNavigateAssignments?: () => void;
  onNavigateDPPs?: () => void;
  onToast?: (message: string) => void;
}

type StatusFilter = 'all' | 'active' | 'completed' | 'expired';
type SortOption = 'recent' | 'name' | 'progress';

export const StudentCoursesScreen: React.FC<StudentCoursesScreenProps> = ({
  scenario = 'active',
  onSelectCourse,
  onResumeCourse,
  onExploreCourses,
  onNavigateLiveClasses,
  onNavigateAssignments,
  onNavigateDPPs,
  onToast,
}) => {
  const [courses, setCourses] = useState<StudentEnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await studentService.getStudentCourses({
        scenario,
        status: statusFilter,
        searchQuery,
        sortBy,
        simulateDelayMs: 300,
      });
      setCourses(data);
    } catch (_err) {
      setError('Unable to load your courses. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [scenario, statusFilter, searchQuery, sortBy]);

  // Overall counts for filter tabs
  const [allCoursesRaw, setAllCoursesRaw] = useState<StudentEnrolledCourse[]>([]);
  useEffect(() => {
    studentService.getStudentCourses({ scenario, status: 'all', searchQuery: '', simulateDelayMs: 0 }).then((data) => {
      setAllCoursesRaw(data);
    });
  }, [scenario]);

  const counts = useMemo(() => {
    return {
      all: allCoursesRaw.length,
      active: allCoursesRaw.filter((c) => c.accessStatus === 'ACTIVE' || c.accessStatus === 'EXPIRING_SOON').length,
      completed: allCoursesRaw.filter((c) => c.accessStatus === 'COMPLETED' || c.progressPercent >= 100).length,
      expired: allCoursesRaw.filter((c) => c.accessStatus === 'EXPIRED').length,
    };
  }, [allCoursesRaw]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('recent');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* ======================================================== */}
      {/* 1. PAGE HEADER                                           */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#12365A] tracking-tight">
            My Courses
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Continue your learning journey.
          </p>
        </div>

        {/* Total enrolled badge & Live Class Schedule quick access */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {onNavigateLiveClasses && (
            <button
              type="button"
              onClick={onNavigateLiveClasses}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#F8FAFC] text-[#12365A] border border-[#E2E8F0] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">live_tv</span>
              <span>Live Classes</span>
            </button>
          )}
          {onNavigateAssignments && (
            <button
              type="button"
              onClick={onNavigateAssignments}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#F8FAFC] text-[#12365A] border border-[#E2E8F0] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#F6C20F]">assignment</span>
              <span>Assignments</span>
            </button>
          )}
          {onNavigateDPPs && (
            <button
              type="button"
              onClick={onNavigateDPPs}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#F8FAFC] text-[#12365A] border border-[#E2E8F0] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#35C978]">fact_check</span>
              <span>DPPs</span>
            </button>
          )}
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
            {counts.all} {counts.all === 1 ? 'Course Enrolled' : 'Courses Enrolled'}
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. SEARCH, FILTER & SORT TOOLBAR                          */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-card">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0" role="tablist">
          {(
            [
              { id: 'all', label: 'All', count: counts.all },
              { id: 'active', label: 'Active', count: counts.active },
              { id: 'completed', label: 'Completed', count: counts.completed },
              { id: 'expired', label: 'Expired', count: counts.expired },
            ] as const
          ).map((tab) => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#12365A] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#12365A] hover:bg-[#F5F8FC]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#94A3B8] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course, subject, exam..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-[#E2E8F0] bg-[#F5F8FC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:border-transparent text-[#12365A] placeholder-[#94A3B8] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#12365A] p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto shrink-0 flex items-center gap-2">
            <label htmlFor="course-sort-select" className="text-xs text-[#64748B] whitespace-nowrap hidden sm:inline">
              Sort by:
            </label>
            <div className="relative w-full sm:w-44">
              <select
                id="course-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full appearance-none pl-3 pr-8 py-2 text-xs rounded-lg border border-[#E2E8F0] bg-white text-[#12365A] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:border-transparent cursor-pointer"
              >
                <option value="recent">Recently Accessed</option>
                <option value="name">Course Name (A-Z)</option>
                <option value="progress">Highest Progress</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-[#64748B] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. CONTENT AREA: LOADING / ERROR / EMPTY / CARD GRID     */}
      {/* ======================================================== */}
      {isLoading ? (
        // Loading Skeleton Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-card flex flex-col h-[380px]"
            >
              <div className="h-44 bg-slate-200" />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-200 rounded-full w-full" />
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                </div>
                <div className="h-10 bg-slate-200 rounded-lg w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        // Local Error State
        <div className="w-full py-12 px-6 bg-white rounded-xl border border-red-200 text-center max-w-lg mx-auto shadow-card">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[26px]">error</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#12365A] mb-1">
            Unable to Load Courses
          </h3>
          <p className="text-xs text-[#64748B] mb-5">{error}</p>
          <button
            onClick={fetchCourses}
            className="px-5 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>Retry</span>
          </button>
        </div>
      ) : counts.all === 0 ? (
        // General Empty State: No Courses Enrolled in Student Profile
        <EmptyState
          icon="school"
          title="No Courses Enrolled Yet"
          description="You are not currently enrolled in any courses for this academic term. Contact your center administrator or explore open courses."
          actionLabel="Explore Public Catalog"
          onAction={onExploreCourses}
        />
      ) : courses.length === 0 ? (
        // Search/Filter Empty State: Matches 0 items
        <div className="w-full py-14 px-6 bg-white rounded-xl border border-[#E2E8F0] text-center max-w-lg mx-auto shadow-card">
          <div className="w-12 h-12 rounded-xl bg-[#E0F4FD] text-[#00A8F0] flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[24px]">search_off</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#12365A] mb-1">
            No Courses Found
          </h3>
          <p className="text-xs text-[#64748B] mb-5">
            We couldn't find any courses matching "{searchQuery || statusFilter}". Try adjusting your filters or search keywords.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2 rounded-lg bg-[#12365A] hover:bg-[#0E2C4A] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">clear_all</span>
            <span>Reset Search & Filters</span>
          </button>
        </div>
      ) : (
        // Responsive 3-Column Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <StudentCourseCard
              key={course.id}
              course={course}
              onViewCourse={onSelectCourse}
              onResumeCourse={(courseId, lessonId) => {
                if (onResumeCourse) {
                  onResumeCourse(courseId, lessonId);
                } else {
                  onSelectCourse(courseId);
                }
                if (onToast) {
                  onToast(`Resuming: ${course.title}`);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesScreen;
