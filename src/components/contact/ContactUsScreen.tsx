import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../common/Breadcrumb';
import { submitSupportTicket } from '../../services/supportService';
import { SupportTicketSubmission } from '../../types';

interface ContactUsScreenProps {
  onNavigateHome: () => void;
  onNavigateFAQ?: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  subject?: string;
  message?: string;
}

export const ContactUsScreen: React.FC<ContactUsScreenProps> = ({
  onNavigateHome,
  onNavigateFAQ,
}) => {
  // Form input state
  const [formData, setFormData] = useState<SupportTicketSubmission>({
    name: '',
    email: '',
    mobile: '',
    category: 'admissions',
    subject: '',
    message: '',
  });

  // Validation & Submission States
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', onClick: onNavigateHome },
    { label: 'Contact Us', isCurrent: true },
  ];

  // Client-Side Field Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters.';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. scholar@domain.com).';
    }

    // Mobile Validation (allows international and domestic numbers between 7 and 15 digits)
    const phoneDigits = formData.mobile.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Please enter your mobile contact number.';
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      newErrors.mobile = 'Please enter a valid mobile number (8 to 15 digits).';
    }

    // Subject Validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a brief subject for your enquiry.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    } else if (formData.subject.trim().length > 150) {
      newErrors.subject = 'Subject cannot exceed 150 characters.';
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your query or request.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a more detailed message (minimum 10 characters).';
    } else if (formData.message.trim().length > 3000) {
      newErrors.message = 'Message cannot exceed 3,000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Field Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  // Ticket Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitSupportTicket({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        category: formData.category,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (response.success && response.ticketId) {
        setSubmittedTicketId(response.ticketId);
      } else {
        setSubmitError(
          response.error || "We couldn't submit your request right now. Please try again."
        );
      }
    } catch {
      setSubmitError(
        "We couldn't submit your request right now due to a network issue. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to submit another request
  const handleReset = () => {
    setSubmittedTicketId(null);
    setSubmitError(null);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      category: 'admissions',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. Header Hero */}
        <section aria-labelledby="contact-heading" className="text-left mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] text-[#0369a1] text-xs font-bold uppercase tracking-wider border border-[#cde5ff]">
            <span className="material-symbols-outlined text-[15px]">support_agent</span>
            <span>Support &amp; Academic Desk</span>
          </div>

          <h1
            id="contact-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0b1c30] tracking-tight leading-tight font-normal"
          >
            Contact Us
          </h1>

          <p className="text-base sm:text-lg text-[#40474f] max-w-2xl leading-relaxed font-sans font-normal">
            Have questions regarding accredited Institute affiliations, academic curriculum tracks, or technical support? Submit a support ticket directly to our administration team.
          </p>
        </section>

        {/* 2. Main Content Layout (Form + Info Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Ticket Submission Form or Success Confirmation (8 cols) */}
          <div className="lg:col-span-8">
            {submittedTicketId ? (
              /* Success State Confirmation Card */
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2e8f0] shadow-xs text-left space-y-6 animate-scale-up">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">verified</span>
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    Ticket Dispatched to Super Admin
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#0b1c30] font-normal">
                    Your request has been submitted.
                  </h2>
                  <p className="text-sm sm:text-base text-[#40474f] leading-relaxed font-sans">
                    Our academic desk will review your enquiry and respond to <strong className="font-semibold text-[#0b1c30]">{formData.email}</strong> within 1–2 business days.
                  </p>
                </div>

                {/* Ticket Details Summary */}
                <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-[#e2e8f0]/60">
                    <span className="text-[#64748b]">Reference Ticket ID</span>
                    <span className="font-mono font-bold text-[#0369a1] text-sm">
                      {submittedTicketId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#e2e8f0]/60">
                    <span className="text-[#64748b]">Subject</span>
                    <span className="font-semibold text-[#0b1c30]">{formData.subject}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#64748b]">Category</span>
                    <span className="capitalize font-semibold text-[#0b1c30]">
                      {formData.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 flex-wrap">
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="px-6 py-3 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-xs transition-all"
                  >
                    Back to Home
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0369a1] text-xs font-semibold border border-[#cde5ff] transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              /* Ticket Submission Form */
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e2e8f0] shadow-xs text-left">
                <div className="mb-6 space-y-1">
                  <h2 className="font-serif text-2xl text-[#0b1c30] font-normal">
                    Submit a Support Ticket
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748b]">
                    Please provide your contact information and query details below.
                  </p>
                </div>

                {/* Submission Failure Banner (Preserves User Input) */}
                {submitError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0 mt-0.5">
                      error
                    </span>
                    <div className="space-y-1">
                      <p className="font-semibold">Unable to submit ticket</p>
                      <p className="text-red-700 leading-relaxed">{submitError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="ticket-name"
                        className="block text-xs font-semibold text-[#0b1c30]"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ticket-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="e.g. Vikram Sharma"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#0b1c30] placeholder-[#94a3b8] bg-white transition-all focus:outline-none ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-2 focus:ring-[#e0f2fe]'
                        }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                      />
                      {errors.name && (
                        <p id="error-name" className="text-[11px] text-red-600 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="ticket-email"
                        className="block text-xs font-semibold text-[#0b1c30]"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ticket-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="e.g. vikram@domain.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#0b1c30] placeholder-[#94a3b8] bg-white transition-all focus:outline-none ${
                          errors.email
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-2 focus:ring-[#e0f2fe]'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                      />
                      {errors.email && (
                        <p id="error-email" className="text-[11px] text-red-600 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Mobile Number & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Mobile Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="ticket-mobile"
                        className="block text-xs font-semibold text-[#0b1c30]"
                      >
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ticket-mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#0b1c30] placeholder-[#94a3b8] bg-white transition-all focus:outline-none ${
                          errors.mobile
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-2 focus:ring-[#e0f2fe]'
                        }`}
                        aria-invalid={!!errors.mobile}
                        aria-describedby={errors.mobile ? 'error-mobile' : undefined}
                      />
                      {errors.mobile && (
                        <p id="error-mobile" className="text-[11px] text-red-600 font-medium">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* Category Selector */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="ticket-category"
                        className="block text-xs font-semibold text-[#0b1c30]"
                      >
                        Enquiry Category
                      </label>
                      <select
                        id="ticket-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-sm text-[#0b1c30] bg-white focus:outline-none focus:border-[#0369a1] focus:ring-2 focus:ring-[#e0f2fe] transition-all"
                      >
                        <option value="admissions">Admissions &amp; Institute Affiliation</option>
                        <option value="academic">Academic &amp; Derivation Questions</option>
                        <option value="technical">Technical &amp; CBT Portal Support</option>
                        <option value="general">General Information</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Subject */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ticket-subject"
                      className="block text-xs font-semibold text-[#0b1c30]"
                    >
                      Subject / Topic <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ticket-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="e.g. Enquiry regarding Pune Branch classroom cohort schedule"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#0b1c30] placeholder-[#94a3b8] bg-white transition-all focus:outline-none ${
                        errors.subject
                          ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-2 focus:ring-[#e0f2fe]'
                      }`}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'error-subject' : undefined}
                    />
                    {errors.subject && (
                      <p id="error-subject" className="text-[11px] text-red-600 font-medium">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ticket-message"
                      className="block text-xs font-semibold text-[#0b1c30]"
                    >
                      Message / Request Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="ticket-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Please provide details about your query, student target examination, or technical requirement..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0b1c30] placeholder-[#94a3b8] bg-white transition-all resize-y focus:outline-none ${
                        errors.message
                          ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-[#e2e8f0] focus:border-[#0369a1] focus:ring-2 focus:ring-[#e0f2fe]'
                      }`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                    />
                    <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                      <span>{errors.message ? (
                        <span id="error-message" className="text-red-600 font-medium">{errors.message}</span>
                      ) : (
                        <span>Minimum 10 characters</span>
                      )}</span>
                      <span>{formData.message.length} / 3000</span>
                    </div>
                  </div>

                  {/* Submission Action & Anti-Abuse Notice */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-7 py-3.5 rounded-xl bg-[#0369a1] text-white text-sm font-semibold shadow-xs hover:bg-[#0284c7] transition-all duration-150 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0369a1] focus:ring-offset-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-card'
                      }`}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Ticket...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Ticket</span>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-[#64748b] leading-tight max-w-xs">
                      Protected by automated rate limiting. Submissions are dispatched directly to the Super Admin queue.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT: Supporting Contact Context & FAQ Quick Link (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {/* Direct Academic Contact Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-xs space-y-5">
              <h3 className="font-serif text-lg font-medium text-[#0b1c30]">
                Academic Desk &amp; Hours
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0b1c30] block">Operating Hours</span>
                    <p className="text-[#64748b] mt-0.5">Monday to Saturday: 09:00 – 18:30 IST</p>
                    <p className="text-[#64748b]">Closed on National Holidays</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">domain</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0b1c30] block">Central Academic Office</span>
                    <p className="text-[#64748b] mt-0.5">National Academic Coordination Centre</p>
                    <p className="text-[#64748b]">New Delhi &amp; Pune Administrative Hubs</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">security</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0b1c30] block">Data Confidentiality</span>
                    <p className="text-[#64748b] mt-0.5">
                      Your contact information is strictly used for ticket resolution and never shared with commercial telemarketers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to FAQ */}
            <div className="bg-[#eff4ff]/60 rounded-3xl p-6 sm:p-7 border border-[#cde5ff] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0369a1] uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">help_outline</span>
                <span>Immediate Answers</span>
              </div>
              <h4 className="font-serif text-base font-semibold text-[#0b1c30]">
                Have a common question?
              </h4>
              <p className="text-xs text-[#40474f] leading-relaxed">
                Check our Frequently Asked Questions for fast answers regarding course enrollments, examination patterns, and test formats.
              </p>
              {onNavigateFAQ && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onNavigateFAQ}
                    className="text-xs font-bold text-[#0369a1] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Browse All FAQs</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsScreen;
