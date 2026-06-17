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

  const labelClass = 'block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1';
  const controlClass = 'w-full rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400';

  return (
    <section className="p-4 space-y-5">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Filters</h2>

      <div>
        <label className={labelClass}>Search</label>
        <input
          className={controlClass}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Headline or author"
        />
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <select
          className={controlClass}
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
          className={controlClass}
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
          className={controlClass}
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
        >
          <option value="updated-desc">Last edited (newest)</option>
          <option value="publish-desc">Publish date (newest)</option>
          <option value="headline-asc">Headline (A–Z)</option>
        </select>
      </div>
    </section>
  );
}
