import React from 'react';
import { SERVICES_DATA, ServiceItem } from '../../data/mockData';
import { Reveal, Stagger, TiltCard } from '../common';
import {
  Users, GraduationCap, Plane, Car, Compass, Truck,
  ArrowRight, Clock
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceType?: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

const ICONS = {
  Users,
  GraduationCap,
  Plane,
  Car,
  Compass,
  Truck,
} as const;

export const SERVICE_ENUM_BY_ID: Record<string, string> = {
  'staff-transportation': 'Staff Transportation',
  'school-transportation': 'School Transportation',
  'airport-taxi': 'Airport Transportation',
  'airport-transportation': 'Airport Transportation',
  'valet-parking': 'Valet Parking',
  'tour-packages': 'Tour Packages',
  'towing-breakdown': 'Towing & Breakdown',
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal, onOpenBookingModal }) => {
  const getIcon = (iconName: string) => {
    const Icon = ICONS[iconName as keyof typeof ICONS] ?? Car;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-orange-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <Reveal className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          

          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Tailored transportation &amp; fleet solutions in Qatar
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed pt-1">
            Whether you need daily corporate staff shuttles, secure school transit, VIP airport
            taxis, or 24/7 towing, our fleet is at your service.
</p>
        </Reveal>

        {/* ── Cards ── */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
{SERVICES_DATA.map((service: ServiceItem, index: number) => (
            <TiltCard key={service.id} max={7} lift={12}>
            <article
              className="group relative bg-white rounded-3xl border border-slate-200 shadow-[0_2px_18px_-8px_rgba(15,23,42,0.15)] hover:shadow-[0_28px_60px_-24px_rgba(15,23,42,0.35)] transition-shadow duration-300 hover:border-[#FF6B00]/40 overflow-hidden flex flex-col h-full"
            >
              {/* Top accent bar */}
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF6B00] to-[#FFB020] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                {/* Number */}
                <span className="absolute top-4 right-4 text-4xl font-black text-white/25 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon badge */}
                <span className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/60 text-[#FF6B00] transition-all duration-300 group-hover:bg-[#FF6B00] group-hover:text-white group-hover:rotate-3">
                  {getIcon(service.iconName)}
                </span>

                {/* Price */}
                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold">
                  <Clock className="w-3 h-3 text-[#FF6B00]" />
                  From {service.pricingStarting}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#E05D00] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[13px] text-slate-600 leading-relaxed mt-2 flex-1">
                  {service.description}
                </p>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => onOpenBookingModal(SERVICE_ENUM_BY_ID[service.id])}
                    className="btn-blue-outline px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
</article>
            </TiltCard>
          ))}
        </Stagger>

      </div>
    </section>
  );
};