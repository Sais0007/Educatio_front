import React, { useState } from 'react';

export const LearningExperiencePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'dpp' | 'bookmarks'>('notes');
  const [activeLesson, setActiveLesson] = useState<string>('l-8');

  return (
    <section id="learning-experience-section" className="w-full bg-surface-container-low py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">
              Inside the Student Platform
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
              The Learning Experience · Transparent Course Architecture
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md leading-relaxed font-sans">
            Here is the exact interface students access immediately upon enrolment: unhurried derivation lectures, structured chapter modules, and synchronized daily practice problem sets.
          </p>
        </div>

        {/* Realistic Desktop Course Interface Mockup */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-elevated border border-outline-variant/40 overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-surface-bright px-6 py-3 border-b border-outline-variant/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-outline-variant/60" />
              <span className="w-3 h-3 rounded-full bg-outline-variant/60" />
              <span className="w-3 h-3 rounded-full bg-outline-variant/60" />
              <span className="font-mono text-outline ml-2 hidden sm:inline">
                learn.educationplatform.app/courses/phy-2027/lecture-08
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-semibold text-[11px]">
                JEE Advanced 2027 Track
              </span>
              <span className="text-academic-mastered font-medium text-[11px] hidden sm:inline">
                Syllabus Progress: 78%
              </span>
            </div>
          </div>

          {/* Interface Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Column: Course Modules & Lessons Tree (4 cols) */}
            <div className="lg:col-span-4 bg-surface-container-low/50 border-r border-outline-variant/30 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div>
                  <div className="text-xs font-bold text-on-surface">Curriculum Navigation</div>
                  <div className="text-[11px] text-outline">Physics Mastery · 6 Modules</div>
                </div>
                <span className="text-[10px] font-mono text-primary bg-surface-container px-2 py-0.5 rounded">
                  70 Lectures
                </span>
              </div>

              {/* Module Accordion 1 (Completed) */}
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                <div className="flex items-center justify-between text-xs font-semibold text-on-surface mb-1">
                  <span>Module 01: Kinematics Invariants</span>
                  <span className="text-academic-mastered text-[11px]">100%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1">
                  <div className="bg-academic-mastered h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Module Accordion 2 (Active Module) */}
              <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-primary/30 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                  <span className="text-primary">Module 02: Rotational Dynamics</span>
                  <span className="text-primary text-[11px] font-mono">78%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1 mb-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: '78%' }} />
                </div>

                {/* Lesson List */}
                <div className="space-y-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveLesson('l-7')}
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                      activeLesson === 'l-7'
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[16px] text-academic-mastered">
                        check_circle
                      </span>
                      <span className="truncate">07. Tensor Moments of Inertia</span>
                    </div>
                    <span className="text-[10px] text-outline font-mono">42m</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLesson('l-8')}
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                      activeLesson === 'l-8'
                        ? 'bg-surface-container text-primary font-bold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">
                        play_circle
                      </span>
                      <span className="truncate">08. Pure Rolling &amp; Dynamic Slip</span>
                    </div>
                    <span className="text-[10px] font-mono text-primary">Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLesson('dpp-8')}
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                      activeLesson === 'dpp-8'
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        assignment
                      </span>
                      <span className="truncate">DPP 08: 15 Multi-Step Problems</span>
                    </div>
                    <span className="text-[10px] text-outline font-mono">PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLesson('m-2')}
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                      activeLesson === 'm-2'
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        quiz
                      </span>
                      <span className="truncate">Milestone Test 02 (90 Mins)</span>
                    </div>
                    <span className="text-[10px] text-outline font-mono">Exam</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Lecture Player & Academic Tabs (8 cols) */}
            <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-6">
              {/* Simulated High-Fidelity Video Player Canvas */}
              <div className="w-full aspect-video bg-inverse-surface rounded-xl overflow-hidden relative shadow-card flex flex-col justify-between p-4 sm:p-6 text-white group">
                {/* Chalkboard Derivation Background Graphic */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#12365A] via-[#0f2d4a] to-[#1e293b] opacity-95" />

                {/* Top Video Header */}
                <div className="relative z-10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary text-[10px] font-bold">
                      PRO LECTURE 08
                    </span>
                    <span className="text-white/80 font-mono text-[11px] truncate">
                      Prof. Arvind Verma · Pure Rolling on Concave Tracks
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px]">
                    1080p · 1.25x
                  </span>
                </div>

                {/* Center Mathematical Derivation Display */}
                <div className="relative z-10 max-w-xl mx-auto text-center space-y-3 font-mono">
                  <div className="text-secondary-container text-xs tracking-wider">
                    // EULER KINEMATIC DYNAMICS IN ROTATIONAL AXIS
                  </div>
                  <div className="text-lg sm:text-2xl font-bold tracking-tight text-white font-serif">
                    &tau;<sub>inst</sub> = I<sub>inst</sub> &alpha; = (I<sub>cm</sub> + m R<sup>2</sup>) &alpha;
                  </div>
                  <div className="text-white/60 text-xs font-sans max-w-md mx-auto leading-relaxed">
                    Note: The instantaneous axis of rotation is stationary relative to ground at dt &rarr; 0, meaning dynamic friction work vanishes.
                  </div>
                </div>

                {/* Bottom Video Controls Bar */}
                <div className="relative z-10 space-y-2">
                  <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden cursor-pointer">
                    <div className="bg-secondary-container h-full rounded-full" style={{ width: '64%' }} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-white">pause</span>
                      <span className="font-mono text-[11px]">34:12 / 52:40</span>
                    </div>
                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="hover:text-white cursor-pointer">1.25x Speed</span>
                      <span className="hover:text-white cursor-pointer">Timestamp Notes</span>
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Learning Companion Tabs */}
              <div className="border border-outline-variant/30 rounded-xl p-4 bg-surface-container-low/40">
                <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('notes')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'notes'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    Derivation Notes (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dpp')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'dpp'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    DPP 08 Assignment
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bookmarks')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'bookmarks'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    Classroom Invariant Sync
                  </button>
                </div>

                {activeTab === 'notes' && (
                  <div className="flex items-center justify-between text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">description</span>
                      <span>Hand-annotated derivation manuscript by Prof. Arvind Verma</span>
                    </div>
                    <span className="text-[11px] font-mono text-outline">18 Pages · Verified</span>
                  </div>
                )}

                {activeTab === 'dpp' && (
                  <div className="flex items-center justify-between text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[18px]">task</span>
                      <span>15 Curated Rolling with Slipping Problems with LaTeX proof keys</span>
                    </div>
                    <span className="text-[11px] font-bold text-academic-mastered">Due Next Sunday</span>
                  </div>
                )}

                {activeTab === 'bookmarks' && (
                  <div className="flex items-center justify-between text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">sync</span>
                      <span>Formulas from this lecture synced to your personal Flashcard Deck</span>
                    </div>
                    <span className="text-[11px] text-primary font-semibold">3 Cards Added</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
