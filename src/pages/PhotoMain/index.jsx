import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchPhotos, fetchAlbumById } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const PhotoMain = () => {
  const navigate = useNavigate();

  // State for pagination management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Fixed number of items per page (12 photos per page)
  const [photoAlbums, setPhotoAlbums] = useState({}); // Stores album data keyed by photo ID

  // Fetch all photos using custom useFetch hook
  const fetchFn = useCallback(() => fetchPhotos(), []); // Memoized fetch function
  const { data: photos, loading, error } = useFetch(fetchFn);

  // Effect to fetch album data for each photo when photos data changes
  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!photos) return; // Exit if no photos data

      const albumData = {};
      // Create promises for all photos to fetch their album data concurrently
      const promises = photos.map(async (photo) => {
        try {
          const album = await fetchAlbumById(photo.albumId);
          albumData[photo.id] = album; // Store album data by photo ID
        } catch (err) {
          // Handle errors gracefully for individual album fetches
          console.error(`Failed to fetch album for photo ${photo.id}:`, err);
          albumData[photo.id] = null; // Set to null on error
        }
      });

      // Wait for all album fetches to complete
      await Promise.all(promises);
      setPhotoAlbums(albumData); // Update state with all album data
    };

    fetchAlbumData();
  }, [photos]); // Dependency: runs when photos data changes

  // Effect to reset to first page when photos data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [photos]);

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

  // Shows error message with warning icon
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

  //Shows message when no photos are found
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

  // Pagination calculations - determine which photos to show on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);

  // Main component render - photos grid with pagination
  return (
    <div className="min-h-screen bg-[#f5f6fb] py-2 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <div className="p-4 text-lg font-bold">
          <h1>All Photos</h1>
        </div>

        {/* Photo Cards Grid - Responsive layout with different column counts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => navigate(`/album/${photo.id}/photos`)} // Navigate to photo detail page
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
            >
              <div className="p-6">
                {/* Photo Information Section */}
                <div>
                  {/* Photo title */}
                  <h3 className="font-normal text-md mb-2">{photo.title}</h3>

                  {/* Photo ID display */}
                  <p className="text-gray-600 text-sm mb-3">
                    Photo ID: {photo.id}
                  </p>

                  {/* Album title - dynamically loaded */}
                  <p className="text-gray-600 text-sm mb-3">
                    Album: {photoAlbums[photo.id]?.title || 'Loading...'}
                  </p>

                  {/* View Photos button/link */}
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

        {/* Pagination Component */}
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
