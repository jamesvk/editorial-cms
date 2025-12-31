import { useArticles } from "../context/ArticlesContext"

export default function ArticleList() {

    const {visibleArticles, selectedArticleId, setSelectedArticleId} = useArticles();
    return (
        <section className="list-panel">
            <h2>Articles</h2>
            <ul className="article-list">
                {visibleArticles.map((article ) => {
                    const isSelected = article.id === selectedArticleId;

                    return (
                        <li 
                        key={article.id}
                        className={`article-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => setSelectedArticleId(article.id)}
                        >
                            <h3 className="article-title">{article.headline}</h3>
                            <p className="article-deck">{article.deck}</p>
                            <small className="article-meta">
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
                    )
                })}
            </ul>
        </section>
    )
}


// {visibleArticles.map((article) => (
//                     <li 
//                         key={article.id}
//                         onClick={() => setSelectedArticleId(article.id)}
//                         style={{
//                             cursor: "pointer",
//                             fontWeight:
//                                 article.id === selectedArticleId ? "bold" : "normal"
//                                 /* If this article’s id matches the selected article id, make it bold. Otherwise, keep it normal.*/
//                         }}
//                     >
//                         <h3>{article.headline}</h3>
//                         <p>{article.deck}</p>
//                         <small>
//                             By {article.author} | {" "} 
//                             Publish: {" "} 
//                             {article.publishAt
//                                 ? article.publishAt
//                                 : "Not Scheduled"}
//                             {" | "}
//                             Updated:{" "}
//                             {article.updatedAt
//                                 ? article.updatedAt
//                                 : "-"}
//                         </small>
//                     </li>
//                 ))}