import React, { useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { getPublishedAboutContent } from '../../data/mockData';

interface AboutUsScreenProps {
  onNavigateHome: () => void;
  onExploreExaminations?: () => void;
  onStartPreparation?: () => void;
}

export const AboutUsScreen: React.FC<AboutUsScreenProps> = ({
  onNavigateHome,
  onExploreExaminations,
  onStartPreparation,
}) => {
  // Retrieve Super Admin-managed About page content
  const aboutData = useMemo(() => {
    return getPublishedAboutContent();
  }, []);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', onClick: onNavigateHome },
    { label: 'About Us', isCurrent: true },
  ];

  // Clean Fallback State if Super Admin content has not been published or configured
  if (!aboutData) {
    return (
      <div className="w-full min-h-screen bg-background text-on-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
          <Breadcrumb items={breadcrumbItems} />
          <div className="max-w-md mx-auto my-20 bg-white rounded-3xl p-8 border border-[#e2e8f0] shadow-xs text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">info</span>
            </div>
            <h2 className="font-serif text-2xl text-[#0b1c30] font-normal">
              About Information
            </h2>
            <p className="text-sm text-[#40474f] leading-relaxed font-sans">
              About information is currently being updated by the academic administration team. Please check back shortly.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-5 py-2.5 rounded-xl bg-[#0369a1] text-white text-xs font-semibold hover:bg-[#0284c7] transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Page Hero Section */}
        <section aria-labelledby="about-hero-heading" className="text-left mb-16 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-bold uppercase tracking-wider border border-[#cde5ff]">
            <span className="material-symbols-outlined text-[15px]">spa</span>
            <span>Academic Philosophy &amp; Architecture</span>
          </div>

          <h1
            id="about-hero-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0b1c30] tracking-tight leading-tight font-normal"
          >
            {aboutData.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#0369a1] font-sans font-medium leading-relaxed">
            {aboutData.subtitle}
          </p>

          <p className="text-base sm:text-lg text-[#40474f] leading-relaxed font-sans font-normal pt-2">
            {aboutData.introduction}
          </p>
        </section>

        {/* 2. Platform Highlights Grid (Super Admin Managed) */}
        {aboutData.highlights && aboutData.highlights.length > 0 && (
          <section aria-labelledby="highlights-heading" className="mb-20 text-left">
            <h2 id="highlights-heading" className="sr-only">
              Platform Pillars &amp; Core Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData.highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs hover:shadow-card hover:border-[#0369a1]/40 transition-all duration-150 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      {highlight.icon}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#0b1c30]">
                    {highlight.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed font-sans">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Dynamic Structured Sections (Super Admin Managed) */}
        <section aria-labelledby="curriculum-philosophy-heading" className="mb-20 space-y-10 text-left">
          <h2 id="curriculum-philosophy-heading" className="sr-only">
            Detailed Platform Principles
          </h2>
          <div className="space-y-8">
            {aboutData.sections
              .sort((a, b) => a.order - b.order)
              .map((sec, idx) => (
                <article
                  key={sec.id}
                  className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e2e8f0] shadow-xs space-y-4 hover:border-[#0369a1]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff] text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {sec.badge && (
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-[#475569] border border-slate-200">
                        {sec.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0b1c30] font-normal leading-snug">
                    {sec.heading}
                  </h3>

                  <div className="space-y-3.5 text-sm sm:text-base text-[#40474f] leading-relaxed font-sans max-w-4xl">
                    {sec.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Graceful Image Handling (Only rendered if configured) */}
                  {sec.imageUrl && (
                    <figure className="pt-4 mt-4 border-t border-[#f1f5f9]">
                      <img
                        src={sec.imageUrl}
                        alt={sec.imageCaption || sec.heading}
                        className="rounded-2xl max-h-80 w-full object-cover border border-[#e2e8f0]"
                        onError={(e) => {
                          // Gracefully hide broken image element without creating UI artifact
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {sec.imageCaption && (
                        <figcaption className="text-xs text-[#64748b] mt-2 italic">
                          {sec.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </article>
              ))}
          </div>
        </section>

        {/* 4. Institutional Pathway Callout */}
        <div className="mb-16 bg-[#eff4ff]/60 rounded-3xl p-6 sm:p-10 border border-[#cde5ff] text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#0369a1] text-white">
              Institutional Affiliation
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#0b1c30] font-normal">
              Are you an Accredited Coaching Institute or Branch Director?
            </h3>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Aura partners with recognized academic institutes across India to deliver synchronized milestone curricula, CBT exam testing portals, and error remediation systems.
            </p>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              onClick={onExploreExaminations}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0369a1] text-xs font-semibold border border-[#cde5ff] shadow-xs transition-all duration-150 inline-flex items-center gap-1.5"
            >
              <span>Explore Partner Examination Tracks</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 5. Bottom Conversion CTA Banner */}
        {aboutData.ctaTitle && (
          <section
            aria-labelledby="about-cta-heading"
            className="bg-[#0369a1] text-white rounded-3xl p-8 sm:p-12 text-left relative overflow-hidden shadow-elevated"
          >
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-white/20">
                Cognitive Sanctuary
              </span>
              <h2
                id="about-cta-heading"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight"
              >
                {aboutData.ctaTitle}
              </h2>
              {aboutData.ctaDescription && (
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-normal">
                  {aboutData.ctaDescription}
                </p>
              )}
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={onStartPreparation}
                  className="px-6 py-3 rounded-xl bg-white text-[#0369a1] hover:bg-slate-50 text-sm font-semibold shadow-xs transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span>{aboutData.ctaButtonLabel || 'Get Started Free'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={onExploreExaminations}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-150 inline-flex items-center gap-1.5 border border-white/20"
                >
                  <span>Browse Examinations</span>
                </button>
              </div>
            </div>

            {/* Ambient Decorative Halo */}
            <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
          </section>
        )}
      </div>
    </div>
  );
};

export default AboutUsScreen;
