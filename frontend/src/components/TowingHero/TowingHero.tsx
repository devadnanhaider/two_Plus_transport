import React from 'react';
import { PhoneCall } from 'lucide-react';
import { CONTACT_LINKS } from '../../data/companyInfo';

interface TowingHeroProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const TowingHero: React.FC<TowingHeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="relative py-24 bg-slate-950 text-white overflow-hidden">
      <img src="/images/towing-service.jpg" alt="Emergency Towing Qatar" className="absolute inset-0 w-full h-full object-cover object-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-extrabold uppercase tracking-widest">
          24/7 RAPID DISPATCH
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Towing & Breakdown Roadside Rescue
        </h1>
        <p className="text-slate-300 text-base max-w-2xl font-light">
          Stranded on the highway? Heavy hydraulic flatbed tow trucks, zero-damage wheel strapping, jump starts, and vehicle recovery across all Qatar highways.
        </p>
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={CONTACT_LINKS.telMobile} className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white px-6 py-3.5 rounded-xl text-xs font-black flex items-center space-x-2">
            <PhoneCall className="w-4 h-4" />
            <span>DISPATCH TOW TRUCK IMMEDIATELY</span>
          </a>
          <button onClick={() => onOpenQuoteModal('Towing & Breakdown')} className="border border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3.5 rounded-xl text-xs font-bold">
            SCHEDULE VEHICLE TRANSPORT
          </button>
        </div>
      </div>
    </div>
  );
};
