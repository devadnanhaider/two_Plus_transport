import React from 'react';
import { AboutSection, MissionValues, LeadershipSection } from '../../components/Home';

interface AboutUsPageProps {
  onOpenQuoteModal: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-950 text-white py-16 text-center">
        <h1 className="text-4xl font-black">About Two Plus Transport WLL</h1>
        <p className="text-slate-400 text-sm mt-2">Connecting Qatar through dependable, safe, and professional transportation solutions.</p>
      </div>
      <AboutSection onOpenQuoteModal={onOpenQuoteModal} />
      <MissionValues />
      <LeadershipSection />
    </div>
  );
};
