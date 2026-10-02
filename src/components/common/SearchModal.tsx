import React, { useState, useEffect, useRef } from 'react';
import { SEARCH_INDEX } from '../../data/mockData';
import { SearchResultItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (href: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(SEARCH_INDEX.slice(0, 4));
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults(SEARCH_INDEX.slice(0, 4));
      return;
    }
    const q = val.toLowerCase();
    const filtered = SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
    setResults(filtered);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#12365A]/40 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-modal border border-[#E2E8F0] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E2E8F0] gap-3">
          <span className="material-symbols-outlined text-[#00A8F0] text-[22px]">
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search syllabus, courses, formula sheets, mock tests..."
            className="w-full bg-transparent text-[#12365A] placeholder:text-[#94A3B8] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="text-xs text-[#94A3B8] hover:text-[#12365A]"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-[#64748B] bg-[#F5F8FC] rounded border border-[#E2E8F0]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-[#E2E8F0]/60">
          {results.length > 0 ? (
            results.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  if (onNavigate) {
                    onNavigate(item.href);
                  } else {
                    window.location.hash = item.href;
                  }
                }}
                className="flex items-start justify-between p-3 rounded-lg hover:bg-[#F5F8FC] transition-colors group cursor-pointer"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-[#00A8F0] uppercase tracking-wider mb-0.5">
                    {item.category}
                  </span>
                  <span className="text-sm font-semibold text-[#12365A] group-hover:text-[#00A8F0] transition-colors font-serif">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="text-xs text-[#64748B] mt-0.5">
                      {item.description}
                    </span>
                  )}
                </div>
                <span className="material-symbols-outlined text-[#94A3B8] group-hover:text-[#00A8F0] text-[18px] mt-1 transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </a>
            ))
          ) : (
            <div className="py-10 text-center text-[#64748B] text-sm">
              No results found for &ldquo;<span className="text-[#12365A] font-semibold">{query}</span>&rdquo;
            </div>
          )}
        </div>

        {/* Quick Filter Footer */}
        <div className="px-4 py-2.5 bg-[#F5F8FC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span>Tip: Filter by typing &quot;Physics&quot;, &quot;Mock&quot;, or &quot;Calculus&quot;</span>
          <span className="font-sans text-[11px] text-[#00A8F0] font-medium">Education Platform Search</span>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
