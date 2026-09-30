import React, { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { ExaminationCard } from '../cards/ExaminationCard';
import { EmptyState } from '../common/EmptyState';
import { EXAMINATIONS, COHORT_YEARS } from '../../data/mockData';
import { ExaminationType, ExaminationCategory } from '../../types';

interface ExaminationListingScreenProps {
  onNavigateHome: () => void;
  onExploreExamination: (examId: ExaminationType) => void;
}

export const ExaminationListingScreen: React.FC<ExaminationListingScreenProps> = ({
  onNavigateHome,
  onExploreExamination,
}) => {
  // Discovery State: Search, Category, and Target Year
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExaminationCategory | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<number | string | 'all'>('all');

  // Breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', onClick: onNavigateHome },
    { label: 'Examinations', isCurrent: true },
  ];

  // Categories list
  const categories: { id: ExaminationCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'medical', label: 'Medical' },
    { id: 'foundation', label: 'Foundation (9-10)' },
  ];

  // Filtering Logic
  const filteredExaminations = useMemo(() => {
    return EXAMINATIONS.filter((exam) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = exam.title.toLowerCase().includes(query);
        const matchesCode = exam.shortCode.toLowerCase().includes(query);
        const matchesDesc = exam.description.toLowerCase().includes(query);
        const matchesSubject = exam.subjects?.some((s) => s.toLowerCase().includes(query));
        const matchesAuthority = exam.conductingBody?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCode && !matchesDesc && !matchesSubject && !matchesAuthority) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && exam.category !== selectedCategory) {
        return false;
      }

      // 3. Target Year Filter (Contextual)
      if (selectedYear !== 'all') {
        const matchYear = exam.supportedYears?.includes(selectedYear);
        if (!matchYear) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedYear !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedYear('all');
  };

  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* 1. Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 2. Page Introduction */}
        <div className="text-left mb-10 lg:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-bold uppercase tracking-widest border border-[#cde5ff]">
            <span>Examination Discovery</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0b1c30] tracking-tight leading-tight font-normal">
            Examinations
          </h1>
          <p className="text-base sm:text-lg text-[#40474f] max-w-2xl leading-relaxed font-sans font-normal">
            Discover national entrance examinations supported across participating Institutes and Branches. Select your examination to explore affiliated branch cohorts, syllabus roadmaps, and proctored CBT simulations.
          </p>
        </div>

        {/* 3 & 4. Search and Filters Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e2e8f0] shadow-xs mb-10 space-y-5">
          {/* Top Row: Search Input + Target Year Selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input Field */}
            <div className="md:col-span-8 relative">
              <label htmlFor="exam-search" className="sr-only">
                Search examinations
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] text-[20px] pointer-events-none">
                  search
                </span>
                <input
                  id="exam-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search examinations by name, authority, or subject..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-sm text-[#0b1c30] placeholder:text-[#64748b] focus:outline-none focus:border-[#0369a1] focus:ring-2 focus:ring-[#eff4ff] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0b1c30] p-0.5 rounded"
                    aria-label="Clear search input"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Target Year (Contextual Filter) */}
            <div className="md:col-span-4 relative">
              <label htmlFor="target-year-select" className="sr-only">
                Target Year Cohort
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0369a1] text-[18px] pointer-events-none">
                  calendar_today
                </span>
                <select
                  id="target-year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))}
                  className="w-full pl-10 pr-9 py-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-sm text-[#0b1c30] focus:outline-none focus:border-[#0369a1] focus:ring-2 focus:ring-[#eff4ff] appearance-none cursor-pointer font-medium"
                >
                  <option value="all">All Target Years</option>
                  {COHORT_YEARS.map((cy) => (
                    <option key={cy.id} value={cy.id}>
                      {cy.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Category Filter Pills + Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#f1f5f9]">
            {/* Category Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mr-1">
                Category:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#0369a1] text-white shadow-xs'
                        : 'bg-[#f8fafc] hover:bg-[#eff4ff] text-[#40474f] hover:text-[#0b1c30] border border-[#e2e8f0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Filter Reset & Results Counter */}
            <div className="flex items-center gap-3 text-xs text-[#64748b]">
              <span>
                Showing <strong className="text-[#0b1c30] font-semibold">{filteredExaminations.length}</strong> {filteredExaminations.length === 1 ? 'examination' : 'examinations'}
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

        {/* 5 & 6. Examination Results Grid or Empty State */}
        {filteredExaminations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredExaminations.map((examination) => (
              <ExaminationCard
                key={examination.id}
                examination={examination}
                onExplore={onExploreExamination}
                selectedYear={selectedYear}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching examinations found"
            description="We couldn't find any examinations matching your active search keywords or filter criteria. Try clearing your filters to see all supported programs."
            actionLabel="Clear all filters"
            onAction={handleResetFilters}
          />
        )}

        {/* 7. Institutional Relationship Context Callout */}
        <div className="mt-16 bg-[#eff4ff]/60 rounded-2xl p-6 sm:p-8 border border-[#cde5ff] text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0369a1] border border-[#cde5ff] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">apartment</span>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0b1c30]">
              Delivered Through Partner Institutes &amp; Branches
            </h4>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Examinations are not global self-study courses. After selecting an examination, you will be guided to connect with your affiliated Institute and physical or digital Branch to enrol in its specialized cohort and academic schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExaminationListingScreen;
