import React from 'react';
import { PLATFORM_SCALE_METRICS } from '../../data/mockData';

export const TrustPlatformScale: React.FC = () => {
  return (
    <section id="trust-section" className="w-full bg-surface-container py-16 px-4 sm:px-6 lg:px-12 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {PLATFORM_SCALE_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                  <span className="material-symbols-outlined text-[20px]">{metric.icon}</span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-on-surface">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-on-surface mt-1">
                  {metric.label}
                </div>
              </div>
              <p className="text-[11px] text-outline mt-2 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Academic Governance Note */}
        <div className="p-4 rounded-xl bg-surface-container-lowest/60 border border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-outline">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
            <span>
              Academic Data Integrity Protocol: Server-authoritative scoring &amp; versioned syllabus tracking.
            </span>
          </div>
          <span className="text-[11px] font-mono">Blueprint v2.4 Certified</span>
        </div>
      </div>
    </section>
  );
};
