import { useParams, Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { fetchAlbumById, fetchPhotosByAlbum } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

const Album = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  // Fetch album data
  const fetchAlbumFn = useCallback(() => fetchAlbumById(id), [id]);
  const {
    data: album,
    loading: albumLoading,
    error: albumError,
  } = useFetch(fetchAlbumFn);

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

  if (albumLoading) return <div>Loading album information...</div>;
  if (albumError) return <div>Error: {albumError}</div>;
  if (!album) return <div>Album not found.</div>;

  return (
    <div className="p-5">
      {/* Back Navigation */}
      <div className="mb-5">
        <Link
          to={`/user/${album.userId}/albums`}
          className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to User's Albums
        </Link>
      </div>

      {/* Album Information Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{album.title}</h1>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Album ID: {album.id}</p>
            <p className="text-gray-600">User ID: {album.userId}</p>
          </div>
          {photos && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Photos Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Photos</h2>

        {photosLoading && <div>Loading photos...</div>}
        {photosError && (
          <div className="text-red-500">
            Error loading photos: {photosError}
          </div>
        )}

        {photos && photos.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {currentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="border border-gray-200 p-3 rounded-md hover:shadow-md transition-shadow"
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-auto mb-2 rounded"
                  />
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {photo.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Photo ID: {photo.id}
                  </p>
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
