import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoutes({ redirectPath = '/login' }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // waiting for Firebase
  if (!user) return <Navigate to={redirectPath} replace />; // redirect if not logged in

  return <Outlet />; // render protected children
}
