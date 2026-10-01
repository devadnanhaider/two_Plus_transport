import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { QuoteModal } from './components/QuoteModal/QuoteModal';
import { BookingModal } from './components/BookingModal/BookingModal';
import { TrackingModal } from './components/TrackingModal/TrackingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp/FloatingWhatsApp';
import { ToastProvider } from './components/common/ToastProvider';
import { Login } from './components/Auth/login/Login';
import { Signup } from './components/Auth/signup/Signup';
import { ForgotPassword } from './components/Auth/forgot/ForgotPassword';
import { AccountPage } from './components/Auth/account/AccountPage';

import { HomePage } from './pages/home/HomePage';
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

import AdminLayout from './components/adminPanel/layout/Layout';
import RequireAuth from './components/adminPanel/auth/RequireAuth';
import { Dashboard } from './pages/admin/Dashboard';
import { BookingsPage } from './pages/admin/BookingsPage';
import { QuotesPage } from './pages/admin/QuotesPage';
import { UsersPage } from './pages/admin/UsersPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { FleetPage as AdminFleetPage } from './pages/admin/FleetPage';
import { BlogsPage as AdminBlogsPage } from './pages/admin/BlogsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

export function App() {
  return (
    <Router>
      <ToastProvider>
        <AppShell />
      </ToastProvider>
    </Router>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Every navigation (logo, navbar links, footer links, CTAs) starts at the top.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior, block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [location.pathname, location.hash]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingServiceType, setBookingServiceType] = useState<string | undefined>(undefined);
  const [quoteServiceType, setQuoteServiceType] = useState<string | undefined>(undefined);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  const handleOpenQuoteModal = (serviceType?: string) => {
    setQuoteServiceType(serviceType);
    setIsQuoteModalOpen(true);
  };

  const handleOpenBookingModal = (serviceType?: string) => {
    setBookingServiceType(serviceType);
    setIsBookingModalOpen(true);
  };

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#F5F8FF] text-slate-900">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="quotes" element={<QuotesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="fleet" element={<AdminFleetPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-[#0066FF]">

        {/* Navigation Bar */}
        <Navbar
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenBookingModal={handleOpenBookingModal}
          onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
          onOpenAuthModal={() => navigate('/login')}
        />

        {/* Main Body View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} onOpenBookingModal={handleOpenBookingModal} onOpenTrackingModal={() => setIsTrackingModalOpen(true)} />} />
            <Route path="/valet-parking" element={<ValetParkingPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/school-staff-transport" element={<SchoolStaffPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/airport-taxi" element={<AirportTaxiPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/tour-packages" element={<TourPackagesPage onOpenQuoteModal={handleOpenQuoteModal} onOpenBookingModal={handleOpenBookingModal} />} />
            <Route path="/towing-breakdown" element={<TowingBreakdownPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/fleet" element={<FleetPage onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/about-us" element={<AboutUsPage onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/account" element={<AccountPage />} />
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

        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialService={bookingServiceType}
        />

        <TrackingModal
          isOpen={isTrackingModalOpen}
          onClose={() => setIsTrackingModalOpen(false)}
        />

        {/* Sticky WhatsApp CTA */}
        <FloatingWhatsApp />

      </div>
  );
}

export default App;
