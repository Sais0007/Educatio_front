import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: (userEmail: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedExam, setSelectedExam] = useState('jee-adv');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSuccess) onSuccess(email);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-elevated border border-outline-variant/40 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Brand Icon & Heading */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">spa</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium text-on-surface leading-tight">
              {mode === 'login' ? 'Welcome Back' : 'Begin Your Preparation'}
            </h3>
            <p className="text-xs text-on-surface-variant">
              {mode === 'login'
                ? 'Sign in to access your courses, tests & analysis'
                : 'Create your authenticated student profile'}
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 bg-surface-container rounded-lg mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setStep('input');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'login'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setStep('input');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'register'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Create Account
          </button>
        </div>

        {step === 'input' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-bright border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-surface-variant"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Primary Target Examination
                  </label>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-bright border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-surface-variant"
                  >
                    <option value="jee-adv">JEE Advanced</option>
                    <option value="jee-main">JEE Main</option>
                    <option value="neet-ug">NEET-UG</option>
                    <option value="foundation">Foundation (Class 9-10)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Email Address or Mobile Number
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com or 10-digit mobile"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-bright border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-surface-variant"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <span className="text-xs">Sending Security Code...</span>
              ) : (
                <>
                  <span>Send Authentication Code</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Enter 6-digit Code
                </label>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-primary hover:underline"
                >
                  Change Email
                </button>
              </div>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest font-mono text-xl py-2.5 rounded-lg bg-surface-bright border border-outline-variant/50 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-surface-variant"
              />
              <p className="text-[11px] text-outline mt-1 text-center">
                Mock code sent to <span className="text-on-surface font-medium">{email}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="text-xs">Verifying Credentials...</span>
              ) : (
                <>
                  <span>Verify &amp; Enter Platform</span>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security & Consent Footer */}
        <div className="mt-6 pt-4 border-t border-outline-variant/30 text-center text-[11px] text-outline">
          Single identity across courses, tests, and analytics · AES-256 encrypted session
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
