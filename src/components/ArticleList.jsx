export default function ArticleList({articles, selectedArticleId, onSelectArticle}) {
    return (
        <section style={{ outline: "1px dotted red" }}>
            <h2>Articles</h2>
            <ul>
                {articles.map((article) => (
                    <li 
                        key={article.id}
                        onClick={() => onSelectArticle(article.id)}
                        style={{
                            cursor: "pointer",
                            fontWeight:
                                article.id === selectedArticleId ? "bold" : "normal"
                                /*“If this article’s id matches the selected article id, make it bold. Otherwise, keep it normal.”*/
                        }}
                    >
                        <h3>{article.headline}</h3>
                        <p>{article.deck}</p>
                        <small>By {article.author} | {article.publishAt || "Not Scheduled"}</small>
                    </li>
                ))}
            </ul>
        </section>
    )
}