import { useArticles } from '../context/ArticlesContext';

export default function ArticleList() {
  const {
    visibleArticles,
    selectedArticleId,
    selectArticle,
    startCreating,
    isCreating,
    loading,
  } = useArticles();

  if (loading) {
    return (
      <section className="p-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Articles</h2>
        <p className="text-sm text-gray-400">Loading…</p>
      </section>
    );
  }

  return (
    <section className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Articles</h2>
        <button
          onClick={startCreating}
          className="rounded bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700 transition-colors"
        >
          + New
        </button>
      </div>

      {visibleArticles.length === 0 ? (
        <p className="text-sm text-gray-400">No articles found.</p>
      ) : (
        <ul className="space-y-2">
          {visibleArticles.map((article) => {
            const isSelected = !isCreating && article._id === selectedArticleId;
            return (
              <li
                key={article._id}
                onClick={() => selectArticle(article._id)}
                className={`cursor-pointer rounded p-3 border transition-colors ${
                  isSelected
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'bg-white border-gray-200 hover:border-gray-400 text-gray-900'
                }`}
              >
                <h3 className="text-sm font-medium leading-snug">{article.headline}</h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                  {article.deck}
                </p>
                <p className={`text-xs mt-2 ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                  {article.author} · {article.status} ·{' '}
                  {article.publishAt ? article.publishAt : 'Not scheduled'}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
