import React, { useState, useEffect } from 'react';
import {
  StudentAssignment,
  StudentEnrolledCourse,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

interface StudentAssignmentListScreenProps {
  initialCourseId?: string;
  scenario?: 'active' | 'new';
  onBackToCourses: () => void;
  onBackToCourseOverview?: (courseId: string) => void;
  onSelectAssignment?: (assignmentId: string) => void;
  onToast?: (message: string) => void;
}

type TabFilter = 'all' | 'pending' | 'submitted' | 'evaluated' | 'overdue';

export const StudentAssignmentListScreen: React.FC<StudentAssignmentListScreenProps> = ({
  initialCourseId,
  scenario = 'active',
  onBackToCourses,
  onBackToCourseOverview,
  onSelectAssignment,
  onToast,
}) => {
  // Data state
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<StudentEnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>(
    initialCourseId || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Assignment Details Modal State
  const [activeDetailsModal, setActiveDetailsModal] = useState<StudentAssignment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Fetch assignments and courses
  const fetchAssignmentData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [assignmentsRes, coursesRes] = await Promise.all([
        studentService.getAssignments({
          scenario,
          courseId: selectedCourseFilter,
          tab: activeTab,
          searchQuery,
          simulateDelayMs: 250,
        }),
        studentService.getStudentCourses({
          scenario,
          status: 'all',
          simulateDelayMs: 0,
        }),
      ]);

      setAssignments(assignmentsRes);
      setEnrolledCourses(coursesRes);
    } catch (_err) {
      setError('We couldn\'t load your assignments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignmentData();
  }, [scenario, activeTab, selectedCourseFilter, searchQuery]);

  // Overall counts for filter tabs
  const [tabCounts, setTabCounts] = useState<{
    all: number;
    pending: number;
    submitted: number;
    evaluated: number;
    overdue: number;
  }>({
    all: 0,
    pending: 0,
    submitted: 0,
    evaluated: 0,
    overdue: 0,
  });

  useEffect(() => {
    Promise.all([
      studentService.getAssignments({ scenario, tab: 'all', simulateDelayMs: 0 }),
      studentService.getAssignments({ scenario, tab: 'pending', simulateDelayMs: 0 }),
      studentService.getAssignments({ scenario, tab: 'submitted', simulateDelayMs: 0 }),
      studentService.getAssignments({ scenario, tab: 'evaluated', simulateDelayMs: 0 }),
      studentService.getAssignments({ scenario, tab: 'overdue', simulateDelayMs: 0 }),
    ]).then(([allList, pendingList, submittedList, evaluatedList, overdueList]) => {
      setTabCounts({
        all: allList.length,
        pending: pendingList.length,
        submitted: submittedList.length,
        evaluated: evaluatedList.length,
        overdue: overdueList.length,
      });
    });
  }, [scenario]);

  // Handle assignment submission
  const handleSubmitAssignment = async (assignmentId: string) => {
    setIsSubmitting(true);
    try {
      const res = await studentService.submitAssignment(assignmentId);
      if (res.success && res.assignment) {
        // Update local state
        setAssignments((prev) =>
          prev.map((a) => (a.id === assignmentId ? res.assignment! : a))
        );
        setActiveDetailsModal(res.assignment);
        if (onToast) {
          onToast(`Assignment "${res.assignment.title}" submitted successfully!`);
        }
      }
    } catch (_err) {
      if (onToast) onToast('Failed to submit assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadedFile(null);
    }
  };

  // Resolve Course Title for breadcrumb if initialCourseId was provided
  const matchedCourse = enrolledCourses.find((c) => c.id === initialCourseId);

  // Helper for CTA Label & Icon based on assignment & submission status
  const getCtaConfig = (a: StudentAssignment) => {
    if (a.submissionStatus === 'EVALUATED') {
      return {
        label: 'View Result',
        icon: 'verified',
        variant: 'secondary' as const,
      };
    }
    if (a.submissionStatus === 'SUBMITTED' || a.submissionStatus === 'UNDER_REVIEW') {
      return {
        label: 'View Submission',
        icon: 'task_alt',
        variant: 'secondary' as const,
      };
    }
    if (a.submissionStatus === 'DRAFT') {
      return {
        label: 'Continue Assignment',
        icon: 'edit_note',
        variant: 'primary' as const,
      };
    }
    if (a.submissionStatus === 'RESUBMISSION_REQUIRED') {
      return {
        label: 'Resubmit Assignment',
        icon: 'restart_alt',
        variant: 'warning' as const,
      };
    }
    return {
      label: 'View Assignment',
      icon: 'arrow_forward',
      variant: 'primary' as const,
    };
  };

  // Helper for human-readable Submission Status badge
  const renderSubmissionBadge = (subStatus: StudentAssignment['submissionStatus'], obtainedMarks?: number, maxMarks?: number) => {
    switch (subStatus) {
      case 'EVALUATED':
        return (
          <Badge variant="green" size="sm" icon="check_circle">
            Evaluated {obtainedMarks !== undefined ? `(${obtainedMarks}/${maxMarks})` : ''}
          </Badge>
        );
      case 'SUBMITTED':
        return (
          <Badge variant="blue" size="sm" icon="cloud_done">
            Submitted
          </Badge>
        );
      case 'UNDER_REVIEW':
        return (
          <Badge variant="purple" size="sm" icon="hourglass_top">
            Under Review
          </Badge>
        );
      case 'DRAFT':
        return (
          <Badge variant="yellow" size="sm" icon="edit">
            Draft Saved
          </Badge>
        );
      case 'RESUBMISSION_REQUIRED':
        return (
          <Badge variant="red" size="sm" icon="sync_problem">
            Resubmission Required
          </Badge>
        );
      case 'NOT_SUBMITTED':
      default:
        return (
          <Badge variant="neutral" size="sm" icon="radio_button_unchecked">
            Not Submitted
          </Badge>
        );
    }
  };

  // Helper for Assignment Lifecycle status badge
  const renderAssignmentStatusBadge = (status: StudentAssignment['status']) => {
    switch (status) {
      case 'OVERDUE':
        return (
          <Badge variant="red" size="sm" icon="warning">
            Overdue
          </Badge>
        );
      case 'DUE_SOON':
        return (
          <Badge variant="yellow" size="sm" icon="alarm">
            Due Soon
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge variant="green" size="sm" icon="done_all">
            Completed
          </Badge>
        );
      case 'UPCOMING':
        return (
          <Badge variant="neutral" size="sm" icon="event">
            Upcoming
          </Badge>
        );
      case 'CLOSED':
        return (
          <Badge variant="neutral" size="sm" icon="lock">
            Closed
          </Badge>
        );
      case 'ACTIVE':
      default:
        return (
          <Badge variant="blue" size="sm" icon="bolt">
            Active
          </Badge>
        );
    }
  };

  // ========================================================
  // 1. SKELETON LOADING STATE
  // ========================================================
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-48 mb-4" />

        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-[#E2E8F0]">
          <div className="space-y-2 w-2/3">
            <div className="h-7 bg-slate-200 rounded w-48" />
            <div className="h-4 bg-slate-200 rounded w-72" />
          </div>
          <div className="h-9 bg-slate-200 rounded-lg w-40" />
        </div>

        {/* Toolbar Skeleton */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-card h-16" />

        {/* Cards Skeleton Grid */}
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card h-28" />
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card h-28" />
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card h-28" />
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
            Unable to Load Assignments
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchAssignmentData}
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
      {/* 1. BREADCRUMB: My Courses / (Course Title) / Assignments */}
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
                { label: 'Assignments', isCurrent: true },
              ]
            : [
                { label: 'My Courses', onClick: onBackToCourses },
                { label: 'Assignments', isCurrent: true },
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
              Assignments
            </h1>
            {tabCounts.pending > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
                {tabCounts.pending} Need Attention
              </span>
            )}
          </div>
          <p className="text-sm text-[#64748B] mt-1">
            View and manage assignments from your courses.
          </p>
        </div>

        {/* Tab Filter Segmentation: All / Pending / Submitted / Evaluated */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0" role="tablist">
          {(
            [
              { id: 'all', label: 'All', count: tabCounts.all },
              { id: 'pending', label: 'Need Attention', count: tabCounts.pending },
              { id: 'submitted', label: 'Submitted', count: tabCounts.submitted },
              { id: 'evaluated', label: 'Evaluated', count: tabCounts.evaluated },
              { id: 'overdue', label: 'Overdue', count: tabCounts.overdue },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
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
      </header>

      {/* ======================================================== */}
      {/* 3. TOOLBAR: Course Filter & Search                       */}
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
            aria-label="Filter assignments by course"
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
            placeholder="Search assignments or courses..."
            aria-label="Search assignments"
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8F0] text-[#12365A] placeholder-[#94A3B8] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#12365A] p-0.5 cursor-pointer"
              aria-label="Clear assignment search"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. PRIMARY ASSIGNMENT LIST / CARDS                      */}
      {/* Scannable layout with Name, Course, Due, Status & CTA    */}
      {/* ======================================================== */}
      {assignments.length === 0 ? (
        <EmptyState
          icon={activeTab === 'all' ? 'assignment_late' : 'search_off'}
          title={
            activeTab === 'all'
              ? 'No assignments yet'
              : 'No assignments match your filter'
          }
          description={
            activeTab === 'all'
              ? 'Assignments from your enrolled courses will appear here once released by your faculty.'
              : 'Try clearing your status or course filters to view other assignments.'
          }
          actionLabel={
            activeTab !== 'all' || selectedCourseFilter !== 'all' || searchQuery
              ? 'Clear Filters'
              : undefined
          }
          onAction={() => {
            setActiveTab('all');
            setSelectedCourseFilter('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-3.5">
          {assignments.map((assignment) => {
            const cta = getCtaConfig(assignment);
            const isOverdue = assignment.dueDateUrgency === 'overdue';
            const isDueToday = assignment.dueDateUrgency === 'due_today';
            const isDueSoon = assignment.dueDateUrgency === 'due_soon';

            return (
              <article
                key={assignment.id}
                className="bg-white rounded-xl border border-[#E2E8F0] hover:border-[#00A8F0]/40 p-4 sm:p-5 shadow-card transition-all duration-150 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left Subject Color Accent Strip */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-1.5"
                  style={{ backgroundColor: assignment.subjectColor || '#00A8F0' }}
                />

                {/* Left/Middle: Assignment Name, Course & Metadata */}
                <div className="pl-2 space-y-2 min-w-0 flex-1">
                  {/* Top Metadata: Subject, Course Tag, and Urgency */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${assignment.subjectColor || '#00A8F0'}15`,
                        color: assignment.subjectColor || '#00A8F0',
                      }}
                    >
                      {assignment.subject}
                    </span>
                    <span className="text-xs text-[#64748B] font-medium truncate max-w-xs">
                      {assignment.courseTitle}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">&middot;</span>
                    <span className="text-[11px] text-[#64748B] hidden sm:inline">
                      {assignment.batchName}
                    </span>
                  </div>

                  {/* Primary: Assignment Name */}
                  <h3
                    onClick={() => {
                      if (onSelectAssignment) {
                        onSelectAssignment(assignment.id);
                      } else {
                        setActiveDetailsModal(assignment);
                      }
                    }}
                    className="font-bold text-base sm:text-lg text-[#12365A] hover:text-[#00A8F0] cursor-pointer transition-colors leading-snug line-clamp-2"
                  >
                    {assignment.title}
                  </h3>

                  {/* Due Date & Marks Info */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B]">
                    {/* Due Date with Meaningful Text (Never color alone) */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isOverdue
                            ? 'text-red-500'
                            : isDueToday || isDueSoon
                            ? 'text-amber-500'
                            : 'text-[#64748B]'
                        }`}
                      >
                        event
                      </span>
                      <span
                        className={`font-medium ${
                          isOverdue
                            ? 'text-red-600 font-bold'
                            : isDueToday
                            ? 'text-amber-700 font-bold'
                            : isDueSoon
                            ? 'text-amber-700 font-semibold'
                            : 'text-[#12365A]'
                        }`}
                      >
                        {assignment.dueDateText} &middot; Due {assignment.dueDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#64748B]">
                        grade
                      </span>
                      <span>Max: {assignment.maxMarks} Marks</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Status Badges & Action CTA */}
                <div className="pl-2 md:pl-0 shrink-0 flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#F1F5F9]">
                  {/* Distinct Status Badges: Assignment Status & Submission Status */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {renderAssignmentStatusBadge(assignment.status)}
                    {renderSubmissionBadge(assignment.submissionStatus, assignment.obtainedMarks, assignment.maxMarks)}
                  </div>

                  {/* Primary CTA Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectAssignment) {
                          onSelectAssignment(assignment.id);
                        } else {
                          setActiveDetailsModal(assignment);
                        }
                      }}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                        cta.variant === 'warning'
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : cta.variant === 'secondary'
                          ? 'bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] border border-[#BAE6FD]'
                          : 'bg-[#00A8F0] hover:bg-[#0092D1] text-white'
                      }`}
                    >
                      <span>{cta.label}</span>
                      <span className="material-symbols-outlined text-[16px]">{cta.icon}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. INTERACTIVE ASSIGNMENT DETAILS & SUBMISSION MODAL     */}
      {/* ======================================================== */}
      {activeDetailsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-asg-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans"
        >
          <div className="bg-white rounded-2xl border border-[#E2E8F0] max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${activeDetailsModal.subjectColor || '#00A8F0'}15`,
                      color: activeDetailsModal.subjectColor || '#00A8F0',
                    }}
                  >
                    {activeDetailsModal.subject}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    {activeDetailsModal.courseTitle}
                  </span>
                </div>
                <h3
                  id="modal-asg-title"
                  className="font-serif text-lg sm:text-xl font-bold text-[#12365A]"
                >
                  {activeDetailsModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveDetailsModal(null);
                  setUploadedFile(null);
                }}
                className="text-[#94A3B8] hover:text-[#12365A] p-1 cursor-pointer"
                aria-label="Close assignment modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Assignment Metadata Summary Box */}
            <div className="space-y-2.5 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Batch:</span>
                <span className="font-semibold text-[#12365A]">{activeDetailsModal.batchName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Due Date:</span>
                <span className="font-semibold text-[#12365A]">{activeDetailsModal.dueDateText} ({activeDetailsModal.dueDate})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Maximum Marks:</span>
                <span className="font-semibold text-[#12365A]">{activeDetailsModal.maxMarks} Marks</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-[#E2E8F0]">
                <span className="text-[#64748B]">Submission Status:</span>
                <div>
                  {renderSubmissionBadge(
                    activeDetailsModal.submissionStatus,
                    activeDetailsModal.obtainedMarks,
                    activeDetailsModal.maxMarks
                  )}
                </div>
              </div>
              {activeDetailsModal.obtainedMarks !== undefined && (
                <div className="flex justify-between items-center pt-1 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B] font-semibold">Evaluation Score:</span>
                  <span className="font-bold text-[#35C978] text-sm">
                    {activeDetailsModal.obtainedMarks} / {activeDetailsModal.maxMarks} Marks
                  </span>
                </div>
              )}
            </div>

            {/* Instructions */}
            {activeDetailsModal.instructions && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-semibold text-[#12365A] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">info</span>
                  Instructions:
                </h4>
                <p className="text-[#64748B] leading-relaxed bg-[#FAFCFE] p-3 rounded-lg border border-[#F1F5F9]">
                  {activeDetailsModal.instructions}
                </p>
              </div>
            )}

            {/* Evaluator Feedback if Evaluated */}
            {activeDetailsModal.feedbackNotes && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-semibold text-[#15803D] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">rate_review</span>
                  Faculty Feedback:
                </h4>
                <p className="text-[#166534] bg-[#F0FDF4] p-3 rounded-lg border border-[#BBF7D0] leading-relaxed">
                  {activeDetailsModal.feedbackNotes}
                </p>
              </div>
            )}

            {/* Download Question Attachment if available */}
            {activeDetailsModal.attachmentFileName && (
              <div className="p-3 rounded-lg border border-[#BAE6FD] bg-[#E0F4FD]/40 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-[#00A8F0] shrink-0">
                    description
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#12365A] truncate">
                      {activeDetailsModal.attachmentFileName}
                    </p>
                    <p className="text-[10px] text-[#64748B]">
                      Question Paper {activeDetailsModal.attachmentFileSize && `· ${activeDetailsModal.attachmentFileSize}`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onToast) onToast(`Downloading: ${activeDetailsModal.attachmentFileName}`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#E0F4FD] text-[#00A8F0] font-semibold text-xs border border-[#BAE6FD] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span>Download</span>
                </button>
              </div>
            )}

            {/* Upload Area for Non-submitted or Draft assignments */}
            {activeDetailsModal.submissionStatus !== 'EVALUATED' && (
              <div className="space-y-2 pt-1 border-t border-[#F1F5F9]">
                <h4 className="text-xs font-semibold text-[#12365A]">
                  {activeDetailsModal.submissionStatus === 'SUBMITTED' ? 'Submitted File:' : 'Upload Your Solution PDF:'}
                </h4>

                {activeDetailsModal.submissionStatus === 'SUBMITTED' ? (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">
                      verified
                    </span>
                    <span>
                      Solution uploaded on {activeDetailsModal.submittedAt || 'Today'}. Ready for evaluation.
                    </span>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-4 text-center hover:border-[#00A8F0] transition-colors bg-[#FAFCFE]">
                    <span className="material-symbols-outlined text-[28px] text-[#64748B] mb-1">
                      cloud_upload
                    </span>
                    <p className="text-xs text-[#12365A] font-medium">
                      {uploadedFile ? uploadedFile.name : 'Upload PDF solution sheet (Max 25MB)'}
                    </p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">
                      Handwritten scans or typed PDF proofs are accepted
                    </p>
                    <label className="mt-2.5 inline-block px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-semibold text-[#12365A] hover:bg-slate-50 cursor-pointer shadow-xs">
                      <span>{uploadedFile ? 'Change File' : 'Browse Computer'}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => {
                  setActiveDetailsModal(null);
                  setUploadedFile(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#12365A] text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>

              {activeDetailsModal.submissionStatus !== 'EVALUATED' && activeDetailsModal.submissionStatus !== 'SUBMITTED' && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmitAssignment(activeDetailsModal.id)}
                  className="px-5 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[16px]">upload_file</span>
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Solution PDF'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentListScreen;
