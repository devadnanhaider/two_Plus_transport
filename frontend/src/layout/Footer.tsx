import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, ArrowUp, MessageCircle, Globe
} from 'lucide-react';
import { COMPANY_INFO, CONTACT_LINKS } from '../data/companyInfo';

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.53 3h3.05l-6.66 7.61L21.75 21h-5.98l-4.69-6.13L5.7 21H2.65l7.12-8.14L2.5 3h6.13l4.24 5.6L17.53 3Zm-1.07 16.17h1.69L7.62 4.74H5.81l10.65 14.43Z" />
  </svg>
);

interface FooterProps {
  onOpenQuoteModal: (serviceType?: string) => void;
  onOpenTrackingModal: () => void;
}

const SOCIAL_LINKS = [
  { href: CONTACT_LINKS.whatsapp, icon: MessageCircle, label: 'WhatsApp', bg: 'bg-emerald-600 hover:bg-emerald-500' },
  { href: CONTACT_LINKS.x, icon: XIcon, label: 'X', bg: 'bg-slate-800 hover:bg-[#0066FF]' },
  { href: CONTACT_LINKS.whatsapp, icon: Phone, label: 'Call Us', bg: 'bg-slate-800 hover:bg-[#0066FF]' },
  { href: CONTACT_LINKS.mailto, icon: Mail, label: 'Email', bg: 'bg-slate-800 hover:bg-[#0066FF]' },
];

const SERVICES_LINKS = [
  { to: '/school-staff-transport', label: 'Staff Transportation' },
  { to: '/school-staff-transport', label: 'School Transportation' },
  { to: '/airport-taxi', label: 'Airport Taxi & VIP Transfer' },
  { to: '/valet-parking', label: 'Valet Parking Management' },
  { to: '/tour-packages', label: 'Qatar Tour & Sightseeing' },
  { to: '/towing-breakdown', label: '24/7 Emergency Towing' },
];

const COMPANY_LINKS = [
  { to: '/about-us', label: 'About Us' },
  { to: '/fleet', label: 'Fleet Catalog' },
  { to: '/blogs', label: 'Latest News & Blog' },
  { to: '/careers', label: 'Career Opportunities' },
  { to: '/contact', label: 'Contact Support' },
];

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0066FF] pl-2.5">
    {children}
  </h4>
);

export const Footer: React.FC<FooterProps> = ({ onOpenTrackingModal }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-slate-900 text-slate-300 relative pt-16 pb-8 border-t-4 border-[#0066FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block bg-slate-950/60 rounded-xl px-3 py-2 border border-slate-800">
              <img
                src="/images/logo-two-plus-light.svg"
                alt="Two Plus Transportation"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Two Plus Transportation is Qatar&rsquo;s premier transportation provider specializing in
              staff shuttles, school transit, airport transfers, valet parking management, tour packages, and
              emergency roadside towing.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-1">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#00A3FF] shrink-0" />
                <a href={CONTACT_LINKS.telMobile} className="hover:text-[#00A3FF] transition-colors">
                  Mobile: {COMPANY_INFO.mobileDisplay}
                </a>
                <span className="text-slate-500">/</span>
                <a href={CONTACT_LINKS.telLandline} className="hover:text-[#00A3FF] transition-colors">
                  Landline: {COMPANY_INFO.landlineDisplay}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors">
                  WhatsApp: {COMPANY_INFO.whatsappDisplay}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#00A3FF] shrink-0" />
                <a href={CONTACT_LINKS.mailto} className="hover:text-[#00A3FF] transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-2">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-full ${bg} text-white flex items-center justify-center transition-colors`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <SectionHeading>Our Services</SectionHeading>
            <ul className="space-y-2 text-xs text-slate-400">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-[#00A3FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-3">
            <SectionHeading>Company</SectionHeading>
            <ul className="space-y-2 text-xs text-slate-400">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-[#00A3FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={onOpenTrackingModal} className="hover:text-[#00A3FF] transition-colors text-left">
                  Track Active Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Dispatch CTA */}
          <div className="lg:col-span-3 space-y-3">
            <SectionHeading>24/7 Dispatch</SectionHeading>
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-xs font-bold text-white">Online Now</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Real-time fleet tracking, instant quoting, and one-click dispatch across Qatar.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={CONTACT_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] text-white hover:bg-[#1EBE5A] px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP US</span>
                </a>
                <button
                  onClick={() => window.location.href = CONTACT_LINKS.telMobile}
                  className="w-full bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white hover:brightness-110 px-4 py-2.5 rounded-lg text-xs font-bold transition-all"
                >
                  CALL {COMPANY_INFO.mobileDisplay}
                </button>
                <button
                  onClick={onOpenTrackingModal}
                  className="w-full border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all"
                >
                  TRACK BOOKING
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1">
              <Globe className="w-3.5 h-3.5 text-[#00A3FF] shrink-0" />
              <span>English &middot; العربية &middot; Français</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; 2026 {COMPANY_INFO.name}. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Safety Protocols</span>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-[#0066FF] text-white flex items-center justify-center hover:bg-[#0055FF] transition-colors shadow-lg"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};