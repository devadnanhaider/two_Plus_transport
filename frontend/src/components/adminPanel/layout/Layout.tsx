import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';
import { Header } from './Header';

export interface AdminPageMeta {
  title: string;
  subtitle?: string;
}

const AdminMetaContext = createContext<{ meta: AdminPageMeta; setMeta: (meta: AdminPageMeta) => void }>({
  meta: { title: 'Dashboard' },
  setMeta: () => {},
});

/** Lets a page push its heading into the admin header. */
export const useAdminMeta = (meta: AdminPageMeta) => {
  const { setMeta } = useContext(AdminMetaContext);

  useEffect(() => {
    setMeta(meta);
  }, [meta.title, meta.subtitle, setMeta]);
};

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [meta, setMeta] = useState<AdminPageMeta>({
    title: 'Dashboard',
    subtitle: 'Live overview of Two Plus Transport operations',
  });

  const value = useMemo(() => ({ meta, setMeta }), [meta]);

  return (
    <AdminMetaContext.Provider value={value}>
      <div className="min-h-screen bg-[#F5F8FF] text-slate-900">
        <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="lg:pl-[280px]">
          <Header
            title={meta.title}
            subtitle={meta.subtitle}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
          <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminMetaContext.Provider>
  );
};

export default Layout;
