const BASE = `${import.meta.env.VITE_API_URL || ''}/api/auth`;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const registerUser = (name, email, password) =>
  request('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

export const loginUser = (email, password) =>
  request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const logoutUser = () => request('/logout', { method: 'POST' });

export const fetchMe = () => request('/me');
