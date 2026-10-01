import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { QuoteModal } from './components/QuoteModal/QuoteModal';
import { TrackingModal } from './components/TrackingModal/TrackingModal';
import { AuthModal } from './components/AuthModal/AuthModal';

import { HomePage } from './pages/Home/HomePage';
import { ValetParkingPage } from './pages/ValetParking/ValetParkingPage';
import { SchoolStaffPage } from './pages/SchoolStaff/SchoolStaffPage';
import { AirportTaxiPage } from './pages/AirportTaxi/AirportTaxiPage';
import { TourPackagesPage } from './pages/TourPackages/TourPackagesPage';
import { TowingBreakdownPage } from './pages/TowingBreakdown/TowingBreakdownPage';
import { FleetPage } from './pages/Fleet/FleetPage';
import { AboutUsPage } from './pages/AboutUs/AboutUsPage';
import { BlogsPage } from './pages/Blogs/BlogsPage';
import { CareersPage } from './pages/Careers/CareersPage';
import { ContactPage } from './pages/Contact/ContactPage';

export function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteServiceType, setQuoteServiceType] = useState<string | undefined>(undefined);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenQuoteModal = (serviceType?: string) => {
    setQuoteServiceType(serviceType);
    setIsQuoteModalOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-[#0066FF]">

        {/* Navigation Bar */}
        <Navbar
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Main Body View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} onOpenTrackingModal={() => setIsTrackingModalOpen(true)} />} />
            <Route path="/valet-parking" element={<ValetParkingPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/school-staff-transport" element={<SchoolStaffPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/airport-taxi" element={<AirportTaxiPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/tour-packages" element={<TourPackagesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/towing-breakdown" element={<TowingBreakdownPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/fleet" element={<FleetPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/about-us" element={<AboutUsPage onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        />

        {/* Dynamic Modals */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialService={quoteServiceType}
        />

        <TrackingModal
          isOpen={isTrackingModalOpen}
          onClose={() => setIsTrackingModalOpen(false)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

      </div>
    </Router>
  );
}

export default App;
