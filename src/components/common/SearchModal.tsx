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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-elevated border border-outline-variant/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-outline-variant/30 gap-3">
          <span className="material-symbols-outlined text-outline text-[22px]">
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search syllabus, courses, formula sheets, mock tests..."
            className="w-full bg-transparent text-on-surface placeholder:text-outline text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="text-xs text-outline hover:text-on-surface"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-outline bg-surface-container rounded border border-outline-variant/40">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-outline-variant/20">
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
                className="flex items-start justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">
                    {item.category}
                  </span>
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="text-xs text-on-surface-variant mt-0.5">
                      {item.description}
                    </span>
                  )}
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px] mt-1 transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </a>
            ))
          ) : (
            <div className="py-10 text-center text-outline text-sm">
              No results found for &ldquo;<span className="text-on-surface">{query}</span>&rdquo;
            </div>
          )}
        </div>

        {/* Quick Filter Footer */}
        <div className="px-4 py-2.5 bg-surface-container-low/50 border-t border-outline-variant/30 flex items-center justify-between text-xs text-outline">
          <span>Tip: Filter by typing &quot;Physics&quot;, &quot;Mock&quot;, or &quot;Calculus&quot;</span>
          <span className="font-mono">Aura Search v1.0</span>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
