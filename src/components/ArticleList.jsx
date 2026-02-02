import { useArticles } from "../context/ArticlesContext"

export default function ArticleList() {

    const {visibleArticles, selectedArticleId, setSelectedArticleId} = useArticles();
    return (
        <section className="list-panel">
            <h2>Articles</h2>
            <ul className="article-list">
                {visibleArticles.map((article ) => {
                    const isSelected = article.id === selectedArticleId;
                    // .map() transforms every element in an array and returns a new array of the same length, 
                    // while .filter() removes elements based on a test and returns a shorter or equal-length array.
                    // The result of .map() is an array of React elements (not real DOM nodes yet). During the render phase:
                    //     - React iterates over this array
                    //     - Converts each React element into a Virtual DOM node
                    //     - Compares it to the previous render (reconciliation)
                    //     - Applies the minimal set of changes to the real DOM
                    //     - React handles building and updating the <li> elements automatically.
                    // Each render produces an array of React elements. React uses keys to match those 
                    // elements to existing DOM nodes and updates only what changed.

                    return (
                        <li 
                        key={article.id}
                        // Using index as a key breaks React’s ability to track item identity when 
                        // lists are sorted or filtered. A stable ID lets React move DOM nodes instead of reusing them for different data.
                        // This makes the component fully state-driven:
                        //     - selectedArticleId lives in React state (via context)
                        //     - On each render, React re-evaluates this comparison
                        //     - If the IDs match, `isSelected` becomes true
                        //     - The className updates based on state, not DOM manipulation
                        //     Result:
                        //     UI highlighting is a pure function of state → predictable and declarative.
                        className={`article-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => setSelectedArticleId(article.id)}
                        >
                            <h3 className="article-title">{article.headline}</h3>
                            <p className="article-deck">{article.deck}</p>
                            <small className="article-meta">
                                By {article.author} | {" "} 
                                Publish: {" "} 
                                {article.publishAt
                                    ? article.publishAt
                                    : "Not Scheduled"}
                                {" | "}
                                Updated:{" "}
                                {article.updatedAt
                                    ? article.updatedAt
                                    : "-"}
                            </small>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
