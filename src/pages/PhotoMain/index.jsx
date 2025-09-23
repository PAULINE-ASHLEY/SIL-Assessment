import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchPhotos, fetchAlbumById } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const PhotoMain = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [photoAlbums, setPhotoAlbums] = useState({});

  // Fetch all photos
  const fetchFn = useCallback(() => fetchPhotos(), []);
  const { data: photos, loading, error } = useFetch(fetchFn);

  // Fetch album data for each photo
  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!photos) return;

      const albumData = {};
      const promises = photos.map(async (photo) => {
        try {
          const album = await fetchAlbumById(photo.albumId);
          albumData[photo.id] = album;
        } catch (err) {
          console.error(`Failed to fetch album for photo ${photo.id}:`, err);
          albumData[photo.id] = null;
        }
      });

      await Promise.all(promises);
      setPhotoAlbums(albumData);
    };

    fetchAlbumData();
  }, [photos]);

  useEffect(() => {
    setCurrentPage(1);
  }, [photos]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

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

  if (!photos || photos.length === 0)
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
          <p className="text-gray-500">No photos found.</p>
        </div>
      </div>
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-[#f5f6fb] py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="p-4 text-xl font-bold">
          <h1>All Photos</h1>
        </div>

        {/* Photo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => navigate(`/album/${photo.id}/photos`)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
            >
              <div className="p-4">
                {/* Photo Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Photo ID: {photo.id}
                  </p>
                  <p className="text-xs text-gray-500">
                    Album: {photoAlbums[photo.id]?.title || 'Loading...'}
                  </p>
                  <Link
                    to="#"
                    className="bg-black text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm inline-block"
                  >
                    View Photos
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="rounded-lg p-2">
          <Pagination
            currentPage={currentPage}
            totalItems={photos.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoMain;
