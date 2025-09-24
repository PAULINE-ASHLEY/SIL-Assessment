import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mocks AuthContext hook to simulate authentication state
vi.mock('../context/AuthContext', () => {
  return {
    useAuth: vi.fn(),
  };
});

// Mocks API functions to avoid making real API calls during testing
vi.mock('../utils/api', () => {
  return {
    fetchUsers: vi.fn(),
    fetchAlbumsByUser: vi.fn(),
  };
});

// Imports the mocked functions after creating the mocks
import { useAuth } from '../context/AuthContext';
import { fetchUsers, fetchAlbumsByUser } from '../utils/api';

// Tests suite for the Home page component
describe('Home page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Checks if loading spinner is displayed during data fetching
  it('should show loading spinner', () => {
    useAuth.mockReturnValue({ user: { displayName: 'Sil User' } });
    fetchUsers.mockResolvedValueOnce(new Promise(() => {}));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Checks if error message is displayed when API call fails
  it('should show error if api fails', async () => {
    useAuth.mockReturnValue({ user: { displayName: 'Sil User' } });
    fetchUsers.mockRejectedValueOnce(new Error('API error'));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  // Checks if "no users" message is displayed when API returns empty array
  it('should show no users found', async () => {
    useAuth.mockReturnValue({ user: { displayName: 'Sil User' } });
    fetchUsers.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
  });

  // Checks if user data is displayed correctly when API returns users
  it('should show users', async () => {
    useAuth.mockReturnValue({ user: { displayName: 'Sil User' } });
    fetchUsers.mockResolvedValueOnce([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        company: { name: 'SIL' },
      },
    ]);
    fetchAlbumsByUser.mockResolvedValueOnce([{ id: 1 }]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

  // Checks if pagination is displayed when there are many users
  it('should show pagination when users are many', async () => {
    useAuth.mockReturnValue({ user: { displayName: 'Sil User' } });
    const mockUsers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      company: { name: 'SIL' },
    }));
    fetchUsers.mockResolvedValueOnce(mockUsers);
    fetchAlbumsByUser.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText('User 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
