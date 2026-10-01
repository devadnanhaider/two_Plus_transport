import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { AuthLayout } from '../AuthLayout';
import { GoogleIcon } from '../GoogleIcon';
import api, { extractError, tokenStore } from '../../../lib/apiClient';
import { useToast } from '../../common/ToastProvider';

const inputBase =
  'w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-10 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10';

const inputPlain =
  'w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10';

const labelBase = 'mb-1 block text-[11px] font-bold text-slate-700';

const iconBase = 'pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400';

export const Signup: React.FC = () => {
const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post<{ token: string; user: { name: string; email: string; role: string } }>(
        '/auth/register',
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          password,
        },
      );

      tokenStore.save(res.data.token);
      tokenStore.saveUser(res.data.user);

      if (res.data.user.role === 'admin') {
        toast.success('Signed in', 'Opening the admin panel.');
        navigate('/admin');
        return;
      }

      toast.success('Account created', `Welcome aboard, ${res.data.user.name}.`);
      navigate('/account');
    } catch (err) {
      const message = extractError(err, 'Could not create your account');
      setError(message);
      toast.error('Sign up failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Start Your Journey With Us."
      subheading="Create your account and experience transportation made simple."
      image="/images/auth-login.jpg"
      imageAlt="Two Plus Transport executive fleet"
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
<>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <GoogleIcon className="h-5 w-5" />
            Sign up with Google
          </button>

          <div className="my-4 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">or use your email</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

{error && (
            <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
              {error}
            </p>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="signup-name" className={labelBase}>
                  Full name
                </label>
                <div className="relative">
                  <User className={iconBase} aria-hidden="true" />
                  <input id="signup-name" type="text" required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className={inputBase} />
                </div>
              </div>

              <div>
                <label htmlFor="signup-company" className={labelBase}>
                  Company
                </label>
                <input
                  id="signup-company"
                  type="text"
autoComplete="organization"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Organisation"
                  className={inputPlain}
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className={labelBase}>
                Email address
              </label>
              <div className="relative">
                <Mail className={iconBase} aria-hidden="true" />
                <input
                  id="signup-email"
                  type="email"
                  required
autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={inputBase}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="signup-phone" className={labelBase}>
                  Mobile number
                </label>
                <div className="relative">
                  <Phone className={iconBase} aria-hidden="true" />
                  <input
                    id="signup-phone"
                    type="tel"
                    required
autoComplete="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+974 5xxx xxxx"
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className={labelBase}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={iconBase} aria-hidden="true" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className={inputBase}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-[#0066FF]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-2.5 pt-0.5 text-[11px] leading-relaxed text-slate-600">
              <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]" />
              <span>
                I agree to the{' '}
                <span className="font-semibold text-[#0066FF]">Terms of Service</span> and{' '}
                <span className="font-semibold text-[#0066FF]">Privacy Policy</span>.
              </span>
            </label>

<button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0066FF]/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </form>
        </>
    </AuthLayout>
  );
};

export default Signup;
