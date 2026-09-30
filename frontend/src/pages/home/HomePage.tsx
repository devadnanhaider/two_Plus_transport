import React from 'react';
import {
  Hero,
  ServicesSection,
  AboutSection,
  MissionValues,
  FleetShowcase,
  LeadershipSection,
  Testimonials,
} from '../../components/Home';
import { ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, CONTACT_LINKS } from '../../data/companyInfo';

interface HomePageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
  onOpenTrackingModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal, onOpenTrackingModal }) => {
  return (
    <div className="space-y-0 bg-white">
      {/* 1. Hero Section */}
      <Hero onOpenQuoteModal={onOpenQuoteModal} onOpenTrackingModal={onOpenTrackingModal} />

      {/* 2. Core Transport Services Section */}
      <ServicesSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* 3. About Company Section */}
      <AboutSection onOpenQuoteModal={() => onOpenQuoteModal()} />

      {/* 4. Purpose & Mission Values */}
      <MissionValues />

      {/* 5. Fleet Catalog Showcase */}
      <FleetShowcase onOpenQuoteModal={onOpenQuoteModal} />

      {/* 6. Leadership Team Section */}
      <LeadershipSection />

      {/* 7. Testimonials Section */}
      <Testimonials />

      {/* 8. High-Impact Call-to-Action Banner */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        {/* Ambient background */}
        <img
          src="/images/towing-service.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#0066FF]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#FF6B00]/20 blur-3xl" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Copy */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                Corporate &amp; Event Travel
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.15]">
                Ready to upgrade your{' '}
                <span className="text-[#FF6B00]">corporate or event</span> transportation?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Tell us your routes, headcount and schedule — our dispatch team replies with a
                tailored, no-obligation proposal for staff commuting, VIP valet parking or executive
                airport transfers anywhere in Qatar.
              </p>

              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-1">
                {[
                  'Response within 1 hour',
                  'No obligation quotes',
                  'Fleet options for every budget',
                ].map(point => (
                  <li key={point} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40 p-6 sm:p-8 space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-300">
                  Start Your Booking
                </p>

                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white hover:brightness-110 px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={CONTACT_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-900/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp {COMPANY_INFO.whatsappDisplay}</span>
                </a>

                <p className="pt-1 text-center text-[11px] text-slate-400">
                  or email{' '}
                  <a href={CONTACT_LINKS.mailto} className="text-slate-200 hover:text-white underline underline-offset-2">
                    {COMPANY_INFO.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
