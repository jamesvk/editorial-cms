import { useArticles } from '../context/ArticlesContext';

const statusPill = (status) => {
  if (status === 'Published') return 'bg-emerald-100 text-emerald-700';
  if (status === 'In Review') return 'bg-amber-100 text-amber-700';
  return 'bg-[#f0f0f0] text-[#888888]';
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
    <section className="px-4 pt-5 pb-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[10px] font-bold text-[#111111] uppercase tracking-[0.2em]">
          :: Articles ::
        </h2>
        <button
          onClick={startCreating}
          className="px-3 py-1.5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors"
        >
          + New
        </button>
      </div>

      {loading ? (
        <p className="text-[10px] uppercase tracking-widest text-[#aaaaaa] py-8 text-center">
          Loading…
        </p>
      ) : visibleArticles.length === 0 ? (
        <p className="text-[10px] uppercase tracking-widest text-[#aaaaaa] py-8 text-center">
          No articles found
        </p>
      ) : (
        <ul className="space-y-2">
          {visibleArticles.map((article) => {
            const isSelected = !isCreating && article._id === selectedArticleId;
            return (
              <li
                key={article._id}
                onClick={() => selectArticle(article._id)}
                className={`cursor-pointer p-4 rounded bg-white transition-all duration-150 ${
                  isSelected
                    ? 'shadow-md ring-1 ring-[#111111]'
                    : 'shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[#111111] leading-snug">
                    {article.headline}
                  </h3>
                  <span
                    className={`shrink-0 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-semibold ${statusPill(article.status)}`}
                  >
                    {article.status}
                  </span>
                </div>
                <p className="text-xs text-[#777777] truncate mb-2">
                  {article.deck}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#aaaaaa]">
                    {article.author}
                  </span>
                  {article.publishAt && (
                    <>
                      <span className="text-[#dddddd]">·</span>
                      <span className="text-[10px] uppercase tracking-widest text-[#aaaaaa]">
                        {article.publishAt}
                      </span>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
