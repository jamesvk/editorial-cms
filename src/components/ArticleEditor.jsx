import {useEffect, useState, useRef} from 'react';
import { useArticles } from '../context/ArticlesContext';

export default function ArticleEditor() {
    const {selectedArticle, updateArticle} = useArticles();
    const [draft, setDraft] = useState(null);
    const tagInputRef = useRef(null);
    // I use useRef to hold a reference to the tag input DOM element so I can read 
    // its value and clear/focus it imperatively without making the input fully controlled with state.

    useEffect(() => {
        setDraft(selectedArticle);
    }, [selectedArticle])
    /* The effect only syncs the draft when selection changes. 
    This lets me freely edit the draft and change local state without it 
    being overwritten on every render. If I set draft from selectedArticle during render, 
    I’d either trigger a render loop or constantly reset user edits, so the form couldn’t 
    function as an editable buffer. */

    function handleSave() {
        if (!draft) return;

        updateArticle({
            ...draft, 
            updatedAt: new Date().toISOString().slice(0,10)
        });
        // I spread draft to copy all existing article data into a new object, 
        // then override only updatedAt with the current date formatted as a YYYY-MM-DD ISO string.
    }
    
    function handleCancel() {
        setDraft(selectedArticle);
    }

    return (
        <section className={`editor-panel ${!draft ? "is-empty" : ""}`}>
            {!draft ? (
                <div className="editor-empty">
                    <h2>Editor</h2>
                    <p>Select an article to view details</p>
                </div>
            ) : (
                <div className="editor-form">
                    <h2>Editor</h2>

                    {/* 1) Grid Fields */}
                    <div className="editor-grid">
                        <label className="editor-field">
                            <span className="editor-label">Headline</span>
                            <input
                                className="editor-control"
                                value={draft.headline}
                                onChange={(e) =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        headline: e.target.value
                                    }))
                                }
                            />
                        </label>

                        <label className="editor-field editor-deck--body">
                            <span className="editor-label">Deck</span>
                            <textarea
                                className="editor-control editor-deck--body"
                                value={draft.deck}
                                onChange={(e) =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        deck: e.target.value
                                    }))
                                }
                            />
                        </label>

                        <label className="editor-field">
                            <span className="editor-label">Author</span>
                            <input
                                className="editor-control"
                                value={draft.author}
                                onChange={(e) =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        author: e.target.value
                                    }))
                                }
                            />
                        </label>

                        <label className="editor-field">
                            <span className="editor-label">Category</span>
                            <select
                                className="editor-control"
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

                        <label className="editor-field">
                            <span className="editor-label">Status</span>
                            <select
                                className="editor-control"
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

                        <label className="editor-field">
                            <span className="editor-label">Publish At</span>
                            <input
                                className="editor-control"
                                type="date"
                                // Enforces a YYYY-MM-DD format. Provides built-in validation (can’t type letters, only valid dates)
                                value={draft.publishAt || ""} /* if publishAt is ever null/undefined, React will warn about switching between controlled/uncontrolled */
                                onChange={(e) =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        publishAt: e.target.value
                                    }))
                                }
                            />
                        </label>

                        <label className="editor-field editor-field--body">
                            <span className="editor-label">Body</span>
                            <textarea
                                className="editor-control editor-control--body"
                                value={draft.body}
                                onChange={(e) =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        body: e.target.value
                                    }))
                                }
                            />
                        </label>
                    </div>
                    
                    {/* 2) Tags Block*/}
                    <fieldset className="tags">
                        <legend className="tags_legend">Tags</legend>
                        <ul className="tags_list">
                            {draft.tags.map((tag) => (
                                <li key={tag} className="tag">
                                    <span className="tag_text">{tag}</span>
                                    <button
                                        type="button"
                                        className="button_remove"
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
                        <div className="tags_add">
                            <input
                                className="tags_input"
                                ref={tagInputRef} 
                                /* The ref holds the input’s DOM node, not React state, so changing 
                                its value doesn’t trigger a re-render. That lets me read and clear 
                                the field imperatively without updating component state on every keystroke.
                                placeholder=" Add a tag" */
                            />
                            <button
                                type="button"
                                className="tags_btn"
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
                    
                    {/* action */}
                    <div className="editor-actions">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </section>
    )
}