import React from 'react';
import { FreeResource } from '../../types';

interface ResourceCardProps {
  resource: FreeResource;
  onDownload?: (resourceId: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onDownload,
}) => {
  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return 'description';
      case 'mathematics':
        return 'functions';
      case 'chemistry':
        return 'science';
      default:
        return 'fact_check';
    }
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between border border-outline-variant/30 hover:border-primary/30 group">
      <div>
        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">
            {getSubjectIcon(resource.subject)}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-outline uppercase tracking-wider block mb-1">
          {resource.subject} · {resource.topic}
        </span>
        <h4 className="font-serif text-base text-on-surface mb-2 leading-snug font-medium group-hover:text-primary transition-colors">
          {resource.title}
        </h4>
        <p className="text-xs text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">
          {resource.summary}
        </p>
      </div>

      <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs">
        <span className="text-[11px] text-outline">
          {resource.format} · {resource.fileSize}
        </span>
        <button
          type="button"
          onClick={() => onDownload && onDownload(resource.id)}
          className="text-primary hover:text-primary-container font-semibold inline-flex items-center gap-1 hover:underline text-xs"
        >
          <span>Get Free</span>
          <span className="material-symbols-outlined text-[16px]">download</span>
        </button>
      </div>
    </div>
  );
};
