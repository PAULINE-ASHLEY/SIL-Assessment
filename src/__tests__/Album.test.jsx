import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Album from '../pages/Album';
import useFetch from '../hooks/useFetch';

// Mocks the useFetch hook to control data fetching in tests
vi.mock('../hooks/useFetch');

describe('Album Page', () => {
  // Clears all mocks before each test to ensure test isolation
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Verifies album data, user data, and photos are rendered correctly
  it('renders album data correctly', async () => {
    useFetch
      .mockReturnValueOnce({
        data: { id: 1, title: 'Test Album', userId: 1 },
        loading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: { id: 1, name: 'Sil User' },
        loading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: [
          { id: 101, title: 'Photo 1' },
          { id: 102, title: 'Photo 2' },
        ],
        loading: false,
        error: null,
      });

    render(
      <MemoryRouter initialEntries={['/album/1']}>
        <Routes>
          <Route path="/album/:id" element={<Album />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByRole('heading', { level: 3, name: /Test Album/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: /All Test Album photos/i,
      })
    ).toBeInTheDocument();

    expect(await screen.findByText(/Photo 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Photo 2/i)).toBeInTheDocument();

    expect(
      await screen.findByRole('link', { name: /Sil User/i })
    ).toBeInTheDocument();
  });
});
