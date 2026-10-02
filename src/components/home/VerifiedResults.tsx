import React from 'react';
import { CANDIDATE_REFLECTIONS } from '../../data/mockData';

export const VerifiedResults: React.FC = () => {
  const featuredStudent = CANDIDATE_REFLECTIONS[0];
  const otherStudents = CANDIDATE_REFLECTIONS.slice(1);

  return (
    <section id="results" className="w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-left">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-xs font-bold uppercase tracking-widest border border-[#BAE6FD] mb-3">
            <span>Student Success</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#12365A] tracking-tight leading-[1.12] font-bold">
            Verified Progress, Not Inflated Claims
          </h2>
        </div>
        <p className="text-base sm:text-lg text-[#64748B] max-w-md leading-relaxed font-sans">
          Real candidate reflections from authentic cohort examinations. We measure success by diagnostic mark recovery and psychological composure.
        </p>
      </div>

      {/* Human Editorial Layout (Featured Story + Complementary Stories) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Featured Student Spotlight (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-8 sm:p-12 border border-[#E2E8F0] shadow-card flex flex-col justify-between">
          <div>
            {/* Student Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0] mb-8">
              <img
                src={featuredStudent.avatarUrl}
                alt={featuredStudent.author}
                className="w-16 h-16 rounded-xl object-cover border border-[#E2E8F0] shadow-card shrink-0"
              />
              <div>
                <div className="text-lg font-bold text-[#12365A]">
                  {featuredStudent.author}
                </div>
                <div className="text-xs text-[#64748B] font-medium mt-0.5">
                  {featuredStudent.cohort} · <span className="text-[#00A8F0] font-semibold">{featuredStudent.examTarget}</span>
                </div>
              </div>
            </div>

            {/* Verified Improvement Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-sm font-semibold font-mono border border-[#BBF7D0]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>{featuredStudent.recoveredMarks}</span>
              </span>
            </div>

            {/* Pull Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#12365A] font-medium leading-relaxed italic mb-8">
              &ldquo;{featuredStudent.quote}&rdquo;
            </blockquote>
          </div>

          {/* Outcome Meta */}
          <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold">{featuredStudent.badge}</span>
            <span className="font-mono font-bold text-[#00A8F0]">{featuredStudent.metricLabel}</span>
          </div>
        </div>

        {/* Two Complementary Student Stories (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {otherStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl p-7 border border-[#E2E8F0] shadow-card flex-1 flex flex-col justify-between group hover:border-[#00A8F0] transition-colors"
            >
              <div>
                {/* Student Info */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#E2E8F0] mb-4">
                  <img
                    src={student.avatarUrl}
                    alt={student.author}
                    className="w-12 h-12 rounded-lg object-cover border border-[#E2E8F0] shrink-0"
                  />
                  <div>
                    <div className="text-base font-bold text-[#12365A]">
                      {student.author}
                    </div>
                    <div className="text-xs text-[#64748B]">
                      {student.cohort} · <span className="text-[#00A8F0] font-semibold">{student.examTarget}</span>
                    </div>
                  </div>
                </div>

                {/* Verified Tag */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold font-mono border border-[#BBF7D0]">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>{student.recoveredMarks}</span>
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm text-[#64748B] leading-relaxed italic font-serif">
                  &ldquo;{student.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                <span>{student.badge}</span>
                <span className="font-mono font-bold text-[#00A8F0]">{student.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedResults;
