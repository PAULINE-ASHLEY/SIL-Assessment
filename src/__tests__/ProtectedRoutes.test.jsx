// src/__tests__/ProtectedRoutes.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '../components/guards/ProtectedRoutes';

describe('ProtectedRoutes', () => {
  it('redirects to login if not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          {/* Protected route */}
          <Route
            element={
              <ProtectedRoutes isAuthenticated={false} redirectPath="/login" />
            }
          >
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>

          {/* Login route */}
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('renders protected content if authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          {/* Protected route */}
          <Route
            element={
              <ProtectedRoutes isAuthenticated={true} redirectPath="/login" />
            }
          >
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>

          {/* Login route */}
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });
});
