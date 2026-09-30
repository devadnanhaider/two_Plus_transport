import React from 'react';
import { SERVICES_DATA, ServiceItem } from '../../data/mockData';
import {
  Users, GraduationCap, Plane, Car, Compass, Truck,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6 text-[#FF6B00]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#FF6B00]" />;
      case 'Plane': return <Plane className="w-6 h-6 text-[#FF6B00]" />;
      case 'Car': return <Car className="w-6 h-6 text-[#FF6B00]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#FF6B00]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#FF6B00]" />;
      default: return <Car className="w-6 h-6 text-[#FF6B00]" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-widest bg-orange-100/80 inline-block px-3 py-1 rounded-full border border-orange-200">
            OUR CORE TRANSPORT SERVICES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Transportation & Fleet Solutions in Qatar
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-[#FF6B00] mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base font-light pt-2">
            Whether you need daily corporate staff shuttles, secure school transit, VIP airport taxis, or 24/7 towing, our fleet is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1 hover:border-[#0066FF]"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/60 group-hover:bg-[#0066FF] transition-colors">
                  <span className="group-hover:text-white transition-colors">
                    {getIcon(service.iconName)}
                  </span>
                </div>

                <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-bold shadow-md">
                  From {service.pricingStarting}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenQuoteModal(service.title)}
                    className="btn-blue-outline w-full py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 font-bold transition-all shadow-sm"
                  >
                    <span>CLICK FOR INQUIRY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
