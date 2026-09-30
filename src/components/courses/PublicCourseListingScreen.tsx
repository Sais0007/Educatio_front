import React, { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { PublicCourseCard } from '../cards/PublicCourseCard';
import { EmptyState } from '../common/EmptyState';
import { getPublicFreeCourses } from '../../data/mockData';
import { ExaminationType } from '../../types';

interface PublicCourseListingScreenProps {
  onNavigateHome: () => void;
  onExploreCourse: (courseId: string) => void;
  onNavigateExaminations?: () => void;
}

export const PublicCourseListingScreen: React.FC<PublicCourseListingScreenProps> = ({
  onNavigateHome,
  onExploreCourse,
  onNavigateExaminations,
}) => {
  // Discovery & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<ExaminationType | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Loading & Error States (Supports robust UI verification and future API hook)
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', onClick: onNavigateHome },
    { label: 'Courses', isCurrent: true },
  ];

  // Examination Filter Options
  const examOptions: { id: ExaminationType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Examinations' },
    { id: 'jee-main', label: 'JEE Main' },
    { id: 'jee-adv', label: 'JEE Advanced' },
    { id: 'neet-ug', label: 'NEET-UG' },
    { id: 'foundation', label: 'Foundation (9-10)' },
  ];

  // Subject Filter Options
  const subjectOptions: string[] = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  // Base dataset: strictly filtered to Super Admin managed, Public, Published, Free courses
  const baseCourses = useMemo(() => {
    return getPublicFreeCourses();
  }, []);

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return baseCourses.filter((course) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesExam = course.examinationName.toLowerCase().includes(query);
        const matchesSubject = course.subject.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesFaculty = course.faculty?.name.toLowerCase().includes(query);

        if (!matchesTitle && !matchesExam && !matchesSubject && !matchesDesc && !matchesFaculty) {
          return false;
        }
      }

      // 2. Examination Filter
      if (selectedExam !== 'all' && course.examId !== selectedExam) {
        return false;
      }

      // 3. Subject Filter
      if (selectedSubject !== 'all' && course.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [baseCourses, searchQuery, selectedExam, selectedSubject]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedExam !== 'all' || selectedSubject !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedExam('all');
    setSelectedSubject('all');
    setHasError(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* 1. Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 2. Page Introduction */}
        <div className="text-left mb-10 lg:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-bold uppercase tracking-widest border border-[#cde5ff]">
            <span>Platform Public Catalogue</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0b1c30] tracking-tight leading-tight font-normal">
            Free Courses
          </h1>

          <p className="text-base sm:text-lg text-[#40474f] max-w-2xl leading-relaxed font-sans font-normal">
            Explore free courses available through the platform and start learning without purchasing an Institute course.
          </p>

          {/* Business Model Clarity Callout */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#40474f] flex items-center gap-3 max-w-3xl">
            <span className="material-symbols-outlined text-[20px] text-[#0369a1] shrink-0">
              verified
            </span>
            <span>
              All courses shown below are centrally maintained by academic directors for open public access. These courses are free to all guests and students, completely independent of any Institute or Branch membership.
            </span>
          </div>
        </div>

        {/* 3. Search and Filters Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e2e8f0] shadow-xs mb-10 space-y-5">
          {/* Top Row: Search Input */}
          <div className="relative">
            <label htmlFor="public-course-search" className="sr-only">
              Search free courses
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] text-[20px] pointer-events-none">
                search
              </span>
              <input
                id="public-course-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title, subject, or examination..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-sm text-[#0b1c30] placeholder:text-[#64748b] focus:outline-none focus:border-[#0369a1] focus:ring-2 focus:ring-[#eff4ff] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0b1c30] p-0.5 rounded"
                  aria-label="Clear course search input"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Examination & Subject Filter Pills + Dynamic Counter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-[#f1f5f9]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
              {/* Examination Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mr-1">
                  Exam:
                </span>
                {examOptions.map((opt) => {
                  const isActive = selectedExam === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedExam(opt.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#0369a1] text-white shadow-xs'
                          : 'bg-[#f8fafc] hover:bg-[#eff4ff] text-[#40474f] hover:text-[#0b1c30] border border-[#e2e8f0]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Subject Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mr-1">
                  Subject:
                </span>
                {subjectOptions.map((subj) => {
                  const isActive = selectedSubject.toLowerCase() === subj.toLowerCase();
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-150 ${
                        isActive
                          ? 'bg-[#0369a1] text-white shadow-xs'
                          : 'bg-[#f8fafc] hover:bg-[#eff4ff] text-[#40474f] hover:text-[#0b1c30] border border-[#e2e8f0]'
                      }`}
                    >
                      {subj === 'all' ? 'All Subjects' : subj}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Reset & Results Counter */}
            <div className="flex items-center gap-3 text-xs text-[#64748b] shrink-0 self-end lg:self-center">
              <span>
                Showing <strong className="text-[#0b1c30] font-semibold">{filteredCourses.length}</strong>{' '}
                {filteredCourses.length === 1 ? 'free course' : 'free courses'}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#0369a1] hover:underline flex items-center gap-1"
                >
                  <span>Reset</span>
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4. Main Content: Loading State, Error State, Empty State, or Results Grid */}
        {isLoading ? (
          /* Loading Skeleton State */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-7 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-6 w-24 bg-slate-100 rounded-md" />
                  <div className="h-6 w-20 bg-slate-100 rounded-full" />
                </div>
                <div className="h-7 w-3/4 bg-slate-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
                <div className="pt-4 border-t border-[#f1f5f9] flex justify-between items-center">
                  <div className="h-4 w-28 bg-slate-100 rounded" />
                  <div className="h-8 w-28 bg-slate-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : hasError ? (
          /* Error State */
          <div className="w-full py-16 px-6 bg-white rounded-2xl border border-[#e2e8f0] text-center max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">error_outline</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#0b1c30] font-medium mb-2">
              We couldn&apos;t load the courses right now
            </h3>
            <p className="text-sm text-[#40474f] leading-relaxed mb-6 max-w-md mx-auto">
              A temporary issue occurred while loading the public course catalogue. Please try again.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#0369a1] text-[#0369a1] hover:text-white text-xs font-semibold border border-[#cde5ff] transition-all duration-150 inline-flex items-center gap-2"
            >
              <span>Try Again</span>
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        ) : filteredCourses.length > 0 ? (
          /* Results Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <PublicCourseCard
                key={course.id}
                course={course}
                onExplore={onExploreCourse}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <EmptyState
            icon="menu_book"
            title="No free courses found"
            description="We couldn't find any free courses matching your active search keywords or filter criteria. Try clearing your filters to see all available open-access courses."
            actionLabel="Clear all filters"
            onAction={handleResetFilters}
          />
        )}

        {/* 5. Institutional Coaching Pathway Callout */}
        <div className="mt-16 bg-[#eff4ff]/60 rounded-2xl p-6 sm:p-8 border border-[#cde5ff] text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0369a1] border border-[#cde5ff] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">domain</span>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0b1c30]">
              Looking for Comprehensive Institute Cohorts?
            </h4>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Full-length academic tracks with physical or hybrid classroom batches, live faculty mentorship, and proctored CBT mocks are provided exclusively through partner Institutes and Branches. You can browse national examination patterns to discover affiliated branch enrollments.
            </p>
            {onNavigateExaminations && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateExaminations}
                  className="text-xs font-bold text-[#0369a1] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Supported Examinations</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCourseListingScreen;
