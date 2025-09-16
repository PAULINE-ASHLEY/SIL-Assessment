// src/components/guards/ProtectedRoutes.jsx
import { Navigate, Outlet } from 'react-router-dom';

// Protects routes that require authentication
function ProtectedRoutes({ isAuthenticated, redirectPath = '/login' }) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
