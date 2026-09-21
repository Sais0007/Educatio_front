import React, { useState } from 'react';
import { ResourceCard } from '../cards/ResourceCard';
import { FREE_RESOURCES } from '../../data/mockData';

interface FreeResourceVaultProps {
  onDownloadResource?: (id: string) => void;
}

export const FreeResourceVault: React.FC<FreeResourceVaultProps> = ({
  onDownloadResource,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredResources = filterQuery.trim()
    ? FREE_RESOURCES.filter(
        (r) =>
          r.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          r.subject.toLowerCase().includes(filterQuery.toLowerCase()) ||
          r.topic.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : FREE_RESOURCES;

  return (
    <section id="resources-section" className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
            Open Study Vault
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
            Companion Formula Sheets &amp; Compendiums
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 max-w-xl leading-relaxed">
            High-yield conceptual summaries, formula cheat sheets, and authenticated question banks available freely to all students.
          </p>
        </div>

        {/* Quick Resource Search Input */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search 450+ formula sheets..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-surface-variant shadow-xs transition-all duration-150"
          />
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {filteredResources.map((res) => (
          <ResourceCard
            key={res.id}
            resource={res}
            onDownload={onDownloadResource}
          />
        ))}
      </div>

      {/* Center Footer CTA */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setFilterQuery('')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold transition-colors duration-150"
        >
          <span>Access Free Resource Library (450+ Documents)</span>
          <span className="material-symbols-outlined text-[18px]">east</span>
        </button>
      </div>
    </section>
  );
};
