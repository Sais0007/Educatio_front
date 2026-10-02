import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search_off',
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="w-full py-16 px-6 bg-white rounded-xl border border-[#E2E8F0] text-center max-w-xl mx-auto shadow-card font-sans">
      <div className="w-14 h-14 rounded-xl bg-[#E0F4FD] border border-[#BAE6FD] text-[#00A8F0] flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h3 className="font-serif text-xl sm:text-2xl text-[#12365A] font-bold mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#64748B] leading-relaxed mb-6 max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-6 py-2.5 rounded-lg bg-[#00A8F0] hover:bg-[#0092D1] text-white text-xs font-semibold shadow-xs hover:shadow transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>{actionLabel}</span>
          <span className="material-symbols-outlined text-[16px]">refresh</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
