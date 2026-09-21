import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Hero } from './components/home/Hero';
import { ConnectedJourney } from './components/home/ConnectedJourney';
import { CourseShowcase } from './components/home/CourseShowcase';
import { TestSeriesShowcase } from './components/home/TestSeriesShowcase';
import { PracticeRevisionShowcase } from './components/home/PracticeRevisionShowcase';
import { PlatformInterfacePreview } from './components/home/PlatformInterfacePreview';
import { FreeResourceVault } from './components/home/FreeResourceVault';
import { VerifiedResults } from './components/home/VerifiedResults';
import { FAQAccordion } from './components/home/FAQAccordion';
import { ConversionCTA } from './components/home/ConversionCTA';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { ExaminationType, CohortYearType, PreparationNeed } from './types';

export const App: React.FC = () => {
  // Discovery State
  const [selectedExam, setSelectedExam] = useState<ExaminationType>('jee-adv');
  const [selectedYear, setSelectedYear] = useState<CohortYearType>(2026);
  const [selectedObjective, setSelectedObjective] = useState<PreparationNeed>('learning');

  // Modals & Auth State
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Status Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleNavigateObjective = (targetPath: string) => {
    const el = document.querySelector(targetPath);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnrolCourse = (courseId: string) => {
    if (!currentUser) {
      showToast(`Please sign in or create an account to enrol.`);
      handleOpenAuth('register');
    } else {
      showToast(`Initiating secure checkout for course ${courseId}...`);
    }
  };

  const handleExploreTestSeries = () => {
    showToast('Redirecting to full mock schedule & test series catalog...');
  };

  const handleTrySampleMock = () => {
    showToast('Loading free sample proctored CBT diagnostic environment...');
  };

  const handleStartDiagnostic = () => {
    showToast('Initializing 10-minute diagnostic benchmark assessment...');
  };

  const handleDownloadResource = (id: string) => {
    showToast(`Downloading verified formula compendium (${id})...`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-surface-variant selection:text-primary">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-lg shadow-elevated border border-outline-variant/30 flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[18px] text-secondary-container">
            info
          </span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-inverse-on-surface/60 hover:text-inverse-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Persistent Site Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Signed out successfully.');
        }}
      />

      {/* Main Public Home Content */}
      <main className="w-full pt-20">
        {/* Subtle Ambient Light Strip */}
        <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />

        {/* 1. Hero & Guided Profiler */}
        <Hero
          selectedExam={selectedExam}
          selectedYear={selectedYear}
          selectedObjective={selectedObjective}
          onSelectExam={setSelectedExam}
          onSelectYear={setSelectedYear}
          onSelectObjective={setSelectedObjective}
          onNavigateObjective={handleNavigateObjective}
          onStartDiagnostic={handleStartDiagnostic}
        />

        {/* 2. Connected Preparation Journey (6-Stage Continuum) */}
        <ConnectedJourney />

        {/* 3. Featured Courses & Batches Showcase */}
        <CourseShowcase onEnrolCourse={handleEnrolCourse} />

        {/* 4. High-Stakes Proctored Mock Test Series */}
        <TestSeriesShowcase
          onExploreTestSeries={handleExploreTestSeries}
          onTrySampleMock={handleTrySampleMock}
        />

        {/* 5. Deliberate Practice & Revision Suite */}
        <PracticeRevisionShowcase
          onOpenPractice={() => showToast('Opening derivation workspace mode...')}
          onOpenQuestionBank={() => showToast('Accessing 12,500+ past year questions repository...')}
        />

        {/* 6. Sanctuary Interface Demo & Focus Protection */}
        <PlatformInterfacePreview />

        {/* 7. Open Study Vault (Free Compendiums & PDFs) */}
        <FreeResourceVault onDownloadResource={handleDownloadResource} />

        {/* 8. Verified Candidate Reflections */}
        <VerifiedResults />

        {/* 9. Frequently Addressed Questions (Accordion) */}
        <FAQAccordion />

        {/* 10. Final Calm Conversion Banner */}
        <ConversionCTA
          onRegister={() => handleOpenAuth('register')}
          onExplore={() => handleNavigateObjective('#courses-section')}
        />
      </main>

      {/* Platform Footer */}
      <Footer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(href) => handleNavigateObjective(href)}
      />

      {/* Authentication & Profile Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
        onSuccess={(email) => {
          const name = email.split('@')[0];
          setCurrentUser({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            email,
          });
          showToast(`Welcome to Aura Sanctuary, ${email}`);
        }}
      />
    </div>
  );
};

export default App;
