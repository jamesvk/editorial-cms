const BASE = `${import.meta.env.VITE_API_URL || ''}/api/auth`;

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const registerUser = async (name, email, password) => {
  const data = await request('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  localStorage.setItem('token', data.token);
  return data;
};

export const loginUser = async (email, password) => {
  const data = await request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('token', data.token);
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const fetchMe = () => request('/me');
