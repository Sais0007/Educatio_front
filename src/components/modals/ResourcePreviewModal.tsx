import React, { useEffect } from 'react';
import { CourseResource } from '../../types';

interface ResourcePreviewModalProps {
  resource: CourseResource;
  onClose: () => void;
  onOpenDocument?: (resource: CourseResource) => void;
}

export const ResourcePreviewModal: React.FC<ResourcePreviewModalProps> = ({
  resource,
  onClose,
  onOpenDocument,
}) => {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/50 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-[#e2e8f0] text-left space-y-6 animate-scale-up relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#40474f] flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
          aria-label="Close preview"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Top Header Tag Strip */}
        <div className="flex items-center gap-2 flex-wrap pr-8">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#eff4ff] text-[#0369a1] border border-[#cde5ff]">
            <span className="material-symbols-outlined text-[14px]">description</span>
            <span>{resource.type}</span>
          </span>
          {resource.examinationName && (
            <span className="text-xs font-mono font-medium text-[#475569] bg-[#f1f5f9] px-2.5 py-0.5 rounded-md border border-[#e2e8f0]">
              {resource.examinationName}
            </span>
          )}
          {resource.subject && (
            <span className="text-xs font-medium text-[#64748b] bg-slate-100 px-2 py-0.5 rounded">
              {resource.subject}
            </span>
          )}
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">lock_open</span>
            <span>Free Access</span>
          </span>
        </div>

        {/* Resource Title & Description */}
        <div className="space-y-2">
          <h2
            id="preview-modal-title"
            className="font-serif text-2xl text-[#0b1c30] font-normal leading-snug"
          >
            {resource.title}
          </h2>
          {resource.description && (
            <p className="text-sm text-[#40474f] leading-relaxed font-sans font-normal">
              {resource.description}
            </p>
          )}
        </div>

        {/* Resource Details Box */}
        <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#64748b]">
            <span>Document Format</span>
            <span className="font-semibold text-[#0b1c30]">PDF Document</span>
          </div>
          {resource.pageCount && (
            <div className="flex items-center justify-between text-[#64748b]">
              <span>Page Length</span>
              <span className="font-semibold text-[#0b1c30]">{resource.pageCount} Pages</span>
            </div>
          )}
          {resource.fileSize && (
            <div className="flex items-center justify-between text-[#64748b]">
              <span>Estimated File Size</span>
              <span className="font-semibold text-[#0b1c30] font-mono">{resource.fileSize}</span>
            </div>
          )}
          {resource.yearRange && (
            <div className="flex items-center justify-between text-[#64748b]">
              <span>Academic Cohort / Year</span>
              <span className="font-semibold text-[#0b1c30]">{resource.yearRange}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[#64748b]">
            <span>Platform Status</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Centrally Curated &amp; Verified</span>
            </span>
          </div>
        </div>

        {/* Informative Note */}
        <p className="text-[11px] text-[#64748b] leading-relaxed">
          This academic document is provided open-access as companion study material for this course. No subscription or paid unlock required.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#40474f] text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              if (onOpenDocument) {
                onOpenDocument(resource);
              } else {
                alert(`Opening ${resource.title} (${resource.type})`);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-xs hover:shadow-card transition-all inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
          >
            <span>Open Resource</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
};
