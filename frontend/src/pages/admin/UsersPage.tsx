import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import api, { extractError } from '../../lib/apiClient';
import type { AdminUser } from '../../lib/adminTypes';
import { useAdminMeta } from '../../components/adminPanel/layout/Layout';
import { Panel, Spinner, ErrorNote } from '../../components/adminPanel/common/Primitives';
import { UserStatCards, type UserCounts } from '../../components/adminPanel/users/UserStatCards';
import { UsersTable } from '../../components/adminPanel/users/UsersTable';

export const UsersPage: React.FC = () => {
  useAdminMeta({ title: 'Users', subtitle: 'Portal accounts, companies and roles' });

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ users: AdminUser[] }>('/users');
      setUsers(res.data.users || []);
    } catch (err) {
      setError(extractError(err, 'Could not load users'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return users;
    return users.filter(user =>
      [user.name, user.email, user.company, user.role].join(' ').toLowerCase().includes(needle),
    );
  }, [users, query]);

  const counts: UserCounts = useMemo(
    () => ({
      total: users.length,
      admins: users.filter(u => u.role === 'admin').length,
      corporate: users.filter(u => Boolean(u.company)).length,
    }),
    [users],
  );

  if (loading) return <Spinner label="Loading users…" />;
  if (error) return <ErrorNote message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <UserStatCards counts={counts} />

      <Panel
        title="Registered accounts"
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search users…"
                className="w-44 bg-transparent text-xs outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              onClick={load}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        }
      >
        <UsersTable users={filtered} />
      </Panel>
    </div>
  );
};

export default UsersPage;