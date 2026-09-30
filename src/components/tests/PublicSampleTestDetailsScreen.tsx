import React, { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { SampleTestCard } from '../cards/SampleTestCard';
import { EmptyState } from '../common/EmptyState';
import { getPublicSampleTestById, getRelatedPublicSampleTests } from '../../data/mockData';

interface PublicSampleTestDetailsScreenProps {
  testId: string;
  onNavigateHome: () => void;
  onBackToListing: () => void;
  onSelectRelatedTest: (testId: string) => void;
  onEnrollToExplore: (testId: string) => void;
  onNavigateExaminations?: () => void;
}

export const PublicSampleTestDetailsScreen: React.FC<PublicSampleTestDetailsScreenProps> = ({
  testId,
  onNavigateHome,
  onBackToListing,
  onSelectRelatedTest,
  onEnrollToExplore,
  onNavigateExaminations,
}) => {
  // Simulated loading & error states
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Retrieve test strictly via visibility predicate
  const test = useMemo(() => {
    return getPublicSampleTestById(testId);
  }, [testId]);

  // Related tests
  const relatedTests = useMemo(() => {
    if (!test) return [];
    return getRelatedPublicSampleTests(test, 2);
  }, [test]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-background text-on-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14 animate-pulse space-y-8">
          <div className="h-4 w-48 bg-slate-200 rounded" />
          <div className="space-y-4">
            <div className="h-6 w-32 bg-slate-200 rounded-full" />
            <div className="h-10 w-3/4 bg-slate-200 rounded" />
            <div className="h-5 w-1/2 bg-slate-200 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-48 bg-slate-100 rounded-2xl" />
              <div className="h-64 bg-slate-100 rounded-2xl" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-80 bg-slate-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (hasError) {
    return (
      <div className="w-full min-h-screen bg-background text-on-surface flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[28px]">error_outline</span>
          </div>
          <h2 className="font-serif text-2xl text-[#0b1c30] mb-2 font-medium">
            We couldn&apos;t load this test right now
          </h2>
          <p className="text-sm text-[#40474f] mb-6 leading-relaxed">
            A temporary issue occurred while loading the test preview. Please try again or return to the sample tests catalogue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0369a1] text-white text-xs font-semibold hover:bg-[#0284c7] transition-all"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={onBackToListing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff] text-xs font-semibold hover:bg-[#e5eeff] transition-all"
            >
              Back to Sample Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Not Found / Unavailable State (Test does not exist or fails Super Admin Public visibility)
  if (!test) {
    return (
      <div className="w-full min-h-screen bg-background text-on-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'Sample Tests', onClick: onBackToListing },
              { label: 'Unavailable Test', isCurrent: true },
            ]}
          />
          <div className="py-12">
            <EmptyState
              icon="lock"
              title="Test Not Available"
              description="The requested assessment could not be found, is no longer public, or is currently unavailable. Please explore our active sample tests catalogue."
              actionLabel="Back to Sample Tests"
              onAction={onBackToListing}
            />
          </div>
        </div>
      </div>
    );
  }

  // 4. Standard Details Screen
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', onClick: onNavigateHome },
    { label: 'Sample Tests', onClick: onBackToListing },
    { label: test.title, isCurrent: true },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Test Hero Section */}
        <section aria-labelledby="test-hero-heading" className="text-left mb-12 space-y-4">
          {/* Badges Row: Sample Preview Tag, Examination, Subject & Test Type */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Sample Preview Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold tracking-wide">
              <span className="material-symbols-outlined text-[15px] text-blue-600">
                visibility
              </span>
              <span>Sample Test · Public Preview</span>
            </span>

            {/* Examination Tag */}
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
              {test.examinationName}
            </span>

            {/* Subject Badge */}
            <span className="px-2.5 py-1 rounded-md bg-[#eff4ff] text-[#0369a1] text-xs font-semibold uppercase tracking-wider border border-[#cde5ff]">
              {test.subject}
            </span>

            {/* Test Type Chip */}
            <span className="text-xs font-medium text-[#40474f] bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              {test.testType}
            </span>
          </div>

          {/* Test Title */}
          <h1
            id="test-hero-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0b1c30] tracking-tight leading-tight font-normal"
          >
            {test.title}
          </h1>

          {/* Test Value / Short Description */}
          <p className="text-base sm:text-lg text-[#40474f] max-w-3xl leading-relaxed font-sans font-normal">
            {test.description}
          </p>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-6 text-xs text-[#40474f] flex-wrap pt-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#0369a1]">
                quiz
              </span>
              <span>
                <strong className="font-semibold text-[#0b1c30]">{test.totalQuestions} Questions</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#0369a1]">
                timer
              </span>
              <span>
                <strong className="font-semibold text-[#0b1c30]">{test.durationMinutes} Minutes</strong> Duration
              </span>
            </div>

            {test.totalMarks && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#0369a1]">
                  military_tech
                </span>
                <span>
                  Total Score: <strong className="font-semibold text-[#0b1c30]">{test.totalMarks} Marks</strong>
                </span>
              </div>
            )}

            {test.targetYear && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#0369a1]">
                  calendar_today
                </span>
                <span>Target Cohort: <strong className="font-semibold text-[#0b1c30]">{test.targetYear}</strong></span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-blue-700">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-medium">Representative Open Preview · No Payment</span>
            </div>
          </div>

          {/* Hero Action Row: Primary Enroll CTA & Secondary Back Action */}
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <button
              type="button"
              onClick={() => onEnrollToExplore(test.id)}
              className="px-6 py-3 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-sm font-semibold shadow-xs hover:shadow-card transition-all duration-150 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0369a1] focus:ring-offset-2"
              aria-label={`Enroll to explore more for ${test.title}`}
            >
              <span>Enroll to Explore More</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={onBackToListing}
              className="px-5 py-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0369a1] text-sm font-semibold border border-[#cde5ff] transition-all duration-150 inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Sample Tests</span>
            </button>
          </div>
        </section>

        {/* 2. Main Content Grid (8 Columns Left / 4 Columns Right Sticky Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Overview, Included Capabilities, Gated Features, Syllabus & Scoring */}
          <div className="lg:col-span-8 space-y-10 text-left">
            {/* Section: Test Overview */}
            {test.overview && (
              <section aria-labelledby="test-overview-heading" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0369a1] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  <h2 id="test-overview-heading">Test Overview</h2>
                </div>
                <p className="text-sm sm:text-base text-[#40474f] leading-relaxed font-sans">
                  {test.overview}
                </p>
              </section>
            )}

            {/* Section: What the Test Experience Includes */}
            <section aria-labelledby="included-capabilities-heading" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <h2 id="included-capabilities-heading">Included In This Test Experience</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {test.previewFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]/80"
                  >
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-xs sm:text-sm text-[#0b1c30] leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Gated Post-Enrollment Capabilities */}
            <section aria-labelledby="gated-capabilities-heading" className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4 bg-gradient-to-br from-white via-amber-50/10 to-amber-50/20">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px] text-amber-600">lock</span>
                  <h2 id="gated-capabilities-heading">Unlocked With Enrollment</h2>
                </div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Post-Test Diagnostic Engine
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
                When you enroll in the platform, this test connects to our diagnostic analysis engine, transforming a static scorecard into actionable cognitive remediation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {test.gatedFeatures.map((gated, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-amber-200/60 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">
                      lock
                    </span>
                    <span className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
                      {gated}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Examination Pattern & Scoring Scheme */}
            {test.scoringScheme && (
              <section aria-labelledby="scoring-heading" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0369a1] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  <h2 id="scoring-heading">Pattern &amp; Scoring Scheme</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-[#eff4ff]/60 border border-[#cde5ff]">
                    <span className="text-2xl font-bold text-[#0369a1]">+{test.scoringScheme.correct}</span>
                    <p className="text-xs font-semibold text-[#0b1c30] mt-1">Correct Response</p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/60 border border-red-200">
                    <span className="text-2xl font-bold text-red-600">{test.scoringScheme.incorrect}</span>
                    <p className="text-xs font-semibold text-[#0b1c30] mt-1">Incorrect Response</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-2xl font-bold text-[#64748b]">{test.scoringScheme.unattempted}</span>
                    <p className="text-xs font-semibold text-[#0b1c30] mt-1">Unattempted</p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#64748b]">
                  <strong className="text-[#0b1c30]">Evaluation Rule:</strong> {test.scoringScheme.format}
                </div>
              </section>
            )}

            {/* Section: Syllabus Coverage */}
            {test.syllabusTopics && test.syllabusTopics.length > 0 && (
              <section aria-labelledby="syllabus-heading" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0369a1] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <h2 id="syllabus-heading">Tested Syllabus Units</h2>
                </div>
                <ul className="space-y-2.5">
                  {test.syllabusTopics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#40474f]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0369a1] shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Section: Instructions Summary & Rules */}
            {test.instructionsSummary && test.instructionsSummary.length > 0 && (
              <section aria-labelledby="instructions-heading" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0369a1] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">gavel</span>
                  <h2 id="instructions-heading">Assessment Protocol &amp; Instructions</h2>
                </div>
                <ol className="space-y-2.5 list-decimal pl-4 text-xs sm:text-sm text-[#40474f] leading-relaxed">
                  {test.instructionsSummary.map((inst, iIdx) => (
                    <li key={iIdx}>{inst}</li>
                  ))}
                </ol>
                <div className="pt-2 text-xs text-[#64748b] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0369a1]">info</span>
                  <span>Protected question content and interactive answer inputs remain guarded until enrollment.</span>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Key Details Card & Primary Access Box */}
          <div className="lg:col-span-4 sticky top-28 space-y-6 text-left">
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs space-y-6">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                  Access Status
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif text-[#0b1c30] font-normal">
                    Public Preview
                  </span>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Sample Test
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">
                  Representative academic evaluation to benchmark your pacing and examination familiarity.
                </p>
              </div>

              {/* Primary Action Button (Exact Requested Label) */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => onEnrollToExplore(test.id)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-sm font-semibold shadow-xs hover:shadow-card transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0369a1] focus:ring-offset-2"
                >
                  <span>Enroll to Explore More</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <p className="text-[11px] text-center text-[#64748b]">
                  Zero cost preview · Full analytics unlock on enrollment
                </p>
              </div>

              {/* Test Information Key Fields */}
              <div className="space-y-3 pt-5 border-t border-[#f1f5f9] text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc]">
                  <span className="text-[#64748b]">Examination</span>
                  <span className="font-semibold text-[#0b1c30]">{test.examinationName}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc]">
                  <span className="text-[#64748b]">Subject</span>
                  <span className="font-semibold text-[#0b1c30]">{test.subject}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc]">
                  <span className="text-[#64748b]">Test Type</span>
                  <span className="font-semibold text-[#0b1c30]">{test.testType}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc]">
                  <span className="text-[#64748b]">Total Questions</span>
                  <span className="font-semibold text-[#0b1c30]">{test.totalQuestions} Questions</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc]">
                  <span className="text-[#64748b]">Duration</span>
                  <span className="font-semibold text-[#0b1c30]">{test.durationMinutes} Minutes</span>
                </div>
                {test.totalMarks && (
                  <div className="flex items-center justify-between py-1 border-b border-[#f8fafc]">
                    <span className="text-[#64748b]">Total Marks</span>
                    <span className="font-semibold text-[#0b1c30]">{test.totalMarks} Marks</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc]">
                  <span className="text-[#64748b]">Delivery Format</span>
                  <span className="font-semibold text-[#0369a1]">Web Computer-Based Test</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#64748b]">Academic Oversight</span>
                  <span className="font-semibold text-[#0b1c30]">Super Admin Curated</span>
                </div>
              </div>

              {/* Platform Authority Note */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#40474f] space-y-1">
                <div className="font-semibold text-[#0b1c30] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0369a1]">verified</span>
                  <span>Representative Preview</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#64748b]">
                  Test questions and answer forms are unlocked through the authenticated candidate experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Primary Access CTA Banner */}
        <section aria-labelledby="cta-banner-heading" className="mt-16 bg-[#0369a1] text-white rounded-3xl p-8 sm:p-12 text-left relative overflow-hidden shadow-elevated">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-white/20">
              National Standard Testing
            </span>
            <h2 id="cta-banner-heading" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
              Ready to test your preparation in {test.subject}?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-normal">
              Experience authentic computer-based testing, analyze conceptual failure points, and eliminate negative marks through structured post-test diagnostics.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onEnrollToExplore(test.id)}
                className="px-6 py-3 rounded-xl bg-white text-[#0369a1] hover:bg-slate-50 text-sm font-semibold shadow-xs transition-all duration-150 inline-flex items-center gap-2"
              >
                <span>Enroll to Explore More</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        </section>

        {/* 4. Related Sample Tests Section (Section 22) */}
        {relatedTests.length > 0 && (
          <section aria-labelledby="related-tests-heading" className="mt-20 text-left space-y-6">
            <div className="space-y-1">
              <h2 id="related-tests-heading" className="font-serif text-2xl sm:text-3xl text-[#0b1c30] font-normal">
                Related Sample Tests
              </h2>
              <p className="text-sm text-[#40474f]">
                Explore additional preview assessments for {test.examinationName} and related subjects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedTests.map((relTest) => (
                <SampleTestCard
                  key={relTest.id}
                  test={relTest}
                  onEnrollToExplore={onSelectRelatedTest}
                />
              ))}
            </div>
          </section>
        )}

        {/* 5. Institutional Pathway Callout */}
        <div className="mt-16 bg-[#eff4ff]/60 rounded-2xl p-6 sm:p-8 border border-[#cde5ff] text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0369a1] border border-[#cde5ff] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">domain</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#0b1c30]">
              Looking for All-India Proctored Examination Series?
            </h3>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Full-length scheduled test series with all-India percentiles, classroom invigilation, and physical testing centers are conducted exclusively through accredited partner Institutes and Branches.
            </p>
            {onNavigateExaminations && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateExaminations}
                  className="text-xs font-bold text-[#0369a1] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Partner Examination Series</span>
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

export default PublicSampleTestDetailsScreen;
