import {useEffect, useState, useRef} from 'react';
import { useArticles } from '../context/ArticlesContext';

export default function ArticleEditor() {
    const {selectedArticle, updateArticle} = useArticles();
    const [draft, setDraft] = useState(null);
    const tagInputRef = useRef(null);

    useEffect(() => {
        setDraft(selectedArticle);
    }, [selectedArticle])


    function handleSave() {
        if (!draft) return;

        updateArticle({
            ...draft, 
            updatedAt: new Date().toISOString().slice(0,10)
        });
    }
    
    function handleCancel() {
        setDraft(selectedArticle);
    }

    if (!draft) {
        return (
            <section>
                <h2>Editor</h2>
                <p>Select an article to view details</p>
            </section>
        )
    }

    return (
        <section className="editor-panel">
            <label>
                Headline
                <input
                    value={draft.headline}
                    onChange={(e) =>
                        setDraft((prev) => ({
                            ...prev,
                            headline: e.target.value
                        }))
                    }
                />
            </label>
            <label>
                Deck
                <textarea
                    value={draft.deck}
                    onChange={(e) =>
                        setDraft((prev) => ({
                            ...prev,
                            deck: e.target.value
                        }))
                    }
                />
            </label>
            <label>
                Author
                <input
                    value={draft.author}
                    onChange={(e) =>
                        setDraft((prev) => ({
                            ...prev,
                            author: e.target.value
                        }))
                    }
                />
            </label>
            <label>
                Category
                <select
                    value={draft.category}
                    onChange={(e) =>
                        setDraft((prev) => ({
                            ...prev,
                            category: e.target.value,
                        }))
                    }
                >
                    <option value="Fashion">Fashion</option>
                    <option value="Photography">Photography</option>
                    <option value="Culture">Culture</option>
                    <option value="Sports">Sports</option>
                </select>
            </label>
            <label>
                Status
                <select
                    value={draft.status}
                    onChange={(e) =>
                        setDraft((prev) => ({
                            ...prev,
                            status: e.target.value,
                        }))
                    }
                >
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                </select>
            </label>
            <label>
                Publish At
                <input
                    type="date"
                    value={draft.publishAt || ""} /* if publishAt is ever null/undefined, React will warn about switching between controlled/uncontrolled */
                    onChange={(e) =>
                        setDraft((prev) => ({
                            ...prev,
                            publishAt: e.target.value
                        }))
                    }
                />
            </label>
            <fieldset>
                <legend>Tags</legend>
                <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: 0, listStyle: "none"}}>
                    {draft.tags.map((tag) => (
                        <li key={tag} style={{ border: "1px solid #ccc", padding: "4px 8px", borderRadius:"999px"}}>
                            {tag}{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        tags: prev.tags.filter((t) => t !== tag),
                                    }))
                                }
                            >
                                x
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <input
                        ref={tagInputRef}
                        placeholder="Add a tag"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            const raw = tagInputRef.current?.value ?? "";
                            const next = raw.trim();

                            if (!next) return;

                            setDraft((prev) => {
                                if (!prev) return prev;
                                const exist = prev.tags.some((t) => t.toLowerCase() === next.toLowerCase());

                                if (exist) return prev;
                                // In a React state updater, whatever you return becomes new state so you need to return prev 
                                return {...prev, tags:[...prev.tags, next]};
                            })
                            
                            tagInputRef.current.value = "";
                            tagInputRef.current.focus();
                        }}
                    >
                        Add
                    </button>
                </div>
            </fieldset>
            <label>
                Body
                <textarea
                    value={draft.body}
                    onChange={(e) =>
                        setDraft((prev) => ({
                            ...prev,
                            body: e.target.value
                        }))
                    }
                />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </section>
    )
}