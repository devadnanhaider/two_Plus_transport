import React from 'react';
import { COMPANY_INFO, CONTACT_LINKS } from '../../data/companyInfo';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.12-.27-.2-.57-.35Z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Z" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={CONTACT_LINKS.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with us on WhatsApp ${COMPANY_INFO.whatsappDisplay}`}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 py-3.5 text-white shadow-2xl shadow-emerald-900/30 hover:bg-[#1EBE5A] hover:shadow-emerald-900/40 transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
    >
      <span className="relative flex items-center">
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <WhatsAppIcon className="w-7 h-7 relative" />
      </span>
      
    </a>
  );
};