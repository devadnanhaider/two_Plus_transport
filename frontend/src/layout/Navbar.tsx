import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone, Mail, Globe, Menu, X, Search,
  User, Car, Bus, GraduationCap, Plane, Compass, Truck,
  MessageCircle, ChevronDown, Award, Shield, Building2
} from 'lucide-react';
import { COMPANY_INFO, CONTACT_LINKS } from '../data/companyInfo';

interface NavbarProps {
  onOpenQuoteModal: (serviceType?: string) => void;
  onOpenTrackingModal: () => void;
  onOpenAuthModal: () => void;
}

const SERVICES_LINKS = [
  { path: '/valet-parking', label: 'Valet Parking', icon: Car, desc: 'VIP parking for hotels & events' },
  { path: '/school-staff-transport', label: 'School & Staff Transport', icon: GraduationCap, desc: 'Scheduled corporate & school shuttles' },
  { path: '/airport-taxi', label: 'Airport Taxi', icon: Plane, desc: 'Premium airport transfers' },
  { path: '/tour-packages', label: 'Tour Packages', icon: Compass, desc: 'Sightseeing & desert safari charters' },
  { path: '/towing-breakdown', label: 'Towing & Breakdown', icon: Truck, desc: '24/7 emergency roadside assistance' },
];

const COMPANY_LINKS = [
  { path: '/about-us', label: 'About Us', icon: Shield, desc: 'Our story, team & mission' },
  { path: '/blogs', label: 'Blogs', icon: MessageCircle, desc: 'Industry insights & updates' },
  { path: '/careers', label: 'Careers', icon: Award, desc: 'Join our growing team' },
  { path: '/contact', label: 'Contact', icon: Building2, desc: 'Get in touch with us' },
];

const LANGUAGES = [
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'AR', label: 'العربية', flag: '🇶🇦' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
];

