import { useParams, Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import {
  fetchAlbumById,
  fetchPhotosByAlbum,
  fetchUserById,
} from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

const Album = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 15;

  // Fetch album data
  const fetchAlbumFn = useCallback(() => fetchAlbumById(id), [id]);
  const {
    data: album,
    loading: albumLoading,
    error: albumError,
  } = useFetch(fetchAlbumFn);

  // Fetch user data for breadcrumb
  const fetchUserFn = useCallback(() => {
    if (album?.userId) {
      return fetchUserById(album.userId);
    }
    return Promise.resolve(null);
  }, [album?.userId]);
  const { data: user, loading: userLoading } = useFetch(fetchUserFn);

  // Fetch album's photos
  const fetchPhotosFn = useCallback(() => fetchPhotosByAlbum(id), [id]);
  const {
    data: photos,
    loading: photosLoading,
    error: photosError,
  } = useFetch(fetchPhotosFn);

  // Calculate pagination for photos
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos
    ? photos.slice(indexOfFirstPhoto, indexOfLastPhoto)
    : [];

  if (albumLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (albumError)
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
          <p>Error: {albumError}</p>
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
          <p className="text-gray-500">No albums found.</p>
        </div>
      </div>
    );

  return (
    <div className="p-5">
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
            <Link
              to={`/user/${album.userId}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {userLoading ? 'Loading...' : user?.name || 'User'}
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-500">Album {album.id}</span>
          </li>
        </ol>
      </nav>

      {/* Album Information Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-normal text-gray-900 mb-2">
          <b>Album Title:</b> {album.title}
        </h1>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Album ID: {album.id}</p>
            <p className="text-gray-600">User ID: {album.userId}</p>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div>
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center mb-6 gap-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            All {album.title} photos
          </h2>
          {photos && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {photosLoading && <div>Loading photos...</div>}
        {photosError && (
          <div className="text-red-500">
            Error loading photos: {photosError}
          </div>
        )}

        {photos && photos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
              {currentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 p-6"
                >
                  <p className="text-sm text-black line-clamp-2 font-normal">
                    <b>Photo Title:</b> {photo.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Photo ID: {photo.id}
                  </p>
                  <Link
                    to={`/album/${photo.id}/photos`}
                    className="bg-black text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm inline-block"
                  >
                    Edit Photo
                  </Link>
                </div>
              ))}
            </div>

            {photos.length > photosPerPage && (
              <Pagination
                currentPage={currentPage}
                totalItems={photos.length}
                itemsPerPage={photosPerPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          !photosLoading && (
            <div className="text-gray-500">No photos found in this album.</div>
          )
        )}
      </div>
    </div>
  );
};

export default Album;
