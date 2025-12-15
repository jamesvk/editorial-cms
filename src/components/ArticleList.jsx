import articles from '../data/articles';

export default function ArticleList() {
    return (
        <section>
            <h2>Articles</h2>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <h3>{article.headline}</h3>
                        <p>{article.deck}</p>
                        <small>By {article.author} | {article.publishAt}</small>
                    </li>
                ))}
            </ul>
        </section>
    )
}