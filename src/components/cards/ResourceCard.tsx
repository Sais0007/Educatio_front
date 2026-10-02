import React from 'react';
import { FreeResource } from '../../types';

interface ResourceCardProps {
  resource: FreeResource;
  onDownload?: (resourceId: string) => void;
  onPreview?: (resource: FreeResource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onDownload,
  onPreview,
}) => {
  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return {
          bar: 'bg-[#00A8F0]',
          badge: 'bg-[#E0F4FD] text-[#00A8F0] border border-[#BAE6FD]',
          icon: 'functions',
        };
      case 'mathematics':
        return {
          bar: 'bg-[#6C63D9]',
          badge: 'bg-[#F5F3FF] text-[#6C63D9] border border-[#DDD6FE]',
          icon: 'calculate',
        };
      case 'chemistry':
        return {
          bar: 'bg-[#35C978]',
          badge: 'bg-emerald-50 text-[#16A34A] border border-emerald-200',
          icon: 'science',
        };
      default:
        return {
          bar: 'bg-[#F6C20F]',
          badge: 'bg-[#FEFCE8] text-[#B45309] border border-[#FEF08A]',
          icon: 'fact_check',
        };
    }
  };

  const colors = getSubjectColor(resource.subject);

  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-dropdown transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] hover:border-[#00A8F0] group overflow-hidden text-left">
      <div>
        {/* Book/Document Cover Spine Simulation */}
        <div className={`h-2.5 w-full ${colors.bar}`} />

        <div className="p-6">
          {/* Document Type Badge & Format */}
          <div className="flex items-center justify-between mb-4">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}>
              {resource.subject}
            </span>
            <span className="text-[11px] font-mono text-[#64748B] font-semibold">
              {resource.format} · {resource.fileSize}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
            {resource.topic}
          </span>

          <h4
            onClick={() => onPreview && onPreview(resource)}
            className="font-serif text-base text-[#12365A] mb-2 leading-snug font-bold group-hover:text-[#00A8F0] transition-colors cursor-pointer"
          >
            {resource.title}
          </h4>

          <p className="text-xs text-[#64748B] mb-4 line-clamp-2 leading-relaxed">
            {resource.summary}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-mono">
            <span className="material-symbols-outlined text-[16px] text-[#00A8F0]">verified</span>
            <span>Reviewed: {resource.lastReviewed}</span>
          </div>
        </div>
      </div>

      {/* Document Action Footer */}
      <div className="px-6 py-4 bg-[#F5F8FC]/50 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#64748B] font-mono">
          {resource.downloads}
        </span>
        <button
          type="button"
          onClick={() => onDownload && onDownload(resource.id)}
          className="text-[#00A8F0] hover:text-[#0092D1] font-bold inline-flex items-center gap-1 text-xs cursor-pointer"
        >
          <span>Get Free PDF</span>
          <span className="material-symbols-outlined text-[16px]">download</span>
        </button>
      </div>
    </div>
  );
};
