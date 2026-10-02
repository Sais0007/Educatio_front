import React from 'react';

interface HowItWorksProps {
  onStart: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStart }) => {
  const steps = [
    {
      num: '01',
      title: 'Create your Student account',
      subtitle: 'Fast, secure student registration',
      description:
        'Set up your student profile in under two minutes to enter the platform. Safe, private, and no credit card required to begin your onboarding.',
      icon: 'person_add',
      tag: 'Step 1 · Account',
    },
    {
      num: '02',
      title: 'Choose your Institute and Branch',
      subtitle: 'Academic center & cohort mapping',
      description:
        'Select your affiliated Institute and specific physical or digital Branch. Your target examination schedule and academic milestones configure automatically.',
      icon: 'apartment',
      tag: 'Step 2 · Center',
    },
    {
      num: '03',
      title: 'Choose an available Course and begin your preparation',
      subtitle: 'Enrol in your syllabus & study path',
      description:
        'Select your enrolled batch or subject track and enter your preparation sanctuary with synchronized first-principles lectures, focused practice, and CBT mocks.',
      icon: 'school',
      tag: 'Step 3 · Course',
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#F5F8FC] py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#00A8F0] text-xs font-bold uppercase tracking-widest border border-[#BAE6FD] shadow-card">
            <span>How It Works</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#12365A] tracking-tight leading-[1.12] font-bold">
            Your Path from Guest to Enrolled Student
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-sans max-w-2xl mx-auto">
            A simple, transparent transition. Connect your account with your Institute and Branch to unlock your courses and begin your preparation.
          </p>

          {/* Visual Architecture Pathway */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#00A8F0]">
            <span className="bg-white px-3 py-1 rounded-full border border-[#BAE6FD] shadow-card">Guest</span>
            <span className="text-[#64748B]">&rarr;</span>
            <span className="bg-white px-3 py-1 rounded-full border border-[#BAE6FD] shadow-card">Account</span>
            <span className="text-[#64748B]">&rarr;</span>
            <span className="bg-white px-3 py-1 rounded-full border border-[#BAE6FD] shadow-card">Institute / Branch</span>
            <span className="text-[#64748B]">&rarr;</span>
            <span className="bg-white px-3 py-1 rounded-full border border-[#BAE6FD] shadow-card">Course</span>
            <span className="text-[#64748B]">&rarr;</span>
            <span className="bg-[#00A8F0] text-white px-3 py-1 rounded-full shadow-card">Student</span>
          </div>
        </div>

        {/* Connected Visual Progression */}
        <div className="relative">
          {/* Connecting track across desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-[#BAE6FD] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 relative z-10 text-left">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="flex flex-col justify-between group"
              >
                <div>
                  {/* Step Milestone Anchor */}
                  <div className="flex items-center justify-between lg:justify-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-white border-2 border-[#00A8F0] shadow-card group-hover:bg-[#00A8F0] group-hover:text-white text-[#00A8F0] flex items-center justify-center transition-all duration-200 shrink-0">
                      <span className="font-serif text-2xl font-bold">
                        {step.num}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-lg bg-white border border-[#BAE6FD] flex items-center justify-center text-[#00A8F0]">
                      <span className="material-symbols-outlined text-[20px]">
                        {step.icon}
                      </span>
                    </div>
                  </div>

                  {/* Title & Narrative */}
                  <h3 className="font-serif text-2xl lg:text-[26px] font-bold text-[#12365A] group-hover:text-[#00A8F0] transition-colors leading-tight mb-1.5">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#00A8F0] uppercase tracking-wider mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Transition Indicator */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                  <span className="font-semibold">{step.tag}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#00A8F0] group-hover:translate-x-1 transition-transform">
                    {idx === steps.length - 1 ? 'check_circle' : 'east'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered CTA */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onStart}
            className="px-9 py-3.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-base font-semibold shadow-card hover:shadow-dropdown transition-all duration-150 inline-flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Get Started in 2 Minutes</span>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
