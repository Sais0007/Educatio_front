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
    <section id="how-it-works" className="w-full bg-[#eff4ff]/60 py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-y border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0369a1] text-xs font-bold uppercase tracking-widest border border-[#cde5ff] shadow-xs">
            <span>How It Works</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0b1c30] tracking-tight leading-[1.12] font-normal">
            Your Path from Guest to Enrolled Student
          </h2>
          <p className="text-base sm:text-lg text-[#40474f] leading-relaxed font-sans max-w-2xl mx-auto">
            A simple, transparent transition. Connect your account with your Institute and Branch to unlock your courses and begin your preparation.
          </p>

          {/* Visual Architecture Pathway */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#0369a1]">
            <span className="bg-white px-3 py-1 rounded-md border border-[#cde5ff] shadow-xs">Guest</span>
            <span className="text-[#64748b]">&rarr;</span>
            <span className="bg-white px-3 py-1 rounded-md border border-[#cde5ff] shadow-xs">Account</span>
            <span className="text-[#64748b]">&rarr;</span>
            <span className="bg-white px-3 py-1 rounded-md border border-[#cde5ff] shadow-xs">Institute / Branch</span>
            <span className="text-[#64748b]">&rarr;</span>
            <span className="bg-white px-3 py-1 rounded-md border border-[#cde5ff] shadow-xs">Course</span>
            <span className="text-[#64748b]">&rarr;</span>
            <span className="bg-[#0369a1] text-white px-3 py-1 rounded-md shadow-xs">Student</span>
          </div>
        </div>

        {/* Connected Visual Progression */}
        <div className="relative">
          {/* Connecting track across desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-[#cde5ff] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 relative z-10 text-left">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="flex flex-col justify-between group"
              >
                <div>
                  {/* Step Milestone Anchor */}
                  <div className="flex items-center justify-between lg:justify-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#0369a1] shadow-card group-hover:bg-[#0369a1] group-hover:text-white text-[#0369a1] flex items-center justify-center transition-all duration-200 shrink-0">
                      <span className="font-serif text-2xl font-bold">
                        {step.num}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white border border-[#cde5ff] flex items-center justify-center text-[#0369a1]">
                      <span className="material-symbols-outlined text-[20px]">
                        {step.icon}
                      </span>
                    </div>
                  </div>

                  {/* Title & Narrative */}
                  <h3 className="font-serif text-2xl lg:text-[26px] font-normal text-[#0b1c30] group-hover:text-[#0369a1] transition-colors leading-tight mb-1.5">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#0369a1] uppercase tracking-wider mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-sm text-[#40474f] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Transition Indicator */}
                <div className="mt-6 pt-4 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b]">
                  <span className="font-medium">{step.tag}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#0369a1] group-hover:translate-x-1 transition-transform">
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
            className="px-9 py-4 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-base font-semibold shadow-card hover:shadow-elevated transition-all duration-150 inline-flex items-center gap-2.5 group"
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
