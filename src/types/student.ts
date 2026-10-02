import { ExaminationType } from './index';

export type StudentNavSection =
  | 'dashboard'
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
  accessStatus: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';
  validUntil: string;
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
