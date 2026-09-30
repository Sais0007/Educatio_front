import React, { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { getPublishedFAQs } from '../../data/mockData';

interface FAQScreenProps {
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export const FAQScreen: React.FC<FAQScreenProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter FAQs by category (Super Admin-managed published FAQs)
  const filteredFaqs = useMemo(() => {
    return getPublishedFAQs(selectedCategory);
  }, [selectedCategory]);

  // Accordion open item state (defaults to first item)
  const [openId, setOpenId] = useState<string | null>(
    filteredFaqs.length > 0 ? filteredFaqs[0].id : null
  );

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', onClick: onNavigateHome },
    { label: 'Frequently Asked Questions', isCurrent: true },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'enrollment', label: 'Institute & Branch Affiliation' },
    { id: 'pedagogy', label: 'Pedagogy & Error Autopsies' },
    { id: 'examinations', label: 'Examination Tracks' },
    { id: 'testing', label: 'CBT Mocks & Diagnostics' },
    { id: 'resources', label: 'Open Study Vault' },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Page Hero Section */}
        <section aria-labelledby="faq-hero-heading" className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-bold uppercase tracking-wider border border-[#cde5ff]">
            <span className="material-symbols-outlined text-[15px]">quiz</span>
            <span>Clarity &amp; Common Inquiries</span>
          </div>

          <h1
            id="faq-hero-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0b1c30] tracking-tight leading-tight font-normal"
          >
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-[#40474f] max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Everything you need to know about our Institute and Branch relationship, examination tracks, and onboarding flow.
          </p>
        </section>

        {/* 2. Category Filter Chips (Reusing standard chip pattern) */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  // Auto-open first item in newly filtered category if available
                  const items = getPublishedFAQs(cat.id);
                  if (items.length > 0) {
                    setOpenId(items[0].id);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#0369a1] text-white shadow-xs'
                    : 'bg-white text-[#40474f] border border-[#e2e8f0] hover:border-[#0369a1]/40 hover:text-[#0b1c30]'
                }`}
                aria-pressed={isSelected}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3. FAQ Accordion (Reusing exact Home FAQ visual hierarchy & interaction) */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4 text-left">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl p-6 sm:p-7 shadow-xs border transition-all duration-200 ${
                    isOpen
                      ? 'border-[#0369a1] ring-1 ring-[#0369a1]/20'
                      : 'border-[#e2e8f0] hover:border-[#0369a1]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between text-left font-serif text-lg sm:text-xl text-[#0b1c30] group font-medium focus:outline-none"
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
        ) : (
          /* Clean Empty State */
          <div className="bg-white rounded-3xl p-10 border border-[#e2e8f0] text-center space-y-3 my-8">
            <span className="material-symbols-outlined text-[32px] text-[#64748b]">
              search_off
            </span>
            <h3 className="font-serif text-xl text-[#0b1c30]">
              Frequently asked questions will be available soon.
            </h3>
            <p className="text-xs text-[#64748b] max-w-sm mx-auto leading-relaxed">
              No published questions currently match the selected category.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#0369a1] text-xs font-semibold hover:bg-[#e5eeff] transition-all"
              >
                View All Questions
              </button>
            </div>
          </div>
        )}

        {/* 4. Bottom Support Inquiry Callout */}
        <div className="mt-16 bg-[#eff4ff]/60 rounded-3xl p-6 sm:p-8 border border-[#cde5ff] text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-lg text-[#0b1c30] font-medium">
              Have a question that is not addressed here?
            </h4>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Our academic coordination team is available to assist you with enrollment, curriculum, or technical queries.
            </p>
          </div>
          {onNavigateContact && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={onNavigateContact}
                className="px-5 py-2.5 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-xs transition-all duration-150 inline-flex items-center gap-1.5"
              >
                <span>Submit a Ticket</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQScreen;
