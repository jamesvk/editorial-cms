import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchArticles,
  createArticle as apiCreate,
  updateArticle as apiUpdate,
  deleteArticle as apiDelete,
} from '../api/articles';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortMode, setSortMode] = useState('updated-desc');

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const createArticle = async (payload) => {
    const created = await apiCreate(payload);
    setArticles((prev) => [created, ...prev]);
    return created;
  };

  const updateArticle = async (id, payload) => {
    const updated = await apiUpdate(id, payload);
    setArticles((prev) =>
      prev.map((a) => (a._id === id ? updated : a))
    );
    return updated;
  };

  const deleteArticle = async (id) => {
    await apiDelete(id);
    setArticles((prev) => prev.filter((a) => a._id !== id));
    if (selectedArticleId === id) setSelectedArticleId(null);
  };

  const visibleArticles = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    const filtered = articles.filter((a) => {
      const matchSearch =
        normalizedSearch === '' ||
        a.headline.toLowerCase().includes(normalizedSearch) ||
        a.author.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;

      return matchSearch && matchesStatus && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === 'headline-asc') return a.headline.localeCompare(b.headline);

      if (sortMode === 'publish-desc') {
        const aDate = a.publishAt ? new Date(a.publishAt).getTime() : 0;
        const bDate = b.publishAt ? new Date(b.publishAt).getTime() : 0;
        return bDate - aDate;
      }

      const aUpdated = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bUpdated = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bUpdated - aUpdated;
    });
  }, [articles, searchText, statusFilter, categoryFilter, sortMode]);

  const selectedArticle = articles.find((a) => a._id === selectedArticleId) || null;

  const value = {
    articles,
    visibleArticles,
    selectedArticle,
    selectedArticleId,
    loading,
    searchText,
    statusFilter,
    categoryFilter,
    sortMode,
    setSelectedArticleId,
    setSearchText,
    setStatusFilter,
    setCategoryFilter,
    setSortMode,
    createArticle,
    updateArticle,
    deleteArticle,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error('useArticles must be used within an ArticlesProvider');
  return ctx;
}
