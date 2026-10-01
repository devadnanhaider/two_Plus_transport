import React from 'react';
import { TEAM_MEMBERS } from '../../data/mockData';
import { Mail, Phone } from 'lucide-react';
import { Reveal, Stagger } from '../common';

export const LeadershipSection: React.FC = () => {
  return (
    <section className="py-7 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Leadership Team
          </h2>
          <div className="w-20 h-1 bg-[#0066FF] mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm font-light">
            Dedicated transport professionals committed to delivering operational excellence and passenger safety every day.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 hover:border-sky-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="px-2.5 py-0.5 rounded bg-[#0066FF] text-white text-[10px] font-bold uppercase tracking-wider">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <a href={`mailto:${member.email}`} className="flex items-center space-x-2 hover:text-[#0066FF] transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span className="truncate">{member.email}</span>
                  </a>
                  <a href={`tel:${member.phone}`} className="flex items-center space-x-2 hover:text-[#0066FF] transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
</div>
          ))}
        </Stagger>

      </div>
    </section>
  );
};
