import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserMain from '../pages/UserMain';
import * as api from '../utils/api';
import useFetch from '../hooks/useFetch';

// Mock useFetch hook
vi.mock('../hooks/useFetch');

// Mock API methods
vi.mock('../utils/api', () => ({
  fetchUsers: vi.fn(),
  fetchAlbumsByUser: vi.fn(),
}));

// Mock react-router navigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('UserMain', () => {
  // Clear all mocks before each test to ensure test isolation
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    // Mock useFetch to return loading state
    useFetch.mockReturnValue({ data: null, loading: true, error: null });

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    // Verify loading spinner/status is displayed
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state', () => {
    // Mock useFetch to return error state
    useFetch.mockReturnValue({ data: null, loading: false, error: 'Failed' });

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    // Verify error message is displayed
    expect(screen.getByText(/Error: Failed/i)).toBeInTheDocument();
  });

  it("renders 'No users found' when list is empty", () => {
    // Mock useFetch to return empty array
    useFetch.mockReturnValue({ data: [], loading: false, error: null });

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    // Verify empty state message is displayed
    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it('renders users and album counts', async () => {
    // Mock user data
    const users = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@test.com',
        company: { name: 'Acme' },
      },
      { id: 2, name: 'Bob', email: 'bob@test.com' },
    ];

    // Mock useFetch to return user data
    useFetch.mockReturnValue({ data: users, loading: false, error: null });

    // Mock API responses for album counts per user
    api.fetchAlbumsByUser.mockResolvedValueOnce([{ id: 10 }, { id: 11 }]);
    api.fetchAlbumsByUser.mockResolvedValueOnce([{ id: 20 }]);

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    // Verify page title is displayed
    expect(screen.getByText(/All Users/i)).toBeInTheDocument();

    // Wait for async album data to load and verify album counts
    await waitFor(() => {
      expect(screen.getByText('2 albums')).toBeInTheDocument();
      expect(screen.getByText('1 album')).toBeInTheDocument();
    });

    // Verify user names are displayed
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    // Create mock data with 12 users to test pagination
    const users = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `User${i + 1}`,
      email: `user${i + 1}@test.com`,
    }));

    // Mock useFetch to return 12 users
    useFetch.mockReturnValue({ data: users, loading: false, error: null });

    // Mock empty albums for all users
    api.fetchAlbumsByUser.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <UserMain />
      </MemoryRouter>
    );

    // Verify first page shows first user
    expect(await screen.findByText('User1')).toBeInTheDocument();

    // Simulate clicking on page 2 of pagination
    fireEvent.click(screen.getByText('2'));

    // Verify second page shows user from position 10
    expect(await screen.findByText('User10')).toBeInTheDocument();
  });
});
