import { useArticles } from '../context/ArticlesContext';

const statusColor = (status) => {
  if (status === 'Published') return 'text-emerald-500';
  if (status === 'In Review') return 'text-amber-500';
  return 'text-[#444444]';
};

export default function ArticleList() {
  const {
    visibleArticles,
    selectedArticleId,
    selectArticle,
    startCreating,
    isCreating,
    loading,
  } = useArticles();

  return (
    <section className="p-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666666]">Articles</h2>
        <button
          onClick={startCreating}
          className="text-[10px] uppercase tracking-widest text-[#666666] hover:text-white border border-[#222222] hover:border-[#555555] px-2.5 py-1 rounded transition-colors"
        >
          + New
        </button>
      </div>

      {loading ? (
        <p className="text-[10px] uppercase tracking-widest text-[#333333] py-10 text-center">Loading…</p>
      ) : visibleArticles.length === 0 ? (
        <p className="text-[10px] uppercase tracking-widest text-[#333333] py-10 text-center">No articles</p>
      ) : (
        <ul className="list-none space-y-px">
          {visibleArticles.map((article) => {
            const isSelected = !isCreating && article._id === selectedArticleId;
            return (
              <li
                key={article._id}
                onClick={() => selectArticle(article._id)}
                className={`
                  cursor-pointer p-4 border-l-2 transition-all duration-200 rounded-r
                  ${isSelected
                    ? 'border-l-white bg-[#1a1a1a]'
                    : 'border-l-transparent hover:bg-[#111111] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                  }
                `}
              >
                <h3 className="text-sm font-medium text-[#f5f5f5] leading-snug mb-1">
                  {article.headline}
                </h3>
                <p className="text-xs text-[#666666] truncate mb-2.5">
                  {article.deck}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#444444]">
                    {article.author}
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest ${statusColor(article.status)}`}>
                    {article.status}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
