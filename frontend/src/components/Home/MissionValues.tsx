import React from 'react';
import { Award, Heart, Shield } from 'lucide-react';
import { Reveal, Stagger } from '../common';

export const MissionValues: React.FC = () => {
  return (
    <section className="py-7 bg-sky-50/60 border-y border-sky-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
<Reveal className="text-center max-w-4xl mx-auto mb-8 space-y-4">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Mission
          </h2>
          <div className="w-20 h-1 bg-[#0066FF] mx-auto rounded-full"></div>
          
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
            Our mission is to provide safe, reliable, and efficient transportation solutions in Qatar, specializing in staff transportation, school transportation, airport transportation, valet parking, and Qatar tour packages.
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            With a focus on exceptional customer service, we ensure top-quality and tailored transportation services to meet all your travel needs in Qatar.
</p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12" stagger={0.12}>
          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/80 hover:border-[#0066FF] hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-[#0066FF] flex items-center justify-center mb-6 group-hover:bg-[#0066FF] group-hover:text-white transition-colors shadow-sm">
              <Award className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
              Dependable Service
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              We deliver on our promises with consistent, on-time transportation you can trust for daily corporate commuting and urgent dispatch.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/80 hover:border-[#0066FF] hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-[#0066FF] flex items-center justify-center mb-6 group-hover:bg-[#0066FF] group-hover:text-white transition-colors shadow-sm">
              <Heart className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
              Customer First
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              Our customers are at the heart of everything we do, ensuring personalized, responsive, and tailored transportation solutions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/80 hover:border-[#0066FF] hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-[#0066FF] flex items-center justify-center mb-6 group-hover:bg-[#0066FF] group-hover:text-white transition-colors shadow-sm">
              <Shield className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
              Safety and Care
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              We prioritize the safety of our passengers, cargo, and team through rigorous standards, safety certifications, and care in every journey.
</p>
          </div>
        </Stagger>

      </div>
    </section>
  );
};
