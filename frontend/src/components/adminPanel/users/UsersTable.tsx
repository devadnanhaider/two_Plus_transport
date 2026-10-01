import React from 'react';
import type { AdminUser } from '../../../lib/adminTypes';
import { EmptyState } from '../common/Primitives';
import { Pagination, usePagination } from '../common/Pagination';

interface UsersTableProps {
  users: AdminUser[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const { pageItems, page, pageSize, total, setPage, setPageSize } = usePagination(users);

  if (total === 0) return <EmptyState label="No user accounts yet" />;

  return (
    <div>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
            <th className="px-2 py-3 font-bold">User</th>
            <th className="px-2 py-3 font-bold">Company</th>
            <th className="px-2 py-3 font-bold">Phone</th>
            <th className="px-2 py-3 font-bold">Role</th>
            <th className="px-2 py-3 font-bold">Joined</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map(user => (
            <tr key={user.id} className="border-b border-slate-50 last:border-0">
              <td className="px-2 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#00A3FF] to-[#0055FF] text-xs font-black text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">{user.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-2 py-3.5 text-slate-600">{user.company || '—'}</td>
              <td className="px-2 py-3.5 text-[11px] text-slate-500">{user.phone || '—'}</td>
              <td className="px-2 py-3.5">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-600">
                  {user.role}
                </span>
              </td>
              <td className="px-2 py-3.5 text-[11px] text-slate-500">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        label="users"
      />
    </div>
  );
};

export default UsersTable;