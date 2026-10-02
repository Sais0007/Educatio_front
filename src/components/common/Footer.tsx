import React from 'react';
import { ScreenType } from '../../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigateScreen?: (screen: ScreenType, anchor?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateScreen }) => {
  const handleNav = (screen: ScreenType, anchor?: string) => {
    if (onNavigateScreen) {
      onNavigateScreen(screen, anchor);
    }
  };

  return (
    <footer className="w-full bg-white border-t border-[#E2E8F0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12">
        {/* Brand & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16 text-left">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => handleNav('home', '#hero')}
              className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-[#00A8F0] rounded-lg p-0.5 transition-opacity hover:opacity-90"
              aria-label="Education Platform Home"
            >
              <Logo size="lg" />
            </button>
            <p className="text-sm text-[#64748B] max-w-sm leading-relaxed font-sans">
              Empowering every learner for a brighter tomorrow through structured learning, focused practice, official mock tests, and actionable insights.
            </p>
            <div className="text-xs text-[#00A8F0] font-semibold tracking-wide">
              Learn &bull; Practice &bull; Test &bull; Grow
            </div>
          </div>

          {/* Col 2: Preparation Tracks */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#12365A] font-serif tracking-tight">
              Examination Paths
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#64748B]">
              <li>
                <a href="#hero" className="hover:text-[#00A8F0] transition-colors">
                  JEE Advanced (IIT)
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#00A8F0] transition-colors">
                  JEE Main (NTA)
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#00A8F0] transition-colors">
                  NEET-UG Medical
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#00A8F0] transition-colors">
                  Foundation Olympiad (9–10)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: The Sanctuary Loop / Methodology */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#12365A] font-serif tracking-tight">
              Learning Model
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#64748B]">
              <li>
                <a href="#journey" className="hover:text-[#00A8F0] transition-colors">
                  First-Principles Derivation
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#00A8F0] transition-colors">
                  Progressive Clue Practice
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#00A8F0] transition-colors">
                  Authentic CBT Simulations
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#00A8F0] transition-colors">
                  Diagnostic Error Autopsy
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#00A8F0] transition-colors">
                  Spaced Mistake Remediation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#12365A] font-serif tracking-tight">
              Platform Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#64748B]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-[#00A8F0] transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#00A8F0] transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#00A8F0] transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('examinations')}
                  className="hover:text-[#00A8F0] transition-colors text-left"
                >
                  Examination Tracks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#00A8F0] transition-colors text-left"
                >
                  Free Courses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('tests')}
                  className="hover:text-[#00A8F0] transition-colors text-left"
                >
                  Sample Tests
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('signup')}
                  className="hover:text-[#00A8F0] transition-colors text-left font-semibold text-[#00A8F0]"
                >
                  Student Registration
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>
            &copy; 2026 Education Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#12365A] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#12365A] transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-[#12365A] transition-colors">
              Honor Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
