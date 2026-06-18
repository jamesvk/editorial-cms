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

export default function ArticleEditor() {
  const {
    selectedArticle,
    isCreating,
    createArticle,
    updateArticle,
    deleteArticle,
    selectArticle,
  } = useArticles();
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const tagInputRef = useRef(null);

  useEffect(() => {
    if (isCreating) {
      setDraft(EMPTY_DRAFT);
    } else {
      setDraft(selectedArticle);
    }
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

  const labelClass =
    'block text-[10px] font-semibold text-[#111111] uppercase tracking-widest mb-1.5';
  const inputClass =
    'mt-1 block w-full rounded border border-[#e0e0e0] bg-white px-3 py-2 text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] transition-colors';

  if (!draft) {
    return (
      <div className="w-full bg-[#f4f4f4] flex flex-col items-center justify-center min-h-[200px] md:h-full">
        <p className="text-[10px] uppercase tracking-widest text-[#aaaaaa]">
          Select an article or create a new one
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f4f4f4] px-4 pt-5 pb-4">
      <h2 className="text-[10px] font-bold text-[#111111] uppercase tracking-[0.2em] mb-5">
        {isCreating ? ':: New Article ::' : ':: Edit Article ::'}
      </h2>

      {error && (
        <p className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Headline</label>
          <input className={inputClass} {...field('headline')} />
        </div>

        <div>
          <label className={labelClass}>Deck</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={2}
            {...field('deck')}
          />
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
          <textarea
            className={`${inputClass} resize-none`}
            rows={8}
            {...field('body')}
          />
        </div>

        {/* Tags */}
        <div>
          <label className={labelClass}>Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {draft.tags?.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-[#e0e0e0] text-[#111111] text-xs rounded px-2.5 py-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((t) => t !== tag),
                    }))
                  }
                  className="text-[#888888] hover:text-[#111111] leading-none transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              ref={tagInputRef}
              className="w-56 rounded border border-[#e0e0e0] bg-white px-3 py-1.5 text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={() => {
                const next = tagInputRef.current?.value.trim();
                if (!next) return;
                setDraft((prev) => {
                  if (!prev) return prev;
                  const exists = prev.tags?.some(
                    (t) => t.toLowerCase() === next.toLowerCase(),
                  );
                  if (exists) return prev;
                  return { ...prev, tags: [...(prev.tags ?? []), next] };
                });
                tagInputRef.current.value = '';
                tagInputRef.current.focus();
              }}
              className="rounded border border-[#e0e0e0] bg-white px-3 py-1.5 text-sm text-[#111111] hover:bg-[#f0f0f0] transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#333333] disabled:opacity-40 transition-colors"
        >
          {saving ? 'Saving…' : isCreating ? 'Create' : 'Save'}
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2.5 bg-white border border-[#cccccc] text-[#444444] text-[10px] uppercase tracking-[0.2em] hover:bg-[#f0f0f0] transition-colors"
        >
          Cancel
        </button>
        {!isCreating && (
          <button
            onClick={async () => {
              if (
                !window.confirm('Delete this article? This cannot be undone.')
              )
                return;
              await deleteArticle(draft._id);
              selectArticle(null);
            }}
            className="px-6 py-2.5 bg-red-500 text-white text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
