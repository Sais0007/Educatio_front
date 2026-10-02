import React, { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { SampleTestCard } from '../cards/SampleTestCard';
import { EmptyState } from '../common/EmptyState';
import { getPublicSampleTests } from '../../data/mockData';
import { ExaminationType } from '../../types';

interface PublicSampleTestListingScreenProps {
  onNavigateHome: () => void;
  onEnrollToExplore: (testId: string) => void;
  onExploreTest?: (testId: string) => void;
  onNavigateExaminations?: () => void;
}

export const PublicSampleTestListingScreen: React.FC<PublicSampleTestListingScreenProps> = ({
  onNavigateHome,
  onEnrollToExplore,
  onExploreTest,
  onNavigateExaminations,
}) => {
  // Discovery & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<ExaminationType | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', onClick: onNavigateHome },
    { label: 'Sample Tests', isCurrent: true },
  ];

  // Examination Filter Options
  const examOptions: { id: ExaminationType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Examinations' },
    { id: 'jee-main', label: 'JEE Main' },
    { id: 'jee-adv', label: 'JEE Advanced' },
    { id: 'neet-ug', label: 'NEET-UG' },
    { id: 'foundation', label: 'Foundation' },
  ];

  // Subject Filter Options
  const subjectOptions: string[] = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Full Syllabus'];

  // Test Type Options
  const typeOptions: string[] = ['all', 'Full Mock Test', 'Sectional Assessment', 'Diagnostic Test'];

  // Dataset of Super Admin public sample tests
  const baseTests = useMemo(() => {
    return getPublicSampleTests();
  }, []);

  // Filtering Logic
  const filteredTests = useMemo(() => {
    return baseTests.filter((test) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = test.title.toLowerCase().includes(query);
        const matchesExam = test.examinationName.toLowerCase().includes(query);
        const matchesSubject = test.subject.toLowerCase().includes(query);
        const matchesType = test.testType.toLowerCase().includes(query);
        const matchesDesc = test.description.toLowerCase().includes(query);

        if (!matchesTitle && !matchesExam && !matchesSubject && !matchesType && !matchesDesc) {
          return false;
        }
      }

      // 2. Examination
      if (selectedExam !== 'all' && test.examId !== selectedExam) {
        return false;
      }

      // 3. Subject
      if (selectedSubject !== 'all' && test.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }

      // 4. Test Type
      if (selectedType !== 'all' && test.testType.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [baseTests, searchQuery, selectedExam, selectedSubject, selectedType]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedExam !== 'all' ||
    selectedSubject !== 'all' ||
    selectedType !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedExam('all');
    setSelectedSubject('all');
    setSelectedType('all');
    setHasError(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Page Introduction */}
        <div className="text-left mb-10 lg:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#00A8F0] text-xs font-semibold uppercase tracking-wider border border-[#00A8F0]/20">
            <span>Assessment &amp; Diagnostic Preview</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#12365A] tracking-tight leading-tight font-bold">
            Sample Tests
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl leading-relaxed font-sans font-normal">
            Explore representative tests and see how the platform helps you prepare, assess your performance and identify areas for improvement.
          </p>

          {/* Positioning & Gating Callout */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-xs sm:text-sm text-[#475569] flex items-center gap-3 max-w-3xl shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#6C63D9] shrink-0">
              insights
            </span>
            <span className="leading-relaxed">
              These sample tests provide representative previews of our examination interface and question patterns. Complete diagnostic analytics, topic-level error classification, and personalized mistake notebooks become accessible after enrollment.
            </span>
          </div>
        </div>

        {/* 2. Search & Lightweight Filter Controls */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8F0] shadow-sm mb-10 space-y-5">
          {/* Top Row: Search Input */}
          <div className="relative">
            <label htmlFor="sample-test-search" className="sr-only">
              Search sample tests
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] text-[20px] pointer-events-none">
                search
              </span>
              <input
                id="sample-test-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sample tests by name, subject, or examination..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-sm text-[#12365A] placeholder:text-[#64748B] focus:outline-none focus:border-[#00A8F0] focus:ring-1 focus:ring-[#00A8F0] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#12365A] p-0.5 rounded"
                  aria-label="Clear test search input"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Filter Controls: Examination, Subject & Test Type */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
              {/* Examination Filter */}
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#00A8F0] text-white shadow-sm'
                          : 'bg-[#F5F8FC] hover:bg-sky-50 text-[#475569] hover:text-[#12365A] border border-[#E2E8F0]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Subject Filter */}
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-150 ${
                        isActive
                          ? 'bg-[#00A8F0] text-white shadow-sm'
                          : 'bg-[#F5F8FC] hover:bg-sky-50 text-[#475569] hover:text-[#12365A] border border-[#E2E8F0]'
                      }`}
                    >
                      {subj === 'all' ? 'All Subjects' : subj}
                    </button>
                  );
                })}
              </div>

              {/* Test Type Select */}
              <div className="flex items-center gap-1.5">
                <label htmlFor="test-type-select" className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mr-1">
                  Type:
                </label>
                <select
                  id="test-type-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-xs font-medium text-[#12365A] focus:outline-none focus:border-[#00A8F0] cursor-pointer"
                >
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t === 'all' ? 'All Types' : t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count & Reset Control */}
            <div className="flex items-center gap-3 text-xs text-[#64748B] shrink-0 self-end lg:self-center">
              <span>
                Showing <strong className="text-[#12365A] font-semibold">{filteredTests.length}</strong>{' '}
                {filteredTests.length === 1 ? 'sample test' : 'sample tests'}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#00A8F0] hover:underline flex items-center gap-1"
                >
                  <span>Reset</span>
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. Main Content Grid, Loading Skeleton, Error State, or Empty State */}
        {isLoading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-7 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-6 w-24 bg-slate-100 rounded-lg" />
                  <div className="h-6 w-24 bg-slate-100 rounded-full" />
                </div>
                <div className="h-7 w-3/4 bg-slate-200 rounded-lg" />
                <div className="h-4 w-full bg-slate-100 rounded-lg" />
                <div className="h-10 w-full bg-slate-100 rounded-lg" />
                <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
                  <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
                  <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : hasError ? (
          /* Error State */
          <div className="w-full py-16 px-6 bg-white rounded-xl border border-[#E2E8F0] text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 text-[#DC3545] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">error_outline</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#12365A] font-bold mb-2">
              We couldn&apos;t load the tests right now
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6 max-w-md mx-auto">
              A temporary issue occurred while loading the public sample test catalogue. Please try again.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-xs font-semibold shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              <span>Try Again</span>
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        ) : filteredTests.length > 0 ? (
          /* Results Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTests.map((test) => (
              <SampleTestCard
                key={test.id}
                test={test}
                onEnrollToExplore={onEnrollToExplore}
                onExploreTest={onExploreTest}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <EmptyState
            icon="quiz"
            title="No sample tests available"
            description="We couldn't find any sample tests matching your active keywords or filter criteria. Try resetting your filters to view all preview assessments."
            actionLabel="Clear all filters"
            onAction={handleResetFilters}
          />
        )}

        {/* 4. Section 25: Platform Assessment Capability Preview (Informational Showcase) */}
        <section aria-labelledby="capability-heading" className="mt-20 text-left space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6C63D9]">
              <span className="material-symbols-outlined text-[16px]">analytics</span>
              <span>Post-Enrollment Diagnostic Engine</span>
            </div>
            <h2 id="capability-heading" className="font-serif text-2xl sm:text-3xl text-[#12365A] font-bold">
              How The Platform Evaluates Your Preparation
            </h2>
            <p className="text-sm text-[#64748B] max-w-3xl">
              Testing is not merely a scorecard. Our assessment architecture diagnoses the exact cognitive nature of your errors, enabling targeted correction instead of repeated blind practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* Capability 1: Tri-Category Mistake Classification */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#00A8F0] border border-[#00A8F0]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">category</span>
              </div>
              <h3 className="text-sm font-bold text-[#12365A]">
                Tri-Category Error Classification
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Automatically identifies whether each missed question was a <strong>Conceptual Gap</strong>, a <strong>Calculation Slip</strong>, or <strong>Pacing Panic</strong>.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#00A8F0] flex items-center gap-1">
                <span>Unlocked With Enrollment</span>
                <span className="material-symbols-outlined text-[13px]">lock</span>
              </div>
            </div>

            {/* Capability 2: Sub-Topic Accuracy & Bleed Heatmap */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#6C63D9] border border-[#6C63D9]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">grid_view</span>
              </div>
              <h3 className="text-sm font-bold text-[#12365A]">
                Sub-Topic Accuracy Breakdown
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Granular diagnostic maps highlighting which chapters bleed marks and which topics maintain rock-solid accuracy under test pressure.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#6C63D9] flex items-center gap-1">
                <span>Unlocked With Enrollment</span>
                <span className="material-symbols-outlined text-[13px]">lock</span>
              </div>
            </div>

            {/* Capability 3: Question Time Investment Curves */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#35C978] border border-[#35C978]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">speed</span>
              </div>
              <h3 className="text-sm font-bold text-[#12365A]">
                Question Time Pacing Benchmark
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Pinpoints questions where excessive time was spent without scoring, calibrating elimination instincts and time management.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#35C978] flex items-center gap-1">
                <span>Unlocked With Enrollment</span>
                <span className="material-symbols-outlined text-[13px]">lock</span>
              </div>
            </div>

            {/* Capability 4: Automated Mistake Notebook Sync */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F6C20F] border border-[#F6C20F]/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">auto_stories</span>
              </div>
              <h3 className="text-sm font-bold text-[#12365A]">
                Mistake Notebook Synchronization
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Every erroneous response is instantly stored in your digital Mistake Notebook with spaced repetition prompts until mastery is proven.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#B78A00] flex items-center gap-1">
                <span>Unlocked With Enrollment</span>
                <span className="material-symbols-outlined text-[13px]">lock</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Institutional Pathway Callout */}
        <div className="mt-16 bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#00A8F0] border border-[#00A8F0]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">domain</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#12365A]">
              Looking for Proctored All-India CBT Test Series?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Partner Institutes and physical/digital Branches provide complete proctored examination test series with national percentiles, peer cohort ranks, and in-person invigilation. You can explore examination tracks to connect with accredited centers.
            </p>
            {onNavigateExaminations && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateExaminations}
                  className="text-xs font-bold text-[#00A8F0] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Supported Examination Series</span>
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

export default PublicSampleTestListingScreen;
