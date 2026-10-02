import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'navy' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium font-sans transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8F0] focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#00A8F0] hover:bg-[#0092D1] text-white shadow-xs hover:shadow active:scale-[0.99] border border-transparent',
    navy:
      'bg-[#12365A] hover:bg-[#0E2C4A] text-white shadow-xs hover:shadow active:scale-[0.99] border border-transparent',
    secondary:
      'bg-[#E0F4FD] hover:bg-[#BAE6FD] text-[#00A8F0] border border-[#BAE6FD] shadow-xs active:scale-[0.99]',
    tertiary:
      'bg-transparent hover:bg-[#F5F8FC] text-[#64748B] hover:text-[#12365A] border border-[#E2E8F0]',
    ghost:
      'bg-transparent hover:bg-[#F5F8FC] text-[#12365A] hover:text-[#00A8F0]',
    destructive:
      'bg-[#DC3545] hover:bg-[#B02A37] text-white shadow-xs active:scale-[0.99] border border-transparent focus:ring-[#DC3545]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && (
          <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
        )
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
      )}
    </button>
  );
};
