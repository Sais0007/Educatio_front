import React, { useState } from 'react';

export const MockTestExperiencePreview: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'physics' | 'chemistry' | 'math'>('physics');
  const [activeQuestion, setActiveQuestion] = useState<number>(4);
  const [selectedOption, setSelectedOption] = useState<string | null>('B');

  const questionStatuses: Record<number, 'answered' | 'not_answered' | 'review' | 'not_visited'> = {
    1: 'answered',
    2: 'answered',
    3: 'answered',
    4: 'answered',
    5: 'not_answered',
    6: 'review',
    7: 'answered',
    8: 'answered',
    9: 'answered',
    10: 'review',
    11: 'not_visited',
    12: 'not_visited',
    13: 'not_visited',
    14: 'not_visited',
    15: 'not_visited',
    16: 'not_visited',
    17: 'not_visited',
    18: 'not_visited',
  };

  const getStatusClass = (status: 'answered' | 'not_answered' | 'review' | 'not_visited') => {
    switch (status) {
      case 'answered':
        return 'bg-academic-mastered text-white font-bold';
      case 'not_answered':
        return 'bg-error text-white font-bold';
      case 'review':
        return 'bg-tertiary text-white font-bold';
      default:
        return 'bg-surface-bright text-outline border border-outline-variant/40';
    }
  };

  return (
    <section id="mock-test-section" className="w-full bg-surface-container py-20 px-4 sm:px-6 lg:px-12 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[11px] font-bold text-error uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              Real CBT Simulation Engine
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
              Experience the Exam Before Exam Day
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md leading-relaxed font-sans">
            Our assessment engine replicates the official NTA and IIT-JEE Computer-Based Test console down to keyboard navigation rules, palette status markers, and server-locked submission safeguards.
          </p>
        </div>

        {/* Realistic CBT Examination Console Interface */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-elevated border border-outline-variant/40 overflow-hidden">
          {/* Exam Console Top Bar */}
          <div className="bg-inverse-surface text-inverse-on-surface px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-bold text-[10px]">
                NTA/IIT CBT CONSOLE
              </span>
              <span className="font-semibold text-white">JEE Advanced 2026 · Paper 01 (Full Syllabus)</span>
            </div>

            {/* Candidate & Timer */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-inverse-on-surface/80">
                <span className="material-symbols-outlined text-[16px]">person</span>
                <span>Candidate: Rahul S. (#2026-ADV-10492)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-black/40 border border-white/20 text-white font-bold">
                <span className="material-symbols-outlined text-secondary-container text-[16px]">timer</span>
                <span>02 : 44 : 18</span>
              </div>
            </div>
          </div>

          {/* Section Tabs Bar */}
          <div className="bg-surface-container-low px-6 py-2.5 border-b border-outline-variant/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-outline uppercase text-[10px] mr-2">Sections:</span>
              <button
                type="button"
                onClick={() => setSelectedSection('physics')}
                className={`px-3 py-1.5 rounded font-bold transition-colors ${
                  selectedSection === 'physics'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Physics (18 Q)
              </button>
              <button
                type="button"
                onClick={() => setSelectedSection('chemistry')}
                className={`px-3 py-1.5 rounded font-bold transition-colors ${
                  selectedSection === 'chemistry'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Chemistry (18 Q)
              </button>
              <button
                type="button"
                onClick={() => setSelectedSection('math')}
                className={`px-3 py-1.5 rounded font-bold transition-colors ${
                  selectedSection === 'math'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Mathematics (18 Q)
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-outline">
              <span>Marking: <strong className="text-academic-mastered">+4</strong> / <strong className="text-error">-1</strong></span>
            </div>
          </div>

          {/* Split Workspace: Question Stem (8 cols) & Palette (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left 8 Columns: Active Examination Question */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between border-r border-outline-variant/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 text-xs">
                  <span className="font-bold text-on-surface text-sm">Question {activeQuestion}</span>
                  <span className="text-[11px] text-outline font-mono">Type: Single Choice Question</span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface font-sans leading-relaxed">
                  A non-conducting spherical shell of radius $R_1$ carries a uniform surface charge density $\sigma$. A point charge $q$ is placed at distance $d$ from the center ($d &gt; R_1$). If an uncharged conducting spherical shell of radius $R_2$ ($R_2 &gt; d$) is placed concentrically with the first shell, find the electrostatic potential at the center:
                </p>

                {/* Question Radio Options */}
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'A', text: 'V = \\frac{1}{4\\pi\\varepsilon_0} \\left( \\frac{q}{d} + \\frac{\\sigma R_1}{\\varepsilon_0} \\right)' },
                    { id: 'B', text: 'V = \\frac{\\sigma R_1}{\\varepsilon_0} + \\frac{q}{4\\pi\\varepsilon_0 d} - \\frac{q}{4\\pi\\varepsilon_0 R_2}', isSelected: true },
                    { id: 'C', text: 'V = \\frac{\\sigma R_1^2}{\\varepsilon_0 R_2} + \\frac{q}{4\\pi\\varepsilon_0 R_2}' },
                    { id: 'D', text: 'V = \\frac{q}{4\\pi\\varepsilon_0 d}' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`p-3 rounded-lg border flex items-center gap-3 text-xs sm:text-sm cursor-pointer transition-colors ${
                        selectedOption === opt.id
                          ? 'bg-surface-container-low border-primary text-primary font-semibold'
                          : 'bg-surface-bright border-outline-variant/30 hover:bg-surface-container/50 text-on-surface'
                      }`}
                    >
                      <input
                        type="radio"
                        name="cbt-option"
                        checked={selectedOption === opt.id}
                        onChange={() => setSelectedOption(opt.id)}
                        className="accent-primary"
                      />
                      <span className="font-bold font-mono">{opt.id}.</span>
                      <span className="font-mono">{opt.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="pt-6 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
                  >
                    Clear Response
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-tertiary-container hover:bg-tertiary text-on-tertiary text-xs font-semibold transition-colors"
                  >
                    Mark for Review &amp; Next
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveQuestion((prev) => (prev < 18 ? prev + 1 : 1))}
                  className="px-5 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-bold shadow-xs transition-colors"
                >
                  Save &amp; Next &rarr;
                </button>
              </div>
            </div>

            {/* Right 4 Columns: Question Navigation Palette */}
            <div className="lg:col-span-4 bg-surface-container-low/40 p-5 sm:p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-bold text-on-surface mb-3 uppercase tracking-wider">
                  Question Palette · Physics
                </div>

                {/* Status Legend Grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-academic-mastered text-white text-[10px] font-bold flex items-center justify-center">10</span>
                    <span className="text-outline">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-error text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <span className="text-outline">Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-tertiary text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <span className="text-outline">Marked Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-surface-bright text-outline text-[10px] font-bold flex items-center justify-center border border-outline-variant/30">4</span>
                    <span className="text-outline">Not Visited</span>
                  </div>
                </div>

                {/* Number Grid 1 to 18 */}
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => {
                    const status = questionStatuses[num] || 'not_visited';
                    const isActive = activeQuestion === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setActiveQuestion(num)}
                        className={`h-8 rounded text-xs font-mono font-bold transition-all ${
                          isActive ? 'ring-2 ring-primary ring-offset-1' : ''
                        } ${getStatusClass(status)}`}
                      >
                        {num < 10 ? `0${num}` : num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Final Exam Button */}
              <div className="pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Submit Examination
                </button>
                <div className="text-[10px] text-center text-outline mt-1.5">
                  Autosaves every 15 seconds · Failover backup active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
