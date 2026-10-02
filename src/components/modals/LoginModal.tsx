import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../common/Logo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { name: string; email: string }) => void;
  onNavigateSignup: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onNavigateSignup,
}) => {
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const forgotInputRef = useRef<HTMLInputElement>(null);

  // Focus management and ESC key listener
  useEffect(() => {
    if (!isOpen) {
      // Reset temporary states on close
      setErrors({});
      setForgotError(null);
      setForgotSent(false);
      setView('login');
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus
    const timer = setTimeout(() => {
      if (view === 'login') {
        emailInputRef.current?.focus();
      } else {
        forgotInputRef.current?.focus();
      }
    }, 50);

    // Prevent body scroll when modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, view, onClose]);

  if (!isOpen) return null;

  const validateLoginForm = (): boolean => {
    const newErrors: { email?: string; password?: string; general?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address or student ID is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && !/^\d{6,12}$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address or student identifier.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsSubmitting(true);
    setErrors({});

    // Realistic API interaction simulation
    setTimeout(() => {
      setIsSubmitting(false);
      const cleanEmail = email.trim();
      const extractedName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

      if (onSuccess) {
        onSuccess({
          name: formattedName,
          email: cleanEmail,
        });
      }
      onClose();
    }, 700);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your registered email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setForgotError('Please enter a valid email format (e.g. name@domain.com).');
      return;
    }

    setForgotError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setForgotSent(true);
    }, 700);
  };

  const handleSignupTransition = () => {
    onClose();
    onNavigateSignup();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12365A]/50 backdrop-blur-sm animate-in fade-in duration-200 font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-modal border border-[#E2E8F0] p-6 sm:p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Top Ambient Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00A8F0] via-[#35C978] to-[#00A8F0]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-[#64748B] hover:text-[#12365A] hover:bg-[#F5F8FC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00A8F0] cursor-pointer"
          aria-label="Close modal (Esc)"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {view === 'login' ? (
          /* ======================================================== */
          /* VIEW 1: REUSABLE LOGIN MODAL                             */
          /* ======================================================== */
          <div>
            {/* Header / Brand Logo */}
            <div className="mb-5 text-left">
              <Logo size="sm" className="mb-3" />
              <h3 id="auth-modal-title" className="font-serif text-2xl font-bold text-[#12365A] tracking-tight leading-tight">
                Welcome Back
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Sign in to your Education Platform academic account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left" noValidate>
              {/* Email / ID Field */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                >
                  Email Address or Student ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </div>
                  <input
                    ref={emailInputRef}
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="student@example.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white border text-sm text-[#12365A] placeholder-[#94A3B8] transition-colors focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-[#DC3545] focus:border-[#DC3545] focus:ring-red-100'
                        : 'border-[#E2E8F0] focus:border-[#00A8F0] focus:ring-[#E0F4FD]'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-[#DC3545] mt-1 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="text-xs font-semibold text-[#12365A] uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setView('forgot');
                      setForgotEmail(email);
                    }}
                    className="text-xs font-semibold text-[#00A8F0] hover:text-[#0092D1] hover:underline transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <span className="material-symbols-outlined text-[18px]">key</span>
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    placeholder="Enter your account password"
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-white border text-sm text-[#12365A] placeholder-[#94A3B8] transition-colors focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'border-[#DC3545] focus:border-[#DC3545] focus:ring-red-100'
                        : 'border-[#E2E8F0] focus:border-[#00A8F0] focus:ring-[#E0F4FD]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#12365A] transition-colors focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#DC3545] mt-1 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#CBD5E1] text-[#00A8F0] focus:ring-[#00A8F0]/30 cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-xs text-[#64748B] cursor-pointer select-none">
                  Keep me signed in on this browser
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] disabled:opacity-50 text-white font-semibold text-sm shadow-xs hover:shadow transition-all duration-150 flex items-center justify-center gap-2 mt-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in securely...</span>
                  </>
                ) : (
                  <>
                    <span>Log In to Account</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Institute Association Helper Notice */}
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00A8F0]">verified</span>
                Verified Academic Account
              </span>
              <button
                type="button"
                onClick={handleSignupTransition}
                className="text-[#00A8F0] hover:text-[#0092D1] font-semibold hover:underline cursor-pointer"
              >
                Create student account &rarr;
              </button>
            </div>

            {/* Dedicated Signup Prompt */}
            <div className="mt-3 text-center text-xs text-[#64748B]">
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={handleSignupTransition}
                className="font-bold text-[#00A8F0] hover:underline focus:outline-none cursor-pointer"
              >
                Sign up here
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW 2: FORGOT PASSWORD INTERNAL STATE                    */
          /* ======================================================== */
          <div>
            {!forgotSent ? (
              <>
                {/* Header */}
                <div className="mb-5 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F4FD] border border-[#BAE6FD] flex items-center justify-center text-[#00A8F0] mb-3 shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">lock_reset</span>
                  </div>
                  <h3 id="auth-modal-title" className="font-serif text-2xl font-bold text-[#12365A] tracking-tight leading-tight">
                    Reset Password
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Enter your email to receive recovery instructions
                  </p>
                </div>

                <p className="text-xs text-[#64748B] text-left leading-relaxed mb-4">
                  We will send a secure password reset link to your verified account address. The link will remain valid for 30 minutes.
                </p>

                {/* Form */}
                <form onSubmit={handleForgotSubmit} className="space-y-4 text-left" noValidate>
                  <div>
                    <label
                      htmlFor="forgot-email"
                      className="block text-xs font-semibold text-[#12365A] uppercase tracking-wider mb-1.5"
                    >
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </div>
                      <input
                        ref={forgotInputRef}
                        id="forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value);
                          if (forgotError) setForgotError(null);
                        }}
                        placeholder="student@example.com"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white border text-sm text-[#12365A] placeholder-[#94A3B8] transition-colors focus:outline-none focus:ring-2 ${
                          forgotError
                            ? 'border-[#DC3545] focus:border-[#DC3545] focus:ring-red-100'
                            : 'border-[#E2E8F0] focus:border-[#00A8F0] focus:ring-[#E0F4FD]'
                        }`}
                      />
                    </div>
                    {forgotError && (
                      <p className="text-xs text-[#DC3545] mt-1 flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {forgotError}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] disabled:opacity-50 text-white font-semibold text-sm shadow-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching reset email...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Reset Link</span>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#64748B] hover:text-[#12365A] font-medium text-xs border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      <span>Back to Log In</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Security-Conscious Success Response */
              <div className="py-2 text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#35C978]/15 border border-[#35C978]/30 text-[#35C978] mx-auto flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl font-bold text-[#12365A]">
                    Reset Link Dispatched
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto">
                    If an account exists for <span className="font-semibold text-[#12365A]">{forgotEmail}</span>, you will receive a password reset link shortly.
                  </p>
                  <p className="text-[11px] text-[#94A3B8]">
                    Please check both your primary inbox and spam folder.
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotSent(false);
                      setView('login');
                    }}
                    className="w-full py-3 px-4 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Return to Log In</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
