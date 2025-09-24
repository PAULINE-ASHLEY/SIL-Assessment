import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhotoMain from '../pages/PhotoMain';

vi.mock('../hooks/useFetch', () => ({
  default: vi.fn(), // Mock the default export of useFetch
}));

vi.mock('../utils/api', () => ({
  fetchPhotos: vi.fn(), // Mock fetchPhotos function
  fetchAlbumById: vi.fn(), // Mock fetchAlbumById function
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

// Test suite for the PhotoMain component
describe('PhotoMain', () => {
  // Clear all mocks before each test to ensure test isolation
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    // Mock useFetch to return loading state
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderComponent();

    // Assert that the loading spinner (element with role="status") is present
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state', () => {
    // Mock useFetch to return error state
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Something went wrong',
    });

    renderComponent();

    // Assert that the error message is displayed
    expect(
      screen.getByText(/Error: Something went wrong/i)
    ).toBeInTheDocument();
  });

  it('shows empty state when no photos', () => {
    // Mock useFetch to return empty array
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    renderComponent();

    // Assert that empty state message is displayed
    expect(screen.getByText(/No photos found/i)).toBeInTheDocument();
  });

  it('renders photos with album titles', async () => {
    // Mock photo data
    const mockPhotos = [
      { id: 1, title: 'Photo One', albumId: 10 },
      { id: 2, title: 'Photo Two', albumId: 20 },
    ];

    // Mock useFetch to return photo data
    useFetch.mockReturnValue({
      data: mockPhotos,
      loading: false,
      error: null,
    });

    // Mock fetchAlbumById to return album data based on ID
    fetchAlbumById.mockImplementation(async (id) => ({
      id,
      title: `Album ${id}`,
    }));

    renderComponent();

    // Assert that photo titles are immediately displayed (sync)
    expect(screen.getByText(/Photo One/i)).toBeInTheDocument();
    expect(screen.getByText(/Photo Two/i)).toBeInTheDocument();

    // Albums load async - wait for album titles to appear
    await waitFor(() => {
      expect(screen.getByText(/Album 10/i)).toBeInTheDocument();
      expect(screen.getByText(/Album 20/i)).toBeInTheDocument();
    });
  });
});
