import React from 'react';
import { StudentNavSection, StudentProfile } from '../../types/student';

interface StudentModulePlaceholderProps {
  section: StudentNavSection;
  onNavigateDashboard: () => void;
  student: StudentProfile;
}

const MODULE_INFO: Record<
  StudentNavSection,
  { title: string; subtitle: string; icon: string; description: string }
> = {
  dashboard: {
    title: 'Student Dashboard',
    subtitle: 'Overview & immediate preparation priorities',
    icon: 'dashboard',
    description: 'Central overview of active learning, upcoming events, and actionable tasks.',
  },
  learning: {
    title: 'My Learning & Enrolled Courses',
    subtitle: 'Institute & Branch curriculum lectures and structured modules',
    icon: 'menu_book',
    description: 'Full syllabus video lectures, chapter notes, and milestone quizzes affiliated with your batch.',
  },
  practice: {
    title: 'Practice Arena',
    subtitle: 'Targeted DPP problem solving and question bank calibration',
    icon: 'edit_note',
    description: 'Topic-wise practice with progressive hints, step-by-step proofs, and timed practice modes.',
  },
  tests: {
    title: 'Authentic CBT Test Series',
    subtitle: 'Center-based and remote simulated computer-based assessments',
    icon: 'quiz',
    description: 'Official NTA & IIT JEE format mock assessments, complete with question palette and negative marking.',
  },
  results: {
    title: 'Results, Analytics & Mistake Autopsy',
    subtitle: 'Diagnostic question-wise breakdown and accuracy calibration',
    icon: 'insights',
    description: 'Detailed post-test autopsy, time-spent analysis, and conceptual flaw identification.',
  },
  revision: {
    title: 'Mistake Notebook & Spaced Revision',
    subtitle: 'Continuous error remediation and bookmarked concepts',
    icon: 'auto_fix_high',
    description: 'Personalized mistake repository, formula flashcards, and spaced-repetition schedules.',
  },
  resources: {
    title: 'Accessible Resource Library',
    subtitle: 'Batch study guides, formula summaries and solved derivations',
    icon: 'folder_open',
    description: 'Curated PDFs, previous year solved papers, and faculty lecture handouts.',
  },
  profile: {
    title: 'Student Profile & Branch Affiliation',
    subtitle: 'Enrollment credentials, institute identity and device security',
    icon: 'account_circle',
    description: 'Personal academic record, enrolled batch details, and affiliated center contact.',
  },
};

export const StudentModulePlaceholder: React.FC<StudentModulePlaceholderProps> = ({
  section,
  onNavigateDashboard,
  student,
}) => {
  const info = MODULE_INFO[section] || MODULE_INFO.dashboard;

  return (
    <div className="py-8 text-left space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <button
          type="button"
          onClick={onNavigateDashboard}
          className="hover:text-[#00A8F0] transition-colors"
        >
          Dashboard
        </button>
        <span>/</span>
        <span className="font-semibold text-[#12365A]">{info.title}</span>
      </div>

      {/* Module Overview Card */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#E0F4FD] border border-[#BAE6FD] text-[#00A8F0] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">{info.icon}</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#12365A] font-bold leading-tight">
                {info.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-sans">
                {info.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateDashboard}
            className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#12365A] hover:text-[#00A8F0] text-xs font-semibold border border-[#E2E8F0] transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Dashboard</span>
          </button>
        </div>

        <div className="pt-6 space-y-6">
          <div className="p-4 rounded-lg bg-[#F5F8FC] border border-[#E2E8F0] text-xs text-[#12365A] leading-relaxed max-w-2xl">
            <span className="font-bold text-[#12365A] block mb-1">Module Overview:</span>
            {info.description}
          </div>

          {/* Student Affiliation confirmation */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">school</span>
              <span>{student.targetExamLabel}</span>
            </span>
            <span>&middot;</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">domain</span>
              <span>{student.instituteName} ({student.branchName})</span>
            </span>
            <span>&middot;</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">badge</span>
              <span>Enrollment: {student.enrollmentNumber}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModulePlaceholder;
