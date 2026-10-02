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
      <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14 animate-pulse space-y-8">
          <div className="h-4 w-48 bg-slate-200 rounded-lg" />
          <div className="space-y-4">
            <div className="h-6 w-32 bg-slate-200 rounded-full" />
            <div className="h-10 w-3/4 bg-slate-200 rounded-lg" />
            <div className="h-5 w-1/2 bg-slate-200 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-48 bg-white border border-[#E2E8F0] rounded-xl" />
              <div className="h-64 bg-white border border-[#E2E8F0] rounded-xl" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-80 bg-white border border-[#E2E8F0] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (hasError) {
    return (
      <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl border border-[#E2E8F0] p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 text-[#DC3545] flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[28px]">error_outline</span>
          </div>
          <h2 className="font-serif text-2xl text-[#12365A] mb-2 font-bold">
            We couldn&apos;t load this test right now
          </h2>
          <p className="text-sm text-[#64748B] mb-6 leading-relaxed font-sans">
            A temporary issue occurred while loading the test preview. Please try again or return to the sample tests catalogue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#00A8F0] text-white text-xs font-semibold hover:bg-[#0096D6] transition-all"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={onBackToListing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#F5F8FC] text-[#00A8F0] border border-[#00A8F0]/30 text-xs font-semibold hover:bg-sky-50 transition-all"
            >
              Back to Sample Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Not Found / Unavailable State
  if (!test) {
    return (
      <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
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
    <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Test Hero Section */}
        <section aria-labelledby="test-hero-heading" className="text-left mb-12 space-y-4">
          {/* Badges Row: Sample Preview Tag, Examination, Subject & Test Type */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Sample Preview Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#00A8F0] border border-[#00A8F0]/20 text-xs font-semibold tracking-wide">
              <span className="material-symbols-outlined text-[15px] text-[#00A8F0]">
                visibility
              </span>
              <span>Sample Test · Public Preview</span>
            </span>

            {/* Examination Tag */}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white text-[#12365A] border border-[#E2E8F0]">
              {test.examinationName}
            </span>

            {/* Subject Badge */}
            <span className="px-2.5 py-1 rounded-full bg-sky-50 text-[#00A8F0] text-xs font-semibold uppercase tracking-wider border border-[#00A8F0]/20">
              {test.subject}
            </span>

            {/* Test Type Chip */}
            <span className="text-xs font-medium text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              {test.testType}
            </span>
          </div>

          {/* Test Title */}
          <h1
            id="test-hero-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#12365A] tracking-tight leading-tight font-bold"
          >
            {test.title}
          </h1>

          {/* Test Value / Short Description */}
          <p className="text-base sm:text-lg text-[#64748B] max-w-3xl leading-relaxed font-sans font-normal">
            {test.description}
          </p>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-6 text-xs text-[#64748B] flex-wrap pt-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                quiz
              </span>
              <span>
                <strong className="font-semibold text-[#12365A]">{test.totalQuestions} Questions</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                timer
              </span>
              <span>
                <strong className="font-semibold text-[#12365A]">{test.durationMinutes} Minutes</strong> Duration
              </span>
            </div>

            {test.totalMarks && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  military_tech
                </span>
                <span>
                  Total Score: <strong className="font-semibold text-[#12365A]">{test.totalMarks} Marks</strong>
                </span>
              </div>
            )}

            {test.targetYear && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  calendar_today
                </span>
                <span>Target Cohort: <strong className="font-semibold text-[#12365A]">{test.targetYear}</strong></span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-[#00A8F0]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-medium">Representative Open Preview · No Payment</span>
            </div>
          </div>

          {/* Hero Action Row: Primary Enroll CTA & Secondary Back Action */}
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <button
              type="button"
              onClick={() => onEnrollToExplore(test.id)}
              className="px-6 py-3 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-2"
              aria-label={`Enroll to explore more for ${test.title}`}
            >
              <span>Enroll to Explore More</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={onBackToListing}
              className="px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-[#12365A] text-sm font-medium border border-[#E2E8F0] transition-all duration-150 inline-flex items-center gap-1.5"
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
              <section aria-labelledby="test-overview-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  <h2 id="test-overview-heading" className="font-sans font-bold">Test Overview</h2>
                </div>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
                  {test.overview}
                </p>
              </section>
            )}

            {/* Section: What the Test Experience Includes */}
            <section aria-labelledby="included-capabilities-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#35C978] uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-[#35C978]">check_circle</span>
                <h2 id="included-capabilities-heading" className="font-sans font-bold text-[#12365A]">Included In This Test Experience</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {test.previewFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0]"
                  >
                    <span className="text-[#35C978] font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-xs sm:text-sm text-[#12365A] leading-relaxed font-sans">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Gated Post-Enrollment Capabilities */}
            <section aria-labelledby="gated-capabilities-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#F6C20F]/40 shadow-sm space-y-4 bg-gradient-to-br from-white via-amber-50/10 to-amber-50/20">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B78A00] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px] text-[#F6C20F]">lock</span>
                  <h2 id="gated-capabilities-heading" className="font-sans font-bold text-[#12365A]">Unlocked With Enrollment</h2>
                </div>
                <span className="text-xs font-semibold text-[#B78A00] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Post-Test Diagnostic Engine
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                When you enroll in the platform, this test connects to our diagnostic analysis engine, transforming a static scorecard into actionable cognitive remediation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {test.gatedFeatures.map((gated, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#F6C20F]/30 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#F6C20F] shrink-0 mt-0.5">
                      lock
                    </span>
                    <span className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans">
                      {gated}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Examination Pattern & Scoring Scheme */}
            {test.scoringScheme && (
              <section aria-labelledby="scoring-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  <h2 id="scoring-heading" className="font-sans font-bold">Pattern &amp; Scoring Scheme</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-sky-50 border border-[#00A8F0]/20">
                    <span className="text-2xl font-bold text-[#00A8F0]">+{test.scoringScheme.correct}</span>
                    <p className="text-xs font-semibold text-[#12365A] mt-1 font-sans">Correct Response</p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-2xl font-bold text-[#DC3545]">-{Math.abs(test.scoringScheme.incorrect)}</span>
                    <p className="text-xs font-semibold text-[#12365A] mt-1 font-sans">Incorrect Response</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0]">
                    <span className="text-2xl font-bold text-[#64748B]">{test.scoringScheme.unattempted}</span>
                    <p className="text-xs font-semibold text-[#12365A] mt-1 font-sans">Unattempted</p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#64748B]">
                  <strong className="text-[#12365A]">Evaluation Rule:</strong> {test.scoringScheme.format}
                </div>
              </section>
            )}

            {/* Section: Syllabus Coverage */}
            {test.syllabusTopics && test.syllabusTopics.length > 0 && (
              <section aria-labelledby="syllabus-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <h2 id="syllabus-heading" className="font-sans font-bold">Tested Syllabus Units</h2>
                </div>
                <ul className="space-y-2.5">
                  {test.syllabusTopics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#475569]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A8F0] shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Section: Instructions Summary & Rules */}
            {test.instructionsSummary && test.instructionsSummary.length > 0 && (
              <section aria-labelledby="instructions-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">gavel</span>
                  <h2 id="instructions-heading" className="font-sans font-bold">Assessment Protocol &amp; Instructions</h2>
                </div>
                <ol className="space-y-2.5 list-decimal pl-4 text-xs sm:text-sm text-[#475569] leading-relaxed font-sans">
                  {test.instructionsSummary.map((inst, iIdx) => (
                    <li key={iIdx}>{inst}</li>
                  ))}
                </ol>
                <div className="pt-2 text-xs text-[#64748B] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">info</span>
                  <span>Protected question content and interactive answer inputs remain guarded until enrollment.</span>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Key Details Card & Primary Access Box */}
          <div className="lg:col-span-4 sticky top-28 space-y-6 text-left">
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-6">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Access Status
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif text-[#12365A] font-bold">
                    Public Preview
                  </span>
                  <span className="text-xs font-semibold text-[#00A8F0] bg-sky-50 px-2.5 py-0.5 rounded-full border border-[#00A8F0]/20">
                    Sample Test
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Representative academic evaluation to benchmark your pacing and examination familiarity.
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => onEnrollToExplore(test.id)}
                  className="w-full py-3 px-4 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-2"
                >
                  <span>Enroll to Explore More</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <p className="text-[11px] text-center text-[#64748B]">
                  Zero cost preview · Full analytics unlock on enrollment
                </p>
              </div>

              {/* Test Information Key Fields */}
              <div className="space-y-3 pt-5 border-t border-[#E2E8F0] text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Examination</span>
                  <span className="font-semibold text-[#12365A]">{test.examinationName}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Subject</span>
                  <span className="font-semibold text-[#12365A]">{test.subject}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Test Type</span>
                  <span className="font-semibold text-[#12365A]">{test.testType}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Total Questions</span>
                  <span className="font-semibold text-[#12365A]">{test.totalQuestions} Questions</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Duration</span>
                  <span className="font-semibold text-[#12365A]">{test.durationMinutes} Minutes</span>
                </div>
                {test.totalMarks && (
                  <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                    <span className="text-[#64748B]">Total Marks</span>
                    <span className="font-semibold text-[#12365A]">{test.totalMarks} Marks</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Delivery Format</span>
                  <span className="font-semibold text-[#00A8F0]">Web Computer-Based Test</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#64748B]">Academic Oversight</span>
                  <span className="font-semibold text-[#12365A]">Super Admin Curated</span>
                </div>
              </div>

              {/* Platform Authority Note */}
              <div className="p-3.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-xs text-[#475569] space-y-1">
                <div className="font-semibold text-[#12365A] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">verified</span>
                  <span>Representative Preview</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#64748B]">
                  Test questions and answer forms are unlocked through the authenticated candidate experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Primary Access CTA Banner */}
        <section aria-labelledby="cta-banner-heading" className="mt-16 bg-[#12365A] text-white rounded-xl p-8 sm:p-12 text-left relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-white/20">
              National Standard Testing
            </span>
            <h2 id="cta-banner-heading" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Ready to test your preparation in {test.subject}?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-normal">
              Experience authentic computer-based testing, analyze conceptual failure points, and eliminate negative marks through structured post-test diagnostics.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onEnrollToExplore(test.id)}
                className="px-6 py-3 rounded-lg bg-[#00A8F0] text-white hover:bg-[#0096D6] text-sm font-semibold shadow-sm transition-all duration-150 inline-flex items-center gap-2"
              >
                <span>Enroll to Explore More</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        </section>

        {/* 4. Related Sample Tests Section */}
        {relatedTests.length > 0 && (
          <section aria-labelledby="related-tests-heading" className="mt-20 text-left space-y-6">
            <div className="space-y-1">
              <h2 id="related-tests-heading" className="font-serif text-2xl sm:text-3xl text-[#12365A] font-bold">
                Related Sample Tests
              </h2>
              <p className="text-sm text-[#64748B]">
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
        <div className="mt-16 bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#00A8F0] border border-[#00A8F0]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">domain</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#12365A]">
              Looking for All-India Proctored Examination Series?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Full-length scheduled test series with all-India percentiles, classroom invigilation, and physical testing centers are conducted exclusively through accredited partner Institutes and Branches.
            </p>
            {onNavigateExaminations && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateExaminations}
                  className="text-xs font-bold text-[#00A8F0] hover:underline inline-flex items-center gap-1"
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
