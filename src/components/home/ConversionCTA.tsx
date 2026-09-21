import React from 'react';

interface ConversionCTAProps {
  onRegister: () => void;
  onExplore: () => void;
}

export const ConversionCTA: React.FC<ConversionCTAProps> = ({
  onRegister,
  onExplore,
}) => {
  return (
    <section className="w-full pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-surface-container-lowest rounded-2xl p-8 sm:p-12 lg:p-16 shadow-card border border-outline-variant/30 relative overflow-hidden text-center">
        {/* Ambient Gradient behind Banner */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low via-surface-container-lowest to-surface-variant/20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-[26px]">spa</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight mb-4 font-normal">
            Begin Your Preparation with Undivided Focus.
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant mb-8 leading-relaxed">
            Join serious aspirants who study with intention, rigor, and peace of mind. Create your student account and access your first full syllabus diagnostic mock today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onRegister}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs sm:text-sm font-semibold shadow-sm transition-all duration-150"
            >
              Create Free Student Account →
            </button>
            <button
              type="button"
              onClick={onExplore}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs sm:text-sm font-semibold transition-all duration-150 border border-outline-variant/30"
            >
              Explore All Courses &amp; Tests
            </button>
          </div>

          <div className="mt-6 text-outline text-xs">
            Complimentary 10-day diagnostic access · No credit card required
          </div>
        </div>
      </div>
    </section>
  );
};
