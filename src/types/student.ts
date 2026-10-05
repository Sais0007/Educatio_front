import { ExaminationType } from './index';

export type StudentNavSection =
  | 'dashboard'
  | 'courses'
  | 'learning'
  | 'practice'
  | 'tests'
  | 'results'
  | 'revision'
  | 'resources'
  | 'profile';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetExam: ExaminationType;
  targetExamLabel: string;
  instituteId: string;
  instituteName: string;
  branchId: string;
  branchName: string;
  batchName: string;
  enrollmentNumber: string;
  cohortYear: number;
}

export interface StudentEnrolledCourse {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  batchName: string;
  facultyName: string;
  facultyDesignation: string;
  facultyAvatar?: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  currentModule: {
    id: string;
    title: string;
    moduleNumber: number;
  };
  currentLesson: {
    id: string;
    title: string;
    lessonNumber: number;
    duration: string;
    type: 'video' | 'practice' | 'reading';
  };
  lastActivityAt: string;
  lastActivityTimestamp?: number;
  accessStatus: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'COMPLETED';
  validUntil: string;
  expiresInDays?: number;
  thumbnailUrl?: string;
  examinationName?: string;
  badge?: string;
}

export interface StudentUpcomingActivity {
  id: string;
  type: 'test' | 'live_class' | 'assignment';
  title: string;
  subtitle: string;
  courseTitle?: string;
  scheduledAt: string;
  formattedDate: string;
  formattedTime: string;
  durationMinutes?: number;
  status: 'SCHEDULED' | 'STARTING_SOON' | 'LIVE_NOW' | 'PENDING';
  actionLabel: string;
  subject?: string;
  facultyName?: string;
}

export interface StudentPerformanceSnapshot {
  hasHistory: boolean;
  latestTestTitle?: string;
  latestTestScore?: number;
  latestTestMaxScore?: number;
  latestTestAccuracy?: number;
  latestTestDate?: string;
  totalTestsCompleted?: number;
  recentTrendLabel?: string;
  subjectBreakdown?: {
    subject: string;
    score: number;
    maxScore: number;
    accuracy: number;
  }[];
}

export interface StudentRecommendation {
  id: string;
  title: string;
  reason: string;
  context: string;
  actionType: 'course' | 'practice' | 'revision' | 'test' | 'resource';
  actionLabel: string;
  priority: 'high' | 'medium';
  subject?: string;
  targetModule?: string;
}

export interface StudentRecentActivity {
  id: string;
  type: 'lesson_completed' | 'practice_submitted' | 'test_attempted' | 'resource_viewed' | 'live_attended';
  title: string;
  context: string;
  timestamp: string;
  formattedTime: string;
  icon: string;
}

export interface StudentAccessSummary {
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';
  planName: string;
  instituteBranchLabel: string;
  validityExpiry: string;
  enrollmentType: string;
}

export interface StudentNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'test' | 'class' | 'academic' | 'system';
}

export interface StudentDashboardData {
  student: StudentProfile;
  continueLearning: StudentEnrolledCourse | null;
  enrolledCourses: StudentEnrolledCourse[];
  upcomingActivities: StudentUpcomingActivity[];
  performance: StudentPerformanceSnapshot;
  recommendations: StudentRecommendation[];
  recentActivities: StudentRecentActivity[];
  accessSummary: StudentAccessSummary;
  notifications: StudentNotificationItem[];
}

export type LessonCompletionStatus = 'COMPLETED' | 'IN_PROGRESS' | 'AVAILABLE' | 'LOCKED';
export type LessonType = 'video' | 'practice' | 'reading';

export interface CourseLesson {
  id: string;
  title: string;
  lessonNumber: number;
  duration: string;
  type: LessonType;
  status: LessonCompletionStatus;
  progressPercent?: number;
  isLocked?: boolean;
  unlockReason?: string;
  availableFrom?: string;
  prerequisite?: string;
  videoUrl?: string;
  description?: string;
  lastWatchedSeconds?: number;
  durationSeconds?: number;
  captionsUrl?: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  description?: string;
  completedLessons: number;
  totalLessons: number;
  isLocked?: boolean;
  unlockReason?: string;
  lessons: CourseLesson[];
}

export interface CourseAssignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'OVERDUE';
  submissionStatus?: string;
  maxMarks?: number;
  obtainedMarks?: number;
}

export type DPPStatus =
  | 'AVAILABLE'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING'
  | 'EXPIRED';

export interface StudentDPP {
  id: string;
  number: number;
  title: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  subjectColor?: string;
  batchName?: string;
  date: string; // e.g. '05 Oct 2026'
  dateIso: string; // e.g. '2026-10-05'
  dateCategory: 'today' | 'yesterday' | 'earlier' | 'upcoming';
  status: DPPStatus;
  score?: string; // e.g. '16 / 20'
  scorePercent?: number; // e.g. 80
  obtainedMarks?: number;
  maxMarks?: number;
  totalQuestions: number;
  completedQuestions?: number;
  durationMinutes?: number;
  topicsCovered?: string[];
  completedAt?: string;
  expiresAt?: string;
}

export interface CourseDPP {
  id: string;
  number: number;
  title: string;
  date: string;
  subject: string;
  status: 'NOT_ATTEMPTED' | 'ATTEMPTED' | 'EVALUATED';
  score?: string;
  totalQuestions: number;
}

export type PracticeDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';
export type PracticeMode = 'custom' | 'pyq' | 'topic' | 'daily_challenge' | 'mistakes' | 'bookmarks';

