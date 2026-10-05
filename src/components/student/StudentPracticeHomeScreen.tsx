import React, { useState, useEffect, useMemo } from 'react';
import {
  PracticeHomeData,
  ActivePracticeSession,
  PracticeDifficulty,
  PracticeMode,
  PracticeTopicOption,
  DailyPracticeChallenge,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { Badge } from '../common/Badge';

interface StudentPracticeHomeScreenProps {
  scenario?: 'active' | 'new';
  onBackToDashboard: () => void;
  onNavigateDPPs?: () => void;
  onNavigateCourses?: () => void;
  onToast?: (message: string) => void;
}

export const StudentPracticeHomeScreen: React.FC<StudentPracticeHomeScreenProps> = ({
  scenario = 'active',
  onBackToDashboard,
  onNavigateDPPs,
  onNavigateCourses,
  onToast,
}) => {
  // Main data state
  const [data, setData] = useState<PracticeHomeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state for Topic library
  const [selectedSubjectTab, setSelectedSubjectTab] = useState<string>('all');
  const [searchTopicQuery, setSearchTopicQuery] = useState<string>('');

  // Practice Configuration Modal State
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [configMode, setConfigMode] = useState<PracticeMode>('custom');
  const [configSubject, setConfigSubject] = useState<string>('Physics');
  const [configTopicId, setConfigTopicId] = useState<string>('');
  const [configDifficulty, setConfigDifficulty] = useState<PracticeDifficulty>('medium');
  const [configQuestionCount, setConfigQuestionCount] = useState<number>(15);
  const [configIsTimed, setConfigIsTimed] = useState<boolean>(true);
  const [isStartingSession, setIsStartingSession] = useState<boolean>(false);

  // Active Session Interactive Simulator Modal
  const [simulatedSession, setSimulatedSession] = useState<ActivePracticeSession | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmittingSimulatedSession, setIsSubmittingSimulatedSession] = useState<boolean>(false);

  // Fetch Practice Home Data
  const loadPracticeData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await studentService.getPracticeHomeData({
        scenario,
        simulateDelayMs: 250,
      });
      setData(res);
    } catch (_err) {
      setError("Unable to load practice arena data. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPracticeData();
  }, [scenario]);

  // Filtered topics based on subject tab and search
  const filteredTopics = useMemo(() => {
    if (!data?.topics) return [];
    return data.topics.filter((topic) => {
      const matchSubject =
        selectedSubjectTab === 'all' ||
        topic.subject.toLowerCase() === selectedSubjectTab.toLowerCase();
      const matchQuery =
        !searchTopicQuery.trim() ||
        topic.topicTitle.toLowerCase().includes(searchTopicQuery.toLowerCase()) ||
        topic.chapterTitle.toLowerCase().includes(searchTopicQuery.toLowerCase()) ||
        topic.subject.toLowerCase().includes(searchTopicQuery.toLowerCase());
      return matchSubject && matchQuery;
    });
  }, [data?.topics, selectedSubjectTab, searchTopicQuery]);

  // Open configuration modal with pre-fills
  const handleOpenConfigModal = (options?: {
    mode?: PracticeMode;
    subject?: string;
    topicId?: string;
    difficulty?: PracticeDifficulty;
  }) => {
    const mode = options?.mode || 'custom';
    setConfigMode(mode);
    if (options?.subject) setConfigSubject(options.subject);
    if (options?.topicId) setConfigTopicId(options.topicId);
    if (options?.difficulty) setConfigDifficulty(options.difficulty);
    setIsConfigModalOpen(true);
  };

  // Launch the configured practice session
  const handleConfirmStartPractice = async () => {
    setIsStartingSession(true);
    try {
      const selectedTopicObj = data?.topics.find((t) => t.id === configTopicId);
      const res = await studentService.startPracticeSession({
        subject: configSubject,
        chapterTitle: selectedTopicObj?.chapterTitle,
        topicTitle: selectedTopicObj?.topicTitle || `${configSubject} Practice Drill`,
        difficulty: configDifficulty,
        questionCount: configQuestionCount,
        mode: configMode,
      });

      if (res.success) {
        setIsConfigModalOpen(false);
        // Refresh local data state
        setData((prev) => (prev ? { ...prev, activeSession: res.session } : null));
        if (onToast) onToast(`Practice set created: ${res.session.title}`);
        // Immediately open the interactive practice player
        setSimulatedSession(res.session);
        setActiveQuestionIndex(0);
        setSelectedOption(null);
      }
    } catch (_err) {
      if (onToast) onToast('Failed to start practice session. Please try again.');
    } finally {
      setIsStartingSession(false);
    }
  };

  // Resume active session
  const handleResumeActiveSession = (session: ActivePracticeSession) => {
    setSimulatedSession(session);
    setActiveQuestionIndex(session.completedQuestions > 0 ? session.completedQuestions - 1 : 0);
    setSelectedOption(null);
    if (onToast) onToast(`Resumed "${session.title}"`);
  };

  // Discard active session
  const handleDiscardActiveSession = async () => {
    await studentService.clearActivePracticeSession();
    setData((prev) => (prev ? { ...prev, activeSession: null } : null));
    if (onToast) onToast('Active practice session discarded.');
  };

  // Complete simulated session
  const handleCompleteSimulatedSession = async () => {
    setIsSubmittingSimulatedSession(true);
    setTimeout(async () => {
      await studentService.clearActivePracticeSession();
      setIsSubmittingSimulatedSession(false);
      setSimulatedSession(null);
      if (onToast) {
        onToast('Practice drill submitted successfully! +25 XP earned.');
      }
      // Reload updated stats
      loadPracticeData();
    }, 600);
  };

  // Start Daily Challenge
  const handleStartDailyChallenge = (challenge: DailyPracticeChallenge) => {
    handleOpenConfigModal({
      mode: 'daily_challenge',
      subject: challenge.subject.includes('Physics') ? 'Physics' : 'Mathematics',
      difficulty: challenge.difficulty,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Student Dashboard', onClick: onBackToDashboard },
          { label: 'Practice Arena', isCurrent: true },
        ]}
      />

      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#12365A] tracking-tight">
              Practice Arena
            </h1>
            <Badge variant="blue" size="sm">
              Adaptive Drills
            </Badge>
          </div>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-normal">
            Sharpen your concepts with targeted subject drills, previous year questions (PYQs), and timed challenge sets.
          </p>
        </div>

        {/* Quick Hub Navigation & Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          {onNavigateDPPs && (
            <button
              onClick={onNavigateDPPs}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg text-[#12365A] bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">task_alt</span>
              <span>Daily Practice (DPPs)</span>
            </button>
          )}
          {onNavigateCourses && (
            <button
              onClick={onNavigateCourses}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg text-[#12365A] bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#6C63D9]">menu_book</span>
              <span>My Courses</span>
            </button>
          )}
          <button
            onClick={() => handleOpenConfigModal({ mode: 'custom' })}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-[#00A8F0] hover:bg-[#0096D6] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Practice Set</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6 animate-pulse">
          <div className="h-44 bg-slate-200 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-slate-200 rounded-xl" />
            <div className="h-48 bg-slate-200 rounded-xl" />
            <div className="h-48 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-80 bg-slate-200 rounded-xl" />
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto">
          <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
          <h3 className="text-base font-semibold text-red-900 mb-1">Failed to Load Practice Arena</h3>
          <p className="text-xs text-red-700 mb-4">{error}</p>
          <button
            onClick={loadPracticeData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Loaded Content */}
      {!isLoading && !error && data && (
        <div className="space-y-8">
          {/* 1. Continue Practice Banner (If Active Session Exists) */}
          {data.activeSession ? (
            <div className="relative overflow-hidden bg-gradient-to-r from-[#12365A] via-[#1a497a] to-[#12365A] text-white rounded-2xl p-6 sm:p-7 shadow-md border border-slate-700/40">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A8F0]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Session In Progress
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      {data.activeSession.startedAt}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                      {data.activeSession.title}
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {data.activeSession.chapterTitle ? `${data.activeSession.chapterTitle} • ` : ''}
                      {data.activeSession.topicTitle || 'Comprehensive Drill'}
                    </p>
                  </div>

                  {/* Progress Bar & Session Metrics */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>
                        Questions: <strong className="text-white">{data.activeSession.completedQuestions}</strong> of {data.activeSession.totalQuestions} answered
                      </span>
                      <span className="font-mono text-cyan-300 font-semibold">
                        {Math.round((data.activeSession.completedQuestions / data.activeSession.totalQuestions) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/80 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#00A8F0] to-emerald-400 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${(data.activeSession.completedQuestions / data.activeSession.totalQuestions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Badges strip */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 pt-1">
                    <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md text-[11px]">
                      <span className="material-symbols-outlined text-[14px] text-amber-300">timer</span>
                      {data.activeSession.timeSpentMinutes} mins spent
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md text-[11px]">
                      <span className="material-symbols-outlined text-[14px] text-purple-300">tune</span>
                      Difficulty: <span className="capitalize font-medium text-white">{data.activeSession.difficulty}</span>
                    </span>
                    {data.activeSession.accuracyPercent !== undefined && (
                      <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md text-[11px]">
                        <span className="material-symbols-outlined text-[14px] text-emerald-300">trending_up</span>
                        {data.activeSession.accuracyPercent}% Accuracy
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex sm:flex-row lg:flex-col items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleResumeActiveSession(data.activeSession!)}
                    className="w-full sm:w-auto lg:w-48 px-5 py-3 rounded-xl bg-[#00A8F0] hover:bg-[#0096D6] text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Resume Practice</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <button
                    onClick={handleDiscardActiveSession}
                    className="w-full sm:w-auto lg:w-48 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                    <span>Discard Session</span>
                  </button>
                </div>
              </div>
            </div>
          ) : scenario === 'new' ? (
            /* New student welcoming empty state */
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00A8F0]/10 text-[#00A8F0] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                </div>
                <div>
                  <h2 className="text-base font-serif font-bold text-[#12365A]">
                    Welcome to the Independent Practice Arena!
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">
                    Build problem-solving speed and accuracy with curated topic sets, full PYQs, and daily challenges. You haven&apos;t started a practice session yet.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenConfigModal({ mode: 'custom' })}
                className="px-5 py-2.5 rounded-xl bg-[#00A8F0] hover:bg-[#0096D6] text-white font-semibold text-xs transition-colors shadow-xs shrink-0 cursor-pointer"
              >
                Launch First Practice Drill
              </button>
            </div>
          ) : null}

          {/* 2. Primary Practice Modes Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mode 1: Custom Practice Drill */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-[#00A8F0]/50 hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#00A8F0]/10 text-[#00A8F0] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">instant_mix</span>
                  </div>
                  <Badge variant="blue" size="sm">
                    Self-Paced
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#12365A] group-hover:text-[#00A8F0] transition-colors">
                    Custom Practice Drill
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Build a custom practice session by selecting subjects, chapters, question counts, and difficulty levels.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                    10 - 30 Questions
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                    Timed / Untimed
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                    Step Hints
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => handleOpenConfigModal({ mode: 'custom' })}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#00A8F0] text-[#12365A] hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 group-hover:bg-[#00A8F0] group-hover:text-white cursor-pointer"
                >
                  <span>Configure Drill</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Mode 2: Previous Year Questions (PYQs) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-[#6C63D9]/50 hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#6C63D9]/10 text-[#6C63D9] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">history_edu</span>
                  </div>
                  <Badge variant="purple" size="sm">
                    2015 – 2025
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#12365A] group-hover:text-[#6C63D9] transition-colors">
                    Previous Year Questions (PYQs)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Practice authentic exam problems from JEE Main, JEE Advanced, and NEET with year tags and detailed solutions.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium">
                    JEE Main
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                    JEE Advanced
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                    NEET-UG
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => handleOpenConfigModal({ mode: 'pyq' })}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#6C63D9] text-[#12365A] hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Practice PYQs</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Mode 3: Daily Practice Challenge */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-[#F6C20F]/60 hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#F6C20F]/20 text-[#854D0E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">bolt</span>
                  </div>
                  <Badge variant="yellow" size="sm">
                    Today&apos;s Challenge
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#12365A] group-hover:text-amber-700 transition-colors">
                    Daily Practice Challenge
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {data.dailyChallenge?.title || "Daily curated 10-question drill to sharpen speed and accuracy under strict time limit."}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[13px]">timer</span>
                    {data.dailyChallenge?.durationMinutes || 25} Mins
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[13px]">format_list_numbered</span>
                    {data.dailyChallenge?.totalQuestions || 10} Questions
                  </span>
                  <span className="capitalize font-medium text-[11px] text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    {data.dailyChallenge?.difficulty || 'hard'}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    data.dailyChallenge ? handleStartDailyChallenge(data.dailyChallenge) : handleOpenConfigModal()
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Start Today&apos;s Challenge</span>
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Supporting Targeted Practice Areas: Mistakes & Bookmarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Mistake Notebook Card */}
            <div className="bg-gradient-to-r from-red-50/70 to-rose-50/40 rounded-2xl p-5 border border-red-200/70 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">restart_alt</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#12365A]">Mistake Notebook</h4>
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {data.stats.mistakesCount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Re-attempt questions you previously answered incorrectly across tests &amp; DPPs.
                  </p>
                </div>
              </div>
              <button
                disabled={data.stats.mistakesCount === 0}
                onClick={() =>
                  handleOpenConfigModal({
                    mode: 'mistakes',
                    difficulty: 'mixed',
                  })
                }
                className="shrink-0 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Revise Mistakes
              </button>
            </div>

            {/* Bookmarked Questions Card */}
            <div className="bg-gradient-to-r from-amber-50/70 to-yellow-50/40 rounded-2xl p-5 border border-amber-200/70 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">bookmark</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#12365A]">Bookmarked Questions</h4>
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {data.stats.bookmarksCount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Quickly access tricky, high-yield problems you marked during study sessions.
                  </p>
                </div>
              </div>
              <button
                disabled={data.stats.bookmarksCount === 0}
                onClick={() =>
                  handleOpenConfigModal({
                    mode: 'bookmarks',
                    difficulty: 'hard',
                  })
                }
                className="shrink-0 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Practice Bookmarks
              </button>
            </div>
          </div>

          {/* 4. Practice by Subject & Topic Browser */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#12365A]">
                  Question Bank by Chapter &amp; Topic
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select any syllabus topic to jump straight into categorized problem sets.
                </p>
              </div>

              {/* Topic Search Filter */}
              <div className="relative w-full sm:w-72">
                <span className="material-symbols-outlined text-[18px] text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search topic or chapter..."
                  value={searchTopicQuery}
                  onChange={(e) => setSearchTopicQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A8F0] focus:ring-1 focus:ring-[#00A8F0] bg-slate-50/50"
                />
              </div>
            </div>

            {/* Subject Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: 'All Subjects' },
                { id: 'physics', label: 'Physics', color: '#00A8F0' },
                { id: 'chemistry', label: 'Chemistry', color: '#35C978' },
                { id: 'mathematics', label: 'Mathematics', color: '#6C63D9' },
                { id: 'biology', label: 'Biology', color: '#10B981' },
              ].map((sub) => {
                const isSelected = selectedSubjectTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubjectTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#12365A] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>

            {/* Topic Cards Grid */}
            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTopics.map((topic: PracticeTopicOption) => {
                  const mastery = topic.masteryPercent || 0;
                  return (
                    <div
                      key={topic.id}
                      className="p-5 rounded-xl border border-slate-200/90 hover:border-[#00A8F0] hover:shadow-sm transition-all flex flex-col justify-between space-y-4 bg-white"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${topic.subjectColor || '#00A8F0'}15`,
                              color: topic.subjectColor || '#00A8F0',
                            }}
                          >
                            {topic.subject}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {topic.questionCount} Questions
                          </span>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            {topic.chapterTitle}
                          </p>
                          <h4 className="text-sm font-bold text-[#12365A] mt-0.5 leading-snug">
                            {topic.topicTitle}
                          </h4>
                        </div>

                        {/* Mastery Bar */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Topic Mastery</span>
                            <span className="font-semibold text-slate-700">{mastery}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${mastery}%` }}
                            />
                          </div>
                        </div>

                        {/* Difficulty breakdown pills */}
                        {topic.difficultyBreakdown && (
                          <div className="flex items-center gap-2 pt-1 text-[11px]">
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {topic.difficultyBreakdown.easy} Easy
                            </span>
                            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                              {topic.difficultyBreakdown.medium} Medium
                            </span>
                            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                              {topic.difficultyBreakdown.hard} Hard
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() =>
                            handleOpenConfigModal({
                              mode: 'topic',
                              subject: topic.subject,
                              topicId: topic.id,
                            })
                          }
                          className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:border-[#00A8F0] hover:bg-[#00A8F0]/5 text-[#12365A] hover:text-[#00A8F0] font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">play_circle</span>
                          <span>Practice Topic</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <span className="material-symbols-outlined text-3xl text-slate-400 mb-1">search_off</span>
                <p className="text-xs text-slate-600 font-medium">No topics found matching your query.</p>
                <button
                  onClick={() => {
                    setSelectedSubjectTab('all');
                    setSearchTopicQuery('');
                  }}
                  className="mt-3 text-xs text-[#00A8F0] hover:underline font-semibold"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>

          {/* 5. Performance Stats Summary & Recent Practice Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Overall Practice Stats Card */}
            <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-[#12365A]">Practice Momentum</h3>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/60">
                  {data.stats.currentStreakDays} Day Streak 🔥
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Total Solved</span>
                    <p className="text-xl font-bold font-mono text-[#12365A] mt-0.5">
                      {data.stats.totalQuestionsPracticed}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#00A8F0]/10 text-[#00A8F0] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">quiz</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Avg Accuracy</span>
                    <p className="text-xl font-bold font-mono text-emerald-600 mt-0.5">
                      {data.stats.averageAccuracy}%
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                  </div>
                </div>

                {/* Weekly Goal Progress */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Weekly Goal</span>
                    <span className="font-mono font-bold text-[#12365A]">
                      {data.stats.weeklyGoalCompleted} / {data.stats.weeklyGoalTarget}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#00A8F0] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((data.stats.weeklyGoalCompleted / data.stats.weeklyGoalTarget) * 100)
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {data.stats.weeklyGoalTarget - data.stats.weeklyGoalCompleted > 0
                      ? `${data.stats.weeklyGoalTarget - data.stats.weeklyGoalCompleted} questions remaining to hit this week's target.`
                      : "Weekly target accomplished! Keep the momentum."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Recent Practice Sets List */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#12365A]">Recent Practice Sets</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Review solutions and re-practice previous drills.</p>
                </div>
                <Badge variant="neutral" size="sm">
                  {data.recentActivities.length} Sessions
                </Badge>
              </div>

              {data.recentActivities.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {data.recentActivities.map((act) => (
                    <div
                      key={act.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase"
                            style={{
                              backgroundColor: `${act.subjectColor || '#00A8F0'}15`,
                              color: act.subjectColor || '#00A8F0',
                            }}
                          >
                            {act.subject}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400 capitalize">
                            {act.mode} mode
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#12365A]">{act.title}</h4>
                        <p className="text-[11px] text-slate-500 font-mono">{act.completedAt}</p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-emerald-600 block">
                            {act.accuracyPercent}% Accuracy
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {act.questionCount} Questions
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            if (onToast) onToast(`Reviewing solutions for "${act.title}"`);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[#12365A] text-xs font-medium transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <span className="material-symbols-outlined text-3xl text-slate-400 mb-1">history</span>
                  <p className="text-xs text-slate-600 font-medium">No previous practice sessions recorded.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Your completed drills and scores will show up here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Practice Configuration Modal / Dialog */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden space-y-6 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00A8F0]/10 text-[#00A8F0] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">tune</span>
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#12365A]">
                    Configure Practice Set
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize your questions, difficulty, and pace
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Subject Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#12365A] mb-1.5">
                  Subject
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Physics', 'Chemistry', 'Mathematics'].map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setConfigSubject(sub)}
                      className={`py-2 px-3 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
                        configSubject === sub
                          ? 'border-[#00A8F0] bg-[#00A8F0]/10 text-[#00A8F0] font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#12365A] mb-1.5">
                  Select Specific Topic (Optional)
                </label>
                <select
                  value={configTopicId}
                  onChange={(e) => setConfigTopicId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-[#00A8F0]"
                >
                  <option value="">All Topics in {configSubject} (Comprehensive)</option>
                  {data?.topics
                    .filter((t) => t.subject.toLowerCase() === configSubject.toLowerCase())
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.chapterTitle}: {t.topicTitle} ({t.questionCount} Qs)
                      </option>
                    ))}
                </select>
              </div>

              {/* Difficulty Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#12365A] mb-1.5">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'easy', label: 'Easy', color: 'emerald' },
                    { id: 'medium', label: 'Medium', color: 'blue' },
                    { id: 'hard', label: 'Hard', color: 'amber' },
                    { id: 'mixed', label: 'Adaptive', color: 'purple' },
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setConfigDifficulty(diff.id as PracticeDifficulty)}
                      className={`py-2 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer capitalize ${
                        configDifficulty === diff.id
                          ? 'border-[#12365A] bg-[#12365A] text-white font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#12365A] mb-1.5">
                  Number of Questions
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 20, 30].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setConfigQuestionCount(count)}
                      className={`py-2 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer ${
                        configQuestionCount === count
                          ? 'border-[#00A8F0] bg-[#00A8F0] text-white font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Timing & Feedback Mode */}
              <div>
                <label className="block text-xs font-semibold text-[#12365A] mb-1.5">
                  Practice Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConfigIsTimed(true)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                      configIsTimed
                        ? 'border-[#00A8F0] bg-[#00A8F0]/5 text-[#12365A]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">timer</span>
                      <span>Timed Exam Pace</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Countdown timer enabled. Solutions revealed at the end.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfigIsTimed(false)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                      !configIsTimed
                        ? 'border-[#00A8F0] bg-[#00A8F0]/5 text-[#12365A]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">psychology</span>
                      <span>Untimed Learning</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Stepwise hints and instant solutions after each problem.
                    </p>
                  </button>
                </div>
              </div>

              {/* Summary Pill */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 flex items-center justify-between">
                <span>Estimated Duration:</span>
                <span className="font-mono font-bold text-[#12365A]">
                  ~{Math.round(configQuestionCount * 2.2)} Minutes ({configDifficulty} tier)
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isStartingSession}
                onClick={handleConfirmStartPractice}
                className="px-5 py-2.5 rounded-xl bg-[#00A8F0] hover:bg-[#0096D6] disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                {isStartingSession ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Question Set...</span>
                  </>
                ) : (
                  <>
                    <span>Start Practice Session</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Active Session Interactive Player / Result Modal */}
      {simulatedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Player Header */}
            <div className="bg-[#12365A] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold block">
                  Practice Session in Progress
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                  {simulatedSession.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-xs font-mono bg-white/10 px-2.5 py-1 rounded-md text-amber-300">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  18:45
                </span>
                <button
                  onClick={() => setSimulatedSession(null)}
                  className="text-white/70 hover:text-white p-1"
                  aria-label="Pause and exit practice modal"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            {/* Question Navigation Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs font-semibold text-slate-600 shrink-0">
                Question {activeQuestionIndex + 1} of {simulatedSession.totalQuestions}
              </span>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: Math.min(10, simulatedSession.totalQuestions) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveQuestionIndex(idx);
                      setSelectedOption(null);
                    }}
                    className={`w-6 h-6 rounded-md text-[11px] font-mono font-medium flex items-center justify-center transition-colors cursor-pointer ${
                      activeQuestionIndex === idx
                        ? 'bg-[#00A8F0] text-white font-bold'
                        : idx < (simulatedSession.completedQuestions || 0)
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Single Choice Problem (+4 / -1)</span>
                <span className="capitalize text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  Difficulty: {simulatedSession.difficulty}
                </span>
              </div>

              {/* Sample author question based on subject */}
              <div className="text-sm text-[#12365A] font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p>
                  Consider a circuit network where three symmetrical resistors of resistance{' '}
                  <span className="font-mono font-bold">R</span> are connected between nodes A, B, and C in a delta configuration. If an additional resistor{' '}
                  <span className="font-mono font-bold">2R</span> is connected across nodes A and B, determine the equivalent resistance between terminals A and C.
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {[
                  'R_eq = (5/7) R',
                  'R_eq = (3/4) R',
                  'R_eq = (7/9) R',
                  'R_eq = (2/3) R',
                ].map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => setSelectedOption(oIdx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center gap-3 cursor-pointer ${
                      selectedOption === oIdx
                        ? 'border-[#00A8F0] bg-[#00A8F0]/10 text-[#0089C4] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold font-sans ${
                        selectedOption === oIdx
                          ? 'bg-[#00A8F0] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Player Footer Actions */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                disabled={activeQuestionIndex === 0}
                onClick={() => {
                  setActiveQuestionIndex((prev) => Math.max(0, prev - 1));
                  setSelectedOption(null);
                }}
                className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white disabled:opacity-30 cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onToast) onToast('Question marked for review.');
                  }}
                  className="px-3 py-2 rounded-lg border border-amber-200 text-amber-700 bg-amber-50 text-xs font-medium hover:bg-amber-100 cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">flag</span>
                  <span>Mark</span>
                </button>

                {activeQuestionIndex < simulatedSession.totalQuestions - 1 ? (
                  <button
                    onClick={() => {
                      setActiveQuestionIndex((prev) => prev + 1);
                      setSelectedOption(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Save &amp; Next
                  </button>
                ) : (
                  <button
                    disabled={isSubmittingSimulatedSession}
                    onClick={handleCompleteSimulatedSession}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    {isSubmittingSimulatedSession ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Submit Practice</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPracticeHomeScreen;
