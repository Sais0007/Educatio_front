import React, { useState } from 'react';
import { StudentNavSection, StudentProfile, StudentNotificationItem } from '../../types/student';
import { Logo } from '../common/Logo';

interface StudentPanelLayoutProps {
  currentSection: StudentNavSection;
  onNavigateSection: (section: StudentNavSection) => void;
  onNavigatePublic: (screen?: string) => void;
  onLogout: () => void;
  student: StudentProfile;
  notifications?: StudentNotificationItem[];
  scenario?: 'active' | 'new';
  onToggleScenario?: (scenario: 'active' | 'new') => void;
  children: React.ReactNode;
}

export const StudentPanelLayout: React.FC<StudentPanelLayoutProps> = ({
  currentSection,
  onNavigateSection,
  onNavigatePublic,
  onLogout,
  student,
  notifications = [],
  scenario = 'active',
  onToggleScenario,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const navItems: { id: StudentNavSection; label: string; icon: string; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'learning', label: 'My Learning', icon: 'menu_book', badge: '3' },
    { id: 'practice', label: 'Practice Arena', icon: 'edit_note' },
    { id: 'tests', label: 'Test Series', icon: 'quiz', badge: '1 Due' },
    { id: 'results', label: 'Results & Analytics', icon: 'insights' },
    { id: 'revision', label: 'Mistake Notebook', icon: 'auto_fix_high' },
    { id: 'resources', label: 'Resource Library', icon: 'folder_open' },
    { id: 'profile', label: 'Student Profile', icon: 'account_circle' },
  ];

  const handleNavClick = (section: StudentNavSection) => {
    onNavigateSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#12365A] flex flex-col md:flex-row font-sans selection:bg-[#00A8F0]/20 selection:text-[#12365A]">
      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR (Persistent Navigation)                   */}
      {/* ======================================================== */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-[#E2E8F0] shrink-0 h-screen sticky top-0 z-30 shadow-subtle">
        {/* Brand & Workspace Identity with Approved Logo */}
        <div className="h-20 px-6 border-b border-[#E2E8F0] flex items-center justify-start">
          <Logo size="md" />
        </div>

        {/* Student Branch Affiliation Banner */}
        <div className="px-4 py-3 mx-4 mt-4 rounded-xl bg-[#E0F4FD]/80 border border-[#BAE6FD] text-left">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00A8F0] uppercase tracking-wide">
            <span className="material-symbols-outlined text-[14px]">domain</span>
            <span className="truncate">{student.instituteName}</span>
          </div>
          <div className="text-xs font-semibold text-[#12365A] mt-0.5 truncate">
            {student.branchName}
          </div>
          <div className="text-[11px] text-[#64748B] mt-0.5 flex items-center justify-between">
            <span>{student.targetExamLabel}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#35C978]" />
          </div>
        </div>

        {/* Primary Navigation List */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto" aria-label="Student Navigation">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#E0F4FD] text-[#00A8F0] font-semibold border border-[#BAE6FD] shadow-xs'
                    : 'text-[#64748B] hover:text-[#12365A] hover:bg-[#F5F8FC]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isActive ? 'text-[#00A8F0]' : 'text-[#64748B]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#00A8F0] text-white'
                        : 'bg-slate-100 text-[#64748B]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Public Link & Logout */}
        <div className="p-4 border-t border-[#e2e8f0] space-y-2">
          {/* Quick Scenario Toggle (Testing / Demonstration helper) */}
          {onToggleScenario && (
            <div className="p-2 rounded-xl bg-slate-50 border border-[#e2e8f0] text-[11px] text-left">
              <span className="text-[#64748b] block mb-1 font-medium">Dashboard Scenario:</span>
              <div className="flex rounded-lg bg-white p-0.5 border border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => onToggleScenario('active')}
                  className={`flex-1 py-1 rounded text-center font-semibold transition-all ${
                    scenario === 'active'
                      ? 'bg-[#00A8F0] text-white'
                      : 'text-[#64748B] hover:text-[#12365A]'
                  }`}
                >
                  Active Student
                </button>
                <button
                  type="button"
                  onClick={() => onToggleScenario('new')}
                  className={`flex-1 py-1 rounded text-center font-semibold transition-all ${
                    scenario === 'new'
                      ? 'bg-[#00A8F0] text-white'
                      : 'text-[#64748B] hover:text-[#12365A]'
                  }`}
                >
                  New Student
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => onNavigatePublic('home')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#64748B] hover:text-[#00A8F0] hover:bg-[#F5F8FC] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">public</span>
              <span>View Public Website</span>
            </span>
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-[#DC3545] hover:bg-red-50 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN CONTENT AREA & AUTHENTICATED TOP HEADER             */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-subtle">
          {/* Left: Mobile Toggle & Breadcrumb Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-[#64748B] hover:bg-[#F5F8FC] focus:outline-none cursor-pointer"
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div className="text-left">
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <span>Student Panel</span>
                <span>/</span>
                <span className="font-semibold text-[#00A8F0] capitalize">
                  {currentSection === 'dashboard' ? 'Overview' : currentSection}
                </span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl text-[#12365A] font-bold leading-tight hidden sm:block">
                {currentSection === 'dashboard'
                  ? 'Student Dashboard'
                  : currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
              </h1>
            </div>
          </div>

          {/* Right: Branch Pill, Notifications, User Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Branch indicator pill (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E0F4FD] border border-[#BAE6FD] text-xs font-semibold text-[#00A8F0]">
              <span className="w-2 h-2 rounded-full bg-[#00A8F0] animate-pulse" />
              <span>{student.branchName}</span>
              <span className="text-[#64748B]">&middot;</span>
              <span className="text-[#12365A] font-normal">{student.batchName}</span>
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2.5 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#64748B] hover:text-[#00A8F0] border border-[#E2E8F0] transition-colors focus:outline-none cursor-pointer shadow-xs"
                aria-label={`Notifications (${unreadNotifsCount} unread)`}
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC3545]" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {notifDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setNotifDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-modal border border-[#E2E8F0] p-4 z-30 animate-in fade-in duration-150 text-left">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-[#12365A]">
                          Notifications
                        </span>
                        {unreadNotifsCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#E0F4FD] text-[#00A8F0] text-[10px] font-bold">
                            {unreadNotifsCount} new
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setNotifDropdownOpen(false)}
                        className="text-xs text-[#64748B] hover:text-[#12365A] cursor-pointer"
                      >
                        Close
                      </button>
                    </div>

                    <div className="divide-y divide-[#E2E8F0] max-h-72 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`py-3 text-xs ${
                              !n.isRead ? 'bg-[#E0F4FD]/30 -mx-4 px-4' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-[#12365A]">{n.title}</span>
                              <span className="text-[10px] text-[#64748B] shrink-0">
                                {n.timestamp}
                              </span>
                            </div>
                            <p className="text-[#64748B] mt-1 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="py-6 text-center text-xs text-[#64748B]">
                          No notifications right now.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Student Avatar & Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-[#F5F8FC] border border-[#E2E8F0] text-left transition-colors focus:outline-none cursor-pointer shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#00A8F0] text-white flex items-center justify-center text-xs font-bold uppercase shadow-xs">
                  {student.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-[#12365A] truncate max-w-[120px]">
                    {student.name}
                  </div>
                  <div className="text-[10px] text-[#64748B] truncate max-w-[120px]">
                    {student.enrollmentNumber}
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#64748B] hidden sm:block">
                  expand_more
                </span>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-modal border border-[#E2E8F0] p-2 z-30 animate-in fade-in duration-150 text-left text-xs">
                    <div className="p-3 border-b border-[#E2E8F0]">
                      <div className="font-semibold text-[#12365A]">{student.name}</div>
                      <div className="text-[#64748B] text-[11px] truncate">{student.email}</div>
                      <div className="text-[#00A8F0] text-[11px] font-medium mt-1">
                        {student.targetExamLabel}
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleNavClick('profile');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#64748B] hover:text-[#12365A] hover:bg-[#F5F8FC] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">account_circle</span>
                        <span>View Profile &amp; Enrollment</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onNavigatePublic('home');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#64748B] hover:text-[#12365A] hover:bg-[#F5F8FC] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">public</span>
                        <span>Public Portal</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-[#E2E8F0]">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#DC3545] hover:bg-red-50 font-semibold cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* ======================================================== */}
      {/* MOBILE DRAWER NAVIGATION                                 */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#12365A]/50 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full flex flex-col z-10 p-6 shadow-modal">
            {/* Header with Logo */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F5F8FC] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Branch Info */}
            <div className="my-4 p-3 rounded-lg bg-[#E0F4FD] border border-[#BAE6FD] text-left text-xs">
              <div className="font-bold text-[#00A8F0]">{student.instituteName}</div>
              <div className="text-[#12365A] font-medium">{student.branchName}</div>
              <div className="text-[11px] text-[#64748B]">{student.targetExamLabel}</div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-1 overflow-y-auto text-left">
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer ${
                      isActive
                        ? 'bg-[#E0F4FD] text-[#00A8F0] font-semibold border border-[#BAE6FD]'
                        : 'text-[#64748B] hover:text-[#12365A] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#00A8F0]' : 'text-[#64748B]'}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-[#00A8F0] text-white' : 'bg-slate-100 text-[#64748B]'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigatePublic('home');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#64748B] hover:text-[#00A8F0] hover:bg-[#F5F8FC] cursor-pointer"
              >
                <span>View Public Website</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-[#DC3545] hover:bg-red-50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPanelLayout;
