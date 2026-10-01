import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users } from 'lucide-react';
import type { AdminUser } from '../../../lib/adminTypes';
import { Panel } from '../common/Primitives';

interface AccountsCardProps {
  users: AdminUser[];
  note: string | null;
}

export const AccountsCard: React.FC<AccountsCardProps> = ({ users, note }) => (
  <Panel title="Accounts">
    <div className="flex items-center gap-4">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0066FF]/10 text-[#0066FF]">
        <Users className="h-6 w-6" />
      </span>
      <div>
        <p className="text-2xl font-black text-slate-900">{users.length}</p>
        <p className="text-xs text-slate-500">Registered portal users</p>
      </div>
    </div>

    {note ? (
      <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-[11px] font-semibold text-amber-700">{note}</p>
    ) : (
      <ul className="mt-5 space-y-2.5">
        {users.slice(0, 4).map(user => (
          <li key={user.id} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-xs font-black text-slate-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-800">{user.name}</p>
              <p className="truncate text-[11px] text-slate-500">{user.company || user.email}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
              {user.role}
            </span>
          </li>
        ))}
      </ul>
    )}

    <Link
      to="/admin/users"
      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] transition hover:text-[#0052CC]"
    >
      Manage users
      <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  </Panel>
);

export default AccountsCard;