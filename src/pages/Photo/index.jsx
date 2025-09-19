import { useParams, Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { fetchPhotoById, updatePhotoTitle } from '../../utils/api';

const Photo = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Fetch photo data
  const fetchPhotoFn = useCallback(() => fetchPhotoById(id), [id]);
  const { data: photo, loading, error, refetch } = useFetch(fetchPhotoFn);

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

  if (loading) return <div className="p-5">Loading photo...</div>;
  if (error) return <div className="p-5 text-red-500">Error: {error}</div>;
  if (!photo) return <div className="p-5">Photo not found.</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-5">
        <Link
          to={`/album/${photo.albumId}/photos`}
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
          Back to Album
        </Link>
      </div>

      {/* Photo Display */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col items-center">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full max-w-md h-auto rounded-lg mb-6"
          />

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
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Title
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Photo Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
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
