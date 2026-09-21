import React from 'react';
import { CANDIDATE_REFLECTIONS } from '../../data/mockData';

export const VerifiedResults: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
              Measurable Outcomes
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
              Authentic Candidate Reflections
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
            Preparation insights modeled from authentic cohort examinations and student progress milestones under proctored testing conditions.
          </p>
        </div>

        {/* 3 Student Reflections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CANDIDATE_REFLECTIONS.map((reflection) => (
            <div
              key={reflection.id}
              className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-xs border border-outline-variant/30 flex flex-col justify-between"
            >
              <p className="text-sm text-on-surface leading-relaxed mb-8 font-serif italic">
                &ldquo;{reflection.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
                <div>
                  <div className="text-xs font-semibold text-on-surface">
                    {reflection.author}
                  </div>
                  <div className="text-[11px] text-outline">
                    {reflection.cohort}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container text-primary text-[10px] font-semibold">
                  {reflection.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
