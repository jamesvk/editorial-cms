export default function FiltersPanel({
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortMode,
    setSortMode
}) {
    return (
        <section style={{ outline: "1px dotted red" }}>
            <h2>Filters</h2>

            <label>
                Search
                <input 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search headline or author"
                />
            </label>

            <label>
                Status
                <select
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
            
            <label>
                Category
                <select
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

            <label>
                Sort
                <select
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value)}
                >
                    <option value="updated-desc">Last edited (newest)</option>
                    <option value="publish-desc">Publish Date (newest)</option>
                    <option value="headline-asc">Headline (A-Z)</option>
                </select>
            </label>
        </section>
    )
}