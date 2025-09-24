import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm">
        <div className="flex justify-between items-center p-4">
          <button onClick={toggleSidebar} className="p-2 rounded-md text-black">
            <img src="/images/menu.png" alt="Menu" className="w-6 h-6" />
          </button>
          <Link to="/home" className="text-xl font-bold">
            SIL Assessment
          </Link>
          <div className="w-6"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar only */}
      <aside
        className={`
    fixed md:static inset-y-0 left-0
    w-64 bg-white z-50
    transform transition-transform duration-300
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={toggleSidebar} className="p-2 rounded-md text-black">
            <img src="/images/close.png" alt="close" className="w-6 h-6" />
          </button>
        </div>

        {/* App Logo */}
        <div className="p-4 md:block hidden">
          <Link to="/home" className="text-xl font-bold flex items-center">
            SIL Assessment
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-y-2 border-[#f2f5f7]">
          <div className="flex flex-col mb-4">
            <img
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
              }
              alt={user.displayName}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="mt-4">
              <h3 className="font-semibold">{user.displayName}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul>
            <li>
              <Link
                to="/home"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(false)}
              >
                <img
                  src="/images/home.png"
                  alt="home"
                  className="w-5 h-5 mr-2"
                />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(false)}
              >
                <img
                  src="/images/user.png"
                  alt="users"
                  className="w-5 h-5 mr-2"
                />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/albums"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(false)}
              >
                <img
                  src="/images/album.png"
                  alt="albums"
                  className="w-5 h-5 mr-2"
                />
                Albums
              </Link>
            </li>
            <li>
              <Link
                to="/photos"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(false)}
              >
                <img
                  src="/images/photo.png"
                  alt="photos"
                  className="w-5 h-5 mr-2"
                />
                Photos
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t-2 border-[#f2f5f7]">
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded-lg hover:bg-gray-100 w-full"
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
    </>
  );
}

export default NavigationBar;
