import React from 'react';
import { ValetHero } from '../../components/ValetHero/ValetHero';
import { ValetDetails } from '../../components/ValetDetails/ValetDetails';

interface ValetParkingPageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const ValetParkingPage: React.FC<ValetParkingPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white min-h-screen">
      <ValetHero onOpenQuoteModal={onOpenQuoteModal} />
      <ValetDetails onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
