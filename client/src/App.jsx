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
  const [showFilters, setShowFilters] = useState(false);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <p className="text-[9px] uppercase tracking-[0.5em] text-[#333333]">
          Loading
        </p>
      </div>
    );
  }

  if (!user) {
    return showRegister ? (
      <RegisterPage onSwitch={() => setShowRegister(false)} />
    ) : (
      <LoginPage onSwitch={() => setShowRegister(true)} />
    );
  }

  return (
    <ArticlesProvider>
      <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#111111]">
        {/* Header — stays dark */}
        <header className="shrink-0 flex items-center justify-between px-5 h-12 bg-[#0a0a0a]">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-[#aaaaaa] hover:text-white transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <rect y="2" width="16" height="1.5" rx="1" />
                <rect y="7.25" width="16" height="1.5" rx="1" />
                <rect y="12.5" width="16" height="1.5" rx="1" />
              </svg>
            </button>
            <span className="text-[11px] font-black tracking-[0.25em] uppercase text-white">
              Masthead
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-widest text-[#555555] hidden sm:block">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="text-[9px] uppercase tracking-widest text-[#aaaaaa] hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Mobile filters drawer */}
        {showFilters && (
          <div className="md:hidden border-b border-[#e5e5e5] bg-[#f4f4f4]">
            <FiltersPanel />
          </div>
        )}

        {/* Main layout */}
        <main className="flex flex-1 overflow-hidden">
          {/* Desktop filters sidebar */}
          <aside className="hidden md:block w-52 shrink-0 border-r border-[#e5e5e5] bg-[#f4f4f4] overflow-y-auto">
            <FiltersPanel />
          </aside>

          {/* Article list */}
          <div className="w-full md:w-72 shrink-0 border-r border-[#e5e5e5] bg-white overflow-y-auto">
            <ArticleList />
          </div>

          {/* Editor — desktop only */}
          <div className="hidden md:flex flex-1 overflow-y-auto bg-[#f4f4f4]">
            <ArticleEditor />
          </div>
        </main>

        {/* Mobile editor bottom sheet */}
        <div className="md:hidden">
          <ArticleEditor />
        </div>
      </div>
    </ArticlesProvider>
  );
}
