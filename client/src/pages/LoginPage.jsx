import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onSwitch }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black tracking-tight uppercase text-white leading-none">
            Masthead
          </h1>
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#888888] mb-4">
            Editorial Management System
          </p>
        </div>

        {error && (
          <p className="mb-6 text-[11px] text-red-400 border border-red-900/30 px-4 py-3 bg-red-950/10 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 mb-5">
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-3">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent border-b border-[#2a2a2a] text-[#f5f5f5] text-sm py-2 focus:outline-none focus:border-[#888888] transition-colors placeholder:text-[#555555]"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-3">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[#2a2a2a] text-[#f5f5f5] text-sm py-2 focus:outline-none focus:border-[#888888] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#e8e8e8] disabled:opacity-30 transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-[9px] uppercase tracking-[0.3em] text-[#666666]">
          New to Masthead?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="text-[#999999] hover:text-white transition-colors"
          >
            Join
          </button>
        </p>
      </div>
    </div>
  );
}
