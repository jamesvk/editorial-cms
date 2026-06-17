const BASE = `${import.meta.env.VITE_API_URL || ''}/api/articles`;

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

export const fetchArticles = () => request('/');

export const fetchArticle = (id) => request(`/${id}`);

export const createArticle = (payload) =>
  request('/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateArticle = (id, payload) =>
  request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteArticle = (id) =>
  request(`/${id}`, { method: 'DELETE' });
