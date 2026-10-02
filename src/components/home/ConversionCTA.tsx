import React from 'react';
import { Logo } from '../common/Logo';

interface ConversionCTAProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const ConversionCTA: React.FC<ConversionCTAProps> = ({
  onGetStarted,
  onLogin,
}) => {
  return (
    <section className="w-full pb-24 lg:pb-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl p-10 sm:p-16 lg:p-20 shadow-card border border-[#E2E8F0] relative overflow-hidden text-center">
        {/* Subtle Atmospheric Refraction */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E0F4FD]/30 via-white to-[#E0F4FD]/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          {/* Brand Emblem */}
          <div className="flex justify-center mx-auto">
            <Logo size="lg" />
          </div>

          {/* Prominent Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#12365A] tracking-tight leading-[1.08] font-bold">
            Your preparation starts here.
          </h2>

          {/* Supporting message */}
          <p className="text-base sm:text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto font-sans">
            Create your account, choose your Institute and Branch, and begin your preparation journey.
          </p>

          {/* Connected Flow Architecture Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-[#00A8F0]">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#BAE6FD] shadow-card">Account</span>
            <span className="text-[#64748B]">&rarr;</span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#BAE6FD] shadow-card">Institute &amp; Branch</span>
            <span className="text-[#64748B]">&rarr;</span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#BAE6FD] shadow-card">Course</span>
            <span className="text-[#64748B]">&rarr;</span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#00A8F0] text-white shadow-card">Student</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-9 py-3.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-base font-semibold shadow-card hover:shadow-dropdown transition-all duration-150 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white hover:bg-[#F5F8FC] text-[#12365A] text-base font-semibold transition-all duration-150 border border-[#E2E8F0] shadow-card cursor-pointer"
            >
              Log In to Your Account
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-sm text-[#64748B] font-sans">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#35C978] text-[18px]">
                check_circle
              </span>
              <span className="text-[#12365A] font-medium">Free student profile registration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#35C978] text-[18px]">
                check_circle
              </span>
              <span className="text-[#12365A] font-medium">Institute &amp; Branch mapping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#35C978] text-[18px]">
                check_circle
              </span>
              <span className="text-[#12365A] font-medium">No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionCTA;
