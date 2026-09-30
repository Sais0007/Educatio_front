import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Hero } from './components/home/Hero';
import { ConnectedJourney } from './components/home/ConnectedJourney';
import { CoreExperiences } from './components/home/CoreExperiences';
import { WhyStudentsChooseUs } from './components/home/WhyStudentsChooseUs';
import { VerifiedResults } from './components/home/VerifiedResults';
import { HowItWorks } from './components/home/HowItWorks';
import { FAQAccordion } from './components/home/FAQAccordion';
import { ConversionCTA } from './components/home/ConversionCTA';
import { ExaminationListingScreen } from './components/examinations/ExaminationListingScreen';
import { PublicCourseListingScreen } from './components/courses/PublicCourseListingScreen';
import { PublicCourseDetailsScreen } from './components/courses/PublicCourseDetailsScreen';
import { PublicSampleTestListingScreen } from './components/tests/PublicSampleTestListingScreen';
import { PublicSampleTestDetailsScreen } from './components/tests/PublicSampleTestDetailsScreen';
import { AboutUsScreen } from './components/about/AboutUsScreen';
import { ContactUsScreen } from './components/contact/ContactUsScreen';
import { FAQScreen } from './components/faq/FAQScreen';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { LoginModal } from './components/modals/LoginModal';
import { SignupScreen } from './components/auth/SignupScreen';
import { ExaminationType, ScreenType } from './types';

