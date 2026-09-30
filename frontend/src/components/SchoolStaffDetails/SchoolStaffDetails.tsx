import React from 'react';
import { Users, GraduationCap, CheckCircle2 } from 'lucide-react';

export const SchoolStaffDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 text-[#0066FF] text-xs font-bold uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>CORPORATE EMPLOYEE SHUTTLES</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Punctual Employee Commutes That Boost Productivity
          </h2>
          <div className="w-16 h-1 bg-[#0066FF] rounded-full"></div>
          <p className="text-slate-700 text-sm leading-relaxed">
            Managing workforce transit efficiently requires fixed routes, flexible fleet capacity, and relentless punctuality. We provide daily employee pick-and-drop services connecting residential zones to corporate offices, industrial sites, energy plants, and commercial centers.
          </p>

          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
              <span>Customized Shift Schedules & Route Optimization</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
              <span>Real-time Telemetry & Onboard Wi-Fi for Employees</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
              <span>Backup Standby Buses for 100% Zero-Downtime Guarantee</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
            <img src="/images/school-staff.jpg" alt="Corporate Bus Fleet" className="w-full h-80 object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-slate-200">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
            <img src="/images/hero-fleet.jpg" alt="School Bus Transit" className="w-full h-80 object-cover" />
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>SAFETY FIRST SCHOOL TRANSIT</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Child Safety & Parent Peace of Mind
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-full"></div>
          <p className="text-slate-700 text-sm leading-relaxed">
            Our school transportation division operates strictly under Qatar Ministry guidelines. Every bus is equipped with three-point seatbelts, interior CCTV surveillance, female bus supervisors, and automated door lock safety mechanisms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Female Bus Attendants</h4>
              <p className="text-[11px] text-slate-600">Assisting children during boarding and drop-off</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Parent Mobile Alerts</h4>
              <p className="text-[11px] text-slate-600">Live app alerts when the bus approaches student stop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
