import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      <button
        onClick={login}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  );
}
