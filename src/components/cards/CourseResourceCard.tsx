import React from 'react';
import { CourseResource, CourseResourceType } from '../../types';

interface CourseResourceCardProps {
  resource: CourseResource;
  onViewResource: (resource: CourseResource) => void;
}

export const CourseResourceCard: React.FC<CourseResourceCardProps> = ({
  resource,
  onViewResource,
}) => {
  // Color configuration and icons by resource type aligned with Education Platform tokens
  const getTypeBadge = (type: CourseResourceType) => {
    switch (type) {
      case 'Formula Sheet':
        return {
          chip: 'bg-[#FEFCE8] text-[#B45309] border-[#FEF08A]',
          icon: 'functions',
          label: 'Formula Sheet',
        };
      case 'DPP':
        return {
          chip: 'bg-[#F5F3FF] text-[#6C63D9] border-[#DDD6FE]',
          icon: 'assignment',
          label: 'Daily Practice Set',
        };
      case 'Previous Paper':
        return {
          chip: 'bg-[#E0F4FD] text-[#00A8F0] border-[#BAE6FD]',
          icon: 'history_edu',
          label: 'Previous Year Paper',
        };
      case 'Sample Report':
        return {
          chip: 'bg-[#E0F4FD] text-[#00A8F0] border-[#BAE6FD]',
          icon: 'analytics',
          label: 'Diagnostic Report',
        };
      case 'PDF':
      default:
        return {
          chip: 'bg-[#F5F8FC] text-[#12365A] border-[#E2E8F0]',
          icon: 'description',
          label: 'PDF Document',
        };
    }
  };

  const badgeConfig = getTypeBadge(resource.type);

  return (
    <div className="group bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#00A8F0] shadow-card hover:shadow-dropdown transition-all duration-150 flex flex-col justify-between text-left">
      <div className="space-y-3">
        {/* Top Meta Strip: Type Badge, Subject & Year */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeConfig.chip}`}
            >
              <span className="material-symbols-outlined text-[13px]">{badgeConfig.icon}</span>
              <span>{resource.type}</span>
            </span>
            {resource.subject && (
              <span className="text-[11px] font-medium text-[#64748B] bg-[#F5F8FC] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                {resource.subject}
              </span>
            )}
          </div>

          {resource.yearRange && (
            <span className="text-[11px] font-mono text-[#64748B]">
              {resource.yearRange}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewResource(resource)}
          className="font-serif text-base font-bold text-[#12365A] group-hover:text-[#00A8F0] transition-colors leading-snug cursor-pointer line-clamp-2"
          title={resource.title}
        >
          {resource.title}
        </h3>

        {/* Short Academic Description */}
        {resource.description && (
          <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed font-sans">
            {resource.description}
          </p>
        )}
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 mt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
          {resource.pageCount && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              <span>{resource.pageCount} Pages</span>
            </span>
          )}
          {resource.fileSize && (
            <>
              <span className="text-slate-300">·</span>
              <span className="font-mono">{resource.fileSize}</span>
            </>
          )}
          <span className="text-slate-300">·</span>
          <span className="inline-flex items-center gap-0.5 text-[#16A34A] font-medium">
            <span className="material-symbols-outlined text-[13px]">lock_open</span>
            <span>Free</span>
          </span>
        </div>

        {/* Auxiliary View Resource CTA */}
        <button
          type="button"
          onClick={() => onViewResource(resource)}
          className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#E0F4FD] text-[#00A8F0] font-semibold text-xs border border-[#00A8F0] transition-all duration-150 inline-flex items-center gap-1 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-1"
          aria-label={`View resource: ${resource.title}`}
        >
          <span>View Resource</span>
          <span className="material-symbols-outlined text-[15px]">visibility</span>
        </button>
      </div>
    </div>
  );
};
