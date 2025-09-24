import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchAlbums } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const AlbumMain = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Fetching all albums using custom useFetch hook
  const fetchFn = useCallback(() => fetchAlbums(), []);
  const { data: albums, loading, error } = useFetch(fetchFn);

  // Effect to reset to first page when albums data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [albums]);

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

  // Shows message when no albums are found
  if (!albums || albums.length === 0)
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
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
          <p className="text-gray-500">No albums found.</p>
        </div>
      </div>
    );

  // Determines which albums to show on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlbums = albums.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-[#f5f6fb] py-2 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page title */}
        <div className="p-4 text-lg font-bold">
          <h1>All Albums</h1>
        </div>

        {/* Album Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentAlbums.map((album) => (
            <div
              key={album.id}
              onClick={() => navigate(`/album/${album.id}`)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
            >
              <div className="p-6">
                <div className="flex flex-col">
                  {/* Album Information Section */}
                  <div className="flex-1">
                    {/* Album title */}
                    <h3 className="font-normal text-md mb-2">{album.title}</h3>

                    {/* Album ID display */}
                    <p className="text-gray-600 text-sm mb-3">
                      Album ID: {album.id}
                    </p>

                    {/* View Photos link */}
                    <Link
                      to="#"
                      className="bg-black text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm inline-block"
                    >
                      View Photos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <div className="rounded-lg p-2">
          <Pagination
            currentPage={currentPage}
            totalItems={albums.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumMain;
