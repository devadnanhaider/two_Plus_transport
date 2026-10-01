import React from 'react';

interface TourListProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const TourList: React.FC<TourListProps> = ({ onOpenQuoteModal }) => {
  const packages = [
    {
      title: 'Doha Highlights & Cultural Tour',
      duration: '4 Hours',
      highlights: ['Souq Waqif Old Market', 'Katara Cultural Village', 'The Pearl Qatar Island', 'Museum of Islamic Art Corniche'],
      image: '/images/hero-fleet.jpg'
    },
    {
      title: 'Desert Safari & Inland Sea Excursion',
      duration: '6 Hours',
      highlights: ['Dune Bashing 4x4', 'Camel Riding Experience', 'Khor Al Adaid Inland Sea', 'Traditional Desert Camp'],
      image: '/images/airport-transport.jpg'
    },
    {
      title: 'Full Day Qatar VIP Delegation Charter',
      duration: '10 Hours',
      highlights: ['Custom Itinerary', 'Multilingual Tour Chauffeur', 'Complimentary Refreshments', 'Luxury Executive Bus / SUV'],
      image: '/images/school-staff.jpg'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Featured Excursion Packages</h2>
        <p className="text-slate-600 text-sm">Tailored for corporate groups, VIP delegates, and international tourists.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-3">
                <div className="flex items-center text-xs text-[#0066FF] font-bold">
                  <span>{pkg.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{pkg.title}</h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button onClick={() => onOpenQuoteModal(pkg.title)} className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white w-full py-2.5 rounded-xl text-xs font-bold shadow">
                RESERVE TOUR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
