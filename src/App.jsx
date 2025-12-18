import { useState, useMemo, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FiltersPanel from './components/FiltersPanel';
import ArticleList from './components/ArticleList';
import ArticleEditor from './components/ArticleEditor';

function App() {

  return (
    <div className="app-layout">
      <FiltersPanel />
      <ArticleList />
      <ArticleEditor />
    </div>
  )
}

export default App
