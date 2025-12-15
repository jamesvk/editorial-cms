export default function ArticleEditor({article}) {
    if (!article) {
        return (
        <section style={{ outline: "1px dotted red" }}>
            <h2>Editor</h2>
            <p>Select an article to view details</p>
        </section>
        )
    }
    
    return (
        <section>
            <h2>Editor</h2>
            <h3>{article.headline}</h3>
            <p>{article.deck}</p>

            <p>
                <strong>Author:</strong> {article.author}
            </p>

            <p>
                <strong>Category:</strong> {article.category}
            </p>

            <p>
                <strong>Status:</strong> {article.status}
            </p>

            <p>{article.body}</p>
        </section>
    )
}