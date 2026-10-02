import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { Logo } from './Logo';

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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_1px_4px_rgba(18,54,90,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Identity with Approved Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home', '#hero')}
          className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#00A8F0] rounded-lg p-1 text-left transition-opacity hover:opacity-90"
          aria-label="Education Platform Home"
        >
          <Logo size="md" />
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
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer font-sans ${
                  isActive
                    ? 'bg-[#E0F4FD] text-[#00A8F0] font-semibold border border-[#BAE6FD] shadow-xs'
                    : 'font-medium text-[#12365A] hover:text-[#00A8F0] hover:bg-[#F5F8FC]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search + Auth */}
        <div className="flex items-center gap-3 sm:gap-4 font-sans">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#64748B] hover:text-[#12365A] border border-[#E2E8F0] text-xs font-medium transition-colors shadow-xs cursor-pointer"
            title="Search syllabus & curriculum (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00A8F0]">
              search
            </span>
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#64748B] bg-[#F5F8FC] rounded border border-[#E2E8F0]">
              ⌘K
            </kbd>
          </button>

          {/* User State & Auth Actions */}
          {currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onNavigateScreen && onNavigateScreen('student-dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E0F4FD] hover:bg-[#BAE6FD] border border-[#BAE6FD] text-xs font-semibold text-[#00A8F0] transition-colors cursor-pointer"
                title="Go to Student Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-[#00A8F0] text-white flex items-center justify-center text-[10px] font-bold uppercase">
                  {currentUser.name.charAt(0) || 'S'}
                </div>
                <span>Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs font-medium text-[#64748B] hover:text-[#DC3545] px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Log out"
              >
                Exit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-sm font-semibold text-[#12365A] hover:text-[#00A8F0] px-3.5 py-2 rounded-lg hover:bg-[#F5F8FC] transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={handleGetStartedClick}
                className="bg-[#00A8F0] hover:bg-[#0092D1] text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-xs hover:shadow transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#12365A] hover:bg-[#F5F8FC]"
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
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-6 py-5 space-y-4 animate-in fade-in duration-150 font-sans">
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
                      ? 'font-semibold text-[#00A8F0]'
                      : 'font-medium text-[#12365A] hover:text-[#00A8F0]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Secondary Public Mobile Links */}
            <div className="pt-2 border-t border-[#E2E8F0] flex flex-col gap-1 text-sm text-[#64748B]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('about', '#about');
                }}
                className={`py-1.5 text-left transition-colors ${
                  currentScreen === 'about' ? 'font-semibold text-[#00A8F0]' : 'hover:text-[#12365A]'
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
                  currentScreen === 'contact' ? 'font-semibold text-[#00A8F0]' : 'hover:text-[#12365A]'
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
                  currentScreen === 'faq' ? 'font-semibold text-[#00A8F0]' : 'hover:text-[#12365A]'
                }`}
              >
                Frequently Asked Questions
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full text-center py-2.5 text-sm font-medium rounded-lg bg-[#E0F4FD] text-[#00A8F0] flex items-center justify-center gap-2"
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
                  className="w-full text-center py-3 text-sm font-semibold rounded-lg bg-[#F5F8FC] text-[#12365A] hover:bg-[#EEF4FA]"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleGetStartedClick();
                  }}
                  className="w-full text-center py-3 text-sm font-semibold rounded-lg bg-[#00A8F0] text-white hover:bg-[#0092D1] cursor-pointer"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateScreen) onNavigateScreen('student-dashboard');
                  }}
                  className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-[#E0F4FD] text-[#00A8F0] hover:bg-[#BAE6FD]"
                >
                  Student Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-center py-2.5 text-sm font-medium rounded-lg text-[#DC3545] hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
