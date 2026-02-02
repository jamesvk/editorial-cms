import {createContext, useContext, useEffect, useMemo, useState} from "react"
import articlesData from "../data/articles"

// 1) create context
const ArticlesContext = createContext(null);
/* This line creates a Context object that defines a shared data channel for the application. 
The Context object includes a Provider component that can be rendered in the component tree to 
supply shared values, and it establishes the identity that descendant components use to subscribe 
to and consume those values through useContext. */

// 2) provider component
// A component is a reusable function (or class) that takes data as input (props and/or state) 
// and returns a description of UI (JSX) that React renders to the screen.
export function ArticlesProvider({children}) {
    // state: articles + selection
    const [articles, setArticles] = useState(() => {
        const saved = localStorage.getItem("editorialCMS.articles");
        return saved ? JSON.parse(saved) : articlesData;
    });
    /* This state uses lazy initialization to compute its initial value only 
    once when the provider first mounts into the DOM. It attempts to retrieve 
    previously saved article data from the browser’s localStorage using the 
    "editorialCMS.articles" key, which stores values as strings. If a saved value 
    exists, JSON.parse converts that string back into usable JavaScript data 
    (an array of article objects); otherwise, the state falls back to the default articlesData 
    dataset. This approach enables persistence across page reloads while avoiding unnecessary 
    storage access and parsing on subsequent re-renders. */

    /* Calling a state setter queues an update in React’s scheduler. 
    Once the current event handler finishes, React batches queued 
    updates and triggers a re-render where the new state becomes visible.
    const [selectedArticleId, setSelectedArticleId] = useState(null); */
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    // state: filters/sort
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortMode, setSortMode] = useState("updated-desc");
 
    /* These four states define the current “view configuration” of the 
    articles list — what’s being searched, filtered, and how it’s ordered. */

    // Persistence
    useEffect (() => {
        localStorage.setItem("editorialCMS.articles", JSON.stringify(articles));
    }, [articles])

    /* This effect handles persistence by synchronizing the in-memory articles 
    state with the browser’s localStorage. After each render where the `articles` 
    state changes, React runs this effect to serialize the current articles data 
    using `JSON.stringify` and store it under the `"editorialCMS.articles"` key. 
    This ensures that any edits, filters, or updates made during the session are 
    preserved across page reloads and browser restarts, while keeping the render 
    phase pure by performing this external side effect only after the DOM has been updated. */
    
    // actions
    function updateArticle(updatedArticle) {
        setArticles((prevArticles) => 
          prevArticles.map((article) => 
            article.id === updatedArticle.id ? updatedArticle : article
          )
        );
    }
    /* This function updates a single article by creating a new articles array 
    where the item with a matching id is replaced by the provided updatedArticle, 
    while all other items remain unchanged. It uses the functional form of setArticles, 
    which receives the most recent state (prevArticles) at the moment React applies the 
    update, rather than relying on a potentially stale snapshot from the current render. 
    This ensures that when multiple updates are queued or batched in quick succession, 
    each update is calculated on top of the latest state, preventing earlier changes 
    from being accidentally overwritten. By returning a new array instead of mutating 
    the existing one, this approach preserves immutability so React can reliably detect 
    changes and trigger the correct re-render, since React primarily checks for reference 
    changes rather than deep comparisons when determining whether state has changed. */
    
    function resetDemoData() {
        localStorage.removeItem("editorialCMS.articles");
        setArticles(articlesData);
        setSelectedArticleId(null);
    }

    // derived: visible articles
    const visibleArticles = useMemo(() => { // useMemo caches the result of a computation and only recalculates it when specific inputs change.
        const normalizedSearch = searchText.trim().toLowerCase(); //trim removes white space at the beginning and end of a string value.

        // filter
        const filtered = articles.filter((a) => {
            const matchSearch = 
                normalizedSearch === "" ||
                a.headline.toLowerCase().includes(normalizedSearch) ||
                a.author.toLowerCase().includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "all" || a.status === statusFilter;

            const matchesCategory = 
                categoryFilter === "all" || a.category === categoryFilter;

            return matchSearch && matchesStatus && matchesCategory;
            /* This code returns a new array of articles where the article 
            matches the search term, the selected status, and the selected category. 
            All three must pass. */
        })  

        // sort (good practice to always make copies. Don't alter original/derived copies)
        const sorted = [...filtered].sort((a,b) => { // a - b = ascending (neg → a first), b - a = descending
            if (sortMode === "headline-asc") {
                return a.headline.localeCompare(b.headline); /* localeCompare is a string comparison method.
                                                             If the result is negative, the first value is before 
                                                             the second value. localeCompare = “string math” for sort: 
                                                             respects case, accents, and locale rules (neg → a first, 
                                                             pos → b first; flip to b.localeCompare(a) for descending) */
            }

            if (sortMode === "publish-desc") {
                const aDate = a.publishAt ? new Date(a.publishAt).getTime() : 0;
                // new Date() creates a Date object, not a string or number. It is a "wrapper around a single number: milliseconds since Jan 1, 1970 (UTC)". That number is called a timestamp.
                // UTC stands for Coordinated Univeral Time - global standard used so every every stystem agrees on what time it is
                const bDate = b.publishAt ? new Date(b.publishAt).getTime() : 0; // .getTime() gets the ms since epoch (01011970)
                return bDate - aDate;
            }

            //default: updated-desc
            const aUpdated = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
            const bUpdated = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
            return bUpdated - aUpdated;
        })

        return sorted;
    }, [articles, searchText, statusFilter, categoryFilter, sortMode])

    const selectedArticle = articles.find((a) => a.id === selectedArticleId) || null; 
    /* .find() goes through an array from left to right and returns the first element 
    for which the callback function returns true. */
    
    const value = {
        //data
        articles,
        visibleArticles,
        selectedArticle,
        selectedArticleId,

        //filters
        searchText,
        statusFilter,
        categoryFilter,
        sortMode,

        //setters/actions
        setSelectedArticleId,
        setSearchText,
        setStatusFilter,
        setCategoryFilter,
        setSortMode,
        updateArticle,
        resetDemoData,
        // An object literal using property shorthand to define the Context’s public interface
    }

    return (
        <ArticlesContext.Provider value={value}>
            {children}
        </ArticlesContext.Provider>
        /* This renders the Context Provider component, which mounts 
        the shared data channel into the component tree and supplies 
        the value object so all descendant components can consume the 
        articles state and actions. */
    )
}

export function useArticles() {
    const ctx = useContext(ArticlesContext);

    if (!ctx){
        throw new Error("useArticles must be used within an ArticlesProvider")
    }

    return ctx;

    /* This custom hook allows descendant components to access the shared values provided 
    by ArticlesContext. It uses useContext with the Context object to subscribe to that shared 
    data channel, and when a component calls this hook, React looks up the component tree to 
    find the nearest ancestor ArticlesContext.Provider and returns the value object supplied by that provider. */
}

