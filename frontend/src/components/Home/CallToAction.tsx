import React from 'react';
import { ArrowRight, MessageCircle, Clock3, FileText, Bus } from 'lucide-react';
import { COMPANY_INFO, CONTACT_LINKS } from '../../data/companyInfo';

interface CallToActionProps {
  onOpenQuoteModal: () => void;
}

const TRUST_POINTS = [
  { icon: Clock3, label: 'Response within 1 hour' },
  { icon: FileText, label: 'No obligation quotes' },
  { icon: Bus, label: 'Fleet options for every budget' },
];

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl border border-slate-200 bg-slate-50/60 p-8 sm:p-10">

          {/* Copy */}
          <div className="lg:col-span-7 space-y-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0066FF]">
              Corporate &amp; Event Travel
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Get in Touch
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Tell us your routes, headcount and schedule &mdash; our dispatch team replies with a
              tailored, no-obligation proposal for staff commuting, VIP valet parking or
              executive airport transfers anywhere in Qatar.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Icon className="w-4 h-4 text-[#0066FF] shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Booking card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                Start Your Booking
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full bg-[#0066FF] hover:bg-[#0055FF] text-white px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={CONTACT_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp {COMPANY_INFO.whatsappDisplay}</span>
                </a>
              </div>

              <p className="pt-4 text-[11px] text-slate-500">
                or email{' '}
                <a
                  href={CONTACT_LINKS.mailto}
                  className="font-bold text-[#0066FF] hover:underline underline-offset-2"
                >
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};