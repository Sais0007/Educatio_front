import React, { useState } from 'react';
import { ScreenType } from '../../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  currentScreen?: ScreenType;
  onNavigateScreen?: (screen: ScreenType, anchor?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAuth,
  currentUser,
  onLogout,
  currentScreen = 'home',
  onNavigateScreen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; screen: 'home' | 'examinations' | 'courses' | 'tests'; href: string }[] = [
    { label: 'Examinations', screen: 'examinations', href: '#hero' },
    { label: 'Courses', screen: 'courses', href: '#courses' },
    { label: 'Tests', screen: 'tests', href: '#tests' },
  ];

  const handleNavClick = (screen: ScreenType, href: string) => {
    if (onNavigateScreen) {
      onNavigateScreen(screen, href);
    }
  };

  const handleGetStartedClick = () => {
    if (onNavigateScreen) {
      onNavigateScreen('signup');
    } else {
      onOpenAuth('register');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e2e8f0] shadow-[0_1px_6px_rgba(15,23,42,0.03)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Identity */}
        <button
          type="button"
          onClick={() => handleNavClick('home', '#hero')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#0369a1] rounded-xl p-1 text-left transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#cde5ff] flex items-center justify-center text-[#0369a1] group-hover:bg-[#0369a1] group-hover:text-white transition-colors duration-200 shrink-0">
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

        {/* Desktop Guest Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              link.screen === 'examinations'
                ? currentScreen === 'examinations'
                : link.screen === 'courses'
                ? currentScreen === 'courses' || currentScreen === 'course-details'
                : link.screen === 'tests'
                ? currentScreen === 'tests' || currentScreen === 'test-details'
                : false;

            return (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.screen, link.href)}
                className={`px-4 py-2 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#eff4ff] text-[#0369a1] font-semibold border border-[#cde5ff] shadow-xs'
                    : 'font-medium text-[#40474f] hover:text-[#0b1c30] hover:bg-slate-100/70'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search + Auth */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-[#eff4ff] text-[#40474f] hover:text-[#0b1c30] border border-[#e2e8f0] text-xs font-medium transition-colors"
            title="Search syllabus & curriculum (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0369a1]">
              search
            </span>
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#64748b] bg-white rounded border border-[#cbd5e1]">
              ⌘K
            </kbd>
          </button>

          {/* User State & Auth Actions */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] border border-[#cde5ff] text-xs font-semibold text-[#0b1c30]">
                <div className="w-6 h-6 rounded-full bg-[#0369a1] text-white flex items-center justify-center text-xs font-bold uppercase">
                  {currentUser.name.charAt(0) || 'S'}
                </div>
                <span className="hidden md:inline max-w-[120px] truncate">
                  {currentUser.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-xs font-medium text-[#64748b] hover:text-[#ba1a1a] px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                title="Log out"
              >
                Exit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-sm font-semibold text-[#40474f] hover:text-[#0b1c30] px-3.5 py-2 rounded-xl hover:bg-slate-100/70 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={handleGetStartedClick}
                className="bg-[#0369a1] hover:bg-[#0284c7] text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl shadow-xs hover:shadow-card transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#40474f] hover:bg-[#eff4ff]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e2e8f0] px-6 py-5 space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col gap-1 text-left">
            {navLinks.map((link) => {
              const isActive =
                link.screen === 'examinations'
                  ? currentScreen === 'examinations'
                  : link.screen === 'courses'
                  ? currentScreen === 'courses' || currentScreen === 'course-details'
                  : link.screen === 'tests'
                  ? currentScreen === 'tests' || currentScreen === 'test-details'
                  : false;

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(link.screen, link.href);
                  }}
                  className={`py-2.5 text-left text-base transition-colors ${
                    isActive
                      ? 'font-semibold text-[#0369a1]'
                      : 'font-medium text-[#0b1c30] hover:text-[#0369a1]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Secondary Public Mobile Links */}
            <div className="pt-2 border-t border-[#e2e8f0]/60 flex flex-col gap-1 text-sm text-[#40474f]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('about', '#about');
                }}
                className={`py-1.5 text-left transition-colors ${
                  currentScreen === 'about' ? 'font-semibold text-[#0369a1]' : 'hover:text-[#0b1c30]'
                }`}
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('contact', '#contact');
                }}
                className={`py-1.5 text-left transition-colors ${
                  currentScreen === 'contact' ? 'font-semibold text-[#0369a1]' : 'hover:text-[#0b1c30]'
                }`}
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('faq', '#faq');
                }}
                className={`py-1.5 text-left transition-colors ${
                  currentScreen === 'faq' ? 'font-semibold text-[#0369a1]' : 'hover:text-[#0b1c30]'
                }`}
              >
                Frequently Asked Questions
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e2e8f0] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full text-center py-2.5 text-sm font-medium rounded-lg bg-[#eff4ff] text-[#0369a1] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Search Curriculum</span>
            </button>

            {!currentUser ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full text-center py-3 text-sm font-semibold rounded-lg bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleGetStartedClick();
                  }}
                  className="w-full text-center py-3 text-sm font-semibold rounded-lg bg-[#0369a1] text-white hover:bg-[#0284c7] cursor-pointer"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onLogout) onLogout();
                }}
                className="w-full text-center py-3 text-sm font-medium rounded-lg text-[#ba1a1a] hover:bg-red-50"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
