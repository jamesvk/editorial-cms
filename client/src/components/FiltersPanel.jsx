import { useArticles } from '../context/ArticlesContext';

export default function FiltersPanel() {
  const {
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortMode,
    setSortMode,
  } = useArticles();

  const labelClass =
    'block text-[10px] font-semibold text-[#111111] uppercase tracking-widest mb-1.5';
  const selectClass =
    'w-full border border-[#e0e0e0] px-3 py-2 text-xs text-[#111111] bg-white focus:outline-none focus:ring-1 focus:ring-[#111111] transition-colors';

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-[10px] font-bold text-[#111111] uppercase tracking-[0.2em] mb-5">
        :: Filters ::
      </h2>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Search</label>
          <input
            className="w-full border border-[#e0e0e0] bg-white px-3 py-2 text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] transition-colors placeholder:text-[#bbbbbb]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Headline or author"
          />
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            className={selectClass}
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
            className={selectClass}
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
            className={selectClass}
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="updated-desc">Last edited (newest)</option>
            <option value="publish-desc">Publish date (newest)</option>
            <option value="headline-asc">Headline (A–Z)</option>
          </select>
        </div>
      </div>
    </section>
  );
}
