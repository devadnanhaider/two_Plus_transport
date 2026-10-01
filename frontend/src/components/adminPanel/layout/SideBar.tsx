import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Users,
  Bus,
  Newspaper,
  Settings,
  LifeBuoy,
  X,
} from 'lucide-react';
import { COMPANY_INFO } from '../../../data/companyInfo';
import { tokenStore } from '../../../lib/apiClient';

export const ADMIN_NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/admin/quotes', label: 'Quotes', icon: FileText },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/fleet', label: 'Fleet', icon: Bus },
  { to: '/admin/blogs', label: 'Blog', icon: Newspaper },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => (
  <>
    {open && (
      <div
        className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
    )}

    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-slate-950 text-slate-300 transition-transform duration-300 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-white">{COMPANY_INFO.name}</p>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#00A3FF]">Admin Panel</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {ADMIN_NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <a
          href="/"
          className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#00A3FF]/50 hover:text-white"
        >
          <LifeBuoy className="h-[18px] w-[18px]" />
          View Website
        </a>
        <p className="mt-3 px-1 text-[11px] text-slate-500">
          Signed-in staff: {tokenStore.user()?.email || 'unknown'}
        </p>
      </div>
    </aside>
  </>
);

export default SideBar;
