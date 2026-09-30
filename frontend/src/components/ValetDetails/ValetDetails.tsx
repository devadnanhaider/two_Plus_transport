import React from 'react';
import { KeyRound, ShieldCheck } from 'lucide-react';

interface ValetDetailsProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const ValetDetails: React.FC<ValetDetailsProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Seamless First Impressions for Your Guests & Venues
          </h2>
          <div className="w-16 h-1 bg-[#0066FF] rounded-full"></div>
          <p className="text-slate-700 text-sm leading-relaxed">
            At Two Plus Transport, our valet parking team delivers a polished, high-end concierge experience. We understand that valet parking is often the first and last touchpoint for your visitors. Our uniformed attendants are trained in executive courtesy, safe driving standards, key management protocols, and high-volume vehicle maneuvering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex items-start space-x-3">
              <KeyRound className="w-5 h-5 text-[#0066FF] mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Digital Ticket System</h4>
                <p className="text-[11px] text-slate-600">Automated SMS & QR key retrieval for guests</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#0066FF] mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Full Comprehensive Insurance</h4>
                <p className="text-[11px] text-slate-600">Total liability coverage for all parked vehicles</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
            <img src="/images/valet-parking.jpg" alt="Valet Chauffeur" className="w-full h-80 object-cover" />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 text-center">
          Ideal For All Venue Types Across Qatar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-[#0066FF] mx-auto flex items-center justify-center font-bold">1</div>
            <h4 className="text-sm font-bold text-slate-900">5-Star Hotels & Resorts</h4>
            <p className="text-xs text-slate-500">24/7 dedicated valet staffing & VIP guest assistance</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-[#0066FF] mx-auto flex items-center justify-center font-bold">2</div>
            <h4 className="text-sm font-bold text-slate-900">Corporate & Weddings</h4>
            <p className="text-xs text-slate-500">Event capacity management & traffic coordination</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-[#0066FF] mx-auto flex items-center justify-center font-bold">3</div>
            <h4 className="text-sm font-bold text-slate-900">Fine Dining Restaurants</h4>
            <p className="text-xs text-slate-500">Fast vehicle retrieval with guest notification SMS</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-[#0066FF] mx-auto flex items-center justify-center font-bold">4</div>
            <h4 className="text-sm font-bold text-slate-900">Malls & Commercial Centers</h4>
            <p className="text-xs text-slate-500">High-volume valet parking control & safety</p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-900">Need Custom Valet Staffing for Your Venue?</h3>
        <button
          onClick={() => onOpenQuoteModal('Valet Parking')}
          className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg"
        >
          REQUEST VALET PARKING PROPOSAL
        </button>
      </div>
    </div>
  );
};
