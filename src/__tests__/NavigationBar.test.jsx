import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NavigationBar from '../components/modules/NavigationBar';

// Mocks AuthContext to control authentication state in tests
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Imports the mocked hook after mocking
import { useAuth } from '../context/AuthContext';

// Test suite for NavigationBar component
describe('NavigationBar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  //Shows login link
  it('renders login link if user is not authenticated', () => {
    useAuth.mockReturnValue({ user: null, logout: vi.fn() });

    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  // Shows user info and navigation links
  it('renders user info and links when authenticated', () => {
    useAuth.mockReturnValue({
      user: { displayName: 'Sil User', email: 'john@example.com' },
      logout: vi.fn(),
    });

    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Sil User')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Albums/i)).toBeInTheDocument();
    expect(screen.getByText(/Photos/i)).toBeInTheDocument();
  });

  // Mobile sidebar toggle functionality
  it('toggles sidebar on mobile via class changes', () => {
    useAuth.mockReturnValue({
      user: { displayName: 'Sil User', email: 'john@example.com' },
      logout: vi.fn(),
    });

    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole('complementary');

    expect(sidebar).toHaveClass('-translate-x-full');

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    expect(sidebar).toHaveClass('translate-x-0');

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(sidebar).toHaveClass('-translate-x-full');
  });

  // Logout functionality
  it('calls logout when logout button is clicked', () => {
    const mockLogout = vi.fn();
    useAuth.mockReturnValue({
      user: { displayName: 'Sil User', email: 'john@example.com' },
      logout: mockLogout,
    });

    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
