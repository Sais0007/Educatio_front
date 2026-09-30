import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-xs text-[#64748b]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span className="material-symbols-outlined text-[14px] text-[#cbd5e1] select-none">
                  chevron_right
                </span>
              )}
              {isLast ? (
                <span
                  className="font-semibold text-[#0b1c30]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-[#0369a1] transition-colors focus:outline-none focus:underline"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href || '#'}
                  className="hover:text-[#0369a1] transition-colors focus:outline-none focus:underline"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