export interface ActivePracticeSession {
  id: string;
  title: string;
  subject: string;
  subjectColor?: string;
  chapterTitle?: string;
  topicTitle?: string;
  totalQuestions: number;
  completedQuestions: number;
  remainingQuestions: number;
  accuracyPercent?: number;
  timeSpentMinutes: number;
  startedAt: string;
  difficulty: PracticeDifficulty;
  mode: PracticeMode;
}

export interface PracticeTopicOption {
  id: string;
  subject: string;
  subjectColor?: string;
  chapterTitle: string;
  topicTitle: string;
  questionCount: number;
  completedCount?: number;
  masteryPercent?: number;
  difficultyBreakdown?: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface DailyPracticeChallenge {
  id: string;
  date: string;
  title: string;
  subject: string;
  subjectColor?: string;
  totalQuestions: number;
  durationMinutes: number;
  difficulty: PracticeDifficulty;
  isCompleted: boolean;
  score?: string;
  accuracyPercent?: number;
}

export interface PracticeRecentActivityItem {
  id: string;
  title: string;
  subject: string;
  subjectColor?: string;
  completedAt: string;
  questionCount: number;
  accuracyPercent: number;
  mode: PracticeMode;
}

export interface PracticeHomeData {
  activeSession: ActivePracticeSession | null;
  dailyChallenge: DailyPracticeChallenge | null;
  topics: PracticeTopicOption[];
  recentActivities: PracticeRecentActivityItem[];
  stats: {
    totalQuestionsPracticed: number;
    averageAccuracy: number;
    currentStreakDays: number;
    weeklyGoalTarget: number;
    weeklyGoalCompleted: number;
    mistakesCount: number;
    bookmarksCount: number;
  };
}

export interface CoursePracticeTopic {
  id: string;
  title: string;
  description: string;
  questionCount: number;
}

export interface CourseTest {
  id: string;
  title: string;
  type: 'Chapter Test' | 'Full Mock' | 'Subject Revision' | 'Milestone Test';
  date: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
  duration: string;
  totalMarks: number;
  attemptsCount?: number;
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'PDF' | 'Formula Sheet' | 'Study Material' | 'Previous Paper';
  subject: string;
  fileSize?: string;
  year?: string;
  downloadUrl?: string;
}

export interface CourseOverviewDetail {
  course: StudentEnrolledCourse;
  modules: CourseModule[];
  assignments: CourseAssignment[];
  dpps: CourseDPP[];
  practiceTopic?: CoursePracticeTopic;
  tests: CourseTest[];
  resources: CourseResource[];
}

export type LiveClassJoinStatus =
  | 'LIVE_NOW'
  | 'STARTING_SOON'
  | 'UPCOMING'
  | 'JOINED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface StudentLiveClass {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  subjectColor?: string;
  batchId: string;
  batchName: string;
  facultyName: string;
  facultyDesignation?: string;
  facultyAvatar?: string;
  scheduledDate: string; // ISO date 'YYYY-MM-DD'
  formattedDate: string; // 'Today, Oct 5' or 'Tomorrow, Oct 6' or 'Oct 8, 2026'
  dateCategory: 'today' | 'tomorrow' | 'upcoming' | 'past';
  startTime: string; // '05:30 PM'
  endTime: string; // '07:00 PM'
  durationMinutes: number;
  status: LiveClassJoinStatus;
  joinWindowOpen: boolean;
  startsInMinutes?: number;
  meetingUrl?: string;
  hasRecording?: boolean;
  recordingLessonId?: string;
  cancellationReason?: string;
  attendeesCount?: number;
  description?: string;
  topicsCovered?: string[];
}

export type AssignmentLifeCycleStatus =
  | 'ACTIVE'
  | 'DUE_SOON'
  | 'OVERDUE'
  | 'UPCOMING'
  | 'COMPLETED'
  | 'CLOSED';

export type AssignmentSubmissionStatus =
  | 'NOT_SUBMITTED'
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'EVALUATED'
  | 'RESUBMISSION_REQUIRED';

export interface AssignmentQuestion {
  id: string;
  questionNumber: number;
  title?: string;
  content: string;
  marks?: number;
  hint?: string;
}

export interface AssignmentAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  url?: string;
}

export interface StudentAssignmentSubmission {
  id: string;
  submittedAt: string;
  fileName?: string;
  fileSize?: string;
  studentNotes?: string;
  fileUrl?: string;
  status?: AssignmentSubmissionStatus;
}

export interface StudentAssignment {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  subjectColor?: string;
  batchName: string;
  facultyName?: string;
  dueDate: string; // e.g. '10 Oct 2026'
  dueDateIso: string; // e.g. '2026-10-10'
  dueDateUrgency: 'overdue' | 'due_today' | 'due_soon' | 'normal' | 'past';
  dueDateText: string; // e.g. 'Due in 2 days' or 'Overdue by 3 days' or 'Due today'
  status: AssignmentLifeCycleStatus; // Active, Due Soon, Overdue, Upcoming, Completed, Closed
  submissionStatus: AssignmentSubmissionStatus; // Not Submitted, Draft, Submitted, Under Review, Evaluated, Resubmission Required
  maxMarks: number;
  obtainedMarks?: number;
  submittedAt?: string;
  evaluatedAt?: string;
  feedbackNotes?: string;
  instructions?: string;
  attachmentFileName?: string;
  attachmentFileSize?: string;
  // Enhanced attributes for Assignment Details view
  questions?: AssignmentQuestion[];
  attachments?: AssignmentAttachment[];
  submission?: StudentAssignmentSubmission;
  allowLateSubmission?: boolean;
}

