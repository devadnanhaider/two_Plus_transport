import React, { useState } from 'react';
import { FLEET_DATA, Vehicle } from '../../data/mockData';
import { Users, ArrowRight, Check } from 'lucide-react';
import { Reveal, Stagger, TiltCard } from '../common';

interface FleetShowcaseProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const FleetShowcase: React.FC<FleetShowcaseProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Bus', 'Van', 'Luxury Sedan', 'Tow Truck'];

  const filteredFleet = selectedCategory === 'All'
    ? FLEET_DATA
    : FLEET_DATA.filter(v => v.category === selectedCategory);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center max-w-3xl mx-auto mb-12 space-y-3">
         
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Premium Vehicle Fleet
          </h2>
          <div className="w-20 h-1 bg-[#0066FF] mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm font-light">
            All vehicles in our fleet are regularly serviced, climate controlled, GPS tracked, and operated by licensed professional chauffeurs.
</p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-[#0066FF]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

<Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
          {filteredFleet.map((vehicle: Vehicle) => (
            <TiltCard key={vehicle.id} max={6} lift={10}>
            <div
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group h-full hover:border-sky-300"
            >
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                  {vehicle.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                    {vehicle.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600 bg-sky-50/60 p-2.5 rounded-lg border border-sky-100">
                    <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                      <Users className="w-4 h-4 text-[#0066FF]" />
                      <span>{vehicle.capacity}</span>
                    </div>
                    <span className="font-bold text-[#0066FF]">{vehicle.ratePerHour}</span>
                  </div>

                  <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                    {vehicle.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenQuoteModal(vehicle.name)}
                    className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 hover:brightness-110 shadow-sm"
                  >
                    <span>RESERVE VEHICLE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
</div>
            </TiltCard>
          ))}
        </Stagger>

      </div>
    </section>
  );
};
