import React, { useState } from 'react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAuth,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Courses', href: '#courses-section' },
    { label: 'Tests', href: '#test-series-section' },
    { label: 'Practice', href: '#practice-section' },
    { label: 'Resources', href: '#resources-section' },
    { label: 'Journey', href: '#journey-section' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(11,28,48,0.03)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Navigation */}
        <div className="flex items-center gap-8 lg:gap-10">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200">
              <span className="material-symbols-outlined text-[22px]">spa</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg text-on-surface tracking-tight leading-none font-medium">
                Aura Sanctuary
              </span>
              <span className="text-[10px] font-semibold text-outline tracking-wider uppercase leading-none mt-1">
                Glacial Learning
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Actions: Search + Auth */}
        <div className="flex items-center gap-3">
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-on-surface-variant text-xs transition-all duration-150"
            title="Search syllabus, papers (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-outline text-[18px]">
              search
            </span>
            <span className="hidden sm:inline text-outline font-normal">Search syllabus, mocks...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-outline bg-surface-container rounded border border-outline-variant/30">
              ⌘K
            </kbd>
          </button>

          {/* User Auth State */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-medium text-on-surface">
                <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold uppercase">
                  {currentUser.name.charAt(0) || 'S'}
                </div>
                <span className="hidden md:inline max-w-[120px] truncate">
                  {currentUser.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-xs text-outline hover:text-error px-2 py-1"
                title="Log out"
              >
                Exit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-semibold text-on-surface-variant hover:text-on-surface px-3 py-2 rounded-lg transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container"
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
        <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-on-surface hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
            {!currentUser ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-surface-container text-on-surface"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-primary-container text-on-primary"
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
                className="w-full text-center py-2 text-sm font-medium rounded-lg text-error hover:bg-error-container/20"
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
