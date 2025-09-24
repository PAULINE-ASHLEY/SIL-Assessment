import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserMain from '../pages/UserMain';
import * as api from '../utils/api';
import useFetch from '../hooks/useFetch';

// Mocks useFetch hook
vi.mock('../hooks/useFetch');

// Mocks API methods
vi.mock('../utils/api', () => ({
  fetchUsers: vi.fn(),
  fetchAlbumsByUser: vi.fn(),
}));

// Mocks react-router navigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('UserMain', () => {
  // Clears all mocks before each test to ensure test isolation
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    // Mocks useFetch to return loading state
    useFetch.mockReturnValue({ data: null, loading: true, error: null });

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state', () => {
    // Mocks useFetch to return error state
    useFetch.mockReturnValue({ data: null, loading: false, error: 'Failed' });

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error: Failed/i)).toBeInTheDocument();
  });

  it("renders 'No users found' when list is empty", () => {
    // Mocks useFetch to return empty array
    useFetch.mockReturnValue({ data: [], loading: false, error: null });

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it('renders users and album counts', async () => {
    // Mocks user data
    const users = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@test.com',
        company: { name: 'Acme' },
      },
      { id: 2, name: 'Bob', email: 'bob@test.com' },
    ];

    useFetch.mockReturnValue({ data: users, loading: false, error: null });

    api.fetchAlbumsByUser.mockResolvedValueOnce([{ id: 10 }, { id: 11 }]);
    api.fetchAlbumsByUser.mockResolvedValueOnce([{ id: 20 }]);

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    expect(screen.getByText(/All Users/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('2 albums')).toBeInTheDocument();
      expect(screen.getByText('1 album')).toBeInTheDocument();
    });

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    // Creates mock data with 12 users to test pagination
    const users = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `User${i + 1}`,
      email: `user${i + 1}@test.com`,
    }));

    useFetch.mockReturnValue({ data: users, loading: false, error: null });

    api.fetchAlbumsByUser.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    expect(await screen.findByText('User1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('2'));

    expect(await screen.findByText('User10')).toBeInTheDocument();
  });
});
