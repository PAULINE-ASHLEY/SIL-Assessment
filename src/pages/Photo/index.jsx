import { useParams, Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import {
  fetchPhotoById,
  updatePhotoTitle,
  fetchAlbumById,
  fetchUserById,
} from '../../utils/api';

const Photo = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Fetch photo data
  const fetchPhotoFn = useCallback(() => fetchPhotoById(id), [id]);
  const { data: photo, loading, error, refetch } = useFetch(fetchPhotoFn);

  // Fetch album data for breadcrumb
  const fetchAlbumFn = useCallback(() => {
    if (photo?.albumId) {
      return fetchAlbumById(photo.albumId);
    }
    return Promise.resolve(null);
  }, [photo?.albumId]);
  const { data: album, loading: albumLoading } = useFetch(fetchAlbumFn);

  // Fetch user data for breadcrumb
  const fetchUserFn = useCallback(() => {
    if (album?.userId) {
      return fetchUserById(album.userId);
    }
    return Promise.resolve(null);
  }, [album?.userId]);
  const { data: user, loading: userLoading } = useFetch(fetchUserFn);

  // Initialize edited title when photo loads
  useState(() => {
    if (photo) {
      setEditedTitle(photo.title);
    }
  }, [photo]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(photo.title);
    setSaveError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(photo.title);
    setSaveError(null);
  };

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      setSaveError('Title cannot be empty');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await updatePhotoTitle(id, editedTitle.trim());
      setIsEditing(false);
      // Refetch to get updated data
      await refetch();
    } catch (err) {
      setSaveError(err.message || 'Failed to update photo title');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

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

  if (!photo)
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

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm flex-wrap">
          <li>
            <Link to="/home" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <Link to="/home" className="text-blue-600 hover:text-blue-800">
              Users
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <Link
              to={`/user/${album?.userId}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {userLoading ? 'Loading...' : user?.name || 'User'}
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <Link
              to={`/album/${photo.albumId}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {albumLoading ? 'Loading...' : album?.title || 'Album'}
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-500">Photo {photo.id}</span>
          </li>
        </ol>
      </nav>

      {/* Photo Display */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col items-center">
          {/* Photo Information */}
          <div className="w-full max-w-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo ID
              </label>
              <p className="text-gray-900">{photo.id}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Album ID
              </label>
              <p className="text-gray-900">{photo.albumId}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isSaving}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  {saveError && (
                    <p className="text-red-500 text-sm mt-1">{saveError}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 break-words">{photo.title}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Title
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Photo Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Photo Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <a
              href={photo.thumbnailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-sm break-all"
            >
              {photo.thumbnailUrl}
            </a>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Image URL
            </label>
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-sm break-all"
            >
              {photo.url}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
