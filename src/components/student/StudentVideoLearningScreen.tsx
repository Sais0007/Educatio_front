import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  CourseLesson,
  CourseModule,
  StudentEnrolledCourse,
} from '../../types/student';
import { studentService } from '../../services/studentService';
import { Breadcrumb } from '../common/Breadcrumb';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';

interface StudentVideoLearningScreenProps {
  courseId: string;
  lessonId: string;
  scenario?: 'active' | 'new';
  onBackToCourses: () => void;
  onBackToCourseOverview: () => void;
  onBackToLessonList: () => void;
  onNavigateLesson: (nextLessonId: string) => void;
  onNavigateSection?: (section: any) => void;
  onToast?: (message: string) => void;
}

export const StudentVideoLearningScreen: React.FC<StudentVideoLearningScreenProps> = ({
  courseId,
  lessonId,
  scenario = 'active',
  onBackToCourses,
  onBackToCourseOverview,
  onBackToLessonList,
  onNavigateLesson,
  onToast,
}) => {
  // Lesson payload
  const [data, setData] = useState<{
    course: StudentEnrolledCourse;
    module: CourseModule;
    lesson: CourseLesson;
    previousLesson: CourseLesson | null;
    nextLesson: CourseLesson | null;
    allLessonsInModule: CourseLesson[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1920); // Default 32 mins in seconds
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [resumePrompt, setResumePrompt] = useState<{ show: boolean; time: number } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showSideQueue, setShowSideQueue] = useState<boolean>(true);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const fetchLesson = async () => {
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    try {
      const res = await studentService.getLessonDetails(courseId, lessonId, {
        scenario,
        simulateDelayMs: 300,
      });

      if (!res) {
        setError('This lesson is currently unavailable or outside your authenticated enrollment.');
      } else {
        setData(res);
        const totalSecs = res.lesson.durationSeconds || 1920;
        setDuration(totalSecs);

        const initialWatched = res.lesson.lastWatchedSeconds || 0;
        const alreadyDone =
          res.lesson.status === 'COMPLETED' || (res.lesson.progressPercent || 0) >= 100;

        setIsCompleted(alreadyDone);

        // Resume experience: if user watched > 15s and not completed, prompt or restore
        if (initialWatched > 15 && !alreadyDone) {
          setResumePrompt({ show: true, time: initialWatched });
          setCurrentTime(initialWatched);
        } else {
          setResumePrompt(null);
          setCurrentTime(0);
        }
      }
    } catch (_err) {
      setError("We couldn't load this video. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [courseId, lessonId, scenario]);

  // Video playback ticker simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + playbackSpeed;
          if (next >= duration) {
            setIsPlaying(false);
            handleMarkCompleted();
            return duration;
          }
          // Periodic progress sync to backend every 10 seconds
          if (Math.floor(next) % 10 === 0 && data) {
            studentService.updateLessonProgress(
              courseId,
              lessonId,
              Math.floor(next),
              duration,
              false
            );
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, duration, data]);

  // Keyboard accessibility: Space to toggle play/pause, M to mute, F for fullscreen, Left/Right seek
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-10);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, duration]);

  const togglePlayPause = () => {
    if (resumePrompt?.show) {
      setResumePrompt(null);
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const seekRelative = (deltaSeconds: number) => {
    setCurrentTime((prev) => {
      const next = Math.max(0, Math.min(duration, prev + deltaSeconds));
      if (data) {
        studentService.updateLessonProgress(courseId, lessonId, Math.floor(next), duration, isCompleted);
      }
      return next;
    });
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (resumePrompt?.show) setResumePrompt(null);
    if (data) {
      studentService.updateLessonProgress(courseId, lessonId, Math.floor(newTime), duration, isCompleted);
    }
  };

  const handleMarkCompleted = async () => {
    setIsCompleted(true);
    if (data) {
      await studentService.updateLessonProgress(courseId, lessonId, duration, duration, true);
      if (onToast) {
        onToast(`✓ Lesson ${data.lesson.lessonNumber} completed!`);
      }
    }
  };

  const progressPercent = useMemo(() => {
    if (!duration || duration <= 0) return 0;
    return Math.min(100, Math.round((currentTime / duration) * 100));
  }, [currentTime, duration]);

  // ========================================================
  // 1. LOADING SKELETON
  // ========================================================
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-64 mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-32" />
          <div className="h-8 bg-slate-200 rounded w-1/2" />
        </div>
        <div className="aspect-video bg-slate-800 rounded-2xl w-full" />
        <div className="h-16 bg-white rounded-xl border border-[#E2E8F0]" />
      </div>
    );
  }

  // ========================================================
  // 2. ERROR / RESTRICTED STATE
  // ========================================================
  if (error || !data) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
          <span className="material-symbols-outlined text-[32px]">videocam_off</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#12365A] mb-2">
          {error?.includes('unavailable') ? 'Lesson Unavailable' : "We Couldn't Load This Video"}
        </h2>
        <p className="text-sm text-[#64748B] max-w-md mx-auto mb-6">
          {error || 'This video could not be initialized from the learning stream.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToLessonList}
            className="px-5 py-2.5 rounded-lg bg-[#12365A] hover:bg-[#0E2C4A] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Lessons</span>
          </button>
          {!error?.includes('unavailable') && (
            <button
              type="button"
              onClick={fetchLesson}
              className="px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const { course, module, lesson, previousLesson, nextLesson, allLessonsInModule } = data;
  const isNextLocked = nextLesson?.isLocked || nextLesson?.status === 'LOCKED';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* ======================================================== */}
      {/* 1. BREADCRUMB: My Courses / Course / Module / Lesson      */}
      {/* ======================================================== */}
      <Breadcrumb
        items={[
          { label: 'My Courses', onClick: onBackToCourses },
          { label: course.title, onClick: onBackToCourseOverview },
          { label: module.title, onClick: onBackToLessonList },
          { label: `Lesson ${lesson.lessonNumber}`, isCurrent: true },
        ]}
      />

      {/* ======================================================== */}
      {/* 2. HEADER / CONTEXT (Clean & Focused)                     */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]">
              {course.subject}
            </span>
            <span className="text-xs text-[#64748B] font-medium">
              {module.title} · Lesson {lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : lesson.lessonNumber}
            </span>
            {isCompleted ? (
              <Badge variant="green" size="sm" icon="check_circle">
                Completed
              </Badge>
            ) : (
              <Badge variant="blue" size="sm" icon="play_arrow">
                In Progress ({progressPercent}%)
              </Badge>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#12365A] tracking-tight">
            {lesson.title}
          </h1>
        </div>

        {/* Action to switch side queue or view list */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBackToLessonList}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#12365A] hover:text-[#00A8F0] border border-[#E2E8F0] text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">list</span>
            <span>Lesson List</span>
          </button>
          <button
            type="button"
            onClick={() => setShowSideQueue(!showSideQueue)}
            className="hidden lg:inline-flex px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#12365A] border border-[#E2E8F0] text-xs font-semibold shadow-xs transition-colors items-center gap-1.5 cursor-pointer"
            aria-label="Toggle lesson playlist"
          >
            <span className="material-symbols-outlined text-[16px]">
              {showSideQueue ? 'view_sidebar' : 'menu'}
            </span>
            <span>{showSideQueue ? 'Hide Queue' : 'Show Queue'}</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. RESUME NOTIFICATION CALLOUT (Lightweight & Unobtrusive) */}
      {/* ======================================================== */}
      {resumePrompt?.show && (
        <aside
          aria-label="Playback resume prompt"
          className="bg-[#E0F4FD] border border-[#BAE6FD] p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs text-[#12365A] animate-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#00A8F0]">history</span>
            <span>
              Welcome back! You previously stopped at{' '}
              <strong className="text-[#00A8F0] font-bold">{formatTime(resumePrompt.time)}</strong>.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setCurrentTime(resumePrompt.time);
                setResumePrompt(null);
                setIsPlaying(true);
              }}
              className="px-3 py-1 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white font-semibold shadow-xs cursor-pointer"
            >
              Resume from {formatTime(resumePrompt.time)}
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentTime(0);
                setResumePrompt(null);
                setIsPlaying(true);
              }}
              className="px-2.5 py-1 rounded-lg text-[#64748B] hover:text-[#12365A] font-medium hover:bg-white/60 cursor-pointer"
            >
              Start from Beginning
            </button>
          </div>
        </aside>
      )}

      {/* ======================================================== */}
      {/* 4. MAIN LEARNING CANVAS: VIDEO PLAYER & OPTIONAL QUEUE    */}
      {/* ======================================================== */}
      <div className={`grid grid-cols-1 ${showSideQueue ? 'lg:grid-cols-4' : ''} gap-6 items-start`}>
        {/* ====================================================== */}
        {/* PRIMARY COLUMN: VIDEO PLAYER (Visually Dominates Page) */}
        {/* ====================================================== */}
        <div className={showSideQueue ? 'lg:col-span-3 space-y-6' : 'w-full space-y-6'}>
          {/* Custom Interactive Player Surface */}
          <div
            ref={playerContainerRef}
            className="w-full aspect-video bg-[#0B192C] rounded-2xl overflow-hidden shadow-2xl relative group flex flex-col justify-between select-none"
          >
            {/* Visual Stream Canvas (Mocked Interactive Visualizer) */}
            <div
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gradient-to-t from-[#0B192C]/90 via-transparent to-black/30"
            >
              {/* Center Play/Pause Indicator (Overlay) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className={`w-20 h-20 rounded-full bg-[#00A8F0]/90 hover:bg-[#00A8F0] text-white flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer ${
                  isPlaying ? 'opacity-0 group-hover:opacity-100 scale-95 hover:scale-105' : 'opacity-100 scale-100'
                }`}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <span className="material-symbols-outlined text-[44px] ml-1">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            {/* Top Player Badges (HD Quality & Module Watermark) */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between text-white/80 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 backdrop-blur-sm border border-white/15">
                  1080p HD
                </span>
                <span className="text-xs font-medium text-white/90 drop-shadow">
                  {lesson.title}
                </span>
              </div>
              <span className="text-xs text-white/60 drop-shadow hidden sm:inline">
                {course.batchName}
              </span>
            </div>

            {/* Bottom Controls Bar (High-precision scrubber & actions) */}
            <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-2">
              {/* Scrubber / Progress Bar Slider */}
              <div className="relative flex items-center group/scrubber cursor-pointer">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleScrubberChange}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00A8F0] focus:outline-none focus:ring-1 focus:ring-[#00A8F0]"
                  aria-label="Video playback progress"
                />
              </div>

              {/* Lower Controls Row */}
              <div className="flex items-center justify-between text-white text-xs">
                {/* Left Controls: Play, Seek, Volume, Time */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Play/Pause */}
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="hover:text-[#00A8F0] transition-colors p-1 cursor-pointer focus:outline-none"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  {/* 10s Replay / Forward */}
                  <button
                    type="button"
                    onClick={() => seekRelative(-10)}
                    className="hover:text-[#00A8F0] transition-colors p-1 cursor-pointer hidden sm:inline-flex"
                    aria-label="Rewind 10 seconds"
                    title="Rewind 10s (Left Arrow)"
                  >
                    <span className="material-symbols-outlined text-[20px]">replay_10</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => seekRelative(10)}
                    className="hover:text-[#00A8F0] transition-colors p-1 cursor-pointer hidden sm:inline-flex"
                    aria-label="Forward 10 seconds"
                    title="Forward 10s (Right Arrow)"
                  >
                    <span className="material-symbols-outlined text-[20px]">forward_10</span>
                  </button>

                  {/* Volume / Mute */}
                  <div className="flex items-center gap-1.5 group/volume">
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="hover:text-[#00A8F0] transition-colors p-1 cursor-pointer"
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                      title="Mute/Unmute (M)"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isMuted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                      </span>
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00A8F0] hidden sm:inline"
                      aria-label="Volume slider"
                    />
                  </div>

                  {/* Time Readout: Current / Duration */}
                  <span className="font-mono text-[11px] text-white/80 tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right Controls: Speed, Complete Action, Fullscreen */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Playback Speed Control */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="px-2 py-1 rounded hover:bg-white/10 text-[11px] font-semibold text-white/90 hover:text-white transition-colors cursor-pointer"
                      aria-label="Playback speed"
                    >
                      {playbackSpeed}x
                    </button>
                    {showSpeedMenu && (
                      <div className="absolute bottom-8 right-0 bg-[#12365A] border border-slate-700/60 rounded-lg shadow-xl p-1 z-30 flex flex-col gap-0.5">
                        {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => {
                              setPlaybackSpeed(spd);
                              setShowSpeedMenu(false);
                            }}
                            className={`px-3 py-1 text-[11px] rounded text-left transition-colors cursor-pointer ${
                              playbackSpeed === spd
                                ? 'bg-[#00A8F0] text-white font-bold'
                                : 'text-white/80 hover:bg-white/10'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Manual Mark Complete Shortcut */}
                  {!isCompleted ? (
                    <button
                      type="button"
                      onClick={handleMarkCompleted}
                      className="hidden sm:inline-flex px-2.5 py-1 rounded bg-[#35C978]/20 hover:bg-[#35C978]/30 text-[#35C978] border border-[#35C978]/40 text-[11px] font-semibold transition-colors items-center gap-1 cursor-pointer"
                      title="Mark as completed"
                    >
                      <span className="material-symbols-outlined text-[14px]">check</span>
                      <span>Mark Complete</span>
                    </button>
                  ) : (
                    <span className="hidden sm:inline-flex text-[11px] text-[#35C978] font-bold items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      <span>Done</span>
                    </span>
                  )}

                  {/* Fullscreen */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="hover:text-[#00A8F0] transition-colors p-1 cursor-pointer"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    title="Fullscreen (F)"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 5. VIDEO PROGRESS & COMPLETION STATUS BAR                 */}
          {/* ======================================================== */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-card space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#12365A] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">
                  play_circle
                </span>
                Lesson Progress
              </span>
              <span className="text-[#64748B]">
                <strong className="text-[#12365A] font-bold">{progressPercent}%</strong> Completed
                ({formatTime(currentTime)} of {formatTime(duration)})
              </span>
            </div>
            <ProgressBar
              value={progressPercent}
              color={isCompleted ? 'green' : 'blue'}
              height="sm"
              showPercent={false}
            />
          </div>

          {/* ======================================================== */}
          {/* 6. SEQUENTIAL NAVIGATION: PREVIOUS / LIST / NEXT          */}
          {/* ======================================================== */}
          <nav
            aria-label="Lesson navigation"
            className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            {/* Previous Lesson Button */}
            <button
              type="button"
              disabled={!previousLesson}
              onClick={() => previousLesson && onNavigateLesson(previousLesson.id)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                previousLesson
                  ? 'bg-white hover:bg-[#F8FAFC] text-[#12365A] border border-[#E2E8F0] shadow-xs'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="truncate max-w-[180px]">
                {previousLesson ? `Prev: Lesson ${previousLesson.lessonNumber}` : 'First Lesson'}
              </span>
            </button>

            {/* Middle: Back to Lesson List */}
            <button
              type="button"
              onClick={onBackToLessonList}
              className="px-4 py-2 text-xs font-semibold text-[#00A8F0] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>All Lessons in Course</span>
            </button>

            {/* Next Lesson Button */}
            {nextLesson ? (
              <button
                type="button"
                disabled={isNextLocked}
                onClick={() => !isNextLocked && onNavigateLesson(nextLesson.id)}
                title={isNextLocked ? nextLesson.unlockReason || 'Lesson is locked' : undefined}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer ${
                  isNextLocked
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-70'
                    : 'bg-[#00A8F0] hover:bg-[#0092D1] text-white shadow-card'
                }`}
              >
                <span className="truncate max-w-[180px]">
                  {isNextLocked
                    ? `Next Locked: Lesson ${nextLesson.lessonNumber}`
                    : `Next: Lesson ${nextLesson.lessonNumber}`}
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  {isNextLocked ? 'lock' : 'arrow_forward'}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToCourseOverview}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#35C978] hover:bg-[#2EB86B] text-white text-xs font-semibold shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Course Completed · Overview</span>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </button>
            )}
          </nav>

          {/* ======================================================== */}
          {/* 7. LESSON INFORMATION & ACADEMIC DESCRIPTION              */}
          {/* ======================================================== */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#12365A]">
              About This Lesson
            </h2>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {lesson.description ||
                `In this lesson, you will master ${lesson.title} as part of ${module.title}. Topics cover advanced formula derivations, conceptual proofs, and step-by-step problem calibrations for competitive examination success.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0] text-xs">
              <div className="space-y-0.5">
                <span className="text-[#64748B]">Curriculum Track:</span>
                <p className="font-semibold text-[#12365A]">{course.title}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[#64748B]">Lead Faculty:</span>
                <p className="font-semibold text-[#12365A]">{course.facultyName}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[#64748B]">Batch Affiliation:</span>
                <p className="font-semibold text-[#12365A]">{course.batchName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* SECONDARY COLUMN (Desktop Queue): MODULE PLAYLIST       */}
        {/* ====================================================== */}
        {showSideQueue && (
          <aside
            aria-label="Module playlist"
            className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-card space-y-3 sticky top-24 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div>
                <h3 className="font-serif text-sm font-bold text-[#12365A]">
                  {module.title}
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  {allLessonsInModule.length} Lessons in this Module
                </p>
              </div>
            </div>

            {/* Lesson Queue List */}
            <div className="space-y-1.5" role="list">
              {allLessonsInModule.map((l) => {
                const isCurrent = l.id === lesson.id;
                const isLck = l.isLocked || l.status === 'LOCKED';
                const isDone = l.status === 'COMPLETED';

                return (
                  <button
                    key={l.id}
                    type="button"
                    disabled={isLck}
                    onClick={() => onNavigateLesson(l.id)}
                    className={`w-full p-2.5 rounded-lg text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#E0F4FD] border border-[#BAE6FD] text-[#00A8F0] font-semibold shadow-xs'
                        : isLck
                        ? 'opacity-60 bg-slate-50 text-slate-400 cursor-not-allowed'
                        : 'hover:bg-[#F8FAFC] text-[#12365A]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${
                        isDone
                          ? 'text-[#35C978]'
                          : isCurrent
                          ? 'text-[#00A8F0]'
                          : isLck
                          ? 'text-slate-400'
                          : 'text-[#64748B]'
                      }`}
                    >
                      {isDone ? 'check_circle' : isCurrent ? 'play_arrow' : isLck ? 'lock' : 'play_circle'}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs truncate">
                        {l.lessonNumber}. {l.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-[#64748B] mt-0.5">
                        <span>{l.duration}</span>
                        {isDone && <span className="text-[#35C978] font-medium">Completed</span>}
                        {isCurrent && <span className="text-[#00A8F0] font-bold">Now Playing</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default StudentVideoLearningScreen;
