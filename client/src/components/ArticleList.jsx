import { useArticles } from '../context/ArticlesContext';

export default function ArticleList() {
  const { visibleArticles, selectedArticleId, setSelectedArticleId, loading } = useArticles();

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
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Articles</h2>
      {visibleArticles.length === 0 ? (
        <p className="text-sm text-gray-400">No articles found.</p>
      ) : (
        <ul className="space-y-2">
          {visibleArticles.map((article) => {
            const isSelected = article._id === selectedArticleId;
            return (
              <li
                key={article._id}
                onClick={() => setSelectedArticleId(article._id)}
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
