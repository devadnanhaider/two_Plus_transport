import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react';
import { AuthLayout } from '../AuthLayout';
import { GoogleIcon } from '../GoogleIcon';
import api, { extractError, tokenStore } from '../../../lib/apiClient';
import { useToast } from '../../common/ToastProvider';

const inputBase =
  'w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-10 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post<{ token: string; user: { name: string; email: string; role: string } }>(
        '/auth/login',
        { email: email.trim(), password },
      );

      tokenStore.save(res.data.token);
      tokenStore.saveUser(res.data.user);

      if (res.data.user.role === 'admin') {
        toast.success('Signed in', 'Opening the admin panel.');
        navigate('/admin');
        return;
      }

      toast.success('Signed in', `Welcome back, ${res.data.user.name}.`);
      navigate('/account');
    } catch (err) {
      const message = extractError(err, 'Invalid email or password');
      setError(message);
      toast.error('Sign in failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Welcome Back to the Road."
      subheading="Everything you need for a smoother journey, all in one place."
      image="/images/auth-login.jpg"
      imageAlt="Two Plus Transport executive fleet"
      footerText="New to Two Plus Transport?"
      footerLinkLabel="Create an account"
      footerLinkTo="/signup"
    >
      <>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          <GoogleIcon className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">or sign in with email</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </>

      {error && (
        <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
          {error}
        </p>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email" className="mb-1 block text-[11px] font-bold text-slate-700">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="you@company.com"
              className={inputBase}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="login-password" className="block text-[11px] font-bold text-slate-700">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs font-semibold text-[#0066FF] transition hover:text-[#0052CC]">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="••••••••"
              className={`${inputBase} pr-10`}
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

        <label className="flex cursor-pointer items-center gap-2.5 pt-1 text-xs text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]" />
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0066FF]/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </form>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
        <Phone className="h-3.5 w-3.5 text-[#0066FF]" aria-hidden="true" />
        Trouble signing in? Call 24/7 support and we&rsquo;ll reset your access.
      </p>
    </AuthLayout>
  );
};

export default Login;
