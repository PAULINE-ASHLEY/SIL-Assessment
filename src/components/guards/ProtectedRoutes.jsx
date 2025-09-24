import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Acts as a guard for routes that require authentication
export default function ProtectedRoutes({ redirectPath = '/login' }) {
  const { user, loading } = useAuth();

  // Displays loading state while Firebase auth state is being determined
  if (loading) return <div>Loading...</div>;

  // Redirects to login page if user is not authenticated
  if (!user) return <Navigate to={redirectPath} replace />;

  // Renders child routes if user is authenticated
  return <Outlet />;
}
