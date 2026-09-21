export type ExaminationType = 'jee-adv' | 'jee-main' | 'neet-ug' | 'foundation';
export type CohortYearType = 2026 | 2027 | 'dropper';
export type PreparationNeed = 'learning' | 'tests' | 'practice' | 'resources';

export interface Examination {
  id: ExaminationType;
  title: string;
  shortCode: string;
  badge: string;
  description: string;
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
    avatarBg?: string;
  };
  metrics: {
    lectures: number;
    dpps: number;
    milestones: number;
  };
  pricing: {
    amount: number;
    period: string;
    originalAmount?: number;
  };
  badge: string;
  status: 'enrolling' | 'active' | 'upcoming';
  features: string[];
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
}

export interface CandidateReflection {
  id: string;
  quote: string;
  author: string;
  cohort: string;
  location: string;
  badge: string;
  metricLabel: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pedagogy' | 'enrollment' | 'testing' | 'resources';
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'Course' | 'Test Series' | 'Formula Sheet' | 'Syllabus Chapter';
  examId: string;
  href: string;
  description?: string;
}
