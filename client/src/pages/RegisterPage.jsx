import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ onSwitch }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
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
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#888888] mt-2">
            Create your account
          </p>
        </div>

        {error && (
          <p className="mb-6 text-[11px] text-red-400 border border-red-900/30 px-4 py-3 bg-red-950/10 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mb-4">
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-transparent border-b border-[#2a2a2a] text-[#f5f5f5] text-sm py-2 focus:outline-none focus:border-[#888888] transition-colors placeholder:text-[#555555]"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-1.5">
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
            <label className="block text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
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
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[9px] uppercase tracking-[0.3em] text-[#666666]">
          Already a member?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="text-[#999999] hover:text-white transition-colors"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
