import React from 'react';
import { TourPackagesHero } from '../../components/TourPackagesHero/TourPackagesHero';
import { TourList } from '../../components/TourList/TourList';

interface TourPackagesPageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const TourPackagesPage: React.FC<TourPackagesPageProps> = ({ onOpenQuoteModal, onOpenBookingModal }) => {
  return (
    <div className="bg-white min-h-screen">
      <TourPackagesHero onOpenQuoteModal={onOpenQuoteModal} />
      <TourList onOpenBookingModal={onOpenBookingModal} />
    </div>
  );
};
