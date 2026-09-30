import React from 'react';
import { ExternalLink, Smartphone, Wrench, Truck } from 'lucide-react';

export const SisterProjects: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-sky-400 border border-blue-500/30 text-xs font-extrabold uppercase tracking-widest">
            OUR INNOVATIVE DIGITAL VENTURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Featured Online Projects & Services
          </h2>
          <div className="w-20 h-1 bg-[#0066FF] mx-auto rounded-full"></div>
          <p className="text-slate-400 text-sm font-light">
            Expanding our ecosystem across technical home services and automated cargo breakdown booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 hover:border-[#0066FF] transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-[#0066FF] flex items-center justify-center font-black text-xl">
                  <Wrench className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase border border-emerald-500/30">
                  Coming Soon Apps
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">
                Demand Here
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Demandhere.com is our company's online platform providing technical home & facility services like electrician work, plumbing, AC repair, sanitization, and maintenance services across Qatar.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Smartphone className="w-4 h-4 text-[#00A3FF]" />
                <span>Android & iOS App Ready</span>
              </div>
              <a
                href="https://demandtous.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#0066FF] hover:bg-[#0055FF] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <span>OPEN IN BROWSER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 hover:border-[#0066FF] transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-[#0066FF] flex items-center justify-center font-black text-xl">
                  <Truck className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold uppercase border border-sky-500/30">
                  Cargo & Towing App
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">
                Inloady Cargo & Breakdown
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Inloady is an automated online booking platform offering instant cargo solutions and breakdown recovery trucks with one-click dispatch for fast, reliable transportation.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Smartphone className="w-4 h-4 text-[#00A3FF]" />
                <span>1-Click Dispatch Booking</span>
              </div>
              <a
                href="https://demandtous.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#0066FF] hover:bg-[#0055FF] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <span>OPEN IN BROWSER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
