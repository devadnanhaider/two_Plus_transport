import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SchoolStaffHeroProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const SchoolStaffHero: React.FC<SchoolStaffHeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="relative py-24 bg-slate-950 text-white overflow-hidden">
      <img 
        src="/images/school-staff.jpg" 
        alt="School and Staff Transportation Qatar" 
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-400 border border-blue-500/40 text-xs font-extrabold uppercase tracking-widest">
          CORPORATE & EDUCATIONAL TRANSIT
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          School & Staff Transportation
        </h1>
        <p className="text-slate-300 text-base max-w-2xl font-light">
          Safe, punctual, and climate-controlled daily bus shuttles for corporate workforces, construction site staff, and international schools across Qatar.
        </p>
        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => onOpenQuoteModal('Staff Transportation')}
            className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white px-6 py-3.5 rounded-xl text-xs font-extrabold flex items-center space-x-2"
          >
            <span>INQUIRE FOR STAFF SHUTTLE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenQuoteModal('School Transportation')}
            className="border border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3.5 rounded-xl text-xs font-extrabold flex items-center space-x-2"
          >
            <span>SCHOOL TRANSIT QUOTE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
