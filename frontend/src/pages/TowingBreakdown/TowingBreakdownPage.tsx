import React from 'react';
import { TowingHero } from '../../components/TowingHero/TowingHero';
import { TowingDetails } from '../../components/TowingDetails/TowingDetails';

interface TowingBreakdownPageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const TowingBreakdownPage: React.FC<TowingBreakdownPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white min-h-screen">
      <TowingHero onOpenQuoteModal={onOpenQuoteModal} />
      <TowingDetails />
    </div>
  );
};
