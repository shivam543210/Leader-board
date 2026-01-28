import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, activeMode } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Phase 6: Admin vs User Route Isolation
  // If we are in Admin Mode, but accessing a non-admin route (e.g. requireMode='user' or default), block it
  // Actually, let's just use an explicit prop `requireMode`.
  // If `requireMode` is set, `activeMode` must match it.

  if (requireAdmin && activeMode !== 'admin') {
      // If asking for an admin route but mode is user, redirect to /dashboard (or switch mode UI)
      // For now, redirect to dashboard to prevent access
      return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
