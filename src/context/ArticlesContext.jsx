import {createContext, useContext, useEffect, useMemo, useState} from "react"
import articlesData from "../data/articles"

// 1) create context
const ArticlesContext = createContext(null);

// 2) provider component
export function ArticlesProvider({children}) {
    // state: articles + selection
    const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("editorialCMS.articles");
    return saved ? JSON.parse(saved) : articlesData;
  });
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    // state: filters/sort
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortMode, setSortMode] = useState("updated-desc");
 
    // Persistence
    useEffect (() => {
        localStorage.setItem("editorialCMS.articles", JSON.stringify(articles));
    }, [articles])

    // actions
    function updateArticle(updatedArticle) {
        setArticles((prevArticles) => 
          prevArticles.map((article) => 
            article.id === updatedArticle.id ? updatedArticle : article
          )
        );
    }
    
    function resetDemoData() {
        localStorage.removeItem("editorialCMS.articles");
        setArticles(articlesData);
        setSelectedArticleId(null);
    }

    // derived: visible articles
    const visibleArticles = useMemo(() => {
        const normalizedSearch = searchText.trim().toLowerCase();

        // filter
        const filtered = articles.filter((a) => {
        const matchSearch = 
            normalizedSearch === "" ||
            a.headline.toLowerCase().includes(normalizedSearch) ||
            a.author.toLowerCase().includes(normalizedSearch);

        const matchesStatus =
            statusFilter === "all" || a.status === statusFilter;

        const matchesCategtory = 
            categoryFilter === "all" || a.category === categoryFilter;

        return matchSearch && matchesStatus && matchesCategtory;
        })  

        // sort (good practice to always make copies. Don't alter origina/derived copies)
        const sorted = [...filtered].sort((a,b) => {
            if (sortMode === "headline-asc") {
                return a.headline.localeCompare(b.headline); // localeCompare is a string comparison method. If the result is negative, the first value is before the second value.
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
    }

    return (
        <ArticlesContext.Provider value={value}>
            {children}
        </ArticlesContext.Provider>
    )
}

export function useArticles() {
    const ctx = useContext(ArticlesContext);

    if (!ctx){
        throw new Error("useArticles must be used within an ArticlesProvider")
    }

    return ctx;
}
