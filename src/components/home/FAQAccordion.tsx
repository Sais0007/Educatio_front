import React, { useState } from 'react';
import { FAQS } from '../../data/mockData';

export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
          Clarity of Inquiry
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
          Frequently Addressed Questions
        </h2>
      </div>

      {/* Accordion Stack */}
      <div className="space-y-4">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 transition-all duration-150"
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg text-on-surface group font-medium"
                aria-expanded={isOpen}
              >
                <span className="pr-4">{faq.question}</span>
                <span
                  className={`material-symbols-outlined text-outline group-hover:text-primary transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs sm:text-sm text-on-surface-variant leading-relaxed animate-in fade-in duration-150">
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
