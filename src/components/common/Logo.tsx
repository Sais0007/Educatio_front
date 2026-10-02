import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  onClick,
}) => {
  // Height constraints that preserve aspect ratio without vertical or horizontal stretching
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <img
        src="/logo_image.png"
        alt="Education Platform — Learn • Practice • Test • Grow"
        className={`${heightClasses[size]} w-auto object-contain max-w-full`}
        loading="eager"
      />
    </div>
  );
};

export default Logo;
