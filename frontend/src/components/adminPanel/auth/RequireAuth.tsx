import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { tokenStore } from '../../../lib/apiClient';

/** Blocks the admin area unless an admin JWT is present in local storage. */
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = tokenStore.get();
  const user = tokenStore.user();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (user && user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
