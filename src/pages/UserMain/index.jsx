import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchUsers, fetchAlbumsByUser } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

// Main component for displaying users with pagination and album counts
const UserMain = () => {
  // Hook for programmatic navigation to user details
  const navigate = useNavigate();

  // State for pagination management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [userAlbumsCount, setUserAlbumsCount] = useState({});

  // Fetch users data using custom useFetch hook
  const fetchFn = useCallback(() => fetchUsers(), []);
  const { data: users, loading, error } = useFetch(fetchFn);

  // Effect to fetch album counts for each user when users data changes
  useEffect(() => {
    const fetchAlbumCounts = async () => {
      if (!users) return; // Exit if no users data

      const albumCounts = {};
      // Create promises for all users to fetch their albums concurrently
      const promises = users.map(async (user) => {
        try {
          const albums = await fetchAlbumsByUser(user.id);
          albumCounts[user.id] = albums.length; // Store album count by user ID
        } catch (err) {
          // Handle errors gracefully for individual user album fetches
          console.error(`Failed to fetch albums for user ${user.id}:`, err);
          albumCounts[user.id] = 0; // Set count to 0 on error
        }
      });

      // Wait for all album fetches to complete
      await Promise.all(promises);
      setUserAlbumsCount(albumCounts);
    };

    fetchAlbumCounts();
  }, [users]); // Dependency: runs when users data changes

  // Effect to reset to first page when users data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  // Shows spinner while data is being fetched
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          role="status"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>
    );

  // Shows error message with icon
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>Error: {error}</p>
        </div>
      </div>
    );

  // Shows message when no users are found
  if (!users || users.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500">No users found.</p>
        </div>
      </div>
    );

  // Pagination calculations - determine which users to show on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Main component render - users grid with pagination
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Page title */}
        <div className="p-4 text-lg font-bold">
          <h1>All Users</h1>
        </div>

        {/* User Cards Grid - Responsive layout with different column counts per breakpoint */}
        <div className="grid  xl:grid-cols-3 lg:grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 mb-2">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)} // Navigate to user detail page
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
            >
              <div className="p-6">
                <div className="flex flex-col items-center">
                  {/* User Avatar Section */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold">
                      {user.image ? (
                        // Show user image if available
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        // Fallback to first letter of name
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  </div>

                  {/* User Information Section */}
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold text-black">
                      {user.name}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                    {user.company && (
                      <p className="text-gray-500 text-sm mt-1">
                        {user.company.name}
                      </p>
                    )}

                    {/* Album Count Badge */}
                    <div className="mt-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                        <img
                          src="/images/album.png"
                          alt="album"
                          className="w-5 h-5 mr-2"
                        />
                        {/* Dynamic album count with pluralization */}
                        {userAlbumsCount[user.id] !== undefined
                          ? `${userAlbumsCount[user.id]} album${
                              userAlbumsCount[user.id] !== 1 ? 's' : ''
                            }`
                          : 'Loading...'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Action Indicator */}
                <div className="mt-4 flex flex-col items-center">
                  <span className="text-black text-sm font-medium flex items-center">
                    View profile
                    <img
                      src="/images/black.png"
                      alt="album"
                      className="w-5 h-5 ml-2"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <div className="rounded-lg p-2">
          <Pagination
            currentPage={currentPage}
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserMain;
