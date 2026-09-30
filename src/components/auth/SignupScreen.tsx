import React, { useState } from 'react';
import { ExaminationType, InstituteBranchOption } from '../../types';

interface SignupScreenProps {
  onNavigateHome: () => void;
  onOpenLogin: () => void;
  onSignupSuccess?: (user: { name: string; email: string }) => void;
  onNavigateExaminations?: () => void;
}

const INSTITUTE_BRANCH_OPTIONS: InstituteBranchOption[] = [
  {
    id: 'apex-delhi',
    instituteName: 'Apex Academy',
    branchName: 'North Campus Branch',
    displayName: 'Apex Academy — North Campus Branch',
    city: 'New Delhi',
    isOnline: false,
  },
  {
    id: 'zenith-pune',
    instituteName: 'Zenith Institute',
    branchName: 'South City Branch',
    displayName: 'Zenith Institute — South City Branch',
    city: 'Pune',
    isOnline: false,
  },
  {
    id: 'sanctuary-bengaluru',
    instituteName: 'Sanctuary Fellows',
    branchName: 'Bengaluru Core Branch',
    displayName: 'Sanctuary Fellows — Bengaluru Branch',
    city: 'Bengaluru',
    isOnline: false,
  },
  {
    id: 'olympiad-national',
    instituteName: 'National Foundation',
    branchName: 'Digital / Distance Branch',
    displayName: 'National Foundation — Digital Branch',
    city: 'National (Online)',
    isOnline: true,
  },
  {
    id: 'direct-scholar',
    instituteName: 'Aura Sanctuary',
    branchName: 'Independent Scholar Track',
    displayName: 'Direct Platform Scholar (Independent Track)',
    city: 'Global',
    isOnline: true,
  },
];

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onNavigateHome,
  onOpenLogin,
  onSignupSuccess,
  onNavigateExaminations,
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [targetExam, setTargetExam] = useState<ExaminationType>('jee-adv');
  const [instituteBranch, setInstituteBranch] = useState('apex-delhi');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Submission & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    mobile?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
    general?: string;
  }>({});

  const validateForm = (): boolean => {
    const errs: typeof errors = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full legal name is required.';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Please enter at least 2 characters.';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!mobile.trim()) {
      errs.mobile = 'Mobile contact number is required.';
    } else if (!/^\+?[\d\s-]{10,14}$/.test(mobile.trim())) {
      errs.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      errs.agreeTerms = 'You must accept the Terms of Service and Honor Code to continue.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    // Realistic API interaction simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSignupSuccess) {
        onSignupSuccess({
          name: fullName.trim(),
          email: email.trim(),
        });
      }
    }, 800);
  };

  const selectedBranchData = INSTITUTE_BRANCH_OPTIONS.find((b) => b.id === instituteBranch);

  return (
    <div className="w-full min-h-screen bg-background text-on-surface flex flex-col font-sans">
      {/* Subtle Ambient Light Strip */}
      <div className="w-full h-1 bg-gradient-to-r from-surface via-primary to-surface opacity-30" />

      {/* Atmospheric Glacial Sanctuary Ambient Glow */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-b from-[#cde5ff]/35 via-[#e5eeff]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-[#64748b]">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0369a1] transition-colors flex items-center gap-1 focus:outline-none focus:underline"
          >
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[#0b1c30] font-medium">Create Student Account</span>
        </nav>

        {!isSuccess ? (
          /* ======================================================== */
          /* SIGNUP FORM VIEW                                         */
          /* ======================================================== */
          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Header / Intro */}
            <div className="text-center mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-semibold tracking-wide border border-[#cde5ff]">
                <span className="material-symbols-outlined text-[14px]">school</span>
                <span>Institute &amp; Branch Registration · Academic Sanctuary</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0b1c30] tracking-tight leading-[1.1] font-normal">
                Begin your academic preparation
              </h1>

              <p className="text-sm sm:text-base text-[#40474f] max-w-lg mx-auto leading-relaxed">
                Connect your account to your Institute and Branch to unlock structured courses, mock test series, and personalized diagnostic feedback.
              </p>
            </div>

            {/* Architecture Explanatory Ribbon */}
            <div className="mb-8 p-3.5 rounded-2xl bg-[#eff4ff]/80 border border-[#cde5ff] flex items-center justify-between text-xs text-[#0369a1] shadow-xs">
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span>Platform Hierarchy:</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-[11px] sm:text-xs">
                <span className="bg-white px-2 py-0.5 rounded border border-[#cde5ff]">Platform</span>
                <span>&rarr;</span>
                <span className="bg-white px-2 py-0.5 rounded border border-[#cde5ff]">Institute</span>
                <span>&rarr;</span>
                <span className="bg-white px-2 py-0.5 rounded border border-[#cde5ff]">Branch</span>
                <span>&rarr;</span>
                <span className="bg-[#0369a1] text-white px-2 py-0.5 rounded">Student</span>
              </div>
            </div>

            {/* Main Card Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-elevated border border-[#e2e8f0]">
              <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
                {/* SECTION 1: Personal Details */}
                <div>
                  <h3 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider mb-4 pb-2 border-b border-[#e2e8f0] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#eff4ff] text-[#0369a1] flex items-center justify-center text-[11px] font-bold">1</span>
                    <span>Student Information</span>
                  </h3>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="signup-name"
                        className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                      >
                        Full Name <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                          <span className="material-symbols-outlined text-[18px]">person</span>
                        </div>
                        <input
                          id="signup-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="e.g. Rahul Sharma"
                          autoComplete="name"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#0b1c30] placeholder-[#94a3b8] transition-colors focus:outline-none focus:ring-2 ${
                            errors.fullName
                              ? 'border-error focus:border-error focus:ring-red-100'
                              : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-[#eff4ff]'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email and Mobile Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label
                          htmlFor="signup-email"
                          className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                        >
                          Email Address <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                          </div>
                          <input
                            id="signup-email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors({ ...errors, email: undefined });
                            }}
                            placeholder="student@example.com"
                            autoComplete="email"
                            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#0b1c30] placeholder-[#94a3b8] transition-colors focus:outline-none focus:ring-2 ${
                              errors.email
                                ? 'border-error focus:border-error focus:ring-red-100'
                                : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-[#eff4ff]'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Mobile */}
                      <div>
                        <label
                          htmlFor="signup-mobile"
                          className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                        >
                          Mobile Number <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                            <span className="material-symbols-outlined text-[18px]">call</span>
                          </div>
                          <input
                            id="signup-mobile"
                            type="tel"
                            value={mobile}
                            onChange={(e) => {
                              setMobile(e.target.value);
                              if (errors.mobile) setErrors({ ...errors, mobile: undefined });
                            }}
                            placeholder="10-digit mobile number"
                            autoComplete="tel"
                            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#0b1c30] placeholder-[#94a3b8] transition-colors focus:outline-none focus:ring-2 ${
                              errors.mobile
                                ? 'border-error focus:border-error focus:ring-red-100'
                                : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-[#eff4ff]'
                            }`}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Academic & Institute Affiliation */}
                <div>
                  <h3 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider mb-4 pb-2 border-b border-[#e2e8f0] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#eff4ff] text-[#0369a1] flex items-center justify-center text-[11px] font-bold">2</span>
                    <span>Academic Context &amp; Branch Affiliation</span>
                  </h3>

                  <div className="space-y-4">
                    {/* Target Examination */}
                    <div>
                      <label
                        htmlFor="signup-exam"
                        className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                      >
                        Target Examination <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                          <span className="material-symbols-outlined text-[18px]">target</span>
                        </div>
                        <select
                          id="signup-exam"
                          value={targetExam}
                          onChange={(e) => setTargetExam(e.target.value as ExaminationType)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#e2e8f0] text-sm text-[#0b1c30] appearance-none focus:outline-none focus:border-[#0369a1] focus:ring-2 focus:ring-[#eff4ff]"
                        >
                          <option value="jee-adv">JEE Advanced (IIT Entrance Track)</option>
                          <option value="jee-main">JEE Main (NTA Engineering Track)</option>
                          <option value="neet-ug">NEET-UG (National Medical Track)</option>
                          <option value="foundation">Foundation Track (Class 9-10 Early Scholars)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#64748b]">
                          <span className="material-symbols-outlined text-[20px]">expand_more</span>
                        </div>
                      </div>
                    </div>

                    {/* Affiliated Institute and Branch */}
                    <div>
                      <label
                        htmlFor="signup-branch"
                        className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                      >
                        Affiliated Institute &amp; Branch <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                          <span className="material-symbols-outlined text-[18px]">domain</span>
                        </div>
                        <select
                          id="signup-branch"
                          value={instituteBranch}
                          onChange={(e) => setInstituteBranch(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#e2e8f0] text-sm text-[#0b1c30] appearance-none focus:outline-none focus:border-[#0369a1] focus:ring-2 focus:ring-[#eff4ff]"
                        >
                          {INSTITUTE_BRANCH_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.displayName}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#64748b]">
                          <span className="material-symbols-outlined text-[20px]">expand_more</span>
                        </div>
                      </div>

                      {/* Branch Details Callout */}
                      {selectedBranchData && (
                        <div className="mt-2 p-3 rounded-xl bg-[#eff4ff]/60 border border-[#cde5ff] flex items-start gap-2.5 text-xs text-[#0369a1]">
                          <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">info</span>
                          <div>
                            <span className="font-semibold">{selectedBranchData.instituteName}</span> ({selectedBranchData.branchName}) &middot; Location: {selectedBranchData.city}
                            <p className="text-[11px] text-[#40474f] mt-0.5">
                              Enrolled courses, faculty batch rosters, and center mock sessions will link to this branch identity.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Account Credentials */}
                <div>
                  <h3 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider mb-4 pb-2 border-b border-[#e2e8f0] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#eff4ff] text-[#0369a1] flex items-center justify-center text-[11px] font-bold">3</span>
                    <span>Security &amp; Password</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Password */}
                    <div>
                      <label
                        htmlFor="signup-password"
                        className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                      >
                        Create Password <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                          <span className="material-symbols-outlined text-[18px]">key</span>
                        </div>
                        <input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({ ...errors, password: undefined });
                          }}
                          placeholder="Min. 8 characters"
                          autoComplete="new-password"
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border text-sm text-[#0b1c30] placeholder-[#94a3b8] transition-colors focus:outline-none focus:ring-2 ${
                            errors.password
                              ? 'border-error focus:border-error focus:ring-red-100'
                              : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-[#eff4ff]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748b] hover:text-[#0b1c30] transition-colors focus:outline-none"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label
                        htmlFor="signup-confirm-password"
                        className="block text-xs font-semibold text-[#40474f] uppercase tracking-wider mb-1.5"
                      >
                        Confirm Password <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                          <span className="material-symbols-outlined text-[18px]">verified_user</span>
                        </div>
                        <input
                          id="signup-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                          }}
                          placeholder="Re-enter password"
                          autoComplete="new-password"
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border text-sm text-[#0b1c30] placeholder-[#94a3b8] transition-colors focus:outline-none focus:ring-2 ${
                            errors.confirmPassword
                              ? 'border-error focus:border-error focus:ring-red-100'
                              : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-[#eff4ff]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748b] hover:text-[#0b1c30] transition-colors focus:outline-none"
                          aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Terms and Consent */}
                <div className="pt-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      id="signup-terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: undefined });
                      }}
                      className="w-4 h-4 mt-0.5 rounded border-[#cbd5e1] text-[#0369a1] focus:ring-[#0369a1]/30 cursor-pointer shrink-0"
                    />
                    <label htmlFor="signup-terms" className="text-xs text-[#40474f] leading-normal cursor-pointer select-none">
                      I agree to the <span className="text-[#0369a1] underline">Terms of Service</span>, <span className="text-[#0369a1] underline">Privacy Policy</span>, and academic <span className="text-[#0369a1] underline">Honor Code</span>. I understand my mock test scores and study analytics will remain strictly confidential.
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] disabled:opacity-60 text-white font-semibold text-base shadow-card hover:shadow-elevated transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Registering student credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Student Account</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Switch to Login Link */}
                <div className="pt-4 border-t border-[#e2e8f0] text-center text-sm text-[#40474f]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="font-bold text-[#0369a1] hover:text-[#0284c7] hover:underline focus:outline-none"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* REGISTRATION SUCCESS VIEW                                */
          /* ======================================================== */
          <div className="relative z-10 max-w-xl mx-auto animate-in zoom-in-95 duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-[#e2e8f0] text-center space-y-6">
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-2xl bg-academic-mastered-bg border border-academic-mastered/20 text-academic-mastered flex items-center justify-center mx-auto shadow-xs">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-semibold">
                  Account Verified
                </span>
                <h2 className="font-serif text-3xl font-normal text-[#0b1c30]">
                  Welcome to Aura Sanctuary, {fullName.split(' ')[0]}!
                </h2>
                <p className="text-sm text-[#40474f] leading-relaxed max-w-md mx-auto">
                  Your student account has been registered with{' '}
                  <span className="font-semibold text-[#0b1c30]">
                    {selectedBranchData?.displayName}
                  </span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-[#e2e8f0] text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#64748b]">Registered Email:</span>
                  <span className="font-semibold text-[#0b1c30]">{email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748b]">Target Examination:</span>
                  <span className="font-semibold text-[#0369a1] uppercase">{targetExam}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748b]">Affiliated Branch:</span>
                  <span className="font-semibold text-[#0b1c30]">{selectedBranchData?.branchName}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Go to Platform Home</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                {onNavigateExaminations && (
                  <button
                    type="button"
                    onClick={onNavigateExaminations}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-slate-50 text-[#0b1c30] font-semibold text-sm border border-[#e2e8f0] transition-colors"
                  >
                    Explore Examinations
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupScreen;
