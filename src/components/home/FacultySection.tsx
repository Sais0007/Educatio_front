import React from 'react';
import { FACULTY_MEMBERS } from '../../data/mockData';

export const FacultySection: React.FC = () => {
  return (
    <section id="faculty-section" className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5">
            Academic Pedagogy
          </div>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-on-surface tracking-tight font-normal">
            Senior Academic Faculty &amp; Authors
          </h2>
        </div>
        <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
          Mentors with decades of experience guiding competitive examination ranks through first-principles clarity.
        </p>
      </div>

      {/* 3 Faculty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FACULTY_MEMBERS.map((faculty) => (
          <div
            key={faculty.id}
            className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-start gap-4 shadow-xs hover:border-primary/40 transition-colors"
          >
            <img
              src={faculty.avatarUrl}
              alt={faculty.name}
              className="w-14 h-14 rounded-full object-cover border border-outline-variant/30 shrink-0"
            />
            <div className="min-w-0 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                {faculty.subject}
              </span>
              <h4 className="text-sm font-bold text-on-surface truncate">
                {faculty.name}
              </h4>
              <p className="text-xs text-outline leading-tight">
                {faculty.credentials}
              </p>
              <p className="text-[11px] text-on-surface-variant line-clamp-2 pt-1 leading-relaxed">
                {faculty.keyContributions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
