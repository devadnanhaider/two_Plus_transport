import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import api, { extractError, tokenStore } from '../../lib/apiClient';
import { COMPANY_INFO } from '../../data/companyInfo';
import { useToast } from '../../components/common/ToastProvider';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const storedUser = tokenStore.user();

  if (storedUser?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post<{ token: string; user: { name: string; email: string; role: string } }>('/auth/login', {
        email,
        password,
      });

      if (res.data.user.role !== 'admin') {
        tokenStore.clear();
        setError('This account does not have admin access.');
        toast.error('Access denied', 'This account does not have admin access.');
        return;
      }

      tokenStore.save(res.data.token);
      tokenStore.saveUser(res.data.user);
      toast.success('Signed in', 'Welcome to the Two Plus Transport admin panel.');
      navigate('/admin');
    } catch (err) {
      const message = extractError(err, 'Sign in failed');
      setError(message);
      toast.error('Sign in failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-950 lg:block">
        <img src="/images/hero-fleet.jpg" alt="Two Plus Transport fleet" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00A3FF]">
            {COMPANY_INFO.name}
          </p>
          <div>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white">
              Control every trip, quote and vehicle.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Dispatch dashboard with live bookings, quote pricing, service demand analytics and account management.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#F5F8FF] px-5 py-12">
        <div className="w-full max-w-md">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#00A3FF] to-[#0055FF] text-white shadow-lg shadow-[#0066FF]/30">
            <ShieldCheck className="h-6 w-6" />
          </span>

          <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-900">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-slate-500">Staff credentials required to access the dispatch panel.</p>

          {error && (
            <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-xs font-bold text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="dispatch@twoplus.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm outline-none transition focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-[#0066FF]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0066FF]/25 transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in to dashboard'}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <Link to="/" className="mt-6 block text-center text-xs font-semibold text-slate-500 transition hover:text-[#0066FF]">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
