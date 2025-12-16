import {useEffect, useState} from 'react';

export default function ArticleEditor({article, onSave}) {
    const [draft, setDraft] = useState(null);
    const [tagsInput, setTagsInput] = useState("");

    useEffect(() => {
        setDraft(article);
        setTagsInput(article ? article.tags.join(", "): "");
    }, [article])

    function handleSave() {
        onSave({
            ...draft,
            tags: tagsInput
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            updatedAt: new Date().toISOString()
        })
    }

    function handleCancel() {
        setDraft(article);
        setTagsInput(article ? article.tags.join(", ") : "")
    }

    if (!draft) {
        return (
            <section style={{ outline: "1px dotted red" }}>
                <h2>Editor</h2>
                <p>Select an article to view details</p>
             </section>
        )
    }

    return (
        <section>
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
            <label>
                Tags (comma separated)
                <input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                />
            </label>
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