import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ValetHeroProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const ValetHero: React.FC<ValetHeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="relative py-24 bg-slate-950 text-white overflow-hidden">
      <img 
        src="/images/valet-parking.jpg" 
        alt="Luxury Valet Parking Qatar" 
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-400 border border-blue-500/40 text-xs font-extrabold uppercase tracking-widest">
          HOSPITALITY & VIP EVENT SERVICES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Professional Valet Parking Services
        </h1>
        <p className="text-slate-300 text-base max-w-2xl font-light">
          Premier valet operations for 5-star hotels, luxury shopping malls, VIP galas, private events, and corporate venues in Qatar.
        </p>
        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => onOpenQuoteModal('Valet Parking')}
            className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white px-6 py-3.5 rounded-xl text-xs font-extrabold flex items-center space-x-2 shadow-lg"
          >
            <span>BOOK VALET PARKING INQUIRY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
