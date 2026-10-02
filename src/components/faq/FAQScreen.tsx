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

  // Filter FAQs by category
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
    { id: 'pedagogy', label: 'Pedagogy & Error Diagnostics' },
    { id: 'examinations', label: 'Examination Tracks' },
    { id: 'testing', label: 'CBT Mocks & Diagnostics' },
    { id: 'resources', label: 'Open Study Vault' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F8FC] text-[#12365A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Page Hero Section */}
        <section aria-labelledby="faq-hero-heading" className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#00A8F0] text-xs font-semibold uppercase tracking-wider border border-[#00A8F0]/20">
            <span className="material-symbols-outlined text-[15px]">quiz</span>
            <span>Clarity &amp; Common Inquiries</span>
          </div>

          <h1
            id="faq-hero-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#12365A] tracking-tight leading-tight font-bold"
          >
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Everything you need to know about our Institute and Branch relationship, examination tracks, and onboarding flow.
          </p>
        </section>

        {/* 2. Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const items = getPublishedFAQs(cat.id);
                  if (items.length > 0) {
                    setOpenId(items[0].id);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#00A8F0] text-white shadow-sm'
                    : 'bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#00A8F0]/40 hover:text-[#12365A]'
                }`}
                aria-pressed={isSelected}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3. FAQ Accordion */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4 text-left">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-xl p-6 sm:p-7 shadow-sm border transition-all duration-200 ${
                    isOpen
                      ? 'border-[#00A8F0] ring-1 ring-[#00A8F0]/20'
                      : 'border-[#E2E8F0] hover:border-[#00A8F0]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between text-left font-serif text-lg sm:text-xl text-[#12365A] group font-bold focus:outline-none"
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
                    <div className="mt-4 pt-4 border-t border-[#E2E8F0] text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl p-10 border border-[#E2E8F0] text-center space-y-3 my-8 shadow-sm">
            <span className="material-symbols-outlined text-[32px] text-[#64748B]">
              search_off
            </span>
            <h3 className="font-serif text-xl text-[#12365A] font-bold">
              Frequently asked questions will be available soon.
            </h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed font-sans">
              No published questions currently match the selected category.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 rounded-lg bg-[#F5F8FC] text-[#00A8F0] text-xs font-semibold hover:bg-sky-50 transition-all border border-[#00A8F0]/20"
              >
                View All Questions
              </button>
            </div>
          </div>
        )}

        {/* 4. Bottom Support Inquiry Callout */}
        <div className="mt-16 bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-lg text-[#12365A] font-bold">
              Have a question that is not addressed here?
            </h4>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-sans">
              Our academic coordination team is available to assist you with enrollment, curriculum, or technical queries.
            </p>
          </div>
          {onNavigateContact && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={onNavigateContact}
                className="px-5 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0096D6] text-white text-xs font-semibold shadow-sm transition-all duration-150 inline-flex items-center gap-1.5"
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
