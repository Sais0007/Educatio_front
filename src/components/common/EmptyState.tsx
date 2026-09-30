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
    <div className="w-full py-16 px-6 bg-white rounded-2xl border border-[#e2e8f0] text-center max-w-xl mx-auto shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] border border-[#cde5ff] text-[#0369a1] flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h3 className="font-serif text-xl sm:text-2xl text-[#0b1c30] font-medium mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#40474f] leading-relaxed mb-6 max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-6 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#0369a1] text-[#0369a1] hover:text-white text-xs font-semibold border border-[#cde5ff] transition-all duration-150 inline-flex items-center gap-2"
        >
          <span>{actionLabel}</span>
          <span className="material-symbols-outlined text-[16px]">refresh</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
