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
        const created = await createArticle({
          headline: draft.headline,
          deck: draft.deck,
          author: draft.author,
          category: draft.category,
          status: draft.status,
          publishAt: draft.publishAt,
          tags: draft.tags,
          body: draft.body,
        });
        selectArticle(created._id);
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
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(isCreating ? EMPTY_DRAFT : selectedArticle);
    setError('');
  };

  const field = (key) => ({
    value: draft?.[key] ?? '',
    onChange: (e) => setDraft((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const inputClass =
    'mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400';

  if (!draft) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p className="text-sm">
          Select an article or click + New to get started
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">
        {isCreating ? 'New Article' : 'Editor'}
      </h2>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Headline</span>
          <input className={inputClass} {...field('headline')} />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Deck</span>
          <textarea
            className={`${inputClass} resize-none`}
            rows={2}
            {...field('deck')}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Author</span>
            <input className={inputClass} {...field('author')} />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Category</span>
            <select className={inputClass} {...field('category')}>
              <option value="Fashion">Fashion</option>
              <option value="Photography">Photography</option>
              <option value="Culture">Culture</option>
              <option value="Sports">Sports</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <select className={inputClass} {...field('status')}>
              <option value="Draft">Draft</option>
              <option value="In Review">In Review</option>
              <option value="Published">Published</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Publish At
            </span>
            <input type="date" className={inputClass} {...field('publishAt')} />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Body</span>
          <textarea
            className={`${inputClass} resize-none`}
            rows={8}
            {...field('body')}
          />
        </label>

        {/* Tags */}
        <fieldset className="border border-gray-200 rounded p-3">
          <legend className="text-sm font-medium text-gray-700 px-1">
            Tags
          </legend>
          <div className="flex flex-wrap gap-2 mb-3">
            {draft.tags?.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs rounded px-2 py-1"
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
                  className="text-gray-400 hover:text-gray-700 leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              ref={tagInputRef}
              className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
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
              className="rounded bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
            >
              Add
            </button>
          </div>
        </fieldset>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving…' : isCreating ? 'Create' : 'Save'}
        </button>
        <button
          onClick={handleCancel}
          className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