export const App: React.FC = () => {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace('/', '');
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (path === 'about' || hash === 'about') return 'about';
      if (path === 'contact' || hash === 'contact') return 'contact';
      if (path === 'faq' || hash === 'faq') return 'faq';
      if (path === 'examinations' || hash === 'examinations') return 'examinations';
      if (path === 'courses' || hash === 'courses') return 'courses';
      if (path === 'tests' || hash === 'tests') return 'tests';
      if (path === 'signup' || hash === 'signup') return 'signup';
    }
    return 'home';
  });

  // Discovery & Track State
  const [selectedExam, setSelectedExam] = useState<ExaminationType>('jee-adv');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('pub-phy-kinematics');
  const [selectedTestId, setSelectedTestId] = useState<string>('test-jee-main-phy-01');

  // Modals & Auth State
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
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
    if (mode === 'login') {
      setLoginModalOpen(true);
    } else {
      handleNavigateScreen('signup');
    }
  };

  const handleScrollTo = (targetSelector: string) => {
    const el = document.querySelector(targetSelector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateScreen = (screen: ScreenType, anchor?: string) => {
    setCurrentScreen(screen);
    if (screen === 'home') {
      if (typeof window !== 'undefined') {
        window.history.pushState({ screen }, '', anchor || '/');
      }
      if (anchor) {
        setTimeout(() => handleScrollTo(anchor), 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (typeof window !== 'undefined') {
        window.history.pushState({ screen }, '', `/${screen}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Browser Back/Forward navigation support
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const stateScreen = e.state?.screen;
      if (stateScreen) {
        setCurrentScreen(stateScreen);
        return;
      }
      const path = window.location.pathname.toLowerCase().replace('/', '');
      if (
        path === 'about' ||
        path === 'contact' ||
        path === 'faq' ||
        path === 'examinations' ||
        path === 'courses' ||
        path === 'tests' ||
        path === 'signup'
      ) {
        setCurrentScreen(path as ScreenType);
      } else {
        setCurrentScreen('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleExploreExamination = (examId: ExaminationType) => {
    setSelectedExam(examId);
    showToast(`Selected ${examId.toUpperCase()}. Transitioning toward Examination Details (Screen 3)...`);
  };

  const handleExploreCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentScreen('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = (courseId: string) => {
    showToast(`Start Learning initiated for course: ${courseId}. (Clean integration point for future access flow)`);
  };

  const handleExploreTest = (testId: string) => {
    setSelectedTestId(testId);
    setCurrentScreen('test-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollToExploreTest = (testId: string) => {
    showToast(`"Enroll to Explore More" triggered for test: ${testId}. (Clean integration point for future authentication/access flow)`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-surface-variant selection:text-primary font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-elevated border border-outline-variant/30 flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[18px] text-secondary-container">
            info
          </span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-inverse-on-surface/60 hover:text-inverse-on-surface"
            aria-label="Dismiss toast"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Global Navigation Header (Consistently reused across screens) */}
      <Header
        currentScreen={currentScreen}
        onNavigateScreen={handleNavigateScreen}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Signed out successfully.');
        }}
      />

      {/* Conditional Screen Rendering */}
      {currentScreen === 'home' ? (
        /* SCREEN 1: Approved Guest Home Page */
        <main className="w-full pt-20">
          {/* Subtle Ambient Light Strip */}
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />

          {/* Section 2: Outcome-Driven Hero ('Get Started', 'Explore Examinations') */}
          <Hero
            onStartPreparation={() => handleNavigateScreen('signup')}
            onSeeHowItWorks={() => {
              setCurrentScreen('examinations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedExam={selectedExam}
            onSelectExam={(exam) => {
              setSelectedExam(exam);
              showToast(`Target examination set to ${exam.toUpperCase()}`);
            }}
          />

          {/* Section 3: The Core Preparation Journey (Enrolled Student Value Proposition) */}
          <ConnectedJourney />

          {/* Section 4: Three Core Experiences (Benefits: Learn, Practice, Improve through Institute & Branch) */}
          <CoreExperiences />

          {/* Section 5: Why Students Use The Platform (Benefit Storytelling & Sanctuary Contrast) */}
          <WhyStudentsChooseUs />

          {/* Section 6: Student Success (Authentic Verified Mark Recovery & Composure Stories) */}
          <VerifiedResults />

          {/* Section 7: How It Works (Guest → Account → Institute/Branch → Course → Student) */}
          <HowItWorks onStart={() => handleNavigateScreen('signup')} />

          {/* Section 8: FAQ & Final Conversion CTA ('Your preparation starts here.' + 'Get Started') */}
          <FAQAccordion />
          <ConversionCTA
            onGetStarted={() => handleNavigateScreen('signup')}
            onLogin={() => setLoginModalOpen(true)}
          />
        </main>
      ) : currentScreen === 'examinations' ? (
        /* SCREEN 2: Public Examination Listing Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <ExaminationListingScreen
            onNavigateHome={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreExamination={handleExploreExamination}
          />
        </main>
      ) : currentScreen === 'courses' ? (
        /* SCREEN: Public Free Course Listing Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <PublicCourseListingScreen
            onNavigateHome={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreCourse={handleExploreCourse}
            onNavigateExaminations={() => {
              setCurrentScreen('examinations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentScreen === 'course-details' ? (
        /* SCREEN: Public Free Course Details Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <PublicCourseDetailsScreen
            courseId={selectedCourseId}
            onNavigateHome={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToListing={() => {
              setCurrentScreen('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectRelatedCourse={(newId) => {
              setSelectedCourseId(newId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartLearning={handleStartLearning}
            onNavigateExaminations={() => {
              setCurrentScreen('examinations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentScreen === 'tests' ? (
        /* SCREEN: Public Sample Test Listing Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <PublicSampleTestListingScreen
            onNavigateHome={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEnrollToExplore={handleEnrollToExploreTest}
            onExploreTest={handleExploreTest}
            onNavigateExaminations={() => {
              setCurrentScreen('examinations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentScreen === 'test-details' ? (
        /* SCREEN: Public Sample Test Details Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <PublicSampleTestDetailsScreen
            testId={selectedTestId}
            onNavigateHome={() => handleNavigateScreen('home')}
            onBackToListing={() => handleNavigateScreen('tests')}
            onSelectRelatedTest={(newId) => {
              setSelectedTestId(newId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEnrollToExplore={handleEnrollToExploreTest}
            onNavigateExaminations={() => handleNavigateScreen('examinations')}
          />
        </main>
      ) : currentScreen === 'about' ? (
        /* SCREEN: About Us Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <AboutUsScreen
            onNavigateHome={() => handleNavigateScreen('home')}
            onExploreExaminations={() => handleNavigateScreen('examinations')}
            onStartPreparation={() => handleNavigateScreen('signup')}
          />
        </main>
      ) : currentScreen === 'contact' ? (
        /* SCREEN: Contact Us Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <ContactUsScreen
            onNavigateHome={() => handleNavigateScreen('home')}
            onNavigateFAQ={() => handleNavigateScreen('faq')}
          />
        </main>
      ) : currentScreen === 'faq' ? (
        /* SCREEN: Frequently Asked Questions Screen */
        <main className="w-full pt-20">
          <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />
          <FAQScreen
            onNavigateHome={() => handleNavigateScreen('home')}
            onNavigateContact={() => handleNavigateScreen('contact')}
          />
        </main>
      ) : currentScreen === 'signup' ? (
        /* SCREEN: Dedicated Student Signup Screen (Standalone Page) */
        <main className="w-full pt-20">
          <SignupScreen
            onNavigateHome={() => handleNavigateScreen('home')}
            onOpenLogin={() => setLoginModalOpen(true)}
            onSignupSuccess={(user) => {
              setCurrentUser(user);
              showToast(`Welcome to Aura Sanctuary, ${user.name}!`);
            }}
            onNavigateExaminations={() => handleNavigateScreen('examinations')}
          />
        </main>
      ) : null}

      {/* Public Platform Footer (Reused across screens) */}
      <Footer onNavigateScreen={handleNavigateScreen} />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(href) => {
          if (href === '#about' || href.includes('about')) {
            handleNavigateScreen('about');
          } else if (href === '#contact' || href.includes('contact')) {
            handleNavigateScreen('contact');
          } else if (href === '#faq' || href.includes('faq')) {
            handleNavigateScreen('faq');
          } else if (href === '#examinations' || href.includes('exam')) {
            handleNavigateScreen('examinations');
          } else if (href === '#courses' || href.includes('course')) {
            handleNavigateScreen('courses');
          } else if (href === '#tests' || href.includes('test')) {
            handleNavigateScreen('tests');
          } else if (href === '#signup' || href.includes('signup') || href.includes('register')) {
            handleNavigateScreen('signup');
          } else {
            handleNavigateScreen('home', href);
          }
        }}
      />

      {/* Reusable Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome to Aura Sanctuary, ${user.name}!`);
        }}
        onNavigateSignup={() => {
          setLoginModalOpen(false);
          handleNavigateScreen('signup');
        }}
      />
    </div>
  );
};

export default App;