// Reusable dropdown hook – closes on outside click
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return { open, setOpen, ref };
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, onOpenTrackingModal, onOpenAuthModal }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  // Home page keeps the header fixed so the hero video sits directly below it
  const isHome = location.pathname === '/';

  const servicesDD = useDropdown();
  const companyDD = useDropdown();
  const langDD = useDropdown();
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

  const isServicesActive = SERVICES_LINKS.some(l => l.path === location.pathname);
  const isCompanyActive = COMPANY_LINKS.some(l => l.path === location.pathname);

  const closeAll = () => setMobileOpen(false);

  return (
    <header className={`z-50 w-full transition-all duration-300 ${
      isHome
        ? 'fixed inset-x-0 top-0 bg-white shadow-md border-b border-slate-100'
        : 'sticky top-0 bg-white shadow-md border-b border-slate-100'
    }`}>

      {/* ── Top Info Bar ── */}
      <div className="text-white text-[11px] sm:text-xs py-1.5 sm:py-2 bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 px-4 sm:px-6 lg:px-10">
          {/* Left: contact info */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <a href={CONTACT_LINKS.telMobile} className="flex items-center gap-1 sm:gap-1.5 text-slate-300 hover:text-[#00A3FF] transition-colors whitespace-nowrap">
              <Phone className="w-3 h-3 shrink-0 text-[#00A3FF]" />
              <span>24/7: {COMPANY_INFO.mobileDisplay}</span>
            </a>
            <a href={CONTACT_LINKS.mailto} className="hidden sm:flex items-center space-x-1.5 text-slate-300 hover:text-[#00A3FF] transition-colors">
              <Mail className="w-3 h-3 text-[#00A3FF]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer" className="hidden md:flex items-center space-x-1.5 text-slate-300 hover:text-[#00A3FF] transition-colors">
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>WhatsApp: {COMPANY_INFO.whatsappDisplay}</span>
            </a>
           
          </div>

          {/* Right: WhatsApp + Language + Login */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language picker */}
            <div className="relative hidden sm:block" ref={langDD.ref}>
              <button onClick={() => langDD.setOpen(o => !o)}
                className="flex items-center space-x-1 text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 hover:border-[#00A3FF] transition-colors">
                <Globe className="w-3 h-3 text-[#00A3FF]" />
                <span className="font-semibold">{currentLang.flag} {currentLang.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langDD.open ? 'rotate-180' : ''}`} />
              </button>
              {langDD.open && (
                <div className="absolute right-0 mt-1 w-36 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 z-[60]">
                  {LANGUAGES.map(lang => (
                    <button key={lang.code} onClick={() => { setCurrentLang(lang); langDD.setOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-sky-50 hover:text-[#0066FF] transition-colors ${currentLang.code === lang.code ? 'bg-sky-50 font-bold text-[#0066FF]' : ''}`}>
                      <span>{lang.flag} {lang.label}</span>
                      {currentLang.code === lang.code && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Portal login */}
            <button onClick={onOpenAuthModal}
              className="flex items-center gap-1 sm:gap-1.5 text-[#0066FF] hover:text-white bg-sky-50 hover:bg-[#0066FF] p-1.5 sm:px-3 sm:py-1 rounded-md transition-all text-[11px] sm:text-xs border border-sky-200 font-semibold">
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group" onClick={closeAll}>
            <img
              src="/images/navbarlogo.png"
              alt="Two Plus Transport"
              className="h-15 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">

            {/* Home */}
            <Link to="/"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${location.pathname === '/'
                ? ('bg-sky-50 text-[#0066FF] border-b-2 border-[#0066FF]')
                : ('text-slate-700 hover:text-[#0066FF] hover:bg-slate-50')
                }`}>
              <Bus className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesDD.ref}>
              <button
                onClick={() => { servicesDD.setOpen(o => !o); companyDD.setOpen(false); }}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isServicesActive
                  ? ('bg-sky-50 text-[#0066FF] border-b-2 border-[#0066FF]')
                  : ('text-slate-700 hover:text-[#0066FF] hover:bg-slate-50')
                  }`}>
                <Car className="w-4 h-4" />
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDD.open ? 'rotate-180' : ''}`} />
              </button>

              {servicesDD.open && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl shadow-2xl py-2 z-[60] border bg-white/95 border-slate-100 backdrop-blur-md">
                  <p className={`px-4 pt-1 pb-2 text-[10px] font-black uppercase tracking-widest ${'text-slate-400'}`}>Our Services</p>
                  {SERVICES_LINKS.map(link => {
                    const Icon = link.icon;
                    const active = location.pathname === link.path;
                    return (
                      <Link key={link.path} to={link.path}
                        onClick={() => servicesDD.setOpen(false)}
                        className={`flex items-start space-x-3 px-4 py-2.5 transition-colors group ${active ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
                        <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${active
                          ? 'bg-[#0066FF]'
                          : ('bg-slate-100 group-hover:bg-[#0066FF]/10')}`}>
                          <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : ('text-slate-500 group-hover:text-[#0066FF]')}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${active ? 'text-[#0066FF]' : 'text-slate-800 group-hover:text-[#0066FF]'}`}>{link.label}</p>
                          <p className={`text-xs ${'text-slate-400'}`}>{link.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Fleet */}
            <Link to="/fleet"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${location.pathname === '/fleet'
                ? ('bg-sky-50 text-[#0066FF] border-b-2 border-[#0066FF]')
                : ('text-slate-700 hover:text-[#0066FF] hover:bg-slate-50')
                }`}>
              <Truck className="w-4 h-4" />
              <span>Fleet</span>
            </Link>

            {/* Company Dropdown */}
            <div className="relative" ref={companyDD.ref}>
              <button
                onClick={() => { companyDD.setOpen(o => !o); servicesDD.setOpen(false); }}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isCompanyActive
                  ? ('bg-sky-50 text-[#0066FF] border-b-2 border-[#0066FF]')
                  : ('text-slate-700 hover:text-[#0066FF] hover:bg-slate-50')
                  }`}>
                <Building2 className="w-4 h-4" />
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${companyDD.open ? 'rotate-180' : ''}`} />
              </button>

              {companyDD.open && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-2xl py-2 z-[60] border bg-white/95 border-slate-100 backdrop-blur-md">
                  <p className={`px-4 pt-1 pb-2 text-[10px] font-black uppercase tracking-widest ${'text-slate-400'}`}>Company</p>
                  {COMPANY_LINKS.map(link => {
                    const Icon = link.icon;
                    const active = location.pathname === link.path;
                    return (
                      <Link key={link.path} to={link.path}
                        onClick={() => companyDD.setOpen(false)}
                        className={`flex items-start space-x-3 px-4 py-2.5 transition-colors group ${active ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
                        <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${active
                          ? 'bg-[#0066FF]'
                          : ('bg-slate-100 group-hover:bg-[#0066FF]/10')}`}>
                          <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : ('text-slate-500 group-hover:text-[#0066FF]')}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${active ? 'text-[#0066FF]' : 'text-slate-800 group-hover:text-[#0066FF]'}`}>{link.label}</p>
                          <p className={`text-xs ${'text-slate-400'}`}>{link.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* ── Right Action Buttons (Desktop) ── */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <button onClick={onOpenTrackingModal}
              className="flex items-center space-x-1.5 border-2 border-[#0066FF] text-[#0066FF] hover:bg-sky-50 px-3.5 py-2 rounded-lg text-xs font-bold transition-all">
              <Search className="w-4 h-4 text-[#0066FF]" />
              <span>Track</span>
            </button>
            <button onClick={() => onOpenQuoteModal()}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white hover:brightness-110 px-5 py-2.5 rounded-lg text-xs font-black shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5">
              <span>BOOK NOW</span>
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden">
            <button onClick={onOpenTrackingModal} aria-label="Track booking" className="p-2.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Search className="w-6 h-6 sm:w-5 sm:h-5 text-[#0066FF]" />
            </button>
            <button onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu" className="p-2.5 sm:p-2 rounded-lg hover:bg-sky-50 transition-colors">
              {mobileOpen ? <X className="w-7 h-7 sm:w-6 sm:h-6 text-[#0066FF]" /> : <Menu className="w-7 h-7 sm:w-6 sm:h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl max-h-[80vh] overflow-y-auto">
          {/* CTA Row */}
          <div className="grid grid-cols-2 gap-2 px-4 pt-4 pb-2">
            <button onClick={() => { closeAll(); onOpenQuoteModal(); }}
              className="bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white py-2.5 rounded-xl text-xs font-bold text-center">
              Get Instant Quote
            </button>
            <button onClick={() => { closeAll(); onOpenTrackingModal(); }}
              className="border-2 border-[#0066FF] text-[#0066FF] py-2.5 rounded-xl text-xs font-bold text-center">
              Track Booking
            </button>
          </div>

          <div className="px-4 pb-5 space-y-1">
            {/* Home */}
            <Link to="/" onClick={closeAll}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${location.pathname === '/' ? 'bg-sky-50 text-[#0066FF] border-l-4 border-[#0066FF]' : 'text-slate-800 hover:bg-slate-50'}`}>
              <Bus className="w-4 h-4 text-slate-400" />
              <span>Home</span>
            </Link>

            {/* Services accordion */}
            <div>
              <button onClick={() => setMobileServicesOpen(o => !o)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Car className="w-4 h-4 text-slate-400" />
                  <span>Services</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="ml-10 mt-1 space-y-1">
                  {SERVICES_LINKS.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link key={link.path} to={link.path} onClick={closeAll}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === link.path ? 'text-[#0066FF] font-bold' : 'text-slate-700 hover:text-[#0066FF]'}`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Fleet */}
            <Link to="/fleet" onClick={closeAll}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${location.pathname === '/fleet' ? 'bg-sky-50 text-[#0066FF] border-l-4 border-[#0066FF]' : 'text-slate-800 hover:bg-slate-50'}`}>
              <Truck className="w-4 h-4 text-slate-400" />
              <span>Fleet</span>
            </Link>

            {/* Company accordion */}
            <div>
              <button onClick={() => setMobileCompanyOpen(o => !o)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Company</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCompanyOpen && (
                <div className="ml-10 mt-1 space-y-1">
                  {COMPANY_LINKS.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link key={link.path} to={link.path} onClick={closeAll}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === link.path ? 'text-[#0066FF] font-bold' : 'text-slate-700 hover:text-[#0066FF]'}`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
