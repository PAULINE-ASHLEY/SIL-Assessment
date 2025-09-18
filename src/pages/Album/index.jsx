import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchAlbumsByUser } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

const Albums = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;

  const fetchFn = useCallback(() => fetchAlbumsByUser(id), [id]);
  const { data: albums, loading, error } = useFetch(fetchFn);

  if (loading) return <div className="p-5">Loading albums...</div>;
  if (error) return <div className="p-5 text-red-500">Error: {error}</div>;
  if (!albums || albums.length === 0)
    return <div className="p-5">No albums found for this user.</div>;

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Albums for User {id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {currentAlbums.map((album) => (
          <div
            key={album.id}
            className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-2">{album.title}</h2>
            <p className="text-gray-600 text-sm mb-3">Album ID: {album.id}</p>
            <div className="bg-gray-100 p-2 rounded mb-3">
              <p className="text-xs text-gray-500">User ID: {album.userId}</p>
            </div>
            <Link
              to={`/album/${album.id}/photos`}
              className="bg-black text-white px-4 py-2 rounded-md transition-colors text-sm inline-block"
            >
              View Photos
            </Link>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={albums.length}
        itemsPerPage={albumsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Albums;
