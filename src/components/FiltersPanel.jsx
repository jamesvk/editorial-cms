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
    //Object destructuring assignment from a function return value

    return (
        <section className="filters-panel">
            <h2 className="filters-title">Filters</h2>

            <label className="field">
                {/*A label associates descriptive text (search, category, sort) with a specific form control, 
                so users and assistive technologies know what that input represents and can interact with it more easily. */}
                <span className="field_label">Search</span>
                {/* span is purely presentational: it lets you style the label text separately from the input */}
                <input 
                    className="field_control"
                    value={searchText}
                    // value makes this a controlled input — its displayed text is always driven by React state (searchText).
                    onChange={(e) => setSearchText(e.target.value)}
                    // e is a SyntheticEvent representing the browser’s input change event.
                    // e.target is the input element, and e.target.value is the current text inside it.
                    placeholder="Search headline or author"
                    // The placeholder is hint text, not a value. Never stored in state
                />
            </label>
            
            <label className="field">
                <span className="field_label">Category</span>
                <select
                    className="field_control"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    {/* <select> renders a dropdown form control that lets the user choose one value from a predefined list of options.
                        It’s the form control paired with the label’s descriptive text
                        It enforces valid input by limiting choices to the provided options
                        It’s keyboard and screen-reader friendly by default (Arrow keys, Enter, Tab) */}
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