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
          bar: 'bg-primary',
          badge: 'bg-primary-container text-on-primary',
          icon: 'functions',
        };
      case 'mathematics':
        return {
          bar: 'bg-secondary',
          badge: 'bg-secondary text-on-secondary',
          icon: 'calculate',
        };
      case 'chemistry':
        return {
          bar: 'bg-academic-mastered',
          badge: 'bg-academic-mastered text-white',
          icon: 'science',
        };
      default:
        return {
          bar: 'bg-tertiary',
          badge: 'bg-tertiary text-on-tertiary',
          icon: 'fact_check',
        };
    }
  };

  const colors = getSubjectColor(resource.subject);

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between border border-outline-variant/30 hover:border-primary/40 group overflow-hidden text-left">
      <div>
        {/* Book/Document Cover Spine Simulation */}
        <div className={`h-2.5 w-full ${colors.bar}`} />

        <div className="p-6">
          {/* Document Type Badge & Format */}
          <div className="flex items-center justify-between mb-4">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}>
              {resource.subject}
            </span>
            <span className="text-[11px] font-mono text-outline font-semibold">
              {resource.format} · {resource.fileSize}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">
            {resource.topic}
          </span>

          <h4
            onClick={() => onPreview && onPreview(resource)}
            className="font-serif text-base text-on-surface mb-2 leading-snug font-medium group-hover:text-primary transition-colors cursor-pointer"
          >
            {resource.title}
          </h4>

          <p className="text-xs text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">
            {resource.summary}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-outline font-mono">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
            <span>Reviewed: {resource.lastReviewed}</span>
          </div>
        </div>
      </div>

      {/* Document Action Footer */}
      <div className="px-6 py-4 bg-surface-container-low/40 border-t border-outline-variant/20 flex items-center justify-between text-xs">
        <span className="text-[11px] text-outline font-mono">
          {resource.downloads}
        </span>
        <button
          type="button"
          onClick={() => onDownload && onDownload(resource.id)}
          className="text-primary hover:text-primary-container font-bold inline-flex items-center gap-1 text-xs"
        >
          <span>Get Free PDF</span>
          <span className="material-symbols-outlined text-[16px]">download</span>
        </button>
      </div>
    </div>
  );
};
