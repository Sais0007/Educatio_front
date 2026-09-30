import React from 'react';
import { ScreenType } from '../../types';

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
    <footer className="w-full bg-white border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12">
        {/* Brand & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16 text-left">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => handleNav('home', '#hero')}
              className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0369a1] rounded-lg p-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[#eff4ff] border border-[#cde5ff] flex items-center justify-center text-[#0369a1]">
                <span className="material-symbols-outlined text-[24px]">spa</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl text-[#0b1c30] tracking-tight leading-none font-medium">
                  Aura Sanctuary
                </span>
                <span className="text-[11px] font-semibold text-[#64748b] tracking-wider uppercase leading-none mt-1">
                  Academic Preparation
                </span>
              </div>
            </button>
            <p className="text-sm text-[#40474f] max-w-sm leading-relaxed font-sans">
              An unhurried intellectual workspace that unifies first-principles lectures, step-by-step derivation practice, and official CBT mocks with diagnostic error autopsies.
            </p>
            <div className="text-xs text-[#64748b] font-medium">
              Designed for serious competitive exam aspirants across India.
            </div>
          </div>

          {/* Col 2: Preparation Tracks */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
              Examination Paths
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#40474f]">
              <li>
                <a href="#hero" className="hover:text-[#0369a1] transition-colors">
                  JEE Advanced (IIT)
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#0369a1] transition-colors">
                  JEE Main (NTA)
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#0369a1] transition-colors">
                  NEET-UG Medical
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#0369a1] transition-colors">
                  Foundation Olympiad (9–10)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: The Sanctuary Loop */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
              Methodology
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#40474f]">
              <li>
                <a href="#journey" className="hover:text-[#0369a1] transition-colors">
                  First-Principles Derivation
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#0369a1] transition-colors">
                  Progressive Clue Practice
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#0369a1] transition-colors">
                  Authentic CBT Simulations
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#0369a1] transition-colors">
                  Diagnostic Error Autopsy
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#0369a1] transition-colors">
                  Spaced Mistake Remediation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#40474f]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-[#0369a1] transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#0369a1] transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#0369a1] transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('examinations')}
                  className="hover:text-[#0369a1] transition-colors text-left"
                >
                  Examination Tracks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#0369a1] transition-colors text-left"
                >
                  Free Courses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('tests')}
                  className="hover:text-[#0369a1] transition-colors text-left"
                >
                  Sample Tests
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('signup')}
                  className="hover:text-[#0369a1] transition-colors text-left font-medium text-[#0369a1]"
                >
                  Student Registration
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-8 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div>
            &copy; 2026 Aura Sanctuary. All rights reserved. Built for cognitive clarity.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              Honor Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
