import React, { useState } from 'react';

export const FAQAccordion: React.FC = () => {
  const visitorFaqs = [
    {
      id: 'faq-1',
      question: 'How do Courses work on Education Platform?',
      answer:
        'Courses on Education Platform are not generic platform-wide video catalogues. Each Course is created and delivered by an Institute and its specific Branch. To enrol in and participate in a Course, a student selects their affiliated Institute and Branch during onboarding.',
    },
    {
      id: 'faq-2',
      question: 'How does Education Platform differ from traditional coaching apps?',
      answer:
        'Traditional platforms deploy passive video libraries, gamified leaderboards, and dopamine triggers that produce a false sense of preparedness. Education Platform operates as a calm academic workspace: lectures emphasize unhurried mathematical and physical proofs, problem solving preserves cognitive struggle through progressive hints, and mock tests deliver diagnostic error autopsies rather than hollow rank scores.',
    },
    {
      id: 'faq-3',
      question: 'Which examinations and cohort years are currently supported?',
      answer:
        'We support complete preparation tracks for JEE Advanced, JEE Main, NEET-UG, and Class 9–10 Foundation Olympiad tracks. Each stream is mapped to 2026 and 2027 examination cycles as well as dedicated repeater/dropper intensive tracks through participating centers.',
    },
    {
      id: 'faq-4',
      question: 'Can I register on the platform before selecting my courses?',
      answer:
        'Yes. Registration as a Student is completely free. Once you set up your account, you can select your Institute and Branch to explore available courses, academic schedules, and diagnostic assessments with no credit card required.',
    },
    {
      id: 'faq-5',
      question: 'What is the "Closed-Loop Preparation System"?',
      answer:
        'Most students use one app for videos, a separate book for questions, and separate test PDFs—meaning test mistakes are never systematically fixed. In Education Platform, a question missed in Sunday’s CBT mock automatically tags your error archetype (conceptual, algebraic, or pacing stall) and schedules relevant derivation practice into your revision deck for spaced re-attempts.',
    },
  ];

  const [openId, setOpenId] = useState<string | null>(visitorFaqs[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-xs font-bold uppercase tracking-widest border border-[#BAE6FD]">
          <span>Clarity &amp; Common Inquiries</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#12365A] tracking-tight leading-[1.12] font-bold">
          Frequently Addressed Questions
        </h2>
        <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto leading-relaxed font-sans">
          Everything you need to know about our Institute and Branch relationship, examination tracks, and onboarding flow.
        </p>
      </div>

      {/* Accordion List with High Contrast & Polished Hierarchy */}
      <div className="space-y-4">
        {visitorFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`bg-white rounded-xl p-6 sm:p-7 shadow-card border transition-all duration-200 text-left ${
                isOpen
                  ? 'border-[#00A8F0] ring-1 ring-[#00A8F0]/20'
                  : 'border-[#E2E8F0] hover:border-[#00A8F0]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between text-left font-serif text-lg sm:text-xl text-[#12365A] group font-bold cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="pr-4 group-hover:text-[#00A8F0] transition-colors">
                  {faq.question}
                </span>
                <span
                  className={`material-symbols-outlined text-[#64748B] group-hover:text-[#00A8F0] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#00A8F0]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-[#E2E8F0] text-sm sm:text-base text-[#64748B] leading-relaxed font-sans animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;
