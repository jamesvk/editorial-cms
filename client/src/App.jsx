import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { ArticlesProvider } from './context/ArticlesContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FiltersPanel from './components/FiltersPanel';
import ArticleList from './components/ArticleList';
import ArticleEditor from './components/ArticleEditor';

export default function App() {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return showRegister
      ? <RegisterPage onSwitch={() => setShowRegister(false)} />
      : <LoginPage onSwitch={() => setShowRegister(true)} />;
  }

  return (
    <ArticlesProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Magazine Company</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Editorial CMS</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user.name}</span>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-900 underline"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex flex-1 overflow-hidden">
          <div className="w-56 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
            <FiltersPanel />
          </div>
          <div className="w-80 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
            <ArticleList />
          </div>
          <div className="flex-1 overflow-y-auto">
            <ArticleEditor />
          </div>
        </main>
      </div>
    </ArticlesProvider>
  );
}
