import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import ProtectedRoutes from '../components/guards/ProtectedRoutes';

// Mocks AuthContext hook to control authentication state in tests
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Imports the mocked hook after mocking
import { useAuth } from '../context/AuthContext';

describe('ProtectedRoutes', () => {
  //Shows loading message while auth state is being determined
  it('shows loading state when loading is true', () => {
    useAuth.mockReturnValue({ user: null, loading: true });

    render(
      <MemoryRouter>
        <ProtectedRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Redirects to login page when user is not authenticated
  it('redirects to /login if user is not authenticated', () => {
    useAuth.mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<div>Login Page</div>} />
          {/* Protected route wrapper with nested protected content */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  // Allows access to protected content when user is authenticated
  it('renders child routes if user is authenticated', () => {
    // Mocks useAuth to return authenticated user
    useAuth.mockReturnValue({
      user: { uid: '123', email: 'john@example.com' },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          {/* Protected route wrapper with nested protected content */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Assert that protected content is displayed when user is authenticated
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
