import { useState } from 'react';
import { useArticles } from '../context/ArticlesContext';

export default function FiltersPanel() {
  const {
    searchText, setSearchText,
    statusFilter, setStatusFilter,
    categoryFilter, setCategoryFilter,
    sortMode, setSortMode,
  } = useArticles();

  const [open, setOpen] = useState(false);

  const labelClass = 'block text-[10px] uppercase tracking-widest text-[#666666] mb-1.5';
  const inputClass = 'w-full bg-[#0a0a0a] border border-[#222222] text-[#f5f5f5] text-xs rounded px-3 py-2 focus:outline-none focus:border-white transition-colors [color-scheme:dark] placeholder:text-[#333333]';

  return (
    <div className="p-4">
      {/* Mobile toggle */}
      <button
        className="md:hidden flex items-center justify-between w-full text-[10px] uppercase tracking-widest text-[#666666] hover:text-white transition-colors py-1"
        onClick={() => setOpen(!open)}
      >
        <span>Filters</span>
        <span className="text-[#333333]">{open ? '▲' : '▼'}</span>
      </button>

      {/* Filter body — always open on desktop, toggled on mobile */}
      <div className={`${open ? 'block' : 'hidden'} md:block space-y-5 mt-4 md:mt-0`}>
        <div>
          <label className={labelClass}>Search</label>
          <input
            className={inputClass}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Headline or author"
          />
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Draft">Draft</option>
            <option value="In Review">In Review</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            className={inputClass}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Fashion">Fashion</option>
            <option value="Photography">Photography</option>
            <option value="Culture">Culture</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Sort</label>
          <select
            className={inputClass}
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="updated-desc">Last edited</option>
            <option value="publish-desc">Publish date</option>
            <option value="headline-asc">Headline A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
