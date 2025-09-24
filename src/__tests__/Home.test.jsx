import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mock AuthContext hook to simulate authentication state
vi.mock('../context/AuthContext', () => {
  return {
    useAuth: vi.fn(), // Create a mock function for useAuth
  };
});

// Mock API functions to avoid making real API calls during testing
vi.mock('../utils/api', () => {
  return {
    fetchUsers: vi.fn(), // Mock function for fetching users
    fetchAlbumsByUser: vi.fn(), // Mock function for fetching user albums
  };
});

// Import the mocked functions after creating the mocks
import { useAuth } from '../context/AuthContext';
import { fetchUsers, fetchAlbumsByUser } from '../utils/api';

// Test suite for the Home page component
describe('Home page', () => {
  // Before each test, clear all mocks to ensure test isolation
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Check if loading spinner is displayed during data fetching
  it('should show loading spinner', () => {
    // Mock the authentication hook to return a logged-in user
    useAuth.mockReturnValue({ user: { displayName: 'Test User' } });
    // Mock the API call to return a pending promise (simulates loading)
    fetchUsers.mockResolvedValueOnce(new Promise(() => {}));

    // Render the Home component wrapped in MemoryRouter for routing context
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Assert that the loading spinner (status element) is visible
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Check if error message is displayed when API call fails
  it('should show error if api fails', async () => {
    // Mock authentication
    useAuth.mockReturnValue({ user: { displayName: 'Test User' } });
    // Mock API to reject with an error
    fetchUsers.mockRejectedValueOnce(new Error('API error'));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for and assert that error message appears (async because error handling may take time)
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  // Check if "no users" message is displayed when API returns empty array
  it('should show no users found', async () => {
    useAuth.mockReturnValue({ user: { displayName: 'Test User' } });
    // Mock API to return empty array (no users)
    fetchUsers.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for and assert that "no users" message appears
    expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
  });

  // Check if user data is displayed correctly when API returns users
  it('should show users', async () => {
    useAuth.mockReturnValue({ user: { displayName: 'Test User' } });
    // Mock API to return a sample user
    fetchUsers.mockResolvedValueOnce([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        company: { name: 'ACME' },
      },
    ]);
    // Mock albums API to return sample album data
    fetchAlbumsByUser.mockResolvedValueOnce([{ id: 1 }]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for and assert that user name appears in the document
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

  // Check if pagination is displayed when there are many users
  it('should show pagination when users are many', async () => {
    useAuth.mockReturnValue({ user: { displayName: 'Test User' } });
    // Create mock data for 20 users to trigger pagination
    const mockUsers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      company: { name: 'ACME' },
    }));
    fetchUsers.mockResolvedValueOnce(mockUsers);
    // Mock albums API to return empty array for all users
    fetchAlbumsByUser.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for first user to appear and assert pagination controls are visible
    expect(await screen.findByText('User 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});