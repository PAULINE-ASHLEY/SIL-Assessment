import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <nav className="text-black px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">SIL Assessment</Link>
        </div>
        <Link className="hover:underline" to="/login">
          Login
        </Link>
      </nav>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f5f6fb] text-black flex flex-col">
        {/* App Logo */}
        <div className="p-4">
          <Link to="/home" className="text-xl font-bold flex items-center">
            SIL Assessment
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="p-4">
          <div className="flex flex-col mb-4">
            <img
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
              }
              alt={user.displayName}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{user.displayName}</h3>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul>
            <li>
              <Link to="/home" className="flex items-center p-2 rounded-lg">
                <img
                  src="/images/home.png"
                  alt="home"
                  className="w-5 h-5 mr-2"
                />
                Home
              </Link>
            </li>
            <li>
              <Link to="/home" className="flex items-center p-2 rounded-lg">
                <img
                  src="/images/user.png"
                  alt="user"
                  className="w-5 h-5 mr-2"
                />
                Users
              </Link>
            </li>
            <li>
              <Link to="/home" className="flex items-center p-2 rounded-lg">
                <img
                  src="/images/album.png"
                  alt="album"
                  className="w-5 h-5 mr-2"
                />
                Albums
              </Link>
            </li>
            <li>
              <Link to="/home" className="flex items-center p-2 rounded-lg">
                <img
                  src="/images/photo.png"
                  alt="photo"
                  className="w-5 h-5 mr-2"
                />
                Photos
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center p-2 rounded-lg"
          >
            <img
              src="/images/logout.png"
              alt="logout"
              className="w-5 h-5 mr-2"
            />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default NavigationBar;
