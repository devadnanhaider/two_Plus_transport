import React from 'react';
import { AirportTaxiHero } from '../../components/AirportTaxiHero/AirportTaxiHero';
import { AirportTaxiDetails } from '../../components/AirportTaxiDetails/AirportTaxiDetails';

interface AirportTaxiPageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const AirportTaxiPage: React.FC<AirportTaxiPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white min-h-screen">
      <AirportTaxiHero onOpenQuoteModal={onOpenQuoteModal} />
      <AirportTaxiDetails />
    </div>
  );
};
