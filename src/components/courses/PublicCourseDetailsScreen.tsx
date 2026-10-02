import React, { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { PublicCourseCard } from '../cards/PublicCourseCard';
import { CourseResourceCard } from '../cards/CourseResourceCard';
import { ResourcePreviewModal } from '../modals/ResourcePreviewModal';
import { EmptyState } from '../common/EmptyState';
import {
  getPublicCourseById,
  getRelatedPublicCourses,
  getCourseResources,
} from '../../data/mockData';
import { CourseResource } from '../../types';

interface PublicCourseDetailsScreenProps {
  courseId: string;
  onNavigateHome: () => void;
  onBackToListing: () => void;
  onSelectRelatedCourse: (courseId: string) => void;
  onStartLearning: (courseId: string) => void;
  onNavigateExaminations?: () => void;
  onViewResource?: (resource: CourseResource) => void;
}

export const PublicCourseDetailsScreen: React.FC<PublicCourseDetailsScreenProps> = ({
  courseId,
  onNavigateHome,
  onBackToListing,
  onSelectRelatedCourse,
  onStartLearning,
  onNavigateExaminations,
  onViewResource,
}) => {
  // State for simulated loading / error states
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [selectedResourceForPreview, setSelectedResourceForPreview] = useState<CourseResource | null>(null);
  const [showAllResources, setShowAllResources] = useState(false);

  // Retrieve course strictly via visibility-enforcing helper
  const course = useMemo(() => {
    return getPublicCourseById(courseId);
  }, [courseId]);

  // Related public courses
  const relatedCourses = useMemo(() => {
    if (!course) return [];
    return getRelatedPublicCourses(course, 2);
  }, [course]);

  // Contextual public course resources
  const resources = useMemo(() => {
    if (!course) return [];
    return getCourseResources(course.id);
  }, [course]);

  // Paginated/expandable subset of visible resources (default 4)
  const visibleResources = useMemo(() => {
    return showAllResources ? resources : resources.slice(0, 4);
  }, [resources, showAllResources]);

  // Toggle module accordion
  const toggleModule = (modId: string) => {
    setExpandedModuleId((prev) => (prev === modId ? null : modId));
  };

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
            We couldn&apos;t load this course right now
          </h2>
          <p className="text-sm text-[#64748B] mb-6 leading-relaxed font-sans">
            A temporary issue occurred while loading the course details. Please try again or return to the free courses catalogue.
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
              Back to Free Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Not Found / Unavailable State
  if (!course) {
    return (
      <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'Courses', onClick: onBackToListing },
              { label: 'Unavailable Course', isCurrent: true },
            ]}
          />
          <div className="py-12">
            <EmptyState
              icon="lock"
              title="Course Not Available"
              description="The requested course could not be found, is no longer public, or is currently unavailable. Please explore our active free courses catalogue."
              actionLabel="Back to Free Courses"
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
    { label: 'Courses', onClick: onBackToListing },
    { label: course.title, isCurrent: true },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Course Hero Section */}
        <section aria-labelledby="course-hero-heading" className="text-left mb-12 space-y-4">
          {/* Badges Row: Free Indicator, Examination, Subject & Level */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Free Open Access Indicator */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold tracking-wide">
              <span className="material-symbols-outlined text-[15px] text-[#35C978]">
                lock_open
              </span>
              <span>Free Course · Open Access</span>
            </span>

            {/* Examination Tag */}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white text-[#12365A] border border-[#E2E8F0]">
              {course.examinationName}
            </span>

            {/* Subject Tag */}
            <span className="px-2.5 py-1 rounded-full bg-sky-50 text-[#00A8F0] text-xs font-semibold uppercase tracking-wider border border-[#00A8F0]/20">
              {course.subject}
            </span>

            {/* Level Tag (if available) */}
            {course.level && (
              <span className="text-xs font-medium text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {course.level}
              </span>
            )}
          </div>

          {/* Course Title */}
          <h1
            id="course-hero-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#12365A] tracking-tight leading-tight font-bold"
          >
            {course.title}
          </h1>

          {/* Course Value / Short Description */}
          <p className="text-base sm:text-lg text-[#64748B] max-w-3xl leading-relaxed font-sans font-normal">
            {course.description}
          </p>

          {/* Key Facts Summary Strip */}
          <div className="flex items-center gap-6 text-xs text-[#64748B] flex-wrap pt-2">
            {course.duration && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  schedule
                </span>
                <span className="font-medium text-[#12365A]">{course.duration}</span>
              </div>
            )}
            {course.contentSummary && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  layers
                </span>
                <span>
                  <strong className="font-semibold text-[#12365A]">
                    {course.contentSummary.modulesCount} Modules
                  </strong>{' '}
                  ({course.contentSummary.lecturesCount} Lectures)
                </span>
              </div>
            )}
            {course.targetYear && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
                  calendar_today
                </span>
                <span>Target Cohort: <strong className="font-semibold text-[#12365A]">{course.targetYear}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="material-symbols-outlined text-[18px] text-[#35C978]">verified</span>
              <span className="font-medium">100% Free · No Payment Required</span>
            </div>
          </div>

          {/* Hero Action Row: Primary Start Learning CTA & Secondary Back Action */}
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <button
              type="button"
              onClick={() => onStartLearning(course.id)}
              className="px-6 py-3 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-2"
              aria-label={`Start learning ${course.title}`}
            >
              <span>Start Learning</span>
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
            </button>

            <button
              type="button"
              onClick={onBackToListing}
              className="px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-[#12365A] text-sm font-medium border border-[#E2E8F0] transition-all duration-150 inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Free Courses</span>
            </button>
          </div>
        </section>

        {/* 2. Main Content Grid (8 Columns Left / 4 Columns Right Sticky Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Course Overview, What You'll Learn, Curriculum, Faculty, Prerequisites */}
          <div className="lg:col-span-8 space-y-10 text-left">
            {/* Section: Course Overview */}
            {course.overview && (
              <section aria-labelledby="overview-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  <h2 id="overview-heading" className="font-sans font-bold">Course Overview</h2>
                </div>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
                  {course.overview}
                </p>
              </section>
            )}

            {/* Section: What You'll Learn */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <section aria-labelledby="learning-outcomes-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <h2 id="learning-outcomes-heading" className="font-sans font-bold">What You&apos;ll Learn</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0]"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#35C978] shrink-0 mt-0.5">
                        check
                      </span>
                      <span className="text-xs sm:text-sm text-[#12365A] leading-relaxed font-sans">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Course Content / Curriculum Breakdown */}
            <section aria-labelledby="curriculum-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <h2 id="curriculum-heading" className="font-sans font-bold">Course Curriculum</h2>
                </div>
                {course.contentSummary && (
                  <span className="text-xs text-[#64748B]">
                    {course.contentSummary.modulesCount} Modules · {course.contentSummary.lecturesCount} Lectures Total
                  </span>
                )}
              </div>

              {/* Module Outline Accordion */}
              {course.modules && course.modules.length > 0 ? (
                <div className="space-y-3 pt-2">
                  {course.modules.map((mod, index) => {
                    const isExpanded = expandedModuleId === mod.id;
                    return (
                      <div
                        key={mod.id}
                        className="rounded-lg border border-[#E2E8F0] overflow-hidden transition-all duration-150"
                      >
                        <button
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          className="w-full p-4 sm:p-5 bg-[#F5F8FC] hover:bg-sky-50/50 flex items-center justify-between text-left transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-md bg-white text-[#00A8F0] border border-[#00A8F0]/30 text-xs font-bold flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="text-sm font-semibold text-[#12365A]">
                                {mod.title}
                              </h3>
                              <p className="text-xs text-[#64748B] mt-0.5">
                                {mod.lecturesCount} Lectures{mod.duration ? ` · ${mod.duration}` : ''}
                              </p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-[20px] text-[#64748B]">
                            {isExpanded ? 'expand_less' : 'expand_more'}
                          </span>
                        </button>

                        {/* Expanded Topics Outline */}
                        {isExpanded && (
                          <div className="p-4 sm:p-5 bg-white border-t border-[#E2E8F0] space-y-2.5">
                            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                              Topics Covered:
                            </p>
                            <ul className="space-y-2">
                              {mod.topics.map((topic, topicIdx) => (
                                <li
                                  key={topicIdx}
                                  className="flex items-center gap-2.5 text-xs sm:text-sm text-[#475569]"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8F0] shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Fallback Content Summary when specific module breakdown is not yet provided */
                <div className="p-4 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-xs text-[#475569] leading-relaxed">
                  Structured chapter video lectures, theory notes, and problem-solving assignments are included across all modules in this course.
                </div>
              )}

              {/* Informative Boundary Note */}
              <div className="pt-2 text-xs text-[#64748B] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                  info
                </span>
                <span>
                  Public curriculum overview. Interactive video player, lecture notes, and practice problem sets are unlocked upon starting.
                </span>
              </div>
            </section>

            {/* Section: Course Resources (Contextual Public Resources) */}
            {resources.length > 0 && (
              <section
                aria-labelledby="course-resources-heading"
                className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[18px]">folder_open</span>
                      <h2 id="course-resources-heading" className="font-sans font-bold">Course Resources</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-sans">
                      Explore useful academic study materials, formula sheets, and practice problem sets included with this course.
                    </p>
                  </div>
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-[#35C978]">lock_open</span>
                    <span>{resources.length} Open {resources.length === 1 ? 'Resource' : 'Resources'}</span>
                  </span>
                </div>

                {/* Resource Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {visibleResources.map((res) => (
                    <CourseResourceCard
                      key={res.id}
                      resource={res}
                      onViewResource={(r) => {
                        if (onViewResource) {
                          onViewResource(r);
                        } else {
                          setSelectedResourceForPreview(r);
                        }
                      }}
                    />
                  ))}
                </div>

                {/* Expand / Collapse Toggle if > 4 Resources */}
                {resources.length > 4 && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllResources(!showAllResources)}
                      className="px-4 py-2 rounded-lg bg-[#F5F8FC] hover:bg-sky-50 text-[#00A8F0] text-xs font-semibold border border-[#00A8F0]/30 transition-all inline-flex items-center gap-1"
                    >
                      <span>
                        {showAllResources
                          ? 'Show Fewer Resources'
                          : `View All ${resources.length} Course Resources`}
                      </span>
                      <span className="material-symbols-outlined text-[16px]">
                        {showAllResources ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Open Access Assurance Footnote */}
                <div className="pt-2 text-xs text-[#64748B] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#35C978]">
                    verified
                  </span>
                  <span>
                    All listed course resources are open-access companion materials provided with zero purchase requirement.
                  </span>
                </div>
              </section>
            )}

            {/* Section: Faculty / Instructor (Only when available) */}
            {course.faculty && (
              <section aria-labelledby="faculty-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <h2 id="faculty-heading" className="font-sans font-bold">Faculty &amp; Academic Direction</h2>
                </div>

                <div className="flex items-start gap-4 pt-1">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-[#00A8F0]/20 text-[#00A8F0] font-serif font-bold text-lg flex items-center justify-center shrink-0">
                    {course.faculty.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#12365A]">
                      {course.faculty.name}
                    </h3>
                    {course.faculty.designation && (
                      <p className="text-xs font-medium text-[#00A8F0]">
                        {course.faculty.designation}
                      </p>
                    )}
                    {course.faculty.bio && (
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-1 font-sans">
                        {course.faculty.bio}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Section: Prerequisites & Target Audience */}
            {(course.prerequisites || course.targetAudience) && (
              <section aria-labelledby="prereq-heading" className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A8F0] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  <h2 id="prereq-heading" className="font-sans font-bold">Prerequisites &amp; Audience</h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  {course.targetAudience && (
                    <div>
                      <span className="font-semibold text-[#12365A] block mb-1">
                        Intended Audience:
                      </span>
                      <p className="text-[#475569] leading-relaxed">{course.targetAudience}</p>
                    </div>
                  )}

                  {course.prerequisites && course.prerequisites.length > 0 && (
                    <div>
                      <span className="font-semibold text-[#12365A] block mb-1.5">
                        Recommended Academic Prerequisites:
                      </span>
                      <ul className="space-y-1.5">
                        {course.prerequisites.map((prereq, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-2 text-[#475569]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" />
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Key Details Card & Primary Access Box */}
          <div className="lg:col-span-4 sticky top-28 space-y-6 text-left">
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-6">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Access Model
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif text-[#12365A] font-bold">
                    Free Course
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Open Access
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Platform-maintained academic curriculum available with zero purchase requirement.
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => onStartLearning(course.id)}
                  className="w-full py-3 px-4 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-2"
                >
                  <span>Start Learning</span>
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                </button>
                <p className="text-[11px] text-center text-[#64748B]">
                  Zero cost · No credit card required
                </p>
              </div>

              {/* Course Information Key Fields */}
              <div className="space-y-3 pt-5 border-t border-[#E2E8F0] text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Examination</span>
                  <span className="font-semibold text-[#12365A]">{course.examinationName}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Subject</span>
                  <span className="font-semibold text-[#12365A]">{course.subject}</span>
                </div>
                {course.duration && (
                  <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                    <span className="text-[#64748B]">Duration</span>
                    <span className="font-semibold text-[#12365A]">{course.duration}</span>
                  </div>
                )}
                {course.contentSummary && (
                  <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                    <span className="text-[#64748B]">Lectures</span>
                    <span className="font-semibold text-[#12365A]">
                      {course.contentSummary.lecturesCount} Lectures
                    </span>
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                    <span className="text-[#64748B]">Level</span>
                    <span className="font-semibold text-[#12365A]">{course.level}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1 border-b border-[#F5F8FC]">
                  <span className="text-[#64748B]">Language</span>
                  <span className="font-semibold text-[#12365A]">{course.language || 'English'}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#64748B]">Access Delivery</span>
                  <span className="font-semibold text-[#00A8F0]">Self-Paced Web Access</span>
                </div>
              </div>

              {/* Platform Authority Note */}
              <div className="p-3.5 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-xs text-[#475569] space-y-1">
                <div className="font-semibold text-[#12365A] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">verified</span>
                  <span>Centrally Curated</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#64748B]">
                  Maintained by platform academic directors. Not affiliated with any specific Institute or Branch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Primary Access CTA Banner */}
        <section aria-labelledby="cta-banner-heading" className="mt-16 bg-[#12365A] text-white rounded-xl p-8 sm:p-12 text-left relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-white/20">
              Open Public Curriculum
            </span>
            <h2 id="cta-banner-heading" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Ready to begin your preparation in {course.subject}?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-normal">
              Access first-principles video lectures, curated practice sets, and concept notes without purchasing an Institute course.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onStartLearning(course.id)}
                className="px-6 py-3 rounded-lg bg-[#00A8F0] text-white hover:bg-[#0096D6] text-sm font-semibold shadow-sm transition-all duration-150 inline-flex items-center gap-2"
              >
                <span>Start Learning Now</span>
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
              </button>
            </div>
          </div>

          {/* Subtle Ambient Decorative Ring */}
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        </section>

        {/* 4. Related Public Courses Section */}
        {relatedCourses.length > 0 && (
          <section aria-labelledby="related-courses-heading" className="mt-20 text-left space-y-6">
            <div className="space-y-1">
              <h2 id="related-courses-heading" className="font-serif text-2xl sm:text-3xl text-[#12365A] font-bold">
                Related Free Courses
              </h2>
              <p className="text-sm text-[#64748B]">
                Explore additional open-access courses for {course.examinationName} and related subjects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedCourses.map((relCourse) => (
                <PublicCourseCard
                  key={relCourse.id}
                  course={relCourse}
                  onExplore={onSelectRelatedCourse}
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
              Looking for Full Classroom Coaching &amp; Proctored Tests?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Comprehensive year-long tracks, scheduled physical cohorts, and official CBT examination simulations are provided through accredited partner Institutes and Branches.
            </p>
            {onNavigateExaminations && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateExaminations}
                  className="text-xs font-bold text-[#00A8F0] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Partner Examination Tracks</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Lightweight In-Context Resource Preview Modal */}
        {selectedResourceForPreview && (
          <ResourcePreviewModal
            resource={selectedResourceForPreview}
            onClose={() => setSelectedResourceForPreview(null)}
            onOpenDocument={(res) => {
              alert(`Opening document preview for: ${res.title} (${res.type})`);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PublicCourseDetailsScreen;
