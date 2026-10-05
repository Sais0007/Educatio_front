import {
  StudentDashboardData,
  StudentUpcomingActivity,
  StudentPerformanceSnapshot,
  StudentRecommendation,
  StudentRecentActivity,
  CourseOverviewDetail,
  StudentLiveClass,
  StudentAssignment,
  StudentDPP,
  PracticeHomeData,
  ActivePracticeSession,
  PracticeDifficulty,
  PracticeMode,
} from '../types/student';
import {
  MOCK_ACTIVE_STUDENT_DASHBOARD,
  MOCK_NEW_STUDENT_DASHBOARD,
  MOCK_ACTIVE_STUDENT_LIVE_CLASSES,
  MOCK_NEW_STUDENT_LIVE_CLASSES,
  MOCK_ACTIVE_STUDENT_ASSIGNMENTS,
  MOCK_NEW_STUDENT_ASSIGNMENTS,
  MOCK_ACTIVE_STUDENT_DPPS,
  MOCK_NEW_STUDENT_DPPS,
  MOCK_ACTIVE_PRACTICE_HOME_DATA,
  MOCK_NEW_PRACTICE_HOME_DATA,
  getMockCourseOverview,
} from '../data/mockStudentData';

export interface DashboardFetchOptions {
  scenario?: 'active' | 'new';
  simulateDelayMs?: number;
  shouldFailSection?: 'recommendations' | 'performance' | 'upcoming' | 'none';
}

/**
 * Service to retrieve student dashboard data.
 * Designed to mirror a multi-service or aggregator API endpoint in production.
 */
