import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { COMPANY_INFO, CONTACT_LINKS } from '../../data/companyInfo';
import { Reveal } from '../common';

interface CallToActionProps {
  onOpenQuoteModal: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="relative overflow-hidden bg-white py-7 sm:py-10">
      <Reveal className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-slate-950 px-7 py-14 text-center sm:px-14 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% -20%, rgba(0,102,255,0.55), transparent 60%), radial-gradient(circle at 100% 110%, rgba(0,163,255,0.35), transparent 55%)',
            }}
          />

          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00A3FF]">
              Let&rsquo;s move you
            </p>

            <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
              Your next journey starts here
            </h2>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => onOpenQuoteModal()}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#0B1B33] transition hover:-translate-y-0.5 hover:bg-[#00A3FF] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
              >
                Get an instant quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>

              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-[#25D366] hover:text-[#25D366] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] sm:w-auto"
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>

            <p className="mt-8 text-xs text-slate-400 sm:text-[13px]">
              Or call{' '}
              <a href={CONTACT_LINKS.telLandline} className="font-semibold text-slate-200 transition hover:text-[#00A3FF]">
                {COMPANY_INFO.landlineDisplay}
              </a>
              {' · '}
              <a href={CONTACT_LINKS.mailto} className="font-semibold text-slate-200 transition hover:text-[#00A3FF]">
                {COMPANY_INFO.email}
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CallToAction;