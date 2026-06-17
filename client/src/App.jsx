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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#333333]">Loading</p>
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
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f5f5f5]">
        <header className="flex items-center justify-between px-6 h-14 border-b border-[#222222] shrink-0">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white">
            Editorial CMS
          </span>
          <div className="flex items-center gap-5">
            <span className="text-[10px] uppercase tracking-widest text-[#444444]">{user.name}</span>
            <button
              onClick={logout}
              className="text-[10px] uppercase tracking-widest text-[#444444] hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex flex-1 overflow-hidden">
          {/* Filters — desktop left sidebar */}
          <aside className="hidden md:block w-52 shrink-0 border-r border-[#222222] overflow-y-auto">
            <FiltersPanel />
          </aside>

          {/* Center column: mobile filters toggle + article list */}
          <div className="flex flex-col flex-1 md:w-80 md:flex-none overflow-hidden md:border-r md:border-[#222222]">
            <div className="md:hidden border-b border-[#222222]">
              <FiltersPanel />
            </div>
            <div className="flex-1 overflow-y-auto">
              <ArticleList />
            </div>
          </div>

          {/* Editor — desktop right panel, mobile bottom sheet (self-positioned) */}
          <ArticleEditor />
        </main>
      </div>
    </ArticlesProvider>
  );
}
