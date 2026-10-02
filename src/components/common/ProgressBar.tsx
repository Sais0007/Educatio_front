import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'yellow';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercent = true,
  color = 'blue',
  height = 'md',
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const isCompleted = clampedValue >= 100;

  // DESIGN.md: Blue is default learning progress; Green is completed state
  const resolvedColor = isCompleted ? 'green' : color;

  const colorClasses = {
    blue: 'bg-[#00A8F0]',
    green: 'bg-[#35C978]',
    purple: 'bg-[#6C63D9]',
    yellow: 'bg-[#F6C20F]',
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full space-y-1 font-sans ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-medium text-[#12365A]">{label}</span>}
          {showPercent && (
            <span className="font-semibold text-[#12365A] ml-auto">
              {clampedValue}% Complete
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#E2E8F0] rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} rounded-full transition-all duration-300 ${colorClasses[resolvedColor]}`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
