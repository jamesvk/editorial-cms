import { useArticles } from "../context/ArticlesContext"

export default function ArticleList() {

    const {visibleArticles, selectedArticleId, setSelectedArticleId} = useArticles();
    return (
        <section style={{ outline: "1px dotted red" }}>
            <h2>Articles</h2>
            <ul>
                {visibleArticles.map((article) => (
                    <li 
                        key={article.id}
                        onClick={() => setSelectedArticleId(article.id)}
                        style={{
                            cursor: "pointer",
                            fontWeight:
                                article.id === selectedArticleId ? "bold" : "normal"
                                /* If this article’s id matches the selected article id, make it bold. Otherwise, keep it normal.*/
                        }}
                    >
                        <h3>{article.headline}</h3>
                        <p>{article.deck}</p>
                        <small>
                            By {article.author} | {" "} 
                            Publish: {" "} 
                            {article.publishAt
                                ? article.publishAt
                                : "Not Scheduled"}
                            {" | "}
                            Updated:{" "}
                            {article.updatedAt
                                ? article.updatedAt
                                : "-"}
                        </small>
                    </li>
                ))}
            </ul>
        </section>
    )
}