import {
  StudentDashboardData,
  StudentUpcomingActivity,
  StudentPerformanceSnapshot,
  StudentRecommendation,
  StudentRecentActivity,
} from '../types/student';
import {
  MOCK_ACTIVE_STUDENT_DASHBOARD,
  MOCK_NEW_STUDENT_DASHBOARD,
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
};

export default studentService;
