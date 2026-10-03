import React from 'react';
import { ArrowRight, ShieldCheck, Headset, Star, Users } from 'lucide-react';
import { COMPANY_INFO, CONTACT_LINKS } from '../../data/companyInfo';
import { Reveal, Stagger, TiltCard } from '../common';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

const STATS = [
  { value: '50+', label: 'Modern vehicles' },
  { value: '100K+', label: 'Happy passengers' },
  { value: '99.8%', label: 'On-time arrival' },
];

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: 'Safety first', text: 'Daily inspections and background-checked drivers.' },
  { icon: Headset, title: '24/7 dispatch', text: 'Live GPS and a round-the-clock hotline.' },
  { icon: Users, title: 'Professional teams', text: 'Uniformed drivers and hospitality-grade valet staff.' },
  { icon: Star, title: 'Premium fleet', text: 'Executive sedans, luxury coaches and event-ready cars.' },
];

// Live-board rows: status colour carries meaning (green = on time, blue = en route, amber = pickup soon)
const DISPATCH = [
  { job: 'Airport transfer', place: 'Hamad International', status: 'On time', dot: '#16A34A', text: '#15803D' },
  { job: 'Staff shuttle', place: 'Industrial Area', status: 'En route', dot: '#0066FF', text: '#0052CC' },
  { job: 'School run', place: 'West Bay', status: 'Pickup 07:10', dot: '#F59E0B', text: '#B45309' },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="bg-white py-10 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">

          {/* ── Copy ── */}
<Reveal className="lg:col-span-7 lg:pt-6">
            <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0B1B33] sm:text-5xl lg:text-6xl">
              Premium transport, delivered on time.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#475569] sm:text-lg">
              <span className="font-semibold text-[#0B1B33]">Two Plus Transport</span> moves
              Qatar&rsquo;s employees, students and guests. Staff shuttles, school runs, airport
              transfers, valet, tours and 24/7 towing, all from one licensed fleet.
            </p>

            {/* Highlights: ruled list instead of boxed cards */}
<Stagger className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2" stagger={0.1}>
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 border-t border-[#E2E8F0] py-6">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#0066FF]" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-semibold text-[#0B1B33]">{title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#64748B]">{text}</dd>
                  </div>
                </div>
              ))}
            </Stagger>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,102,255,0.7)] transition hover:bg-[#0052CC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2"
              >
                Request a company proposal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-7 py-4 text-sm font-semibold text-[#0B1B33] transition hover:border-[#25D366] hover:text-[#128C4A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                WhatsApp {COMPANY_INFO.whatsappDisplay}
              </a>
</div>
          </Reveal>

          {/* ── Visual ── */}
          <Reveal className="relative lg:col-span-5" delay={0.12}>
            <div className="relative overflow-hidden rounded-[2rem] [perspective:1100px]">
              <img
                src="/images/about-fleet.jpg"
                alt="Two Plus Transport executive fleet in Qatar"
                className="h-[520px] w-full object-cover sm:h-[600px] transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/60 via-transparent to-transparent" />
            </div>

            {/* The memorable moment: a live dispatch board overlapping the photo */}
            <div
              className="relative z-10 -mt-44 mx-4 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-20px_rgba(11,27,51,0.45)] ring-1 ring-[#0B1B33]/5 sm:-mt-40 sm:mx-8"
              role="region"
              aria-label="Live dispatch board"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#0B1B33]">Live dispatch</p>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-[#15803D]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16A34A]" />
                  </span>
                  Across Qatar
                </span>
              </div>

              <ul className="mt-4 divide-y divide-[#EEF2F7]">
                {DISPATCH.map(row => (
                  <li key={row.job} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#0B1B33]">{row.job}</p>
                      <p className="truncate text-xs text-[#64748B]">{row.place}</p>
                    </div>
                    <span
                      className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold"
                      style={{ color: row.text }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: row.dot }} aria-hidden="true" />
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
</div>
          </Reveal>
        </div>

        {/* Stats: one quiet full-width row */}
        <Stagger className="mt-20 grid grid-cols-3 border-t border-[#E2E8F0]" stagger={0.12}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-6 sm:py-10 ${i > 0 ? 'border-l border-[#E2E8F0] pl-3 sm:pl-10' : ''} pr-3 sm:pr-0`}
            >
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[#0B1B33] sm:text-6xl">{stat.value}</p>
              <p className="mt-2 text-[11px] leading-snug text-[#64748B] sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
};