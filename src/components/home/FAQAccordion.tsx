import React, { useState } from 'react';

export const FAQAccordion: React.FC = () => {
  const visitorFaqs = [
    {
      id: 'faq-1',
      question: 'How do Courses work on Aura Sanctuary?',
      answer:
        'Courses on Aura Sanctuary are not generic platform-wide video catalogues. Each Course is created and delivered by an Institute and its specific Branch. To enrol in and participate in a Course, a student selects their affiliated Institute and Branch during onboarding.',
    },
    {
      id: 'faq-2',
      question: 'How does Aura Sanctuary differ from traditional coaching apps?',
      answer:
        'Traditional platforms deploy passive video libraries, gamified leaderboards, and dopamine triggers that produce a false sense of preparedness. Aura operates as a calm academic sanctuary: lectures emphasize unhurried mathematical and physical proofs, problem solving preserves cognitive struggle through progressive hints, and mock tests deliver diagnostic error autopsies rather than hollow rank scores.',
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
        'Most students use one app for videos, a separate book for questions, and separate test PDFs—meaning test mistakes are never systematically fixed. In Aura, a question missed in Sunday’s CBT mock automatically tags your error archetype (conceptual, algebraic, or pacing stall) and schedules relevant derivation practice into your revision deck for spaced re-attempts.',
    },
  ];

  const [openId, setOpenId] = useState<string | null>(visitorFaqs[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-bold uppercase tracking-widest border border-[#cde5ff]">
          <span>Clarity &amp; Common Inquiries</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0b1c30] tracking-tight leading-[1.12] font-normal">
          Frequently Addressed Questions
        </h2>
        <p className="text-base sm:text-lg text-[#40474f] max-w-xl mx-auto leading-relaxed font-sans">
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
              className={`bg-white rounded-2xl p-6 sm:p-7 shadow-xs border transition-all duration-200 text-left ${
                isOpen
                  ? 'border-[#0369a1] ring-1 ring-[#0369a1]/20'
                  : 'border-[#e2e8f0] hover:border-[#0369a1]/40'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between text-left font-serif text-lg sm:text-xl text-[#0b1c30] group font-medium"
                aria-expanded={isOpen}
              >
                <span className="pr-4 group-hover:text-[#0369a1] transition-colors">
                  {faq.question}
                </span>
                <span
                  className={`material-symbols-outlined text-[#64748b] group-hover:text-[#0369a1] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#0369a1]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-[#e2e8f0] text-sm sm:text-base text-[#40474f] leading-relaxed font-sans animate-in fade-in duration-150">
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
