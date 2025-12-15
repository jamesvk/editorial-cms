import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FiltersPanel from './components/FiltersPanel';
import ArticleList from './components/ArticleList';
import ArticleEditor from './components/ArticleEditor';
import articlesData from "./data/articles";

function App() {
  const [articles] = useState(articlesData);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  console.log(articles);
 
  return (
    <div className="app-layout">
      <FiltersPanel />
      <ArticleList 
        articles={articles}
        selectedArticleId={selectedArticleId}
        onSelectArticle={setSelectedArticleId}
      />
      <ArticleEditor 
        article={articles.find(
          article => article.id === selectedArticleId
        )}
      />
    </div>
  )
}

export default App
