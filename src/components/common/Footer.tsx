import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12">
        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Courses
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
              <li>
                <a href="#courses-section" className="hover:text-primary transition-colors">
                  Foundational Curricula
                </a>
              </li>
              <li>
                <a href="#courses-section" className="hover:text-primary transition-colors">
                  Advanced Seminars
                </a>
              </li>
              <li>
                <a href="#courses-section" className="hover:text-primary transition-colors">
                  Guided Masterclasses
                </a>
              </li>
              <li>
                <a href="#courses-section" className="hover:text-primary transition-colors">
                  Syllabus Breakdown
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Tests &amp; Mocks
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
              <li>
                <a href="#test-series-section" className="hover:text-primary transition-colors">
                  Full-Length CBT Simulations
                </a>
              </li>
              <li>
                <a href="#test-series-section" className="hover:text-primary transition-colors">
                  Timed Sectionals
                </a>
              </li>
              <li>
                <a href="#test-series-section" className="hover:text-primary transition-colors">
                  Diagnostic Error Autopsy
                </a>
              </li>
              <li>
                <a href="#test-series-section" className="hover:text-primary transition-colors">
                  Gaussian Percentiles
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Practice &amp; Revision
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
              <li>
                <a href="#practice-section" className="hover:text-primary transition-colors">
                  Question Repository
                </a>
              </li>
              <li>
                <a href="#practice-section" className="hover:text-primary transition-colors">
                  Spaced Recall Decks
                </a>
              </li>
              <li>
                <a href="#practice-section" className="hover:text-primary transition-colors">
                  Targeted Weakness Sets
                </a>
              </li>
              <li>
                <a href="#practice-section" className="hover:text-primary transition-colors">
                  Mistake Notebook Vault
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Free Resources
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
              <li>
                <a href="#resources-section" className="hover:text-primary transition-colors">
                  Academic Compendiums
                </a>
              </li>
              <li>
                <a href="#resources-section" className="hover:text-primary transition-colors">
                  Past Paper Archives
                </a>
              </li>
              <li>
                <a href="#resources-section" className="hover:text-primary transition-colors">
                  Formula Handbooks
                </a>
              </li>
              <li>
                <a href="#resources-section" className="hover:text-primary transition-colors">
                  Study Planners
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Platform &amp; Trust
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
              <li>
                <a href="#journey-section" className="hover:text-primary transition-colors">
                  Pedagogical Ethics
                </a>
              </li>
              <li>
                <a href="#test-series-section" className="hover:text-primary transition-colors">
                  Data &amp; Offline Integrity
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Support &amp; Concierge
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cognitive Research
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-outline">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Aura Sanctuary. Crafted for intellectual clarity and focus.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-on-surface transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-on-surface transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-on-surface transition-colors">
              Institutional Licensing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
