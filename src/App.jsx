import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FiltersPanel from './components/FiltersPanel';
import ArticleList from './components/ArticleList';
import ArticleEditor from './components/ArticleEditor';
import articlesData from "./data/articles";

function App() {
  const [articles, setArticles] = useState(articlesData);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortMode, setSortMode] = useState("updated-desc");
 
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
        return a.headline.localeCompare(b.headline);
      }

      if (sortMode === "publish-desc") {
        const aDate = a.publishAt ? new Date(a.publishAt).getTime() : 0;
        const bDate = b.publishAt ? new Date(b.publishAt).getTime() : 0;
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
  // passed to <ArticleEditor.  />

  function updateArticle(updatedArticle) {
    setArticles((prevArticles) => 
      prevArticles.map((article) => 
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
  }

  return (
    <div className="app-layout">
      <FiltersPanel 
        searchText = {searchText}
        setSearchText = {setSearchText}
        statusFilter = {statusFilter}
        setStatusFilter = {setStatusFilter}
        categoryFilter = {categoryFilter}
        setCategoryFilter = {setCategoryFilter}
        sortMode = {sortMode}
        setSortMode = {setSortMode}
      />
      <ArticleList 
        articles={visibleArticles}
        selectedArticleId={selectedArticleId}
        onSelectArticle={setSelectedArticleId}
      />
      <ArticleEditor 
        article={selectedArticle}
        onSave={updateArticle}
      />
    </div>
  )
}

export default App
