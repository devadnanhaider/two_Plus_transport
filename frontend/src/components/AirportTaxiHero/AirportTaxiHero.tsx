import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AirportTaxiHeroProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const AirportTaxiHero: React.FC<AirportTaxiHeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="relative py-24 bg-slate-950 text-white overflow-hidden">
      <img 
        src="/images/hero-slides/slide-airport-vip.jpg" 
        alt="Airport Taxi Qatar" 
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-400 border border-blue-500/40 text-xs font-extrabold uppercase tracking-widest">
          24/7 AIRPORT TAXI & CHAUFFEUR
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Airport Taxi & Executive Pickups
        </h1>
        <p className="text-slate-300 text-base max-w-2xl font-light">
          Stress-free Hamad International Airport transfers with meet-and-greet service, flight delay monitoring, and luxury executive sedans & VIP vans.
        </p>
        <div className="pt-4">
          <button
            onClick={() => onOpenQuoteModal('Airport Transportation')}
            className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white px-6 py-3.5 rounded-xl text-xs font-extrabold flex items-center space-x-2"
          >
            <span>BOOK AIRPORT TAXI NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
