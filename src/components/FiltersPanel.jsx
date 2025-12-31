import { useArticles } from "../context/ArticlesContext"

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
    resetDemoData
    } = useArticles();

    return (
        <section className="filters-panel">
            <h2 className="filters-title">Filters</h2>

            <label className="field">
                <span className="field_label">Search</span>
                <input 
                    className="field_control"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search headline or author"
                />
            </label>
            
            <label className="field">
                <span className="field_label">Category</span>
                <select
                    className="field_control"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Photography">Photography</option>
                    <option value="Culture">Culture</option>
                    <option value="Sports">Sports</option>
                </select>
            </label>

            <label className="field">
                <span className="field_label">Status</span>
                <select
                    className="field_control"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                </select>
            </label>

            <label className="field">
                <span className="field_label">Sort</span>
                <select
                    className="field_control"
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value)}
                >
                    <option value="updated-desc">Last edited (newest)</option>
                    <option value="publish-desc">Publish Date (newest)</option>
                    <option value="headline-asc">Headline (A-Z)</option>
                </select>
            </label>
            <button
                className="filter_button"
                type="button"
                onClick={resetDemoData}
            >
                Reset demo data
            </button>
        </section>
    )
}