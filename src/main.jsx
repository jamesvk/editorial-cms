import { StrictMode } from 'react' // StrictMode is a wrapper component tha enables extra checks/warnings in development.
import { createRoot } from 'react-dom/client' // what connects React to the actual DOM using the new root API
import './index.css'
import App from './App.jsx'
import {ArticlesProvider} from './context/ArticlesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArticlesProvider>
      <App />
    </ArticlesProvider>
  </StrictMode>
)
