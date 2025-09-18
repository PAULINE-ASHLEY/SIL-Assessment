import { useParams, Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { fetchPhotosByAlbum } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

const Photos = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  const fetchFn = useCallback(() => fetchPhotosByAlbum(id), [id]);
  const { data: photos, loading, error } = useFetch(fetchFn);

  if (loading) return <div>Loading photos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!photos || photos.length === 0) return <div>No photos found.</div>;

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  return (
    <div className="p-5">
      <div className="mb-5">
        <Link
          to={`/user/${photos[0]?.userId}/albums`} // Assuming photos have userId
          className="text-blue-500 hover:text-blue-700 flex items-center"
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
          Back to Albums
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-5">Photos for Album {id}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {currentPhotos.map((photo) => (
          <div key={photo.id} className="border border-gray-200 p-3 rounded-md">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-full h-auto mb-2 rounded"
            />
            <p className="text-sm text-gray-700">{photo.title}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={photos.length}
        itemsPerPage={photosPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Photos;
