import React from 'react';

export type BadgeVariant =
  | 'blue'
  | 'purple'
  | 'green'
  | 'yellow'
  | 'red'
  | 'navy'
  | 'neutral'
  | 'course'
  | 'test'
  | 'live'
  | 'assignment'
  | 'completed'
  | 'due';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantMap: Record<BadgeVariant, string> = {
    blue: 'bg-[#00A8F0]/10 text-[#0089C4] border border-[#00A8F0]/25',
    course: 'bg-[#00A8F0]/10 text-[#0089C4] border border-[#00A8F0]/25',
    purple: 'bg-[#6C63D9]/10 text-[#5B52C7] border border-[#6C63D9]/25',
    test: 'bg-[#6C63D9]/10 text-[#5B52C7] border border-[#6C63D9]/25',
    green: 'bg-[#35C978]/15 text-[#15803D] border border-[#35C978]/30',
    live: 'bg-[#35C978]/15 text-[#15803D] border border-[#35C978]/30',
    completed: 'bg-[#35C978]/15 text-[#15803D] border border-[#35C978]/30',
    yellow: 'bg-[#F6C20F]/20 text-[#854D0E] border border-[#F6C20F]/40',
    assignment: 'bg-[#F6C20F]/20 text-[#854D0E] border border-[#F6C20F]/40',
    due: 'bg-[#F6C20F]/20 text-[#854D0E] border border-[#F6C20F]/40',
    red: 'bg-[#DC3545]/10 text-[#DC3545] border border-[#DC3545]/20',
    navy: 'bg-[#12365A]/10 text-[#12365A] border border-[#12365A]/20',
    neutral: 'bg-slate-100 text-[#64748B] border border-[#E2E8F0]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans font-medium rounded-full shrink-0 ${sizeClasses[size]} ${
        variantMap[variant] || variantMap.blue
      } ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[14px] leading-none shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
