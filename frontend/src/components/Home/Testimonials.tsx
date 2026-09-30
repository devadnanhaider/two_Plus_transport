import React from 'react';
import { TESTIMONIALS_DATA } from '../../data/mockData';
import { Star, Quote } from 'lucide-react';
import { Reveal, Stagger } from '../common';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Leaders Across Qatar
          </h2>
          <div className="w-20 h-1 bg-[#0066FF] mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm font-light">
            Read what corporate event organizers, school boards, and resort directors say about our service.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:border-sky-300"
            >
              <Quote className="w-10 h-10 text-sky-200 absolute top-6 right-6 group-hover:text-sky-300 transition-colors" />

              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center space-x-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0066FF]"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}, <span className="text-[#0066FF] font-semibold">{t.company}</span></p>
                </div>
              </div>
</div>
          ))}
        </Stagger>

      </div>
    </section>
  );
};
