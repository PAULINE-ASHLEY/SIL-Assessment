import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhotoMain from '../pages/PhotoMain';

vi.mock('../hooks/useFetch', () => ({
  default: vi.fn(), // Mocks the default export of useFetch
}));

vi.mock('../utils/api', () => ({
  fetchPhotos: vi.fn(), // Mocks fetchPhotos function
  fetchAlbumById: vi.fn(), // Mocks fetchAlbumById function
}));

import useFetch from '../hooks/useFetch';
import { fetchAlbumById } from '../utils/api';

// Helper function to render the component with Router wrapper
const renderComponent = () =>
  render(
    <BrowserRouter>
      <PhotoMain />
    </BrowserRouter>
  );

// Tests suite for the PhotoMain component
describe('PhotoMain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    // Mocks useFetch to return loading state
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state', () => {
    // Mocks useFetch to return error state
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Something went wrong',
    });

    renderComponent();

    expect(
      screen.getByText(/Error: Something went wrong/i)
    ).toBeInTheDocument();
  });

  it('shows empty state when no photos', () => {
    // Mocks useFetch to return empty array
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText(/No photos found/i)).toBeInTheDocument();
  });

  it('renders photos with album titles', async () => {
    // Mocks photo data
    const mockPhotos = [
      { id: 1, title: 'Photo One', albumId: 10 },
      { id: 2, title: 'Photo Two', albumId: 20 },
    ];

    // Mocks useFetch to return photo data
    useFetch.mockReturnValue({
      data: mockPhotos,
      loading: false,
      error: null,
    });

    // Mocks fetchAlbumById to return album data based on ID
    fetchAlbumById.mockImplementation(async (id) => ({
      id,
      title: `Album ${id}`,
    }));

    renderComponent();

    expect(screen.getByText(/Photo One/i)).toBeInTheDocument();
    expect(screen.getByText(/Photo Two/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Album 10/i)).toBeInTheDocument();
      expect(screen.getByText(/Album 20/i)).toBeInTheDocument();
    });
  });
});
