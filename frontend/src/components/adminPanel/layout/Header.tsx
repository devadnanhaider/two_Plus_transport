import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, LogOut, ChevronDown } from 'lucide-react';
import { tokenStore } from '../../../lib/apiClient';
import { useToast } from '../../common/ToastProvider';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onOpenSidebar }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const user = tokenStore.user();

  const handleLogout = () => {
    tokenStore.clear();
    toast.success('Signed out', 'Your session has ended.');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={onOpenSidebar}
          aria-label="Open menu"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF] lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">{title}</h1>
          {subtitle && <p className="truncate text-xs text-slate-500 sm:text-[13px]">{subtitle}</p>}
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            placeholder="Search bookings, quotes, clients…"
            className="w-56 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          aria-label="Notifications"
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 py-1.5 pl-2 pr-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#00A3FF] to-[#0055FF] text-xs font-black text-white">
            {(user?.name || 'A').charAt(0).toUpperCase()}
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-bold text-slate-900">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{user?.role || 'admin'}</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
        </div>

        <button
          onClick={handleLogout}
          aria-label="Sign out"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
