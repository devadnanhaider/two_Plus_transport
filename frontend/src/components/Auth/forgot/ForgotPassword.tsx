import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, KeyRound, Loader2 } from 'lucide-react';
import { AuthLayout } from '../AuthLayout';
import api, { extractError } from '../../../lib/apiClient';
import { useToast } from '../../common/ToastProvider';

const inputBase =
  'w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10';

type Mode = 'request' | 'reset';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams();
  const token = params.get('token') || '';

  const [mode, setMode] = useState<Mode>(token ? 'reset' : 'request');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email: email.trim() });
      setDone(true);
      toast.success('Reset link requested', 'Check your inbox for the reset link.');
    } catch (err) {
      const message = extractError(err, 'Could not process that request');
      setError(message);
      toast.error('Request failed', message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      setDone(true);
      toast.success('Password updated', 'Sign in with your new password.');
    } catch (err) {
      const message = extractError(err, 'This reset link is invalid or has expired');
      setError(message);
      toast.error('Reset failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading={mode === 'reset' ? 'Choose a New Password.' : 'Reset Your Password.'}
      subheading={
        mode === 'reset'
          ? 'Pick a strong password to secure your Two Plus Transport account.'
          : 'Enter your registered email and we’ll send you a secure reset link.'
      }
      image="/images/auth-login.jpg"
      imageAlt="Two Plus Transport executive fleet"
      footerText="Remembered your password?"
      footerLinkLabel="Back to sign in"
      footerLinkTo="/login"
    >
      {done ? (
        <div className="py-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-7 w-7 text-emerald-500" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-[#0B1B33]">
            {mode === 'reset' ? 'Password updated' : 'Check your inbox'}
          </h2>
          <p className="mt-1.5 text-sm text-[#475569]">
            {mode === 'reset'
              ? 'Your password has been reset. You can sign in with your new password now.'
              : 'If an account exists for that email, a password reset link is on its way. The link expires in 15 minutes.'}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0052CC]"
          >
            Back to sign in
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <>
          {error && (
            <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
              {error}
            </p>
          )}

          {mode === 'request' ? (
            <form className="space-y-3" onSubmit={handleRequest}>
              <div>
                <label htmlFor="forgot-email" className="mb-1 block text-[11px] font-bold text-slate-700">
                  Email address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className={inputBase}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0066FF]/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                {loading ? 'Sending link…' : 'Send reset link'}
              </button>
            </form>
          ) : (
            <form className="space-y-3" onSubmit={handleReset}>
              <div>
                <label htmlFor="new-password" className="mb-1 block text-[11px] font-bold text-slate-700">
                  New password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Min. 6 characters"
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="mb-1 block text-[11px] font-bold text-slate-700">
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirm}
                  onChange={event => setConfirm(event.target.value)}
                  placeholder="Re-enter your password"
                  className={inputBase}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !token}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0066FF]/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                {loading ? 'Updating…' : 'Update password'}
              </button>

              <Link
                to="/forgot-password"
                onClick={() => { setMode('request'); setDone(false); setError(null); }}
                className="block text-center text-xs font-semibold text-[#0066FF] transition hover:text-[#0052CC]"
              >
                Request a new link
              </Link>
            </form>
          )}
        </>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;