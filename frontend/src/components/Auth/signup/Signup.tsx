import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { AuthLayout } from '../AuthLayout';
import { GoogleIcon } from '../GoogleIcon';

const inputBase =
  'w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-10 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10';

const inputPlain =
  'w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10';

const labelBase = 'mb-1 block text-[11px] font-bold text-slate-700';

const iconBase = 'pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400';

export const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      {submitted ? (
        <div className="py-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-7 w-7 text-emerald-500" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-[#0B1B33]">Account created</h2>
          <p className="mt-1.5 text-sm text-[#475569]">
            We&rsquo;ve sent a confirmation email. Your account manager will reach out shortly.
          </p>
        </div>
      ) : (
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

          <form
            className="space-y-3"
            onSubmit={event => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="signup-name" className={labelBase}>
                  Full name
                </label>
                <div className="relative">
                  <User className={iconBase} aria-hidden="true" />
                  <input id="signup-name" type="text" required autoComplete="name" placeholder="Your name" className={inputBase} />
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
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0066FF]/25 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Create account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </form>
        </>
      )}
    </AuthLayout>
  );
};

export default Signup;
