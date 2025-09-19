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

  if (userLoading) return <div>Loading user information...</div>;
  if (userError) return <div>Error: {userError}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="p-5">
      {/* User Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold mr-6">
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Albums</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {currentAlbums.map((album) => (
                <div
                  key={album.id}
                  className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{album.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Album ID: {album.id}
                  </p>
                  <Link
                    to={`/album/${album.id}/photos`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm inline-block"
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
