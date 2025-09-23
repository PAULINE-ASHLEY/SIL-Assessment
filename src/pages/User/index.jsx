import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchUserById, fetchAlbumsByUser } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

const User = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 6;

  // Fetch user data
  const fetchUserFn = useCallback(() => fetchUserById(id), [id]);
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch(fetchUserFn);

  // Fetch user's albums
  const fetchAlbumsFn = useCallback(() => fetchAlbumsByUser(id), [id]);
  const {
    data: albums,
    loading: albumsLoading,
    error: albumsError,
  } = useFetch(fetchAlbumsFn);

  // Calculate pagination for albums
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums
    ? albums.slice(indexOfFirstAlbum, indexOfLastAlbum)
    : [];

  if (userLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (userError)
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
          <p>Error: {userError}</p>
        </div>
      </div>
    );
  if (!user)
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 002 2z"
            />
          </svg>
          <p className="text-gray-500">No users found.</p>
        </div>
      </div>
    );

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/home" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <Link to="/users" className="text-blue-600 hover:text-blue-800">
              Users
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-500">{user.name}</span>
          </li>
        </ol>
      </nav>
      {/* User Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-4xl font-bold mr-6">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
            {user.company && (
              <p className="text-gray-500 mt-1">{user.company.name}</p>
            )}
            {user.website && (
              <p className="text-blue-500 mt-1">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.phone && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="text-gray-900">{user.phone}</p>
            </div>
          )}
          {user.address && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="text-gray-900">
                {user.address.street}, {user.address.city}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User's Albums Section */}
      <div>
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center mb-6 gap-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.name} albums
          </h2>
          {albums && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {albums.length} album{albums.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {albumsLoading && <div>Loading albums...</div>}
        {albumsError && (
          <div className="text-red-500">
            Error loading albums: {albumsError}
          </div>
        )}

        {albums && albums.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
              {currentAlbums.map((album) => (
                <div
                  key={album.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 p-6"
                >
                  <h3 className="font-normal text-md mb-2">
                    <b>Album Title:</b> {album.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Album ID: {album.id}
                  </p>
                  <Link
                    to={`/album/${album.id}`}
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm inline-block"
                  >
                    View Photos
                  </Link>
                </div>
              ))}
            </div>

            {albums.length > albumsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalItems={albums.length}
                itemsPerPage={albumsPerPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          !albumsLoading && (
            <div className="text-gray-500">No albums found for this user.</div>
          )
        )}
      </div>
    </div>
  );
};

export default User;
