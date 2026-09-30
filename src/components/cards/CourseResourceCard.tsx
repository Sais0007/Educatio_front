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
  // Color configuration and icons by resource type aligned with Glacial Sanctuary tokens
  const getTypeBadge = (type: CourseResourceType) => {
    switch (type) {
      case 'Formula Sheet':
        return {
          chip: 'bg-amber-50 text-amber-900 border-amber-200',
          icon: 'functions',
          label: 'Formula Sheet',
        };
      case 'DPP':
        return {
          chip: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          icon: 'assignment',
          label: 'Daily Practice Set',
        };
      case 'Previous Paper':
        return {
          chip: 'bg-indigo-50 text-indigo-900 border-indigo-200',
          icon: 'history_edu',
          label: 'Previous Year Paper',
        };
      case 'Sample Report':
        return {
          chip: 'bg-sky-50 text-sky-900 border-sky-200',
          icon: 'analytics',
          label: 'Diagnostic Report',
        };
      case 'PDF':
      default:
        return {
          chip: 'bg-[#eff4ff] text-[#0369a1] border-[#cde5ff]',
          icon: 'description',
          label: 'PDF Document',
        };
    }
  };

  const badgeConfig = getTypeBadge(resource.type);

  return (
    <div className="group bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:border-[#0369a1]/40 shadow-xs hover:shadow-card transition-all duration-150 flex flex-col justify-between text-left">
      <div className="space-y-3">
        {/* Top Meta Strip: Type Badge, Subject & Year */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badgeConfig.chip}`}
            >
              <span className="material-symbols-outlined text-[13px]">{badgeConfig.icon}</span>
              <span>{resource.type}</span>
            </span>
            {resource.subject && (
              <span className="text-[11px] font-medium text-[#64748b] bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                {resource.subject}
              </span>
            )}
          </div>

          {resource.yearRange && (
            <span className="text-[11px] font-mono text-[#64748b]">
              {resource.yearRange}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewResource(resource)}
          className="font-serif text-base font-semibold text-[#0b1c30] group-hover:text-[#0369a1] transition-colors leading-snug cursor-pointer line-clamp-2"
          title={resource.title}
        >
          {resource.title}
        </h3>

        {/* Short Academic Description */}
        {resource.description && (
          <p className="text-xs text-[#40474f] line-clamp-2 leading-relaxed font-sans">
            {resource.description}
          </p>
        )}
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 mt-3 border-t border-[#f1f5f9] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
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
          <span className="inline-flex items-center gap-0.5 text-emerald-700 font-medium">
            <span className="material-symbols-outlined text-[13px]">lock_open</span>
            <span>Free</span>
          </span>
        </div>

        {/* Auxiliary View Resource CTA */}
        <button
          type="button"
          onClick={() => onViewResource(resource)}
          className="px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0369a1] font-semibold text-xs border border-[#cde5ff] transition-all duration-150 inline-flex items-center gap-1 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#0369a1] focus:ring-offset-1"
          aria-label={`View resource: ${resource.title}`}
        >
          <span>View Resource</span>
          <span className="material-symbols-outlined text-[15px]">visibility</span>
        </button>
      </div>
    </div>
  );
};
