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

  const inputClass = 'w-full bg-[#111111] border border-[#222222] text-[#f5f5f5] text-sm rounded px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-[#333333]';
  const labelClass = 'block text-[10px] uppercase tracking-widest text-[#666666] mb-1.5';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm px-8">
        <div className="mb-10">
          <h1 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white mb-2">
            Editorial CMS
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-[#444444]">Sign in to continue</p>
        </div>

        {error && (
          <p className="mb-6 text-xs text-red-400 border border-red-900/40 rounded px-4 py-3 bg-red-950/20">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-[#e0e0e0] disabled:opacity-40 transition-colors mt-2"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-8 text-[10px] uppercase tracking-widest text-[#444444] text-center">
          No account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="text-white hover:text-[#cccccc] transition-colors"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
