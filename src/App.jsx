import { useState, useMemo, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FiltersPanel from './components/FiltersPanel';
import ArticleList from './components/ArticleList';
import ArticleEditor from './components/ArticleEditor';

function App() {

  return (
    <div className="app-shell">
      <header className="app-header">
        <h2>Magazine Company</h2>
        <p>EDITORIAL CMS</p>
      </header>
      <main className="app-layout">
        <div className="filters-region">
          <FiltersPanel />
        </div>
        <div className="list-region">
          <ArticleList />
        </div>
        <div className="editor-region">
          <ArticleEditor />
        </div>
      </main>
    </div>
  )
}

export default App
