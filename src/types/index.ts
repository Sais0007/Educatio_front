export type ScreenType =
  | 'home'
  | 'examinations'
  | 'courses'
  | 'course-details'
  | 'tests'
  | 'test-details'
  | 'about'
  | 'contact'
  | 'faq'
  | 'signup'
  | 'student-dashboard'
  | 'student-courses'
  | 'student-course-overview'
  | 'student-lesson-list'
  | 'student-video-learning'
  | 'student-live-classes'
  | 'student-assignments'
  | 'student-assignment-details'
  | 'student-dpps'
  | 'student-learning'
  | 'student-practice'
  | 'student-tests'
  | 'student-results'
  | 'student-revision'
  | 'student-resources'
  | 'student-profile';

export * from './student';

export interface InstituteBranchOption {
  id: string;
  instituteName: string;
  branchName: string;
  displayName: string;
  city: string;
  isOnline?: boolean;
}

export type ExaminationType = 'jee-adv' | 'jee-main' | 'neet-ug' | 'foundation';
export type CohortYearType = 2026 | 2027 | 'dropper';
export type PreparationNeed = 'learning' | 'tests' | 'practice' | 'resources';

export type ExaminationCategory = 'engineering' | 'medical' | 'foundation';

export interface Examination {
  id: ExaminationType;
  title: string;
  shortCode: string;
  badge: string;
  category?: ExaminationCategory;
  description: string;
  targetAudiences: string[];
  subjects?: string[];
  supportedYears?: (number | string)[];
  conductingBody?: string;
  format?: string;
  frequency?: string;
}

export interface CohortYear {
  id: CohortYearType;
  label: string;
  description: string;
}

export interface PrepObjective {
  id: PreparationNeed;
  label: string;
  subtitle: string;
  icon: string;
  targetPath: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  subject: string;
  designation: string;
  credentials: string;
  experienceYears: number;
  initials: string;
  avatarUrl: string;
  examSpecialization: string;
  keyContributions: string;
}

export interface CatalogCourse {
  id: string;
  title: string;
  subtitle: string;
  examId: ExaminationType;
  cohortYear: CohortYearType;
  category: 'physics' | 'chemistry' | 'mathematics' | 'biology' | 'comprehensive';
  batchName: string;
  faculty: {
    name: string;
    designation: string;
    initials: string;
    avatarUrl?: string;
    avatarBg?: string;
  };
  metrics: {
    lectures: number;
    dpps: number;
    milestones: number;
    accessMonths: number;
  };
  pricing: {
    amount: number;
    period: string;
    originalAmount?: number;
  };
  badge: string;
  status: 'enrolling' | 'active' | 'upcoming';
  features: string[];
  curriculumOverview?: {
    moduleCount: number;
    totalHours: number;
    sampleChapters: string[];
  };
}

export interface TestSeriesItem {
  id: string;
  title: string;
  examCode: string;
  examId: ExaminationType;
  targetYear: CohortYearType;
  paperType: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  questionPattern: string;
  metrics: {
    fullMocks: number;
    sectionals: number;
    topicWise: number;
  };
  pricing: {
    amount: number;
    period: string;
  };
  features: string[];
}

export interface FreeResource {
  id: string;
  title: string;
  subject: string;
  topic: string;
  examId: ExaminationType;
  format: 'PDF';
  fileSize: string;
  downloads: string;
  downloadUrl: string;
  summary: string;
  lastReviewed: string;
  previewUrl?: string;
}

export interface CandidateReflection {
  id: string;
  quote: string;
  author: string;
  cohort: string;
  location: string;
  badge: string;
  metricLabel: string;
  avatarUrl: string;
  examTarget: string;
  recoveredMarks?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pedagogy' | 'enrollment' | 'testing' | 'resources' | 'examinations';
  status?: 'PUBLISHED' | 'DRAFT';
  order?: number;
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'Course' | 'Test Series' | 'Formula Sheet' | 'Syllabus Chapter';
  examId: string;
  href: string;
  description?: string;
}

export interface PlatformMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lecturesCount: number;
  duration?: string;
  topics: string[];
}

export interface PublicCourse {
  id: string;
  title: string;
  examId: ExaminationType;
  examinationName: string;
  subject: string;
  description: string;
  overview?: string;
  learningOutcomes?: string[];
  prerequisites?: string[];
  targetAudience?: string;
  modules?: CourseModule[];
  faculty?: {
    name: string;
    designation?: string;
    avatarUrl?: string;
    bio?: string;
  };
  duration?: string;
  level?: string;
  language?: string;
  contentSummary?: {
    modulesCount: number;
    lecturesCount: number;
    practiceSheetsCount?: number;
  };
  managedBy: 'SUPER_ADMIN' | 'INSTITUTE_ADMIN';
  visibility: 'PUBLIC' | 'GUEST_ACCESSIBLE' | 'INSTITUTE_RESTRICTED' | 'PRIVATE';
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  accessType: 'FREE' | 'PAID';
  badge?: string;
  targetYear?: number | string;
}

export interface PublicSampleTest {
  id: string;
  title: string;
  examId: ExaminationType;
  examinationName: string;
  subject: string;
  testType: 'Full Mock Test' | 'Sectional Assessment' | 'Diagnostic Test';
  totalQuestions: number;
  durationMinutes: number;
  totalMarks?: number;
  description: string;
  overview?: string;
  syllabusTopics?: string[];
  scoringScheme?: {
    correct: number;
    incorrect: number;
    unattempted: number;
    format: string;
  };
  targetAudience?: string;
  instructionsSummary?: string[];
  managedBy: 'SUPER_ADMIN' | 'INSTITUTE_ADMIN';
  visibility: 'PUBLIC' | 'GUEST_ACCESSIBLE' | 'INSTITUTE_RESTRICTED' | 'PRIVATE';
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  previewFeatures: string[];
  gatedFeatures: string[];
  targetYear?: number | string;
  patternNotice?: string;
}

export type CourseResourceType = 'PDF' | 'DPP' | 'Formula Sheet' | 'Previous Paper' | 'Sample Report';

export interface CourseResource {
  id: string;
  title: string;
  type: CourseResourceType;
  courseId: string;
  courseTitle?: string;
  examId?: ExaminationType;
  examinationName?: string;
  subject?: string;
  yearRange?: string;
  description?: string;
  pageCount?: number;
  fileSize?: string;
  managedBy: 'SUPER_ADMIN' | 'INSTITUTE_ADMIN';
  visibility: 'PUBLIC' | 'GUEST_ACCESSIBLE' | 'INSTITUTE_RESTRICTED' | 'PRIVATE';
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  accessType: 'FREE' | 'PAID';
  downloadUrl?: string;
  previewUrl?: string;
}

export interface AboutSection {
  id: string;
  heading: string;
  content: string[];
  badge?: string;
  imageUrl?: string;
  imageCaption?: string;
  order: number;
}

export interface AboutHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutPageData {
  title: string;
  subtitle: string;
  introduction: string;
  sections: AboutSection[];
  highlights: AboutHighlight[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  status: 'PUBLISHED' | 'DRAFT';
  lastUpdated?: string;
}

export type TicketCategory = 'admissions' | 'academic' | 'technical' | 'general';

export interface SupportTicketSubmission {
  name: string;
  email: string;
  mobile: string;
  category: TicketCategory;
  subject: string;
  message: string;
}

export interface SupportTicketResponse {
  success: boolean;
  ticketId?: string;
  message?: string;
  submittedAt?: string;
  error?: string;
}
