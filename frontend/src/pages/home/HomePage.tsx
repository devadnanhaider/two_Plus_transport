import React from 'react';
import {
  Hero,
  ServicesSection,
  AboutSection,
  MissionValues,
  FleetShowcase,
  LeadershipSection,
Testimonials,
} from '../../components/Home';
import CallToAction from '../../components/Home/CallToAction';

interface HomePageProps {
  onOpenQuoteModal: (serviceType?: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
  onOpenTrackingModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal, onOpenBookingModal, onOpenTrackingModal }) => {
  return (
    <div className="space-y-0 bg-white">
      {/* 1. Hero Section */}
      <Hero
          onOpenQuoteModal={onOpenQuoteModal}
          onOpenBookingModal={onOpenBookingModal}
          onOpenTrackingModal={onOpenTrackingModal}
        />

      {/* 2. Core Transport Services Section */}
      <ServicesSection onOpenQuoteModal={onOpenQuoteModal} onOpenBookingModal={onOpenBookingModal} />

      {/* 3. About Company Section */}
      <AboutSection onOpenQuoteModal={() => onOpenQuoteModal()} />

      {/* 4. Purpose & Mission Values */}
      <MissionValues />

      {/* 5. Fleet Catalog Showcase */}
      <FleetShowcase onOpenQuoteModal={onOpenQuoteModal} />

      {/* 6. Leadership Team Section */}
      <LeadershipSection />

      {/* 7. Testimonials Section */}
      <Testimonials />

      {/* 8. Call-to-Action Banner */}
      <CallToAction onOpenQuoteModal={() => onOpenQuoteModal()} />
    </div>
  );
};
