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
    <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* 1. Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 2. Page Introduction */}
        <div className="text-left mb-10 lg:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-xs font-bold uppercase tracking-widest border border-[#BAE6FD]">
            <span>Platform Public Catalogue</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#12365A] tracking-tight leading-tight font-bold">
            Free Courses
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl leading-relaxed font-sans font-normal">
            Explore free courses available through the platform and start learning without purchasing an Institute course.
          </p>

          {/* Business Model Clarity Callout */}
          <div className="p-4 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-xs sm:text-sm text-[#64748B] flex items-center gap-3 max-w-3xl">
            <span className="material-symbols-outlined text-[20px] text-[#00A8F0] shrink-0">
              verified
            </span>
            <span>
              All courses shown below are centrally maintained by academic directors for open public access. These courses are free to all guests and students, completely independent of any Institute or Branch membership.
            </span>
          </div>
        </div>

        {/* 3. Search and Filters Bar */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8F0] shadow-card mb-10 space-y-5">
          {/* Top Row: Search Input */}
          <div className="relative">
            <label htmlFor="public-course-search" className="sr-only">
              Search free courses
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] text-[20px] pointer-events-none">
                search
              </span>
              <input
                id="public-course-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title, subject, or examination..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-sm text-[#12365A] placeholder:text-[#64748B] focus:outline-none focus:border-[#00A8F0] focus:ring-2 focus:ring-[#E0F4FD] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#12365A] p-0.5 rounded cursor-pointer"
                  aria-label="Clear course search input"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Examination & Subject Filter Pills + Dynamic Counter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
              {/* Examination Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mr-1">
                  Exam:
                </span>
                {examOptions.map((opt) => {
                  const isActive = selectedExam === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedExam(opt.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#00A8F0] text-white shadow-card'
                          : 'bg-[#F5F8FC] hover:bg-[#E0F4FD] text-[#12365A] border border-[#E2E8F0]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Subject Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mr-1">
                  Subject:
                </span>
                {subjectOptions.map((subj) => {
                  const isActive = selectedSubject.toLowerCase() === subj.toLowerCase();
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#00A8F0] text-white shadow-card'
                          : 'bg-[#F5F8FC] hover:bg-[#E0F4FD] text-[#12365A] border border-[#E2E8F0]'
                      }`}
                    >
                      {subj === 'all' ? 'All Subjects' : subj}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Reset & Results Counter */}
            <div className="flex items-center gap-3 text-xs text-[#64748B] shrink-0 self-end lg:self-center">
              <span>
                Showing <strong className="text-[#12365A] font-bold">{filteredCourses.length}</strong>{' '}
                {filteredCourses.length === 1 ? 'free course' : 'free courses'}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#00A8F0] hover:underline flex items-center gap-1 cursor-pointer"
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
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-7 space-y-4"
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
                <div className="pt-4 border-t border-[#E2E8F0] flex justify-between items-center">
                  <div className="h-4 w-28 bg-slate-100 rounded" />
                  <div className="h-8 w-28 bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : hasError ? (
          /* Error State */
          <div className="w-full py-16 px-6 bg-white rounded-xl border border-[#E2E8F0] text-center max-w-xl mx-auto shadow-card">
            <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 text-[#DC3545] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">error_outline</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#12365A] font-bold mb-2">
              We couldn&apos;t load the courses right now
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6 max-w-md mx-auto">
              A temporary issue occurred while loading the public course catalogue. Please try again.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-card transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
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
        <div className="mt-16 bg-[#E0F4FD]/40 rounded-xl p-6 sm:p-8 border border-[#BAE6FD] text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-white text-[#00A8F0] border border-[#BAE6FD] flex items-center justify-center shrink-0 mt-0.5 shadow-card">
            <span className="material-symbols-outlined text-[22px]">domain</span>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#12365A]">
              Looking for Comprehensive Institute Cohorts?
            </h4>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Full-length academic tracks with physical or hybrid classroom batches, live faculty mentorship, and proctored CBT mocks are provided exclusively through partner Institutes and Branches. You can browse national examination patterns to discover affiliated branch enrollments.
            </p>
            {onNavigateExaminations && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateExaminations}
                  className="text-xs font-bold text-[#00A8F0] hover:underline inline-flex items-center gap-1 cursor-pointer"
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
