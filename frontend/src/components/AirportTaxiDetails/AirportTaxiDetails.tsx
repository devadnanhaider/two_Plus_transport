import React from 'react';

export const AirportTaxiDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Punctual Arrivals & Departures Guaranteed
          </h2>
          <div className="w-16 h-1 bg-[#0066FF] rounded-full"></div>
          <p className="text-slate-700 text-sm leading-relaxed">
            Arriving in Doha after a long flight? Our professional chauffeurs track your flight in real-time. Even if your flight is delayed or lands early, your driver will be waiting in the arrival hall holding a personalized name sign.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Flight Delay Telemetry</h4>
              <p className="text-[11px] text-slate-600">Zero extra fees for delayed flight landings</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Luggage Assistance</h4>
              <p className="text-[11px] text-slate-600">Full handling of baggage to luxury vehicles</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
            <img src="/images/airport-transport.jpg" alt="Chauffeur Airport" className="w-full h-80 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};
