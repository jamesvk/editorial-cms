import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FiltersPanel from './FiltersPanel';
import ArticleList from './ArticleList';
import ArticleEditor from './ArticleEditor';

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
