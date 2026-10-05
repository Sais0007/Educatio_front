import React, { useState, useEffect } from 'react';
import {
  StudentAssignment,
  StudentEnrolledCourse,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { Badge } from '../common/Badge';

interface StudentAssignmentDetailsScreenProps {
  assignmentId: string;
  scenario?: 'active' | 'new';
  onBackToAssignments: () => void;
  onBackToCourses: () => void;
  onBackToCourseOverview?: (courseId: string) => void;
  onToast?: (message: string) => void;
}

export const StudentAssignmentDetailsScreen: React.FC<StudentAssignmentDetailsScreenProps> = ({
  assignmentId,
  scenario = 'active',
  onBackToAssignments,
  onBackToCourses,
  onBackToCourseOverview,
  onToast,
}) => {
  // Data state
  const [assignment, setAssignment] = useState<StudentAssignment | null>(null);
  const [course, setCourse] = useState<StudentEnrolledCourse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);

  // Submission Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mockSelectedFileName, setMockSelectedFileName] = useState<string>('');
  const [mockSelectedFileSize, setMockSelectedFileSize] = useState<string>('');
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSavingDraft, setIsSavingDraft] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [submissionSuccessMessage, setSubmissionSuccessMessage] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // File Preview Modal State
  const [previewAttachmentName, setPreviewAttachmentName] = useState<string | null>(null);

  // Fetch Assignment & Course Context
  const loadAssignmentDetails = async () => {
    setIsLoading(true);
    setError(null);
    setIsUnauthorized(false);
    try {
      const data = await studentService.getAssignmentById(assignmentId, {
        scenario,
        simulateDelayMs: 220,
      });

      if (!data) {
        if (scenario === 'new') {
          setIsUnauthorized(true);
        } else {
          setError("We couldn't find this assignment or you may not have access.");
        }
        setIsLoading(false);
        return;
      }

      setAssignment(data);

      // Initialize form if assignment has draft or submission
      if (data.submission) {
        setMockSelectedFileName(data.submission.fileName || '');
        setMockSelectedFileSize(data.submission.fileSize || '');
        setStudentNotes(data.submission.studentNotes || '');
      } else {
        setMockSelectedFileName('');
        setMockSelectedFileSize('');
        setStudentNotes('');
      }

      // Fetch course context for richer information
      if (data.courseId) {
        const enrolledCourse = await studentService.getStudentCourseById(data.courseId, scenario);
        setCourse(enrolledCourse);
      }
    } catch (_err) {
      setError("We couldn't load the assignment details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssignmentDetails();
  }, [assignmentId, scenario]);

  // Handle Local File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Size check (25MB limit)
      if (file.size > 25 * 1024 * 1024) {
        if (onToast) onToast('File size exceeds the 25MB limit. Please upload a smaller file.');
        return;
      }
      setSelectedFile(file);
      setMockSelectedFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setMockSelectedFileSize(`${sizeMb} MB`);
      setSubmissionError(null);
      if (onToast) onToast(`File "${file.name}" selected.`);
    }
  };

  // Drag & drop file handler
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 25 * 1024 * 1024) {
        if (onToast) onToast('File size exceeds 25MB limit.');
        return;
      }
      setSelectedFile(file);
      setMockSelectedFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setMockSelectedFileSize(`${sizeMb} MB`);
      setSubmissionError(null);
      if (onToast) onToast(`File "${file.name}" attached.`);
    }
  };

  // Remove attached file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setMockSelectedFileName('');
    setMockSelectedFileSize('');
  };

  // Save Draft Action
  const handleSaveDraft = async () => {
    if (!assignment) return;
    setIsSavingDraft(true);
    setSubmissionError(null);
    try {
      const res = await studentService.saveAssignmentDraft(assignment.id, {
        fileName: mockSelectedFileName || 'Assignment_Draft_Response.pdf',
        fileSize: mockSelectedFileSize || '1.8 MB',
        studentNotes,
        simulateDelayMs: 200,
      });

      if (res.success && res.assignment) {
        setAssignment(res.assignment);
        if (onToast) onToast('Draft saved successfully! You can resume anytime.');
      }
    } catch (_err) {
      if (onToast) onToast('Could not save draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Submit Assignment Action
  const handleConfirmSubmit = async () => {
    if (!assignment) return;
    setIsSubmitting(true);
    setShowConfirmModal(false);
    setSubmissionError(null);

    try {
      const fileNameToSubmit = mockSelectedFileName || selectedFile?.name || 'Handwritten_Solution_Work.pdf';
      const fileSizeToSubmit = mockSelectedFileSize || '2.4 MB';

      const res = await studentService.submitAssignment(assignment.id, {
        fileName: fileNameToSubmit,
        fileSize: fileSizeToSubmit,
        studentNotes,
        simulateDelayMs: 300,
      });

      if (res.success && res.assignment) {
        setAssignment(res.assignment);
        setSubmissionSuccessMessage(`Assignment submitted successfully on ${res.assignment.submittedAt}`);
        if (onToast) onToast(`Assignment "${assignment.title}" submitted successfully!`);
      } else {
        setSubmissionError(res.error || "We couldn't submit your assignment. Please try again.");
      }
    } catch (_err) {
      setSubmissionError("We couldn't submit your assignment. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulated Download Attachment Action
  const handleDownloadAttachment = (fileName: string) => {
    if (onToast) {
      onToast(`Downloading "${fileName}"...`);
    }
  };

  // Render Status Badges
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

  // ========================================================
  // 1. SKELETON LOADING STATE
  // ========================================================
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-64 mb-4" />

        {/* Back Link Skeleton */}
        <div className="h-5 bg-slate-200 rounded w-40" />

        {/* Header Skeleton */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
          <div className="h-4 bg-slate-200 rounded w-32" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="flex gap-4 pt-2">
            <div className="h-6 bg-slate-200 rounded w-28" />
            <div className="h-6 bg-slate-200 rounded w-28" />
            <div className="h-6 bg-slate-200 rounded w-28" />
          </div>
        </div>

        {/* Main Content Skeleton (2 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 h-40" />
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 h-64" />
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 h-72" />
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. UNAUTHORIZED / ACCESS RESTRICTED STATE
  // ========================================================
  if (isUnauthorized) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <div className="max-w-md mx-auto bg-white rounded-xl border border-amber-200 p-8 text-center shadow-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[26px]">lock</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#12365A]">
            Access Restricted
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            You do not currently have access to assignments for this batch or course. Please verify your course enrollment with your institute administrator.
          </p>
          <button
            type="button"
            onClick={onBackToAssignments}
            className="px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Assignments</span>
          </button>
        </div>
      </div>
    );
  }

  // ========================================================
  // 3. ERROR STATE / NOT FOUND
  // ========================================================
  if (error || !assignment) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <div className="max-w-md mx-auto bg-white rounded-xl border border-red-200 p-8 text-center shadow-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[26px]">error</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#12365A]">
            Assignment Not Found
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            {error || "We couldn't load this assignment. It may have been archived or moved."}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={loadAssignmentDetails}
              className="px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Try Again</span>
            </button>
            <button
              type="button"
              onClick={onBackToAssignments}
              className="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#12365A] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Back to Assignments</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine submission capability
  const isEvaluated = assignment.submissionStatus === 'EVALUATED';
  const isSubmitted = assignment.submissionStatus === 'SUBMITTED' || assignment.submissionStatus === 'UNDER_REVIEW';
  const isResubmission = assignment.submissionStatus === 'RESUBMISSION_REQUIRED';
  const isDraft = assignment.submissionStatus === 'DRAFT';
  const isClosed = assignment.status === 'CLOSED';
  const isOverdue = assignment.status === 'OVERDUE' || assignment.dueDateUrgency === 'overdue';
  const canSubmit = !isClosed && (!isOverdue || assignment.allowLateSubmission !== false) && (!isSubmitted || isResubmission);

  // CTA button config
  const getSubmitCtaText = () => {
    if (isSubmitting) return 'Submitting...';
    if (isResubmission) return 'Resubmit Assignment';
    if (isDraft) return 'Submit Assignment';
    if (isOverdue && canSubmit) return 'Submit Late Assignment';
    if (!canSubmit) return 'Submissions Closed';
    return 'Submit Assignment';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* ======================================================== */}
      {/* 1. BREADCRUMB & BACK NAVIGATION                          */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Breadcrumb
          items={[
            { label: 'My Courses', onClick: onBackToCourses },
            ...(course
              ? [
                  {
                    label: course.title,
                    onClick: () =>
                      onBackToCourseOverview && onBackToCourseOverview(course.id),
                  },
                ]
              : []),
            { label: 'Assignments', onClick: onBackToAssignments },
            { label: assignment.title, isCurrent: true },
          ]}
        />

        <button
          type="button"
          onClick={onBackToAssignments}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A8F0] hover:text-[#0092D1] transition-colors py-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Assignments</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 2. ASSIGNMENT HEADER                                     */}
      {/* ======================================================== */}
      <header className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-card space-y-4">
        {/* Top Badges / Course Context */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${assignment.subjectColor || '#00A8F0'}15`,
              color: assignment.subjectColor || '#00A8F0',
            }}
          >
            {assignment.subject}
          </span>
          <span className="text-xs text-[#64748B] font-medium">
            {assignment.courseTitle}
          </span>
          <span className="text-[10px] text-slate-400">&middot;</span>
          <span className="text-xs text-[#64748B] font-medium">
            {assignment.batchName}
          </span>
          {assignment.facultyName && (
            <>
              <span className="text-[10px] text-slate-400 hidden sm:inline">&middot;</span>
              <span className="text-xs text-[#64748B] hidden sm:inline">
                Faculty: <strong className="text-[#12365A] font-medium">{assignment.facultyName}</strong>
              </span>
            </>
          )}
        </div>

        {/* Primary Assignment Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#12365A] tracking-tight leading-tight">
          {assignment.title}
        </h1>

        {/* Important Metadata Bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3 border-t border-[#F1F5F9] text-xs">
          {/* Due Date with Meaningful Urgency Text */}
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[18px] ${
                isOverdue
                  ? 'text-red-500'
                  : assignment.dueDateUrgency === 'due_today' || assignment.dueDateUrgency === 'due_soon'
                  ? 'text-amber-500'
                  : 'text-[#64748B]'
              }`}
            >
              event
            </span>
            <div>
              <span className="text-[#64748B] block text-[11px]">Due Date</span>
              <span
                className={`font-semibold ${
                  isOverdue
                    ? 'text-red-600 font-bold'
                    : assignment.dueDateUrgency === 'due_today'
                    ? 'text-amber-700 font-bold'
                    : assignment.dueDateUrgency === 'due_soon'
                    ? 'text-amber-700'
                    : 'text-[#12365A]'
                }`}
              >
                {assignment.dueDateText} &middot; {assignment.dueDate}
              </span>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <div>
              <span className="text-[#64748B] block text-[11px] mb-0.5">Assignment Status</span>
              {renderAssignmentStatusBadge(assignment.status)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <span className="text-[#64748B] block text-[11px] mb-0.5">Submission Status</span>
              {renderSubmissionBadge(assignment.submissionStatus, assignment.obtainedMarks, assignment.maxMarks)}
            </div>
          </div>

          {/* Maximum Marks / Obtained Marks */}
          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
              military_tech
            </span>
            <div>
              <span className="text-[#64748B] block text-[11px]">Marks Weightage</span>
              <span className="font-bold text-[#12365A]">
                {isEvaluated && assignment.obtainedMarks !== undefined ? (
                  <span className="text-emerald-700">
                    {assignment.obtainedMarks} / {assignment.maxMarks} Marks ({Math.round((assignment.obtainedMarks / assignment.maxMarks) * 100)}%)
                  </span>
                ) : (
                  `Max: ${assignment.maxMarks} Marks`
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. ALERTS & NOTICES                                      */}
      {/* ======================================================== */}
      {/* Submission Success Banner */}
      {submissionSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 flex items-start justify-between gap-3 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">
              check_circle
            </span>
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Assignment Submitted Successfully</h4>
              <p className="mt-0.5 text-emerald-700">{submissionSuccessMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmissionSuccessMessage(null)}
            className="text-emerald-600 hover:text-emerald-800"
            aria-label="Dismiss alert"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Submission Failure Banner */}
      {submissionError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800 flex items-start justify-between gap-3 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-red-600 text-[20px] shrink-0 mt-0.5">
              error
            </span>
            <div>
              <h4 className="font-bold text-red-900 text-sm">We couldn't submit your assignment</h4>
              <p className="mt-0.5 text-red-700">{submissionError}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmissionError(null)}
            className="text-red-600 hover:text-red-800"
            aria-label="Dismiss alert"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Resubmission Required Banner */}
      {isResubmission && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">sync_problem</span>
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-amber-950 text-sm">
                Resubmission Required
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/80 text-amber-900">
                Action Required
              </span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Your instructor has reviewed your initial work and requested changes. Please review the feedback below and submit an updated worksheet.
            </p>
            {assignment.feedbackNotes && (
              <div className="mt-2 p-3 bg-white/80 rounded-lg border border-amber-200 text-xs text-amber-950 font-medium">
                <span className="font-bold text-amber-900 block mb-0.5">Instructor Notes:</span>
                "{assignment.feedbackNotes}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overdue Notice */}
      {isOverdue && !isSubmitted && !isEvaluated && (
        <div className={`rounded-xl p-4 text-xs border flex items-start gap-3 ${
          canSubmit
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
            canSubmit ? 'text-amber-600' : 'text-red-600'
          }`}>
            {canSubmit ? 'history_toggle_off' : 'lock_clock'}
          </span>
          <div className="space-y-0.5">
            <h4 className="font-bold text-sm">
              {canSubmit ? 'Late Submission Permitted' : 'Submissions Closed'}
            </h4>
            <p>
              {canSubmit
                ? `The official deadline (${assignment.dueDate}) has passed, but late submissions are still accepted for this course subject to faculty evaluation.`
                : `The deadline for this assignment has passed and submissions are no longer accepted.`}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MAIN CONTENT GRID (2 COLUMNS)                          */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ====================================================== */}
        {/* LEFT COLUMN (2 COLS): Instructions, Questions, Attachments */}
        {/* ====================================================== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Instructions */}
          {assignment.instructions && (
            <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-card space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
                <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">
                  menu_book
                </span>
                <h2 className="font-serif text-lg font-bold text-[#12365A]">
                  Instructions
                </h2>
              </div>
              <div className="text-sm text-[#334155] leading-relaxed whitespace-pre-line font-normal">
                {assignment.instructions}
              </div>
            </section>
          )}

          {/* Section: Questions / Tasks */}
          {assignment.questions && assignment.questions.length > 0 ? (
            <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">
                    quiz
                  </span>
                  <h2 className="font-serif text-lg font-bold text-[#12365A]">
                    Questions & Tasks
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#64748B]">
                  {assignment.questions.length} {assignment.questions.length === 1 ? 'Question' : 'Questions'}
                </span>
              </div>

              {/* Scannable Question List */}
              <div className="space-y-4 pt-1">
                {assignment.questions.map((q) => (
                  <article
                    key={q.id}
                    className="p-4 sm:p-5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-md bg-[#12365A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {q.questionNumber}
                        </span>
                        {q.title && (
                          <h3 className="font-bold text-sm text-[#12365A]">
                            {q.title}
                          </h3>
                        )}
                      </div>
                      {q.marks !== undefined && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD] shrink-0">
                          {q.marks} Marks
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#334155] leading-relaxed pl-9">
                      {q.content}
                    </p>

                    {q.hint && (
                      <div className="ml-9 mt-2 p-2.5 rounded bg-blue-50/60 border border-blue-100 text-xs text-[#007AB0] flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#00A8F0] shrink-0 mt-0.5">
                          lightbulb
                        </span>
                        <div className="leading-snug">
                          <strong>Hint:</strong> {q.hint}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ) : (
            /* Fallback when no individual questions are defined */
            <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-card space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
                <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">
                  assignment
                </span>
                <h2 className="font-serif text-lg font-bold text-[#12365A]">
                  Assignment Tasks
                </h2>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Refer to the instructions and reference materials provided. Prepare your complete solutions on paper or in a document format, then upload your response file in the submission section.
              </p>
            </section>
          )}

          {/* Section: Attachments (Only shown if attachments exist) */}
          {assignment.attachments && assignment.attachments.length > 0 && (
            <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-card space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">
                    attach_file
                  </span>
                  <h2 className="font-serif text-lg font-bold text-[#12365A]">
                    Attachments & Resources
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#64748B]">
                  {assignment.attachments.length} {assignment.attachments.length === 1 ? 'File' : 'Files'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {assignment.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="p-3.5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#00A8F0] transition-colors flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          picture_as_pdf
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#12365A] truncate" title={att.fileName}>
                          {att.fileName}
                        </p>
                        <span className="text-[11px] text-[#64748B]">
                          {att.fileSize} &middot; {att.fileType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setPreviewAttachmentName(att.fileName)}
                        className="p-1.5 rounded-md hover:bg-slate-100 text-[#00A8F0] transition-colors cursor-pointer"
                        title="View Document"
                        aria-label={`View ${att.fileName}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadAttachment(att.fileName)}
                        className="p-1.5 rounded-md hover:bg-slate-100 text-[#12365A] transition-colors cursor-pointer"
                        title="Download Document"
                        aria-label={`Download ${att.fileName}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN (1 COL): Submission Action & Results      */}
        {/* ====================================================== */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Main Submission Card */}
          <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">
                  upload_file
                </span>
                <h2 className="font-serif text-lg font-bold text-[#12365A]">
                  Your Submission
                </h2>
              </div>
              {renderSubmissionBadge(assignment.submissionStatus)}
            </div>

            {/* ==================================================== */}
            {/* SUBMISSION STATE A: EVALUATED RESULTS                */}
            {/* ==================================================== */}
            {isEvaluated ? (
              <div className="space-y-4">
                {/* Scorecard Box */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/40 border border-emerald-200 text-center space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Score Awarded
                  </span>
                  <div className="font-serif text-3xl font-extrabold text-emerald-800">
                    {assignment.obtainedMarks} <span className="text-base font-normal text-emerald-700">/ {assignment.maxMarks}</span>
                  </div>
                  {assignment.evaluatedAt && (
                    <p className="text-[11px] text-emerald-700">
                      Evaluated on {assignment.evaluatedAt}
                    </p>
                  )}
                </div>

                {/* Faculty Feedback Notes */}
                {assignment.feedbackNotes && (
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-[#12365A] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">rate_review</span>
                      Faculty Remarks
                    </span>
                    <p className="text-xs text-[#334155] leading-relaxed italic">
                      "{assignment.feedbackNotes}"
                    </p>
                  </div>
                )}

                {/* Submitted Document details */}
                {assignment.submission?.fileName && (
                  <div className="p-3 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-red-500 text-[18px]">
                        picture_as_pdf
                      </span>
                      <span className="text-xs font-medium text-[#12365A] truncate">
                        {assignment.submission.fileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewAttachmentName(assignment.submission!.fileName!)}
                      className="text-xs text-[#00A8F0] font-semibold hover:underline shrink-0 cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                )}

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-[#64748B] flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
                    Final evaluation recorded. No further changes allowed.
                  </span>
                </div>
              </div>
            ) : isSubmitted && !isResubmission ? (
              /* ==================================================== */
              /* SUBMISSION STATE B: SUBMITTED / AWAITING EVALUATION   */
              /* ==================================================== */
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                    <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">task_alt</span>
                    Submitted Successfully
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Your response was recorded on {assignment.submittedAt || 'Recently'}. It is currently queued for instructor evaluation.
                  </p>
                </div>

                {/* Submitted Document Details */}
                {assignment.submission?.fileName && (
                  <div className="p-3.5 rounded-lg border border-[#E2E8F0] bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#64748B] uppercase">Submitted File</span>
                      <span className="text-[11px] text-[#64748B]">{assignment.submission.fileSize || '2.1 MB'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-red-500 text-[20px]">
                          picture_as_pdf
                        </span>
                        <span className="text-xs font-bold text-[#12365A] truncate">
                          {assignment.submission.fileName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewAttachmentName(assignment.submission!.fileName!)}
                        className="text-xs text-[#00A8F0] font-semibold hover:underline shrink-0 cursor-pointer"
                      >
                        View File
                      </button>
                    </div>
                  </div>
                )}

                {assignment.submission?.studentNotes && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-bold text-[#12365A] block mb-0.5">Your Submission Note:</span>
                    <p className="text-[#334155]">{assignment.submission.studentNotes}</p>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[11px] text-[#64748B]">
                    Submissions are read-only while under evaluation. If corrections are required, your instructor will unlock resubmission.
                  </p>
                </div>
              </div>
            ) : (
              /* ==================================================== */
              /* SUBMISSION STATE C: ACTIVE / DRAFT / RESUBMISSION     */
              /* ==================================================== */
              <div className="space-y-4">
                {/* Draft Alert if Draft exists */}
                {isDraft && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">
                      edit_note
                    </span>
                    <div>
                      <strong className="block font-bold">Unfinished Draft Saved</strong>
                      <span>You have saved draft progress. Review your work and submit before the deadline.</span>
                    </div>
                  </div>
                )}

                {/* Upload File Dropzone or Attached File Card */}
                {mockSelectedFileName ? (
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#00A8F0] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">
                            description
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#12365A] truncate">
                            {mockSelectedFileName}
                          </p>
                          <span className="text-[11px] text-[#64748B]">
                            {mockSelectedFileSize || '1.8 MB'} &middot; Attached
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors cursor-pointer"
                        title="Remove file"
                        aria-label="Remove attached file"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <label className="text-xs text-[#00A8F0] hover:text-[#0092D1] font-semibold cursor-pointer underline">
                        Replace File
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.zip"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">&middot;</span>
                      <button
                        type="button"
                        onClick={() => setPreviewAttachmentName(mockSelectedFileName)}
                        className="text-xs text-[#64748B] hover:text-[#12365A] cursor-pointer"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    className="border-2 border-dashed border-[#CBD5E1] hover:border-[#00A8F0] rounded-xl p-5 text-center transition-colors bg-[#F8FAFC]/50 hover:bg-blue-50/20 cursor-pointer space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#E0F4FD] text-slate-500 group-hover:text-[#00A8F0] flex items-center justify-center mx-auto transition-colors">
                      <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#00A8F0] hover:text-[#0092D1] cursor-pointer block">
                        <span>Click to upload solution file</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.zip"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="text-[11px] text-[#64748B]">or drag and drop here</p>
                      <p className="text-[10px] text-slate-400 pt-1">
                        PDF, DOCX, ZIP up to 25MB
                      </p>
                    </div>
                  </div>
                )}

                {/* Optional Student Notes */}
                <div className="space-y-1.5">
                  <label htmlFor="student-notes" className="block text-xs font-bold text-[#12365A]">
                    Student Notes / Method Comments <span className="font-normal text-[#64748B]">(Optional)</span>
                  </label>
                  <textarea
                    id="student-notes"
                    rows={3}
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    placeholder="Add any assumptions or notes for your faculty evaluator..."
                    className="w-full text-xs p-3 rounded-lg border border-[#CBD5E1] focus:outline-hidden focus:ring-2 focus:ring-[#00A8F0] focus:border-transparent text-[#12365A] resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  {/* Primary Submit CTA */}
                  <button
                    type="button"
                    disabled={!canSubmit || isSubmitting}
                    onClick={() => {
                      if (!mockSelectedFileName && !selectedFile) {
                        // Provide helpful prompt if file is empty
                        if (onToast) onToast('Please attach your solution document before submitting.');
                        return;
                      }
                      setShowConfirmModal(true);
                    }}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all duration-150 inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                      !canSubmit
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : isResubmission
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-[#00A8F0] hover:bg-[#0092D1] text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">
                        {isResubmission ? 'restart_alt' : 'send'}
                      </span>
                    )}
                    <span>{getSubmitCtaText()}</span>
                  </button>

                  {/* Save Draft Action */}
                  {canSubmit && (
                    <button
                      type="button"
                      disabled={isSavingDraft || isSubmitting}
                      onClick={handleSaveDraft}
                      className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#12365A] border border-[#CBD5E1] hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSavingDraft ? (
                        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                      ) : (
                        <span className="material-symbols-outlined text-[16px]">save</span>
                      )}
                      <span>Save as Draft</span>
                    </button>
                  )}
                </div>

                {/* Late Submission policy note */}
                <p className="text-[10px] text-[#64748B] text-center leading-normal">
                  {canSubmit
                    ? "Submissions are recorded with an official timestamp for your institute branch batch records."
                    : "The deadline has passed and this assignment is currently closed for submissions."}
                </p>
              </div>
            )}
          </section>

          {/* Quick Academic Context Card */}
          <aside className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-xs text-[#64748B] space-y-2 shadow-2xs">
            <h3 className="font-bold text-[#12365A] text-xs uppercase tracking-wider">
              Academic Context
            </h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>Subject:</span>
                <span className="font-semibold text-[#12365A]">{assignment.subject}</span>
              </div>
              <div className="flex justify-between">
                <span>Batch:</span>
                <span className="font-semibold text-[#12365A]">{assignment.batchName}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Points:</span>
                <span className="font-semibold text-[#12365A]">{assignment.maxMarks} Marks</span>
              </div>
              {assignment.facultyName && (
                <div className="flex justify-between">
                  <span>Faculty:</span>
                  <span className="font-semibold text-[#12365A]">{assignment.facultyName}</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. SUBMISSION CONFIRMATION MODAL                         */}
      {/* ======================================================== */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#E2E8F0] max-w-md w-full p-6 shadow-2xl space-y-4 font-sans animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-[#E0F4FD] text-[#00A8F0] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[26px]">send</span>
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#12365A]">
                Submit Assignment?
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Once submitted, your response will be locked for faculty evaluation. You will not be able to modify your uploaded solution unless your instructor requests a resubmission.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-[#64748B]">
                <span>Attached File:</span>
                <strong className="text-[#12365A] truncate max-w-xs">{mockSelectedFileName || 'Solution_Document.pdf'}</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Due Date:</span>
                <span className="text-[#12365A] font-medium">{assignment.dueDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-xs font-semibold text-[#12365A] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-xs font-semibold text-white transition-colors shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
                <span>Confirm & Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. ATTACHMENT PREVIEW MODAL                              */}
      {/* ======================================================== */}
      {previewAttachmentName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#E2E8F0] max-w-2xl w-full p-6 shadow-2xl space-y-4 font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-[22px]">
                  picture_as_pdf
                </span>
                <h3 className="font-bold text-sm text-[#12365A] truncate max-w-md">
                  {previewAttachmentName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewAttachmentName(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close document preview"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Simulated Document Viewer Pane */}
            <div className="p-8 rounded-lg bg-slate-100 border border-slate-200 text-center space-y-4 min-h-[220px] flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-slate-400 text-[48px]">
                description
              </span>
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#12365A]">
                  Document Preview: {previewAttachmentName}
                </p>
                <p className="text-[11px] text-[#64748B]">
                  Academic question papers and student solution files are securely stored on the platform repository.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleDownloadAttachment(previewAttachmentName);
                  setPreviewAttachmentName(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download Document</span>
              </button>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setPreviewAttachmentName(null)}
                className="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-xs font-semibold text-[#12365A] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentDetailsScreen;
