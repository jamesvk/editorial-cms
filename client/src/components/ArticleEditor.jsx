import { useEffect, useRef, useState } from 'react';
import { useArticles } from '../context/ArticlesContext';

const EMPTY_DRAFT = {
  headline: '',
  deck: '',
  author: '',
  category: 'Fashion',
  status: 'Draft',
  publishAt: '',
  tags: [],
  body: '',
};

const inputClass = 'w-full bg-[#0a0a0a] border border-[#222222] text-[#f5f5f5] text-sm rounded px-3 py-2.5 focus:outline-none focus:border-white transition-colors placeholder:text-[#333333] [color-scheme:dark]';
const labelClass = 'block text-[10px] uppercase tracking-widest text-[#666666] mb-1.5';

export default function ArticleEditor() {
  const { selectedArticle, isCreating, createArticle, updateArticle, selectArticle } = useArticles();
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const tagInputRef = useRef(null);

  useEffect(() => {
    setDraft(isCreating ? EMPTY_DRAFT : selectedArticle);
    setError('');
  }, [selectedArticle, isCreating]);

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    setError('');
    try {
      if (isCreating) {
        await createArticle({
          headline: draft.headline,
          deck: draft.deck,
          author: draft.author,
          category: draft.category,
          status: draft.status,
          publishAt: draft.publishAt,
          tags: draft.tags,
          body: draft.body,
        });
      } else {
        await updateArticle(draft._id, {
          headline: draft.headline,
          deck: draft.deck,
          author: draft.author,
          category: draft.category,
          status: draft.status,
          publishAt: draft.publishAt,
          tags: draft.tags,
          body: draft.body,
        });
      }
      selectArticle(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    selectArticle(null);
    setError('');
  };

  const field = (key) => ({
    value: draft?.[key] ?? '',
    onChange: (e) => setDraft((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const isOpen = !!draft;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => selectArticle(null)}
        />
      )}

      <div
        className={`
          bg-[#111111] overflow-y-auto
          ${isOpen
            ? 'fixed bottom-0 inset-x-0 z-50 max-h-[90vh] rounded-t-2xl md:static md:flex-1 md:rounded-none md:max-h-none'
            : 'hidden md:flex md:flex-1 md:items-center md:justify-center'
          }
        `}
      >
        {!draft ? (
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#2a2a2a]">No article selected</p>
        ) : (
          <div className="p-6 max-w-2xl mx-auto w-full">
            {/* Mobile drag handle */}
            <div className="md:hidden flex justify-center mb-5">
              <div className="w-10 h-0.5 bg-[#333333] rounded-full" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">
                {isCreating ? 'New Article' : 'Edit Article'}
              </h2>
            </div>

            {error && (
              <p className="mb-5 text-xs text-red-400 bg-red-950/20 border border-red-900/40 rounded px-3 py-2.5">
                {error}
              </p>
            )}

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Headline</label>
                <input className={inputClass} {...field('headline')} />
              </div>

              <div>
                <label className={labelClass}>Deck</label>
                <textarea className={`${inputClass} resize-none`} rows={2} {...field('deck')} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Author</label>
                  <input className={inputClass} {...field('author')} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select className={inputClass} {...field('category')}>
                    <option value="Fashion">Fashion</option>
                    <option value="Photography">Photography</option>
                    <option value="Culture">Culture</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Status</label>
                  <select className={inputClass} {...field('status')}>
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Publish At</label>
                  <input type="date" className={inputClass} {...field('publishAt')} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Body</label>
                <textarea className={`${inputClass} resize-none`} rows={8} {...field('body')} />
              </div>

              {/* Tags */}
              <div>
                <label className={labelClass}>Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {draft.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-[10px] uppercase tracking-widest rounded px-2.5 py-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          setDraft((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
                        }
                        className="text-[#555555] hover:text-white leading-none transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    ref={tagInputRef}
                    className={`${inputClass} flex-1`}
                    placeholder="Add tag"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = tagInputRef.current?.value.trim();
                      if (!next) return;
                      setDraft((prev) => {
                        if (!prev) return prev;
                        const exists = prev.tags?.some((t) => t.toLowerCase() === next.toLowerCase());
                        if (exists) return prev;
                        return { ...prev, tags: [...(prev.tags ?? []), next] };
                      });
                      tagInputRef.current.value = '';
                      tagInputRef.current.focus();
                    }}
                    className="px-4 py-2 border border-[#222222] text-[#666666] hover:text-white hover:border-[#555555] text-[10px] uppercase tracking-widest rounded transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pb-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-[#e0e0e0] disabled:opacity-40 transition-colors"
              >
                {saving ? 'Saving…' : isCreating ? 'Create' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 border border-[#222222] text-[#666666] hover:text-white hover:border-[#555555] text-[10px] uppercase tracking-widest rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
