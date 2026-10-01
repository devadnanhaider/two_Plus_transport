import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'tpt_admin_token';
const USER_KEY = 'tpt_admin_user';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  save: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  user: () => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as { name: string; email: string; role: string }) : null;
  },
  saveUser: (user: { name: string; email: string; role: string }) =>
    localStorage.setItem(USER_KEY, JSON.stringify(user)),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export const api = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use(config => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    // A failed credential check is not a session expiry — wiping the stored token
    // there would sign the user out instead of showing the login error.
    const url = error.config?.url ?? '';
    const isCredentialCheck = /\/auth\/(login|register)/.test(url);
    if (error.response?.status === 401 && !isCredentialCheck) {
      tokenStore.clear();
      const onAdminLogin = window.location.pathname.startsWith('/admin/login');
      const insideAdmin = window.location.pathname.startsWith('/admin');
      if (insideAdmin && !onAdminLogin) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  },
);

export const extractError = (error: unknown, fallback = 'Something went wrong') => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message || error.message || fallback;
  }
  return fallback;
};

export default api;