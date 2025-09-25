const API_BASE = 'https://jsonplaceholder.typicode.com';

//fetch all users
export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

//fetch all albums
export async function fetchAlbums() {
  const res = await fetch(`${API_BASE}/albums`);
  if (!res.ok) throw new Error('Failed to fetch albums');
  return res.json();
}

//fetch all photos
export async function fetchPhotos() {
  const res = await fetch(`${API_BASE}/photos`);
  if (!res.ok) throw new Error('Failed to fetch photos');
  return res.json();
}

//fetch all users by their id
export async function fetchUserById(id) {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

//fetch all albums by user id
export async function fetchAlbumsByUser(userId) {
  const res = await fetch(`${API_BASE}/albums?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch albums');
  return res.json();
}

//fetch all albums by album id
export async function fetchAlbumById(albumId) {
  const res = await fetch(`${API_BASE}/albums/${albumId}`);
  if (!res.ok) throw new Error('Failed to fetch album');
  return res.json();
}

//fetch all photos by album id
export async function fetchPhotosByAlbum(albumId) {
  const res = await fetch(`${API_BASE}/photos?albumId=${albumId}`);
  if (!res.ok) throw new Error('Failed to fetch photos');
  return res.json();
}

//fetch all photos by photo id
export async function fetchPhotoById(photoId) {
  const res = await fetch(`${API_BASE}/photos/${photoId}`);
  if (!res.ok) throw new Error('Failed to fetch photo');
  return res.json();
}

//updates the photo title by fetching it's photo id
export async function updatePhotoTitle(photoId, newTitle) {
  const res = await fetch(`${API_BASE}/photos/${photoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle }),
  });
  if (!res.ok) throw new Error('Failed to update photo');
  return res.json();
}
