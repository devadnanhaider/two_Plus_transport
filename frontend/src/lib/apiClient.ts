import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'tpt_admin_token';
const USER_KEY = 'tpt_admin_user';

type AuthStorage = 'local' | 'session';

const stores: Record<AuthStorage, Storage> = {
  local: window.localStorage,
  session: window.sessionStorage,
};

const write = (store: AuthStorage, key: string, value: string) => {
  const target = stores[store];
  target.setItem(key, value);
  const other = store === 'local' ? stores.session : stores.local;
  other.removeItem(key);
};

const read = (key: string) => stores.local.getItem(key) ?? stores.session.getItem(key);

const drop = (key: string) => {
  stores.local.removeItem(key);
  stores.session.removeItem(key);
};

export const tokenStore = {
  get: () => read(TOKEN_KEY),
  /** Remembered sessions persist in localStorage; otherwise they die with the tab. */
  save: (token: string, remember = true) => write(remember ? 'local' : 'session', TOKEN_KEY, token),
  user: () => {
    const raw = read(USER_KEY);
    return raw ? (JSON.parse(raw) as { name: string; email: string; role: string }) : null;
  },
  saveUser: (user: { name: string; email: string; role: string }, remember = true) =>
    write(remember ? 'local' : 'session', USER_KEY, JSON.stringify(user)),
  clear: () => {
    drop(TOKEN_KEY);
    drop(USER_KEY);
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
      const onLogin = window.location.pathname === '/login';
      if (window.location.pathname.startsWith('/admin') && !onLogin) {
        window.location.href = '/login';
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