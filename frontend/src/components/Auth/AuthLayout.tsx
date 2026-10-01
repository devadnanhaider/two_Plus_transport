import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Stagger } from '../common';

interface AuthLayoutProps {
  heading: string;
  subheading: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  heading,
  subheading,
  image,
  imageAlt,
  children,
  footerText,
  footerLinkLabel,
  footerLinkTo,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#F5F8FF] py-8 sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-72 w-96 rounded-full bg-[#0066FF]/10 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-72 w-96 rounded-full bg-[#00A3FF]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] sm:rounded-[36px]">
          <div className="grid lg:grid-cols-2">
            {/* ── Left: brand panel ── */}
            <div className="relative isolate hidden min-h-[260px] overflow-hidden bg-slate-950 p-9 lg:block">
              <img
                src={image}
                alt={imageAlt}
                className="absolute inset-0 -z-20 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/35" />

              <div className="flex h-full min-h-[220px] flex-col justify-start">
                <Stagger className="space-y-3" stagger={0.12} as="div">
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] sm:text-3xl">
                    {heading}
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {subheading}
                  </p>
                </Stagger>
              </div>
            </div>

            {/* ── Right: form panel ── */}
            <div className="px-6 py-8 sm:px-10 sm:py-9 lg:px-12">
              <div className="mb-6 space-y-1.5 border-b border-slate-100 pb-5 lg:hidden">
                <h1 className="text-xl font-bold tracking-tight text-[#0B1B33] sm:text-2xl">{heading}</h1>
                <p className="text-[13px] leading-relaxed text-[#475569]">{subheading}</p>
              </div>

              {children}

              <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-[#475569]">
                {footerText}{' '}
                <Link
                  to={footerLinkTo}
                  className="font-bold text-[#0066FF] transition hover:text-[#0052CC]"
                >
                  {footerLinkLabel}
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AuthLayout;
