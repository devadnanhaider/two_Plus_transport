import React, { useState, useEffect } from 'react';
import { X, User, Lock, Mail, Eye, EyeOff, Phone, ArrowRight, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setSubmitted(false);
      setShowPassword(false);
      setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const titles: Record<AuthMode, { heading: string; sub: string }> = {
    login: { heading: 'Welcome Back', sub: 'Sign in to your Two Plus Transport portal' },
    register: { heading: 'Create Account', sub: 'Join for priority booking & live tracking' },
    forgot: { heading: 'Reset Password', sub: 'We\'ll send a reset link to your email' },
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#0066FF]/80 px-6 py-6 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00A3FF] flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{titles[mode].heading}</h2>
                <p className="text-slate-400 text-xs mt-0.5">{titles[mode].sub}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher for login/register */}
          {mode !== 'forgot' && (
            <div className="flex mt-5 bg-white/10 rounded-xl p-1">
              {(['login', 'register'] as AuthMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setSubmitted(false); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                    mode === m ? 'bg-white text-slate-900 shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                {mode === 'login' ? 'Signed In!' : mode === 'forgot' ? 'Reset Link Sent!' : 'Account Created!'}
              </h3>
              <p className="text-slate-500 text-sm max-w-xs">
                {mode === 'login'
                  ? 'Welcome back! You now have access to your transport portal.'
                  : mode === 'forgot'
                  ? `A password reset link has been sent to ${form.email || 'your email'}.`
                  : 'Your account has been created. You can now manage bookings and track your fleet.'}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#0066FF] text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all"
              >
                Continue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name – register only */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                    />
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                  />
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Phone – register only */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+974 XXXX XXXX"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                    />
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              )}

              {/* Password */}
              {mode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Min. 8 characters"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10 pr-10"
                    />
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password – register only */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Re-enter password"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                    />
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              )}

              {/* Forgot password link */}
              {mode === 'login' && (
                <div className="text-right -mt-1">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-[#0066FF] hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white rounded-xl py-3 font-black text-sm hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20 mt-2"
              >
                <span>
                  {mode === 'login' ? 'Sign In to Portal' : mode === 'forgot' ? 'Send Reset Link' : 'Create My Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Back to login from forgot */}
              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-center text-slate-500 text-xs hover:text-[#0066FF] font-medium transition-colors"
                >
                  ← Back to Sign In
                </button>
              )}

              {/* Benefits for register */}
              {mode === 'register' && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mt-2">
                  <p className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-2">Portal Benefits</p>
                  <div className="space-y-1.5">
                    {['Live GPS tracking for all your bookings', 'Instant e-invoice generation & download', 'Dedicated account manager access', 'Priority quote & booking processing'].map((b, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-[#0066FF]/10 flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                        </div>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
