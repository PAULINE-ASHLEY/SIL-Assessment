import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AlbumMain from '../pages/AlbumMain';
import * as useFetchHook from '../hooks/useFetch';

// Mocks the useFetch hook to control its return values for testing
vi.mock('../hooks/useFetch');

describe('AlbumMain Component', () => {
  it('renders loading spinner initially', () => {
    // Mocks useFetch to return loading state
    useFetchHook.default.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    // Renders the component wrapped in MemoryRouter for routing context
    render(
      <MemoryRouter>
        <AlbumMain />
      </MemoryRouter>
    );

    // Asserts that the loading spinner (element with role="status") is present
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error message if error occurs', () => {
    // Mocks useFetch to return error state
    useFetchHook.default.mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch albums',
    });

    render(
      <MemoryRouter>
        <AlbumMain />
      </MemoryRouter>
    );

    // Asserts that error message elements are displayed
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch albums/i)).toBeInTheDocument();
  });

  it('renders no albums found message when list is empty', () => {
    // Mocks useFetch to return empty array
    useFetchHook.default.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <AlbumMain />
      </MemoryRouter>
    );

    // Asserts that empty state message is displayed
    expect(screen.getByText(/No albums found/i)).toBeInTheDocument();
  });

  it('renders albums when data is available', () => {
    // Mocks useFetch to return sample album data
    useFetchHook.default.mockReturnValue({
      data: [
        { id: 1, title: 'Album One' },
        { id: 2, title: 'Album Two' },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <AlbumMain />
      </MemoryRouter>
    );

    // Asserts that album titles are displayed
    expect(screen.getByText('Album One')).toBeInTheDocument();
    expect(screen.getByText('Album Two')).toBeInTheDocument();

    // Asserts that "View Photos" links/buttons are rendered for each album
    expect(screen.getAllByText(/View Photos/i).length).toBe(2);
  });

  it('renders pagination controls when albums exist', () => {
    // Mocks useFetch to return 15 albums
    useFetchHook.default.mockReturnValue({
      data: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Album ${i + 1}`,
      })),
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <AlbumMain />
      </MemoryRouter>
    );

    // Asserts that page title and album links are displayed
    expect(screen.getByText('All Albums')).toBeInTheDocument();
    expect(screen.getAllByText(/View Photos/i).length).toBeGreaterThan(0);

    // Asserts that pagination controls (page 2 button) are visible
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
  });
});
