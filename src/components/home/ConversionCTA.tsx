import React from 'react';

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
      <div className="bg-white rounded-3xl p-10 sm:p-16 lg:p-20 shadow-elevated border border-[#e2e8f0] relative overflow-hidden text-center">
        {/* Subtle Atmospheric Glacial Refraction */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#eff4ff]/60 via-white to-[#eff4ff]/30 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          {/* Brand Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-[#eff4ff] border border-[#cde5ff] flex items-center justify-center text-[#0369a1] mx-auto shadow-xs">
            <span className="material-symbols-outlined text-[32px]">spa</span>
          </div>

          {/* Prominent Newsreader Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#0b1c30] tracking-tight leading-[1.08] font-normal">
            Your preparation starts here.
          </h2>

          {/* Supporting message as specified in business rule */}
          <p className="text-base sm:text-lg lg:text-xl text-[#40474f] leading-relaxed max-w-2xl mx-auto font-sans">
            Create your account, choose your Institute and Branch, and begin your preparation journey.
          </p>

          {/* Connected Flow Architecture Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-[#0369a1]">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#cde5ff] shadow-xs">Account</span>
            <span className="text-[#64748b]">&rarr;</span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#cde5ff] shadow-xs">Institute &amp; Branch</span>
            <span className="text-[#64748b]">&rarr;</span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#cde5ff] shadow-xs">Course</span>
            <span className="text-[#64748b]">&rarr;</span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#0369a1] text-white shadow-xs">Student</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-base font-semibold shadow-card hover:shadow-elevated transition-all duration-150 flex items-center justify-center gap-2.5 group"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#eff4ff] text-[#0b1c30] text-base font-semibold transition-all duration-150 border border-[#e2e8f0] shadow-xs"
            >
              Log In to Your Account
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-sm text-[#64748b] font-sans">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#059669] text-[18px]">
                check_circle
              </span>
              <span className="text-[#40474f] font-medium">Free student profile registration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#059669] text-[18px]">
                check_circle
              </span>
              <span className="text-[#40474f] font-medium">Institute &amp; Branch mapping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#059669] text-[18px]">
                check_circle
              </span>
              <span className="text-[#40474f] font-medium">No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionCTA;
