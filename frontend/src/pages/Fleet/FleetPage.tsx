import React from 'react';
import { FleetShowcase } from '../../components/Home';

interface FleetPageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white min-h-screen pt-8">
      <FleetShowcase onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
