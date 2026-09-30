import React from 'react';
import { ArrowRight, Plane, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, CONTACT_LINKS } from '../../data/companyInfo';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
              <img 
                src="/images/airport-transport.jpg" 
                alt="Two Plus Transport Qatar Executive Fleet" 
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-xl flex items-center justify-around text-center">
                <div>
                  <p className="text-2xl font-black text-[#0066FF]">500+</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase">Modern Vehicles</p>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-black text-slate-900">100K+</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase">Happy Passengers</p>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-black text-[#0066FF]">99.8%</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase">On-Time Arrival</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-200/50 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="lg:col-span-7 space-y-6">
           

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Leading Provider of Executive Transportation & Fleet Management
            </h2>

            <div className="w-20 h-1 bg-[#0066FF] rounded-full"></div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-light">
              <strong className="font-bold text-slate-900">Two Plus Transport</strong> is a premier transportation services provider in Qatar, specializing in staff transportation, school transportation, airport taxi transfers, valet parking management, tour packages, and roadside towing. We offer reliable, safe, and efficient mobility solutions ensuring your employees, students, and guests travel comfortably and strictly on schedule.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Our safety-first fleet features state-of-the-art vehicles equipped with real-time GPS tracking, climate control, certified professional chauffeurs, and 24/7 centralized dispatch support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#0066FF] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Rigorous Safety Standards</h4>
                  <p className="text-[11px] text-slate-600">Daily vehicle inspection & background checked drivers</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#0066FF] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">24/7 Dedicated Dispatch</h4>
                  <p className="text-[11px] text-slate-600">Round-the-clock hotline & live GPS telemetry</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white px-6 py-3 rounded-xl text-xs font-extrabold flex items-center space-x-2 shadow-md hover:brightness-110"
              >
                <span>REQUEST COMPANY PROPOSAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-[#0066FF] text-[#0066FF] hover:bg-sky-50 px-6 py-3 rounded-xl text-xs font-extrabold flex items-center space-x-2"
              >
                <span>CHAT ON WHATSAPP {COMPANY_INFO.whatsappDisplay}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