export const studentService = {
  /**
   * Fetch complete student dashboard payload
   */
  async getDashboardData(options: DashboardFetchOptions = {}): Promise<StudentDashboardData> {
    const { scenario = 'active', simulateDelayMs = 350 } = options;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (scenario === 'new') {
          resolve(JSON.parse(JSON.stringify(MOCK_NEW_STUDENT_DASHBOARD)));
        } else {
          resolve(JSON.parse(JSON.stringify(MOCK_ACTIVE_STUDENT_DASHBOARD)));
        }
      }, simulateDelayMs);
    });
  },

  /**
   * Individual section refreshers for resilient, decoupled section recovery
   */
  async getRecommendations(scenario: 'active' | 'new' = 'active'): Promise<StudentRecommendation[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (scenario === 'new') {
          resolve([]);
        } else {
          resolve([...MOCK_ACTIVE_STUDENT_DASHBOARD.recommendations]);
        }
      }, 300);
    });
  },

  async getUpcomingActivities(scenario: 'active' | 'new' = 'active'): Promise<StudentUpcomingActivity[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (scenario === 'new') {
          resolve([]);
        } else {
          resolve([...MOCK_ACTIVE_STUDENT_DASHBOARD.upcomingActivities]);
        }
      }, 300);
    });
  },

  async getPerformanceSnapshot(scenario: 'active' | 'new' = 'active'): Promise<StudentPerformanceSnapshot> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (scenario === 'new') {
          resolve({ hasHistory: false });
        } else {
          resolve({ ...MOCK_ACTIVE_STUDENT_DASHBOARD.performance });
        }
      }, 300);
    });
  },

  async getRecentActivities(scenario: 'active' | 'new' = 'active'): Promise<StudentRecentActivity[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (scenario === 'new') {
          resolve([]);
        } else {
          resolve([...MOCK_ACTIVE_STUDENT_DASHBOARD.recentActivities]);
        }
      }, 300);
    });
  },

  /**
   * Authoritative endpoint to retrieve courses accessible to the authenticated student
   */
  async getStudentCourses(options: {
    scenario?: 'active' | 'new';
    status?: 'all' | 'active' | 'completed' | 'expired';
    searchQuery?: string;
    sortBy?: 'recent' | 'name' | 'progress';
    simulateDelayMs?: number;
    shouldFail?: boolean;
  } = {}): Promise<import('../types/student').StudentEnrolledCourse[]> {
    const {
      scenario = 'active',
      status = 'all',
      searchQuery = '',
      sortBy = 'recent',
      simulateDelayMs = 300,
      shouldFail = false,
    } = options;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Failed to retrieve student courses from backend'));
          return;
        }

        if (scenario === 'new') {
          resolve([]);
          return;
        }

        let courses = JSON.parse(JSON.stringify(MOCK_ACTIVE_STUDENT_DASHBOARD.enrolledCourses));

        // 1. Status Filter
        if (status === 'active') {
          courses = courses.filter(
            (c: import('../types/student').StudentEnrolledCourse) =>
              c.accessStatus === 'ACTIVE' || c.accessStatus === 'EXPIRING_SOON'
          );
        } else if (status === 'completed') {
          courses = courses.filter(
            (c: import('../types/student').StudentEnrolledCourse) =>
              c.accessStatus === 'COMPLETED' || c.progressPercent >= 100
          );
        } else if (status === 'expired') {
          courses = courses.filter(
            (c: import('../types/student').StudentEnrolledCourse) => c.accessStatus === 'EXPIRED'
          );
        }

        // 2. Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          courses = courses.filter((c: import('../types/student').StudentEnrolledCourse) => {
            const matchTitle = c.title.toLowerCase().includes(q);
            const matchSubject = c.subject.toLowerCase().includes(q);
            const matchExam = c.examinationName ? c.examinationName.toLowerCase().includes(q) : false;
            const matchFaculty = c.facultyName ? c.facultyName.toLowerCase().includes(q) : false;
            return matchTitle || matchSubject || matchExam || matchFaculty;
          });
        }

        // 3. Sorting
        if (sortBy === 'name') {
          courses.sort((a: import('../types/student').StudentEnrolledCourse, b: import('../types/student').StudentEnrolledCourse) =>
            a.title.localeCompare(b.title)
          );
        } else if (sortBy === 'progress') {
          courses.sort(
            (a: import('../types/student').StudentEnrolledCourse, b: import('../types/student').StudentEnrolledCourse) =>
              b.progressPercent - a.progressPercent
          );
        } else {
          // Default: Recently accessed (lastActivityTimestamp descending)
          courses.sort(
            (a: import('../types/student').StudentEnrolledCourse, b: import('../types/student').StudentEnrolledCourse) =>
              (b.lastActivityTimestamp || 0) - (a.lastActivityTimestamp || 0)
          );
        }

        resolve(courses);
      }, simulateDelayMs);
    });
  },

  /**
   * Fetch a single accessible course by ID
   */
  async getStudentCourseById(
    courseId: string,
    scenario: 'active' | 'new' = 'active'
  ): Promise<import('../types/student').StudentEnrolledCourse | null> {
    const courses = await this.getStudentCourses({ scenario });
    const course = courses.find((c) => c.id === courseId);
    return course || null;
  },

  /**
   * Fetch authoritative Course Overview details for the authenticated student.
   * Scoped to student enrollment, batch and institute.
   */
  async getCourseOverview(
    courseId: string,
    options: {
      scenario?: 'active' | 'new';
      simulateDelayMs?: number;
      shouldFail?: boolean;
    } = {}
  ): Promise<CourseOverviewDetail | null> {
    const { scenario = 'active', simulateDelayMs = 300, shouldFail = false } = options;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Unable to retrieve course overview details from backend.'));
          return;
        }

        const overview = getMockCourseOverview(courseId, scenario);
        resolve(overview);
      }, simulateDelayMs);
    });
  },

  /**
   * Authoritative endpoint to retrieve specific lesson context, surrounding module,
   * previous/next sequential lesson pointers, and student playback checkpoint.
   */
  async getLessonDetails(
    courseId: string,
    lessonId: string,
    options: {
      scenario?: 'active' | 'new';
      simulateDelayMs?: number;
      shouldFail?: boolean;
    } = {}
  ): Promise<{
    course: import('../types/student').StudentEnrolledCourse;
    module: import('../types/student').CourseModule;
    lesson: import('../types/student').CourseLesson;
    previousLesson: import('../types/student').CourseLesson | null;
    nextLesson: import('../types/student').CourseLesson | null;
    allLessonsInModule: import('../types/student').CourseLesson[];
  } | null> {
    const { scenario = 'active', simulateDelayMs = 250, shouldFail = false } = options;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Unable to retrieve lesson details from backend."));
          return;
        }

        const overview = getMockCourseOverview(courseId, scenario);
        if (!overview) {
          resolve(null);
          return;
        }

        let targetModule: import('../types/student').CourseModule | null = null;
        let targetLesson: import('../types/student').CourseLesson | null = null;

        // Flatten all lessons across modules to find sequential prev / next
        const allCourseLessons: import('../types/student').CourseLesson[] = [];
        overview.modules.forEach((mod) => {
          mod.lessons.forEach((l) => {
            allCourseLessons.push(l);
            if (l.id === lessonId) {
              targetModule = mod;
              targetLesson = l;
            }
          });
        });

        // If target lesson not found by exact ID, fallback to first lesson
        if (!targetLesson && allCourseLessons.length > 0) {
          targetLesson = allCourseLessons[0];
          targetModule = overview.modules[0];
        }

        if (!targetLesson || !targetModule) {
          resolve(null);
          return;
        }

        const currentIndex = allCourseLessons.findIndex((l) => l.id === targetLesson!.id);
        const previousLesson = currentIndex > 0 ? allCourseLessons[currentIndex - 1] : null;
        const nextLesson =
          currentIndex >= 0 && currentIndex < allCourseLessons.length - 1
            ? allCourseLessons[currentIndex + 1]
            : null;

        resolve({
          course: overview.course,
          module: targetModule,
          lesson: targetLesson,
          previousLesson,
          nextLesson,
          allLessonsInModule: targetModule.lessons,
        });
      }, simulateDelayMs);
    });
  },

  /**
   * Synchronize student playback progress and completion with authoritative backend.
   */
  async updateLessonProgress(
    courseId: string,
    lessonId: string,
    watchedSeconds: number,
    totalSeconds: number,
    isCompleted: boolean
  ): Promise<{ success: boolean; progressPercent: number; isCompleted: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const safeTotal = Math.max(1, totalSeconds);
        const percent = Math.min(100, Math.round((watchedSeconds / safeTotal) * 100));
        const overview = getMockCourseOverview(courseId, 'active');
        if (overview) {
          overview.modules.forEach((mod) => {
            mod.lessons.forEach((l) => {
              if (l.id === lessonId) {
                l.lastWatchedSeconds = watchedSeconds;
                l.progressPercent = isCompleted ? 100 : Math.max(l.progressPercent || 0, percent);
                if (isCompleted || percent >= 90) {
                  l.status = 'COMPLETED';
                } else if (percent > 0) {
                  l.status = 'IN_PROGRESS';
                }
              }
            });
          });
        }
        resolve({
          success: true,
          progressPercent: percent,
          isCompleted: isCompleted || percent >= 90,
        });
      }, 80);
    });
  },

  /**
   * Authoritative endpoint to retrieve live classes affiliated with the student's
   * Institute -> Branch -> Enrolled Courses -> Batch.
   */
  async getLiveClasses(options: {
    scenario?: 'active' | 'new';
    tab?: 'upcoming' | 'past';
    courseId?: string;
    searchQuery?: string;
    simulateDelayMs?: number;
  } = {}): Promise<StudentLiveClass[]> {
    const {
      scenario = 'active',
      tab = 'upcoming',
      courseId,
      searchQuery,
      simulateDelayMs = 280,
    } = options;

    return new Promise((resolve) => {
      setTimeout(() => {
        const raw =
          scenario === 'new'
            ? MOCK_NEW_STUDENT_LIVE_CLASSES
            : MOCK_ACTIVE_STUDENT_LIVE_CLASSES;

        let filtered = raw.filter((c) => {
          if (tab === 'upcoming') {
            return c.status !== 'COMPLETED';
          } else {
            return c.status === 'COMPLETED';
          }
        });

        if (courseId && courseId !== 'all') {
          filtered = filtered.filter((c) => c.courseId === courseId);
        }

        if (searchQuery && searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          filtered = filtered.filter(
            (c) =>
              c.title.toLowerCase().includes(q) ||
              c.facultyName.toLowerCase().includes(q) ||
              c.subject.toLowerCase().includes(q) ||
              c.batchName.toLowerCase().includes(q)
          );
        }

        resolve(JSON.parse(JSON.stringify(filtered)));
      }, simulateDelayMs);
    });
  },

  /**
   * Action to join a live class session.
   * Validates authorization and marks the class as JOINED in memory.
   */
  async joinLiveClass(classId: string): Promise<{ success: boolean; meetingUrl: string; status: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const target = MOCK_ACTIVE_STUDENT_LIVE_CLASSES.find((c) => c.id === classId);
        if (target) {
          target.status = 'JOINED';
        }
        resolve({
          success: true,
          meetingUrl: target?.meetingUrl || 'https://meet.educationplatform.internal/room/live',
          status: 'JOINED',
        });
      }, 150);
    });
  },

  /**
   * Authoritative endpoint to retrieve assignments associated with courses
   * accessible to the authenticated student.
   */
  async getAssignments(options: {
    scenario?: 'active' | 'new';
    courseId?: string;
    tab?: 'all' | 'pending' | 'submitted' | 'evaluated' | 'overdue';
    searchQuery?: string;
    simulateDelayMs?: number;
  } = {}): Promise<StudentAssignment[]> {
    const {
      scenario = 'active',
      courseId,
      tab = 'all',
      searchQuery,
      simulateDelayMs = 280,
    } = options;

    return new Promise((resolve) => {
      setTimeout(() => {
        const raw =
          scenario === 'new'
            ? MOCK_NEW_STUDENT_ASSIGNMENTS
            : MOCK_ACTIVE_STUDENT_ASSIGNMENTS;

        let filtered = [...raw];

        if (courseId && courseId !== 'all') {
          filtered = filtered.filter((a) => a.courseId === courseId);
        }

        if (tab === 'pending') {
          filtered = filtered.filter(
            (a) =>
              a.submissionStatus === 'NOT_SUBMITTED' ||
              a.submissionStatus === 'DRAFT' ||
              a.submissionStatus === 'RESUBMISSION_REQUIRED'
          );
        } else if (tab === 'submitted') {
          filtered = filtered.filter(
            (a) =>
              a.submissionStatus === 'SUBMITTED' ||
              a.submissionStatus === 'UNDER_REVIEW'
          );
        } else if (tab === 'evaluated') {
          filtered = filtered.filter((a) => a.submissionStatus === 'EVALUATED');
        } else if (tab === 'overdue') {
          filtered = filtered.filter((a) => a.status === 'OVERDUE');
        }

        if (searchQuery && searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          filtered = filtered.filter(
            (a) =>
              a.title.toLowerCase().includes(q) ||
              a.courseTitle.toLowerCase().includes(q) ||
              a.subject.toLowerCase().includes(q)
          );
        }

        // Default sorting prioritizing attention:
        // 1. Overdue, 2. Due Today, 3. Due Soon, 4. Active/Upcoming, 5. Completed
        const urgencyWeight: Record<string, number> = {
          overdue: 1,
          due_today: 2,
          due_soon: 3,
          normal: 4,
          past: 5,
        };

        filtered.sort((a, b) => {
          const weightA = urgencyWeight[a.dueDateUrgency] || 4;
          const weightB = urgencyWeight[b.dueDateUrgency] || 4;
          return weightA - weightB;
        });

        resolve(JSON.parse(JSON.stringify(filtered)));
      }, simulateDelayMs);
    });
  },

  /**
   * Action to submit an assignment. Updates the in-memory submission status to SUBMITTED.
   */
  async submitAssignment(
    assignmentId: string,
    options: {
      fileName?: string;
      fileSize?: string;
      studentNotes?: string;
      shouldFail?: boolean;
      simulateDelayMs?: number;
    } = {}
  ): Promise<{ success: boolean; assignment: StudentAssignment | null; error?: string }> {
    const {
      fileName = 'Completed_Assignment_Submission.pdf',
      fileSize = '2.4 MB',
      studentNotes = '',
      shouldFail = false,
      simulateDelayMs = 250,
    } = options;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (shouldFail) {
          resolve({
            success: false,
            assignment: null,
            error: "We couldn't submit your assignment. Please check your connection and try again.",
          });
          return;
        }

        const target = MOCK_ACTIVE_STUDENT_ASSIGNMENTS.find((a) => a.id === assignmentId);
        if (target) {
          const nowFormatted = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) + ' at ' + new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          target.submissionStatus = 'SUBMITTED';
          target.submittedAt = nowFormatted;
          target.submission = {
            id: `sub-${target.id}-${Date.now()}`,
            submittedAt: nowFormatted,
            fileName: fileName,
            fileSize: fileSize,
            studentNotes: studentNotes,
            status: 'SUBMITTED',
          };
          if (target.status === 'OVERDUE' || target.status === 'DUE_SOON') {
            target.status = 'ACTIVE';
          }
        }

        resolve({
          success: true,
          assignment: target ? JSON.parse(JSON.stringify(target)) : null,
        });
      }, simulateDelayMs);
    });
  },

  /**
   * Save assignment work as a draft without formal submission.
   */
  async saveAssignmentDraft(
    assignmentId: string,
    options: {
      fileName?: string;
      fileSize?: string;
      studentNotes?: string;
      simulateDelayMs?: number;
    } = {}
  ): Promise<{ success: boolean; assignment: StudentAssignment | null }> {
    const {
      fileName = 'Assignment_Draft_Work.pdf',
      fileSize = '1.8 MB',
      studentNotes = '',
      simulateDelayMs = 150,
    } = options;

    return new Promise((resolve) => {
      setTimeout(() => {
        const target = MOCK_ACTIVE_STUDENT_ASSIGNMENTS.find((a) => a.id === assignmentId);
        if (target) {
          const nowFormatted = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) + ' at ' + new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }) + ' (Draft)';

          target.submissionStatus = 'DRAFT';
          target.submission = {
            id: `draft-${target.id}-${Date.now()}`,
            submittedAt: nowFormatted,
            fileName: fileName,
            fileSize: fileSize,
            studentNotes: studentNotes,
            status: 'DRAFT',
          };
        }

        resolve({
          success: true,
          assignment: target ? JSON.parse(JSON.stringify(target)) : null,
        });
      }, simulateDelayMs);
    });
  },

  /**
   * Authoritative endpoint to retrieve specific assignment details by ID.
   * Scoped to student enrollment, batch and institute.
   */
  async getAssignmentById(
    assignmentId: string,
    options: {
      scenario?: 'active' | 'new';
      simulateDelayMs?: number;
      shouldFail?: boolean;
    } = {}
  ): Promise<StudentAssignment | null> {
    const { scenario = 'active', simulateDelayMs = 250, shouldFail = false } = options;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Unable to retrieve assignment details from backend."));
          return;
        }

        const raw =
          scenario === 'new'
            ? MOCK_NEW_STUDENT_ASSIGNMENTS
            : MOCK_ACTIVE_STUDENT_ASSIGNMENTS;

        const found = raw.find((a) => a.id === assignmentId);
        if (!found) {
          resolve(null);
          return;
        }

        resolve(JSON.parse(JSON.stringify(found)));
      }, simulateDelayMs);
    });
  },

  /**
   * Authoritative endpoint to retrieve Daily Practice Problems (DPP)
   * scoped to student enrollment, batch and institute.
   */
  async getDPPs(options: {
    scenario?: 'active' | 'new';
    courseId?: string;
    subject?: string;
    status?: string;
    searchQuery?: string;
    simulateDelayMs?: number;
  } = {}): Promise<StudentDPP[]> {
    const {
      scenario = 'active',
      courseId,
      subject,
      status,
      searchQuery,
      simulateDelayMs = 240,
    } = options;

    return new Promise((resolve) => {
      setTimeout(() => {
        const raw =
          scenario === 'new'
            ? MOCK_NEW_STUDENT_DPPS
            : MOCK_ACTIVE_STUDENT_DPPS;

        let filtered = [...raw];

        if (courseId && courseId !== 'all') {
          filtered = filtered.filter((d: StudentDPP) => d.courseId === courseId);
        }

        if (subject && subject !== 'all') {
          filtered = filtered.filter((d: StudentDPP) => d.subject.toLowerCase() === subject.toLowerCase());
        }

        if (status && status !== 'all') {
          filtered = filtered.filter((d: StudentDPP) => d.status.toLowerCase() === status.toLowerCase());
        }

        if (searchQuery && searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          filtered = filtered.filter(
            (d: StudentDPP) =>
              d.title.toLowerCase().includes(q) ||
              d.subject.toLowerCase().includes(q) ||
              d.courseTitle.toLowerCase().includes(q)
          );
        }

        // Authoritative ordering prioritizing actionable work:
        // 1. Today's available DPP
        // 2. Today's in-progress DPP
        // 3. Upcoming DPPs
        // 4. Recent incomplete/available DPPs
        // 5. Completed DPPs
        // 6. Expired DPPs
        const getPriorityWeight = (d: StudentDPP) => {
          if (d.dateCategory === 'today' && d.status === 'AVAILABLE') return 1;
          if (d.dateCategory === 'today' && d.status === 'IN_PROGRESS') return 2;
          if (d.status === 'UPCOMING') return 3;
          if (d.status === 'AVAILABLE' || d.status === 'IN_PROGRESS') return 4;
          if (d.status === 'COMPLETED') return 5;
          if (d.status === 'EXPIRED') return 6;
          return 7;
        };

        filtered.sort((a: StudentDPP, b: StudentDPP) => {
          const wA = getPriorityWeight(a);
          const wB = getPriorityWeight(b);
          if (wA !== wB) return wA - wB;
          return b.dateIso.localeCompare(a.dateIso);
        });

        resolve(JSON.parse(JSON.stringify(filtered)));
      }, simulateDelayMs);
    });
  },

  /**
   * Start or continue a DPP session. Updates status in-memory.
   */
  async startDPP(dppId: string): Promise<{ success: boolean; dpp: StudentDPP | null }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const target = MOCK_ACTIVE_STUDENT_DPPS.find((d: StudentDPP) => d.id === dppId);
        if (target && target.status === 'AVAILABLE') {
          target.status = 'IN_PROGRESS';
          target.completedQuestions = target.completedQuestions || 1;
        }
        resolve({
          success: true,
          dpp: target ? JSON.parse(JSON.stringify(target)) : null,
        });
      }, 150);
    });
  },

  /**
   * Complete a DPP session and record score.
   */
  async completeDPP(
    dppId: string,
    obtainedMarks: number = 18,
    maxMarks: number = 20
  ): Promise<{ success: boolean; dpp: StudentDPP | null }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const target = MOCK_ACTIVE_STUDENT_DPPS.find((d: StudentDPP) => d.id === dppId);
        if (target) {
          target.status = 'COMPLETED';
          target.obtainedMarks = obtainedMarks;
          target.maxMarks = maxMarks;
          target.score = `${obtainedMarks} / ${maxMarks}`;
          target.scorePercent = Math.round((obtainedMarks / maxMarks) * 100);
          target.completedQuestions = target.totalQuestions;
          target.completedAt = 'Just now';
        }
        resolve({
          success: true,
          dpp: target ? JSON.parse(JSON.stringify(target)) : null,
        });
      }, 150);
    });
  },

  /**
   * Fetch Practice Home / Dashboard data
   */
  async getPracticeHomeData(
    options: {
      scenario?: 'active' | 'new';
      simulateDelayMs?: number;
      shouldFail?: boolean;
    } = {}
  ): Promise<PracticeHomeData> {
    const { scenario = 'active', simulateDelayMs = 300, shouldFail = false } = options;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Unable to retrieve practice data from backend.'));
          return;
        }

        const data = scenario === 'new' ? MOCK_NEW_PRACTICE_HOME_DATA : MOCK_ACTIVE_PRACTICE_HOME_DATA;
        resolve(JSON.parse(JSON.stringify(data)));
      }, simulateDelayMs);
    });
  },

  /**
   * Start a new practice session or update active session
   */
  async startPracticeSession(config: {
    title?: string;
    subject: string;
    chapterTitle?: string;
    topicTitle?: string;
    difficulty: PracticeDifficulty;
    questionCount: number;
    mode: PracticeMode;
  }): Promise<{ success: boolean; session: ActivePracticeSession }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSession: ActivePracticeSession = {
          id: `sess-${Date.now()}`,
          title: config.title || `${config.subject} - ${config.topicTitle || config.chapterTitle || 'Practice Drill'}`,
          subject: config.subject,
          subjectColor: config.subject === 'Physics' ? '#00A8F0' : config.subject === 'Chemistry' ? '#35C978' : '#6C63D9',
          chapterTitle: config.chapterTitle,
          topicTitle: config.topicTitle,
          totalQuestions: config.questionCount,
          completedQuestions: 0,
          remainingQuestions: config.questionCount,
          timeSpentMinutes: 0,
          startedAt: 'Started Just now',
          difficulty: config.difficulty,
          mode: config.mode,
        };

        MOCK_ACTIVE_PRACTICE_HOME_DATA.activeSession = newSession;

        resolve({
          success: true,
          session: JSON.parse(JSON.stringify(newSession)),
        });
      }, 200);
    });
  },

  /**
   * Clear active practice session
   */
  async clearActivePracticeSession(): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        MOCK_ACTIVE_PRACTICE_HOME_DATA.activeSession = null;
        resolve({ success: true });
      }, 150);
    });
  },
};

export default studentService;


