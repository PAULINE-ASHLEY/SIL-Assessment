import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function NavigationBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* App name / logo */}
      <div className="text-xl font-bold">
        <Link to="/">SIL App</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {/* Only show links if user is logged in */}
        {user && (
          <>
            <span>Welcome, {user.displayName}</span>
            <Link className="hover:underline" to="/home">
              Home
            </Link>
            <Link className="hover:underline" to="/user">
              Users
            </Link>
            <Link className="hover:underline" to="/album">
              Albums
            </Link>
            <Link className="hover:underline" to="/photo">
              Photos
            </Link>
            <button
              onClick={logout}
              className="ml-4 px-3 py-1 bg-white rounded hover:bg-white text-black"
            >
              Logout
            </button>
          </>
        )}

        {/* If user not logged in, show login link */}
        {!user && (
          <Link className="hover:underline" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
