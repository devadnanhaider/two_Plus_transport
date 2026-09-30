import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [appliedRole, setAppliedRole] = useState<string | null>(null);

  const jobs = [
    { title: 'VIP Chauffeur & Executive Driver', location: 'Doha, Qatar', type: 'Full-Time', req: 'Valid Qatar Heavy/Light Driving License, 3+ Years Experience' },
    { title: 'Fleet Operations Coordinator', location: 'West Bay, Doha', type: 'Full-Time', req: 'B.Sc/Diploma in Logistics, Fluent English & Arabic' },
    { title: 'Heavy Duty Tow Truck Operator', location: 'Industrial Area, Doha', type: 'Shift Based', req: 'Hydraulic Flatbed experience, Qatari License Class 5' },
    { title: 'Valet Operations Supervisor', location: 'Katara / Pearl Qatar', type: 'Full-Time', req: '5-Star Hotel Valet experience, Team Leadership' }
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-sky-50 text-[#0066FF] border border-sky-200 text-xs font-extrabold uppercase">
            JOIN OUR GROWING TEAM
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900">Career Opportunities</h1>
          <p className="text-slate-600 text-sm">Build your career with Qatar's leading transportation and logistics fleet operator.</p>
        </div>

        {appliedRole && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center text-emerald-800 text-xs font-bold">
            ✓ Application submitted for {appliedRole}! Our HR team will reach out shortly.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((j, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-[#0066FF] transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-slate-900">{j.title}</h3>
                  <span className="px-2.5 py-0.5 rounded bg-sky-100 text-[#0066FF] text-[10px] font-bold">{j.type}</span>
                </div>
                <p className="text-xs text-slate-500 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>{j.location}</span>
                </p>
                <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                  <strong className="text-slate-900">Requirements:</strong> {j.req}
                </p>
              </div>

              <button
                onClick={() => setAppliedRole(j.title)}
                className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white w-full py-2.5 rounded-xl text-xs font-bold shadow"
              >
                APPLY FOR POSITION
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
