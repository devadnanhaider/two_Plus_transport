import React from 'react';
import { SchoolStaffHero } from '../../components/SchoolStaffHero/SchoolStaffHero';
import { SchoolStaffDetails } from '../../components/SchoolStaffDetails/SchoolStaffDetails';

interface SchoolStaffPageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
}

export const SchoolStaffPage: React.FC<SchoolStaffPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white min-h-screen">
      <SchoolStaffHero onOpenQuoteModal={onOpenQuoteModal} />
      <SchoolStaffDetails />
    </div>
  );
};
