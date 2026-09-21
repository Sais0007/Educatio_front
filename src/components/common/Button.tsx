import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-primary-container hover:bg-primary text-on-primary shadow-sm hover:shadow active:scale-[0.99] border border-transparent',
    secondary:
      'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/50 hover:border-primary/40 shadow-xs',
    tertiary:
      'bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
    </button>
  );
};
