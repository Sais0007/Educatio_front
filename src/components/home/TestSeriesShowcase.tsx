import React from 'react';

interface TestSeriesShowcaseProps {
  onExploreTestSeries: () => void;
  onTrySampleMock: () => void;
}

export const TestSeriesShowcase: React.FC<TestSeriesShowcaseProps> = ({
  onExploreTestSeries,
  onTrySampleMock,
}) => {
  return (
    <section id="test-series-section" className="w-full bg-surface-container py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-12 shadow-card border border-outline-variant/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Narrative & Key Features */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary text-[11px] font-semibold uppercase tracking-wider w-fit border border-primary/20">
                <span className="material-symbols-outlined text-[16px]">shield_with_heart</span>
                Simulated Exam Infrastructure
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight leading-tight font-normal">
                Aura National Proctored Mock Series (2026–2027)
              </h2>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                Preparation without calibrated testing is an illusion. We replicate the exact NTA and IIT-JEE Computer-Based Test (CBT) engine down to keyboard shortcut constraints, formula popups, and high-pressure pacing timers.
              </p>

              {/* Blueprint-Governed Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 my-2">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="font-serif text-2xl sm:text-3xl text-primary font-medium">14</div>
                  <div className="text-xs font-semibold text-on-surface mt-1">Full Mocks</div>
                  <div className="text-[11px] text-outline">Identical 3-hour blueprints</div>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="font-serif text-2xl sm:text-3xl text-secondary font-medium">28</div>
                  <div className="text-xs font-semibold text-on-surface mt-1">Sectionals</div>
                  <div className="text-[11px] text-outline">Targeted chapter stress-tests</div>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="font-serif text-2xl sm:text-3xl text-tertiary font-medium">42</div>
                  <div className="text-xs font-semibold text-on-surface mt-1">Topic Sprints</div>
                  <div className="text-[11px] text-outline">High-density weak spots</div>
                </div>
              </div>

              {/* Rigorous Features List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                    wifi_off
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-on-surface">Offline Sync Resilience: </span>
                    <span className="text-xs text-on-surface-variant">
                      Local browser state caching preserves responses through unexpected power cuts or network flickers.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                    speed
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-on-surface">Second-by-Second Pacing Telemetry: </span>
                    <span className="text-xs text-on-surface-variant">
                      Track question dwell time to isolate cognitive stalls and panic guesses under time constraints.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                    query_stats
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-on-surface">Gaussian Percentile Calibration: </span>
                    <span className="text-xs text-on-surface-variant">
                      Rankings computed against authenticated cohorts under identical timed constraints without score inflation.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={onExploreTestSeries}
                  className="px-6 py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-sm transition-all duration-150"
                >
                  Explore Test Series Packages →
                </button>
                <button
                  type="button"
                  onClick={onTrySampleMock}
                  className="px-6 py-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold border border-outline-variant/40 transition-all duration-150"
                >
                  Try Free Sample Proctored Mock
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Paper Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/30 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse" />
                    <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">
                      Simulated Exam Arena
                    </span>
                  </div>
                  <span className="text-xs font-mono text-outline">CODE: ADV-2026-M4</span>
                </div>

                <div className="bg-surface-container-lowest rounded-lg p-5 mb-4 shadow-xs border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary">
                      PAPER 01 · FULL SYLLABUS
                    </span>
                    <span className="text-[11px] font-semibold text-secondary bg-surface-container px-2 py-0.5 rounded">
                      180 MINS
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-on-surface mb-2 font-medium">
                    JEE Advanced Full Mock 04
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center py-2 bg-surface-bright rounded text-outline text-[11px] mb-4">
                    <div>54 Questions</div>
                    <div>360 Marks</div>
                    <div>SCQ / MCQ / INT</div>
                  </div>

                  {/* Telemetry Mock Graphic */}
                  <div className="p-3 bg-surface-container-low rounded text-on-surface-variant text-xs space-y-2 border border-outline-variant/20">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-outline">Physics Sectional Progress</span>
                      <span className="font-semibold text-primary">14 / 18 Solved</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '78%' }} />
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-outline pt-1 font-mono">
                      <span>Avg dwell: 2m 14s / Q</span>
                      <span className="text-academic-mastered font-medium">Accuracy: 88%</span>
                    </div>
                  </div>
                </div>

                {/* Post-Test Autopsy Preview Snippet */}
                <div className="p-4 bg-surface-container-lowest rounded-lg flex items-center justify-between text-xs border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      analytics
                    </span>
                    <span className="text-on-surface font-semibold">Instant Diagnostic Autopsy</span>
                  </div>
                  <span className="text-[11px] text-primary uppercase font-bold">
                    Available 0s after submit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
